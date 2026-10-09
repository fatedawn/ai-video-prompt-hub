#!/usr/bin/env node
// slides2video CLI — route ⑥ "PPT 式科普": deck.md (+ optional page images) → narrated MP4, CPU only, no API key.
// Original work, Apache-2.0, © 2026 天机.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parseDeck, LAYOUTS, THEMES, BUILDS, MARKS } from './lib/parse.mjs';
import { buildTimeline } from './lib/timeline.mjs';
import { compileRuntime } from './lib/compile.mjs';
import { narrate, layVoice, toSRT, ttsReady, pythonFor } from './lib/audio.mjs';
import { lintDeck } from './lib/lint.mjs';
import { pagePrompts, promptsMarkdown } from './lib/prompts.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');

function args(argv) {
  const o = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) { const [k, v] = a.slice(2).split('='); if (v !== undefined) o[k] = v; else if (argv[i + 1] && !argv[i + 1].startsWith('--')) o[k] = argv[++i]; else o[k] = true; }
    else o._.push(a);
  }
  return o;
}
const log = (...a) => console.log(...a);

const HELP = `slides2video — 把 deck.md（类 Slidev 的 Markdown 幻灯片）做成带配音、逐词出现、卡拉 OK 字幕的竖/横屏科普视频
（路线 ⑥ PPT 式科普；纯 CPU，本地 Kokoro 配音，不需要任何 API key）

  node slides2video/cli.mjs make deck.md [--images 图片目录] [--out final.mp4] [--aspect 9:16|16:9] [--theme tianji|paper|chalk|clean]
                                          [--no-voice] [--workers N] [--from 秒 --to 秒] [--bgm 音乐.mp3]
                                          [--sheet] [--preview]   # 每页样张拼图 / 720p 预览版
  node slides2video/cli.mjs plan deck.md        # 打印时间轴（每页起止、每条 build/mark 的触发时刻）
  node slides2video/cli.mjs lint deck.md        # 静态检查（一页一个想法、语速、长时间静止…）+ --qa 版式检查（溢出/重叠/字幕区）
  node slides2video/cli.mjs stills deck.md --at 1.5,4,9 [--out dir]   # 指定时刻截图
  node slides2video/cli.mjs prompts deck.md [--out prompts.md] [--all]  # 每页 ChatGPT 出图中文提示词
  node slides2video/cli.mjs import x.pptx [--out dir] [--mode pages|rebuild]   # PPT（含演讲者备注）→ deck.md
  node slides2video/cli.mjs init [dir]           # 生成一份示例 deck.md
  node slides2video/cli.mjs doctor               # 检查 Chrome / ffmpeg / 本地 TTS / KaTeX 等

版式：${LAYOUTS.join(' ')}
主题：${THEMES.join(' ')}   出现方式 build：${BUILDS.join(' ')}   标记 mark：${MARKS.join(' ')}
语法详见 slides2video/README.md`;

async function load(file, o) {
  if (!file || !fs.existsSync(file)) throw new Error('找不到 deck 文件：' + file);
  const deck = parseDeck(fs.readFileSync(file, 'utf8'));
  if (o.aspect) deck.meta.aspect = String(o.aspect);
  if (o.theme) deck.meta.theme = o.theme;
  if (o.fps) deck.meta.fps = +o.fps;
  return deck;
}

function workDir(file, o) {
  const w = o.work || path.join(ROOT, '.work', 'slides2video', path.basename(path.dirname(path.resolve(file))) + '-' + path.basename(file, '.md'));
  fs.mkdirSync(w, { recursive: true });
  return w;
}

async function prepare(file, o, { voice = true } = {}) {
  const deck = await load(file, o);
  for (const w of deck.warnings) log('  ⚠ ' + w);
  const work = workDir(file, o);
  const nar = await narrate(deck, { work, cache: path.join(ROOT, '.work', 'tts-cache'), noVoice: !voice || o['no-voice'], log });
  const tl = buildTimeline(deck, nar.lines);
  const baseDir = path.dirname(path.resolve(file));
  const imagesDir = o.images ? path.resolve(o.images) : (fs.existsSync(path.join(baseDir, 'images')) ? path.join(baseDir, 'images') : null);
  const comp = await compileRuntime(tl, { imagesDir, baseDir, autoImages: !!imagesDir });
  return { deck, tl, comp, work, nar };
}

async function cmdMake(o) {
  const file = o._[1];
  const t0 = Date.now();
  const { deck, tl, comp, work, nar } = await prepare(file, o);
  for (const m of comp.missing) log(`  ⚠ 缺图：${m}（画面会显示占位框；用 prompts 命令拿出图提示词）`);
  const issues = lintDeck(deck, tl).filter((x) => x.level !== 'info');
  for (const x of issues) log(`  ${x.level === 'error' ? '✗' : '⚠'} ${x.page ? `第 ${x.page} 页：` : ''}${x.msg}`);
  const out = path.resolve(o.out || path.join(path.dirname(path.resolve(file)), 'final.mp4'));
  log(`▶ ${deck.meta.title || path.basename(file)}：${tl.pages.length} 页，${tl.duration.toFixed(1)}s，${comp.deck.W}×${comp.deck.H}，配音 ${nar.engine}`);
  const audio = tl.voice.some((v) => v.file) ? layVoice(tl.voice, tl.duration, path.join(work, 'voice.wav')) : null;
  const { renderVideo, runQA } = await import('./lib/render.mjs');
  if (!o['no-qa']) {
    const qa = await runQA(comp.deck, comp.assets);
    for (const x of qa.issues) log(`  ⚠ 版式 第 ${x.page} 页：${x.msg}`);
    for (const e of qa.errors) log('  ✗ ' + e);
  }
  const r = await renderVideo(comp.deck, comp.assets, out, { audio, workers: +o.workers || undefined, from: +o.from || 0, to: o.to ? +o.to : null, bgm: o.bgm || null, crf: +o.crf || 19 });
  const srt = out.replace(/\.mp4$/i, '') + '.srt';
  fs.writeFileSync(srt, toSRT(tl.cues));
  fs.writeFileSync(path.join(work, 'timeline.json'), JSON.stringify(tl, null, 1));
  if (o.sheet) log('  样张 ' + contactSheet(out, tl, typeof o.sheet === 'string' ? o.sheet : out.replace(/\.mp4$/i, '') + '_sheet.jpg'));
  if (o.preview) log('  预览 ' + preview720(out, typeof o.preview === 'string' ? o.preview : out.replace(/\.mp4$/i, '') + '_720p.mp4'));
  log(`✓ ${out}（${r.frames} 帧，渲染 ${r.seconds.toFixed(0)}s，总耗时 ${((Date.now() - t0) / 1000).toFixed(0)}s）\n  字幕 ${srt}`);
}

/** One frame per page (just before the page ends) tiled into a contact sheet. */
export function contactSheet(video, tl, out) {
  const times = tl.pages.map((p) => Math.max(p.start + 0.1, p.end - 0.35));
  const cols = Math.min(times.length, tl.meta.aspect === '9:16' ? 6 : 3);
  const a = [];
  times.forEach((t) => a.push('-ss', t.toFixed(2), '-i', video));
  const w = tl.meta.aspect === '9:16' ? 360 : 640;
  const f = times.map((_, i) => `[${i}:v]trim=end_frame=1,scale=${w}:-2,drawtext=text='${i + 1}':x=12:y=10:fontsize=${Math.round(w / 12)}:fontcolor=white:box=1:boxcolor=black@0.6:boxborderw=6[v${i}]`).join(';');
  const rows = Math.ceil(times.length / cols);
  const pad = rows * cols - times.length;
  const blanks = Array.from({ length: pad }, (_, k) => `color=c=gray:s=${w}x${Math.round((w * 16) / 9)}:d=0.04[b${k}]`).join(';');
  const ins = [...times.map((_, i) => `[v${i}]`), ...Array.from({ length: pad }, (_, k) => `[b${k}]`)].join('');
  const filter = `${f};${blanks ? blanks + ';' : ''}${ins}xstack=inputs=${rows * cols}:layout=${Array.from({ length: rows * cols }, (_, i) => `${(i % cols) ? Array.from({ length: i % cols }, () => 'w0').join('+') : '0'}_${Math.floor(i / cols) ? Array.from({ length: Math.floor(i / cols) }, () => 'h0').join('+') : '0'}`).join('|')}[o]`;
  const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', ...a, '-filter_complex', filter, '-map', '[o]', '-frames:v', '1', '-q:v', '3', out], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error('样张生成失败：' + r.stderr);
  return out;
}

/** 720p copy for chat / phones (target < 20 MB). */
export function preview720(video, out) {
  const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', video, '-vf', "scale='if(gt(iw,ih),-2,720)':'if(gt(iw,ih),720,-2)'", '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-maxrate', '3M', '-bufsize', '6M', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', out], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error('720p 预览失败：' + r.stderr);
  return out;
}

async function cmdPlan(o) {
  const { tl, nar } = await prepare(o._[1], o, { voice: !!o.voice });
  log(`时长 ${tl.duration.toFixed(2)}s（配音 ${nar.engine}${nar.engine === 'estimate' ? '，按字数估计；加 --voice 用真实配音计时' : ''}）`);
  for (const p of tl.pages) {
    log(`\n第 ${p.index} 页 [${p.layout}] ${p.start.toFixed(2)}–${p.end.toFixed(2)}s  转场 ${p.transition?.type || '—'}`);
    for (const c of p.cues) log(`   🗣 ${c.start.toFixed(2)} ${c.text}`);
    for (const e of p.elements) {
      const what = (e.text || e.tex || e.kind).slice(0, 24);
      log(`   ▸ ${e.t.toFixed(2)}s ${e.kind}${e.build ? '/' + e.build : ''} 「${what}」${(e.marks || []).map((m) => ` ${m.type}@${m.t.toFixed(2)}`).join('')}${e.autoAt ? '  (自动对词)' : ''}`);
    }
  }
}

async function cmdLint(o) {
  const deck = await load(o._[1], o);
  const tl = buildTimeline(deck, null);
  const res = lintDeck(deck, tl);
  for (const w of deck.warnings) res.unshift({ level: 'error', page: null, msg: w });
  for (const x of res) log(`${x.level === 'error' ? '✗' : x.level === 'warn' ? '⚠' : 'ℹ'} ${x.page ? `第 ${x.page} 页：` : ''}${x.msg}`);
  if (o.qa) {
    const { comp } = await prepare(o._[1], o, { voice: false });
    const { runQA } = await import('./lib/render.mjs');
    const qa = await runQA(comp.deck, comp.assets);
    for (const x of qa.issues) log(`⚠ 版式 第 ${x.page} 页：${x.msg}`);
    for (const e of qa.errors) log('✗ ' + e);
    if (!qa.issues.length && !qa.errors.length) log('✓ 版式检查通过（无溢出/重叠/出画/字幕区遮挡）');
    if (qa.errors.length) process.exitCode = 1;
  }
  if (res.some((x) => x.level === 'error')) process.exitCode = 1;
}

async function cmdStills(o) {
  const { comp } = await prepare(o._[1], o, { voice: !o['no-voice'] });
  const times = String(o.at || '').split(',').filter(Boolean).map(Number);
  if (!times.length) { for (const p of comp.deck.pages) times.push(+(p.end - 0.3).toFixed(2)); }
  const { renderStills } = await import('./lib/render.mjs');
  const files = await renderStills(comp.deck, comp.assets, times, path.resolve(o.out || 'stills'));
  for (const f of files) log(f);
}

async function cmdPrompts(o) {
  const deck = await load(o._[1], o);
  const md = promptsMarkdown(deck, pagePrompts(deck, { all: !!o.all }));
  if (o.out) { fs.writeFileSync(o.out, md); log('✓ ' + o.out); } else log(md);
}

async function cmdImport(o) {
  const { pptxToDeck } = await import('./lib/pptx.mjs');
  const file = o._[1];
  const out = path.resolve(o.out || path.basename(file, path.extname(file)) + '-deck');
  const r = pptxToDeck(path.resolve(file), out, { mode: o.mode || 'pages', aspect: o.aspect, theme: o.theme });
  log(`✓ ${r.deckPath}（${r.slides} 页，${r.withNotes} 页有演讲者备注，${r.aspect}）\n  下一步：node slides2video/cli.mjs make ${path.relative(process.cwd(), r.deckPath)}`);
}

function cmdInit(o) {
  const dir = path.resolve(o._[1] || 'my-deck');
  fs.mkdirSync(dir, { recursive: true });
  const f = path.join(dir, 'deck.md');
  if (fs.existsSync(f)) throw new Error('已存在：' + f);
  fs.copyFileSync(path.join(HERE, 'examples', 'starter', 'deck.md'), f);
  log(`✓ ${f}\n  预览时间轴：node slides2video/cli.mjs plan ${path.relative(process.cwd(), f)}`);
}

async function cmdDoctor() {
  const row = (ok, name, hint) => log(`${ok ? '✓' : '✗'} ${name}${ok ? '' : '  → ' + hint}`);
  row(+process.versions.node.split('.')[0] >= 18, `Node ${process.version}`, '需要 Node ≥ 18');
  row(spawnSync('ffmpeg', ['-version']).status === 0, 'ffmpeg', '安装 ffmpeg 并加入 PATH');
  let chrome = null;
  try { const { findChrome } = await import(path.join(ROOT, 'animator', 'src', 'browser.mjs')); chrome = findChrome(); } catch (e) { /* */ }
  row(!!chrome, `Chrome/Chromium ${chrome || ''}`, 'cd animator && npm install && npx playwright install chromium（或安装 Chrome）');
  row(fs.existsSync(path.join(HERE, 'node_modules', 'katex')), 'KaTeX / Shiki / Mermaid（slides2video/node_modules）', 'cd slides2video && npm install');
  row(fs.existsSync(path.join(ROOT, 'animator', 'vendor', 'huashu-art-motion')), 'huashu 转场（animator/vendor，可选）', '仅 transition: huashu:* 需要');
  row(ttsReady(), `本地 TTS（Kokoro，${pythonFor()}）`, 'cd animator && npm run setup:tts（没有也能出片：静音 + 按字数计时）');
  const fonts = spawnSync('fc-list', [':lang=zh'], { encoding: 'utf8' });
  row(fonts.status === 0 && /Noto Sans CJK|Source Han|PingFang|Microsoft YaHei|WenQuanYi/i.test(fonts.stdout || ''), '中文字体（系统已安装）', '安装 Noto Sans CJK SC（fonts-noto-cjk）');
  const { sofficeBin } = await import('./lib/pptx.mjs');
  row(!!sofficeBin(), 'LibreOffice（import pptx 的 pages 模式，可选）', '安装 LibreOffice，或用 --mode rebuild');
  log(`CPU ${os.cpus().length} 核；建议 --workers ${Math.max(1, Math.min(4, os.cpus().length - 1))}`);
}

const o = args(process.argv.slice(2));
const cmd = o._[0];
const table = { make: cmdMake, plan: cmdPlan, lint: cmdLint, stills: cmdStills, prompts: cmdPrompts, import: cmdImport, init: cmdInit, doctor: cmdDoctor };
if (!cmd || o.help || !table[cmd]) { log(HELP); process.exit(cmd && !table[cmd] ? 1 : 0); }
try { await table[cmd](o); } catch (e) { console.error('✗ ' + (e.message || e)); if (process.env.DEBUG) console.error(e.stack); process.exit(1); }
