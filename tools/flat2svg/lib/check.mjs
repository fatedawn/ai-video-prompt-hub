// Render SVG → PNG and reject nearly-blank previews (low luminance variance).
// Original for ai-video-prompt-hub (Apache-2.0, © 2026 天机).
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import os from 'node:os';

const MIN_VARIANCE = 80; // mean squared deviation from mean gray; blank ≈ 0

export function findRenderer() {
  const rsvg = spawnSync('rsvg-convert', ['--version'], { encoding: 'utf8' });
  if (rsvg.status === 0) return { kind: 'rsvg', bin: 'rsvg-convert' };
  const py = process.env.FLAT2SVG_PYTHON || 'python3';
  const cai = spawnSync(py, ['-c', 'import cairosvg'], { encoding: 'utf8' });
  if (cai.status === 0) return { kind: 'cairosvg', bin: py };
  return null;
}

/** Render SVG to PNG. Returns absolute path of PNG. */
export function renderSvg(svgPath, pngPath, renderer = findRenderer()) {
  if (!renderer) {
    throw new Error(
      '核对需要渲染器：请安装 rsvg-convert（librsvg）或 python3 -m pip install cairosvg',
    );
  }
  fs.mkdirSync(path.dirname(pngPath), { recursive: true });
  if (renderer.kind === 'rsvg') {
    const r = spawnSync(renderer.bin, ['-o', pngPath, svgPath], { encoding: 'utf8' });
    if (r.status !== 0) throw new Error(`rsvg-convert 失败：${r.stderr || r.stdout}`);
  } else {
    const r = spawnSync(
      renderer.bin,
      ['-c', 'import cairosvg,sys; cairosvg.svg2png(url=sys.argv[1], write_to=sys.argv[2])', svgPath, pngPath],
      { encoding: 'utf8' },
    );
    if (r.status !== 0) throw new Error(`cairosvg 失败：${r.stderr || r.stdout}`);
  }
  if (!fs.existsSync(pngPath) || fs.statSync(pngPath).size < 32) {
    throw new Error(`预览 PNG 未写出或过小：${pngPath}`);
  }
  return pngPath;
}

/** Compute gray-level variance of a PNG via Pillow (or fail soft). */
export function pngVariance(pngPath) {
  const py = process.env.FLAT2SVG_PYTHON || 'python3';
  const script = `
from PIL import Image
import sys, statistics
im = Image.open(sys.argv[1]).convert("L")
px = list(im.getdata())
if len(px) < 4:
    print(0.0); raise SystemExit(0)
m = statistics.fmean(px)
v = statistics.fmean((p - m) ** 2 for p in px)
print(v)
`;
  const r = spawnSync(py, ['-c', script, pngPath], { encoding: 'utf8' });
  if (r.status !== 0) {
    // Fallback: try without Pillow message
    throw new Error(
      `无法计算预览方差（需要 Pillow）：${(r.stderr || r.stdout || '').trim()}\n` +
        `安装：python3 -m pip install pillow`,
    );
  }
  return Number(r.stdout.trim());
}

/**
 * Render + variance check. Throws if nearly blank.
 * @returns {{ preview: string, variance: number, ok: boolean }}
 */
export function verifySvg(svgPath, { previewPath, minVariance = MIN_VARIANCE, renderer } = {}) {
  const out =
    previewPath ||
    path.join(os.tmpdir(), `flat2svg-check-${process.pid}-${Date.now()}.png`);
  const r = renderer || findRenderer();
  renderSvg(svgPath, out, r);
  const variance = pngVariance(out);
  const ok = variance >= minVariance;
  if (!ok) {
    throw new Error(
      `核对失败：预览几乎空白（方差 ${variance.toFixed(1)} < ${minVariance}）。` +
        `请检查输入是否为有效扁平图，或换预设（clean / photo / face-safe）。预览：${out}`,
    );
  }
  return { preview: out, variance, ok };
}

export { MIN_VARIANCE };
