# router · AI 导演路由器

根据「题材 + 媒介 + 预算」从本仓库的数据里组合出一份可执行的制作方案。纯 Node（≥18），**没有任何第三方依赖**，不联网。

```bash
node router/cli.mjs recommend "仙侠漫剧：废柴少女觉醒灵根，宗门大比一剑逆袭" --medium 漫剧 --budget api-key
node router/cli.mjs recommend "知识科普口播：为什么熬夜会让人变笨" --format json --out plan.json
node router/cli.mjs intake          # 需求确认问题清单
node router/cli.mjs scenarios       # 可识别的题材场景
node router/cli.mjs search 火柴人 --cost free-cpu --zh native
node router/cli.mjs build-catalog   # registry.json → catalog/*.md
node router/cli.mjs check           # 校验 registry、场景引用、catalog 是否最新
cd router && npm test               # 9 个示例题材 + 合规规则测试
```

## 读取的数据

| 数据 | 用途 |
|---|---|
| `catalog/registry.json` | 外部项目（路线、画风、输入输出、成本、中文支持、许可证类别、成熟度） |
| `data/index.csv` | 分类体系（媒介→方向→题材、漫剧画风）与 `link-only` 标记 |
| `data/prompts/part-*.jsonl` | 提示词标题与正文（用于题材关键词匹配） |
| `data/templates.jsonl` | 模板 |
| `animator/presets/handdrawn-styles.json` | 画风预设 |

## 怎么决定

1. **识别题材**：`lib/profiles.mjs` 里 17 个场景（项目推荐、科普、绘本、古诗、拆书、数据、数学、带货、仙侠、甜宠、悬疑、都市、科幻、搞笑、治愈、vlog、MV）各有一组关键词，按命中加权打分；没命中就按「通用剧情」。另有修饰：小说改编、字幕重、面向儿童。
2. **媒介/方向**：命令行参数优先；否则从题材描述里找「漫剧/动画/真人/实拍/特效/法术…」；再否则用场景默认值。
3. **路线**：讲解/绘本/古诗/拆书/项目推荐 → ① animator；数据/数学 → ③ 代码动效；剧情/vlog/MV/带货 → ② videogen；④ 外部项目始终作为补充列出。再按预算修正（`free-cpu` 的漫剧剧情改 ①，`free-cpu` 带货改 ③；`gpu` → ComfyUI；`api-key` → 云 API；`web-manual` → export/import）。
4. **提示词**：只在场景对应的 `媒介/方向/题材` 目录里选；得分 = 目录优先级 + 题材描述与标题/正文的中文二元组重合 + 中文加分 + 漫剧画风匹配；排除 `link-only`，知名 IP 角色和（儿童题材下的）打斗血腥内容大幅降权；同题材最多 3 条、同标题去重。
5. **模板/画风**：场景预设 + 画幅（16:9 换横屏七段式）+ 素材（有角色图加「参考图身份锁定」）；画风预设可用 `--style` 覆盖（id 或中文关键词），并映射到 animator 画材（与 `animator/src/styles.mjs` 的 `suggestMedia` 一致，测试会校验）。
6. **外部项目**：按 用途标签重合（主标签加权）、输入类型、路线、预算兼容、中文支持、许可证类别、成熟度、★ 打分；方法论类单独列出。`--commercial` 直接排除非商用与无许可证项目。
7. **命令**：按路线生成 animator / videogen / Remotion / HyperFrames / Manim 的具体命令，工作目录 `.work/<slug>/`。

示例输出见 [`examples/`](examples/)（`node router/cli.mjs examples` 重新生成）。
