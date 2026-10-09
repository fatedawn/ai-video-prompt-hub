# AGENTS.md — 给 AI Agent 的使用说明 / Guide for AI agents

## 这个仓库提供什么 / What this repo offers

| 资源 | 路径 | 用途 |
|---|---|---|
| 分镜提示词库（7000+ 条，按 媒介→方向→题材 分类） | `prompts/`、`data/index.csv`、`data/prompts/*.jsonl` | 视频模型（Seedance/可灵/Veo/海螺）的参考写法 |
| 模板（69 个：七段式、资产图、分类模板） | `templates/`、`data/templates.jsonl` | 剧本/分镜/资产图的骨架 |
| 手绘动画渲染器 animator | `animator/` | 台词 → 逐笔手绘动画 + 本地 TTS 配音 + 字幕（免费、CPU、离线）；默认主持人「天机」；电影感特效（风格配方背景、转场、粒子、运镜，`node animator/src/cli.mjs fx` 列出） |
| 视频生成层 videogen | `videogen/` | 分镜 → 镜头清单 → 云 API / 本地 ComfyUI / 网页手动 → 配音字幕合成 |
| 静图成片 stills2video | `stills2video/` | 只有图片（如 ChatGPT Images 出的图）→ 按文件名编号排镜 → CPU 2.5D 视差 / 本地 GPU ComfyUI（Wan2.2）/ 云端 key / 网页手动 → 配音字幕转场成片；按显存自动选后端；24 个空镜配方 + 中文出图提示词 |
| PPT 式科普 slides2video | `slides2video/` | deck.md（类 Slidev 的 Markdown 幻灯片）或 .pptx → 本地 Kokoro 配音 → 要点跟着旁白关键词出现、圈注 / 高亮 / 聚光 / 同 id 跨页变形、KaTeX 公式逐项点亮、图表按讲解升起、Mermaid、Shiki 代码 → 卡拉 OK 字幕 → MP4（免费 CPU、无 API key） |
| 画风预设（297 种手绘风） | `animator/presets/handdrawn-styles.json` | 生图提示词配方 + 推荐画材 |
| 外部项目目录（322 个，279 个 2026 年仍活跃，已核验许可证） | `catalog/registry.json`、`catalog/*.md`、`docs/项目用途地图.md` | 手绘/火柴人、Remotion、代码动效、视频 Agent 技能、漫剧方法论、端到端平台、静图动效、补帧放大、幻灯片 / PPT 式科普、公式图表科学可视化、配音与字幕对齐；每个活跃条目有「最适合 best_for / 强项 strengths / 我们吸收了什么 absorbed / 怎么用 how_to_use」 |
| 方法论速查（本仓库整理） | `catalog/methodology.md` | 剧本结构、改编、一致性、分镜、打戏、手绘讲解、质检、科普 / PPT 式讲解 |
| AI 导演 Skill | `skills/ai-video-director/SKILL.md`（长表在 `references/`） | 需求确认 → 选路线（①–⑥）→ 选素材 / 写法 → 执行 → 质检合规 |
| 分镜提示词 Skill | `docs/skill/SKILL.md` | 写/改分镜提示词 |

## 决策流程 / Decision procedure

1. **Intake**：`node router/cli.mjs intake` 列出要问的问题（题材、漫剧/真人、现实向/特效向、时长、画幅、预算/硬件、角色素材、配音、是否商用）。能推断的不要问，最多问一轮。
2. **Route**（路线编号 ①②③④⑤⑥ 与 videogen 自己的「云 API / ComfyUI / 网页端」三种生成方式无关）：`node router/cli.mjs recommend "<题材>" --medium <漫剧|真人|其他> --budget <free-cpu|gpu|api-key|web-manual> [--aspect 9:16] [--duration 60] [--assets character,product,footage,images] [--vram <GB>] [--style <画风>] [--commercial] [--include-stale] [--format json]`
   - **⑥ slides2video**：科学科普、课件 / 微课、数学物理推导、论文讲解、已有 PPT（`import x.pptx`，备注即旁白）。画面以文字要点、公式、图表为主时优先于 ①。MCP `get_slides_plan` 可按题目起草 deck.md 骨架或检查已有 deck。
   - **① animator**：知识口播、绘本、古诗、拆书、天机风项目推荐，以及「免费 + CPU」预算下的漫剧。
   - **② videogen + prompts/**：仙侠/甜宠/悬疑/都市/科幻等剧情、vlog、MV、写实带货。`api-key` → `gen --provider`；`gpu` → ComfyUI；`web-manual` → `export`/`import`。
   - **③ 代码动效**：数据、图表、连续几何 / 函数动画、字幕重；免费预算下的带货片。Remotion（≤3 人公司免费）/ HyperFrames（Apache-2.0）/ Manim（MIT）。
   - **⑤ stills2video**：用户说「只有图片 / 没有视频订阅 / ChatGPT 出图」或 `--assets images` 时为主路线；免费 CPU 预算下需要视频模型的方案会把它列为备选。`--vram` 决定档位（cpu / gpu8 / gpu12 / gpu16 / gpu24）。不知道显存就让用户跑 `node stills2video/cli.mjs doctor`。
   - **④ 外部项目**：方案里按题材、预算、许可证、中文支持排好序的 `catalog/registry.json` 条目，带 best_for / how_to_use。**只推荐 2026-01-01 之后仍有推送的项目**（`registry.json` 的 `freshness.cutoff`）；停更 / 归档的只在 `catalog/*.md` 页尾「历史 / 不再推荐」里，需要时加 `--include-stale`（MCP `include_stale: true`）。
3. **Execute**：照方案「执行步骤」里的命令做；工作文件放 `.work/<slug>/`（已被 .gitignore）。
4. **QC**：字幕/对齐（`animator synccheck`；⑥ 用 `slides2video lint --qa` 和 `make --sheet`）、违规自查、标注 AI 生成。清单见 `skills/ai-video-director/references/qa-compliance.md`。

## 常用命令 / Commands

```bash
node router/cli.mjs recommend "仙侠漫剧：废柴少女觉醒灵根" --medium 漫剧 --budget api-key
node router/cli.mjs search 火柴人 --cost free-cpu          # 查外部项目
node router/cli.mjs scenarios                              # 能识别的题材
cd animator && npm install && npm run setup:tts            # 首次使用 animator
node animator/src/cli.mjs make 台词.txt --out out.mp4 --character tianji --media colored-pencil
node videogen/cli.mjs plan 分镜.md --out shots.json && node videogen/cli.mjs providers
node stills2video/cli.mjs doctor                           # 显卡档位 / 深度模型 / TTS / RIFE 检测
node stills2video/cli.mjs make --images stills/ --script 台词.txt --out final.mp4   # 静图 → 成片（自动选后端）
node stills2video/cli.mjs render s2v.json --backend comfyui --dry-run             # GPU 工作流只生成不执行
node slides2video/cli.mjs doctor                           # PPT 式科普：Chrome / ffmpeg / TTS / KaTeX 检测
node slides2video/cli.mjs lint deck.md --qa                # 一页一个想法、语速、静止时长 + 版式检查
node slides2video/cli.mjs make deck.md --images images/ --out final.mp4 --sheet sheet.jpg
node slides2video/cli.mjs import 课件.pptx --out work/ --mode pages   # PPT → deck.md
cd router && npm test                                      # 路由器测试（无依赖）
python3 scripts/build_index.py --check                     # 提示词索引一致性
```

## 规则 / Rules

- 第三方提示词/模板保留各自许可证与署名（front matter 里有 `license`、`source_repo`、`original_author`）；`link-only` 条目不要复制正文。
- 外部项目**只链接不复制**；非商用（PolyForm NC / CC BY-NC）和无许可证的项目，商用场景加 `--commercial` 排除。
- 不用真实名人/他人的脸、名字、声音；声音克隆和数字人只用本人或已授权素材。
- 模型权重、深度模型、RIFE/Real-ESRGAN 二进制都不进仓库（`npm run setup:depth` 按 sha256 下载到 `~/.cache/hda-models`）；ComfyUI（GPL）、Wan2GP（社区许可）只当外部程序调用。云端 / OpenAI 图像 API 默认 dry-run，没有 key 不会产生费用。
- **代码吸收规则**：MIT / Apache / BSD 可移植（保留版权头，更新 `NOTICE`、`NOTICE.md`、`ATTRIBUTION.md`、`LICENSES/`、`VENDOR.md`）；GPL / AGPL 只借鉴思路、干净重写；非商用 / 无许可证 / 专有只链接。本仓库原创部分 Apache-2.0，© 天机。
- **字体不入库**：KaTeX 字体（SIL OFL）渲染时从 `slides2video/node_modules/katex/dist/fonts` 加载；中文字体用系统已安装的；不提交 Arphic 等字体文件，也不提交花叔作品的画作素材。
- 不要手改 README 里 `STATS` 区块、`catalog/*.md` 和 `docs/项目用途地图.md`（分别由 `scripts/build_index.py` 和 `node router/cli.mjs build-catalog` 生成；用途字段由 `catalog/tools/usefor.py` 维护，可重复运行）。

---

**English summary.** This repo is a Chinese AI-video toolkit: a 7k-prompt library for video models (`prompts/`, indexed in `data/`), templates, a free CPU hand-drawn animator with local TTS (`animator/`), a provider-agnostic video generation layer (`videogen/`), a stills-to-video pipeline (`stills2video/`: CPU depth parallax, local ComfyUI Wan2.2, cloud keys or manual web, auto-selected by VRAM), a slides-to-video science-explainer pipeline (`slides2video/`: Markdown/PPTX decks, local TTS, word-synced builds, annotations, KaTeX/charts/Mermaid/Shiki, morph transitions; free CPU), and a license-verified catalog of external projects (`catalog/registry.json`; only projects pushed since 2026-01-01 are recommended, each with best_for / how_to_use), and a read-only local MCP server (`mcp/`, not published to npm). Run `node router/cli.mjs intake` to see what to ask the user, then `node router/cli.mjs recommend "<topic>" --medium … --budget …` to get a plan (route ① animator / ② videogen / ③ code motion / ④ external project / ⑤ stills2video for users who only have still images / ⑥ slides2video for science explainers, courseware and PPT-to-video), matching prompt ids, templates, style presets and exact commands. Keep third-party licenses and attribution; link external projects, never copy them.
