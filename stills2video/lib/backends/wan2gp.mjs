// Wan2GP (deepbeepmeep/Wan2GP) batch files. Wan2GP is under the WanGP Community License (no reselling / paid SaaS);
// we copy none of its code — we only *write settings JSON* for its documented headless mode:
//   python wgp.py --process <settings.json|queue.zip> --output-dir <dir>   (docs/CLI.md, checked 2026-10-09)
// Key names (prompt, image_start, image_end, video_length, resolution, model_type…) are taken from its public docs/defaults
// and are NOT verified on a live install: export one settings file from the Wan2GP UI and pass it with --wan2gp-template
// to inherit the exact schema of your version. Original code (Apache-2.0, © 2026 天机).
import fs from 'node:fs';
import path from 'node:path';

const RES = { gpu8: { '9:16': '480x832', '16:9': '832x480' }, gpu12: { '9:16': '720x1280', '16:9': '1280x720' } };

export function wan2gpSettings(plan, sb, o = {}) {
  const tpl = o.template ? JSON.parse(fs.readFileSync(o.template, 'utf8')) : {};
  const fps = 16;
  const flf = !!plan.last_image;
  return {
    ...tpl,
    model_type: tpl.model_type || o.model || (flf ? 'flf2v_720p' : 'i2v_2_2'),
    prompt: plan.prompt, negative_prompt: plan.negative,
    image_prompt_type: flf ? 'SE' : 'S',
    image_start: plan.image, ...(flf ? { image_end: plan.last_image } : {}),
    video_length: Math.round(Math.min(plan.renderSeconds, 5) * fps) + 1,
    resolution: tpl.resolution || (RES[o.tier] || RES.gpu12)[sb.aspect] || '720x1280',
    seed: 1000 + plan.index,
  };
}

export default {
  id: 'wan2gp', name: 'Wan2GP 批处理（写 settings JSON，交给 wgp.py --process）',
  async render(plan, sb, ctx) {
    const dir = path.join(ctx.outDir, 'wan2gp');
    fs.mkdirSync(dir, { recursive: true });
    const f = path.join(dir, `${plan.id}.json`);
    fs.writeFileSync(f, JSON.stringify(wan2gpSettings(plan, sb, { template: ctx.wan2gpTemplate, tier: ctx.tier, model: ctx.model }), null, 2));
    const cmd = `python wgp.py --process "${f}" --output-dir "${ctx.clipsDir}"   # 在 Wan2GP 目录执行；生成后把视频改名为 ${plan.id}.mp4 或用 import 收回`;
    return { dryRun: true, files: [f], text: cmd };
  },
};
