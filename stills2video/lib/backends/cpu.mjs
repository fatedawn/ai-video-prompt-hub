// CPU backend: 2.5D depth parallax + camera presets + numpy overlays (py/motion.py), then optional animator canvas
// effects composited on top (lib/fxrender.mjs). Original code (Apache-2.0, © 2026 天机).
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { sizeOf } from '../storyboard.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const MOTION = path.join(HERE, '..', '..', 'py', 'motion.py');
const FX = path.join(HERE, '..', 'fxrender.mjs');
export const python = () => process.env.S2V_PYTHON || (process.platform === 'win32' ? 'python' : 'python3');

/** Python job for one shot. Pure. */
export function cpuJob(plan, sb, o = {}) {
  const [W, H] = o.size || sizeOf(sb.aspect);
  return {
    image: plan.image, out: o.out, width: W, height: H, fps: sb.fps || 30, duration: plan.renderSeconds,
    motion: plan.motion, overlays: plan.overlays, flow: plan.flow, loop: plan.loop,
    depth: o.depth || 'auto', seed: 1000 + plan.index, crf: o.crf ?? 17, workers: o.workers,
  };
}

export default {
  id: 'cpu', name: 'CPU 2.5D 视差 / Ken Burns / 特效（不需要显卡）',
  async render(plan, sb, ctx) {
    const out = path.join(ctx.clipsDir, `${plan.id}.mp4`);
    fs.mkdirSync(ctx.clipsDir, { recursive: true });
    const work = path.join(ctx.clipsDir, '.jobs');
    fs.mkdirSync(work, { recursive: true });
    const base = plan.fx?.length ? path.join(work, `${plan.id}.base.mp4`) : out;
    const job = cpuJob(plan, sb, { ...ctx, out: base });
    const jf = path.join(work, `${plan.id}.json`);
    fs.writeFileSync(jf, JSON.stringify(job, null, 2));
    if (ctx.dryRun) return { dryRun: true, text: `${python()} ${path.relative(process.cwd(), MOTION)} ${path.relative(process.cwd(), jf)}` };
    const r = spawnSync(python(), [MOTION, jf], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
    if (r.status !== 0) throw new Error(`CPU 渲染失败 ${plan.id}（需要 python3 + numpy + pillow；pip install -r stills2video/py/requirements.txt）`);
    const info = JSON.parse(r.stdout.trim().split('\n').pop());
    if (plan.fx?.length) {
      const fj = path.join(work, `${plan.id}.fx.json`);
      fs.writeFileSync(fj, JSON.stringify({ base, out, W: job.width, H: job.height, fps: job.fps, duration: job.duration, fx: plan.fx }));
      const f = spawnSync(process.execPath, [FX, 'overlay', fj], { encoding: 'utf8', stdio: ['ignore', 'inherit', 'inherit'] });
      if (f.status !== 0) { ctx.log?.(`  ⚠ ${plan.id} 画布特效层失败，保留无特效版本`); fs.copyFileSync(base, out); }
    }
    return { clip: out, info };
  },
};
