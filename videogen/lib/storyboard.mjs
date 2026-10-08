// Parse the repo's storyboard prompt format (docs/skill/SKILL.md: [全局]/[角色]/…, 镜头N： or [a-b秒], 第N段)
// into a shot list (shots.json). Original code for ai-video-prompt-hub/videogen.
import fs from 'node:fs';
import path from 'node:path';

const GLOBAL_TAGS = ['全局', '风格', '角色', '场景', '站位', '摄影', '表演', '音频', '连贯', '参考', '设定', '画风'];
const NEG_TAGS = ['负面', '禁止', '负面提示词', '禁止项'];
// 镜头1： / Shot 1: / SHOT 1 — / [镜头1] / 【镜头1】 / 分镜1： / [S1]
const SHOT_RE = /^(?:\*\*)?[\[【]?\s*(?:镜头|分镜|镜|Shot|SHOT|S)\s*(\d+)\s*[\]】]?(?:\*\*)?\s*(?:[：:.、|—-]+\s*|\s+|$)(.*)$/i;
// [0-3秒] / 0–3s / 0-3 秒 / 1.5–4s / 00:00-00:06 / [00:00–00:03] (optionally followed by [镜头N])
const T = '(\\d{1,2}:\\d{2}(?:\\.\\d+)?|\\d+(?:\\.\\d+)?)';
const TIME_RE = new RegExp(`^(?:\\*\\*)?[\\[【(（]?\\s*${T}\\s*(?:s|秒)?\\s*[-–~至]\\s*${T}\\s*(?:s|秒)?\\s*[\\]】)）]?(?:\\*\\*)?\\s*(?:[\\[【]\\s*(?:镜头|Shot)\\s*\\d+\\s*[\\]】])?\\s*[：:|]?\\s*(.*)$`, 'i');
const secs = (v) => (String(v).includes(':') ? String(v).split(':').reduce((a, x) => a * 60 + +x, 0) : +v);
const SEG_RE = /^(?:#+\s*)?第\s*(\d+)\s*段(?:\s*[（(]\s*(\d+)\s*[-–~]\s*(\d+)\s*秒?\s*[)）])?\s*[：:]?\s*(.*)$/;
const TAG_RE = /^[\[【]([^\]】\d][^\]】]{0,10})[\]】]\s*[：:]?\s*(.*)$/;

export function aspectOf(text) {
  const m = text.match(/(\d{1,2})\s*[:：比]\s*(\d{1,2})/);
  if (m && ['16:9', '9:16', '4:3', '3:4', '1:1', '21:9'].includes(`${m[1]}:${m[2]}`)) return `${m[1]}:${m[2]}`;
  if (/竖屏/.test(text)) return '9:16';
  if (/横屏|宽银幕/.test(text)) return '16:9';
  return null;
}

/** Pull the prompt text out of a markdown prompt file (```text blocks) or return the text itself. */
export function extractPromptText(src) {
  const blocks = [...src.matchAll(/```(?:text|txt|prompt)?\s*\n([\s\S]*?)```/g)].map((m) => m[1]);
  if (blocks.length) return blocks.join('\n\n');
  return src.replace(/^---\n[\s\S]*?\n---\n/, '');
}

function characterNames(text) {
  const names = new Set();
  for (const m of text.matchAll(/「([^」]{1,8})」/g)) names.add(m[1]);
  return [...names];
}

/** Dialogue lines {台词}. Speaker = "角色（语气）：{…}" if written that way, else the subject (first character name)
 *  of the sentence that contains the line, else the nearest name before it. */
export function dialogue(text, names) {
  const out = [];
  for (const m of text.matchAll(/\{([^{}]+)\}/g)) {
    const before = text.slice(0, m.index);
    let speaker = null;
    const tag = before.match(/([^\s，。；：:{}]{1,8}?)(?:[（(]([^）)]{1,8})[）)])?[：:]\s*$/);
    if (tag && names.includes(tag[1])) speaker = tag[1];
    if (!speaker) {
      const sentence = before.slice(Math.max(before.lastIndexOf('。'), before.lastIndexOf('！'), before.lastIndexOf('？'), before.lastIndexOf('}')) + 1);
      let first = Infinity;
      for (const n of names) { const i = sentence.indexOf(n); if (i >= 0 && i < first) { first = i; speaker = n; } }
    }
    if (!speaker) { let best = -1; for (const n of names) { const i = before.lastIndexOf(n); if (i > best) { best = i; speaker = n; } } }
    const tone = (tag && tag[2]) || (before.slice(-14).match(/(冷声|轻声|低声|哭腔|大笑|笑着|小声|喊|怒吼|颤声|喘着气|压低声音|温柔)/) || [])[1] || null;
    out.push({ speaker, text: m[1].replace(/\s*\n\s*/g, '').trim(), ...(tone ? { tone } : {}) });
  }
  if (!out.length) { // fallback: 说：“…” / 旁白（…）："…" / 台词：「…」
    for (const m of text.matchAll(/(说|旁白[^：:\n]{0,14}|画外[^：:\n]{0,14}|台词|VO[^：:\n]{0,14})[：:]\s*[“"「『]([^”"」』]{1,60})[”"」』]/g)) {
      const narr = /旁白|画外|VO/i.test(m[1]);
      const before = text.slice(0, m.index);
      let speaker = null, first = Infinity;
      if (!narr) { const sentence = before.slice(before.lastIndexOf('。') + 1); for (const n of names) { const i = sentence.indexOf(n); if (i >= 0 && i < first) { first = i; speaker = n; } } }
      out.push({ speaker, text: m[2].replace(/\s*\n\s*/g, '').trim(), ...(narr ? { tone: '旁白' } : {}) });
    }
  }
  return out;
}

const unclosed = (t) => (t.match(/"/g) || []).length % 2 === 1 || (t.match(/“/g) || []).length > (t.match(/”/g) || []).length || (t.match(/\{/g) || []).length > (t.match(/\}/g) || []).length;
const sfxOf = (t) => [...t.matchAll(/<([^<>]{1,30})>/g)].map((m) => m[1]);

/**
 * @param {string} src  storyboard text (or markdown with ```text blocks)
 * @param {object} o    {unit: 'shot'|'segment', aspect, defaultShot: 4, title}
 */
export function parseStoryboard(src, o = {}) {
  const text = extractPromptText(src).replace(/\r/g, '');
  const segs = [];
  let seg = null;
  const newSeg = (n, a, b, rest) => { seg = { n: n ?? segs.length + 1, start: a, end: b, global: [], tail: [], negative: [], shots: [], raw: [] }; segs.push(seg); if (rest) seg.global.push(rest); };
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    let m;
    if ((m = line.match(SEG_RE))) { newSeg(+m[1], m[2] != null ? +m[2] : null, m[3] != null ? +m[3] : null, m[4]); continue; }
    if (!seg) newSeg(1, null, null);
    seg.raw.push(line);
    if ((m = line.match(TIME_RE)) && secs(m[2]) > secs(m[1])) { seg.shots.push({ n: seg.shots.length + 1, text: m[3], from: secs(m[1]), to: secs(m[2]) }); continue; }
    if ((m = line.match(SHOT_RE)) && (m[2] || /[：:]$/.test(line))) { seg.shots.push({ n: +m[1], text: m[2], from: null, to: null }); continue; }
    if ((m = line.match(TAG_RE))) {
      const tag = m[1].trim();
      if (NEG_TAGS.includes(tag)) { seg.negative.push(m[2]); continue; }
      if (tag === '分镜') { if (m[2]) seg.global.push(m[2]); continue; }
      if (GLOBAL_TAGS.includes(tag) || !seg.shots.length) { seg.global.push(`[${tag}] ${m[2]}`); continue; }
    }
    // free text: before the first shot = global context; after shots = trailing constraint that applies to all shots
    if (!seg.shots.length) seg.global.push(line);
    else if (unclosed(seg.shots.at(-1).text) || /^(?:[（(]?(?:续|接上)|声音|台词|音效|对白|画外|旁白|VO|SFX|运镜|动作|表情|末帧|结束)/i.test(line)) seg.shots.at(-1).text += '\n' + line;
    else seg.tail.push(line);
  }
  // later segments that say "沿用第1段" inherit the global/negative blocks of the previous segment
  segs.forEach((s, i) => {
    if (i && (s.global.join('').match(/沿用|同第\s*\d+\s*段|不变/) || !s.global.length)) {
      s.inherited = true;
      s.global = [...segs[i - 1].global, ...s.global];
      if (!s.negative.length) s.negative = [...segs[i - 1].negative];
    }
  });
  const all = text;
  const aspect = o.aspect || aspectOf(segs[0]?.global.join(' ') || all) || '9:16';
  const names = characterNames(all);
  const totalOf = (s) => { const g = s.global.join(' '); const m = g.match(/(\d{1,3})\s*秒/) || g.match(/(\d{1,3})[-\s]?(?:seconds?|secs?)\b/i); return s.end != null && s.start != null ? s.end - s.start : m ? +m[1] : null; };
  const shots = [];
  for (const s of segs) {
    const S = String(s.n).padStart(2, '0');
    const ctx = s.global.join('\n');
    const negative = s.negative.join('；');
    const tail = s.tail.join('\n');
    if (o.unit === 'segment' || !s.shots.length) {
      const body = s.raw.filter((l) => !NEG_TAGS.some((t) => l.startsWith(`[${t}]`))).join('\n');
      shots.push(mkShot(`S${S}_all`, s.n, 0, totalOf(s) || s.shots.reduce((a, x) => a + (x.to != null ? x.to - x.from : o.defaultShot || 4), 0) || 8, body, body, negative, names, aspect, s));
      continue;
    }
    const total = totalOf(s);
    const untimed = s.shots.filter((x) => x.to == null).length;
    const timedSum = s.shots.reduce((a, x) => a + (x.to != null ? x.to - x.from : 0), 0);
    const each = untimed ? (total && total > timedSum ? (total - timedSum) / untimed : o.defaultShot || 4) : 0;
    s.shots.forEach((x, k) => {
      const dur = x.to != null ? x.to - x.from : Math.round(each * 2) / 2;
      const order = `（共 ${s.shots.length} 个镜头中的第 ${k + 1} 个；只生成这一个镜头，单镜头，不要切镜）`;
      const prompt = [ctx, `${x.to != null ? `[${x.from}-${x.to}秒]` : `镜头${x.n}`}：${x.text}`, tail, order].filter(Boolean).join('\n');
      shots.push(mkShot(`S${S}_shot${String(k + 1).padStart(2, '0')}`, s.n, k + 1, dur, prompt, x.text, negative, names, aspect, s));
    });
  }
  // guess a voice per character from the words around its definition (女人/他/姐姐…); users can edit shots.json
  const FEMALE = /女|她|姐|妹|妈|娘|妻|婆|姑|小姐|公主|少女|母|夫人|妃|后/;
  const MALE = /男|他|哥|弟|爸|爹|夫|公子|先生|少年|父|王爷|叔|爷/;
  const pools = { f: ['kokoro:zf_017', 'kokoro:zf_074', 'kokoro:zf_092', 'kokoro:zf_001'], m: ['kokoro:zm_052', 'kokoro:zm_045', 'kokoro:zm_016', 'kokoro:zm_062'] };
  const used = { f: 0, m: 0 };
  let unk = 0;
  const voices = {};
  for (const n of names) {
    const i = all.indexOf(`「${n}」`);
    const near = all.slice(Math.max(0, i - 30), i + n.length + 22);
    const fem = (near.match(new RegExp(FEMALE.source, 'g')) || []).length, mal = (near.match(new RegExp(MALE.source, 'g')) || []).length;
    const g = fem === mal ? (unk++ % 2 ? 'm' : 'f') : fem > mal ? 'f' : 'm';
    voices[n] = pools[g][used[g]++ % pools[g].length];
  }
  return {
    version: 1,
    title: o.title || 'storyboard',
    aspect,
    fps: 30,
    unit: o.unit || 'shot',
    characters: names.map((n) => ({ name: n, refs: [] })),
    voice: { engine: 'local', narrator: 'kokoro:zf_001', characters: voices },
    bgm: null,
    shots,
  };
}

function mkShot(id, seg, index, duration, prompt, shotText, negative, names, aspect, s) {
  const refs = [...new Set([...(prompt.match(/@(?:图片|图像|视频|音频)\d+/g) || [])])].map((tag) => ({ tag, path: null, url: null, role: /视频/.test(tag) ? 'reference_video' : 'reference_image' }));
  return {
    id, segment: seg, index, duration: Math.max(1, duration), aspect,
    prompt_zh: prompt,
    prompt_en: '',
    shot_text: shotText,
    negative,
    refs,
    first_frame: null,
    lines: dialogue(shotText, names),
    sfx: sfxOf(shotText),
    fit: 'auto',
    source: null,
    clip: null,
  };
}

export function readStoryboardFile(file, o = {}) {
  const src = fs.readFileSync(file, 'utf8');
  if (/\.json$/i.test(file)) return JSON.parse(src);
  return parseStoryboard(src, { title: path.basename(file).replace(/\.\w+$/, ''), ...o });
}
