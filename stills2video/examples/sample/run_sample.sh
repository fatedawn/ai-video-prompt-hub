#!/usr/bin/env bash
# stills2video 示例：5 张静图 + 5 行台词 → 9:16 成片（纯 CPU）。用法：bash stills2video/examples/sample/run_sample.sh [输出目录]
# 第 1 张默认用程序画的竹林；想用自己的图，把图片按 01.png… 放进 stills/ 即可（文件名带编号就按编号排序）。
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
OUT="${1:-$HERE/out}"
python3 "$HERE/make_stills.py" "$OUT/stills" ${XIANXIA:+--xianxia "$XIANXIA"}
node "$HERE/../../cli.mjs" make --images "$OUT/stills" --script "$HERE/script.txt" --out "$OUT/final.mp4" --backend cpu ${S2V_EXTRA:-}
