import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const baseURL = new URL(process.env.SITE_URL || 'http://127.0.0.1:4173/web-cv/');
const label = process.env.AUDIT_LABEL || 'theme-review';
const outputDir = path.resolve('artifacts/playwright', label);
await fs.mkdir(outputDir, { recursive: true });

const executableCandidates = [
  '/root/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome',
  '/root/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome',
  '/root/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome',
];
let executablePath;
for (const candidate of executableCandidates) {
  try {
    await fs.access(candidate);
    executablePath = candidate;
    break;
  } catch {
    // Try the next locally cached browser.
  }
}

const proxy = process.env.PLAYWRIGHT_PROXY_SERVER ? {
  server: process.env.PLAYWRIGHT_PROXY_SERVER,
  username: process.env.PLAYWRIGHT_PROXY_USERNAME,
  password: process.env.PLAYWRIGHT_PROXY_PASSWORD,
  bypass: process.env.PLAYWRIGHT_PROXY_BYPASS || '127.0.0.1,localhost',
} : undefined;

const sitemapFiles = ['public/en/sitemap.xml', 'public/zh/sitemap.xml'];
const canonicalURLs = [];
for (const sitemapFile of sitemapFiles) {
  const xml = await fs.readFile(sitemapFile, 'utf8');
  canonicalURLs.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
}

const uniqueCanonicalURLs = [...new Set(canonicalURLs)].sort();
const toAuditURL = (canonicalURL) => {
  const target = new URL(canonicalURL);
  return new URL(`${target.pathname}${target.search}`, baseURL.origin).href;
};
const isRepresentative = (url) => {
  const pathname = new URL(url).pathname.replace(/\/+/g, '/');
  return [
    '/web-cv/',
    '/web-cv/publications/',
    '/web-cv/publications/hear/',
    '/web-cv/tags/',
    '/web-cv/zh/',
    '/web-cv/zh/publications/',
    '/web-cv/zh/publications/hear/',
    '/web-cv/zh/tags/',
  ].includes(pathname);
};
const screenshotName = (mode, url) => {
  const pathname = new URL(url).pathname.replace(/^\/web-cv\/?/, '').replace(/\/$/, '') || 'home';
  return `${mode}-${pathname.replace(/\//g, '-')}.png`;
};
const representativeCanonicalURLs = uniqueCanonicalURLs.filter((url) => isRepresentative(toAuditURL(url)));

async function hydrateLazyContent(page) {
  await page.evaluate(async () => {
    const step = Math.max(500, Math.floor(window.innerHeight * 0.8));
    for (let top = 0; top < document.documentElement.scrollHeight; top += step) {
      window.scrollTo(0, top);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((resolve) => setTimeout(resolve, 180));
    const imageDecodes = Promise.all([...document.images].map((image) => {
      if (image.complete) return image.decode?.().catch(() => undefined);
      return new Promise((resolve) => {
        image.addEventListener('load', resolve, { once: true });
        image.addEventListener('error', resolve, { once: true });
      });
    }));
    await Promise.race([
      imageDecodes,
      new Promise((resolve) => setTimeout(resolve, 5_000)),
    ]);
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(180);
}

const browser = await chromium.launch({ headless: true, executablePath, proxy });
const report = {
  baseURL: baseURL.href,
  label,
  generatedAt: new Date().toISOString(),
  canonicalPageCount: uniqueCanonicalURLs.length,
  modes: {},
  mobile: {},
};

for (const mode of ['light', 'dark']) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    colorScheme: mode,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  let currentURL = '';

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push({ url: currentURL, text: message.text() });
  });
  page.on('pageerror', (error) => pageErrors.push({ url: currentURL, text: error.message }));
  page.on('requestfailed', (request) => {
    const error = request.failure()?.errorText || '';
    if (error !== 'net::ERR_ABORTED') failedRequests.push({ url: currentURL, request: request.url(), error });
  });

  const pages = [];
  for (const canonicalURL of uniqueCanonicalURLs) {
    const auditURL = toAuditURL(canonicalURL);
    currentURL = auditURL;
    let response;
    let navigationError = null;
    try {
      response = await page.goto(auditURL, { waitUntil: 'domcontentloaded', timeout: 30_000 });
      await page.waitForTimeout(120);
    } catch (error) {
      navigationError = error.message;
    }

    const state = navigationError ? null : await page.evaluate(() => {
      const root = document.documentElement;
      const bodyStyle = getComputedStyle(document.body);
      return {
        title: document.title,
        lang: root.lang,
        isDark: root.classList.contains('dark'),
        clientWidth: root.clientWidth,
        scrollWidth: Math.max(root.scrollWidth, document.body.scrollWidth),
        mainVisible: Boolean(document.querySelector('main, [data-pagefind-body]')),
        background: bodyStyle.backgroundColor,
        foreground: bodyStyle.color,
      };
    });

    const result = {
      canonicalURL,
      auditURL,
      status: response?.status() || null,
      navigationError,
      ...state,
    };
    result.themeMatches = state ? state.isDark === (mode === 'dark') : false;
    result.horizontalOverflow = state ? Math.max(0, state.scrollWidth - state.clientWidth) : null;
    pages.push(result);

    if (!navigationError && isRepresentative(auditURL)) {
      await hydrateLazyContent(page);
      await page.screenshot({ path: path.join(outputDir, screenshotName(mode, auditURL)), fullPage: true });
    }
  }

  report.modes[mode] = {
    pages,
    consoleErrors: [...new Map(consoleErrors.map((item) => [`${item.url}|${item.text}`, item])).values()],
    pageErrors: [...new Map(pageErrors.map((item) => [`${item.url}|${item.text}`, item])).values()],
    failedRequests: [...new Map(failedRequests.map((item) => [`${item.request}|${item.error}`, item])).values()],
  };
  await context.close();
}

for (const mode of ['light', 'dark']) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    colorScheme: mode,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  let currentURL = '';

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push({ url: currentURL, text: message.text() });
  });
  page.on('pageerror', (error) => pageErrors.push({ url: currentURL, text: error.message }));
  page.on('requestfailed', (request) => {
    const error = request.failure()?.errorText || '';
    if (error !== 'net::ERR_ABORTED') failedRequests.push({ url: currentURL, request: request.url(), error });
  });

  const pages = [];
  for (const canonicalURL of representativeCanonicalURLs) {
    const auditURL = toAuditURL(canonicalURL);
    currentURL = auditURL;
    let response;
    let navigationError = null;
    try {
      response = await page.goto(auditURL, { waitUntil: 'domcontentloaded', timeout: 30_000 });
      await page.waitForTimeout(120);
      await hydrateLazyContent(page);
    } catch (error) {
      navigationError = error.message;
    }

    const state = navigationError ? null : await page.evaluate(() => {
      const root = document.documentElement;
      return {
        title: document.title,
        lang: root.lang,
        isDark: root.classList.contains('dark'),
        clientWidth: root.clientWidth,
        scrollWidth: Math.max(root.scrollWidth, document.body.scrollWidth),
      };
    });
    const result = {
      canonicalURL,
      auditURL,
      status: response?.status() || null,
      navigationError,
      ...state,
    };
    result.themeMatches = state ? state.isDark === (mode === 'dark') : false;
    result.horizontalOverflow = state ? Math.max(0, state.scrollWidth - state.clientWidth) : null;
    pages.push(result);

    if (!navigationError) {
      await page.screenshot({ path: path.join(outputDir, `mobile-${screenshotName(mode, auditURL)}`), fullPage: true });
    }
  }

  report.mobile[mode] = {
    pages,
    consoleErrors: [...new Map(consoleErrors.map((item) => [`${item.url}|${item.text}`, item])).values()],
    pageErrors: [...new Map(pageErrors.map((item) => [`${item.url}|${item.text}`, item])).values()],
    failedRequests: [...new Map(failedRequests.map((item) => [`${item.request}|${item.error}`, item])).values()],
  };
  await context.close();
}

await browser.close();

const failures = [];
for (const [mode, modeReport] of Object.entries(report.modes)) {
  for (const page of modeReport.pages) {
    if (page.navigationError || !page.status || page.status >= 400 || !page.themeMatches || page.horizontalOverflow > 1 || !page.title) {
      failures.push({ mode, ...page });
    }
  }
  if (modeReport.consoleErrors.length || modeReport.pageErrors.length || modeReport.failedRequests.length) {
    failures.push({
      mode,
      consoleErrors: modeReport.consoleErrors,
      pageErrors: modeReport.pageErrors,
      failedRequests: modeReport.failedRequests,
    });
  }
}
for (const [mode, modeReport] of Object.entries(report.mobile)) {
  for (const page of modeReport.pages) {
    if (page.navigationError || !page.status || page.status >= 400 || !page.themeMatches || page.horizontalOverflow > 1 || !page.title) {
      failures.push({ viewport: 'mobile', mode, ...page });
    }
  }
  if (modeReport.consoleErrors.length || modeReport.pageErrors.length || modeReport.failedRequests.length) {
    failures.push({
      viewport: 'mobile',
      mode,
      consoleErrors: modeReport.consoleErrors,
      pageErrors: modeReport.pageErrors,
      failedRequests: modeReport.failedRequests,
    });
  }
}
report.failures = failures;
await fs.writeFile(path.join(outputDir, 'theme-audit.json'), `${JSON.stringify(report, null, 2)}\n`);

console.log(JSON.stringify({
  outputDir,
  canonicalPageCount: report.canonicalPageCount,
  checkedPageRenders: report.canonicalPageCount * 2 + representativeCanonicalURLs.length * 2,
  lightErrors: {
    console: report.modes.light.consoleErrors.length,
    page: report.modes.light.pageErrors.length,
    request: report.modes.light.failedRequests.length,
  },
  darkErrors: {
    console: report.modes.dark.consoleErrors.length,
    page: report.modes.dark.pageErrors.length,
    request: report.modes.dark.failedRequests.length,
  },
  mobileRepresentativePages: representativeCanonicalURLs.length,
  mobileErrors: {
    light: {
      console: report.mobile.light.consoleErrors.length,
      page: report.mobile.light.pageErrors.length,
      request: report.mobile.light.failedRequests.length,
    },
    dark: {
      console: report.mobile.dark.consoleErrors.length,
      page: report.mobile.dark.pageErrors.length,
      request: report.mobile.dark.failedRequests.length,
    },
  },
  failures: failures.length,
}, null, 2));

if (failures.length) process.exitCode = 1;
