// Polish: frame interpolation + upscaling. Calls the official binaries when installed (rife-ncnn-vulkan, MIT;
// realesrgan-ncnn-vulkan, BSD-3-Clause — we never bundle them) and falls back to plain ffmpeg on CPU.
// Original code (Apache-2.0, © 2026 天机).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { probe, run } from '../../videogen/lib/media.mjs';

/** Decide how to interpolate/upscale given detected tools. Pure. */
export function polishPlan(tools, want = {}) {
  const p = [];
  if (want.interp && want.interp > 1) p.push(tools.rife ? { step: 'interp', via: 'rife', factor: want.interp } : { step: 'interp', via: 'minterpolate', factor: want.interp, note: '未检测到 rife-ncnn-vulkan，改用 ffmpeg minterpolate（CPU，慢且偶有拖影）' });
  if (want.upscale && want.upscale > 1) p.push(tools.realesrgan ? { step: 'upscale', via: 'realesrgan', factor: want.upscale } : { step: 'upscale', via: 'lanczos', factor: want.upscale, note: '未检测到 realesrgan-ncnn-vulkan，改用 ffmpeg lanczos 放大（不是 AI 超分）' });
  return p;
}

function viaFrames(clip, out, fps, fn) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 's2v-pol-'));
  const a = path.join(tmp, 'in'), b = path.join(tmp, 'out');
  fs.mkdirSync(a); fs.mkdirSync(b);
  try {
    run('ffmpeg', ['-v', 'error', '-y', '-i', clip, path.join(a, '%08d.png')]);
    fn(a, b);
    run('ffmpeg', ['-v', 'error', '-y', '-framerate', String(fps), '-i', path.join(b, '%08d.png'), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '17', out]);
  } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
}

export function interpolate(clip, out, factor, tools) {
  const info = probe(clip);
  const fps = Math.round(info.fps * factor);
  if (tools.rife) {
    viaFrames(clip, out, fps, (a, b) => {
      const n = fs.readdirSync(a).length * factor;
      const r = spawnSync(tools.rife, ['-i', a, '-o', b, '-n', String(n)], { stdio: 'inherit' });
      if (r.status !== 0) throw new Error('rife-ncnn-vulkan 失败');
    });
  } else run('ffmpeg', ['-v', 'error', '-y', '-i', clip, '-vf', `minterpolate=fps=${fps}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1`, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '17', out]);
  return out;
}

export function upscale(clip, out, factor, tools) {
  const info = probe(clip);
  if (tools.realesrgan) {
    viaFrames(clip, out, info.fps, (a, b) => {
      const r = spawnSync(tools.realesrgan, ['-i', a, '-o', b, '-s', String(factor), '-n', process.env.REALESRGAN_MODEL || 'realesr-animevideov3'], { stdio: 'inherit' });
      if (r.status !== 0) throw new Error('realesrgan-ncnn-vulkan 失败');
    });
  } else run('ffmpeg', ['-v', 'error', '-y', '-i', clip, '-vf', `scale=iw*${factor}:ih*${factor}:flags=lanczos`, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '17', out]);
  return out;
}
