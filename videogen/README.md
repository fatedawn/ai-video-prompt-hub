# videogen：分镜 → 视频片段 → 成片

把本仓库格式的分镜提示词（`镜头1：…`、`[0-3秒]`、`第1段（0–15秒）`、`[全局]`/`[风格]`…）拆成镜头清单，通过**三条可互换的路线**变成视频片段，再统一**配音 + 逐字字幕 + BGM** 合成成片。

```
分镜.md ──plan──▶ shots.json ──┬─ 路线 A  gen --provider seedance|kling|minimax|veo|fal|replicate|runway|luma  （云 API，自带 key）
                               ├─ 路线 B  gen --provider comfyui                                        （自己的 GPU）
                               ├─ 路线 C  export → 网页端手动生成并下载 → import                          （零 key）
                               └─ 手绘    镜头标 source: "animator"，由 ../animator 渲染
                                              │
                                              ▼
                     assemble：对齐时长（裁切/放慢/定格）+ 本地开源 TTS 配音 + 逐字卡拉OK字幕 + 可选 BGM → final.mp4
```

- 只依赖 Node ≥ 20 和 ffmpeg（带 libass），没有 npm 依赖。配音复用 `../animator` 的本地 TTS（Kokoro v1.1-zh，CPU、免费、离线；`cd animator && npm run setup:tts`）。
- **密钥由你自己提供，本仓库不提供、不托管、不上传任何 key。** 只从环境变量或 `.env` 读取（环境变量优先）；`.env.example` 已提交作模板，`.env` 已被 `.gitignore` 忽略。`--dry-run` 和日志里的 key 一律打码。

## 先选路线：决策表

| 你的情况 | 推荐路线 | 需要什么 | 花费 | 优点 | 代价 |
|---|---|---|---|---|---|
| 没有 API 账号，只想先做出来 | **C 网页端往返** | 即梦/可灵/海螺/Sora/Flow 网页账号 | 平台会员/积分 | 零配置；网页端常有 API 还没有的新功能、免费额度 | 手动复制粘贴、下载；镜头多时费时 |
| 镜头多、要批量、要可重复 | **A 云 API** | 任一家的 API key（写进 `.env`） | 按秒/按次计费 | 全自动、可脚本化、可并行 | 要实名/充值；各家内容审核不同 |
| 国内团队，主力 Seedance | A · `seedance`（火山方舟） | `ARK_API_KEY` | 按 token/秒 | 与本仓库提示词写法一致（镜头N、@图片N） | 需火山引擎账号 |
| 想一个 key 试多家开源模型 | A · `fal` / `replicate` | `FAL_KEY` / `REPLICATE_API_TOKEN` | 按次 | 换模型只改 `--model` | 模型版本更新快，参数以模型页为准 |
| 有 24 GB 以上显卡，要离线/不想按次付费/要可商用开源权重 | **B ComfyUI** | 自己跑的 ComfyUI + 模型权重 | 电费 | 无审核外流、无限次、可改工作流 | 慢；装环境；画质低于顶级闭源 |
| 只有 8–16 GB 显卡 | B（Wan2.1-1.3B / LTX-2B / CogVideoX 加卸载）或 C | 同上 | 电费 | 能跑 | 480p 左右、短 |
| 手绘/动画讲解类 | 手绘 animator | 无 | 0 | 完全可控、可商用、口型/逐字同步 | 不是写实画面 |
| 混合：主镜头用云端，过场用手绘，个别镜头网页端补 | 混用 | — | — | 三条路线产出同一种 `clips/S01_shot03.mp4`，assemble 不关心来源 | — |

## 30 秒上手（路线 C，零 key）

```bash
node videogen/cli.mjs plan    prompts/某个分镜.md --out work/shots.json --refs work/refs   # refs/图片1.png → @图片1；S01_shot02.png → 该镜头首帧
node videogen/cli.mjs export  work/shots.json --site jimeng --out work/packages               # 逐镜头生成包
#   打开 work/packages/README.md，按表把每个镜头粘贴到网页端生成，下载后**按镜头号命名**（S01_shot03.mp4）放进 ~/Downloads/xxx
node videogen/cli.mjs import  work/shots.json --from ~/Downloads/xxx                          # 按文件名收回 + 校验时长/画幅
node videogen/cli.mjs assemble work/shots.json --bgm 我的音乐.mp3 --out work/final.mp4        # 配音 + 字幕 + BGM → 成片
```

演示（不需要任何视频模型账号）：`bash videogen/examples/route-c/run_demo.sh`。它用 animator 渲染的**替身片段（画面上标着「替身片段 STAND-IN」）**模拟网页端下载，故意混入了文件名不规范（`S01_shot02 (1).mp4`、`s01-shot03_v2.mp4`）、太短、太长和方形画幅的片段，以及一个无关的 `notes.txt`，用来展示 import 的匹配/校验和 assemble 的时长、画幅处理。产物在 `examples/route-c/out/final.mp4`（16 秒，1080×1920，配音 + 卡拉OK字幕 + 自合成 BGM）。

## 第 0 步：plan（分镜 → 镜头清单）

`plan` 直接读本仓库 `prompts/`、`templates/`、`docs/skill/SKILL.md` 里的写法（会自动取 ```text 代码块）：

| 写法 | 识别为 |
|---|---|
| `镜头1：` `Shot 1:` `[镜头1]` `分镜1` `[S1]` | 一个镜头 |
| `[0-3秒]` `0–3s` `00:00-00:03 [镜头1]` | 带时长的镜头 |
| `第1段（0–15秒）` | 段落（`--unit segment` 时整段一个片段，ID 为 `S01_all`） |
| `[全局]` `[风格]` `【…】` 和镜头前的说明 | 全局上下文，拼进每个镜头的提示词 |
| `[负面]` `[禁止]` | 负面提示词 |
| `角色（语气）：{台词}` / `说：{…}` / `旁白：…` | 台词 → 配音，按角色分配音色 |
| `@图片1` + `--refs` 目录 | 参考图；`S01_shot02.png` 作为该镜头首帧 |
| 后段写「沿用」 | 继承上一段的全局设定 |

每个镜头的提示词 = 全局上下文 + 该镜头描述 + 结尾的约束 +「（共 N 个镜头中的第 k 个；只生成这一个镜头，单镜头，不要切镜）」，所以多镜头分镜能逐个单独生成。`shots.json` 可以手改（时长、提示词、`fit`、`source: "animator"` 等）。

## 路线 A：云 API（自带 key）

```bash
cp .env.example .env        # 只填你要用的那一家
node videogen/cli.mjs providers                                        # 看哪些已配置
node videogen/cli.mjs gen work/shots.json --provider kling --dry-run   # 打印每个镜头的**精确请求**（URL/头/JSON，key 打码），不发送
node videogen/cli.mjs gen work/shots.json --provider kling             # 提交 → 轮询（指数退避）→ 下载到 clips/S01_shot01.mp4 …
node videogen/cli.mjs gen work/shots.json --provider seedance --only S01_shot03 --model ep-2026xxxx   # 单独重做一个镜头
```

各家接口均于 **2026-10** 对照官方文档实现（没有真实 key，未做线上调用；请求格式由 mock 测试覆盖）。默认关闭各家“原生音频”（配音统一由 assemble 生成，`--native-audio` 可打开）。

| 通道 | 环境变量 | 默认模型（可 `--model` 或环境变量覆盖） | 文生 | 首帧图生 | 角色参考图 | 时长 | 画幅 | 官方文档 |
|---|---|---|---|---|---|---|---|---|
| `seedance` 火山方舟 | `ARK_API_KEY`（`ARK_BASE_URL`、`SEEDANCE_MODEL`） | `doubao-seedance-2-5-260628` | ✓ | ✓ `role: first_frame` | ✓ `reference_image`（有首帧时不并用） | 4–30 s（2.0 为 4–15） | 16:9/9:16/1:1…；有首帧时 adaptive | [创建任务](https://docs.volcengine.com/docs/ark/create-video-generation-task-api) · [查询](https://docs.volcengine.com/docs/82379/1521309) |
| `kling` 可灵 | `KLING_API_KEY`（`KLING_BASE_URL`） | `kling-3.0` | ✓ | ✓ `first_frame` | ✓ `element` | 3–15 s | 16:9/9:16/1:1 | [文生](https://kling.ai/document-api/api/video/3-0-omni/text-to-video) · [图生](https://kling.ai/document-api/api/video/3-0-omni/image-to-video) |
| `minimax` 海螺 | `MINIMAX_API_KEY`（国内站 `MINIMAX_BASE_URL=https://api.minimaxi.com`） | `MiniMax-H3` | ✓ | ✓ | ✓ | 4–15 s | 有首帧时随图 | [创建](https://platform.minimax.io/docs/api-reference/video-generation-v2-create) · [查询](https://platform.minimax.io/docs/api-reference/video-generation-v2-query) |
| `veo` Google | `GEMINI_API_KEY`（`VEO_MODEL`） | `veo-3.1-generate-preview` | ✓ | ✓ | ✓ ≤3 张（强制 8 s） | 4/6/8 s | 16:9/9:16 | [Veo](https://ai.google.dev/gemini-api/docs/veo) |
| `fal` | `FAL_KEY`（`FAL_MODEL`、`FAL_MODEL_I2V`） | `fal-ai/wan/v2.2-a14b/{text,image}-to-video` | ✓ | ✓ | 视模型 | 17–161 帧 @16fps | 视模型 | [队列 API](https://fal.ai/docs/documentation/model-apis/inference/queue) |
| `replicate` | `REPLICATE_API_TOKEN` | `wan-video/wan-2.2-{t2v,i2v}-fast` | ✓ | ✓ | 视模型 | 视模型 | 视模型 | [HTTP API](https://replicate.com/docs/reference/http) |
| `runway` | `RUNWAYML_API_SECRET` | `gen4.5` | ✓ | ✓ | — | 2–10 s | 1280:720 / 720:1280 | [API](https://docs.dev.runwayml.com/guides/using-the-api/) |
| `luma` | `LUMA_API_KEY` | `ray-2` | ✓ | ✓（首帧须是公网 URL） | — | 5 s / 9 s | 16:9/9:16/1:1… | [生成](https://docs.lumalabs.ai/docs/video-generation) |

- 时长不在允许范围时会就近取合法值（`dry-run` 里能看到），实际成片长度由 assemble 再对齐。
- 参考图：本地图片会按各家要求转成 base64 / data URL；Luma 只收公网 URL（在 `shots.json` 的 `refs[].url` 填）。
- 价格、模型 ID、配额经常变，以控制台为准；内容审核（真人肖像、名人、版权角色）各家不同，被拒时换写法或走路线 C/B。

## 路线 B：自己的 GPU（ComfyUI）

```bash
# 1) 自己启动 ComfyUI（默认 http://127.0.0.1:8188，可设 COMFYUI_URL），装好模型
# 2) 提交工作流
node videogen/cli.mjs gen work/shots.json --provider comfyui --workflow videogen/workflows/wan22_ti2v_5b_t2v.json
node videogen/cli.mjs gen work/shots.json --provider comfyui --workflow videogen/workflows/wan22_ti2v_5b_i2v.json   # 有首帧的镜头
node videogen/cli.mjs gen work/shots.json --provider comfyui --workflow 我导出的.json --dry-run                     # 看填好的 /prompt 请求
```

流程：`/upload/image`（首帧）→ `POST /prompt` → 轮询 `/history/{id}` → `/view` 下载 → webm 自动转 mp4（[官方服务器接口说明](https://docs.comfy.org/development/comfyui-server/comms_routes)）。

**用任何工作流**：在 ComfyUI 里打开官方模板 →「导出 (API)」→ 把对应字段改成占位符即可：`{{PROMPT}}` `{{NEGATIVE}}` `{{WIDTH}}` `{{HEIGHT}}` `{{LENGTH}}`（自动取 4n+1 帧）`{{FPS}}` `{{SEED}}` `{{IMAGE}}`（首帧上传后的文件名）`{{PREFIX}}`（输出文件名前缀）。

随仓库附带的 `workflows/wan22_ti2v_5b_{t2v,i2v}.json` 是**本仓库自写**的（只用 ComfyUI 内置节点，模型 Wan2.2-TI2V-5B，Apache-2.0），作者没有 GPU、**未实测**；节点名若与你的 ComfyUI 版本不符，请按上面的方法从官方模板导出。其他模型不附工作流，请用官方模板：[Comfy-Org/workflow_templates](https://github.com/Comfy-Org/workflow_templates)（MIT）。`comfyanonymous/ComfyUI_examples` 仓库没有明确许可证，本仓库不复制其中的工作流。

模型许可证与显存（2026-10 核对模型卡/许可证原文；显存为官方给出或模型卡写明的数字，实际随分辨率、帧数、量化、卸载而变）：

| 模型 | 许可证 | 商用 | 显存参考 | 备注 |
|---|---|---|---|---|
| Wan2.2-TI2V-5B | Apache-2.0 | ✓ | 24 GB（RTX 4090，720p） | 附带工作流用的就是它 |
| Wan2.2-T2V/I2V-A14B | Apache-2.0 | ✓ | 单卡 80 GB；消费级卡需 fp8/GGUF + 卸载 | 画质最好的开源 Wan |
| Wan2.1-T2V-1.3B | Apache-2.0 | ✓ | ≈8 GB（480p） | 小显存首选 |
| HunyuanVideo / HunyuanVideo-1.5 | 腾讯混元社区许可证 | 有条件 | 1.5：开启卸载约 14 GB 起 | **不适用于欧盟、英国、韩国**；月活超 1 亿需另行授权；有使用限制条款 |
| LTX-Video（13B / 0.9.x） | 13B：LTX-Video Open Weights License；2B 各版本许可证不同，逐个看模型卡 | 有条件 | 模型卡未给具体数字：13B 需较大显存，2B / 蒸馏版面向低显存 | |
| LTX-2.x | LTX-2 社区许可证 | 年收入 ≥ 1000 万美元需商业授权 | 视版本 | |
| CogVideoX-2B | Apache-2.0 | ✓ | 模型卡：SAT FP16 18 GB；diffusers FP16 开启 CPU 卸载等优化后最低约 4 GB（很慢） | |
| CogVideoX-5B | CogVideoX License | 需登记，月访问量上限 100 万 | 模型卡：SAT BF16 26 GB；diffusers BF16 优化后最低约 5 GB（很慢） | |

> 以上是对许可证的摘要，不是法律意见；用于商业项目前请阅读原文。

## 路线 C：网页端手动往返（零 key）

`export` 给每个镜头生成一个文件夹：

```
packages/
  README.md          总表：镜头号、时长、台词、参考图、要下载成的文件名 + import 命令
  all_prompts.md     所有提示词一页（方便连续复制）
  S01_shot01/
    prompt_zh.txt    中文提示词（已含全局设定和“只生成这一个镜头”约束）
    prompt_en.txt    英文骨架：时长/画幅/单镜头无字幕等约束为英文，镜头描述保留中文（供 Sora/Veo 等英文更稳的平台，按需翻译）
    negative.txt     负面提示词
    params.json      时长、画幅、分辨率、参考图、首帧
    refs/            这个镜头要上传的参考图（@图片N 对应关系写在 checklist 里）
    checklist.md     逐项检查：平台、上传哪几张图、选什么时长画幅、台词怎么处理、生成后检查人物一致/无乱码字幕水印、下载命名
```

`--site jimeng|kling|hailuo|sora|veo|generic` 只改清单里的平台提示（时长范围、参考图用法等）。

**文件名约定**：`S01_shot03.mp4`（第 1 段第 3 镜；段落模式为 `S01_all.mp4`）。`import` 宽松匹配：大小写、`-`/`_`/空格、前导 0、`S01_shot03 (1).mp4`、`s01-shot03_v2.mp4` 都能认；同一镜头有多个文件时取最新的；非视频文件忽略。导入时检查：有无视频流、时长与计划差多少、画幅是否一致（容差 3%），问题会列出但不阻断，片段复制到 `clips/` 并写回 `shots.json`。

## 统一合成：assemble

1. `source: "animator"` 的镜头先用手绘渲染器出片。
2. 所有台词一次性交给本地 TTS（默认 Kokoro v1.1-zh；按角色分配音色，可在 `shots.json` 的 `voice.characters` 改，如 `"沈晚": "kokoro:zf_017"`），得到每句音频和**逐字时间戳**。
3. 每个镜头的目标时长 = max(计划时长, 该镜头台词总长 + 0.3 s 前置 + 0.45 s 尾巴)；镜头写 `"fit": "strict"` 则严格按计划。
4. 片段与目标时长不一致时（`--fit`，默认 `auto`）：
   - 素材**更长** → 裁掉尾部（trim）；
   - 素材**略短** → 放慢，最多 1.25×（slow）；再不够 → 定格最后一帧补足（hold）；
   - `loop` 可循环素材（适合空镜/氛围）。
5. 画幅不一致（`--frame`，默认 `auto`）：比例相差 ≤15% 时铺满裁切；相差更大时完整保留画面 + 模糊铺底（不裁掉人物和字）；也可强制 `crop`/`blur`/`pad`。
6. 统一缩放到 `--size`（默认按画幅：9:16 → 1080×1920，16:9 → 1920×1080），配音按时间线放置；`--bgm` 自动在人声处压低（sidechain）并淡入淡出；`--clip-audio 0.3` 可保留片段自带音效。
7. 烧录卡拉OK式逐字字幕（说话人名字显示在字幕上方），同时输出 `final.srt` 和 `final.timeline.json`（每个镜头用了哪个片段、怎么对齐的）。

缺片段时报错；`--allow-missing` 用深灰占位继续合成，方便先看节奏。

## 测试

```bash
cd videogen && npm test     # 17 个测试：8 个云端通道 + ComfyUI 的提交/轮询/下载（mock fetch）、请求格式、dry-run 打码、缺 key 报错、分镜解析、时长对齐、字幕
```

## 已知限制

- 云端通道没有用真实 key 联调过，接口参数按 2026-10 官方文档实现；如果某家改版，改 `providers/<name>.mjs` 里的 `submit/parsePoll` 即可，dry-run 能帮你对照。
- 附带的 ComfyUI 工作流未在 GPU 上实测。
- 英文提示词只是骨架（参数和约束是英文，镜头描述仍是中文），要地道英文请自行翻译；在 `shots.json` 里填 `prompt_en` 后再导出即用你的译文。
- 生成内容是否可商用取决于你使用的平台条款和模型许可证，与本工具无关。
