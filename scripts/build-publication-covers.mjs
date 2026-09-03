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
  join(root, 'assets', 'media', 'paper-covers', 'hear-concept-reconstruction-base-v4.png'),
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
        left: 38px;
        top: 28px;
        line-height: 1;
      }
      .identity strong {
        display: block;
        color: #1e3a5f;
        font-size: 34px;
        font-weight: 820;
        letter-spacing: .09em;
      }
      .identity span {
        display: block;
        margin-top: 8px;
        color: #506176;
        font-size: 16px;
        font-weight: 680;
        letter-spacing: .055em;
      }
      .premise {
        position: absolute;
        z-index: 2;
        left: 38px;
        top: 98px;
        width: 620px;
        color: #334155;
        font-size: 22px;
        font-weight: 680;
        line-height: 1.28;
      }
      .premise span {
        color: #2563b8;
        font-weight: 760;
      }
      .label {
        position: absolute;
        z-index: 2;
        padding: 4px 9px 6px;
        background: rgb(255 255 255 / 94%);
        line-height: 1;
      }
      .label strong {
        display: block;
        font-size: 22px;
        font-weight: 820;
        letter-spacing: .065em;
      }
      .label span {
        display: block;
        margin-top: 6px;
        color: #4b5b6e;
        font-size: 16px;
        font-weight: 630;
        letter-spacing: .002em;
        white-space: nowrap;
      }
      .event { left: 287px; top: 284px; }
      .event strong { color: #dc3159; }
      .historizer { left: 500px; top: 326px; }
      .historizer strong { color: #2563b8; }
      .envisioner {
        left: 758px;
        top: 35px;
        width: 540px;
        text-align: center;
      }
      .envisioner strong { color: #098f83; }
      .realizer { left: 1108px; top: 275px; }
      .realizer strong { color: #d92752; }
      .advancer {
        left: 902px;
        top: 560px;
        width: 508px;
        text-align: center;
      }
      .advancer strong {
        color: #ad6900;
      }
      .bei {
        position: absolute;
        z-index: 2;
        left: 474px;
        top: 514px;
        width: 486px;
        padding-top: 9px;
        border-top: 2px dashed #a8b3c2;
        text-align: center;
        color: #64748b;
      }
      .bei strong {
        display: block;
        font-size: 17px;
        font-weight: 800;
        letter-spacing: .08em;
      }
      .bei span {
        display: block;
        margin-top: 4px;
        font-size: 15px;
        font-weight: 620;
      }
      .outcome {
        position: absolute;
        z-index: 2;
        left: 1371px;
        top: 252px;
        width: 205px;
        text-align: center;
        color: #26364a;
        background: rgb(255 255 255 / 94%);
        font-size: 18px;
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
        <span>SOUND-CENTRIC MANIPULATION UNDER DELAYED DECISIONS</span>
      </div>
      <div class="premise">
        A transient sound can end before the policy listens again.<br>
        <span>Causal memory lets it change the next action.</span>
      </div>

      <div class="label event">
        <strong>EVENT DURING EXECUTION</strong>
        <span>the acoustic cue is brief</span>
      </div>
      <div class="label historizer">
        <strong>HISTORIZER</strong>
        <span>carry evidence after the waveform ends</span>
      </div>
      <div class="label envisioner">
        <strong>ENVISIONER</strong>
        <span>remembered sound + vision + instruction + robot state</span>
      </div>
      <div class="label realizer">
        <strong>REALIZER</strong>
        <span>turn the decision into a smooth action chunk</span>
      </div>
      <div class="label advancer">
        <strong>ADVANCER · TRAINING ONLY</strong>
        <span>predict future audio to learn temporal progress</span>
      </div>
      <div class="bei">
        <strong>BLIND EXECUTION INTERVAL</strong>
        <span>raw sound is gone; remembered evidence remains</span>
      </div>
      <div class="outcome">NEXT ROBOT ACTION</div>
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
  path: join(outputRoot, 'hear-concept-reconstruction-sample.png'),
  type: 'png',
  animations: 'disabled',
});

await browser.close();
console.log(`Rendered HEAR concept-reconstruction sample to ${coverPath}`);
