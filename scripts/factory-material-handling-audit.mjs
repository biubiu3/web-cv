import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const base = process.env.SITE_URL || 'http://127.0.0.1:4173/web-cv/';
const out = 'artifacts/factory-material-handling';
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ executablePath: '/root/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome', headless: true });
const page = await browser.newPage();
const errors = [], report = [];
page.on('pageerror', e => errors.push(e.message));
for (const width of [1440, 390]) {
  await page.setViewportSize({ width, height: 1000 });
  for (const lang of ['', 'zh/']) {
    const response = await page.goto(new URL(`${lang}projects/factory-material-handling/`, base).href, {waitUntil: 'networkidle'});
    assert.equal(response.status(), 200);
    await page.evaluate(async () => { for (const i of document.images) i.loading='eager'; await Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))); });
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('.factory-system-map').count(), 1);
    const article = await page.locator('article .prose').first().innerText();
    assert.match(article, /3 倍速|3× speed/);
    assert.doesNotMatch(article, /CATL|SJTU|UAES|宁德|联电|上海交通|合同|万元|@/i);
    assert.match(article, /负责.*物体识别与双臂操作|responsible for.*object recognition and dual-arm manipulation/is);
    const video = page.locator('video');
    assert.equal(await video.count(), 1);
    const media = await video.evaluate(async v => {
      v.muted=true; await v.play();
      await new Promise((resolve,reject)=>{ const timer=setTimeout(()=>reject(Error('Playback stalled')),10000); const tick=()=>{if(v.currentTime>.2){clearTimeout(timer);v.removeEventListener('timeupdate',tick);resolve();}};v.addEventListener('timeupdate',tick);tick(); });
      v.pause(); return {duration:v.duration,width:v.videoWidth,height:v.videoHeight,currentTime:v.currentTime};
    });
    const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src)}));
    assert.equal(state.overflow,false); assert.deepEqual(state.broken,[]);
    const label=`${lang?'zh':'en'}-${width}`;
    await page.screenshot({path:`${out}/${label}.png`,fullPage:true});
    if(width===1440){await page.locator('.factory-system-map').screenshot({path:`${out}/${label}-architecture.png`});await page.locator('.article-header').screenshot({path:`${out}/${label}-cover.png`});}
    await page.goto(new URL(`${lang}projects/`,base).href);
    const order=await page.locator('.project-feature-card h2 a').evaluateAll(a=>a.map(x=>new URL(x.href).pathname.split('/').filter(Boolean).at(-1)));
    assert.deepEqual(order,['robot-chemist','factory-material-handling','sfm','avp','mower','lsv']); assert.equal(order.filter(x=>x==='factory-material-handling').length,1);
    assert.deepEqual(order.filter(x=>x!=='factory-material-handling'),['robot-chemist','sfm','avp','mower','lsv']);
    await page.goto(new URL(lang,base).href);
    assert.equal(await page.locator('#engineering-projects .project-feature-card').count(),6);
    report.push({label,media,...state,order});
  }
}
assert.deepEqual(errors,[]);
await fs.writeFile(`${out}/browser-report.json`,JSON.stringify({passed:true,report,errors},null,2));
console.log(JSON.stringify({passed:true,pages:report.length,videoPlaybackChecks:report.length}));
await browser.close();
