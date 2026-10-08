// Provider registry + the generic async-job runner shared by every route-A/B adapter.
// Original code for ai-video-prompt-hub/videogen.
//
// Adapter interface (all pure functions except the optional custom `run`):
//   id, name, route ('cloud' | 'local'), env: [required env vars], optionalEnv, docs: [urls], caps: {...}
//   submit(shot, ctx)        -> {method, url, headers, body}          build the create-task request
//   parseSubmit(json)        -> {taskId, pollUrl?}                     read the task id
//   poll(task, ctx)          -> {method, url, headers}                 build the status request
//   parsePoll(json)          -> {state: 'pending'|'done'|'failed', videoUrl?, error?}
//   download(url, ctx)       -> {url, headers}                         (optional; default plain GET)
import fs from 'node:fs';
import path from 'node:path';
import { redact } from '../lib/env.mjs';
import seedance from './seedance.mjs';
import kling from './kling.mjs';
import minimax from './minimax.mjs';
import veo from './veo.mjs';
import fal from './fal.mjs';
import replicate from './replicate.mjs';
import runway from './runway.mjs';
import luma from './luma.mjs';
import comfyui from './comfyui.mjs';

export const PROVIDERS = Object.fromEntries([seedance, kling, minimax, veo, fal, replicate, runway, luma, comfyui].map((p) => [p.id, p]));

export function getProvider(id) {
  const p = PROVIDERS[id];
  if (!p) throw new Error(`未知 provider：${id}。可选：${Object.keys(PROVIDERS).join(' / ')}`);
  return p;
}

export function missingEnv(p, env = process.env) {
  return (p.env || []).filter((k) => !env[k]);
}

/** Pretty-print a request with secrets redacted and base64 payloads shortened. */
export function showRequest(req, env = process.env) {
  const secrets = Object.entries(env).filter(([k, v]) => v && /KEY|TOKEN|SECRET/.test(k)).map(([, v]) => v);
  const hide = (s) => secrets.reduce((acc, v) => acc.split(v).join(redact(v)), s);
  const short = (k, v) => (typeof v === 'string' && v.length > 200 && /^(data:|[A-Za-z0-9+/=]{200,})/.test(v) ? `${v.slice(0, 48)}…<${v.length} 字节的 base64 已省略>` : v);
  const headers = Object.fromEntries(Object.entries(req.headers || {}).map(([k, v]) => [k, hide(String(v))]));
  const body = req.body === undefined ? '' : typeof req.body === 'string' ? req.body : JSON.stringify(req.body, short, 2);
  return [`${req.method || 'GET'} ${hide(req.url)}`, ...Object.entries(headers).map(([k, v]) => `${k}: ${v}`), '', body].join('\n');
}

const sleepMs = (ms) => new Promise((r) => setTimeout(r, ms));

async function http(fetchImpl, req) {
  const init = { method: req.method || 'GET', headers: req.headers || {} };
  if (req.body !== undefined) init.body = typeof req.body === 'string' || req.body instanceof Uint8Array ? req.body : JSON.stringify(req.body);
  const res = await fetchImpl(req.url, init);
  const txt = await res.text();
  let json = null;
  try { json = txt ? JSON.parse(txt) : {}; } catch { /* not json */ }
  if (!res.ok) throw new Error(`HTTP ${res.status} ${req.url}\n${txt.slice(0, 600)}`);
  return json ?? txt;
}

/**
 * Generate one shot with a provider: submit -> poll -> download to outFile.
 * ctx: {env, baseDir, model, fetch, sleep, interval, timeout, log, dryRun}
 */
export async function generateShot(p, shot, outFile, ctx = {}) {
  const env = ctx.env || process.env;
  const c = { ...ctx, env };
  if (p.run) return p.run(shot, outFile, c); // custom flows (ComfyUI)
  const req = p.submit(shot, c);
  if (ctx.dryRun) return { dryRun: true, request: req, text: showRequest(req, env) };
  const miss = missingEnv(p, env);
  if (miss.length) throw new Error(`${p.name} 需要环境变量 ${miss.join(', ')}（写在 .env 里，参考 .env.example；本工具不保存也不上传你的密钥）`);
  const f = ctx.fetch || globalThis.fetch;
  const sleep = ctx.sleep || sleepMs;
  const log = ctx.log || (() => {});
  const task = p.parseSubmit(await http(f, req));
  if (!task?.taskId) throw new Error(`${p.name} 没有返回任务 id`);
  log(`  ${shot.id} → ${p.id} 任务 ${task.taskId}`);
  const t0 = Date.now();
  const timeout = (ctx.timeout ?? 1800) * 1000;
  for (let i = 0; ; i++) {
    await sleep(Math.min((ctx.interval ?? 8) * 1000 * (i < 3 ? 1 : 1.5), 30000));
    const st = p.parsePoll(await http(f, p.poll(task, c)));
    if (st.state === 'done') {
      let url = st.videoUrl;
      if (!url && p.resolve) url = await p.resolve(task, c, (r) => http(f, r));
      if (!url) throw new Error(`${p.name} 任务完成但没有视频地址`);
      st.videoUrl = url;
      const dl = p.download ? p.download(url, c) : { url, headers: {} };
      const res = await f(dl.url, { headers: dl.headers || {}, redirect: 'follow' });
      if (!res.ok) throw new Error(`下载失败 HTTP ${res.status}`);
      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      fs.writeFileSync(outFile, Buffer.from(await res.arrayBuffer()));
      return { file: outFile, taskId: task.taskId, videoUrl: st.videoUrl };
    }
    if (st.state === 'failed') throw new Error(`${p.name} 任务失败：${st.error || '未知原因'}`);
    if (Date.now() - t0 > timeout) throw new Error(`${p.name} 任务超时（${ctx.timeout ?? 1800}s）：${task.taskId}`);
  }
}

export { snapDuration, promptOf, withNegative, refsOf, firstFrameOf } from './util.mjs';
