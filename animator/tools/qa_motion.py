#!/usr/bin/env python3
"""Motion QA: static-frame ratio of a video (original code for ai-video-prompt-hub/animator).

Same metric as the research report's frame-diff script, so numbers are comparable:
  frames are scaled to 160 px wide grayscale; per-frame mean |diff|;
  "static" = mean |diff| < 0.05;  changed px = |diff| > 8.
Usage: python3 tools/qa_motion.py video.mp4 [--json]
Requires: ffmpeg/ffprobe, numpy.
"""
import json, subprocess, sys
import numpy as np


def measure(path):
    info = json.loads(subprocess.check_output(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "json", path]))["streams"][0]
    w = 160
    h = int(160 * info["height"] / info["width"])
    raw = subprocess.check_output(["ffmpeg", "-v", "error", "-i", path, "-vf", f"scale={w}:{h}", "-f", "rawvideo", "-pix_fmt", "gray", "-"])
    fr = np.frombuffer(raw, np.uint8).reshape(-1, h, w).astype(np.int16)
    diff = np.abs(np.diff(fr, axis=0))
    d = diff.mean(axis=(1, 2))
    changed = (diff > 8).mean(axis=(1, 2))
    # longest run of static frames (a "frozen" stretch is worse than scattered ones)
    run = best = 0
    for v in d < 0.05:
        run = run + 1 if v else 0
        best = max(best, run)
    return {"file": path, "frames": int(len(fr)), "static_frames_pct": round(float((d < 0.05).mean() * 100), 1),
            "mean_diff": round(float(d.mean()), 3), "median_changed_px_pct": round(float(np.median(changed) * 100), 2),
            "longest_static_run_frames": int(best)}


if __name__ == "__main__":
    r = measure(sys.argv[1])
    print(json.dumps(r, ensure_ascii=False) if "--json" in sys.argv else
          f"{r['file']}: {r['frames']} 帧, 静止帧 {r['static_frames_pct']}%, 平均帧差 {r['mean_diff']}, 每帧变化像素中位数 {r['median_changed_px_pct']}%, 最长连续静止 {r['longest_static_run_frames']} 帧")
