// Headless Chromium driver + ffmpeg encoder. Original code for ai-video-prompt-hub/animator.
// Idea credit: Canvas page -> Playwright frame capture -> ffmpeg pipe (alchaincyf/huashu-art-motion, MIT; idea only).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const RUNTIME = path.join(path.dirname(fileURLToPath(import.meta.url)), 'runtime');

export function findChrome() {
  const cands = [];
  if (process.env.HDA_CHROME) cands.push(process.env.HDA_CHROME);
  try { cands.push(chromium.executablePath()); } catch { /* not installed for this version */ }
  const pw = path.join(os.homedir(), '.cache', 'ms-playwright');
  if (fs.existsSync(pw)) {
    for (const d of fs.readdirSync(pw).sort().reverse()) {
      if (d.startsWith('chromium_headless_shell-')) cands.push(path.join(pw, d, 'chrome-headless-shell-linux64', 'chrome-headless-shell'));
      if (d.startsWith('chromium-')) cands.push(path.join(pw, d, 'chrome-linux64', 'chrome'), path.join(pw, d, 'chrome-linux', 'chrome'));
    }
  }
  cands.push('/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe');
  const hit = cands.find((p) => p && fs.existsSync(p));
  if (!hit) throw new Error('找不到 Chrome/Chromium。请安装 Chrome，或运行 `npx playwright install chromium`，或设置环境变量 HDA_CHROME=/path/to/chrome');
  return hit;
}

/** Serve the runtime folder (and the compiled project for preview mode) on 127.0.0.1. */
export function startServer(project) {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    if (url === '/__project.json') { res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(project)); return; }
    const f = path.join(RUNTIME, url === '/' ? 'index.html' : url);
    if (!f.startsWith(RUNTIME) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; }
    const type = f.endsWith('.js') ? 'text/javascript' : f.endsWith('.html') ? 'text/html; charset=utf-8' : 'application/octet-stream';
    res.writeHead(200, { 'content-type': type, 'cache-control': 'no-store' });
    fs.createReadStream(f).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port })));
}

async function openPage(browser, port, project) {
  const page = await browser.newPage({ viewport: { width: 400, height: 400 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(`http://127.0.0.1:${port}/index.html`);
  await page.waitForFunction(() => typeof window.__setup === 'function');
  try {
    await page.evaluate(async (p) => { await window.__setup(p); }, project);
  } catch (e) {
    const bf = await page.evaluate(() => window.__bootFailed || null).catch(() => null);
    throw new Error('渲染页初始化失败:\n' + (bf || e.message) + (errors.length ? '\n' + errors.join('\n') : ''));
  }
  page.__errors = errors;
  return page;
}

export async function withRenderer(project, fn, { workers = 1 } = {}) {
  const { server, port } = await startServer(project);
  const browser = await chromium.launch({ executablePath: findChrome(), args: ['--no-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'] });
  try {
    const pages = [];
    for (let i = 0; i < workers; i++) pages.push(await openPage(browser, port, project));
    return await fn(pages);
  } finally {
    await browser.close();
    server.close();
  }
}

function ffmpegEncoder(out, { fps, png, audio, crf = 18, duration }) {
  const args = ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', png ? 'png' : 'mjpeg', '-i', '-'];
  if (audio) args.push('-i', audio);
  args.push('-map', '0:v');
  if (audio) args.push('-map', '1:a', '-c:a', 'aac', '-b:a', '160k', '-af', `apad`, '-t', String(duration));
  // JPEG frames are full-range; convert to standard (tv) range yuv420p for player compatibility
  args.push('-vf', png ? 'format=yuv420p' : 'scale=in_range=pc:out_range=tv,format=yuv420p', '-color_range', 'tv', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709');
  args.push('-c:v', 'libx264', '-preset', 'medium', '-crf', String(crf), '-r', String(fps), '-movflags', '+faststart', out);
  const ff = spawn('ffmpeg', args, { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((resolve, reject) => ff.on('close', (c) => (c === 0 ? resolve() : reject(new Error('ffmpeg 退出码 ' + c)))));
  return { ff, done };
}

/** Render [from, to) to an MP4 using N parallel pages. */
export async function renderVideo(project, out, opts = {}) {
  const fps = project.fps;
  const from = opts.from ?? 0, to = Math.min(opts.to ?? project.duration, project.duration);
  const n = Math.max(1, Math.round((to - from) * fps));
  const workers = opts.workers || Math.max(1, Math.min(4, os.cpus().length - 1));
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  const t0 = Date.now();
  await withRenderer(project, async (pages) => {
    const { ff, done } = ffmpegEncoder(out, { fps, png: opts.png, audio: opts.audio, crf: opts.crf, duration: to - from });
    const write = (buf) => new Promise((res) => (ff.stdin.write(buf) ? res() : ff.stdin.once('drain', res)));
    for (let i = 0; i < n; i += pages.length) {
      const batch = pages.map((pg, k) => i + k < n ? pg.evaluate(([t, png]) => window.__grab(t, png ? 'png' : 'jpeg', 0.94), [from + (i + k) / fps, !!opts.png]) : null);
      const res = await Promise.all(batch);
      for (const b64 of res) if (b64) await write(Buffer.from(b64, 'base64'));
      if (opts.progress && (i / pages.length) % 15 === 0) process.stdout.write(`\r  渲染 ${Math.min(n, i + pages.length)}/${n} 帧  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
    }
    ff.stdin.end();
    await done;
    const errs = pages.flatMap((p) => p.__errors);
    if (errs.length) throw new Error('渲染页报错:\n' + [...new Set(errs)].join('\n'));
  }, { workers });
  if (opts.progress) process.stdout.write(`\r  渲染 ${n}/${n} 帧  ${((Date.now() - t0) / 1000).toFixed(1)}s\n`);
  return { frames: n, seconds: (Date.now() - t0) / 1000 };
}

export async function renderStills(project, times, dir, { png = true } = {}) {
  fs.mkdirSync(dir, { recursive: true });
  const files = [];
  await withRenderer(project, async ([page]) => {
    for (const t of times) {
      const b64 = await page.evaluate(([tt, p]) => window.__grab(tt, p ? 'png' : 'jpeg', 0.95), [t, png]);
      const f = path.join(dir, `frame_${t.toFixed(2).replace('.', '_')}s.${png ? 'png' : 'jpg'}`);
      fs.writeFileSync(f, Buffer.from(b64, 'base64'));
      files.push(f);
    }
  });
  return files;
}

export async function probeTimeline(project, t) {
  return withRenderer(project, async ([page]) => page.evaluate((tt) => window.__probe(tt), t));
}
