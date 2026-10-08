# ATTRIBUTION · 署名与改动说明

本文件列出每个上游的标题、作者、来源链接、许可、取用版本、取用范围，以及本仓库做过的改动，满足 CC BY 4.0 第 3(a) 条和 MIT 的署名要求。
- 每条提示词的 front matter 中另有逐条署名：`source_repo`、`source_url`（固定 commit 的行级链接）、`original_author`、`original_post_url`、`license`。
- 下表数字为 2026-10-08 提取时的结果，最新统计以 README 为准。

**本仓库对所有第三方内容的改动**：
- 只做提取，以及空白和 Markdown 代码块的格式规范化；
- 提示词文字一字未改，包括错别字；
- 由本仓库自动生成的部分：标题（只在上游没有标题时使用上游的小标题）、分类字段（medium / direction / genre / art_style）和索引；
- 没有收录任何第三方图片或视频。

---

## 1. YouMind-OpenLab / awesome-seedance-2-prompts

| 项目 | 内容 |
|---|---|
| 标题 | awesome-seedance-2-prompts |
| 作者 | YouMind OpenLab（单条提示词：各原作者，见每个文件） |
| 链接 | https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts |
| 许可 | CC BY 4.0 — https://creativecommons.org/licenses/by/4.0/ （Copyright (c) 2025 YouMind OpenLab） |
| 版本 | commit `c6b6773dc006309c96becc2f12584ec7249bc4ca`（2026-10-08 06:22 JST），以及它之前的全部 README 历史版本（1,329 个，自 2026-02-11 起） |
| 取用 | `README.md`、`README_zh.md`、`README_ja-JP.md` 中的提示词，按 id 对齐。上游 README 由 CMS 每天自动重写数次、每次只展示 100 条（另 6 条精选），**每个提交的版本都在仓库 CC BY 4.0 许可下发布**；因此遍历 README 的全部历史版本，每个 id 取最近一次出现的版本，`source_url` 固定到该提交。主版本取上游语言徽章标注的原始语言，其他语言作为「上游提供的其他语言版本」附后。youmind.com 网站本身（图库、视频预览、搜索）不在仓库许可范围内，未抓取 |
| 结果 | 历史版本中共出现 6,489 个不同 id（上游网站标称 6,509 条），其中 106 条在固定提交的当前 README 中、6,383 条来自更早的 README 版本。去重后归属 YouMind 6,474 条；除 1 条外均标注第三方原作者与 X 原帖；164 条与 LearnPrompt 重复，合并在 YouMind 条目下（LearnPrompt 的出处记入 `also_in`） |
| 上游声明 | 提示词收集自社区，仅供学习，原作者可提 issue 要求删除 |

## 2. LearnPrompt / awesome-seedance

| 项目 | 内容 |
|---|---|
| 标题 | awesome-seedance |
| 作者 | LearnPrompt；整理内容署名 *awesome-seedance / goodcase.ai*（单条提示词：各原作者） |
| 链接 | https://github.com/LearnPrompt/awesome-seedance |
| 许可 | 代码 MIT（Copyright (c) 2026 LearnPrompt）；整理内容 CC BY 4.0；**提示词与媒体版权归原作者** |
| 版本 | commit `487c166e2f09487016452b90fec5e19a470af883` |
| 取用 | `data/cases.json` 中 795 个案例的提示词，含标题、摘要、原作者 `creator`、原帖 `sourceUrl`、goodcase 页面链接；`docs/templates/{zh,en}/*.md` 中 54 个「直接复制」模板 |
| 结果 | 去重后归属 LearnPrompt 631 条，原帖分布：X 627、微信公众号 3、comfy.org 1；另有 164 条与 YouMind 重复，归在 YouMind 条目下并在 `also_in` 中保留 LearnPrompt 出处。模板 54 个 |

## 3. ZeroLu / awesome-seedance

| 项目 | 内容 |
|---|---|
| 标题 | awesome-seedance |
| 作者 | ZeroLu（单条提示词：各原作者） |
| 链接 | https://github.com/ZeroLu/awesome-seedance |
| 许可 | MIT（Copyright (c) 2026 ZeroLu），全文见 `LICENSES/ZeroLu_awesome-seedance-MIT.txt` |
| 版本 | commit `fd0d8000702ae3a8ae5240d3e4717b2546186970` |
| 取用 | `README-zh.md`、`README.md`、`prompts/commercial-use-cases.md` 中的提示词，不含帖子文案和要点 |
| 结果 | 提取 70 段，中英按原帖链接配对合并后 45 条；原帖分布：X 19、Replicate Blog 18、公众号「卡尔的AI沃茨」8。有 15 条上游没说明中英哪个是原文，已标 `upstream_does_not_say_which_language_is_original` |

## 4. Emily2040 / seedance-2.0

| 项目 | 内容 |
|---|---|
| 标题 | seedance-2.0 |
| 作者 | Iamemily2050 (@iamemily2050) |
| 链接 | https://github.com/Emily2040/seedance-2.0 |
| 许可 | MIT（Copyright (c) 2026 Iamemily2050 (@iamemily2050)） |
| 版本 | commit `4668457e560eee06e95d7fcfdf441c8c0bba802e` |
| 取用 | `data/front-page-clips.json`；`references/` 下各示例文件中的行内示例、```text 卡片、golden prompts 和 clip prompts。少于 40 字的片段不收 |
| 结果 | 提取 112 条，内部去重后 104 条，均为作者原创示例 |

## 5. lixiaoxiao9888-create / manju-laoli-skill（漫剧老李）

| 项目 | 内容 |
|---|---|
| 标题 | manju-laoli-skill（Short-Drama Director Suite） |
| 作者 | Short-Drama Director Suite contributors |
| 链接 | https://github.com/lixiaoxiao9888-create/manju-laoli-skill |
| 许可 | MIT（Copyright (c) 2026 Short-Drama Director Suite contributors） |
| 版本 | commit `079df685f7cf2f0de635362bd359c233db38f9fe` |
| 取用 | 人工挑选的 7 条示范提示词，以及 13 个模板（七段式竖屏 / 横屏、大招三段式、资产图、站位声明等） |

## 6. HBAI-Ltd / Toonflow-app

| 项目 | 内容 |
|---|---|
| 标题 | Toonflow-app |
| 作者 | HBAI-Ltd（北京爱阿科技有限公司） |
| 链接 | https://github.com/HBAI-Ltd/Toonflow-app |
| 许可 | MIT（Copyright (c) 2026 HBAI-Ltd）。早期版本曾用 AGPL / Apache，本仓库只取当前 MIT 版本 |
| 版本 | commit `72a895c26aab3f54c5a914517615362208fa6008` |
| 取用 | `packages/skills/workflow/SKILL.md` 的「A9.1 Seedance 2.0 分段提示词模板」「A9.2 Seedance 2.5 分段提示词模板」，共 2 个模板 |

---

## 暂缓收录：dexhunter / seedance2-skill

- 仓库：https://github.com/dexhunter/seedance2-skill
- 许可：MIT，Copyright (c) 2026 Dex (i@dex.moe)
- 版本：commit `516284d5bab58361bfdfed3cc96cee3e837d4c44`
- 暂缓原因：该仓库 README 写明内容基于字节跳动官方《即梦 Seedance 2.0 使用手册》（参数说明与示例提示词），28 条示例可能是官方示例的转录或译写，MIT 不一定能覆盖。所以默认不收，只在 `data/extraction_report.json` 的 `held_back` 中记录元数据。
- 确认没问题后，可运行 `python3 scripts/extract_sources.py --include-dexhunter` 收入，同时补上 `LICENSES/dexhunter_seedance2-skill-MIT.txt`。

---

## animator/（手绘动画渲染器）的来源

`animator/` 的代码全部由本仓库原创实现。下面第 7 节是**唯一复制了内容**的上游；第 8–12 节**只借鉴了思路**，没有复制代码、数据或素材，列在这里是为了说明出处。所有许可都已按各仓库在所列 commit 的 LICENSE 文件核对（2026-10-08）。

## 7. gnipbao / story-to-handdrawn-video（复制：画风提示词数据）

| 项目 | 内容 |
|---|---|
| 标题 | story-to-handdrawn-video |
| 作者 | gnipbao；条目原作者见下 |
| 链接 | https://github.com/gnipbao/story-to-handdrawn-video |
| 许可 | MIT（Copyright (c) 2026 gnipbao），全文见 `LICENSES/gnipbao_story-to-handdrawn-video-MIT.txt` |
| 版本 | commit `198aefa9b298af3a20d3bd757c93433623d38ccd` |
| 取用 | `references/handdrawn-style-library.json`（sha256 `f37a5103441bf38a2acbf482c8dce2174f3519477a733f2fa9f89f4a1e800ffb`）→ `animator/presets/handdrawn-styles.json`，297 种画风 + 30 套配色 |
| 改动 | 只保留文字字段（id、名称、别名、分组、分类、精选、适用、摘要、prompt_blocks、caption_prompt、color_hint、avoid、origin、配色 prompt）；删除指向示例图片 / 参考图的字段（example_image、reference_images、example_origin、profile_file、contact_sheet）；提示词文字未改；新增 `_provenance` 字段记录来源 |
| 用途 | 仅作可选的画风提示词预设（`styles` 命令、工程的 `stylePreset` 字段）。渲染器本身不依赖它，可以整个删除 |

条目的原始出处（据该文件的 `origin` 字段与上游许可文件）：

| 条目 | 原作者 / 仓库 | 许可 | 许可文本 |
|---|---|---|---|
| 277 条 | **yang0** / [yang0/handraw-style](https://github.com/yang0/handraw-style)（gnipbao 收录时对应 commit `ebfeaa54953dee0fe3be01e28e6c591f30530242`） | 收录时为 MIT（Copyright (c) 2026 yang0）。上游自 commit `9a3a751` 起改为「MIT License (with Attribution Requirement)」，要求在文档中显著署名原作者 yang0 和仓库链接。本仓库**自愿遵守该署名要求**（见本节、NOTICE.md、animator/README.md） | `LICENSES/yang0_handraw-style-MIT.txt`（两个版本都收录了） |
| 14 条 | liulei / [threerocks/hand-drawn-styles](https://github.com/threerocks/hand-drawn-styles)（commit `7388c55d2a135e91eb62f5b6b2fc5300a5b0f40d`） | MIT（Copyright (c) 2026 liulei） | `LICENSES/threerocks_hand-drawn-styles-MIT.txt` |
| 6 条 | gnipbao 自行整理 | MIT（gnipbao） | 同上 gnipbao |

## 8. geeklee / srt-whiteboard-animation（仅思路）

| 项目 | 内容 |
|---|---|
| 链接 | https://github.com/geeklee/srt-whiteboard-animation |
| 许可 | MIT（Copyright (c) 2026 江哥是老登啊） |
| 版本 | commit `696a7243c0e6ffb6827676e539c2ca5ebae2bf6b` |
| 借鉴的思路 | 画面元素绑定到 SRT 字幕时间戳；笔画连续画出，笔尖跟着画笔 |
| 本仓库实现 | `animator/src/project.mjs`（时间引用语法，细化到句内某个词）、`animator/src/runtime/engine.js`（逐笔绘制、铅笔光标）。未复制代码 |

## 9. alexgreensh / anidoodle（仅思路）

| 项目 | 内容 |
|---|---|
| 链接 | https://github.com/alexgreensh/anidoodle |
| 许可 | Apache-2.0（Copyright 2026 Alex Greenshpun，仓库带 NOTICE 文件） |
| 版本 | commit `f649db6eb823562ae41608119beb53f04d9d7c05` |
| 借鉴的思路 | 用真实手绘媒介（蜡笔、彩铅、水彩等）的质感逐笔画出 |
| 本仓库实现 | `animator/src/runtime/media.js`、`geometry.js`、`sprite.js`。**未复制任何代码、素材或音色包**，因此不涉及 Apache-2.0 第 4(d) 条的 NOTICE 转载义务 |

## 10. alchaincyf / huashu-art-motion（仅思路，且只涉及其 MIT 代码部分）

| 项目 | 内容 |
|---|---|
| 链接 | https://github.com/alchaincyf/huashu-art-motion |
| 许可 | 代码 MIT（Copyright (c) 2026 alchaincyf (花叔 · 花生)）。例外：Arphic 笔画数据 `strokes.js`、OFL 字体、「花叔」形象不属于 MIT |
| 版本 | commit `26dba25b2b495c2138848c29a2c90df356a20325` |
| 借鉴的思路 | Canvas 逐帧渲染 → 浏览器自动化 → ffmpeg 编码；JSON 镜头脚本 + cue；每个镜头必须有一个主动作；相机运动与转场 |
| 本仓库实现 | `animator/src/browser.mjs`、`animator/src/runtime/engine.js`。**未使用** Arphic 笔画数据、任何字体、「花叔」形象和任何角色素材；角色系统与该项目无关 |

## 11. HKUDS / ViMax（仅思路）

| 项目 | 内容 |
|---|---|
| 链接 | https://github.com/HKUDS/ViMax |
| 许可 | MIT |
| 版本 | 核对时 HEAD 为 `fd4b72e7731be6e5f88486206d25ea59849b0285` |
| 借鉴的思路 | 角色只设定一次（角色设定图），跨镜头保持一致 |
| 本仓库实现 | 工程级 `characters` 声明、`characters/*/character.json`、`sheet` 命令 |

## 12. HBAI-Ltd / Toonflow-app（仅思路，animator 部分）

同第 6 节的上游（MIT，commit `72a895c26aab3f54c5a914517615362208fa6008`）。animator 只借鉴了「角色资产在多个分镜间复用」的思路，没有复制任何代码。

## animator 原创内容

- 渲染器全部代码、JSON Schema、示例工程、示例字幕；
- 默认角色「天机」（`animator/characters/tianji/`）与示例角色「豆豆」（`animator/characters/doudou/doudou.svg`），由本仓库原创绘制，不基于任何第三方角色；
- 本地 TTS 封装（`animator/tts/`）、自动分镜（`autoscript.mjs`）、对齐检查（`synccheck.mjs`）；
- 内置道具 SVG（`animator/src/runtime/shapes.js`）。

以上内容的版权人为「天机」，按 Apache-2.0 发布（见根目录 `LICENSE`、`NOTICE` 与 NOTICE.md 第 1 节）。

## animator/tts：下载使用、不随仓库分发的模型与库

| 组件 | 上游 | 许可 | 用法 |
|---|---|---|---|
| Kokoro-82M v1.1-zh（sherpa-onnx 打包 `kokoro-multi-lang-v1_1`） | [hexgrad/Kokoro-82M-v1.1-zh](https://huggingface.co/hexgrad/Kokoro-82M-v1.1-zh)；[k2-fsa/sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx) releases | Apache-2.0 | 默认配音；`fetch_models.py` 按 sha256 下载 |
| MeloTTS 中英（`vits-melo-tts-zh_en`） | [myshell-ai/MeloTTS](https://github.com/myshell-ai/MeloTTS)，sherpa-onnx 转换 | MIT | 备选音色 |
| VITS AISHELL-3（`vits-zh-aishell3`） | sherpa-onnx releases | 压缩包内无许可证文件 | 仅备选，默认不下载 |
| faster-whisper small | [Systran/faster-whisper-small](https://huggingface.co/Systran/faster-whisper-small)（固定 revision `536b066`） | MIT | 字级对齐 |
| sherpa-onnx、faster-whisper、pypinyin（pip 依赖） | k2-fsa、SYSTRAN、mozillazg | Apache-2.0 / MIT / MIT | 运行时依赖 |

`animator/tts/kokoro_v1_1_speakers.json` 是音色编号与名称的对照表（事实性列表，取自 sherpa-onnx 文档）。

## videogen/（视频生成层）

- 全部代码为本仓库原创；各云 API 适配器按各家**公开文档**实现（2026-10 核对，链接见 `videogen/README.md`），没有复制任何官方 SDK 代码。
- `videogen/workflows/wan22_ti2v_5b_*.json` 为本仓库自写的 ComfyUI API 格式工作流（只引用 ComfyUI 内置节点名，模型 Wan2.2-TI2V-5B 为 Apache-2.0，权重不随仓库分发）。ComfyUI 官方模板 [Comfy-Org/workflow_templates](https://github.com/Comfy-Org/workflow_templates)（MIT）只链接、未复制；`comfyanonymous/ComfyUI_examples` 无明确许可证，未复制。
- 路线 C 演示的分镜 `videogen/examples/route-c/storyboard.md` 取自本仓库自写的 `docs/skill/SKILL.md` 例 2；替身片段由 animator 渲染；BGM 由 ffmpeg 合成，不含任何第三方音乐。

