#!/usr/bin/env node
// handdrawn-animator CLI. Original code for ai-video-prompt-hub/animator.
import fs from 'node:fs';
import path from 'node:path';
import { compileProject, describe, loadCharacter } from './project.mjs';

const HELP = `用法: node src/cli.mjs <命令> [参数]

命令:
  check   <project.json|yaml>                 校验工程并打印时间轴（不渲染）
  render  <project> [--out out.mp4]           渲染 MP4
          [--scale 0.5] [--from 0 --to 5] [--workers 4] [--png] [--crf 20] [--no-audio]
          [--srt x.srt --words x.words.json --audio x.mp3]   临时替换时间轴/音频（镜头脚本不用改）
  stills  <project> --at 1.2,3.4 [--dir out/frames]   导出指定时刻的 PNG
  probe   <project> [--at t] [--out timeline.json]   导出每个元素的出现时间与屏幕位置（对齐 QA 用）
  preview <project>                           启动本地预览页（可拖动时间轴，人工校对时序）
  init    [目录] [--character tianji]           用默认模板（主持人：天机）新建工程
  synccheck <project> <video.mp4> [--md report.md]  图文对齐检查（消融法：成片 vs 去掉该元素重渲染）
  sheet   <character.json> [--out sheet.png] [--media crayon] [--transparent]
                                              渲染角色设定图（各表情 + 说话 + 动作）并输出每格裁切坐标
  styles  [--search 蜡笔] [--featured] [--show <id>]   查询可选画风预设（AI 生图提示词用）
  fx                                          列出电影感特效：35 种风格配方背景、50+ 转场、粒子、素描上色/水墨开场、后期层、运镜
  make    <project.json|script.txt> [--out x.mp4]   一条命令出片：配音(TTS) → SRT/字级时间戳 → 渲染 → 带声音+字幕的 MP4
          [--engine local|edge|none] [--voice kokoro:zm_052] [--character tianji] [--scale 0.5]
  tts     <project> [--engine local|edge] [--voice kokoro:zm_052]   只生成配音 + SRT + 字级时间戳
          默认 local = 本地开源 TTS（Kokoro v1.1-zh / sherpa-onnx，CPU、免费、离线）；edge = 在线 edge-tts（可选）
`;

function args(argv) {
  const o = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const k = a.slice(2);
      const v = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
      o[k] = v;
    } else o._.push(a);
  }
  return o;
}

async function renderTo(compiled, outFile, a) {
  const B = await import('./browser.mjs');
  const { project } = compiled;
  const out = path.resolve(outFile);
  for (const w of compiled.warnings) console.warn('⚠ ' + w);
  console.log(`渲染 ${project.title || compiled.file} → ${out}`);
  const r = await B.renderVideo(project, out, { from: a.from ? +a.from : undefined, to: a.to ? +a.to : undefined, workers: a.workers ? +a.workers : undefined,
    png: !!a.png, crf: a.crf ? +a.crf : 20, audio: a['no-audio'] ? null : compiled.audio, progress: true });
  // sidecar SRT so players / editors can show soft subtitles too
  const { writeSrt } = await import('./srt.mjs');
  fs.writeFileSync(out.replace(/\.mp4$/i, '.srt'), writeSrt(project.cues));
  console.log(`完成：${r.frames} 帧，用时 ${r.seconds.toFixed(1)}s${compiled.audio ? '，已混入音频' : '，无声（未提供音频）'}`);
  return out;
}

/** One command: script.txt / project -> TTS (audio + SRT + char timestamps) -> render -> MP4 with audio + burned subtitles. */
async function makeCmd(a) {
  const src = path.resolve(a._[0] || '');
  if (!a._[0] || !fs.existsSync(src)) throw new Error('用法: make <project.json|script.txt> [--out x.mp4] [--engine local|edge|none] [--voice …] [--character tianji]');
  const out = path.resolve(a.out || path.join(path.dirname(src), 'out', path.basename(src).replace(/\.\w+$/, '') + '.mp4'));
  const base = out.replace(/\.mp4$/i, '');
  let proj = src;
  if (/\.(txt|md)$/i.test(src)) {
    const { scriptToProject } = await import('./autoscript.mjs');
    const wd = base + '.work';
    fs.mkdirSync(wd, { recursive: true });
    proj = path.join(wd, 'project.json');
    fs.writeFileSync(proj, JSON.stringify(scriptToProject(src, wd, { character: a.character, media: a.media }), null, 2) + '\n');
    console.log(`[1/3] 台词 → 工程：${proj}（可以改它再重跑 make ${path.relative(process.cwd(), proj)}）`);
  }
  const P = JSON.parse(JSON.stringify((await import('./project.mjs')).readStructured(proj)));
  let over = {};
  if ((a.engine || P.tts?.engine) !== 'none' && P.script?.length) {
    const { synthesize } = await import('./tts.mjs');
    console.log(`[2/3] 配音（${a.engine || P.tts?.engine || 'local'}）…`);
    const t = synthesize(proj, { ...a, out: base + '.voice' });
    if (t.rtf) console.log(`      ${t.seconds}s 音频，用时 ${t.wall}s（实时率 ${t.rtf}）`);
    over = { srt: t.srt, words: t.words, audio: t.audio };
  } else console.log('[2/3] 跳过配音：使用工程 timing 里的 SRT / 音频');
  const compiled = compileProject(proj, { srt: a.srt || over.srt, words: a.words || over.words, audio: a.audio || over.audio });
  if (a.scale) compiled.project.renderScale = parseFloat(a.scale);
  console.log('[3/3] 渲染…');
  return renderTo(compiled, out, a);
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const a = args(rest);
  if (!cmd || cmd === 'help' || a.help) { console.log(HELP); return; }
  if (cmd === 'styles') { const { stylesCmd } = await import('./styles.mjs'); return stylesCmd(a); }
  if (cmd === 'fx') { const { fxCmd } = await import('./fxcatalog.mjs'); return fxCmd(a); }
  if (cmd === 'tts') { const { ttsCmd } = await import('./tts.mjs'); return ttsCmd(a); }
  if (cmd === 'sheet') return sheetCmd(a);
  if (cmd === 'init') {
    // new project from the default template (host: 天机); paths are rewritten relative to the new folder
    const dir = path.resolve(a._[0] || 'my-video');
    if (fs.existsSync(path.join(dir, 'project.json'))) throw new Error(`${dir}/project.json 已存在`);
    fs.mkdirSync(dir, { recursive: true });
    const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
    const tpl = JSON.parse(fs.readFileSync(path.join(root, 'templates/project.json'), 'utf8'));
    const rel = (p) => path.relative(dir, path.join(root, p)).split(path.sep).join('/');
    tpl.$schema = rel('schema/project.schema.json');
    const ch = a.character || 'tianji';
    tpl.characters = { [ch]: rel(`characters/${ch}/character.json`) };
    if (ch !== 'tianji') { tpl.script.forEach((l) => { if (l.speaker) l.speaker = ch; }); tpl.scenes.forEach((sc) => (sc.actors || []).forEach((x) => { x.character = ch; x.actions = x.actions.filter((q) => q.type !== 'reveal').map((q) => (q.name === 'smug' ? { ...q, name: 'happy' } : q)); })); }
    fs.writeFileSync(path.join(dir, 'project.json'), JSON.stringify(tpl, null, 2) + '\n');
    fs.copyFileSync(path.join(root, 'templates/script.srt'), path.join(dir, 'script.srt'));
    console.log(`已创建 ${dir}/project.json 和 script.srt（主持人：${ch}）\n下一步：改 script.srt 台词 → node src/cli.mjs check ${path.relative(process.cwd(), dir)}/project.json → render`);
    return;
  }
  if (cmd === 'synccheck') {
    const [file, video] = a._;
    if (!file || !video) throw new Error('用法: synccheck <project> <video.mp4> [--md report.md] [--json out.json]');
    const { compileProject } = await import('./project.mjs');
    const c = compileProject(file, { srt: a.srt, words: a.words });
    const { syncCheck } = await import('./synccheck.mjs');
    const r = await syncCheck(c.project, path.resolve(video), { md: a.md, json: a.json });
    console.log(r.text);
    return;
  }
  if (cmd === 'make') return makeCmd(a);
  const file = a._[0];
  if (!file) throw new Error('缺少工程文件路径\n' + HELP);
  const compiled = compileProject(file, { srt: a.srt, words: a.words, audio: a.audio });
  const { project } = compiled;
  if (a.scale) project.renderScale = parseFloat(a.scale);
  if (cmd === 'check') { console.log(describe(compiled)); return; }
  const B = await import('./browser.mjs');
  if (cmd === 'render') return renderTo(compiled, a.out || path.join(compiled.dir, 'out', path.basename(file).replace(/\.\w+$/, '') + '.mp4'), a);
  if (cmd === 'stills') {
    const times = String(a.at || '0').split(',').map(Number);
    const files = await B.renderStills(project, times, path.resolve(a.dir || path.join(compiled.dir, 'out', 'frames')));
    files.forEach((f) => console.log(f));
    return;
  }
  if (cmd === 'probe') {
    const items = await B.probeTimeline(project, a.at ? +a.at : 0);
    const rep = { cues: project.cues.map(({ index, start, end, text, speaker, timing }) => ({ index, start, end, text, speaker, timing })), elements: items };
    // boxes at the moment each element finishes drawing
    const boxes = await B.withRenderer(project, async ([pg]) => {
      const res = {};
      for (const it of items) res[it.scene + '/' + it.id] = (await pg.evaluate((t) => window.__probe(t), Math.min(project.duration - 0.01, it.drawEnd + 0.05))).find((x) => x.scene === it.scene && x.id === it.id).box;
      return res;
    });
    rep.elements.forEach((e) => { e.boxAtDrawEnd = boxes[e.scene + '/' + e.id]; });
    const out = a.out ? path.resolve(a.out) : null;
    if (out) { fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, JSON.stringify(rep, null, 2)); console.log(out); } else console.log(JSON.stringify(rep, null, 2));
    return;
  }
  if (cmd === 'preview') {
    const { port } = await B.startServer(project);
    console.log(`预览地址: http://127.0.0.1:${port}/index.html?preview=1   （Ctrl+C 结束）`);
    await new Promise(() => {});
  }
  throw new Error('未知命令: ' + cmd + '\n' + HELP);
}

/** Character sheet: every expression + a few poses, rendered with the same engine. */
async function sheetCmd(a) {
  const file = a._[0];
  if (!file) throw new Error('用法: sheet <character.json> [--out sheet.png]');
  const ch = loadCharacter(path.resolve(file), process.cwd());
  const exprs = ['normal', ...Object.keys(ch.expressions || {}).filter((e) => e !== 'normal')];
  const ZH = { normal: '默认', happy: '开心', surprised: '惊讶', smug: '得意', thinking: '思考', sad: '难过', angry: '生气', talk: '说话', wave: '挥手', point: '指向', jump: '跳跃', walk: '走路', reveal: '招牌动作' };
  const exprLabel = (e) => (ch.expressions?.[e]?.label) || ZH[e] || e;
  const poses = [{ name: 'wave', actions: [{ type: 'wave', start: -1, end: 10 }] }, { name: 'point', actions: [{ type: 'point', start: -1, end: 10 }] }, { name: 'jump', actions: [{ type: 'jump', start: -0.4, end: 0.6 }] },
    ...((ch.sheet && ch.sheet.poses) || [])];
  // key = frame name (ASCII, used in .frames.json); label = Chinese caption drawn under the cell
  const cells = [...exprs.map((e) => ({ key: e, label: exprLabel(e), expr: e, actions: [] })), { key: 'talk', label: ZH.talk, expr: 'normal', actions: [], forceMouth: 'open' },
    ...poses.map((p) => ({ key: p.name, label: p.label || ZH[p.name] || p.name, expr: p.expr || 'normal', actions: p.actions }))];
  const transparent = !!a.transparent;
  const cols = Math.min(4, cells.length), rows = Math.ceil(cells.length / cols);
  const cw = 420, chh = 560, W = cw * cols, H = chh * rows + 90;
  const items = cells.map((c, i) => ({ kind: 'actor', scene: 'sheet', id: 'a' + i, character: 'c', x: cw * (i % cols) + cw / 2, y: 90 + chh * Math.floor(i / cols) + chh - 70, height: 400,
    actions: c.actions.map((x) => ({ ...((ch.actionDefaults || {})[x.type] || {}), ...x })), expressions: [{ t: -1, name: c.expr }], talk: [], forceMouth: c.forceMouth, appear: { type: 'none', at: 0 }, z: i }));
  const labels = transparent ? [] : cells.map((c, i) => ({ kind: 'element', scene: 'sheet', id: 'l' + i, source: { type: 'text', text: c.label, size: 34, color: '#5a4a3a' }, x: cw * (i % cols) + cw / 2, y: 90 + chh * Math.floor(i / cols) + chh - 30, scale: 1, start: -1, draw: 0, motions: [], z: 100 + i, pen: false }));
  const title = transparent ? null : { kind: 'element', scene: 'sheet', id: 'title', source: { type: 'text', text: `${ch.name || ch.id || '角色'} · 角色设定图`, size: 48 }, x: W / 2, y: 50, scale: 1, start: -1, draw: 0, motions: [], z: 200, pen: false };
  const project = { title: 'sheet', width: W, height: H, fps: 30, duration: 1, media: a.media || ch.media || 'crayon', paper: { transparent }, subtitle: { enabled: false, font: '"Noto Sans CJK SC", sans-serif' }, pen: false, boilFps: 8,
    camera: { handheld: 0 }, characters: { c: { ...ch, id: 'c' } }, cues: [], scenes: [{ id: 'sheet', start: 0, end: 1, transition: { type: 'cut', dur: 0 }, camera: { keys: [{ t: 0, x: W / 2, y: H / 2, zoom: 1 }], handheld: 0 }, items: [...items, ...labels, ...(title ? [title] : [])] }] };
  const B = await import('./browser.mjs');
  const out = path.resolve(a.out || path.join(path.dirname(path.resolve(file)), 'sheet.png'));
  const files = await B.renderStills(project, [0], path.dirname(out));
  fs.renameSync(files[0], out);
  // crop rectangles of every cell, ready to paste into an image-type character.json ("image.sheet.frames")
  const frames = {};
  cells.forEach((c, i) => { frames[c.key] = [cw * (i % cols), 90 + chh * Math.floor(i / cols), cw, chh - 60]; });
  fs.writeFileSync(out.replace(/\.png$/i, '.frames.json'), JSON.stringify(frames, null, 1));
  console.log(out);
  console.log(out.replace(/\.png$/i, '.frames.json'));
}

main().catch((e) => { console.error('✗ ' + (e && e.message || e)); process.exit(1); });
