#!/usr/bin/env bash
# 路线 C 端到端演示（不需要任何视频模型账号）：
#   分镜 → 镜头清单 → 导出网页端生成包 →（这里用 animator 渲染的「替身片段」代替网页端下载）→ 按文件名导入 → TTS 配音 + 字幕 + BGM 合成成片
# 用法：bash videogen/examples/route-c/run_demo.sh   （需要 ffmpeg、Node 18+，以及 animator 的本地 TTS：cd animator && npm run setup:tts）
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"; VG="$HERE/../../cli.mjs"; OUT="$HERE/out"
rm -rf "$OUT"; mkdir -p "$OUT"
node "$VG" plan "$HERE/storyboard.md" --out "$OUT/shots.json"
node "$VG" export "$OUT/shots.json" --site jimeng --out "$OUT/packages"
node "$HERE/make_standins.mjs" "$OUT/downloads"          # ← 真实使用时：在即梦/可灵/海螺网页端逐镜头生成并下载到这个文件夹
# 自制 BGM（纯合成和弦，不含任何第三方音乐）
ffmpeg -v error -y -f lavfi -i "aevalsrc='0.10*sin(2*PI*220*t)*(0.6+0.4*sin(2*PI*0.25*t))+0.07*sin(2*PI*277.18*t)+0.06*sin(2*PI*329.63*t)+0.04*sin(2*PI*110*t)':s=48000:d=30" -af "lowpass=f=1800,aecho=0.6:0.5:120:0.25" "$OUT/bgm_selfmade.wav"
node "$VG" import "$OUT/shots.json" --from "$OUT/downloads"
node "$VG" assemble "$OUT/shots.json" --out "$OUT/final.mp4" --bgm "$OUT/bgm_selfmade.wav" --bgm-volume 0.25
