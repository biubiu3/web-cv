import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const baseURL = new URL(process.env.SITE_URL || 'http://127.0.0.1:1313/web-cv/');
const canonicalBaseURL = new URL(process.env.SITE_CANONICAL_BASE_URL || baseURL.href);
const label = process.env.AUDIT_LABEL || 'seo-review';
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
    // Try the next cached browser.
  }
}

const proxy = process.env.PLAYWRIGHT_PROXY_SERVER ? {
  server: process.env.PLAYWRIGHT_PROXY_SERVER,
  username: process.env.PLAYWRIGHT_PROXY_USERNAME,
  password: process.env.PLAYWRIGHT_PROXY_PASSWORD,
  bypass: process.env.PLAYWRIGHT_PROXY_BYPASS || '127.0.0.1,localhost',
} : undefined;

const publications = {
  tgl: ['Nie Chang', 'Zhe Liu', 'Hesheng Wang'],
  diffsac: ['Nie Chang', 'Guangming Wang', 'Zhe Liu', 'Hesheng Wang'],
  hear: ['Nie Chang', 'Tianchen Deng', 'Guangming Wang', 'Zhe Liu', 'Hesheng Wang'],
  mrasfm: ['Nie Chang', 'Lingfeng Xuan', 'Yiqing Xu', 'Zhe Liu', 'Yanzi Miao', 'Hesheng Wang'],
  mid: ['Nie Chang', 'Tianchen Deng', 'Zhe Liu', 'Hesheng Wang'],
  movsam: ['Nie Chang', 'Yiqing Xu', 'Guangming Wang', 'Zhe Liu', 'Yanzi Miao', 'Hesheng Wang'],
  'vcgs-slam': ['Tianchen Deng', 'Nie Chang', 'Shuhong Liu', 'Wenhua Wu', 'Jianfei Yang', 'Shenghai Yuan', 'Jiuming Liu', 'Zhe Liu', 'Danwei Wang', 'Hesheng Wang'],
  ermv: ['Nie Chang', 'Guangming Wang', 'Zhe Liu', 'Hesheng Wang'],
  rlsac: ['Nie Chang', 'Guangming Wang', 'Zhe Liu', 'Luca Cavalli', 'Marc Pollefeys', 'Hesheng Wang'],
};

const route = (relative) => new URL(relative.replace(/^\//, ''), baseURL).href;
const canonicalRoute = (relative) => new URL(relative.replace(/^\//, ''), canonicalBaseURL).href;
const pageRoutes = [
  '',
  'zh/',
  'publications/',
  'zh/publications/',
  'projects/',
  'zh/projects/',
  'projects/sfm/',
  'zh/projects/sfm/',
  'projects/mower/',
  'zh/projects/mower/',
  ...Object.keys(publications).map((slug) => `publications/${slug}/`),
];

const browser = await chromium.launch({ headless: true, executablePath, proxy });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  colorScheme: 'light',
  reducedMotion: 'reduce',
});
const page = await context.newPage();
const report = {
  baseURL: baseURL.href,
  generatedAt: new Date().toISOString(),
  resources: {},
  pages: [],
  failures: [],
};

function requireValue(condition, message, details = {}) {
  if (!condition) report.failures.push({ message, ...details });
}

for (const resource of ['robots.txt', 'llms.txt', 'llms-full.txt', 'sitemap.xml']) {
  const url = route(resource);
  const response = await context.request.get(url);
  const text = await response.text();
  report.resources[resource] = { url, status: response.status(), length: text.length };
  requireValue(response.ok(), `${resource} did not return HTTP 200`, { url, status: response.status() });
  if (resource === 'robots.txt') {
    requireValue(/User-agent:\s*OAI-SearchBot/i.test(text), 'robots.txt does not explicitly allow OAI-SearchBot');
    requireValue(/Sitemap:\s*https?:\/\//i.test(text), 'robots.txt does not advertise an absolute sitemap URL');
  }
  if (resource === 'llms.txt') {
    requireValue(text.startsWith('# Nie Chang'), 'llms.txt does not start with the expected H1');
    requireValue(text.includes('Large Language Model (LLM) & Vision Language Model (VLM)'), 'llms.txt is missing the requested LLM/VLM interest');
    requireValue(text.includes('Vision-Language-Action Model (VLA)'), 'llms.txt is missing the requested VLA interest');
    for (const slug of Object.keys(publications)) {
      requireValue(text.includes(`/publications/${slug}/`), `llms.txt is missing publication ${slug}`);
    }
    requireValue(text.includes('/projects/mower/'), 'llms.txt is missing the autonomous lawn robot project');
  }
  if (resource === 'sitemap.xml') {
    requireValue(text.includes(canonicalRoute('en/sitemap.xml')), 'Sitemap index is missing the English sitemap');
    requireValue(text.includes(canonicalRoute('zh/sitemap.xml')), 'Sitemap index is missing the Chinese sitemap');
  }
}

for (const relative of pageRoutes) {
  const url = route(relative);
  const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await page.waitForTimeout(120);
  const state = await page.evaluate(() => {
    const metas = (name) => [...document.querySelectorAll(`meta[name="${name}"]`)].map((meta) => meta.content);
    const jsonLD = [...document.querySelectorAll('script[type="application/ld+json"]')].map((script) => {
      try {
        return JSON.parse(script.textContent);
      } catch (error) {
        return { parseError: error.message };
      }
    });
    return {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content || '',
      canonical: document.querySelector('link[rel="canonical"]')?.href || '',
      lang: document.documentElement.lang,
      robots: document.querySelector('meta[name="robots"]')?.content || '',
      h1: [...document.querySelectorAll('h1')].map((node) => node.textContent.trim()),
      hreflang: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((link) => ({ lang: link.hreflang, href: link.href })),
      emptyImageAltCount: [...document.images].filter((image) => !image.hasAttribute('alt') || !image.alt.trim()).length,
      jsonLD,
      citation: {
        title: metas('citation_title'),
        authors: metas('citation_author'),
        date: metas('citation_publication_date'),
        publicURL: metas('citation_public_url'),
        abstract: metas('citation_abstract'),
        pdfURL: metas('citation_pdf_url'),
      },
      visibleText: document.body.innerText,
    };
  });
  const result = { relative, url, status: response?.status() || null, ...state };
  delete result.visibleText;
  report.pages.push(result);

  requireValue(response?.ok(), 'Page did not return HTTP 200', { relative, status: response?.status() });
  requireValue(state.title.length > 0, 'Page title is empty', { relative });
  const minimumDescriptionLength = state.lang.toLowerCase().startsWith('zh') ? 25 : 50;
  requireValue(state.description.length >= minimumDescriptionLength, 'Meta description is missing or too short', { relative, length: state.description.length });
  requireValue(state.canonical.startsWith(canonicalBaseURL.href), 'Canonical URL is missing or outside the expected production base', { relative, canonical: state.canonical });
  requireValue(state.lang.length > 0, 'HTML language is missing', { relative });
  requireValue(/index/i.test(state.robots), 'Indexing robots meta is missing', { relative, robots: state.robots });
  requireValue(state.emptyImageAltCount === 0, 'Rendered images without descriptive alt text were found', { relative, count: state.emptyImageAltCount });
  requireValue(state.jsonLD.every((item) => !item.parseError), 'Invalid JSON-LD found', { relative });

  if (relative === '' || relative === 'zh/') {
    requireValue(state.h1.length === 1, 'Homepage should have exactly one H1', { relative, h1: state.h1 });
    requireValue(state.hreflang.some((item) => item.lang === 'x-default'), 'Homepage is missing x-default hreflang', { relative });
    const profile = state.jsonLD.find((item) => item['@type'] === 'ProfilePage');
    requireValue(Boolean(profile), 'Homepage is missing ProfilePage structured data', { relative });
    requireValue(profile?.mainEntity?.['@type'] === 'Person', 'ProfilePage mainEntity is not a Person', { relative });
  }

  const publicationMatch = relative.match(/^publications\/([^/]+)\/$/);
  if (publicationMatch) {
    const slug = publicationMatch[1];
    requireValue(state.h1.length === 1, 'Publication page should have exactly one H1', { relative, h1: state.h1 });
    requireValue(state.citation.title.length === 1, 'Publication is missing citation_title', { relative });
    requireValue(JSON.stringify(state.citation.authors) === JSON.stringify(publications[slug]), 'Publication citation_author tags do not match the complete author list', { relative, expected: publications[slug], actual: state.citation.authors });
    requireValue(/^20\d{2}\/\d{2}\/\d{2}$/.test(state.citation.date[0] || ''), 'Publication is missing a valid citation_publication_date', { relative, date: state.citation.date });
    requireValue(state.citation.publicURL[0] === state.canonical, 'citation_public_url does not match canonical URL', { relative, citationURL: state.citation.publicURL[0], canonical: state.canonical });
    requireValue(state.citation.abstract[0]?.length >= 120, 'Publication citation abstract is missing or too short', { relative });
    requireValue(state.citation.pdfURL[0]?.startsWith('https://arxiv.org/pdf/'), 'Publication is missing an arXiv citation_pdf_url', { relative });
    requireValue(/\bAbstract\b/.test(state.visibleText), 'Publication abstract is not visibly rendered', { relative });
  }

  if (/^(zh\/)?projects\/(sfm|mower)\/$/.test(relative)) {
    const project = state.jsonLD.find((item) => item['@type'] === 'TechArticle');
    requireValue(Boolean(project), 'Project page is missing TechArticle structured data', { relative });
    requireValue(state.h1.length === 1, 'Project page should have exactly one H1', { relative, h1: state.h1 });
  }

  if (/^(zh\/)?projects\/sfm\/$/.test(relative)) {
    requireValue(state.visibleText.includes('MRASfM'), 'SFM project page is missing the related-paper connection', { relative });
  }
}

await page.screenshot({ path: path.join(outputDir, 'seo-home.png'), fullPage: true });
await context.close();
await browser.close();

await fs.writeFile(path.join(outputDir, 'seo-audit.json'), JSON.stringify(report, null, 2));
if (report.failures.length) {
  console.error(JSON.stringify(report.failures, null, 2));
  process.exitCode = 1;
} else {
  console.log(`SEO audit passed for ${report.pages.length} rendered pages and ${Object.keys(report.resources).length} discovery resources.`);
}
