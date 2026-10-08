// Text–picture alignment QA by ablation (original code for ai-video-prompt-hub/animator).
//
// For every element bound to a subtitle cue/word, compare the *encoded video* with a re-render of the same
// frame in which only that element is removed. Before the element appears the two are identical (up to
// compression noise); the first video frame where they differ is the moment the element becomes visible.
// Camera moves, transitions, the walking character or overlapping props cannot cause false hits, because
// they are present in both images.
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { withRenderer } from './browser.mjs';

function videoInfo(file) {
  const r = spawnSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,r_frame_rate', '-of', 'json', file], { encoding: 'utf8' });
  const s = JSON.parse(r.stdout).streams[0];
  const [n, d] = s.r_frame_rate.split('/').map(Number);
  return { W: s.width, H: s.height, fps: n / d };
}

/** Decode frames [f0, f0+count) of the video, cropped and box-averaged to the ablation grid (grayscale). */
function videoCrops(file, fps, f0, count, crop, ds) {
  const { x, y, w, h } = crop;
  const vf = `select='between(n\\,${f0}\\,${f0 + count - 1})',crop=${w * ds}:${h * ds}:${x}:${y},scale=${w}:${h}:flags=area:in_range=tv:out_range=pc,format=gray`;
  const r = spawnSync('ffmpeg', ['-v', 'error', '-i', file, '-vf', vf, '-vsync', '0', '-f', 'rawvideo', '-'], { maxBuffer: 1 << 28 });
  const buf = r.stdout, n = w * h, out = [];
  for (let i = 0; i + n <= buf.length; i += n) out.push(buf.subarray(i, i + n));
  return out;
}

const changed = (a, b, thr = 16) => { let c = 0; for (let i = 0; i < a.length; i++) if (Math.abs(a[i] - b[i]) > thr) c++; return c / a.length; };

export async function syncCheck(project, video, { before = 0.6, after = 0.5, ds = 4, md = null, json = null } = {}) {
  const { fps } = videoInfo(video);
  const rows = await withRenderer(project, async ([page]) => {
    const tl = await page.evaluate(() => window.__probe(0));
    const bound = tl.filter((e) => e.cue);
    const res = [];
    for (const e of bound) {
      // box: union of the element's screen boxes over the window (it may move with the camera)
      const boxes = [];
      for (const tt of [e.start, e.drawEnd, e.start + after]) {
        const b = (await page.evaluate((x) => window.__probe(x), tt)).find((q) => q.scene === e.scene && q.id === e.id)?.box;
        if (b) boxes.push(b);
      }
      if (!boxes.length) { res.push({ ...e, note: '无屏幕框' }); continue; }
      const box = [Math.min(...boxes.map((b) => b[0])), Math.min(...boxes.map((b) => b[1])), Math.max(...boxes.map((b) => b[2])), Math.max(...boxes.map((b) => b[3]))];
      const f0 = Math.max(0, Math.round((e.start - before) * fps));
      const f1 = Math.round((Math.min(e.drawEnd, e.start + 1.5) + 0.05) * fps);
      const key = e.scene + '/' + e.id;
      const abl = [], full = [];
      let crop = null;
      for (let f = f0; f <= f1; f++) {
        const t = f / fps;
        const a = await page.evaluate(([tt, k, bx, d]) => window.__ablate(tt, k, bx, d), [t, key, box, ds]);
        const b = await page.evaluate(([tt, k, bx, d]) => window.__ablate(tt, k, bx, d, true), [t, key, box, ds]);
        if (!a) break;
        crop = crop || { x: a.x, y: a.y, w: a.w, h: a.h };
        abl.push(Uint8Array.from(a.px)); full.push(Uint8Array.from(b.px));
      }
      if (!crop) { res.push({ ...e, note: '元素太小' }); continue; }
      const vids = videoCrops(video, fps, f0, abl.length, crop, ds);
      // renderer-side truth (with vs without element) and video-side measurement (video vs without element)
      const dRender = abl.map((a, i) => changed(a, full[i]));
      const dVideo = abl.map((a, i) => (vids[i] ? changed(a, vids[i]) : NaN));
      const pre = dVideo.filter((_, i) => (f0 + i) / fps < e.start - 0.1);
      const noise = pre.length ? Math.max(...pre) : 0;
      const finalV = dVideo[dVideo.length - 1];
      const thr = Math.max(0.01, noise * 1.5 + 0.05 * Math.max(0, finalV - noise)); // above compression noise, 5% of the final change
      const firstHit = (arr, th) => { for (let i = 0; i + 1 < arr.length; i++) if (arr[i] > th && arr[i + 1] > th) return (f0 + i) / fps; return null; };
      const tVideo = firstHit(dVideo, thr);
      const tRender = firstHit(dRender, 0.002);
      res.push({ scene: e.scene, id: e.id, cue: e.cue, bound: e.start, drawEnd: e.drawEnd, videoOnset: tVideo, renderOnset: tRender,
        delta: tVideo === null ? null : tVideo - e.start, noise: +noise.toFixed(4), final: +(finalV || 0).toFixed(3) });
    }
    return res;
  });
  const f = (v) => (v === null || v === undefined ? '—' : v.toFixed(2));
  const L = ['| 元素 | 绑定 | 台词时间点(s) | 视频中出现(s) | 偏差(s) | 渲染器理论出现(s) | 计划画完(s) |', '|---|---|---|---|---|---|---|'];
  for (const r of rows) L.push(`| ${r.scene}/${r.id} | \`${r.cue}\` | ${f(r.bound)} | ${f(r.videoOnset)} | ${r.delta === null || r.delta === undefined ? '—' : (r.delta >= 0 ? '+' : '') + r.delta.toFixed(2)} | ${f(r.renderOnset)} | ${f(r.drawEnd)} |`);
  const ok = rows.filter((r) => r.delta !== null && r.delta !== undefined && r.delta >= -1 / fps - 1e-3 && r.delta <= 0.3);
  const early = rows.filter((r) => r.delta !== null && r.delta !== undefined && r.delta < -1 / fps - 1e-3);
  L.push(`\n判定（消融法：成片 vs 去掉该元素后重渲染的同一帧）：${ok.length}/${rows.length} 个绑定元素在台词时间点之后 0.3s 内出现；早于台词 ${early.length} 个；未检出 ${rows.length - ok.length - early.length} 个。`);
  const out = L.join('\n');
  if (md) fs.writeFileSync(md, out + '\n');
  if (json) fs.writeFileSync(json, JSON.stringify(rows, null, 1));
  return { rows, text: out };
}
