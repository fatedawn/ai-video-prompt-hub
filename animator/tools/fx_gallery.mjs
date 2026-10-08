#!/usr/bin/env node
// Contact sheets of every ported huashu-art-motion style recipe / transition and our own fx, rendered by the real
// runtime (original code for ai-video-prompt-hub/animator). Usage:
//   node tools/fx_gallery.mjs [--out out/fx-gallery] [--what recipes,transitions,stylisers] [--cast]
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { startServer, findChrome } from '../src/browser.mjs';

const a = Object.fromEntries(process.argv.slice(2).reduce((acc, x, i, arr) => { if (x.startsWith('--')) acc.push([x.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true]); return acc; }, []));
const out = path.resolve(a.out || 'examples/out/fx-gallery');
const what = String(a.what || 'recipes,transitions,stylisers').split(',');
fs.mkdirSync(out, { recursive: true });
const { server, port } = await startServer({});
const browser = await chromium.launch({ executablePath: findChrome(), args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage();
const errs = []; page.on('pageerror', (e) => errs.push(String(e))); page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
await page.goto(`http://127.0.0.1:${port}/index.html`);
const sheet = await page.evaluate(async ({ what, cast }) => {
  const HM = await import('/fx/huashu.js');
  const ids = ['01_cave', '02_egypt', '03_greek', '04_roman', '05_gothic', '06_renaissance', '08_impressionism', '09_postimp', '10_nouveau', '11_cubism', '12_bauhaus', '13_pop', '14_8bit', '15_raytrace', '16_2026', '17_ink', '18_klimt', '19_munch', '20_dunhuang', '21_kusama', '22_constructivism', '23_dali', '24_hopper', '25_ghibli', '26_vaporwave', '27_kirby', '28_monet', '29_seurat', '30_matisse', '31_haring', '32_rembrandt', '33_rubberhose', '34_shadowpuppet', '35_shinkai', '36_picasso_blue'];
  const W = 540, Hh = 960;
  await HM.loadHuashu({ scenes: what.includes('recipes') ? ids : [], stage: true }, W, Hh);
  const res = {};
  const grid = (cells, cols, cw, ch, draw) => {
    const rows = Math.ceil(cells.length / cols), c = document.createElement('canvas'); c.width = cols * cw; c.height = rows * (ch + 26);
    const g = c.getContext('2d'); g.fillStyle = '#222'; g.fillRect(0, 0, c.width, c.height);
    cells.forEach((name, i) => { const x = (i % cols) * cw, y = Math.floor(i / cols) * (ch + 26); g.save(); g.beginPath(); g.rect(x, y, cw, ch); g.clip(); try { draw(g, name, x, y); } catch (e) { g.fillStyle = '#f33'; g.fillText(String(e).slice(0, 60), x + 4, y + 20); } g.restore();
      g.fillStyle = '#fff'; g.font = '16px sans-serif'; g.fillText(name, x + 4, y + ch + 18); });
    return c.toDataURL('image/jpeg', 0.85).split(',')[1];
  };
  if (what.includes('recipes')) res.recipes = grid(ids, 7, 384, 216, (g, id, x, y) => g.drawImage(HM.recipeFrame(id, 0.9, 0.9, { hideCast: !cast }), x, y, 384, 216));
  // two synthetic portrait frames
  const mk = (bg, fg, label) => { const c = document.createElement('canvas'); c.width = W; c.height = Hh; const g = c.getContext('2d');
    const gr = g.createLinearGradient(0, 0, 0, Hh); gr.addColorStop(0, bg[0]); gr.addColorStop(1, bg[1]); g.fillStyle = gr; g.fillRect(0, 0, W, Hh);
    g.fillStyle = fg; g.beginPath(); g.arc(W / 2, Hh * 0.45, 150, 0, 7); g.fill(); g.font = 'bold 90px sans-serif'; g.textAlign = 'center'; g.fillText(label, W / 2, Hh * 0.8); return c; };
  const A = mk(['#24305e', '#f76c6c'], '#f8e9a1', 'A'), B = mk(['#e8f0d8', '#3f8f4f'], '#e2603f', 'B');
  if (what.includes('transitions')) {
    const names = HM.transitionNames();
    const tmp = document.createElement('canvas'); tmp.width = W; tmp.height = Hh; const tg = tmp.getContext('2d');
    for (const p of [0.35, 0.65]) res['transitions_' + p] = grid(names, 10, 180, 320, (g, n, x, y) => { tg.reset(); HM.huashuTransition(n, tg, A, B, p, { id: 'g', from: 'f', lt: p * 0.6, t: 1 + p * 0.6, dur: 0.6, cx: W / 2, cy: Hh / 2 }); g.drawImage(tmp, x, y, 180, 320); });
    res.names = names;
  }
  if (what.includes('stylisers')) {
    const names = [...HM.STYLISERS, ...HM.POST];
    const tmp = document.createElement('canvas'); tmp.width = W; tmp.height = Hh; const tg = tmp.getContext('2d');
    res.stylisers = grid(names, 8, 270, 480, (g, n, x, y) => { tg.reset(); tg.drawImage(A, 0, 0); if (HM.STYLISERS.includes(n)) HM.huashuStylise(tg, n, 1.0, {}); else HM.huashuPost(tg, n, 1.0, 1.0, {}); g.drawImage(tmp, x, y, 270, 480); });
  }
  return res;
}, { what, cast: !!a.cast });
for (const [k, v] of Object.entries(sheet)) if (typeof v === 'string') { fs.writeFileSync(path.join(out, k + '.jpg'), Buffer.from(v, 'base64')); console.log(path.join(out, k + '.jpg')); }
if (sheet.names) console.log('transitions:', sheet.names.join(' '));
if (errs.length) console.log('page errors:\n' + [...new Set(errs)].join('\n'));
await browser.close(); server.close();
