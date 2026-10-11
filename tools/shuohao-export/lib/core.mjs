/**
 * H3 / Seedance storyboard export helpers + hub shots.json bridge.
 *
 * Absorbed & adapted from eternityspring/shuohao-skills
 *   skills/novel-storyboard/scripts/novel-storyboard.mjs
 * Apache-2.0, Copyright 2026 烁皓.
 * Upstream: https://github.com/eternityspring/shuohao-skills
 * Hub adaptations (Apache-2.0, (c) 2026 天机): shots.json bridge, pack write.
 *
 * See references/*.md and NOTICE / ATTRIBUTION.md /
 * LICENSES/eternityspring_shuohao-skills-Apache-2.0.txt
 */
import fs from 'node:fs';
import path from 'node:path';

export const DEFAULT_PARAMS = {
  maxSegmentSeconds: 15,
  minCutSeconds: 2,
  maxCutSeconds: 5,
  maxOnScreen: 3,
  tolerance: 0.15,
};

export function paramsOf(doc) {
  return { ...DEFAULT_PARAMS, ...(doc?.params ?? {}) };
}

export const SHOT_SIZES = {
  'extreme-wide': { zh: '大远景', phrase: 'extreme wide shot' },
  wide: { zh: '全景', phrase: 'wide shot' },
  medium: { zh: '中景', phrase: 'medium shot' },
  close: { zh: '特写', phrase: 'close-up' },
  'extreme-close': { zh: '大特写', phrase: 'extreme close-up' },
};

export const CAMERA_MOVES = {
  'Static Shot': '固定',
  'Push In': '推',
  'Pull Out': '拉',
  'Zoom In': '变焦推',
  'Zoom Out': '变焦拉',
  'Pan Left': '左摇',
  'Pan Right': '右摇',
  'Truck Left': '左移',
  'Truck Right': '右移',
  'Tilt Up': '仰摇',
  'Tilt Down': '俯摇',
  'Pedestal Up': '升',
  'Pedestal Down': '降',
  'Arc Shot': '环绕',
  'Tracking Shot': '跟拍',
  'Shake Slightly': '轻微晃动',
  'Shake Strongly': '强烈晃动',
  POV: '主观视角',
  'Roll Clockwise': '顺旋',
  'Roll Counterclockwise': '逆旋',
};

export const STABILITY = { stable: '稳定', 'slight-shake': '微晃', handheld: '手持' };

export const CJK = /[\u3400-\u9FFF\u3040-\u30FF\uAC00-\uD7AF]/;
export const r1 = (n) => Math.round(n * 10) / 10;

export const H3_I2VA_LINE =
  'For the target video, at 0.00 seconds into the target video, <Picture 1> (from [Shot 1]) is fully referenced.';
export const H3_FIELDS = ['integrated_multimodal_description:', 'overall_soundscape:', 'non_diegetic_music:'];

export const H3_TOKENS = {
  zh: {
    i2va: '目标视频在 0.00 秒处完全参照图 1（来自镜头 1）。',
    alignHead: '参考图与目标视频的对齐——',
    alignItem: (k, t) => `图 ${k}（来自镜头 ${k}）对齐目标视频 ${t} 秒处`,
    alignTail: '。',
    fields: ['整体视听描述：', '整体音景：', '非叙事配乐：'],
    shot: (k) => `[镜头 ${k}]`,
    cutMark: (k, time) => `[镜头 ${k}] 于 ${time}，`,
  },
  en: {
    i2va: H3_I2VA_LINE,
    alignHead: 'How the reference pictures align with the target video — ',
    alignItem: (k, t) => `Picture ${k} (from Shot ${k}) aligns with the ${t}-second mark of the target video`,
    alignTail: '.',
    fields: H3_FIELDS,
    shot: (k) => `[Shot ${k}]`,
    cutMark: (k, time) => `[Shot ${k}] At ${time},`,
  },
};

export function cutStarts(cuts) {
  const starts = [];
  let t = 0;
  for (const c of cuts ?? []) {
    starts.push(r1(t));
    t += c?.seconds ?? 0;
  }
  return starts;
}

export function h3CutTime(t) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  const ms = Math.round((t - Math.floor(t)) * 1000);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
}

export function h3AlignmentLine(cuts, lang = 'en') {
  const tk = H3_TOKENS[lang] ?? H3_TOKENS.zh;
  if (!cuts || cuts.length <= 1) return tk.i2va;
  const starts = cutStarts(cuts);
  const parts = cuts.map((_, i) => tk.alignItem(i + 1, starts[i].toFixed(2)));
  return `${tk.alignHead}${parts.join(lang === 'en' ? '; ' : '；')}${tk.alignTail}`;
}

export function h3Remainder(prompt) {
  return String(prompt ?? '')
    .replace(/<d>[\s\S]*?<\/d>/g, ' ')
    .replace(/"[^"\n]*"/g, ' ');
}

export function h3CutSlices(prompt, cutCount, lang = 'en') {
  const tk = H3_TOKENS[lang] ?? H3_TOKENS.zh;
  const h3 = String(prompt ?? '');
  const bodyStart = h3.indexOf(tk.fields[0]);
  const bodyEnd = h3.indexOf(tk.fields[1]);
  if (bodyStart < 0) return [];
  const body = h3.slice(bodyStart, bodyEnd < 0 ? undefined : bodyEnd);
  const slices = [];
  for (let k = 1; k <= cutCount; k++) {
    const a = body.indexOf(tk.shot(k));
    if (a < 0) {
      slices.push(null);
      continue;
    }
    const b = body.indexOf(tk.shot(k + 1));
    slices.push(body.slice(a, b < 0 ? undefined : b));
  }
  return slices;
}

const SEEDANCE_CAMERA = { 'Static Shot': '固定镜头', 'Push In': '推镜', 'Pull Out': '拉镜' };
export const seedanceCamera = (camera) => SEEDANCE_CAMERA[camera] ?? CAMERA_MOVES[camera] ?? '';

export const SEEDANCE_FORBIDDEN = [
  [/\d+(?:\.\d+)?\s*(?:[–\-~至到]\s*\d+(?:\.\d+)?\s*)?秒|\d{1,2}:\d{2}/, '时间'],
  [/【镜头|镜头\s*\d/, '镜头编号'],
  [/@\s*\[?图片|<Picture|\[Shot|<\/?d>/i, '图片引用或 H3 标记'],
  [/[{}<>（）]/, '协议符号'],
];

export const SEEDANCE_NO_SUBTITLES = '保持无字幕，避免生成任何文字或字幕';
export const SEEDANCE_NO_TWINS = '视频全程禁止出现外形、着装、配饰完全一致的人物';

export function slug(name) {
  const cleaned = String(name)
    .trim()
    .replace(/[\s/\\:*?"<>|·]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return cleaned || 'storyboard';
}

export const segSeconds = (segment) =>
  r1((segment?.cuts ?? []).reduce((n, c) => n + (c?.seconds ?? 0), 0));

export function seedancePrompt(seg, { names = {}, image = null, constraints = [] } = {}) {
  const nm = {
    scene: names.scene ?? ((id) => id),
    char: names.char ?? ((id) => id),
    prop: names.prop ?? ((id) => id),
  };
  const cuts = seg?.cuts ?? [];
  const frames = cuts.map((_, ci) => (image ? image('frame', `${seg.id}/f${ci + 1}.png`) : null));
  const refs = [];
  if (!cuts.length || !frames.every(Boolean)) {
    const sheet = (label) => ({ kind: 'sheet', label, file: `${slug(label)}-sheet.png` });
    for (const id of new Set(cuts.flatMap((c) => c?.characters ?? []))) {
      if (id !== 'VO') refs.push(sheet(nm.char(id)));
    }
  }
  const frameRef = new Map();
  frames.forEach((src, ci) => {
    if (!src) return;
    refs.push({ kind: 'frame', label: `分镜图 #${ci + 1}`, file: `${seg.id}/f${ci + 1}.png` });
    frameRef.set(ci, refs.length);
  });

  const out = refs.map((r, i) => `@[图片${i + 1}] = ${r.label}`);
  if (out.length) out.push('');
  const blocking = String(seg?.blocking ?? '').trim();
  if (blocking) out.push('【人物关系与构图逻辑】', blocking, '');

  cuts.forEach((cut, ci) => {
    const line = (k, v) => {
      const text = String(v ?? '').trim();
      if (text) out.push(`${k}：${text}`);
    };
    out.push(`【镜头${ci + 1}】`);
    line('焦距', cut?.lens);
    line('机位', cut?.cameraPosition);
    line('构图', cut?.composition);
    line('运镜', seedanceCamera(cut?.camera));
    line('景别', SHOT_SIZES[cut?.size]?.zh);
    const ref = frameRef.get(ci);
    const shot = String(cut?.shot ?? '').trim();
    if (shot) out.push(`画面：${shot}${ref ? `（构图参考 @图片${ref}）` : ''}`);
    line('光影', cut?.lighting);
    const spoken = (cut?.lines ?? []).filter((l) => l?.text);
    out.push(
      `台词：${
        spoken.length
          ? spoken
              .map((b) => `${b.speaker === 'VO' || b.tone === '旁白' ? '以画外音说' : ''}{${b.text}}`)
              .join(' ')
          : '{}'
      }`,
    );
    line('视线落点', cut?.eyeline);
    line('焦点', cut?.focus);
    line('稳定性', STABILITY[cut?.stability] ?? cut?.stability);
    line('音效', Array.isArray(cut?.sfx) ? cut.sfx.join('、') : cut?.sfx);
    out.push('');
  });

  const soundscape = String(seg?.soundscape ?? '').trim();
  const music = String(seg?.music ?? '').trim();
  if (soundscape) out.push(`<${soundscape}>`);
  if (music) out.push(`（${music}）`);
  if (soundscape || music) out.push('');

  const rules = [...constraints.map((c) => String(c).trim()).filter(Boolean)];
  if (!rules.includes(SEEDANCE_NO_SUBTITLES)) rules.push(SEEDANCE_NO_SUBTITLES);
  const crowded = cuts.some((c) => (c?.characters ?? []).filter((id) => id !== 'VO').length >= 2);
  if (crowded && !rules.includes(SEEDANCE_NO_TWINS)) rules.push(SEEDANCE_NO_TWINS);
  out.push('【约束】', ...rules.map((r, i) => `${i + 1}. ${r}`));
  return { prompt: out.join('\n'), refs };
}

export function buildH3Skeleton(seg, lang = 'en') {
  const tk = H3_TOKENS[lang] ?? H3_TOKENS.en;
  const cuts = seg?.cuts ?? [];
  const starts = cutStarts(cuts);
  const lines = [h3AlignmentLine(cuts, lang), '', `${tk.fields[0]}`];
  cuts.forEach((cut, i) => {
    const t = h3CutTime(starts[i]);
    const mark = i === 0 && lang === 'en' ? `[Shot 1] At ${t},` : tk.cutMark(i + 1, t);
    const cam = cut?.camera && CAMERA_MOVES[cut.camera] ? cut.camera : 'Static Shot';
    const body = String(cut?.shotEn || cut?.shot || cut?.frame || '').trim() || '(describe action)';
    const dlg = (cut?.lines ?? [])
      .filter((l) => l?.text)
      .map((l) => `<d>[Chinese] ${l.text}</d>`)
      .join(' ');
    lines.push(`${mark} ${cam}. ${body}${dlg ? ' ' + dlg : ''}`);
  });
  lines.push('', `${tk.fields[1]} ambient room tone.`, '', `${tk.fields[2]} none.`);
  return lines.join('\n');
}

export function exportPack(
  board,
  { imageExists = () => false, sheetExists = () => false, dir = '.', protocol = 'h3', names = {}, constraints = [] } = {},
) {
  const prefix = dir === '.' ? '' : `${dir}/`;
  const files = [];
  const manifest = [];
  const copies = [];
  let missingTotal = 0;
  for (const ep of board?.episodes ?? []) {
    for (const seg of ep?.segments ?? []) {
      if (protocol === 'seedance') {
        const image = (kind, rel) => (kind === 'frame' && imageExists(`${prefix}${rel}`) ? rel : null);
        const { prompt, refs } = seedancePrompt(seg, { names, image, constraints });
        const attachments = refs.map((r, i) => {
          const p = r.kind === 'frame' ? `${prefix}${r.file}` : `${prefix}${seg.id}/ref-${i + 1}.png`;
          const present = r.kind === 'frame' ? imageExists(p) : sheetExists(r.file);
          if (r.kind === 'sheet' && present) copies.push({ file: r.file, to: p });
          return { ref: `@图片${i + 1}`, label: r.label, kind: r.kind, path: p, source: r.file, present };
        });
        const missing = attachments.filter((a) => !a.present).map((a) => a.path);
        missingTotal += missing.length;
        const head = attachments.length
          ? attachments
              .map(
                (a) =>
                  `- ${a.ref} = ${a.label} → ${a.path.slice(prefix.length + seg.id.length + 1)}${a.present ? '' : '（缺）'}`,
              )
              .join('\n')
          : '- （无附件）';
        const md = `# ${seg.id} · Seedance 提示词\n\n附件按 @图片 编号依次上传：\n\n${head}\n\n视觉风格（画风层）在提交时附加，本文不含。总时长由接口参数控制，正文不写秒数。\n\n---\n\n${prompt}\n`;
        files.push({ path: `${prefix}${seg.id}/seedance.md`, content: md });
        manifest.push({
          segment: seg.id,
          seconds: segSeconds(seg),
          cuts: (seg.cuts ?? []).length,
          prompt: `${prefix}${seg.id}/seedance.md`,
          attachments,
          missing,
          hubShotIds: seg.hubShotIds ?? undefined,
        });
        continue;
      }
      const starts = cutStarts(seg.cuts);
      const mapping = (seg.cuts ?? [])
        .map(
          (_, i) =>
            `- Picture ${i + 1} = f${i + 1}.png${i === 0 ? '（**首帧**，钉 0.00 秒）' : `（钉 ${starts[i].toFixed(2)} 秒）`}`,
        )
        .join('\n');
      const promptBody = seg.h3Prompt ?? buildH3Skeleton(seg, board?.promptLang ?? 'en');
      const promptMd = `# ${seg.id} · H3 提示词\n\n首帧 = **f1.png**。图片按 Picture 序号挂载：\n\n${mapping}\n\n---\n\n${promptBody}\n`;
      files.push({ path: `${prefix}${seg.id}/prompt.md`, content: promptMd });
      const pictures = (seg.cuts ?? []).map((_, i) => `${prefix}${seg.id}/f${i + 1}.png`);
      const missing = pictures.filter((rel) => !imageExists(rel));
      missingTotal += missing.length;
      manifest.push({
        segment: seg.id,
        seconds: segSeconds(seg),
        cuts: (seg.cuts ?? []).length,
        cutStarts: starts,
        prompt: `${prefix}${seg.id}/prompt.md`,
        pictures,
        missing,
        hubShotIds: seg.hubShotIds ?? undefined,
      });
    }
  }
  const manifestName = protocol === 'seedance' ? 'seedance-manifest.json' : 'manifest.json';
  files.push({ path: `${prefix}${manifestName}`, content: `${JSON.stringify(manifest, null, 2)}\n` });
  return { files, manifest, missingTotal, copies };
}

export function toBoard(doc, opts = {}) {
  if (!doc || typeof doc !== 'object') throw new Error('输入不是 JSON 对象');
  if (Array.isArray(doc.episodes)) return { ...doc, _source: 'shuohao-storyboard' };
  if (Array.isArray(doc.shots)) return hubShotsToBoard(doc, opts);
  throw new Error('无法识别：需要 shuohao storyboard.json（episodes[]）或 hub shots.json（shots[]）');
}

function guessCamera(text) {
  const t = String(text || '');
  if (/推镜|缓缓推|推近|Push In/i.test(t)) return 'Push In';
  if (/拉镜|拉开|Pull Out/i.test(t)) return 'Pull Out';
  if (/左摇|Pan Left/i.test(t)) return 'Pan Left';
  if (/右摇|Pan Right/i.test(t)) return 'Pan Right';
  if (/跟拍|Tracking/i.test(t)) return 'Tracking Shot';
  if (/环绕|Arc/i.test(t)) return 'Arc Shot';
  if (/手持|晃/i.test(t)) return 'Shake Slightly';
  return 'Static Shot';
}

function guessSize(text) {
  const t = String(text || '');
  if (/大特写|extreme close/i.test(t)) return 'extreme-close';
  if (/特写|close-?up/i.test(t)) return 'close';
  if (/大远景|extreme wide/i.test(t)) return 'extreme-wide';
  if (/全景|wide shot/i.test(t)) return 'wide';
  return 'medium';
}

export function cleanShotBody(shotText) {
  let t = String(shotText || '');
  t = t.replace(/\{[^{}]*\}/g, '').replace(/<[^<>]{0,40}>/g, '');
  t = t.replace(/（共\s*\d+\s*个镜头[\s\S]*$/, '').trim();
  t = t.replace(/^\[?\d+[–\-]\d+秒\]?\s*/, '').replace(/^镜头\s*\d+\s*[：:]\s*/, '');
  t = t.replace(/(?:说|道|喊|问)[：:]\s*[。．]?/g, (m) => (m.includes('。') || m.includes('．') ? '。' : ''));
  return t.replace(/\s+/g, ' ').replace(/[，,]{2,}/g, '，').replace(/\s*[。．]\s*$/, '。').trim();
}

export function hubShotsToBoard(shotsDoc, { maxSegmentSeconds } = {}) {
  const cap = maxSegmentSeconds ?? DEFAULT_PARAMS.maxSegmentSeconds;
  const bySeg = new Map();
  for (const s of shotsDoc.shots ?? []) {
    const seg = s.segment ?? 1;
    if (!bySeg.has(seg)) bySeg.set(seg, []);
    bySeg.get(seg).push(s);
  }
  const segments = [];
  let segIdx = 0;
  for (const [segNum, list] of [...bySeg.entries()].sort((a, b) => a[0] - b[0])) {
    let bucket = [];
    let bucketSec = 0;
    const flush = () => {
      if (!bucket.length) return;
      segIdx += 1;
      const id = `E01-${String(segIdx).padStart(2, '0')}`;
      const cuts = bucket.map((s) => {
        const body = cleanShotBody(s.shot_text || s.prompt_zh || '');
        return {
          seconds: Math.max(0.1, Number(s.duration) || 4),
          size: guessSize(s.shot_text),
          camera: guessCamera(s.shot_text),
          shot: body,
          frame: body,
          lines: s.lines ?? [],
          characters: (s.lines ?? []).map((l) => l.speaker).filter(Boolean),
          stability: 'stable',
          lens: '',
          cameraPosition: '',
          composition: '',
          eyeline: '',
          focus: '',
          hubShotId: s.id,
        };
      });
      const charNames = [...new Set(cuts.flatMap((c) => c.characters))];
      segments.push({
        id,
        sceneIndex: 1,
        blocking: charNames.length ? `${charNames.join('、')} 同场` : '',
        soundscape: '',
        music: '',
        cuts,
        hubShotIds: bucket.map((s) => s.id),
        hubSegment: segNum,
      });
      bucket = [];
      bucketSec = 0;
    };
    for (const s of list) {
      const d = Math.max(0.1, Number(s.duration) || 4);
      if (bucket.length && bucketSec + d > cap) flush();
      bucket.push(s);
      bucketSec += d;
    }
    flush();
  }
  const names = (shotsDoc.characters ?? [])
    .map((c) => (typeof c === 'string' ? c : c.name))
    .filter(Boolean);
  return {
    source: shotsDoc.title || 'hub-shots',
    promptLang: 'en',
    params: {
      ...DEFAULT_PARAMS,
      maxSegmentSeconds: cap,
      minCutSeconds: 1,
      maxCutSeconds: Math.max(cap, 30),
    },
    characterNames: names,
    episodes: [{ ep: 1, segments }],
    _source: 'hub-shots',
  };
}

export function writePack(pack, outDir, { copiesFrom } = {}) {
  fs.mkdirSync(outDir, { recursive: true });
  for (const f of pack.files) {
    const abs = path.join(outDir, f.path);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, f.content, 'utf8');
  }
  if (copiesFrom) {
    for (const c of pack.copies ?? []) {
      const src = path.join(copiesFrom, c.file);
      if (fs.existsSync(src)) {
        const dest = path.join(outDir, c.to);
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(src, dest);
      }
    }
  }
  return outDir;
}
