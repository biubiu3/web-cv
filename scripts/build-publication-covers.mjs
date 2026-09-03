import { readFileSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = fileURLToPath(new URL('..', import.meta.url));
const publicationRoot = join(root, 'content', 'publications');
const outputRoot = join(root, 'artifacts', 'publication-covers');

mkdirSync(outputRoot, { recursive: true });

const mimeByExtension = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

function dataUri(relativePath) {
  const absolutePath = join(root, relativePath);
  const mime = mimeByExtension[extname(absolutePath).toLowerCase()];
  if (!mime) throw new Error(`Unsupported image type: ${absolutePath}`);
  return `data:${mime};base64,${readFileSync(absolutePath).toString('base64')}`;
}

const spaceGrotesk = readFileSync(join(root, 'assets/dist/font/SpaceGrotesk.var.ttf')).toString('base64');

const assets = Object.fromEntries(
  Object.entries({
    paper: 'assets/media/paper-covers/notebook-paper-generated.png',
    midImage: 'content/publications/mid/image-denoising.jpg',
    midGeometry: 'content/publications/mid/correspondence-denoising.jpg',
    midSignal: 'content/publications/mid/emg-results.jpg',
    midMri: 'content/publications/mid/mri-results.jpg',
    midProtein: 'content/publications/mid/protein-results.jpg',
    rlsacLine: 'content/publications/rlsac/line-refinement.jpg',
    rlsacState: 'content/publications/rlsac/state-transition.jpg',
    diffConfidence: 'content/publications/diffsac/confidence-diffusion.jpg',
    diffFundamental: 'content/publications/diffsac/fundamental-refinement.jpg',
    mraReconstruction: 'content/publications/mrasfm/real-reconstruction.jpg',
    mraRig: 'content/publications/mrasfm/camera-set-ba.jpg',
    mraAssembly: 'content/publications/mrasfm/multi-scene-aggregation.jpg',
    ermvSimulation: 'content/publications/ermv/simulation-editing.jpg',
    ermvRobot: 'content/publications/ermv/real-robot-results.jpg',
    movStreet: 'content/publications/movsam/language-ablation.jpg',
    movOcclusion: 'content/publications/movsam/occlusion-sequence.jpg',
    movReal: 'content/publications/movsam/real-world.jpg',
    hearMoka: 'content/publications/hear/moka-coffee.jpg',
    hearHistorizer: 'content/publications/hear/historizer.jpg',
    tglSkill: 'content/publications/tgl/skill-block.png',
    tglEcosystem: 'content/publications/tgl/learning-ecosystem.png',
  }).map(([name, path]) => [name, dataUri(path)]),
);

const commonCss = `
  @font-face {
    font-family: "Space Grotesk Cover";
    src: url(data:font/ttf;base64,${spaceGrotesk}) format("truetype");
    font-display: block;
  }
  * { box-sizing: border-box; }
  html, body { width: 1600px; height: 900px; margin: 0; overflow: hidden; }
  body { font-family: "Space Grotesk Cover", Arial, sans-serif; }
  .cover { position: relative; width: 1600px; height: 900px; overflow: hidden; }
  .kicker { font-size: 23px; font-weight: 760; letter-spacing: .15em; text-transform: uppercase; }
  .tagline { font-size: 37px; font-weight: 580; line-height: 1.16; letter-spacing: -.025em; }
  .cover-title { margin: 0; font-size: 126px; font-weight: 780; line-height: .9; letter-spacing: -.075em; }
  .source-note { font-size: 18px; font-weight: 650; letter-spacing: .06em; text-transform: uppercase; }
  img { display: block; }
`;

function doc(css, body) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${commonCss}${css}</style></head><body>${body}</body></html>`;
}

const covers = [
  {
    slug: 'mid',
    html: doc(`
      .mid { color: #19344b; background: #f2eedf url(${assets.paper}) center / cover; }
      .mid::after { position: absolute; inset: 22px; border: 2px solid #18364a; content: ""; pointer-events: none; }
      .mid-copy { position: absolute; z-index: 3; left: 72px; top: 67px; width: 700px; }
      .mid .kicker { color: #a2462e; }
      .mid .cover-title { margin-top: 38px; font-family: Georgia, serif; font-size: 176px; font-style: italic; font-weight: 700; letter-spacing: -.09em; }
      .mid .tagline { width: 650px; margin-top: 23px; font-family: Georgia, serif; font-size: 39px; font-weight: 400; }
      .mid-cards { position: absolute; z-index: 2; right: 65px; top: 58px; display: grid; grid-template-columns: 245px 245px; gap: 17px; width: 507px; transform: rotate(-1deg); }
      .mid-card { position: relative; height: 205px; overflow: hidden; border: 2px solid #203b4d; background: #fff; box-shadow: 7px 8px 0 rgb(25 52 75 / 12%); }
      .mid-card img { width: 100%; height: 165px; object-fit: cover; object-position: center; filter: saturate(.75) contrast(1.05); }
      .mid-card span { display: block; height: 40px; padding: 8px 12px; background: #f7f2e4; color: #19344b; font-size: 20px; font-weight: 760; letter-spacing: .08em; }
      .mid-card.wide { grid-column: 1 / -1; height: 195px; }
      .mid-card.wide img { height: 155px; object-position: center 40%; }
      .mid-steps { position: absolute; z-index: 3; left: 73px; bottom: 66px; display: flex; align-items: center; font-size: 24px; font-weight: 750; letter-spacing: .025em; }
      .mid-steps span { padding: 12px 16px; border: 2px solid #19344b; background: rgb(247 242 228 / 78%); }
      .mid-steps b { padding: 0 12px; color: #a2462e; font-size: 35px; }
    `, `
      <main class="cover mid">
        <section class="mid-copy">
          <div class="kicker">Self-supervised · multimodal denoising</div>
          <h1 class="cover-title">MID</h1>
          <div class="tagline">Estimate the noise stage.<br>Remove one residual. Repeat.</div>
        </section>
        <section class="mid-cards" aria-hidden="true">
          <div class="mid-card"><img src="${assets.midImage}"><span>IMAGE</span></div>
          <div class="mid-card"><img src="${assets.midGeometry}"><span>GEOMETRY</span></div>
          <div class="mid-card"><img src="${assets.midSignal}"><span>BIOSIGNAL</span></div>
          <div class="mid-card"><img src="${assets.midMri}"><span>MRI</span></div>
          <div class="mid-card wide"><img src="${assets.midProtein}"><span>PROTEIN REPRESENTATION</span></div>
        </section>
        <div class="mid-steps"><span>STAGE t</span><b>→</b><span>RESIDUAL Δ</span><b>→</b><span>UPDATED SAMPLE</span></div>
      </main>`),
  },
  {
    slug: 'rlsac',
    html: doc(`
      .rlsac { background: #f3ead8; color: #171b1f; }
      .rlsac-red { position: absolute; inset: 0 auto 0 0; width: 465px; background: #be3a2c; }
      .rlsac-copy { position: absolute; z-index: 3; left: 64px; top: 64px; width: 670px; color: #fffaf0; }
      .rlsac .kicker { font-size: 19px; }
      .rlsac .cover-title { margin-top: 63px; font-size: 111px; letter-spacing: -.07em; }
      .rlsac .tagline { margin-top: 31px; width: 360px; font-size: 36px; }
      .rlsac-verb { position: absolute; left: 64px; bottom: 63px; display: grid; grid-template-columns: repeat(2, auto); gap: 8px 23px; color: #fffaf0; font-size: 24px; font-weight: 750; letter-spacing: .06em; }
      .rlsac-plot { position: absolute; left: 420px; top: 90px; width: 1110px; height: 720px; overflow: hidden; border: 3px solid #171b1f; background: white; transform: rotate(-1.25deg); box-shadow: 16px 18px 0 rgb(23 27 31 / 16%); }
      .rlsac-plot img { width: 100%; height: 100%; object-fit: cover; object-position: center; filter: grayscale(.1) contrast(1.06); }
      .rlsac-state { position: absolute; z-index: 2; right: 65px; top: 53px; width: 420px; height: 210px; overflow: hidden; border: 3px solid #171b1f; background: #fff; transform: rotate(2deg); box-shadow: 9px 10px 0 #e7b642; }
      .rlsac-state img { width: 100%; height: 100%; object-fit: cover; object-position: 48% 50%; }
      .rlsac-label { position: absolute; z-index: 4; right: 69px; bottom: 59px; padding: 14px 22px; border: 3px solid #171b1f; background: #e7b642; font-size: 23px; font-weight: 790; letter-spacing: .09em; text-transform: uppercase; }
    `, `
      <main class="cover rlsac">
        <div class="rlsac-red"></div>
        <div class="rlsac-plot"><img src="${assets.rlsacLine}"></div>
        <div class="rlsac-state"><img src="${assets.rlsacState}"></div>
        <section class="rlsac-copy">
          <div class="kicker">RL-guided robust estimation</div>
          <h1 class="cover-title">RLSAC</h1>
          <div class="tagline">Sample, solve, score—then use the result to choose the next hypothesis.</div>
        </section>
        <div class="rlsac-verb"><span>01 SAMPLE</span><span>02 SOLVE</span><span>03 SCORE</span><span>04 UPDATE</span></div>
        <div class="rlsac-label">The policy learns from every trial</div>
      </main>`),
  },
  {
    slug: 'diffsac',
    html: doc(`
      .diffsac { background: #211b2d; color: #f4f0e8; }
      .diffsac::before { position: absolute; inset: 34px; border: 1px solid rgb(244 240 232 / 55%); content: ""; }
      .diffsac-copy { position: absolute; z-index: 3; left: 76px; top: 63px; width: 660px; }
      .diffsac .kicker { color: #d6c04d; }
      .diffsac .cover-title { margin-top: 52px; font-size: 133px; font-weight: 620; }
      .diffsac .tagline { margin-top: 34px; width: 620px; font-family: Georgia, serif; font-size: 42px; font-weight: 400; }
      .diffsac-process { position: absolute; right: 62px; top: 62px; width: 715px; height: 330px; overflow: hidden; border: 12px solid #f4f0e8; background: #fff; }
      .diffsac-process img { width: 100%; height: 100%; object-fit: cover; object-position: center; filter: grayscale(.82) contrast(1.12); }
      .diffsac-result { position: absolute; right: 62px; bottom: 62px; width: 715px; height: 390px; overflow: hidden; border: 12px solid #d6c04d; background: #fff; }
      .diffsac-result img { width: 100%; height: 100%; object-fit: cover; object-position: center 47%; filter: saturate(.55) contrast(1.13); }
      .diffsac-seq { position: absolute; left: 77px; bottom: 74px; display: flex; gap: 14px; align-items: center; color: #d6c04d; font-size: 26px; font-weight: 740; }
      .diffsac-seq span { width: 104px; height: 104px; padding-top: 35px; border: 2px solid #d6c04d; border-radius: 50%; text-align: center; }
      .diffsac-seq b { font-size: 36px; }
      .diffsac-note { position: absolute; z-index: 4; right: 84px; top: 365px; padding: 8px 16px; background: #d6c04d; color: #211b2d; font-size: 21px; font-weight: 780; letter-spacing: .08em; text-transform: uppercase; }
    `, `
      <main class="cover diffsac">
        <section class="diffsac-copy">
          <div class="kicker">Diffusion-guided consensus</div>
          <h1 class="cover-title">DiffSAC</h1>
          <div class="tagline">Reverse diffusion proposes diverse, jointly compatible minimum sets.</div>
        </section>
        <div class="diffsac-process"><img src="${assets.diffConfidence}"></div>
        <div class="diffsac-note">confidence → candidate set</div>
        <div class="diffsac-result"><img src="${assets.diffFundamental}"></div>
        <div class="diffsac-seq"><span>NOISE</span><b>→</b><span>REFINE</span><b>→</b><span>SOLVE</span></div>
      </main>`),
  },
  {
    slug: 'mrasfm',
    html: doc(`
      .mrasfm { background: #d9ddcf; color: #152a22; }
      .mrasfm-photo { position: absolute; inset: 0; }
      .mrasfm-photo img { width: 100%; height: 100%; object-fit: cover; object-position: center; filter: grayscale(.75) sepia(.28) contrast(1.15); opacity: .7; }
      .mrasfm-photo::after { position: absolute; inset: 0; background: linear-gradient(0deg, rgb(217 221 207 / 96%) 0 10%, transparent 46%), linear-gradient(90deg, rgb(217 221 207 / 96%) 0 43%, rgb(217 221 207 / 12%) 71%); content: ""; }
      .mrasfm-copy { position: absolute; z-index: 3; left: 71px; top: 63px; width: 650px; }
      .mrasfm .kicker { color: #8b3b2b; }
      .mrasfm .cover-title { margin-top: 60px; font-size: 116px; letter-spacing: -.075em; }
      .mrasfm .tagline { margin-top: 31px; width: 575px; font-size: 39px; }
      .mrasfm-stamp { position: absolute; z-index: 3; left: 71px; bottom: 68px; display: flex; gap: 12px; }
      .mrasfm-stamp span { padding: 12px 15px; border: 2px solid #152a22; background: rgb(217 221 207 / 83%); font-size: 19px; font-weight: 760; letter-spacing: .06em; }
      .mrasfm-rig { position: absolute; z-index: 2; right: 67px; top: 62px; width: 470px; height: 330px; overflow: hidden; border: 7px solid #f4efe1; box-shadow: 11px 13px 0 rgb(21 42 34 / 22%); transform: rotate(1deg); }
      .mrasfm-rig img { width: 100%; height: 100%; object-fit: cover; object-position: 70% 43%; }
      .mrasfm-map { position: absolute; z-index: 2; right: 105px; bottom: 66px; width: 540px; height: 330px; overflow: hidden; border: 7px solid #f4efe1; box-shadow: 11px 13px 0 rgb(21 42 34 / 22%); transform: rotate(-1.4deg); }
      .mrasfm-map img { width: 100%; height: 100%; object-fit: cover; object-position: center 73%; filter: contrast(1.1); }
      .mrasfm-index { position: absolute; z-index: 4; right: 71px; top: 375px; padding: 11px 16px; background: #8b3b2b; color: #fff; font-size: 19px; font-weight: 780; letter-spacing: .08em; }
    `, `
      <main class="cover mrasfm">
        <div class="mrasfm-photo"><img src="${assets.mraReconstruction}"></div>
        <section class="mrasfm-copy">
          <div class="kicker">Multi-camera structure from motion</div>
          <h1 class="cover-title">MRASfM</h1>
          <div class="tagline">Rigid camera geometry turns multiple drives into one coherent 3D map.</div>
        </section>
        <div class="mrasfm-rig"><img src="${assets.mraRig}"></div>
        <div class="mrasfm-map"><img src="${assets.mraAssembly}"></div>
        <div class="mrasfm-index">FIELD MAP / RIG 06 / SESSION ASSEMBLY</div>
        <div class="mrasfm-stamp"><span>RIGID CAMERA SET</span><span>ROAD FILTER</span><span>MERGE</span></div>
      </main>`),
  },
  {
    slug: 'ermv',
    html: doc(`
      .ermv { background: #171516; color: #f5eee4; }
      .ermv-strip { position: absolute; left: 570px; right: 48px; top: 56px; bottom: 56px; overflow: hidden; border: 10px solid #f5eee4; background: #f5eee4; }
      .ermv-strip::before, .ermv-strip::after { position: absolute; z-index: 3; left: 0; right: 0; height: 23px; background: repeating-linear-gradient(90deg, #171516 0 30px, transparent 30px 53px); content: ""; }
      .ermv-strip::before { top: 0; } .ermv-strip::after { bottom: 0; }
      .ermv-strip img { width: 100%; height: 100%; object-fit: cover; object-position: 56% 49%; filter: saturate(.75) contrast(1.08); }
      .ermv-copy { position: absolute; z-index: 4; left: 67px; top: 62px; width: 570px; }
      .ermv .kicker { color: #ff866b; }
      .ermv .cover-title { margin-top: 63px; font-size: 150px; }
      .ermv .tagline { margin-top: 35px; width: 500px; font-size: 39px; }
      .ermv-axis { position: absolute; left: 68px; bottom: 66px; display: flex; width: 465px; height: 87px; border: 2px solid #f5eee4; color: #f5eee4; }
      .ermv-axis span { display: flex; flex: 1; align-items: center; justify-content: center; border-right: 2px solid #f5eee4; font-size: 21px; font-weight: 750; letter-spacing: .04em; }
      .ermv-axis span:last-child { border-right: 0; }
      .ermv-axis .active { background: #ff866b; color: #171516; }
      .ermv-robot { position: absolute; z-index: 5; right: 79px; bottom: 79px; width: 385px; height: 230px; overflow: hidden; border: 6px solid #ff866b; background: white; transform: rotate(-1.5deg); box-shadow: 10px 11px 0 rgb(0 0 0 / 38%); }
      .ermv-robot img { width: 100%; height: 100%; object-fit: cover; object-position: 13% center; }
      .ermv-note { position: absolute; z-index: 6; right: 82px; bottom: 52px; padding: 9px 13px; background: #ff866b; color: #171516; font-size: 18px; font-weight: 800; letter-spacing: .08em; }
    `, `
      <main class="cover ermv">
        <div class="ermv-strip"><img src="${assets.ermvSimulation}"></div>
        <section class="ermv-copy">
          <div class="kicker">4D robot data editing</div>
          <h1 class="cover-title">ERMV</h1>
          <div class="tagline">Edit one moment. Propagate it consistently across cameras and time.</div>
        </section>
        <div class="ermv-axis"><span>CAM 1</span><span class="active">EDIT</span><span>CAM 2</span><span>TIME →</span></div>
        <div class="ermv-robot"><img src="${assets.ermvRobot}"></div>
        <div class="ermv-note">REAL-ROBOT EVALUATION</div>
      </main>`),
  },
  {
    slug: 'movsam',
    html: doc(`
      .movsam { background: #d6d3cb; color: #111; }
      .mov-main { position: absolute; inset: 0 0 0 570px; overflow: hidden; background: #222; }
      .mov-main img { width: 100%; height: 100%; object-fit: cover; object-position: 37% 50%; filter: saturate(.78) contrast(1.08); }
      .mov-main::after { position: absolute; inset: 0; border-left: 12px solid #111; content: ""; }
      .mov-copy { position: absolute; z-index: 3; left: 64px; top: 60px; width: 570px; }
      .movsam .kicker { width: max-content; padding: 10px 13px; background: #111; color: #f0d94f; }
      .movsam .cover-title { margin-top: 70px; font-size: 110px; }
      .movsam .tagline { margin-top: 29px; width: 455px; font-size: 40px; }
      .mov-question { position: absolute; z-index: 4; left: 65px; bottom: 65px; width: 455px; padding: 20px 23px; background: #f0d94f; font-family: Georgia, serif; font-size: 28px; font-style: italic; font-weight: 700; line-height: 1.2; transform: rotate(-1deg); box-shadow: 8px 9px 0 #111; }
      .mov-sequence { position: absolute; z-index: 4; right: 50px; bottom: 46px; width: 900px; height: 192px; overflow: hidden; border: 8px solid #f0d94f; background: white; box-shadow: 10px 11px 0 rgb(0 0 0 / 42%); }
      .mov-sequence img { width: 100%; height: 100%; object-fit: cover; object-position: center 35%; }
      .mov-label { position: absolute; z-index: 5; right: 58px; top: 52px; padding: 12px 17px; background: #f0d94f; color: #111; font-size: 21px; font-weight: 790; letter-spacing: .09em; }
    `, `
      <main class="cover movsam">
        <div class="mov-main"><img src="${assets.movStreet}"></div>
        <section class="mov-copy">
          <div class="kicker">Single-image moving-object segmentation</div>
          <h1 class="cover-title">MovSAM</h1>
          <div class="tagline">Reason about what could move—using only one still image.</div>
        </section>
        <div class="mov-question">ONE FRAME.<br>NO TEMPORAL MOTION CUES.</div>
        <div class="mov-sequence"><img src="${assets.movOcclusion}"></div>
        <div class="mov-label">LANGUAGE-GUIDED MASK REFINEMENT</div>
      </main>`),
  },
  {
    slug: 'hear',
    html: doc(`
      .hear { background: #eee7d9; color: #1e292c; }
      .hear-left { position: absolute; inset: 0 850px 0 0; padding: 65px 65px; background: #202a2d; color: #f6efe3; }
      .hear .kicker { color: #f1a64b; }
      .hear .cover-title { margin-top: 63px; font-family: Georgia, serif; font-size: 180px; font-weight: 700; letter-spacing: -.085em; }
      .hear .tagline { margin-top: 32px; width: 620px; font-family: Georgia, serif; font-size: 42px; font-weight: 400; }
      .hear-wave { position: absolute; left: 65px; right: 65px; bottom: 72px; height: 110px; }
      .hear-wave svg { width: 100%; height: 100%; }
      .hear-record { position: absolute; right: 50px; top: 50px; width: 740px; height: 800px; overflow: hidden; border: 4px solid #202a2d; background: #fff; box-shadow: 13px 14px 0 #d67f38; }
      .hear-record img { width: 100%; height: 100%; object-fit: cover; object-position: 29% center; filter: grayscale(.2) sepia(.06) contrast(1.08); }
      .hear-tape { position: absolute; z-index: 3; right: 70px; top: 66px; padding: 11px 16px; background: #f6efe3; color: #202a2d; font-family: ui-monospace, monospace; font-size: 19px; font-weight: 760; letter-spacing: .07em; }
      .hear-caption { position: absolute; z-index: 3; right: 73px; bottom: 68px; width: 490px; padding: 18px 20px; background: #202a2d; color: #f6efe3; font-family: ui-monospace, monospace; font-size: 22px; font-weight: 650; line-height: 1.35; }
      .hear-caption b { color: #f1a64b; }
    `, `
      <main class="cover hear">
        <section class="hear-left">
          <div class="kicker">Vision · sound · language · action</div>
          <h1 class="cover-title">HEAR</h1>
          <div class="tagline">Remember brief sounds long enough to change the next action.</div>
          <div class="hear-wave" aria-hidden="true">
            <svg viewBox="0 0 700 110" preserveAspectRatio="none"><polyline fill="none" stroke="#f1a64b" stroke-width="5" points="0,55 34,54 49,38 63,75 76,19 91,91 108,47 131,56 159,54 181,38 199,71 218,53 253,55 286,54 306,9 324,103 340,24 358,86 378,44 401,58 427,55 456,54 475,34 489,77 503,22 520,90 539,48 570,56 602,54 626,43 642,68 660,52 700,55"/></svg>
          </div>
        </section>
        <div class="hear-record"><img src="${assets.hearMoka}"></div>
        <div class="hear-tape">CAUSAL AUDIO RECORD / MOKA TASK</div>
        <div class="hear-caption"><b>HISS → GURGLE → ACT</b><br>The scene looks similar; the sound changes what comes next.</div>
      </main>`),
  },
  {
    slug: 'tgl',
    html: doc(`
      .tgl { background: #eee9df; color: #173741; }
      .tgl-band { position: absolute; left: 0; top: 0; bottom: 0; width: 525px; background: #173741; }
      .tgl-copy { position: absolute; z-index: 4; left: 62px; top: 61px; width: 590px; color: #f7f1e7; }
      .tgl .kicker { color: #ef8455; }
      .tgl .cover-title { margin-top: 64px; font-size: 181px; }
      .tgl .tagline { margin-top: 33px; width: 395px; font-size: 38px; }
      .tgl-flow { position: absolute; z-index: 4; left: 61px; bottom: 62px; display: grid; gap: 8px; grid-template-columns: repeat(4, auto); align-items: center; color: #f7f1e7; font-size: 21px; font-weight: 790; letter-spacing: .05em; }
      .tgl-flow span { padding: 9px 11px; border: 2px solid #f7f1e7; }
      .tgl-flow b { color: #ef8455; font-size: 30px; }
      .tgl-skill { position: absolute; left: 465px; top: 62px; width: 1070px; height: 540px; overflow: hidden; border: 4px solid #173741; background: #fff; box-shadow: 14px 15px 0 rgb(23 55 65 / 18%); transform: rotate(.7deg); }
      .tgl-skill img { width: 100%; height: 100%; object-fit: cover; object-position: 55% 47%; }
      .tgl-memory { position: absolute; z-index: 2; right: 67px; bottom: 62px; width: 770px; height: 270px; overflow: hidden; border: 4px solid #ef8455; background: #fff; box-shadow: 11px 12px 0 rgb(23 55 65 / 18%); transform: rotate(-.8deg); }
      .tgl-memory img { width: 100%; height: 100%; object-fit: cover; object-position: center 68%; }
      .tgl-card { position: absolute; z-index: 5; left: 533px; bottom: 71px; width: 240px; padding: 22px; border: 4px solid #173741; background: #eee9df; color: #173741; font-size: 24px; font-weight: 760; line-height: 1.25; transform: rotate(1.2deg); }
      .tgl-card strong { display: block; margin-bottom: 11px; color: #ef5f3f; font-size: 30px; }
    `, `
      <main class="cover tgl">
        <div class="tgl-band"></div>
        <section class="tgl-copy">
          <div class="kicker">Agent-centered robot learning</div>
          <h1 class="cover-title">TGL</h1>
          <div class="tagline">Teach a skill once. Verify it. Reuse it in a new scene.</div>
        </section>
        <div class="tgl-skill"><img src="${assets.tglSkill}"></div>
        <div class="tgl-memory"><img src="${assets.tglEcosystem}"></div>
        <div class="tgl-card"><strong>GROW</strong>Verified skills and structured experience persist beyond one task.</div>
        <div class="tgl-flow"><span>TEACH</span><b>→</b><span>CHECK</span><b>→</b><span>STORE</span><b>→</b><span>REUSE</span></div>
      </main>`),
  },
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 1,
  colorScheme: 'light',
});
const page = await context.newPage();

for (const cover of covers) {
  await page.setContent(cover.html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => [...document.images].every((image) => image.complete));
  await page.screenshot({
    path: join(outputRoot, `${cover.slug}.png`),
    type: 'png',
    animations: 'disabled',
  });
}

await browser.close();
console.log(`Rendered ${covers.length} publication covers to ${outputRoot}`);
