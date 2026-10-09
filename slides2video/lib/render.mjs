// Headless render for slides2video (original work, Apache-2.0, © 2026 天机).
// Reuses the animator's Chrome finder (animator/src/browser.mjs) and the browser-frames → ffmpeg pipe idea
// (huashu-art-motion, MIT). The page is a pure function of time; `huashu:<name>` transitions are composited from
// two snapshots (outgoing page frozen at its end, incoming page at t) by the vendored MIT transition code.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const S2V = path.resolve(HERE, '..');
const ROOT = path.resolve(S2V, '..');
const ANIMATOR = path.join(ROOT, 'animator');
const TYPES = { '.js': 'text/javascript', '.mjs': 'text/javascript', '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.json': 'application/json' };

function mod(...p) { return path.join(S2V, 'node_modules', ...p); }

export async function loadBrowserDeps() {
  try {
    const { chromium } = await import(path.join(ANIMATOR, 'node_modules', 'playwright-core', 'index.mjs'));
    const { findChrome } = await import(path.join(ANIMATOR, 'src', 'browser.mjs'));
    return { chromium, findChrome };
  } catch (e) { throw new Error(`需要 animator 的依赖：cd animator && npm install（${e.message}）`); }
}

/** Static server: runtime, KaTeX/Mermaid from node_modules, animator fx adapter + vendored huashu code, deck assets. */
export function serve(deck, assets) {
  const mounts = [['/katex/', mod('katex', 'dist')], ['/mermaid/', mod('mermaid', 'dist')], ['/vendor/', path.join(ANIMATOR, 'vendor')], ['/ar/', path.join(ANIMATOR, 'src', 'runtime')], ['/', path.join(S2V, 'runtime')]];
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    let f = null;
    if (url === '/__deck.json') { res.writeHead(200, { 'content-type': 'application/json' }); res.end(JSON.stringify(deck)); return; }
    if (assets.has(url)) f = assets.get(url);
    else for (const [pre, dir] of mounts) if (url.startsWith(pre)) { const cand = path.join(dir, url === '/' ? 'index.html' : url.slice(pre.length)); if (cand.startsWith(dir)) f = cand; break; }
    if (!f || !fs.existsSync(f) || !fs.statSync(f).isFile()) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'content-type': TYPES[path.extname(f).toLowerCase()] || 'application/octet-stream', 'cache-control': 'no-store' });
    fs.createReadStream(f).pipe(res);
  });
  return new Promise((r) => server.listen(0, '127.0.0.1', () => r({ server, port: server.address().port })));
}

async function openPage(browser, port, deck) {
  const page = await browser.newPage({ viewport: { width: deck.W, height: deck.H }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error' && !/favicon/.test(m.text())) errors.push(m.text()); });
  await page.goto(`http://127.0.0.1:${port}/index.html`);
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
  await page.evaluate(async (d) => { await window.__setup(d); }, deck).catch((e) => { throw new Error('渲染页初始化失败：' + e.message + (errors.length ? '\n' + errors.join('\n') : '')); });
  page.__errors = errors;
  return page;
}

export async function withPages(deck, assets, n, fn) {
  const { chromium, findChrome } = await loadBrowserDeps();
  const { server, port } = await serve(deck, assets);
  const browser = await chromium.launch({ executablePath: findChrome(), args: ['--no-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none', '--disable-lcd-text'] });
  try {
    const pages = [];
    for (let i = 0; i < n; i++) pages.push(await openPage(browser, port, deck));
    return await fn(pages);
  } finally { await browser.close(); server.close(); }
}

async function shot(page, deck, q = 90) { return page.screenshot({ type: 'jpeg', quality: q, clip: { x: 0, y: 0, width: deck.W, height: deck.H } }); }

/** One frame as a JPEG buffer. */
export async function frameAt(page, deck, t) {
  const info = await page.evaluate((tt) => window.__frameInfo(tt), t);
  if (info.huashu) {
    await page.evaluate((tt) => window.__render(tt, { only: 'prev', noSubs: true }), t);
    const A = (await shot(page, deck, 92)).toString('base64');
    await page.evaluate((tt) => window.__render(tt, { only: 'cur', noSubs: true }), t);
    const B = (await shot(page, deck, 92)).toString('base64');
    const out = await page.evaluate(([n, a, b, k, tt]) => window.__composite(n, a, b, k, tt), [info.huashu, A, B, info.k, t]);
    // subtitles/progress drawn on top of the composite: render the subtitle layer alone over the image
    await page.evaluate(([b64, tt]) => { let o = document.getElementById('__comp'); if (!o) { o = document.createElement('img'); o.id = '__comp'; o.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:45'; document.getElementById('stage').appendChild(o); } o.src = 'data:image/jpeg;base64,' + b64; o.style.display = 'block'; window.__render(tt); return new Promise((r) => (o.complete ? r() : (o.onload = r))); }, [out, t]);
    const buf = await shot(page, deck);
    await page.evaluate(() => { document.getElementById('__comp').style.display = 'none'; });
    return buf;
  }
  await page.evaluate((tt) => window.__render(tt), t);
  return shot(page, deck);
}

export async function runQA(deck, assets) {
  return withPages(deck, assets, 1, async ([page]) => { const r = await page.evaluate(() => window.__qa()); r.errors = [...(r.errors || []), ...page.__errors]; return r; });
}

export async function renderStills(deck, assets, times, dir) {
  fs.mkdirSync(dir, { recursive: true });
  return withPages(deck, assets, 1, async ([page]) => {
    const files = [];
    for (const t of times) { const f = path.join(dir, `t${t.toFixed(2).replace('.', '_')}.jpg`); fs.writeFileSync(f, await frameAt(page, deck, t)); files.push(f); }
    return files;
  });
}

/** Render the whole deck → MP4 (with optional audio). */
export async function renderVideo(deck, assets, out, { audio = null, workers, crf = 19, from = 0, to = null, progress = true, bgm = null, bgmVolume = 0.12 } = {}) {
  const fps = deck.fps;
  const end = Math.min(to ?? deck.duration, deck.duration);
  const n = Math.max(1, Math.round((end - from) * fps));
  workers = workers || Math.max(1, Math.min(4, os.cpus().length - 1));
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  const args = ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-'];
  if (audio) args.push('-i', audio);
  if (bgm) args.push('-stream_loop', '-1', '-i', bgm);
  args.push('-map', '0:v');
  if (audio && bgm) args.push('-filter_complex', `[2:a]volume=${bgmVolume}[b];[1:a][b]amix=inputs=2:duration=first:dropout_transition=0[a]`, '-map', '[a]');
  else if (audio) args.push('-map', '1:a');
  else if (bgm) args.push('-map', '1:a', '-af', `volume=${bgmVolume}`);
  if (audio || bgm) args.push('-c:a', 'aac', '-b:a', '160k', '-t', String(end - from));
  args.push('-vf', 'scale=in_range=pc:out_range=tv,format=yuv420p', '-color_range', 'tv', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', String(crf), '-r', String(fps), '-movflags', '+faststart', out);
  const t0 = Date.now();
  await withPages(deck, assets, workers, async (pages) => {
    const ff = spawn('ffmpeg', args, { stdio: ['pipe', 'inherit', 'inherit'] });
    const done = new Promise((res, rej) => ff.on('close', (c) => (c === 0 ? res() : rej(new Error('ffmpeg 退出码 ' + c)))));
    const write = (b) => new Promise((r) => (ff.stdin.write(b) ? r() : ff.stdin.once('drain', r)));
    for (let i = 0; i < n; i += pages.length) {
      const batch = await Promise.all(pages.map((pg, k) => (i + k < n ? frameAt(pg, deck, from + (i + k) / fps) : null)));
      for (const b of batch) if (b) await write(b);
      if (progress && (i / pages.length) % 20 === 0) process.stdout.write(`\r  渲染 ${Math.min(n, i + pages.length)}/${n} 帧  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
    }
    ff.stdin.end();
    await done;
    const errs = pages.flatMap((p) => p.__errors);
    if (errs.length) throw new Error('渲染页报错：\n' + [...new Set(errs)].join('\n'));
  });
  if (progress) process.stdout.write(`\r  渲染 ${n}/${n} 帧  ${((Date.now() - t0) / 1000).toFixed(1)}s\n`);
  return { frames: n, seconds: (Date.now() - t0) / 1000 };
}
