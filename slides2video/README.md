# slides2video · 路线 ⑥「PPT 式科普」

把一份 **deck.md**（类 Slidev 的 Markdown 幻灯片）做成带配音的竖屏 / 横屏讲解视频：
旁白讲到哪个词，对应的要点就在那一刻出现；公式逐项点亮、柱状图按讲解顺序升起、手绘圈注/下划线/高亮、
同 id 元素跨页变形（Magic Move）、代码行级 diff 变形、Mermaid 图按笔画画出来、聚光灯、卡拉 OK 字幕。

- **纯 CPU、无需任何 API key**：配音用本地 Kokoro（与 animator / videogen 共用），没有装 TTS 也能出片（静音 + 按字数计时）。
- **每一帧是时间的纯函数**：浏览器运行时没有 CSS 动画和计时器，逐帧截图 → ffmpeg，结果可复现。
- 适合：科普、课件、知识讲解、公式推导、数理图表、论文 / 产品讲解、「PPT 转视频」。不适合：剧情、真人、需要连续运镜的镜头（用路线 ①–⑤）。

## 快速开始

```bash
cd slides2video && npm install          # KaTeX / Shiki / Mermaid / yaml（只装在本目录）
cd ../animator && npm install            # 复用其 Chrome 驱动；可选：npm run setup:tts（本地 Kokoro 配音）
cd ..
node slides2video/cli.mjs doctor         # 检查环境
node slides2video/cli.mjs make slides2video/examples/sky/deck.md --out final.mp4 --sheet --preview
```

样片 `examples/sky/`：「为什么天空是蓝色的？」约 34 秒 9:16、天机主题（图片由 `make-images.mjs` 用代码画出，无外部素材）。

## 命令

| 命令 | 作用 |
|---|---|
| `make deck.md [--images 目录] [--out final.mp4]` | 出片（同时写 `.srt`）。`--aspect 9:16\|16:9\|1:1`、`--theme`、`--no-voice`、`--workers N`、`--from/--to` 局部渲染、`--bgm 音乐`、`--sheet` 每页样张拼图、`--preview` 720p 小文件、`--no-qa` |
| `plan deck.md [--voice]` | 打印时间轴：每页起止、每句旁白、每个元素 / 圈注的出现时刻（加 `--voice` 用真实配音计时） |
| `lint deck.md [--qa]` | 静态检查（一页一个想法、≤4 条要点、语速、标题长度、长时间画面静止、morph 无配对…）；`--qa` 再用浏览器做版式检查（溢出、重叠、出画、压字幕区、字号过小） |
| `stills deck.md [--at 1.5,4,9]` | 指定时刻截图（默认每页结尾一张），用于自查 |
| `prompts deck.md [--out prompts.md]` | 为每个需要配图的页面生成 **ChatGPT 出图中文提示词**（含构图留白、比例、禁止文字） |
| `import x.pptx [--mode pages\|rebuild]` | PPT → deck.md。`pages`（默认）：LibreOffice 把每页渲染成图，原样保留版式；`rebuild`：提取标题 / 要点 / 图片，用本工具的主题重新排版，可做逐条出现 |
| `init [目录]` | 生成一份入门 deck.md |
| `doctor` | 环境检查 |

图片：页面 frontmatter 写 `image: 文件名`，在 `--images` 目录或 deck 同目录（`images/`）里找；不写文件名时按页号找 `05.png` / `05-xxx.jpg`。缺图会显示占位框并提示用 `prompts` 出图。

## deck.md 语法

```markdown
---
title: 为什么天空是蓝色的？
aspect: "9:16"        # 9:16 | 16:9 | 1:1
theme: tianji         # tianji（天机：深蓝 + 金 + 印章）| paper | chalk | clean
transition: fade      # 默认转场：fade | slide | up | zoom | morph | huashu:<名字> | none，可写 fade@0.4
voice: kokoro:zm_052  # 默认：tianji 主题用男声 zm_052，其他 zf_001
speed: 1.1
subtitles: karaoke    # karaoke | plain | none
---
layout: formula       # 页面 frontmatter（可选）：layout / image / transition / duration / voice / kenburns / fit / scrim
transition: morph
---

# 瑞利散射 {id: q}

$$ I \propto \frac{1}{\term{\lambda^4}} $$ {id: law, terms: ["四次方"]}

- 波长越短，散射越强 {at: 越短, mark: "underline:散射"}
- 蓝光被散射得最多 {at: "c2:蓝光", build: pop, spot: true}

> say: 空气分子散射阳光，波长越短，散射越强。
> say: 所以蓝光被散射得最多。
```

- 每页用 `---` 分隔；`> say:` 一行一句旁白（= 一条字幕）；`> note:` 和 `<!-- -->` 不会出现。
- 元素：`#` 标题、`##` 小标题、`###` 副标题、`-` / `1.` 要点（每条单独出现）、段落、`![说明](图片)`、`$$公式$$`（KaTeX，`\term{…}` 标出可点亮的项）、```` ```js ```` 代码（Shiki 高亮）、```` ```mermaid ````、```` ```chart ````（YAML：`type: bar|line`，`bars:` / `points:` / `labels`+`values`，每项可写 `at`）、`::right::` 分栏。行内：`**强调**`、`==高亮==`（跟着旁白涂上）、`$x$`、`` `code` ``。
- 行尾 `{…}` 属性：
  - `at`：出现时刻。`"词"`（旁白里该词开始说的时刻，从上一个元素往后找）、`"c2:词"`（第 2 句里的词）、`"c2:词#2"`（第 2 次出现）、`"c2:词.end"`、`"c2"` / `"c2.end"`、`1.5`（本页第 1.5 秒）、`after+0.4`、`with`、`page.end-1`。不写时自动在旁白里找要点文字（`plan` 里标「自动对词」）。
  - `build`：`fade up left right zoom pop wipe type draw none`。
  - `mark`：`circle underline highlight box strike`，可写 `circle:词` 只圈一个词；`markAt` 单独指定时刻。
  - `spot: true | "词"`：聚光灯（其余区域压暗，持续到该句结束）；`out: "词"`：让元素消失。
  - `id`：相邻两页同 id 的元素在 `transition: morph` 时平滑变形（位置、大小、文字交叉淡化；代码按行 diff 移动）。
  - 公式 `terms: ["词", …]`：依次点亮 `\term{}` 标记的项。
- 版式（`layout`）：`cover default image-right image-left image-top image-full two-cols compare big-number quote formula code chart diagram timeline section end`（共 17 个；不写时按内容自动选）。
- 转场 `huashu:<名字>`（如 `huashu:godRays`、`wave`、`pageTurn`、`tiles`）调用 animator 内置的 huashu-art-motion（MIT）转场：两页各截一帧在画布上合成。

## 科普写法（建议）

开头一句钩子问题 → 一个生活比喻 → 分层解释（现象 → 原理 → 公式 / 数据）→ 一句话总结。一页一个想法、≤4 条要点、
每句旁白 ≤ 两行字幕（竖屏约 16 字一行）、中文 4–5.5 字/秒；每 3–5 秒画面要有新变化（要点、圈注、图表）。
完整方法见 `skills/ai-video-director/references/methods.md`。

## 实现与许可

全部为本仓库原创代码（Apache-2.0，© 2026 天机）。思路借鉴（未复制代码）：Slidev（MIT，Markdown 幻灯片语法与 v-click 逐条出现）、
reveal.js Auto-Animate（MIT，同 id 变形）、rough-notation（MIT，手绘标注）、shiki-magic-move（MIT，代码变形）、
pptx2video（ai-nuts，MIT，演讲者备注 `## [handle]` / `[[Spotlight] …]` 约定，本工具兼容读取）、timecut（BSD-3，虚拟时间逐帧）、
banana-slides（AGPL，仅「每页一张 AI 图」的工作流思路）、explainroo（版式检查思路）。

运行时依赖（`npm install` 安装，不随仓库分发）：KaTeX（MIT；**其字体为 SIL OFL，渲染时直接从 `node_modules/katex/dist/fonts` 加载，仓库不包含任何字体文件**）、
Shiki（MIT）、Mermaid（MIT）、yaml（ISC）。中文字体使用系统已安装的 Noto Sans CJK / 思源黑体等，不随仓库分发。

暂未实现：导出 .pptx（计划用 PptxGenJS，MIT）；pptx `rebuild` 模式只取标题 / 文本 / 图片，不还原表格、SmartArt 和复杂动画（用 `pages` 模式保真）。
