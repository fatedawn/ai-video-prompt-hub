# 预览素材（随仓库提交的小文件）

| 文件 | 内容 | 大小 | 怎么重新生成 |
|---|---|---|---|
| `tianji_sheet.png` | 默认角色「天机」设定图：默认 / 开心 / 惊讶 / 得意 / 思考 / 说话 / 挥手 / 指向 / 跳跃 / 招牌动作「亮扇」/ 走路 | ≈0.6 MB（128 色） | `cd animator && node src/cli.mjs sheet characters/tianji/character.json --out ../docs/assets/tianji_sheet.png` |
| `tianji_silhouette.png` | 剪影识别度测试：默认、亮扇、跳跃三个姿势只看轮廓（发髻星簪、折扇、宽袖道袍） | 8 KB | 由 `sheet --transparent` 的透明图取 alpha 填色 |
| `tianji_frames.png` | 主示例《天机泄露》的 6 帧：挥手开场、亮扇泄露、指向画面、走路、结尾两帧 | ≈0.3 MB | 先 `npm run demo`，再用 ffmpeg 从 `animator/examples/out/demo.mp4` 截取 1.5 / 4.6 / 9.6 / 12 / 22.8 / 24.6 秒 |
| `tianji-showcase.mp4` | 《天机泄露 · 开源宝藏仓库》26 秒电影感特效展示，540×960，**带配音**（Kokoro v1.1-zh 默认音色 zm_052，48 kbps 单声道 AAC；字级高亮字幕已烧录）。展示：水墨开场、风格配方背景（梵高 / 克里姆特 / 蒸汽波 / 莫奈 / 草间弥生）、huashu 转场（swirl / comicPanels / inkBloom / dotBloom）、素描→上色、星光 / 剑气 / 花瓣 / 闪电粒子、甩镜、冲击波、光芒与镜头光晕 | ≈2.8 MB | `cd animator && node src/cli.mjs make examples/showcase/project.json --out examples/out/showcase.mp4`（本地 TTS → 渲染 1080×1920），再 `ffmpeg -i examples/out/showcase.mp4 -vf scale=540:960 -c:v libx264 -preset slow -crf 32 -tune animation -c:a aac -b:a 48k -ac 1 -movflags +faststart tianji-showcase.mp4` |
| `stills2video-sample.mp4` | stills2video 纯 CPU 示例：5 张静图 → 21 秒 9:16 成片，720×1280，**带配音**（Kokoro v1.1-zh）+ 逐字字幕。画面：深度视差推进 / 环绕 / 平移 / 摇摆（Depth-Anything-V2-Small 深度）、雾 / 光束 / 光斑 / 星光 / 花瓣叠层、huashu 转场（inkBloom / flareSweep）与 xfade。第 1 张是天机提供的仙侠示意图，第 2–5 张由 `make_stills.py` 程序绘制（云海、城市夜景、竹林）或裁自上面的 `tianji_sheet.png`，不含第三方图片 | ≈2.8 MB | `XIANXIA=<你的图> bash stills2video/examples/sample/run_sample.sh /tmp/s2v`（不设 XIANXIA 时第 1 张用程序画的竹林），再 `ffmpeg -i /tmp/s2v/final.mp4 -vf scale=720:1280:flags=lanczos -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k -movflags +faststart stills2video-sample.mp4` |
| `stills2video-sample-contact.jpg` | 上面示例的缩略图（每镜 2–3 帧，`make` 自动生成） | ≈0.25 MB | 同上，取 `final.contact.jpg` |
| `videogen-route-c-demo.mp4` | videogen 路线 C 端到端演示成片，画面是 animator 渲染的**替身片段（STAND-IN）**，不是 AI 视频模型的输出；540×960，**带配音 + 自制合成 BGM**（48 kbps 单声道 AAC） | ≈0.6 MB | `bash videogen/examples/route-c/run_demo.sh` 生成原尺寸版，同样缩小并压缩音轨 |

- 预览视频的人声由本地开源 TTS [Kokoro-82M v1.1-zh](https://huggingface.co/hexgrad/Kokoro-82M-v1.1-zh)（hexgrad，Apache-2.0）经 [sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx)（Apache-2.0）合成；路线 C 的 BGM 由 `run_demo.sh` 用 ffmpeg 纯合成，不含第三方音乐。仓库不提交单独的音频文件和模型权重。
- 以上素材与「天机」形象一样按 Apache-2.0 发布（版权人：天机）。`tianji-showcase.mp4` 的背景和部分转场由 `animator/vendor/huashu-art-motion/` 中按 MIT 移植的代码实时渲染（© alchaincyf，已隐藏其角色，不含其任何图片 / 字体素材）。提醒：「天机」是频道的身份标识，请勿用于冒充频道或暗示其背书（Apache-2.0 第 6 条本就不授予商标使用权）。
