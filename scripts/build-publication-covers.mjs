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
  join(root, 'assets', 'media', 'paper-covers', 'hear-concrete-compact-base-v5.png'),
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
        background: #fff;
        color: #26364a;
        font-family: "Cover Sans", Arial, sans-serif;
      }
      main {
        position: relative;
        width: 1600px;
        height: 900px;
        overflow: hidden;
        background: #fff;
      }
      .base {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .identity {
        position: absolute;
        z-index: 2;
        left: 32px;
        top: 20px;
        line-height: 1;
      }
      .identity strong {
        display: block;
        color: #1e3a5f;
        font-size: 33px;
        font-weight: 820;
        letter-spacing: .09em;
      }
      .identity span {
        display: block;
        margin-top: 7px;
        color: #506176;
        font-size: 14px;
        font-weight: 680;
        letter-spacing: .065em;
      }
      .premise {
        position: absolute;
        z-index: 2;
        left: 300px;
        top: 27px;
        width: 1000px;
        text-align: center;
        color: #334155;
        background: rgb(255 255 255 / 94%);
        font-size: 21px;
        font-weight: 680;
        line-height: 1.2;
      }
      .premise span {
        color: #2563b8;
        font-weight: 760;
      }
      .label {
        position: absolute;
        z-index: 2;
        padding: 3px 8px 5px;
        background: rgb(255 255 255 / 96%);
        line-height: 1;
      }
      .label strong {
        display: block;
        font-size: 24px;
        font-weight: 820;
        letter-spacing: .065em;
      }
      .label span {
        display: block;
        margin-top: 5px;
        color: #4b5b6e;
        font-size: 16px;
        font-weight: 630;
        letter-spacing: .002em;
        white-space: nowrap;
      }
      .event { left: 303px; top: 330px; }
      .event strong { color: #dc3159; }
      .historizer {
        left: 430px;
        top: 387px;
        width: 430px;
        text-align: center;
      }
      .historizer strong { color: #2563b8; }
      .envisioner {
        left: 790px;
        top: 335px;
        width: 340px;
        text-align: center;
      }
      .envisioner strong { color: #098f83; }
      .envisioner span { font-size: 14px; }
      .realizer {
        left: 1135px;
        top: 363px;
        width: 300px;
        text-align: center;
      }
      .realizer strong { color: #d92752; }
      .advancer {
        left: 720px;
        top: 650px;
        width: 590px;
        text-align: center;
      }
      .advancer strong {
        color: #ad6900;
      }
      .bei {
        position: absolute;
        z-index: 2;
        left: 430px;
        top: 579px;
        width: 430px;
        padding-top: 7px;
        border-top: 2px dashed #a8b3c2;
        text-align: center;
        color: #64748b;
      }
      .bei strong {
        display: block;
        font-size: 18px;
        font-weight: 800;
        letter-spacing: .08em;
      }
      .bei span {
        display: block;
        margin-top: 4px;
        font-size: 15px;
        font-weight: 620;
      }
      .sound-types {
        left: 36px;
        top: 650px;
        width: 590px;
        text-align: center;
      }
      .sound-types strong { color: #415a78; }
      .outcome {
        position: absolute;
        z-index: 2;
        left: 1437px;
        top: 385px;
        width: 166px;
        text-align: center;
        color: #26364a;
        background: rgb(255 255 255 / 94%);
        font-size: 19px;
        font-weight: 810;
        letter-spacing: .06em;
      }
    </style>
  </head>
  <body>
    <main aria-label="HEAR graphical abstract">
      <img class="base" src="${base}" alt="">

      <div class="identity">
        <strong>HEAR</strong>
        <span>VISION · SOUND · LANGUAGE · ACTION</span>
      </div>
      <div class="premise">
        A brief sound can disappear before the next policy query. <span>HEAR preserves it until the action can change.</span>
      </div>

      <div class="label event">
        <strong>EVENT DURING EXECUTION</strong>
        <span>a cue arrives mid-action</span>
      </div>
      <div class="label historizer">
        <strong>HISTORIZER</strong>
        <span>raw sound ends; event evidence persists</span>
      </div>
      <div class="label envisioner">
        <strong>ENVISIONER</strong>
        <span>interpret sound, vision, instruction, and state</span>
      </div>
      <div class="label realizer">
        <strong>REALIZER</strong>
        <span>generate a smooth action chunk</span>
      </div>
      <div class="label advancer">
        <strong>ADVANCER · TRAINING ONLY</strong>
        <span>predict future audio to learn temporal progress</span>
      </div>
      <div class="bei">
        <strong>BLIND EXECUTION INTERVAL</strong>
        <span>memory survives the sensing-to-action gap</span>
      </div>
      <div class="label sound-types">
        <strong>SOUND-CENTRIC EVENTS</strong>
        <span>speech · trigger · process · contact</span>
      </div>
      <div class="outcome">CHANGED ACTION</div>
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
  path: join(outputRoot, 'hear-concrete-compact-sample.png'),
  type: 'png',
  animations: 'disabled',
});

await browser.close();
console.log(`Rendered HEAR concrete compact sample to ${coverPath}`);
