---
id: "youmind-9728"
title: "Breaking 托马斯全旋接风车动作序列"
title_en: "Breakdance Flare to Windmill Sequence"
model: "Seedance 2.0"
language: "en"
medium: "漫剧"
direction: "现实向"
genre: "剧情短片"
art_style: "2D日漫"
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/3d4add951cc2ecc497ddb065a23ea75bcc932cb7/README.md#L3093"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "田中勇道 | AI画像・動画生成"
original_author_url: "https://x.com/yudotanaka"
original_post_url: "https://x.com/yudotanaka/status/2091679479362207763"
published: "Aug 24, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=9728"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# Breaking 托马斯全旋接风车动作序列

*Breakdance Flare to Windmill Sequence*

> 这是一个为 Seedance 2.0 设计的高技术 YAML 风格提示词，用于生成一段 15 秒的连续 Breaking 组合动作，包含精确的物理效果和运动分段。

## 提示词（English）

```text
shot:
  type: R2V
  reference: <Picture 1>
  camera: fixed, eye-level, medium-wide shot capturing full body throughout, no cuts
  duration: 15-second continuous sequence, constant tempo throughout
character:
  appearance: delegated entirely to <Picture 1>, no additional description
  style_separation:
    character: cel-shaded anime style, locked to reference image
    environment: photorealistic indoor dance studio floor, neutral wall, soft even lighting
action:
  sequence_name: thomas_flare_to_windmill_combo
  segments:
    - segment: intro_setup
      duration: approx 0-3s
      description: standing neutral pose transitions down into crouched base position, both palms grounding shoulder-width apart, core braced, hips settling to a fixed rotation height
    - segment: flare_combo
      duration: approx 3-9s
      support_pattern: alternating two-hand support, hand-to-hand transfer, no static single-hand hold
      description: two continuous flare rotations - right leg sweeps laterally at constant angular velocity, left leg sweeps diagonally downward-forward as support hand transfers, right leg continues diagonally upward with legs held widely split throughout, hips remain the stationary rotation axis with no vertical bounce; cycle repeats once more at identical speed
    - segment: transition_to_windmill
      duration: approx 9-11s
      description: on the final flare rotation, upper back and shoulder lower to the floor while legs continue their circular momentum, torso rolling from the flare's hip-axis rotation into a back-and-shoulder-axis rotation, hands lift off the floor and tuck near the chest as the transition completes
    - segment: windmill_execution
      duration: approx 11-15s
      description: two continuous windmill rotations - legs swing in a wide circular arc overhead while the upper back and shoulders roll across the floor in constant-velocity rotation, legs stay extended and split for momentum, no hands touching the floor for support during this segment
physics_constraints:
  - hip axis remains at constant height during the flare segment, no vertical bounce
  - leg sweeps driven by hip rotation and knee flexion, not by jumping or floating
  - hand-to-floor contact during the flare is continuous except the brief instant of transfer between palms
  - the flare-to-windmill transition is a smooth momentum carry-over, not a stop-and-restart
  - during the windmill segment, rotation is driven by shoulder-and-back contact with the floor, not by pushing off with hands
  - rotation speed stays constant within each segment, no acceleration bursts
  - legs stay maximally extended and split during all rotation segments to convey centrifugal force
lighting: soft studio lighting, consistent throughout, no flicker
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/3d4add951cc2ecc497ddb065a23ea75bcc932cb7/README_zh.md#L3148)

```text
shot:
  type: R2V
  reference: <Picture 1>
  camera: 固定机位，平视角度，中远景镜头，全程捕捉全身，无剪辑
  duration: 15 秒连续序列，全程保持恒定节奏
character:
  appearance: 完全由 <Picture 1> 决定，无需额外描述
  style_separation:
    character: 赛璐珞动漫风格，锁定参考图
    environment: 写实风格室内舞蹈室地板，中性墙面，柔和均匀的灯光
action:
  sequence_name: thomas_flare_to_windmill_combo
  segments:
    - segment: intro_setup
      duration: 约 0-3 秒
      description: 从站立中性姿势过渡到蹲姿，双手掌心撑地，与肩同宽，核心收紧，臀部保持在固定的旋转高度
    - segment: flare_combo
      duration: 约 3-9 秒
      support_pattern: 双手交替支撑，手部转移，无单手静止支撑
      description: 两次连续的托马斯全旋 - 右腿以恒定的角速度横向扫动，左腿在换手时对角向下前方扫动，右腿继续对角向上，全程保持双腿大幅度劈叉，臀部作为固定的旋转轴，无垂直起伏；循环重复一次，速度保持一致
    - segment: transition_to_windmill
      duration: 约 9-11 秒
      description: 在最后一次托马斯全旋时，上背部和肩部降低至地面，同时双腿保持圆周动量，躯干从托马斯全旋的臀部轴心旋转过渡到背部和肩部轴心旋转，双手离开地面并收于胸前，完成过渡
    - segment: windmill_execution
      duration: 约 11-15 秒
      description: 两次连续的风车旋转 - 双腿在头顶划出宽大的圆弧，同时上背部和肩部在地面上以恒定速度滚动，双腿保持伸展和劈叉以维持动量，此阶段双手不触地支撑
physics_constraints:
  - 托马斯全旋阶段臀部轴心保持恒定高度，无垂直起伏
  - 腿部扫动由臀部旋转和膝盖弯曲驱动，而非跳跃或漂浮
  - 托马斯全旋期间手部与地面的接触是连续的，仅在手掌交替的瞬间短暂离开
  - 托马斯全旋到风车的过渡是平滑的动量传递，而非停止后重启
  - 风车阶段的旋转由肩部和背部与地面的接触驱动，而非靠手部推地
  - 每个阶段的旋转速度保持恒定，无加速突变
  - 在所有旋转阶段，双腿保持最大程度的伸展和劈叉，以体现离心力
lighting: 柔和的摄影棚灯光，全程保持一致，无闪烁
```

## 出处与许可

- 原作者：[田中勇道 | AI画像・動画生成](https://x.com/yudotanaka) · 原帖：<https://x.com/yudotanaka/status/2091679479362207763>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/3d4add951cc2ecc497ddb065a23ea75bcc932cb7/README.md#L3093)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `3d4add951cc2`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=9728>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
