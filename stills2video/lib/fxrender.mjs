#!/usr/bin/env node
// Reuse the animator's canvas effects inside stills2video (original code, Apache-2.0, © 2026 天机):
//   overlay     draw animator particles / overlays (fx/effects.js) on a transparent canvas and composite them
//               over a rendered shot with ffmpeg (petals, embers, stars, swordqi, lightning, godrays, lightsweep, glow …)
//   transition  render one of the 50 huashu transitions (animator/vendor/huashu-art-motion, MIT, via fx/huashu.js)
//               between the tail of clip A and the head of clip B
// Runs as a subprocess (so videogen's synchronous assemble can call it).  usage: node fxrender.mjs overlay|transition job.json
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ANIMATOR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'animator');

async function launch() {
  let chromium, startServer, findChrome;
  try {
    ({ chromium } = await import(path.join(ANIMATOR, 'node_modules', 'playwright-core', 'index.mjs')));
    ({ startServer, findChrome } = await import(path.join(ANIMATOR, 'src', 'browser.mjs')));
  } catch (e) {
    throw new Error(`需要 animator 的依赖：cd animator && npm install（${e.message}）`);
  }
  const { server, port } = await startServer({});
  const browser = await chromium.launch({ executablePath: findChrome(), args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  await page.goto(`http://127.0.0.1:${port}/index.html`);
  return { page, errs, close: async () => { await browser.close(); server.close(); } };
}

function ffmpegPipe(args) {
  const p = spawn('ffmpeg', args, { stdio: ['pipe', 'ignore', 'pipe'] });
  let err = '';
  p.stderr.on('data', (d) => { err += d; });
  const done = new Promise((res, rej) => p.on('close', (c) => (c === 0 ? res() : rej(new Error('ffmpeg 失败：' + err.slice(-600))))));
  const write = (buf) => new Promise((res) => (p.stdin.write(buf) ? res() : p.stdin.once('drain', res)));
  return { write, end: () => { p.stdin.end(); return done; } };
}

/** job: {base, out, W, H, fps, duration, fx: [{particles|overlay: kind, ...params}], scale} */
export async function overlay(job) {
  const W = job.W, H = job.H, fps = job.fps, n = Math.round(job.duration * fps);
  const k = job.scale ?? 0.5; // effects are soft; drawing at half size and upscaling is visually identical and 4× faster
  const cw = Math.round(W * k), ch = Math.round(H * k);
  const { page, errs, close } = await launch();
  try {
    await page.evaluate(async ({ fx, W, H, cw, ch, k }) => {
      const E = await import('/fx/effects.js');
      const c = document.createElement('canvas'); c.width = cw; c.height = ch;
      const g = c.getContext('2d');
      // design space is 1080-wide like the animator; scale effect sizes for other widths
      const kk = k * (W / 1080);
      window.__fx = (t) => {
        g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, cw, ch);
        for (const f of fx) {
          if (f.particles) E.drawParticles(g, { kind: f.particles, start: 0, end: null, fadeIn: 0.4, ...f, area: f.area || [0, 0, 1080, 1080 * H / W] }, t, 1080, 1080 * H / W, kk);
          else if (f.overlay) E.drawOverlay(g, { type: f.overlay, start: f.at ?? 0, end: f.end ?? null, ...f }, t, 1080, 1080 * H / W, kk);
        }
        return c.toDataURL('image/png').split(',')[1];
      };
    }, { fx: job.fx, W, H, cw, ch, k });
    const ff = ffmpegPipe(['-v', 'error', '-y', '-i', job.base, '-f', 'image2pipe', '-c:v', 'png', '-framerate', String(fps), '-i', '-',
      '-filter_complex', `[1:v]scale=${W}:${H}:flags=bicubic,format=rgba[o];[0:v][o]overlay=0:0:shortest=1:format=auto,format=yuv420p`,
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '17', '-an', job.out]);
    for (let i = 0; i < n; i++) await ff.write(Buffer.from(await page.evaluate((t) => window.__fx(t), i / fps), 'base64'));
    await ff.end();
    if (errs.length) throw new Error(errs.join('\n'));
  } finally { await close(); }
}

function frames(file, start, dur, fps, W, H, dir, tag) {
  fs.mkdirSync(dir, { recursive: true });
  const r = spawnSync('ffmpeg', ['-v', 'error', '-y', '-ss', String(start), '-i', file, '-t', String(dur), '-vf', `fps=${fps},scale=${W}:${H}`, '-q:v', '3', path.join(dir, `${tag}%04d.jpg`)]);
  if (r.status !== 0) throw new Error('抽帧失败：' + r.stderr);
  return fs.readdirSync(dir).filter((f) => f.startsWith(tag)).sort().map((f) => path.join(dir, f));
}

/** job: {type: 'huashu:<name>', a, aStart, b, dur, out, W, H, fps} */
export async function transition(job) {
  const name = job.type.replace(/^huashu:/, '');
  const { W, H, fps, dur } = job;
  const n = Math.max(2, Math.round(dur * fps));
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 's2v-tr-'));
  // the upstream transitions are drawn on a stage canvas; render at half size for speed, upscale in ffmpeg
  const sw = Math.round(W / 2), sh = Math.round(H / 2);
  const A = frames(job.a, job.aStart, dur, fps, sw, sh, tmp, 'a');
  const B = frames(job.b, 0, dur, fps, sw, sh, tmp, 'b');
  const { page, errs, close } = await launch();
  try {
    const names = await page.evaluate(async ({ sw, sh }) => {
      const HM = await import('/fx/huashu.js');
      await HM.loadHuashu({ scenes: [], stage: true }, sw, sh);
      const out = document.createElement('canvas'); out.width = sw; out.height = sh;
      window.__HM = HM; window.__out = out;
      return HM.transitionNames();
    }, { sw, sh });
    if (!names.includes(name)) throw new Error(`没有 huashu 转场 ${name}；可选：${names.join(' ')}`);
    const ff = ffmpegPipe(['-v', 'error', '-y', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(fps), '-i', '-', '-vf', `scale=${W}:${H}:flags=bicubic,format=yuv420p`, '-frames:v', String(n), '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-r', String(fps), job.out]);
    for (let i = 0; i < n; i++) {
      const a = fs.readFileSync(A[Math.min(i, A.length - 1)]).toString('base64');
      const b = fs.readFileSync(B[Math.min(i, B.length - 1)]).toString('base64');
      const jpg = await page.evaluate(async ({ a, b, p, name, i, n, dur }) => {
        const load = (s) => new Promise((res) => { const im = new Image(); im.onload = () => res(im); im.src = 'data:image/jpeg;base64,' + s; });
        const [ia, ib] = await Promise.all([load(a), load(b)]);
        const mk = (im) => { const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; c.getContext('2d').drawImage(im, 0, 0); return c; };
        const out = window.__out, g = out.getContext('2d');
        g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, out.width, out.height);
        window.__HM.huashuTransition(name, g, mk(ia), mk(ib), p, { id: 's2v', from: 'a', lt: p * dur, t: p * dur, dur, cx: out.width / 2, cy: out.height / 2 });
        return out.toDataURL('image/jpeg', 0.92).split(',')[1];
      }, { a, b, p: (i + 0.5) / n, name, i, n, dur });
      await ff.write(Buffer.from(jpg, 'base64'));
    }
    await ff.end();
    if (errs.length) throw new Error(errs.join('\n'));
  } finally { await close(); fs.rmSync(tmp, { recursive: true, force: true }); }
}

export async function listTransitions() {
  const { page, close } = await launch();
  try {
    return await page.evaluate(async () => { const HM = await import('/fx/huashu.js'); await HM.loadHuashu({ scenes: [], stage: true }, 270, 480); return HM.transitionNames(); });
  } finally { await close(); }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [cmd, file] = process.argv.slice(2);
  const job = file ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
  const fn = { overlay, transition, list: async () => console.log((await listTransitions()).join(' ')) }[cmd];
  if (!fn) { console.error('usage: node fxrender.mjs overlay|transition job.json | list'); process.exit(2); }
  fn(job).then(() => process.exit(0), (e) => { console.error('✗ ' + (e.message || e)); process.exit(1); });
}
