---
id: "youmind-9296"
title: "J-Pop 偶像教室舞蹈序列"
title_en: "J-Pop Idol Classroom Dance Sequence"
model: "Seedance 2.0"
language: "en"
medium: "真人"
direction: "现实向"
genre: "音乐MV"
art_style: null
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/2a263ccb9f5e7f2a9cd6db2e9fce5fe8cf59b98d/README.md#L3389"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "田中勇道 | AI画像・動画生成"
original_author_url: "https://x.com/yudotanaka"
original_post_url: "https://x.com/yudotanaka/status/2088966257664225740"
published: "Aug 16, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=9296"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# J-Pop 偶像教室舞蹈序列

*J-Pop Idol Classroom Dance Sequence*

> 这是一个为 Seedance 2.0 准备的、高度精细的逐拍编舞提示词，用于生成教室场景下的 J-pop 偶像舞蹈视频。

## 提示词（English）

```text
# Main Prompt - Idol Full-Body Groove (Classroom Ver.)
shot:
  type: r2v
  aspect_ratio: "9:16"
  camera: fixed, single continuous shot, no cuts
  framing: character occupies lower two-thirds of frame, medium shot from waist up, full arm extension should remain within frame
character:
  reference: use attached reference image for full appearance (face, outfit, colors, proportions)
  art_style: preserve original character art style / cel-shading from reference, do not blend with background style
motion:
  choreography_style: J-pop idol full-body groove - point dance hand accents combined with strong hip/chest movement, wide arm throws, and traveling footwork; energetic and dynamic, not restrained
  ground_rule: only beat_7 involves a brief hop; all other beats keep at least one foot grounded at all times, weight shifts through full leg and hip engagement rather than staying stiff
  sequence:
    - beat_1_2: wide step to the right with full weight transfer, both arms throw outward and up into a diagonal "V" shape, chest pops forward on the accent, hips follow the arm direction
    - beat_3: arms whip back down and across the body, torso twists with the motion, right hand ends in a sharp point toward the camera
    - beat_4: quick recover to center, small chest pop plus hip bump to the right on the offbeat
    - beat_5_6: mirror of beat_1_2 to the left - wide step, arms throw diagonally the other way, hips follow, chest pop
    - beat_7: energetic accent beat - one clean, controlled hop in place (both feet leave the floor briefly together, land together), arms pump downward on the landing for emphasis; this is the single high-energy peak of the sequence
    - beat_8: land, feet planted, body drops into a grounded groove - knees bent, torso rolls in a small body wave from chest to hips
    - beat_9_10: double point combo - right hand points forward with a step forward, immediately followed by left hand pointing forward with weight recovering back, hips keep swaying underneath
    - beat_11_12: full-body spin-out - a quick 180-degree turn using a pivot step (feet stay grounded, one foot pivots), arms sweep out during the turn, ending facing camera again with both arms opening into a wide "sparkle" gesture
    - loop: sequence repeats seamlessly from beat_1
  tempo: upbeat, driving, high-energy idol-pop tempo; gestures are large and confident, transitions snap rather than drift
  motion_notes: no slow motion, no speed ramping, natural constant playback speed throughout; beat_7's hop must read as one clean controlled jump-and-land, not repeated bouncing; all other beats stay grounded with movement driven by hip/torso/arm amplitude rather than vertical lift
setting:
  location: after-school classroom, empty of other students
  time_of_day: late afternoon / early evening, warm light through windows
  environment_details: rows of desks and chairs as soft silhouettes in the background, chalkboard
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/2a263ccb9f5e7f2a9cd6db2e9fce5fe8cf59b98d/README_zh.md#L3581)

```text
# 主提示词 - 偶像全身律动（教室版）
shot:
  type: r2v
  aspect_ratio: "9:16"
  camera: 固定机位，单次连续拍摄，无剪辑
  framing: 角色占据画面下三分之二，腰部以上中景，手臂完全伸展时应保持在画面内
character:
  reference: 使用附带的参考图以确定完整外观（脸部、服装、颜色、比例）
  art_style: 保留参考图中的原始角色艺术风格 / 赛璐珞风格，不要与背景风格融合
motion:
  choreography_style: J-pop 偶像全身律动 - 指向性舞蹈手势结合强有力的胯部/胸部动作、大幅度的手臂挥动以及位移步法；充满活力且动感，不拘束
  ground_rule: 仅 beat_7 包含短暂跳跃；所有其他节拍至少保持一只脚始终着地，通过腿部和胯部的充分参与来转移重心，而不是保持僵硬
  sequence:
    - beat_1_2: 向右大跨步并完全转移重心，双臂向外向上挥动形成对角线“V”字形，胸部在重音处前挺，胯部跟随手臂方向
    - beat_3: 手臂猛地向下并横跨身体，躯干随动作扭转，右手最后锐利地指向镜头
    - beat_4: 快速恢复至中心，小幅度胸部前挺，并在弱拍时向右顶胯
    - beat_5_6: beat_1_2 的左侧镜像动作 - 向左大跨步，手臂向另一侧对角线挥动，胯部跟随，胸部前挺
    - beat_7: 充满活力的重音拍 - 原地进行一次干净、可控的跳跃（双脚同时短暂离地，同时落地），落地时双臂向下摆动以强调；这是整个序列中唯一的能量高峰
    - beat_8: 落地，双脚站稳，身体下沉进入接地律动 - 膝盖弯曲，躯干从胸部到胯部进行小幅度的身体波浪动作
    - beat_9_10: 双重指向组合 - 右手向前指并向前迈步，紧接着左手向前指并重心后移，胯部在下方持续摆动
    - beat_11_12: 全身旋转 - 使用轴心步（双脚保持着地，一只脚作为轴心）进行快速 180 度转体，转体时双臂扫出，最后再次面向镜头，双臂张开形成一个大大的“闪耀”手势
    - loop: 序列从 beat_1 无缝循环
  tempo: 轻快、强劲、高能量的偶像流行乐节奏；动作幅度大且自信，过渡动作干脆利落，不拖泥带水
  motion_notes: 无慢动作，无变速，全程保持自然的恒定播放速度；beat_7 的跳跃必须表现为一次干净、可控的起跳与落地，不要出现重复弹跳；所有其他节拍保持接地，动作由胯部/躯干/手臂的幅度驱动，而非垂直升降
setting:
  location: 放学后的教室，没有其他学生
  time_of_day: 下午晚些时候 / 傍晚，温暖的阳光透过窗户
  environment_details: 背景中课桌椅的轮廓，黑板
```

## 出处与许可

- 原作者：[田中勇道 | AI画像・動画生成](https://x.com/yudotanaka) · 原帖：<https://x.com/yudotanaka/status/2088966257664225740>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/2a263ccb9f5e7f2a9cd6db2e9fce5fe8cf59b98d/README.md#L3389)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `2a263ccb9f5e`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=9296>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
