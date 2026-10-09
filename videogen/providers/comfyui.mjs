// Route B — your own GPU via a ComfyUI server you run yourself (default http://127.0.0.1:8188).
// ComfyUI server API (docs.comfy.org/development/comfyui-server/comms_routes, checked 2026-10):
//   POST /upload/image (multipart "image")  → {name, subfolder, type}
//   POST /prompt {prompt: <API-format workflow>, client_id} → {prompt_id}
//   GET  /history/{prompt_id} → {[id]: {status, outputs: {node: {images|gifs|videos: [{filename, subfolder, type}]}}}}
//   GET  /view?filename=&subfolder=&type=output
// Workflows are API-format JSON with {{PROMPT}} {{NEGATIVE}} {{WIDTH}} {{HEIGHT}} {{LENGTH}} {{FPS}} {{SEED}} {{STEPS}} {{IMAGE}} {{IMAGE_END}} {{PREFIX}}
// placeholders, and/or node titles like "$prompt.text" / "$image.image" (see bindTitles).
// Original adapter code for ai-video-prompt-hub/videogen.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { firstFrameOf, promptOf } from './util.mjs';
import { run } from '../lib/media.mjs';

const WF_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'workflows');
const sleepMs = (ms) => new Promise((r) => setTimeout(r, ms));

// "$name.input" node titles bind a variable to that node input, so any workflow exported from the ComfyUI UI
// (File → Export (API)) works after renaming a few node titles — no JSON editing. Idea credit: the "$prompt.text"
// title convention of ATH-MaaS/Pixelle-Video (Apache-2.0); reimplemented here, no code copied.
export const TITLE_VARS = { prompt: 'PROMPT', negative: 'NEGATIVE', image: 'IMAGE', image_end: 'IMAGE_END', last_image: 'IMAGE_END', width: 'WIDTH', height: 'HEIGHT', length: 'LENGTH', frames: 'LENGTH', fps: 'FPS', seed: 'SEED', steps: 'STEPS', prefix: 'PREFIX' };

export function bindTitles(prompt, vars) {
  for (const node of Object.values(prompt || {})) {
    const t = node?._meta?.title;
    const m = typeof t === 'string' && t.match(/^\$(\w+)\.(\w+)!?$/);
    if (!m) continue;
    const key = TITLE_VARS[m[1]] || m[1].toUpperCase();
    if (key in vars && node.inputs) node.inputs[m[2]] = vars[key];
  }
  return prompt;
}

export function fillWorkflow(tpl, vars) {
  const walk = (v) => {
    if (typeof v === 'string') {
      const m = v.match(/^\{\{(\w+)\}\}$/);
      if (m && m[1] in vars) return vars[m[1]];
      return v.replace(/\{\{(\w+)\}\}/g, (s, k) => (k in vars ? String(vars[k]) : s));
    }
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)]));
    return v;
  };
  return bindTitles(walk(tpl), vars);
}

export function buildPrompt(shot, ctx, imageName) {
  const ff = firstFrameOf(shot);
  const lf = shot.last_frame && (shot.last_frame.path || shot.last_frame.url) ? shot.last_frame : null;
  const wfFile = ctx.workflow || path.join(WF_DIR, ff ? 'wan22_ti2v_5b_i2v.json' : 'wan22_ti2v_5b_t2v.json');
  const wf = JSON.parse(fs.readFileSync(wfFile, 'utf8'));
  const meta = wf._hda || {};
  const fps = meta.fps || 24, step = meta.frame_step || 4;
  const [w, h] = (meta.size || {})[shot.aspect] || (shot.aspect === '9:16' ? [704, 1280] : [1280, 704]);
  const length = Math.round((shot.duration * fps) / step) * step + 1;
  const seed = ctx.seed ?? parseInt(crypto.createHash('md5').update(shot.id).digest('hex').slice(0, 8), 16);
  const imageNames = typeof imageName === 'object' && imageName ? imageName : { first: imageName };
  const vars = { PROMPT: promptOf(shot), NEGATIVE: shot.negative || '', WIDTH: w, HEIGHT: h, LENGTH: length, FPS: fps, SEED: seed, STEPS: meta.steps || 20, SPLIT: meta.split || 10,
    IMAGE: imageNames.first || (ff ? path.basename(ff.path || ff.url) : ''), IMAGE_END: imageNames.last || (lf ? path.basename(lf.path || lf.url) : ''), PREFIX: `hda/${shot.id}`, ...(ctx.vars || {}) };
  return { workflowFile: wfFile, body: { prompt: fillWorkflow(wf.prompt || wf, vars), client_id: ctx.clientId || 'hda-videogen' } };
}

export default {
  id: 'comfyui', name: 'ComfyUI（自己的 GPU）', route: 'local',
  env: [], optionalEnv: ['COMFYUI_URL'],
  docs: ['https://docs.comfy.org/development/comfyui-server/comms_routes', 'https://docs.comfy.org/development/comfyui-server/api-examples'],
  caps: { t2v: true, i2v: true, refImages: '看工作流', durations: '按帧数（Wan2.2-5B：24fps，4n+1 帧）', ratios: ['16:9', '9:16', '1:1', '4:3', '3:4'], negative: true },
  submit(shot, ctx) {
    const base = (ctx.env.COMFYUI_URL || 'http://127.0.0.1:8188').replace(/\/$/, '');
    const { body } = buildPrompt(shot, ctx);
    return { method: 'POST', url: `${base}/prompt`, headers: { 'Content-Type': 'application/json' }, body };
  },
  async run(shot, outFile, ctx) {
    const base = (ctx.env.COMFYUI_URL || 'http://127.0.0.1:8188').replace(/\/$/, '');
    const f = ctx.fetch || globalThis.fetch;
    const sleep = ctx.sleep || sleepMs;
    const ff = firstFrameOf(shot);
    if (ctx.dryRun) {
      const req = this.submit(shot, ctx);
      const lf = shot.last_frame?.path || shot.last_frame?.url;
      const pre = (ff ? `POST ${base}/upload/image  (multipart: image=@${ff.path || ff.url}, overwrite=true)\n` : '') + (lf ? `POST ${base}/upload/image  (multipart: image=@${lf}, overwrite=true)\n` : '') + (ff || lf ? '\n' : '');
      return { dryRun: true, request: req, text: pre + `${req.method} ${req.url}\nContent-Type: application/json\n\n${JSON.stringify(req.body, null, 2)}` };
    }
    const upload = async (fr, label) => {
      if (!fr.path) throw new Error(`ComfyUI ${label}需要本地图片 path`);
      const fd = new FormData();
      fd.append('image', new Blob([fs.readFileSync(path.resolve(ctx.baseDir || '.', fr.path))]), path.basename(fr.path));
      fd.append('overwrite', 'true');
      const up = await (await f(`${base}/upload/image`, { method: 'POST', body: fd })).json();
      return up.subfolder ? `${up.subfolder}/${up.name}` : up.name;
    };
    const names = {};
    if (ff) names.first = await upload(ff, '首帧');
    if (shot.last_frame?.path) names.last = await upload(shot.last_frame, '尾帧');
    const { body } = buildPrompt(shot, ctx, names);
    const res = await f(`${base}/prompt`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const j = await res.json();
    if (!res.ok || j.error) throw new Error(`ComfyUI 拒绝了工作流：${JSON.stringify(j.error || j.node_errors || j).slice(0, 800)}`);
    const id = j.prompt_id;
    (ctx.log || (() => {}))(`  ${shot.id} → ComfyUI prompt ${id}`);
    const t0 = Date.now();
    for (;;) {
      await sleep((ctx.interval ?? 5) * 1000);
      const h = await (await f(`${base}/history/${id}`)).json();
      const e = h[id];
      if (e?.status?.status_str === 'error') throw new Error(`ComfyUI 执行出错：${JSON.stringify(e.status.messages || '').slice(0, 800)}`);
      const files = e ? Object.values(e.outputs || {}).flatMap((o) => [...(o.videos || []), ...(o.gifs || []), ...(o.images || []), ...(o.video ? [].concat(o.video) : [])]).filter((x) => x?.filename && /\.(mp4|webm|mov|mkv|gif|webp)$/i.test(x.filename)) : [];
      if (files.length) {
        const x = files[0];
        const r = await f(`${base}/view?${new URLSearchParams({ filename: x.filename, subfolder: x.subfolder || '', type: x.type || 'output' })}`);
        const tmp = outFile.replace(/\.mp4$/i, '') + path.extname(x.filename);
        fs.mkdirSync(path.dirname(outFile), { recursive: true });
        fs.writeFileSync(tmp, Buffer.from(await r.arrayBuffer()));
        if (tmp !== outFile) { run('ffmpeg', ['-v', 'error', '-y', '-i', tmp, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', outFile]); fs.rmSync(tmp); }
        return { file: outFile, taskId: id };
      }
      if (Date.now() - t0 > (ctx.timeout ?? 3600) * 1000) throw new Error(`ComfyUI 超时：${id}`);
    }
  },
};
