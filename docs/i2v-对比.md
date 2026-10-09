# 只有图片怎么做视频：参考项目对比与取舍

`stills2video/` 开发前，我把下面 19 个开源项目浅克隆到本地，读了源码和 LICENSE 原文（commit 是 2026-10-09 当天的 HEAD），再决定每个项目哪些可以直接移植、哪些只借思路、哪些不碰。许可证的判断规则：

- MIT / Apache / BSD：允许改写复制，保留原版权头，并在 `LICENSES/`、`NOTICE`、`NOTICE.md`、`ATTRIBUTION.md` 和目录内的 `VENDOR.md` 登记；
- GPL / AGPL：不复制任何代码，只借思路，自己从零实现，并注明出处；ComfyUI 只通过 HTTP API 调用；
- 非商用、没有许可证、自定义限制：什么都不复制，最多给个链接；
- 模型权重：一律不进仓库，只在文档里写明各自的许可。

结论先说：**真正复制进仓库的第三方代码只有 Comfy-Org 的两个 MIT 工作流 JSON**（改写后放在 `stills2video/workflows/`）。CPU 渲染器、分镜解析、后端选择、补帧调度、配方全部是本仓库原创代码（Apache-2.0）。

## 一、横向对比

| 项目 | 许可 | 擅长什么 | 我们拿了什么 | 没拿什么，为什么 |
|---|---|---|---|---|
| [Comfy-Org/workflow_templates](https://github.com/Comfy-Org/workflow_templates) `8be1f8c` | MIT | 官方维护的 ComfyUI 工作流，Wan2.2 14B I2V / FLF2V 带 4 步 LightX2V LoRA，参数经过验证 | **移植**：`video_wan2_2_14B_i2v.json`、`video_wan2_2_14B_flf2v.json` → 转成 API 格式，参数换成 `{{占位符}}`（见 `workflows/VENDOR.md`） | LTX-2 模板：模型是 LTX 社区许可（商用有条件），不默认提供，改为教用户用 `$标题` 绑定自己的工作流 |
| [BrokenSource/DepthFlow](https://github.com/BrokenSource/DepthFlow) `bb85e20` | **AGPL-3.0** | 单张图 + 深度图 → GLSL 实时视差，预设丰富（dolly、orbit、zoom、vertigo），质量很高 | **只借思路**：「焦平面 + 视差强度 + 运镜曲线」三个参数的划分方式、预设种类（推拉、环绕、希区柯克变焦）。`py/motion.py` 是从零写的 numpy 反向映射，算法和代码结构都不同 | 代码一行不碰（AGPL）；它要 GPU / OpenGL，我们的目标是纯 CPU |
| [vt-vl-lab/3d-photo-inpainting](https://github.com/vt-vl-lab/3d-photo-inpainting) `de04467` | MIT | 分层深度图 + 遮挡区域补全，能做真正的 3D 照片 | 读后决定用「深度先膨胀再模糊，前景边缘拉伸」代替遮挡补全，没有复制代码 | 依赖 PyTorch + CUDA，单张处理要几分钟，不适合「没显卡」这一档 |
| [DepthAnything/Depth-Anything-V2](https://github.com/DepthAnything/Depth-Anything-V2) `a561b84` | 代码 Apache-2.0；Small 权重 Apache-2.0；Base/Large CC-BY-NC-4.0 | 单目深度估计里质量和速度兼顾最好的之一 | 预处理约定（518 短边、ImageNet 均值方差）；运行时下载 onnx-community 的 Small ONNX，校验 sha256 | Base / Large 权重是非商用许可，不用；不引入 PyTorch |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) `6007797` | MIT | 一键「主题 → 文案 → 素材 → 配音字幕 → 成片」，用户量大 | 只借思路：Ken Burns 缩放前先放大以避免亚像素抖动；读图时处理 EXIF 方向和 CMYK | 素材来源是图库视频，和「自己的静图」不是同一个问题；合成我们已有 videogen |
| [mifi/editly](https://github.com/mifi/editly) `dc46674` | MIT | 声明式 JSON 剪辑，Ken Burns `zoomDirection` / `zoomAmount`、缓动曲线 | 只借思路：运镜用 `preset + amount + ease` 声明，缓动曲线集合 | 依赖 headless-gl / canvas 原生模块，安装麻烦；合成交给 ffmpeg |
| [remko/kburns](https://github.com/remko/kburns) `a3a4bf2` | MIT | 纯 ffmpeg 滤镜做 Ken Burns 幻灯片 | 只借思路：先放大再裁切，防止抖动 | 只有平面缩放没有深度，我们把它保留为 `kenburns` 预设（平面插画、文字图用） |
| [ATH-MaaS/Pixelle-Video](https://github.com/ATH-MaaS/Pixelle-Video) `848b054` | Apache-2.0 | 基于 ComfyUI 的短视频流水线，用节点标题 `$name.input` 绑定参数，可以换任意工作流 | 只借思路：`$prompt.text` / `$image.image` 式标题绑定（videogen 的 `bindTitles` 自己实现） | 其余部分和我们的 videogen 重复 |
| [lllyasviel/FramePack](https://github.com/lllyasviel/FramePack) `97fe5db` | Apache-2.0 | 6GB 显存就能跑长时长图生视频，按空闲显存自动切换高 / 低显存模式 | 只借思路：按空闲显存分档；网页手动后端可以导出给它的 Gradio 界面 | 不嵌入（体积大，依赖 CUDA）；作为外部工具在 catalog 和档位表里推荐 |
| [deepbeepmeep/Wan2GP](https://github.com/deepbeepmeep/Wan2GP) `6479db3` | **WanGP Community License 2.0**（自定义） | 低显存跑 Wan / Hunyuan / LTX 等多个模型，profile 按显存档位预设 | 只借思路 + 接口：按档位给预设；只写它的 `wgp.py --process` 能读的 settings JSON | 自定义许可，不复制代码；settings 键名来自公开文档，未在真实安装上核验 |
| [ModelTC/LightX2V](https://github.com/ModelTC/LightX2V) `217947d` | Apache-2.0 | Wan2.2 蒸馏 4 步推理 + offload，8GB 显存可跑 14B | 外部程序：生成 `python -m lightx2v.infer --model_cls wan2.2_moe --task i2v|flf2v` 命令 | 不 vendoring；只在设置了 `LIGHTX2V_DIR` 时真跑 |
| [Wan-Video/Wan2.2](https://github.com/Wan-Video/Wan2.2) `1ea34ff` | Apache-2.0 | 开源图生视频的主力模型，有 I2V、FLF2V（首尾帧）、TI2V-5B | 读了帧数（4n+1）、帧率（16 / 24）、分辨率约定，用于 plan 的时长换算 | 权重不分发 |
| [kijai/ComfyUI-WanVideoWrapper](https://github.com/kijai/ComfyUI-WanVideoWrapper) `088128b` | Apache-2.0 | block swap 等省显存技巧，新功能更新快 | 只在 16GB 档的文档里提一句 | 工作流随版本变化大，不随仓库提供 |
| [FlashML-org/FreeVideo](https://github.com/FlashML-org/FreeVideo) `ebc94ec` | Apache-2.0（模型另有许可） | 本地图生视频桌面应用 | 网页手动后端的导出目标之一 | — |
| [Lightricks/LTX-Desktop](https://github.com/Lightricks/LTX-Desktop) `68cd86c` | Apache-2.0（LTX 模型：LTX 社区许可） | LTX 模型的官方桌面应用，16GB 起 | 网页手动后端的导出目标之一，档位表里标注许可 | 模型许可有条件，不设为默认 |
| [hzwer/Practical-RIFE](https://github.com/hzwer/Practical-RIFE) `bbfd2ea` | MIT | 实用的插帧模型 | 外部程序（通过 ncnn 版） | 不引入 PyTorch |
| [nihui/rife-ncnn-vulkan](https://github.com/nihui/rife-ncnn-vulkan) `a7532fc` | MIT | 单个二进制，Vulkan 核显也能跑 | 外部程序：`polish --interp 2` 检测到就调用；没有退回 ffmpeg `minterpolate` | 二进制不分发 |
| [xinntao/Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN) `a4abfb2` | BSD-3-Clause | 通用超分 | 外部程序（ncnn 版）：`polish --upscale 2`；没有退回 ffmpeg lanczos | 二进制不分发 |
| [artokun/comfyui-mcp](https://github.com/artokun/comfyui-mcp) `6ad6fc0` | MIT | 让 Agent 通过 MCP 直接操作 ComfyUI | 读过；只在文档里推荐。我们自己的 MCP 只加了只读的 `get_i2v_plan` | 不重复造轮子 |
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) `9327439` | **AGPL-3.0** | Agent 驱动的剪辑流程，出片前有「幻灯片感」检查 | **只借思路**：渲染前 lint（连续 3 镜同一运镜、过长的 Ken Burns / 静止镜头、没有深度模型、全部没有氛围层、全部硬切）和渲染后运动 QA，`lib/lint.mjs` 和复用的 `animator/tools/qa_motion.py` 都是自己写的 | 代码一行不碰（AGPL） |

另外 ComfyUI 本体（GPL-3.0）只作为外部服务，通过它的 HTTP 接口（上传图片 → `/prompt` 排队 → `/history` 取结果）调用，不复制、不链接它的代码。

## 二、只给链接、不复制任何内容的项目

非商用、没有许可证或自定义限制：

- 3d-ken-burns（CC BY-NC-SA 4.0）：单图 3D Ken Burns 效果很好，但非商用；
- Maestro（WanGP 非商用评估许可）；
- Waifu2x-Extension-GUI（仅个人使用）；
- TypeTale、story-flicks、ComfyUI-PainterI2V、ComfyUI-Wan22FMLF、super-video-maker-skill、comfyui-workflow-skill（都没有 LICENSE，默认保留所有权利）；
- hypit（修改版 Apache 2.0，附加了限制条款）；
- huobao-drama（CC BY-NC-SA 4.0）。

这些项目在 `catalog/` 里有条目（带 `commercial_block` 或警告），`node router/cli.mjs recommend --commercial` 会排除它们。

## 三、为什么最终是四条路线

| 路线 | 适合谁 | 优点 | 代价 |
|---|---|---|---|
| ① CPU 2.5D（默认） | 没有显卡 / 核显 / 笔记本 | 免费、离线、可复现，1080p 每帧约 0.1 秒；配方 + 特效 + 配音字幕一条命令 | 只是视差和氛围，没有真实的物体运动 |
| ② 本地 GPU（ComfyUI / Wan2GP / LightX2V / FramePack） | 8GB 以上 NVIDIA 显卡 | 真的会动，免费，可以离线 | 安装麻烦，单镜头要几分钟；本仓库的 GPU 路线只做过 dry-run 测试 |
| ③ 云端 key | 有 Seedance / 可灵 / 海螺 / Veo / fal 等 key | 质量最好，不吃本机硬件 | 按量付费；没 key 时自动 dry-run |
| ④ 网页手动 | 有网页端免费额度 / 会员 | 不用 API，不花额外的钱 | 要手动上传下载；`export` / `import` 帮你管文件名 |

同一份 `s2v.json` 里每个镜头可以单独指定 `backend`：例如主镜头用云端，空镜用 CPU，最后统一合成。

## 四、自己实现时踩过的坑（给后来者）

- **ffmpeg xfade 的 `dissolve`** 是随机抖动溶解，在压缩后像噪点，已经从自动轮换和配方里去掉。
- **动态照片（flow drift）** 用交叉淡化模拟流动，对云、雾、水面很自然，但对小而清晰的物体（月亮、太阳）会出现两个重影。出图时让这类物体边缘柔和一些，或者不要用 flow。
- **镜头长度跟随配音**：先跑一遍 TTS 量出时长，再定镜头长度。否则「最短 5 秒」的配方会让短台词后面拖着长静音。
- **首尾帧过渡（FLF2V）** 只在过渡片段确实会生成时，前一镜才改成硬切；CPU 后端不生成过渡片段，转场保持原样。
