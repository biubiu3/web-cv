import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const output = 'artifacts/publication-refactor-review';
await fs.mkdir(output, { recursive: true });
const slugs = ['lnr','tgl','hear','ermv','mid','movsam','mrasfm','vcgs-slam','diffsac','rlsac','dtfi'];
const browser = await chromium.launch({ executablePath: '/root/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome', headless: true });
const report = [];
for (const lang of ['', 'zh/']) {
  for (const route of ['', 'publications/', ...slugs.map(s => `publications/${s}/`)]) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    await page.route('**/livereload.js*', route => route.abort());
    page.on('pageerror', e => errors.push(e.message));
    const response = await page.goto(`http://127.0.0.1:4175/web-cv/${lang}${route}`, {waitUntil:'networkidle'});
    await page.evaluate(() => document.fonts.ready);
    const id = (lang + route).replaceAll('/', '-') || 'home';
    const row = { route:lang+route, status:response.status(), errors, views:[] };
    for (const [name,width,height] of [['desktop',1440,1000],['mobile',390,844]]) {
      await page.setViewportSize({width,height});
      await page.evaluate(async () => { for (const im of document.images) im.loading='eager'; await Promise.all([...document.images].map(im => im.decode().catch(()=>{}))); });
      await page.screenshot({path:`${output}/${id}-${name}.png`,fullPage:true});
      row.views.push(await page.evaluate((name)=>({name,
        overflow:document.documentElement.scrollWidth>innerWidth+1,
        cards:document.querySelectorAll('.publication-gallery .publication-rich-item').length,
        brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.currentSrc),
        font:getComputedStyle(document.querySelector('.prose')||document.body).fontFamily,
        headings:[...document.querySelectorAll('article h2,.prose h2')].map(e=>e.textContent),
        mathErrors:[...document.querySelectorAll('.katex-error')].map(e=>e.textContent),
        bodyText:document.querySelector('.prose')?.innerText.slice(0,120)||''
      }),name));
    }
    report.push(row);
    await page.close();
  }
}
await browser.close();
await fs.writeFile(`${output}/report.json`,JSON.stringify(report,null,2));
const failures=report.filter(r=>r.status!==200||r.errors.length||r.views.some(v=>v.overflow||v.brokenImages.length||v.mathErrors.length||(!r.route.includes('publications/')||r.route.endsWith('publications/'))&&v.cards!==11));
console.log(JSON.stringify({pages:report.length,failures},null,2));
if(failures.length)process.exitCode=1;
