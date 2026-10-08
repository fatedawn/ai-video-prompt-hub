---
id: "youmind-2689"
title: "2D 格斗游戏序列 Prompt"
title_en: "2D Fighting Game Sequence Prompt"
model: "Seedance 2.0"
language: "en"
medium: "漫剧"
direction: "特效向"
genre: "战斗大招"
art_style: "2D日漫"
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/c332e2f6b953f4265362d7d8b98a3256016ff78f/README.md#L2529"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "ShadeLurk"
original_author_url: "https://x.com/ShadeLurk"
original_post_url: "https://x.com/ShadeLurk/status/2040403855041806690"
published: "Apr 4, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=2689"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# 2D 格斗游戏序列 Prompt

*2D Fighting Game Sequence Prompt*

> 这是一个为 Seedance 2.0 设计的高度结构化、多镜头 Prompt，旨在生成一段模拟 2D 格斗电子游戏的序列，包含 HUD 元素、必杀技触发以及终结技序列。

## 提示词（English）

```text
# ═══════════════════════════════════════════════
# PROJECT: 2D Fighting Game Sequence
# SPECS: Playstation 4 / 30FPS / Budget 500M JPY
# ═══════════════════════════════════════════════

visual_config:
  style: >
    2D anime-style fighting video game screenshot,
    cel-shaded, bold outlines, dark metallic stone architecture palette,
    manga-style dynamic lines, arcade game aesthetic

character_settings:
  player: "left character in @Image1"
  opponent: "right character in @Image1"

timeline:
  cut_01:
    shot: side view full shot
    prompt: >
      stylized 2D fighting video game interface,
      health bars and timer HUD overlay,
      hit counter UI incrementing,
      armored knight launches crouching uppercut lifting opponent airborne,
      blue energy sphere charges in hand then rapid golden shots pin opponent midair,
      dynamic action lines radiating outward,
      special meter gauge filling up,
      neon-lit urban rooftop night stage background,
      arcade game screen composition
    cam: static side view, light screen shake on impacts

  cut_02:
    shot: extreme close-up, diagonal screen transition
    prompt: >
      sudden dramatic insert shot,
      screen splits with diagonal wipe transition,
      knight's face in extreme close-up filling frame,
      golden eyes with subtle glow, bold confident grin,
      ink-style shadows across one side of face,
      purple-gold energy aura behind head,
      abstract crimson dynamic lines in background,
      game UI text indicating special activation
    cam: instant snap zoom, tilted angle

  cut_03:
    shot: behind knight, over-the-shoulder
    prompt: >
      knight standing arms spread wide seen from behind,
      surging golden energy aura erupting around his body,
      twice-height pillar of golden light rising behind him,
      expanding ring of purple-gold energy particles,
      opponent suspended midair stunned from combo,
      background distorts with heat-shimmer effect,
      glowing particles orbit the knight,
      strong backlight creating dramatic silhouette,
      video game special move activation sequence
    cam: slow dolly in, low angle

  cut_04:
    shot: rapid multi-angle montage
    prompt: >
      knight grabs opponent and hoists overhead into backbreaker hold,
      leaps high surrounded by concentric golden energy rings,
      plummets down with massive gold-orange-red ground impact explosion,
      cascading shockwave detonations layering gold to white repeatedly,
      full-screen white flash transition,
      large stylized game UI "K.O." text appears with glass-particle burst effect,
      hit counter displays high number,
      opponent life gauge reaches zero,
      video game finishing sequence animation
    cam: rapid angle changes, final moment in slow motion

  cut_05:
    shot: low angle tilt-up → medium shot
    prompt: >
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/c332e2f6b953f4265362d7d8b98a3256016ff78f/README_zh.md#L2541)

```text
# ═══════════════════════════════════════════════
# 项目：2D 格斗游戏序列
# 规格：Playstation 4 / 30FPS / 预算 5 亿日元
# ═══════════════════════════════════════════════

visual_config:
  style: >
    2D 动漫风格格斗游戏截图，
    赛璐珞风格，粗轮廓线，深色金属石质建筑色调，
    漫画风格动态线条，街机游戏美学

character_settings:
  player: "@Image1 中的左侧角色"
  opponent: "@Image1 中的右侧角色"

timeline:
  cut_01:
    shot: 侧视全景
    prompt: >
      风格化的 2D 格斗游戏界面，
      血条和计时器 HUD 叠加层，
      连击计数 UI 增加，
      身披重甲的骑士发动蹲姿上勾拳将对手击飞至空中，
      手中汇聚蓝色能量球，随后快速射出金色光束将对手定在半空，
      动态动作线条向外辐射，
      必杀能量槽充满，
      霓虹灯照亮的城市屋顶夜景舞台背景，
      街机游戏画面构图
    cam: 静态侧视图，受击时轻微屏幕抖动

  cut_02:
    shot: 特写镜头，对角线屏幕转场
    prompt: >
      突如其来的戏剧性插入镜头，
      屏幕通过对角线擦除转场分割，
      骑士面部特写填满画面，
      金色双眼带有微弱光芒，自信的笑容，
      面部一侧带有水墨风格阴影，
      头部后方环绕紫金色能量光环，
      背景中抽象的深红色动态线条，
      游戏 UI 文字显示必杀技激活
    cam: 瞬间快速变焦，倾斜角度

  cut_03:
    shot: 骑士背后，越肩视角
    prompt: >
      从背后拍摄骑士双臂张开的姿态，
      汹涌的金色能量光环在他身体周围爆发，
      身后升起两倍高的金色光柱，
      向外扩散的紫金色能量粒子环，
      对手在半空中因连击而处于眩晕状态，
      背景因热浪扭曲效果而变形，
      发光的粒子环绕着骑士，
      强烈的背光营造出戏剧性的剪影，
      电子游戏必杀技激活序列
    cam: 缓慢推拉镜头，低角度

  cut_04:
    shot: 快速多角度蒙太奇
    prompt: >
      骑士抓住对手并将其举过头顶进行背摔，
      在同心金色能量环的包围下高高跃起，
      带着巨大的金橙红色地面冲击爆炸坠落，
      层叠的冲击波爆炸将金色反复叠加至白色，
      全屏白色闪光转场，
      大型风格化游戏 UI “K.O.” 文字伴随玻璃碎片爆裂效果出现，
      连击计数显示高数值，
      对手血条归零，
      电子游戏终结技动画序列
    cam: 快速角度切换，最后一刻慢动作

  cut_05:
    shot: 低角度仰拍 → 中景镜头
    prompt: >
```

## 出处与许可

- 原作者：[ShadeLurk](https://x.com/ShadeLurk) · 原帖：<https://x.com/ShadeLurk/status/2040403855041806690>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/c332e2f6b953f4265362d7d8b98a3256016ff78f/README.md#L2529)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `c332e2f6b953`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=2689>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
