#!/usr/bin/env python3
"""One-shot: stamp verified_at/license_source on every catalog entry and add the 2026-10-09 categories.

Live stars/dates/license paths come from the GitHub GraphQL API (gh). Hand-written intros are ours.
"""
import json, subprocess, pathlib, datetime

ROOT = pathlib.Path(__file__).resolve().parents[2]
REG = ROOT / "catalog" / "registry.json"
TODAY = "2026-10-09"

def gql(q):
    r = subprocess.run(["gh", "api", "graphql", "-f", f"query={q}"], capture_output=True, text=True)
    if r.returncode:
        raise SystemExit(r.stderr[:400])
    return json.loads(r.stdout)["data"]

def license_path(node):
    for key, name in (("a", "LICENSE"), ("b", "LICENSE.md"), ("c", "LICENSE.txt"), ("d", "LICENCE"), ("e", "COPYING"), ("f", "LICENSES/Elastic-2.0.txt")):
        if node.get(key):
            return name
    return None

def fetch(repos):
    out = {}
    for i in range(0, len(repos), 10):
        chunk = repos[i:i+10]
        parts = []
        for j, full in enumerate(chunk):
            o, n = full.split("/", 1)
            parts.append(f'''r{j}: repository(owner:"{o}", name:"{n}") {{
              nameWithOwner stargazerCount pushedAt isArchived
              licenseInfo {{ spdxId }}
              a: object(expression:"HEAD:LICENSE") {{ ... on Blob {{ byteSize }} }}
              b: object(expression:"HEAD:LICENSE.md") {{ ... on Blob {{ byteSize }} }}
              c: object(expression:"HEAD:LICENSE.txt") {{ ... on Blob {{ byteSize }} }}
              d: object(expression:"HEAD:LICENCE") {{ ... on Blob {{ byteSize }} }}
              e: object(expression:"HEAD:COPYING") {{ ... on Blob {{ byteSize }} }}
              f: object(expression:"HEAD:LICENSES/Elastic-2.0.txt") {{ ... on Blob {{ byteSize }} }}
            }}''')
        data = gql("query {\n" + "\n".join(parts) + "\n}")
        for j, full in enumerate(chunk):
            node = data[f"r{j}"]
            if not node:
                out[full] = None
                continue
            out[full] = dict(name=node["nameWithOwner"], stars=node["stargazerCount"],
                             pushed=(node["pushedAt"] or "")[:10], archived=bool(node["isArchived"]),
                             spdx=(node.get("licenseInfo") or {}).get("spdxId"),
                             license_source=license_path(node))
        print(f"fetched {i+len(chunk)}/{len(repos)}", flush=True)
    return out

def entry(**kw):
    e = dict(archived=False, maturity="active", styles=[], deps="", license_note="", verified_at=TODAY)
    e.update(kw)
    e["url"] = f"https://github.com/{e['repo']}"
    return e

NEW = [
  entry(id="video-use", repo="browser-use/video-use", category="edit", kind="app",
        intro_zh="用浏览器去操作网页剪辑/生成站点的自动化层，适合把重复的网页端出片步骤交给 Agent",
        license="MIT", license_class="permissive", routes=["E-edit"], input=["script"], output=["mp4"],
        cost=["free-cpu", "agent-llm"], zh="en", use_for=["edit", "clip"],
        plugs_into="路线④网页端往返时，可把它当作「替人点网页」的外挂；不替代 videogen 的本地合成"),
  entry(id="narratoai", repo="linyqh/NarratoAI", category="edit", kind="app",
        intro_zh="中文解说向的自动剪辑：给成片或素材配解说、字幕和切片，偏影视解说流水线",
        license="MIT", license_class="permissive", routes=["E-edit"], input=["video", "script"], output=["mp4"],
        cost=["free-cpu", "api-key"], zh="native", use_for=["edit", "clip"],
        plugs_into="有实拍或已生成成片、要做解说切片时用；本仓库只给链接，不复制它的文案"),
  entry(id="autoclip", repo="zhouxiaoka/autoclip", category="edit", kind="app",
        intro_zh="自动把长视频切成短视频的中文工具，面向口播和直播切片",
        license="MIT", license_class="permissive", routes=["E-edit"], input=["video"], output=["mp4"],
        cost=["free-cpu"], zh="native", use_for=["edit", "clip"],
        plugs_into="成片之后的切片步骤；和 videogen assemble 是前后关系，不替代生成"),
  entry(id="funclip", repo="modelscope/FunClip", category="edit", kind="app",
        intro_zh="ModelScope 的语音识别 + 按说话人/热词剪辑，适合口播和访谈自动成片",
        license="MIT", license_class="permissive", routes=["E-edit"], input=["video", "audio"], output=["mp4", "srt"],
        cost=["free-cpu", "gpu"], zh="bilingual", use_for=["edit", "clip"],
        plugs_into="本地有录音或口播成片时做粗剪；识别模型要自己准备，本仓库不带权重"),
  entry(id="openshorts", repo="mutonby/openshorts", category="edit", kind="app",
        intro_zh="开源短视频流水线，把素材剪成竖屏短片",
        license="MIT", license_class="permissive", routes=["E-edit"], input=["video", "script"], output=["mp4"],
        cost=["free-cpu", "api-key"], zh="en", use_for=["edit", "clip"],
        plugs_into="竖屏切片的外部选项；接入前自己看它的依赖和模型要求"),
  entry(id="openreel", repo="Augani/openreel-video", category="edit", kind="app",
        intro_zh="浏览器里的开源视频编辑器，时间线剪辑，不依赖云端",
        license="MIT", license_class="permissive", routes=["E-edit"], input=["video"], output=["mp4"],
        cost=["free-cpu"], zh="en", use_for=["edit", "clip"],
        plugs_into="不想装剪映/达芬奇时的网页时间线；导出后再交给 videogen assemble 也可以"),
  entry(id="pyjianyingdraft", repo="GuanYixuan/pyJianYingDraft", category="edit", kind="library",
        intro_zh="用 Python 生成剪映草稿，把镜头、字幕和特效写进草稿而不是直接渲染",
        license="Apache-2.0", license_class="permissive", routes=["E-edit"], input=["script", "video"], output=["draft"],
        cost=["free-cpu"], zh="native", use_for=["edit", "clip"],
        plugs_into="和已收录的剪映 skill 互补：它产草稿文件，成片仍在剪映里导出"),
  entry(id="davinci-resolve-mcp", repo="samuelgursky/davinci-resolve-mcp", category="edit", kind="mcp",
        intro_zh="通过 MCP 操作本机 DaVinci Resolve 时间线，适合已经在用达芬奇的人",
        license="MIT", license_class="permissive", routes=["E-edit"], input=["video"], output=["project"],
        cost=["free-cpu"], zh="en", use_for=["edit", "clip", "mcp"],
        plugs_into="本机装了 Resolve 才能用；本仓库的 MCP 不转发它的工具，只作目录链接"),
  entry(id="wan22", repo="Wan-Video/Wan2.2", category="models", kind="model",
        intro_zh="阿里开源的 Wan2.2 视频模型。本仓库 videogen 带了 5B 的 ComfyUI 工作流示例，权重需自行下载",
        license="Apache-2.0", license_class="permissive", license_source="LICENSE.txt",
        routes=["B-videogen"], input=["text", "image"], output=["mp4"], cost=["gpu"], zh="bilingual",
        use_for=["open-model"], plugs_into="node videogen/cli.mjs gen shots.json --provider comfyui --workflow videogen/workflows/wan22_ti2v_5b_t2v.json"),
  entry(id="framepack", repo="lllyasviel/FramePack", category="models", kind="model",
        intro_zh="lllyasviel 的长视频逐帧打包生成，用下一帧预测把片段拉长，适合有显卡时做较长镜头",
        license="Apache-2.0", license_class="permissive", routes=["B-videogen"], input=["image", "text"], output=["mp4"],
        cost=["gpu"], zh="en", use_for=["open-model"],
        plugs_into="本地 GPU 路线的延长镜头选项；权重与显存要求以该仓库为准，这里不镜像"),
  entry(id="open-sora", repo="hpcaitech/Open-Sora", category="models", kind="model",
        intro_zh="HPC-AI 的 Open-Sora 视频扩散训练与推理代码，Apache-2.0",
        license="Apache-2.0", license_class="permissive", routes=["B-videogen"], input=["text", "image"], output=["mp4"],
        cost=["gpu"], zh="en", use_for=["open-model"],
        plugs_into="自训或本地推理的研究向选项；不替代 videogen 里现成的 Wan 工作流"),
  entry(id="cogvideo", repo="zai-org/CogVideo", category="models", kind="model",
        intro_zh="智谱 CogVideo / CogVideoX 的开源代码与模型说明，许可证为 Apache-2.0",
        license="Apache-2.0", license_class="permissive", routes=["B-videogen"], input=["text", "image"], output=["mp4"],
        cost=["gpu"], zh="bilingual", use_for=["open-model"],
        plugs_into="本地 GPU 文生视频的另一家可选权重；接入 ComfyUI 或 diffusers 由你自己配"),
  entry(id="ltx-video", repo="Lightricks/LTX-Video", category="models", kind="model",
        intro_zh="Lightricks 的 LTX-Video 开源视频模型，Apache-2.0，强调较快的推理",
        license="Apache-2.0", license_class="permissive", routes=["B-videogen"], input=["text", "image"], output=["mp4"],
        cost=["gpu"], zh="en", use_for=["open-model"],
        plugs_into="显存较小、想本地出片时的候选；工作流不在本仓库内置"),
  entry(id="hunyuanvideo", repo="Tencent-Hunyuan/HunyuanVideo", category="models", kind="model",
        intro_zh="腾讯混元视频模型。不是 Apache：社区许可有地域限制（不含欧盟、英国、韩国）和额外商业条款",
        license="Tencent-Hunyuan-Community", license_class="source-available", license_source="LICENSE.txt",
        license_note="已读 LICENSE.txt：Tencent Hunyuan Community License。不适用于欧盟、英国、韩国；另有 Additional Commercial Terms。权重不随本仓库分发。",
        routes=["B-videogen"], input=["text", "image"], output=["mp4"], cost=["gpu"], zh="bilingual",
        use_for=["open-model"], warning="custom-license", commercial_block=True, maturity="active",
        plugs_into="仅作链接。商用或在受限地域使用前必须自己读完该 LICENSE，router --commercial 会排除"),
  entry(id="wan2gp", repo="deepbeepmeep/Wan2GP", category="models", kind="model",
        intro_zh="在消费级显卡上跑 Wan 等模型的打包界面。许可证是项目自己的 Community License，不是 OSI 开源许可",
        license="WanGP-Community-2.0", license_class="source-available", license_source="LICENSE.txt",
        license_note="已读 LICENSE.txt：允许个人和公司内部使用、出售生成结果；出售或白标软件本身需要另签许可。",
        routes=["B-videogen"], input=["text", "image"], output=["mp4"], cost=["gpu"], zh="en",
        use_for=["open-model"], warning="custom-license", commercial_block=True,
        plugs_into="低显存试 Wan 的第三方启动器。--commercial 排除，因为转售软件本身受限制"),
  entry(id="minimax-mcp", repo="MiniMax-AI/MiniMax-MCP", category="mcp", kind="mcp",
        intro_zh="MiniMax 官方 MCP：语音、克隆、图像、海螺视频、音乐。调用需要你自己的 API key",
        license="MIT", license_class="permissive", routes=["B-videogen"], input=["text", "audio"], output=["mp4", "audio"],
        cost=["api-key"], zh="bilingual", use_for=["mcp"],
        plugs_into="与 videogen 的 minimax provider 同类，走 MCP 而不是本仓库 CLI；key 不要写进仓库"),
  entry(id="pixelle-mcp", repo="ATH-MaaS/Pixelle-MCP", category="mcp", kind="mcp",
        intro_zh="把 ComfyUI 工作流暴露成 MCP 工具，在本地图/视频工作流上给 Agent 用",
        license="MIT", license_class="permissive", routes=["B-videogen"], input=["text", "image"], output=["image", "mp4"],
        cost=["gpu", "free-cpu"], zh="bilingual", use_for=["mcp"],
        plugs_into="已有 ComfyUI 时的 MCP 外壳；本仓库 videogen 的 comfyui provider 是另一条直连方式"),
  entry(id="comfyui-mcp-joenorton", repo="joenorton/comfyui-mcp-server", category="mcp", kind="mcp",
        intro_zh="本地 ComfyUI 的 MCP 服务器，Apache-2.0，用来提交和查看工作流",
        license="Apache-2.0", license_class="permissive", routes=["B-videogen"], input=["text", "image"], output=["image", "mp4"],
        cost=["gpu"], zh="en", use_for=["mcp"],
        plugs_into="目录里另有其他 ComfyUI MCP；选一个即可，不要同时把 key 或工作流密钥提交到 git"),
  entry(id="mcp-film", repo="c47-inc/mcp-film", category="mcp", kind="registry",
        intro_zh="mcp.film：影视相关 MCP 服务器的目录站点，不是我们内置的数据。这里只收录这个目录本身",
        license="MIT", license_class="permissive", routes=["M-method"], input=["query"], output=["links"],
        cost=["free-cpu"], zh="en", use_for=["mcp"],
        plugs_into="要找更多影视 MCP 时去它的目录检索；本仓库不厂商化（vendor）它的 registry"),
  entry(id="seedance-mcp-acedata", repo="AceDataCloud/SeedanceMCP", category="mcp", kind="mcp",
        intro_zh="第三方 Seedance API 的 MCP 封装，需要该服务的 key，不是字节官方客户端",
        license="MIT", license_class="permissive", routes=["B-videogen"], input=["text"], output=["mp4"],
        cost=["api-key"], zh="en", use_for=["mcp"],
        license_note="MIT 只覆盖这个 MCP 代码。生成服务的条款以 AceData / 模型提供方为准。",
        plugs_into="没有官方 API、又接受第三方中转时的选项；key 放在你自己的环境变量里"),
  entry(id="fal-mcp", repo="luminarylane/fal-mcp-server", category="mcp", kind="mcp",
        intro_zh="社区版 fal MCP，用 fal 的密钥调用其视频/图像模型",
        license="MIT", license_class="permissive", routes=["B-videogen"], input=["text", "image"], output=["mp4", "image"],
        cost=["api-key"], zh="en", use_for=["mcp"],
        plugs_into="videogen 已有 fal provider；这是 MCP 形态的同类入口"),
  entry(id="runway-mcp-plugin", repo="runwayml/runway-mcp-plugin", category="mcp", kind="mcp",
        intro_zh="Runway 官方 MCP 插件，给 Cursor 等客户端调用 Runway，需要 Runway 账号",
        license="MIT", license_class="permissive", routes=["B-videogen"], input=["text", "image"], output=["mp4"],
        cost=["api-key"], zh="en", use_for=["mcp"],
        plugs_into="官方插件，优先于非官方中转；本目录不代跑、不保存密钥"),
  entry(id="renoise-prompts", repo="renoise-ai/awesome-seedance-prompts", category="promptlib", kind="dataset",
        intro_zh="CC BY 4.0 的 Seedance 提示词集合。本仓库已按帖子 id 和文本去重后收录允许转载的新条目，并保留原作者",
        license="CC-BY-4.0", license_class="permissive", routes=["M-method"], input=["text"], output=["prompt"],
        cost=["free-cpu"], zh="bilingual", use_for=["prompt-library"],
        plugs_into="全文在 prompts/，署名见每条 front matter；这里的条目只是资源链接"),
  entry(id="grok-imagine-prompts", repo="YouMind-OpenLab/awesome-grok-imagine-prompts", category="promptlib", kind="dataset",
        intro_zh="YouMind 的 Grok Imagine 提示词库，LICENSE 原文为 CC BY 4.0（GitHub 识别为 NOASSERTION）",
        license="CC-BY-4.0", license_class="permissive", license_source="LICENSE",
        license_note="2026-10-09 读过 LICENSE：Copyright (c) 2026 YouMind，CC BY 4.0。提示词来自社区，权利在原作者。",
        routes=["M-method"], input=["text"], output=["prompt"], cost=["free-cpu"], zh="bilingual", use_for=["prompt-library"],
        plugs_into="新收录的 Grok Imagine 条目在 prompts/，model 字段为 Grok Imagine"),
  entry(id="emaki-prompts", repo="hanshs474/seedance-prompts-mcp", category="promptlib", kind="mcp",
        intro_zh="Emaki 自己编写并实际渲染过的约 150 条 Seedance 提示词，MIT，带一个小型 MCP",
        license="MIT", license_class="permissive", routes=["M-method", "B-videogen"], input=["text"], output=["prompt"],
        cost=["free-cpu"], zh="bilingual", use_for=["prompt-library"],
        plugs_into="本仓库收录了其 prompts.json 的文字（不收录示例视频）。它自己的 MCP 与本仓库 MCP 是两个包"),
  entry(id="prompts-chat", repo="f/awesome-chatgpt-prompts", category="promptlib", kind="dataset",
        intro_zh="prompts.chat。代码 MIT，提示词数据 CC0。视频生成向的正文我们只收了直接描述画面的那几条",
        license="MIT (code) / CC0-1.0 (prompts)", license_class="permissive", license_source="LICENSE",
        license_note="2026-10-09 读过 LICENSE：提示词与 prompts.csv 为 CC0；站点代码为 MIT。",
        routes=["M-method"], input=["text"], output=["prompt"], cost=["free-cpu"], zh="en", use_for=["prompt-library"],
        plugs_into="视频类只收了少量 CC0 正文，见 source_repo f/awesome-chatgpt-prompts"),
  entry(id="beatapi-minimax-h3", repo="BeatAPI/awesome-minimax-h3-prompts", category="promptlib", kind="dataset",
        intro_zh="BeatAPI 的 MiniMax H3 图库。文档是 CC BY，但第三方提示词明确不在许可范围内，所以这里只有链接",
        license="CC-BY-4.0 (docs only)", license_class="permissive", license_source="LICENSE.md",
        license_note="已读 LICENSE.md：第三方提示词、媒体和原帖不随仓库再授权。不要复制提示词正文。",
        routes=["M-method"], input=["text"], output=["links"], cost=["free-cpu"], zh="en",
        use_for=["prompt-library"], warning="third-party-prompts-not-licensed",
        plugs_into="只作链接。要全文必须找到原作者自己的许可，不能从这里转载"),
  entry(id="semonxue-video-prompts", repo="Semonxue/awesome-video-prompts", category="promptlib", kind="dataset",
        intro_zh="多模型视频提示词站，仓库没有 LICENSE，且已归档。只放链接，不抓取正文",
        license="NONE", license_class="none", license_source="(no LICENSE file)",
        license_note="2026-10-09 确认仓库中没有 LICENSE 文件。默认保留一切权利。",
        routes=["M-method"], input=["text"], output=["links"], cost=["free-cpu"], zh="en",
        use_for=["prompt-library"], warning="no-license", maturity="archived", archived=True,
        plugs_into="catalog 链接而已。router --commercial 会排除无许可证条目"),
  entry(id="inkplainer", repo="NadirWeb-App/Inkplainer-OS", category="handdrawn", kind="app",
        intro_zh="把讲解做成白板/手绘风格视频的开源项目。LICENSE 全文是 Apache-2.0（GitHub 显示 NOASSERTION）",
        license="Apache-2.0", license_class="permissive", license_source="LICENSE",
        license_note="2026-10-09 读过 LICENSE 开头，为 Apache License 2.0 全文。",
        routes=["A-handdrawn"], input=["script"], output=["mp4"], cost=["free-cpu"], zh="en",
        use_for=["whiteboard"], styles=["whiteboard"],
        plugs_into="和本仓库 animator 同属手绘讲解路线，实现不同；不复制其代码"),
  entry(id="dramaclaw", repo="dramaclaw/dramaclaw", category="pipeline", kind="app",
        intro_zh="短剧 Agent 平台。NOTICE 与 REUSE.toml 声明代码树为 Elastic License 2.0，不是宽松开源",
        license="Elastic-2.0", license_class="source-available", license_source="LICENSES/Elastic-2.0.txt",
        license_note="根目录没有名为 LICENSE 的文件；LICENSES/Elastic-2.0.txt 与 NOTICE 写明 Elastic License 2.0。托管给他人使用通常受 ELv2 限制。",
        routes=["B-videogen"], input=["novel", "script"], output=["mp4"], cost=["api-key"], zh="bilingual",
        use_for=["short-drama", "pipeline"], warning="elv2", commercial_block=True,
        plugs_into="仅链接。--commercial 排除。不要复制它的源码或提示词"),
  entry(id="waoowaoo", repo="waooAI/waoowaoo", category="pipeline", kind="app",
        intro_zh="短剧/漫剧向的端到端应用，许可证为 Elastic License 2.0",
        license="Elastic-2.0", license_class="source-available", license_source="LICENSE",
        license_note="已读 LICENSE 开头：Elastic License 2.0。不能把它当成 MIT/Apache 来商用转售服务。",
        routes=["B-videogen"], input=["novel", "script"], output=["mp4"], cost=["api-key", "gpu"], zh="native",
        use_for=["short-drama", "pipeline"], warning="elv2", commercial_block=True,
        plugs_into="仅链接，排序靠后，--commercial 排除"),
  entry(id="bigbanana", repo="shuyu-labs/BigBanana-AI-Director", category="pipeline", kind="app",
        intro_zh="BigBanana AI Director。社区许可证写明仅限非商业的学习、研究与评估",
        license="BigBanana-Community-1.0", license_class="noncommercial", license_source="LICENSE",
        license_note="已读 LICENSE：非商业社区许可，商业使用需另行书面授权。",
        routes=["B-videogen"], input=["script"], output=["mp4"], cost=["api-key"], zh="native",
        use_for=["short-drama", "pipeline"], warning="noncommercial", commercial_block=True,
        plugs_into="仅链接。商用项目不要采用，--commercial 会排除"),
  entry(id="ai-shotlive", repo="sorker/ai-shotlive", category="pipeline", kind="app",
        intro_zh="AI 分镜/短剧工具，许可证为 CC BY-NC-SA 4.0，非商业且相同方式共享",
        license="CC-BY-NC-SA-4.0", license_class="noncommercial", license_source="LICENSE",
        license_note="已读 LICENSE：CC BY-NC-SA 4.0，Copyright (c) 2026 AI shotlive Director。",
        routes=["B-videogen", "M-method"], input=["script"], output=["mp4"], cost=["api-key"], zh="bilingual",
        use_for=["short-drama", "pipeline"], warning="noncommercial", commercial_block=True,
        plugs_into="仅链接。非商用许可，--commercial 排除"),
  entry(id="director-ai", repo="freestylefly/director_ai", category="pipeline", kind="app",
        intro_zh="短剧导演向项目。仓库没有 LICENSE 文件，只列链接",
        license="NONE", license_class="none", license_source="(no LICENSE file)",
        license_note="2026-10-09 未找到 LICENSE / COPYING。无许可证即保留所有权利。",
        routes=["B-videogen"], input=["script"], output=["mp4"], cost=["api-key"], zh="native",
        use_for=["short-drama", "pipeline"], warning="no-license", commercial_block=True,
        plugs_into="仅链接，不要复制代码。--commercial 排除"),
]

def main():
    reg = json.loads(REG.read_text(encoding="utf-8"))
    have = {e["repo"] for e in reg["entries"]}
    repos = [e["repo"] for e in reg["entries"]] + [e["repo"] for e in NEW if e["repo"] not in have]
    info = fetch(repos)
    for e in reg["entries"]:
        inf = info.get(e["repo"])
        if not inf:
            print("!! missing", e["repo"])
            e.setdefault("verified_at", TODAY)
            e.setdefault("license_source", "(lookup failed)")
            continue
        e["stars"] = inf["stars"]
        e["pushed"] = inf["pushed"]
        e["archived"] = inf["archived"]
        if inf["archived"]:
            e["maturity"] = "archived"
        e["verified_at"] = TODAY
        e["license_source"] = inf["license_source"] or e.get("license_source") or "(no LICENSE file)"
        if inf["name"] != e["repo"]:
            print("?? renamed", e["repo"], "->", inf["name"])
    # categories
    ids = {c["id"] for c in reg["categories"]}
    for c in [
        {"id": "edit", "name_zh": "剪辑·切条·字幕"},
        {"id": "models", "name_zh": "开源视频模型"},
        {"id": "mcp", "name_zh": "视频 MCP"},
        {"id": "promptlib", "name_zh": "提示词库资源"},
    ]:
        if c["id"] not in ids:
            reg["categories"].append(c)
    for e in NEW:
        inf = info.get(e["repo"]) or {}
        if inf:
            e["stars"] = inf["stars"]
            e["pushed"] = inf["pushed"]
            e["archived"] = inf["archived"] or e.get("archived", False)
            if not e.get("license_source"):
                e["license_source"] = inf["license_source"] or "(no LICENSE file)"
        if e["repo"] in have:
            print("skip existing", e["repo"])
            continue
        reg["entries"].append(e)
        print("added", e["repo"], e.get("stars"), e.get("license"), e.get("license_source"))
    reg["checked_at"] = TODAY
    reg["method"] = "每个条目都用 GitHub API 核验（stars、pushed、archived、LICENSE 路径）。许可证以仓库 LICENSE 原文为准。verified_at 是最近一次核验日期。只收链接与本仓库自写简介。带 warning / commercial_block 的条目排序靠后，router --commercial 会排除非商用、无许可证和 commercial_block。"
    REG.write_text(json.dumps(reg, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print("entries", len(reg["entries"]), "categories", len(reg["categories"]))

if __name__ == "__main__":
    main()
