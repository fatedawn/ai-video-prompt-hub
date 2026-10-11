# 演示：宴会厅反转（plan → validate → H3 / Seedance）

最小可跑通的投产桥演示。一条命令走完：

```bash
bash tools/shuohao-export/examples/banquet-twist/run_demo.sh /tmp/shuohao-demo
```

| 步骤 | 命令 | 产出 |
|---|---|---|
| 分镜 → JSON | `node videogen/cli.mjs plan 分镜.md --out out/from-plan.json` | `shots.json` |
| 质量门 | `node videogen/cli.mjs validate shots.json --names 沈晚,林柔` | 段上限 / 切长 / H3 / Seedance / 禁人名 |
| 导出 H3 | `node tools/shuohao-export/cli.mjs export shots.json --protocol h3 --out out/h3-pack` | 每段文件夹 + `manifest.json` |
| 导出 Seedance | `… --protocol seedance --out out/sd-pack` | 每段 `seedance.md` + `seedance-manifest.json` |

文件说明：

- `分镜.md` — 短 Markdown 分镜样例（角色用 A/B，便于对照禁人名门）
- `shots.json` — 预置 hub 镜头表（镜头正文已去人名，validate 应全过）
- `run_demo.sh` — 一键演示；输出默认写本目录 `out/`（已 gitignore）

相关能力入口见仓库根 `demos/shuohao-absorb/README.md`。
