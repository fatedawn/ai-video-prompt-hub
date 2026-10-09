// Unified assembly: shots (any route, or the hand-drawn animator) + default open TTS voice-over + word-timed
// subtitles + optional BGM → final MP4 (ffmpeg). Original code for ai-video-prompt-hub/videogen.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { probe, run } from './media.mjs';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const ANIMATOR = path.join(REPO, 'animator');
const SIZES = { '9:16': [1080, 1920], '16:9': [1920, 1080], '1:1': [1080, 1080], '4:3': [1440, 1080], '3:4': [1080, 1440], '21:9': [2520, 1080] };
// distinct default voices for unnamed characters (Kokoro v1.1-zh; picked by an intelligibility test, see animator/tts/README)
const POOL = ['kokoro:zf_017', 'kokoro:zm_052', 'kokoro:zf_074', 'kokoro:zm_045', 'kokoro:zf_092', 'kokoro:zm_016'];

/** Decide how a clip of length `have` fills `need` seconds. Pure (unit-tested). */
export function fitPlan(have, need, policy = 'auto', maxSlow = 1.25) {
  if (have <= 0) return { mode: 'hold', speed: 1, hold: need, trim: 0 };
  if (have >= need - 1e-3) return { mode: have > need + 1e-3 ? 'trim' : 'exact', speed: 1, hold: 0, trim: +(have - need).toFixed(3) };
  const r = need / have;
  if (policy === 'trim' || policy === 'hold') return { mode: 'hold', speed: 1, hold: +(need - have).toFixed(3), trim: 0 };
  if (policy === 'loop') return { mode: 'loop', speed: 1, hold: 0, trim: 0, loops: Math.ceil(r) };
  const lim = policy === 'slow' ? 2 : maxSlow;
  const slow = Math.min(r, lim);
  const hold = need - have * slow;
  return { mode: hold > 0.02 ? 'slow+hold' : 'slow', speed: +(1 / slow).toFixed(4), hold: +Math.max(0, hold).toFixed(3), trim: 0 };
}

/** Shot target length: planned duration, stretched so its voice-over fits (unless fit = strict). */
export function shotTarget(shot, voiceDur, o = {}) {
  const lead = o.lead ?? 0.3, tail = o.tail ?? 0.45;
  const need = voiceDur > 0 ? lead + voiceDur + tail : 0;
  return shot.fit === 'strict' ? shot.duration : Math.max(shot.duration, need);
}

const assTime = (t) => { const cs = Math.max(0, Math.round(t * 100)); return `${Math.floor(cs / 360000)}:${String(Math.floor(cs / 6000) % 60).padStart(2, '0')}:${String(Math.floor(cs / 100) % 60).padStart(2, '0')}.${String(cs % 100).padStart(2, '0')}`; };
const srtTime = (t) => { const ms = Math.round(t * 1000); return `${String(Math.floor(ms / 3600000)).padStart(2, '0')}:${String(Math.floor(ms / 60000) % 60).padStart(2, '0')}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')},${String(ms % 1000).padStart(3, '0')}`; };

/** ASS subtitles with karaoke (\kf) per character from the TTS char timestamps. */
export function buildAss(cues, W, H, o = {}) {
  const fs_ = Math.round(H * (W < H ? 0.04 : 0.056));
  const font = o.font || 'Noto Sans CJK SC';
  const head = `[Script Info]\nScriptType: v4.00+\nPlayResX: ${W}\nPlayResY: ${H}\nWrapStyle: 0\nScaledBorderAndShadow: yes\n\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\nStyle: Sub,${font},${fs_},&H0000E6FF,&H00FFFFFF,&H00202020,&H64000000,1,0,0,0,100,100,1,0,1,${Math.round(fs_ * 0.09)},${Math.round(fs_ * 0.04)},2,${Math.round(W * 0.06)},${Math.round(W * 0.06)},${Math.round(H * 0.09)},1\nStyle: Who,${font},${Math.round(fs_ * 0.6)},&H00FFFFFF,&H00FFFFFF,&H00202020,&H64000000,1,0,0,0,100,100,0,0,1,${Math.round(fs_ * 0.07)},0,2,${Math.round(W * 0.06)},${Math.round(W * 0.06)},${Math.round(H * 0.09 + fs_ * 1.25)},1\n\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n`;
  const ev = [];
  for (const c of cues) {
    const words = c.words?.length ? c.words : [{ text: c.text, start: c.start, end: c.end }];
    let k = '', pos = 0, t = c.start;
    for (const w of words) {
      const idx = c.text.indexOf(w.text, pos);
      if (idx < 0) continue;
      if (idx > pos) k += c.text.slice(pos, idx); // punctuation between tokens: no highlight time
      const pre = Math.max(0, Math.round((w.start - t) * 100));
      if (pre) k += `{\\k${pre}}`;
      k += `{\\kf${Math.max(1, Math.round((w.end - w.start) * 100))}}${w.text}`;
      t = w.end; pos = idx + w.text.length;
    }
    k += c.text.slice(pos);
    const end = c.end + (o.hold ?? 0.25);
    ev.push(`Dialogue: 0,${assTime(c.start)},${assTime(end)},Sub,${c.speaker || ''},0,0,0,,${k.replace(/\n/g, '\\N')}`);
    if (c.speaker && o.showSpeaker !== false) ev.push(`Dialogue: 0,${assTime(c.start)},${assTime(end)},Who,,0,0,0,,${c.speaker}`);
  }
  return head + ev.join('\n') + '\n';
}

function findPython() {
  if (process.env.HDA_PYTHON) return process.env.HDA_PYTHON;
  const v = path.join(ANIMATOR, '.venv', 'bin', 'python');
  return fs.existsSync(v) ? v : 'python3';
}

function findClip(shot, clipsDir, baseDir) {
  if (shot.clip && fs.existsSync(path.resolve(baseDir, shot.clip))) return path.resolve(baseDir, shot.clip);
  for (const ext of ['.mp4', '.mov', '.webm', '.mkv', '.m4v']) { const f = path.join(clipsDir, shot.id + ext); if (fs.existsSync(f)) return f; }
  return null;
}

/**
 * @param sb  storyboard/shots object
 * @param o   {baseDir, clipsDir, out, bgm, bgmVolume, clipAudio, font, size, fps, engine, allowMissing, log}
 */
// 画幅不一致时怎么处理：crop = 铺满裁切（默认，比例差 ≤15% 时）；blur = 完整保留画面 + 模糊铺底（比例差大时，避免把人物/字裁掉）；pad = 加黑边
export function frameMode(info, W, H, mode = 'auto') {
  if (mode !== 'auto') return mode;
  const r = (info.width / info.height) / (W / H);
  return Math.abs(Math.log(r)) > Math.log(1.15) ? 'blur' : 'crop';
}
export function frameFilter(info, W, H, mode = 'auto') {
  const m = frameMode(info, W, H, mode);
  if (m === 'pad') return `scale=${W}:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2:color=black,setsar=1`;
  if (m === 'blur') return `split[hda_a][hda_b];[hda_a]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},boxblur=40:2,eq=brightness=-0.06[hda_bg];[hda_b]scale=${W}:${H}:force_original_aspect_ratio=decrease[hda_fg];[hda_bg][hda_fg]overlay=(W-w)/2:(H-h)/2,setsar=1`;
  return `scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1`;
}

/** Voice of every line (character voices from sb.voice, distinct pool voices for unnamed characters). Pure. */
export function planVoices(sb) {
  const voiceCfg = sb.voice || {};
  const auto = {};
  let poolI = 0;
  const voiceOf = (sp) => (sp ? voiceCfg.characters?.[sp] || (auto[sp] ||= POOL[poolI++ % POOL.length]) : voiceCfg.narrator || 'kokoro:zf_001');
  const lines = [];
  sb.shots.forEach((s, si) => (s.lines || []).forEach((l) => lines.push({ si, speaker: l.speaker, text: l.text, voice: l.voice || voiceOf(l.speaker), speed: l.speed })));
  return { lines, auto };
}

/** Run the local TTS once for all lines into `work` (voice.srt, voice.words.json, lines/cNNN.wav).
 *  o.cache: optional directory; identical jobs are reused from there (stills2video measures durations first). */
export function synthesizeLines(lines, work, o = {}) {
  const job = { lines: lines.map(({ text, voice, speed }) => ({ text, voice, speed })), out: path.join(work, 'voice'), lead: 0, gap: 0, align: o.align || 'auto', lines_dir: path.join(work, 'lines'), models: process.env.HDA_MODELS || null };
  const key = crypto.createHash('sha1').update(JSON.stringify([job.lines, job.align])).digest('hex').slice(0, 16);
  const cdir = o.cache ? path.join(o.cache, key) : null;
  const files = ['voice.srt', 'voice.words.json'];
  fs.mkdirSync(work, { recursive: true });
  if (cdir && files.every((f) => fs.existsSync(path.join(cdir, f)))) {
    for (const f of files) fs.copyFileSync(path.join(cdir, f), path.join(work, f));
    fs.cpSync(path.join(cdir, 'lines'), path.join(work, 'lines'), { recursive: true });
  } else {
    const r = spawnSync(findPython(), [path.join(ANIMATOR, 'tts', 'tts_local.py')], { input: JSON.stringify(job), encoding: 'utf8', stdio: ['pipe', 'pipe', 'inherit'], maxBuffer: 1 << 26 });
    if (r.status !== 0) throw new Error('TTS 失败：先在 animator/ 里运行 npm run setup:tts（或设置 HDA_PYTHON）');
    if (cdir) {
      fs.mkdirSync(cdir, { recursive: true });
      for (const f of files) fs.copyFileSync(path.join(work, f), path.join(cdir, f));
      fs.cpSync(path.join(work, 'lines'), path.join(cdir, 'lines'), { recursive: true });
    }
  }
  const cuesAbs = JSON.parse(fs.readFileSync(path.join(work, 'voice.words.json'), 'utf8'));
  const srt = fs.readFileSync(path.join(work, 'voice.srt'), 'utf8');
  const starts = [...srt.matchAll(/(\d\d):(\d\d):(\d\d),(\d{3}) --> (\d\d):(\d\d):(\d\d),(\d{3})/g)].map((m) => [(+m[1] * 3600 + +m[2] * 60 + +m[3] + +m[4] / 1000), (+m[5] * 3600 + +m[6] * 60 + +m[7] + +m[8] / 1000)]);
  const lineDur = starts.map(([a, b]) => b - a);
  const words = cuesAbs.map((c, i) => c.words.map((w) => ({ text: w.text, start: w.start - starts[i][0], end: w.end - starts[i][0] })));
  return { words, lineDur };
}

// ffmpeg xfade transition names usable as shot.transition / --transition (ffmpeg ≥ 4.3; checked against ffmpeg 7)
export const XFADE = ['fade', 'dissolve', 'fadeblack', 'fadewhite', 'fadegrays', 'wipeleft', 'wiperight', 'wipeup', 'wipedown', 'slideleft', 'slideright', 'slideup', 'slidedown',
  'smoothleft', 'smoothright', 'smoothup', 'smoothdown', 'circleopen', 'circleclose', 'circlecrop', 'rectcrop', 'radial', 'pixelize', 'diagtl', 'diagtr', 'diagbl', 'diagbr',
  'hlslice', 'hrslice', 'vuslice', 'vdslice', 'hblur', 'distance', 'squeezeh', 'squeezev', 'zoomin', 'horzopen', 'horzclose', 'vertopen', 'vertclose', 'coverleft', 'coverright', 'revealleft', 'revealright'];

/** Normalise a transition spec ('fade', 'xfade:circleopen', 'huashu:inkBloom', {type, dur}, 'cut') → {type, dur} | null. Pure. */
export function transitionSpec(t, def = null) {
  const v = t ?? def;
  if (!v || v === 'cut' || v === 'none') return null;
  const o = typeof v === 'string' ? { type: v } : { ...v };
  if (!o.type || o.type === 'cut' || o.type === 'none') return null;
  if (o.type.startsWith('xfade:')) o.type = o.type.slice(6);
  o.dur = +(o.dur ?? (o.type.startsWith('huashu:') ? 0.6 : 0.5));
  return o;
}

/** Per-boundary transition durations, clamped so a transition never eats more than 45% of either neighbour. Pure. */
export function transitionPlan(shots, targets, def = null) {
  return shots.map((s, i) => {
    if (i === shots.length - 1) return null;
    const t = transitionSpec(s.transition, def);
    if (!t) return null;
    t.dur = +Math.max(0.1, Math.min(t.dur, targets[i] * 0.45, targets[i + 1] * 0.45)).toFixed(3);
    return t;
  });
}

export function assemble(sb, o) {
  const log = o.log || console.log;
  const baseDir = o.baseDir || '.';
  const clipsDir = path.resolve(baseDir, o.clipsDir || 'clips');
  const out = path.resolve(o.out || path.join(baseDir, 'final.mp4'));
  const work = out.replace(/\.mp4$/i, '') + '.work';
  fs.rmSync(work, { recursive: true, force: true });
  fs.mkdirSync(work, { recursive: true });
  const [W, H] = o.size ? o.size.split('x').map(Number) : SIZES[sb.aspect] || SIZES['9:16'];
  const fps = o.fps || sb.fps || 30;

  // 0) shots that come from the hand-drawn animator are rendered first
  for (const s of sb.shots) {
    if (s.source?.type === 'animator' && !findClip(s, clipsDir, baseDir)) {
      const proj = path.resolve(baseDir, s.source.project);
      log(`  渲染手绘镜头 ${s.id} ← ${path.relative(process.cwd(), proj)}`);
      fs.mkdirSync(clipsDir, { recursive: true });
      run(process.execPath, [path.join(ANIMATOR, 'src', 'cli.mjs'), 'render', proj, '--out', path.join(clipsDir, `${s.id}.mp4`), '--no-audio'], { stdio: ['ignore', 'ignore', 'pipe'] });
    }
  }

  // 1) voice-over with the default open TTS (one job, per-line files + char timestamps)
  const voiceCfg = sb.voice || {};
  const { lines, auto } = planVoices(sb);
  let words = [], lineDur = [];
  if (lines.length && (o.engine || voiceCfg.engine) !== 'none') {
    log(`  配音：${lines.length} 句（本地开源 TTS）`);
    ({ words, lineDur } = synthesizeLines(lines, work, { align: o.align, cache: o.ttsCache }));
  }

  // 2) timeline: each shot's target length; lines are laid out inside their shot
  const GAP = 0.25, LEAD = 0.3;
  let t = 0;
  const plan = [];
  const cues = [];
  sb.shots.forEach((s, si) => {
    const mine = lines.map((l, i) => ({ ...l, i })).filter((l) => l.si === si);
    const vdur = mine.reduce((a, l) => a + (lineDur[l.i] || 0), 0) + Math.max(0, mine.length - 1) * GAP;
    const target = shotTarget(s, vdur, { lead: LEAD });
    let lt = t + LEAD;
    for (const l of mine) {
      cues.push({ start: lt, end: lt + (lineDur[l.i] || 0), text: l.text, speaker: l.speaker, file: path.join(work, 'lines', `c${String(l.i + 1).padStart(3, '0')}.wav`), words: (words[l.i] || []).map((w) => ({ ...w, start: w.start + lt, end: w.end + lt })) });
      lt += (lineDur[l.i] || 0) + GAP;
    }
    plan.push({ shot: s, start: t, target: +target.toFixed(3), voice: +vdur.toFixed(3) });
    t += target;
  });
  const total = t;

  // 3) normalise every clip to W×H@fps, fitted to its target length (+ the tail an outgoing transition overlaps)
  const trans = transitionPlan(sb.shots, plan.map((p) => p.target), o.transition ?? sb.transition);
  const segs = [];
  const report = [];
  plan.forEach((p0, i) => {
    const p = { ...p0, target: +(p0.target + (trans[i]?.dur || 0)).toFixed(3) };
    const s = p.shot;
    const clip = findClip(s, clipsDir, baseDir);
    const seg = path.join(work, `seg${String(i).padStart(3, '0')}.mp4`);
    const scale = `scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1`;
    if (!clip) {
      if (!o.allowMissing) throw new Error(`缺少镜头 ${s.id} 的视频（clips/${s.id}.mp4）。先 import / gen，或加 --allow-missing 用黑场占位`);
      const aud = o.clipAudio ? ['-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo', '-c:a', 'aac', '-shortest'] : [];
      run('ffmpeg', ['-v', 'error', '-y', '-f', 'lavfi', '-i', `color=c=0x202020:s=${W}x${H}:r=${fps}:d=${p.target}`, ...aud, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', seg]);
      report.push({ id: s.id, clip: null, ...p0, shot: undefined, fit: { mode: 'missing' } });
      segs.push(seg); return;
    }
    const info = probe(clip);
    const fp = fitPlan(info.duration, p.target, s.fit || o.fit || 'auto');
    const vf = [];
    const inArgs = [];
    if (fp.mode === 'loop') inArgs.push('-stream_loop', String(fp.loops));
    if (fp.speed !== 1) vf.push(`setpts=PTS/${fp.speed}`);
    vf.push(`fps=${fps}`, frameFilter(info, W, H, o.frame || 'auto', fp));
    if (fp.hold > 0) vf.push(`tpad=stop_mode=clone:stop_duration=${fp.hold + 0.1}`);
    const ins = ['-v', 'error', '-y', ...inArgs, '-i', clip];
    const outs = ['-vf', vf.join(','), '-t', String(p.target), '-map', '0:v'];
    if (o.clipAudio && info.hasAudio) {
      const af = [];
      if (fp.speed !== 1) af.push(`atempo=${Math.max(0.5, fp.speed)}`);
      af.push('apad', `volume=${o.clipAudio}`);
      outs.push('-map', '0:a', '-af', af.join(','), '-c:a', 'aac', '-ar', '48000', '-ac', '2');
    } else if (o.clipAudio) { ins.push('-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo'); outs.push('-map', '1:a', '-c:a', 'aac'); }
    else outs.push('-an');
    const args = [...ins, ...outs, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'veryfast', seg];
    run('ffmpeg', args);
    fp.frame = frameMode(info, W, H, o.frame || 'auto');
    report.push({ id: s.id, clip: path.relative(baseDir, clip), clipDuration: +info.duration.toFixed(3), size: `${info.width}x${info.height}`, start: +p.start.toFixed(3), target: p0.target, voice: p.voice, fit: fp, ...(trans[i] ? { transition: trans[i] } : {}) });
    segs.push(seg);
  });
  // transitions: shot i+1 still starts at its planned time; the transition plays over its first `dur` seconds,
  // blending shot i's extra tail with shot i+1's head (same timing as ffmpeg xfade, so voice cues stay in place)
  let pieces = segs;
  if (trans.some(Boolean)) {
    pieces = [];
    const enc = ['-an', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'veryfast', '-r', String(fps)];
    plan.forEach((p, i) => {
      const head = i > 0 && trans[i - 1] ? trans[i - 1].dur : 0;
      const body = path.join(work, `body${String(i).padStart(3, '0')}.mp4`);
      run('ffmpeg', ['-v', 'error', '-y', '-ss', String(head), '-i', segs[i], '-t', String(+(p.target - head).toFixed(3)), ...enc, body]);
      pieces.push(body);
      const t = trans[i];
      if (!t) return;
      const tf = path.join(work, `trans${String(i).padStart(3, '0')}.mp4`);
      if (t.type.startsWith('huashu:') || !XFADE.includes(t.type)) {
        if (!o.transitionRenderer) throw new Error(`转场 ${t.type} 需要外部渲染器（stills2video 提供 huashu:* 转场）；ffmpeg 可用：${XFADE.join(' ')}`);
        o.transitionRenderer({ type: t.type, dur: t.dur, a: segs[i], aStart: p.target, b: segs[i + 1], out: tf, W, H, fps });
      } else {
        run('ffmpeg', ['-v', 'error', '-y', '-ss', String(p.target), '-t', String(t.dur), '-i', segs[i], '-t', String(t.dur), '-i', segs[i + 1],
          '-filter_complex', `[0:v]settb=AVTB,fps=${fps}[a];[1:v]settb=AVTB,fps=${fps}[b];[a][b]xfade=transition=${t.type}:duration=${t.dur}:offset=0,format=yuv420p`, '-t', String(t.dur), ...enc, tf]);
      }
      pieces.push(tf);
    });
  }
  fs.writeFileSync(path.join(work, 'concat.txt'), pieces.map((f) => `file '${f.replace(/'/g, "'\\''")}'`).join('\n'));
  const video = path.join(work, 'video.mp4');
  run('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', path.join(work, 'concat.txt'), '-c', 'copy', video]);

  // 4) audio: voice lines at their times (+ optional ducked BGM, + optional clip audio)
  const audio = path.join(work, 'mix.wav');
  const inputs = [], filters = [], labels = [];
  cues.forEach((c, i) => { inputs.push('-i', c.file); filters.push(`[${i}:a]aresample=48000,aformat=channel_layouts=stereo,adelay=${Math.round(c.start * 1000)}:all=1[v${i}]`); labels.push(`[v${i}]`); });
  let n = cues.length;
  const voiceLbl = n ? '[voice]' : null;
  if (n) filters.push(`${labels.join('')}amix=inputs=${n}:normalize=0:dropout_transition=0,apad=whole_dur=${total}[voice]`);
  const mixIn = [];
  if (o.bgm) {
    inputs.push('-stream_loop', '-1', '-i', path.resolve(baseDir, o.bgm));
    const bi = n++;
    filters.push(`[${bi}:a]aresample=48000,aformat=channel_layouts=stereo,atrim=0:${total},volume=${o.bgmVolume ?? 0.22},afade=t=in:d=0.6,afade=t=out:st=${Math.max(0, total - 1.5)}:d=1.5[bgm0]`);
    if (voiceLbl) { filters.push('[voice]asplit=2[voice][vsc]', '[bgm0][vsc]sidechaincompress=threshold=0.02:ratio=8:attack=15:release=350[bgm]'); mixIn.push('[voice]', '[bgm]'); } else mixIn.push('[bgm0]');
  } else if (voiceLbl) mixIn.push('[voice]');
  if (o.clipAudio) { inputs.push('-i', video); const ci = n++; filters.push(`[${ci}:a]aresample=48000[clipa]`); mixIn.push('[clipa]'); }
  if (mixIn.length) {
    filters.push(`${mixIn.join('')}amix=inputs=${mixIn.length}:normalize=0:dropout_transition=0,atrim=0:${total},alimiter=limit=0.95[out]`);
    run('ffmpeg', ['-v', 'error', '-y', ...inputs, '-filter_complex', filters.join(';'), '-map', '[out]', '-ar', '48000', audio]);
  } else run('ffmpeg', ['-v', 'error', '-y', '-f', 'lavfi', '-i', `anullsrc=r=48000:cl=stereo`, '-t', String(total), audio]);

  // 5) subtitles (burned karaoke ASS + sidecar SRT) and final encode
  const ass = path.join(work, 'subs.ass');
  fs.writeFileSync(ass, buildAss(cues, W, H, { font: o.font }));
  fs.writeFileSync(out.replace(/\.mp4$/i, '.srt'), cues.map((c, i) => `${i + 1}\n${srtTime(c.start)} --> ${srtTime(c.end + 0.25)}\n${c.text}\n`).join('\n'));
  const esc = (p) => p.replace(/\\/g, '/').replace(/:/g, '\\:').replace(/'/g, "\\'");
  const vf = cues.length && o.subtitles !== false ? ['-vf', `ass='${esc(ass)}'`] : [];
  run('ffmpeg', ['-v', 'error', '-y', '-i', video, '-i', audio, ...vf, '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', String(o.crf ?? 20), '-preset', 'medium', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', '-t', String(total), out]);
  const tl = { out, size: `${W}x${H}`, fps, duration: +total.toFixed(3), voices: { ...voiceCfg.characters, ...auto, '(旁白)': voiceCfg.narrator || 'kokoro:zf_001' }, shots: report, cues: cues.map(({ start, end, text, speaker }) => ({ start: +start.toFixed(3), end: +end.toFixed(3), text, speaker })) };
  fs.writeFileSync(out.replace(/\.mp4$/i, '.timeline.json'), JSON.stringify(tl, null, 2));
  if (!o.keepWork) fs.rmSync(work, { recursive: true, force: true });
  return tl;
}
