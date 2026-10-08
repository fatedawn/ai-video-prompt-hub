# 示例

| 目录 | 内容 | 命令（在 `animator/` 下运行） |
|---|---|---|
| `demo/` | **主示例《天机泄露 · 手绘动画小工具》**：约 26 秒（配音版），9:16，蜡笔风，4 个镜头、7 句台词。默认主持人天机挥手开场、亮扇「泄露天机」、指着画面讲解、走路、点头，结尾招牌动作 reveal + 跳一下；关键词（GitHub、台词、一笔、开源…）说到时画出来 | `npm run demo`（本地 TTS 配音 → 渲染）→ `examples/out/demo.mp4`；不装 TTS 用 `npm run demo:silent`（按 `demo.srt` 出静音版） |
| `doudou/` | 第二个示例《豆豆的早晨》：约 22 秒，原创角色豆豆走路、指向苹果树、挥手、被苹果吓一跳、捡起苹果 | `npm run demo:doudou` |
| `image-character/` | 图片角色示例：同一个豆豆，用一张 PNG 设定图定义，彩铅风，约 6 秒 | 先生成设定图（见下），再 `node src/cli.mjs render examples/image-character/project.json --out examples/out/image-character.mp4` |

## demo/（天机）

- `demo.srt`：7 句台词的句级时间（静音版用；完全离线、可复现）。
- `project.json`：镜头脚本，`"tts": {"engine": "local"}`，配音用天机的默认音色 `kokoro:zm_052`。每个元素和动作都绑定到台词里的词，例如说到「GitHub」画出 G 字标，说到「泄露」时亮扇、灯泡亮起，说到「一笔」时小太阳、小房子依次画出。
- 换配音不用改镜头脚本：`make` 会重新生成 `examples/out/demo.voice.{wav,srt,words.json}`，所有 `c3:台词` 这类引用自动落到真实读音上。

## doudou/（豆豆）

- 第 5、8 句的 `speaker` 是 `doudou`，会自动对口型并显示名牌。
- 想给它配音：`node src/cli.mjs make examples/doudou/project.json --engine local --out examples/out/doudou.mp4`（豆豆默认音色 `kokoro:zf_074`）。

## image-character/

`characters/doudou-png/sheet.png` 是生成物，不随仓库提交。第一次使用前先运行：

```bash
node src/cli.mjs sheet characters/doudou/character.json --transparent --out characters/doudou-png/sheet.png
```

命令会同时输出 `sheet.frames.json`（每格裁切坐标），`characters/doudou-png/character.json` 已经填好这些坐标。换成你自己的设定图时，改 `src` 和 `frames` 即可。

## 检查对齐与动态

```bash
node src/cli.mjs synccheck examples/demo/project.json examples/out/demo.mp4 --md examples/out/sync-report.md   # 消融法图文对齐
python3 tools/qa_motion.py examples/out/demo.mp4                                                                # 静止帧比例
node src/cli.mjs probe examples/demo/project.json --out examples/out/timeline.json
python3 tools/sync_frames.py examples/out/demo.mp4 examples/out/timeline.json examples/out/sync                  # 三连图人工核对
```

配音版主示例的实测结果（2026-10）：23 个绑定元素中 22 个在台词时间点之后 0.3 秒内出现、0 个提前；剩下 1 个（终端里的 `npm run demo` 文字）检测器晚报了 0.6 秒，逐帧查看确认它在台词时间点开始书写（检测器的漏检，不是不同步）。静止帧 0%，最长连续静止 0 帧。
