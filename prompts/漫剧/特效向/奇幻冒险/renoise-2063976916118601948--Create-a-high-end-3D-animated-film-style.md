---
id: "renoise-2063976916118601948"
title: "Create a high-end 3D animated film-style 16:9 opening frame of a white…"
title_en: null
model: "Seedance 2.0"
language: "en"
medium: "漫剧"
direction: "特效向"
genre: "奇幻冒险"
art_style: "3D卡通"
tags: ["Seedance 2.0", "Renoise", "Animals", "Pets", "3D Animation", "Fantasy"]
source_repo: "renoise-ai/awesome-seedance-prompts"
source_url: "https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2063976916118601948.json"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "insMind"
original_author_url: "https://x.com/insmind_com"
original_post_url: "https://x.com/insmind_com/status/2063976916118601948"
published: "2026-06-08"
third_party_author: true
flags: []
also_in: []
source_page: null
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
output_status: "output_unverified"
verification: "attribution_checked"
---

# Create a high-end 3D animated film-style 16:9 opening frame of a white…

## 提示词（English）

```text
Create a high-end 3D animated film-style 16:9 opening frame of a white blue-eyed palace cat entering a fantasy palace living room from the lower foreground, back facing the camera. Use a low cat-height wide-angle perspective.

The room must show a complete sofa island, cushions, ottoman, wooden floor, rug, carved tea table, teacups, golden teapot, curtains, warm lantern light, and cool moonlight.

Place five couture princesses around the sofa in staggered positions, not sitting in a row. Each princess should create a different route node for the cat: a teal sleeve near the entrance, a blue-violet cushion step, a central high narrow passage, a wine-red skirt edge, and a pale-gold princess near the tea table.

The cat should start far from the tea table. Make the space feel like a natural S-shaped path.
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### 上游提供的Español版本（translations.es）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2063976916118601948.json)

```text
Crea un fotograma de apertura en formato 16:9 de estilo cinematográfico 3D animado de un gato de palacio blanco de ojos azules entrando en una sala de estar de un palacio de fantasía desde el primer plano inferior, con la espalda hacia la cámara. Usa una perspectiva de ángulo amplio a la altura del gato.

La sala debe mostrar un sofá isla completo, cojines, otomana, suelo de madera, alfombra, mesa de té tallada, tazas de té, tetera dorada, cortinas, luz cálida de linterna y luz de luna fresca.

Coloca cinco princesas de alta costura alrededor del sofá en posiciones escalonadas, no sentadas en fila. Cada princesa debe crear un nodo de ruta diferente para el gato: una manga color teal cerca de la entrada, un escalón de cojín azul-violeta, un pasaje alto y estrecho central, el borde de una falda rojo vino y una princesa de oro pálido cerca de la mesa de té.

El gato debe comenzar lejos de la mesa de té. Haz que el espacio se sienta como un camino natural en forma de S.

--- CONTINUACIÓN DEL HILO ---
[Hilo 1] ✨Paso 1: Generar el fotograma inicial con GPT image 2.

✨Objetivo: un fotograma de apertura 16:9 legible que ya contenga toda la lógica del video.

✨Prompt:
Create a high-end 3D animated film-style 16:9 opening frame of a white blue-eyed palace cat entering a fantasy palace living room from the lower foreground, back facing the camera. Use a low cat-height wide-angle perspective.

The room must show a complete sofa island, cushions, ottoman, wooden floor, rug, carved tea table, teacups, golden teapot, curtains, warm lantern light, and cool moonlight.

Place five couture princesses around the sofa in staggered positions, not sitting in a row. Each princess should create a different route node for the cat: a teal sleeve near the entrance, a blue-violet cushion step, a central high narrow passage, a wine-red skirt edge, and a pale-gold princess near the tea table.

The cat should start far from the tea table. Make the space feel like a natural S-shaped path.

[Hilo 2] Paso 2: Dibuja la ruta de movimiento

En lugar de depender completamente de las descripciones del prompt, dibujé la ruta exacta directamente sobre la imagen generada.

Esto le dio al modelo un plano de movimiento claro:
✅ Punto de inicio
✅ Orden de interacción con las princesas
✅ Dirección de la cámara
✅ Destino final

La línea naranja nunca aparece en el video final, solo actúa como una guía invisible.

[Hilo 3] Paso 3: Sube la imagen limpia + mapa de ruta a insMind.

Introduce ambas imágenes en Seedance 2.0. El modelo transforma la ruta dibujada en una aventura continua en FPV a través del palacio.

Prompt：
Use image_1 as the exact clean starting frame and primary visual identity reference. Use image_2 only as an invisible director map. The orange line, starting dot, arrowhead, and outline define the cat’s route, node order, camera direction, and endpoint, but no graphic marks should appear in the video.

Preserve the same blue-eyed palace cat with turquoise-and-gold jewelry, the same five couture princesses, the same palace lounge, sofa island, ottoman, cushions, carved tea table, teacups, golden teapot, lanterns, moonlit window, warm interior light, cool moonlight, and premium rounded 3D animated film look.

Start immediately with the cat moving from the lower foreground. The camera follows close behind at cat height, like a smooth invisible FPV camera. The cat walks across the floor and rug edge, jumps onto the left-front ottoman under the teal princess’s lowered sleeve, then curves past the blue-violet princess’s knee and embroidered cushions.

Continue the route around the central high princess, using sofa cushions, armrest edges, her arm, jeweled waist chain, and fabric as a believable narrow cat-sized passage. Then descend toward the wine-red princess. A sleeve or dress edge may briefly wipe the foreground, but the cat must reappear in the same room on the same route.

The cat then follows the small loop near the tea table, passing the pale-gold turquoise princess as she lowers her fingers and lets it move toward the teacups. End with the cat near the carved tea table and golden teapot, jewelry softly glowing, princesses and lanterns behind it, and the moonlit city outside only as background atmosphere.

No visible route line, no arrow, no UI, no subtitles, no static opening, no random cuts, no teleporting, no fabric tunnel, no princess grabbing the cat, no losing the cat as the protagonist.

[Hilo 4] Aquí está el resultado final👇
Una sola imagen generada se convierte en un cortometraje de fantasía completo:

🐱 Aventura desde la perspectiva del gato
👑 Cinco puntos de interacción con princesas
🛋️ Entorno de palacio transitable
☕ Final en la mesa de té iluminada por la luna
🎬 Un movimiento continuo de cámara cinematográfica

Todo creado usando GPT Image 2 + Seedance 2.0 en insMind.

[Hilo 5] Un agradecimiento especial a @AIWarper por la inspiración original y el concepto creativo detrás de este experimento.

Tu turno: elige un mundo y dibuja un camino. Luego dale vida en insMind.
https://t.co/BQx6rqWtUR
#insMind #insMindAI
```

### 上游提供的fr版本（translations.fr）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2063976916118601948.json)

```text
---
Créez une image d'ouverture au format 16:9 de style film d'animation 3D haut de gamme, montrant un chat de palais blanc aux yeux bleus entrant dans un salon de palais fantastique depuis le bas de l'avant-plan, dos à la caméra. Utilisez une perspective grand angle à hauteur de chat.

La pièce doit montrer un îlot de canapé complet, des coussins, un ottoman, un sol en bois, un tapis, une table à thé sculptée, des tasses à thé, une théière dorée, des rideaux, une lumière de lanterne chaude et un clair de lune frais.

Placez cinq princesses haute couture autour du canapé en positions décalées, sans être assises en ligne. Chaque princesse doit créer un nœud de parcours différent pour le chat : une manche turquoise près de l'entrée, une marche de coussin bleu-violet, un passage central haut et étroit, un bord de jupe rouge vin, et une princesse or pâle près de la table à thé.

Le chat doit commencer loin de la table à thé. Faites en sorte que l'espace ressemble à un chemin naturel en forme de S.

--- CONTINUATION DU FIL ---
[Fil 1] ✨Étape 1 : Générer l'image de départ avec GPT image 2.

✨Objectif : un cadre d'ouverture 16:9 lisible qui contient déjà toute la logique de la vidéo.

✨Prompt:
Create a high-end 3D animated film-style 16:9 opening frame of a white blue-eyed palace cat entering a fantasy palace living room from the lower foreground, back facing the camera. Use a low cat-height wide-angle perspective.

The room must show a complete sofa island, cushions, ottoman, wooden floor, rug, carved tea table, teacups, golden teapot, curtains, warm lantern light, and cool moonlight.

Place five couture princesses around the sofa in staggered positions, not sitting in a row. Each princess should create a different route node for the cat: a teal sleeve near the entrance, a blue-violet cushion step, a central high narrow passage, a wine-red skirt edge, and a pale-gold princess near the tea table.

The cat should start far from the tea table. Make the space feel like a natural S-shaped path.

[Fil 2] Étape 2 : Dessiner le chemin de mouvement

Au lieu de se fier entièrement aux descriptions de prompt, j'ai esquissé le parcours exact directement sur l'image générée.

Cela a donné au modèle un plan de mouvement clair :
✅ Point de départ
✅ Ordre d'interaction avec les princesses
✅ Direction de la caméra
✅ Destination finale

La ligne orange n'apparaît jamais dans la vidéo finale — elle sert uniquement de guide invisible.

[Fil 3] Étape 3 : Téléchargez l'image propre + la carte du parcours sur insMind.

Intégrez les deux images dans Seedance 2.0. Le modèle transforme le chemin dessiné en une aventure FPV continue à travers le palais.

Prompt：
Use image_1 as the exact clean starting frame and primary visual identity reference. Use image_2 only as an invisible director map. The orange line, starting dot, arrowhead, and outline define the cat’s route, node order, camera direction, and endpoint, but no graphic marks should appear in the video.

Conservez le même chat de palais aux yeux bleus avec des bijoux turquoise et or, les mêmes cinq princesses haute couture, le même salon de palais, îlot de canapé, ottoman, coussins, table à thé sculptée, tasses à thé, théière dorée, lanternes, fenêtre éclairée par la lune, lumière intérieure chaude, clair de lune frais, et un look de film d'animation 3D haut de gamme arrondi.

Commencez immédiatement avec le chat se déplaçant depuis le bas de l'avant-plan. La caméra suit de près à hauteur de chat, comme une caméra FPV invisible et fluide. Le chat traverse le sol et le bord du tapis, saute sur l'ottoman avant-gauche sous la manche abaissée de la princesse turquoise, puis contourne le genou de la princesse bleu-violet et les coussins brodés.

Continuez le parcours autour de la princesse centrale haute, en utilisant les coussins du canapé, les bords des accoudoirs, son bras, la chaîne de taille ornée de bijoux, et le tissu comme un passage étroit crédible à la taille du chat. Puis descendez vers la princesse rouge vin. Une manche ou un bord de robe peut brièvement effacer l'avant-plan, mais le chat doit réapparaître dans la même pièce sur le même parcours.

Le chat suit ensuite la petite boucle près de la table à thé, passant devant la princesse turquoise or pâle alors qu'elle abaisse ses doigts et le laisse se diriger vers les tasses à thé. Terminez avec le chat près de la table à thé sculptée et de la théière dorée, les bijoux brillant doucement, les princesses et les lanternes derrière lui, et la ville éclairée par la lune en arrière-plan seulement comme atmosphère.

Pas de ligne de parcours visible, pas de flèche, pas d'interface utilisateur, pas de sous-titres, pas d'ouverture statique, pas de coupures aléatoires, pas de téléportation, pas de tunnel de tissu, pas de princesse attrapant le chat, pas de perte du chat en tant que protagoniste.

[Fil 4] Voici le résultat final👇
Une seule image générée devient un court-métrage fantastique complet :

🐱 Aventure en POV de chat
👑 Cinq points d'interaction avec les princesses
🛋️ Environnement de palais traversable
☕ Finale à la table à thé éclairée par la lune
🎬 Un mouvement de caméra cinématographique continu

Tout créé en utilisant GPT Image 2 + Seedance 2.0 sur insMind.

[Fil 5] Remerciements spéciaux à @AIWarper pour l'inspiration originale et le concept créatif derrière cette expérience.

À vous de jouer — choisissez un monde et dessinez un chemin. Puis donnez-lui vie sur insMind.
https://t.co/BQx6rqWtUR
#insMind #insMindAI
---
```

### 上游提供的日本語版本（translations.ja）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2063976916118601948.json)

```text
---
高級な3Dアニメーション映画スタイルの16:9オープニングフレームを作成してください。白い青い目の宮殿猫が、カメラに背を向けて、下の前景からファンタジー宮殿のリビングルームに入ります。低い猫の高さの広角視点を使用してください。

部屋には、完全なソファアイランド、クッション、オットマン、木製の床、ラグ、彫刻されたティーテーブル、ティーカップ、金のティーポット、カーテン、暖かいランタンの光、涼しい月光を表示する必要があります。

ソファの周りに5人のクチュールプリンセスを段階的に配置し、列に座らないようにしてください。各プリンセスは猫のための異なるルートノードを作成する必要があります：入口近くのティールの袖、青紫のクッションステップ、中央の高い狭い通路、ワインレッドのスカートの縁、ティーテーブル近くの淡い金色のプリンセス。

猫はティーテーブルから遠くにスタートする必要があります。スペースを自然なS字型の道のように感じさせてください。

--- THREAD CONTINUATION ---
[Thread 1] ✨ステップ1: GPTイメージ2で開始フレームを生成します。

✨目標: ビデオのロジック全体をすでに含む読みやすい16:9オープニングフレーム。

✨プロンプト:
高級な3Dアニメーション映画スタイルの16:9オープニングフレームを作成してください。白い青い目の宮殿猫が、カメラに背を向けて、下の前景からファンタジー宮殿のリビングルームに入ります。低い猫の高さの広角視点を使用してください。

部屋には、完全なソファアイランド、クッション、オットマン、木製の床、ラグ、彫刻されたティーテーブル、ティーカップ、金のティーポット、カーテン、暖かいランタンの光、涼しい月光を表示する必要があります。

ソファの周りに5人のクチュールプリンセスを段階的に配置し、列に座らないようにしてください。各プリンセスは猫のための異なるルートノードを作成する必要があります：入口近くのティールの袖、青紫のクッションステップ、中央の高い狭い通路、ワインレッドのスカートの縁、ティーテーブル近くの淡い金色のプリンセス。

猫はティーテーブルから遠くにスタートする必要があります。スペースを自然なS字型の道のように感じさせてください。

[Thread 2] ステップ2: 移動経路を描く

プロンプトの説明に完全に依存する代わりに、生成された画像に直接正確なルートをスケッチしました。

これにより、モデルに明確な移動の青写真が与えられました：
✅ 開始点
✅ プリンセスのインタラクション順序
✅ カメラの方向
✅ 最終目的地

オレンジの線は最終ビデオには表示されず、見えないガイドとしてのみ機能します。

[Thread 3] ステップ3: クリーンな画像とルートマップをinsMindにアップロードします。

両方の画像をSeedance 2.0に入力します。モデルは描かれたパスを連続したFPVアドベンチャーに変換します。

プロンプト：
image_1を正確なクリーンな開始フレームおよび主要なビジュアルアイデンティティの参照として使用してください。image_2は見えないディレクターマップとしてのみ使用してください。オレンジの線、開始点、矢印、アウトラインは猫のルート、ノード順序、カメラの方向、エンドポイントを定義しますが、ビデオにはグラフィックマークは表示されません。

同じ青い目の宮殿猫とターコイズと金のジュエリー、同じ5人のクチュールプリンセス、同じ宮殿ラウンジ、ソファアイランド、オットマン、クッション、彫刻されたティーテーブル、ティーカップ、金のティーポット、ランタン、月明かりの窓、暖かい室内光、涼しい月光、プレミアムな丸みを帯びた3Dアニメーション映画の外観を保持してください。

すぐに猫が下の前景から動き始めます。カメラは猫の高さで後ろをスムーズに追いかけるようにします。猫は床とラグの縁を歩き、ティールのプリンセスの下げた袖の下の左前のオットマンに飛び乗り、青紫のプリンセスの膝と刺繍されたクッションを通り過ぎます。

中央の高いプリンセスの周りを回り、ソファのクッション、アームレストの縁、彼女の腕、宝石のウエストチェーン、布を使って信じられる狭い猫サイズの通路を作ります。それからワインレッドのプリンセスに向かって降ります。袖やドレスの縁が前景を一瞬拭うかもしれませんが、猫は同じ部屋の同じルートに再び現れなければなりません。

その後、猫はティーテーブル近くの小さなループをたどり、淡い金色のターコイズのプリンセスが指を下げてティーカップに向かって移動させます。猫は彫刻されたティーテーブルと金のティーポットの近くで終わり、ジュエリーが柔らかく輝き、プリンセスとランタンが後ろにあり、月明かりの街が背景の雰囲気としてのみ存在します。

見えるルートラインなし、矢印なし、UIなし、字幕なし、静的なオープニングなし、ランダムなカットなし、テレポートなし、布のトンネルなし、プリンセスが猫をつかむことなし、猫を主人公として失うことなし。

[Thread 4] こちらが最終結果です👇
単一の生成された画像が完全なファンタジー短編映画になります：

🐱 猫の視点の冒険
👑 5つのプリンセスのインタラクションチェックポイント
🛋️ 通行可能な宮殿環境
☕ 月明かりのティーテーブルのフィナーレ
🎬 1つの連続したシネマティックカメラの動き

すべてGPT Image 2 + Seedance 2.0を使用してinsMindで作成されました。

[Thread 5] この実験の元のインスピレーションとクリエイティブコンセプトを提供してくれた@AIWarperに特別な感謝を。

あなたの番です—世界を選び、道を描いてください。それからinsMindでそれを生き生きとさせましょう。
https://t.co/BQx6rqWtUR
#insMind #insMindAI
---
```

### 上游提供的한국어版本（translations.ko）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2063976916118601948.json)

```text
---
고급 3D 애니메이션 영화 스타일의 16:9 오프닝 프레임을 만들어 보세요. 하얀 파란 눈의 궁전 고양이가 하단 전경에서 카메라를 등지고 환상적인 궁전 거실로 들어오는 장면입니다. 낮은 고양이 높이의 광각 시점을 사용하세요.

방은 완전한 소파 섬, 쿠션, 오토만, 나무 바닥, 러그, 조각된 차 테이블, 찻잔, 황금 찻주전자, 커튼, 따뜻한 랜턴 불빛, 차가운 달빛을 보여줘야 합니다.

소파 주위에 다섯 명의 꾸뛰르 공주를 계단식으로 배치하세요. 일렬로 앉지 않도록 하세요. 각 공주는 고양이를 위한 다른 경로 노드를 만들어야 합니다: 입구 근처의 청록색 소매, 파란-보라색 쿠션 스텝, 중앙의 높은 좁은 통로, 와인 레드 스커트 가장자리, 차 테이블 근처의 창백한 금색 공주.

고양이는 차 테이블에서 멀리 시작해야 합니다. 공간이 자연스러운 S자형 경로처럼 느껴지게 하세요.

--- THREAD CONTINUATION ---
[Thread 1] ✨Step 1: GPT 이미지 2로 시작 프레임 생성.

✨목표: 전체 비디오 논리를 이미 포함한 하나의 읽을 수 있는 16:9 오프닝 프레임.

✨Prompt:
Create a high-end 3D animated film-style 16:9 opening frame of a white blue-eyed palace cat entering a fantasy palace living room from the lower foreground, back facing the camera. Use a low cat-height wide-angle perspective.

The room must show a complete sofa island, cushions, ottoman, wooden floor, rug, carved tea table, teacups, golden teapot, curtains, warm lantern light, and cool moonlight.

Place five couture princesses around the sofa in staggered positions, not sitting in a row. Each princess should create a different route node for the cat: a teal sleeve near the entrance, a blue-violet cushion step, a central high narrow passage, a wine-red skirt edge, and a pale-gold princess near the tea table.

The cat should start far from the tea table. Make the space feel like a natural S-shaped path.

[Thread 2] Step 2: 이동 경로 그리기

프롬프트 설명에 전적으로 의존하는 대신, 생성된 이미지에 직접 정확한 경로를 스케치했습니다.

이것은 모델에 명확한 이동 청사진을 제공했습니다:
✅ 시작 지점
✅ 공주 상호작용 순서
✅ 카메라 방향
✅ 최종 목적지

오렌지 선은 최종 비디오에 나타나지 않습니다—단지 보이지 않는 가이드 역할을 합니다.

[Thread 3] Step 3: 깨끗한 이미지 + 경로 지도를 insMind에 업로드.

두 이미지를 Seedance 2.0에 입력하세요. 모델은 그려진 경로를 통해 궁전을 탐험하는 연속적인 FPV 모험으로 변환합니다.

Prompt：
Use image_1 as the exact clean starting frame and primary visual identity reference. Use image_2 only as an invisible director map. The orange line, starting dot, arrowhead, and outline define the cat’s route, node order, camera direction, and endpoint, but no graphic marks should appear in the video.

Preserve the same blue-eyed palace cat with turquoise-and-gold jewelry, the same five couture princesses, the same palace lounge, sofa island, ottoman, cushions, carved tea table, teacups, golden teapot, lanterns, moonlit window, warm interior light, cool moonlight, and premium rounded 3D animated film look.

Start immediately with the cat moving from the lower foreground. The camera follows close behind at cat height, like a smooth invisible FPV camera. The cat walks across the floor and rug edge, jumps onto the left-front ottoman under the teal princess’s lowered sleeve, then curves past the blue-violet princess’s knee and embroidered cushions.

Continue the route around the central high princess, using sofa cushions, armrest edges, her arm, jeweled waist chain, and fabric as a believable narrow cat-sized passage. Then descend toward the wine-red princess. A sleeve or dress edge may briefly wipe the foreground, but the cat must reappear in the same room on the same route.

The cat then follows the small loop near the tea table, passing the pale-gold turquoise princess as she lowers her fingers and lets it move toward the teacups. End with the cat near the carved tea table and golden teapot, jewelry softly glowing, princesses and lanterns behind it, and the moonlit city outside only as background atmosphere.

No visible route line, no arrow, no UI, no subtitles, no static opening, no random cuts, no teleporting, no fabric tunnel, no princess grabbing the cat, no losing the cat as the protagonist.

[Thread 4] Here's the final result👇
A single generated image becomes a complete fantasy short film:

🐱 고양이 시점 모험
👑 다섯 공주 상호작용 체크포인트
🛋️ 탐험 가능한 궁전 환경
☕ 달빛이 비치는 차 테이블 피날레
🎬 하나의 연속적인 시네마틱 카메라 움직임

모두 GPT Image 2 + Seedance 2.0을 사용하여 insMind에서 생성되었습니다.

[Thread 5] 특별히 @AIWarper에게 이 실험의 원래 영감과 창의적 개념에 감사드립니다.

당신의 차례입니다—세계를 선택하고 경로를 그리세요. 그런 다음 insMind에서 그것을 생생하게 만드세요.
https://t.co/BQx6rqWtUR
#insMind #insMindAI
---
```

### 上游提供的pt版本（translations.pt）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2063976916118601948.json)

```text
---
Crie um quadro de abertura em estilo de filme animado 3D de alta qualidade, em formato 16:9, de um gato de palácio branco de olhos azuis entrando em uma sala de estar de um palácio de fantasia a partir do primeiro plano inferior, de costas para a câmera. Use uma perspectiva de ângulo amplo na altura do gato.

A sala deve mostrar um sofá completo, almofadas, pufe, piso de madeira, tapete, mesa de chá esculpida, xícaras de chá, bule dourado, cortinas, luz quente de lanterna e luz fria da lua.

Coloque cinco princesas de alta costura ao redor do sofá em posições escalonadas, não sentadas em fila. Cada princesa deve criar um ponto de rota diferente para o gato: uma manga azul-petróleo perto da entrada, um degrau de almofada azul-violeta, uma passagem central alta e estreita, a borda de uma saia vinho e uma princesa dourada-pálida perto da mesa de chá.

O gato deve começar longe da mesa de chá. Faça o espaço parecer um caminho natural em forma de S.

--- CONTINUAÇÃO DA THREAD ---
[Thread 1] ✨Passo 1: Gere o quadro inicial com a imagem GPT 2.

✨Objetivo: um quadro de abertura 16:9 legível que já contenha toda a lógica do vídeo.

✨Prompt:
Create a high-end 3D animated film-style 16:9 opening frame of a white blue-eyed palace cat entering a fantasy palace living room from the lower foreground, back facing the camera. Use a low cat-height wide-angle perspective.

The room must show a complete sofa island, cushions, ottoman, wooden floor, rug, carved tea table, teacups, golden teapot, curtains, warm lantern light, and cool moonlight.

Place five couture princesses around the sofa in staggered positions, not sitting in a row. Each princess should create a different route node for the cat: a teal sleeve near the entrance, a blue-violet cushion step, a central high narrow passage, a wine-red skirt edge, and a pale-gold princess near the tea table.

The cat should start far from the tea table. Make the space feel like a natural S-shaped path.

[Thread 2] Passo 2: Desenhe o caminho de movimento

Em vez de depender inteiramente das descrições do prompt, esbocei a rota exata diretamente na imagem gerada.

Isso deu ao modelo um plano claro de movimento:
✅ Ponto de partida
✅ Ordem de interação com as princesas
✅ Direção da câmera
✅ Destino final

A linha laranja nunca aparece no vídeo final — ela atua apenas como um guia invisível.

[Thread 3] Passo 3: Carregue a imagem limpa + mapa de rota no insMind.

Alimente ambas as imagens no Seedance 2.0. O modelo transforma o caminho desenhado em uma aventura FPV contínua através do palácio.

Prompt：
Use image_1 as the exact clean starting frame and primary visual identity reference. Use image_2 only as an invisible director map. The orange line, starting dot, arrowhead, and outline define the cat’s route, node order, camera direction, and endpoint, but no graphic marks should appear in the video.

Preserve the same blue-eyed palace cat with turquoise-and-gold jewelry, the same five couture princesses, the same palace lounge, sofa island, ottoman, cushions, carved tea table, teacups, golden teapot, lanterns, moonlit window, warm interior light, cool moonlight, and premium rounded 3D animated film look.

Start immediately with the cat moving from the lower foreground. The camera follows close behind at cat height, like a smooth invisible FPV camera. The cat walks across the floor and rug edge, jumps onto the left-front ottoman under the teal princess’s lowered sleeve, then curves past the blue-violet princess’s knee and embroidered cushions.

Continue the route around the central high princess, using sofa cushions, armrest edges, her arm, jeweled waist chain, and fabric as a believable narrow cat-sized passage. Then descend toward the wine-red princess. A sleeve or dress edge may briefly wipe the foreground, but the cat must reappear in the same room on the same route.

The cat then follows the small loop near the tea table, passing the pale-gold turquoise princess as she lowers her fingers and lets it move toward the teacups. End with the cat near the carved tea table and golden teapot, jewelry softly glowing, princesses and lanterns behind it, and the moonlit city outside only as background atmosphere.

No visible route line, no arrow, no UI, no subtitles, no static opening, no random cuts, no teleporting, no fabric tunnel, no princess grabbing the cat, no losing the cat as the protagonist.

[Thread 4] Aqui está o resultado final👇
Uma única imagem gerada se torna um curta-metragem de fantasia completo:

🐱 Aventura em POV de gato
👑 Cinco pontos de interação com princesas
🛋️ Ambiente de palácio transitável
☕ Final na mesa de chá iluminada pela lua
🎬 Um movimento contínuo de câmera cinematográfica

Tudo criado usando GPT Image 2 + Seedance 2.0 no insMind.

[Thread 5] Agradecimentos especiais a @AIWarper pela inspiração original e conceito criativo por trás deste experimento.

Sua vez — escolha um mundo e desenhe um caminho. Depois, dê vida a ele no insMind.
https://t.co/BQx6rqWtUR
#insMind #insMindAI
---
```

### 上游提供的中文版本（translations.zh）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2063976916118601948.json)

```text
---
创建一个高端3D动画电影风格的16:9开场画面，展示一只白色蓝眼宫廷猫从前景下方进入一个幻想宫殿的客厅，背对着镜头。使用低猫高度的广角视角。

房间必须展示完整的沙发岛、靠垫、脚凳、木地板、地毯、雕花茶几、茶杯、金色茶壶、窗帘、温暖的灯笼光和凉爽的月光。

在沙发周围放置五位高级定制公主，位置错落，不要坐成一排。每位公主应为猫创造一个不同的路线节点：入口附近的青色袖子、蓝紫色靠垫台阶、中央狭窄高通道、酒红色裙边，以及茶几旁的浅金色公主。

猫应从远离茶几的地方开始。让空间感觉像一个自然的S形路径。

--- 线程继续 ---
[线程1] ✨步骤1：使用GPT图像2生成起始画面。

✨目标：一个可读的16:9开场画面，已经包含整个视频逻辑。

✨Prompt:
Create a high-end 3D animated film-style 16:9 opening frame of a white blue-eyed palace cat entering a fantasy palace living room from the lower foreground, back facing the camera. Use a low cat-height wide-angle perspective.

The room must show a complete sofa island, cushions, ottoman, wooden floor, rug, carved tea table, teacups, golden teapot, curtains, warm lantern light, and cool moonlight.

Place five couture princesses around the sofa in staggered positions, not sitting in a row. Each princess should create a different route node for the cat: a teal sleeve near the entrance, a blue-violet cushion step, a central high narrow passage, a wine-red skirt edge, and a pale-gold princess near the tea table.

The cat should start far from the tea table. Make the space feel like a natural S-shaped path.

[线程2] 步骤2：绘制移动路径

不完全依赖于prompt描述，我直接在生成的图像上绘制了精确的路线。

这为模型提供了一个清晰的移动蓝图：
✅ 起始点
✅ 公主互动顺序
✅ 摄像机方向
✅ 最终目的地

橙色线在最终视频中不会出现——它仅作为一个隐形的指南。

[线程3] 步骤3：上传干净图像+路线图到insMind。

将两张图像输入Seedance 2.0。模型将绘制的路径转化为穿越宫殿的连续FPV冒险。

Prompt：
Use image_1 as the exact clean starting frame and primary visual identity reference. Use image_2 only as an invisible director map. The orange line, starting dot, arrowhead, and outline define the cat’s route, node order, camera direction, and endpoint, but no graphic marks should appear in the video.

Preserve the same blue-eyed palace cat with turquoise-and-gold jewelry, the same five couture princesses, the same palace lounge, sofa island, ottoman, cushions, carved tea table, teacups, golden teapot, lanterns, moonlit window, warm interior light, cool moonlight, and premium rounded 3D animated film look.

Start immediately with the cat moving from the lower foreground. The camera follows close behind at cat height, like a smooth invisible FPV camera. The cat walks across the floor and rug edge, jumps onto the left-front ottoman under the teal princess’s lowered sleeve, then curves past the blue-violet princess’s knee and embroidered cushions.

Continue the route around the central high princess, using sofa cushions, armrest edges, her arm, jeweled waist chain, and fabric as a believable narrow cat-sized passage. Then descend toward the wine-red princess. A sleeve or dress edge may briefly wipe the foreground, but the cat must reappear in the same room on the same route.

The cat then follows the small loop near the tea table, passing the pale-gold turquoise princess as she lowers her fingers and lets it move toward the teacups. End with the cat near the carved tea table and golden teapot, jewelry softly glowing, princesses and lanterns behind it, and the moonlit city outside only as background atmosphere.

No visible route line, no arrow, no UI, no subtitles, no static opening, no random cuts, no teleporting, no fabric tunnel, no princess grabbing the cat, no losing the cat as the protagonist.

[线程4] 这是最终结果👇
一张生成的图像变成了一个完整的幻想短片：

🐱 猫视角冒险
👑 五个公主互动检查点
🛋️ 可穿越的宫殿环境
☕ 月光下的茶几结尾
🎬 一次连续的电影镜头移动

所有这些都是使用GPT Image 2 + Seedance 2.0在insMind上创建的。

[线程5] 特别感谢@AIWarper为这个实验提供的原创灵感和创意概念。

轮到你了——选择一个世界并绘制一条路径。然后在insMind上让它栩栩如生。
https://t.co/BQx6rqWtUR
#insMind #insMindAI
---
```

## 出处与许可

- 原作者：[insMind](https://x.com/insmind_com) · 原帖：<https://x.com/insmind_com/status/2063976916118601948>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[renoise-ai/awesome-seedance-prompts](https://github.com/renoise-ai/awesome-seedance-prompts)，[原文位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2063976916118601948.json)
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
