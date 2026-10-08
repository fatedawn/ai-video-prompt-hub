---
id: "youmind-2684"
title: "2D 格斗游戏序列生成"
title_en: "Seedance 2.0 Fighting Game Sequence Prompt"
model: "Seedance 2.0"
language: "ja"
medium: "漫剧"
direction: "特效向"
genre: "战斗大招"
art_style: "2D日漫"
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/c332e2f6b953f4265362d7d8b98a3256016ff78f/README_ja-JP.md#L2679"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "yachimat - AI Short Anime"
original_author_url: "https://x.com/yachimat_manga"
original_post_url: "https://x.com/yachimat_manga/status/2040383896244924701"
published: "Apr 4, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=2684"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# 2D 格斗游戏序列生成

*Seedance 2.0 Fighting Game Sequence Prompt*

> 这是一个高度详细且结构化的提示词，用于使用 Seedance 2.0 生成 2D 动漫风格的格斗游戏序列。它详细规定了视觉风格、角色设置（包括 Agent 和参考图像），以及包含特定摄像机角度和动作描述的多镜头时间轴，旨在打造动态的战斗场景。

## 提示词（日本語）

```text
visual_config:
  style: >
    2D アニメスタイルの格闘ゲームのスクリーンショット、
    セルシェーディング、太い輪郭線、ゴールド・パープル・クリムゾンの配色、
    マンガ風のダイナミックな集中線、アーケードゲームの美学

character_settings:
  player:
    girl: "@Image1"
    avatar: >
      サイキックエネルギーのアバター、半透明の黄金のヒューマノイドフェンサー、
      銀色の装甲板、輝くシアンの瞳、
      ユーザーの背後に霊的な投影として出現
  opponent: "@Image2"

timeline:
  cut_01:
    dur: 6s
    shot: サイドビューのフルショット
    prompt: >
      様式化された 2D 格闘ゲームのインターフェース、
      体力ゲージとタイマーの HUD オーバーレイ、
      ヒットカウンターの UI が増加、
      銀髪の少女が繰り出す高速のエネルギー攻撃、
      動きに合わせて輝く黄金の光のエフェクト、
      外側に放射状に広がるダイナミックなアクションライン、
      スペシャルメーターが溜まる様子、
      ネオンが灯る都会の屋上の夜ステージ背景、
      アーケードゲームの画面構成
    cam: 静止したサイドビュー、衝撃時に軽い画面揺れ

  cut_02:
    dur: 3s
    shot: エクストリームクローズアップ、対角線の画面遷移
    prompt: >
      突然のドラマチックなインサートショット、
      対角線のワイプで画面が分割、
      少女の顔をフレームいっぱいに捉えたエクストリームクローズアップ、
      かすかに光る黄金の瞳、自信に満ちた大胆な笑み、
      顔の片側に落ちるインク調の影、
      頭部の背後にパープルとゴールドのエネルギーオーラ、
      背景に抽象的なクリムゾンのダイナミックなライン、
      スペシャル発動を示すゲーム UI テキスト
    cam: インスタントスナップズーム、ティルトアングル

  cut_03:
    dur: 5s
    shot: 少女の背後、肩越し（オーバー・ザ・ショルダー）
    prompt: >
      両腕を大きく広げて立つ少女を背後から捉える、
      少女の背後に立ち上がる巨大な半透明のサイキックアバター、
      少女の 2 倍の身長、光を反射する黄金の装甲板、
      パープルとゴールドのエネルギー粒子の広がる輪、
      アリーナを後退する対戦相手、
      陽炎のエフェクトで歪む背景、
      少女とアバターの両方を周回する輝く粒子、
      ドラマチックなシルエットを作り出す強い逆光、
      格闘ゲームの必殺技発動シーケンス
    cam: スロードリーイン、ローアングル

  cut_04:
    dur: 8s
    shot: 高速マルチアングルモンタージュ
    prompt: >
      アバターが連続して高速のエネルギー投影を行う、
      画面を埋め尽くす重なり合う黄金の光の軌跡、
      ダイナミックに重なり合うカスケード状の視覚効果、
      最後の一撃が前方にエネルギー波を放つ、
      全画面のホワイトフラッシュによる遷移、
      ガラスの破片が飛び散るエフェクトと共に表示される、様式化された巨大な「K.O.」のゲーム UI テキスト、
      高い数値を示すヒットカウンター、
      対戦相手の体力ゲージがゼロになる、
      格闘ゲームのフィニッシュシーケンスのアニメーション
    cam: 急激なアングル変更、最後の瞬間はスローモーション
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/c332e2f6b953f4265362d7d8b98a3256016ff78f/README_zh.md#L2696)

```text
visual_config:
  style: >
    2D 动漫风格格斗游戏截图，
    赛璐珞风格，粗轮廓线，金-紫-深红配色，
    漫画风格动态线条，街机游戏美学

character_settings:
  player:
    girl: "@Image1"
    avatar: >
      灵能 Agent，半透明金色人形剑客，
      银色盔甲板，发光的青色眼睛，
      作为精神投影出现在用户身后
  opponent: "@Image2"

timeline:
  cut_01:
    dur: 6s
    shot: 侧视全景
    prompt: >
      风格化 2D 格斗游戏界面，
      血条和计时器 HUD 叠加，
      连击数 UI 增加，
      银发少女进行快速能量打击，
      每次动作伴随明亮的金色光效，
      动态动作线条向外辐射，
      必杀槽填充，
      霓虹灯照亮的城市屋顶夜间舞台背景，
      街机游戏画面构图
    cam: 静态侧视图，撞击时轻微屏幕震动

  cut_02:
    dur: 3s
    shot: 特写，对角线转场
    prompt: >
      突如其来的戏剧性插入镜头，
      屏幕以对角线擦除转场分割，
      少女面部特写填满画面，
      金色眼睛带有微光，自信的笑容，
      脸部一侧有水墨风格阴影，
      头部后方有紫金色能量光环，
      背景中有抽象的深红色动态线条，
      游戏 UI 文字显示必杀技激活
    cam: 瞬间快速变焦，倾斜角度

  cut_03:
    dur: 5s
    shot: 少女身后，越肩视角
    prompt: >
      从背后看少女双臂张开站立，
      巨大的半透明灵能 Agent 在她身后升起，
      两倍于她的身高，金色盔甲板反射光线，
      不断扩大的紫金色能量粒子环，
      对手在竞技场上后退，
      背景因热浪效果而扭曲，
      发光的粒子环绕着少女和 Agent，
      强烈的背光营造出戏剧性的剪影，
      游戏必杀技激活序列
    cam: 缓慢推镜头，低角度

  cut_04:
    dur: 8s
    shot: 快速多角度蒙太奇
    prompt: >
      Agent 执行快速连续的能量投影，
      屏幕充满重叠的金色光迹，
      视觉特效动态分层，
      最后强力动作将能量波向前发出，
      全屏白色闪光转场，
      大型风格化游戏 UI "K.O." 文字伴随玻璃粒子爆裂效果出现，
      连击数显示高数值，
      对手血条归零，
      游戏终结技动画序列
    cam: 快速角度切换，最后一刻慢动作
```

### YouMind 提供的English版本（README.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/c332e2f6b953f4265362d7d8b98a3256016ff78f/README.md#L2684)

```text
# ═══════════════════════════════════════════════
# PROJECT: 2D Fighting Game Sequence
# SPECS: Playstation 4 / 30FPS / Budget 500M JPY
# ═══════════════════════════════════════════════

visual_config:
  style: >
    2D anime-style fighting video game screenshot,
    cel-shaded, bold outlines, gold-purple-crimson palette,
    manga-style dynamic lines, arcade game aesthetic

character_settings:
  player:
    girl: "@Image1"
    avatar: >
      psychic energy avatar, translucent golden humanoid fencer,
      Silver armor plates, glowing cyan eyes,
      appears behind user as spiritual projection
  opponent: "@Image2"

timeline:
  cut_01:
    dur: 6s
    shot: side view full shot
    prompt: >
      stylized 2D fighting video game interface,
      health bars and timer HUD overlay,
      hit counter UI incrementing,
      silver-haired girl performing rapid energy strikes,
      bright golden light effects on each motion,
      dynamic action lines radiating outward,
      special meter gauge filling up,
      neon-lit urban rooftop night stage background,
      arcade game screen composition
    cam: static side view, light screen shake on impacts

  cut_02:
    dur: 3s
    shot: extreme close-up, diagonal screen transition
    prompt: >
      sudden dramatic insert shot,
      screen splits with diagonal wipe transition,
      girl's face in extreme close-up filling frame,
      golden eyes with subtle glow, bold confident grin,
      ink-style shadows across one side of face,
      purple-gold energy aura behind head,
      abstract crimson dynamic lines in background,
      game UI text indicating special activation
    cam: instant snap zoom, tilted angle

  cut_03:
    dur: 5s
    shot: behind girl, over-the-shoulder
    prompt: >
      girl standing arms spread wide seen from behind,
      large translucent psychic avatar rising behind her,
      twice her height, golden armored plates catching light,
      expanding ring of purple-gold energy particles,
      opponent stepping back across the arena,
      background distorts with heat-shimmer effect,
      glowing particles orbit both girl and avatar,
      strong backlight creating dramatic silhouette,
      video game special move activation sequence
    cam: slow dolly in, low angle

  cut_04:
    dur: 8s
    shot: rapid multi-angle montage
    prompt: >
      avatar performs rapid successive energy projections,
      screen filled with overlapping golden light trails,
      cascading visual effects layering dynamically,
      final powerful motion sends energy wave forward,
      full-screen white flash transition,
      large stylized game UI "K.O." text appears with glass-particle burst effect,
      hit counter displays high number,
      opponent life gauge reaches zero,
      video game finishing sequence animation
    cam: rapid angle changes, final moment in slow motion
```

## 出处与许可

- 原作者：[yachimat - AI Short Anime](https://x.com/yachimat_manga) · 原帖：<https://x.com/yachimat_manga/status/2040383896244924701>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/c332e2f6b953f4265362d7d8b98a3256016ff78f/README_ja-JP.md#L2679)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `c332e2f6b953`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=2684>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
