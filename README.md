# AI 视频提示词库 · ai-video-prompt-hub

收集 **Seedance 2.0 / 2.5 等 AI 视频模型** 的公开提示词，只收许可证允许转载的上游（MIT、CC BY 4.0）。按 **漫剧 / 真人 / 其他** 严格分开，再按「现实向 / 特效向」和题材细分，给「天机」系列等 AI 漫剧、真人短剧做分镜和写提示词时参考。

*English: A local, license-aware index of public AI-video (Seedance etc.) prompts — animation (漫剧) and live-action (真人) kept strictly apart, full per-prompt attribution — plus tools to turn a storyboard into a finished video: a hand-drawn animator with a default host character 「天机」, a free offline Chinese TTS, and a video-generation layer (cloud APIs with your own keys / local ComfyUI / manual web round-trip). This repository's own code and content are Apache-2.0 (Copyright 2026 天机); third-party prompts keep their upstream licenses (MIT / CC BY 4.0) with credit to their original authors. Entries that failed the pre-publication content audit are listed by title, credit and link only.*

## 我想……（用途 → 工具）

| 我想…… | 用什么 | 一条命令 |
|---|---|---|
| 找现成的漫剧 / 真人提示词参考 | `prompts/`（按 漫剧 / 真人 / 其他 → 现实向 / 特效向 → 题材分类），`data/` 检索 | `jq -r 'select(.medium=="漫剧") \| .title' data/prompts/part-*.jsonl` |
| 自己写分镜提示词（镜头1 / 镜头2 / 时间段写法） | `templates/`、[`docs/分镜提示词手册.md`](docs/分镜提示词手册.md)、[`docs/skill/SKILL.md`](docs/skill/SKILL.md) | — |
| 把分镜变成 AI 视频片段：有 API key | [`videogen/`](videogen/README.md) 路线 A：Seedance / 可灵 / 海螺 / Veo / fal / Replicate / Runway / Luma（key 自带，放 `.env`） | `node videogen/cli.mjs gen shots.json --provider seedance --dry-run` |
| 把分镜变成 AI 视频片段：有显卡、想离线 | `videogen/` 路线 B：自己跑的 ComfyUI（Wan2.2 等开源模型） | `node videogen/cli.mjs gen shots.json --provider comfyui --workflow videogen/workflows/wan22_ti2v_5b_t2v.json` |
| 把分镜变成 AI 视频片段：只用网页端（即梦 / 可灵 / 海螺 / Sora） | `videogen/` 路线 C：导出逐镜头生成包 → 网页生成 → 按文件名导回 | `node videogen/cli.mjs export shots.json --site jimeng` |
| 把一堆镜头拼成带配音、字幕、BGM 的成片 | `videogen assemble`（自动处理时长 / 画幅不一致） | `node videogen/cli.mjs assemble shots.json --bgm music.mp3` |
| 做手绘动画讲解 / 口播短视频 | [`animator/`](animator/README.md)：默认主持人「天机」，台词一行一句即可出片 | `cd animator && node src/cli.mjs make 台词.txt` |
| 免费、离线的中文配音（带字级时间戳） | `animator/tts/`：Kokoro v1.1-zh（Apache-2.0，CPU），edge-tts 可选 | `cd animator && npm run setup:tts && node src/cli.mjs tts 工程.json` |
| **只有图片**（ChatGPT 出的图 / 照片），没有视频订阅，想做成带配音字幕的短片 | [`stills2video/`](stills2video/README.md)：CPU 深度视差 / 本地 ComfyUI / 云端 key / 网页手动，按显存自动选（见下文「只有图片怎么做视频」） | `node stills2video/cli.mjs make --images stills/ --script 台词.txt --out final.mp4` |
| 不知道该用哪条路线，想让 AI 按题材出方案 | [`router/`](router/README.md) + [`skills/ai-video-director/`](skills/ai-video-director/SKILL.md)（见下文「AI 导演 / Agent 使用」） | `node router/cli.mjs recommend "仙侠漫剧：……" --budget free-cpu` |
| 找开源工具：手绘/白板/火柴人、Remotion、代码动效、视频 Agent 技能、漫剧方法论 | [`catalog/`](catalog/README.md)（245 个，已核验许可证，仅链接）· [`tools/漫剧漫画代码项目.md`](tools/漫剧漫画代码项目.md) | `node router/cli.mjs search 火柴人 --cost free-cpu` |

预览（随仓库提交的小文件）：[天机设定图](docs/assets/tianji_sheet.png) · [天机剪影](docs/assets/tianji_silhouette.png) · [天机电影感特效展示（带配音）](docs/assets/tianji-showcase.mp4) · [路线 C 演示成片（替身片段）](docs/assets/videogen-route-c-demo.mp4) · [静图成片示例（纯 CPU，带配音）](docs/assets/stills2video-sample.mp4)

> 原作者 / 权利人如需删除，请用 [下架申请模板](.github/ISSUE_TEMPLATE/takedown.md) 提 issue（见下文「合规与下架」）。贡献新提示词请先读 [CONTRIBUTING.md](CONTRIBUTING.md)；**不要提交任何 API key**（见 [SECURITY.md](SECURITY.md)）。

---

## 只有图片怎么做视频

手上只有一组图（例如在 ChatGPT Images 里出的图），没有视频会员、也不一定有显卡？用 [`stills2video/`](stills2video/README.md)：把图片按 `01.png、02.png…`（或 `S01_shot03`、`镜头3`）命名放进一个文件夹，台词一行一句，一条命令出片。它会按文件名编号对镜头、按台词关键词选空镜配方，自动运镜、加氛围特效、转场、本地配音和逐字字幕，同时输出封面和缩略图。四条路线用同一个镜头格式，可以混用（例如大部分镜头 CPU，关键镜头交给云端）：

| 路线 | 适合谁 | 镜头怎么动 | 成本 | 命令 |
|---|---|---|---|---|
| ① CPU（默认） | 任何电脑，无独显 | 深度视差推拉摇移 / 环绕 / 希区柯克变焦 + 雾、光束、雨雪、粒子、光斑 + 远景漂移的动态照片；没有真实物体运动 | 免费 | `make … --backend cpu` |
| ② 本地 GPU | 8 / 12 / 16 / 24GB 显卡 | 你自己的 ComfyUI 跑 Wan2.2（5B 图生视频；14B 4 步图生视频 + 相邻两张图的首尾帧过渡），也可写 Wan2GP / LightX2V 的任务文件 | 免费（电费） | `make … --backend comfyui`（先 `--dry-run`） |
| ③ 云端 key | 有可灵 / 海螺 / Seedance / Veo 等 API key | 复用 videogen 适配器；没填 key 自动 dry-run，只打印请求 | 按秒计费 | `make … --backend cloud:kling` |
| ④ 网页手动 | 有网页端免费额度 / 会员 | 导出逐镜头生成包（即梦、可灵、海螺、FramePack、FreeVideo、LTX-Desktop…），生成后按文件名导回 | 看平台 | `export --site jimeng` → `import --from 下载目录` |

```bash
cd stills2video && npm run setup:depth && cd ..         # 首次：下载深度模型（Depth-Anything-V2-Small，Apache-2.0，26MB，校验 sha256）
cd animator && npm install && npm run setup:tts && cd .. # 首次：本地配音（Kokoro）
node stills2video/cli.mjs doctor                          # 检测显卡档位、深度模型、TTS、RIFE / Real-ESRGAN，给出推荐路线
node stills2video/cli.mjs prompts --script 台词.txt --out 出图提示词.md   # 逐镜写 ChatGPT 中文出图提示词和文件名
node stills2video/cli.mjs make --images stills/ --script 台词.txt --out final.mp4   # 自动选后端
bash stills2video/examples/sample/run_sample.sh /tmp/s2v  # 示例：程序画的 5 张图 → 9:16 成片
```

- 显存档位自动检测（`nvidia-smi`）：<6GB → CPU；6–10GB → Wan2.2 TI2V-5B 544×960；10–14GB → 5B 720p（14B GGUF 量化未核验）；14–20GB → 14B GGUF + 4 步 LoRA；≥20GB → 14B fp8 4 步 + 首尾帧过渡。档位、显存数字和出处见 [`stills2video/README.md`](stills2video/README.md)。
- 24 个空镜配方：晨雾竹林推进、仙侠云海环绕、城市夜景延时感、产品展示旋转光效、雨夜窗边、雪落小镇、樱花飘落、星空银河…（`node stills2video/cli.mjs recipes`），每个配方带运镜、特效、转场、图生视频提示词和一条中文出图模板。
- 打磨：检测到 `rife-ncnn-vulkan` / `realesrgan-ncnn-vulkan` 就补帧 / 超分，没有就退回 ffmpeg（`polish`）。
- 只想要方案：`node router/cli.mjs recommend "只有几张图，没有视频订阅……" --vram 12`，或 MCP 工具 `get_i2v_plan`。
- 选型过程：我们读了 19 个相关开源项目的代码，取舍和许可证处理见 [`docs/i2v-对比.md`](docs/i2v-对比.md)。GPL / AGPL 项目只借鉴思路、代码全部自写；非商用和无许可证项目只给链接。模型权重一律不进仓库。

---

## AI 导演 / Agent 使用

把「我想做一条 xx 题材的视频」交给 AI Agent（Claude Code、Codex、Cursor 等）时，Agent 会先读根目录的 [`AGENTS.md`](AGENTS.md)（Claude Code 读 [`CLAUDE.md`](CLAUDE.md)），再按 [`skills/ai-video-director/SKILL.md`](skills/ai-video-director/SKILL.md) 做三件事：

1. **问清需求**：题材、漫剧还是真人、现实向还是特效向、时长、画幅、预算/硬件（免费 CPU / 自己的显卡 / API key / 网页手动）、角色素材、配音、是否商用。
2. **选路线**：
   - ① **animator 手绘动画**：讲解、科普、绘本、古诗、天机风项目推荐
   - ② **videogen 视频生成 + prompts/**：仙侠、甜宠、悬疑等剧情
   - ③ **代码动效**：数据、图表、公式、字幕重的视频，用 Remotion / HyperFrames / Manim
   - ④ **外部开源项目**：从 [`catalog/`](catalog/README.md) 里选
   - ⑤ **stills2video 静图成片**：只有图片、没有视频订阅时（见上文）

   预算会改变选择，例如免费 CPU 下的漫剧先出手绘版。
3. **出方案**：给出匹配的提示词 id、模板、画风预设、外部项目和逐条命令。

```bash
node router/cli.mjs intake                                                   # 需求确认问题清单
node router/cli.mjs recommend "仙侠漫剧：废柴少女觉醒灵根，宗门大比一剑逆袭" --medium 漫剧 --budget api-key
node router/cli.mjs recommend "知识科普口播：为什么熬夜会让人变笨" --budget free-cpu --format json
node router/cli.mjs search 白板 --zh native                                   # 查外部项目
```

9 个示例题材的完整方案在 [`router/examples/`](router/examples/)：仙侠漫剧、都市甜宠真人剧、知识科普口播、儿童绘本、悬疑短剧、产品带货、GitHub 项目推荐（天机）、DV vlog、只有图片无订阅。

**外部项目目录 [`catalog/`](catalog/README.md)** 共 245 个项目，全部用 GitHub API 核验过（`verified_at` 2026-10-09），许可证读的是 LICENSE 原文，分 14 类：

- 手绘·白板·火柴人
- 笔画与手绘风组件
- AI 草图动画研究
- Remotion 生态
- 代码动效引擎
- 视频 Agent 技能
- 漫剧·短剧方法论
- 端到端平台
- 剪辑·切条·字幕
- 开源视频模型
- 视频 MCP
- 提示词库资源
- 静图动效（2.5D 视差 · Ken Burns · 动态照片）
- 补帧放大（插帧 · 超分）

非商用、无许可证、Elastic License 2.0 和混元 / WanGP / LTX / MiniMax H3 社区许可标了警告，排序靠后；`node router/cli.mjs recommend … --commercial` 会排除它们。

## 本地 MCP（尚未发布到 npm）

`mcp/` 是本仓库自己的只读 MCP 服务（Apache-2.0，Copyright 2026 天机），包名 `ai-video-prompt-hub-mcp`。**没有执行 npm publish，也没有提交到 MCP Registry、Smithery、glama 或 mcp.so。** 不需要 API key。默认 stdio；可选的 HTTP 只监听 127.0.0.1。

```bash
cd mcp && npm install
node src/server.mjs          # stdio
node src/http.mjs            # 可选：http://127.0.0.1:8765/mcp
```

数据根目录默认是本仓库。换位置时设置 `HUB_ROOT`（或 `AVPH_ROOT`）。

Claude Desktop / Cursor 指向本地路径（不要写成尚未发布的 npx 包名）：

```json
{
  "mcpServers": {
    "ai-video-hub": {
      "command": "node",
      "args": ["/absolute/path/to/ai-video-prompt-hub/mcp/src/server.mjs"]
    }
  }
}
```

工具（全部只读）：`recommend_video_pipeline`、`get_intake_questions`、`search_video_prompts`、`get_video_prompt`、`list_prompt_taxonomy`、`search_templates`、`get_template`、`search_projects`、`get_project`、`get_style_presets`、`lint_storyboard_prompt`、`compliance_check`、`get_i2v_plan`（只有图片时的静图成片方案）。仅链接条目的 `get_video_prompt` 不返回正文。每条提示词、模板、项目都带署名。


[`catalog/methodology.md`](catalog/methodology.md) 是本仓库用自己的话整理的方法论速查，内容包括剧本结构、小说改编、角色一致性、分镜写法、打戏、手绘讲解和质检，每条都附原始出处链接。目录只放链接和自写简介，不复制第三方代码或文档。

---

## 怎么用

1. **按分类浏览**：进入 `prompts/漫剧/…`、`prompts/真人/…` 或 `prompts/其他/…`。每个题材文件夹里都有 `README.md` 索引表，列出标题、语言、模型、画风、来源和原作者。
2. **单条提示词**：每个 `.md` 文件开头是 YAML front matter（元数据），正文分为：
   - 「提示词」代码块：上游原文，**一字未改**；
   - 「其他语言版本」：上游自带的翻译；
   - 「出处与许可」。
   - 少数条目经发布前内容审核**只保留标题、署名和原帖链接**（front matter `access: "link-only"`，原因见 `audit_reason`），请到原帖阅读全文。
3. **检索 / 二次开发**：
   - `data/prompts/part-NN.jsonl`：一行一条，含全文，按 id 排序分成若干个分片（每个 < 8 MB）；
   - `data/prompts/part-NN.csv`：同样的分片，Excel 可直接打开（UTF-8 BOM）；
   - `data/index.csv`：全部条目的元数据（不含正文），一个文件即可浏览；
   - 仅链接条目的 `prompt` 为空，`access` 为 `link-only`。

   下面是用 jq 筛选的例子：
   ```bash
   jq -r 'select(.medium=="漫剧" and .direction=="特效向") | .title' data/prompts/part-*.jsonl
   ```
4. **写新提示词**：
   - 套 `templates/` 里的模板（七段式、分段 Timeline、分类模板等）；
   - 方法论见 [`docs/分镜提示词手册.md`](docs/分镜提示词手册.md)；
   - Agent Skill 见 [`docs/skill/SKILL.md`](docs/skill/SKILL.md)。
5. **找工具**：漫剧 / 漫画相关的开源代码项目（生成管线、线稿上色、分镜、ComfyUI、一站式短剧平台）见 [`tools/漫剧漫画代码项目.md`](tools/漫剧漫画代码项目.md)。这份清单只放链接。
6. **做手绘动画**：[`animator/`](animator/README.md) 是本仓库自带的手绘动画渲染器。默认主持人是原创角色「天机」（招牌动作「亮扇」），写一个台词文件就能一条命令出片：本地开源 TTS 配音 → 字级时间戳 → 蜡笔 / 彩铅等画材逐笔画出、与台词逐字对齐的竖屏 MP4。也支持定义自己的角色（SVG 部件骨骼或 PNG 设定图）。还内置电影感特效：35 种名画 / 风格配方背景、50+ 转场、粒子（星光、花瓣、剑气、闪电…）、素描→上色、水墨开场、推拉摇移与甩镜等运镜（`node src/cli.mjs fx` 列出全部）；其中风格配方、转场和后期层移植自 [alchaincyf/huashu-art-motion](https://github.com/alchaincyf/huashu-art-motion)（MIT）。
   ```bash
   cd animator && npm install && npm run setup:tts && npm run demo    # → animator/examples/out/demo.mp4（带配音）
   ```
7. **分镜 → AI 视频成片**：[`videogen/`](videogen/README.md) 读本仓库的分镜写法，三条路线（云 API 自带 key / 自己的 GPU + ComfyUI / 网页端手动往返）产出镜头，再统一配音、加字幕和 BGM 合成。密钥只从环境变量或 `.env` 读取，本仓库不提供、不保管任何 key（模板见 `.env.example`）。

### 重新生成索引

```bash
python3 scripts/build_index.py          # 不依赖第三方库，只用 Python 3 标准库
python3 scripts/build_index.py --check  # 只校验，不写文件
```

`build_index.py` 只读 `prompts/` 和 `templates/`，会做这些事：
- 按 front matter 把文件移到正确的分类文件夹，并删除空文件夹；
- 重新生成 `data/prompts/` 分片、`data/index.csv`、`data/templates.jsonl` 和各级 `README.md` 索引；
- 更新本文件中的统计区块。

`scripts/extract_sources.py` 负责从上游仓库的本地克隆重新提取，默认路径是与本仓库同级的 `../ai-drama-prompts/src/`（可用 `--src` 或环境变量 `PROMPT_HUB_SRC` 指定）。提取时会跑下架名单和内容审核（`scripts/audit.py` + `data/audit_overrides.tsv`），并写出 `data/extraction_report.json`（commit、去重、暂缓收录、审核降级 / 排除清单）。

**手动改分类**：
1. 改文件 front matter 里的 `medium` / `direction` / `genre` / `art_style`；
2. 把 `classification` 改为 `"manual"`；
3. 运行 `build_index.py`，文件会自动移过去。

---

## 目录结构

```text
ai-video-prompt-hub/
├── README.md              # 本文件（统计区块由脚本生成）
├── LICENSE                # Apache-2.0：本仓库自己的代码与内容（版权人：天机）
├── NOTICE                 # Apache-2.0 NOTICE：版权行 + 第三方署名摘要
├── CONTRIBUTING.md        # 怎么添加提示词（来源 + 许可）、内容审核规则
├── SECURITY.md            # 不要提交密钥；漏洞报告方式
├── .github/ISSUE_TEMPLATE/ # 下架申请模板
├── .env.example           # videogen 的 API key 模板（复制为 .env，.env 不进 git）
├── NOTICE.md              # 版权与许可详细说明（本仓库 / 第三方 / 仅链接 / 内容审核）
├── ATTRIBUTION.md         # 每个上游项目的署名、commit、取用范围与改动说明
├── LICENSES/              # 上游 MIT / CC BY 4.0 许可全文（含各自版权行）
├── prompts/               # 提示词（一条一个 .md，YAML front matter + 原文代码块）
│   ├── 漫剧/{现实向,特效向}/<题材>/
│   ├── 真人/{现实向,特效向}/<题材>/
│   └── 其他/<类别>/        # 广告带货、风景空镜、动态图形、动物萌宠、美食
├── templates/             # 可复用模板（LearnPrompt 分类模板 / 漫剧老李七段式 / Toonflow 分段模板）
├── data/                  # prompts/part-NN.{jsonl,csv} · index.csv · templates.jsonl · extraction_report.json · takedown.txt · audit_overrides.tsv
├── docs/                  # 分镜提示词手册.md（用户自有手册）· skill/SKILL.md · assets/（天机设定图、演示视频等小预览）
├── tools/                 # 漫剧漫画代码项目.md（仅链接）
├── AGENTS.md / CLAUDE.md  # 给 AI Agent 的使用说明（能力、决策流程、命令）
├── skills/ai-video-director/ # AI 导演 Skill：需求确认 → 选路线 → 选素材 → 执行
├── router/                # AI 导演路由器 CLI（无依赖）：题材 → 方案；tests、examples/
├── catalog/               # 外部项目目录：registry.json（机器可读）+ 分类页面 + methodology.md
├── animator/              # 手绘动画渲染器（Node + 浏览器 Canvas + ffmpeg），详见 animator/README.md
│   ├── src/               #   命令行、工程编译、绘制引擎（全部为本仓库原创代码）
│   ├── schema/            #   工程 / 角色 JSON Schema
│   ├── characters/        #   原创角色「天机」（默认）与「豆豆」
│   ├── tts/               #   本地开源 TTS（Kokoro v1.1-zh / sherpa-onnx）+ 字级对齐，模型按 sha256 下载
│   ├── presets/           #   画风提示词预设（第三方 MIT 数据，见 NOTICE.md）
│   ├── templates/         #   init 用的默认工程模板（主持人：天机）
│   ├── examples/          #   主示例《天机泄露》、《豆豆的早晨》等
│   ├── vendor/            #   按 MIT 原样移植的第三方代码：huashu-art-motion（风格配方 / 转场 / 后期层，见 VENDOR.md）
│   └── tools/             #   静止帧 / 图文对齐 QA、可选 edge-tts
├── stills2video/          # 只有图片 → 成片：CPU 深度视差 / ComfyUI / 云端 / 网页手动，配方库，详见 stills2video/README.md
│   ├── py/                #   CPU 渲染（numpy 反向映射视差 + 叠层特效）、深度模型（onnxruntime）、模型下载脚本
│   ├── lib/               #   分镜解析、硬件档位、后端（cpu/comfyui/cloud/manual/wan2gp/lightx2v）、补帧放大
│   ├── recipes/           #   24 个空镜配方（运镜 + 特效 + 转场 + 中文出图模板）
│   └── workflows/         #   Wan2.2 14B 图生视频 / 首尾帧 ComfyUI API 工作流（改写自 Comfy-Org MIT 模板）
├── videogen/              # 分镜 → 视频片段（云 API / ComfyUI / 网页端往返）→ 配音 + 字幕 + BGM 成片，详见 videogen/README.md
└── scripts/               # build_index.py · extract_sources.py · audit.py · classify.py · hub_common.py
```

---

## 分类体系

分三层：**媒介 medium → 方向 direction → 题材 genre**。漫剧条目另有一个画风字段 `art_style`。

| 层级 | 取值 | 判定要点 |
|---|---|---|
| 媒介 `medium` | **漫剧** | 动画、非写实画面：2D 日漫、3D 国漫、水墨、粘土 / 定格、Q 版、像素、美漫、绘画风、3D 卡通等 |
| | **真人** | 写实真人或电影实拍质感（photoreal / live-action / 电影感真人）。**与漫剧绝不混放** |
| | **其他** | 主体不是剧情角色：产品广告 / 带货、纯风景 / 空镜、抽象 / 动态图形 / UI、只有动物、美食 |
| 方向 `direction` | 现实向 | 现实世界里可能发生的剧情、生活、情绪、广告质感 |
| （仅漫剧 / 真人） | 特效向 | 仙侠玄幻、武侠打斗、科幻、怪兽、恐怖、超现实、大招特效等，需要大量 VFX |
| 题材 `genre` | 见下方统计表 | 文件夹名从实际数据里挑选，**没有空文件夹**。拿不准的条目归入「剧情短片」（现实向）或「特效综合」（特效向） |
| 画风 `art_style` | 2D日漫 / 3D国漫 / 水墨 / 粘土定格 / Q版 / 像素 / 美漫 / 绘画风 / 3D卡通 / 未注明 | 仅漫剧填写 |

- 分类由 `scripts/classify.py` 按关键词**启发式**自动判定：
  - 判定前先去掉「不要 / avoid / no …」这类否定约束；
  - 用到标题、上游描述、正文、标签，以及 LearnPrompt 的模板分类。
- 自动判定难免有误，欢迎按上文「手动改分类」修正。front matter 中 `classification: "auto"` 表示自动判定，`"manual"` 表示人工确认。
- 每条 front matter 包含以下字段：`id, title, title_en, model, language, medium, direction, genre, art_style, tags, source_repo, source_url（固定 commit 的行级永久链接）, license, license_url, original_author, original_author_url, original_post_url, published, third_party_author, flags, also_in（重复收录的其他来源）, source_page, classification, changes`；仅链接条目另有 `access: "link-only"` 与 `audit_reason`。

---

## 统计

<!-- STATS:START -->
**提示词总数：13788 条**（跨来源去重后）；另有可复用模板 69 个（见 `templates/`）。
其中 **13529 条** 的提示词版权属于第三方原作者（X/Twitter、微信公众号、博客等，已保留原作者与原帖链接），其中 11 条上游未给出可追溯的原帖链接（已在文件中标记 `no_traceable_original_post`）。

**全文收录 12827 条；仅标题 + 署名 + 链接 961 条**（发布前内容审核降级，见下表与 `CONTRIBUTING.md`「内容审核」）；另有 13 条因涉及未成年人或年龄不明人物的性化内容未收录（只在 `data/extraction_report.json` 记 id 与原因）。

| 降级原因 | 代码 | 条数 |
|---|---|---|
| 版权角色 / IP | `copyrighted-character` | 460 |
| 真实人物 | `real-person` | 160 |
| 仇恨 | `hate` | 118 |
| 品牌官方广告冒用风险 | `brand-ad` | 106 |
| 性内容 | `sexual` | 103 |
| 极端血腥 | `gore` | 12 |
| 毒品 / 武器 | `drugs-weapons` | 1 |
| 自残 | `self-harm` | 1 |

### 按收录来源

| 来源仓库 | 收录条数（去重后归属） | 全文 | 仅链接 | 另作为重复项出现 | 上游许可 |
|---|---|---|---|---|---|
| [YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts) | 6472 | 6235 | 237 | 15 | CC-BY-4.0 |
| [LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance) | 631 | 615 | 16 | 164 | CC-BY-4.0 (curation) — prompt © original creator |
| [ZeroLu/awesome-seedance](https://github.com/ZeroLu/awesome-seedance) | 44 | 40 | 4 | 26 | MIT |
| [Emily2040/seedance-2.0](https://github.com/Emily2040/seedance-2.0) | 104 | 104 | 0 | 8 | MIT |
| [lixiaoxiao9888-create/manju-laoli-skill](https://github.com/lixiaoxiao9888-create/manju-laoli-skill) | 7 | 7 | 0 | 0 | MIT |
| [renoise-ai/awesome-seedance-prompts](https://github.com/renoise-ai/awesome-seedance-prompts) | 3940 | 3369 | 571 | 0 | CC-BY-4.0 |
| [YouMind-OpenLab/awesome-grok-imagine-prompts](https://github.com/YouMind-OpenLab/awesome-grok-imagine-prompts) | 2432 | 2305 | 127 | 0 | CC-BY-4.0 |
| [hanshs474/seedance-prompts-mcp](https://github.com/hanshs474/seedance-prompts-mcp) | 118 | 113 | 5 | 0 | MIT |
| [f/awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts) | 10 | 10 | 0 | 0 | CC0-1.0 |
| [liu-kaining/Awesome-Veo3-Prompts](https://github.com/liu-kaining/Awesome-Veo3-Prompts) | 30 | 29 | 1 | 0 | MIT |

### 按分类（媒介 / 方向 / 题材）

**漫剧** 2744 条（现实向 1438 / 特效向 1306）；**真人** 9738 条（现实向 5889 / 特效向 3849）；**其他** 1306 条

| 媒介 | 方向 | 题材 | 条数 |
|---|---|---|---|
| 漫剧 | 特效向 | [奇幻冒险](prompts/漫剧/特效向/奇幻冒险/) | 458 |
| 漫剧 | 特效向 | [战斗大招](prompts/漫剧/特效向/战斗大招/) | 270 |
| 漫剧 | 特效向 | [科幻机甲](prompts/漫剧/特效向/科幻机甲/) | 212 |
| 漫剧 | 特效向 | [武侠打斗](prompts/漫剧/特效向/武侠打斗/) | 204 |
| 漫剧 | 特效向 | [特效综合](prompts/漫剧/特效向/特效综合/) | 148 |
| 漫剧 | 特效向 | [仙侠玄幻](prompts/漫剧/特效向/仙侠玄幻/) | 14 |
| 漫剧 | 现实向 | [剧情短片](prompts/漫剧/现实向/剧情短片/) | 988 |
| 漫剧 | 现实向 | [日常治愈](prompts/漫剧/现实向/日常治愈/) | 269 |
| 漫剧 | 现实向 | [喜剧搞笑](prompts/漫剧/现实向/喜剧搞笑/) | 106 |
| 漫剧 | 现实向 | [都市校园](prompts/漫剧/现实向/都市校园/) | 51 |
| 漫剧 | 现实向 | [甜宠恋爱](prompts/漫剧/现实向/甜宠恋爱/) | 20 |
| 漫剧 | 现实向 | [悬疑惊悚](prompts/漫剧/现实向/悬疑惊悚/) | 4 |
| 真人 | 特效向 | [动作大片](prompts/真人/特效向/动作大片/) | 1087 |
| 真人 | 特效向 | [奇幻怪兽](prompts/真人/特效向/奇幻怪兽/) | 802 |
| 真人 | 特效向 | [科幻](prompts/真人/特效向/科幻/) | 680 |
| 真人 | 特效向 | [武侠打斗](prompts/真人/特效向/武侠打斗/) | 566 |
| 真人 | 特效向 | [超现实创意](prompts/真人/特效向/超现实创意/) | 280 |
| 真人 | 特效向 | [恐怖灵异](prompts/真人/特效向/恐怖灵异/) | 208 |
| 真人 | 特效向 | [特效综合](prompts/真人/特效向/特效综合/) | 127 |
| 真人 | 特效向 | [古装仙侠玄幻](prompts/真人/特效向/古装仙侠玄幻/) | 99 |
| 真人 | 现实向 | [剧情短片](prompts/真人/现实向/剧情短片/) | 2575 |
| 真人 | 现实向 | [生活与vlog](prompts/真人/现实向/生活与vlog/) | 1210 |
| 真人 | 现实向 | [时尚写真](prompts/真人/现实向/时尚写真/) | 457 |
| 真人 | 现实向 | [运动](prompts/真人/现实向/运动/) | 439 |
| 真人 | 现实向 | [音乐MV](prompts/真人/现实向/音乐MV/) | 289 |
| 真人 | 现实向 | [年代怀旧](prompts/真人/现实向/年代怀旧/) | 271 |
| 真人 | 现实向 | [情绪特写](prompts/真人/现实向/情绪特写/) | 184 |
| 真人 | 现实向 | [喜剧整活](prompts/真人/现实向/喜剧整活/) | 172 |
| 真人 | 现实向 | [甜宠恋爱](prompts/真人/现实向/甜宠恋爱/) | 138 |
| 真人 | 现实向 | [都市剧情](prompts/真人/现实向/都市剧情/) | 84 |
| 真人 | 现实向 | [悬疑犯罪](prompts/真人/现实向/悬疑犯罪/) | 70 |
| 其他 | — | [广告带货](prompts/其他/广告带货/) | 721 |
| 其他 | — | [风景空镜](prompts/其他/风景空镜/) | 256 |
| 其他 | — | [动物萌宠](prompts/其他/动物萌宠/) | 196 |
| 其他 | — | [动态图形与界面](prompts/其他/动态图形与界面/) | 92 |
| 其他 | — | [美食](prompts/其他/美食/) | 41 |

### 漫剧画风（art_style）

| 画风 | 条数 |
|---|---|
| 2D日漫 | 1151 |
| 3D卡通 | 713 |
| 未注明 | 466 |
| 绘画风 | 211 |
| 粘土定格 | 82 |
| Q版 | 51 |
| 水墨 | 25 |
| 3D国漫 | 19 |
| 像素 | 15 |
| 美漫 | 11 |

### 按语言（主版本）

| 语言 | 条数 |
|---|---|
| English | 11741 |
| 中文 | 1242 |
| 日本語 | 745 |
| Español | 24 |
| 한국어 | 23 |
| Русский | 8 |
| fr | 3 |
| pt | 2 |

另有 12032 条附带上游提供的其他语言版本（如 YouMind 的中/英版本）。

### 按模型（上游标注）

| 模型 | 条数 |
|---|---|
| Seedance 2.0 | 10733 |
| Grok Imagine | 2432 |
| Seedance（版本未注明） | 424 |
| Seedance 2.5 | 94 |
| Veo 3 | 30 |
| Seedance（版本未注明）, Kling | 21 |
| Seedance（版本未注明）, GPT Image | 15 |
| unspecified | 10 |
| Seedance（版本未注明）, Runway | 8 |
| Seedance 2.5 / 2.0 | 7 |
| Seedance（版本未注明）, Nano Banana | 6 |
| Seedance（版本未注明）, Midjourney | 2 |

### 模板

| 来源 | 模板数 |
|---|---|
| [LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance) | 54 |
| [lixiaoxiao9888-create/manju-laoli-skill](https://github.com/lixiaoxiao9888-create/manju-laoli-skill) | 13 |
| [HBAI-Ltd/Toonflow-app](https://github.com/HBAI-Ltd/Toonflow-app) | 2 |
<!-- STATS:END -->

**去重**：各来源之间有重复，判定方法如下：
- 正文规范化（NFKC、小写、去标点空白）后完全相同的，算作重复；
- 5 字 shingle Jaccard ≥ 0.9 且长度比 ≥ 0.85 的近似重复，也合并。

合并后只保留一份，其他来源记在 `also_in` 里（都附原文位置）。详情见 `data/extraction_report.json`。

---

## 收录来源

Star 数为 2026-10-08 查询值。

| 上游仓库 | ⭐ | 上游许可 | 本仓库取用的内容 |
|---|---:|---|---|
| [YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts) | 2,090 | CC BY 4.0（Copyright (c) 2025 YouMind OpenLab） | README 全部历史版本中出现过的提示词（上游 README 每天轮换展示 100 条，每个版本均为 CC BY 4.0；去重后归属本来源 6,472 条，其中 205 条经审核仅保留链接），含上游提供的中 / 英 / 日版本，每条注明原作者与原帖并固定到具体提交。youmind.com 网站内容未抓取 |
| [LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance) | 1,795 | 代码 MIT；整理内容 CC BY 4.0（署名 *awesome-seedance / goodcase.ai*）；**提示词版权归原作者** | `data/cases.json` 中的案例提示词（注明原作者与原帖），以及 `docs/templates` 的分类模板 |
| [ZeroLu/awesome-seedance](https://github.com/ZeroLu/awesome-seedance) | 2,621 | MIT（Copyright (c) 2026 ZeroLu） | 中英 README 和商用案例中的提示词。来源包括 X、Replicate Blog、公众号「卡尔的AI沃茨」，均注明原作者与原帖 |
| [Emily2040/seedance-2.0](https://github.com/Emily2040/seedance-2.0) | 7,540 | MIT（Copyright (c) 2026 Iamemily2050） | 参考文档中的示例提示词（作者原创） |
| [lixiaoxiao9888-create/manju-laoli-skill](https://github.com/lixiaoxiao9888-create/manju-laoli-skill) | 1,060 | MIT（Copyright (c) 2026 Short-Drama Director Suite contributors） | 7 条示范提示词，13 个七段式 / 资产图模板 |
| [HBAI-Ltd/Toonflow-app](https://github.com/HBAI-Ltd/Toonflow-app) | 16,616 | MIT（Copyright (c) 2026 HBAI-Ltd） | workflow Skill 中的 Seedance 2.0 / 2.5 分段提示词模板，共 2 个 |

各项目的 commit、许可全文和具体取用范围见 [ATTRIBUTION.md](ATTRIBUTION.md) 与 [LICENSES/](LICENSES/)。

---

## 相关项目（仅链接，未复制内容）

| 项目 | 说明 | 只放链接的原因 |
|---|---|---|
| [marsoyang1/awesome-seedance-prompts](https://github.com/marsoyang1/awesome-seedance-prompts) | 20 多条纯中文 Seedance 案例，带「第0-3秒…」分镜时间轴，覆盖真人 VLOG 和仙侠打斗 | 仓库没有许可证（默认保留所有权利） |
| [chatfire-AI/huobao-drama](https://github.com/chatfire-AI/huobao-drama) | 火宝短剧：一句话生成完整短剧的一站式平台，内置分镜与提示词模板 | CC BY-NC-SA 4.0：非商用，且要求相同方式共享，与本仓库许可不兼容 |
| [waooAI/waoowaoo](https://github.com/waooAI/waoowaoo) | 工业级全流程 AI 影视生产 Agent 平台，内置大量提示词 | Elastic License 2.0：非 OSI 许可，按用户要求只放链接 |
| [火山方舟 · Doubao Seedance 2.0 提示词指南（文档页）](https://docs.volcengine.com/docs/ark/doubao-seedance-2-0-prompt-guide?lang=zh) / [PDF 版](https://eps-common-private-online.tos-cn-beijing.volces.com/cloud-doc/eps-doc-center-pdf/%E7%81%AB%E5%B1%B1%E6%96%B9%E8%88%9F_Doubao%20Seedance%202.0%20%E7%B3%BB%E5%88%97%E6%8F%90%E7%A4%BA%E8%AF%8D%E6%8C%87%E5%8D%97_1780907195.pdf) | 官方 2.0 提示词写法、运镜、多模态参考的权威说明 | 官方文档「版权所有，非经书面同意不得复制」，只在手册中做简短引用 |
| 火山方舟 · Seedance 2.5 提示词指南（火山引擎官方文档 82379/2607689） | 官方 2.5 Objective / Timeline 结构说明 | 同上 |
| [即梦 Seedance 2.0 使用手册（字节跳动飞书文档）](https://bytedance.larkoffice.com/wiki/A5RHwWhoBiOnjukIIw6cu5ybnXQ) | 即梦官方参数说明与示例提示词 | 官方文档，未授权转载 |
| [dexhunter/seedance2-skill](https://github.com/dexhunter/seedance2-skill) | Seedance 2.0 提示词 Skill，有中英示例（MIT） | 上游 README 写明示例基于字节官方《即梦 Seedance 2.0 使用手册》，权利链存疑，28 条示例**暂不收录**（只在 `data/extraction_report.json` 记录元数据） |
| [YouMind Seedance 2.0 提示词库（网站）](https://youmind.com/en-US/seedance-2-0-prompts) / [goodcase.ai](https://goodcase.ai) | 两个上游的完整在线图库，提示词更多，带视频预览 | 网站内容不在 GitHub 仓库的许可范围内，只放链接 |

更多漫剧 / 漫画代码项目见 [`tools/漫剧漫画代码项目.md`](tools/漫剧漫画代码项目.md)；手绘动画、Remotion、代码动效、视频 Agent 技能与漫剧方法论见 [`catalog/`](catalog/README.md)。

---

## 合规与下架

- **只收许可允许转载的文字**。上游是 MIT 的，在 `LICENSES/` 附上完整 MIT 文本和该项目的版权行；上游是 CC BY 4.0 的，在每条记录和 ATTRIBUTION.md 中写明标题、作者、来源链接、许可链接和改动说明。
- **第三方原作者的提示词**：
  - YouMind、LearnPrompt、ZeroLu 都声明单条提示词的权利归原作者所有。
  - 本仓库收录这类提示词时，逐条保留上游给出的**原作者署名和原帖链接**（`original_author` / `original_post_url`），并标 `third_party_author: true`。
  - 收录目的是学习和索引。本仓库**不对这些提示词授予任何许可**，使用时请遵守原帖条件。
- **只做格式规范化**：提示词文字一字未改（包括错别字），只规范了空白和 Markdown 代码块。没有收录任何第三方图片、GIF、视频（`animator/` 里的 SVG 角色和道具是本仓库原创；渲染输出和单独的 TTS 音频文件都不提交，只有 `docs/assets/` 里几份本仓库渲染的小预览，其中两段演示视频带本地 Kokoro 合成的配音）。没有编造任何提示词、作者或链接。
- **发布前内容审核**：`scripts/audit.py` 按关键词规则（先去掉否定约束）+ 人工复核（`data/audit_overrides.tsv`）检查每条第三方提示词。以真实可识别人物为主体、性暗示 / 裸露、极端血腥、仇恨、自残、毒品 / 武器制作、政治敏感、复刻特定版权角色、可能被误认为品牌官方广告的条目**只保留标题、署名、原帖链接和一句中性说明**；涉及未成年人或年龄不明人物的性化内容**不收录**（只在 `data/extraction_report.json` 记 id 与原因）。各类条数见上方「统计」，规则见 [CONTRIBUTING.md](CONTRIBUTING.md#内容审核)。
- **下架流程**：原作者（或权利人）用 [下架申请模板](.github/ISSUE_TEMPLATE/takedown.md) 提 issue，给出文件路径、原帖链接或作者账号即可，*If you are the original author and want your prompt removed, please open an issue.* 维护者收到后：
  1. 把原帖链接、条目 id 或作者账号（如 `author:@xxx`，表示该作者的全部条目）加到 [`data/takedown.txt`](data/takedown.txt)，一行一个，可加 `# 注释`；
  2. 运行 `python3 scripts/extract_sources.py && python3 scripts/build_index.py`。提取脚本会跳过名单中的条目（包括其他来源中的重复项），删除对应文件，并重新生成 `data/` 和索引；
  3. 名单会一直保留，以后从上游重新提取时也不会再收录。

---

## 许可

- **本仓库自己的作品：[Apache License 2.0](LICENSE)**，版权人：天机（Copyright 2026 天机），简短声明见 [`NOTICE`](NOTICE)。范围包括：代码（`scripts/`、`animator/`（不含 `animator/vendor/` 的第三方 MIT 代码）、`videogen/`、`router/`、`mcp/`）、外部项目目录 `catalog/`（自写简介、标签与方法论整理；所链接的项目各自保留其许可证）、`AGENTS.md` / `CLAUDE.md`、`skills/ai-video-director/`、文档与手册（`docs/分镜提示词手册.md`、`docs/skill/SKILL.md` 等）、自写的模板 / 示例 / 提示词、对画风预设的改写、原创角色「天机」「豆豆」及其美术、`docs/assets/` 预览素材。
- **Apache-2.0 只覆盖本仓库自己的作品。第三方内容保持上游许可**：
  - `prompts/` 与 `templates/` 中的每个文件，front matter 里的 `license` 写明了它的上游许可（MIT、CC BY 4.0 或 CC0），并保留原作者署名与原帖链接；上游许可全文与版权行见 [`LICENSES/`](LICENSES/)；
  - 第三方原作者（X/Twitter 用户、博主等）的提示词版权归原作者，本仓库不对其授予任何许可；
  - `animator/presets/handdrawn-styles.json` 的上游条目是第三方 MIT 数据（各条保留上游来源标签以便溯源），本仓库的改写部分按 Apache-2.0 提供；
  - `animator/vendor/huashu-art-motion/`：**按 MIT 移植的代码**，来自 [alchaincyf/huashu-art-motion](https://github.com/alchaincyf/huashu-art-motion)（commit `f178bd7`，MIT，Copyright (c) 2026 alchaincyf (花叔 · 花生)），包括引擎库、50 种转场、35 个风格配方及配方卡，原样拷贝、保留原注释。这些文件仍是 MIT、版权归原作者；Apache-2.0 只覆盖本仓库的适配层与改动。**没有**拷贝其 Arphic 笔顺数据、字体、「花叔」形象或任何图片素材。清单见该目录 `VENDOR.md` 与 ATTRIBUTION.md 第 10 节；
  - 手册中的【原文摘录】是对第三方的简短引用，版权归原权利人，见 NOTICE.md 第 3 节。
- **关于「天机」**：「天机」是频道的身份标识。Apache-2.0 第 6 条本来就不授予商标 / 商号的使用权；请不要用「天机」名称或形象冒充频道或暗示频道背书。这只是提醒，不是在 Apache-2.0 之外附加限制。
- 预览视频的配音由 Kokoro-82M v1.1-zh（hexgrad，Apache-2.0）本地合成。TTS 模型、视频模型均不随仓库分发；API key 由用户自己提供（`.env`，不进 git）。

## 相关文档

- [分镜提示词手册（AI 漫剧 / 真人剧）](docs/分镜提示词手册.md)
- [Seedance 分镜提示词 Skill](docs/skill/SKILL.md)
- [漫剧 / 漫画代码项目（仅链接）](tools/漫剧漫画代码项目.md)
- [外部项目目录（201 个，已核验许可证）](catalog/README.md) · [方法论速查](catalog/methodology.md)
- [AI 导演 Skill](skills/ai-video-director/SKILL.md) · [路由器 router](router/README.md) · [AGENTS.md](AGENTS.md)
- [手绘动画渲染器 animator](animator/README.md)
- [视频生成层 videogen（三条路线 + 统一合成）](videogen/README.md)
- [贡献指南（添加提示词 / 内容审核）](CONTRIBUTING.md) · [安全说明](SECURITY.md) · [版权与许可详细说明](NOTICE.md)
