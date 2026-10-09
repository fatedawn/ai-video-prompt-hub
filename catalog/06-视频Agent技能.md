<!-- 本文件由 `node router/cli.mjs build-catalog` 从 catalog/registry.json 生成，请改 registry.json 后重新生成 -->

# 视频 Agent 技能与系统（23）

面向编程 Agent 的视频制作技能与系统：项目发布片、带货、剪映自动化、口播剪辑、数字人、合规审核等。

> 数据核验于 2026-10-09（GitHub API）；★ 与日期会变化。许可证以仓库 LICENSE 原文为准，⚠️ 标记的条目商用前务必阅读原许可证。

| 项目 | ★ | 最近更新 | 许可 | 简介 | 路线 | 输入→输出 | 成本 | 中文 | 怎么接入本仓库 |
|---|---|---|---|---|---|---|---|---|---|
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | 65483 | 2026-10-03 | AGPL-3.0 传染性<br><sub>AGPL-3.0：修改后对外提供网络服务也需开源</sub> | 开源 agent 视频制作系统：12 条管线、100+ 工具、大量 agent skills | C-code-motion B-videogen E-edit | topic/script→mp4 | API key/Agent额度 | 英文 | 功能面最广的总控系统；AGPL-3.0 |
| [latent-spaces/brag](https://github.com/latent-spaces/brag) | 14380 | 2026-10-06 | MIT | /brag：把你刚做的项目一条命令变成带音乐、动效和分享文案的发布短片 | C-code-motion | repo→mp4 | 免费CPU/Agent额度 | 英文 | GitHub 项目推荐（天机）的现成「项目→发布片」方案 |
| [krillinai/OpenCreator](https://github.com/krillinai/OpenCreator) | 12629 | 2026-10-05 | Apache-2.0 | 创作者 AI 工作区（原 KrillinAI）：视频、图片、语音、数字人、视频翻译与剪辑 | B-videogen E-edit | topic/video→mp4 | API key | 中英 | 视频翻译/配音/剪辑的工作台 |
| [luoluoluo22/jianying-editor-skill](https://github.com/luoluoluo22/jianying-editor-skill) | 3824 | 2026-09-11 | MIT<br><sub>MIT；内含 Apache-2.0 的 pyJianYingDraft 等第三方组件</sub> | 让 Agent 自动操作剪映：写文案、配音、字幕、选乐、特效到导出草稿 | E-edit | script/video→jianying-draft | 免费CPU/Agent额度 | 中文 | 成片最后一公里：把 animator/videogen 产物导入剪映精修；含 Apache-2.0 第三方组件 |
| [FireRedTeam/FireRed-OpenStoryline](https://github.com/FireRedTeam/FireRed-OpenStoryline) | 3470 | 2026-07-31 | Apache-2.0 | AI 剪辑 agent：自然语言驱动剪辑决策 | E-edit | video→mp4 | API key | 中英 | 已有素材的剪辑路线 |
| [Agentchengfeng/chengfeng-videocut-skills](https://github.com/Agentchengfeng/chengfeng-videocut-skills) | 3041 | 2026-09-20 | Apache-2.0 | 口播视频剪辑 Agent（Codex 插件 + 本地工作台） | E-edit | video→mp4 | 免费CPU/Agent额度 | 中文 | 真人口播粗剪 |
| [cclank/lanshu-create-ai-presenter-video](https://github.com/cclank/lanshu-create-ai-presenter-video) | 2546 | 2026-10-06 | MIT<br><sub>MIT；人像必须为本人或已获授权</sub> | 主题或脚本 + 已授权人像→数字人讲解视频，或 9 种视觉风格的演示讲解 | B-videogen C-code-motion | script/image→mp4 | API key/Agent额度 | 中英 | 需要「真人出镜感」的口播；必须使用已授权肖像 |
| [edenfunf/reelmimic](https://github.com/edenfunf/reelmimic) | 1751 | 2026-10-07 | MIT | 给一个喜欢的参考视频→AI 团队规划、制作、审片出同风格新视频 | C-code-motion B-videogen | video→mp4 | Agent额度 | 中英 | 「照着参考片的风格做」场景 |
| [echris6/motion-video-kit](https://github.com/echris6/motion-video-kit) | 1070 | 2026-09-28 | MIT | 商业广告片 skill：独立评审回路、28 支发布片总结的动效原则、质量门槛与声音设计 | C-code-motion B-videogen | product→mp4 | API key/Agent额度 | 英文 | 广告片质量标准参考 |
| [feicaiclub/video-spec-builder](https://github.com/feicaiclub/video-spec-builder) | 1015 | 2026-05-18 | MIT | 像导演一样追问，把「我想做个视频」逼成精确到秒的 video-spec.md，再交给 HyperFrames | M-method C-code-motion | topic→storyboard | Agent额度 | 中英 | 需求澄清阶段：可与 ai-video-director 的 intake 互补 |
| [artokun/comfyui-mcp](https://github.com/artokun/comfyui-mcp) | 798 | 2026-10-05 | MIT | 本地 ComfyUI 的 agent 控制面：MCP + 侧栏 agent 生成图像/视频、搭工作流 | B-videogen | topic→mp4/png | GPU | 英文 | 自有 GPU 时让 agent 驱动 ComfyUI，可与 videogen 路线 B 并用 |
| [op7418/guizang-product-video-skill](https://github.com/op7418/guizang-product-video-skill) | 727 | 2026-10-01 | AGPL-3.0 传染性<br><sub>AGPL-3.0</sub> | 归藏：复用产品真实组件与设计语言，用代码做软件更新宣传片（含分镜文案、原创配乐、音效） | C-code-motion | repo/product→mp4 | 免费CPU/Agent额度 | 中文 | 软件/开源项目宣传片；AGPL-3.0 |
| [zenstory-ai/video-recap-skills](https://github.com/zenstory-ai/video-recap-skills) | 559 | 2026-10-04 | MIT | 视频→中文解说成片：场景检测、ASR、VLM、写稿、TTS、混音，可导出剪映草稿 | E-edit | video→mp4/jianying-draft | API key/Agent额度 | 中文 | 影视/短剧解说二创；注意素材版权 |
| [zhuyansen/awesome-claude-video-skills](https://github.com/zhuyansen/awesome-claude-video-skills) | 489 | 2026-10-08 | CC0-1.0<br><sub>CC0 1.0（列表本身）</sub> | Agent 视频 skills 索引：200+ 仓库按类型分组并做安全分级（CC0） | M-method | topic→index | 免费CPU | 中英 | 找更多 skill 时的上游索引 |
| [heygen-com/skills](https://github.com/heygen-com/skills) | 472 | 2026-07-14 | MIT | HeyGen 官方 agent skills：数字人创建与视频生成 | B-videogen | script→mp4 | API key | 英文 | 商业数字人口播 |
| [geekjourneyx/hyperframes-motion-director](https://github.com/geekjourneyx/hyperframes-motion-director) | 451 | 2026-07-26 | AGPL-3.0 传染性<br><sub>AGPL-3.0</sub> | 中文优先的 HyperFrames 动效视频导演：文章/产品/网站/README→9:16 宣传片，含审片 | C-code-motion | repo/topic/product→mp4 | 免费CPU/Agent额度 | 中文 | README→竖屏宣传片；AGPL-3.0 |
| [Kianzzz/book-sales-video](https://github.com/Kianzzz/book-sales-video) | 216 | 2026-08-10 | MIT | 中文图书带货视频 skill：书籍核验、语义分镜、配音、配图、双语字幕、可编辑初稿 | E-edit | topic→mp4 | API key/Agent额度 | 中文 | 图书带货 |
| [kangarooking/promo-creator-skills](https://github.com/kangarooking/promo-creator-skills) | 103 | 2026-05-12 | MIT | 产品宣传片 skills：先做产品判断，再叙事结构、视觉规划、HyperFrames 剪辑、BGM 设计 | M-method C-code-motion | product→mp4/storyboard | Agent额度 | 中文 | 带货/宣传片的「先判断后画面」方法 |
| [JuneYaooo/self-media-compliance-review](https://github.com/JuneYaooo/self-media-compliance-review) | 94 | 2026-10-06 | MIT | 自媒体视频发布前违规风险审核：画面/声音/文字/封面/带货/资质/引流，五级风险报告 | M-method | video/script→report | 免费CPU/Agent额度 | 中文 | 发布前合规质检，建议作为所有路线的最后一步 |
| [LycheeAILab/avatar-forge](https://github.com/LycheeAILab/avatar-forge) | 93 | 2026-09-11 | MIT<br><sub>MIT；肖像与声音必须为本人或已获授权</sub> | 人物图片 + 参考声音 + 口播稿→数字人口播视频（含声音克隆） | B-videogen | image/audio/script→mp4 | API key | 中文 | 数字人路线；仅限本人或已授权的肖像与声音 |
| [xianyu110/ecommerce-video-skills](https://github.com/xianyu110/ecommerce-video-skills) | 57 | 2026-10-05 | MIT | 电商短视频 skills：3 秒钩子、卖点分镜、图生视频提示词、配音字幕花字、ffmpeg 本地成片、多平台导出 | B-videogen E-edit | product/image→mp4/prompt | 免费CPU/Agent额度 | 中文 | 产品带货零成本起步方案 |
| [Mr-funny/hbg-douyin-code-explainer-video](https://github.com/Mr-funny/hbg-douyin-code-explainer-video) | 30 | 2026-07-30 | NONE ⚠️无许可证 | 中文观点/知识文案→双人对话式 9:16 HyperFrames 代码动画口播，全局语音对齐 | C-code-motion | script→mp4 | 免费CPU/Agent额度 | 中文 | 中文对话式口播；无许可证，仅链接 |
| [axtonliu/video-illustrator](https://github.com/axtonliu/video-illustrator) | 18 | 2026-10-01 | MIT | 用你自己的旁白和真实素材（封面、截图、logo）做 20–60 秒宣传/概念讲解，多种风格可选 | C-code-motion | audio/image→mp4 | 免费CPU/Agent额度 | 中英 | 真人旁白 + 真实素材的讲解片 |

[← 返回目录](README.md)
