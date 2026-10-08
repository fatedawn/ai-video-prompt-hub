---
id: "youmind-730"
title: "Seedance 2.0 提示词，用于“卡片检查”过渡视频"
title_en: "Seedance 2.0 Prompt for 'Card Check' Transition Video"
model: "Seedance 2.0"
language: "zh"
medium: "真人"
direction: "现实向"
genre: "情绪特写"
art_style: null
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/fa969d7a723b77facaf4336fd3ac026af19bd2d4/README_zh.md#L2949"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "李岳"
original_author_url: "https://x.com/liyue_ai"
original_post_url: "https://x.com/liyue_ai/status/2028008930396561624"
published: "Mar 1, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=730"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# Seedance 2.0 提示词，用于“卡片检查”过渡视频

*Seedance 2.0 Prompt for 'Card Check' Transition Video*

> 一个极其详细、带有时间码且技术性极强的 Seedance 2.0 提示，用于生成一个 10 秒的视频转场序列，该序列以一个角色操纵一张卡片开始，并以戏剧性地揭示一个全新的、诱人的身份（猫耳形象）结束。该提示详细说明了摄像机角度、运动动态、灯光和视觉效果，并严格禁止了某些伪影，如额外的卡片粒子。

## 提示词（中文）

```text
锁定首帧初始图像，宽高比 16:9，总时长 10 秒。场景以对角低角度中景特写开场。

上半身部分可见，头部偏左。右手食指和中指仅侧向持有一张扑克牌，横贯屏幕中央，眼神坚毅（firm and calm），面部呈现出专注（laser-like concentration）且极简（minimalist）的表情。

0 秒 - 2 秒（开场动能：平静的物理操控）：在 1.6 秒时，手腕轻微旋转，使孤立的牌面翻转，露出红色背面。此动能作为锚点，触发摄像机拉直并执行平滑的推拉（Dolly Out），展现出带有冷白色矩阵灯光和高光地板的中景走廊。

2 秒 - 4 秒（空间拉伸与单张卡牌弧线轨迹）：主角双手旋转（单张卡牌 1.5），然后平滑地将双手分开（双手分开，无任何抛掷动作）。这张单张扑克牌仿佛受到磁力吸引，以其轴心为中心，平行于地面进行高速水平自旋（High-speed horizontal axis-spin），并沿着从右到左的水平半圆形弧线轨迹在肩部高度移动。严禁粒子喷射效果，严禁卡牌飞向摄像机（Z 轴），绝对禁止空间中出现第二张卡牌的任何像素残影（Absolutely zero extra card particles）。同时，摄像机快速拉远至全景，将画面中心完全留给孤立旋转卡牌的轨迹。

4 秒 - 6 秒（摄像机回弹与卡牌接取准备）：摄像机利用卡牌的惯性快速推近（Dolly In），重新锁定主体。左手精准接住单张卡牌并收回腕关节进行准备。此时，整个物理空间仍处于“单卡真空”状态。

6 秒 - 7 秒（遮蔽过渡：从现实到舞台的临界点）：牌面直接面向摄像机。摄像机以牌面为聚焦锚点，执行指数级加速冲刺。在 5.5 秒时，牌面完全占据屏幕 100%，形成物理遮挡锚点，实现空间中断。

7 秒 - 10 秒（身份变异与迷人定格）：牌面滑开的瞬间，平滑过渡到红色连衣裙、猫耳形象。场景瞬间切换到 14 毫米超广角强透视构图。位于屏幕中央，面部表情变为魅惑（charming）和权威（authoritative gaze），带着性感的坏笑（sultry smirk）和掌控的优雅（dominant elegance）。

主角左手张开，以穿透性的动态直指摄像机。手掌因透视效果显得异常巨大，营造出破屏效果，身体略微后倾。背景已切换为深色背景和金色雕花画框。顶部强烈的逆光勾勒出主体猫耳和银发清晰的轮廓光。红色连衣裙材质在侧光下呈现出深邃的光影渐变。

多张失焦的扑克牌作为前景元素缓慢旋转，营造出撕裂般的空间深度感。主体右手食指轻触下颌，目光锁定摄像机。场景最终以极具电影感的华丽姿态定格。
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的English版本（README.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/fa969d7a723b77facaf4336fd3ac026af19bd2d4/README.md#L2933)

```text
Lock the initial image for the first frame, aspect ratio 16:9, total duration 10s. The scene opens with a Diagonal Low-angle Medium Close-up.

The upper body is partially visible, the head is on the left side. The right index and middle fingers are only holding one single card sideways across the center of the screen, the gaze is Stoic (firm and calm), the face presents a Laser-focused (laser-like concentration) Minimalist (minimalist) expression.

0s - 2s (Opening kinetic energy: Calm physical manipulation): At 1.6s, the wrist slightly rotates, causing the isolated card face to flip and display its red back. This kinetic energy acts as an anchor point to trigger the camera to straighten and execute a smooth Dolly Out, revealing the mid-shot corridor with cold white matrix lighting and high-gloss flooring.

2s - 4s (Space stretching and single card arc trajectory): The protagonist rotates the (single card 1.5) with both hands and then smoothly moves them apart (Hands move apart without any throwing motion). The single playing card, as if attracted by magnetic force, executes a high-speed horizontal self-spin (High-speed horizontal axis-spin) parallel to the ground, centered on its axis, and follows a horizontal semi-circular arc trajectory from right to left at shoulder height. Strictly prohibit particle spray effects, strictly prohibit the card from flying towards the camera (Z-axis), and absolutely prohibit any pixel afterimages of a second card in the space (Absolutely zero extra card particles). Simultaneously, the camera quickly zooms out to a full shot, leaving the center of the view entirely to the trajectory of the isolated spinning card.

4s - 6s (Camera rebound and card catching preparation): The camera uses the card's inertia to rapidly push in (Dolly In), locking back onto the subject. The left hand precisely catches the single card and retracts the wrist joint to prepare. At this time, the entire physical space remains in a 'single card vacuum' state.

6s - 7s (Obscuring transition: The critical point from reality to stage): The card face is displayed directly towards the camera. The camera uses the card face as a focusing anchor point to execute an exponentially accelerated dash. At 5.5s, the card face completely occupies 100% of the screen, forming a physical occlusion anchor point, achieving spatial interruption.

7s - 10s (Identity mutation and captivating freeze frame): The moment the card face slides open, a smooth transition occurs to a red dress, cat-eared image. The scene instantly switches to an Ultra-wide angle 14mm strong perspective composition. Located in the center of the screen, the facial expression changes to Alluring (charming) and Authoritative gaze (authoritative gaze), with a Sultry smirk (sexy sneer) and Dominant elegance (controlling elegance).

The protagonist's left hand is spread open, pointing straight at the camera in a penetrating dynamic. The palm appears extremely large due to perspective, creating a screen-breaking effect, and the body is slightly leaning back. The background has now switched to a dark backdrop and a gold carved picture frame. Strong backlighting from the top outlines sharp rim lighting on the subject's cat ears and silver hair. The red dress material shows a deep light and shadow gradient under the side light.

Multiple playing cards, out of focus, rotate slowly as foreground elements, creating a tearing sense of spatial depth. The subject's right index finger lightly touches the jaw, eyes locked on the camera. The scene finally freezes in a gorgeous posture with extreme cinematic depth.
```

## 出处与许可

- 原作者：[李岳](https://x.com/liyue_ai) · 原帖：<https://x.com/liyue_ai/status/2028008930396561624>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/fa969d7a723b77facaf4336fd3ac026af19bd2d4/README_zh.md#L2949)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `fa969d7a723b`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=730>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
