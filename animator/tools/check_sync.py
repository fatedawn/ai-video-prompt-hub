#!/usr/bin/env python3
"""Text-picture alignment QA (original code for ai-video-prompt-hub/animator).

Independent check on the *rendered video*: for every element bound to a subtitle cue/word, measure the "ink
coverage" (pixels clearly different from the paper colour) inside the element's on-screen box frame by frame,
and report when ink first appears there versus when the bound word is spoken.

Usage:
  node src/cli.mjs probe project.json --out out/timeline.json
  python3 tools/check_sync.py out/demo.mp4 out/timeline.json [--md report.md]
Requires: ffmpeg, numpy.
"""
import json, subprocess, sys
import numpy as np

PAPER = np.array([248, 242, 228], np.int16)


def frames(path, t0, t1, box, W, H, fps):
    x0, y0, x1, y1 = [int(round(v)) for v in box]
    x0, y0 = max(0, x0), max(0, y0)
    x1, y1 = min(W, x1), min(H, y1)
    w, h = (x1 - x0) // 2 * 2, (y1 - y0) // 2 * 2
    if w < 8 or h < 8:
        return None, None
    raw = subprocess.check_output(["ffmpeg", "-v", "error", "-ss", f"{max(0, t0):.3f}", "-i", path, "-t", f"{t1 - max(0, t0):.3f}",
                                   "-vf", f"crop={w}:{h}:{x0}:{y0}", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"])
    arr = np.frombuffer(raw, np.uint8).reshape(-1, h, w, 3).astype(np.int16)
    times = max(0, t0) + np.arange(len(arr)) / fps
    return arr, times


def coverage(arr, sig=None):
    """Fraction of pixels that are clearly ink. With a signature colour, only pixels closer to that colour
    than to the paper count, so other elements overlapping the box are mostly ignored."""
    dpaper = np.abs(arr - PAPER).sum(axis=3)
    if sig is None:
        return (dpaper > 90).mean(axis=(1, 2))
    h = sig.lstrip("#")
    c = np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], np.int16)
    dsig = np.abs(arr - c).sum(axis=3)
    return ((dpaper > 50) & (dsig < dpaper) & (dsig < 150)).mean(axis=(1, 2))


def main():
    video, timeline = sys.argv[1], sys.argv[2]
    md = sys.argv[sys.argv.index("--md") + 1] if "--md" in sys.argv else None
    info = json.loads(subprocess.check_output(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height,r_frame_rate", "-of", "json", video]))["streams"][0]
    W, H = info["width"], info["height"]
    num, den = map(int, info["r_frame_rate"].split("/"))
    fps = num / den
    tl = json.load(open(timeline))
    rows = []
    for e in tl["elements"]:
        if not e.get("cue") or not e.get("boxAtDrawEnd"):
            continue
        box = e["boxAtDrawEnd"]
        arr, times = frames(video, e["start"] - 0.6, e["drawEnd"] + 0.05, box, W, H, fps)
        if arr is None:
            continue
        def onset(cov, frac=0.06):
            pre = times < e["start"] - 0.1
            base = float(np.median(cov[pre])) if pre.any() else float(cov[0])
            final = float(cov[-1])
            if final - base < 0.01:
                return None, base, final
            hit = cov > base + frac * (final - base)
            # require the change to persist for 3 frames (ignores single-frame camera jitter)
            for i in range(len(hit) - 2):
                if hit[i] and hit[i + 1] and hit[i + 2]:
                    return float(times[i]), base, final
            return None, base, final
        cov_ink = coverage(arr)
        cov_col = coverage(arr, e.get("sig")) if e.get("sig") else None
        t_ink, b1, f1 = onset(cov_ink)
        t_col, b2, f2 = onset(cov_col) if cov_col is not None else (None, 0, 0)
        t_half, _, _ = onset(cov_col if cov_col is not None and f2 - b2 >= 0.01 else cov_ink, 0.5)
        cands = [x for x in (t_ink, t_col) if x is not None]
        first = min(cands) if cands else None
        rows.append({"element": e["id"], "scene": e["scene"], "cue": e["cue"], "bound_time": round(e["start"], 3),
                     "ink_onset": None if t_ink is None else round(t_ink, 3), "colour_onset": None if t_col is None else round(t_col, 3),
                     "delta_s": None if first is None else round(first - e["start"], 3),
                     "half_drawn": None if t_half is None else round(t_half, 3), "draw_end": round(e["drawEnd"], 3),
                     "coverage": f"{b1:.3f}→{f1:.3f}"})
    lines = ["| 元素 | 绑定 | 台词时间点(s) | 视频中开始出现(s) | 偏差(s) | 主色出现(s) | 画到一半(s) | 计划画完(s) |", "|---|---|---|---|---|---|---|---|"]
    f = lambda v: "—" if v is None else f"{v:.2f}"
    for r in rows:
        lines.append(f"| {r['scene']}/{r['element']} | `{r['cue']}` | {r['bound_time']:.2f} | {f(min([x for x in (r['ink_onset'], r['colour_onset']) if x is not None], default=None))} | {'—' if r['delta_s'] is None else format(r['delta_s'], '+.2f')} | {f(r['colour_onset'])} | {f(r['half_drawn'])} | {r['draw_end']:.2f} |")
    ok = [r for r in rows if r["delta_s"] is not None and -1 / fps - 0.001 <= r["delta_s"] <= 0.3]
    early = [r for r in rows if r["delta_s"] is not None and r["delta_s"] < -1 / fps - 0.001]
    lines.append(f"\n判定：{len(ok)}/{len(rows)} 个绑定元素在台词时间点之后 0.3s 内开始出现（视频逐帧检测，阈值=最终覆盖率的 6%，连续 3 帧）；早于台词的 {len(early)} 个；未检出 {len([r for r in rows if r['delta_s'] is None])} 个（元素太小或被重叠/运镜干扰时会未检出，需要人工看帧）。")
    out = "\n".join(lines)
    print(out)
    if md:
        open(md, "w").write(out + "\n")
    json.dump(rows, open(timeline.replace(".json", ".sync.json"), "w"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
