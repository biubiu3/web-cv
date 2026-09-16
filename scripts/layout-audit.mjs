import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const base = new URL(process.env.SITE_URL || 'http://127.0.0.1:4176/web-cv/');
const out = path.resolve('artifacts/layout-review', process.env.AUDIT_LABEL || 'local');
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const report = { base: base.href, date: new Date().toISOString(), translationTest: 'Synthetic bilingual DOM insertion, not an installed extension or translation service', views: [], failures: [], interactions: {} };
const core = ['', 'publications/', 'projects/', 'publications/tgl/', 'publications/lnr/', 'projects/robot-chemist/', 'projects/sfm/'];
const slugs = async dir => (await fs.readdir(dir, {withFileTypes:true})).filter(d=>d.isDirectory()).map(d=>d.name);
const pubs = (await slugs('content/publications')).filter(s=>!['conference-paper','journal-article','preprint'].includes(s));
const projects = (await slugs('content/projects')).filter(s=>!['pandas','pytorch','scikit'].includes(s));
const routes = process.env.QUICK ? core : ['', 'publications/', 'projects/', ...pubs.map(s=>`publications/${s}/`), ...projects.map(s=>`projects/${s}/`)];

async function translate(page, mode) {
  // Two common extension shapes: translation appended inside the original
  // block, and translation inserted as an adjacent sibling block.
  await page.evaluate(mode => {
    const candidates = [...document.querySelectorAll('h1,h2,h3,h4,p,li,dt,dd,figcaption,summary,.nav-link,.publication-rich-kickers > span,.project-feature-kickers > span,.project-feature-media-label,.profile-interests > li')];
    const leaves = candidates.filter(e => !candidates.some(other => other!==e && e.contains(other)) && !e.closest('svg,.katex,pre,code,[translate="no"]'));
    for (const el of leaves) {
      if (!el.textContent.trim() || !el.checkVisibility({checkVisibilityCSS:true})) continue;
      const target = document.createElement('font');
      target.className = 'immersive-translate-target-wrapper';
      target.lang = 'zh-CN';
      target.setAttribute('data-layout-translation-fixture', '');
      target.style.cssText = 'display:block;line-height:1.6;margin-top:.35em;';
      const text = '机器人通过多模态感知与经验学习完成任务，并在真实环境中验证系统能力。';
      const labels = {'Nie Chang':'聂畅','About':'关于我','Research':'研究方向','Selected Work':'代表工作','Publications':'学术论文','Projects':'工程项目','Contact':'联系方式'};
      target.textContent = labels[el.textContent.trim()] || text.repeat(Math.max(1,Math.ceil(el.textContent.trim().length / 100)));
      if (mode==='sibling' && el.matches('p,h2,h3,dt,dd') && !el.closest('.profile-education')) el.after(target);
      else el.append(target);
    }
  }, mode);
}
async function inspect(page) {
  return page.evaluate(() => {
    const visible = el => el.checkVisibility({checkVisibilityCSS: true}) && (el.textContent.trim() || el.matches('img,video,input'));
    const overflow = [...document.querySelectorAll('body *')].filter(el => {
      if (!visible(el) || el.closest('svg,.katex,pre,.paper-table-scroll,.project-figure__media--scroll,.hb-toc')) return false;
      const r=el.getBoundingClientRect();return r.width && (r.right>innerWidth+2 || r.left < -2);
    }).slice(0,12).map(el=>({tag:el.tagName,class:el.className,text:el.textContent.trim().slice(0,65)}));
    const clipped=[];
    for (const el of document.querySelectorAll('h1,h2,h3,p,dt,dd,summary,figcaption,[data-layout-translation-fixture]')) {
      if (!visible(el) || el.closest('.hb-toc,svg,.katex,pre,.paper-table-scroll')) continue;
      const range=document.createRange();range.selectNodeContents(el);const r=range.getBoundingClientRect();
      let parent=el;
      while(parent && parent!==document.body) {
        const s=getComputedStyle(parent),box=parent.getBoundingClientRect();
        if (['hidden','clip'].includes(s.overflowY) && (r.bottom>box.bottom+3 || r.top<box.top-3)) { clipped.push({class:parent.className,text:el.textContent.slice(0,70)});break; }
        parent=parent.parentElement;
      }
    }
    return {width:innerWidth, height:document.documentElement.scrollHeight, overflow, clipped:clipped.slice(0,12), documentOverflow:document.documentElement.scrollWidth>innerWidth+2,
      brokenImages:[...document.images].filter(i=>visible(i)&&(!i.complete||!i.naturalWidth)).map(i=>i.currentSrc),
      font:getComputedStyle(document.querySelector('.prose')||document.body).fontFamily,
      translations:document.querySelectorAll('[data-layout-translation-fixture]').length};
  });
}
async function visit(route, width, mode='normal', dark=false, screenshot=false) {
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce',colorScheme:dark?'dark':'light'});
  const page=await context.newPage();const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  let response;
  for(let attempt=0;attempt<3;attempt++) {try {response=await page.goto(new URL(route,base).href,{waitUntil:'load',timeout:45000});break;} catch(e) {if(attempt===2)throw e;}}
  await page.evaluate(async dark=>{document.documentElement.classList.toggle('dark',dark); for(const i of document.images)i.loading='eager';await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));await document.fonts.ready;},dark);
  if(mode!=='normal') await translate(page,mode);
  await page.waitForTimeout(150);
  const result={route,width,mode,dark,status:response.status(),errors,...await inspect(page)};
  if(result.status!==200||errors.length||result.overflow.length||result.clipped.length||result.documentOverflow||result.brokenImages.length) report.failures.push(result);
  report.views.push(result);
  const id=(route||'home').replaceAll('/','-')+`-${width}-${mode}${dark?'-dark':''}`;
  if(screenshot) {
    await page.screenshot({path:`${out}/${id}.png`,fullPage:true});
    if(route==='' || route==='zh/') for(const selector of ['#about','#selected-publications','#engineering-projects']) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page.screenshot({path:`${out}/${id}-${selector.slice(1)}.png`});
    }
  }
  await context.close();
  console.log(`${result.status} ${route||'/'} ${width} ${mode} ${dark?'dark':''}: ${result.overflow.length} overflow, ${result.clipped.length} clipped`);
}
try {
  for(const lang of ['', 'zh/']) for(const route of routes) for(const width of [1440,390]) await visit(lang+route,width,'normal',false,core.includes(route));
  for(const route of core) for(const width of [320,768,1024,1440]) await visit(route,width,'append',width===1024,true);
  for(const route of ['', 'publications/', 'projects/sfm/']) await visit(route,390,'sibling',false,true);
  for(const route of ['', 'zh/', 'publications/lnr/', 'zh/projects/robot-chemist/']) await visit(route,390,'normal',true,true);
} finally {
  await fs.writeFile(`${out}/audit.json`,JSON.stringify(report,null,2));
  await browser.close();
}
console.log(JSON.stringify({views:report.views.length,failures:report.failures.length,out}));
if(report.failures.length) process.exitCode=1;
