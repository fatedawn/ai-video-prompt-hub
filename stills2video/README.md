# stills2video · 只有图片也能出片

把一组静图（例如 ChatGPT Images 出的图）做成带**运镜、氛围特效、转场、本地配音和逐字字幕**的成片。没有显卡也能用；有显卡、有云端 key、有网页端额度时，自动或按参数换成真正的图生视频。四种后端共用同一个镜头格式，可以在一条片子里混用。

Apache-2.0，Copyright 2026 天机。第三方来源与取舍见 [`docs/i2v-对比.md`](../docs/i2v-对比.md)、[`NOTICE.md`](../NOTICE.md) 第 2.2 节。

示例成片（纯 CPU，21 秒，带配音）：[`docs/assets/stills2video-sample.mp4`](../docs/assets/stills2video-sample.mp4) · [缩略图](../docs/assets/stills2video-sample-contact.jpg)

## 快速开始

```bash
cd stills2video && npm run setup:depth && cd ..         # 首次：pip 装 numpy/pillow/onnxruntime + 下载深度模型（26MB，校验 sha256）
cd animator && npm install && npm run setup:tts && cd .. # 首次：本地配音 Kokoro（也供 huashu 转场 / 粒子特效用的浏览器渲染）
node stills2video/cli.mjs doctor                          # 显卡档位、ffmpeg、深度模型、TTS、RIFE / Real-ESRGAN → 推荐后端

node stills2video/cli.mjs prompts --script 台词.txt --out 出图提示词.md   # 逐镜 ChatGPT 中文出图提示词 + 文件名
#   在 ChatGPT 里出图，命名 01.png、02.png… 放进 stills/
node stills2video/cli.mjs make --images stills --script 台词.txt --out final.mp4
```

输出：`final.mp4`、`final.cover.jpg`（封面）、`final.contact.jpg`（缩略图）、`final.srt`、`final.timeline.json`；中间文件在 `s2v.json` 同目录的 `clips/`。

示例：`bash stills2video/examples/sample/run_sample.sh /tmp/s2v`（程序画 5 张图 + 5 行台词 → 9:16 成片；设 `XIANXIA=<你的图>` 可把第 1 张换成自己的图）。

## 输入

- **图片文件夹**：png / jpg / webp / bmp / avif。排序规则（和 videogen 路线 C 一样按文件名编号）：`S01_shot03` → 1003；`镜头3` / `shot3`；开头数字 `03_竹林.png`；结尾数字 `竹林 (5).png`（时间戳样式的文件名不算编号）。全部有编号且不重复时按编号，否则按修改时间（`--order name` 按文件名）。
- **台词（可选）**：一行一个镜头。可写 `3. ` / `镜头3：` 指定对应第几张图，`【晨雾竹林推进】` / `【推进】` 指定配方或运镜，`（5秒）` 指定时长，`天机：` 指定说话人，`（空镜）` 表示无台词。没写时长时，镜头长度跟随实际配音（TTS 先跑一遍量时长，不会出现定格）。
- **分镜 JSON（可选）**：`--storyboard 分镜.json` 支持 `{shots: [{image, line|lines, recipe, motion, duration, transition, overlays, fx, flow, backend}]}`，也接受 videogen 的 `shots.json`。
- 没有台词也没有分镜：每张图一个无声空镜，配方按文件名关键词猜，猜不到就轮换运镜。

## 后端与显存档位

`--backend auto`（默认）：检测到 NVIDIA 显卡且 ComfyUI 在线 → comfyui；有显卡但 ComfyUI 没开 → 先用 cpu 并提示；没有显卡 → cpu（配置了云端 key 会提示可用 `cloud:<provider>` 做关键镜头）。`S2V_FAKE_VRAM_GB=12` 可模拟显存，`--tier` 可手动指定档位。

| 档位 | 显存 | 默认后端 / 工作流 | 其他本地选项（出处） |
|---|---|---|---|
| `cpu` | 无独显 / <6GB | cpu：深度视差 + 运镜 + 叠层特效 | — |
| `gpu8` | 6–10GB | comfyui：`videogen/workflows/wan22_ti2v_5b_i2v.json`，544×960，≤3 秒 | FramePack（README：6GB 起）· Wan2GP（README：部分模型 6GB）· LightX2V 14B 4 步 + offload（README：8GB 显存 + 16GB 内存） |
| `gpu12` | 10–14GB | comfyui：TI2V-5B 720p，≤5 秒 | Wan2.2-14B GGUF Q4 + 4 步 LoRA（社区经验，**未核验**）· FramePack-Studio（README ≥8GB） |
| `gpu16` | 14–20GB | comfyui：`workflows/wan22_14b_i2v_4step.json` / `wan22_14b_flf2v_4step.json`，480×832 | LTX-Desktop（README ≥16GB，⚠ LTX 社区许可）· WanVideoWrapper block swap（README 约 16GB）；官方 fp8 模板按 24GB 设计，16GB 换 GGUF 或 `--lowvram` |
| `gpu24` | ≥20GB | comfyui：14B fp8 4 步，720×1280，81 帧 @16fps ≈ 5 秒；`plan --flf2v` 自动排首尾帧过渡 | HunyuanVideo-1.5（⚠ 腾讯混元许可，不适用于欧盟/英国/韩国）· LTX-2.3（⚠ LTX 社区许可） |

其他后端：

| 后端 | 做什么 | 真跑的条件 |
|---|---|---|
| `cloud:<provider>` | 复用 videogen 的云端适配器（seedance / kling / minimax / veo / fal / replicate / runway / luma），首帧 = 你的图 | `.env` 填了对应 key；否则自动 dry-run，只打印请求 |
| `manual`（`export` / `import`） | 导出逐镜头生成包（图片 + 提示词 + 命名规则），支持即梦、可灵、海螺、FramePack、LTX-Desktop、FreeVideo、Wan2GP 等；生成后按文件名导回 | 人工操作 |
| `wan2gp` | 为 Wan2GP 的 `python wgp.py --process <settings.json>` 写任务文件（键名取自其公开文档，未在真实安装上核验；`--wan2gp-template` 可用你从 UI 导出的设置作模板） | 只写文件 |
| `lightx2v` | 生成 `python -m lightx2v.infer --model_cls wan2.2_moe --task i2v|flf2v …` 命令 | `--run` 且设置 `LIGHTX2V_DIR`、`LIGHTX2V_MODEL` |

GPU / 云端 / Wan2GP / LightX2V 先加 `--dry-run`：ComfyUI 工作流写到 `comfyui/<镜头>.api.json`（可在 ComfyUI 里 Load (API) 手动排队），请求和命令写到 `dry-run.txt`。

**用自己的 ComfyUI 工作流**（LTX、FramePack、GGUF 版 Wan…）：在 ComfyUI 里 Export (API)，把节点标题改成 `$prompt.text`、`$negative.text`、`$image.image`、`$image_end.image`、`$width.width`、`$height.height`、`$length.length`、`$fps.fps`、`$seed.seed`、`$steps.steps`、`$prefix.filename_prefix` 这类名字（`$名字.输入名`），然后 `render s2v.json --backend comfyui --workflow 我的.json`。也可以在 JSON 里直接写 `{{PROMPT}}`、`{{IMAGE}}`、`{{IMAGE_END}}`、`{{WIDTH}}` 等占位符。

## 命令

```text
doctor                                   检测并推荐
recipes [--json]                         列出空镜配方
prompts --script 台词.txt [--subject 主体] [--out 出图提示词.md]
images  --prompts 提示词.txt --out stills/ [--dry-run]     （可选）OpenAI 图像 API，按量计费，key 只从 OPENAI_API_KEY 读
plan    --images 目录 [--script 台词.txt | --storyboard 分镜.json] [--aspect 9:16|16:9|1:1] [--out 项目/s2v.json] [--flf2v]
render  s2v.json [--backend …] [--dry-run] [--only S01_shot02] [--tier …] [--workflow wf.json] [--depth auto|gradient|depth.png] [--size WxH] [--no-voice]
export  s2v.json --site jimeng|kling|hailuo|framepack|ltx-desktop|freevideo|wan2gp|generic [--out packages/]
import  s2v.json --from 下载目录
polish  s2v.json [--interp 2] [--upscale 2]     有 rife-ncnn-vulkan / realesrgan-ncnn-vulkan（PATH 或 RIFE_BIN / REALESRGAN_BIN）就用，没有退回 ffmpeg minterpolate / lanczos
assemble s2v.json [--out final.mp4] [--bgm 音乐.mp3] [--transition auto|fade|huashu:inkBloom|cut] [--no-huashu] [--size WxH] [--no-voice]
make    --images 目录 [--script 台词.txt] --out final.mp4 [plan / render / assemble 的参数]
```

合成复用 `videogen assemble`：Kokoro 本地配音、字级字幕、BGM 自动闪避、时长 / 画幅自适应。转场可以是 ffmpeg xfade 的 40 多种，也可以是 animator 内置的 50 种 huashu 转场（`huashu:inkBloom` 等，浏览器渲染，失败自动退回 fade）。`auto` 时按配方或轮换选择。

## 空镜配方（`recipes/broll.json`，24 个）

晨雾竹林推进 · 仙侠云海环绕 · 城市夜景延时感 · 产品展示旋转光效 · 雨夜窗边 · 雪夜古镇 · 樱花飘落 · 落日海边 · 星空银河 · 书桌暖光特写 · 古风庭院横移 · 山间瀑布（动态照片） · 赛博朋克街头 · 人物特写呼吸 · 剑气对峙 · 火光余烬 · 森林光束下摇 · 航拍上升 · 老照片回忆 · 平面图 / 文字图慢推 · 后拉揭示全景 · 梦境漂浮 · 希区柯克变焦 · 宇宙星云环绕

每个配方 = 运镜（preset / amount / ease）+ numpy 叠层（overlays）+ 浏览器特效（fx：粒子 / 光效）+ 动态照片（flow）+ 时长 + 转场 + 图生视频提示词（给 GPU / 云端后端）+ 一条中文 ChatGPT 出图模板（`{主体}` 可替换）。出图模板都要求「前中远景分层」，这样视差效果最好。

## CPU 后端 job（`py/motion.py`）

`python3 stills2video/py/motion.py job.json`，或 `--still 0.5 out.png` 只渲染一帧预览，`--presets` 列出运镜。

| 键 | 说明 | 默认 |
|---|---|---|
| `image` / `out` | 输入图 / 输出 mp4 | — |
| `width` `height` `fps` `duration` | 输出尺寸、帧率、秒数 | 1080 1920 30 5 |
| `motion.preset` | `push_in` `pull_out` `pan_left` `pan_right` `tilt_up` `tilt_down` `orbit` `dolly_zoom` `drift` `sway` `rise` `kenburns` `static` | `push_in` |
| `motion.amount` / `ease` / `direction` / `cycles` / `parallax` / `focus` | 幅度；缓动 `linear` `sine` `cubic` `quad` `out` `in` `expo`；方向；循环圈数；视差强度；焦平面（0–1，`auto` = 画面中心深度中位数） | 1 / sine / 1 / 1 / 1 / auto |
| `overlays` | `[{type, amount, …}]`：`fog`（按深度，远处更浓）`rain` `snow` `dust` `bokeh` `lightleak` `godrays`（`center`）`grade`（`look`: warm / cold / teal-orange / night / dream）`vignette` `grain` `letterbox` | `[]` |
| `flow` | 动态照片：`{region: far|top|bottom|box, kind: drift|ripple, distance, angle, threshold, box}`；适合云、雾、水面这类纹理，小而清晰的物体（如月亮）会有重影 | 无 |
| `loop` | 运镜和特效都按周期曲线走，首尾帧相同可无缝循环 | 按 preset |
| `depth` | `auto`（有模型用模型，没有用渐变近似）`model` `gradient` 或一张深度图 PNG（白 = 近） | auto |
| `fit` / `edge_grow` | `cover` / `contain`；前景边缘外扩像素（越大越不容易撕裂，代价是边缘拉伸） | cover / 自动 |
| `seed` `crf` `workers` `x264_preset` | 随机种子、画质、并行进程数、编码速度 | — / 17 / 核数−1（最多 8，或 `S2V_WORKERS`） / veryfast |

原理：每帧按运镜曲线算出相机缩放 / 平移 / 视差偏移，对每个输出像素按 `(深度 − 焦平面) × 偏移` 做反向映射（3 次不动点迭代），深度图先膨胀再模糊，前景边缘被「拉伸」而不是撕开（代替遮挡补全）；采样用打包 uint32 的定点双线性插值，多进程并行，原始帧直接管道给 ffmpeg。实测 1080×1920、8 核 CPU：3 秒环绕镜头（90 帧，含深度推理和雾层）用时 8.7 秒，约 0.1 秒 / 帧。

深度模型：[Depth-Anything-V2-Small](https://huggingface.co/onnx-community/depth-anything-v2-small)（Apache-2.0，onnx-community 转换版，固定 revision，`py/models.json` 记录 sha256），onnxruntime CPU 推理约 0.3 秒 / 张，结果缓存在 `$HDA_MODELS/depth-cache`。Base / Large 权重是 CC-BY-NC-4.0，不使用。没装模型时自动退回「上远下近」的渐变深度。模型目录：`HDA_MODELS`（默认 `~/.cache/hda-models`），`python3 stills2video/py/fetch_models.py --list` 查看。

## 环境变量

| 变量 | 作用 |
|---|---|
| `HDA_MODELS` | 模型目录（深度模型 + animator 的 TTS 模型） |
| `HDA_PYTHON` | 装了 sherpa-onnx 的 Python（TTS 用）；`S2V_PYTHON`：跑 `motion.py` 的 Python |
| `COMFYUI_URL` | 默认 `http://127.0.0.1:8188` |
| `S2V_FAKE_VRAM_GB` | 模拟显存（测试 / 规划用） |
| `RIFE_BIN` `REALESRGAN_BIN` | 补帧 / 超分二进制路径 |
| `LIGHTX2V_DIR` `LIGHTX2V_MODEL` `LIGHTX2V_PYTHON` | LightX2V 真跑时需要 |
| `OPENAI_API_KEY` `OPENAI_IMAGE_MODEL` | 可选的 OpenAI 图像 API（ChatGPT 会员不含 API 额度，按量计费） |

## 模型许可提醒

模型权重一律不进仓库。Wan2.2：Apache-2.0。LTX-2 / LTX-2.x：LTX 社区许可（商用有条件）。HunyuanVideo-1.5 / I2V：腾讯混元社区许可，不适用于欧盟、英国、韩国。MiniMax H3：MiniMax H3 社区许可，排除欧盟、英国、韩国、美国，营收超门槛需授权。Wan2GP 软件：WanGP Community License（可用于出片，不能转售软件）。ComfyUI：GPL-3.0，本工具只通过 HTTP API 调用它。

## 局限

- CPU 后端只是 2.5D：没有真实的物体运动（人不会走、水不会真流），大幅度环绕会露出边缘拉伸。
- GPU 路线（ComfyUI 工作流、Wan2GP、LightX2V）在没有显卡的环境里开发，只做过 dry-run 测试；12GB 跑 14B 量化的可行性未核验。
- 动态照片（flow）对小而清晰的物体会出现重影，适合云、雾、水面。
- huashu 转场和 fx 粒子需要 animator 的浏览器渲染（`cd animator && npm install`）；不可用时转场退回 fade，粒子跳过。

## 测试

```bash
cd stills2video && npm test        # 分镜解析、后端选择、ComfyUI / 云端 dry-run、Wan2GP / LightX2V 输出、补帧计划、CPU 渲染冒烟
```
