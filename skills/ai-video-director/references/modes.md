# 六条路线完整对照（ai-video-director 参考）

> 由 SKILL.md 第 2 步引用。机器可读版本：MCP `list_modes`，或 `node router/cli.mjs scenarios`。
> 只推荐 2026 年仍活跃的外部项目（`catalog/registry.json` 的 `freshness.cutoff`）；停更 / 归档的只在目录页尾「历史 / 不再推荐」里。

## 1. 路线总表

| 路线 | 本仓库工具 | 最适合（题材） | 不适合 | 输入 | 成本 | 入口命令 |
|---|---|---|---|---|---|---|
| ① 手绘逐笔 | `animator/` | 知识口播、GitHub 仓库推荐（天机风）、绘本、诗词、拆书、治愈小故事 | 写实真人、大场面特效、精确公式推导 | 台词.txt（一行一句） | 免费 CPU | `node animator/src/cli.mjs make 台词.txt --out out.mp4` |
| ② 视频生成 | `videogen/` + `prompts/` + `templates/` | 漫剧剧情、真人短剧、产品带货、vlog 空镜、MV | 需要准确文字 / 公式 / 图表 | 分镜.md | API key / 自有 GPU / 网页手动 | `node videogen/cli.mjs plan 分镜.md --out shots.json` |
| ③ 代码动效 | 外部 Remotion / HyperFrames / Manim（本仓库给命令） | 数据可视化、连续几何与函数动画、发布片花字、定制动效 | 不想写代码；Remotion 大公司未授权 | 代码 / 数据 | 免费 CPU（Remotion 有条件） | 见 `recommend` 输出 |
| ④ 外部项目 | `catalog/` | 本仓库没覆盖的：数字人、剪辑切条、长视频切片、一条龙平台 | 未核验许可就商用 | 视项目 | 视项目 | `node router/cli.mjs search <关键词>` / MCP `search_projects` |
| ⑤ 静图成片 | `stills2video/` | 只有图片（ChatGPT 出图）、没有视频订阅、氛围短片、空镜 | 角色复杂表演 | 图片 + 台词 | 免费 CPU；可选本地 GPU / 云 key | `node stills2video/cli.mjs make --images stills --script 台词.txt` |
| ⑥ PPT 式科普 | `slides2video/` | 科学科普、课件 / 微课、知识讲解、公式与数理推导、PPT 转视频、论文讲解、数据小故事 | 剧情表演、真人画面、连续运镜 | deck.md（或 .pptx）+ 可选每页配图 | 免费 CPU、无 API key | `node slides2video/cli.mjs make deck.md --images stills --out final.mp4` |

## 2. 场景 → 默认路线（router 内置，`node router/cli.mjs scenarios`）

| 场景 id | 名称 | 主路线 | 备选 | 默认画幅 / 时长 |
|---|---|---|---|---|
| courseware | 课件 / 微课 / PPT 转视频 / 论文讲解 | ⑥ | ③ ① | 16:9 / 120s |
| science | 科学科普 / 知识讲解（PPT 式） | ⑥ | ① ③ | 9:16 / 45s |
| math | 数学 / 物理 / 算法讲解 | ⑥ | ③（Manim）① | 16:9 / 120s |
| explainer | 知识科普 / 口播讲解（口播、干货、心理学、历史…） | ① | ⑥ ③ | 9:16 / 90s |
| data | 数据 / 信息图 / 排行榜 | ③ | ⑥ ① | 16:9 / 60s |
| repo-promo | GitHub 项目 / AI 工具推荐（天机风） | ① | ③ | 9:16 / 60s |
| book | 拆书 / 读书分享 | ① | ③ | 9:16 / 120s |
| poem | 古诗词 / 国学 | ① | ③ ② | 9:16 / 60s |
| picture-book / healing | 绘本 / 治愈故事 | ① | ② | 9:16 / 90s |
| product | 产品带货 / 广告 | ② | ③（free-cpu 时为主） | 9:16 / 30s |
| drama-* / comedy / story | 仙侠、甜宠、悬疑、都市、科幻、搞笑、通用剧情 | ② | ①（free-cpu 漫剧时为主） | 9:16 / 60s |
| vlog / music-mv | vlog、DV、MV | ② | ③ ④ | 9:16 或 16:9 |
| （任意 + 只有图片） | 只有 ChatGPT 图片、没有视频订阅 | ⑤ | 原主路线 | — |

**怎么在 ① 和 ⑥ 之间选**（都是免费 CPU 的讲解）：

- 画面主要是**文字要点、公式、图表、代码、流程图** → ⑥（字是排版出来的，清晰、可逐条点亮、可跨页变形）。
- 画面主要是**一个人物在讲 + 被画出来的小场景**、想要温度感和「手绘过程」 → ①。
- 两者都想要：⑥ 做主体，① 做开头 / 结尾的天机出镜段，最后用 ffmpeg 拼接。

**⑥ 和 ③ Manim 的分工**：推导是「一行行变形的式子 + 逐项点亮」→ ⑥；需要连续几何变换（旋转、轨迹、函数图像扫动、向量场）→ ③ Manim（+ manim-voiceover 按词触发）。

## 3. 预算 / 硬件修正

| 预算 | 规则 |
|---|---|
| free-cpu | 漫剧剧情 → 先做 ① 手绘版；真人剧情 → ② 只能网页端（可能消耗额度）或改 ①；产品 → ③ + 实拍图；只有图片 → ⑤ CPU 视差；科普 / 课件 → ⑥ |
| gpu | ② 走本地 ComfyUI（Wan2.2 5B）；⑤ 按显存档位（gpu8 / gpu12 / gpu16 / gpu24）上真实图生视频 |
| api-key | ② `videogen gen --provider …`，先 `--dry-run`；⑤ `--backend cloud:<provider>` |
| web-manual | ② / ⑤ 导出生成包 → 网页生成 → import |

## 4. 我们从外部项目吸收了什么（按路线）

> 完整清单：[`docs/项目用途地图.md`](../../../docs/项目用途地图.md) 的「我们吸收了什么」列；许可与署名：`NOTICE.md`、`ATTRIBUTION.md`。

| 路线 | 移植（保留许可证头） | 借鉴思路（代码自写） | 作为依赖调用 |
|---|---|---|---|
| ① animator | huashu-art-motion 转场 / 风格配方（MIT）；story-to-handdrawn-video 297 条画风配方文字（MIT） | srt-whiteboard-animation（元素绑字幕事件 → `c3:词`）、anidoodle（代码逐笔作画）、ViMax / Toonflow（角色一次声明） | Kokoro / sherpa-onnx 本地配音 |
| ② videogen | Comfy-Org workflow_templates（MIT） | — | ComfyUI（GPL，仅 HTTP API） |
| ⑤ stills2video | Comfy-Org workflow_templates（MIT） | MoneyPrinterTurbo、editly、kburns、Pixelle-Video、FramePack、DepthFlow（AGPL，仅思路）、OpenMontage（AGPL，仅思路）、Wan2GP | Depth-Anything-V2-Small（Apache-2.0）、rife / Real-ESRGAN（用户自装） |
| ⑥ slides2video | huashu-art-motion 转场（复用 animator 已移植的 MIT 代码） | Slidev（Markdown 语法 / 逐条出现）、reveal.js Auto-Animate（同 id 变形）、rough-notation（手绘标注）、shiki-magic-move（代码变形）、pptx2video（备注协议、动画窗格顺序）、explainroo（版式检查）、timecut（虚拟时间逐帧）、banana-slides（AGPL，仅「每页一张 AI 图」流程）、video-podcast-maker（脚本验收） | KaTeX（MIT，字体 OFL 运行时从 node_modules 加载）、Shiki（MIT）、Mermaid（MIT）、yaml（ISC）、LibreOffice（pptx pages 模式，用户自装） |
