---
id: "renoise-2079113446105501983"
title: "Create a 15-second, 9:16, photorealistic martial arts video in one continuous…"
title_en: null
model: "Seedance 2.0"
language: "en"
medium: "真人"
direction: "特效向"
genre: "武侠打斗"
art_style: null
tags: ["Seedance 2.0", "Renoise", "Action", "Wuxia", "Photoreal", "Realistic World"]
source_repo: "renoise-ai/awesome-seedance-prompts"
source_url: "https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2079113446105501983.json"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "Larus Canus"
original_author_url: "https://x.com/MrLarus"
original_post_url: "https://x.com/MrLarus/status/2079113446105501983"
published: "2026-07-20"
third_party_author: true
flags: []
also_in: []
source_page: null
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
output_status: "output_unverified"
verification: "attribution_checked"
---

# Create a 15-second, 9:16, photorealistic martial arts video in one continuous…

## 提示词（English）

```text
Create a 15-second, 9:16, photorealistic martial arts video in one continuous shot.

Video 1 is the main reference for the motion, timing, camera, framing, rhythm, and BGM. Follow it as closely as possible frame by frame. Keep the original action order, weapon trajectory, body movement, timing, and camera structure.

Image 1 is the character reference. Replace the original performer with the same 50-year-old East Asian market auntie throughout the video. Keep her face, outfit, body, and overall look consistent.

Image 2 is the scene reference. Replace the original environment with the open T-junction inside a local market. Keep the subject large and centered, with enough open space for the full weapon movement.

Weapon continuity is critical: the same black-and-gold Guan Dao must stay in her hands from the first frame to the last. Even in fast motion, blur, or occlusion, it should still be treated as continuously present. Never let it disappear, deform, shrink, or turn into another weapon.

As she performs, different vendors and shoppers gradually gather in the background. They stay behind or to the sides, never blocking the subject. Their reactions can be natural and light — watching, smiling, clapping, or cheering.

Overall feeling: an ordinary market auntie suddenly reveals impressive Guan Dao skills — a true hidden master among everyday people.

Avoid camera cuts, new choreography, subject shrinking, weapon disappearance, face changes, outfit changes, duplicated people, blocking the subject, exaggerated VFX, subtitles, logos, or watermarks.
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### 上游提供的Español版本（translations.es）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2079113446105501983.json)

```text
Crea un video de artes marciales fotorrealista de 15 segundos, en formato 9:16, en una sola toma continua.

El Video 1 es la referencia principal para el movimiento, el timing, la cámara, el encuadre, el ritmo y la BGM. Síguelo lo más fielmente posible, fotograma a fotograma. Mantén el orden original de las acciones, la trayectoria del arma, el movimiento corporal, el timing y la estructura de cámara.

La Imagen 1 es la referencia del personaje. Sustituye al intérprete original por la misma tía de mercado de Asia Oriental de 50 años durante todo el video. Mantén coherentes su rostro, vestuario, cuerpo y apariencia general.

La Imagen 2 es la referencia de la escena. Sustituye el entorno original por la T abierta dentro de un mercado local. Mantén al sujeto grande y centrado, con suficiente espacio libre para el movimiento completo del arma.

La continuidad del arma es crítica: el mismo Guan Dao negro y dorado debe permanecer en sus manos desde el primer fotograma hasta el último. Incluso con movimiento rápido, desenfoque u oclusión, debe seguir considerándose presente de forma continua. Nunca permitas que desaparezca, se deforme, se encoja o se convierta en otra arma.

Mientras actúa, distintos vendedores y compradores se van reuniendo gradualmente en el fondo. Permanecen detrás o a los lados, sin bloquear nunca al sujeto. Sus reacciones pueden ser naturales y ligeras: mirar, sonreír, aplaudir o animar.

Sensación general: una tía de mercado común revela de repente unas impresionantes habilidades con el Guan Dao: una auténtica maestra oculta entre la gente corriente.

Evita cortes de cámara, nueva coreografía, que el sujeto se haga más pequeño, desaparición del arma, cambios de rostro, cambios de vestuario, personas duplicadas, bloqueo del sujeto, VFX exagerados, subtítulos, logos o marcas de agua.

--- TWEET CITADO ---
🤯 Para evitar revisiones erróneas o que se “atasque la cara” en videos populares, primero conviértelo a Depth para conservar el movimiento; ¡la IA lo replica a la perfección!

El usuario @impalementd compartió un buen método:
Convierte el video de referencia a Depth para evitar que el video original se bloquee por problemas de imagen.

El popular “baile del tractor” de Douyin lo cambié por una chica sexy funcional bailando junto al campo, ¡y atrajo a los perros del pueblo para mirar! 🤣

🌟 Flujo de producción:
1. Prepara un video que te guste (por ejemplo, un baile)
2. Usa un modelo de estimación de profundidad para convertirlo con gradio a un video Depth
3. Genera nuevas imágenes de referencia del personaje + la escena
4. Usa el prompt de la sección de comentarios + los materiales para que Seedance genere un nuevo video

¡Este método es ideal para hacer una transferencia de movimiento más limpia!
El movimiento puede tomarse como referencia, mientras que el personaje, la ropa, la escena y la narrativa se recrean desde cero; al final, el resultado es una versión completamente nueva.

Workflow + Prompt abajo 👇

--- CONTINUACIÓN DEL HILO ---
[Hilo 1] 1/ Workflow

1. Elige un video de referencia de menos de 15 s
2. Convierte el video a Depth con Depth Anything V2
3. Genera un nuevo personaje + escena
4. Usa el video Depth como referencia de movimiento
5. Introduce todo en Seedance y mantén lo más fielmente posible el timing, la cámara, el movimiento y la BGM originales

Depth conserva la estructura del movimiento mientras elimina la mayor parte del contenido visual original, haciendo que el intercambio de personaje y escena sea mucho más limpio.

Aun así, deben considerarse los derechos de la coreografía original y de la música.

Nota de la fuente: el clip de referencia del Guan Dao usado en esta demo proviene del creador de Douyin hanfei11111.

[Hilo 2] 2/ Envía este prompt + la imagen de referencia a Codex, y podrás construir tu propio convertidor local de videos Depth como este.

Prompt para Codex:

Build a complete Python Depth video converter that runs locally on Windows and macOS, without relying on any existing project code.

1. Use Gradio for a simple web UI and support MP4 / MOV uploads.
2. Use Depth Anything V2 to convert each frame into a grayscale Depth video.
3. Automatically use NVIDIA CUDA on Windows when available, Apple Silicon acceleration on Mac when available, otherwise fall back to CPU.
4. Include model size selection, output resolution, black/white inversion, temporal smoothing to reduce flicker, optional original audio preservation with ffmpeg, and export to a compatible MP4.

Also generate requirements.txt, README.md, a complete runnable Python script, and clear installation and launch commands for both Windows and macOS.

[Hilo 3] 3/ Prompt de Seedance

Crea un video de artes marciales fotorrealista de 15 segundos, en formato 9:16, en una sola toma continua.

El Video 1 es la referencia principal para el movimiento, el timing, la cámara, el encuadre, el ritmo y la BGM. Síguelo lo más fielmente posible, fotograma a fotograma. Mantén el orden original de las acciones, la trayectoria del arma, el movimiento corporal, el timing y la estructura de cámara.

La Imagen 1 es la referencia del personaje. Sustituye al intérprete original por la misma tía de mercado de Asia Oriental de 50 años durante todo el video. Mantén coherentes su rostro, vestuario, cuerpo y apariencia general.

La Imagen 2 es la referencia de la escena. Sustituye el entorno original por la T abierta dentro de un mercado local. Mantén al sujeto grande y centrado, con suficiente espacio libre para el movimiento completo del arma.

La continuidad del arma es crítica: el mismo Guan Dao negro y dorado debe permanecer en sus manos desde el primer fotograma hasta el último. Incluso con movimiento rápido, desenfoque u oclusión, debe seguir considerándose presente de forma continua. Nunca permitas que desaparezca, se deforme, se encoja o se convierta en otra arma.

Mientras actúa, distintos vendedores y compradores se van reuniendo gradualmente en el fondo. Permanecen detrás o a los lados, sin bloquear nunca al sujeto. Sus reacciones pueden ser naturales y ligeras: mirar, sonreír, aplaudir o animar.

Sensación general: una tía de mercado común revela de repente unas impresionantes habilidades con el Guan Dao: una auténtica maestra oculta entre la gente corriente.

Evita cortes de cámara, nueva coreografía, que el sujeto se haga más pequeño, desaparición del arma, cambios de rostro, cambios de vestuario, personas duplicadas, bloqueo del sujeto, VFX exagerados, subtítulos, logos o marcas de agua.
```

### 上游提供的fr版本（translations.fr）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2079113446105501983.json)

```text
Créer une vidéo d’arts martiaux photoréaliste de 15 secondes, en 9:16, en une seule prise continue.

La vidéo 1 est la référence principale pour le mouvement, le timing, la caméra, le cadrage, le rythme et la BGM. Suivez-la aussi fidèlement que possible, image par image. Conservez l’ordre original des actions, la trajectoire de l’arme, les mouvements du corps, le timing et la structure de la caméra.

L’image 1 est la référence du personnage. Remplacez l’interprète original par la même tante de marché est-asiatique de 50 ans tout au long de la vidéo. Gardez son visage, sa tenue, son corps et son apparence générale cohérents.

L’image 2 est la référence du décor. Remplacez l’environnement original par le carrefour en T ouvert à l’intérieur d’un marché local. Gardez le sujet grand et centré, avec suffisamment d’espace libre pour permettre l’intégralité du mouvement de l’arme.

La continuité de l’arme est critique : le même Guan Dao noir et or doit rester dans ses mains du premier au dernier plan. Même en cas de mouvement rapide, de flou ou d’occlusion, il doit toujours être considéré comme présent en continu. Ne le laissez jamais disparaître, se déformer, rétrécir ou se transformer en une autre arme.

Pendant qu’elle exécute sa performance, différents vendeurs et clients se rassemblent progressivement à l’arrière-plan. Ils restent derrière ou sur les côtés, sans jamais bloquer le sujet. Leurs réactions peuvent être naturelles et légères — regarder, sourire, applaudir ou encourager.

Impression générale : une tante de marché ordinaire révèle soudain des compétences impressionnantes au Guan Dao — une véritable maîtresse cachée parmi les gens du quotidien.

Évitez les coupes de caméra, une nouvelle chorégraphie, la réduction du sujet, la disparition de l’arme, les changements de visage, les changements de tenue, les personnes dupliquées, le fait de bloquer le sujet, les VFX exagérés, les sous-titres, les logos ou les filigranes.

--- TWEET CITÉ ---
🤯 Pour éviter les faux positifs de modération ou les visages figés sur les vidéos tendance, convertissez d’abord en Depth pour conserver le mouvement, et l’IA le reproduira parfaitement !

Le compte @impalementd a partagé une bonne méthode :
convertir la vidéo de référence en Depth peut éviter qu’elle soit bloquée à cause de problèmes visuels !

La “danse du tracteur” devenue virale sur Douyin a été remplacée par une fille stylée et sexy dansant au bord d’un champ, attirant les chiens du village 🤣

🌟 Processus de création :
1. Préparez une vidéo que vous aimez (par exemple une danse)
2. Utilisez un modèle d’estimation de profondeur gradio pour la convertir en vidéo Depth
3. Générez de nouveaux visuels de personnage + décor de référence
4. Utilisez les prompts du commentaire + les assets pour demander à Seedance de générer une nouvelle vidéo

Cette méthode est idéale pour un transfert de mouvement plus propre !
Le mouvement peut servir de référence, tandis que le personnage, les vêtements, le décor et la narration sont recréés ; au final, on obtient une version entièrement nouvelle.

Workflow + Prompt ci-dessous 👇

--- SUITE DU THREAD ---
[Thread 1] 1/ Workflow

1. Choisissez une vidéo de référence de moins de 15 s
2. Convertissez-la en vidéo Depth avec Depth Anything V2
3. Générez un nouveau personnage + décor
4. Utilisez la vidéo Depth comme référence de mouvement
5. Injectez tout dans Seedance et conservez aussi fidèlement que possible le timing, la caméra, le mouvement et la BGM d’origine

Depth conserve la structure du mouvement tout en supprimant la majeure partie du contenu visuel original, ce qui rend les remplacements de personnage et de décor beaucoup plus propres.

Les droits liés à la chorégraphie originale et à la musique doivent toujours être pris en compte.

Note de source : le clip de référence du Guan Dao utilisé dans cette démo provient du créateur Douyin hanfei11111.

[Thread 2] 2/ Envoyez ce prompt + l’image de référence à Codex, et vous pourrez créer votre propre convertisseur local de vidéos Depth, exactement comme celui-ci.

Prompt pour Codex :

Build a complete Python Depth video converter that runs locally on Windows and macOS, without relying on any existing project code.

1. Use Gradio for a simple web UI and support MP4 / MOV uploads.
2. Use Depth Anything V2 to convert each frame into a grayscale Depth video.
3. Automatically use NVIDIA CUDA on Windows when available, Apple Silicon acceleration on Mac when available, otherwise fall back to CPU.
4. Include model size selection, output resolution, black/white inversion, temporal smoothing to reduce flicker, optional original audio preservation with ffmpeg, and export to a compatible MP4.

Also generate requirements.txt, README.md, a complete runnable Python script, and clear installation and launch commands for both Windows and macOS.

[Thread 3] 3/ Seedance Prompt

Créer une vidéo d’arts martiaux photoréaliste de 15 secondes, en 9:16, en une seule prise continue.

La vidéo 1 est la référence principale pour le mouvement, le timing, la caméra, le cadrage, le rythme et la BGM. Suivez-la aussi fidèlement que possible, image par image. Conservez l’ordre original des actions, la trajectoire de l’arme, les mouvements du corps, le timing et la structure de la caméra.

L’image 1 est la référence du personnage. Remplacez l’interprète original par la même tante de marché est-asiatique de 50 ans tout au long de la vidéo. Gardez son visage, sa tenue, son corps et son apparence générale cohérents.

L’image 2 est la référence du décor. Remplacez l’environnement original par le carrefour en T ouvert à l’intérieur d’un marché local. Gardez le sujet grand et centré, avec suffisamment d’espace libre pour permettre l’intégralité du mouvement de l’arme.

La continuité de l’arme est critique : le même Guan Dao noir et or doit rester dans ses mains du premier au dernier plan. Même en cas de mouvement rapide, de flou ou d’occlusion, il doit toujours être considéré comme présent en continu. Ne le laissez jamais disparaître, se déformer, rétrécir ou se transformer en une autre arme.

Pendant qu’elle exécute sa performance, différents vendeurs et clients se rassemblent progressivement à l’arrière-plan. Ils restent derrière ou sur les côtés, sans jamais bloquer le sujet. Leurs réactions peuvent être naturelles et légères — regarder, sourire, applaudir ou encourager.

Impression générale : une tante de marché ordinaire révèle soudain des compétences impressionnantes au Guan Dao — une véritable maîtresse cachée parmi les gens du quotidien.

Évitez les coupes de caméra, une nouvelle chorégraphie, la réduction du sujet, la disparition de l’arme, les changements de visage, les changements de tenue, les personnes dupliquées, le fait de bloquer le sujet, les VFX exagérés, les sous-titres, les logos ou les filigranes.
```

### 上游提供的日本語版本（translations.ja）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2079113446105501983.json)

```text
---
15秒、9:16、フォトリアルな武術動画を、1本の連続ショットで作成する。

Video 1 は、モーション、タイミング、カメラ、フレーミング、リズム、BGM の主要な参照元です。できる限りフレーム単位で忠実に再現してください。元のアクション順、武器の軌道、身体の動き、タイミング、カメラ構成を維持してください。

Image 1 はキャラクター参照です。動画全体で、元の演者を同じ50歳の東アジア系の市場のおばちゃんに置き換えてください。顔、服装、体型、全体の見た目は一貫性を保ってください。

Image 2 はシーン参照です。元の環境を、地元の市場内にある開けたT字路に置き換えてください。被写体は大きく中央に配置し、武器の動きを最後まで見せられる十分な空間を確保してください。

武器の連続性は極めて重要です。最初のフレームから最後のフレームまで、同じ黒と金の関刀が必ず彼女の手にある状態を維持してください。高速動作、ブラー、遮蔽があっても、連続して存在しているものとして扱ってください。消えたり、変形したり、小さくなったり、別の武器に変わったりしてはいけません。

彼女の演武に合わせて、背景にはさまざまな店主や買い物客が徐々に集まってきます。彼らは被写体の後ろや左右に留まり、決して遮らないようにしてください。反応は自然で軽いもので構いません。見ている、笑っている、拍手している、歓声を上げている、など。

全体の雰囲気：普通の市場のおばちゃんが、突然すごい関刀の腕前を見せる——まさに日常の中に潜む達人。

カット切り替え、新しい振り付け、被写体の縮小、武器の消失、顔の変化、服装の変化、人物の重複、被写体の遮蔽、過剰なVFX、字幕、ロゴ、ウォーターマークは避けてください。

--- QUOTED TWEET ---
🤯人気動画で誤審や顔崩れを避けるには、まず Depth に変換して動きを保持し、AIで完璧に再現！

推友 @impalementd が共有してくれた良い方法：
参考動画を Depth に変換すると、元動画の画面上の問題で引っかかるのを避けられる！

Douyin で人気の「トラクターダンス」を、機能系ギャルが畑のそばで踊る形に変えたら、村の犬が見に来た🤣

🌟制作フロー：
1. 好きな動画を1本用意する（例：ダンス）
2. 深度推定モデル gradio を使って Depth 動画に変換する
3. 新しいキャラクター＋シーンの参照画像を生成する
4. コメント欄の prompt + 素材を参考にして Seedance で新しい動画を生成する

この方法は、よりクリーンな動作移植に向いています！
動きは参考にしつつ、キャラクター、服装、シーン、ストーリーは再創作し、最終的にはまったく新しいバージョンに仕上がります。

Workflow + Prompt below 👇

--- THREAD CONTINUATION ---
[Thread 1] 1/ Workflow

1. 15秒未満の参考動画を選ぶ
2. Depth Anything V2 を使って Depth 動画に変換する
3. 新しいキャラクター＋シーンを生成する
4. Depth 動画をモーション参照として使う
5. すべてを Seedance に入力し、元のタイミング、カメラ、モーション、BGM をできる限り忠実に維持する

Depth はモーション構造を保持しつつ、元の視覚情報の大部分を取り除くため、キャラクターやシーンの差し替えがよりクリーンになります。

元の振り付けと音楽の権利については、引き続き考慮が必要です。

出典メモ：このデモで使用した関刀の参考クリップは、Douyin クリエイター hanfei11111 のものです。

[Thread 2] 2/ この prompt と参照画像を Codex に送れば、同じようなローカル Depth 動画変換ツールを自分で構築できます。

Codex 用 prompt:

Windows と macOS 上でローカル実行でき、既存のプロジェクトコードに依存しない、完全な Python の Depth 動画変換ツールを構築してください。

1. シンプルな Web UI に Gradio を使用し、MP4 / MOV のアップロードに対応すること。
2. Depth Anything V2 を使って、各フレームをグレースケールの Depth 動画に変換すること。
3. Windows では利用可能な場合に NVIDIA CUDA を自動使用し、Mac では利用可能な場合に Apple Silicon のアクセラレーションを使用し、それ以外は CPU にフォールバックすること。
4. モデルサイズ選択、出力解像度、白黒反転、ちらつきを抑えるための時間的スムージング、ffmpeg を使った元音声の任意保持、互換性のある MP4 への書き出しを含めること。

さらに、requirements.txt、README.md、完全に実行可能な Python スクリプト、そして Windows と macOS の両方に対応した明確なインストールおよび起動コマンドも生成してください。

[Thread 3] 3/ Seedance Prompt

15秒、9:16、フォトリアルな武術動画を、1本の連続ショットで作成する。

Video 1 は、モーション、タイミング、カメラ、フレーミング、リズム、BGM の主要な参照元です。できる限りフレーム単位で忠実に再現してください。元のアクション順、武器の軌道、身体の動き、タイミング、カメラ構成を維持してください。

Image 1 はキャラクター参照です。動画全体で、元の演者を同じ50歳の東アジア系の市場のおばちゃんに置き換えてください。顔、服装、体型、全体の見た目は一貫性を保ってください。

Image 2 はシーン参照です。元の環境を、地元の市場内にある開けたT字路に置き換えてください。被写体は大きく中央に配置し、武器の動きを最後まで見せられる十分な空間を確保してください。

武器の連続性は極めて重要です。最初のフレームから最後のフレームまで、同じ黒と金の関刀が必ず彼女の手にある状態を維持してください。高速動作、ブラー、遮蔽があっても、連続して存在しているものとして扱ってください。消えたり、変形したり、小さくなったり、別の武器に変わったりしてはいけません。

彼女の演武に合わせて、背景にはさまざまな店主や買い物客が徐々に集まってきます。彼らは被写体の後ろや左右に留まり、決して遮らないようにしてください。反応は自然で軽いもので構いません。見ている、笑っている、拍手している、歓声を上げている、など。

全体の雰囲気：普通の市場のおばちゃんが、突然すごい関刀の腕前を見せる——まさに日常の中に潜む達人。

カット切り替え、新しい振り付け、被写体の縮小、武器の消失、顔の変化、服装の変化、人物の重複、被写体の遮蔽、過剰なVFX、字幕、ロゴ、ウォーターマークは避けてください。
---
```

### 上游提供的한국어版本（translations.ko）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2079113446105501983.json)

```text
---
15초, 9:16 비율의 사실적인 무술 영상을 한 번의 연속 샷으로 생성하세요.

Video 1은 동작, 타이밍, 카메라, 구도, 리듬, BGM의 मुख्य 레퍼런스입니다. 가능한 한 프레임 단위로 최대한 가깝게 따라가세요. 원래의 동작 순서, 무기 궤적, 신체 움직임, 타이밍, 카메라 구조를 유지하세요.

Image 1은 캐릭터 레퍼런스입니다. 영상 전체에서 원래의 퍼포머를 동일한 50세 동아시아 시장 아주머니로 교체하세요. 그녀의 얼굴, 의상, 체형, 전체적인 외형을 일관되게 유지하세요.

Image 2는 장면 레퍼런스입니다. 원래 환경을 로컬 시장 안의 열린 T자 교차로로 교체하세요. 피사체는 크게 중앙에 배치하고, 무기 동작 전체가 들어갈 수 있도록 충분한 여백을 확보하세요.

무기 연속성은 매우 중요합니다: 동일한 흑금색 관도(Guan Dao)가 첫 프레임부터 마지막 프레임까지 그녀의 손에 계속 있어야 합니다. 빠른 움직임, 블러, 가림이 있더라도 그것이 끊김 없이 계속 존재하는 것으로 처리되어야 합니다. 절대 사라지거나, 변형되거나, 작아지거나, 다른 무기로 바뀌게 하지 마세요.

그녀가 동작을 펼치는 동안, 다양한 상인과 손님들이 점차 배경에 모여듭니다. 그들은 뒤쪽이나 양옆에 머물며, 절대 피사체를 가리지 않습니다. 반응은 자연스럽고 가벼워도 됩니다 — 구경하기, 미소 짓기, 박수치기, 환호하기 등.

전체적인 느낌: 평범한 시장 아주머니가 갑자기 놀라운 관도 실력을 드러내는 장면 — 일상 속에 숨어 있던 진정한 고수.

카메라 컷, 새로운 안무, 피사체 축소, 무기 소실, 얼굴 변화, 의상 변화, 중복 인물, 피사체 가림, 과도한 VFX, 자막, 로고, 워터마크는 피하세요.

--- 인용 트윗 ---
🤯 인기 영상에서 오심이나 얼굴 깨짐을 피하려면, 먼저 Depth로 바꿔 동작을 보존하세요. AI가 완벽하게 복제합니다!

트윗 작성자 @impalementd 가 좋은 방법을 공유했습니다:
참고 영상을 Depth로 변환하면, 원본 영상의 화면 문제로 인해 막히는 것을 피할 수 있습니다!

더우인에서 인기였던 “트랙터 댄스”를 저는 기능성 스타일의 섹시한 소녀가 들판에서 추는 장면으로 바꿨더니, 마을 개들이 구경하러 몰려왔습니다🤣

🌟 제작 과정:
1. 좋아하는 영상 한 편을 준비합니다(예: 댄스)
2. 깊이 추정 모델 gradio를 사용해 Depth 영상으로 변환합니다
3. 새로운 캐릭터 + 장면 레퍼런스 이미지를 생성합니다
4. 댓글의 prompt + 소재를 참고해 Seedance로 새 영상을 생성합니다

이 방식은 더 깔끔한 동작 전이에 적합합니다!
동작은 참고하되, 캐릭터, 의상, 장면, 서사는 새로 창작해서 최종적으로 완전히 새로운 버전으로 완성됩니다.

Workflow + Prompt는 아래를 참고하세요 👇

--- THREAD CONTINUATION ---
[Thread 1] 1/ Workflow

1. 15초 미만의 레퍼런스 영상을 선택합니다
2. Depth Anything V2로 Depth 영상으로 변환합니다
3. 새로운 캐릭터 + 장면을 생성합니다
4. Depth 영상을 동작 레퍼런스로 사용합니다
5. 모든 요소를 Seedance에 입력하고 원래의 타이밍, 카메라, 동작, BGM을 최대한 가깝게 유지합니다

Depth는 동작 구조는 유지하면서 원본의 시각적 요소 대부분을 제거하므로, 캐릭터와 장면 교체가 훨씬 깔끔해집니다.

원본 안무와 음악의 권리는 여전히 고려해야 합니다.

출처 참고: 이 데모에 사용된 관도 레퍼런스 클립은 Douyin 크리에이터 hanfei11111의 영상입니다.

[Thread 2] 2/ 이 prompt와 레퍼런스 이미지를 Codex에 보내면, 이와 같은 로컬 Depth 영상 변환기를 직접 만들 수 있습니다.

Codex용 prompt:

기존 프로젝트 코드를 전혀 사용하지 않고, Windows와 macOS에서 로컬로 실행되는 완전한 Python Depth 영상 변환기를 구축하세요.

1. 간단한 웹 UI를 위해 Gradio를 사용하고 MP4 / MOV 업로드를 지원하세요.
2. Depth Anything V2를 사용해 각 프레임을 그레이스케일 Depth 영상으로 변환하세요.
3. Windows에서는 사용 가능할 때 NVIDIA CUDA를 자동 사용하고, Mac에서는 사용 가능할 때 Apple Silicon 가속을 사용하며, 그 외에는 CPU로 폴백하세요.
4. 모델 크기 선택, 출력 해상도, 흑백 반전, 깜빡임을 줄이기 위한 temporal smoothing, ffmpeg를 이용한 원본 오디오 보존 옵션, 호환 가능한 MP4로의 내보내기를 포함하세요.

또한 requirements.txt, README.md, 완전히 실행 가능한 Python 스크립트, 그리고 Windows와 macOS 모두를 위한 명확한 설치 및 실행 명령도 생성하세요.

[Thread 3] 3/ Seedance Prompt

15초, 9:16 비율의 사실적인 무술 영상을 한 번의 연속 샷으로 생성하세요.

Video 1은 동작, 타이밍, 카메라, 구도, 리듬, BGM의 मुख्य 레퍼런스입니다. 가능한 한 프레임 단위로 최대한 가깝게 따라가세요. 원래의 동작 순서, 무기 궤적, 신체 움직임, 타이밍, 카메라 구조를 유지하세요.

Image 1은 캐릭터 레퍼런스입니다. 영상 전체에서 원래의 퍼포머를 동일한 50세 동아시아 시장 아주머니로 교체하세요. 그녀의 얼굴, 의상, 체형, 전체적인 외형을 일관되게 유지하세요.

Image 2는 장면 레퍼런스입니다. 원래 환경을 로컬 시장 안의 열린 T자 교차로로 교체하세요. 피사체는 크게 중앙에 배치하고, 무기 동작 전체가 들어갈 수 있도록 충분한 여백을 확보하세요.

무기 연속성은 매우 중요합니다: 동일한 흑금색 관도(Guan Dao)가 첫 프레임부터 마지막 프레임까지 그녀의 손에 계속 있어야 합니다. 빠른 움직임, 블러, 가림이 있더라도 그것이 끊김 없이 계속 존재하는 것으로 처리되어야 합니다. 절대 사라지거나, 변형되거나, 작아지거나, 다른 무기로 바뀌게 하지 마세요.

그녀가 동작을 펼치는 동안, 다양한 상인과 손님들이 점차 배경에 모여듭니다. 그들은 뒤쪽이나 양옆에 머물며, 절대 피사체를 가리지 않습니다. 반응은 자연스럽고 가벼워도 됩니다 — 구경하기, 미소 짓기, 박수치기, 환호하기 등.

전체적인 느낌: 평범한 시장 아주머니가 갑자기 놀라운 관도 실력을 드러내는 장면 — 일상 속에 숨어 있던 진정한 고수.

카메라 컷, 새로운 안무, 피사체 축소, 무기 소실, 얼굴 변화, 의상 변화, 중복 인물, 피사체 가림, 과도한 VFX, 자막, 로고, 워터마크는 피하세요.
---
```

### 上游提供的pt版本（translations.pt）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2079113446105501983.json)

```text
Crie um vídeo de artes marciais fotorealista de 15 segundos, em 9:16, em um único plano contínuo.

O Vídeo 1 é a principal referência para o movimento, timing, câmera, enquadramento, ritmo e BGM. Siga-o o mais de perto possível, quadro a quadro. Mantenha a ordem original das ações, a trajetória da arma, o movimento corporal, o timing e a estrutura de câmera.

A Imagem 1 é a referência do personagem. Substitua o performer original pela mesma tia de mercado leste-asiática de 50 anos ao longo de todo o vídeo. Mantenha consistentes seu rosto, roupa, corpo e aparência geral.

A Imagem 2 é a referência de cena. Substitua o ambiente original pelo cruzamento em T aberto dentro de um mercado local. Mantenha o sujeito grande e centralizado, com espaço aberto suficiente para o movimento completo da arma.

A continuidade da arma é crítica: o mesmo Guan Dao preto e dourado deve permanecer em suas mãos do primeiro ao último frame. Mesmo em movimento rápido, desfoque ou oclusão, ele ainda deve ser tratado como continuamente presente. Nunca deixe que ele desapareça, se deforme, encolha ou se transforme em outra arma.

Enquanto ela se apresenta, diferentes vendedores e compradores vão se reunindo gradualmente ao fundo. Eles permanecem atrás ou nas laterais, nunca bloqueando o sujeito. As reações podem ser naturais e leves — observando, sorrindo, aplaudindo ou torcendo.

Sensação geral: uma tia de mercado comum revela de repente impressionantes habilidades com o Guan Dao — uma verdadeira mestra oculta entre pessoas comuns.

Evite cortes de câmera, nova coreografia, redução do sujeito, desaparecimento da arma, mudanças de rosto, mudanças de roupa, pessoas duplicadas, bloqueio do sujeito, VFX exagerados, legendas, logos ou marcas d’água.

--- TWEET CITADO ---
🤯 Para evitar revisão incorreta ou travamentos no rosto em vídeos populares, primeiro converta para Depth para preservar o movimento, e a IA recria perfeitamente!

O usuário @impalementd compartilhou um bom método:
converter o vídeo de referência para Depth pode evitar que o vídeo original trave por problemas de imagem!

A famosa “dança do trator” do Douyin foi trocada por uma garota estilosa e cheia de energia dançando na beira do campo, atraindo a atenção dos cachorros da vila🤣

🌟 Fluxo de produção:
1. Prepare um vídeo que você goste (por exemplo, uma dança)
2. Use um modelo de estimativa de profundidade para converter o vídeo em Depth com Gradio
3. Gere novas imagens de referência de personagem + cena
4. Use o prompt da seção de comentários + os materiais para gerar um novo vídeo com o Seedance

Esse método é ideal para fazer uma transferência de movimento mais limpa!
O movimento pode ser usado como referência, enquanto personagem, roupa, cena e narrativa são recriados, resultando no final em uma versão totalmente nova.

Workflow + Prompt abaixo 👇

--- CONTINUAÇÃO DO THREAD ---
[Thread 1] 1/ Workflow

1. Escolha um vídeo de referência com menos de 15s
2. Converta-o em um vídeo Depth com o Depth Anything V2
3. Gere um novo personagem + cena
4. Use o vídeo Depth como referência de movimento
5. Envie tudo para o Seedance e mantenha o timing original, a câmera, o movimento e a BGM o mais fielmente possível

O Depth preserva a estrutura do movimento enquanto remove a maior parte do conteúdo visual original, tornando as trocas de personagem e cena muito mais limpas.

Ainda é preciso considerar os direitos da coreografia original e da música.

Observação de origem: o clipe de referência do Guan Dao usado neste demo é do criador do Douyin hanfei11111.

[Thread 2] 2/ Envie este prompt + a imagem de referência para o Codex, e você poderá criar seu próprio conversor local de vídeo Depth como este.

Prompt para o Codex:

Build a complete Python Depth video converter that runs locally on Windows and macOS, without relying on any existing project code.

1. Use Gradio for a simple web UI and support MP4 / MOV uploads.
2. Use Depth Anything V2 to convert each frame into a grayscale Depth video.
3. Automatically use NVIDIA CUDA on Windows when available, Apple Silicon acceleration on Mac when available, otherwise fall back to CPU.
4. Include model size selection, output resolution, black/white inversion, temporal smoothing to reduce flicker, optional original audio preservation with ffmpeg, and export to a compatible MP4.

Also generate requirements.txt, README.md, a complete runnable Python script, and clear installation and launch commands for both Windows and macOS.

[Thread 3] 3/ Seedance Prompt

Crie um vídeo de artes marciais fotorealista de 15 segundos, em 9:16, em um único plano contínuo.

O Vídeo 1 é a principal referência para o movimento, timing, câmera, enquadramento, ritmo e BGM. Siga-o o mais de perto possível, quadro a quadro. Mantenha a ordem original das ações, a trajetória da arma, o movimento corporal, o timing e a estrutura de câmera.

A Imagem 1 é a referência do personagem. Substitua o performer original pela mesma tia de mercado leste-asiática de 50 anos ao longo de todo o vídeo. Mantenha consistentes seu rosto, roupa, corpo e aparência geral.

A Imagem 2 é a referência de cena. Substitua o ambiente original pelo cruzamento em T aberto dentro de um mercado local. Mantenha o sujeito grande e centralizado, com espaço aberto suficiente para o movimento completo da arma.

A continuidade da arma é crítica: o mesmo Guan Dao preto e dourado deve permanecer em suas mãos do primeiro ao último frame. Mesmo em movimento rápido, desfoque ou oclusão, ele ainda deve ser tratado como continuamente presente. Nunca deixe que ele desapareça, se deforme, encolha ou se transforme em outra arma.

Enquanto ela se apresenta, diferentes vendedores e compradores vão se reunindo gradualmente ao fundo. Eles permanecem atrás ou nas laterais, nunca bloqueando o sujeito. As reações podem ser naturais e leves — observando, sorrindo, aplaudindo ou torcendo.

Sensação geral: uma tia de mercado comum revela de repente impressionantes habilidades com o Guan Dao — uma verdadeira mestra oculta entre pessoas comuns.

Evite cortes de câmera, nova coreografia, redução do sujeito, desaparecimento da arma, mudanças de rosto, mudanças de roupa, pessoas duplicadas, bloqueio do sujeito, VFX exagerados, legendas, logos ou marcas d’água.
```

### 上游提供的中文版本（translations.zh）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2079113446105501983.json)

```text
你是一位专注于 AI 和创意技术内容的专业翻译。

请将以下文本翻译成简体中文。

规则：
1. 准确保留所有技术术语（例如，“prompt”、“cinematic”、“camera pan” 可以保留英文，或使用目标语言中通行的译法）。
2. 译文要自然流畅，不要逐字硬译。
3. 保留所有格式（换行、项目符号等）。
4. 如果文本中包含实际的 Seedance/AI prompt（生成指令），请保持英文不翻译，只翻译其周围的上下文/说明。

待翻译文本：
---
创建一个 15 秒、9:16、写实风格的武术视频，采用单镜头连续拍摄。

视频 1 是动作、节奏、镜头、构图、韵律和 BGM 的主要参考。请尽可能逐帧对齐。保持原始动作顺序、武器轨迹、身体动作、时间节奏和镜头结构。

图片 1 是角色参考。将原始表演者替换为同一位 50 岁的东亚市场阿姨，并贯穿整个视频。保持她的脸、服装、身形和整体外观一致。

图片 2 是场景参考。将原始环境替换为本地市场内部的开放式丁字路口。保持主体大且居中，并留出足够的开放空间以完成完整的武器动作。

武器连续性至关重要：同一把黑金配色的关刀必须从第一帧到最后一帧始终在她手中。即使在快速运动、模糊或遮挡中，也要始终视为连续存在。绝不能让它消失、变形、缩小，或变成其他武器。

在她表演时，不同的摊贩和顾客会逐渐聚集到背景中。他们停留在主体后方或两侧，绝不遮挡主体。反应可以自然轻松一些——观看、微笑、鼓掌或欢呼都可以。

整体感觉：一位普通的市场阿姨突然展现出惊人的关刀功夫——真正的隐藏高手，藏在日常人群之中。

避免镜头切换、新编排、主体缩小、武器消失、脸部变化、服装变化、人物重复、遮挡主体、夸张 VFX、字幕、logo 或水印。

--- 引用推文 ---
🤯热门视频避免误审或卡脸，先转成 Depth 保留动作，AI完美复刻！

推友 @impalementd 分享了一个好方法：
把参考视频转成 Depth，可以避免原视频因画面问题被卡！

抖音热门的“拖拉机舞”，被我换成机能辣妹在田边跳，引来村狗围观🤣

🌟制作流程：
1. 准备一段你喜欢的视频（比如舞蹈）
2. 使用深度估计模型 gradio 转换 Depth 视频
3. 生成新的角色＋场景参考图
4. 参考评论区提示词 + 素材 给 Seedance 生成新视频

这套方式适合做更干净的动作迁移！
动作可以参考，角色、服装、场景和叙事则重新创作，最后做出来就是一个全新的版本。

Workflow + Prompt below 👇

--- 线程续篇 ---
[Thread 1] 1/ Workflow

1. 选择一段 15 秒以内的参考视频
2. 使用 Depth Anything V2 将其转换为 Depth 视频
3. 生成新的角色 + 场景
4. 使用 Depth 视频作为动作参考
5. 将所有内容输入 Seedance，并尽可能紧密地保留原始时间节奏、镜头、动作和 BGM

Depth 在保留动作结构的同时，去除了大部分原始视觉内容，使角色和场景替换更加干净。

原始编舞和音乐版权仍需考虑。

来源说明：本演示中使用的关刀参考片段来自抖音创作者 hanfei11111。

[Thread 2] 2/ 将这段 prompt + 参考图片发送给 Codex，你就可以像这样搭建自己的本地 Depth 视频转换器。

给 Codex 的 prompt：

Build a complete Python Depth video converter that runs locally on Windows and macOS, without relying on any existing project code.

1. Use Gradio for a simple web UI and support MP4 / MOV uploads.
2. Use Depth Anything V2 to convert each frame into a grayscale Depth video.
3. Automatically use NVIDIA CUDA on Windows when available, Apple Silicon acceleration on Mac when available, otherwise fall back to CPU.
4. Include model size selection, output resolution, black/white inversion, temporal smoothing to reduce flicker, optional original audio preservation with ffmpeg, and export to a compatible MP4.

Also generate requirements.txt, README.md, a complete runnable Python script, and clear installation and launch commands for both Windows and macOS.

[Thread 3] 3/ Seedance Prompt

Create a 15-second, 9:16, photorealistic martial arts video in one continuous shot.

Video 1 is the main reference for the motion, timing, camera, framing, rhythm, and BGM. Follow it as closely as possible frame by frame. Keep the original action order, weapon trajectory, body movement, timing, and camera structure.

Image 1 is the character reference. Replace the original performer with the same 50-year-old East Asian market auntie throughout the video. Keep her face, outfit, body, and overall look consistent.

Image 2 is the scene reference. Replace the original environment with the open T-junction inside a local market. Keep the subject large and centered, with enough open space for the full weapon movement.

Weapon continuity is critical: the same black-and-gold Guan Dao must stay in her hands from the first frame to the last. Even in fast motion, blur, or occlusion, it should still be treated as continuously present. Never let it disappear, deform, shrink, or turn into another weapon.

As she performs, different vendors and shoppers gradually gather in the background. They stay behind or to the sides, never blocking the subject. Their reactions can be natural and light — watching, smiling, clapping, or cheering.

Overall feeling: an ordinary market auntie suddenly reveals impressive Guan Dao skills — a true hidden master among everyday people.

Avoid camera cuts, new choreography, subject shrinking, weapon disappearance, face changes, outfit changes, duplicated people, blocking the subject, exaggerated VFX, subtitles, logos, or watermarks.
---

仅返回译文，不要包含其他内容。
```

## 出处与许可

- 原作者：[Larus Canus](https://x.com/MrLarus) · 原帖：<https://x.com/MrLarus/status/2079113446105501983>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[renoise-ai/awesome-seedance-prompts](https://github.com/renoise-ai/awesome-seedance-prompts)，[原文位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2079113446105501983.json)
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
