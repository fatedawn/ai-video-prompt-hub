# 改写自第三方模板：Comfy-Org/workflow_templates（MIT）

本目录的两个 ComfyUI **API 格式**工作流是从官方 UI 格式模板改写来的。节点图（双专家 UNET + lightx2v 4 步 LoRA、ModelSamplingSD3 shift 5、KSamplerAdvanced 2/4 步分段、cfg 1、euler / simple、16fps）、默认参数和模型文件名沿用官方模板，所以按 MIT 保留上游版权与许可：

> MIT License · Copyright (c) 2023-present Comfy Org —— 全文见仓库根目录 `LICENSES/Comfy-Org_workflow_templates-MIT.txt`

本仓库的 Apache-2.0 只覆盖我们加上去的部分（`{{占位符}}`、`$名字.输入` 节点标题、`_hda` 元数据和本文件）。

| 项目 | 内容 |
|---|---|
| 上游 | https://github.com/Comfy-Org/workflow_templates |
| 版本 | commit `8be1f8c4b5af2d550d70922a23b79cee599e1f3e`（2026-10-08） |
| 来源文件 | `templates/video_wan2_2_14B_i2v.json` → `wan22_14b_i2v_4step.json`；`templates/video_wan2_2_14B_flf2v.json` → `wan22_14b_flf2v_4step.json` |
| 改动 | 1. UI 格式（nodes/links）改成 API 格式（`{id: {class_type, inputs}}`），只保留出片必需的节点，去掉笔记、分组和 UI 坐标；2. 提示词、图片、宽高、帧数、帧率、步数、分段、文件名前缀换成 `{{PROMPT}}` 等占位符，并给对应节点加 `$prompt.text`、`$image.image`、`$image_end.image` 等标题（stills2video / videogen 的 ComfyUI 适配器按标题绑定）；3. 加 `_hda` 元数据（帧率、步数、各画幅尺寸、模型下载地址、显存说明）；4. 默认尺寸改为竖屏 480×832，24GB 档运行时改为 720×1280 |
| 未使用 | 同一仓库的 LTX-2.3 模板（`video_ltx2_3_*.json`）：模板本身是 MIT，但 LTX 模型是 LTX 社区许可，且我们没有 GPU 无法验证，所以不内置。需要时自己从 ComfyUI 导出 API 工作流，节点标题按上面的规则改名即可用 `--workflow` 调用 |
| 未实测 | 作者没有 GPU，只做了 dry-run（占位符全部填满、首尾帧两张图都上传）测试。与你的 ComfyUI 版本不符时，以官方模板为准重新导出 |

模型权重（Wan2.2 14B fp8、umt5 文本编码器、Wan2.1 VAE、lightx2v LoRA）不随仓库分发，下载地址见各 JSON 的 `_hda.models`。Wan2.2 权重为 Apache-2.0；LoRA 许可以其 Hugging Face 页面为准。
