// Manual backends (no API at all): export per-shot packages for a web site or a desktop app (FramePack, LTX-Desktop,
// FreeVideo, Wan2GP UI, 即梦/可灵/海螺 网页), then import the downloads by filename. Reuses videogen route C.
// Original code (Apache-2.0, © 2026 天机).
import path from 'node:path';
import { exportPackages, importClips } from '../../../videogen/lib/manual.mjs';
import { toVideogen } from '../storyboard.mjs';

export function exportManual(sb, plans, o) {
  const vg = toVideogen(sb);
  vg.shots.forEach((s, i) => { s.prompt_zh = `${plans[i].prompt}\n（首帧 = 参考图 01_首帧；单镜头，${Math.ceil(plans[i].duration)} 秒，${sb.aspect}）`; s.negative = plans[i].negative; s.duration = Math.ceil(plans[i].duration); });
  return exportPackages(vg, o.out, { site: o.site, baseDir: o.baseDir, shotsFile: o.shotsFile });
}

export function importManual(sb, from, o) {
  const vg = toVideogen(sb);
  const r = importClips(vg, from, o.clipsDir, { baseDir: o.baseDir });
  vg.shots.forEach((s, i) => { if (s.clip) sb.shots[i].clip = s.clip; });
  return r;
}

export default {
  id: 'manual', name: '网页端 / 桌面 App 手动往返（不需要 key）',
  async render() { throw new Error('manual 后端用 export / import 两个命令（见 README）'); },
};
export const relOut = (f) => path.relative(process.cwd(), f);
