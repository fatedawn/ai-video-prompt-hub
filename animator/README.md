# animator · 手绘动画渲染器（handdrawn-animator）

把「一段台词（SRT 字幕或配音时间戳）+ 一份镜头脚本（JSON/YAML）」渲染成**一笔一笔画出来、跟着台词走**的手绘风短视频（MP4）。

- **画材**：蜡笔、彩铅、铅笔、钢笔、绘本水彩、马克笔六种。线条逐笔画出，再按画材「涂色」（蜡笔锯齿排线、彩铅单向排线、水彩晕染），带纸纹、颗粒和线条抖动（line boil）。
- **画面与台词对齐**：每个元素、每个角色动作都可以绑定到「第几句字幕」甚至「这句里的某个词」。台词说到「苹果树」时，苹果树正好开始画。
- **自定义角色**：在工程里声明一次角色，所有镜头复用。角色可以是 SVG 部件骨骼（会走路、挥手、点头、对口型、换表情），也可以是一张 PNG 设定图。
- **每个镜头都在动**：相机推拉摇移、手持微晃、震动；元素有摇摆、漂移、下落等动效；角色有走、跳、挥手。镜头之间有涂鸦擦除、淡入淡出等转场。
- **字幕烧录**：卡拉 OK 式逐字高亮，角色台词会带说话人名牌。
- **完全离线、可复现**：输出只由「工程文件 + 时间」决定（固定随机种子），同一份工程每次渲染结果一致。
- **默认主持人「天机」**：本仓库原创的默认角色（小仙师 + 技术宅：星星发簪、大圆眼镜、白胡子、靛蓝道袍、`</>` 折扇、星星伙伴「小星」），招牌动作「亮扇」`reveal`。`init` 模板、`make` 自动分镜和主示例都用他；豆豆是第二个示例角色。
- **一条命令出片 + 默认开源配音**：`make 台词.txt` → 本地开源 TTS（Kokoro v1.1-zh，Apache-2.0，CPU、免费、离线）配音 → 字级时间戳 → 渲染 → 带声音和逐字字幕的 MP4。在线 edge-tts 仅作可选备选。

> 本目录全部代码为本仓库原创实现，只借鉴了下面几个开源项目的**思路**；唯一复制的第三方内容是 `presets/handdrawn-styles.json`（画风提示词，MIT）。详见下文「致谢与来源」和仓库根目录的 `NOTICE.md`、`ATTRIBUTION.md`。

---

## 1. 快速开始

需要：Node.js ≥ 18、ffmpeg、一个 Chromium/Chrome 浏览器（用于离屏绘制）。

```bash
cd animator
npm install                 # 只装两个依赖：playwright-core（驱动浏览器）、yaml
npm run setup:tts           # 一次性：建 .venv、装本地 TTS 依赖、下载并校验模型（约 450 MB，存到 ~/.cache/hda-models）
npm run demo                # 主示例《天机泄露》：配音 → 字级对齐 → 渲染 → examples/out/demo.mp4（约 26 秒，1080×1920，带声音）
npm run demo:silent         # 不装 TTS 也能跑：按 SRT 出静音版

# 自己的视频：写一个台词文件，一行一句，空行分镜，「关键词」会在说到时画到画面上
node src/cli.mjs make 我的台词.txt --out out/我的视频.mp4
node src/cli.mjs init my-video            # 或者从模板（主持人：天机）新建完整工程，再细调镜头
```

找浏览器的顺序：环境变量 `HDA_CHROME` → playwright 自带的 Chromium → `~/.cache/ms-playwright/*` → 系统 Chrome / Chromium。都找不到时可以运行 `npx playwright install chromium`，或者设置 `HDA_CHROME=/path/to/chrome`。

常用命令（都在 `animator/` 下运行）：

| 命令 | 作用 |
|---|---|
| `node src/cli.mjs check 工程.json` | 校验工程，打印时间轴：每个元素几秒开始画、几秒画完，绑定了哪句台词 |
| `node src/cli.mjs render 工程.json --out out/x.mp4` | 渲染 MP4。可加 `--scale 0.5`（快速小样）、`--from 3 --to 8`（只渲染一段）、`--workers 4`、`--crf 20`、`--png`（同时导出逐帧 PNG） |
| `node src/cli.mjs render 工程.json --srt 新.srt --words 新.words.json --audio 新.mp3` | 换一版配音重新对齐，**镜头脚本不用改** |
| `node src/cli.mjs stills 工程.json --at 1.5,7.2` | 导出指定时刻的静帧 PNG |
| `node src/cli.mjs preview 工程.json` | 打开本地预览页，可拖动时间轴，人工校对节奏 |
| `node src/cli.mjs probe 工程.json --out out/timeline.json` | 导出每个元素的出现时间和屏幕位置（给对齐 QA 用） |
| `node src/cli.mjs sheet 角色.json --out 设定图.png [--transparent]` | 渲染角色设定图（每个表情、说话、挥手、指、跳各一格），同时输出每格裁切坐标 |
| `node src/cli.mjs styles --search 彩铅` / `--featured` / `--show kid-crayon` | 查询画风预设（给 AI 生图写角色设定图 / 背景提示词用） |
| `node src/cli.mjs make 工程.json或台词.txt --out x.mp4` | **一条命令出片**：TTS 配音 → SRT + 字级时间戳 → 渲染 → 带声音和字幕的 MP4（`--engine local\|edge\|none`、`--voice kokoro:zm_052`、`--character tianji`） |
| `node src/cli.mjs tts 工程.json` | 只生成配音 + SRT + 字级时间戳（默认本地开源 TTS；`--engine edge` 用在线 edge-tts，见第 6 节） |
| `node src/cli.mjs init 目录 [--character tianji]` | 用默认模板新建工程（主持人天机，3 句台词、带道具和动作） |
| `node src/cli.mjs synccheck 工程.json 成片.mp4 --md report.md` | 图文对齐检查（消融法：成片 vs 去掉该元素重渲染的同一帧），见第 5 节 |

`npm run preview` 等于以 0.5 倍分辨率渲染示例，`npm run check` 等于对示例运行 `check`。

---

## 2. 工程文件格式（project.json / project.yaml）

完整字段见 `schema/project.schema.json`（JSON Schema draft-07，VS Code 会自动补全和提示）。完整示例见 `examples/demo/project.json`。

```jsonc
{
  "$schema": "../../schema/project.schema.json",
  "title": "豆豆的早晨",
  "canvas": {"width": 1080, "height": 1920, "fps": 30},   // 9:16 竖屏
  "media": "crayon",                 // 画材：crayon | colored-pencil | pencil | ink | picture-book | marker
  "stylePreset": "kid-crayon",       // 可选：画风预设 id（只是提示词元数据；没写 media 时据此推荐画材）
  "paper": {"color": "#f8f2e4"},
  "timing": {"srt": "demo.srt"},     // 时间轴来源（见第 4 节）
  "subtitle": {"size": 58, "y": 0.86},
  "characters": {"doudou": "../../characters/doudou/character.json"},   // 角色只声明一次
  "script": [                         // 与 SRT 按序号对齐；speaker 指定这句是谁说的（自动对口型 + 名牌）
    {"text": "清晨，豆豆推开家门。"},
    {"text": "“早上好呀，苹果树！”", "speaker": "doudou"}
  ],
  "scenes": [ /* 镜头列表，见下 */ ]
}
```

### 2.1 镜头（scene）

```jsonc
{
  "id": "s2-苹果树",
  "cues": [3, 4, 5],                          // 这个镜头覆盖第 3–5 句台词
  "transition": {"type": "scribble", "dur": 0.7},   // 进入本镜头的转场：scribble | fade | slide | cut
  "camera": {
    "from": {"x": 540, "y": 1040, "zoom": 1.0},
    "keys": [{"at": "c3:苹果树", "x": 640, "y": 1060, "zoom": 1.05}],   // 相机关键帧也可以绑定台词
    "to":   {"x": 410, "y": 1170, "zoom": 1.22},
    "shakes": [{"at": "c7:吓", "dur": 0.4, "amp": 9}]
  },
  "elements": [ /* 道具、背景、文字 */ ],
  "actors":   [ /* 本镜头里出场的角色 */ ]
}
```

镜头时长不用手写，自动由台词推出：从第一句开始前 0.35 秒（`preroll`）开始，到下一个镜头开始时结束；最后一个镜头在最后一句结束后再留 1 秒（`tail`）。也可以用 `start` / `end` 手动指定。

一个镜头如果「相机不动、元素也没有任何动作」，`check` 会警告「画面会显得呆板」。

### 2.2 时间引用语法（所有 `at` / `until` 字段通用）

| 写法 | 含义 |
|---|---|
| `2.5` | 绝对时间 2.5 秒 |
| `"c3"` / `"c3.end"` | 第 3 句开始 / 结束 |
| `"c3:苹果树"` | 第 3 句里「苹果树」这个词开始说的时刻 |
| `"c3:苹果树.end"` | 这个词说完的时刻 |
| `"c3:好#2"` | 这句里第 2 次出现的「好」 |
| `"scene"` / `"scene.end"` | 本镜头开始 / 结束 |
| 任意写法后加 `+0.2` / `-0.3` | 偏移，例如 `"c3:开满花+0.2"`、`"scene.end+0.4"` |
| `{"cue": 3, "word": "苹果树", "edge": "end", "nth": 1, "offset": 0.1}` | 对象写法 |

词级时间来自 TTS 时间戳；只有句级 SRT 时，按字在句内线性估计（见第 4 节）。

### 2.3 元素（element）

```jsonc
{"id": "tree", "shape": "tree", "x": 790, "y": 1462, "origin": [100, 196], "scale": 3.0,
 "at": "c3:一棵", "draw": 1.6,                       // 说到「一棵」时开始画，1.6 秒画完
 "motion": [{"type": "sway", "deg": 1.2, "period": 3.2},
            {"type": "sway", "at": "c6:风", "until": "c6.end", "deg": 3.5, "period": 0.9}]}
```

- **来源（四选一）**：`shape`（内置道具，见下）、`svg`（你自己的 SVG 文件，会被拆成笔画逐笔画出并按画材涂色）、`image`（PNG/JPG，用涂鸦遮罩方式「画」出来）、`text`（手写感文字，逐字出现）。
- **内置道具**（`src/runtime/shapes.js`，均为原创 SVG）：ground、hill、grass、house、sun、cloud、tree、apple、flower、heart、star、sparkle、wind、road、lane、bird、bush、bubble、basket。可用 `colors` 覆盖配色。
- **出现方式 `appear`**：`draw`（默认，逐笔画出，铅笔光标跟随笔尖；`"pen": false` 可隐藏铅笔）、`pop`（弹出）、`fade`。
- **动效 `motion`**（可多个，每个可以有自己的 `at` / `until`）：`drift` 漂移、`sway` 摇摆、`spin` 旋转、`bob` 上下浮动、`pulse` 呼吸缩放、`twinkle` 闪烁、`rise` 升起、`move` 移动、`fall` 下落（带旋转）、`flow` 风线流动。
- **退场 `exit`**：`{"at": "c7", "dur": 0.4}`。
- **跟手 `attach`**：`{"actor": "doudou", "point": "hand_r", "at": "c7:捡起", "blend": 0.45, "offset": [6, -30]}`，从这一刻起元素跟着角色的手走（「捡起苹果」就是这样做的）。
- 其他：`z`（图层顺序）、`rot`、`media`（单个元素换画材）。

### 2.4 角色出场（actor）

```jsonc
{"character": "doudou", "x": 300, "y": 1460, "height": 520,
 "appear": {"type": "draw", "at": "c1:豆豆", "dur": 1.0},     // none | draw（逐笔画出）| pop | fade
 "actions": [
   {"type": "walk", "at": "c1:家门", "until": "c2+0.7", "from": [300, 1460], "to": [600, 1460]},
   {"type": "point", "arm": "arm_r", "at": "c3:苹果树", "dur": 1.7},
   {"type": "wave", "arm": "arm_r", "at": "c4:挥挥手", "until": "c5.end"},
   {"type": "expression", "name": "surprised", "at": "c7:吓"},
   {"type": "jump", "at": "c7:吓", "dur": 0.8},
   {"type": "nod", "times": 2, "at": "c8:嗯", "dur": 0.9}
 ]}
```

| 动作 | 参数 | 说明 |
|---|---|---|
| `walk` / `move` | `from`、`to`、`stepHz` | 走路（迈腿、摆臂、身体起伏）/ 平移 |
| `wave` | `arm`、`angle`、`hz` | 挥手 |
| `point` / `raise` | `arm`、`angle` | 指向 / 举手（举着道具时常用） |
| `nod` / `shake` | `times` | 点头 / 摇头 |
| `look` | `angle` | 抬头 / 低头看 |
| `jump` / `hop` | `height`、`times` | 跳一下 / 原地蹦跳 |
| `tremble` | — | 发抖 |
| `turn` | `face: left / right` | 转身（水平翻转） |
| `talk` | — | 手动指定说话时段（通常不用写：`script` 里 `speaker` 是这个角色的台词会自动对口型） |
| `expression` | `name` | 切换表情，一直保持到下一次切换 |

角色还会自动眨眼。`"autoTalk": false` 可以关闭自动对口型。

---

## 3. 定义你自己的角色

仓库自带两个原创角色：

| 角色 | 路径 | 特点 | 默认音色 |
|---|---|---|---|
| **天机**（默认） | `characters/tianji/` | 星星发簪、大圆眼镜（会反光）、白胡子、靛蓝交领道袍、金腰带、小罗盘，手持 `</>` 折扇；表情 normal / happy / surprised / smug / thinking；动作 wave / point / raise / nod / hop / walk 和招牌动作 **reveal（举扇一甩展开、露出 `</>`、星光闪）** | `kokoro:zm_052`（变体「激动」1.12× 语速、「悄悄话」0.9×） |
| 豆豆 | `characters/doudou/`、`characters/doudou-png/` | 圆脑袋小芽苗；SVG 骨骼版 + 图片设定图版 | `kokoro:zf_074` |

`node src/cli.mjs sheet characters/tianji/character.json --out tianji_sheet.png` 可以随时重新生成设定图。

角色写在一个 `character.json`（或 YAML）里，在工程的 `characters` 中声明一次，所有镜头复用同一个角色，造型就不会跑偏。字段见 `schema/character.schema.json`，示例见 `characters/doudou/`。

### 3.1 方式 A：SVG 部件骨骼（推荐，能做全部动作）

1. **画一个 SVG**（Inkscape、Figma、Illustrator 都可以），按部件分组，每组一个 `id`：

   ```
   leg_l, leg_r, body, head, arm_l, arm_r      ← 部件（<g id="...">），会绕关节旋转
   head 组内：eyes, eyes_closed, eyes_happy, eyes_wide, mouth_closed, mouth_open, mouth_smile, mouth_o, expr_xxx …
   ```

   - 部件在 SVG 里的先后顺序就是绘制的前后顺序。例如手臂写在头后面，举起来时才不会被头挡住。
   - 名字匹配 `eyes*`、`mouth*`、`brows*`、`blush*`、`expr_*` 的组是「可切换图层」，同一时间只显示当前表情要求的那几层。
   - 只用描边和填充，不要用滤镜或渐变。渲染器会把路径采样成笔画，按画材重新「画」一遍并涂色，原 SVG 不会被直接贴上去。

2. **写 character.json**：

   ```jsonc
   {
     "id": "doudou", "name": "豆豆", "color": "#f08a5d",       // color 用于字幕名牌
     "type": "rig", "height": 520,                             // 默认显示高度（像素）
     "prompt": "a round-headed little kid with a bean sprout …", // 可选：给 AI 生图保持角色一致的描述
     "voice": {"local": "kokoro:zf_074", "edge": "zh-CN-XiaoyiNeural",   // 可选：配音音色（本地 / edge）
               "variants": {"激动": {"speed": 1.12}}},                    //   台词里写 "voice": "激动" 即用变体
     "rig": {
       "svg": "doudou.svg",
       "anchor": [120, 338],                                    // 脚底点（SVG 坐标），角色的 x/y 指的就是这个点
       "parts": {
         "body":  {"pivot": [120, 262]},
         "head":  {"parent": "body", "pivot": [120, 172]},      // pivot = 关节（脖子）
         "arm_l": {"parent": "body", "pivot": [96, 184], "raise": 1},   // raise：举手时的旋转方向
         "arm_r": {"parent": "body", "pivot": [144, 184], "raise": -1},
         "leg_l": {"parent": "body", "pivot": [107, 258]},
         "leg_r": {"parent": "body", "pivot": [133, 258]}
       },
       "layers": {"eyes": "eyes", "blink": "eyes_closed", "mouthClosed": "mouth_closed", "mouthOpen": "mouth_open"}
     },
     "expressions": {
       "normal": {},
       "happy": {"eyes": "eyes_happy", "mouth": "mouth_smile"},
       "surprised": {"eyes": "eyes_wide", "mouth": "mouth_o", "extra": "expr_surprised"}
     },
     "points": {"hand_r": {"part": "arm_r", "at": [172, 254]}}   // 挂点：道具 attach 到这里就会跟手
   }
   ```

3. 运行 `node src/cli.mjs sheet characters/你的角色/character.json --out /tmp/sheet.png`，检查关节位置和每个表情是否正确。关节点不对时，动作会「脱臼」，调整 `pivot` 即可。

部件不全也能用：没有腿就不迈步，没有手臂就做不了挥手（`check` 会给出警告）。

### 3.2 方式 B：图片 / 角色设定图（PNG、SVG 都行）

适合已有 AI 生成或手绘的角色图。

```jsonc
{
  "id": "doudou-png", "name": "豆豆（图片版）", "type": "image", "height": 520,
  "image": {
    "sheet": {"src": "sheet.png",                         // 一张设定图 + 每格裁切矩形 [x, y, w, h]
              "frames": {"normal": [0,90,420,500], "happy": [420,90,420,500], "talk": [1260,90,420,500], "wave": [0,650,420,500]}},
    "anchor": [0.5, 0.98],                                  // 脚底点（按图片宽高比例）
    "views": {"front": "normal"},
    "expressions": {"happy": "happy"},                      // 表情名 → 格子名（或单独的图片文件路径）
    "mouth": {"open": "talk"},                              // 说话时与默认格交替，形成口型
    "actions": {"wave": "wave"}                             // 可选：动作进行时换成这张姿势图
  }
}
```

也可以不用设定图，直接给每个表情一张图：`"views": {"front": "normal.png"}, "expressions": {"happy": "happy.png"}`。

图片角色出场时用涂鸦遮罩「画」出来，可以走、跳、换表情、对口型。没有对应姿势图的挥手、点头等动作，会退化成整体摇晃或压缩（详见「已知限制」）。

`characters/doudou-png/` 演示了这种方式。它的 `sheet.png` 不随仓库提交，需要先用下面的命令生成：

```bash
node src/cli.mjs sheet characters/doudou/character.json --transparent --out characters/doudou-png/sheet.png
node src/cli.mjs render examples/image-character/project.json --out examples/out/image-character.mp4
```

### 3.3 用 AI 画角色时保持一致

`node src/cli.mjs styles --search 蜡笔` 可以查到 297 种手绘画风的提示词配方（来自 gnipbao/story-to-handdrawn-video，见致谢）。把角色的 `prompt` 和画风配方拼起来，生成一张「多表情角色设定图」，再按方式 B 填裁切坐标，就能得到与动画画风一致的图片角色。这一步完全可选，渲染器本身不依赖任何 AI 服务。

---

## 4. 时间轴从哪里来

| 来源 | 写法 | 精度 |
|---|---|---|
| 自己的配音 + SRT（推荐） | `"timing": {"srt": "x.srt", "audio": "x.mp3"}`（audio 会混进成片） | 句级准确；句内的词按字数线性估计 |
| TTS 词级时间戳 | `"timing": {"srt": "voice.srt", "words": "voice.words.json", "audio": "voice.mp3"}` | 词级准确 |
| 草稿估算 | `"timing": {"estimate": {"cps": 4.5}}` | 只按字数估算，仅供打样 |

换了配音以后，只要台词句数不变，镜头脚本一个字都不用改：所有 `c3:苹果树` 这样的引用会自动对齐到新时间。渲染时还会在 MP4 旁边输出一份同名 `.srt`，方便上传平台时作为外挂字幕。

**字幕字体**：不随仓库打包任何字体，按顺序调用系统字体 `"LXGW WenKai"（霞鹜文楷，OFL）→ "Noto Sans CJK SC"（思源黑体，OFL）→ …`。想要手写感，可以自行安装霞鹜文楷，或在 `subtitle.font` 中指定任意已安装的字体。

---

## 5. 质量检查工具（tools/）

| 工具 | 作用 |
|---|---|
| `python3 tools/qa_motion.py out.mp4` | 静止帧比例：相邻帧几乎无变化的帧占比（算法：缩到 160px 宽灰度图，相邻帧平均差 < 0.05 记为静止；与调研 story-to-handdrawn-video 时用的帧差脚本一致），以及最长连续静止段 |
| `python3 tools/check_sync.py out.mp4 timeline.json --md report.md` | 图文对齐：逐帧检测每个绑定了台词的元素在**成片里**第一次出现墨迹的时间，与绑定的词对比 |
| `python3 tools/sync_frames.py out.mp4 timeline.json 输出目录 [元素id…]` | 为每个绑定元素裁出「台词前 / 台词后 / 画完」三连图，供人工核对 |

需要 ffmpeg 和 numpy。`timeline.json` 由 `probe` 命令生成。`check_sync` 遇到相机移动、相邻元素重叠时可能误报「提前出现」，请用 `sync_frames` 的三连图人工确认。

---

## 6. 配音：默认本地开源 TTS（edge-tts 可选）

```bash
npm run setup:tts                                     # 一次性安装（Python ≥ 3.9）；模型自动下载并校验 sha256
node src/cli.mjs make examples/demo/project.json      # 配音 + 渲染一步到位
node src/cli.mjs tts examples/demo/project.json       # 只出配音：voice.wav / voice.srt / voice.words.json
node src/cli.mjs make 台词.txt --engine edge           # 改用在线 edge-tts（需 pip install edge-tts、联网）
```

**怎么工作**：sherpa-onnx 在 CPU 上运行 Kokoro v1.1-zh，逐句、逐短语（按标点切分）合成并去掉首尾静音，所以短语边界是精确的；再用 faster-whisper（small）给出词级时间，按拼音和台词原文比对，得到**每个字**的起止时间（比对不上的字在所在短语内插值；没装 whisper 时按停顿 + 字数估计）。输出的 `words.json` 与 edge-tts 格式相同，镜头脚本里的 `c3:苹果树` 绑定会自动落在真实读音上。

**选音色**：角色 `voice.local` 或台词的 `voice` 字段，写法 `kokoro:zf_001`（名字）/ `kokoro:59`（编号，共 103 个）/ `melo` / `aishell3:66`。工程级 `tts` 字段可设 `engine`、`voice`、`speed`、`align`（auto / whisper / even）、`gap`、`lead`。

**为什么默认 Kokoro**（2026-10 在本仓库的 CPU 盒子上实测：同一段约 100 字的中文，用 whisper-small 转写后按拼音算字错误率 CER，越低越清楚；RTF = 合成耗时 / 音频时长，越低越快。CER 含 whisper 自身误差，只用于相对比较）：

| 引擎 / 音色 | 许可证（模型 + 推理） | CER | RTF |
|---|---|---|---|
| **Kokoro v1.1-zh `zf_001`**（女，默认旁白） | Apache-2.0 + sherpa-onnx Apache-2.0 | **0.077** | 0.29 |
| Kokoro `zf_017`（女） | 同上 | 0.087 | 0.24 |
| **Kokoro `zm_052`**（男，天机） | 同上 | 0.096 | 0.33 |
| Kokoro `zm_045` / `zf_074`（豆豆） | 同上 | 0.106 / 0.106 | 0.26 / 0.29 |
| Kokoro `zf_092` / `zm_016` | 同上 | 0.125 / 0.154 | 0.25 / 0.24 |
| MeloTTS 中英（`melo`） | MIT | 0.212 | 0.31 |
| VITS AISHELL-3（`aishell3:66`） | 压缩包内**无许可证文件**，仅作备选 | 0.538 | 0.13 |

加上 whisper 对齐，整条流程约 0.8 倍实时（26 秒的配音约 20 秒处理完）。

**模型与许可**：模型不随仓库提交，由 `tts/fetch_models.py` 从上游下载到 `$HDA_MODELS`（默认 `~/.cache/hda-models`），逐个校验 `tts/models.json` 中记录的 sha256（whisper 固定到 Hugging Face 的具体 revision）。`python tts/fetch_models.py --list` 查看清单。Kokoro-82M（hexgrad，Apache-2.0）、sherpa-onnx（k2-fsa，Apache-2.0）、MeloTTS（MyShell，MIT）、faster-whisper（SYSTRAN，MIT）、pypinyin（MIT）均允许商用和再分发；本地 TTS 生成的音频归你使用。

**edge-tts（可选）**：调用微软 Edge「大声朗读」的在线语音，**不是**官方开放的商用接口；生成音频能否商用、再分发请自行确认微软条款。

无论哪种引擎，**本仓库都不提交任何生成的音频**（`.gitignore` 已排除 `*.voice.*`）。正式作品也可以用自己录制的配音：配一份 SRT，`render --srt x.srt --audio x.wav` 即可同样自动对齐。

---

## 7. 目录结构

```
animator/
├── README.md                    本文件
├── package.json                 依赖：playwright-core、yaml；脚本 setup:tts / demo / make
├── schema/                      project / character 的 JSON Schema
├── src/
│   ├── cli.mjs                  命令行入口
│   ├── project.mjs              工程编译：读取 SRT / 词级时间戳，解析时间引用，校验并生成时间轴
│   ├── browser.mjs              启动浏览器，多页并行渲染，帧通过管道送给 ffmpeg 编码
│   ├── srt.mjs  styles.mjs
│   ├── tts.mjs                  配音调度：本地 TTS（默认）/ edge-tts，音色解析
│   ├── autoscript.mjs           台词 .txt → 工程（自动分镜、关键词上屏、角色动作）
│   ├── synccheck.mjs            消融法图文对齐检查
│   └── runtime/                 在浏览器里运行的绘制引擎（Canvas 2D）
│       ├── engine.js            镜头、相机、元素动效、转场、字幕、铅笔光标
│       ├── geometry.js          SVG → 笔画采样，生成涂色排线
│       ├── media.js             画材参数、纸纹、颗粒、笔触
│       ├── sprite.js            笔画渲染与缓存
│       ├── rig.js               角色骨骼、动作、表情、口型，以及图片角色
│       ├── shapes.js            内置道具 SVG（原创）
│       └── util.js  index.html
├── characters/
│   ├── tianji/                  原创默认角色「天机」（SVG 骨骼 + 招牌动作 reveal）
│   ├── doudou/                  原创示例角色「豆豆」（SVG 骨骼）
│   └── doudou-png/              同一角色的「图片 / 设定图」用法示例
├── presets/handdrawn-styles.json   297 种画风提示词 + 30 套配色（MIT，第三方，见 NOTICE）
├── examples/
│   ├── demo/                    主示例《天机泄露》：工程文件 + SRT（静音版）
│   ├── doudou/                  第二个示例《豆豆的早晨》
│   ├── image-character/         图片角色示例
│   └── out/                     渲染输出（不提交）
├── templates/                   init 用的默认工程模板（主持人：天机）
├── tts/                         本地 TTS：tts_local.py、fetch_models.py、models.json（URL + sha256）、requirements.txt
└── tools/                       QA 脚本与 edge-tts 辅助（Python）
```

---

## 8. 致谢与来源（每个想法从哪里来）

本目录的代码由本仓库从零实现，**没有复制**下列项目的代码。下表说明每个想法的出处，许可均已按各仓库的 LICENSE 文件核对（取用的 commit 见 `ATTRIBUTION.md`）。

| 想法 | 出处 | 许可 | 本仓库的实现 |
|---|---|---|---|
| 元素绑定到字幕时间戳；笔画连续画出、笔尖带着画笔走 | [geeklee/srt-whiteboard-animation](https://github.com/geeklee/srt-whiteboard-animation) | MIT | `project.mjs` 的时间引用语法（细化到「句内某个词」）；`engine.js` 的逐笔绘制和铅笔光标 |
| 以真实手绘媒介（蜡笔、彩铅…）逐笔画出，而不是矢量描边动画 | [alexgreensh/anidoodle](https://github.com/alexgreensh/anidoodle) | Apache-2.0 | `media.js` / `geometry.js` / `sprite.js`：SVG 采样成笔画，按画材排线涂色、加颗粒、线条抖动 |
| Canvas 逐帧渲染 → 浏览器 → ffmpeg 的管线；JSON 镜头脚本 + cue；每个镜头必须有主动作；相机和转场 | [alchaincyf/huashu-art-motion](https://github.com/alchaincyf/huashu-art-motion)（仅参考其 MIT 代码部分的思路） | 代码 MIT | `browser.mjs`、`engine.js`。**未使用**其 Arphic 笔画数据、字体，以及「花叔」形象和任何角色素材；角色系统与其无关 |
| 297 种手绘画风提示词库 | [gnipbao/story-to-handdrawn-video](https://github.com/gnipbao/story-to-handdrawn-video)，其中大部分条目改编自 [yang0/handraw-style](https://github.com/yang0/handraw-style)（原作者 yang0），部分来自 [threerocks/hand-drawn-styles](https://github.com/threerocks/hand-drawn-styles)（原作者 liulei） | MIT | `presets/handdrawn-styles.json`：**复制了文字数据**（删去图片字段），仅作可选的提示词预设 |
| 角色只定义一次、跨镜头保持一致（角色设定图） | [HKUDS/ViMax](https://github.com/HKUDS/ViMax)、[HBAI-Ltd/Toonflow-app](https://github.com/HBAI-Ltd/Toonflow-app) | MIT | `characters/*/character.json` + 工程级 `characters` 声明；`sheet` 命令生成设定图 |

特别说明：上游画风库有 15 条用品牌、商标作品或具体艺术家名作风格参照（如 Instagram、Copic、迪士尼、丁丁历险记、几米、桑贝、South Park）。本仓库已把它们改写为通用的画法描述（id 不变，改动列表见该文件 `_provenance.modifications`）；「丰子恺文人漫画」保留（丰子恺 1975 年去世，属艺术史风格称谓）。

---

## 9. 已知限制

- **图片角色没有关节**：没有对应姿势图（`image.actions`）时，挥手、点头等只是整体摇晃；说话格会暂时盖过表情格。想要完整动作，请用 SVG 骨骼。
- **骨骼角色只有正面**：没有侧面、背面视角切换。`turn` 只是水平翻转。
- **线条粗细按角色高度生成**：同一角色在特写（放大很多）时线条也会相应变粗。这是有意保持手绘感，但极端特写时会显得笨重。
- **字级对齐偶尔失手**：whisper 偶尔转写不出某句（实测几十句里出现过一次），这句会退回「短语边界精确 + 句内按字数估计」，误差在零点几秒内；重跑一般就好，`HDA_ALIGN_DEBUG=1` 可打印 whisper 的转写。
- **没有配音时，词级时间是估算的**：只有句级 SRT 时，句内的词按字数线性分配，语速不均时会有零点几秒误差。需要精确到词时，请提供词级时间戳。
- **内置道具不多**（19 种）。其他物件请用自己的 SVG（`"svg": "x.svg"`）或图片。
- **对齐检测会误报**：`check_sync.py` 基于像素变化，相机移动或元素重叠时可能误报「提前出现」，需要结合三连图人工确认。
- 渲染依赖本机 Chromium 和 ffmpeg。1080×1920、22 秒的示例，4 个并行页面大约需要 20–25 秒。

## 10. 许可

本目录的代码、原创角色「天机」「豆豆」（含形象与设定图）、内置道具 SVG、示例与文档属于本仓库原创内容，版权人为「天机」，按 **Apache-2.0** 发布（根目录 `LICENSE`、`NOTICE`）。提醒：「天机」是频道的身份标识，Apache-2.0 第 6 条本就不授予商标 / 商号使用权，请勿用「天机」名称或形象冒充频道或暗示其背书（这不是附加限制）。`presets/handdrawn-styles.json` 的上游条目是第三方 MIT 内容，按其上游许可提供（许可全文见 `LICENSES/`），本仓库对其所做的改写按 Apache-2.0 提供。TTS 模型不随仓库分发，许可见第 6 节。
