# shuohao-export — H3 / Seedance 投产包

从本仓库的 `videogen` **shots.json**（或上游 shuohao **storyboard.json**）导出 MiniMax H3 / 即梦 Seedance 投产文件夹。

吸收自 [eternityspring/shuohao-skills](https://github.com/eternityspring/shuohao-skills)（Apache-2.0，Copyright 2026 烁皓）的 `novel-storyboard` 导出与部分质量门；署名见仓库根 `NOTICE` / `ATTRIBUTION.md` / `LICENSES/eternityspring_shuohao-skills-Apache-2.0.txt`。

## 怎么用

```bash
# 1) 先用 videogen 把 Markdown 分镜拆成 shots.json（本仓库主路径，不变）
node videogen/cli.mjs plan 分镜.md --out work/shots.json

# 2) 导出 H3 或 Seedance 包（每段一个文件夹 + manifest）
node tools/shuohao-export/cli.mjs export work/shots.json --protocol h3 --out work/h3-pack
node tools/shuohao-export/cli.mjs export work/shots.json --protocol seedance --out work/sd-pack

# 3) 确定性质量门（段上限 / 切长 / H3 结构 / Seedance 正文 / 禁人名）
node tools/shuohao-export/cli.mjs validate work/shots.json --names 沈晚,林柔
node videogen/cli.mjs validate work/shots.json   # 同门，挂在 videogen 上

# 可选：只看桥接后的段/切 JSON
node tools/shuohao-export/cli.mjs board work/shots.json --out work/board.json
```

也可直接喂上游 `*-storyboard.json`（带 `episodes[].segments[].cuts` / `h3Prompt`）。

## 参考文档

| 文件 | 内容 |
|---|---|
| `references/h3-prompt.md` | MiniMax H3 提示词结构 |
| `references/seedance-prompt.md` | Seedance 程序拼装结构 |
| `references/shot-writing.md` | 镜头正文写法 |

## 与本仓库其它路径的关系

- **不替换** Markdown → `videogen plan` 主路径；本工具是 plan 之后的可选投产桥。
- 角色真出参考图：`skills/character-refs/`（同来源，BYO 出图后端）。
- 小说改编大纲：`skills/novel-outline/`。
- 方法论摘要（角色三档、空景无人、冷开场前 3 拍）：`catalog/methodology.md`。

## 演示

| 路径 | 内容 |
|---|---|
| [`examples/banquet-twist/`](examples/banquet-twist/) | 短 Markdown 分镜 + 预置 `shots.json` + `run_demo.sh`（plan→validate→H3/Seedance） |
| [`../../demos/shuohao-absorb/`](../../demos/shuohao-absorb/README.md) | 全部吸收能力的中文索引 |

```bash
bash tools/shuohao-export/examples/banquet-twist/run_demo.sh /tmp/shuohao-demo
```

