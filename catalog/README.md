<!-- 本文件由 `node router/cli.mjs build-catalog` 从 catalog/registry.json 生成，请改 registry.json 后重新生成 -->

# 外部项目目录（167 个，核验于 2026-10-08）

这里聚合了做 AI 漫剧 / 手绘动画 / 代码动效 / 短剧方法论时值得用的开源项目，供人查阅，也供 AI Agent 通过 `node router/cli.mjs recommend` 自动挑选。

- 机器可读：[`registry.json`](registry.json)（字段说明见文件内 `vocab`）
- 方法论总结（本仓库原创整理）：[`methodology.md`](methodology.md)
- 怎么让 Agent 用：仓库根目录 [`AGENTS.md`](../AGENTS.md)、[`skills/ai-video-director/SKILL.md`](../skills/ai-video-director/SKILL.md)

## 分类

| 分类 | 数量 | 说明 |
|---|---|---|
| [手绘·白板·火柴人](01-%E6%89%8B%E7%BB%98%E7%99%BD%E6%9D%BF%E7%81%AB%E6%9F%B4%E4%BA%BA.md) | 38 | 「一支笔画一个小人」这一类：白板逐笔、火柴人、手绘日记漫画、绘本揭示 |
| [笔画与手绘风组件](02-%E7%AC%94%E7%94%BB%E4%B8%8E%E6%89%8B%E7%BB%98%E9%A3%8E%E7%BB%84%E4%BB%B6.md) | 11 | 可以直接嵌进 Remotion / HyperFrames / 网页的底层组件：SVG 描边、汉字笔顺、手绘风图形、手绘标注、Excalidraw 动画化 |
| [AI 草图动画研究](03-AI%E8%8D%89%E5%9B%BE%E5%8A%A8%E7%94%BB%E7%A0%94%E7%A9%B6.md) | 7 | 学术/实验方向：让孩子画的小人动起来、逐笔生成草图、从成品图反推绘画过程 |
| [Remotion 生态](04-Remotion%E7%94%9F%E6%80%81.md) | 27 | Remotion（用 React 写视频）及其官方 skills、模板、字幕组件，和基于它的中文口播/科普/数据视频 skill |
| [代码动效引擎](05-%E4%BB%A3%E7%A0%81%E5%8A%A8%E6%95%88%E5%BC%95%E6%93%8E.md) | 21 | Remotion 之外的代码动效引擎：Manim（数学）、Motion Canvas / Revideo（MIT）、HyperFrames（HTML→MP4）、Theatre.js、Lottie、Rive、FFCreator、editly 等 |
| [视频 Agent 技能与系统](06-%E8%A7%86%E9%A2%91Agent%E6%8A%80%E8%83%BD.md) | 23 | 面向编程 Agent 的视频制作技能与系统：项目发布片、带货、剪映自动化、口播剪辑、数字人、合规审核等 |
| [漫剧·短剧方法论 Skill](07-%E6%BC%AB%E5%89%A7%E7%9F%AD%E5%89%A7%E6%96%B9%E6%B3%95%E8%AE%BA.md) | 29 | 漫剧/短剧的方法论 Skill：小说改编、编剧结构、分镜拆解、角色一致性、Seedance/可灵/H3 提示词写法、打戏与情绪表演 |
| [端到端短剧/短视频平台](08-%E7%AB%AF%E5%88%B0%E7%AB%AF%E5%B9%B3%E5%8F%B0.md) | 11 | 端到端短剧/短视频平台（多为需要模型 API 或 GPU 的完整应用） |

## 精选 15 个

| 项目 | ★ | 最近更新 | 许可 | 简介 | 路线 | 输入→输出 | 成本 | 中文 | 怎么接入本仓库 |
|---|---|---|---|---|---|---|---|---|---|
| [gnipbao/story-to-handdrawn-video](https://github.com/gnipbao/story-to-handdrawn-video) | 2159 | 2026-09-22 | MIT | 中文故事→每句一张 AI 母图→「文字→黑白稿→彩色」擦除揭示的 3:4 手绘日记漫画静音片；内置 297 条画风配方 | A-handdrawn C-code-motion | story/image→mp4 | API key/Agent额度 | 中文 | 本仓库 animator/presets/handdrawn-styles.json 已收录其 MIT 画风配方；它的成片是遮罩擦除+静帧，需要真动画/词级对齐时改走 animator |
| [alchaincyf/huashu-art-motion](https://github.com/alchaincyf/huashu-art-motion) | 2162 | 2026-10-08 | MIT | 花叔「艺术动画」skill：35 种艺术风格 + 9 种解说语法（白板/Vox/3b1b…），Canvas 代码逐帧作画，cue 精确到帧 | A-handdrawn C-code-motion | topic/script→mp4 | 免费CPU/Agent额度 | 中文 | 做「有审美要求」的解说/艺术短片时作为 animator 之外的外部选项；其「每幕 1 主动作 + 2 母题循环」规则可用于 animator 镜头设计 |
| [geeklee/srt-whiteboard-animation](https://github.com/geeklee/srt-whiteboard-animation) | 4119 | 2026-07-27 | MIT | SRT 字幕→分镜→统一风格线稿→annotation.json 把每个元素绑定到字幕事件→连续流式笔迹（铺线→上色）+ 手部素材→MP4 | A-handdrawn | srt/script→mp4 | API key/Agent额度 | 中文 | 与 animator 的「元素绑定第几句/某个词」思路一致；需要「AI 插画 + 白板笔迹」时用它，纯代码道具用 animator |
| [gnipbao/whiteboard-video-engine](https://github.com/gnipbao/whiteboard-video-engine) | 103 | 2026-09-03 | MIT | 本地白板手绘视频引擎：SVG/线稿/插画/照片→逐笔绘制 MP4，骨架追踪、手势跟随、轮廓感上色、30 种画材风格，可用词级时间戳驱动节奏 | A-handdrawn | svg/image/script→mp4/srt | 免费CPU | 中文 | 照片/插画→逐笔绘制的通用引擎，可产出单镜头片段交给 videogen assemble；配套 Skill 见 codex-whiteboard-video-skill |
| [alexgreensh/anidoodle](https://github.com/alexgreensh/anidoodle) | 850 | 2026-10-05 | Apache-2.0 | Claude Code/Codex/Grok 插件：31 种手绘画材全部用代码画，可生成「一笔一笔画出来」的过程片、故事分镜和带配乐/字幕的短片 | A-handdrawn C-code-motion | topic/story/script→mp4/html/srt | 免费CPU/Agent额度 | 英文 | 画材种类最接近 story-to-handdrawn 画风库且真正在「画」；英文为主，中文题材需自己写台词 |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | 58857 | 2026-10-08 | Apache-2.0 | HeyGen 出品：写 HTML 渲视频，为 agent 设计的确定性 HTML→MP4 框架（Apache-2.0） | C-code-motion | script→mp4 | 免费CPU | 英文 | 大量中文白板/口播 skill 的渲染底座；与 Remotion 二选一 |
| [remotion-dev/skills](https://github.com/remotion-dev/skills) | 4894 | 2026-10-07 | NONE ⚠️无许可证<br><sub>仓库未附 LICENSE 文件（默认保留所有权利）；官方用法是 npx skills add 安装，不要复制进本仓库</sub> | Remotion 官方 Agent Skills（remotion-best-practices 等），供 Claude Code/Codex/Cursor 写 Remotion 工程 | C-code-motion | script→mp4 | 免费CPU/Agent额度 | 英文 | agent 写 Remotion 前先装；仓库未附 LICENSE 文件 |
| [HKUSTDial/DataMagic](https://github.com/HKUSTDial/DataMagic) | 298 | 2026-10-02 | MIT | 139 张动态图表/数据故事配方卡，上传表格→带旁白的数据动画视频（IEEE VIS 2026） | C-code-motion | data→mp4 | 免费CPU/Agent额度 | 中文 | 数据/财报/排行类选题首选 |
| [latent-spaces/brag](https://github.com/latent-spaces/brag) | 14165 | 2026-10-06 | MIT | /brag：把你刚做的项目一条命令变成带音乐、动效和分享文案的发布短片 | C-code-motion | repo→mp4 | 免费CPU/Agent额度 | 英文 | GitHub 项目推荐（天机）的现成「项目→发布片」方案 |
| [eternityspring/shuohao-skills](https://github.com/eternityspring/shuohao-skills) | 4249 | 2026-09-26 | Apache-2.0 | AI 短剧 skill 集：小说→改编大纲五件套→角色设定集→场景道具设定→剧本→分镜，质量门脚本检查 | M-method | novel/story→screenplay/storyboard/prompt | Agent额度 | 中文 | 小说转漫剧/短剧的前期方法；分镜输出后接 templates/ 七段式与 videogen plan |
| [zenstory-ai/drama-skills](https://github.com/zenstory-ai/drama-skills) | 2609 | 2026-10-03 | MIT | 11 个短剧/漫剧 skill：原著分析→分集剧本→视觉设定→图片提示词与分镜→视频提示词→生产→剪辑→审查，五份 Markdown 即创作事实 | M-method B-videogen | novel/topic→screenplay/storyboard/prompt | Agent额度/API key | 中文 | 「每集五份 Markdown」组织法可直接映射到 videogen 的分镜输入 |
| [xianyu110/ecommerce-video-skills](https://github.com/xianyu110/ecommerce-video-skills) | 53 | 2026-10-05 | MIT | 电商短视频 skills：3 秒钩子、卖点分镜、图生视频提示词、配音字幕花字、ffmpeg 本地成片、多平台导出 | B-videogen E-edit | product/image→mp4/prompt | 免费CPU/Agent额度 | 中文 | 产品带货零成本起步方案 |
| [luoluoluo22/jianying-editor-skill](https://github.com/luoluoluo22/jianying-editor-skill) | 3809 | 2026-09-11 | MIT<br><sub>MIT；内含 Apache-2.0 的 pyJianYingDraft 等第三方组件</sub> | 让 Agent 自动操作剪映：写文案、配音、字幕、选乐、特效到导出草稿 | E-edit | script/video→jianying-draft | 免费CPU/Agent额度 | 中文 | 成片最后一公里：把 animator/videogen 产物导入剪映精修；含 Apache-2.0 第三方组件 |
| [JuneYaooo/self-media-compliance-review](https://github.com/JuneYaooo/self-media-compliance-review) | 91 | 2026-10-06 | MIT | 自媒体视频发布前违规风险审核：画面/声音/文字/封面/带货/资质/引流，五级风险报告 | M-method | video/script→report | 免费CPU/Agent额度 | 中文 | 发布前合规质检，建议作为所有路线的最后一步 |
| [chanind/hanzi-writer](https://github.com/chanind/hanzi-writer) | 5006 | 2025-12-31 | MIT<br><sub>MIT；笔顺数据 hanzi-writer-data 为单独仓库（含 Arphic 字体衍生数据），使用前查看其许可</sub> | 汉字笔顺动画与书写练习库 | A-handdrawn | text→html/svg | 免费CPU | 中英 | 中文「逐笔写字」：可在 Remotion/HyperFrames 里做标题逐笔写出；注意笔顺数据仓库单独许可 |

## 收录规则

- 每个条目都实时调用 GitHub API 核验过存在性、★、最后推送时间；许可证读的是仓库 LICENSE 原文（GitHub 显示 NOASSERTION 的也逐个读了原文）。
- **只放链接和本仓库自写的一句话简介**，不复制任何第三方代码、提示词或文档。
- 许可证分布：宽松 141 · 传染性(GPL/AGPL) 5 · 非商用 5 · 有条件(Remotion License) 1 · 无许可证 15。非商用和无许可证的仍然列出（方便了解生态），但 router 默认降权，加 `--commercial` 会直接排除。
- 刷新 ★/日期/许可证：`python3 catalog/tools/refresh_registry.py`（需要已登录的 gh CLI）；改完 registry.json 后运行 `node router/cli.mjs build-catalog` 重新生成这些页面。
- 发现错误或希望下架：开 issue 说明即可，按仓库「合规与下架」流程处理。
