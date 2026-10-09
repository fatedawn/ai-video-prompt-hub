// Procedurally paints the two background pictures of the sky sample (no external images; Apache-2.0, © 2026 天机).
// Usage: node slides2video/examples/sky/make-images.mjs   (needs animator's playwright-core + Chrome)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..');
const { chromium } = await import(path.join(ROOT, 'animator', 'node_modules', 'playwright-core', 'index.mjs'));
const { findChrome } = await import(path.join(ROOT, 'animator', 'src', 'browser.mjs'));

const paint = String.raw`
function rng(s){return()=>{s|=0;s=s+0x6d2b79f5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function clouds(g,W,H,y0,y1,n,col,seed){const r=rng(seed);for(let i=0;i<n;i++){const cx=r()*W,cy=y0+r()*(y1-y0),s=60+r()*170;for(let k=0;k<9;k++){const x=cx+(r()-.5)*s*2.4,y=cy+(r()-.5)*s*.45,rad=s*(.35+r()*.5);const gr=g.createRadialGradient(x,y,0,x,y,rad);gr.addColorStop(0,col(.22+r()*.12));gr.addColorStop(1,col(0));g.fillStyle=gr;g.beginPath();g.arc(x,y,rad,0,7);g.fill();}}}
function hills(g,W,H,base,amp,col,seed){const r=rng(seed);g.fillStyle=col;g.beginPath();g.moveTo(0,H);let y=base;for(let x=0;x<=W;x+=8){y+= (r()-.5)*amp*.18; y+= (base-y)*.04; g.lineTo(x,y+Math.sin(x/170+seed)*amp*.35);}g.lineTo(W,H);g.fill();}
window.sky=function(W,H){const c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
 const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#0d3a8a');gr.addColorStop(.35,'#2f74d0');gr.addColorStop(.62,'#7fb6ec');gr.addColorStop(.78,'#cfe5f7');gr.addColorStop(1,'#eaf3fb');g.fillStyle=gr;g.fillRect(0,0,W,H);
 const sx=W*.78,sy=H*.16;let s=g.createRadialGradient(sx,sy,0,sx,sy,W*.75);s.addColorStop(0,'rgba(255,255,240,.95)');s.addColorStop(.05,'rgba(255,250,225,.75)');s.addColorStop(.2,'rgba(255,245,220,.18)');s.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=s;g.fillRect(0,0,W,H);
 clouds(g,W,H,H*.42,H*.66,7,(a)=>'rgba(255,255,255,'+a+')',7);
 hills(g,W,H,H*.80,120,'#4a6f8f',3);hills(g,W,H,H*.85,90,'#2e4a63',11);hills(g,W,H,H*.91,60,'#1b2e40',19);
 return c.toDataURL('image/jpeg',.9);};
window.sunset=function(W,H){const c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
 const gr=g.createLinearGradient(0,0,0,H*.62);gr.addColorStop(0,'#1d2552');gr.addColorStop(.35,'#7a3d6e');gr.addColorStop(.7,'#e0663a');gr.addColorStop(1,'#ffb347');g.fillStyle=gr;g.fillRect(0,0,W,H*.62);
 const sx=W*.5,sy=H*.6;let s=g.createRadialGradient(sx,sy,0,sx,sy,W*.6);s.addColorStop(0,'rgba(255,236,170,1)');s.addColorStop(.07,'rgba(255,210,120,.95)');s.addColorStop(.25,'rgba(255,140,60,.35)');s.addColorStop(1,'rgba(255,120,60,0)');g.fillStyle=s;g.fillRect(0,0,W,H*.62);
 clouds(g,W,H,H*.25,H*.5,6,(a)=>'rgba(255,170,120,'+a+')',5);
 const sea=g.createLinearGradient(0,H*.62,0,H);sea.addColorStop(0,'#c9603a');sea.addColorStop(.3,'#5a2f4f');sea.addColorStop(1,'#141a33');g.fillStyle=sea;g.fillRect(0,H*.62,W,H*.38);
 const r=rng(9);for(let i=0;i<140;i++){const y=H*.62+Math.pow(r(),1.6)*H*.36,w=(20+r()*120)*(1-(y-H*.62)/(H*.5)),a=.25+r()*.5;g.fillStyle='rgba(255,200,130,'+a*(1-(y-H*.62)/(H*.4))+')';g.fillRect(sx-w/2+(r()-.5)*W*.18*(y-H*.62)/(H*.38),y,w,2+r()*3);}
 g.fillStyle='#1a1424';g.beginPath();g.moveTo(0,H*.62);for(let x=0;x<=W*.3;x+=6)g.lineTo(x,H*.62-Math.max(0,Math.sin(x/W*10)*30+40-x*.12));g.lineTo(W*.3,H*.62);g.fill();
 return c.toDataURL('image/jpeg',.9);};`;

const browser = await chromium.launch({ executablePath: findChrome(), args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setContent('<script>' + paint + '</script>');
for (const [name, fn, W, H] of [['01-sky.jpg', 'sky', 1080, 1920], ['05-sunset.jpg', 'sunset', 1200, 900]]) {
  const url = await page.evaluate(([f, w, h]) => window[f](w, h), [fn, W, H]);
  fs.writeFileSync(path.join(HERE, 'images', name), Buffer.from(url.split(',')[1], 'base64'));
  console.log('✓ images/' + name);
}
await browser.close();
