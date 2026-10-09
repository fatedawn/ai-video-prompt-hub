#!/usr/bin/env python3
"""One-shot: add the "only stills → video" gap list (research report §4) to catalog/registry.json.

Adds the route `S-stills` and two categories (stillmotion 静图动效, polish 补帧放大).
Live stars / dates / LICENSE paths come from the GitHub GraphQL API (gh, helpers reused from add_20261009.py);
every licence below was read from the repository's LICENSE text on 2026-10-09. Intros and notes are our own words.
Idempotent: existing repos are skipped.
"""
import json, sys, pathlib

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from add_20261009 import fetch, entry, REG, TODAY  # noqa: E402

NC = dict(license_class="noncommercial", warning="noncommercial", commercial_block=True)
NONE = dict(license="NONE", license_class="none", warning="no-license", commercial_block=True,
            license_note="2026-10-09 确认仓库根目录没有 LICENSE / COPYING：默认保留所有权利，只能看和自用，本仓库只给链接、不复制任何内容。")
GPU_MODEL = dict(category="models", kind="model", routes=["B-videogen", "S-stills"], input=["image", "text"], output=["mp4"], cost=["gpu"], use_for=["open-model"])

NEW = [
  # ---- 本地 GPU 图生视频：底座 / 模板 / 加速 ----
  entry(id="comfyui", repo="Comfy-Org/ComfyUI", category="models", kind="engine", license="GPL-3.0", license_class="copyleft",
        license_note="已读 LICENSE：GPL-3.0。本仓库只通过它的 HTTP API（/prompt、/history、/view）把它当外部程序调用，不复制、不链接它的代码。",
        intro_zh="节点式本地生成底座；Wan2.2 I2V / FLF2V、LTX、FramePack 等都有官方或社区工作流",
        routes=["B-videogen", "S-stills"], input=["image", "text"], output=["mp4", "image"], cost=["gpu"], zh="en", maturity="active", use_for=["open-model", "any"],
        plugs_into="stills2video --backend comfyui 与 videogen --provider comfyui 都走它的 HTTP API；工作流用 API 格式导出，节点标题写 $prompt.text / $image.image 即可自动绑定"),
  entry(id="comfy-workflow-templates", repo="Comfy-Org/workflow_templates", category="models", kind="template", license="MIT", license_class="permissive",
        intro_zh="ComfyUI 官方工作流模板源文件：Wan2.2 5B/14B 图生视频、首尾帧、LTX 等",
        routes=["B-videogen", "S-stills"], input=["image", "text"], output=["mp4"], cost=["gpu"], zh="en", use_for=["open-model"],
        plugs_into="stills2video/workflows/wan22_14b_*_4step.json 由它的 MIT 模板改写成 API 格式（见 LICENSES/ 与 NOTICE）；LTX 模板因模型许可不同没有内置"),
  entry(id="wanvideowrapper", repo="kijai/ComfyUI-WanVideoWrapper", license="Apache-2.0", license_class="permissive",
        intro_zh="Wan 系列的进阶 ComfyUI 节点：block swap 换块省显存、长视频、首尾帧、各种控制",
        zh="en", plugs_into="12–16GB 卡跑 14B 时在 ComfyUI 里换用它的节点；导出 API 工作流后用 stills2video --workflow 指定", **GPU_MODEL),
  entry(id="lightx2v", repo="ModelTC/LightX2V", license="Apache-2.0", license_class="permissive",
        intro_zh="Wan2.1/2.2、HunyuanVideo-1.5 的加速推理框架：4 步蒸馏、量化、offload，README 写明 14B 可在 8GB 显存 + 16GB 内存运行",
        zh="bilingual", plugs_into="stills2video --backend lightx2v 生成 python -m lightx2v.infer 命令（设 LIGHTX2V_DIR/LIGHTX2V_MODEL 加 --run 才真跑）", **GPU_MODEL),
  entry(id="freevideo", repo="FlashML-org/FreeVideo", license="Apache-2.0", license_class="permissive",
        license_note="软件 Apache-2.0；它运行的 MiniMax H3 权重是 MiniMax H3 Community License（排除欧盟/英国/韩国/美国，营收门槛另需授权），出片前读模型许可。",
        warning="model-license",
        intro_zh="桌面一键包，本地跑 MiniMax H3（首帧 / 首尾帧 / 参考图，带原生音频），README 写 8GB 显存 + 16GB 内存",
        zh="bilingual", plugs_into="网页式手动后端：stills2video export 导出镜头包 → 在 FreeVideo 里逐镜生成 → import 收回", **GPU_MODEL),
  entry(id="ltx-desktop", repo="Lightricks/LTX-Desktop", license="Apache-2.0", license_class="permissive", license_source="LICENSE.txt",
        license_note="App 为 Apache-2.0；LTX 模型权重是 LTX Community License（商用有营收门槛等条件），以模型许可原文为准。",
        warning="model-license",
        intro_zh="LTX 官方桌面 App，本地图生视频（带音频），README 要求本地生成 ≥16GB 显存",
        zh="en", plugs_into="16GB+ 的手动后端：stills2video export 镜头包，按 S01_shot01 命名导出后 import", **GPU_MODEL),
  entry(id="framepack-studio", repo="FP-Studio/framepack-studio", license="Apache-2.0", license_class="permissive",
        intro_zh="FramePack 增强版：F1、视频续写、首尾帧、任务队列；README 最低 8GB（建议 16GB+）",
        zh="en", plugs_into="单图慢动作长镜头（呼吸、飘发、慢推）；镜头包导出/收回同 FramePack", **GPU_MODEL),
  entry(id="framepack-wrapper", repo="kijai/ComfyUI-FramePackWrapper", license="Apache-2.0", license_class="permissive",
        intro_zh="把 FramePack 放进 ComfyUI 的节点，可和其他工作流串起来",
        zh="en", plugs_into="在 ComfyUI 里用 FramePack，导出 API 工作流给 stills2video --workflow", **GPU_MODEL),
  entry(id="comfyui-gguf", repo="city96/ComfyUI-GGUF", category="models", kind="library", license="Apache-2.0", license_class="permissive",
        intro_zh="让 ComfyUI 加载 GGUF 量化模型，Wan2.2-14B 等大模型可以塞进 12–16GB 显卡",
        routes=["B-videogen", "S-stills"], input=["image", "text"], output=["mp4"], cost=["gpu"], zh="en", use_for=["open-model"],
        plugs_into="12GB 档把 stills2video 工作流里的 UNETLoader 换成 UnetLoaderGGUF（12GB 是否够用官方未给数字，未核验）"),
  entry(id="hunyuanvideo-1-5", repo="Tencent-Hunyuan/HunyuanVideo-1.5", license="Tencent-Hunyuan-Community", license_class="source-available",
        license_note="已读 LICENSE：Tencent Hunyuan Community License，明确不适用于欧盟、英国、韩国；另有使用政策。权重不随本仓库分发。",
        warning="custom-license", commercial_block=True,
        intro_zh="轻量高质的图生视频模型（480p 蒸馏版 8–12 步），README 最低约 14GB（offload）",
        zh="bilingual", plugs_into="备选模型；地区限制内的用户可经 Wan2GP / ComfyUI 使用，stills2video 不内置它的工作流", **GPU_MODEL),
  entry(id="ltx-2", repo="Lightricks/LTX-2", license="LTX-2-Community", license_class="source-available",
        license_note="已读 LICENSE：分 LTX-2（2026-01-05）与 LTX-2.x（2026-08-11）两份社区许可，商用有条件。本仓库不提供 LTX 工作流和权重。",
        warning="custom-license", commercial_block=True,
        intro_zh="LTX-2.3/2.5 官方推理包，本地最快的开源图生视频之一（第三方评测约为 Wan2.2-14B 的 5 倍速）",
        zh="en", plugs_into="自己导出 LTX 的 ComfyUI API 工作流，节点标题写 $image.image / $prompt.text，用 stills2video --workflow 调用", **GPU_MODEL),
  entry(id="comfyui-ltxvideo", repo="Lightricks/ComfyUI-LTXVideo", license="LTX-2-Community", license_class="source-available",
        license_note="已读 LICENSE：LTX-2 Community License Agreement（2026-01-05），不是 OSI 开源许可。",
        warning="custom-license", commercial_block=True,
        intro_zh="LTX 官方 ComfyUI 节点",
        zh="en", plugs_into="同 LTX-2：用户自己的工作流 + stills2video --workflow；本仓库不内置", **GPU_MODEL),
  entry(id="minimax-h3", repo="MiniMax-AI/MiniMax-H3", license="MiniMax-H3-Community", license_class="source-available", license_source="README → huggingface.co/MiniMaxAI/MiniMax-H3/LICENSE",
        license_note="GitHub 仓库根目录没有 LICENSE；README 指向 Hugging Face 上的 MiniMax H3 Community License：排除欧盟/英国/韩国/美国，营收超门槛需另行授权，商用需标注。",
        warning="custom-license", commercial_block=True,
        intro_zh="33B 开放权重音视频模型，支持首尾帧；消费级显卡要靠 FreeVideo / Wan2GP",
        zh="bilingual", plugs_into="云端用 videogen 的 minimax 适配器（--backend cloud:minimax），本地用 FreeVideo 手动往返", **GPU_MODEL),
  entry(id="minimax-h3-director", repo="AIMixer/ComfyUI_MiniMaxH3_Director", license="Apache-2.0", license_class="permissive",
        license_note="节点代码 Apache-2.0；它调用的 H3 权重另受 MiniMax H3 Community License 约束。",
        intro_zh="ComfyUI 多段 H3 导演节点，把长片拆段生成",
        zh="native", plugs_into="长镜头分段的参考思路；导出 API 工作流后可用 stills2video --workflow", **GPU_MODEL),
  entry(id="wan2gp-colab", repo="Square-Zero-Labs/Wan2GP-on-Colab", category="models", kind="template", license="Apache-2.0", license_class="permissive",
        license_note="笔记本本身 Apache-2.0；Wan2GP 软件是 WanGP Community License，Colab 配额与政策需自查。",
        intro_zh="在 Colab 上跑 Wan2GP 的笔记本，没有显卡时的临时备胎",
        routes=["B-videogen", "S-stills"], input=["image", "text"], output=["mp4"], cost=["gpu", "web-manual"], zh="en", use_for=["open-model"],
        plugs_into="用 stills2video --backend wan2gp 生成 settings JSON，上传到 Colab 里的 Wan2GP 执行"),
  entry(id="maestro-wangp", repo="Blizaine/Maestro", license="WanGP-NC-Eval-1.1", **NC,
        license_note="已读 LICENSE：基于 WanGP，采用 WanGP Non-Commercial Evaluation License 1.1，软件仅限非商用；生成结果的使用条件见原文。",
        intro_zh="基于 WanGP 的本地「导演模式」MV / 长片工作室",
        category="models", kind="app", routes=["B-videogen"], input=["image", "text"], output=["mp4"], cost=["gpu"], zh="en", use_for=["open-model", "music-mv"],
        plugs_into="只作链接参考，本仓库不复制任何内容"),
  entry(id="painter-i2v", repo="princepainter/ComfyUI-PainterI2V", **NONE,
        intro_zh="修 Wan2.2 4 步加速 LoRA「动作变慢」问题的图生视频节点",
        category="models", kind="library", routes=["B-videogen"], input=["image", "text"], output=["mp4"], cost=["gpu"], zh="native", use_for=["open-model"],
        plugs_into="只给链接；stills2video 的 4 步工作流用官方节点，没有引用它"),
  entry(id="wan22-fmlf", repo="wallen0322/ComfyUI-Wan22FMLF", **NONE,
        intro_zh="Wan2.2 首 / 中 / 尾多关键帧控制节点",
        category="models", kind="library", routes=["B-videogen"], input=["image"], output=["mp4"], cost=["gpu"], zh="en", use_for=["open-model"],
        plugs_into="只给链接；本仓库的首尾帧过渡用官方 WanFirstLastFrameToVideo 节点"),
  entry(id="hunyuanvideo-i2v", repo="Tencent-Hunyuan/HunyuanVideo-I2V", license="Tencent-Hunyuan-Community", license_class="source-available", license_source="LICENSE.txt",
        license_note="已读 LICENSE.txt：Tencent Hunyuan Community License，不适用于欧盟、英国、韩国。README 写 720p 最低 60GB、推荐 80GB。",
        warning="custom-license", commercial_block=True, maturity="stable",
        intro_zh="混元图生视频官方版，显存门槛 60–80GB，个人卡不现实，仅作参考",
        zh="bilingual", plugs_into="个人用户改用 HunyuanVideo-1.5 或 Wan2GP；本仓库不内置", **GPU_MODEL),
  # ---- 静图动效（CPU / 2.5D / Ken Burns / 动态照片）----
  entry(id="depthflow", repo="BrokenSource/DepthFlow", category="stillmotion", kind="engine", license="AGPL-3.0", license_class="copyleft", license_source="license.txt",
        license_note="已读 license.txt：AGPL-3.0。本仓库 stills2video 只借鉴其参数思路（视差高度/焦平面/等距/推拉），代码完全自写，未复制。",
        intro_zh="单图 → 2.5D 深度视差运镜（推、摇、环绕、无缝循环），GPU OpenGL 渲染，可脚本批量",
        routes=["S-stills", "C-code-motion"], input=["image"], output=["mp4"], cost=["gpu", "free-cpu"], zh="en", use_for=["any", "explainer"],
        plugs_into="想要 GPU 实时视差就用它本体；本仓库 stills2video --backend cpu 是独立实现的 CPU 版（深度模型 + numpy 反向映射）"),
  entry(id="depthflow-nodes", repo="akatz-ai/ComfyUI-Depthflow-Nodes", category="stillmotion", kind="library", license="AGPL-3.0", license_class="copyleft",
        intro_zh="把 DepthFlow 视差运镜放进 ComfyUI 工作流",
        routes=["S-stills"], input=["image"], output=["mp4"], cost=["gpu"], zh="en", use_for=["any"],
        plugs_into="在 ComfyUI 里批量视差；导出 API 工作流后可用 stills2video --workflow 调用（作为外部程序，不复制代码）"),
  entry(id="3d-photo-inpainting", repo="vt-vl-lab/3d-photo-inpainting", category="stillmotion", kind="research", license="MIT", license_class="permissive",
        license_note="已读 LICENSE：MIT（GitHub 显示 NOASSERTION）。代码较老，依赖 CUDA 时代的 PyTorch。",
        intro_zh="3D 照片：分层深度 + 背景补全，生成摆动 / 推镜视频（CVPR 2020 学术代码）",
        routes=["S-stills"], input=["image"], output=["mp4"], cost=["gpu"], zh="en", maturity="research", use_for=["any"],
        plugs_into="stills2video 的「边缘拉伸代替补全」是它分层补全思路的轻量替代；需要真补全时可单独跑它再 import"),
  entry(id="depth-anything-v2", repo="DepthAnything/Depth-Anything-V2", category="stillmotion", kind="model", license="Apache-2.0", license_class="permissive",
        license_note="代码 Apache-2.0；权重 Small 为 Apache-2.0，Base/Large/Giant 为 CC-BY-NC-4.0（非商用）。本仓库只下载 Small（onnx-community 转换版），不提交权重。",
        intro_zh="单目深度估计，Small 版 25M 参数，CPU 上 0.3 秒一张",
        routes=["S-stills"], input=["image"], output=["image"], cost=["free-cpu"], zh="en", use_for=["any"],
        plugs_into="stills2video 的默认深度模型：npm run setup:depth 下载 Small ONNX 并校验 sha256 → onnxruntime CPU 推理"),
  entry(id="depth-anything-3", repo="ByteDance-Seed/Depth-Anything-3", category="stillmotion", kind="model", license="Apache-2.0", license_class="permissive",
        license_note="代码 Apache-2.0；各尺寸权重许可以 Hugging Face 模型卡为准（部分为非商用），本次未逐个核验。",
        intro_zh="Depth Anything 第三代：深度 + 相机位姿 + 多视图几何",
        routes=["S-stills"], input=["image"], output=["image"], cost=["gpu", "free-cpu"], zh="en", use_for=["any"],
        plugs_into="可导出深度图 PNG，用 stills2video 镜头的 \"depth\": \"<文件>\" 字段直接喂给 CPU 视差渲染"),
  entry(id="3d-cinemagraphy", repo="xingyi-li/3d-cinemagraphy", category="stillmotion", kind="research", license="Apache-2.0", license_class="permissive", license_source="License",
        intro_zh="单图 → 流水 / 云动的 3D 动态照片（CVPR 2023 学术代码）",
        routes=["S-stills"], input=["image"], output=["mp4"], cost=["gpu"], zh="en", maturity="research", use_for=["any"],
        plugs_into="stills2video 的 flow（远景漂移 / 波纹）是 CPU 上的简化版动态照片；要真流体运动可单独跑它"),
  entry(id="kburns", repo="remko/kburns", category="stillmotion", kind="library", license="MIT", license_class="permissive", maturity="stable",
        intro_zh="极简 ffmpeg Ken Burns 幻灯片脚本（老但能用）",
        routes=["S-stills", "C-code-motion"], input=["image"], output=["mp4"], cost=["free-cpu"], zh="en", use_for=["any"],
        plugs_into="stills2video 借鉴了它「先放大再裁切防抖」的思路（自写实现，见 docs/i2v-对比.md）"),
  entry(id="3d-ken-burns", repo="sniklaus/3d-ken-burns", category="stillmotion", kind="research", license="CC-BY-NC-SA-4.0", **NC,
        license_note="已读 LICENSE：CC BY-NC-SA 4.0，非商用。本仓库不复制任何内容，只给链接。",
        intro_zh="单图 3D Ken Burns 经典实现（深度 + 补全 + 相机路径）",
        routes=["S-stills"], input=["image"], output=["mp4"], cost=["gpu"], zh="en", maturity="research", use_for=["any"],
        plugs_into="只作链接；商用请用 stills2video --backend cpu（Apache-2.0，自写）"),
  # ---- 补帧 / 超分 ----
  entry(id="practical-rife", repo="hzwer/Practical-RIFE", category="polish", kind="library", license="MIT", license_class="permissive",
        intro_zh="RIFE 补帧的实用版：16fps 图生视频 → 32/48/60fps",
        routes=["S-stills", "E-edit"], input=["video"], output=["mp4"], cost=["gpu", "free-cpu"], zh="en", use_for=["edit"],
        plugs_into="stills2video polish 优先调用 rife-ncnn-vulkan 二进制；用 Python 版时先补帧再 import"),
  entry(id="rife-ncnn-vulkan", repo="nihui/rife-ncnn-vulkan", category="polish", kind="app", license="MIT", license_class="permissive", maturity="stable",
        intro_zh="RIFE 的 ncnn + Vulkan 版，A 卡 / 集显也能补帧，单个可执行文件",
        routes=["S-stills", "E-edit"], input=["video"], output=["mp4"], cost=["free-cpu", "gpu"], zh="en", use_for=["edit"],
        plugs_into="stills2video polish --interp 2：检测到 rife-ncnn-vulkan（PATH 或 RIFE_BIN）就用它，否则退回 ffmpeg minterpolate"),
  entry(id="comfyui-frame-interpolation", repo="Fannovel16/ComfyUI-Frame-Interpolation", category="polish", kind="library", license="MIT", license_class="permissive",
        intro_zh="ComfyUI 里的 RIFE / FILM 等补帧节点",
        routes=["S-stills", "B-videogen"], input=["video"], output=["mp4"], cost=["gpu"], zh="en", use_for=["edit"],
        plugs_into="可直接接在 stills2video 的 Wan 工作流 VAEDecode 后面再导出 API 工作流"),
  entry(id="real-esrgan", repo="xinntao/Real-ESRGAN", category="polish", kind="library", license="BSD-3-Clause", license_class="permissive", maturity="stable",
        intro_zh="经典图像 / 视频超分，480p → 1080p；有 ncnn-vulkan 单文件版",
        routes=["S-stills", "E-edit"], input=["video", "image"], output=["mp4", "image"], cost=["free-cpu", "gpu"], zh="en", use_for=["edit"],
        plugs_into="stills2video polish --upscale 2：检测到 realesrgan-ncnn-vulkan（PATH 或 REALESRGAN_BIN）就逐帧超分，否则 lanczos 放大"),
  entry(id="seedvr2-upscaler", repo="numz/ComfyUI-SeedVR2_VideoUpscaler", category="polish", kind="library", license="Apache-2.0", license_class="permissive",
        intro_zh="SeedVR2 视频超分 ComfyUI 节点，时序一致性比逐帧 ESRGAN 好",
        routes=["S-stills", "B-videogen"], input=["video"], output=["mp4"], cost=["gpu"], zh="en", use_for=["edit"],
        plugs_into="24GB 档的终版超分；在 ComfyUI 里处理后用 stills2video import 收回（显存需求未核验）"),
  entry(id="video2x", repo="k4yt3x/video2x", category="polish", kind="app", license="AGPL-3.0", license_class="copyleft",
        intro_zh="超分 + 补帧一体的 CLI / GUI（Real-ESRGAN、RIFE 等后端，Vulkan）",
        routes=["S-stills", "E-edit"], input=["video"], output=["mp4"], cost=["free-cpu", "gpu"], zh="en", use_for=["edit"],
        plugs_into="作为外部程序处理成片即可（AGPL：自用无碍，改造后对外提供服务需开源）"),
  entry(id="real-video-enhancer", repo="TNTwise/REAL-Video-Enhancer", category="polish", kind="app", license="AGPL-3.0", license_class="copyleft",
        intro_zh="Win / Linux / Mac 的补帧 + 超分图形界面",
        routes=["S-stills", "E-edit"], input=["video"], output=["mp4"], cost=["free-cpu", "gpu"], zh="en", use_for=["edit"],
        plugs_into="不想用命令行时的外部 GUI；处理完的镜头按 S01_shot01.mp4 命名后 stills2video import"),
  entry(id="waifu2x-extension-gui", repo="AaronFeng753/Waifu2x-Extension-GUI", category="polish", kind="app", license="Personal-Use-Only", **NC,
        license_note="已读 LICENSE：免费版仅限个人使用，商用需购买 Premium。本仓库只给链接。",
        intro_zh="Windows 上的超分 / 补帧图形界面合集",
        routes=["E-edit"], input=["video", "image"], output=["mp4"], cost=["gpu"], zh="bilingual", use_for=["edit"],
        plugs_into="只作链接；商用场景用 Real-ESRGAN / rife-ncnn-vulkan"),
  # ---- 剪辑库 / 叠层 ----
  entry(id="moviepy", repo="Zulko/moviepy", category="engine", kind="library", license="MIT", license_class="permissive", license_source="LICENCE.txt", maturity="stable",
        intro_zh="Python 剪辑库，自己写 Ken Burns、拼接、叠字幕最方便",
        routes=["S-stills", "C-code-motion"], input=["image", "video"], output=["mp4"], cost=["free-cpu"], zh="en", use_for=["any"],
        plugs_into="stills2video 直接用 numpy + ffmpeg 管道，不依赖它；写自定义 Python 后处理时可选"),
  entry(id="tsparticles", repo="tsparticles/tsparticles", category="engine", kind="library", license="MIT", license_class="permissive",
        intro_zh="网页粒子库：雪、尘埃、萤火、星空、彩带",
        routes=["S-stills", "C-code-motion"], input=["text"], output=["html"], cost=["free-cpu"], zh="en", use_for=["any"],
        plugs_into="HyperFrames / Remotion 里做粒子叠层；stills2video 用的是 animator 自带 canvas 特效 + numpy 粒子"),
  # ---- Agent / Skill / 平台 ----
  entry(id="comfyui-mcp-panel", repo="artokun/comfyui-mcp-panel", category="mcp", kind="mcp", license="MIT", license_class="permissive",
        intro_zh="ComfyUI 侧边面板，让 Claude 或 ChatGPT 订阅里的 Agent 直接驱动本地 ComfyUI",
        routes=["B-videogen", "S-stills"], input=["text", "image"], output=["mp4", "image"], cost=["gpu", "agent-llm"], zh="en", use_for=["mcp"],
        plugs_into="和 stills2video 互补：Agent 在面板里调工作流，批量出片仍可用 stills2video render --backend comfyui"),
  entry(id="gbro-collage-broll", repo="pyang5166/gbro-collage-broll", category="agentvideo", kind="skill", license="MIT", license_class="permissive",
        intro_zh="半调纸拼贴风 B-roll Agent skill，首尾帧组装（生成走 Gemini API）",
        routes=["S-stills", "C-code-motion"], input=["script", "image"], output=["mp4"], cost=["api-key", "agent-llm"], zh="native", use_for=["explainer", "repo-promo"],
        plugs_into="风格方法可参考；本仓库 B-roll 配方库（stills2video/recipes/broll.json）是自写的"),
  entry(id="super-video-maker-skill", repo="Bomx/super-video-maker-skill", category="agentvideo", kind="skill", **NONE,
        intro_zh="OpenAI 出图 + FFmpeg 运动 + Remotion/HyperFrames 的 Agent skill（带付费调用闸门）",
        routes=["S-stills", "C-code-motion"], input=["script"], output=["mp4"], cost=["api-key", "agent-llm"], zh="en", use_for=["explainer"],
        plugs_into="只给链接；本仓库同类功能见 stills2video（Apache-2.0）"),
  entry(id="comfyui-workflow-skill", repo="LingyiChen-AI/comfyui-workflow-skill", category="agentvideo", kind="skill", **NONE,
        intro_zh="自然语言 → ComfyUI 工作流 JSON 的 Agent skill",
        routes=["B-videogen"], input=["text"], output=["project"], cost=["agent-llm", "gpu"], zh="native", use_for=["any"],
        plugs_into="只给链接；stills2video 的工作流是从 MIT 官方模板改写的"),
  entry(id="typetale", repo="TypeTale/TypeTale", category="pipeline", kind="app", **NONE,
        intro_zh="字字动画：小说推文 / AI 短剧，ComfyUI + Wan2.2 + IndexTTS2 配音",
        routes=["B-videogen"], input=["novel", "script"], output=["mp4"], cost=["gpu"], zh="native", use_for=["novel-adapt", "short-drama"],
        plugs_into="只给链接，不复制任何内容"),
  entry(id="story-flicks", repo="alecm20/story-flicks", category="pipeline", kind="app", **NONE, maturity="stable",
        intro_zh="故事 → 图片 + 配音 + 字幕短片（走 OpenAI / 阿里云 / 硅基流动 API，2025-03 后未更新）",
        routes=["B-videogen"], input=["story"], output=["mp4"], cost=["api-key"], zh="native", use_for=["story", "picture-book"],
        plugs_into="只给链接；本仓库同类流程：ChatGPT 出图 → stills2video make"),
  entry(id="hypit", repo="hypit-ai/hypit", category="pipeline", kind="platform", license="Apache-2.0-modified", license_class="source-available",
        license_note="已读 LICENSE：修改版 Apache 2.0，多租户服务、对外提供其功能等情形需商业授权。",
        warning="custom-license", commercial_block=True,
        intro_zh="偏「复刻爆款视频」的生成平台，与「静图 → 视频」关系较远",
        routes=["B-videogen"], input=["video", "text"], output=["mp4"], cost=["api-key"], zh="en", use_for=["ad", "product"],
        plugs_into="只作备注链接"),
]

ROUTE_EXTRA = {
    "lllyasviel/FramePack": "stills2video export 导出镜头包、FramePack 生成后 import 收回",
    "deepbeepmeep/Wan2GP": "stills2video --backend wan2gp 写 settings JSON 交给 wgp.py --process",
    "Wan-Video/Wan2.2": "stills2video --backend comfyui 内置 Wan2.2 14B 图生视频 / 首尾帧 4 步工作流",
    "harry0703/MoneyPrinterTurbo": "stills2video 借鉴了它的亚像素缩放与图片清洗思路（MIT，自写实现）",
    "mifi/editly": "stills2video 借鉴了它的缓动曲线与 zoomDirection 参数思路（MIT，自写实现）",
}

def main():
    reg = json.loads(REG.read_text(encoding="utf-8"))
    reg["vocab"]["routes"].setdefault("S-stills", "静图成片：图片 → 视差 / 图生视频 → 配音字幕成片（本仓库 stills2video 及同类）")
    ids = {c["id"] for c in reg["categories"]}
    for c in [{"id": "stillmotion", "name_zh": "静图动效（2.5D 视差 · Ken Burns · 动态照片）"}, {"id": "polish", "name_zh": "补帧放大（插帧 · 超分）"}]:
        if c["id"] not in ids:
            reg["categories"].append(c)
    have = {e["repo"].lower() for e in reg["entries"]}
    new = [e for e in NEW if e["repo"].lower() not in have]
    info = fetch([e["repo"] for e in new]) if new else {}
    for e in new:
        inf = info.get(e["repo"]) or {}
        if not inf:
            raise SystemExit(f"lookup failed: {e['repo']}")
        e["stars"], e["pushed"], e["archived"] = inf["stars"], inf["pushed"], inf["archived"]
        e.setdefault("license_source", inf["license_source"] or "(no LICENSE file)")
        if inf["archived"]:
            e["maturity"] = "archived"
        reg["entries"].append(e)
        print("added", e["repo"], e["stars"], e["license"], e["license_source"])
    # existing entries that stills2video drives directly also get the S-stills route
    for e in reg["entries"]:
        if e["repo"] in ROUTE_EXTRA and "S-stills" not in e["routes"]:
            e["routes"].append("S-stills")
            e["plugs_into"] = e["plugs_into"].rstrip("。") + "；" + ROUTE_EXTRA[e["repo"]]
    REG.write_text(json.dumps(reg, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print("entries", len(reg["entries"]), "categories", len(reg["categories"]))

if __name__ == "__main__":
    main()
