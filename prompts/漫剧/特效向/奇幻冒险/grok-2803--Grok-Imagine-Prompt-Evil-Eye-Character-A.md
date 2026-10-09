---
id: "grok-2803"
title: "Grok Imagine Prompt: Evil Eye Character Animation using JSON structure"
title_en: null
model: "Grok Imagine"
language: "en"
medium: "漫剧"
direction: "特效向"
genre: "奇幻冒险"
art_style: "未注明"
tags: ["Grok Imagine", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-grok-imagine-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-grok-imagine-prompts/blob/55097e765829455dec60593b250f66be69d23eab/README.md#L1962"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "BMX"
original_author_url: "https://x.com/bmx_ai13"
original_post_url: "https://x.com/bmx_ai13/status/2040804236456550876"
published: "Apr 5, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/grok-imagine-prompts?id=2803"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
output_status: "output_unverified"
verification: "attribution_checked"
---

# Grok Imagine Prompt: Evil Eye Character Animation using JSON structure

> A highly structured JSON prompt for Grok Imagine, designed for text-to-video generation. It specifies a 6-second, 9:16 aspect ratio animation of an 'Evil Eye' character, using an uploaded image as the main character reference. The prompt details the dark fantasy style, scene setting, character consistency, visual design parameters (eye color, glow intensity), camera movement (extreme close-up, slow push-in), and motion (fiery orange glow, pupil tracking).

## 提示词（English）

```text
{ "title": "Evil Eye Character Animation", "type": "text_to_video", "duration": "6s", "aspect_ratio": "9:16", "reference_image": { "use_uploaded_image": true, "role": "main character reference", "instruction": "Use the uploaded image as the exact character identity, facial structure, costume, and overall visual reference. Keep the character consistent with the uploaded image throughout the shot." }, "style": "dark fantasy, supernatural, cinematic, high contrast, mystical energy", "scene": { "setting": "a deep dark void with subtle purple-black haze and glowing supernatural atmosphere", "mood": "ominous, haunting, powerful, mysterious" }, "character": { "description": "the main character is the uploaded image character, transformed into a supernatural evil-eye inspired presence", "consistency": "preserve the uploaded character’s face, identity, proportions, and recognizable details", "expression": "intense, hypnotic, threatening" }, "visual_design": { "eye_color": "#FF6F37", "background_color": "#060010", "glow_intensity": 0.35, "intensity": 1.5, "pupil_size": 0.6, "iris_width": 0.25, "scale": 0.8, "noise_scale": 1.0, "pupil_follow": 1.0, "flame_speed": 1.0 }, "camera": { "shot_type": "extreme close-up", "movement": "slow cinematic push-in", "focus": "sharp focus on the eye and character presence", "lens": "macro cinematic lens" }, "motion": { "primary_action": "the eye glows with fiery orange energy and organic flame-like motion", "secondary_action": "the pupil subtly tracks an unseen presence", "atmospheric_motion": "heat distortion, soft energy ripple, supernatural shimmer" }, "lighting": { "source": "the glowing eye acts as the main light source", "effect": "infernal orange glow illuminating the character in darkness" }, "prompt": "Use the uploaded image as the main character reference. The character from the uploaded image appears as a supernatural dark fantasy presence inside an evil-eye inspired cinematic scene. Preserve the exact identity, facial features, outfit details, and visual consistency of the uploaded image. The eye glows with fiery orange energy, with a hypnotic black pupil and molten flame-like textures moving organically inside it. The pupil subtly follows an unseen force, creating a sentient and threatening feeling. The background is a deep purple-black void with subtle haze, heat distortion, and supernatural atmosphere. Extreme close-up, slow cinematic push-in, dark fantasy aesthetic, high contrast lighting, smooth hypnotic motion, haunting mystical mood.", "negative_prompt": "different character, altered face, extra eyes, duplicate face, blurry details, cartoon style, low resolution, flat lighting, cheerful mood, washed out colors, text, watermark, logo" }
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-grok-imagine-prompts/blob/55097e765829455dec60593b250f66be69d23eab/README_zh.md#L1960)

```text
{ "title": "邪眼角色动画", "type": "text_to_video", "duration": "6s", "aspect_ratio": "9:16", "reference_image": { "use_uploaded_image": true, "role": "主要角色参考", "instruction": "使用上传的图片作为确切的角色身份、面部结构、服装和整体视觉参考。在整个镜头中保持角色与上传图片的一致性。" }, "style": "暗黑奇幻，超自然，电影感，高对比度，神秘能量", "scene": { "setting": "深邃黑暗的虚空，带有微妙的紫黑色薄雾和发光的超自然氛围", "mood": "不祥，萦绕，强大，神秘" }, "character": { "description": "主角即为上传图片中的角色，转化为受邪眼启发的超自然存在", "consistency": "保留上传角色的面部、身份、比例和可识别的细节", "expression": "强烈，催眠，具有威胁性" }, "visual_design": { "eye_color": "#FF6F37", "background_color": "#060010", "glow_intensity": 0.35, "intensity": 1.5, "pupil_size": 0.6, "iris_width": 0.25, "scale": 0.8, "noise_scale": 1.0, "pupil_follow": 1.0, "flame_speed": 1.0 }, "camera": { "shot_type": "极度特写", "movement": "缓慢的电影感推入", "focus": "聚焦于眼睛和角色存在感", "lens": "微距电影镜头" }, "motion": { "primary_action": "眼睛散发出炽热的橙色能量，并伴有有机的火焰状运动", "secondary_action": "瞳孔微妙地追踪着一个看不见的存在", "atmospheric_motion": "热畸变，柔和的能量涟漪，超自然微光" }, "lighting": { "source": "发光的眼睛作为主要光源", "effect": "地狱般的橙色光芒照亮黑暗中的角色" }, "prompt": "使用上传的图片作为主要角色参考。上传图片中的角色以受邪眼启发的超自然暗黑奇幻形象出现在电影场景中。保留上传图片的准确身份、面部特征、服装细节和视觉一致性。眼睛散发出炽热的橙色能量，带有催眠般的黑色瞳孔和在内部有机移动的熔岩火焰纹理。瞳孔微妙地跟随一股看不见的力量，营造出一种有知觉且具有威胁性的感觉。背景是深紫黑色的虚空，带有微妙的薄雾、热畸变和超自然氛围。极度特写，缓慢的电影感推入，暗黑奇幻美学，高对比度照明，流畅的催眠动态，萦绕的神秘氛围。", "negative_prompt": "不同的角色，改变的面部，多余的眼睛，重复的面部，模糊的细节，卡通风格，低分辨率，平淡的照明，欢快的氛围，褪色的颜色，文字，水印，标志" }
```

### YouMind 提供的日本語版本（README_ja-JP.md）

[位置](https://github.com/YouMind-OpenLab/awesome-grok-imagine-prompts/blob/55097e765829455dec60593b250f66be69d23eab/README_ja-JP.md#L1960)

```text
{ "title": "Evil Eye キャラクターアニメーション", "type": "text_to_video", "duration": "6s", "aspect_ratio": "9:16", "reference_image": { "use_uploaded_image": true, "role": "メインキャラクターの参照", "instruction": "アップロードされた画像をキャラクターのアイデンティティ、顔の構造、衣装、全体的な視覚的参照として正確に使用してください。ショット全体を通して、アップロードされた画像とキャラクターの一貫性を維持してください。" }, "style": "ダークファンタジー、超自然的、映画的、高コントラスト、神秘的なエネルギー", "scene": { "setting": "紫と黒のほのかな霧が立ち込める深い暗闇の空間、超自然的な輝きを放つ雰囲気", "mood": "不吉、忘れがたい、力強い、神秘的" }, "character": { "description": "メインキャラクターはアップロードされた画像のキャラクターであり、超自然的な Evil Eye にインスパイアされた存在へと変貌しています", "consistency": "アップロードされたキャラクターの顔、アイデンティティ、プロポーション、認識可能な詳細を維持してください", "expression": "強烈、催眠的、威圧的" }, "visual_design": { "eye_color": "#FF6F37", "background_color": "#060010", "glow_intensity": 0.35, "intensity": 1.5, "pupil_size": 0.6, "iris_width": 0.25, "scale": 0.8, "noise_scale": 1.0, "pupil_follow": 1.0, "flame_speed": 1.0 }, "camera": { "shot_type": "極端なクローズアップ", "movement": "ゆっくりとした映画的なプッシュイン", "focus": "目とキャラクターの存在感にシャープなピント", "lens": "マクロシネマティックレンズ" }, "motion": { "primary_action": "目が燃えるようなオレンジ色のエネルギーで輝き、有機的な炎のような動きを見せる", "secondary_action": "瞳が見えない存在を微妙に追跡する", "atmospheric_motion": "熱による歪み、柔らかなエネルギーの波紋、超自然的なきらめき" }, "lighting": { "source": "輝く目が主要な光源となる", "effect": "暗闇の中でキャラクターを照らす地獄のようなオレンジ色の輝き" }, "prompt": "アップロードされた画像をメインのキャラクター参照として使用してください。アップロードされた画像のキャラクターが、Evil Eye にインスパイアされた映画的なシーンの中で、超自然的なダークファンタジーの存在として現れます。アップロードされた画像の正確なアイデンティティ、顔の特徴、衣装の詳細、視覚的な一貫性を維持してください。目は燃えるようなオレンジ色のエネルギーで輝き、催眠的な黒い瞳と、その中で有機的に動く溶けた炎のようなテクスチャを備えています。瞳は見えない力を微妙に追いかけ、知的で威圧的な感覚を生み出します。背景は、ほのかな霧、熱による歪み、超自然的な雰囲気が漂う深い紫と黒の空間です。極端なクローズアップ、ゆっくりとした映画的なプッシュイン、ダークファンタジーの美学、高コントラスト照明、滑らかで催眠的な動き、忘れがたい神秘的なムード。", "negative_prompt": "異なるキャラクター、変化した顔、余分な目、二重の顔、ぼやけた詳細、漫画スタイル、低解像度、平坦な照明、陽気なムード、色あせた色、テキスト、透かし、ロゴ" }
```

## 出处与许可

- 原作者：[BMX](https://x.com/bmx_ai13) · 原帖：<https://x.com/bmx_ai13/status/2040804236456550876>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-grok-imagine-prompts](https://github.com/YouMind-OpenLab/awesome-grok-imagine-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-grok-imagine-prompts/blob/55097e765829455dec60593b250f66be69d23eab/README.md#L1962)
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/grok-imagine-prompts?id=2803>
- 说明：YouMind 的 README 由 CMS 轮换展示；本条取自该仓库 README 历史版本（commit `55097e765829`），与当前版本同为 CC BY 4.0
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
