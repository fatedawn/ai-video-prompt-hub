#!/usr/bin/env python3
"""Fill the "use-for map" fields of every ACTIVE catalog entry: best_for / strengths / absorbed / how_to_use.

Hand-written values (from add_*.py or OVERRIDES below) win; anything still missing is derived from our own
fields (use_for tags, category, routes, cost, intro_zh, plugs_into — all written by this repo, never a README).
`use_map` records which: "hand" or "derived". Stale entries keep whatever they have (not required).
Idempotent. Original work for ai-video-prompt-hub, Apache-2.0, © 2026 天机.
"""
import json, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
REG = ROOT / "catalog" / "registry.json"

TAG = {  # use_for tag → 题材/场景（中文，具体）
    "explainer": "知识科普 / 口播讲解", "drama": "漫剧 / 短剧剧情", "story": "故事短片", "product": "产品带货 / 种草",
    "open-model": "本地 GPU 生成镜头", "talking-head": "口播 / 数字人讲解", "repo-promo": "GitHub 仓库推荐", "any": "通用（任何题材的底座）",
    "launch": "产品发布片", "edit": "成片剪辑 / 后期", "picture-book": "儿童绘本", "math": "数理推导 / 公式讲解", "novel-adapt": "小说改编",
    "kids": "儿童内容", "vlog": "vlog / 空镜头", "mcp": "让 Agent 通过 MCP 调用", "clip": "长视频切片", "data": "数据故事 / 图表",
    "poem": "诗词国学", "book": "拆书 / 读书分享", "recap": "影视解说 / 复盘", "ad": "广告片", "prompt-library": "找提示词参考",
    "short-drama": "真人短剧", "music-mv": "音乐 MV", "xianxia": "仙侠玄幻", "ecommerce": "电商详情 / 带货", "romance": "甜宠恋爱",
    "pipeline": "一条龙出片平台", "fight": "打戏 / 动作", "comedy": "搞笑段子", "urban": "都市逆袭", "suspense": "悬疑推理",
    "wuxia": "武侠", "whiteboard": "白板讲解", "courseware": "课件 / 微课", "slides": "PPT 式成片", "science": "科学科普（物理化学生物）",
    "paper": "论文解读", "formula": "公式讲解", "chart": "图表动画", "code": "编程教学 / 代码讲解", "diagram": "流程图 / 结构图",
    "chemistry": "化学结构", "physics": "物理演示", "tts": "配音", "subtitle": "字幕对齐",
}
ROUTE_ZH = {"A-handdrawn": "路线① animator", "B-videogen": "路线② videogen", "C-code-motion": "路线③ 代码动效", "M-method": "方法论 skill",
            "E-edit": "剪辑后期", "S-stills": "路线⑤ stills2video", "P-slides": "路线⑥ slides2video"}
COST_ZH = {"free-cpu": "免费 CPU 可跑", "gpu": "需要自己的显卡", "api-key": "需要 API key", "web-manual": "网页端手动", "agent-llm": "用编程 Agent 的额度"}

# what this repo took from a project (keep in step with NOTICE.md / ATTRIBUTION.md)
ABSORBED = {
    "alchaincyf/huashu-art-motion": ("port", "50 种转场、35 个风格配方、后期层与风格化渲染器（MIT 原样移植，见 animator/vendor/huashu-art-motion/VENDOR.md）；slides2video 页间转场也用它", "animator/vendor/huashu-art-motion"),
    "gnipbao/story-to-handdrawn-video": ("port", "297 条手绘画风配方文字（MIT）", "animator/presets/handdrawn-styles.json"),
    "Comfy-Org/workflow_templates": ("port", "Wan2.2 14B 图生视频 / 首尾帧工作流，改写为 API 格式（MIT）", "stills2video/workflows/"),
    "geeklee/srt-whiteboard-animation": ("idea", "每个画面元素绑定到字幕事件（c3:词 时间引用的来源），自写实现", "animator/src/project.mjs"),
    "alexgreensh/anidoodle": ("idea", "代码画材逐笔作画的思路，自写实现", "animator/src/runtime/"),
    "HKUDS/ViMax": ("idea", "角色在项目级声明一次、逐镜复用", "animator characters"),
    "HBAI-Ltd/Toonflow-app": ("idea", "角色资产一次声明、逐镜引用（另有 MIT 模板文字收录于 templates/）", "animator characters / templates/"),
    "harry0703/MoneyPrinterTurbo": ("idea", "亚像素缩放、EXIF/CMYK 图片清洗", "stills2video"),
    "mifi/editly": ("idea", "缓动曲线、zoomDirection/zoomAmount 参数", "stills2video"),
    "remko/kburns": ("idea", "先放大再裁切防抖的 Ken Burns", "stills2video"),
    "AIDC-AI/Pixelle-Video": ("idea", "用 ComfyUI 节点标题绑定参数", "stills2video/lib/backends"),
    "lllyasviel/FramePack": ("idea", "按显存切换模式", "stills2video/lib/hardware.mjs"),
    "DepthAnything/Depth-Anything-V2": ("dependency", "Small 模型（Apache-2.0）按 sha256 下载做深度视差；预处理参数参考其实现", "stills2video/py"),
    "BrokenSource/DepthFlow": ("idea", "视差高度 / 焦平面 / 推拉变焦等参数概念（AGPL，只取思路、完全重写）", "stills2video/py"),
    "calesthio/OpenMontage": ("idea", "出片前「防幻灯片」检查（AGPL，只取思路，规则自写）", "stills2video lint"),
    "deepbeepmeep/Wan2GP": ("idea", "按显存档位给预设（自定义许可，只取思路）", "stills2video/lib/hardware.mjs"),
    "Agents365-ai/video-podcast-maker": ("idea", "脚本验收：一句一口气、约 280 字/分钟估时长、数字和专名单独校对（写进科普脚本方法）", "skills/ai-video-director/references/methods.md"),
    "rough-stuff/rough-notation": ("idea", "手绘圈注 / 下划线 / 高亮标注，slides2video 自写实现", "slides2video/runtime/slides.js（mark）"),
    "Comfy-Org/ComfyUI": ("dependency", "只通过 HTTP API 当外部程序调用（GPL，不复制代码）", "stills2video / videogen comfyui 后端"),
    "heygen-com/hyperframes": ("none", "路线③ 推荐的外部引擎；本仓库给出命令，不含其代码"),
    "nihui/rife-ncnn-vulkan": ("dependency", "polish 自动检测用户自装的二进制", "stills2video polish"),
    "xinntao/Real-ESRGAN": ("dependency", "polish 自动检测用户自装的 realesrgan-ncnn-vulkan", "stills2video polish"),
}

# hand-written best_for / strengths for important existing entries (own words)
OVERRIDES = {
    "openmontage": (["复杂多步骤的 Agent 视频生产", "需要大量现成管线的工作室"], "管线和工具数量最多的 Agent 视频系统，覆盖从研究到成片"),
    "brag": (["GitHub 仓库推荐", "自己项目的发布短片"], "一条命令把刚做完的项目变成带配乐和分享文案的发布片"),
    "jianying-editor-skill": (["口播 / vlog 剪辑", "要交付剪映草稿"], "直接驱动剪映，产物是可继续手改的草稿"),
    "3b1b-manim": (["数理推导 / 公式讲解", "几何与函数的连续变换"], "3Blue1Brown 原版，数学动画表现力的天花板"),
    "manimcommunity-manim": (["数理推导 / 公式讲解", "物理/算法讲解"], "文档、插件和社区最完善的 Manim 版本，适合让 Agent 写代码"),
    "hyperframes": (["仓库推荐 / 产品发布", "图表与字幕重的讲解"], "写 HTML 就能确定性渲染 MP4，Apache-2.0，Agent 友好"),
    "motion-canvas": (["代码讲解 / 技术科普"], "生成器时间轴 + 实时编辑器，代码动画写起来顺手（MIT）"),
    "remotion": (["数据视频", "批量模板化短视频"], "React 写视频、生态最大；注意 Remotion License 的公司门槛"),
    "moviepy": (["自己写脚本拼接剪辑"], "Python 剪辑最方便的库"),
    "srt-whiteboard-animation": (["白板讲解", "拆书 / 科普"], "元素按字幕事件出场、笔迹连续，讲解节奏感强"),
    "huashu-art-motion": (["艺术风格解说片", "诗词 / 发布片"], "35 种艺术风格 + 50 种转场全部 Canvas 代码画，风格跨度最大"),
    "story-to-handdrawn-video": (["儿童绘本", "手绘日记漫画"], "画风配方库最全（297 种），擦除揭示的绘本感强"),
    "vox-director": (["Vox 风拼贴解说", "广告片"], "一句话主题直出拼贴解说片，配乐配音字幕全自动"),
    "anidoodle": (["手绘过程片", "绘本 / 发布片"], "31 种画材全用代码画，「一笔一笔画出来」的过程感好"),
    "toonflow-app": (["漫剧 / 短剧量产"], "无限画布 + Agent + 角色三视图，短剧工厂化"),
    "vimax": (["小说改编成视频", "剧情短片"], "Idea/Script/Novel → Video 三种入口的研究型全流程"),
    "moneyprinterturbo": (["素材库拼接口播", "批量知识短视频"], "主题到成片全自动，素材来自免费实拍库，上手门槛最低"),
    "pixelle-video": (["全自动短视频", "故事短片"], "ComfyUI 驱动的全自动短视频引擎，模块可替换"),
    "comfyui": (["本地 GPU 生成任何镜头"], "节点式底座，几乎所有开源视频模型都先在这里落地"),
    "wan22": (["本地图生视频 / 文生视频"], "Apache-2.0 权重、社区工作流最多的开源视频模型"),
    "ltx-2": (["本地快速图生视频"], "开源图生视频里最快的一档（有社区许可条件）"),
    "depthflow": (["单图 2.5D 运镜", "空镜头"], "GPU 实时视差，参数化运镜和无缝循环"),
    "depth-anything-v2": (["给任意图片估深度"], "小模型 CPU 也快，2.5D 视差的基础"),
    "video-podcast-maker": (["视频播客 / 知识口播"], "中文脚本验收规则细（多音字、语速），主题到成片一条龙"),
    "video-talkcraft": (["口播二创 / 字级卡点动效"], "字级时间戳驱动的「反 PPT」镜头系统"),
    "anything2explainer": (["英文主题解说片"], "多 agent 并行出镜头组件，黑底解说风格统一（非商用许可）"),
    "excalidraw": (["手绘风白板图"], "手绘白板事实标准，生态最大"),
    "excalidraw-animate": (["手绘图逐笔动画"], "把 Excalidraw 图直接变成描线动画"),
    "shuohao-skills": (["小说改编短剧", "分集剧本"], "改编五件套 + 质量门脚本，流程最规范"),
    "drama-skills": (["漫剧 / 短剧全流程"], "11 个 skill 覆盖原著分析到审查"),
    "manju-laoli-skill": (["仙侠 / 打戏漫剧"], "文武双模分镜 + 七段式提示词 + 微表情"),
    "short-drama": (["真人短剧剧本"], "13 种题材模板、钩子与付费卡点设计"),
    "narratoai": (["影视解说", "素材配解说"], "中文解说流水线：配解说、字幕、切片一起做"),
    "autoclip": (["直播 / 口播切片"], "中文长视频自动切短"),
    "funclip": (["口播 / 访谈粗剪"], "按识别文本和说话人剪辑，像剪文档一样剪视频"),
    "pyjianyingdraft": (["脚本批量生成剪映草稿"], "用 Python 写剪映草稿，后续可人工精修"),
    "video2x": (["老视频 / 生成视频放大补帧"], "超分 + 补帧一体的 CLI"),
    "practical-rife": (["16fps 生成片补到 60fps"], "RIFE 补帧的实用版本"),
    "prompts-chat": (["找通用提示词"], "全球最大的提示词库之一，CC0 数据"),
    "video-shotcraft": (["电影感产品宣传片"], "镜头配方卡 + 动效预览 + Remotion 模板"),
    "remotion-dev-skills": (["让 Agent 写 Remotion"], "官方维护的 Remotion 最佳实践 skill"),
    "html-video": (["文章 / 仓库 → 视频"], "贴链接就能出程序化视频，模板多"),
    "minimax-mcp": (["Agent 调海螺视频 / 配音"], "MiniMax 官方 MCP，语音克隆和视频一站式"),
}


def derive(e):
    tags = [t for t in e.get("use_for", []) if t != "any"] or e.get("use_for", [])
    best = [TAG.get(t, t) for t in tags][:4]
    first = (e.get("intro_zh") or "").split("；")[0].split("。")[0]
    q = [COST_ZH[c] for c in e.get("cost", [])[:1] if c in COST_ZH]
    if e.get("zh") == "native":
        q.append("中文原生")
    strengths = first + ("（" + "、".join(q) + "）" if q else "")
    return best, strengths


def how(e):
    routes = [ROUTE_ZH[r] for r in e.get("routes", []) if r in ROUTE_ZH]
    head = (routes[0] if routes else "路线④ 外部项目")
    plug = (e.get("plugs_into") or "").strip()
    return f"{head}：{plug}" if plug else f"{head}：打开 {e['url']} 按其 README 使用"


def main():
    reg = json.loads(REG.read_text(encoding="utf-8"))
    n_hand = n_der = 0
    for e in reg["entries"]:
        if e["repo"] in ABSORBED:  # credits apply even when the project later went stale
            t, w, *where = ABSORBED[e["repo"]]
            e["absorbed"] = {"type": t, "what": w, "where": where[0] if where else ""}
        if e.get("status") != "active":
            continue
        # idempotent: an entry stays "hand" once written by hand (OVERRIDES / add_* scripts); derived ones are re-derived
        hand = e.get("use_map") == "hand" or ("use_map" not in e and "best_for" in e and "strengths" in e)
        if not hand and e.get("use_map") == "derived":
            for k in ("best_for", "strengths", "how_to_use"):
                e.pop(k, None)
        if e["id"] in OVERRIDES:
            e["best_for"], e["strengths"] = list(OVERRIDES[e["id"]][0]), OVERRIDES[e["id"]][1]
            hand = True
        if "best_for" not in e or "strengths" not in e:
            b, s = derive(e)
            e.setdefault("best_for", b)
            e.setdefault("strengths", s)
        e.setdefault("absorbed", {"type": "none", "what": "没有拿代码或思路；作为外部项目推荐", "where": ""})
        e.setdefault("how_to_use", how(e))
        e["use_map"] = "hand" if hand else "derived"
        n_hand += hand
        n_der += not hand
    REG.write_text(json.dumps(reg, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"use-map：手写 {n_hand} 条，按本仓库字段推导 {n_der} 条")


if __name__ == "__main__":
    main()
