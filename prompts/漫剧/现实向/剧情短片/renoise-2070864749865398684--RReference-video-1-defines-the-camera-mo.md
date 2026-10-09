---
id: "renoise-2070864749865398684"
title: "RReference video 1 defines the camera movement, timing, and the walker's path…"
title_en: null
model: "Seedance 2.0"
language: "ja"
medium: "漫剧"
direction: "现实向"
genre: "剧情短片"
art_style: "2D日漫"
tags: ["Seedance 2.0", "Renoise", "Portrait & Fashion", "Portrait", "Anime 2D", "Realistic World", "POV"]
source_repo: "renoise-ai/awesome-seedance-prompts"
source_url: "https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2070864749865398684.json"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "AI動画ラボ | うまくいった作り方を公開中"
original_author_url: "https://x.com/aidoga_lab"
original_post_url: "https://x.com/aidoga_lab/status/2070864749865398684"
published: "2026-06-27"
third_party_author: true
flags: []
also_in: []
source_page: null
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
output_status: "output_unverified"
verification: "attribution_checked"
---

# RReference video 1 defines the camera movement, timing, and the walker's path…

## 提示词（日本語）

```text
RReference video 1 defines the camera movement, timing, and the walker's path ONLY — match its trajectory, speed, framing, and the walker's position and facing exactly. The teal figure with pink arms and a purple backpack in the reference is the walker. Do NOT copy the reference's footwork or leg motion: in the reference the figure slides forward without stepping — ignore that completely. Generate a natural, grounded walking gait yourself, with the feet clearly planting and pushing off the pavement in time with her forward movement.
Style & Mood: retro anime city-pop, warm late-afternoon light. Easy at open → solitary at close.
Dynamic Description: From the held opening frame, the figure in the teal varsity jacket with the purple shoulder bag on her back steps forward and walks straight ahead at an unhurried, natural pace — feet planting on the ground with each step, never sliding — facing her direction of travel the whole time, never turning to profile. This is one single continuous unbroken take with no cuts: the camera rises and orbits around her in one fluid spiral, sweeping smoothly from a full-body frontal up and around to a high angle behind her, looking down on her back as she walks away; the street and storefronts slide and recede continuously beneath the moving camera.
Static Description: teal varsity jacket (one yellow sleeve, one pink sleeve), white cherry-print tee, teal shorts, pink-and-teal sneakers, long dark hair with pink streaks, purple shoulder bag.
Audio: even footsteps on pavement, faint city-pop from the shop doorway, distant street ambience.
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### 上游提供的English版本（translations.en）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2070864749865398684.json)

```text
---

RReference video 1 defines the camera movement, timing, and the walker's path ONLY — match its trajectory, speed, framing, and the walker's position and facing exactly. The teal figure with pink arms and a purple backpack in the reference is the walker. Do NOT copy the reference's footwork or leg motion: in the reference the figure slides forward without stepping — ignore that completely. Generate a natural, grounded walking gait yourself, with the feet clearly planting and pushing off the pavement in time with her forward movement.
Style & Mood: retro anime city-pop, warm late-afternoon light. Easy at open → solitary at close.
Dynamic Description: From the held opening frame, the figure in the teal varsity jacket with the purple shoulder bag on her back steps forward and walks straight ahead at an unhurried, natural pace — feet planting on the ground with each step, never sliding — facing her direction of travel the whole time, never turning to profile. This is one single continuous unbroken take with no cuts: the camera rises and orbits around her in one fluid spiral, sweeping smoothly from a full-body frontal up and around to a high angle behind her, looking down on her back as she walks away; the street and storefronts slide and recede continuously beneath the moving camera.
Static Description: teal varsity jacket (one yellow sleeve, one pink sleeve), white cherry-print tee, teal shorts, pink-and-teal sneakers, long dark hair with pink streaks, purple shoulder bag.
Audio: even footsteps on pavement, faint city-pop from the shop doorway, distant street ambience.

--- THREAD CONTINUATION ---
[Thread 1] Even after changing the conditions, all the feet ended up sliding.

Results after exhaustive testing:
- Model: mini / 2.0
- Box: just sliding / made the legs swing
- Prompt: reference trace version / ground control version

→ Feet sliding in all patterns.
Even with the box that made the legs swing, with 2.0, or changing the prompt, it didn't work. https://t.co/MKhtIgY6mT

[Thread 2] I'll lay out all the conditions for reproduction.

- Start frame: attached character image
- Reference video: attached Blender video
- Model: Seedance 2.0
- Duration: 5s

Used prompt↓

RReference video 1 defines the camera movement, timing, and the walker's path ONLY — match its trajectory, speed, framing, and the walker's position and facing exactly. The teal figure with pink arms and a purple backpack in the reference is the walker. Do NOT copy the reference's footwork or leg motion: in the reference the figure slides forward without stepping — ignore that completely. Generate a natural, grounded walking gait yourself, with the feet clearly planting and pushing off the pavement in time with her forward movement.
Style & Mood: retro anime city-pop, warm late-afternoon light. Easy at open → solitary at close.
Dynamic Description: From the held opening frame, the figure in the teal varsity jacket with the purple shoulder bag on her back steps forward and walks straight ahead at an unhurried, natural pace — feet planting on the ground with each step, never sliding — facing her direction of travel the whole time, never turning to profile. This is one single continuous unbroken take with no cuts: the camera rises and orbits around her in one fluid spiral, sweeping smoothly from a full-body frontal up and around to a high angle behind her, looking down on her back as she walks away; the street and storefronts slide and recede continuously beneath the moving camera.
Static Description: teal varsity jacket (one yellow sleeve, one pink sleeve), white cherry-print tee, teal shorts, pink-and-teal sneakers, long dark hair with pink streaks, purple shoulder bag.
Audio: even footsteps on pavement, faint city-pop from the shop doorway, distant street ambience.

[Thread 3] My current hypothesis is "it might work if we put foot-locked walking motions (like from Mixamo) into the box."

But ideally, the Blender video should be a reference only for "camera, movement, rhythm," and leave the walking and gestures to AI.

For those who have managed to balance this, how do you do it?
Prompt? How you create the reference? Model selection?
I would appreciate any insights 🙏
---
```

### 上游提供的Español版本（translations.es）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2070864749865398684.json)

```text
---
El video de referencia 1 define el movimiento de la cámara, el tiempo y solo la trayectoria del caminante — iguala su trayectoria, velocidad, encuadre y la posición y orientación del caminante exactamente. La figura color teal con brazos rosados y una mochila morada en la referencia es el caminante. NO copies el trabajo de pies o el movimiento de piernas de la referencia: en la referencia, la figura se desliza hacia adelante sin dar pasos — ignora eso completamente. Genera tú mismo un andar natural y firme, con los pies claramente plantándose y despegándose del pavimento al ritmo de su movimiento hacia adelante.
Estilo y Ambiente: retro anime city-pop, luz cálida de tarde. Fácil al inicio → solitario al final.
Descripción Dinámica: Desde el cuadro de apertura sostenido, la figura con la chaqueta varsity color teal y la bolsa de hombro morada en su espalda avanza y camina recto a un ritmo natural y sin prisa — los pies plantándose en el suelo con cada paso, nunca deslizándose — mirando siempre en la dirección de su viaje, sin girar nunca de perfil. Esta es una sola toma continua sin cortes: la cámara se eleva y orbita a su alrededor en una espiral fluida, barriendo suavemente desde un plano frontal de cuerpo completo hacia arriba y alrededor hasta un ángulo alto detrás de ella, mirando hacia abajo en su espalda mientras se aleja; la calle y las tiendas se deslizan y retroceden continuamente bajo la cámara en movimiento.
Descripción Estática: chaqueta varsity color teal (una manga amarilla, una manga rosa), camiseta blanca con estampado de cerezas, shorts teal, zapatillas rosa y teal, cabello largo y oscuro con mechones rosas, bolsa de hombro morada.
Audio: pasos uniformes en el pavimento, city-pop tenue desde la puerta de la tienda, ambiente callejero distante.

--- CONTINUACIÓN DEL HILO ---
[Hilo 1] 条件を変えても、結局ぜんぶ足が滑りました。

総当たりした結果：
・モデル：mini / 2.0
・箱：滑るだけ / 脚を振らせた
・プロンプト：参照トレース版 / 接地制御版

→ 全パターンで足滑り。
脚を振らせた箱でも、2.0でも、プロンプトを変えても、ダメでした。 https://t.co/MKhtIgY6mT

[Hilo 2] 再現用に条件を全部置いておきます。

・スタートフレーム：添付のキャラ画像
・参照動画：添付のBlender動画
・モデル：Seedance 2.0
・尺：5s

使ったプロンプト↓

El video de referencia 1 define el movimiento de la cámara, el tiempo y solo la trayectoria del caminante — iguala su trayectoria, velocidad, encuadre y la posición y orientación del caminante exactamente. La figura color teal con brazos rosados y una mochila morada en la referencia es el caminante. NO copies el trabajo de pies o el movimiento de piernas de la referencia: en la referencia, la figura se desliza hacia adelante sin dar pasos — ignora eso completamente. Genera tú mismo un andar natural y firme, con los pies claramente plantándose y despegándose del pavimento al ritmo de su movimiento hacia adelante.
Estilo y Ambiente: retro anime city-pop, luz cálida de tarde. Fácil al inicio → solitario al final.
Descripción Dinámica: Desde el cuadro de apertura sostenido, la figura con la chaqueta varsity color teal y la bolsa de hombro morada en su espalda avanza y camina recto a un ritmo natural y sin prisa — los pies plantándose en el suelo con cada paso, nunca deslizándose — mirando siempre en la dirección de su viaje, sin girar nunca de perfil. Esta es una sola toma continua sin cortes: la cámara se eleva y orbita a su alrededor en una espiral fluida, barriendo suavemente desde un plano frontal de cuerpo completo hacia arriba y alrededor hasta un ángulo alto detrás de ella, mirando hacia abajo en su espalda mientras se aleja; la calle y las tiendas se deslizan y retroceden continuamente bajo la cámara en movimiento.
Descripción Estática: chaqueta varsity color teal (una manga amarilla, una manga rosa), camiseta blanca con estampado de cerezas, shorts teal, zapatillas rosa y teal, cabello largo y oscuro con mechones rosas, bolsa de hombro morada.
Audio: pasos uniformes en el pavimento, city-pop tenue desde la puerta de la tienda, ambiente callejero distante.

[Hilo 3] 今の自分の仮説は「フットロックされた歩行モーション（Mixamo等）を箱に入れればいける」。

でも理想は、Blender動画は"カメラ・移動・リズム"だけのリファレンスにして、
歩き・仕草はAIに任せること。

ここを両立できてる人、どうやってますか？
プロンプト？参照の作り方？モデル選び？
知見いただけると嬉しいです🙏
---
```

### 上游提供的fr版本（translations.fr）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2070864749865398684.json)

```text
---
La vidéo de référence 1 définit uniquement le mouvement de la caméra, le timing et le chemin du marcheur — suivez exactement sa trajectoire, sa vitesse, son cadrage, ainsi que la position et l'orientation du marcheur. La figure turquoise avec des bras roses et un sac à dos violet dans la référence est le marcheur. Ne copiez PAS le travail des pieds ou le mouvement des jambes de la référence : dans la référence, la figure glisse vers l'avant sans marcher — ignorez cela complètement. Générez vous-même une démarche de marche naturelle et ancrée, avec les pieds qui se posent clairement et poussent sur le trottoir en synchronisation avec son mouvement vers l'avant.
Style et ambiance : city-pop rétro anime, lumière chaude de fin d'après-midi. Facile à l'ouverture → solitaire à la fermeture.
Description dynamique : Depuis le cadre d'ouverture maintenu, la figure dans la veste universitaire turquoise avec le sac à bandoulière violet sur le dos avance et marche droit devant à un rythme naturel et non pressé — les pieds se posant au sol à chaque pas, sans jamais glisser — faisant face à sa direction de déplacement tout le temps, sans jamais se tourner de profil. C'est une seule prise continue ininterrompue sans coupures : la caméra s'élève et tourne autour d'elle dans une spirale fluide, balayant doucement d'un plan frontal en pied jusqu'à un angle élevé derrière elle, regardant vers le bas sur son dos alors qu'elle s'éloigne ; la rue et les devantures glissent et reculent continuellement sous la caméra en mouvement.
Description statique : veste universitaire turquoise (une manche jaune, une manche rose), t-shirt blanc à imprimé cerise, short turquoise, baskets roses et turquoise, longs cheveux noirs avec des mèches roses, sac à bandoulière violet.
Audio : pas réguliers sur le trottoir, city-pop faible depuis l'entrée du magasin, ambiance de rue lointaine.

--- CONTINUATION DU FIL ---
[Fil 1] 条件を変えても、結局ぜんぶ足が滑りました。

総当たりした結果：
・モデル：mini / 2.0
・箱：滑るだけ / 脚を振らせた
・プロンプト：参照トレース版 / 接地制御版

→ 全パターンで足滑り。
脚を振らせた箱でも、2.0でも、プロンプトを変えても、ダメでした。 https://t.co/MKhtIgY6mT

[Fil 2] 再現用に条件を全部置いておきます。

・スタートフレーム：添付のキャラ画像
・参照動画：添付のBlender動画
・モデル：Seedance 2.0
・尺：5s

使ったプロンプト↓

La vidéo de référence 1 définit uniquement le mouvement de la caméra, le timing et le chemin du marcheur — suivez exactement sa trajectoire, sa vitesse, son cadrage, ainsi que la position et l'orientation du marcheur. La figure turquoise avec des bras roses et un sac à dos violet dans la référence est le marcheur. Ne copiez PAS le travail des pieds ou le mouvement des jambes de la référence : dans la référence, la figure glisse vers l'avant sans marcher — ignorez cela complètement. Générez vous-même une démarche de marche naturelle et ancrée, avec les pieds qui se posent clairement et poussent sur le trottoir en synchronisation avec son mouvement vers l'avant.
Style et ambiance : city-pop rétro anime, lumière chaude de fin d'après-midi. Facile à l'ouverture → solitaire à la fermeture.
Description dynamique : Depuis le cadre d'ouverture maintenu, la figure dans la veste universitaire turquoise avec le sac à bandoulière violet sur le dos avance et marche droit devant à un rythme naturel et non pressé — les pieds se posant au sol à chaque pas, sans jamais glisser — faisant face à sa direction de déplacement tout le temps, sans jamais se tourner de profil. C'est une seule prise continue ininterrompue sans coupures : la caméra s'élève et tourne autour d'elle dans une spirale fluide, balayant doucement d'un plan frontal en pied jusqu'à un angle élevé derrière elle, regardant vers le bas sur son dos alors qu'elle s'éloigne ; la rue et les devantures glissent et reculent continuellement sous la caméra en mouvement.
Description statique : veste universitaire turquoise (une manche jaune, une manche rose), t-shirt blanc à imprimé cerise, short turquoise, baskets roses et turquoise, longs cheveux noirs avec des mèches roses, sac à bandoulière violet.
Audio : pas réguliers sur le trottoir, city-pop faible depuis l'entrée du magasin, ambiance de rue lointaine.

[Fil 3] 今の自分の仮説は「フットロックされた歩行モーション（Mixamo等）を箱に入れればいける」。

でも理想は、Blender動画は"カメラ・移動・リズム"だけのリファレンスにして、
歩き・仕草はAIに任せること。

ここを両立できてる人、どうやってますか？
プロンプト？参照の作り方？モデル選び？
知見いただけると嬉しいです🙏
---
```

### 上游提供的한국어版本（translations.ko）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2070864749865398684.json)

```text
---
참조 비디오 1은 카메라 움직임, 타이밍, 그리고 보행자의 경로만 정의합니다 — 그 궤적, 속도, 프레이밍, 그리고 보행자의 위치와 방향을 정확히 맞추세요. 참조에서 청록색 인물은 분홍색 팔과 보라색 배낭을 가진 보행자입니다. 참조의 발동작이나 다리 움직임을 복사하지 마세요: 참조에서 인물은 발을 내딛지 않고 앞으로 미끄러지듯 움직입니다 — 그것은 완전히 무시하세요. 자연스럽고 안정된 걷는 걸음을 직접 생성하세요, 발이 명확히 땅에 닿고 그녀의 전진 움직임에 맞춰 밀어내는 방식으로.

스타일 & 분위기: 레트로 애니메 시티팝, 따뜻한 늦은 오후의 빛. 시작은 편안하게 → 끝은 고독하게.
동적 설명: 고정된 시작 프레임에서, 보라색 어깨 가방을 등에 멘 청록색 바시티 재킷을 입은 인물이 앞으로 나아가고 자연스럽고 여유로운 속도로 똑바로 걸어갑니다 — 발은 매 걸음마다 땅에 닿고 절대 미끄러지지 않으며, 이동 방향을 계속 바라보고 절대 옆모습으로 돌지 않습니다. 이는 컷 없이 하나의 연속적인 끊김 없는 테이크입니다: 카메라는 그녀 주위를 하나의 유연한 나선으로 상승하고 회전하며, 전신 정면에서 시작해 그녀의 뒤를 내려다보는 높은 각도로 부드럽게 휩쓸며, 거리와 상점 전면이 움직이는 카메라 아래에서 연속적으로 미끄러지고 멀어집니다.
정적 설명: 청록색 바시티 재킷 (노란색 소매 하나, 분홍색 소매 하나), 흰색 체리 프린트 티셔츠, 청록색 반바지, 분홍색과 청록색 스니커즈, 분홍색 줄무늬가 있는 긴 검은 머리, 보라색 어깨 가방.
오디오: 포장도로 위의 고른 발소리, 상점 문에서 희미하게 들리는 시티팝, 먼 거리의 거리 소음.

--- THREAD CONTINUATION ---
[Thread 1] 조건을 바꿔도, 결국 전부 발이 미끄러졌습니다.

총 시도 결과:
・모델: mini / 2.0
・박스: 미끄러지기만 함 / 다리를 흔들게 함
・프롬프트: 참조 트레이스 버전 / 접지 제어 버전

→ 모든 패턴에서 발 미끄러짐.
다리를 흔들게 한 박스에서도, 2.0에서도, 프롬프트를 바꿔도, 안 됐습니다. https://t.co/MKhtIgY6mT

[Thread 2] 재현용으로 조건을 모두 놓아둡니다.

・시작 프레임: 첨부된 캐릭터 이미지
・참조 비디오: 첨부된 Blender 비디오
・모델: Seedance 2.0
・길이: 5초

사용한 프롬프트↓

참조 비디오 1은 카메라 움직임, 타이밍, 그리고 보행자의 경로만 정의합니다 — 그 궤적, 속도, 프레이밍, 그리고 보행자의 위치와 방향을 정확히 맞추세요. 참조에서 청록색 인물은 분홍색 팔과 보라색 배낭을 가진 보행자입니다. 참조의 발동작이나 다리 움직임을 복사하지 마세요: 참조에서 인물은 발을 내딛지 않고 앞으로 미끄러지듯 움직입니다 — 그것은 완전히 무시하세요. 자연스럽고 안정된 걷는 걸음을 직접 생성하세요, 발이 명확히 땅에 닿고 그녀의 전진 움직임에 맞춰 밀어내는 방식으로.

스타일 & 분위기: 레트로 애니메 시티팝, 따뜻한 늦은 오후의 빛. 시작은 편안하게 → 끝은 고독하게.
동적 설명: 고정된 시작 프레임에서, 보라색 어깨 가방을 등에 멘 청록색 바시티 재킷을 입은 인물이 앞으로 나아가고 자연스럽고 여유로운 속도로 똑바로 걸어갑니다 — 발은 매 걸음마다 땅에 닿고 절대 미끄러지지 않으며, 이동 방향을 계속 바라보고 절대 옆모습으로 돌지 않습니다. 이는 컷 없이 하나의 연속적인 끊김 없는 테이크입니다: 카메라는 그녀 주위를 하나의 유연한 나선으로 상승하고 회전하며, 전신 정면에서 시작해 그녀의 뒤를 내려다보는 높은 각도로 부드럽게 휩쓸며, 거리와 상점 전면이 움직이는 카메라 아래에서 연속적으로 미끄러지고 멀어집니다.
정적 설명: 청록색 바시티 재킷 (노란색 소매 하나, 분홍색 소매 하나), 흰색 체리 프린트 티셔츠, 청록색 반바지, 분홍색과 청록색 스니커즈, 분홍색 줄무늬가 있는 긴 검은 머리, 보라색 어깨 가방.
오디오: 포장도로 위의 고른 발소리, 상점 문에서 희미하게 들리는 시티팝, 먼 거리의 거리 소음.

[Thread 3] 현재 제 가설은 "발 고정된 걷기 모션(Mixamo 등)을 박스에 넣으면 가능하다"입니다.

하지만 이상적인 것은, Blender 비디오는 "카메라・이동・리듬"만의 참조로 하고,
걷기・몸짓은 AI에 맡기는 것입니다.

여기서 양립할 수 있는 사람, 어떻게 하고 계신가요?
프롬프트? 참조의 제작 방법? 모델 선택?
지식 공유해 주시면 감사하겠습니다🙏
---
```

### 上游提供的pt版本（translations.pt）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2070864749865398684.json)

```text
---
O vídeo de referência 1 define apenas o movimento da câmera, o tempo e o caminho do caminhante — combine exatamente sua trajetória, velocidade, enquadramento e a posição e direção do caminhante. A figura azul-petróleo com braços rosa e uma mochila roxa na referência é o caminhante. NÃO copie o movimento dos pés ou das pernas da referência: na referência, a figura desliza para frente sem dar passos — ignore isso completamente. Gere você mesmo um andar natural e firme, com os pés claramente plantando e impulsionando no pavimento em sincronia com seu movimento para frente.
Estilo e Humor: anime retro city-pop, luz quente de fim de tarde. Fácil na abertura → solitário no fechamento.
Descrição Dinâmica: A partir do quadro de abertura mantido, a figura com a jaqueta varsity azul-petróleo e a bolsa de ombro roxa nas costas avança e caminha em linha reta a um ritmo natural e despreocupado — pés plantando no chão a cada passo, nunca deslizando — sempre voltada na direção do movimento, nunca virando de perfil. Esta é uma única tomada contínua e ininterrupta sem cortes: a câmera sobe e orbita ao redor dela em uma espiral fluida, varrendo suavemente de um frontal de corpo inteiro para cima e ao redor até um ângulo alto atrás dela, olhando para suas costas enquanto ela se afasta; a rua e as vitrines deslizam e recuam continuamente sob a câmera em movimento.
Descrição Estática: jaqueta varsity azul-petróleo (uma manga amarela, uma manga rosa), camiseta branca com estampa de cereja, shorts azul-petróleo, tênis rosa e azul-petróleo, cabelo longo e escuro com mechas rosas, bolsa de ombro roxa.
Áudio: passos uniformes no pavimento, city-pop suave vindo da porta da loja, ambiente de rua distante.

--- CONTINUAÇÃO DA THREAD ---
[Thread 1] 条件を変えても、結局ぜんぶ足が滑りました。

総当たりした結果：
・モデル：mini / 2.0
・箱：滑るだけ / 脚を振らせた
・プロンプト：参照トレース版 / 接地制御版

→ 全パターンで足滑り。
脚を振らせた箱でも、2.0でも、プロンプトを変えても、ダメでした。 https://t.co/MKhtIgY6mT

[Thread 2] 再現用に条件を全部置いておきます。

・スタートフレーム：添付のキャラ画像
・参照動画：添付のBlender動画
・モデル：Seedance 2.0
・尺：5s

使ったプロンプト↓

O vídeo de referência 1 define apenas o movimento da câmera, o tempo e o caminho do caminhante — combine exatamente sua trajetória, velocidade, enquadramento e a posição e direção do caminhante. A figura azul-petróleo com braços rosa e uma mochila roxa na referência é o caminhante. NÃO copie o movimento dos pés ou das pernas da referência: na referência, a figura desliza para frente sem dar passos — ignore isso completamente. Gere você mesmo um andar natural e firme, com os pés claramente plantando e impulsionando no pavimento em sincronia com seu movimento para frente.
Estilo e Humor: anime retro city-pop, luz quente de fim de tarde. Fácil na abertura → solitário no fechamento.
Descrição Dinâmica: A partir do quadro de abertura mantido, a figura com a jaqueta varsity azul-petróleo e a bolsa de ombro roxa nas costas avança e caminha em linha reta a um ritmo natural e despreocupado — pés plantando no chão a cada passo, nunca deslizando — sempre voltada na direção do movimento, nunca virando de perfil. Esta é uma única tomada contínua e ininterrupta sem cortes: a câmera sobe e orbita ao redor dela em uma espiral fluida, varrendo suavemente de um frontal de corpo inteiro para cima e ao redor até um ângulo alto atrás dela, olhando para suas costas enquanto ela se afasta; a rua e as vitrines deslizam e recuam continuamente sob a câmera em movimento.
Descrição Estática: jaqueta varsity azul-petróleo (uma manga amarela, uma manga rosa), camiseta branca com estampa de cereja, shorts azul-petróleo, tênis rosa e azul-petróleo, cabelo longo e escuro com mechas rosas, bolsa de ombro roxa.
Áudio: passos uniformes no pavimento, city-pop suave vindo da porta da loja, ambiente de rua distante.

[Thread 3] 今の自分の仮説は「フットロックされた歩行モーション（Mixamo等）を箱に入れればいける」。

でも理想は、Blender動画は"カメラ・移動・リズム"だけのリファレンスにして、
歩き・仕草はAIに任せること。

ここを両立できてる人、どうやってますか？
プロンプト？参照の作り方？モデル選び？
知見いただけると嬉しいです🙏
---
```

### 上游提供的中文版本（translations.zh）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2070864749865398684.json)

```text
---
参考视频1仅定义了摄像机运动、时间和行走者的路径——请准确匹配其轨迹、速度、构图以及行走者的位置和朝向。参考中的行走者是一个带粉色手臂和紫色背包的青绿色人物。不要复制参考中的脚步或腿部动作：在参考中，人物在不迈步的情况下向前滑动——完全忽略这一点。请自行生成自然、稳定的步态，确保双脚在她向前移动时清晰地踩在地面上并推动前进。
风格与氛围：复古动漫城市流行，温暖的下午晚光。开头轻松→结尾孤独。
动态描述：从固定的开场画面开始，穿着青绿色棒球夹克、背着紫色肩包的人物向前迈步，以不慌不忙、自然的步伐直行——每一步都稳稳地踩在地上，绝不滑动——始终面向前进方向，从不转向侧面。这是一个连续不断的镜头，没有剪切：摄像机在她周围以一个流畅的螺旋上升并环绕，从全身正面平滑地转到她背后高角度俯视她的背影，随着她走远，街道和店面在移动的摄像机下不断滑动和后退。
静态描述：青绿色棒球夹克（一只黄色袖子，一只粉色袖子）、白色樱桃印花T恤、青绿色短裤、粉色和青绿色运动鞋、长长的深色头发带粉色条纹、紫色肩包。
音频：均匀的脚步声在路面上，商店门口传来微弱的城市流行音乐，远处的街道环境声。

--- 线程继续 ---
[线程1] 条件を変えても、结局ぜんぶ足が滑りました。

総当たりした结果：
・モデル：mini / 2.0
・箱：滑るだけ / 脚を振らせた
・プロンプト：参照トレース版 / 接地制御版

→ 全パターンで足滑り。
脚を振らせた箱でも、2.0でも、プロンプトを変えても、ダメでした。 https://t.co/MKhtIgY6mT

[线程2] 再现用に条件を全部置いておきます。

・スタートフレーム：添付のキャラ画像
・参照動画：添付のBlender動画
・モデル：Seedance 2.0
・尺：5s

使用的提示词↓

参考视频1仅定义了摄像机运动、时间和行走者的路径——请准确匹配其轨迹、速度、构图以及行走者的位置和朝向。参考中的行走者是一个带粉色手臂和紫色背包的青绿色人物。不要复制参考中的脚步或腿部动作：在参考中，人物在不迈步的情况下向前滑动——完全忽略这一点。请自行生成自然、稳定的步态，确保双脚在她向前移动时清晰地踩在地面上并推动前进。
风格与氛围：复古动漫城市流行，温暖的下午晚光。开头轻松→结尾孤独。
动态描述：从固定的开场画面开始，穿着青绿色棒球夹克、背着紫色肩包的人物向前迈步，以不慌不忙、自然的步伐直行——每一步都稳稳地踩在地上，绝不滑动——始终面向前进方向，从不转向侧面。这是一个连续不断的镜头，没有剪切：摄像机在她周围以一个流畅的螺旋上升并环绕，从全身正面平滑地转到她背后高角度俯视她的背影，随着她走远，街道和店面在移动的摄像机下不断滑动和后退。
静态描述：青绿色棒球夹克（一只黄色袖子，一只粉色袖子）、白色樱桃印花T恤、青绿色短裤、粉色和青绿色运动鞋、长长的深色头发带粉色条纹、紫色肩包。
音频：均匀的脚步声在路面上，商店门口传来微弱的城市流行音乐，远处的街道环境声。

[线程3] 今の自分の仮説は「フットロックされた歩行モーション（Mixamo等）を箱に入れればいける」。

でも理想は、Blender動画は"カメラ・移動・リズム"だけのリファレンスにして、
歩き・仕草はAIに任せること。

ここを両立できてる人、どうやってますか？
プロンプト？参照の作り方？モデル選び？
知见いただけると嬉しいです🙏
---
```

## 出处与许可

- 原作者：[AI動画ラボ | うまくいった作り方を公開中](https://x.com/aidoga_lab) · 原帖：<https://x.com/aidoga_lab/status/2070864749865398684>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[renoise-ai/awesome-seedance-prompts](https://github.com/renoise-ai/awesome-seedance-prompts)，[原文位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2070864749865398684.json)
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
