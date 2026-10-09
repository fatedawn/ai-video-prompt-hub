#!/usr/bin/env node
// stills2video — a folder of stills (ChatGPT Images downloads or any pictures) → finished video, on any machine:
// CPU 2.5D parallax (no GPU) · your own GPU via ComfyUI / LightX2V / Wan2GP · cloud keys · manual web/app round-trip.
// Assembly (TTS voice-over, word-timed subtitles, BGM ducking, transitions) reuses videogen + animator.
// Original code for ai-video-prompt-hub (Apache-2.0, © 2026 天机).
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { loadEnv } from '../videogen/lib/env.mjs';
import { assemble, planVoices, synthesizeLines } from '../videogen/lib/assemble.mjs';
import { PROVIDERS, missingEnv } from '../videogen/providers/index.mjs';
import { detectHardware, selectBackend, comfyReachable, TIERS, CLOUD_I2V } from './lib/hardware.mjs';
import { orderImages, buildStoryboard, normalizeStoryboard, toVideogen, parseScript, sizeOf, IMG_RE } from './lib/storyboard.mjs';
import { recipes, loadRecipes, guessRecipe, findRecipe } from './lib/recipes.mjs';
import { resolveShot } from './lib/plan.mjs';
import { lint } from './lib/lint.mjs';
import { getBackend } from './lib/backends/index.mjs';
import { exportManual, importManual } from './lib/backends/manual.mjs';
import { polishPlan, interpolate, upscale } from './lib/polish.mjs';
import { generateImages } from './lib/openai_image.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FX = path.join(HERE, 'lib', 'fxrender.mjs');
const QA = path.join(HERE, '..', 'animator', 'tools', 'qa_motion.py');

const HELP = `stills2video：只有图片也能出片（不需要显卡；有显卡 / 有云端 key 自动用上）

  doctor                                   检测显卡 / 显存档位 / ffmpeg / RIFE / Real-ESRGAN / 深度模型 / TTS，给出推荐路线
  recipes [--json]                         列出空镜头配方（运镜 + 特效 + 转场 + I2V 提示词 + ChatGPT 出图模板）
  prompts --script 台词.txt [--subject 主体] [--out 出图提示词.md]
                                           按台词逐镜写 ChatGPT Images 中文出图提示词 + 文件命名（01.png…）
  images  --prompts 提示词.txt --out stills/ [--dry-run]   （可选）用 OpenAI 图像 API 出图；没 key 只打印请求
  plan    --images 图片目录 [--script 台词.txt | --storyboard 分镜.json|shots.json] [--aspect 9:16] [--out 项目/s2v.json] [--flf2v]
  render  <s2v.json> [--backend auto|cpu|comfyui|cloud:kling|wan2gp|lightx2v] [--dry-run] [--only S01_shot02,…]
          [--tier cpu|gpu8|gpu12|gpu16|gpu24] [--workflow wf.json] [--depth auto|gradient|depth.png] [--size 1080x1920] [--no-voice]
  export  <s2v.json> --site framepack|ltx-desktop|freevideo|wan2gp|jimeng|kling|hailuo|generic [--out packages/]
  import  <s2v.json> --from 下载目录
  polish  <s2v.json> [--interp 2] [--upscale 2]          补帧 / 放大（有 rife / realesrgan 二进制就用，没有退回 ffmpeg）
  assemble <s2v.json> [--out final.mp4] [--bgm 音乐.mp3] [--transition auto|fade|huashu:inkBloom|cut] [--no-huashu] [--size WxH] [--no-voice]
  make    --images 图片目录 [--script 台词.txt] --out 成片.mp4 [--backend auto] [其余同上]    一条命令：plan → render → assemble
`;

function args(argv) {
  const o = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) { const k = a.slice(2); o[k] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true; } else o._.push(a);
  }
  return o;
}
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const writeJson = (f, j) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(j, null, 2) + '\n'); };
const rel = (f) => path.relative(process.cwd(), f) || '.';
const log = (...x) => console.log(...x);

function depthReady() {
  const r = spawnSync(process.env.S2V_PYTHON || 'python3', ['-c', 'import sys;sys.path.insert(0,sys.argv[1]);import depth;print(int(depth.model_available()))', path.join(HERE, 'py')], { encoding: 'utf8' });
  return r.status === 0 ? r.stdout.trim() === '1' : null;
}
function ttsReady() {
  const py = process.env.HDA_PYTHON || (fs.existsSync(path.join(HERE, '..', 'animator', '.venv', 'bin', 'python')) ? path.join(HERE, '..', 'animator', '.venv', 'bin', 'python') : 'python3');
  return spawnSync(py, ['-c', 'import sherpa_onnx'], { encoding: 'utf8' }).status === 0;
}

async function doctor(a) {
  const hw = detectHardware();
  const keys = Object.fromEntries(CLOUD_I2V.map((p) => [p, PROVIDERS[p] && missingEnv(PROVIDERS[p]).length === 0]));
  const online = hw.tier !== 'cpu' ? await comfyReachable(hw.comfyuiUrl) : false;
  const sel = selectBackend({ prefer: a.backend, hw, keys, comfyReachable: online });
  const T = TIERS[hw.tier];
  log(`系统     ${hw.os} · ${hw.cpus} 核 · 内存 ${hw.ramGB}GB${hw.apple ? ' · Apple Silicon（本地 I2V 走 Wan2GP / ComfyUI MPS，未核验）' : ''}`);
  log(`显卡     ${hw.gpus.length ? hw.gpus.map((g) => `${g.name} ${(g.vramMB / 1024).toFixed(1)}GB`).join('、') : '未检测到 NVIDIA 显卡（nvidia-smi）'} → 档位 ${hw.tier}（${T.label}）`);
  log(`ComfyUI  ${hw.tier === 'cpu' ? '（无独显，跳过）' : online ? `在线 ${hw.comfyuiUrl}` : `未连接 ${hw.comfyuiUrl}`}`);
  log(`ffmpeg   ${hw.tools.ffmpeg || '✗ 未安装（必需）'}`);
  log(`补帧     ${hw.tools.rife || '未安装 rife-ncnn-vulkan → 用 ffmpeg minterpolate'}`);
  log(`放大     ${hw.tools.realesrgan || '未安装 realesrgan-ncnn-vulkan → 用 ffmpeg lanczos'}`);
  const d = depthReady();
  log(`深度模型 ${d === null ? '✗ python3 / numpy / pillow 不可用' : d ? 'Depth-Anything-V2-Small ✓' : '未下载 → npm run setup:depth（26MB，Apache-2.0）；不下也能跑（渐变深度）'}`);
  log(`配音     ${ttsReady() ? 'Kokoro（sherpa-onnx）✓' : '未安装 → cd animator && npm run setup:tts（或设置 HDA_PYTHON）；也可 --no-voice'}`);
  log(`云端 key ${Object.entries(keys).filter(([, v]) => v).map(([k]) => k).join('、') || '无（可在 .env 填任意一家）'}`);
  log(`\n推荐后端 → ${sel.backend}${sel.provider ? ':' + sel.provider : ''}：${sel.reason}`);
  log(`本档位可选本地方案：\n${T.local.map((x) => '  · ' + x).join('\n')}${T.notes ? `\n  注：${T.notes}` : ''}`);
  return { hw, sel };
}

function planProject(a) {
  const imgDir = a.images && path.resolve(a.images);
  const out = path.resolve(a.out && /\.json$/i.test(a.out) ? a.out : path.join(a.project || (a.out ? path.dirname(path.resolve(a.out)) : 's2v-project'), 's2v.json'));
  const baseDir = path.dirname(out);
  let images = [];
  let order = 'none';
  if (imgDir) { const r = orderImages(imgDir, { order: a.order }); images = r.files.map((f) => path.join(imgDir, f)); order = r.order; }
  let sb;
  if (a.storyboard) {
    sb = normalizeStoryboard(readJson(path.resolve(a.storyboard)), { images, baseDir, aspect: a.aspect });
    if (!sb.shots.every((s) => s.image)) throw new Error('分镜里有镜头没有对应图片：给每个镜头写 image，或把图片命名为 镜头编号（S01_shot02.png）/ 序号（02.png）');
  } else {
    sb = buildStoryboard({ images, script: a.script ? fs.readFileSync(path.resolve(a.script), 'utf8') : null, aspect: a.aspect, title: a.title || (imgDir ? path.basename(imgDir) : 'stills2video'), baseDir });
  }
  if (a.flf2v) {
    const shots = [];
    sb.shots.forEach((s, i) => {
      shots.push(s);
      const nx = sb.shots[i + 1];
      if (nx) { shots.push({ id: `${s.id}b`, bridge: true, image: s.image, last_frame: { path: nx.image }, duration: 2.5, recipe: null, motion: { preset: 'drift' }, lines: [], transition: 'cut', backend: null, prompt: '从第一张画面自然过渡到第二张画面，镜头连贯运动，不要切镜', clip: null }); }
    });
    sb.shots = shots;
  }
  writeJson(out, sb);
  log(`${sb.shots.length} 个镜头 · ${sb.aspect} · 图片顺序：${{ number: '按文件名编号', mtime: '按下载时间（文件名里没有编号）', name: '按文件名', none: '—' }[order]} → ${rel(out)}`);
  for (const s of sb.shots) log(`  ${s.id.padEnd(12)} ${String(s.duration).padStart(5)}s  ${(s.recipe ? findRecipe(s.recipe)?.name : s.motion?.preset) || ''}  ${path.basename(s.image || '')}  ${s.lines.map((l) => (l.speaker ? l.speaker + '：' : '') + l.text).join(' / ')}`);
  return out;
}

/** Measure real TTS durations first so every rendered shot is long enough (no freeze frames). */
function fitVoice(sb, baseDir, a) {
  const { lines } = planVoices(toVideogen(sb));
  if (!lines.length || a['no-voice']) return false;
  if (!ttsReady()) { log('  ⚠ 本地 TTS 未安装：按字数估计时长（cd animator && npm run setup:tts 后更准；或 --no-voice）'); return false; }
  const work = path.join(baseDir, '.tts-work');
  const { lineDur } = synthesizeLines(lines, work, { cache: path.join(baseDir, '.tts-cache') });
  fs.rmSync(work, { recursive: true, force: true });
  const per = {};
  lines.forEach((l, i) => { per[l.si] = (per[l.si] || 0) + (lineDur[i] || 0) + (per[l.si] ? 0.25 : 0); });
  // Auto durations follow the real voice (snappier cut); explicit （5秒） durations only ever grow.
  sb.shots.forEach((s, i) => { if (per[i]) s.duration = +(s.duration_auto ? Math.max(3, 0.3 + per[i] + 0.45) : Math.max(s.duration, 0.3 + per[i] + 0.45)).toFixed(2); });
  return true;
}

async function render(file, a) {
  const sb = readJson(file);
  const baseDir = path.dirname(file);
  const outDir = baseDir;
  const clipsDir = path.join(baseDir, a.clips || 'clips');
  const hw = detectHardware();
  const tier = a.tier || hw.tier;
  let backendId = a.backend || 'auto', provider = null;
  if (backendId === 'auto') {
    const keys = Object.fromEntries(CLOUD_I2V.map((p) => [p, PROVIDERS[p] && missingEnv(PROVIDERS[p]).length === 0]));
    const sel = selectBackend({ hw: { ...hw, tier }, keys, comfyReachable: tier !== 'cpu' ? await comfyReachable(hw.comfyuiUrl) : false });
    backendId = sel.backend; log(`后端：${sel.backend}（${sel.reason}）`);
  } else if (backendId.includes(':')) [backendId, provider] = backendId.split(':');
  if (fitVoice(sb, baseDir, a)) log('  已按实际配音时长调整镜头长度');
  const only = a.only ? new Set(String(a.only).split(',')) : null;
  const size = a.size ? a.size.split('x').map(Number) : null;
  const plans = sb.shots.map((s, i) => resolveShot(s, sb, i, { baseDir, backend: s.backend || backendId, noHuashu: !!a['no-huashu'], bridges: (j) => (sb.shots[j].backend || backendId) !== 'cpu' }));
  plans.forEach((p, i) => { sb.shots[i].transition_resolved = p.transition || 'cut'; });
  const depthOk = depthReady();
  for (const w of lint(sb, plans.map((p) => ({ ...p, depth: a.depth === 'gradient' || !depthOk ? 'gradient' : 'model' })))) log('  ⚠ ' + w);
  const dry = [];
  for (const [i, p] of plans.entries()) {
    if (only && !only.has(p.id)) continue;
    let bid = p.backend;
    if (sb.shots[i].bridge && bid === 'cpu') { log(`  · ${p.id} 首尾帧过渡镜头需要 GPU（comfyui/lightx2v/wan2gp）或云端；CPU 下跳过，改用转场`); continue; }
    const b = getBackend(bid);
    const t0 = Date.now();
    const r = await b.render(p, sb, { baseDir, outDir, clipsDir, tier, provider: sb.shots[i].provider || provider, dryRun: !!a['dry-run'], workflow: a.workflow && path.resolve(a.workflow), size, depth: a.depth, run: !!a.run, wan2gpTemplate: a['wan2gp-template'], model: a.model, log });
    if (r.dryRun) { dry.push(`===== ${p.id} · ${b.name}（未执行）=====\n${r.text}`); continue; }
    sb.shots[i].clip = path.relative(baseDir, r.clip).split(path.sep).join('/');
    sb.shots[i].rendered = { backend: bid, provider: provider || null, at: new Date().toISOString(), seconds: +((Date.now() - t0) / 1000).toFixed(1), ...(r.info ? { depth: r.info.depth } : {}) };
    writeJson(file, sb);
    log(`  ✓ ${p.id}  ${p.recipeName || p.motion.preset}  ${p.renderSeconds}s → ${sb.shots[i].clip}（${sb.shots[i].rendered.seconds}s${r.info ? `，深度：${r.info.depth}` : ''}）`);
  }
  writeJson(file, sb);
  if (dry.length) {
    const f = path.join(outDir, 'dry-run.txt');
    fs.writeFileSync(f, dry.join('\n\n') + '\n');
    log(`  ${dry.length} 个镜头未执行（dry-run / 需要外部程序）→ 请求与命令写入 ${rel(f)}`);
  }
  return sb;
}

function doAssemble(file, a) {
  const sb = readJson(file);
  const baseDir = path.dirname(file);
  const out = path.resolve(a.out && /\.mp4$/i.test(a.out) ? a.out : path.join(baseDir, 'final.mp4'));
  const plans = sb.shots.map((s, i) => resolveShot(s, sb, i, { baseDir, noHuashu: !!a['no-huashu'], bridges: (j) => !!sb.shots[j].clip }));
  const vg = toVideogen(sb);
  // keep only shots that have a clip (CPU runs skip FLF2V bridges)
  const keep = vg.shots.map((s, i) => ({ s, p: plans[i], has: !!s.clip || !sb.shots[i].bridge })).filter((x) => x.has);
  vg.shots = keep.map(({ s, p }) => ({ ...s, transition: a.transition && a.transition !== 'auto' ? a.transition : p.transition || 'cut', fit: p.loop ? 'loop' : 'auto' }));
  if (vg.shots.length) vg.shots[vg.shots.length - 1].transition = null;
  if (a['no-voice']) vg.voice = { ...vg.voice, engine: 'none' };
  const transitionRenderer = (job) => {
    const jf = path.join(path.dirname(job.out), path.basename(job.out, '.mp4') + '.json');
    fs.writeFileSync(jf, JSON.stringify(job));
    const r = spawnSync(process.execPath, [FX, 'transition', jf], { stdio: ['ignore', 'inherit', 'inherit'] });
    if (r.status !== 0) {
      log(`  ⚠ ${job.type} 转场渲染失败，改用 fade`);
      const t = job.dur;
      spawnSync('ffmpeg', ['-v', 'error', '-y', '-ss', String(job.aStart), '-t', String(t), '-i', job.a, '-t', String(t), '-i', job.b, '-filter_complex', `[0:v]settb=AVTB,fps=${job.fps}[x];[1:v]settb=AVTB,fps=${job.fps}[y];[x][y]xfade=transition=fade:duration=${t}:offset=0,format=yuv420p`, '-an', '-c:v', 'libx264', '-crf', '18', job.out]);
    }
  };
  const tl = assemble(vg, { baseDir, out, bgm: a.bgm && path.resolve(a.bgm), bgmVolume: a['bgm-volume'] ? +a['bgm-volume'] : undefined, size: a.size, fps: sb.fps, ttsCache: path.join(baseDir, '.tts-cache'), transitionRenderer, allowMissing: !!a['allow-missing'], keepWork: !!a['keep-work'], font: a.font, crf: a.crf ? +a.crf : 20, log });
  // cover frame + contact sheet
  const cover = out.replace(/\.mp4$/i, '.cover.jpg');
  const first = tl.shots[0];
  spawnSync('ffmpeg', ['-v', 'error', '-y', '-ss', String(Math.min(tl.duration / 2, (first?.target || 2) * 0.6)), '-i', out, '-frames:v', '1', '-q:v', '2', cover]);
  const sheet = out.replace(/\.mp4$/i, '.contact.jpg');
  const n = 12, cols = 6;
  const [W, H] = (tl.size || '1080x1920').split('x').map(Number);
  const cw = 270, ch = Math.round(270 * H / W);
  spawnSync('ffmpeg', ['-v', 'error', '-y', '-i', out, '-vf', `fps=${n}/${tl.duration},scale=${cw}:${ch},tile=${cols}x${Math.ceil(n / cols)}:padding=6:color=0x202020`, '-frames:v', '1', '-q:v', '3', sheet]);
  let qa = null;
  const q = spawnSync('python3', [QA, out, '--json'], { encoding: 'utf8' });
  if (q.status === 0) { try { qa = JSON.parse(q.stdout); } catch { /* ignore */ } }
  log(`完成：${rel(out)}（${tl.duration}s，${tl.size}）\n  封面：${rel(cover)}\n  缩略图：${rel(sheet)}\n  字幕：${rel(out.replace(/\.mp4$/i, '.srt'))}`);
  if (qa) log(`  运动检查：静止帧 ${qa.static_frames_pct}% · 最长静止 ${qa.longest_static_run_frames} 帧 · 平均帧差 ${qa.mean_diff}${qa.longest_static_run_frames > (sb.fps || 30) ? '  ⚠ 有超过 1 秒的定格' : ''}`);
  return { tl, cover, sheet, qa };
}

function promptsSheet(a) {
  const lines = parseScript(fs.readFileSync(path.resolve(a.script), 'utf8'));
  const R = loadRecipes();
  const subject = a.subject && a.subject !== true ? String(a.subject) : null;
  // no --subject: drop the slot (and its punctuation) instead of printing the word 主体
  const fill = (t) => (subject ? t.replaceAll('{主体}', subject) : t.startsWith('{主体}') ? t.replace('{主体}', '【你的主体，如产品名】') : t.replace(/[，,、]?\{主体\}[，,；;、]?/g, (m) => (/[；;]$/.test(m) ? '；' : m.startsWith('，') && m.endsWith('，') ? '，' : '')));
  const used = [];
  const out = [`# ChatGPT Images 出图清单（${lines.length} 张）`, '', '1. 在 ChatGPT 里先发一张角色/产品参考图（需要人物一致时），然后逐条粘贴下面的提示词；', '2. 下载后按 **文件名** 列改名，全部放进同一个文件夹（如 `stills/`）；', '3. 运行 `node stills2video/cli.mjs make --images stills --script 台词.txt --out 成片.mp4`。', ''];
  lines.forEach((l, i) => {
    const r = (l.tag && findRecipe(l.tag)) || guessRecipe(l.text, used.slice(-2)) || R.recipes[i % R.recipes.length];
    used.push(r.id);
    out.push(`## ${String(i + 1).padStart(2, '0')}.png · ${r.name}`, '', `台词：${l.text || '（空镜）'}`, '', '```text', `${fill(r.image_prompt)}。${R.image_prompt_suffix}`, '```', '');
  });
  const f = path.resolve(a.out || '出图提示词.md');
  fs.writeFileSync(f, out.join('\n'));
  log(`→ ${rel(f)}（${lines.length} 条）`);
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const a = args(rest);
  if (!cmd || cmd === 'help' || a.help) return log(HELP);
  loadEnv(process.cwd());
  if (cmd === 'doctor' || cmd === 'hw') return doctor(a);
  if (cmd === 'recipes') {
    if (a.json) return log(JSON.stringify(recipes(), null, 2));
    for (const r of recipes()) log(`${r.name.padEnd(12, '　')} ${r.id.padEnd(22)} ${r.motion.preset.padEnd(10)} ${String(r.duration).padStart(2)}s  ${[...r.overlays.map((o) => o.type), ...r.fx.map((f) => 'fx:' + (f.particles || f.overlay)), r.flow ? 'flow:' + r.flow.region : ''].filter(Boolean).join(' ')}  → ${r.transition}`);
    return;
  }
  if (cmd === 'prompts') { if (!a.script) throw new Error('需要 --script 台词.txt'); return promptsSheet(a); }
  if (cmd === 'images') {
    if (!a.prompts) throw new Error('需要 --prompts 提示词.txt（每行一条）');
    const ps = fs.readFileSync(path.resolve(a.prompts), 'utf8').split('\n').map((x) => x.trim()).filter((x) => x && !x.startsWith('#'));
    const r = await generateImages(ps, path.resolve(a.out || 'stills'), { dryRun: !!a['dry-run'], aspect: a.aspect || '9:16', model: a.model, quality: a.quality });
    for (const x of r) log(x.dryRun ? `===== ${rel(x.file)}（dry-run）=====\n${x.text}` : `✓ ${rel(x.file)}`);
    if (r.some((x) => x.dryRun) && !process.env.OPENAI_API_KEY) log('\n（未设置 OPENAI_API_KEY：ChatGPT 会员不含 API 额度，默认请在 ChatGPT 里手动出图）');
    return;
  }
  if (cmd === 'plan') return planProject(a);
  if (cmd === 'make') {
    const outMp4 = path.resolve(a.out || 's2v-project/final.mp4');
    const file = planProject({ ...a, out: path.join(a.project ? path.resolve(a.project) : path.dirname(outMp4), 's2v.json') });
    await render(file, a);
    if (a['dry-run']) return log('dry-run：未合成');
    return doAssemble(file, { ...a, out: outMp4 });
  }
  const file = path.resolve(a._[0] || 's2v.json');
  if (!fs.existsSync(file)) throw new Error(`找不到 ${file}（先运行 plan）`);
  if (cmd === 'render') return render(file, a);
  if (cmd === 'assemble') return doAssemble(file, a);
  if (cmd === 'export') {
    const sb = readJson(file);
    const plans = sb.shots.map((s, i) => resolveShot(s, sb, i, { baseDir: path.dirname(file) }));
    const r = exportManual(sb, plans, { out: path.resolve(a.out || path.join(path.dirname(file), 'packages')), site: a.site || 'generic', baseDir: path.dirname(file), shotsFile: rel(file) });
    return log(`已导出 ${r.count} 个镜头包 → ${rel(r.dir)}\n  生成后按 镜头编号.mp4 命名，再运行：node stills2video/cli.mjs import ${rel(file)} --from <下载目录>`);
  }
  if (cmd === 'import') {
    if (!a.from) throw new Error('缺少 --from <下载目录>');
    const sb = readJson(file);
    const { report } = importManual(sb, path.resolve(a.from), { clipsDir: path.join(path.dirname(file), 'clips'), baseDir: path.dirname(file) });
    writeJson(file, sb);
    for (const r of report) log(`  ${r.status === 'missing' ? '✗' : '✓'} ${r.id}  ${r.file || '没找到（文件名要以镜头编号开头）'}${(r.issues || []).map((x) => `\n      - ${x}`).join('')}`);
    return log('缺的镜头可以先用 CPU 补：render --backend cpu --only <镜头编号>');
  }
  if (cmd === 'polish') {
    const sb = readJson(file);
    const hw = detectHardware();
    const steps = polishPlan(hw.tools, { interp: +a.interp || 0, upscale: +a.upscale || 0 });
    if (!steps.length) return log('用法：polish s2v.json --interp 2 和/或 --upscale 2');
    for (const s of steps) if (s.note) log('  · ' + s.note);
    for (const shot of sb.shots) {
      if (!shot.clip) continue;
      let cur = path.resolve(path.dirname(file), shot.clip);
      for (const s of steps) {
        const nxt = cur.replace(/(\.\w+)$/, `.${s.step}$1`);
        if (s.step === 'interp') interpolate(cur, nxt, s.factor, hw.tools); else upscale(cur, nxt, s.factor, hw.tools);
        cur = nxt;
      }
      shot.clip = path.relative(path.dirname(file), cur).split(path.sep).join('/');
      log(`  ✓ ${shot.id} → ${shot.clip}`);
    }
    return writeJson(file, sb);
  }
  throw new Error(`未知命令 ${cmd}\n${HELP}`);
}

main().catch((e) => { console.error('✗ ' + (e.stack && process.env.S2V_DEBUG ? e.stack : e.message || e)); process.exit(1); });
