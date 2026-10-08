# 预览素材（随仓库提交的小文件）

| 文件 | 内容 | 大小 | 怎么重新生成 |
|---|---|---|---|
| `tianji_sheet.png` | 默认角色「天机」设定图：默认 / 开心 / 惊讶 / 得意 / 思考 / 说话 / 挥手 / 指向 / 跳跃 / 招牌动作「亮扇」/ 走路 | ≈0.6 MB（128 色） | `cd animator && node src/cli.mjs sheet characters/tianji/character.json --out ../docs/assets/tianji_sheet.png` |
| `tianji_silhouette.png` | 剪影识别度测试：默认、亮扇、跳跃三个姿势只看轮廓（发髻星簪、折扇、宽袖道袍） | 8 KB | 由 `sheet --transparent` 的透明图取 alpha 填色 |
| `tianji_frames.png` | 主示例《天机泄露》的 6 帧：挥手开场、亮扇泄露、指向画面、走路、结尾两帧 | ≈0.3 MB | 先 `npm run demo`，再用 ffmpeg 从 `animator/examples/out/demo.mp4` 截取 1.5 / 4.6 / 9.6 / 12 / 22.8 / 24.6 秒 |
| `tianji-demo.mp4` | 《天机泄露》26 秒演示，540×960，**带配音**（Kokoro v1.1-zh，48 kbps 单声道 AAC；字幕已烧录） | ≈1.1 MB | `cd animator && npm run demo` 生成 1080×1920 版到 `examples/out/demo.mp4`，再缩到 540×960、音轨转 48 kbps 单声道 AAC |
| `videogen-route-c-demo.mp4` | videogen 路线 C 端到端演示成片，画面是 animator 渲染的**替身片段（STAND-IN）**，不是 AI 视频模型的输出；540×960，**带配音 + 自制合成 BGM**（48 kbps 单声道 AAC） | ≈0.6 MB | `bash videogen/examples/route-c/run_demo.sh` 生成原尺寸版，同样缩小并压缩音轨 |

- 预览视频的人声由本地开源 TTS [Kokoro-82M v1.1-zh](https://huggingface.co/hexgrad/Kokoro-82M-v1.1-zh)（hexgrad，Apache-2.0）经 [sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx)（Apache-2.0）合成；路线 C 的 BGM 由 `run_demo.sh` 用 ffmpeg 纯合成，不含第三方音乐。仓库不提交单独的音频文件和模型权重。
- 以上素材与「天机」形象一样按 Apache-2.0 发布（版权人：天机）。提醒：「天机」是频道的身份标识，请勿用于冒充频道或暗示其背书（Apache-2.0 第 6 条本就不授予商标使用权）。
