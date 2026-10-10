<!-- 本文件由 `node router/cli.mjs build-catalog` 从 catalog/registry.json 生成，请改 registry.json 后重新生成 -->

# 外部项目目录（322 个，核验于 2026-10-09）

这里聚合了做 AI 漫剧 / 手绘动画 / 代码动效 / 短剧方法论时值得用的开源项目，供人查阅，也供 AI Agent 通过 `node router/cli.mjs recommend` 自动挑选。

> **本仓库工具**：扁平定妆图 → SVG 见 [`tools/flat2svg/`](../tools/flat2svg/README.md)（外部 [vtracer](https://github.com/visioncortex/vtracer)，MIT；与「静图动效」类目互补：先得到干净矢量，再交给白板/手绘引擎）。

- 机器可读：[`registry.json`](registry.json)（字段说明见文件内 `vocab`）
- 方法论总结（本仓库原创整理）：[`methodology.md`](methodology.md)
- 怎么让 Agent 用：仓库根目录 [`AGENTS.md`](../AGENTS.md)、[`skills/ai-video-director/SKILL.md`](../skills/ai-video-director/SKILL.md)

## 分类

| 分类 | 数量 | 说明 |
|---|---|---|
| [手绘·白板·火柴人](01-%E6%89%8B%E7%BB%98%E7%99%BD%E6%9D%BF%E7%81%AB%E6%9F%B4%E4%BA%BA.md) | 39 | 「一支笔画一个小人」这一类：白板逐笔、火柴人、手绘日记漫画、绘本揭示 |
| [笔画与手绘风组件](02-%E7%AC%94%E7%94%BB%E4%B8%8E%E6%89%8B%E7%BB%98%E9%A3%8E%E7%BB%84%E4%BB%B6.md) | 6 + 5 历史 | 可以直接嵌进 Remotion / HyperFrames / 网页的底层组件：SVG 描边、汉字笔顺、手绘风图形、手绘标注、Excalidraw 动画化 |
| [AI 草图动画研究](03-AI%E8%8D%89%E5%9B%BE%E5%8A%A8%E7%94%BB%E7%A0%94%E7%A9%B6.md) | 1 + 6 历史 | 学术/实验方向：让孩子画的小人动起来、逐笔生成草图、从成品图反推绘画过程 |
| [Remotion 生态](04-Remotion%E7%94%9F%E6%80%81.md) | 25 + 2 历史 | Remotion（用 React 写视频）及其官方 skills、模板、字幕组件，和基于它的中文口播/科普/数据视频 skill |
| [代码动效引擎](05-%E4%BB%A3%E7%A0%81%E5%8A%A8%E6%95%88%E5%BC%95%E6%93%8E.md) | 18 + 5 历史 | Remotion 之外的代码动效引擎：Manim（数学）、Motion Canvas / Revideo（MIT）、HyperFrames（HTML→MP4）、Theatre.js、Lottie、Rive、FFCreator、editly 等 |
| [视频 Agent 技能与系统](06-%E8%A7%86%E9%A2%91Agent%E6%8A%80%E8%83%BD.md) | 26 | 面向编程 Agent 的视频制作技能与系统：项目发布片、带货、剪映自动化、口播剪辑、数字人、合规审核等 |
| [漫剧·短剧方法论 Skill](07-%E6%BC%AB%E5%89%A7%E7%9F%AD%E5%89%A7%E6%96%B9%E6%B3%95%E8%AE%BA.md) | 29 | 漫剧/短剧的方法论 Skill：小说改编、编剧结构、分镜拆解、角色一致性、Seedance/可灵/H3 提示词写法、打戏与情绪表演 |
| [端到端短剧/短视频平台](08-%E7%AB%AF%E5%88%B0%E7%AB%AF%E5%B9%B3%E5%8F%B0.md) | 18 + 2 历史 | 端到端短剧/短视频平台（多为需要模型 API 或 GPU 的完整应用） |
| [剪辑·切条·字幕](09-%E5%89%AA%E8%BE%91%E4%B8%8E%E5%88%87%E6%9D%A1.md) | 8 | 把成片剪开、加字幕、出草稿、做短视频切片的开源工具 |
| [开源视频模型](10-%E5%BC%80%E6%BA%90%E8%A7%86%E9%A2%91%E6%A8%A1%E5%9E%8B.md) | 24 + 2 历史 | 可以在自己显卡上跑的开源视频生成模型（权重许可单独写在备注里） |
| [视频 MCP](11-%E8%A7%86%E9%A2%91MCP.md) | 7 + 1 历史 | 和视频生成、配音、工作流相关的 MCP 服务器，以及 mcp.film 这个「MCP 目录」本身（我们不内置它的数据） |
| [提示词库资源](12-%E6%8F%90%E7%A4%BA%E8%AF%8D%E5%BA%93%E8%B5%84%E6%BA%90.md) | 5 + 1 历史 | 别人维护的提示词库，作为资源链接放在这里 |
| [静图动效（2.5D 视差 · Ken Burns · 动态照片）](13-%E9%9D%99%E5%9B%BE%E5%8A%A8%E6%95%88.md) | 5 + 3 历史 | 让一张静图动起来、但不需要视频模型的项目：深度估计、2.5D 视差、3D Ken Burns、动态照片（cinemagraph） |
| [补帧放大（插帧 · 超分）](14-%E8%A1%A5%E5%B8%A7%E6%94%BE%E5%A4%A7.md) | 5 + 3 历史 | 补帧（16fps → 30/60fps）和超分（480p → 1080p）工具 |
| [幻灯片 · PPT 式科普成片](15-%E5%B9%BB%E7%81%AF%E7%89%87PPT%E5%BC%8F%E7%A7%91%E6%99%AE.md) | 37 + 5 历史 | 「PPT 式科普」：Markdown/HTML 幻灯片框架、AI 做 PPT、PPT 转讲解视频、论文转视频 |
| [公式 · 图表 · 科学可视化](16-%E5%85%AC%E5%BC%8F%E5%9B%BE%E8%A1%A8%E7%A7%91%E5%AD%A6%E5%8F%AF%E8%A7%86%E5%8C%96.md) | 19 + 7 历史 | 公式、图表、流程图、分子与几何的可视化库：KaTeX / MathJax、Mermaid、图表库、Manim 生态、3D 分子查看器等 |
| [配音 · 字幕对齐](17-%E9%85%8D%E9%9F%B3%E4%B8%8E%E5%AD%97%E5%B9%95%E5%AF%B9%E9%BD%90.md) | 7 + 1 历史 | 本地配音（TTS）与字幕对齐（ASR / 强制对齐） |

**按题材找项目**：[项目用途地图](../docs/%E9%A1%B9%E7%9B%AE%E7%94%A8%E9%80%94%E5%9C%B0%E5%9B%BE.md)（科普、数理推导、漫剧、真人短剧、产品带货、仓库推荐、绘本、诗词、数据故事、vlog/空镜头…每个项目「最适合做什么、强在哪、我们吸收了什么、怎么用」）。

## 精选（14 个）

| 项目 | ★ | 最近推送 | 许可 | 简介 | 最适合（题材） | 强项 | 我们吸收了什么 | 怎么用 | 路线 | 成本 | 中文 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [gnipbao/story-to-handdrawn-video](https://github.com/gnipbao/story-to-handdrawn-video) | 2172 | 2026-09-22 | MIT | 中文故事→每句一张 AI 母图→「文字→黑白稿→彩色」擦除揭示的 3:4 手绘日记漫画静音片；内置 297 条画风配方 | 儿童绘本；手绘日记漫画 | 画风配方库最全（297 种），擦除揭示的绘本感强 | **移植**：297 条手绘画风配方文字（MIT）（animator/presets/handdrawn-styles.json） | 路线① animator：本仓库 animator/presets/handdrawn-styles.json 已收录其 MIT 画风配方；它的成片是遮罩擦除+静帧，需要真动画/词级对齐时改走 animator | A-handdrawn C-code-motion | API key/Agent额度 | 中文 |
| [alchaincyf/huashu-art-motion](https://github.com/alchaincyf/huashu-art-motion) | 2571 | 2026-10-08 | MIT | 花叔「艺术动画」skill：35 种艺术风格 + 9 种解说语法（白板/Vox/3b1b…），Canvas 代码逐帧作画，cue 精确到帧 | 艺术风格解说片；诗词 / 发布片 | 35 种艺术风格 + 50 种转场全部 Canvas 代码画，风格跨度最大 | **移植**：50 种转场、35 个风格配方、后期层与风格化渲染器（MIT 原样移植，见 animator/vendor/huashu-art-motion/VENDOR.md）；slides2video 页间转场也用它（animator/vendor/huashu-art-motion） | 路线① animator：做「有审美要求」的解说/艺术短片时作为 animator 之外的外部选项；其「每幕 1 主动作 + 2 母题循环」规则可用于 animator 镜头设计 | A-handdrawn C-code-motion | 免费CPU/Agent额度 | 中文 |
| [geeklee/srt-whiteboard-animation](https://github.com/geeklee/srt-whiteboard-animation) | 4141 | 2026-07-27 | MIT | SRT 字幕→分镜→统一风格线稿→annotation.json 把每个元素绑定到字幕事件→连续流式笔迹（铺线→上色）+ 手部素材→MP4 | 白板讲解；拆书 / 科普 | 元素按字幕事件出场、笔迹连续，讲解节奏感强 | **借鉴思路**：每个画面元素绑定到字幕事件（c3:词 时间引用的来源），自写实现（animator/src/project.mjs） | 路线① animator：与 animator 的「元素绑定第几句/某个词」思路一致；需要「AI 插画 + 白板笔迹」时用它，纯代码道具用 animator | A-handdrawn | API key/Agent额度 | 中文 |
| [gnipbao/whiteboard-video-engine](https://github.com/gnipbao/whiteboard-video-engine) | 103 | 2026-09-03 | MIT | 本地白板手绘视频引擎：SVG/线稿/插画/照片→逐笔绘制 MP4，骨架追踪、手势跟随、轮廓感上色、30 种画材风格，可用词级时间戳驱动节奏 | 知识科普 / 口播讲解；故事短片；儿童绘本 | 本地白板手绘视频引擎：SVG/线稿/插画/照片→逐笔绘制 MP4，骨架追踪、手势跟随、轮廓感上色、30 种画材风格，可用词级时间戳驱动节奏（免费 CPU 可跑、中文原生） | — | 路线① animator：照片/插画→逐笔绘制的通用引擎，可产出单镜头片段交给 videogen assemble；配套 Skill 见 codex-whiteboard-video-skill | A-handdrawn | 免费CPU | 中文 |
| [alexgreensh/anidoodle](https://github.com/alexgreensh/anidoodle) | 863 | 2026-10-05 | Apache-2.0 | Claude Code/Codex/Grok 插件：31 种手绘画材全部用代码画，可生成「一笔一笔画出来」的过程片、故事分镜和带配乐/字幕的短片 | 手绘过程片；绘本 / 发布片 | 31 种画材全用代码画，「一笔一笔画出来」的过程感好 | **借鉴思路**：代码画材逐笔作画的思路，自写实现（animator/src/runtime/） | 路线① animator：画材种类最接近 story-to-handdrawn 画风库且真正在「画」；英文为主，中文题材需自己写台词 | A-handdrawn C-code-motion | 免费CPU/Agent额度 | 英文 |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | 59325 | 2026-10-09 | Apache-2.0 | HeyGen 出品：写 HTML 渲视频，为 agent 设计的确定性 HTML→MP4 框架（Apache-2.0） | 仓库推荐 / 产品发布；图表与字幕重的讲解 | 写 HTML 就能确定性渲染 MP4，Apache-2.0，Agent 友好 | — | 路线③ 代码动效：大量中文白板/口播 skill 的渲染底座；与 Remotion 二选一 | C-code-motion | 免费CPU | 英文 |
| [remotion-dev/skills](https://github.com/remotion-dev/skills) | 4925 | 2026-10-07 | NONE ⚠️无许可证<br><sub>仓库未附 LICENSE 文件（默认保留所有权利）；官方用法是 npx skills add 安装，不要复制进本仓库</sub> | Remotion 官方 Agent Skills（remotion-best-practices 等），供 Claude Code/Codex/Cursor 写 Remotion 工程 | 让 Agent 写 Remotion | 官方维护的 Remotion 最佳实践 skill | — | 路线③ 代码动效：agent 写 Remotion 前先装；仓库未附 LICENSE 文件 | C-code-motion | 免费CPU/Agent额度 | 英文 |
| [HKUSTDial/DataMagic](https://github.com/HKUSTDial/DataMagic) | 298 | 2026-10-09 | MIT | 139 张动态图表/数据故事配方卡，上传表格→带旁白的数据动画视频（IEEE VIS 2026） | 数据故事 / 图表；知识科普 / 口播讲解 | 139 张动态图表/数据故事配方卡，上传表格→带旁白的数据动画视频（IEEE VIS 2026）（免费 CPU 可跑、中文原生） | — | 路线③ 代码动效：数据/财报/排行类选题首选 | C-code-motion | 免费CPU/Agent额度 | 中文 |
| [latent-spaces/brag](https://github.com/latent-spaces/brag) | 14453 | 2026-10-06 | MIT | /brag：把你刚做的项目一条命令变成带音乐、动效和分享文案的发布短片 | GitHub 仓库推荐；自己项目的发布短片 | 一条命令把刚做完的项目变成带配乐和分享文案的发布片 | — | 路线③ 代码动效：GitHub 项目推荐（天机）的现成「项目→发布片」方案 | C-code-motion | 免费CPU/Agent额度 | 英文 |
| [eternityspring/shuohao-skills](https://github.com/eternityspring/shuohao-skills) | 4280 | 2026-10-08 | Apache-2.0 | AI 短剧 skill 集：小说→改编大纲五件套→角色设定集→场景道具设定→剧本→分镜，质量门脚本检查 | 小说改编短剧；分集剧本 | 改编五件套 + 质量门脚本，流程最规范 | — | 方法论 skill：小说转漫剧/短剧的前期方法；分镜输出后接 templates/ 七段式与 videogen plan | M-method | Agent额度 | 中文 |
| [zenstory-ai/drama-skills](https://github.com/zenstory-ai/drama-skills) | 2637 | 2026-10-03 | MIT | 11 个短剧/漫剧 skill：原著分析→分集剧本→视觉设定→图片提示词与分镜→视频提示词→生产→剪辑→审查，五份 Markdown 即创作事实 | 漫剧 / 短剧全流程 | 11 个 skill 覆盖原著分析到审查 | — | 方法论 skill：「每集五份 Markdown」组织法可直接映射到 videogen 的分镜输入 | M-method B-videogen | Agent额度/API key | 中文 |
| [xianyu110/ecommerce-video-skills](https://github.com/xianyu110/ecommerce-video-skills) | 59 | 2026-10-05 | MIT | 电商短视频 skills：3 秒钩子、卖点分镜、图生视频提示词、配音字幕花字、ffmpeg 本地成片、多平台导出 | 电商详情 / 带货；产品带货 / 种草；广告片 | 电商短视频 skills：3 秒钩子、卖点分镜、图生视频提示词、配音字幕花字、ffmpeg 本地成片、多平台导出（免费 CPU 可跑、中文原生） | — | 路线② videogen：产品带货零成本起步方案 | B-videogen E-edit | 免费CPU/Agent额度 | 中文 |
| [luoluoluo22/jianying-editor-skill](https://github.com/luoluoluo22/jianying-editor-skill) | 3832 | 2026-09-11 | MIT<br><sub>MIT；内含 Apache-2.0 的 pyJianYingDraft 等第三方组件</sub> | 让 Agent 自动操作剪映：写文案、配音、字幕、选乐、特效到导出草稿 | 口播 / vlog 剪辑；要交付剪映草稿 | 直接驱动剪映，产物是可继续手改的草稿 | — | 剪辑后期：成片最后一公里：把 animator/videogen 产物导入剪映精修；含 Apache-2.0 第三方组件 | E-edit | 免费CPU/Agent额度 | 中文 |
| [JuneYaooo/self-media-compliance-review](https://github.com/JuneYaooo/self-media-compliance-review) | 94 | 2026-10-06 | MIT | 自媒体视频发布前违规风险审核：画面/声音/文字/封面/带货/资质/引流，五级风险报告 | 电商详情 / 带货 | 自媒体视频发布前违规风险审核：画面/声音/文字/封面/带货/资质/引流，五级风险报告（免费 CPU 可跑、中文原生） | — | 方法论 skill：发布前合规质检，建议作为所有路线的最后一步 | M-method | 免费CPU/Agent额度 | 中文 |

## 收录规则

- **只收 2026 年活跃项目**：最后推送早于 2026-01-01 或已归档的标为 stale（当前 43 个），只在各分类页尾的「历史 / 不再推荐」里列出，router 推荐与 MCP 搜索默认排除（`include_stale` 可查）。截止日期只在 `catalog/registry.json` 的 `freshness.cutoff` 一处配置（规则见 `catalog/tools/freshness.py`），每周工作流自动重算。
- 每个条目都实时调用 GitHub API 核验过存在性、★、最后推送时间；许可证读的是仓库 LICENSE 原文（GitHub 显示 NOASSERTION 的也逐个读了原文）。
- **只放链接和本仓库自写的一句话简介**，不复制任何第三方代码、提示词或文档。
- 许可证分布：宽松 254 · 传染性(GPL/AGPL) 18 · 非商用 11 · 有条件(Remotion License) 13 · 无许可证 26。非商用和无许可证的仍然列出（方便了解生态），但 router 默认降权，加 `--commercial` 会直接排除。
- 刷新 ★/日期/许可证/活跃状态：`python3 catalog/tools/refresh_registry.py`（需要已登录的 gh CLI），再 `python3 catalog/tools/usefor.py` 补齐用途字段；改完 registry.json 后运行 `node router/cli.mjs build-catalog` 重新生成这些页面和 docs/项目用途地图.md。
- 发现错误或希望下架：开 issue 说明即可，按仓库「合规与下架」流程处理。
