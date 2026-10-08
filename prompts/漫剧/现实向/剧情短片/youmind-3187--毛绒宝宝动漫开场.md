---
id: "youmind-3187"
title: "毛绒宝宝动漫开场"
title_en: "Baby Plush Anime Opening"
model: "Seedance 2.0"
language: "en"
medium: "漫剧"
direction: "现实向"
genre: "剧情短片"
art_style: "2D日漫"
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/03586f5aa393ddb8b4b424b1cf0ee52b51af59ea/README.md#L2088"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "Maki@Sunwood AI Labs."
original_author_url: "https://x.com/hAru_mAki_ch"
original_post_url: "https://x.com/hAru_mAki_ch/status/2043220996476535027"
published: "Apr 12, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=3187"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# 毛绒宝宝动漫开场

*Baby Plush Anime Opening*

> 一个 Seedance 2.0 提示词，利用平铺的毛绒宝宝吉祥物角色表来生成暗黑奇幻风格的动漫开场序列。

## 提示词（English）

```text
Full-color Japanese anime. Fast camera movement, strong speed ramping, high animation density, a 24 FPS anime opening. A viewpoint darting left and right, with dynamic poses.

type: anime_opening_continuous_camera_flythrough

style: dark fantasy anime, cel-shaded 2D, high contrast; characters use the attached tiled baby plush mascot design: SD/chibi, pastel storybook look, fluffy texture, big eyes, rosy cheeks, pacifiers, animal hoods

characters:
  $ A:
    ref: attached tiled baby plush character sheet
    design: lion baby plush mascot, regal
  $ B:
    ref: attached tiled baby plush character sheet
    design: bear baby plush mascot, brave
  $ C:
    ref: attached tiled baby plush character sheet
    design: rabbit baby plush mascot, mysterious
  $ D:
    ref: attached tiled baby plush character sheet
    design: fox baby plush mascot, sly

concept: >
  One continuous camera move through a blue void.
  Characters appear along the route. No cuts.

camera: fast forward dolly with lateral drifts, rollercoaster POV, nonstop

environment:
  space: infinite deep blue void, drifting white petals and feathers, diagonal blades and ribbons near lens
  palette: deep crimson (# 5A0000–# 8B0000), cyan mint accents, black shadows
  lighting: dramatic rim light, deep shadows

path:
  - subject: $ A
    pose: on a throne, lion plush baby, regal, magic aura
    framing: push-in close-up, drift past shoulder

  - subject: $ B
    pose: mid-lunge with enchanted blade, bear plush baby, action energy
    framing: quick arc around him

  - subject: $ C
    pose: katana vertical, eyes over steel, rabbit plush baby, quiet intensity
    framing: lateral drift past the blade

  - subject: $ D
    pose: shh gesture, blade tip foreground, fox plush baby, sly tension
    framing: low angle, slow final push-in, camera rests

foreground_wipes: diagonal blades, petals, feathers, ribbons passing close to lens
negative: hard cuts, static camera, fades, text, photorealism, realistic adult proportions, gritty realism
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/03586f5aa393ddb8b4b424b1cf0ee52b51af59ea/README_zh.md#L2169)

```text
全彩日本动漫。快速镜头移动，强烈的变速效果，高动画密度，24 FPS 动漫开场。视角左右穿梭，动作动态十足。

type: anime_opening_continuous_camera_flythrough

style: 暗黑奇幻动漫，赛璐珞 2D 风格，高对比度；角色使用附带的平铺毛绒宝宝吉祥物设计：SD/Q 版，柔和的绘本感，毛绒质感，大眼睛，红润脸颊，奶嘴，动物头套

characters:
  $ A:
    ref: 附带的平铺毛绒宝宝角色表
    design: 狮子毛绒宝宝吉祥物，威严
  $ B:
    ref: 附带的平铺毛绒宝宝角色表
    design: 熊毛绒宝宝吉祥物，勇敢
  $ C:
    ref: 附带的平铺毛绒宝宝角色表
    design: 兔子毛绒宝宝吉祥物，神秘
  $ D:
    ref: 附带的平铺毛绒宝宝角色表
    design: 狐狸毛绒宝宝吉祥物，狡黠

concept: >
  在蓝色虚空中进行一次连续的镜头移动。角色沿途出现。无剪辑。

camera: 快速向前推轨并伴随横向漂移，过山车式 POV，不间断

environment:
  space: 无尽深蓝虚空，漂浮的白色花瓣和羽毛，镜头附近有对角线刀刃和丝带
  palette: 深绯红 (# 5A0000–# 8B0000)，青薄荷色点缀，黑色阴影
  lighting: 戏剧性的轮廓光，深邃阴影

path:
  - subject: $ A
    pose: 在王座上，狮子毛绒宝宝，威严，魔法光环
    framing: 推入特写，从肩部掠过

  - subject: $ B
    pose: 持附魔之刃做出中途突刺动作，熊毛绒宝宝，动作张力
    framing: 围绕他快速弧形移动

  - subject: $ C
    pose: 武士刀垂直，双眼注视刀刃上方，兔子毛绒宝宝，静谧的张力
    framing: 沿刀刃横向漂移

  - subject: $ D
    pose: “嘘”的手势，刀尖位于前景，狐狸毛绒宝宝，狡黠的紧张感
    framing: 低角度，缓慢最终推入，镜头静止

foreground_wipes: 对角线刀刃、花瓣、羽毛、丝带在镜头近处掠过
negative: 硬切，静态镜头，淡入淡出，文字，照片写实，写实成人比例，粗粝写实主义
```

## 出处与许可

- 原作者：[Maki@Sunwood AI Labs.](https://x.com/hAru_mAki_ch) · 原帖：<https://x.com/hAru_mAki_ch/status/2043220996476535027>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/03586f5aa393ddb8b4b424b1cf0ee52b51af59ea/README.md#L2088)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `03586f5aa393`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=3187>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
