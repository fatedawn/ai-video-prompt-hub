# 制作方案：为什么天空是蓝色的？30 秒 PPT 式科普（瑞利散射公式 + 图表）

> 由 `router/cli.mjs recommend` 生成。题材识别为 **科学科普 / 知识讲解（PPT 式）**（science）；媒介 **其他** · 方向 **现实向** · 9:16 · 约 45 秒 · 预算：免费 + 普通电脑（CPU）

## 1. 路线

**主路线：路线⑥：slides2video PPT 式科普（本仓库）**

- 「科学科普 / 知识讲解（PPT 式）」是「讲清楚一件事」：路线⑥ slides2video 把 deck.md 做成 PPT 式讲解片——要点按旁白逐词出现、公式逐项点亮、图表按讲解升起、同一元素跨页变形，免费、CPU、无需 API key
- 需要连续几何变换 / 函数图像扫动时，改用路线③ Manim

备选：路线①：animator 手绘动画（本仓库）；路线③：代码动效（Remotion / HyperFrames / Manim）；路线④：外部开源项目（catalog/）
- PPT 式：路线⑥ slides2video（deck.md 或 import 现成 .pptx），一页一个想法，要点按旁白逐条出现

## 2. 台词 / 分镜骨架

1. （钩子）一个反常识的问题：「天空为什么是蓝的，而不是紫的？」
2. （比喻）用一个生活画面讲清关键概念（第 2 页）
3. （现象 → 原理）分 2–3 页逐层解释，每页一个想法、≤4 条要点
4. （公式 / 数据）一页公式逐项点亮或一张图表按讲解升起
5. （一句话总结）结尾页一句可复述的结论

要点：
- 钩子问题开场 → 生活比喻 → 分层解释（现象 → 原理 → 公式/数据）→ 一句话总结
- 一页一个想法、≤4 条要点；每 3–5 秒画面要有新变化（要点出现、圈注、图表升起）
- 想要「手绘被画出来」的温度感就换路线①；要连续几何变换（旋转、轨迹）就换路线③ Manim

## 3. 执行步骤

1. **确认需求（intake）** — 题材、媒介、方向、时长、画幅、预算、角色素材、配音逐项确认；不确定就用本方案的默认值

   ```bash
   node router/cli.mjs intake
   ```

**路线⑥：slides2video PPT 式科普（本仓库）（主路线）**

2. **准备（只需一次）** — KaTeX / Shiki / Mermaid 只装在 slides2video/node_modules（KaTeX 字体为 OFL，渲染时从 node_modules 加载，不进仓库）；setup:tts 下载本地 Kokoro 配音（可跳过：静音 + 按字数计时）

   ```bash
   cd slides2video && npm install && cd ..
   cd animator && npm install && npm run setup:tts && cd ..
   node slides2video/cli.mjs doctor
   ```

3. **写 deck.md（或导入现成 PPT）** — 一页一个想法；`> say:` 一句一条字幕；要点行尾写 {at: 词} 让它在说到该词时出现，{mark: circle} 圈注，{id: x} + transition: morph 跨页变形；公式 $$…\term{…}…$$ + terms 逐项点亮；画幅 aspect: "9:16"，主题 tianji（天机）

   ```bash
   node slides2video/cli.mjs init .work/为什么天空是蓝色的-30
   $EDITOR .work/为什么天空是蓝色的-30/deck.md
   # 已有 PPT：node slides2video/cli.mjs import 课件.pptx --out .work/为什么天空是蓝色的-30  （备注 = 旁白）
   ```

4. **配图（可选，ChatGPT 出图）** — 提示词已要求画面不含文字（文字由视频叠加）；不出图也能做：纯排版页 + 图表 + 公式

   ```bash
   node slides2video/cli.mjs prompts .work/为什么天空是蓝色的-30/deck.md --out .work/为什么天空是蓝色的-30/出图提示词.md
   # 按提示词出图，存为 .work/为什么天空是蓝色的-30/images/01.png、05.png…（页号命名）
   ```

5. **检查时间轴与版式** — 看每条要点 / 圈注的出现时刻；lint 检查语速、要点数、长时间静止、溢出、压字幕区

   ```bash
   node slides2video/cli.mjs plan .work/为什么天空是蓝色的-30/deck.md --voice
   node slides2video/cli.mjs lint .work/为什么天空是蓝色的-30/deck.md --qa
   ```

6. **一条命令出片** — 同时输出 .srt、每页样张拼图和 720p 预览；--from/--to 只渲染一段做快速检查

   ```bash
   node slides2video/cli.mjs make .work/为什么天空是蓝色的-30/deck.md --out .work/为什么天空是蓝色的-30/final.mp4 --sheet --preview
   ```

**路线①：animator 手绘动画（本仓库）（备选/升级）**

7. **准备（只需一次）** — Node ≥18；setup:tts 下载本地开源 TTS（Kokoro v1.1-zh，CPU、离线、免费）

   ```bash
   cd animator && npm install && npm run setup:tts && cd ..
   ```

8. **写台词** — 一行一句（会成为一条字幕）；空行 = 换镜头；「关键词」说到时会被画出来；「角色：台词」可切换说话人（天机/豆豆）

   ```bash
   mkdir -p .work/为什么天空是蓝色的-30 && $EDITOR .work/为什么天空是蓝色的-30/台词.txt
   ```

9. **选画风** — 推荐画材 --media pencil；画风预设只是提示词配方，渲染本身不调用任何 AI 服务

   ```bash
   node animator/src/cli.mjs styles --show minimal-line-explainer
   node animator/src/cli.mjs styles --search 彩铅
   ```

10. **一条命令出片** — 先加 --scale 0.5 快速预览；完成后会生成可编辑的工程 project.json

   ```bash
   node animator/src/cli.mjs make .work/为什么天空是蓝色的-30/台词.txt --out .work/为什么天空是蓝色的-30/为什么天空是蓝色的-30.mp4 --character tianji --media pencil
   ```

11. **精修（可选）** — 在 project.json 里加 "stylePreset": "minimal-line-explainer"，调整道具、动作、相机；synccheck 可做图文对齐质检

   ```bash
   node animator/src/cli.mjs check .work/为什么天空是蓝色的-30/为什么天空是蓝色的-30.work/project.json
   node animator/src/cli.mjs preview .work/为什么天空是蓝色的-30/为什么天空是蓝色的-30.work/project.json
   node animator/src/cli.mjs make .work/为什么天空是蓝色的-30/为什么天空是蓝色的-30.work/project.json --out .work/为什么天空是蓝色的-30/为什么天空是蓝色的-30.mp4
   ```

12. **发布前质检** — 核对字幕错别字与音画对齐；按平台要求标注「AI 生成」；可用 self-media-compliance-review 做违规风险自查

## 4. 推荐素材（本仓库）

**画风预设**（`node animator/src/cli.mjs styles --show <id>`）

| id | 名称 | 适合 | animator 画材 |
|---|---|---|---|
| `minimal-line-explainer` | 极简黑白线条讲解 | 知识讲解、流程、观点拆解 | pencil |
| `whiteboard-explainer` | 白板讲解动画 | 教程、商业解释、时间线 | pencil |
| `bean-doodle-infographic` | 小豆人涂鸦信息图 | 方法步骤、清单、知识卡 | pencil |

**参考提示词**：主路线不需要视频模型提示词；要做 AI 插段可加 --scenario 指定剧情类题材，或直接浏览 prompts/其他/动态图形与界面

## 5. 外部项目（catalog/registry.json）

**工具 / 引擎 / 技能**

| 项目 | ★ | 许可 | 成本 | 语言 | 用法 |
|---|---|---|---|---|---|
| [alchaincyf/huashu-design](https://github.com/alchaincyf/huashu-design) | 24699 | MIT | Agent额度/免费CPU | 中文 | 花叔的 HTML 原生设计 skill：幻灯、原型、时间轴动画（Stage + Sprite），本地导 MP4/GIF/PPTX，无需 key；**接入**：同作者的 huashu-art-motion（MIT）已移植进 animator；slides2video 页间转场直接调用那 50 种转场 |
| [ningzimu/codex-ppt-skill](https://github.com/ningzimu/codex-ppt-skill) | 6536 | MIT | Agent额度 | 中文 | Codex skill：用 Codex 内置的 GPT 生图做整页图片式 PPT（ChatGPT 订阅内一般不另付 API）；**接入**：整页图片 → 可直接当 slides2video 的 `image-full` 页或 stills2video 的图片 |
| [sligter/LandPPT](https://github.com/sligter/LandPPT) | 3615 | Apache-2.0 | API key/免费CPU | 中文 | 中文 LLM PPT 平台：主题/文档 → HTML 幻灯 → 讲稿 → 逐页配音 → 导出 1080p 讲解视频；**接入**：整套平台型用法；本仓库只链接。可编辑 PPTX 导出依赖商业 Apryse key |
| [Unclecheng-li/AI-Animation-Skill](https://github.com/Unclecheng-li/AI-Animation-Skill) | 572 | MIT | Agent额度 | 中文 | 科普文本 → HTML 演示动画（26 个 PPT 模板 + 14 个流程图模板），中文；**接入**：中文科普 HTML 演示；出视频走路线⑥ |
| [lewislulu/html-ppt-skill](https://github.com/lewislulu/html-ppt-skill) | 8616 | MIT | Agent额度/免费CPU | 中英 | HTML PPT skill：24 套主题、31 种版式、47 种动画（CSS + Canvas）、图表版式和演讲者模式；**接入**：版式/主题清单作为 slides2video 版式设计的参考（未复制其 HTML/CSS） |
| [KaTeX/KaTeX](https://github.com/KaTeX/KaTeX) | 20436 | MIT | 免费CPU | 英文 | 网页公式排版，最快；**接入**：slides2video 的 $$公式$$ 用它渲染（npm 依赖，字体从 node_modules 加载，不进仓库） |
| [Anionex/banana-slides](https://github.com/Anionex/banana-slides) | 15717 | AGPL-3.0 传染性 | API key/网页手动 | 中文 | 中文 AI PPT 应用：大纲/文档生成整页 AI 图片式幻灯，能导出可编辑 PPTX，并一键出带旁白字幕的讲解视频；**接入**：AGPL：可以直接用，代码不并入本仓库；「一页一张 AI 图 + 讲解视频」的流程启发了 slides2video prompts（每页出图提示词） |
| [slidevjs/slidev](https://github.com/slidevjs/slidev) | 48984 | MIT | 免费CPU | 中英 | 用 Markdown 写网页幻灯：逐条出现、代码变形、公式、流程图都内置，可按点击步导出 PNG/PDF/PPTX；**接入**：deck.md 语法向它看齐（`---` 分页、frontmatter）；它自己不出视频，本仓库 slides2video 补上「按配音时间轴逐帧渲染成 MP4」这一步 |

**方法论（剧本、分镜、提示词）**

| 项目 | ★ | 许可 | 成本 | 语言 | 用法 |
|---|---|---|---|---|---|
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 58391 | MIT | Agent额度 | 中英 | Agent skill：把文档或主题做成原生可编辑的 PPTX（母版、形状、图表、公式、切换和动画）；**接入**：在 Codex / Claude Code 里先用它生成 PPTX，再交给 slides2video import 或 pptx2video 出片 |
| [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) | 40203 | MIT | API key/免费CPU | 中文 | 清华多智能体互动课堂：主题/文档 → 课件 + 白板公式 + 语音讲解，可一键导出 MP4；**接入**：课堂化讲解的参考（多角色、白板推导）；本仓库只链接 |
| [anthropics/skills](https://github.com/anthropics/skills) | 180030 | NONE ⚠️无许可证 | Agent额度 | 英文 | Anthropic 官方 skills 合集，含读写 PPTX 的 pptx skill；**接入**：pptx skill 为专有条款：只链接 |

## 6. 合规

- 本仓库提示词/模板各自保留原许可证（见每条的 license 与 source_repo），转载或二次分发请保留出处；link-only 条目只给链接，不在此推荐
- 不使用真实明星/他人的脸、名字和声音；声音克隆、数字人只用本人或已获授权的素材
- 背景音乐、字体、参考图需自有版权或可商用授权
- 按《人工智能生成合成内容标识办法》和平台规则标注 AI 生成内容
- Anionex/banana-slides：AGPL-3.0
- anthropics/skills：仓库根目录无 LICENSE；pptx skill 自带 LICENSE.txt 为 Anthropic 专有条款。只给链接。（无许可证：仅可参考，勿复制代码）
- Remotion：个人与 ≤3 人公司免费，更大的营利公司需购买 Company License
