// Plain script.txt -> a ready-to-render project (host character + simple auto staging).
// Original code for ai-video-prompt-hub/animator.
//
// script.txt format: one line per subtitle cue. Optional "角色：台词" prefix picks the speaker (character id or
// name); a blank line starts a new scene; 「关键词」 in a line is drawn on screen when it is spoken.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DECOR = [
  { shape: 'sparkle', motion: { type: 'twinkle', period: 0.9 }, scale: 0.6 },
  { shape: 'bulb', motion: { type: 'pulse', amt: 0.07, period: 0.8 }, scale: 0.85 },
  { shape: 'heart', motion: { type: 'pulse', amt: 0.08, period: 0.9 }, scale: 0.7 },
  { shape: 'cloud', motion: { type: 'drift', dx: -30, period: 7 }, scale: 1.0 },
];
const COLORS = ['#4155a8', '#e2603f', '#3f8f4f', '#8a4fb0'];

export function scriptToProject(txtFile, outDir, opts = {}) {
  const host = opts.character || 'tianji';
  const raw = fs.readFileSync(txtFile, 'utf8').replace(/\r/g, '');
  const known = { [host]: host, 天机: 'tianji', 豆豆: 'doudou', tianji: 'tianji', doudou: 'doudou' };
  const groups = [[]];
  for (const ln of raw.split('\n')) {
    const s = ln.trim();
    if (!s) { if (groups.at(-1).length) groups.push([]); continue; }
    if (s.startsWith('#')) continue;
    const m = s.match(/^([^：:]{1,8})[：:](.+)$/);
    const sp = m && known[m[1].trim()] ? known[m[1].trim()] : null;
    groups.at(-1).push({ text: (sp ? m[2] : s).trim(), speaker: sp || host });
  }
  // long groups are split into scenes of <= 3 lines
  const scenesLines = groups.filter((g) => g.length).flatMap((g) => { const r = []; for (let i = 0; i < g.length; i += 3) r.push(g.slice(i, i + 3)); return r; });
  if (!scenesLines.length) throw new Error(`${txtFile} 里没有台词`);
  const used = [...new Set(scenesLines.flat().map((l) => l.speaker))];
  const rel = (p) => path.relative(outDir, path.join(ROOT, p)).split(path.sep).join('/');
  const script = scenesLines.flat();
  let cue = 0;
  const scenes = scenesLines.map((lines, si) => {
    const cues = lines.map(() => ++cue);
    const elements = [{ id: 'ground', shape: 'ground', x: 540, y: 1560, scale: 2.8, at: 'scene', draw: 0.4, pen: false }];
    const actors = used.map((ch, k) => ({ character: ch, x: used.length === 1 ? 540 : 330 + k * 420, y: 1560, height: used.length === 1 ? 760 : 600, actions: [{ type: 'expression', name: 'happy', at: 'scene' }] }));
    if (si === 0) actors.forEach((a) => (a.appear = { type: 'draw', at: 'scene', dur: 0.9 }));
    lines.forEach((l, k) => {
      const c = cues[k];
      const act = actors[used.indexOf(l.speaker)].actions;
      const kw = l.text.match(/「([^」]{1,12})」/);
      if (kw) elements.push({ id: `kw${c}`, text: kw[1], size: 104, color: COLORS[c % COLORS.length], x: 540, y: 520 + k * 150, at: `c${c}:${kw[1]}`, draw: 0.6 });
      const d = DECOR[(c - 1) % DECOR.length];
      elements.push({ id: `d${c}`, shape: d.shape, x: k % 2 ? 860 : 210, y: 820 + k * 90, scale: d.scale, at: `c${c}+0.2`, draw: 0.4, pen: false, motion: d.motion });
      if (si === 0 && k === 0) act.push({ type: 'wave', arm: 'arm_l', at: `c${c}`, until: `c${c}.end` });
      else if (/[？?]/.test(l.text)) act.push({ type: 'expression', name: 'thinking', at: `c${c}` }, { type: 'look', angle: -6, at: `c${c}`, dur: 1.2 });
      else if (/[！!]/.test(l.text)) act.push({ type: 'expression', name: 'happy', at: `c${c}` }, { type: 'hop', times: 1, height: 6, at: `c${c}+0.3`, dur: 0.5 });
      else act.push({ type: 'point', arm: k % 2 ? 'arm_r' : 'arm_l', angle: 100, at: `c${c}+0.2`, dur: 1.4 });
    });
    if (si === scenesLines.length - 1 && used.includes('tianji')) actors[used.indexOf('tianji')].actions.push({ type: 'reveal', at: `c${cues.at(-1)}`, until: 'scene.end+0.3' });
    return { id: `s${si + 1}`, cues, ...(si ? { transition: { type: si % 2 ? 'scribble' : 'slide', dur: 0.5 } } : {}), camera: { from: { x: 540, y: 1000, zoom: 1.04 }, to: { x: 540, y: 1020, zoom: 1.1 } }, elements, actors };
  });
  return {
    $schema: rel('schema/project.schema.json'), version: 1, title: opts.title || path.basename(txtFile).replace(/\.\w+$/, ''),
    canvas: { width: 1080, height: 1920, fps: 30 }, media: opts.media || 'crayon', paper: { color: '#f8f2e4' },
    timing: {}, subtitle: { size: 56, y: 0.87 },
    characters: Object.fromEntries(used.map((c) => [c, rel(`characters/${c}/character.json`)])),
    script, scenes,
  };
}
