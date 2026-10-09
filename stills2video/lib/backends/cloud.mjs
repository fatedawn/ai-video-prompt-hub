// Cloud backend: any videogen image-to-video adapter with the user's own key (.env). No key → dry-run that prints
// the exact request (keys redacted). Original code (Apache-2.0, © 2026 天机).
import path from 'node:path';
import { getProvider, missingEnv, generateShot } from '../../../videogen/providers/index.mjs';
import { videogenShot } from './comfyui.mjs';

export default {
  id: 'cloud', name: '云端 I2V（Seedance / 可灵 / 海螺 / Veo / fal / Replicate / Runway / Luma，自带 key）',
  async render(plan, sb, ctx) {
    const p = getProvider(ctx.provider || 'seedance');
    const shot = { ...videogenShot(plan, sb), duration: Math.ceil(plan.duration) };
    const out = path.join(ctx.clipsDir, `${plan.id}.mp4`);
    const miss = missingEnv(p);
    const dry = ctx.dryRun || miss.length > 0;
    const r = await generateShot(p, shot, out, { baseDir: ctx.baseDir, model: ctx.model, dryRun: dry, log: ctx.log });
    if (r.dryRun) return { dryRun: true, text: `${miss.length ? `# 未配置 ${miss.join(', ')} → 只打印请求（复制 .env.example 为 .env 填 key 后去掉 --dry-run 即可真跑）\n` : ''}${r.text}` };
    return { clip: r.file, taskId: r.taskId };
  },
};
