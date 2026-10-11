# 演示索引 · 烁皓短剧能力吸收（shuohao-skills）

本页用中文把「吸收进来的每一条能力」标清楚，并给出**最小可跑 / 可复制粘贴**的入口。上游：[eternityspring/shuohao-skills](https://github.com/eternityspring/shuohao-skills)（Apache-2.0，Copyright 2026 烁皓）。署名见根目录 `NOTICE` / `ATTRIBUTION.md`。

## 能力一览（路径 → 怎么跑）

| 能力 | 目录 | 一条命令 / 入口 | 说明 |
|---|---|---|---|
| **H3 投产包导出** | [`tools/shuohao-export/`](../../tools/shuohao-export/README.md) | `node tools/shuohao-export/cli.mjs export shots.json --protocol h3 --out work/h3-pack` | MiniMax H3 每段文件夹 + manifest |
| **Seedance 投产包导出** | 同上 | `… --protocol seedance --out work/sd-pack` | 即梦 Seedance 程序拼装稿 |
| **质量门 validate** | `tools/shuohao-export/lib/gates.mjs` + `videogen validate` | `node videogen/cli.mjs validate shots.json --names 沈晚,林柔` | 段上限 / 切长 / H3 结构 / Seedance 正文 / 禁人名 |
| **角色参考图** | [`skills/character-refs/`](../../skills/character-refs/README.md) | `node skills/character-refs/scripts/character-refs.mjs config --show` | BYO 出图后端；示例 [`阿禾`](../../skills/character-refs/examples/) |
| **小说改编大纲** | [`skills/novel-outline/`](../../skills/novel-outline/README.md) | `node skills/novel-outline/scripts/novel-outline.mjs`（见 SKILL.md） | 五件套 + 14 道代码质量门；示例 [`渡口`](../../skills/novel-outline/examples/) |
| **方法论 tips** | [`catalog/methodology.md`](../../catalog/methodology.md) §11 | 打开 Markdown | 角色三档、空景无人、冷开场前 3 拍 |

## 最小端到端：plan → validate → export

```bash
# 一键（推荐）
bash tools/shuohao-export/examples/banquet-twist/run_demo.sh /tmp/shuohao-demo

# 或逐步复制：
node videogen/cli.mjs plan tools/shuohao-export/examples/banquet-twist/分镜.md --out work/shots.json
node videogen/cli.mjs validate work/shots.json --names 沈晚,林柔
node tools/shuohao-export/cli.mjs export work/shots.json --protocol h3 --out work/h3-pack
node tools/shuohao-export/cli.mjs export work/shots.json --protocol seedance --out work/sd-pack
```

样例文件：

- Markdown 分镜：[`tools/shuohao-export/examples/banquet-twist/分镜.md`](../../tools/shuohao-export/examples/banquet-twist/分镜.md)
- 预置 `shots.json`：[`…/shots.json`](../../tools/shuohao-export/examples/banquet-twist/shots.json)

## 已有 skill 示例（不重复造轮子）

| 示例 | 路径 | 用途 |
|---|---|---|
| 阿禾 · 角色 intake | `skills/character-refs/examples/阿禾-intake.json` + `阿禾-描述.txt` | 角色参考图 intake 样例 |
| 渡口 · 改编大纲 | `skills/novel-outline/examples/渡口-outline.json` | 大纲五件套 JSON 样例 |
| 宴会厅反转 · 投产桥 | `tools/shuohao-export/examples/banquet-twist/` | plan / validate / H3 / Seedance |

## 与本仓库主路径的关系

- **不替换** Markdown → `videogen plan` → `gen` / 网页路线 C；本包是 plan 之后的**可选投产桥**。
- 分镜仍写中文 Markdown；需要上 H3 / Seedance 网页或 API 时再 export。
- Agent 入口：`skills/ai-video-director/SKILL.md` §2.5；总表：`AGENTS.md`。
