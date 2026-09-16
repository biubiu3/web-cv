import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=new URL(process.env.SITE_URL||'http://127.0.0.1:4176/web-cv/');
const out=`artifacts/layout-review/${process.env.AUDIT_LABEL||'interactions'}`;
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch();
const results=[];
try {
 for(const lang of ['', 'zh/']) {
  const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  await page.goto(new URL(lang,base).href);
  assert.equal(await page.locator('.publication-gallery article').count(),6);
  assert.equal(await page.locator('.project-feature-card').count(),6);
  const more=page.locator('.collection-more a');assert.equal(await more.count(),1);
  assert.equal(new URL(await more.getAttribute('href'),base).pathname,new URL(`${lang}publications/`,base).pathname);
  const news=page.locator('#news details');await news.locator('summary').click();assert(await news.evaluate(e=>e.open));await news.locator('summary').click();assert(!(await news.evaluate(e=>e.open)));
  const detail=page.locator('.project-feature-disclosure').first();await detail.locator('summary').click();assert(await detail.locator('dd').first().isVisible());
  await detail.screenshot({path:`${out}/${lang?'zh':'en'}-project-expanded.png`});
  await detail.locator('summary').click();
  await page.evaluate(()=>scrollTo(0,0));
  await page.locator('[data-hb-language-chooser]').click();
  const languageLink=page.locator('[data-hb-language-chooser] + ul a').first();assert(await languageLink.isVisible());
  const target=new URL(await languageLink.getAttribute('href'));target.host=base.host;target.protocol=base.protocol;
  await languageLink.evaluate((e,url)=>e.href=url,target.href);await languageLink.click();
  assert.equal((await page.locator('html').getAttribute('lang')).startsWith(lang?'en':'zh'),true);
  await page.goto(new URL(lang,base).href);
  const theme=page.locator('button.theme-toggle');const before=await page.locator('html').getAttribute('class');await theme.click();assert.notEqual(await page.locator('html').getAttribute('class'),before);await theme.click();
  await page.locator('[data-search-toggle]').click();const search=page.locator('input[type="search"], input[placeholder*="Search" i], input[placeholder*="搜索"]').first();await search.fill('HEAR');await page.locator('.search-result').first().waitFor({timeout:15000});
  await page.screenshot({path:`${out}/${lang?'zh':'en'}-search.png`});await page.keyboard.press('Escape');
  for(const width of [320,390,768,1024]) {
   await page.setViewportSize({width,height:900});
   if(width<1024) {
    const toggle=page.locator('label[for="nav-toggle"]');
    await toggle.focus();await page.keyboard.press('Enter');assert(await page.locator('#nav-menu').isVisible());assert.equal(await toggle.getAttribute('aria-expanded'),'true');
    await page.keyboard.press('Escape');assert.equal(await toggle.getAttribute('aria-expanded'),'false');
    await toggle.click();assert(await page.locator('#nav-menu').isVisible());
    await page.locator('#nav-menu a[href*="#engineering-projects"]').click();
    await page.waitForTimeout(250);assert(!(await page.locator('#nav-toggle').isChecked()));
   } else {await page.locator('#nav-menu a[href*="#engineering-projects"]').click();}
   const rect=await page.locator('#engineering-projects').boundingBox();const header=await page.locator('#site-header').boundingBox();
   assert(rect.y>=header.height-2,`anchor hidden at ${width}: ${rect.y}/${header.height}`);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  }
  // Reflow at the effective CSS width of a desktop browser zoomed to 200%.
  await page.setViewportSize({width:720,height:500});await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:`${out}/${lang?'zh':'en'}-zoom-reflow.png`});
  await page.goto(new URL(`${lang}publications/lnr/`,base).href);
  const copy=page.locator('[data-paper-share-copy]');await copy.click();await page.waitForTimeout(300);
  assert.equal(await copy.innerText(),await copy.getAttribute('data-label-copied'));
  await page.locator('.article-back a').click();assert(page.url().endsWith(`${lang}publications/`));
  results.push({lang:lang||'en',cards:6,news:true,projectDisclosure:true,languageSwitch:true,theme:true,search:true,mobileMenu:true,keyboardMenu:true,anchors:true,copyLink:true,articleBack:true});
  await page.close();
 }
 console.log(JSON.stringify(results,null,2));
 await fs.writeFile(`${out}/interactions.json`,JSON.stringify(results,null,2));
} finally {await browser.close();}
