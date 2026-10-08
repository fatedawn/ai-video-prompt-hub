---
id: "youmind-5992"
title: "足球赛事直播模拟"
title_en: "Live Soccer TV Broadcast Simulation"
model: "Seedance 2.0"
language: "zh"
medium: "真人"
direction: "现实向"
genre: "运动"
art_style: null
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/755703f4b3b2fe08a65fd222eb12f14de1b7628a/README_zh.md#L2731"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "John"
original_author_url: "https://x.com/johnAGI168"
original_post_url: "https://x.com/johnAGI168/status/2065414140257075713"
published: "Jun 12, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=5992"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# 足球赛事直播模拟

*Live Soccer TV Broadcast Simulation*

> 专为 Seedance 2.0 设计的复杂多镜头提示词，旨在生成逼真的 8K 体育赛事直播画面。包含慢速推镜头和追踪镜头等运镜方式，以及动态记分牌和 LIVE 叠加层等功能性 UI 元素。

## 提示词（中文）

```text
[风格] 体育赛事直播真实感 (Live TV Broadcast Realism)，照片级真实感，8K 超高清，高帧率，夜间体育场灯光。
[时长] 15 秒。
[场景] 足球场直播信号，起始帧参考 @Image1：看台上身穿蓝色球衣的球迷海洋，体育场灯光下明亮的绿色草坪。
[角色] @Image1 中的白背心女观众（脸颊上有红色圆形贴纸，手持带有红圈的白旗）；场上为蓝队对阵黄队。
[全程保留] 左上角记分牌（蓝 2 : 0 黄 + 比赛计时器持续走动），右上角频道 Logo 和 LIVE 标记，作为直播信号叠加层 (Broadcast Overlay) 固定显示，不发生畸变或消失。

[00:00-00:03] 镜头 1：聚焦于她（慢速推镜头）
从原始参考图构图开始，摄像机缓慢推向 @Image1，她挥舞旗帜欢呼，周围球迷呐喊；记分牌计时器从 62:43 继续走动。

[00:03-00:08] 镜头 2：切换至比赛画面（硬切 → 直播广角 + 追踪）
硬切至高位全景直播视角，记分牌和 Logo 保持不变：蓝队推进，边锋高速盘带过掉两名黄队防守队员，急转弯时草屑飞溅。
低角度追踪：他强力传中，球划出弧线进入禁区，摄像机跟随球移动。

[00:08-00:11] 镜头 3：鱼跃头球破门（超慢动作）
极慢动作：蓝队前锋跃起鱼跃头球，球衣面料紧绷，汗水飞溅，额头触球；球疾速飞入死角，球网鼓起，守门员扑救不及。
进球瞬间，记分牌从 2 : 0 变为 3 : 0，伴随轻微的闪烁动画。
伴随球撞击球网的沉闷声 + 体育场瞬间爆发的欢呼声。

[00:11-00:15] 镜头 4：切回她（硬切 + 手持感）
硬切回原始看台位置：@Image1 跳起，挥舞旗帜，仰头欢呼，头发飞扬；球迷们跳跃拥抱，红白旗帜涌动。
记分牌定格在 3 : 0，计时器继续走动，画面在她跳至最高点时减速，以欢呼声浪的音效结束。
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的English版本（README.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/755703f4b3b2fe08a65fd222eb12f14de1b7628a/README.md#L2725)

```text
[Style] Sports event live broadcast realism (Live TV Broadcast Realism), photorealistic, 8K ultra-clear, high frame rate, night stadium lighting.
[Duration] 15 seconds.
[Scene] A football field live signal starting from the frame of @Image1: a sea of fans in blue jerseys in the stands, bright green grass under stadium lights.
[Characters] Female spectator in a white tank top @Image1 (red circular sticker on cheek, holding a white flag with a red circle); blue jersey team vs yellow jersey team on the field.
[Retain Throughout] Scoreboard in the top left corner (Blue 2 : 0 Yellow + match timer continuously moving), channel logo in the top right and LIVE mark, as broadcast signal overlays (Broadcast Overlay) fixed without distortion or disappearance.

[00:00-00:03] Shot 1: Focus on her (Slow Push-in)
Starts from the original reference image composition, camera slowly pushes in towards @Image1, she waves the flag and cheers, fans around her shout; scoreboard timer continues from 62:43.

[00:03-00:08] Shot 2: Cut to gameplay (Hard Cut → Broadcast Wide + Tracking)
Hard cut to a high panoramic broadcast view, scoreboard and logo remain: blue jersey team advances, winger dribbles past two yellow jersey defenders at high speed, grass splashes during sudden changes in direction.
Low Angle Tracking: He crosses the ball forcefully, ball curves into the box, camera follows the ball.

[00:08-00:11] Shot 3: Diving header goal (Super Slow-mo)
Extreme slow motion: blue jersey striker leaps for a diving header, jersey fabric tightens, sweat splatters, forehead hits the ball; ball zips into the corner, net bulges, goalkeeper misses.
At the moment of scoring, scoreboard changes from 2 : 0 to 3 : 0 with a slight flickering animation.
Accompanied by the dull thud of the ball hitting the net + instant stadium cheering.

[00:11-00:15] Shot 4: Cut back to her (Hard Cut + Handheld)
Hard cut back to original stand position: @Image1 jumps up, waving flag, cheering with head back, hair flying; fans jump and hug, white/red flag surges.
Scoreboard freezes at 3 : 0, timer continues, screen slows down at her highest jump, ending with cheering tsunami sound effects.
```

## 出处与许可

- 原作者：[John](https://x.com/johnAGI168) · 原帖：<https://x.com/johnAGI168/status/2065414140257075713>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/755703f4b3b2fe08a65fd222eb12f14de1b7628a/README_zh.md#L2731)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `755703f4b3b2`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=5992>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
