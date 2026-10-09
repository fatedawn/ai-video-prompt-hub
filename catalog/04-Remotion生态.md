<!-- 本文件由 `node router/cli.mjs build-catalog` 从 catalog/registry.json 生成，请改 registry.json 后重新生成 -->

# Remotion 生态（27）

Remotion（用 React 写视频）及其官方 skills、模板、字幕组件，和基于它的中文口播/科普/数据视频 skill。⚠️ Remotion 本体为 Remotion License：个人和 ≤3 人公司免费。

> 数据核验于 2026-10-09（GitHub API）；★ 与日期会变化。许可证以仓库 LICENSE 原文为准，⚠️ 标记的条目商用前务必阅读原许可证。

| 项目 | ★ | 最近更新 | 许可 | 简介 | 路线 | 输入→输出 | 成本 | 中文 | 怎么接入本仓库 |
|---|---|---|---|---|---|---|---|---|---|
| [remotion-dev/remotion](https://github.com/remotion-dev/remotion) | 62553 | 2026-10-08 | Remotion-License 有条件<br><sub>Remotion License：个人、非营利、≤3 人营利公司免费；更大的公司需购买 Company License</sub> | 用 React 写视频的框架，确定性渲染，生态最大 | C-code-motion | script/data→mp4 | 免费CPU | 英文 | 路线 C 的底座；个人/≤3 人公司免费，更大营利公司需买 Company License |
| [Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) | 10881 | 2026-10-05 | Apache-2.0 | 电影感产品宣传片 skill：150+ 镜头配方卡、200+ 动效预览、可直接用的 Remotion 模板 | C-code-motion | product/repo→mp4 | 免费CPU/Agent额度 | 中英 | 产品带货/项目推荐的 Remotion 镜头库（Apache-2.0） |
| [remotion-dev/skills](https://github.com/remotion-dev/skills) | 4914 | 2026-10-07 | NONE ⚠️无许可证<br><sub>仓库未附 LICENSE 文件（默认保留所有权利）；官方用法是 npx skills add 安装，不要复制进本仓库</sub> | Remotion 官方 Agent Skills（remotion-best-practices 等），供 Claude Code/Codex/Cursor 写 Remotion 工程 | C-code-motion | script→mp4 | 免费CPU/Agent额度 | 英文 | agent 写 Remotion 前先装；仓库未附 LICENSE 文件 |
| [Vincentwei1021/anything2explainer](https://github.com/Vincentwei1021/anything2explainer) | 2341 | 2026-09-18 | PolyForm-Noncommercial-1.0.0 ⚠️非商用<br><sub>PolyForm Noncommercial 1.0.0：非商用免费，商用需作者授权（成片归创作者）</sub> | 主题→研究→旁白→配音→逐镜 Remotion 组件（多 agent 并行）→QC 的黑底解说片 | C-code-motion | topic→mp4 | 免费CPU/Agent额度 | 英文 | 全自动解说流水线参考；PolyForm Noncommercial |
| [digitalsamba/claude-code-video-toolkit](https://github.com/digitalsamba/claude-code-video-toolkit) | 2182 | 2026-10-05 | MIT | Claude Code 视频制作工作区：脚本、配音、音乐、画面、渲染全流程的 skills/命令/模板 | C-code-motion B-videogen | topic→mp4 | API key/Agent额度 | 英文 | 英文综合工具箱，可参考其目录结构与成本估算 |
| [Agents365-ai/video-podcast-maker](https://github.com/Agents365-ai/video-podcast-maker) | 1666 | 2026-10-01 | MIT | 主题→研究→脚本→本地 TTS→Remotion 合成的视频播客，适配 B 站/YouTube/小红书/抖音 | C-code-motion | topic→mp4 | 免费CPU/Agent额度 | 中英 | 中文平台适配的口播科普方案（MIT） |
| [Vincentwei1021/video-talkcraft](https://github.com/Vincentwei1021/video-talkcraft) | 1427 | 2026-10-01 | PolyForm-Noncommercial-1.0.0 ⚠️非商用<br><sub>PolyForm Noncommercial 1.0.0：非商用免费，商用需作者授权（成片归创作者）</sub> | 口播稿 + 配音→字级时间戳→SHOTBOOK 分镜→Remotion；108 张动效配方卡、反 PPT 镜头系统 | C-code-motion | script/audio→mp4 | 免费CPU/Agent额度 | 中文 | 字级对齐做得最细；PolyForm Noncommercial，商用需作者授权 |
| [gyoridavid/short-video-maker](https://github.com/gyoridavid/short-video-maker) | 1399 | 2025-06-21 | MIT | 文本→TTS + 自动字幕 + 背景素材 + 音乐的短视频生成器（MCP/REST） | C-code-motion E-edit | script→mp4 | 免费CPU | 英文 | 实拍素材拼接型短视频；不生成画面本身 |
| [iart-ai/motion-skills](https://github.com/iart-ai/motion-skills) | 745 | 2026-09-30 | MIT | 50+ 动效 skills：动态字幕、数据图表、解说、TikTok、WebGL、数学动画、代码绘制 Canvas | C-code-motion | script/data→mp4 | 免费CPU/Agent额度 | 英文 | 按需挑选动效技能 |
| [wshuyi/remotion-video-skill](https://github.com/wshuyi/remotion-video-skill) | 392 | 2026-01-25 | NONE ⚠️无许可证 | Claude Code 的 Remotion 视频 skill：场景化架构、自动计时、字幕与音乐可视化 | C-code-motion | script→mp4 | 免费CPU/Agent额度 | 中英 | 中文作者的 Remotion 入门 skill；无许可证，仅链接 |
| [HKUSTDial/DataMagic](https://github.com/HKUSTDial/DataMagic) | 298 | 2026-10-02 | MIT | 139 张动态图表/数据故事配方卡，上传表格→带旁白的数据动画视频（IEEE VIS 2026） | C-code-motion | data→mp4 | 免费CPU/Agent额度 | 中文 | 数据/财报/排行类选题首选 |
| [haidrrrry/claude-remotion-skill](https://github.com/haidrrrry/claude-remotion-skill) | 290 | 2026-08-12 | MIT | 教 Claude 用 Remotion 做专业动效：弹簧、错峰、调色、胶片颗粒、Ken Burns、逐词字幕 | C-code-motion | script→mp4 | 免费CPU/Agent额度 | 英文 | 动效「质感」规则清单 |
| [remotion-dev/template-tiktok](https://github.com/remotion-dev/template-tiktok) | 283 | 2026-09-29 | NONE ⚠️无许可证<br><sub>未附 LICENSE 文件，package.json 标注 UNLICENSED；按官方方式 npx create-video 使用</sub> | 官方模板：Whisper.cpp 生成 TikTok 式逐词字幕 | C-code-motion | video/audio→mp4 | 免费CPU | 英文 | 口播/vlog 加逐词字幕；package.json 标注 UNLICENSED（Remotion License 管框架） |
| [nyanko3141592/remotion-voicevox-template](https://github.com/nyanko3141592/remotion-voicevox-template) | 282 | 2026-01-29 | NONE ⚠️无许可证 | Remotion + VOICEVOX 双角色掛け合い视频模板：自动配音、口型、表情差分 | C-code-motion | script→mp4 | 免费CPU | 英文 | 「两个角色对话」口播格式参考（日文）；无许可证 |
| [remotion-dev/template-prompt-to-motion-graphics-saas](https://github.com/remotion-dev/template-prompt-to-motion-graphics-saas) | 267 | 2026-10-05 | NONE ⚠️无许可证<br><sub>未附 LICENSE 文件；按官方方式使用</sub> | 官方模板：自然语言→Remotion 动效代码（含校验、技能检测、代码清洗、实时预览） | C-code-motion | topic→mp4 | API key | 英文 | 「提示词→动效代码」的参考实现 |
| [remotion-dev/template-code-hike](https://github.com/remotion-dev/template-code-hike) | 220 | 2026-09-29 | NONE ⚠️无许可证<br><sub>未附 LICENSE 文件；按官方方式使用</sub> | 官方模板：漂亮的代码片段动画 | C-code-motion | repo→mp4 | 免费CPU | 英文 | 天机 GitHub 项目推荐里的「代码讲解」插段 |
| [AgriciDaniel/claude-shorts](https://github.com/AgriciDaniel/claude-shorts) | 219 | 2026-07-11 | MIT | 长视频→短视频切条：AI 片段打分、词级转写、Remotion 动画字幕 | E-edit | video→mp4 | GPU/Agent额度 | 英文 | 长视频切片路线 |
| [tsensei/OpenReels](https://github.com/tsensei/OpenReels) | 208 | 2026-04-10 | MIT | 主题→研究、脚本、配音、AI 画面、AI 音乐、动画字幕→竖屏短视频（Web UI/REST/CLI） | C-code-motion B-videogen | topic→mp4 | API key | 英文 | 英文 topic-to-short 全自动方案 |
| [erduo1998-cell/erduo-broll-loop-engineering](https://github.com/erduo1998-cell/erduo-broll-loop-engineering) | 208 | 2026-09-21 | MIT | SRT 驱动的 B-roll skill：多角色接力（导演/创作/审美评审），自动路由 HyperFrames 或 Remotion | C-code-motion | srt→mp4 | Agent额度 | 中文 | 口播配动效 B-roll |
| [remotion-dev/template-prompt-to-video](https://github.com/remotion-dev/template-prompt-to-video) | 151 | 2026-09-29 | NONE ⚠️无许可证<br><sub>未附 LICENSE 文件，package.json 标注 UNLICENSED；按官方方式使用</sub> | 官方模板：一句提示→故事脚本 + 配图 + 配音→竖屏视频 | C-code-motion | topic→mp4 | API key | 英文 | 「AI 图 + 配音」故事片的官方骨架；package.json 标注 UNLICENSED |
| [bozhouDev/video-skills-toolkit](https://github.com/bozhouDev/video-skills-toolkit) | 150 | 2026-07-27 | MIT | 自媒体视频 skills：爆款调研与转写→二创→配音字幕→导演稿→HyperFrames 口播成片→BGM 与封面 | E-edit C-code-motion | video/topic→mp4 | API key/Agent额度 | 中文 | 中文自媒体口播全流程参考 |
| [DojoCodingLabs/remotion-superpowers](https://github.com/DojoCodingLabs/remotion-superpowers) | 130 | 2026-10-03 | MIT | Remotion 全功能制作插件：AI 配音、音乐、素材、图像/视频生成、TikTok 字幕、转场、AI 审片 | C-code-motion | script→mp4 | API key/Agent额度 | 英文 | 需要什么就接什么的 Remotion 扩展包 |
| [runesleo/claude-video-kit](https://github.com/runesleo/claude-video-kit) | 119 | 2026-10-07 | MIT | 研究简报/JSON 脚本→审片回执→TTS + 字幕对齐→9:16 Remotion 解说片 | C-code-motion | script→mp4 | 免费CPU/Agent额度 | 中英 | 「渲染前审稿闸门」可借鉴 |
| [ahgsql/remotion-subtitles](https://github.com/ahgsql/remotion-subtitles) | 100 | 2025-11-12 | MIT | SRT→Remotion 动画字幕组件库，多种字幕模板 | C-code-motion | srt→mp4 | 免费CPU | 英文 | 把 animator/TTS 产出的 SRT 做成花字 |
| [znyupup/knowledge-explainer-skill](https://github.com/znyupup/knowledge-explainer-skill) | 45 | 2026-04-29 | MIT | 一份 markdown 文稿→讲解动画视频，含物理仿真、数据可视化组件 | C-code-motion | script→mp4 | 免费CPU/Agent额度 | 中文 | 知识科普的「真动画」组件（双摆、指数增长等） |
| [vibe-motion/remotion-code-motion-explainer](https://github.com/vibe-motion/remotion-code-motion-explainer) | 33 | 2026-07-28 | MIT | 代码动画导演 skill：脚本/旁白/产品流程→可编辑、可参数化的 Remotion 动画，63 个镜头条目 | C-code-motion | script/video→mp4 | 免费CPU/Agent额度 | 中文 | 中文的 Remotion 解说镜头库 |
| [neutral-Stage/remotion-captioneer](https://github.com/neutral-Stage/remotion-captioneer) | 17 | 2026-10-08 | MIT | 音频→逐词同步的动画字幕组件，14 种样式 | C-code-motion | audio→mp4 | 免费CPU | 英文 | 口播逐词字幕 |

[← 返回目录](README.md)
