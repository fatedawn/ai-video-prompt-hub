#!/usr/bin/env bash
# 宴会厅反转：plan -> validate -> export H3 / Seedance
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../../../.." && pwd)"
OUT="${1:-$HERE/out}"
mkdir -p "$OUT"

echo "== 1) Markdown 分镜 -> shots.json =="
node "$ROOT/videogen/cli.mjs" plan "$HERE/分镜.md" --out "$OUT/from-plan.json" || true

echo "== 2) 质量门 validate =="
node "$ROOT/videogen/cli.mjs" validate "$HERE/shots.json" --names 沈晚,林柔
node "$ROOT/tools/shuohao-export/cli.mjs" validate "$HERE/shots.json" --names 沈晚,林柔

echo "== 3) 导出 MiniMax H3 =="
node "$ROOT/tools/shuohao-export/cli.mjs" export "$HERE/shots.json" --protocol h3 --out "$OUT/h3-pack"

echo "== 4) 导出 Seedance =="
node "$ROOT/tools/shuohao-export/cli.mjs" export "$HERE/shots.json" --protocol seedance --out "$OUT/sd-pack"

echo "== 5) 桥接 board.json =="
node "$ROOT/tools/shuohao-export/cli.mjs" board "$HERE/shots.json" --out "$OUT/board.json"

echo "完成 -> $OUT"
ls -la "$OUT/h3-pack" "$OUT/sd-pack" | head -40
