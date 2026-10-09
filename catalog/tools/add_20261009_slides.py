#!/usr/bin/env python3
"""One-shot: add the PPT-style science explainer research (slides / scivis) and the remaining i2v gap
(voice/alignment tools, Open-Generative-AI) to catalog/registry.json.

Live stars / pushed / archived / LICENSE path come from the GitHub GraphQL API (fetch() from add_20261009.py).
Every licence was checked on 2026-10-09; repos where GitHub shows NOASSERTION / no licence had their LICENSE text
read (notes below). Intros, best_for, strengths, absorbed and how_to_use are our own words.
Idempotent: repos already in the registry are skipped. Freshness (active/stale) is applied afterwards by freshness.py.
Original work for ai-video-prompt-hub, Apache-2.0, © 2026 天机.
"""
import json, sys, pathlib

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from add_20261009 import fetch, entry, REG, TODAY  # noqa: E402
import freshness  # noqa: E402

CATS = [
    {"id": "slides", "name_zh": "幻灯片 · PPT 式科普成片"},
    {"id": "scivis", "name_zh": "公式 · 图表 · 科学可视化"},
    {"id": "voice", "name_zh": "配音 · 字幕对齐"},
]
ROUTE = {"P-slides": "PPT 式成片：幻灯页 + 逐条出现 + 变形 + 公式/图表 + 配音字幕（本仓库 slides2video 及同类）"}

P = dict(license_class="permissive")
AGPL = dict(license="AGPL-3.0", license_class="copyleft")
NONE = dict(license="NONE", license_class="none", warning="no-license", commercial_block=True)


def I(type_, what, where=""):
    return {"type": type_, "what": what, "where": where}


NO = I("none", "没有拿代码或思路；作为外部项目推荐")


def S(repo, category, kind, intro, lic, routes, inp, out, cost, zh, use_for, plugs, best, strengths, absorbed, how, **kw):
    lic = dict(lic)
    return entry(id=kw.pop("id", repo.split("/")[1].lower().replace(".", "-").replace("_", "-")), repo=repo, category=category, kind=kind,
                 intro_zh=intro, routes=routes, input=inp, output=out, cost=cost, zh=zh, use_for=use_for, plugs_into=plugs,
                 best_for=best, strengths=strengths, absorbed=absorbed, how_to_use=how, **lic, **kw)


SL, SC, VO = "slides", "scivis", "voice"
NEW = [
  # ------------------------------------------------------------------ slides: 幻灯 → 视频 / PPT 生成
  S("slidevjs/slidev", SL, "engine", "用 Markdown 写网页幻灯：逐条出现、代码变形、公式、流程图都内置，可按点击步导出 PNG/PDF/PPTX", dict(license="MIT", **P),
    ["P-slides", "C-code-motion"], ["text"], ["html", "image", "pptx"], ["free-cpu"], "bilingual", ["explainer", "courseware", "math"],
    "deck.md 语法向它看齐（`---` 分页、frontmatter）；它自己不出视频，本仓库 slides2video 补上「按配音时间轴逐帧渲染成 MP4」这一步",
    ["技术分享 / 编程课", "带代码和公式的知识讲解", "要现场演讲也要录成视频的课件"],
    "Markdown 写幻灯最成熟的方案，开发者生态大；代码块变形和点击步导出是它的招牌",
    I("idea", "deck.md 的 Markdown 子集（分页、frontmatter、逐条出现）参考其语法设计；代码为本仓库自写", "slides2video/lib/parse.mjs"),
    "路线⑥ 的上游写法：`npm init slidev` 写好后 `slidev export --with-clicks` 出逐步 PNG；或把同样的 Markdown 交给 `node slides2video/cli.mjs make`"),
  S("hakimel/reveal.js", SL, "engine", "老牌 HTML 幻灯框架，fragments 逐条出现，Auto-Animate 让相邻两页同名元素自动补间（像 PPT 的平滑切换）", dict(license="MIT", **P),
    ["P-slides", "C-code-motion"], ["text"], ["html"], ["free-cpu"], "en", ["explainer", "courseware"],
    "Auto-Animate 的「同 id 配对 + FLIP 补间」被 slides2video 自写实现为跨页 morph",
    ["网页演讲", "需要页间平滑变形的讲解"], "Auto-Animate（同名元素跨页补间）思路清晰、插件多，网页演示最稳",
    I("idea", "同 id 元素跨页 FLIP 补间（Auto-Animate 思路），自写实现", "slides2video/runtime/slides.js（morph）"),
    "路线⑥：deck.md 里给两页的同一元素写相同 `id:`，slides2video 自动做变形；要网页演示再直接用 reveal.js"),
  S("ai-nuts/pptx2video", SL, "app", "把 PPTX 的原生动画顺序和演讲者备注里的旁白对齐成带字幕的 MP4；支持备注里标「聚光」", dict(license="MIT", **P),
    ["P-slides"], ["pptx"], ["mp4", "srt"], ["free-cpu"], "en", ["explainer", "courseware", "slides"],
    "slides2video import 兼容它的备注协议（`## [handle]` 分块、`[[Spotlight] 词]` 聚光），实现为本仓库自写的 JS",
    ["已经有一份 PPT、想直接出讲解视频", "PowerPoint/WPS 里调好动画的课件"],
    "唯一把 PowerPoint 动画窗格（单击 / 与上一项同时 / 上一项之后）和词级配音对齐出片的开源 CLI",
    I("idea", "演讲者备注分块协议与聚光标记、动画窗格顺序 → build 的映射（只读其文档，未复制代码）", "slides2video/lib/pptx.mjs"),
    "已有 PPTX：先试 `node slides2video/cli.mjs import 课件.pptx --out deck/`（本地、无 Edge 依赖）；要保留 PPT 原生动画效果就用 pptx2video 本身"),
  S("hugohe3/ppt-master", SL, "skill", "Agent skill：把文档或主题做成原生可编辑的 PPTX（母版、形状、图表、公式、切换和动画）", dict(license="MIT", **P),
    ["P-slides", "M-method"], ["topic", "text"], ["pptx"], ["agent-llm"], "bilingual", ["explainer", "courseware", "slides"],
    "在 Codex / Claude Code 里先用它生成 PPTX，再交给 slides2video import 或 pptx2video 出片",
    ["要交付可编辑 PPT 的课件 / 汇报", "先做 PPT 再出视频的科普"], "出来的是原生可编辑 PPTX 而不是图片页，后续人工改稿方便；宿主自带生图即可，不必另配 key",
    NO, "路线④ → ⑥：Agent 里装这个 skill 生成 PPTX → `node slides2video/cli.mjs import x.pptx` → `make`"),
  S("Anionex/banana-slides", SL, "app", "中文 AI PPT 应用：大纲/文档生成整页 AI 图片式幻灯，能导出可编辑 PPTX，并一键出带旁白字幕的讲解视频", AGPL,
    ["P-slides", "B-videogen"], ["topic", "text", "image"], ["pptx", "mp4"], ["api-key", "web-manual"], "native", ["explainer", "courseware", "slides"],
    "AGPL：可以直接用，代码不并入本仓库；「一页一张 AI 图 + 讲解视频」的流程启发了 slides2video prompts（每页出图提示词）",
    ["零代码中文 PPT 科普", "整页插画风课件"], "中文界面一站式：从大纲到讲解视频；能用 ChatGPT 账号 OAuth 出图",
    I("idea", "「一页一张 AI 图 + 旁白」工作流 → 每页中文出图提示词（自写，不含其代码/模板）", "slides2video prompts"),
    "路线④：按其 README 部署使用；想要本地可控版本走路线⑥ `node slides2video/cli.mjs prompts deck.md`"),
  S("sligter/LandPPT", SL, "app", "中文 LLM PPT 平台：主题/文档 → HTML 幻灯 → 讲稿 → 逐页配音 → 导出 1080p 讲解视频", dict(license="Apache-2.0", **P),
    ["P-slides"], ["topic", "text"], ["html", "mp4"], ["api-key", "free-cpu"], "native", ["explainer", "courseware", "slides"],
    "整套平台型用法；本仓库只链接。可编辑 PPTX 导出依赖商业 Apryse key",
    ["有 Ollama / LLM key、想一条龙出讲解视频"], "中文原生、HTML 幻灯到视频全链路，Ollama 可离线",
    NO, "路线④：自部署；LLM 用 Ollama 可零费用", license_note="GitHub 显示 NOASSERTION；2026-10-09 读 LICENSE 原文为 Apache-2.0。可编辑 PPTX 导出需要商业 Apryse key。"),
  S("THU-MAIC/OpenMAIC", SL, "app", "清华多智能体互动课堂：主题/文档 → 课件 + 白板公式 + 语音讲解，可一键导出 MP4", dict(license="MIT", **P),
    ["P-slides", "M-method"], ["topic", "text"], ["html", "mp4"], ["api-key", "free-cpu"], "native", ["explainer", "courseware"],
    "课堂化讲解的参考（多角色、白板推导）；本仓库只链接",
    ["AI 课堂 / 微课", "带白板推导的数理讲解"], "多智能体「老师 + 同学」互动课堂形态独特，白板能写公式",
    NO, "路线④：按 README 部署（需一个 LLM key 或 Ollama）"),
  S("alchaincyf/huashu-design", SL, "skill", "花叔的 HTML 原生设计 skill：幻灯、原型、时间轴动画（Stage + Sprite），本地导 MP4/GIF/PPTX，无需 key", dict(license="MIT", **P),
    ["P-slides", "C-code-motion"], ["topic", "text"], ["html", "mp4", "pptx"], ["agent-llm", "free-cpu"], "native", ["explainer", "slides", "launch"],
    "同作者的 huashu-art-motion（MIT）已移植进 animator；slides2video 页间转场直接调用那 50 种转场",
    ["设计感强的发布会式幻灯", "产品原型演示片"], "设计质量高、中文原生、HTML→MP4 自带",
    I("none", "本仓库未从 huashu-design 复制代码；页间转场来自同作者另一个 MIT 项目 huashu-art-motion（已移植）"),
    "路线④：Agent 里装 skill；本仓库路线⑥ 用 `transition: huashu:<名字>` 使用同作者的转场"),
  S("lewislulu/html-ppt-skill", SL, "skill", "HTML PPT skill：24 套主题、31 种版式、47 种动画（CSS + Canvas）、图表版式和演讲者模式", dict(license="MIT", **P),
    ["P-slides"], ["topic", "text"], ["html"], ["agent-llm", "free-cpu"], "bilingual", ["explainer", "slides"],
    "版式/主题清单作为 slides2video 版式设计的参考（未复制其 HTML/CSS）",
    ["网页幻灯演讲", "需要大量动画样式的展示"], "主题和动画数量多，是 HTML 幻灯的样式库",
    I("idea", "版式分类（封面、要点、左右图文、对比、大数字、时间线）作参考，样式代码自写", "slides2video/runtime/themes.css"),
    "路线④：Agent 里装 skill 生成 HTML；要出视频走路线⑥"),
  S("ningzimu/codex-ppt-skill", SL, "skill", "Codex skill：用 Codex 内置的 GPT 生图做整页图片式 PPT（ChatGPT 订阅内一般不另付 API）", dict(license="MIT", **P),
    ["P-slides", "S-stills"], ["topic"], ["pptx", "image"], ["agent-llm"], "native", ["explainer", "slides"],
    "整页图片 → 可直接当 slides2video 的 `image-full` 页或 stills2video 的图片",
    ["有 ChatGPT 会员没有 API 额度、要做图片式 PPT"], "把订阅内生图用满，不需要 API key",
    NO, "路线④ → ⑤/⑥：Codex 里出页图 → `node slides2video/cli.mjs make deck.md --images 页图目录`"),
  S("jeertmans/manim-slides", SL, "library", "把 Manim 动画切成可逐步播放的「幻灯」，能导出 reveal.js HTML 或 PPTX", dict(license="MIT", **P),
    ["P-slides", "C-code-motion"], ["text"], ["html", "pptx", "mp4"], ["free-cpu"], "en", ["math", "courseware"],
    "数理推导用 Manim 时，用它把场景按步切成幻灯",
    ["数学 / 物理课堂演示", "需要几何连续变换的推导"], "让 Manim 有 PPT 式的分步播放",
    NO, "路线③：`pip install manim-slides`，Manim 场景继承 Slide 后 `manim-slides convert` 导出"),
  S("vincentsch/explainroo", SL, "skill", "Agent 讲解视频：本地 Kokoro 配音、逐词字幕、图表/代码/图标场景、自动版面检查 → MP4", dict(license="MIT", **P),
    ["P-slides", "C-code-motion"], ["topic", "text"], ["mp4"], ["free-cpu", "agent-llm"], "en", ["explainer"],
    "版面溢出/重叠/小字检查的思路被 slides2video lint 采用（规则自写）",
    ["英文技术讲解", "图表 + 代码讲解短片"], "把「版面 QA」做成出片前的硬检查",
    I("idea", "出片前的版面 QA：文字溢出、元素重叠、字号过小（规则和实现自写）", "slides2video/runtime/slides.js __qa + cli lint"),
    "路线④；本仓库路线⑥ `node slides2video/cli.mjs lint deck.md` 有同类检查"),
  S("marp-team/marp-cli", SL, "app", "Marp Markdown 幻灯命令行：转 HTML/PDF/PPTX/PNG；没有逐条出现动画", dict(license="MIT", **P),
    ["P-slides"], ["text"], ["html", "pptx", "image"], ["free-cpu"], "en", ["slides", "courseware"],
    "逐页 PNG 可直接当 slides2video 的整页图（image-full）",
    ["一页一图配旁白的简单课件"], "极简、稳定，VS Code 插件好用", NO, "路线④：`npx @marp-team/marp-cli deck.md --images png` → 路线⑥ image-full 页"),
  S("astefanutti/decktape", SL, "app", "把 HTML 幻灯（reveal.js、Slidev 等）导出成 PDF/截图", dict(license="MIT", **P),
    ["P-slides"], ["html"], ["image"], ["free-cpu"], "en", ["slides"],
    "HTML 幻灯 → 逐页截图，再交给 slides2video / stills2video", ["已有 HTML 幻灯要出逐页图"], "兼容的 HTML 幻灯框架最多", NO,
    "路线④：`npx decktape reveal url out.pdf --screenshots`"),
  S("icip-cas/PPTAgent", SL, "research", "学术向 Agent 生成 PPTX（参考已有演示、反思式修改），也提供 skill 形态", dict(license="MIT", **P),
    ["P-slides"], ["text"], ["pptx"], ["api-key"], "en", ["courseware", "paper"], "生成 PPTX 后可走 slides2video import",
    ["论文 / 报告转演示文稿"], "参考已有 PPT 风格来生成，研究扎实", NO, "路线④：需 LLM + 视觉模型 API", maturity="research"),
  S("HKUDS/Paper2Slides", SL, "research", "论文一键转幻灯（带 Web UI），默认用 Gemini 生图", dict(license="MIT", **P),
    ["P-slides"], ["text"], ["image", "pptx"], ["api-key"], "en", ["paper", "courseware"], "出的页图可作 slides2video 整页图",
    ["论文解读视频的幻灯底稿"], "论文 → 幻灯/海报一步到位", NO, "路线④：需 LLM 与生图 API", maturity="research"),
  S("showlab/Paper2Video", SL, "research", "论文 → 幻灯 + 字幕 + 光标定位 + 配音（可选数字人）的讲解视频生成", dict(license="MIT", **P),
    ["P-slides"], ["text"], ["mp4"], ["api-key", "gpu"], "en", ["paper", "explainer"],
    "「光标/激光笔跟着讲解走」的想法 → slides2video 的 spot 聚光提示", ["学术论文讲解视频"], "光标定位让观众知道正在讲哪里",
    I("idea", "讲到哪里就把哪里聚光（spot），自写实现", "slides2video/runtime/slides.js（spot）"),
    "路线④：需 GPT/Gemini API，数字人需 GPU", maturity="research"),
  S("microsoft/ResearchStudio", SL, "research", "论文 → 海报 / 讲解视频 / 博客的研究工作台，pptx2video 的上游", dict(license="MIT", **P),
    ["P-slides"], ["text"], ["mp4", "image"], ["api-key"], "en", ["paper"], "只链接", ["研究成果多形态发布"], "论文多形态产出的一站式研究原型", NO, "路线④：需 LLM API", maturity="research"),
  S("Z-MU-Z/paper-explainer-video-skill", SL, "skill", "Codex skill：论文 PDF → 60–90 秒中/英讲解视频（抽原图表、edge-tts、HyperFrames 渲染、QA）", dict(license="MIT", **P),
    ["P-slides", "C-code-motion"], ["text"], ["mp4"], ["agent-llm", "free-cpu"], "native", ["paper", "explainer"], "中文论文速读短片的现成 skill",
    ["论文速读短视频"], "中文原生、直接出 MP4、带 QA", NO, "路线④：Codex 里装 skill", maturity="experimental"),
  S("teng-lin/notebooklm-py", SL, "library", "非官方 NotebookLM Python 接口/skill：批量生成视频概览 MP4 与幻灯", dict(license="MIT", **P),
    ["P-slides"], ["text"], ["mp4", "pptx"], ["web-manual"], "en", ["explainer", "courseware"],
    "非官方接口，可能失效或违反服务条款；只链接", ["想批量用 NotebookLM 出讲解草稿"], "把 NotebookLM 的视频概览批量化",
    NO, "路线④：自担风险使用；正式稿建议路线⑥", warning="unofficial-api"),
  S("presenton/presenton", SL, "app", "开源 AI PPT 生成器（模板、图表、图标），可用 ChatGPT 登录或本地 Ollama", dict(license="Apache-2.0", **P),
    ["P-slides"], ["topic", "text"], ["pptx"], ["free-cpu", "api-key"], "en", ["slides", "courseware"], "生成的 PPTX 可接 slides2video import",
    ["快速出一份 PPT 底稿"], "可自托管、支持 ChatGPT 登录不填 key", NO, "路线④：Docker 自部署 → PPTX → `slides2video import`"),
  S("pipipi-pikachu/PPTist", SL, "app", "网页版 PowerPoint：元素进入/退出/强调动画、页面切换、图表、LaTeX 公式、PPTX 导入导出", AGPL,
    ["P-slides"], ["pptx"], ["pptx", "html"], ["free-cpu"], "native", ["slides", "courseware"],
    "AGPL：只借鉴动画分类思路，不复制代码", ["在浏览器里改 PPT"], "中文网页 PPT 编辑器里功能最全",
    I("idea", "动画分三类（进入 / 强调 / 退出）的建模方式，自写", "slides2video build/mark 属性"), "路线④：在线编辑后导出 PPTX → `slides2video import`"),
  S("op7418/guizang-ppt-skill", SL, "skill", "歸藏的 HTML 幻灯 skill：杂志/瑞士版式、WebGL 背景、配图提示词、演讲者模式", AGPL,
    ["P-slides"], ["topic", "text"], ["html"], ["agent-llm"], "native", ["slides", "launch"], "AGPL：只链接与借鉴审美思路",
    ["杂志感发布会幻灯"], "版式审美强，中文社区影响大", NO, "路线④：Agent 里装 skill"),
  S("chuspeeism/dashi-ppt-skill", SL, "skill", "浏览器可编辑的 HTML 演示 skill：12 套主题、图表/分析模型、9 种翻页动画", AGPL,
    ["P-slides"], ["topic", "text"], ["html"], ["agent-llm"], "native", ["slides"], "AGPL，且导出引擎子包为专有组件：只链接",
    ["商业分析类演示"], "内置分析模型模板（SWOT 等）", NO, "路线④：Agent 里装 skill",
    license_note="AGPL-3.0；README 说明导出引擎子包为专有组件。"),
  S("zarazhangrui/frontend-slides", SL, "skill", "让 Agent 用前端能力写网页幻灯：风格预设 + 动画模式说明", dict(license="MIT", **P),
    ["P-slides"], ["topic"], ["html"], ["agent-llm"], "en", ["slides"], "网页幻灯 → 路线⑥ 需要时改写成 deck.md",
    ["设计感网页演示"], "风格预设丰富、上手快", NO, "路线④：Agent 里装 skill"),
  S("Unclecheng-li/AI-Animation-Skill", SL, "skill", "科普文本 → HTML 演示动画（26 个 PPT 模板 + 14 个流程图模板），中文", dict(license="MIT", **P),
    ["P-slides"], ["text"], ["html"], ["agent-llm"], "native", ["explainer", "science"], "中文科普 HTML 演示；出视频走路线⑥",
    ["中文科普演示动画"], "少见的中文科普向 skill，流程图模板多", NO, "路线④：Agent 里装 skill", maturity="experimental"),
  S("CRui5in/paper-ppt-agent", SL, "app", "论文 PDF/LaTeX → 可编辑 PPT", AGPL, ["P-slides"], ["text"], ["pptx"], ["api-key"], "native", ["paper"],
    "AGPL：只链接", ["中文论文汇报 PPT"], "直接吃 LaTeX 源", NO, "路线④：需 LLM API"),
  S("johnson7788/MultiAgentPPT", SL, "app", "A2A + MCP 多智能体协作生成 PPT", dict(license="MIT", **P), ["P-slides"], ["topic"], ["pptx"], ["api-key"], "native", ["slides"],
    "多智能体分工参考", ["研究多 Agent 生成 PPT"], "A2A + MCP 架构示范", NO, "路线④：需 LLM API"),
  S("Leo1998-Lu/ai-paper2slide-skill", SL, "skill", "论文 → 会议级幻灯的 Agent skill", dict(license="MIT", **P), ["P-slides"], ["text"], ["html", "pptx"], ["agent-llm"], "en", ["paper"],
    "只链接", ["学术报告幻灯"], "面向会议报告的版式规范", NO, "路线④：Agent 里装 skill", maturity="experimental"),
  S("iOfficeAI/OfficeCLI", SL, "app", "面向 Agent 的 Office 命令行：读写 Word / Excel / PPT", dict(license="Apache-2.0", **P), ["P-slides", "E-edit"], ["pptx"], ["pptx"], ["free-cpu"], "bilingual", ["slides"],
    "Agent 批量改 PPT 的工具", ["批量改课件文字/版式"], "让 Agent 直接操作 Office 文件", NO, "路线④：按 README 安装 CLI"),
  S("lfnovo/open-notebook", SL, "app", "开源版 NotebookLM：资料库 + 播客生成（音频）", dict(license="MIT", **P), ["P-slides"], ["text"], ["audio"], ["free-cpu", "api-key"], "en", ["explainer"],
    "只出音频；配画面走路线⑥", ["资料整理成播客"], "自托管、可接 Ollama", NO, "路线④：Docker 自部署"),
  S("souzatharsis/podcastfy", SL, "library", "开源 NotebookLM 式播客生成", dict(license="Apache-2.0", **P), ["P-slides"], ["text"], ["audio"], ["api-key", "free-cpu"], "en", ["explainer"],
    "只出音频", ["文章转双人播客"], "多人对谈播客生成", NO, "路线④：pip 安装"),
  S("FavioVazquez/showtime", SL, "app", "本地视频工作室（Agent 插件 + MCP）：Kokoro/Piper 配音、词级字幕、CSV→图表、Manim、QA", dict(license="MIT", **P),
    ["P-slides", "C-code-motion"], ["text", "data"], ["mp4"], ["free-cpu"], "en", ["explainer", "data"],
    "CSV → 图表场景的思路对应 slides2video 的 chart 元素（实现自写）", ["数据讲解视频"], "全本地、无云 AI，自带 MCP",
    I("idea", "数据表直接变成动画图表页（实现自写）", "slides2video chart 元素"), "路线④；路线⑥ 用 ```chart 代码块"),
  S("scosman/videowright", SL, "app", "Agent 讲解视频脚手架：Web Component 分段、TTS+STT 词级对齐、Playwright 逐帧确定性渲染", dict(license="MIT", **P),
    ["P-slides", "C-code-motion"], ["text"], ["mp4"], ["free-cpu"], "en", ["explainer"],
    "「换配音只重算时间、不改分段」与 slides2video 一致", ["英文讲解视频"], "确定性逐帧渲染 + 词级对齐",
    I("idea", "换配音时只重算时间轴、画面结构不动（slides2video 的 at 引用天然如此）"), "路线④"),
  S("AIGeeksGroup/PresentAgent", SL, "research", "文档 → 幻灯 → 旁白 → 讲解视频（EMNLP 2025 Demo）", NONE, ["P-slides"], ["text"], ["mp4"], ["api-key"], "en", ["paper"],
    "无许可证：只链接", ["研究参考"], "文档到讲解视频的完整研究原型", NO, "只看不用（无许可证）",
    license_note="2026-10-09 确认仓库没有 LICENSE 文件：默认保留所有权利，只给链接。", maturity="research"),
  S("LSTM-Kirigaya/slidev-ai", SL, "app", "AI 生成 Slidev 幻灯的应用", dict(license="MIT-with-commercial-terms", license_class="source-available", warning="custom-license", commercial_block=True),
    ["P-slides"], ["topic"], ["html"], ["api-key"], "native", ["slides"], "README 称 MIT 附加商业条款：按非标准许可对待，只链接",
    ["AI 写 Slidev"], "中文、直接产出 Slidev", NO, "路线④：注意附加商业条款",
    license_note="GitHub 识别为 MIT，但 README 写明附加商业条款；按非标准许可对待，只给链接。", maturity="experimental"),
  S("anthropics/skills", SL, "skill", "Anthropic 官方 skills 合集，含读写 PPTX 的 pptx skill", NONE, ["P-slides", "M-method"], ["pptx"], ["pptx"], ["agent-llm"], "en", ["slides"],
    "pptx skill 为专有条款：只链接", ["Claude 里读写 PPTX"], "官方维护", NO, "Claude 内置使用；不复制",
    license_note="仓库根目录无 LICENSE；pptx skill 自带 LICENSE.txt 为 Anthropic 专有条款。只给链接。"),
  S("scanny/python-pptx", SL, "library", "Python 读写 PPTX 的基础库", dict(license="MIT", **P), ["P-slides"], ["pptx"], ["pptx"], ["free-cpu"], "en", ["slides"],
    "slides2video import 用自写的 OOXML 解析，不依赖它", ["自己写 PPTX 处理脚本"], "最常用的 PPTX Python 库", NO, "`pip install python-pptx`"),
  S("gitbrent/PptxGenJS", SL, "library", "JavaScript 生成 PPTX", dict(license="MIT", **P), ["P-slides"], ["text"], ["pptx"], ["free-cpu"], "en", ["slides"],
    "slides2video export-pptx（下一步）计划用它", ["从脚本生成 PPTX"], "纯 JS、浏览器和 Node 都能用", NO, "`npm i pptxgenjs`"),
  S("Vinlic/WebVideoCreator", SL, "library", "Puppeteer 网页动画 → 视频的国产框架", dict(license="Apache-2.0", **P), ["P-slides", "C-code-motion"], ["html"], ["mp4"], ["free-cpu"], "native", ["explainer"],
    "思路与 animator 浏览器逐帧管线相同", ["网页动画录成视频"], "中文文档", NO, "路线④"),
  S("tungs/timecut", SL, "library", "网页动画确定性逐帧录制（虚拟时间）→ 视频", dict(license="BSD-3-Clause", **P), ["P-slides", "C-code-motion"], ["html"], ["mp4"], ["free-cpu"], "en", ["explainer"],
    "「虚拟时间」思路：slides2video 运行时是时间的纯函数，不需要劫持时钟", ["录制已有网页动画"], "虚拟时间录制的经典实现",
    I("idea", "确定性逐帧：画面只由时间 t 决定（slides2video 运行时直接写成纯函数）"), "路线④"),
  S("prasanaworld/puppeteer-screen-recorder", SL, "library", "Puppeteer 实时录屏插件", dict(license="MIT", **P), ["P-slides"], ["html"], ["mp4"], ["free-cpu"], "en", ["explainer"],
    "实时录屏会掉帧，本仓库用逐帧渲染", ["临时录网页"], "接入简单", NO, "路线④"),
  # ------------------------------------------------------------------ scivis
  S("KaTeX/KaTeX", SC, "library", "网页公式排版，最快", dict(license="MIT", **P), ["P-slides", "C-code-motion"], ["text"], ["html"], ["free-cpu"], "en", ["math", "science"],
    "slides2video 的 $$公式$$ 用它渲染（npm 依赖，字体从 node_modules 加载，不进仓库）", ["物理/数学/化学公式页"], "渲染快、输出稳定，适合逐帧",
    I("dependency", "作为 npm 依赖在渲染时加载（MIT）；KaTeX 字体为 OFL，只从 node_modules 读取，不提交", "slides2video/package.json"), "路线⑥：deck.md 写 `$$ I \\propto 1/\\lambda^4 $$`"),
  S("mathjax/MathJax", SC, "library", "网页公式排版（覆盖更全）", dict(license="Apache-2.0", **P), ["P-slides", "C-code-motion"], ["text"], ["html", "svg"], ["free-cpu"], "en", ["math"],
    "KaTeX 不支持的宏可改用它（本仓库未内置）", ["复杂 LaTeX 宏"], "LaTeX 兼容性最好", NO, "`npm i mathjax`"),
  S("shikijs/shiki", SC, "library", "基于 TextMate 语法的代码高亮", dict(license="MIT", **P), ["P-slides", "C-code-motion"], ["text"], ["html"], ["free-cpu"], "en", ["code", "explainer"],
    "slides2video 的代码块用它预先高亮（npm 依赖）", ["编程教学", "代码讲解"], "和 VS Code 同款高亮",
    I("dependency", "Node 端预高亮成 token（MIT）", "slides2video/lib/code.mjs"), "路线⑥：```js 代码块"),
  S("shikijs/shiki-magic-move", SC, "library", "代码块之间平滑变形（Slidev 同款），已归档", dict(license="MIT", **P), ["P-slides"], ["text"], ["html"], ["free-cpu"], "en", ["code"],
    "思路：slides2video 自写了行级 diff 变形", ["代码前后对比"], "token 级变形效果最好",
    I("idea", "相邻两页同 id 代码块的变形；本仓库做的是简化的行级 diff（自写）", "slides2video/runtime/slides.js"), "路线⑥：两页代码块写同一个 id", maturity="archived"),
  S("code-hike/codehike", SC, "library", "Markdown + React 的代码讲解组件", dict(license="MIT", **P), ["C-code-motion"], ["text"], ["html"], ["free-cpu"], "en", ["code"],
    "Remotion 代码讲解时用", ["长篇代码讲解"], "注解、聚焦、滚动讲解", NO, "路线③", license_source="license"),
  S("pomber/code-surfer", SC, "library", "MDX Deck 的代码幻灯动画", dict(license="MIT", **P), ["C-code-motion"], ["text"], ["html"], ["free-cpu"], "en", ["code"],
    "已停更", ["历史参考"], "代码逐步高亮", NO, "只作参考", license_source="license"),
  S("mermaid-js/mermaid", SC, "library", "文本 → 流程图、时序图、思维导图等", dict(license="MIT", **P), ["P-slides", "C-code-motion"], ["text"], ["svg"], ["free-cpu"], "bilingual", ["diagram", "explainer"],
    "slides2video 的 ```mermaid 代码块渲染成 SVG 后逐笔描出（npm 依赖）", ["流程、因果链、分类结构"], "文本写图，Agent 最容易生成",
    I("dependency", "浏览器端渲染 SVG（MIT），描边动画自写", "slides2video/runtime/slides.js"), "路线⑥：```mermaid 代码块"),
  S("d2lang/d2", SC, "app", "文本 → 图，多 board 可导动画 SVG", dict(license="MPL-2.0", license_class="copyleft"), ["C-code-motion"], ["text"], ["svg"], ["free-cpu"], "en", ["diagram"],
    "MPL-2.0：作为外部 CLI 调用即可", ["架构图", "复杂图示"], "排版引擎好看", NO, "`d2 in.d2 out.svg` → 当图片放进 deck",
    license_note="MPL-2.0（文件级 copyleft）；作为外部命令行调用，不复制代码。"),
  S("markmap/markmap", SC, "library", "Markdown → 思维导图（可逐级展开）", dict(license="MIT", **P), ["C-code-motion"], ["text"], ["svg", "html"], ["free-cpu"], "bilingual", ["explainer", "book"],
    "思维导图导出 SVG 后可放进 deck", ["拆书结构图", "知识框架"], "Markdown 就是导图", NO, "`npx markmap-cli x.md`"),
  S("penrose/penrose", SC, "library", "数学记号 → 示意图", dict(license="MIT", **P), ["C-code-motion"], ["text"], ["svg"], ["free-cpu"], "en", ["math"],
    "集合、几何关系示意图", ["集合论/几何概念图"], "用数学语言描述、自动排版", NO, "导出 SVG 放进 deck"),
  S("apache/echarts", SC, "library", "图表库，入场/更新动画丰富，中文生态最好", dict(license="Apache-2.0", **P), ["C-code-motion", "P-slides"], ["data"], ["svg", "html"], ["free-cpu"], "native", ["data", "chart"],
    "slides2video 的柱/线图是自写 SVG（更轻）；复杂图表可改用 ECharts", ["数据可视化", "财报/排行榜"], "图表类型最全",
    NO, "路线③：HyperFrames/Remotion 里使用"),
  S("chartjs/Chart.js", SC, "library", "轻量 Canvas 图表（带动画）", dict(license="MIT", **P), ["C-code-motion"], ["data"], ["html"], ["free-cpu"], "en", ["data", "chart"],
    "只链接", ["简单图表"], "轻、上手快", NO, "路线③", license_source="LICENSE.md"),
  S("d3/d3", SC, "library", "数据可视化底层库", dict(license="ISC", **P), ["C-code-motion"], ["data"], ["svg"], ["free-cpu"], "en", ["data", "chart"],
    "只链接", ["定制可视化"], "什么都能画", NO, "路线③"),
  S("vizzuhq/vizzu-lib", SC, "library", "图表之间自动补间（柱 → 饼 → 散点）的数据故事库", dict(license="Apache-2.0", **P), ["C-code-motion", "P-slides"], ["data"], ["html"], ["free-cpu"], "en", ["data", "chart"],
    "「数据版 Morph」参考；slides2video 目前只做同类型图表的生长", ["数据故事", "同一组数据换视角"], "图表类型之间的平滑变形独一份", NO, "路线③"),
  S("juliangarnier/anime", SC, "library", "JS 动画引擎：时间轴、SVG 描边、变形", dict(license="MIT", **P), ["C-code-motion"], ["svg"], ["html"], ["free-cpu"], "en", ["explainer"],
    "只链接", ["网页动画"], "API 简洁、时间轴强", NO, "路线③", license_source="LICENSE.md"),
  S("greensock/GSAP", SC, "library", "JS 动画引擎（时间轴、MorphSVG 等插件）", dict(license="GSAP-Standard", license_class="source-available", warning="custom-license"),
    ["C-code-motion"], ["svg"], ["html"], ["free-cpu"], "en", ["explainer"], "HyperFrames 的常用搭档；本仓库不复制源码",
    ["复杂网页动画"], "业界最成熟的网页动画库", NO, "路线③：作为依赖使用",
    license_note="仓库没有 LICENSE 文件；以官网「标准无偿许可」为准（非 OSI）。只作依赖，不复制源码。"),
  S("liabru/matter-js", SC, "library", "2D 刚体物理：碰撞、抛体、单摆", dict(license="MIT", **P), ["C-code-motion"], ["text"], ["html"], ["free-cpu"], "en", ["science", "physics"],
    "物理演示（抛体、碰撞）用", ["中学物理演示"], "真实物理模拟，结果可复现", NO, "路线③"),
  S("reymond-group/smilesDrawer", SC, "library", "SMILES → 分子结构式", dict(license="MIT", **P), ["C-code-motion"], ["text"], ["svg"], ["free-cpu"], "en", ["science", "chemistry"],
    "化学结构式导出 SVG 放进 deck", ["化学科普"], "一行 SMILES 出规范结构式", NO, "导出 SVG → deck 图片", license_source="LICENSE.md"),
  S("3dmol/3Dmol.js", SC, "library", "WebGL 分子 3D 显示", dict(license="BSD-3-Clause", **P), ["C-code-motion"], ["text"], ["html"], ["free-cpu"], "en", ["science", "chemistry"],
    "只链接", ["蛋白质/分子结构展示"], "浏览器里看 3D 分子", NO, "路线③",
    license_note="GitHub 显示 NOASSERTION；2026-10-09 读 LICENSE 原文为 BSD-3-Clause。"),
  S("UnMolDeQuimica/manim-Chemistry", SC, "library", "Manim 化学插件：分子、周期表、轨道", dict(license="MIT", **P), ["C-code-motion"], ["text"], ["mp4"], ["free-cpu"], "en", ["science", "chemistry"],
    "Manim 路线的化学扩展", ["化学动画讲解"], "分子/轨道可直接动画", NO, "路线③：`pip install manim-chemistry`", license_source="LICENSE.md"),
  S("Matheart/manim-physics", SC, "library", "Manim 物理插件：电磁场、刚体、波、光学", NONE, ["C-code-motion"], ["text"], ["mp4"], ["free-cpu"], "en", ["science", "physics"],
    "无许可证：只链接", ["物理动画"], "物理场可视化", NO, "只看不复制",
    license_note="2026-10-09 确认仓库没有 LICENSE 文件（pyproject 未声明），默认保留所有权利。"),
  S("stevenpetryk/mafs", SC, "library", "React 交互数学图形（函数、向量）", dict(license="MIT", **P), ["C-code-motion"], ["text"], ["html"], ["free-cpu"], "en", ["math"], "只链接", ["函数图像"], "交互式函数图", NO, "路线③"),
  S("unconed/mathbox", SC, "library", "WebGL 演示级数学图形", dict(license="MIT", **P), ["C-code-motion"], ["text"], ["html"], ["gpu"], "en", ["math"], "只链接", ["三维数学可视化"], "演示级 3D 数学图", NO, "路线③", license_source="LICENSE.md"),
  S("veltman/flubber", SC, "library", "SVG 形状之间平滑变形", dict(license="MIT", **P), ["C-code-motion"], ["svg"], ["svg"], ["free-cpu"], "en", ["explainer"], "只链接", ["图形变形"], "任意形状插值", NO, "路线③"),
  S("Wing900/ManimCat", SC, "app", "中文 AI 数学教学动画（Manim + matplotlib）", dict(license="MIT+AGPL-3.0", license_class="copyleft"), ["C-code-motion"], ["topic"], ["mp4"], ["api-key"], "native", ["math"],
    "混合许可：只链接与借鉴", ["中文数学动画"], "中文数学教学向", NO, "路线④：需 LLM API",
    license_note="LICENSE 写明源码级混合许可：部分 MIT、部分 AGPL-3.0（见其 LICENSE_POLICY.md）。只链接。"),
  S("qnguyen3/STEMViz", SC, "app", "STEM 概念 → 带旁白的 Manim 动画", dict(license="PUND-1.0", license_class="noncommercial", warning="noncommercial", commercial_block=True),
    ["C-code-motion"], ["topic"], ["mp4"], ["api-key"], "en", ["science"], "「个人使用、禁止分发」许可：只链接", ["个人学习"], "STEM 一键动画", NO, "只看不用于发布",
    license_note="LICENSE 为 Personal Use, No Distribution License (PUND) v1.0：仅个人使用、禁止分发。", maturity="experimental"),
  # ------------------------------------------------------------------ voice / alignment
  S("hexgrad/kokoro", VO, "model", "Kokoro-82M：小而快的开源 TTS（含 v1.1 中文音色）", dict(license="Apache-2.0", **P), ["A-handdrawn", "P-slides", "S-stills"], ["text"], ["audio"], ["free-cpu"], "bilingual", ["tts", "explainer"],
    "animator / stills2video / slides2video 默认配音就是它（经 sherpa-onnx 运行，权重按 sha256 下载，不进仓库）", ["所有需要免费本地中文配音的题材"], "CPU 实时、音质够用、Apache-2.0 可商用",
    I("dependency", "模型经 sherpa-onnx 调用（权重下载到 ~/.cache/hda-models）", "animator/tts/tts_local.py"), "`cd animator && npm run setup:tts`"),
  S("k2-fsa/sherpa-onnx", VO, "library", "离线语音推理库：TTS / ASR，CPU 友好", dict(license="Apache-2.0", **P), ["A-handdrawn", "P-slides"], ["text", "audio"], ["audio"], ["free-cpu"], "bilingual", ["tts"],
    "本仓库本地配音的推理后端（pip 依赖）", ["离线配音"], "跨平台、无需 GPU", I("dependency", "pip 依赖，运行 Kokoro/Melo", "animator/tts/requirements.txt"), "`npm run setup:tts` 自动安装"),
  S("SYSTRAN/faster-whisper", VO, "library", "更快的 Whisper 语音识别，带词级时间戳", dict(license="MIT", **P), ["A-handdrawn", "P-slides", "E-edit"], ["audio"], ["srt"], ["free-cpu"], "bilingual", ["tts", "subtitle"],
    "本仓库用它把 TTS 音频对齐到字级（可选）", ["字幕对齐", "口播转字幕"], "CPU 也够快，词级时间戳",
    I("dependency", "可选 pip 依赖，用于字级对齐", "animator/tts/tts_local.py"), "`npm run setup:tts` 自动安装"),
  S("m-bain/whisperX", VO, "library", "Whisper + 强制对齐，词级时间戳更准，带说话人分离", dict(license="BSD-2-Clause", **P), ["E-edit"], ["audio"], ["srt"], ["gpu", "free-cpu"], "en", ["subtitle"],
    "只链接", ["长音频精准字幕"], "强制对齐精度高", NO, "`pip install whisperx`"),
  S("rany2/edge-tts", VO, "library", "调用微软 Edge 在线 TTS，带逐词边界", dict(license="LGPL-3.0", license_class="copyleft", warning="unofficial-api"), ["A-handdrawn", "P-slides"], ["text"], ["audio", "srt"], ["free-cpu"], "native", ["tts"],
    "animator 的 --engine edge 可选调用（pip 安装，不随仓库分发）；在线非官方接口，商用前自行确认", ["需要更自然中文音色时的草稿配音"], "中文音色自然、有词边界",
    I("dependency", "可选外部 pip 包，按需调用", "animator/tools/tts_edge.py"), "`pip install edge-tts` 后 `--engine edge`",
    license_note="LICENSE 原文：srt_composer.py 为 MIT，其余 LGPL-3.0（GitHub 显示 NOASSERTION）。调用的是微软在线服务的非官方用法。"),
  S("QwenAudio/CosyVoice", VO, "model", "多语言语音生成与声音克隆（中文强）", dict(license="Apache-2.0", **P), ["B-videogen"], ["text", "audio"], ["audio"], ["gpu"], "native", ["tts"],
    "声音克隆只用本人或授权声音；本仓库未内置", ["高质量中文配音", "本人声音克隆"], "中文自然度高、支持零样本克隆", NO, "路线④：按 README 部署（建议 GPU）",
    id="cosyvoice"),
  S("index-tts/index-tts", VO, "model", "B 站开源的工业级 TTS（情感、时长可控）", dict(license="bilibili-Model-Use", license_class="source-available", warning="model-license", commercial_block=True),
    ["B-videogen"], ["text", "audio"], ["audio"], ["gpu"], "native", ["tts"], "模型使用协议有限制：商用前读原文", ["影视配音级中文 TTS"], "时长可控，适合对口型",
    NO, "路线④", license_note="LICENSE 为 bilibili Model Use License Agreement（模型使用协议，非 OSI），商用条件以原文为准。"),
  S("SWivid/F5-TTS", VO, "model", "流匹配 TTS，零样本声音克隆", dict(license="MIT", **P), ["B-videogen"], ["text", "audio"], ["audio"], ["gpu"], "bilingual", ["tts"],
    "代码 MIT；预训练权重许可另看（本次未核验）", ["研究 / 本人声音克隆"], "零样本克隆效果好", NO, "路线④",
    license_note="代码 MIT；预训练权重的许可本次未核验，使用前查看模型卡。"),
  # ------------------------------------------------------------------ i2v gap
  S("Anil-matcha/Open-Generative-AI", "pipeline", "app", "开源的多模型生成工作台：图、视频、口型等在一个界面里调用", dict(license="MIT", **P), ["B-videogen", "S-stills"], ["text", "image"], ["mp4", "image"], ["api-key"], "en", ["any"],
    "云端 API 聚合界面；本仓库 videogen 有同类适配器", ["想在一个界面里试多家模型"], "模型覆盖广、MIT", NO, "路线④：按 README 部署，填各家 key", id="open-generative-ai"),
]


def main():
    reg = json.loads(REG.read_text(encoding="utf-8"))
    have = {e["repo"].lower() for e in reg["entries"]}
    for c in CATS:
        if c["id"] not in {x["id"] for x in reg["categories"]}:
            reg["categories"].append(c)
    reg["vocab"]["routes"].update(ROUTE)
    todo = [e for e in NEW if e["repo"].lower() not in have]
    live = fetch([e["repo"] for e in todo]) if todo else {}
    ids = {e["id"] for e in reg["entries"]}
    for e in todo:
        info = live.get(e["repo"])
        if not info:
            print("!! 无法访问，跳过", e["repo"]); continue
        if info["name"] != e["repo"]:
            e["repo"] = info["name"]; e["url"] = f"https://github.com/{info['name']}"
        e.update(stars=info["stars"], pushed=info["pushed"], archived=info["archived"])
        e.setdefault("license_source", info["license_source"] or "LICENSE")
        if not e.get("license_source"):
            e["license_source"] = info["license_source"] or "LICENSE"
        if e["license"] == "NONE":
            e["license_source"] = "none (no LICENSE file)"
        if info["archived"]:
            e["maturity"] = "archived"
        while e["id"] in ids:
            e["id"] += "-x"
        ids.add(e["id"])
        reg["entries"].append(e)
        print("+", e["repo"], e["pushed"], e["license"])
    reg["checked_at"] = TODAY
    freshness.apply(reg)
    REG.write_text(json.dumps(reg, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"新增 {len(todo)} 条，共 {len(reg['entries'])} 条；{reg['freshness']['counts']}")


if __name__ == "__main__":
    main()
