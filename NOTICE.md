# NOTICE · 版权与许可声明

本仓库的内容分为三类，各自适用不同的版权与许可。

## 1. 本仓库原创内容：Apache-2.0

版权人：**天机**（Copyright 2026 天机）。许可：**[Apache License 2.0](LICENSE)**（全文见根目录 `LICENSE`，简短声明见根目录 `NOTICE`）。

Apache-2.0 **只覆盖本仓库自己的作品**，包括：
- 代码：`scripts/`、`animator/`（代码、Schema、`tts/`、`tools/`；**不含** `animator/vendor/` 下的第三方代码，见第 2.1 节）、`videogen/`、`stills2video/`（静图成片；**不含**两个改写自 MIT 模板的 Wan2.2 工作流 JSON，见第 2.2 节）、`router/`（AI 导演路由器，含测试与 `examples/` 示例方案）、`slides2video/`（PPT 式科普，全部原创）、`mcp/`（只读 MCP 服务，尚未发布到 npm）、`catalog/tools/`；
- AI Agent 说明与技能：`AGENTS.md`、`CLAUDE.md`、`skills/ai-video-director/SKILL.md`；
- 外部项目目录 `catalog/`：`registry.json` 中本仓库自写的中文简介、标签、接入说明与许可证备注，生成的分类页面，以及 `catalog/methodology.md`（用本仓库自己的话归纳的方法论，未摘录第三方原文）。目录里列出的外部项目**只是链接**，它们各自的代码、文档、模板仍归原作者并适用其自己的许可证，见第 4 节；
- 文档：README、NOTICE、ATTRIBUTION、CONTRIBUTING、SECURITY 等，`animator/README.md`、`videogen/README.md`，分类体系、各级索引与统计，`tools/漫剧漫画代码项目.md` 链接清单；
- 手册：`docs/分镜提示词手册.md`、`docs/skill/SKILL.md`（其中【原文摘录】除外，见第 3 节）；
- 自写的模板、示例与提示词：`animator/templates/`、`animator/examples/`、`videogen/examples/`、`docs/` 中的示例；
- 对 `animator/presets/handdrawn-styles.json` 所做的改动（15 条改写与 `_provenance` 记录；上游条目本身仍是 MIT，见第 2.1 节）；
- 原创角色及其美术：默认主持人「天机」（`animator/characters/tianji/`）、示例角色「豆豆」（`animator/characters/doudou*/`）、内置道具 SVG（`src/runtime/shapes.js`）；
- `docs/assets/` 中的预览图片和视频（由本仓库代码渲染；视频配音由本地 Kokoro 合成，见第 2.1 节末）。

**关于「天机」名称与形象（提醒，不是附加限制）**：「天机」是频道的身份标识。Apache-2.0 第 6 条本来就不授予商号、商标或产品名称的使用权（描述作品来源的合理使用除外）。请不要用「天机」名称或形象冒充频道，或暗示频道为你的作品背书。在此前提下，角色形象与其他原创内容一样按 Apache-2.0 自由使用、修改和商用。

复用时请保留 `LICENSE` 与 `NOTICE`，并按 Apache-2.0 第 4 条注明改动。

## 2. 第三方内容：保持上游许可

`prompts/` 与 `templates/` 中的文字转录自以下上游仓库，**不受本仓库 Apache-2.0 约束**，以各自上游许可（MIT / CC BY 4.0 / CC0）为准，并逐条保留原作者署名。完整许可文本和版权行见 `LICENSES/`。

| 上游 | 许可 | 版权行 | 许可文本 |
|---|---|---|---|
| YouMind-OpenLab/awesome-seedance-2-prompts | CC BY 4.0 | Copyright (c) 2025 YouMind OpenLab | `LICENSES/YouMind-OpenLab_awesome-seedance-2-prompts-CC-BY-4.0.txt` |
| LearnPrompt/awesome-seedance | 代码 MIT；整理内容 CC BY 4.0（署名 awesome-seedance / goodcase.ai） | Copyright (c) 2026 LearnPrompt | `LICENSES/LearnPrompt_awesome-seedance-MIT.txt`、`LICENSES/LearnPrompt_awesome-seedance-CURATION-NOTE.md` |
| ZeroLu/awesome-seedance | MIT | Copyright (c) 2026 ZeroLu | `LICENSES/ZeroLu_awesome-seedance-MIT.txt` |
| Emily2040/seedance-2.0 | MIT | Copyright (c) 2026 Iamemily2050 (@iamemily2050) | `LICENSES/Emily2040_seedance-2.0-MIT.txt` |
| lixiaoxiao9888-create/manju-laoli-skill | MIT | Copyright (c) 2026 Short-Drama Director Suite contributors | `LICENSES/lixiaoxiao9888-create_manju-laoli-skill-MIT.txt` |
| HBAI-Ltd/Toonflow-app | MIT | Copyright (c) 2026 HBAI-Ltd | `LICENSES/HBAI-Ltd_Toonflow-app-MIT.txt` |
| renoise-ai/awesome-seedance-prompts | CC BY 4.0 | 上游 LICENSE 为 CC BY 4.0 法律文本（2026-10-09 重读） | `LICENSES/renoise-ai_awesome-seedance-prompts-CC-BY-4.0.txt` |
| YouMind-OpenLab/awesome-grok-imagine-prompts | CC BY 4.0 | Copyright (c) 2026 YouMind | `LICENSES/YouMind-OpenLab_awesome-grok-imagine-prompts-CC-BY-4.0.txt` |
| hanshs474/seedance-prompts-mcp | MIT | Copyright (c) 2026 Emaki | `LICENSES/hanshs474_seedance-prompts-mcp-MIT.txt` |
| f/awesome-chatgpt-prompts | 提示词 CC0；代码 MIT | 见上游 LICENSE 的双许可说明 | `LICENSES/f_awesome-chatgpt-prompts-CC0-NOTE.md` |
| liu-kaining/Awesome-Veo3-Prompts | MIT | Copyright (c) 2025 liu-kaining | `LICENSES/liu-kaining_Awesome-Veo3-Prompts-MIT.txt` |

**第三方原作者的提示词**

YouMind、LearnPrompt、ZeroLu 三个上游都说明：所收提示词来自社区（X/Twitter、微信公众号、Replicate Blog 等），**权利归原作者所有**。LearnPrompt 原文是："Nothing here grants a license to the underlying prompt or media beyond what the original post allows."

因此对这类条目（front matter 中 `third_party_author: true`）：
- 本仓库逐条保留上游给出的原作者署名和原帖链接；
- 本仓库**不授予任何许可**，上游的 MIT / CC BY 也不覆盖这些提示词本身；
- 收录目的是学习、研究和索引。用于商业项目前，请自己确认原帖的使用条件。

**原作者如需删除请提 issue**（附文件路径或原帖链接），我们会移除对应文件及 `data/` 中的记录。

### 2.1 `animator/` 中的第三方内容

`animator/` 自己的代码是本仓库从零实现的，另借鉴了若干开源项目的**思路**（见第 4 节和 `ATTRIBUTION.md`）。复制进来的第三方内容只有两处：画风提示词数据（下表）和 huashu-art-motion 的 MIT 代码（见下文「移植的代码」）。

| 文件 | 来源 | 许可 | 版权行 | 许可文本 |
|---|---|---|---|---|
| `animator/presets/handdrawn-styles.json`（画风提示词文字，297 种画风 + 30 套配色） | gnipbao/story-to-handdrawn-video `references/handdrawn-style-library.json` @ `198aefa` | MIT | Copyright (c) 2026 gnipbao | `LICENSES/gnipbao_story-to-handdrawn-video-MIT.txt` |
| 　其中 `origin.url` 指向 yang0/handraw-style 的 277 条 | yang0/handraw-style（经 gnipbao 收录） | MIT；上游现行版本附加署名要求，本仓库自愿遵守 | Copyright (c) 2026 yang0 | `LICENSES/yang0_handraw-style-MIT.txt` |
| 　其中 `origin.url` 指向 threerocks/hand-drawn-styles 的 14 条 | threerocks/hand-drawn-styles（经 gnipbao 改编） | MIT | Copyright (c) 2026 liulei | `LICENSES/threerocks_hand-drawn-styles-MIT.txt` |

**署名（按 yang0/handraw-style 许可的署名要求）**：画风配方大部分来自原作者 **yang0** 的 [yang0/handraw-style](https://github.com/yang0/handraw-style)。

该文件只保留文字字段，删去了所有指向示例图片的字段；另把 15 条以品牌、商标作品或具体艺术家名作风格参照的预设改写为通用画法描述（如「几米绘本插画风」→「诗意都市绘本插画风」，「South Park Animation Style」→「Flat Cut-Out TV Cartoon Style」），其余提示词文字未改。文件内的 `_provenance` 字段记录了来源 commit、sha256 和改动列表。各条目 `origin.label` 保留上游的原始标签（部分为艺术家名或提示词作者名），仅用于溯源，不进入任何提示词。

**移植的代码：alchaincyf/huashu-art-motion（MIT）**

| 项目 | 内容 |
|---|---|
| 位置 | `animator/vendor/huashu-art-motion/`（清单与说明见该目录 `VENDOR.md`） |
| 上游 | https://github.com/alchaincyf/huashu-art-motion @ commit `f178bd7754a71d6d399473af1501634548efa6cb` |
| 许可 / 版权行 | MIT，Copyright (c) 2026 alchaincyf (花叔 · 花生)；全文 `LICENSES/alchaincyf_huashu-art-motion-MIT.txt`（目录内另有一份 `LICENSE`） |
| 拷贝的文件（90 个，逐字节原样，保留原注释） | `LICENSE`；`scripts/engine/lib/` 下 `util` `motion` `paint` `brush` `render` `post` `kit` `camera` `typo` `ui` `diagram` `collage` `chart` `rig`（`.js`）；`scripts/engine/transitions.js`（50 种转场）、`eras_gallery.js`；`scripts/engine/scenes/` 下 35 个风格配方（`01_cave` … `36_picasso_blue`）；`references/风格配方/` 下 35 张配方卡 + `INDEX.md` 等 3 个说明 |
| 改动 | 磁盘上**无改动**。运行时由本仓库适配层 `animator/src/runtime/fx/huashu.js` 在内存中把舞台类脚本的固定 `W/H = 1920×1080` 换成可变舞台尺寸（竖屏），并可在运行时隐藏上游代码绘制的少女 / 猫 |
| 许可范围 | 这些文件**仍是 MIT，版权归原作者**；本仓库的 Apache-2.0 只覆盖我们自己写的适配层与改动（`src/runtime/fx/huashu.js`、`src/runtime/fx/effects.js`、`src/fxcatalog.mjs`、`engine.js` / `project.mjs` 中的接入代码、`VENDOR.md`） |

**明确未使用的内容**：
- huashu-art-motion 的 Arphic / 文鼎笔顺数据（`reference_films/**/strokes.js`，非 MIT）、`scripts/engine/lib/fonts/` 的 OFL 字体与 `fonts.js`、「花叔」形象与角色（`rig_huashu.js`、`toon.js` 的豆子花叔、`clips/`、`demos/`、`assets/`、`examples/` 中的图片与帧），以及任何图片素材，均未复制；
- anidoodle（Apache-2.0）没有复制任何代码或素材，因此无需转载其 NOTICE；
- 不随仓库打包任何字体。字幕使用系统字体，按顺序调用霞鹜文楷（OFL）、Noto Sans CJK（OFL）等。

**生成物**：渲染输出目录、TTS 生成的单独音频文件（本地 Kokoro 或 edge-tts）、videogen 的片段与成片均已在 `.gitignore` 中排除。例外是 `docs/assets/` 里几份由本仓库代码渲染的小预览（设定图、剪影、帧图，以及两段带配音的演示视频，共约 4.3 MB），见该目录的 README。

**预览视频的配音**：`docs/assets/tianji-showcase.mp4` 与 `docs/assets/videogen-route-c-demo.mp4` 的人声由 [Kokoro-82M v1.1-zh](https://huggingface.co/hexgrad/Kokoro-82M-v1.1-zh)（hexgrad，Apache-2.0）经 [sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx)（k2-fsa，Apache-2.0）在本地合成，压缩为 48 kbps 单声道 AAC 音轨；路线 C 演示的背景音乐由本仓库脚本程序化合成。仓库不包含任何模型权重或单独的音频文件。`tianji-showcase.mp4` 的背景和部分转场由上述 huashu-art-motion 的 MIT 代码实时渲染（已隐藏其角色）。

**TTS 模型与视频模型**：均不随仓库分发。`animator/tts/fetch_models.py` 从上游下载并校验 sha256（Kokoro / sherpa-onnx：Apache-2.0；MeloTTS、faster-whisper：MIT）；videogen 只调用用户自己的 API 账号或用户自己运行的 ComfyUI，模型许可见 `videogen/README.md`。**API 密钥**：本仓库不提供、不保管任何密钥，只从用户的环境变量或 `.env`（已被 git 忽略）读取。

### 2.2 `stills2video/` 中的第三方内容

`stills2video/` 的代码（Node 编排、CPU 视差渲染器、深度推理封装、配方库、出图提示词模板、测试）是本仓库从零写的。我们读了 19 个相关项目的源码（清单、commit 和取舍见 [`docs/i2v-对比.md`](docs/i2v-对比.md)），复制进来的第三方内容只有一处：

| 文件 | 来源 | 许可 | 版权行 | 许可文本 |
|---|---|---|---|---|
| `stills2video/workflows/wan22_14b_i2v_4step.json`、`wan22_14b_flf2v_4step.json`（ComfyUI API 工作流） | Comfy-Org/workflow_templates `templates/video_wan2_2_14B_i2v.json`、`video_wan2_2_14B_flf2v.json` @ `8be1f8c` | MIT | Copyright (c) 2023-present Comfy Org | `LICENSES/Comfy-Org_workflow_templates-MIT.txt`；改动见 `stills2video/workflows/VENDOR.md` |

**只借鉴思路、代码自写**（没有复制任何代码或文字）：
- MIT / Apache-2.0：MoneyPrinterTurbo（亚像素缩放、整段缩放、EXIF / CMYK 图片清洗）、editly（缓动曲线、zoomDirection / zoomAmount 参数）、remko/kburns（先放大再裁切防抖）、Pixelle-Video（用 ComfyUI 节点标题 `$名字.输入` 绑定参数）、FramePack（按显存切换模式）、Depth-Anything-V2（预处理参数：短边 518、14 的倍数、ImageNet 均值方差）。
- **GPL / AGPL 及自定义许可，只取思路、完全重写**：DepthFlow（AGPL-3.0：视差高度 / 焦平面 / 等距 / 推拉变焦等参数概念和预设命名思路）、OpenMontage（AGPL-3.0：「防幻灯片」出片前检查的想法，规则是我们自己写的）、Wan2GP（WanGP Community License：按显存档位给预设；只为它的 `wgp.py --process` 写 settings JSON）。ComfyUI（GPL-3.0）只作为外部程序通过 HTTP API 调用。
- **非商用 / 无许可证 / 自定义限制，只给链接**：3d-ken-burns（CC BY-NC-SA 4.0）、Maestro（WanGP 非商用评估许可）、Waifu2x-Extension-GUI（仅个人）、TypeTale、story-flicks、ComfyUI-PainterI2V、ComfyUI-Wan22FMLF、super-video-maker-skill、comfyui-workflow-skill（均无 LICENSE）、hypit（修改版 Apache 2.0）、huobao-drama（CC BY-NC-SA 4.0）。

**模型与二进制**：都不随仓库分发。深度模型 Depth-Anything-V2-Small（Apache-2.0，onnx-community 转换版，固定 revision）由 `stills2video/py/fetch_models.py` 下载并校验 sha256；Base / Large 权重是 CC-BY-NC-4.0，不使用。视频模型的许可各不相同：Wan2.2 为 Apache-2.0；LTX-2 / LTX-2.x 为 LTX 社区许可；HunyuanVideo 系列为腾讯混元社区许可（不适用于欧盟、英国、韩国）；MiniMax H3 为其社区许可（排除欧盟、英国、韩国、美国，营收超门槛需授权）。RIFE / Real-ESRGAN 只检测用户自己安装的 `rife-ncnn-vulkan`（MIT）/ `realesrgan-ncnn-vulkan`（BSD-3-Clause）二进制。

**示例素材**：`docs/assets/stills2video-sample.mp4` 的第 1 张图是天机提供的仙侠示意图，其余由 `stills2video/examples/sample/make_stills.py` 程序绘制或裁自本仓库的 `docs/assets/tianji_sheet.png`，不含第三方图片、字体或音乐。

### 2.3 `slides2video/`：没有复制第三方代码

`slides2video/` 的代码（解析、时间轴、编译、渲染、lint、pptx 读取、浏览器运行时、主题、测试、示例）全部是本仓库原创，Apache-2.0，© 2026 天机。

| 用法 | 项目 | 许可 | 说明 |
|---|---|---|---|
| 运行时依赖（`npm install`，不入库） | [KaTeX](https://github.com/KaTeX/KaTeX) | MIT；**字体 SIL OFL 1.1** | 公式排版。字体渲染时由本地 HTTP 服务直接从 `slides2video/node_modules/katex/dist/fonts` 提供，**仓库里没有任何字体文件** |
| 运行时依赖 | [Shiki](https://github.com/shikijs/shiki) | MIT | 代码高亮（构建时生成 token） |
| 运行时依赖 | [Mermaid](https://github.com/mermaid-js/mermaid) | MIT | 流程图 / 时序图 |
| 运行时依赖 | [yaml](https://github.com/eemeli/yaml) | ISC | 解析每页 frontmatter |
| 复用本仓库已移植代码 | huashu-art-motion 转场（`animator/vendor/`） | MIT | 运行时加载，不另行复制，见第 2.1 节 |
| 复用 | animator 的 playwright-core / 找浏览器逻辑、videogen 的本地 TTS | Apache-2.0 / 本仓库 | — |
| 仅思路，代码自写 | [Slidev](https://github.com/slidevjs/slidev)、[reveal.js](https://github.com/hakimel/reveal.js)（Auto-Animate）、[rough-notation](https://github.com/rough-stuff/rough-notation)、[shiki-magic-move](https://github.com/shikijs/shiki-magic-move)、[pptx2video](https://github.com/ai-nuts/pptx2video)（备注协议，兼容读取）、[explainroo](https://github.com/vincentsch/explainroo)、[html-ppt-skill](https://github.com/lewislulu/html-ppt-skill)、[Paper2Video](https://github.com/showlab/Paper2Video)、[video-podcast-maker](https://github.com/Agents365-ai/video-podcast-maker) | MIT | 见 ATTRIBUTION.md |
| 仅思路，代码自写 | [timecut](https://github.com/tungs/timecut) | BSD-3-Clause | 虚拟时间逐帧截图的思路 |
| **仅思路（AGPL）** | [banana-slides](https://github.com/Anionex/banana-slides) | **AGPL-3.0** | 只借鉴「每页一张 AI 示意图」的工作流，没有读入或改写任何代码 |
| 外部程序（用户自装，可选） | LibreOffice、poppler `pdftoppm` | MPL-2.0 / GPL | 只在 `import --mode pages` 时作为外部命令调用 |

**示例素材**：`slides2video/examples/sky/*.jpg` 由同目录 `make-images.mjs` 用 canvas 程序绘制；测试用 `test/fixtures/mini.pptx` 由 `make_pptx.py` 生成。不含第三方图片、字体或音乐。

## 3. 仓库所有者自己的文档

`docs/分镜提示词手册.md` 与 `docs/skill/SKILL.md` 是仓库所有者的原创作品，按 Apache-2.0 提供（见第 1 节）。

手册中标注【原文摘录】的段落是对第三方的**简短引用**，版权归原权利人，不随本仓库许可转授。引用对象包括：
- 火山引擎官方提示词指南：版权所有，仅作评论性短引；
- YouMind、goodcase.ai、ZeroLu / 卡尔的AI沃茨、Emily2040 的示例；
- 一位用户示例（@九州文化-奶盖AI，OCR 转录）。

如权利人有异议，同样请提 issue，我们会删改。

## 4. 未收录 / 仅链接的内容

以下内容只提供链接，没有复制任何文字或代码，原因见 README「相关项目」：
- marsoyang1：无许可证；
- huobao-drama：CC BY-NC-SA 4.0；
- waoowaoo：Elastic License 2.0；
- 火山引擎 / 即梦官方文档：版权所有；
- dexhunter/seedance2-skill 的示例：疑似转录自官方手册，暂缓收录；
- YouMind / goodcase.ai 网站内容；
- `tools/` 中列出的全部代码项目；
- `stills2video/` 只借鉴思路或只链接的项目：见第 2.2 节；
- `slides2video/` 只借鉴思路的项目：见第 2.3 节；
- `animator/` 只借鉴思路、未复制代码的项目：geeklee/srt-whiteboard-animation（MIT）、alexgreensh/anidoodle（Apache-2.0）、HKUDS/ViMax（MIT）、HBAI-Ltd/Toonflow-app（MIT）。（alchaincyf/huashu-art-motion 的 MIT 代码已移植，见第 2.1 节。）

本仓库没有收录任何第三方图片、GIF 或视频。`animator/` 中的 SVG（角色「豆豆」与内置道具）是本仓库原创的矢量图。

### 外部项目目录 `catalog/`（仅链接）

`catalog/registry.json` 及其生成的页面列出了 167 个外部开源项目。对每个项目，本仓库**只记录**这些内容：
- 链接
- 事实性元数据：★、最后推送日期、许可证标识。核验日期为 2026-10-08；许可证以各仓库 LICENSE 原文为准。
- 本仓库自写的简介、标签和接入说明

我们没有复制这些项目的任何代码、提示词、模板、README 或 SKILL 文本。`catalog/methodology.md` 中的方法要点，是用本仓库自己的语言对公开思路做的归纳，每条都附出处链接，同样没有摘录原文。

被列出的项目里，有非商用许可（PolyForm Noncommercial、CC BY-NC-SA）、传染性许可（GPL / AGPL）、有条件许可（Remotion License），也有未附许可证的项目（默认保留所有权利）。使用这些项目时，以它们各自的许可证为准。`node router/cli.mjs recommend --commercial` 会排除非商用和无许可证的项目。

## 5. 发布前内容审核（仅保留标题 + 署名 + 链接）

为避免转载违规内容，`scripts/audit.py` 在提取时按关键词规则（先去掉「不要 / avoid / no …」否定约束）加人工复核（`data/audit_overrides.tsv`）检查每条第三方提示词：
- 以真实可识别人物为主体、性暗示 / 裸露、极端血腥、仇恨用语、自残、毒品 / 武器制作、政治敏感、复刻特定版权角色 / IP 为核心、可能被误认为品牌官方广告的条目：**降级为仅链接**——保留标题、原作者署名、原帖与上游链接和一句中性说明，不转载正文（front matter 标 `access: "link-only"` 与 `audit_reason`）；
- 涉及未成年人或年龄不明人物的性化内容：**不收录**，只在 `data/extraction_report.json` 的 `audit.excluded` 中记录 id 与原因；
- 「迪士尼风格」「吉卜力风格」这类风格提法属于引用的第三方文字，保留全文。

各类条数见 README「统计」。规则拿不准时一律从严降级为仅链接，不删除署名。审核流程与申诉见 `CONTRIBUTING.md`。

## tools/flat2svg/（扁平定妆 → SVG）

本目录代码为原创（Apache-2.0，© 2026 天机）。矢量转换调用外部 CLI [visioncortex/vtracer](https://github.com/visioncortex/vtracer)（MIT），**不随仓库分发**其源码或二进制，请本机执行 `cargo install vtracer`。可选 `--check` 使用系统 `rsvg-convert`（librsvg）或用户安装的 `cairosvg`（MIT）渲染预览 PNG，并用 Pillow 计算灰度方差，拒绝几乎空白的结果。示例角色包见 `tools/flat2svg/examples/xiaowen-dad/`（Apache-2.0，© 2026 天机）。

