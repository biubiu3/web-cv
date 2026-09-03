import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const baseURL = process.env.SITE_URL || 'http://127.0.0.1:4173';
const auditBase = new URL(baseURL.endsWith('/') ? baseURL : `${baseURL}/`);
const homeURL = auditBase.href;
const siteOrigin = auditBase.origin;
const canonicalOrigin = process.env.SITE_CANONICAL_ORIGIN?.replace(/\/$/, '');
const label = process.env.AUDIT_LABEL || 'current';
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

const browser = await chromium.launch({ headless: true, executablePath, proxy });
const report = {
  baseURL,
  label,
  generatedAt: new Date().toISOString(),
  consoleErrors: [],
  pageErrors: [],
  failedRequests: [],
  views: {},
  interactions: {},
  internalLinks: [],
};

function toAuditURL(href) {
  if (!href) return null;
  try {
    const target = new URL(href, homeURL);
    if (target.origin === siteOrigin) return target.href;
    if (canonicalOrigin && target.origin === canonicalOrigin && target.pathname.startsWith(auditBase.pathname)) {
      return new URL(`${target.pathname}${target.search}${target.hash}`, siteOrigin).href;
    }
  } catch {
    // Non-navigation URLs such as mailto links are intentionally ignored.
  }
  return null;
}

async function localizeClickTarget(locator) {
  const canonicalHref = await locator.getAttribute('href');
  const auditHref = toAuditURL(canonicalHref);
  if (auditHref && auditHref !== canonicalHref) {
    await locator.evaluate((link, href) => link.setAttribute('href', href), auditHref);
  }
  return { canonicalHref, auditHref };
}

async function settle(page) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1300);
}

async function makePage(viewport) {
  const context = await browser.newContext({
    viewport,
    colorScheme: 'light',
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  page.on('console', (message) => {
    if (message.type() === 'error') report.consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => report.pageErrors.push(error.message));
  page.on('requestfailed', (request) => {
    const url = request.url();
    report.failedRequests.push({ url, error: request.failure()?.errorText });
  });
  return { context, page };
}

async function inventory(page) {
  return page.locator('a, button, input, video').evaluateAll((elements) =>
    elements.map((element) => ({
      tag: element.tagName.toLowerCase(),
      text: (element.innerText || element.getAttribute('aria-label') || element.getAttribute('title') || '').trim().replace(/\s+/g, ' '),
      href: element.getAttribute('href'),
      ariaLabel: element.getAttribute('aria-label'),
      type: element.getAttribute('type'),
      visible: Boolean(element.offsetWidth || element.offsetHeight || element.getClientRects().length),
    })),
  );
}

async function captureSections(page, suffix) {
  const sectionIds = ['about', 'robot-demos', 'research', 'engineering-projects', 'papers', 'foundations', 'multimodal-models', 'general-systems', 'contact'];
  for (const id of sectionIds) {
    const section = page.locator(`#${id}`).first();
    if (!await section.count()) continue;
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await section.screenshot({ path: path.join(outputDir, `${id}-${suffix}.png`) });
  }
  const footer = page.locator('.page-footer').first();
  if (await footer.count() && await footer.isVisible()) {
    await footer.scrollIntoViewIfNeeded();
    await footer.screenshot({ path: path.join(outputDir, `footer-${suffix}.png`) });
  }
}

{
  const { context, page } = await makePage({ width: 1440, height: 1000 });
  await page.goto(homeURL);
  await settle(page);
  report.views.desktop = {
    url: page.url(),
    title: await page.title(),
    lang: await page.locator('html').getAttribute('lang'),
    scrollHeight: await page.evaluate(() => document.documentElement.scrollHeight),
    controls: await inventory(page),
  };
  await page.screenshot({ path: path.join(outputDir, 'home-desktop.png'), fullPage: true });
  await captureSections(page, 'desktop');

  const links = await page.locator('a[href]').evaluateAll((anchors) =>
    anchors.map((anchor) => ({
      text: (anchor.innerText || anchor.getAttribute('aria-label') || anchor.getAttribute('title') || '').trim().replace(/\s+/g, ' '),
      href: anchor.href,
    })),
  );
  const uniqueInternal = [...new Map(links
    .map((item) => ({ ...item, auditHref: toAuditURL(item.href) }))
    .filter(({ auditHref }) => auditHref)
    .map((item) => [item.auditHref, item])).values()];
  for (const link of uniqueInternal) {
    const response = await page.request.get(link.auditHref);
    report.internalLinks.push({ ...link, status: response.status() });
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(250);
  const languageButton = page.locator('button[data-hb-language-chooser], button[aria-label="Languages"]').first();
  if (await languageButton.count()) {
    await languageButton.click();
    await page.waitForTimeout(200);
  }
  const languageLink = page.locator('a[href*="/zh/"]').first();
  if (await languageLink.count()) {
    report.interactions.languageSwitcher = {
      visible: await languageLink.isVisible(),
      href: await languageLink.getAttribute('href'),
    };
    await page.screenshot({ path: path.join(outputDir, 'language-menu-open.png'), fullPage: false });
    const localizedLanguage = await localizeClickTarget(languageLink);
    report.interactions.languageSwitcher.auditHref = localizedLanguage.auditHref;
    await languageLink.click({ noWaitAfter: true });
    await page.waitForTimeout(1500);
    Object.assign(report.interactions.languageSwitcher, {
      resultURL: page.url(),
      resultLang: await page.locator('html').getAttribute('lang'),
      resultTitle: await page.title(),
    });
    await page.screenshot({ path: path.join(outputDir, 'home-zh-desktop.png'), fullPage: true });

    const returnLanguageButton = page.locator('button[data-hb-language-chooser], button[aria-label="Languages"]').first();
    if (await returnLanguageButton.count()) {
      await returnLanguageButton.click();
      await page.waitForTimeout(200);
      const returnLanguageLink = page.locator('[data-hb-language-chooser] + ul a').first();
      Object.assign(report.interactions.languageSwitcher, {
        returnVisible: await returnLanguageLink.isVisible(),
        returnHref: await returnLanguageLink.getAttribute('href'),
      });
      const localizedReturn = await localizeClickTarget(returnLanguageLink);
      report.interactions.languageSwitcher.returnAuditHref = localizedReturn.auditHref;
      await returnLanguageLink.click({ noWaitAfter: true });
      await page.waitForTimeout(900);
      Object.assign(report.interactions.languageSwitcher, {
        returnURL: page.url(),
        returnLang: await page.locator('html').getAttribute('lang'),
      });
    }
  }

  await page.goto(homeURL);
  await settle(page);
  const searchButton = page.locator('button').filter({ has: page.locator('svg') }).filter({ hasText: /^$/ }).nth(0);
  const labelledSearch = page.locator('button[aria-label*="earch" i], button[title*="earch" i]').first();
  const targetSearch = await labelledSearch.count() ? labelledSearch : searchButton;
  if (await targetSearch.count()) {
    await targetSearch.click();
    await page.waitForTimeout(300);
    report.interactions.search = {
      visible: await targetSearch.isVisible(),
      dialogs: await page.locator('[role="dialog"], dialog').count(),
      textInputs: await page.locator('input[type="search"], input[placeholder*="Search" i]').count(),
    };
    await page.screenshot({ path: path.join(outputDir, 'search-open.png'), fullPage: false });
    const searchInput = page.locator('input[placeholder*="Search" i], input[type="search"]').first();
    if (await searchInput.isVisible()) {
      await searchInput.fill('HEAR');
      await page.waitForTimeout(1400);
      Object.assign(report.interactions.search, {
        query: await searchInput.inputValue(),
        visibleResults: await page.locator('.search-result:visible').count(),
      });
      await page.screenshot({ path: path.join(outputDir, 'search-results.png'), fullPage: false });
    }
    await page.keyboard.press('Escape');
  }

  const themeButton = page.locator('button.theme-toggle, button[aria-label*="theme" i], button[title*="appearance" i], button[aria-label*="dark" i], button[title*="dark" i]').first();
  if (await themeButton.count()) {
    const before = await page.locator('html').getAttribute('class');
    await themeButton.click();
    await page.waitForTimeout(250);
    const after = await page.locator('html').getAttribute('class');
    report.interactions.theme = { before, after, changed: before !== after };
    await page.screenshot({ path: path.join(outputDir, 'home-dark-desktop.png'), fullPage: true });
    await captureSections(page, 'dark-desktop');
  }

  report.interactions.headerNavigation = {};
  for (const { name, target } of [
    { name: 'About', target: 'about' },
    { name: 'Research', target: 'research' },
    { name: 'Projects', target: 'engineering-projects' },
    { name: 'Selected Work', target: 'papers' },
    { name: 'Contact', target: 'contact' },
  ]) {
    await page.goto(homeURL);
    await settle(page);
    const navLink = page.getByRole('link', { name, exact: true }).first();
    if (!await navLink.count()) continue;
    await localizeClickTarget(navLink);
    await navLink.click();
    await page.waitForTimeout(400);
    const headerBox = await page.locator('#site-header').boundingBox();
    const targetBox = await page.locator(`#${target}`).boundingBox();
    report.interactions.headerNavigation[name] = {
      url: page.url(),
      target,
      targetTop: targetBox?.y,
      headerHeight: headerBox?.height,
      visibleBelowHeader: Boolean(targetBox && headerBox && targetBox.y >= headerBox.height - 1),
    };
  }

  await page.goto(homeURL);
  await settle(page);
  const publicationsNav = page.getByRole('link', { name: 'Publications', exact: true }).first();
  if (await publicationsNav.count()) {
    await localizeClickTarget(publicationsNav);
    await publicationsNav.click();
    await settle(page);
    report.interactions.publicationsNavigation = {
      url: page.url(),
      statusTitle: await page.title(),
      publicationCards: await page.locator('.publication-rich-item, [role="article"]').count(),
    };
  }

  await page.goto(homeURL);
  await settle(page);
  const videos = page.locator('video');
  report.interactions.videos = [];
  for (let index = 0; index < await videos.count(); index += 1) {
    const video = videos.nth(index);
    await video.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    report.interactions.videos.push(await video.evaluate(async (element, videoIndex) => {
      const beforePaused = element.paused;
      let playError = null;
      if (element.readyState === 0) element.load();
      if (element.paused) {
        element.play().catch((error) => {
          playError = error.message;
        });
      }
      const deadline = Date.now() + 20_000;
      while (Date.now() < deadline && !(element.readyState >= 2 && element.currentTime > 0.1)) {
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
      return {
        index: videoIndex,
        label: element.getAttribute('aria-label'),
        beforePaused,
        afterPaused: element.paused,
        readyState: element.readyState,
        currentTime: element.currentTime,
        playbackObserved: element.readyState >= 2 && element.currentTime > 0.1,
        error: element.error?.message || playError,
      };
    }, index));
    await video.evaluate((element) => element.pause());
  }

  await page.goto(homeURL);
  await settle(page);
  const projectLink = page.locator('.project-feature-link').first();
  if (await projectLink.count()) {
    await localizeClickTarget(projectLink);
    await projectLink.click();
    await settle(page);
    report.interactions.engineeringProject = {
      url: page.url(),
      h1: await page.locator('h1').first().textContent(),
      systemStages: await page.locator('.project-system-map__stage').count(),
      ownedSystemStages: await page.locator('.project-system-map__stage.is-owned').count(),
      pipelineStages: await page.locator('.project-pipeline__stage').count(),
      comparisons: await page.locator('.project-comparison').count(),
      videos: await page.locator('.project-video-card video').count(),
      shareActions: await page.locator('.paper-share__button').count(),
      techArticleJsonLd: await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) => scripts.some((script) => {
        try { return JSON.parse(script.textContent)['@type'] === 'TechArticle'; } catch { return false; }
      })),
    };
    await page.screenshot({ path: path.join(outputDir, 'project-sfm-desktop.png'), fullPage: true });
  }

  await page.goto(new URL('projects/mower/', auditBase).href);
  await settle(page);
  const mowerDiagrams = page.locator('.project-figure--diagram img[src$="-en.svg"]');
  for (let index = 0; index < await mowerDiagrams.count(); index += 1) {
    const diagram = mowerDiagrams.nth(index);
    await diagram.scrollIntoViewIfNeeded();
    await diagram.evaluate((image) => image.complete && image.naturalWidth > 0
      ? true
      : new Promise((resolve) => {
          image.addEventListener('load', () => resolve(true), { once: true });
          image.addEventListener('error', () => resolve(false), { once: true });
        }));
  }
  const mowerVideoBox = await page.locator('.project-video-card video').first().boundingBox();
  const mowerGalleryBox = await page.locator('.project-video-gallery').first().boundingBox();
  report.interactions.mowerProject = {
    url: page.url(),
    h1: await page.locator('h1').first().textContent(),
    featuredImage: await page.locator('.featured-image').first().getAttribute('src'),
    englishDiagrams: await mowerDiagrams.count(),
    diagramSizes: await mowerDiagrams.evaluateAll((images) => images.map((image) => ({
      width: image.clientWidth,
      height: image.clientHeight,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
    }))),
    videos: await page.locator('.project-video-card video').count(),
    singleVideoLayout: await page.locator('.project-video-gallery.is-single').count(),
    videoWidth: mowerVideoBox?.width,
    galleryWidth: mowerGalleryBox?.width,
  };
  await page.locator('.article-header').first().screenshot({ path: path.join(outputDir, 'project-mower-cover.png') });
  await page.locator('.project-figure--diagram').nth(0).screenshot({ path: path.join(outputDir, 'project-mower-pointcloud-diagram.png') });
  await page.locator('.project-figure--diagram').nth(1).screenshot({ path: path.join(outputDir, 'project-mower-fusion-diagram.png') });
  await page.locator('.project-video-gallery').screenshot({ path: path.join(outputDir, 'project-mower-video.png') });
  await page.screenshot({ path: path.join(outputDir, 'project-mower-desktop.png'), fullPage: true });

  await page.goto(new URL('zh/projects/mower/', auditBase).href);
  await settle(page);
  report.interactions.mowerProjectZh = {
    url: page.url(),
    lang: await page.locator('html').getAttribute('lang'),
    englishDiagrams: await page.locator('.project-figure--diagram img[src$="-en.svg"]').count(),
    englishSystemMap: await page.locator('.mower-system-map').getByText('Onboard sensing and compute', { exact: true }).count(),
    videos: await page.locator('.project-video-card video').count(),
    singleVideoLayout: await page.locator('.project-video-gallery.is-single').count(),
  };
  await page.screenshot({ path: path.join(outputDir, 'project-mower-zh-desktop.png'), fullPage: true });

  await page.goto(homeURL);
  await settle(page);
  report.interactions.contact = await page.locator('#contact a[href^="mailto:"]').first().evaluate((link) => ({
    href: link.href,
    text: link.textContent?.trim(),
    visible: Boolean(link.offsetWidth || link.offsetHeight || link.getClientRects().length),
  }));

  await context.close();
}

{
  const { context, page } = await makePage({ width: 390, height: 844 });
  await page.goto(homeURL);
  await settle(page);
  report.views.mobile = {
    url: page.url(),
    title: await page.title(),
    lang: await page.locator('html').getAttribute('lang'),
    scrollHeight: await page.evaluate(() => document.documentElement.scrollHeight),
    bodyScrollWidth: await page.evaluate(() => document.body.scrollWidth),
    controls: await inventory(page),
  };
  await page.screenshot({ path: path.join(outputDir, 'home-mobile.png'), fullPage: true });
  await captureSections(page, 'mobile');

  const menuButton = page.locator('label[for="nav-toggle"], button[aria-label*="menu" i], button[title*="menu" i]').first();
  if (await menuButton.count()) {
    await menuButton.click();
    await page.waitForTimeout(250);
    report.interactions.mobileMenu = {
      visible: await menuButton.isVisible(),
      expanded: await page.locator('#nav-menu').isVisible(),
    };
    await page.screenshot({ path: path.join(outputDir, 'mobile-menu-open.png'), fullPage: false });
    await menuButton.click();
  }

  const mobileThemeButton = page.locator('button.theme-toggle, button[aria-label*="theme" i], button[title*="appearance" i], button[aria-label*="dark" i], button[title*="dark" i]').first();
  if (await mobileThemeButton.count()) {
    await mobileThemeButton.click();
    await page.waitForTimeout(250);
    report.interactions.mobileTheme = {
      dark: await page.locator('html').evaluate((element) => element.classList.contains('dark')),
    };
    await page.screenshot({ path: path.join(outputDir, 'home-dark-mobile.png'), fullPage: true });
    await captureSections(page, 'dark-mobile');
  }

  await page.goto(new URL('projects/sfm/', auditBase).href);
  await settle(page);
  report.views.projectMobile = {
    url: page.url(),
    title: await page.title(),
    lang: await page.locator('html').getAttribute('lang'),
    scrollHeight: await page.evaluate(() => document.documentElement.scrollHeight),
    bodyScrollWidth: await page.evaluate(() => document.body.scrollWidth),
    clientWidth: await page.evaluate(() => document.documentElement.clientWidth),
    videos: await page.locator('.project-video-card video').count(),
  };
  await page.screenshot({ path: path.join(outputDir, 'project-sfm-mobile.png'), fullPage: true });

  await page.goto(new URL('projects/mower/', auditBase).href);
  await settle(page);
  const mowerMobileVideoBox = await page.locator('.project-video-card video').first().boundingBox();
  const mowerMobileGalleryBox = await page.locator('.project-video-gallery').first().boundingBox();
  report.views.mowerProjectMobile = {
    url: page.url(),
    title: await page.title(),
    lang: await page.locator('html').getAttribute('lang'),
    scrollHeight: await page.evaluate(() => document.documentElement.scrollHeight),
    bodyScrollWidth: await page.evaluate(() => document.body.scrollWidth),
    clientWidth: await page.evaluate(() => document.documentElement.clientWidth),
    englishDiagrams: await page.locator('.project-figure--diagram img[src$="-en.svg"]').count(),
    videos: await page.locator('.project-video-card video').count(),
    videoWidth: mowerMobileVideoBox?.width,
    galleryWidth: mowerMobileGalleryBox?.width,
  };
  await page.screenshot({ path: path.join(outputDir, 'project-mower-mobile.png'), fullPage: true });
  await context.close();
}

report.consoleErrors = [...new Set(report.consoleErrors)];
report.pageErrors = [...new Set(report.pageErrors)];
report.failedRequests = [...new Map(report.failedRequests.map((item) => [item.url, item])).values()];
await fs.writeFile(path.join(outputDir, 'audit.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({
  outputDir,
  consoleErrors: report.consoleErrors.length,
  pageErrors: report.pageErrors.length,
  failedRequests: report.failedRequests.length,
  brokenInternalLinks: report.internalLinks.filter(({ status }) => status >= 400),
  interactions: report.interactions,
  views: Object.fromEntries(Object.entries(report.views).map(([key, view]) => [key, {
    url: view.url,
    lang: view.lang,
    scrollHeight: view.scrollHeight,
    bodyScrollWidth: view.bodyScrollWidth,
  }])),
}, null, 2));
await browser.close();
