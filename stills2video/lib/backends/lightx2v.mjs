// LightX2V (ModelTC/LightX2V, Apache-2.0) command lines. We call its CLI as an external program:
//   python -m lightx2v.infer --model_cls wan2.2_moe --task i2v|flf2v --model_path … --config_json …
//     --prompt … --negative_prompt … --image_path … [--last_frame_path …] --save_result_path …   (scripts/wan22/*.sh, checked 2026-10-09)
// Runs for real only with --run and LIGHTX2V_DIR + LIGHTX2V_MODEL set; otherwise prints the commands.
// Original code (Apache-2.0, © 2026 天机).
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

export function lightx2vArgs(plan, out, env = process.env, tier = 'gpu24') {
  const dir = env.LIGHTX2V_DIR || '<LightX2V 目录>';
  const flf = !!plan.last_image;
  const cfg = flf ? 'configs/wan22/wan_distill_moe_flf2v.json' : tier === 'gpu24' ? 'configs/wan22/wan_moe_i2v.json' : 'configs/wan22/wan_moe_i2v_4090.json';
  return ['-m', 'lightx2v.infer', '--model_cls', 'wan2.2_moe', '--task', flf ? 'flf2v' : 'i2v', '--model_path', env.LIGHTX2V_MODEL || '<Wan2.2-I2V-A14B 模型目录>',
    '--config_json', path.join(dir, cfg), '--prompt', plan.prompt, '--negative_prompt', plan.negative, '--image_path', plan.image,
    ...(flf ? ['--last_frame_path', plan.last_image] : []), '--seed', String(1000 + plan.index), '--save_result_path', out];
}

const q = (s) => (/[\s"'$`\\]/.test(s) ? `'${String(s).replace(/'/g, "'\\''")}'` : s);

export default {
  id: 'lightx2v', name: 'LightX2V 命令行（Wan2.2 14B 4 步蒸馏 / offload，8GB 起）',
  async render(plan, sb, ctx) {
    const out = path.join(ctx.clipsDir, `${plan.id}.mp4`);
    const args = lightx2vArgs(plan, out, process.env, ctx.tier);
    const text = `cd ${q(process.env.LIGHTX2V_DIR || '<LightX2V 目录>')} && python ${args.map(q).join(' ')}`;
    if (!ctx.run || !process.env.LIGHTX2V_DIR || !process.env.LIGHTX2V_MODEL) return { dryRun: true, text };
    fs.mkdirSync(ctx.clipsDir, { recursive: true });
    const r = spawnSync(process.env.LIGHTX2V_PYTHON || 'python', args, { cwd: process.env.LIGHTX2V_DIR, stdio: 'inherit' });
    if (r.status !== 0) throw new Error(`LightX2V 失败 ${plan.id}`);
    return { clip: out };
  },
};
