#!/usr/bin/env python3
"""Visual cue-vs-frame check (original code for ai-video-prompt-hub/animator).

For each cue-bound element, grab 3 frames from the rendered video — 0.15 s before the bound word, 0.25 s after it,
and when drawing should be finished — crop around the element and stack them into one PNG per element.
Usage: python3 tools/sync_frames.py out/demo.mp4 out/timeline.json OUT_DIR [element ids...]
"""
import json, os, subprocess, sys

FONT = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"


def main():
    video, tl, out = sys.argv[1], sys.argv[2], sys.argv[3]
    only = set(sys.argv[4:])
    os.makedirs(out, exist_ok=True)
    data = json.load(open(tl))
    cues = {c["index"]: c for c in data["cues"]}
    made = []
    for e in data["elements"]:
        if not e.get("cue") or not e.get("boxAtDrawEnd") or (only and e["id"] not in only):
            continue
        x0, y0, x1, y1 = e["boxAtDrawEnd"]
        m = 90
        x0, y0 = max(0, int(x0 - m)), max(0, int(y0 - m))
        w, h = int(x1 - x0 + m) // 2 * 2, int(y1 - y0 + m) // 2 * 2
        times = [("前 -0.15s", e["start"] - 0.15), ("后 +0.25s", e["start"] + 0.25), ("画完", e["drawEnd"] + 0.05)]
        tiles = []
        for i, (lab, t) in enumerate(times):
            f = os.path.join(out, f".tmp_{e['id']}_{i}.png")
            txt = f"{lab}  t={t:.2f}s"
            vf = f"crop={w}:{h}:{x0}:{y0},scale=-2:260"
            if os.path.exists(FONT):
                tf = f + ".txt"
                open(tf, "w").write(txt)
                vf += f",drawtext=fontfile={FONT}:textfile={tf}:x=8:y=8:fontsize=20:fontcolor=white:box=1:boxcolor=black@0.55"
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{max(0, t):.3f}", "-i", video, "-frames:v", "1", "-vf", vf, f], check=True)
            tiles.append(f)
            if os.path.exists(f + ".txt"):
                os.remove(f + ".txt")
        n = int(e["cue"][1:].split(":")[0].split("+")[0].split(".")[0])
        name = f"sync_{e['scene']}_{e['id']}.png"
        dst = os.path.join(out, name)
        title = f"{e['id']} ← 绑定 {e['cue']}  「{cues[n]['text']}」"
        vf = "hstack=3"
        tf = dst + ".txt"
        open(tf, "w").write(title)
        if os.path.exists(FONT):
            vf += f",pad=iw:ih+40:0:40:color=0x2b2724,drawtext=fontfile={FONT}:textfile={tf}:x=10:y=8:fontsize=22:fontcolor=white"
        subprocess.run(["ffmpeg", "-v", "error", "-y", *sum([["-i", t] for t in tiles], []), "-filter_complex", vf, dst], check=True)
        for t in tiles + [tf]:
            os.remove(t)
        made.append(dst)
    print("\n".join(made))


if __name__ == "__main__":
    main()
