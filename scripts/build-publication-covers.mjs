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
  join(root, 'assets', 'media', 'paper-covers', 'hear-graphical-abstract-base-v2.png'),
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
        left: 34px;
        top: 17px;
        background: rgb(255 255 255 / 96%);
        line-height: 1;
      }
      .identity strong {
        display: block;
        color: #1e3a5f;
        font-size: 28px;
        font-weight: 820;
        letter-spacing: .09em;
      }
      .identity span {
        display: block;
        margin-top: 6px;
        color: #506176;
        font-size: 15px;
        font-weight: 620;
        letter-spacing: .035em;
      }
      .bei {
        position: absolute;
        z-index: 2;
        left: 330px;
        top: 16px;
        width: 575px;
        text-align: center;
        color: #647185;
        background: rgb(255 255 255 / 94%);
        font-size: 18px;
        font-weight: 760;
        letter-spacing: .08em;
      }
      .timeline-note {
        position: absolute;
        z-index: 2;
        padding: 2px 7px;
        background: rgb(255 255 255 / 94%);
        font-size: 15px;
        font-weight: 720;
        letter-spacing: .035em;
        white-space: nowrap;
      }
      .cue { left: 500px; top: 166px; color: #dc3159; }
      .decision { left: 1020px; top: 105px; color: #26364a; }
      .input-label {
        position: absolute;
        z-index: 2;
        left: 35px;
        min-width: 150px;
        padding: 1px 7px;
        background: rgb(255 255 255 / 96%);
        color: #44546a;
        font-size: 17px;
        font-weight: 760;
        letter-spacing: .045em;
        line-height: 1;
      }
      .streaming { top: 244px; }
      .vision { top: 357px; }
      .instruction { top: 469px; }
      .state { top: 581px; }
      .module {
        position: absolute;
        z-index: 2;
        padding: 1px 11px 4px;
        text-align: center;
        background: rgb(255 255 255 / 97%);
        line-height: 1;
      }
      .module strong {
        display: block;
        font-size: 27px;
        font-weight: 820;
        letter-spacing: .055em;
      }
      .module span {
        display: block;
        margin-top: 5px;
        color: #4b5b6e;
        font-size: 17px;
        font-weight: 610;
        letter-spacing: .005em;
        white-space: nowrap;
      }
      .historizer { left: 320px; top: 247px; width: 328px; }
      .historizer strong { color: #2563b8; }
      .envisioner { left: 685px; top: 242px; width: 365px; }
      .envisioner strong { color: #098f83; }
      .realizer { left: 1082px; top: 249px; width: 276px; }
      .realizer strong { color: #d92752; }
      .advancer {
        left: 694px;
        top: 646px;
        width: 472px;
      }
      .advancer strong {
        color: #ad6900;
        font-size: 23px;
      }
      .advancer span { font-size: 16px; }
      .execution {
        position: absolute;
        z-index: 2;
        left: 1388px;
        top: 332px;
        width: 195px;
        padding: 2px 6px;
        text-align: center;
        background: rgb(255 255 255 / 96%);
        color: #26364a;
        font-size: 20px;
        font-weight: 810;
        letter-spacing: .05em;
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
      <div class="bei">BLIND EXECUTION INTERVAL</div>
      <div class="timeline-note cue">KEY SOUND OCCURS AND ENDS</div>
      <div class="timeline-note decision">CAUSAL MEMORY AT NEXT DECISION</div>

      <div class="input-label streaming">STREAMING AUDIO</div>
      <div class="input-label vision">MULTI-VIEW RGB</div>
      <div class="input-label instruction">INSTRUCTION</div>
      <div class="input-label state">ROBOT STATE</div>

      <div class="module historizer">
        <strong>HISTORIZER</strong>
        <span>persistent causal audio memory</span>
      </div>
      <div class="module envisioner">
        <strong>ENVISIONER</strong>
        <span>multimodal reasoning + control feature</span>
      </div>
      <div class="module realizer">
        <strong>REALIZER</strong>
        <span>flow-matched action chunk</span>
      </div>
      <div class="module advancer">
        <strong>ADVANCER · TRAINING ONLY</strong>
        <span>predict near-future audio for temporal grounding</span>
      </div>
      <div class="execution">ROBOT EXECUTION</div>
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
  path: join(outputRoot, 'hear-graphical-abstract-sample.png'),
  type: 'png',
  animations: 'disabled',
});

await browser.close();
console.log(`Rendered HEAR graphical-abstract sample to ${coverPath}`);
