// Backend registry for stills2video. All backends share one interface: render(plan, storyboard, ctx) →
// {clip} | {dryRun: true, text, files}. Original code (Apache-2.0, © 2026 天机).
import cpu from './cpu.mjs';
import comfyui from './comfyui.mjs';
import cloud from './cloud.mjs';
import manual from './manual.mjs';
import wan2gp from './wan2gp.mjs';
import lightx2v from './lightx2v.mjs';

export const BACKENDS = { cpu, comfyui, cloud, manual, wan2gp, lightx2v };
export function getBackend(id) {
  const b = BACKENDS[id];
  if (!b) throw new Error(`未知后端 ${id}（可选：${Object.keys(BACKENDS).join(' / ')}，云端写 cloud:kling 这种）`);
  return b;
}
