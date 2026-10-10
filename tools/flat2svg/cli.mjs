#!/usr/bin/env node
// flat2svg — 扁平定妆图 / 静图 → VTracer → 核对 SVG
// Original for ai-video-prompt-hub (Apache-2.0, © 2026 天机).
// External tool: visioncortex/vtracer (MIT) — install with: cargo install vtracer
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { PRESETS, PRESET_NAMES, resolvePreset } from './lib/presets.mjs';
import { findRenderer, verifySvg, MIN_VARIANCE } from './lib/check.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const IMG_RE = /\.(png|jpe?g|webp|gif|bmp)$/i;

const HELP = `flat2svg：扁平定妆图 → VTracer → 核对 SVG

用法：
  node tools/flat2svg/cli.mjs convert <输入.png|jpg> [-o 输出.svg] [--preset clean|photo|face-safe] [--check] [--preview 预览.png]
  node tools/flat2svg/cli.mjs doctor
  node tools/flat2svg/cli.mjs presets
  node tools/flat2svg/cli.mjs --help

工作流：
  1. 用 GPT Image 等把照片压成「扁平色块」定妆图（少渐变、硬边缘）
  2. 本工具调用 vtracer 转成 SVG（默认 preset=clean）
  3. 可选 --check：用 cairosvg / rsvg 渲成 PNG，方差过低则失败（几乎空白）

安装 vtracer（外部工具，不随仓库分发）：
  cargo install vtracer
  # 确保 ~/.cargo/bin 在 PATH

预设：
  clean      扁平色块（推荐定妆/设定图）
  photo      vtracer 官方 photo
  face-safe  低 filter_speckle，尽量保五官

示例：
  node tools/flat2svg/cli.mjs convert flat.png -o char.svg --preset clean --check
  node tools/flat2svg/cli.mjs convert face.png -o face.svg --preset face-safe --check --preview face-preview.png
`;

function args(argv) {
  const o = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '-h' || a === '--help') o.help = true;
    else if (a === '-o' || a === '--output') o.output = argv[++i];
    else if (a === '-i' || a === '--input') o.input = argv[++i];
    else if (a.startsWith('--')) {
      const k = a.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('-')) {
        o[k] = argv[++i];
      } else {
        o[k] = true;
      }
    } else if (a.startsWith('-') && a.length === 2) {
      const k = a.slice(1);
      const next = argv[i + 1];
      if (next && !next.startsWith('-')) o[k] = argv[++i];
      else o[k] = true;
    } else o._.push(a);
  }
  return o;
}

const log = (...x) => console.log(...x);
const err = (...x) => console.error(...x);

function findVtracer() {
  const fromEnv = process.env.VTRACER;
  if (fromEnv && fs.existsSync(fromEnv)) return fromEnv;
  const which = spawnSync('which', ['vtracer'], { encoding: 'utf8' });
  if (which.status === 0) return which.stdout.trim();
  const home = process.env.HOME || process.env.USERPROFILE || '';
  const cargo = path.join(home, '.cargo', 'bin', 'vtracer');
  if (fs.existsSync(cargo)) return cargo;
  return null;
}

function doctor() {
  const vt = findVtracer();
  const rend = findRenderer();
  const py = process.env.FLAT2SVG_PYTHON || 'python3';
  const pillow = spawnSync(py, ['-c', 'import PIL'], { encoding: 'utf8' }).status === 0;
  log(`vtracer   ${vt ? `✓ ${vt}` : '✗ 未找到 → cargo install vtracer（并把 ~/.cargo/bin 加入 PATH）'}`);
  if (vt) {
    const v = spawnSync(vt, ['--version'], { encoding: 'utf8' });
    log(`           ${(v.stdout || v.stderr || '').trim() || '(version ok)'}`);
  }
  log(`渲染器    ${rend ? (rend.kind === 'rsvg' ? '✓ rsvg-convert' : '✓ cairosvg (python)') : '✗ 无 → 安装 librsvg 的 rsvg-convert，或 pip install cairosvg'}`);
  log(`Pillow    ${pillow ? '✓（--check 方差计算）' : '✗ → pip install pillow（--check 需要）'}`);
  log(`预设      ${PRESET_NAMES.join(', ')}`);
  log(`阈值      ${HERE}`);
  return vt ? 0 : 1;
}

function listPresets() {
  for (const [k, p] of Object.entries(PRESETS)) {
    log(`${k.padEnd(10)} ${p.desc}`);
    log(`           vtracer ${p.args.join(' ')}`);
  }
}

function defaultOut(input) {
  const base = path.basename(input).replace(IMG_RE, '');
  return path.join(path.dirname(input), `${base}.svg`);
}

function convert(a) {
  const input = a.input || a.i || a._[0];
  if (!input) {
    err('请指定输入图片：convert <file.png|jpg>');
    process.exit(2);
  }
  const absIn = path.resolve(input);
  if (!fs.existsSync(absIn)) {
    err(`找不到输入：${absIn}`);
    process.exit(2);
  }
  if (!IMG_RE.test(absIn)) {
    err(`输入应为 PNG/JPG/WebP 等位图：${absIn}`);
    process.exit(2);
  }
  const out = path.resolve(a.output || a.o || defaultOut(absIn));
  const presetName = a.preset || 'clean';
  const preset = resolvePreset(presetName);
  const vt = findVtracer();
  if (!vt) {
    err('未找到 vtracer。请先安装：\n  cargo install vtracer\n并把 ~/.cargo/bin 加入 PATH（或设置 VTRACER=/path/to/vtracer）');
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(out), { recursive: true });
  const cmdArgs = ['-i', absIn, '-o', out, ...preset.args];
  log(`→ vtracer ${cmdArgs.map((x) => (/\s/.test(x) ? JSON.stringify(x) : x)).join(' ')}`);
  log(`  预设 ${preset.label}：${preset.desc}`);
  const r = spawnSync(vt, cmdArgs, { encoding: 'utf8' });
  if (r.status !== 0) {
    err(r.stderr || r.stdout || 'vtracer 失败');
    process.exit(r.status || 1);
  }
  if (!fs.existsSync(out)) {
    err(`vtracer 未写出：${out}`);
    process.exit(1);
  }
  const bytes = fs.statSync(out).size;
  log(`✓ SVG ${out}（${bytes} bytes）`);

  if (a.check) {
    const previewPath =
      typeof a.preview === 'string' ? path.resolve(a.preview) : out.replace(/\.svg$/i, '.preview.png');
    const minVar = a['min-variance'] != null ? Number(a['min-variance']) : MIN_VARIANCE;
    try {
      const res = verifySvg(out, { previewPath, minVariance: minVar });
      log(`✓ 核对通过：预览 ${res.preview}（方差 ${res.variance.toFixed(1)} ≥ ${minVar}）`);
    } catch (e) {
      err(String(e.message || e));
      process.exit(1);
    }
  }
  return 0;
}

function main(argv) {
  const a = args(argv);
  if (a.help || a._[0] === 'help') {
    process.stdout.write(HELP);
    return 0;
  }
  const cmd = a._[0];
  if (!cmd || cmd === 'doctor') {
    if (!cmd) {
      // bare invocation with flags only → help unless convert-like flags
      if (a.input || a.i || a._.length === 0) {
        if (a.input || a.i) {
          a._ = ['convert', ...(a._ || [])];
          return convert(a);
        }
        process.stdout.write(HELP);
        return 0;
      }
    }
  }
  if (cmd === 'doctor') return doctor();
  if (cmd === 'presets' || cmd === 'preset') {
    listPresets();
    return 0;
  }
  if (cmd === 'convert' || cmd === 'run') {
    a._ = a._.slice(1);
    return convert(a);
  }
  // Convenience: first positional is an image path
  if (IMG_RE.test(cmd) || fs.existsSync(cmd)) {
    a.input = a.input || cmd;
    a._ = a._.slice(1);
    return convert(a);
  }
  err(`未知命令：${cmd}\n`);
  process.stdout.write(HELP);
  return 2;
}

process.exitCode = main(process.argv.slice(2)) || 0;
