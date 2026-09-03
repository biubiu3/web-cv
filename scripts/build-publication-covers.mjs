import { readFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = fileURLToPath(new URL('..', import.meta.url));
const outputRoot = join(root, 'artifacts', 'publication-covers');
const coverPath = join(root, 'content', 'publications', 'hear', 'featured.png');

mkdirSync(outputRoot, { recursive: true });

function dataUri(absolutePath, mime) {
  return `data:${mime};base64,${readFileSync(absolutePath).toString('base64')}`;
}

const font = dataUri(join(root, 'assets', 'dist', 'font', 'SpaceGrotesk.var.ttf'), 'font/ttf');
const base = dataUri(
  join(root, 'assets', 'media', 'paper-covers', 'hear-editorial-base-v1.png'),
  'image/png',
);

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <style>
      @font-face {
        font-family: "Cover Sans";
        src: url(${font}) format("truetype");
        font-display: block;
      }
      * { box-sizing: border-box; }
      html, body {
        width: 1600px;
        height: 900px;
        margin: 0;
        overflow: hidden;
      }
      body {
        background: #eee9dd;
        color: #273238;
        font-family: "Cover Sans", Arial, sans-serif;
      }
      main {
        position: relative;
        width: 1600px;
        height: 900px;
        overflow: hidden;
      }
      .base {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .stage {
        position: absolute;
        top: 12px;
        z-index: 2;
        text-align: center;
        text-shadow:
          0 1px 0 rgb(255 255 255 / 95%),
          0 0 8px rgb(248 244 233 / 96%);
      }
      .stage strong {
        display: block;
        font-size: 24px;
        font-weight: 790;
        letter-spacing: .085em;
        line-height: 1;
      }
      .stage span {
        display: block;
        margin-top: 6px;
        font-size: 18px;
        font-weight: 580;
        letter-spacing: -.01em;
        line-height: 1;
        white-space: nowrap;
      }
      .historizer { left: 0; width: 312px; }
      .historizer strong { color: #a84827; }
      .envisioner { left: 390px; width: 380px; }
      .envisioner strong { color: #356384; }
      .advancer { left: 815px; width: 380px; }
      .advancer strong { color: #6c4a79; }
      .realizer { left: 1203px; width: 380px; }
      .realizer strong { color: #347573; }
    </style>
  </head>
  <body>
    <main aria-label="HEAR method overview">
      <img class="base" src="${base}" alt="">
      <div class="stage historizer">
        <strong>HISTORIZER</strong>
        <span>retains sound after it ends</span>
      </div>
      <div class="stage envisioner">
        <strong>ENVISIONER</strong>
        <span>identifies the scene and task stage</span>
      </div>
      <div class="stage advancer">
        <strong>ADVANCER</strong>
        <span>predicts near-future task audio</span>
      </div>
      <div class="stage realizer">
        <strong>REALIZER</strong>
        <span>generates the next continuous action</span>
      </div>
    </main>
  </body>
</html>`;

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 1,
  colorScheme: 'light',
});
const page = await context.newPage();

await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.waitForFunction(() => [...document.images].every((image) => image.complete));
await page.screenshot({ path: coverPath, type: 'png', animations: 'disabled' });
await page.screenshot({
  path: join(outputRoot, 'hear-editorial-sample.png'),
  type: 'png',
  animations: 'disabled',
});

await browser.close();
console.log(`Rendered HEAR editorial sample to ${coverPath}`);
