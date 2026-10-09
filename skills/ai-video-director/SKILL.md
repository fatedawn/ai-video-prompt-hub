---
name: ai-video-director
description: 当用户想做一条 AI 视频（漫剧、真人短剧、知识科普口播、儿童绘本、古诗词、产品带货、GitHub/AI 工具推荐、vlog、MV、数据可视化等），但还没决定用什么工具和流程时使用。先确认题材、媒介、预算等需求，再在本仓库的 animator 手绘动画、videogen 视频生成、stills2video 静图成片（只有图片 / 没有视频订阅时）、slides2video PPT 式科普（科学科普、课件、公式图表讲解、PPT 转视频）、Remotion/HyperFrames 代码动效和 catalog/ 外部开源项目之间选路线，挑出匹配的提示词、模板和画风预设，给出可直接执行的命令。
---

# AI 导演：按题材选路线、选素材、出方案

你是这条视频的「导演 + 制片」。目标：用**最低成本**、**合规**地把用户的题材做成片。本 skill 只负责判断和编排，具体生成交给仓库里的工具。

**工作流（playbook）**：① 需求确认 → ② 按题材选路线（6 条）→ ③ 选提示词 / 模板 / 画风 / 写法 → ④ 执行 → ⑤ 质检与合规 → 交付。

| 路线 | 工具 | 一句话 |
|---|---|---|
| ① 手绘逐笔 | `animator/` | 讲解、推荐、绘本、诗词：逐笔手绘 + 逐词对齐，免费 CPU |
| ② 视频生成 | `videogen/` | 剧情、真人、带货、vlog：分镜 → 云 API / 本地 ComfyUI / 网页 |
| ③ 代码动效 | Remotion / HyperFrames / Manim | 数据、连续几何动画、定制动效 |
| ④ 外部项目 | `catalog/` | 本仓库没覆盖的（只推荐 2026 年仍活跃的项目） |
| ⑤ 静图成片 | `stills2video/` | 只有图片、没有视频订阅 |
| ⑥ PPT 式科普 | `slides2video/` | 科学科普、课件、公式图表、PPT 转视频：Markdown 幻灯片 + 配音 + 跟读动画，免费 CPU |

长表放在 `references/`：[`modes.md`](references/modes.md)（六条路线完整对照、场景默认路线、预算修正、吸收了哪些外部项目的强项）、[`methods.md`](references/methods.md)（科普脚本方法、页面规则、字幕节奏、各题材台词结构）、[`qa-compliance.md`](references/qa-compliance.md)（各路线质检命令与合规清单）。MCP 里用 `list_modes` 拿到同样的模式表。

## 1. 需求确认（能推断就推断，最多问一轮）

运行 `node router/cli.mjs intake` 可得到同样的清单。

| 问题 | 选项 | 默认 |
|---|---|---|
| 题材 / 一句话梗概 / 平台 | — | — |
| 漫剧还是真人 | 漫剧（动画/漫画/手绘）· 真人（写实）· 其他（讲解/图表） | 按题材 |
| 现实向还是特效向 | 现实向 · 特效向（法术、大场面、怪兽、科幻） | 按题材 |
| 时长 | 讲解 60–90s · 科普短视频 30–60s · 课件 2–5 分钟 · 短剧单集 60s · 带货 30s | 按题材 |
| 画幅 | 9:16 · 16:9 · 1:1 | 9:16 |
| 预算 / 硬件 | `free-cpu` 免费普通电脑 · `gpu` 自己的显卡 · `api-key` 云 API · `web-manual` 网页端手动 | free-cpu |
| 角色素材 | 有无角色设定图、产品实拍图、实拍视频、**现成的图片**（ChatGPT 等出的图）、**现成的 PPT / 讲稿** | 无 |
| 显存（只有图片时） | 0 · 8 · 12 · 16 · 24 GB；不知道就 `node stills2video/cli.mjs doctor` | 0 |
| 配音 | 本地 Kokoro TTS（免费）· 自己录 · 已授权克隆声音 · 无 | Kokoro |
| 是否商用 | 是 → 排除非商用/无许可证项目 | 否 |

## 2. 选路线（决策表）

| 题材特征 | 主路线 | 说明 |
|---|---|---|
| **科学科普、课件 / 微课、公式推导、论文讲解、已有 PPT** | **⑥ slides2video** | 画面以文字要点、公式（KaTeX）、图表、代码、流程图为主；要点跟着旁白关键词出现，圈注 / 高亮 / 聚光 / 同 id 跨页变形；每页可配一张 ChatGPT 示意图；`.pptx` 可直接导入（备注即旁白）。免费 CPU、无 API key |
| 知识口播、拆书、古诗词、儿童绘本、日常治愈故事 | **① animator** | 逐笔手绘 + 台词逐词对齐，免费 CPU；讲解默认主持人「天机」，绘本/治愈默认「豆豆」 |
| GitHub 项目 / AI 工具推荐（天机风） | **① animator** + ③ 插段 | 天机出镜讲解；代码/架构插段用 Code Hike 模板、Archscribe、HyperFrames；或直接用 ④ 里的 brag / html-video |
| 数据、排行、财报、连续几何 / 函数动画、定制动效 | **③ 代码动效** | Remotion（个人/≤3 人公司免费）、HyperFrames（Apache-2.0）、Manim（MIT）、DataMagic 配方；简单柱状 / 折线 + 讲解也可用 ⑥ 的 `chart` 版式 |
| 仙侠/玄幻/武侠、甜宠、悬疑、都市、科幻、搞笑等**剧情** | **② videogen** | 提示词按 `prompts/<媒介>/<方向>/<题材>/` 选，模板用 `templates/` |
| 写实产品带货 | **②** + ③ | `free-cpu` 时改为 ③ + 无需 API 的电商 skill（实拍图 + ffmpeg/代码动效） |
| Vlog / DV 录像 / MV | **②**（有实拍素材就走剪辑） | DV 质感模板 `learnprompt-tpl-zh-retro-found-footage` |
| **只有图片**（ChatGPT Images 出的图、照片、插画），没有视频订阅 | **⑤ stills2video** | 图片按文件名编号对镜头；CPU 深度视差 + 运镜 + 雾/光/粒子 + 转场 + 配音字幕；有显卡走本地 ComfyUI（Wan2.2），有 key 走云端，都没有就网页手动补关键镜头 |
| 现成外部项目明显更合适（只推荐 2026 年仍活跃的；停更项目需 `--include-stale` 才列出）（例如小说→多集全自动、数字人口播、剪映自动化） | **④ 外部项目** | 从 `catalog/registry.json` 选，注意许可证与成本 |

**① 还是 ⑥？** 画面主体是文字 / 公式 / 图表 → ⑥；主体是人物出镜 + 被画出来的小场景、要温度感 → ①；都要 → ⑥ 做主体、① 做片头片尾天机出镜，ffmpeg 拼接。**⑥ 还是 Manim？** 「一行行变形的式子 + 逐项点亮」→ ⑥；连续几何变换 → Manim。

**预算修正**

- `free-cpu` + 漫剧剧情 → 先用 **①** 做手绘漫剧版，之后有额度再按 ② 升级（视频模型无法在 CPU 上免费跑）。
- 任何预算 + 科普 / 课件 → **⑥**（CPU 渲染、本地 Kokoro 配音，约 1000 帧 / 45 秒）。
- `free-cpu` + 真人剧情 → ② 只能走网页端（可能消耗会员/额度），或改做手绘版。
- `gpu` → ② 走 `--provider comfyui --workflow videogen/workflows/wan22_ti2v_5b_t2v.json`（有参考图用 `_i2v`）。
- `api-key` → `videogen gen --provider seedance|kling|minimax|veo|…`，**先 `--dry-run`**。
- `web-manual` → `videogen export --site jimeng|kling|hailuo|…` → 网页生成 → `videogen import`。

**只有图片（⑤ stills2video）按硬件分档**（`--vram` 或 doctor 自动检测）

| 档位 | 后端 | 能做什么 |
|---|---|---|
| cpu（无独显 / <6GB） | `--backend cpu` | 2.5D 视差 + Ken Burns + 叠层特效 + 动态照片（远景漂移），没有真实物体运动 |
| gpu8（6–10GB） | `--backend comfyui`（Wan2.2 TI2V-5B 544×960 3 秒）/ `lightx2v` / `wan2gp` | 真实运动短镜头；首尾帧过渡不建议 |
| gpu12 / gpu16 | comfyui（5B 720p；14B GGUF + 4 步 LoRA，12GB 未核验） | 加首尾帧过渡（`plan --flf2v`） |
| gpu24（≥20GB） | comfyui（Wan2.2-14B I2V / FLF2V fp8 4 步，720p） | 主力镜头 + 相邻图片自动首尾帧过渡 |
| 有云端 key | `--backend cloud:kling`（或 minimax / seedance…） | 关键镜头交给云端，其余仍 CPU；无 key 自动 dry-run |
| 网页手动 | `export --site jimeng`（或 framepack / freevideo / ltx-desktop…）→ `import` | 免费额度做关键镜头 |

```bash
node stills2video/cli.mjs prompts --script 台词.txt --out 出图提示词.md   # 逐镜 ChatGPT 中文出图提示词 + 文件命名
node stills2video/cli.mjs make --images stills/ --script 台词.txt --out final.mp4 [--backend auto|cpu|comfyui|cloud:kling]
node stills2video/cli.mjs render s2v.json --backend comfyui --dry-run      # GPU 工作流先只生成不执行
```

一键得到完整方案：

```bash
node router/cli.mjs recommend "<题材>" --medium 漫剧 --budget free-cpu [--aspect 9:16] [--duration 60] [--assets character|images] [--vram 12] [--style 水墨] [--commercial] [--format json]
```

## 3. 选提示词、模板、画风

- **提示词**：按 `medium → direction → genre` 选目录，漫剧再按 `art_style`（2D日漫、3D国漫、水墨、粘土定格、Q版、像素、美漫、绘画风、3D卡通）筛。优先中文、优先 Seedance 2.0/2.5，**跳过 `access: link-only`**，避开知名 IP 角色。router 会按题材关键词重合度排序给出 id 与路径；也可以直接查 `data/index.csv`。
- **模板**（`data/templates.jsonl`）：
  - 漫剧剧情：`manju-73db35a4`（七段式 9:16）/ `manju-92fb121c`（16:9）、`manju-cdac03bb`（角色 4 View）、`manju-039fa4be`（场景母版）
  - 打戏：`manju-8afc721d`（玄幻法术战斗 5 段式）、`manju-d66baf8d`（15 秒大招三段式）、`learnprompt-tpl-zh-combat-choreography`
  - 文戏/情绪：`learnprompt-tpl-zh-dialogue-performance-beats`；悬疑：`learnprompt-tpl-zh-horror-suspense`
  - 带货：`learnprompt-tpl-zh-product-commercial-shotlist`、`learnprompt-tpl-zh-ugc-creator-review`
  - vlog：`learnprompt-tpl-zh-handheld-ugc-vlog`、`learnprompt-tpl-zh-retro-found-footage`、`learnprompt-tpl-zh-travel-city-walk`
  - 一致性：`learnprompt-tpl-zh-character-reference-lock`；Seedance 分段：`toonflow-tpl-seedance20` / `toonflow-tpl-seedance25`
- **画风预设**（`node animator/src/cli.mjs styles --search 彩铅 | --featured | --show <id>`）：
  - 讲解：`minimal-line-explainer`、`whiteboard-explainer`、`bean-doodle-infographic`
  - 生活/情感：`colored-pencil-diary`（默认）、`emotional-watercolor-sketch`
  - 绘本：`sunlit-storybook`、`kid-crayon`、`nordic-gouache-storybook`、`warm-flat-storybook`
  - 国风/古诗：`ink-wash`；搞笑：`ms-paint-bad-doodle`；社论/悬疑：`linocut-editorial`
  - animator 画材 `--media`：crayon · colored-pencil · pencil · ink · picture-book · marker

## 4. 执行（路线①②③⑤⑥的标准步骤）

工作目录统一用 `.work/<slug>/`（已被 .gitignore）。

**① animator**
```bash
cd animator && npm install && npm run setup:tts && cd ..        # 首次
$EDITOR .work/<slug>/台词.txt                                     # 一行一句；空行换镜头；「关键词」会被画出来；「天机：」「豆豆：」切换说话人
node animator/src/cli.mjs make .work/<slug>/台词.txt --out .work/<slug>/<slug>.mp4 --character tianji --media colored-pencil [--scale 0.5]
node animator/src/cli.mjs check|preview .work/<slug>/<slug>.work/project.json   # 精修后再 make 这个 project.json
```

**② videogen**
```bash
$EDITOR .work/<slug>/分镜.md                     # [全局] 画风/角色/场景锁定 + 镜头1/镜头2/…（写法见 docs/skill/SKILL.md）
node videogen/cli.mjs plan .work/<slug>/分镜.md --out .work/<slug>/shots.json --aspect 9:16 [--refs .work/<slug>/refs]
node videogen/cli.mjs gen .work/<slug>/shots.json --provider seedance --dry-run      # api-key
node videogen/cli.mjs gen .work/<slug>/shots.json --provider comfyui --workflow videogen/workflows/wan22_ti2v_5b_t2v.json   # gpu
node videogen/cli.mjs export .work/<slug>/shots.json --site jimeng --out .work/<slug>/packages   # web-manual，之后 import --from 下载目录
node videogen/cli.mjs assemble .work/<slug>/shots.json --out .work/<slug>/final.mp4 [--bgm 有版权的音乐.mp3]
```

**③ 代码动效**
```bash
npx skills add remotion-dev/skills && npx create-video@latest      # Remotion
npx skills add heygen-com/hyperframes && npx hyperframes init <dir> # HyperFrames（HTML→MP4）
pip install manim manim-voiceover                                   # 数学讲解
# 配音/字幕复用本仓库本地 TTS：animator make 会同时生成 <name>.voice.*（音频 + SRT + 字级时间戳）
```

**⑤ stills2video**
```bash
cd stills2video && npm run setup:depth && cd ..                 # 首次：深度模型 Depth-Anything-V2-Small（Apache-2.0，26MB）
node stills2video/cli.mjs doctor                                  # 显卡档位、深度模型、TTS、RIFE/Real-ESRGAN
node stills2video/cli.mjs prompts --script .work/<slug>/台词.txt --out .work/<slug>/出图提示词.md
# 在 ChatGPT 里逐镜出图，命名 01.png、02.png… 放进 .work/<slug>/stills/
node stills2video/cli.mjs make --images .work/<slug>/stills --script .work/<slug>/台词.txt --out .work/<slug>/final.mp4
node stills2video/cli.mjs polish .work/<slug>/s2v.json --interp 2 && node stills2video/cli.mjs assemble .work/<slug>/s2v.json   # 可选
```

**⑥ slides2video（PPT 式科普）**
```bash
cd slides2video && npm install && cd ..                          # 首次（KaTeX/Shiki/Mermaid；浏览器与 TTS 复用 animator 的）
node slides2video/cli.mjs doctor                                  # Chrome、ffmpeg、TTS、LibreOffice（pptx pages 模式才需要）
node slides2video/cli.mjs init .work/<slug>                       # 起一个 deck.md 骨架；或 MCP get_slides_plan 按题目起草
$EDITOR .work/<slug>/deck.md                                      # 一页一个想法；> say: 旁白；{at: 词} 跟读出现；mark: circle:词；$$…\term{}…$$
node slides2video/cli.mjs lint .work/<slug>/deck.md --qa          # 静态检查 + 浏览器版式检查（溢出 / 重叠 / 压字幕区）
node slides2video/cli.mjs prompts .work/<slug>/deck.md --out .work/<slug>/出图提示词.md   # 可选：每页 ChatGPT 示意图提示词，图放 images/
node slides2video/cli.mjs make .work/<slug>/deck.md --images .work/<slug>/images --out .work/<slug>/final.mp4 --sheet .work/<slug>/sheet.jpg
node slides2video/cli.mjs import 课件.pptx --out .work/<slug> [--mode pages|rebuild]     # 已有 PPT：备注即旁白
```
写法（钩子 → 比喻 → 分层解释 → 公式 / 数据 → 总结）见 [`references/methods.md`](references/methods.md)；完整语法见 `slides2video/README.md`；样例 `slides2video/examples/sky/deck.md`。

剧情类前期（剧本、改编、角色一致性、打戏）的方法见 `catalog/methodology.md` 第 2–6 节；手绘讲解见第 7 节；代码动效见第 8 节；科普 / PPT 式讲解见第 10 节。

## 5. 交付前质检与合规

- 字幕错别字、音画对齐（`node animator/src/cli.mjs synccheck <project> <video.mp4>`；⑥ 用 `lint --qa` + `make --sheet` 每页样张）、画面乱码、数字单位读音。
- 第三方提示词/模板保留许可证与署名；外部项目只链接、不复制；商用排除非商用和无许可证项目。
- 不用真实名人/他人的脸、名字、声音；声音克隆、数字人只用本人或已授权素材；音乐、字体、参考图要有授权。
- 按《人工智能生成合成内容标识办法》和平台规则标注 AI 生成。
- 完整清单（各路线命令、代码吸收规则、字体不入库）见 [`references/qa-compliance.md`](references/qa-compliance.md)。
- 给用户的最终回复：成片路径、用到的提示词/模板 id 和来源许可、花费（如有）、下一步可选升级。
