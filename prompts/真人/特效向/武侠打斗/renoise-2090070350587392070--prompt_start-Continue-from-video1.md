---
id: "renoise-2090070350587392070"
title: "prompt_start: \"Continue from @video1.\""
title_en: null
model: "Seedance 2.0"
language: "en"
medium: "真人"
direction: "特效向"
genre: "武侠打斗"
art_style: null
tags: ["Seedance 2.0", "Renoise", "Action", "Wuxia", "Photoreal", "Realistic World", "VFX"]
source_repo: "renoise-ai/awesome-seedance-prompts"
source_url: "https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2090070350587392070.json"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "Aliaksei.AI"
original_author_url: "https://x.com/Aliaksei_AI"
original_post_url: "https://x.com/Aliaksei_AI/status/2090070350587392070"
published: "2026-08-19"
third_party_author: true
flags: []
also_in: []
source_page: null
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
output_status: "output_unverified"
verification: "attribution_checked"
---

# prompt_start: "Continue from @video1."

## 提示词（English）

```text
prompt_start: "Continue from @video1."
title: "Swordswoman Character Swap"
reference_handling: "CRITICAL: @video1 is the master source for timing, camera movement, blocking, action beats, eyelines, environment, lighting progression, and overall composition. Preserve the choreography and visual continuity of @video1 shot by shot. @image1 is used STRICTLY for character design only: face, hair, body proportions, costume, color palette, accessories, and sword design. DO NOT reproduce @image1's pose, framing, or composition. Replace only the original girl from @video1 with the swordswoman from @image1."
style: "High-fidelity image-to-video character replacement. Preserve the original medium, atmosphere, and scene logic of @video1 while seamlessly integrating the swordswoman identity from @image1."
visual_feel: "Stable temporal consistency, believable cloth and hair motion, natural integration into the source footage, clean identity lock. The result must feel like the swordswoman was always the person in the original video."
duration: "15 seconds"

character_modeling:
  swordswoman:
    base: "Female swordswoman matching reference @image1 exactly."
    features: "Exact facial identity, hairstyle, bangs, eye shape, body proportions, full outfit silhouette, materials, color palette, footwear, accessories, and sword design from @image1."
    detail: "Hair, clothing, and sword react naturally to the motion, gravity, and lighting already present in @video1. The sword remains consistently attached, correctly scaled, and visually stable in every shot."
    movement_in_this_scene: "She performs the exact same movement path, gestures, posture changes, speed, interactions, and eyelines as the original girl in @video1. Her screen position, scale, and body timing track the original performer precisely."
    state_in_this_scene: "She starts already fully present inside the environment of @video1, seamlessly replacing the original girl from the first frame."

cinematic_storyboard:
  00_04_opening:
    camera: "Match the opening framing and motion of @video1. Hold continuity."
    action: "The swordswoman appears exactly where the original girl appears in @video1 and performs the same opening beat. Preserve the original timing and body mechanics while ensuring her face, hair, outfit, and sword clearly read as the design from @image1."
    lighting: "Match the opening light and color state of @video1."

  04_08_transition:
    camera: "Continue the same camera path from @video1."
    action: "She continues the second movement beat of @video1 with identical blocking and rhythm. Any turns, steps, gestures, or combat motions remain identical to the source video, but every visible character detail belongs to the swordswoman from @image1."
    lighting: "Match the source lighting progression exactly."

  08_12_main_beat:
    camera: "Follow the main action framing from @video1."
    action: "The key action beat from @video1 plays out with full continuity. Preserve interaction timing, body orientation, spatial relationships, and momentum. The sword must remain anatomically correct in her grip and move consistently with the source choreography."
    lighting: "Preserve the strongest lighting beat from @video1."

  12_15_final_hold:
    camera: "Match the ending framing from @video1. Gentle hold."
    action: "The final movement and settling beat follows the source video exactly. End on a stable, readable final image of the swordswoman with identity, costume, and sword fully consistent."
    lighting: "Match the ending light state of @video1."
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### 上游提供的Español版本（translations.es）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2090070350587392070.json)

```text
---
prompt_start: "Continue from @video1."
title: "Intercambio de personaje: espadachina"
reference_handling: "CRITICAL: @video1 is the master source for timing, camera movement, blocking, action beats, eyelines, environment, lighting progression, and overall composition. Preserve the choreography and visual continuity of @video1 shot by shot. @image1 is used STRICTLY for character design only: face, hair, body proportions, costume, color palette, accessories, and sword design. DO NOT reproduce @image1's pose, framing, or composition. Replace only the original girl from @video1 with the swordswoman from @image1."
style: "High-fidelity image-to-video character replacement. Preserve the original medium, atmosphere, and scene logic of @video1 while seamlessly integrating the swordswoman identity from @image1."
visual_feel: "Stable temporal consistency, believable cloth and hair motion, natural integration into the source footage, clean identity lock. The result must feel like the swordswoman was always the person in the original video."
duration: "15 seconds"

character_modeling:
  swordswoman:
    base: "Female swordswoman matching reference @image1 exactly."
    features: "Exact facial identity, hairstyle, bangs, eye shape, body proportions, full outfit silhouette, materials, color palette, footwear, accessories, and sword design from @image1."
    detail: "Hair, clothing, and sword react naturally to the motion, gravity, and lighting already present in @video1. The sword remains consistently attached, correctly scaled, and visually stable in every shot."
    movement_in_this_scene: "She performs the exact same movement path, gestures, posture changes, speed, interactions, and eyelines as the original girl in @video1. Her screen position, scale, and body timing track the original performer precisely."
    state_in_this_scene: "She starts already fully present inside the environment of @video1, seamlessly replacing the original girl from the first frame."

cinematic_storyboard:
  00_04_opening:
    camera: "Match the opening framing and motion of @video1. Hold continuity."
    action: "The swordswoman appears exactly where the original girl appears in @video1 and performs the same opening beat. Preserve the original timing and body mechanics while ensuring her face, hair, outfit, and sword clearly read as the design from @image1."
    lighting: "Match the opening light and color state of @video1."

  04_08_transition:
    camera: "Continue the same camera path from @video1."
    action: "She continues the second movement beat of @video1 with identical blocking and rhythm. Any turns, steps, gestures, or combat motions remain identical to the source video, but every visible character detail belongs to the swordswoman from @image1."
    lighting: "Match the source lighting progression exactly."

  08_12_main_beat:
    camera: "Follow the main action framing from @video1."
    action: "The key action beat from @video1 plays out with full continuity. Preserve interaction timing, body orientation, spatial relationships, and momentum. The sword must remain anatomically correct in her grip and move consistently with the source choreography."
    lighting: "Preserve the strongest lighting beat from @video1."

  12_15_final_hold:
    camera: "Match the ending framing from @video1. Gentle hold."
    action: "The final movement and settling beat follows the source video exactly. End on a stable, readable final image of the swordswoman with identity, costume, and sword fully consistent."
    lighting: "Match the ending light state of @video1."

--- QUOTED TWEET ---
También decidí no quedarme al margen y probar el prompt de @tebasaki3D, y hacer un video en local #MinimaxH3.
La verdad, el sonido no salió nada bien.
Mi versión del prompt está en el comentario. Si alguien sabe qué estoy haciendo mal, por favor que me lo diga. https://t.co/964Nb0sXIG

--- THREAD CONTINUATION ---
[Thread 1] 1/2
prompt_start: "Continue from @video1."
title: "Intercambio de personaje: espadachina"
reference_handling: "CRITICAL: @video1 is the master source for timing, camera movement, blocking, action beats, eyelines, environment, lighting progression, and overall composition. Preserve the choreography and visual continuity of @video1 shot by shot. @image1 is used STRICTLY for character design only: face, hair, body proportions, costume, color palette, accessories, and sword design. DO NOT reproduce @image1's pose, framing, or composition. Replace only the original girl from @video1 with the swordswoman from @image1."
style: "High-fidelity image-to-video character replacement. Preserve the original medium, atmosphere, and scene logic of @video1 while seamlessly integrating the swordswoman identity from @image1."
visual_feel: "Stable temporal consistency, believable cloth and hair motion, natural integration into the source footage, clean identity lock. The result must feel like the swordswoman was always the person in the original video."
duration: "15 seconds"

character_modeling:
  swordswoman:
    base: "Female swordswoman matching reference @image1 exactly."
    features: "Exact facial identity, hairstyle, bangs, eye shape, body proportions, full outfit silhouette, materials, color palette, footwear, accessories, and sword design from @image1."
    detail: "Hair, clothing, and sword react naturally to the motion, gravity, and lighting already present in @video1. The sword remains consistently attached, correctly scaled, and visually stable in every shot."
    movement_in_this_scene: "She performs the exact same movement path, gestures, posture changes, speed, interactions, and eyelines as the original girl in @video1. Her screen position, scale, and body timing track the original performer precisely."
    state_in_this_scene: "She starts already fully present inside the environment of @video1, seamlessly replacing the original girl from the first frame."

cinematic_storyboard:
  00_04_opening:
    camera: "Match the opening framing and motion of @video1. Hold continuity."
    action: "The swordswoman appears exactly where the original girl appears in @video1 and performs the same opening beat. Preserve the original timing and body mechanics while ensuring her face, hair, outfit, and sword clearly read as the design from @image1."
    lighting: "Match the opening light and color state of @video1."

  04_08_transition:
    camera: "Continue the same camera path from @video1."
    action: "She continues the second movement beat of @video1 with identical blocking and rhythm. Any turns, steps, gestures, or combat motions remain identical to the source video, but every visible character detail belongs to the swordswoman from @image1."
    lighting: "Match the source lighting progression exactly."

  08_12_main_beat:
    camera: "Follow the main action framing from @video1."
    action: "The key action beat from @video1 plays out with full continuity. Preserve interaction timing, body orientation, spatial relationships, and momentum. The sword must remain anatomically correct in her grip and move consistently with the source choreography."
    lighting: "Preserve the strongest lighting beat from @video1."

  12_15_final_hold:
    camera: "Match the ending framing from @video1. Gentle hold."
    action: "The final movement and settling beat follows the source video exactly. End on a stable, readable final image of the swordswoman with identity, costume, and sword fully consistent."
    lighting: "Match the ending light state of @video1."

[Thread 2] 2/2 production_notes:
  audio_design: "Preserve the original audio mood and timing from @video1 if audio is enabled."
  lighting: "Do not redesign the lighting. Follow @video1 exactly so the replacement feels native to the footage."
  critical_constraint: "This is a character replacement task, not a scene redesign. Keep the environment, shot order, camera motion, pacing, and action structure of @video1. Replace only the original girl with the swordswoman from @image1. No pose copying from @image1. No reverting to the original girl's face, hair, clothing, or body."
  avoid: "Jitter, temporal flicker, bent or distorted limbs, identity drift, inconsistent face between shots, costume drift, sword disappearing, extra limbs, extra swords, incorrect hand grip, character frozen in reference-image pose, compositing look, altered environment layout."
---
```

### 上游提供的fr版本（translations.fr）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2090070350587392070.json)

```text
prompt_start: "Continue from @video1."
title: "Échange de personnage : femme à l’épée"
reference_handling: "CRITICAL: @video1 est la source maîtresse pour le timing, les mouvements de caméra, le blocking, les beats d’action, les eyelines, l’environnement, la progression de l’éclairage et la composition globale. Préservez la chorégraphie et la continuité visuelle de @video1 plan par plan. @image1 est utilisé STRICTEMENT pour le design du personnage uniquement : visage, cheveux, proportions du corps, costume, palette de couleurs, accessoires et design de l’épée. NE reproduisez PAS la pose, le cadrage ou la composition de @image1. Remplacez uniquement la fille originale de @video1 par la femme à l’épée de @image1."
style: "Remplacement de personnage image-vers-vidéo haute fidélité. Préservez le médium, l’atmosphère et la logique de scène originaux de @video1 tout en intégrant de manière fluide l’identité de la femme à l’épée issue de @image1."
visual_feel: "Cohérence temporelle stable, mouvement crédible des vêtements et des cheveux, intégration naturelle dans les images sources, verrouillage d’identité propre. Le résultat doit donner l’impression que la femme à l’épée a toujours été la personne dans la vidéo originale."
duration: "15 seconds"

character_modeling:
  swordswoman:
    base: "Female swordswoman matching reference @image1 exactly."
    features: "Exact facial identity, hairstyle, bangs, eye shape, body proportions, full outfit silhouette, materials, color palette, footwear, accessories, and sword design from @image1."
    detail: "Hair, clothing, and sword react naturally to the motion, gravity, and lighting already present in @video1. The sword remains consistently attached, correctly scaled, and visually stable in every shot."
    movement_in_this_scene: "She performs the exact same movement path, gestures, posture changes, speed, interactions, and eyelines as the original girl in @video1. Her screen position, scale, and body timing track the original performer precisely."
    state_in_this_scene: "She starts already fully present inside the environment of @video1, seamlessly replacing the original girl from the first frame."

cinematic_storyboard:
  00_04_opening:
    camera: "Match the opening framing and motion of @video1. Hold continuity."
    action: "The swordswoman appears exactly where the original girl appears in @video1 and performs the same opening beat. Preserve the original timing and body mechanics while ensuring her face, hair, outfit, and sword clearly read as the design from @image1."
    lighting: "Match the opening light and color state of @video1."

  04_08_transition:
    camera: "Continue the same camera path from @video1."
    action: "She continues the second movement beat of @video1 with identical blocking and rhythm. Any turns, steps, gestures, or combat motions remain identical to the source video, but every visible character detail belongs to the swordswoman from @image1."
    lighting: "Match the source lighting progression exactly."

  08_12_main_beat:
    camera: "Follow the main action framing from @video1."
    action: "The key action beat from @video1 plays out with full continuity. Preserve interaction timing, body orientation, spatial relationships, and momentum. The sword must remain anatomically correct in her grip and move consistently with the source choreography."
    lighting: "Preserve the strongest lighting beat from @video1."

  12_15_final_hold:
    camera: "Match the ending framing from @video1. Gentle hold."
    action: "The final movement and settling beat follows the source video exactly. End on a stable, readable final image of the swordswoman with identity, costume, and sword fully consistent."
    lighting: "Match the ending light state of @video1."

--- QUOTED TWEET ---
J’ai aussi décidé de ne pas rester sur la touche et d’essayer le prompt de @tebasaki3D — et de faire une vidéo en local avec #MinimaxH3.
Le son n’a franchement pas du tout fonctionné.
Ma version du prompt est dans le commentaire. Si quelqu’un sait ce que je fais mal, merci de me le dire. https://t.co/964Nb0sXIG

--- THREAD CONTINUATION ---
[Thread 1] 1/2
prompt_start: "Continue from @video1."
title: "Échange de personnage : femme à l’épée"
reference_handling: "CRITICAL: @video1 est la source maîtresse pour le timing, les mouvements de caméra, le blocking, les beats d’action, les eyelines, l’environnement, la progression de l’éclairage et la composition globale. Préservez la chorégraphie et la continuité visuelle de @video1 plan par plan. @image1 est utilisé STRICTEMENT pour le design du personnage uniquement : visage, cheveux, proportions du corps, costume, palette de couleurs, accessoires et design de l’épée. NE reproduisez PAS la pose, le cadrage ou la composition de @image1. Remplacez uniquement la fille originale de @video1 par la femme à l’épée de @image1."
style: "Remplacement de personnage image-vers-vidéo haute fidélité. Préservez le médium, l’atmosphère et la logique de scène originaux de @video1 tout en intégrant de manière fluide l’identité de la femme à l’épée issue de @image1."
visual_feel: "Cohérence temporelle stable, mouvement crédible des vêtements et des cheveux, intégration naturelle dans les images sources, verrouillage d’identité propre. Le résultat doit donner l’impression que la femme à l’épée a toujours été la personne dans la vidéo originale."
duration: "15 seconds"

character_modeling:
  swordswoman:
    base: "Female swordswoman matching reference @image1 exactly."
    features: "Exact facial identity, hairstyle, bangs, eye shape, body proportions, full outfit silhouette, materials, color palette, footwear, accessories, and sword design from @image1."
    detail: "Hair, clothing, and sword react naturally to the motion, gravity, and lighting already present in @video1. The sword remains consistently attached, correctly scaled, and visually stable in every shot."
    movement_in_this_scene: "She performs the exact same movement path, gestures, posture changes, speed, interactions, and eyelines as the original girl in @video1. Her screen position, scale, and body timing track the original performer precisely."
    state_in_this_scene: "She starts already fully present inside the environment of @video1, seamlessly replacing the original girl from the first frame."

cinematic_storyboard:
  00_04_opening:
    camera: "Match the opening framing and motion of @video1. Hold continuity."
    action: "The swordswoman appears exactly where the original girl appears in @video1 and performs the same opening beat. Preserve the original timing and body mechanics while ensuring her face, hair, outfit, and sword clearly read as the design from @image1."
    lighting: "Match the opening light and color state of @video1."

  04_08_transition:
    camera: "Continue the same camera path from @video1."
    action: "She continues the second movement beat of @video1 with identical blocking and rhythm. Any turns, steps, gestures, or combat motions remain identical to the source video, but every visible character detail belongs to the swordswoman from @image1."
    lighting: "Match the source lighting progression exactly."

  08_12_main_beat:
    camera: "Follow the main action framing from @video1."
    action: "The key action beat from @video1 plays out with full continuity. Preserve interaction timing, body orientation, spatial relationships, and momentum. The sword must remain anatomically correct in her grip and move consistently with the source choreography."
    lighting: "Preserve the strongest lighting beat from @video1."

  12_15_final_hold:
    camera: "Match the ending framing from @video1. Gentle hold."
    action: "The final movement and settling beat follows the source video exactly. End on a stable, readable final image of the swordswoman with identity, costume, and sword fully consistent."
    lighting: "Match the ending light state of @video1."

[Thread 2] 2/2 production_notes:
  audio_design: "Preserve the original audio mood and timing from @video1 if audio is enabled."
  lighting: "Do not redesign the lighting. Follow @video1 exactly so the replacement feels native to the footage."
  critical_constraint: "This is a character replacement task, not a scene redesign. Keep the environment, shot order, camera motion, pacing, and action structure of @video1. Replace only the original girl with the swordswoman from @image1. No pose copying from @image1. No reverting to the original girl's face, hair, clothing, or body."
  avoid: "Jitter, temporal flicker, bent or distorted limbs, identity drift, inconsistent face between shots, costume drift, sword disappearing, extra limbs, extra swords, incorrect hand grip, character frozen in reference-image pose, compositing look, altered environment layout."
---
```

### 上游提供的日本語版本（translations.ja）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2090070350587392070.json)

```text
prompt_start: "Continue from @video1."
title: "剣士キャラクタースワップ"
reference_handling: "CRITICAL: @video1 は、タイミング、カメラの動き、ブロッキング、アクションのビート、視線、環境、ライティングの推移、全体構図におけるマスターソースです。@video1 の振り付けと視覚的な連続性をショットごとに維持してください。@image1 はキャラクターデザイン専用として STRICTLY 使用します: 顔、髪、体型、衣装、カラーパレット、アクセサリー、剣のデザイン。@image1 のポーズ、フレーミング、構図は再現しないでください。@video1 の元の少女を、@image1 の剣士に置き換えるだけにしてください。"
style: "高忠実度の image-to-video キャラクター置換。@video1 の元の媒体、雰囲気、シーンのロジックを維持しつつ、@image1 の剣士アイデンティティをシームレスに統合する。"
visual_feel: "安定した時間的一貫性、説得力のある布と髪の動き、ソース映像への自然な統合、クリーンなアイデンティティロック。結果は、まるでその剣士が最初から元の動画の人物だったかのように感じられること。"
duration: "15 seconds"

character_modeling:
  swordswoman:
    base: "参照 @image1 に完全一致する女性剣士。"
    features: "顔のアイデンティティ、髪型、前髪、目の形、体型、衣装全体のシルエット、素材、カラーパレット、靴、アクセサリー、剣のデザインは @image1 と完全一致。"
    detail: "髪、衣服、剣は、@video1 にすでに存在する動き、重力、ライティングに自然に反応する。剣は常に正しく接続され、適切なスケールを保ち、各ショットで視覚的に安定している。"
    movement_in_this_scene: "彼女は、@video1 の元の少女とまったく同じ移動経路、ジェスチャー、姿勢変化、速度、インタラクション、視線を行う。画面上の位置、スケール、身体のタイミングは元の演者を正確に追従する。"
    state_in_this_scene: "彼女は最初のフレームから、@video1 の環境内にすでに完全に存在しており、元の少女をシームレスに置き換えている。"

cinematic_storyboard:
  00_04_opening:
    camera: "@video1 の冒頭のフレーミングと動きに一致させる。連続性を維持する。"
    action: "剣士は @video1 で元の少女が現れるのとまったく同じ位置に現れ、同じ冒頭のビートを演じる。彼女の顔、髪、衣装、剣が @image1 のデザインであることが明確に読み取れるようにしつつ、元のタイミングと身体のメカニクスを維持する。"
    lighting: "@video1 の冒頭の光と色の状態に一致させる。"

  04_08_transition:
    camera: "@video1 と同じカメラパスを継続する。"
    action: "彼女は @video1 の2つ目の動きのビートを、同一のブロッキングとリズムで続ける。回転、ステップ、ジェスチャー、戦闘動作はソース動画と完全に同一に保ち、見えているキャラクターの細部はすべて @image1 の剣士に属するものとする。"
    lighting: "ソースのライティング推移を正確に一致させる。"

  08_12_main_beat:
    camera: "@video1 のメインアクションのフレーミングに従う。"
    action: "@video1 の主要なアクションビートを完全な連続性で再現する。インタラクションのタイミング、身体の向き、空間関係、勢いを維持する。剣は彼女の手の中で解剖学的に正しく保たれ、ソースの振り付けに一貫して動く必要がある。"
    lighting: "@video1 の最も強いライティングのビートを維持する。"

  12_15_final_hold:
    camera: "@video1 のエンディングのフレーミングに一致させる。穏やかなホールド。"
    action: "最後の動きと収束のビートはソース動画に完全に従う。アイデンティティ、衣装、剣が完全に一貫した、安定して読み取りやすい剣士の最終画像で終える。"
    lighting: "@video1 の終盤の光の状態に一致させる。"

--- QUOTED TWEET ---
私も傍観しているだけではなく、@tebasaki3D の prompt を試してみることにしました。ローカルの #MinimaxH3 で動画を作成。
正直、音声はまったくうまくいきませんでした。
prompt の自分なりのバージョンはコメントにあります。何が間違っているのか分かる方がいれば、ぜひ教えてください。 https://t.co/964Nb0sXIG

--- THREAD CONTINUATION ---
[Thread 1] 1/2
prompt_start: "Continue from @video1."
title: "剣士キャラクタースワップ"
reference_handling: "CRITICAL: @video1 は、タイミング、カメラの動き、ブロッキング、アクションのビート、視線、環境、ライティングの推移、全体構図におけるマスターソースです。@video1 の振り付けと視覚的な連続性をショットごとに維持してください。@image1 はキャラクターデザイン専用として STRICTLY 使用します: 顔、髪、体型、衣装、カラーパレット、アクセサリー、剣のデザイン。@image1 のポーズ、フレーミング、構図は再現しないでください。@video1 の元の少女を、@image1 の剣士に置き換えるだけにしてください。"
style: "高忠実度の image-to-video キャラクター置換。@video1 の元の媒体、雰囲気、シーンのロジックを維持しつつ、@image1 の剣士アイデンティティをシームレスに統合する。"
visual_feel: "安定した時間的一貫性、説得力のある布と髪の動き、ソース映像への自然な統合、クリーンなアイデンティティロック。結果は、まるでその剣士が最初から元の動画の人物だったかのように感じられること。"
duration: "15 seconds"

character_modeling:
  swordswoman:
    base: "参照 @image1 に完全一致する女性剣士。"
    features: "顔のアイデンティティ、髪型、前髪、目の形、体型、衣装全体のシルエット、素材、カラーパレット、靴、アクセサリー、剣のデザインは @image1 と完全一致。"
    detail: "髪、衣服、剣は、@video1 にすでに存在する動き、重力、ライティングに自然に反応する。剣は常に正しく接続され、適切なスケールを保ち、各ショットで視覚的に安定している。"
    movement_in_this_scene: "彼女は、@video1 の元の少女とまったく同じ移動経路、ジェスチャー、姿勢変化、速度、インタラクション、視線を行う。画面上の位置、スケール、身体のタイミングは元の演者を正確に追従する。"
    state_in_this_scene: "彼女は最初のフレームから、@video1 の
```

### 上游提供的한국어版本（translations.ko）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2090070350587392070.json)

```text
prompt_start: "Continue from @video1."
title: "검객 캐릭터 스왑"
reference_handling: "CRITICAL: @video1은 타이밍, 카메라 움직임, 블로킹, 액션 비트, 시선 처리, 환경, 조명 변화, 전체 구도의 마스터 소스입니다. @video1의 안무와 시각적 연속성을 샷 단위로 그대로 유지하세요. @image1은 오직 캐릭터 디자인 용도로만 사용합니다: 얼굴, 머리카락, 신체 비율, 의상, 색상 팔레트, 액세서리, 검 디자인. @image1의 포즈, 프레이밍, 구도는 절대 재현하지 마세요. @video1의 원래 소녀를 @image1의 검객으로만 교체하세요."
style: "고충실도 image-to-video 캐릭터 교체. @video1의 원본 매체, 분위기, 장면 논리를 유지하면서 @image1의 검객 정체성을 자연스럽게 통합하세요."
visual_feel: "안정적인 시간적 일관성, 설득력 있는 옷감과 머리카락 움직임, 소스 영상에 자연스럽게 녹아드는 통합감, 깔끔한 아이덴티티 고정. 결과물은 마치 그 검객이 원래부터 영상 속 인물이었던 것처럼 느껴져야 합니다."
duration: "15 seconds"

character_modeling:
  swordswoman:
    base: "참조 @image1과 정확히 일치하는 여성 검객."
    features: "정확한 얼굴 정체성, 헤어스타일, 앞머리, 눈 형태, 신체 비율, 전체 의상 실루엣, 소재, 색상 팔레트, 신발, 액세서리, 그리고 @image1의 검 디자인."
    detail: "머리카락, 의상, 검은 @video1에 이미 존재하는 움직임, 중력, 조명에 자연스럽게 반응합니다. 검은 일관되게 손에 붙어 있어야 하며, 정확한 크기를 유지하고 모든 샷에서 시각적으로 안정적이어야 합니다."
    movement_in_this_scene: "그녀는 @video1의 원래 소녀와 정확히 동일한 이동 경로, 제스처, 자세 변화, 속도, 상호작용, 시선 처리를 수행합니다. 화면상의 위치, 스케일, 신체 타이밍은 원래 퍼포머를 정확히 따라가야 합니다."
    state_in_this_scene: "그녀는 @video1의 환경 안에 이미 완전히 존재하는 상태로 시작하며, 첫 프레임부터 원래 소녀를 자연스럽게 대체합니다."

cinematic_storyboard:
  00_04_opening:
    camera: "@video1의 오프닝 프레이밍과 움직임을 그대로 맞추세요. 연속성을 유지합니다."
    action: "검객은 @video1에서 원래 소녀가 등장하는 정확한 위치에 나타나 동일한 오프닝 비트를 수행합니다. 그녀의 얼굴, 머리카락, 의상, 검이 @image1의 디자인으로 분명하게 읽히도록 하면서도 원래의 타이밍과 신체 메커니즘을 유지하세요."
    lighting: "@video1의 오프닝 조명과 색감 상태를 맞추세요."

  04_08_transition:
    camera: "@video1의 동일한 카메라 경로를 계속 따르세요."
    action: "그녀는 @video1의 두 번째 움직임 비트를 동일한 블로킹과 리듬으로 이어갑니다. 회전, 발걸음, 제스처, 전투 동작은 소스 영상과 동일해야 하며, 보이는 모든 캐릭터 디테일은 @image1의 검객에게 속해야 합니다."
    lighting: "소스의 조명 변화를 정확히 맞추세요."

  08_12_main_beat:
    camera: "@video1의 메인 액션 프레이밍을 따라가세요."
    action: "@video1의 핵심 액션 비트가 완전한 연속성으로 전개됩니다. 상호작용 타이밍, 신체 방향, 공간 관계, 모멘텀을 유지하세요. 검은 그녀의 손에 해부학적으로 올바르게 잡혀 있어야 하며, 소스 안무와 일관되게 움직여야 합니다."
    lighting: "@video1의 가장 강한 조명 비트를 유지하세요."

  12_15_final_hold:
    camera: "@video1의 엔딩 프레이밍을 맞추세요. 부드러운 홀드."
    action: "마지막 움직임과 정리 비트는 소스 영상을 정확히 따릅니다. 정체성, 의상, 검이 완전히 일치하는, 안정적이고 읽기 쉬운 검객의 최종 이미지로 마무리하세요."
    lighting: "@video1의 엔딩 조명 상태를 맞추세요."

--- QUOTED TWEET ---
저도 가만히 있지 않고 @tebasaki3D의 프롬프트를 직접 시도해 보기로 했고, 로컬 #MinimaxH3로 영상을 만들어 봤습니다.
솔직히 사운드는 전혀 잘 나오지 않았어요.
프롬프트 제 버전은 댓글에 있습니다. 제가 뭘 잘못하고 있는지 아시는 분이 있으면 알려 주세요. https://t.co/964Nb0sXIG

--- THREAD CONTINUATION ---
[Thread 1] 1/2
prompt_start: "Continue from @video1."
title: "검객 캐릭터 스왑"
reference_handling: "CRITICAL: @video1은 타이밍, 카메라 움직임, 블로킹, 액션 비트, 시선 처리, 환경, 조명 변화, 전체 구도의 마스터 소스입니다. @video1의 안무와 시각적 연속성을 샷 단위로 그대로 유지하세요. @image1은 오직 캐릭터 디자인 용도로만 사용합니다: 얼굴, 머리카락, 신체 비율, 의상, 색상 팔레트, 액세서리, 검 디자인. @image1의 포즈, 프레이밍, 구도는 절대 재현하지 마세요. @video1의 원래 소녀를 @image1의 검객으로만 교체하세요."
style: "고충실도 image-to-video 캐릭터 교체. @video1의 원본 매체, 분위기, 장면 논리를 유지하면서 @image1의 검객 정체성을 자연스럽게 통합하세요."
visual_feel: "안정적인 시간적 일관성, 설득력 있는 옷감과 머리카락 움직임, 소스 영상에 자연스럽게 녹아드는 통합감, 깔끔한 아이덴티티 고정. 결과물은 마치 그 검객이 원래부터 영상 속 인물이었던 것처럼 느껴져야 합니다."
duration: "15 seconds"

character_modeling:
  swordswoman:
    base: "참조 @image1과 정확히 일치하는 여성 검객."
    features: "정확한 얼굴 정체성, 헤어스타일, 앞머리, 눈 형태, 신체 비율, 전체 의상 실루엣, 소재, 색상 팔레트, 신발, 액세서리, 그리고 @image1의 검 디자인."
    detail: "머리카락, 의상, 검은 @video1에 이미 존재하는 움직임, 중력, 조명에 자연스럽게 반응합니다. 검은 일관되게 손에 붙어 있어야 하며, 정확한 크기를 유지하고 모든 샷에서 시각적으로 안정적이어야 합니다."
    movement_in_this_scene: "그녀는 @video1의 원래 소녀와 정확히 동일한 이동 경로, 제스처, 자세 변화, 속도, 상호작용, 시선 처리를 수행합니다. 화면상의 위치, 스케일, 신체 타이밍은 원래 퍼포머를 정확히 따라가야 합니다."
    state_in_this_scene: "그녀는 @video1의 환경 안에 이미 완전히 존재하는 상태로 시작하며, 첫 프레임부터 원래 소녀를 자연스럽게 대체합니다."

cinematic_storyboard:
  00_04_opening:
    camera: "@video1의 오프닝 프레이밍과 움직임을 그대로 맞추세요. 연속성을 유지합니다."
    action: "검객은 @video1에서 원래 소녀가 등장하는 정확한 위치에 나타나 동일한 오프닝 비트를 수행합니다. 그녀의 얼굴, 머리카락, 의상, 검이 @image1의 디자인으로 분명하게 읽히도록 하면서도 원래의 타이밍과 신체 메커니즘을 유지하세요."
    lighting: "@video1의 오프닝 조명과 색감 상태를 맞추세요."

  04_08_transition:
    camera: "@video1의 동일한 카메라 경로를 계속 따르세요."
    action: "그녀는 @video1
```

### 上游提供的pt版本（translations.pt）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2090070350587392070.json)

```text
---
prompt_start: "Continue from @video1."
title: "Troca de Personagem: Espadachim"
reference_handling: "CRITICAL: @video1 é a fonte principal para timing, movimento de câmera, blocking, beats de ação, eyelines, ambiente, progressão de iluminação e composição geral. Preserve a coreografia e a continuidade visual de @video1 plano a plano. @image1 é usado ESTRITAMENTE apenas para o design do personagem: rosto, cabelo, proporções corporais, figurino, paleta de cores, acessórios e design da espada. NÃO reproduza a pose, o enquadramento ou a composição de @image1. Substitua apenas a garota original de @video1 pela espadachim de @image1."
style: "Substituição de personagem image-to-video em alta fidelidade. Preserve o meio original, a atmosfera e a lógica da cena de @video1 enquanto integra perfeitamente a identidade da espadachim de @image1."
visual_feel: "Consistência temporal estável, movimento crível de roupa e cabelo, integração natural ao material de origem, travamento de identidade limpo. O resultado deve parecer que a espadachim sempre foi a pessoa no vídeo original."
duration: "15 seconds"

character_modeling:
  swordswoman:
    base: "Espadachim feminina correspondendo exatamente à referência @image1."
    features: "Identidade facial exata, penteado, franja, formato dos olhos, proporções corporais, silhueta completa do figurino, materiais, paleta de cores, calçados, acessórios e design da espada de @image1."
    detail: "Cabelo, roupa e espada reagem naturalmente ao movimento, à gravidade e à iluminação já presentes em @video1. A espada permanece consistentemente presa, corretamente dimensionada e visualmente estável em todos os planos."
    movement_in_this_scene: "Ela executa exatamente o mesmo caminho de movimento, gestos, mudanças de postura, velocidade, interações e eyelines da garota original em @video1. Sua posição na tela, escala e timing corporal acompanham com precisão a performance original."
    state_in_this_scene: "Ela já começa totalmente presente dentro do ambiente de @video1, substituindo perfeitamente a garota original desde o primeiro frame."

cinematic_storyboard:
  00_04_opening:
    camera: "Combine o enquadramento e o movimento iniciais de @video1. Mantenha a continuidade."
    action: "A espadachim aparece exatamente onde a garota original aparece em @video1 e executa o mesmo beat de abertura. Preserve o timing original e a mecânica corporal, garantindo que seu rosto, cabelo, roupa e espada sejam claramente reconhecidos como o design de @image1."
    lighting: "Combine o estado inicial de luz e cor de @video1."

  04_08_transition:
    camera: "Continue o mesmo caminho de câmera de @video1."
    action: "Ela continua o segundo beat de movimento de @video1 com blocking e ritmo idênticos. Quaisquer giros, passos, gestos ou movimentos de combate permanecem idênticos ao vídeo de origem, mas todos os detalhes visíveis do personagem pertencem à espadachim de @image1."
    lighting: "Combine exatamente a progressão de iluminação da fonte."

  08_12_main_beat:
    camera: "Siga o enquadramento principal da ação de @video1."
    action: "O beat de ação principal de @video1 se desenrola com continuidade total. Preserve o timing da interação, a orientação corporal, as relações espaciais e o momentum. A espada deve permanecer anatomicamente correta em sua mão e se mover de forma consistente com a coreografia da fonte."
    lighting: "Preserve o beat de iluminação mais forte de @video1."

  12_15_final_hold:
    camera: "Combine o enquadramento final de @video1. Hold suave."
    action: "O movimento final e o beat de acomodação seguem exatamente o vídeo de origem. Termine com uma imagem final estável e legível da espadachim, com identidade, figurino e espada totalmente consistentes."
    lighting: "Combine o estado final de luz de @video1."

--- QUOTED TWEET ---
Também decidi não ficar só assistindo e testar o prompt do @tebasaki3D — e fazer um vídeo no #MinimaxH3 local.
O som, sinceramente, não ficou bom de jeito nenhum.
Minha versão do prompt está no comentário. Se alguém souber o que estou fazendo de errado, por favor me avise. https://t.co/964Nb0sXIG

--- THREAD CONTINUATION ---
[Thread 1] 1/2
prompt_start: "Continue from @video1."
title: "Troca de Personagem: Espadachim"
reference_handling: "CRITICAL: @video1 é a fonte principal para timing, movimento de câmera, blocking, beats de ação, eyelines, ambiente, progressão de iluminação e composição geral. Preserve a coreografia e a continuidade visual de @video1 plano a plano. @image1 é usado ESTRITAMENTE apenas para o design do personagem: rosto, cabelo, proporções corporais, figurino, paleta de cores, acessórios e design da espada. NÃO reproduza a pose, o enquadramento ou a composição de @image1. Substitua apenas a garota original de @video1 pela espadachim de @image1."
style: "Substituição de personagem image-to-video em alta fidelidade. Preserve o meio original, a atmosfera e a lógica da cena de @video1 enquanto integra perfeitamente a identidade da espadachim de @image1."
visual_feel: "Consistência temporal estável, movimento crível de roupa e cabelo, integração natural ao material de origem, travamento de identidade limpo. O resultado deve parecer que a espadachim sempre foi a pessoa no vídeo original."
duration: "15 seconds"

character_modeling:
  swordswoman:
    base: "Espadachim feminina correspondendo exatamente à referência @image1."
    features: "Identidade facial exata, penteado, franja, formato dos olhos, proporções corporais, silhueta completa do figurino, materiais, paleta de cores, calçados, acessórios e design da espada de @image1."
    detail: "Cabelo, roupa e espada reagem naturalmente ao movimento, à gravidade e à iluminação já presentes em @video1. A espada permanece consistentemente presa, corretamente dimensionada e visualmente estável em todos os planos."
    movement_in_this_scene: "Ela executa exatamente o mesmo caminho de movimento, gestos, mudanças de postura, velocidade, interações e eyelines da garota original em @video1. Sua posição na tela, escala e timing corporal acompanham com precisão a performance original."
    state_in_this_scene: "Ela já começa totalmente presente dentro do ambiente de @video1, substituindo perfeitamente a garota original desde o primeiro frame."

cinematic_storyboard:
  00_04_opening:
    camera: "Combine o enquadramento e o movimento iniciais de @video1. Mantenha a continuidade."
    action: "A espadachim aparece exatamente onde a garota original aparece em @video1 e executa o mesmo beat de abertura. Preserve o timing original e a mecânica corporal, garantindo que seu rosto, cabelo, roupa e espada sejam claramente reconhecidos como o design de @image1."
    lighting: "Combine o estado inicial de luz e cor de @video1."

  04_08_transition:
    camera: "Continue o mesmo caminho de câmera de @video1."
    action: "Ela continua o segundo beat de movimento de @video1 com blocking e ritmo idênticos. Quaisquer giros, passos, gestos ou movimentos de combate permanecem idênticos ao vídeo de origem, mas todos os detalhes visíveis do personagem pertencem à espadachim de @image1."
    lighting: "Combine exatamente a progressão de iluminação da fonte."

  08_12_main_beat:
    camera: "Siga o enquadramento principal da ação de @video1."
    action: "O beat de ação principal de @video1 se desenrola com continuidade total. Preserve o timing da interação, a orientação corporal, as relações espaciais e o momentum. A espada deve permanecer anatomicamente correta em sua mão e se mover de forma consistente com a coreografia da fonte."
    lighting: "Preserve o beat de iluminação mais forte de @video1."

  12_15_final_hold:
    camera: "Combine o enquadramento final de @video1. Hold suave."
    action: "O movimento final e o beat de acomodação seguem exatamente o vídeo de origem. Termine com uma imagem final estável e legível da espadachim, com identidade, figurino e espada totalmente consistentes."
    lighting: "Combine o estado final de luz de @video1."

[Thread 2] 2/2 production_notes:
  audio_design: "Preserve o clima e o timing do áudio original de @video1, se o áudio estiver ativado."
  lighting: "Não redesenhe a iluminação. Siga @video1 exatamente para que a substituição pareça nativa ao material."
  critical_constraint: "Esta é uma tarefa de substituição de personagem, não de redesign de cena. Mantenha o ambiente, a ordem dos planos, o movimento de câmera, o ritmo e a estrutura de ação de @video1. Substitua
```

### 上游提供的中文版本（translations.zh）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2090070350587392070.json)

```text
prompt_start: "从 @video1 继续。"
title: "剑士角色替换"
reference_handling: "关键：@video1 是时间节奏、镜头运动、走位、动作节拍、视线方向、环境、光照变化以及整体构图的主来源。请逐镜头保留 @video1 的编排和视觉连续性。@image1 仅严格用于角色设计：脸、头发、身体比例、服装、配色、配饰以及剑的设计。不要复现 @image1 的姿势、取景或构图。只将 @video1 中原本的女孩替换为 @image1 中的剑士。"
style: "高保真 image-to-video 角色替换。保留 @video1 的原始媒介、氛围和场景逻辑，同时无缝融入 @image1 中的剑士身份。"
visual_feel: "稳定的时间一致性、可信的布料与头发运动、与源视频自然融合、干净的身份锁定。最终效果必须让人感觉这位剑士本来就是原视频中的人物。"
duration: "15 秒"

character_modeling:
  swordswoman:
    base: "与参考 @image1 完全一致的女性剑士。"
    features: "来自 @image1 的精确面部身份、发型、刘海、眼型、身体比例、完整服装轮廓、材质、配色、鞋履、配饰以及剑的设计。"
    detail: "头发、衣物和剑会自然响应 @video1 中已存在的运动、重力和光照。剑始终稳定连接、比例正确，并在每个镜头中保持视觉稳定。"
    movement_in_this_scene: "她执行与 @video1 中原女孩完全相同的运动路径、手势、姿态变化、速度、互动和视线方向。她在画面中的位置、比例和身体节奏都精确跟随原表演者。"
    state_in_this_scene: "她从一开始就已经完整存在于 @video1 的环境中，从第一帧起无缝替换原女孩。"

cinematic_storyboard:
  00_04_opening:
    camera: "匹配 @video1 的开场构图和运动。保持连续性。"
    action: "剑士出现在 @video1 中原女孩出现的完全相同位置，并执行相同的开场动作。保留原始时间节奏和身体机制，同时确保她的脸、头发、服装和剑清晰呈现为 @image1 的设计。"
    lighting: "匹配 @video1 开场时的光线和色彩状态。"

  04_08_transition:
    camera: "延续 @video1 的同一路径镜头运动。"
    action: "她继续执行 @video1 的第二段动作节拍，走位和节奏完全一致。任何转身、步伐、手势或战斗动作都与源视频相同，但所有可见的角色细节都属于 @image1 中的剑士。"
    lighting: "精确匹配源视频的光照变化。"

  08_12_main_beat:
    camera: "跟随 @video1 的主动作构图。"
    action: "完整连续地呈现 @video1 中的关键动作节拍。保留互动时机、身体朝向、空间关系和动量。剑在她手中的持握必须符合人体结构，并与源编排保持一致地运动。"
    lighting: "保留 @video1 中最强的光照节拍。"

  12_15_final_hold:
    camera: "匹配 @video1 的结尾构图。轻微停留。"
    action: "最终动作和收势完全遵循源视频。以一个稳定、清晰、可读的剑士最终画面结束，身份、服装和剑都保持完全一致。"
    lighting: "匹配 @video1 的结尾光照状态。"

--- QUOTED TWEET ---
我也决定不再袖手旁观，试了下 @tebasaki3D 的 prompt —— 并在本地 #MinimaxH3 里做了个视频。
说实话，声音完全没做出来。
我的 prompt 版本放在评论里。如果有人知道我哪里做错了，请告诉我。 https://t.co/964Nb0sXIG

--- THREAD CONTINUATION ---
[Thread 1] 1/2
prompt_start: "从 @video1 继续。"
title: "剑士角色替换"
reference_handling: "关键：@video1 是时间节奏、镜头运动、走位、动作节拍、视线方向、环境、光照变化以及整体构图的主来源。请逐镜头保留 @video1 的编排和视觉连续性。@image1 仅严格用于角色设计：脸、头发、身体比例、服装、配色、配饰以及剑的设计。不要复现 @image1 的姿势、取景或构图。只将 @video1 中原本的女孩替换为 @image1 中的剑士。"
style: "高保真 image-to-video 角色替换。保留 @video1 的原始媒介、氛围和场景逻辑，同时无缝融入 @image1 中的剑士身份。"
visual_feel: "稳定的时间一致性、可信的布料与头发运动、与源视频自然融合、干净的身份锁定。最终效果必须让人感觉这位剑士本来就是原视频中的人物。"
duration: "15 秒"

character_modeling:
  swordswoman:
    base: "与参考 @image1 完全一致的女性剑士。"
    features: "来自 @image1 的精确面部身份、发型、刘海、眼型、身体比例、完整服装轮廓、材质、配色、鞋履、配饰以及剑的设计。"
    detail: "头发、衣物和剑会自然响应 @video1 中已存在的运动、重力和光照。剑始终稳定连接、比例正确，并在每个镜头中保持视觉稳定。"
    movement_in_this_scene: "她执行与 @video1 中原女孩完全相同的运动路径、手势、姿态变化、速度、互动和视线方向。她在画面中的位置、比例和身体节奏都精确跟随原表演者。"
    state_in_this_scene: "她从一开始就已经完整存在于 @video1 的环境中，从第一帧起无缝替换原女孩。"

cinematic_storyboard:
  00_04_opening:
    camera: "匹配 @video1 的开场构图和运动。保持连续性。"
    action: "剑士出现在 @video1 中原女孩出现的完全相同位置，并执行相同的开场动作。保留原始时间节奏和身体机制，同时确保她的脸、头发、服装和剑清晰呈现为 @image1 的设计。"
    lighting: "匹配 @video1 开场时的光线和色彩状态。"

  04_08_transition:
    camera: "延续 @video1 的同一路径镜头运动。"
    action: "她继续执行 @video1 的第二段动作节拍，走位和节奏完全一致。任何转身、步伐、手势或战斗动作都与源视频相同，但所有可见的角色细节都属于 @image1 中的剑士。"
    lighting: "精确匹配源视频的光照变化。"

  08_12_main_beat:
    camera: "跟随 @video1 的主动作构图。"
    action: "完整连续地呈现 @video1 中的关键动作节拍。保留互动时机、身体朝向、空间关系和动量。剑在她手中的持握必须符合人体结构，并与源编排保持一致地运动。"
    lighting: "保留 @video1 中最强的光照节拍。"

  12_15_final_hold:
    camera: "匹配 @video1 的结尾构图。轻微停留。"
    action: "最终动作和收势完全遵循源视频。以一个稳定、清晰、可读的剑士最终画面结束，身份、服装和剑都保持完全一致。"
    lighting: "匹配 @video1 的结尾光照状态。"

[Thread 2] 2/2 production_notes:
  audio_design: "如果启用了音频，请保留 @video1 的原始音频氛围和节奏。"
  lighting: "不要重新设计光照。严格跟随 @video1，这样替换效果才会像原生存在于素材中。"
  critical_constraint: "这是角色替换任务，不是场景重设计。保留 @video1 的环境、
```

## 出处与许可

- 原作者：[Aliaksei.AI](https://x.com/Aliaksei_AI) · 原帖：<https://x.com/Aliaksei_AI/status/2090070350587392070>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[renoise-ai/awesome-seedance-prompts](https://github.com/renoise-ai/awesome-seedance-prompts)，[原文位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2090070350587392070.json)
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
