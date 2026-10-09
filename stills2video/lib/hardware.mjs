// Hardware / tool detection and backend auto-selection for stills2video.
// Original code for ai-video-prompt-hub/stills2video (Apache-2.0, © 2026 天机).
// Idea credit: FramePack (Apache-2.0) switches modes from *free* VRAM at start-up; Wan2GP (WanGP Community License,
// ideas only) exposes memory "profiles" instead of raw flags. Both reimplemented as plain tier tables, no code copied.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

/** Parse `nvidia-smi --query-gpu=name,memory.total,memory.free --format=csv,noheader,nounits`. Pure. */
export function parseNvidiaSmi(txt) {
  return String(txt || '').split('\n').map((l) => l.trim()).filter(Boolean).map((l) => {
    const [name, total, free] = l.split(',').map((x) => x.trim());
    return { name, vramMB: +total || 0, freeMB: free != null ? +free || 0 : null };
  }).filter((g) => g.name && g.vramMB > 0);
}

/** VRAM (GB) → tier id. Pure. */
export function tierOf(vramGB) {
  if (!vramGB || vramGB < 5.5) return 'cpu';
  if (vramGB < 10) return 'gpu8';
  if (vramGB < 14) return 'gpu12';
  if (vramGB < 20) return 'gpu16';
  return 'gpu24';
}

// Recommended local settings per tier. Numbers are from each project's own README / official docs as cited in
// docs/i2v-对比.md; anything without an official number is marked unverified (未核验).
export const TIERS = {
  cpu: {
    label: '无独显 / 核显 / <6GB', backend: 'cpu',
    local: ['CPU 2.5D 视差 + Ken Burns + 叠层特效（本工具 cpu 后端，深度模型 Depth-Anything-V2-Small 26MB）'],
    comfyui: null,
    notes: '真实物体运动做不到；需要的话用云端 key（cloud）或网页端手动（manual）补关键镜头。',
  },
  gpu8: {
    label: '6–10GB（RTX 3060 8G / 4060 / 2080）', backend: 'comfyui',
    local: ['ComfyUI 原生 Wan2.2 TI2V-5B（官方称原生 offload 可放进 8GB）', 'FramePack（README：6GB 起，单图长镜头）', 'Wan2GP（README：部分模型 6GB 起，Profile 4/5）', 'LightX2V 14B 4 步 + offload（README：8GB 显存 + 16GB 内存）'],
    comfyui: { workflow: 'wan22_ti2v_5b_i2v.json', size: { '9:16': [544, 960], '16:9': [960, 544] }, maxSeconds: 3, steps: 20, note: '先 544×960 / 3 秒试；爆显存就加 --lowvram 启动 ComfyUI' },
    notes: '首尾帧转场（FLF2V）需要 14B 模型，8GB 不建议；镜头衔接用 cpu 后端的视差转场。',
  },
  gpu12: {
    label: '10–14GB（RTX 3060 12G / 4070）', backend: 'comfyui',
    local: ['Wan2.2 TI2V-5B 720p', 'Wan2.2-14B I2V GGUF Q4 + 4 步 LoRA（社区常见，官方无数字：未核验）', 'FramePack / FramePack-Studio（README ≥8GB）'],
    comfyui: { workflow: 'wan22_ti2v_5b_i2v.json', size: { '9:16': [704, 1280], '16:9': [1280, 704] }, maxSeconds: 5, steps: 20, note: '14B 走 GGUF：把 UNETLoader 换成 UnetLoaderGGUF（city96/ComfyUI-GGUF，Apache-2.0）' },
    notes: '12GB 跑 14B 量化属于社区经验，未核验。',
  },
  gpu16: {
    label: '14–20GB（4060Ti 16G / 4080）', backend: 'comfyui',
    local: ['Wan2.2-14B I2V / FLF2V GGUF Q4–Q5 + 4 步 LoRA', 'LTX-Desktop 本地模式（官方：≥16GB 显存）', 'ComfyUI-WanVideoWrapper 14B block swap（README 约 16GB）'],
    comfyui: { workflow: 'wan22_14b_i2v_4step.json', flf2v: 'wan22_14b_flf2v_4step.json', size: { '9:16': [480, 832], '16:9': [832, 480] }, maxSeconds: 5, steps: 4, note: '官方 fp8 模板按 24GB 设计；16GB 换 GGUF 或加 --lowvram' },
    notes: 'LTX 模型为 LTX 社区许可，商用前读原文。',
  },
  gpu24: {
    label: '≥20GB（3090 / 4090 / 5090）', backend: 'comfyui',
    local: ['ComfyUI 官方 Wan2.2-14B I2V / FLF2V fp8 + 4 步 LoRA（本仓库 workflows/）', 'Wan2.2 TI2V-5B 官方脚本（offload，24GB）', 'HunyuanVideo-1.5 I2V（⚠ 腾讯混元许可：不适用于欧盟/英国/韩国）', 'LTX-2.3（ComfyUI-LTXVideo / LTX-Desktop，⚠ LTX 社区许可）'],
    comfyui: { workflow: 'wan22_14b_i2v_4step.json', flf2v: 'wan22_14b_flf2v_4step.json', size: { '9:16': [720, 1280], '16:9': [1280, 720] }, maxSeconds: 5, steps: 4, note: '720p 81 帧 @16fps ≈ 5 秒' },
    notes: '首尾帧转场：相邻两张图做首帧/尾帧，自动排进 FLF2V 队列。',
  },
};

function which(bin) {
  const exts = process.platform === 'win32' ? ['', '.exe', '.cmd'] : [''];
  for (const d of (process.env.PATH || '').split(path.delimiter)) for (const e of exts) { const f = path.join(d, bin + e); if (d && fs.existsSync(f)) return f; }
  return null;
}

/** Detect GPUs and optional tools. `exec` is injectable for tests. */
export function detectHardware(o = {}) {
  const exec = o.exec || ((cmd, args) => { const r = spawnSync(cmd, args, { encoding: 'utf8', timeout: 8000 }); return r.status === 0 ? r.stdout : null; });
  const env = o.env || process.env;
  let gpus = [];
  if (env.S2V_FAKE_VRAM_GB) gpus = [{ name: 'simulated', vramMB: +env.S2V_FAKE_VRAM_GB * 1024, freeMB: null }];
  else {
    const out = exec('nvidia-smi', ['--query-gpu=name,memory.total,memory.free', '--format=csv,noheader,nounits']);
    if (out) gpus = parseNvidiaSmi(out);
  }
  const vramGB = gpus.length ? Math.max(...gpus.map((g) => g.vramMB)) / 1024 : 0;
  const find = (envKey, names) => (env[envKey] && fs.existsSync(env[envKey]) ? env[envKey] : names.map((n) => (o.which || which)(n)).find(Boolean) || null);
  return {
    os: `${os.platform()} ${os.arch()}`,
    cpus: os.cpus().length,
    ramGB: +(os.totalmem() / 2 ** 30).toFixed(1),
    gpus, vramGB: +vramGB.toFixed(1),
    tier: tierOf(vramGB),
    apple: os.platform() === 'darwin' && os.arch() === 'arm64',
    tools: {
      ffmpeg: find('FFMPEG_BIN', ['ffmpeg']),
      rife: find('RIFE_BIN', ['rife-ncnn-vulkan']),
      realesrgan: find('REALESRGAN_BIN', ['realesrgan-ncnn-vulkan']),
    },
    comfyuiUrl: env.COMFYUI_URL || 'http://127.0.0.1:8188',
  };
}

export const CLOUD_I2V = ['seedance', 'kling', 'minimax', 'veo', 'fal', 'replicate', 'runway', 'luma'];

/**
 * Pick a backend. Pure given inputs.
 * prefer: explicit backend from --backend (wins), hw: detectHardware(), keys: {provider: bool configured}, comfyReachable: bool
 */
export function selectBackend({ prefer, hw, keys = {}, comfyReachable = false } = {}) {
  if (prefer && prefer !== 'auto') {
    const [b, sub] = prefer.split(':');
    return { backend: b, provider: sub || null, reason: '命令行指定', dryRun: false };
  }
  const tier = hw?.tier || 'cpu';
  if (tier !== 'cpu' && comfyReachable) return { backend: 'comfyui', provider: null, reason: `检测到 ${hw.vramGB}GB 显存（${TIERS[tier].label}）且 ComfyUI 在线`, dryRun: false };
  const key = CLOUD_I2V.find((p) => keys[p]);
  if (tier !== 'cpu') return { backend: 'cpu', provider: null, reason: `检测到 ${hw.vramGB}GB 显存，但 ComfyUI 没开（${hw.comfyuiUrl}）→ 先用 CPU 视差出片；启动 ComfyUI 后用 --backend comfyui` + (key ? `；也可 --backend cloud:${key}` : ''), dryRun: false, suggest: 'comfyui' };
  return { backend: 'cpu', provider: null, reason: '没有可用独显 → CPU 2.5D 视差 + 运镜 + 特效' + (key ? `（已配置 ${key} key：关键镜头可加 --backend cloud:${key}）` : ''), dryRun: false, suggest: key ? `cloud:${key}` : null };
}

export async function comfyReachable(url, fetchImpl = globalThis.fetch, timeoutMs = 1500) {
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), timeoutMs);
    const r = await fetchImpl(url.replace(/\/$/, '') + '/system_stats', { signal: ctl.signal });
    clearTimeout(t);
    return r.ok;
  } catch { return false; }
}
