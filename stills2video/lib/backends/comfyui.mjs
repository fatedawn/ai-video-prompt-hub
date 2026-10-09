// Local GPU backend: your own ComfyUI over its HTTP API (ComfyUI itself is GPL-3.0 and runs as a separate program;
// we only send JSON to it). Reuses videogen's ComfyUI adapter (upload → /prompt → /history → /view).
// Original code (Apache-2.0, © 2026 天机).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import comfy, { buildPrompt } from '../../../videogen/providers/comfyui.mjs';
import { TIERS } from '../hardware.mjs';

const WF = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'workflows');
const VG_WF = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', 'videogen', 'workflows');
export const workflowPath = (name) => [path.join(WF, name), path.join(VG_WF, name)].find((f) => fs.existsSync(f)) || name;

/** Per-tier workflow + variables for one shot. Pure (reads workflow meta). */
export function comfySettings(plan, sb, tier, o = {}) {
  const T = TIERS[tier] || TIERS.gpu12;
  const c = T.comfyui || TIERS.gpu8.comfyui;
  const flf = !!plan.last_image;
  const wfName = o.workflow || (flf ? c.flf2v || 'wan22_14b_flf2v_4step.json' : c.workflow);
  const wfFile = path.isAbsolute(wfName) ? wfName : workflowPath(wfName);
  const meta = JSON.parse(fs.readFileSync(wfFile, 'utf8'))._hda || {};
  const fps = meta.fps || 24, step = meta.frame_step || 4;
  const secs = Math.min(plan.renderSeconds, c.maxSeconds || 5);
  const [w, h] = (c.size || {})[sb.aspect] || (meta.size || {})[sb.aspect] || [704, 1280];
  const vars = { WIDTH: w, HEIGHT: h, LENGTH: Math.round((secs * fps) / step) * step + 1, FPS: fps, STEPS: meta.steps || c.steps || 20, SPLIT: meta.split || Math.round((meta.steps || 20) / 2) };
  return { workflow: wfFile, vars, seconds: secs, flf };
}

export function videogenShot(plan, sb) {
  return { id: plan.id, duration: plan.renderSeconds, aspect: sb.aspect, prompt_zh: plan.prompt, negative: plan.negative, refs: [], first_frame: plan.image ? { path: plan.image } : null, last_frame: plan.last_image ? { path: plan.last_image } : null };
}

export default {
  id: 'comfyui', name: '本地 GPU · ComfyUI（Wan2.2 TI2V-5B / 14B I2V / FLF2V，或你导出的任意工作流）',
  async render(plan, sb, ctx) {
    const st = comfySettings(plan, sb, ctx.tier, { workflow: ctx.workflow });
    const shot = videogenShot(plan, sb);
    const out = path.join(ctx.clipsDir, `${plan.id}.mp4`);
    const c = { env: process.env, baseDir: ctx.baseDir, workflow: st.workflow, vars: st.vars, dryRun: ctx.dryRun, log: ctx.log };
    if (ctx.dryRun) {
      // write the filled workflow so it can be queued by hand (ComfyUI → Load (API)), plus the HTTP requests
      const dir = path.join(ctx.outDir, 'comfyui');
      fs.mkdirSync(dir, { recursive: true });
      const { body } = buildPrompt(shot, c, { first: plan.image ? path.basename(plan.image) : '', last: plan.last_image ? path.basename(plan.last_image) : '' });
      const wf = path.join(dir, `${plan.id}.api.json`);
      fs.writeFileSync(wf, JSON.stringify(body.prompt, null, 2));
      const r = await comfy.run(shot, out, c);
      return { dryRun: true, files: [wf], text: `# ${st.flf ? 'FLF2V 首尾帧' : 'I2V'} · ${path.basename(st.workflow)} · ${st.vars.WIDTH}x${st.vars.HEIGHT} · ${st.vars.LENGTH} 帧 @${st.vars.FPS}fps（≈${st.seconds}s）· tier ${ctx.tier}\n# 工作流已写入 ${path.relative(process.cwd(), wf)}\n${r.text}` };
    }
    const r = await comfy.run(shot, out, c);
    return { clip: r.file, taskId: r.taskId };
  },
};
