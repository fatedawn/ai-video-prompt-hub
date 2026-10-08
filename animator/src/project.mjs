// Project loading, timing resolution and validation (Node side). Original code for ai-video-prompt-hub/animator.
// Idea credits: bind every visual element to a subtitle event (geeklee/srt-whiteboard-animation, MIT);
// JSON spec with second-accurate cues and "every scene needs a main motion" rule (alchaincyf/huashu-art-motion, MIT);
// characters declared once in a project-level asset list and reused per shot (HKUDS/ViMax, HBAI-Ltd/Toonflow-app).
// All ideas reimplemented; no code copied.
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { parseSrt } from './srt.mjs';

const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.gif': 'image/gif' };
const PUNCT = /[\s，。！？、；：“”‘’「」『』（）《》…—,.!?;:'"()\-]/;

export function readStructured(file) {
  const txt = fs.readFileSync(file, 'utf8');
  return /\.ya?ml$/i.test(file) ? YAML.parse(txt) : JSON.parse(txt);
}

function dataUrl(file) {
  const ext = path.extname(file).toLowerCase();
  if (!MIME[ext]) throw new Error(`不支持的图片格式: ${file}`);
  return `data:${MIME[ext]};base64,${fs.readFileSync(file).toString('base64')}`;
}

function mustExist(file, what) {
  if (!fs.existsSync(file)) throw new Error(`${what} 不存在: ${file}`);
  return file;
}

/** Load a character definition file (JSON/YAML) and inline its assets. */
export function loadCharacter(ref, baseDir) {
  const file = mustExist(path.resolve(baseDir, ref), '角色定义文件');
  const def = readStructured(file);
  const dir = path.dirname(file);
  const out = { ...def, _file: file };
  if ((def.type || 'rig') === 'rig') {
    out.type = 'rig';
    const svgFile = mustExist(path.resolve(dir, def.rig?.svg || def.svg), '角色 SVG');
    out.svg = fs.readFileSync(svgFile, 'utf8');
    Object.assign(out, { parts: def.rig?.parts || def.parts, anchor: def.rig?.anchor || def.anchor, layers: def.rig?.layers || def.layers, height: def.height || def.rig?.height });
    delete out.rig;
  } else if (def.type === 'image') {
    const img = def.image || {};
    const sheetFrames = img.sheet?.frames || {};
    out.images = {};
    // values are either sheet frame names or image file paths (PNG/JPG/WebP/SVG)
    const add = (f) => { if (f && !sheetFrames[f] && !out.images[f]) out.images[f] = dataUrl(mustExist(path.resolve(dir, f), '角色图片')); };
    for (const group of ['views', 'expressions', 'mouth', 'actions']) for (const f of Object.values(img[group] || {})) add(f);
    add(img.blink);
    // views/expressions map names -> frame keys (file names or sheet frame names)
    out.views = img.views || {}; out.expressions = img.expressions || {}; out.mouth = img.mouth || {}; out.actions = img.actions || {}; out.blink = img.blink;
    if (img.sheet) out.sheet = { src: dataUrl(mustExist(path.resolve(dir, img.sheet.src), '角色设定图')), frames: img.sheet.frames || {} };
    out.anchor = img.anchor || [0.5, 1];
    out.height = def.height || img.height;
    delete out.image;
  } else throw new Error(`角色类型只能是 rig 或 image: ${file}`);
  return out;
}

// ---------------- timing ----------------
/** Per-character timestamps for karaoke + word lookup. Uses word timings when available, else linear estimate. */
function charTimes(cue) {
  const chars = [...cue.text];
  const times = new Array(chars.length).fill(cue.start);
  if (cue.words && cue.words.length) {
    let pos = 0;
    for (const w of cue.words) {
      const idx = cue.text.indexOf(w.text, pos);
      if (idx < 0) continue;
      const n = [...w.text].length;
      const ci = [...cue.text.slice(0, idx)].length;
      for (let k = 0; k < n; k++) times[ci + k] = w.start + ((w.end - w.start) * k) / n;
      pos = idx + w.text.length;
    }
    // fill gaps monotonically
    for (let i = 1; i < times.length; i++) if (times[i] < times[i - 1]) times[i] = times[i - 1];
    cue.timing = 'words';
  } else {
    const weights = chars.map((c) => (PUNCT.test(c) ? 0 : 1));
    const total = weights.reduce((a, b) => a + b, 0) || 1;
    let acc = 0;
    const dur = Math.max(0.1, cue.end - cue.start);
    chars.forEach((c, i) => { times[i] = cue.start + (acc / total) * dur * 0.96; acc += weights[i]; });
    cue.timing = 'estimated';
  }
  return times;
}

function estimateCues(script, est) {
  const cps = est.cps || 4.5, gap = est.gap ?? 0.35;
  let t = est.lead ?? 0.4;
  return script.map((l, i) => {
    const n = [...l.text].filter((c) => !PUNCT.test(c)).length;
    const d = Math.max(1.2, n / cps);
    const c = { index: i + 1, start: t, end: t + d, text: l.text };
    t += d + gap;
    return c;
  });
}

export class TimeResolver {
  constructor(cues) { this.cues = cues; }
  cue(n) {
    const c = this.cues[n - 1];
    if (!c) throw new Error(`引用了不存在的字幕 c${n}（共 ${this.cues.length} 条）`);
    return c;
  }
  word(n, word, edge = 'start', nth = 1) {
    const c = this.cue(n);
    let idx = -1, from = 0;
    for (let k = 0; k < nth; k++) { idx = c.text.indexOf(word, from); if (idx < 0) break; from = idx + word.length; }
    if (idx < 0) throw new Error(`字幕 c${n}「${c.text}」里找不到词「${word}」`);
    const ci = [...c.text.slice(0, idx)].length;
    const n2 = [...word].length;
    if (edge === 'end') {
      const last = ci + n2 - 1;
      const next = c.charTimes[last + 1] ?? c.end;
      return Math.min(c.end, Math.max(c.charTimes[last], next));
    }
    return c.charTimes[ci];
  }
  /** Resolve a time reference to absolute seconds. */
  at(ref, scene) {
    if (ref === undefined || ref === null) return null;
    if (typeof ref === 'number') return ref;
    if (typeof ref === 'object') {
      let t;
      if (ref.cue) t = ref.word ? this.word(ref.cue, ref.word, ref.edge, ref.nth || 1) : (ref.edge === 'end' ? this.cue(ref.cue).end : this.cue(ref.cue).start);
      else if (ref.scene) t = ref.scene === 'end' ? scene.end : scene.start;
      else t = ref.t ?? 0;
      return t + (ref.offset || 0);
    }
    const s = String(ref).trim();
    let m = s.match(/^([+-]?\d*\.?\d+)$/);
    if (m) return parseFloat(m[1]);
    m = s.match(/^(.*?)([+-]\d*\.?\d+)?$/);
    const body = m[1].trim(), off = m[2] ? parseFloat(m[2]) : 0;
    let mm;
    if ((mm = body.match(/^scene(\.end|\.start)?$/))) return (mm[1] === '.end' ? scene.end : scene.start) + off;
    if ((mm = body.match(/^c(\d+)(?::(.+?))?(\.end|\.start)?$/))) {
      const n = +mm[1];
      if (mm[2]) {
        const w = mm[2].match(/^(.*?)(?:#(\d+))?$/);
        return this.word(n, w[1], mm[3] === '.end' ? 'end' : 'start', w[2] ? +w[2] : 1) + off;
      }
      return (mm[3] === '.end' ? this.cue(n).end : this.cue(n).start) + off;
    }
    throw new Error(`无法解析的时间引用: ${s}（示例：2.5、"c3"、"c3.end"、"c3:苹果树"、"c3:苹果树+0.2"、"scene+1"）`);
  }
}

// ---------------- compile ----------------
export function compileProject(file, opts = {}) {
  const projFile = path.resolve(file);
  const P = readStructured(projFile);
  const dir = path.dirname(projFile);
  const warnings = [];
  const canvas = P.canvas || {};
  const W = canvas.width || 1080, H = canvas.height || 1920, fps = canvas.fps || 30;

  // characters
  const characters = {};
  for (const [id, ref] of Object.entries(P.characters || {})) characters[id] = loadCharacter(typeof ref === 'string' ? ref : ref.file, dir);

  // cues
  const timing = { ...(P.timing || {}) };
  // CLI overrides (paths relative to the current working directory)
  for (const k of ['srt', 'words', 'audio']) if (opts[k]) { timing[k] = path.resolve(opts[k]); if (k === 'srt') delete timing.estimate; }
  if (opts.srt && !opts.words) delete timing.words;
  let cues;
  if (timing.srt) cues = parseSrt(fs.readFileSync(mustExist(path.resolve(dir, timing.srt), 'SRT 文件'), 'utf8'));
  else if (timing.estimate && P.script) { cues = estimateCues(P.script, timing.estimate); warnings.push('timing.estimate：时长按字数估算，仅用于草稿；正式出片请用配音 + SRT 或 TTS 时间戳'); }
  else throw new Error('缺少时间轴：请在 timing 中提供 srt（或先运行 tts 命令生成），草稿可用 timing.estimate');
  if (timing.words) {
    const words = readStructured(mustExist(path.resolve(dir, timing.words), '词级时间戳文件'));
    for (const w of words) if (cues[w.cue - 1]) cues[w.cue - 1].words = w.words;
  }
  const script = P.script || [];
  if (script.length && script.length !== cues.length) warnings.push(`script 有 ${script.length} 行，SRT 有 ${cues.length} 条：按序号对齐，多出的部分忽略`);
  cues.forEach((c, i) => {
    const s = script[i];
    if (s) {
      c.speaker = s.speaker || null;
      if (s.text && s.text.replace(PUNCT, '') !== c.text.replace(PUNCT, '') && opts.strictText) warnings.push(`c${i + 1} script 与 SRT 文本不一致`);
    }
    if (c.speaker && characters[c.speaker]) { c.speakerName = characters[c.speaker].name || c.speaker; c.speakerColor = characters[c.speaker].color; }
    c.charTimes = charTimes(c);
    if (i && c.start < cues[i - 1].end - 0.001) warnings.push(`c${i + 1} 与上一条字幕时间重叠`);
  });
  const T = new TimeResolver(cues);

  // scenes timing
  const scenesIn = P.scenes || [];
  const tail = P.tail ?? 1.0;
  const scenes = scenesIn.map((s, i) => ({ src: s, id: s.id || `s${i + 1}` }));
  scenes.forEach((sc, i) => {
    const s = sc.src;
    const first = s.cues ? s.cues[0] : null;
    sc.start = s.start !== undefined ? T.at(s.start, {}) : i === 0 ? 0 : first ? Math.max(0, T.cue(first).start - (s.preroll ?? 0.35)) : null;
    if (sc.start === null) throw new Error(`镜头 ${sc.id} 需要 cues 或 start`);
  });
  scenes.forEach((sc, i) => {
    const s = sc.src;
    const last = s.cues ? s.cues[s.cues.length - 1] : null;
    sc.end = s.end !== undefined ? T.at(s.end, sc) : i + 1 < scenes.length ? scenes[i + 1].start : (last ? T.cue(last).end : sc.start + 3) + tail;
  });
  const duration = opts.duration || scenes[scenes.length - 1].end;

  const out = [];
  for (const sc of scenes) {
    const s = sc.src;
    const scene = { id: sc.id, start: sc.start, end: sc.end, paper: s.paper, media: s.media, items: [] };
    const tr = s.transition ?? P.transition ?? 'scribble';
    scene.transition = typeof tr === 'string' ? { type: tr, dur: tr === 'cut' ? 0 : 0.6 } : { type: tr.type, dur: tr.dur ?? 0.6 };
    // camera
    const cam = s.camera || {};
    const keys = [];
    if (cam.from) keys.push({ t: sc.start, ...cam.from });
    for (const k of cam.keys || []) keys.push({ ...k, t: T.at(k.at, scene) });
    if (cam.to) keys.push({ t: cam.toAt ? T.at(cam.toAt, scene) : sc.end, ease: cam.ease || 'inOut', ...cam.to });
    keys.forEach((k) => { k.x = k.x ?? W / 2; k.y = k.y ?? H / 2; k.zoom = k.zoom ?? 1; delete k.at; });
    keys.sort((a, b) => a.t - b.t);
    scene.camera = { keys, handheld: cam.handheld, shakes: (cam.shakes || []).map((x) => ({ at: T.at(x.at, scene), dur: x.dur || 0.4, amp: x.amp || 10 })) };
    let mainMotion = keys.length >= 2 && keys.some((k, i) => i && (k.x !== keys[0].x || k.y !== keys[0].y || k.zoom !== keys[0].zoom));
    if (!keys.length) mainMotion = true; // default slow push-in is generated in the runtime

    // elements
    let z = 0;
    for (const e of s.elements || []) {
      if (!e.id) throw new Error(`镜头 ${sc.id} 有元素缺少 id`);
      const start = e.at !== undefined ? T.at(e.at, scene) : sc.start;
      let source;
      if (e.shape) source = { type: 'shape', name: e.shape, colors: e.colors };
      else if (e.svg) source = { type: 'svg', markup: fs.readFileSync(mustExist(path.resolve(dir, e.svg), 'SVG 素材'), 'utf8') };
      else if (e.image) source = { type: 'image', url: dataUrl(mustExist(path.resolve(dir, e.image), '图片素材')), width: e.width, height: e.height };
      else if (e.text) source = { type: 'text', text: e.text, size: e.size, color: e.color, font: e.font, outline: e.outline };
      else throw new Error(`元素 ${e.id} 需要 shape / svg / image / text 之一`);
      const draw = e.draw ?? (source.type === 'text' ? 0.12 * [...e.text].length + 0.3 : 1.0);
      const motions = (e.motion ? [].concat(e.motion) : []).map((m) => {
        const mm = { ...m };
        mm.start = m.at !== undefined ? T.at(m.at, scene) : start + draw;
        if (m.until !== undefined) mm.end = T.at(m.until, scene);
        if (m.type === 'move' || m.type === 'fall') { if (!m.to) throw new Error(`元素 ${e.id} 的 ${m.type} 需要 to:[x,y]`); mm.from = m.from || [e.x, e.y]; }
        delete mm.at; delete mm.until;
        return mm;
      });
      if (motions.length) mainMotion = true;
      const exit = e.exit ? { at: T.at(e.exit.at, scene), dur: e.exit.dur || 0.4, type: e.exit.type || 'fade' } : null;
      const cueRef = typeof e.at === 'string' && e.at.startsWith('c') ? e.at : (e.at && e.at.cue ? `c${e.at.cue}${e.at.word ? ':' + e.at.word : ''}` : null);
      if (start < sc.start - 0.001) warnings.push(`${sc.id}/${e.id} 出现时间 ${start.toFixed(2)}s 早于镜头开始 ${sc.start.toFixed(2)}s`);
      if (start + draw > sc.end + 0.001) warnings.push(`${sc.id}/${e.id} 画完时间 ${(start + draw).toFixed(2)}s 晚于镜头结束 ${sc.end.toFixed(2)}s`);
      scene.items.push({ kind: 'element', scene: sc.id, id: e.id, source, x: e.x ?? W / 2, y: e.y ?? H / 2, scale: e.scale ?? 1, rot: e.rot || 0,
        origin: e.origin, media: e.media, appear: e.appear || 'draw', start, draw, motions, exit, pen: e.pen, z: e.z ?? z++, cueRef, boilOffset: z,
        attach: e.attach ? { actor: e.attach.actor, point: e.attach.point, offset: e.attach.offset, blend: e.attach.blend, rot: e.attach.rot, start: T.at(e.attach.at ?? 'scene', scene) } : null });
    }
    // actors
    for (const a of s.actors || []) {
      const ch = characters[a.character];
      if (!ch) throw new Error(`镜头 ${sc.id} 引用了未声明的角色 ${a.character}（请在 project.characters 中声明）`);
      const id = a.id || a.character;
      const actions = [], expressions = [], talk = [];
      for (const act of a.actions || []) {
        const st = T.at(act.at ?? 'scene', scene);
        let en = act.until !== undefined ? T.at(act.until, scene) : st + (act.dur ?? defaultDur(act.type));
        if (act.type === 'expression') { expressions.push({ t: st, name: act.name }); if (ch.type === 'rig' && act.name !== 'normal' && !(ch.expressions || {})[act.name]) warnings.push(`角色 ${a.character} 没有定义表情 ${act.name}（将使用 SVG 中的 expr_${act.name} 分组，若存在）`); continue; }
        if (act.type === 'talk') { talk.push([st, en]); continue; }
        if (['wave', 'point', 'raise', 'reveal'].includes(act.type) && ch.type === 'rig') {
          const arm = act.arm || 'arm_r';
          if (ch.parts && !ch.parts[arm] && !ch.svg.includes(`id="${arm}"`)) warnings.push(`角色 ${a.character} 没有部件 ${arm}，动作 ${act.type} 将无效`);
        }
        // per-character defaults (e.g. a wide-sleeved character waves with a lower arm angle)
        const rec = { ...((ch.actionDefaults || {})[act.type] || {}), ...act, start: st, end: en };
        delete rec.at; delete rec.until; delete rec.dur;
        actions.push(rec);
      }
      if (actions.length || expressions.length) mainMotion = true;
      // auto talk windows from spoken cues
      if (a.autoTalk !== false) for (const c of cues) if (c.speaker === a.character && c.start < sc.end && c.end > sc.start) talk.push([c.start, c.end]);
      if (talk.length) mainMotion = true;
      const appear = a.appear ? (typeof a.appear === 'string' ? { type: a.appear } : { ...a.appear }) : { type: 'none' };
      appear.at = appear.at !== undefined ? T.at(appear.at, scene) : sc.start;
      appear.dur = appear.dur ?? (appear.type === 'draw' ? 1.2 : 0.35);
      const exit = a.exit ? { at: T.at(a.exit.at, scene), dur: a.exit.dur || 0.4 } : null;
      scene.items.push({ kind: 'actor', scene: sc.id, id, character: a.character, x: a.x ?? W / 2, y: a.y ?? H * 0.72, height: a.height, flip: !!a.flip,
        autoFace: a.autoFace, hide: a.hide, actions, expressions: expressions.sort((p, q) => p.t - q.t), talk, appear, exit, z: a.z ?? z++ });
    }
    for (const it of scene.items) if (it.kind === 'element' && it.attach) {
      const act = scene.items.find((x) => x.kind === 'actor' && x.id === it.attach.actor);
      if (!act) throw new Error(`${sc.id}/${it.id} 挂到了本镜头中不存在的角色 ${it.attach.actor}`);
      const ch = characters[act.character];
      if (ch.type === 'rig' && !(ch.points || {})[it.attach.point]) throw new Error(`角色 ${act.character} 没有挂点 ${it.attach.point}（character.json → points）`);
    }
    scene.items.sort((p, q) => p.z - q.z);
    if (!mainMotion) warnings.push(`镜头 ${sc.id} 没有任何主动作（相机静止且无动作/动效），画面会显得呆板`);
    // alignment check: elements bound to cues must not appear before the cue starts
    out.push(scene);
  }
  // optional style preset (prompt metadata); also suggests a medium when none is given
  let media = P.media;
  if (P.stylePreset) {
    const lib = JSON.parse(fs.readFileSync(new URL('../presets/handdrawn-styles.json', import.meta.url), 'utf8'));
    const k = String(P.stylePreset).toLowerCase();
    const st = lib.styles.find((x) => x.id.toLowerCase() === k || (x.aliases || []).some((a) => a.toLowerCase() === k));
    if (!st) warnings.push(`stylePreset「${P.stylePreset}」不在 presets/handdrawn-styles.json 中`);
    else if (!media) media = /彩铅/.test(st.name_zh) ? 'colored-pencil' : st.category === 'crayon' ? 'crayon' : st.category === 'ink' ? 'ink' : ['watercolor', 'gouache'].includes(st.category) ? 'picture-book' : 'crayon';
  }
  const project = {
    title: P.title || '', width: W, height: H, fps, duration, media: media || 'crayon', paper: P.paper || {},
    subtitle: { font: '"LXGW WenKai", "Noto Sans CJK SC", "Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif', ...(P.subtitle || {}) },
    pen: P.pen ?? true, boilFps: P.boilFps || 8, camera: P.camera || {}, characters, cues, scenes: out, stylePreset: P.stylePreset || null,
  };
  const audio = timing.audio || P.audio ? path.resolve(dir, timing.audio || P.audio) : null;
  if (audio && !fs.existsSync(audio)) warnings.push(`音频文件不存在，将输出无声视频: ${audio}`);
  return { project, warnings, audio: audio && fs.existsSync(audio) ? audio : null, file: projFile, dir };
}

function defaultDur(type) {
  return { walk: 2, move: 1.5, wave: 1.6, nod: 1.0, shake: 1.0, jump: 0.8, hop: 1.2, point: 1.5, raise: 1.5, look: 1.5, talk: 1.5, turn: 0.01, tremble: 0.8, reveal: 1.6 }[type] ?? 1;
}

/** Human-readable timeline for `check`. */
export function describe(compiled) {
  const { project, warnings } = compiled;
  const L = [];
  L.push(`《${project.title}》 ${project.width}×${project.height} @${project.fps}fps  时长 ${project.duration.toFixed(2)}s  画材 ${project.media}`);
  L.push(`字幕 ${project.cues.length} 条（时间来源：${project.cues[0]?.timing === 'words' ? '词级时间戳' : 'SRT 句级 + 句内按字线性估计'}）`);
  for (const c of project.cues) L.push(`  c${c.index} [${c.start.toFixed(2)}–${c.end.toFixed(2)}]${c.speaker ? ' <' + c.speaker + '>' : ''} ${c.text}`);
  for (const s of project.scenes) {
    L.push(`镜头 ${s.id} [${s.start.toFixed(2)}–${s.end.toFixed(2)}] 转场 ${s.transition.type}  相机关键帧 ${s.camera.keys.length}`);
    for (const it of s.items) {
      if (it.kind === 'element') L.push(`  · 元素 ${it.id.padEnd(12)} ${it.start.toFixed(2)}s 开始画 → ${(it.start + it.draw).toFixed(2)}s 画完${it.cueRef ? '  ← ' + it.cueRef : ''}${it.motions.length ? '  动效: ' + it.motions.map((m) => m.type).join(',') : ''}`);
      else L.push(`  · 角色 ${it.id} (${it.character}) 出场 ${it.appear.type}@${it.appear.at.toFixed(2)}s  动作: ${it.actions.map((a) => `${a.type}[${a.start.toFixed(2)}–${a.end.toFixed(2)}]`).join(' ') || '无'}  表情: ${it.expressions.map((e) => `${e.name}@${e.t.toFixed(2)}`).join(' ') || '默认'}  说话: ${it.talk.map(([a, b]) => `${a.toFixed(2)}–${b.toFixed(2)}`).join(' ') || '无'}`);
    }
  }
  if (warnings.length) { L.push('⚠ 警告:'); for (const w of warnings) L.push('  - ' + w); }
  return L.join('\n');
}
