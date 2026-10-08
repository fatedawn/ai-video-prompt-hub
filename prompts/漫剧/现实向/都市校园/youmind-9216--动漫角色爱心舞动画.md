---
id: "youmind-9216"
title: "动漫角色爱心舞动画"
title_en: "Anime Character Heart Dance Animation"
model: "Seedance 2.0"
language: "en"
medium: "漫剧"
direction: "现实向"
genre: "都市校园"
art_style: "2D日漫"
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/7416100001e92726ff81f4c6e0fe00024c5c1bc2/README.md#L3838"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "田中勇道 | AI画像・動画生成"
original_author_url: "https://x.com/yudotanaka"
original_post_url: "https://x.com/yudotanaka/status/2088590413007560782"
published: "Aug 15, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=9216"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# 动漫角色爱心舞动画

*Anime Character Heart Dance Animation*

> 一份详细的视频生成提示词，用于创作一个在怀旧午后教室场景中跳着节奏感爱心舞的赛璐珞风格动漫角色。

## 提示词（English）

```text
# Main Prompt - A: Clockwise Heart (Classroom Ver.)
shot:
  type: r2v
  aspect_ratio: "9:16"
  camera: fixed, single continuous shot, no cuts
  framing: character occupies lower two-thirds of frame, medium shot from waist up

character:
  reference: use attached reference image for full appearance (face, outfit, colors, proportions)
  art_style: preserve original character art style / cel-shading from reference, do not blend with background style

motion:
  sequence:
    - beat_1_2: both arms raised, sweep in a slow clockwise circular motion like clock hands, starting from 12 o'clock position
    - beat_3: arms cross at chest height, hands open
    - beat_4: arms draw outward and down into a heart shape formed above the head, hold for half a beat
    - beat_5_6: small step-touch side to side (left-right), shoulders swaying gently in sync
    - loop: sequence repeats seamlessly from beat_1
  tempo: moderate pop tempo, sharp but not rushed transitions
  motion_notes: no slow motion, no speed ramping, natural constant playback speed throughout

setting:
  location: after-school classroom, empty of other students
  time_of_day: late afternoon / early evening, golden hour light through windows
  environment_details: rows of desks and chairs as soft silhouettes in the background, chalkboard faintly visible, window frames casting long soft shadows across the floor
  atmosphere: quiet, nostalgic, gentle contrast between the character's lively motion and the stillness of the empty room

background:
  style: simple, uncluttered classroom silhouette, low detail so it doesn't compete with character motion
  rendering: keep visually separate from character line/shading style; desks/windows rendered with minimal linework, mostly shape and light, not full detail
  motion: static background, only ambient light shift (e.g. faint dust motes in the light beam), no moving elements

lighting: warm golden-hour light streaming through windows from one side, soft rim light on character, gentle long shadows cast by desks

expression: light, playful smile, eyes forward toward camera during heart pose
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/7416100001e92726ff81f4c6e0fe00024c5c1bc2/README_zh.md#L4097)

```text
# 主提示词 - A：顺时针爱心舞（教室版）
镜头：
  类型：r2v
  宽高比："9:16"
  摄像机：固定机位，单次连续镜头，无剪辑
  取景：角色占据画面下三分之二，腰部以上中景

角色：
  参考：使用附带的参考图以确定完整外观（面部、服装、颜色、比例）
  艺术风格：保留参考图原始的角色艺术风格 / 赛璐珞着色，不要与背景风格融合

动作：
  序列：
    - 第 1-2 拍：双臂抬起，像时钟指针一样从 12 点钟位置开始，缓慢地做顺时针圆周运动
    - 第 3 拍：双臂在胸前交叉，手掌张开
    - 第 4 拍：双臂向外画弧并在头顶上方形成一个爱心形状，保持半拍
    - 第 5-6 拍：左右小碎步移动（左-右），肩膀随节奏轻微摆动
    - 循环：序列从第 1 拍开始无缝重复
  节奏：中速流行乐节奏，动作转换利落但不仓促
  动作备注：无慢动作，无变速，全程保持自然的恒定播放速度

场景：
  地点：放学后的教室，没有其他学生
  时间：傍晚 / 黄昏，透过窗户的黄金时刻光线
  环境细节：背景中课桌椅呈柔和的剪影，黑板隐约可见，窗框在地面投下长而柔和的阴影
  氛围：安静、怀旧，角色活泼的动作与空旷教室的静谧形成柔和对比

背景：
  风格：简洁、不杂乱的教室剪影，低细节以避免抢占角色动作的焦点
  渲染：保持与角色线条/着色风格的视觉分离；课桌/窗户采用极简线条渲染，以形状和光影为主，无需完整细节
  动态：静态背景，仅有环境光变化（例如光束中微弱的尘埃），无移动元素

光照：温暖的黄金时刻光线从一侧穿过窗户射入，角色身上有柔和的轮廓光，课桌投下柔和的长影

表情：轻快、俏皮的微笑，在比心动作时眼睛注视镜头
```

## 出处与许可

- 原作者：[田中勇道 | AI画像・動画生成](https://x.com/yudotanaka) · 原帖：<https://x.com/yudotanaka/status/2088590413007560782>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/7416100001e92726ff81f4c6e0fe00024c5c1bc2/README.md#L3838)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `7416100001e9`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=9216>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
