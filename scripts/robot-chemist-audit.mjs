import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const base = process.env.SITE_URL || 'http://127.0.0.1:4173/web-cv/';
const output = process.env.AUDIT_OUTPUT || 'artifacts/robot-chemist';
await fs.mkdir(output, { recursive: true });
const proxy = process.env.PLAYWRIGHT_PROXY_SERVER ? { server: process.env.PLAYWRIGHT_PROXY_SERVER, username: process.env.PLAYWRIGHT_PROXY_USERNAME, password: process.env.PLAYWRIGHT_PROXY_PASSWORD } : undefined;
const browser = await chromium.launch({ proxy, executablePath: '/root/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome', headless: true });
const page = await browser.newPage();
const report = [];
const errors = [];
page.on('pageerror', e => errors.push(e.message));
for (const width of [1440, 390]) {
  await page.setViewportSize({ width, height: 1000 });
  for (const lang of ['', 'zh/']) {
    const url = new URL(`${lang}projects/robot-chemist/`, base).href;
    console.log(`Checking ${width} ${lang || 'en'}`);
    const response = await page.goto(url, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    await page.locator('.chemist-skills').scrollIntoViewIfNeeded();
    await page.locator('.chemist-videos').scrollIntoViewIfNeeded();
    await page.evaluate(async () => {
      for (const image of document.images) image.loading = 'eager';
      await Promise.race([Promise.all([...document.images].map(i => i.decode().catch(() => {}))), new Promise(resolve => setTimeout(resolve, 10000))]);
    });
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('.chemist-skills img').count(), 3);
    assert.equal(await page.locator('.chemist-system-map').count(), 1);
    assert.equal(await page.locator('h2').filter({ hasText: /My contribution|我的工作/ }).count(), 0);
    assert.equal(await page.getByText('The architecture and research route above describe the wider project;', { exact: false }).count(), 0);
    const cover = page.locator('.article-header img').first();
    assert.match(await cover.getAttribute('src'), /featured/);
    assert.match(await cover.getAttribute('alt'), /Generated technical illustration|生成的技术示意图/);
    const animation = [];
    for (const gif of await page.locator('.chemist-skills img').all()) {
      assert.match(await gif.getAttribute('src'), /(?:beaker-transfer|slender-object-grasp|tube-placement)\.gif$/);
      await gif.scrollIntoViewIfNeeded();
      const first = await gif.screenshot();
      await page.waitForTimeout(700);
      const second = await gif.screenshot();
      assert.equal(first.equals(second), false, 'GIF must visibly advance, not render as a static first frame');
      animation.push({ src: await gif.getAttribute('src'), visiblyAnimated: true });
    }
    await page.locator('.chemist-skills').screenshot({ path: `${output}/${lang ? 'zh' : 'en'}-${width}-gifs.png` });
    await page.locator('.article-header').screenshot({ path: `${output}/${lang ? 'zh' : 'en'}-${width}-cover.png` });
    assert.equal(await page.locator('video').count(), 2);
    const media = [];
    for (const video of await page.locator('video').all()) {
      media.push(await video.evaluate(async v => {
        v.muted = true;
        await Promise.race([v.play(), new Promise((_, reject) => setTimeout(() => reject(new Error('Video play timeout')), 15000))]);
        await new Promise((resolve, reject) => {
          const timer = setTimeout(() => reject(new Error('Video did not advance')), 15000);
          const tick = () => { if (v.currentTime > .1) { clearTimeout(timer); v.removeEventListener('timeupdate', tick); resolve(); } };
          v.addEventListener('timeupdate', tick); tick();
        });
        v.pause();
        return { duration: v.duration, width: v.videoWidth, height: v.videoHeight, currentTime: v.currentTime };
      }));
    }
    const state = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      broken: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src),
    }));
    assert.equal(state.overflow, false);
    assert.deepEqual(state.broken, []);
    await page.screenshot({ path: `${output}/${lang ? 'zh' : 'en'}-${width}.png`, fullPage: true });
    if (width === 1440) {
      await page.locator('.chemist-system-map').screenshot({ path: `${output}/${lang ? 'zh' : 'en'}-architecture.png` });
      await page.locator('.chemist-videos').screenshot({ path: `${output}/${lang ? 'zh' : 'en'}-videos.png` });
    }
    report.push({ url, width, ...state, media, animation });
    await page.goto(new URL(`${lang}projects/`, base).href);
    assert.equal(await page.locator('.project-feature-card').count(), 5);
    assert.equal(await page.locator('.project-feature-card h2 a').filter({ hasText: /A Robotic Chemist|机器人化学家/ }).count(), 1);
  }
}
assert.deepEqual(errors, []);
await fs.writeFile(`${output}/browser-report.json`, JSON.stringify({ passed: true, errors, report }, null, 2));
console.log(JSON.stringify({ passed: true, pages: report.length, videoPlaybackChecks: report.length * 2, animatedGifChecks: report.length * 3 }));
await browser.close();
