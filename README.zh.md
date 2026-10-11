# AI 视频提示词库 · 中文能力速查

> 完整说明见 [README.md](README.md)（中文为主）。本页专列 **烁皓短剧能力吸收** 与演示入口，方便一页看完「每条能力在哪、怎么跑」。

仓库自有代码与内容：**Apache-2.0**（Copyright 2026 天机）。第三方提示词保留上游许可并署名。

## 我想……（吸收相关）

| 我想…… | 用什么 | 一条命令 |
|---|---|---|
| 小说改编成短剧大纲 | [`skills/novel-outline/`](skills/novel-outline/README.md) | `node skills/novel-outline/scripts/novel-outline.mjs` |
| 真出角色参考图 | [`skills/character-refs/`](skills/character-refs/README.md) | `node skills/character-refs/scripts/character-refs.mjs config --show` |
| 分镜过质量门 | `videogen validate` | `node videogen/cli.mjs validate work/shots.json --names 沈晚,林柔` |
| 导出 MiniMax H3 投产包 | [`tools/shuohao-export/`](tools/shuohao-export/README.md) | `node tools/shuohao-export/cli.mjs export work/shots.json --protocol h3 --out work/h3-pack` |
| 导出即梦 Seedance 投产包 | 同上 | `… --protocol seedance --out work/sd-pack` |
| 看方法论 tips | [`catalog/methodology.md`](catalog/methodology.md) §11 | 角色三档 / 空景无人 / 冷开场前 3 拍 |

## 能力目录说明表

| 能力 | 路径 | 功能分支 | 演示 |
|---|---|---|---|
| H3 导出 | `tools/shuohao-export/` | `feat/absorb-shuohao-skills` | [`banquet-twist`](tools/shuohao-export/examples/banquet-twist/) |
| Seedance 导出 | 同上 | 同上 | 同上（`--protocol seedance`） |
| 质量门 gates | `videogen validate` + `tools/shuohao-export/lib/gates.mjs` | 同上 | `run_demo.sh` 第 2 步 |
| 角色参考图 | `skills/character-refs/` | 同上 | [`examples/阿禾-*`](skills/character-refs/examples/) |
| 改编大纲 | `skills/novel-outline/` | 同上 | [`examples/渡口-outline.json`](skills/novel-outline/examples/) |
| 方法论 | `catalog/methodology.md` §11 | 同上 | 打开 Markdown |

其它功能分支（本仓库历史合入）：`feat/stills2video`（静图成片）、`feat/hub-fresh-slides`（slides2video / 目录保鲜）、`feat/flat2svg`（扁平定妆→SVG）、`feat/mcp-and-ingest`（MCP）。

## 一键演示

```bash
bash tools/shuohao-export/examples/banquet-twist/run_demo.sh /tmp/shuohao-demo
```

索引：[demos/shuohao-absorb/README.md](demos/shuohao-absorb/README.md) · 变更：[CHANGELOG.md](CHANGELOG.md)

## 署名

吸收自 [eternityspring/shuohao-skills](https://github.com/eternityspring/shuohao-skills)（Apache-2.0，Copyright 2026 烁皓）。详见 `NOTICE` / `ATTRIBUTION.md` / `LICENSES/eternityspring_shuohao-skills-Apache-2.0.txt`。
