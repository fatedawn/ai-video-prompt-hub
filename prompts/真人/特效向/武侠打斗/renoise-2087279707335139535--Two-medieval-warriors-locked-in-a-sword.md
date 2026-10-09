---
id: "renoise-2087279707335139535"
title: "Two medieval warriors locked in a sword clash, blades crossed, sparks flying"
title_en: null
model: "Seedance 2.0"
language: "en"
medium: "真人"
direction: "特效向"
genre: "武侠打斗"
art_style: null
tags: ["Seedance 2.0", "Renoise", "Action", "Wuxia", "Photoreal", "Historical", "VFX"]
source_repo: "renoise-ai/awesome-seedance-prompts"
source_url: "https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2087279707335139535.json"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "ALEXYZ"
original_author_url: "https://x.com/Alexvx_nft"
original_post_url: "https://x.com/Alexvx_nft/status/2087279707335139535"
published: "2026-08-11"
third_party_author: true
flags: []
also_in: []
source_page: null
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
output_status: "output_unverified"
verification: "attribution_checked"
---

# Two medieval warriors locked in a sword clash, blades crossed, sparks flying

## 提示词（English）

```text
Two medieval warriors locked in a sword clash, blades crossed, sparks flying
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### 上游提供的Español版本（translations.es）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2087279707335139535.json)

```text
Dos guerreros medievales trabados en un duelo de espadas, con las hojas cruzadas y chispas volando

--- TUIT CITADO ---
https://t.co/jTOhDRnm4j

--- ARTÍCULO ENLAZADO: Probablemente estás desperdiciando créditos de video con IA. Aquí está el motivo ---
La mayoría de las personas culpa al modelo de IA cuando sus videos no salen como esperaban
Pero, por lo general, el problema no es el modelo
Es el prompt
Te imaginas la escena perfecta en tu cabeza, escribes rápidamente una descripción y luego esperas que la IA complete los huecos
En cambio, hace suposiciones
A veces esas suposiciones se acercan bastante
Pero la mayoría de las veces no
Cada intento fallido significa más créditos gastados, más tiempo perdido y otra generación que podría haberse evitado
Aprender a crear prompts efectivos es una de las formas más sencillas de mejorar tus videos con IA sin cambiar de modelo ni pagar por generaciones adicionales


- Duelo de espadas cinematográfico
- Escena de anime de los años 90
- Anuncio premium de zapatillas


## El verdadero problema

La mayoría de las personas genera primero...
...y piensa después
Escriben algo como esto:
> Dos guerreros peleando. Épico. Cinematográfico. Alta calidad.
Suena detallado
No lo es
Palabras como "épico" y "cinematográfico" describen una sensación, no instrucciones
La IA todavía tiene que decidir:
- Cómo se mueven los personajes
- Hacia dónde va la cámara
- Cómo es la iluminación
- Qué tan rápida debe ser la acción
- Y docenas de otros detalles que nunca mencionaste realmente
Cada detalle que falta se convierte en otra suposición
Cada suposición incorrecta cuesta otra generación
Un buen prompt elimina la incertidumbre al definir:
- Sujeto
- Acción
- Movimiento de cámara
- Iluminación
- Estilo
- Ritmo
- Negative Prompt
> La IA no puede leer tu mente. Solo lee tu prompt.



## Movimiento rápido

Las escenas de acción rápida son uno de los mayores desafíos para los modelos de video con IA porque tienen que inventar cada fotograma entre dos movimientos
Para mejorar la consistencia, empecé con una imagen de referencia dentro de Higgs Field usando GPT Image 2 en lugar de saltar directamente a la generación de video
En vez de escribir:
> Dos guerreros peleando
Describí un único momento exacto congelado:
> Dos guerreros medievales trabados en un duelo de espadas, con las hojas cruzadas y chispas volando.
Esa sola imagen fijó la composición antes incluso de que comenzara el proceso de animación
Luego la animé dentro de CDANCE 2.0 usando un prompt sencillo
El resultado no fue bueno
Las espadas desaparecían
El movimiento se sentía antinatural
La cámara derivaba sin propósito
En lugar de corregir un problema tras otro, rehice el prompt dentro de VideoPrompt Studio, que añadió automáticamente movimiento de cámara, iluminación, ritmo, estilo y un negative prompt adecuado
Usando exactamente la misma imagen y los mismos ajustes de generación...
...lo único que cambió fue el prompt.
La diferencia fue inmediata
La pelea se veía más fluida
El movimiento de cámara por fin se sentía intencional
Ambos personajes se mantuvieron consistentes durante toda la escena



## Animación estilizada:

El anime introduce un desafío completamente distinto
Esta vez, el mayor problema no es el movimiento
Es la consistencia
Para este ejemplo, creé un fotograma de referencia de una chica comiendo fideos en un puesto junto al mar, usando un estilo de anime cel japonés de los años 90
La primera animación en realidad se veía bien
Pero se mantuvo en una sola toma estática durante todo el clip
La escena se sentía plana
Después de cambiar a un prompt JSON estructurado, la animación pasó de forma natural por múltiples ángulos de cámara mientras mantenía el mismo estilo visual de principio a fin
El negative prompt también evitó que el modelo derivara hacia visuales 3D realistas, ayudando a preservar la estética clásica del anime



## Videos de producto

Los anuncios de producto dependen de algo completamente distinto
La iluminación
Un prompt simple produjo una zapatilla giratoria
Pero seguía viéndose claramente generada por IA
La iluminación se sentía plana
El movimiento de cámara carecía de dirección
El producto nunca se veía realmente premium
Usando Product Mode dentro de VideoPrompt.Studio, el prompt se convirtió en una secuencia comercial completa con iluminación controlada, reflejos, movimiento de cámara, planos de cerca y un negative prompt adecuado
Sin cambiar el modelo ni ningún ajuste de generación, el resultado final se parecía mucho más a una campaña publicitaria real



## Reflexiones finales

En los tres ejemplos, una cosa se mantuvo exactamente igual
- Modelo de IA
- Ajustes de generación
- Imagen de referencia
La única variable...
...fue el prompt
Mejores prompts produjeron:
- Movimiento más fluido
- Mayor consistencia de estilo
- Iluminación más limpia
- Muchos menos errores de generación
Si constantemente estás quemando créditos intentando arreglar malos resultados, no empieces cambiando el modelo
Empieza por mejorar tus prompts
> Un prompt bien estructurado le da a la IA mucho menos margen para adivinar, y esa suele ser la diferencia entre obtener el video que querías en la primera generación o desperdiciar créditos en cinco más.

X - https://x.com/kv1nsiii
Telegram - https://t.me/kv1nsi
---
```

### 上游提供的fr版本（translations.fr）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2087279707335139535.json)

```text
Deux guerriers médiévaux engagés dans un duel à l’épée, lames croisées, étincelles jaillissantes

--- TWEET CITÉ ---
https://t.co/jTOhDRnm4j

--- ARTICLE LIÉ : Vous gaspillez probablement vos crédits de vidéo IA. Voici pourquoi ---
La plupart des gens blâment le modèle d’IA lorsque leurs vidéos ne donnent pas le résultat espéré
Mais le modèle n’est généralement pas le problème
C’est le prompt
Vous imaginez la scène parfaite dans votre tête, vous tapez rapidement une description, puis vous attendez de l’IA qu’elle comble les blancs
À la place, elle fait des suppositions
Parfois, ces suppositions sont proches de la réalité
Mais la plupart du temps, elles ne le sont pas
Chaque tentative ratée signifie plus de crédits dépensés, plus de temps perdu, et une génération supplémentaire qui aurait pu être évitée
Apprendre à créer des prompts efficaces est l’un des moyens les plus simples d’améliorer vos vidéos IA sans changer de modèle ni payer pour des générations supplémentaires


- Combat à l’épée cinématographique
- Scène d’anime des années 1990
- Publicité premium pour des sneakers


## Le vrai problème

La plupart des gens génèrent d’abord...
...et réfléchissent ensuite
Ils écrivent quelque chose comme ça :
> Two warriors fighting. Epic. Cinematic. High quality.
Cela semble détaillé
Ça ne l’est pas
Des mots comme « epic » et « cinematic » décrivent une ambiance, pas des instructions
L’IA doit encore décider :
- Comment les personnages bougent
- Où va la caméra
- À quoi ressemble l’éclairage
- À quelle vitesse l’action doit se dérouler
- Et des dizaines d’autres détails que vous n’avez jamais réellement mentionnés
Chaque détail manquant devient une nouvelle supposition
Chaque mauvaise supposition coûte une génération supplémentaire
Un bon prompt réduit l’incertitude en définissant :
- Sujet
- Action
- Mouvement de caméra
- Éclairage
- Style
- Rythme
- Negative Prompt
> L’IA ne peut pas lire dans vos pensées. Elle ne lit que votre prompt.



## Mouvement rapide

Les scènes d’action rapide sont l’un des plus grands défis pour les modèles de vidéo IA, car ils doivent inventer chaque image entre deux mouvements
Pour améliorer la cohérence, j’ai commencé par une image de référence dans Higgs Field en utilisant GPT Image 2, au lieu de passer directement à la génération vidéo
Plutôt que d’écrire :
> Two warriors fighting
J’ai décrit un seul instant figé précis :
> Two medieval warriors locked in a sword clash, blades crossed, sparks flying.
Cette seule image a verrouillé la composition avant même le début du processus d’animation
Je l’ai ensuite animée dans CDANCE 2.0 à l’aide d’un prompt simple
Le résultat n’était pas terrible
Les épées disparaissaient
Le mouvement semblait artificiel
La caméra dérivait sans raison
Plutôt que de corriger un problème après l’autre, j’ai reconstruit le prompt dans VideoPrompt Studio, qui a automatiquement ajouté le mouvement de caméra, l’éclairage, le rythme, le style et un bon negative prompt
En utilisant exactement la même image et les mêmes paramètres de génération...
...la seule chose qui a changé, c’est le prompt.
La différence était immédiate
Le combat paraissait plus fluide
Le mouvement de caméra semblait enfin intentionnel
Les deux personnages restaient cohérents tout au long de la scène



## Animation stylisée :

L’anime introduit un défi complètement différent
Cette fois, le plus gros problème n’est pas le mouvement
C’est la cohérence
Pour cet exemple, j’ai créé une image de référence d’une fille mangeant des nouilles dans un stand en bord de mer, dans un style d’anime japonais cel des années 1990
La première animation était en fait réussie
Mais elle restait sur un seul plan fixe pendant tout le clip
La scène paraissait plate
Après être passé à un prompt JSON structuré, l’animation a naturellement enchaîné plusieurs angles de caméra tout en conservant le même style visuel du début à la fin
Le negative prompt a également empêché le modèle de dériver vers des visuels 3D réalistes, aidant ainsi à préserver l’esthétique anime classique



## Vidéos produit

Les publicités produit reposent sur quelque chose de complètement différent
L’éclairage
Un prompt simple a produit une sneaker tournante
Mais elle avait toujours un aspect manifestement généré par IA
L’éclairage semblait plat
Le mouvement de caméra manquait de direction
Le produit n’avait jamais l’air vraiment premium
En utilisant le Product Mode dans VideoPrompt.Studio, le prompt est devenu une séquence publicitaire complète avec un éclairage contrôlé, des reflets, des mouvements de caméra, des gros plans et un bon negative prompt
Sans changer de modèle ni aucun paramètre de génération, le résultat final ressemblait beaucoup plus à une vraie campagne publicitaire



## Réflexions finales

Dans ces trois exemples, une chose est restée exactement la même
- Modèle d’IA
- Paramètres de génération
- Image de référence
La seule variable...
...c’était le prompt
De meilleurs prompts ont produit :
- Un mouvement plus fluide
- Une cohérence de style plus forte
- Un éclairage plus propre
- Beaucoup moins d’erreurs de génération
Si vous brûlez constamment vos crédits à essayer de corriger de mauvais résultats, ne commencez pas par changer de modèle
Commencez par améliorer vos prompts
> Un prompt bien structuré laisse beaucoup moins de place à l’IA pour faire des suppositions, et c’est souvent la différence entre obtenir la vidéo voulue dès la première génération ou gaspiller des crédits sur cinq générations supplémentaires.

X - https://x.com/kv1nsiii
Telegram - https://t.me/kv1nsi
```

### 上游提供的日本語版本（translations.ja）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2087279707335139535.json)

```text
二人の中世の戦士が剣を交えている。刃が交差し、火花が飛び散る

--- 引用ツイート ---
https://t.co/jTOhDRnm4j

--- 関連記事: あなたはAI動画のクレジットを無駄にしているかもしれない。その理由 ---
多くの人は、動画が思い通りに仕上がらないとAIモデルのせいにします
でも、たいてい問題はモデルではありません
問題はプロンプトです
頭の中で完璧なシーンを思い描き、すばやく説明文を入力して、あとはAIが足りない部分を埋めてくれると期待する
しかし実際には、AIは推測しているだけです
その推測がうまく当たることもあります
とはいえ、たいていはそうではありません
失敗するたびに、さらにクレジットを消費し、時間を無駄にし、避けられたはずの生成をもう一度行うことになります
効果的なプロンプトの作り方を学ぶことは、モデルを変えたり追加生成に課金したりせずにAI動画を改善する、最も簡単な方法のひとつです


- 映画的な剣戟シーン
- 1990年代アニメのワンシーン
- プレミアムなスニーカーのCM


## 本当の問題

多くの人は、まず生成してから...
...あとで考えます
たとえば、こんなふうに書きます:
> 二人の戦士が戦っている。壮大。映画的。高品質。
一見、詳しく見えます
でも、そうではありません
"epic" や "cinematic" のような言葉は、指示ではなく雰囲気を表しています
AIはまだ次のことを判断しなければなりません:
- キャラクターがどう動くか
- カメラがどこへ向かうか
- ライティングがどう見えるか
- アクションの速さ
- そして、あなたが実際には一度も言及していない他の何十もの要素
足りない情報のひとつひとつが、さらなる推測になります
間違った推測のたびに、また1回分の生成コストがかかります
良いプロンプトは、以下を明確にして不確実性を取り除きます:
- 被写体
- 動作
- カメラの動き
- ライティング
- スタイル
- テンポ
- ネガティブプロンプト
> AIはあなたの心を読むことはできません。読めるのはプロンプトだけです。



## 高速な動き

高速アクションのシーンは、AI動画モデルにとって最も難しい課題のひとつです。2つの動きの間にあるすべてのフレームを、モデルが作り出さなければならないからです
一貫性を高めるために、私はいきなり動画生成に進むのではなく、GPT Image 2を使ってHiggs Field内で参照画像から始めました
> 二人の戦士が戦っている
と書く代わりに、私はひとつの正確な静止瞬間を描写しました:
> 二人の中世の戦士が剣を交えている。刃が交差し、火花が飛び散る。
この1枚の画像によって、アニメーション処理が始まる前に構図が固定されました
その後、CDANCE 2.0内でシンプルなプロンプトを使ってアニメーション化しました
結果はあまり良くありませんでした
剣が消え
動きは不自然に感じられ
カメラは目的もなく漂っていました
ひとつずつ問題を直すのではなく、VideoPrompt Studio内でプロンプトを作り直しました。すると、カメラの動き、ライティング、テンポ、スタイル、そして適切なネガティブプロンプトが自動で追加されました
同じ画像と同じ生成設定を使っても...
...変わったのはプロンプトだけでした。
違いはすぐにわかりました
戦闘シーンはより滑らかに見え
カメラの動きにもようやく意図が感じられ
両キャラクターはシーン全体を通して一貫性を保っていました



## スタイライズされたアニメーション:

アニメは、まったく別の課題をもたらします
今回は、最大の問題は動きではありません
一貫性です
この例では、1990年代の日本のセルアニメ風スタイルで、海辺の屋台で麺を食べる少女の参照フレームを作成しました
最初のアニメーションは実際かなり良く見えました
しかし、クリップ全体を通して1つの静止ショットのままでした
シーンは平坦に感じられました
構造化されたJSONプロンプトに切り替えると、アニメーションは自然に複数のカメラアングルへ移行し、最初から最後まで同じビジュアルスタイルを維持しました
ネガティブプロンプトによって、モデルがリアルな3D表現へ寄っていくのも防げたため、クラシックなアニメの美学を保つのに役立ちました



## 商品動画

商品CMは、まったく別の要素に依存しています
それはライティングです
シンプルなプロンプトでも回転するスニーカーは生成できました
しかし、見た目は明らかにAI生成だとわかりました
ライティングは平坦で
カメラの動きにも方向性がなく
商品が本当にプレミアムに見えることはありませんでした
VideoPrompt.StudioのProduct Modeを使うと、プロンプトは、制御されたライティング、反射、カメラの動き、クローズアップショット、そして適切なネガティブプロンプトを備えた完全なCMシーケンスになりました
モデルや生成設定を一切変えなくても、最終結果は本物の広告キャンペーンにかなり近いものになりました



## 最後に

3つの例すべてで、まったく同じだったものが1つあります
- AIモデル
- 生成設定
- 参照画像
変わったのはただ1つ...
...プロンプトだけです
より良いプロンプトによって得られたのは:
- より滑らかな動き
- より強いスタイルの一貫性
- よりきれいなライティング
- 生成エラーの大幅な減少
悪い結果を直そうとしてクレジットをどんどん消費しているなら、まずモデルを変えるのではなく
プロンプトを改善することから始めてください
> よく構造化されたプロンプトは、AIが推測する余地を大幅に減らします。そしてそれこそが、1回目の生成で欲しかった動画が得られるか、5回分のクレジットを無駄にするかの分かれ目になることが多いのです。

X - https://x.com/kv1nsiii
Telegram - https://t.me/kv1nsi
---
```

### 上游提供的한국어版本（translations.ko）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2087279707335139535.json)

```text
두 명의 중세 전사가 검을 맞댄 채 격돌하고 있다. 칼날이 교차하고, 불꽃이 튄다

--- 인용된 트윗 ---
https://t.co/jTOhDRnm4j

--- 링크된 기사: 당신은 아마 AI 비디오 크레딧을 낭비하고 있을 겁니다. 이유는 이렇습니다 ---
대부분의 사람들은 영상이 기대한 대로 나오지 않으면 AI 모델을 탓합니다
하지만 대개 문제는 모델이 아닙니다
바로 프롬프트입니다
머릿속으로 완벽한 장면을 떠올린 뒤, 빠르게 설명을 입력하고 AI가 빈칸을 채워 주길 기대하죠
하지만 AI는 추측할 뿐입니다
때로는 그 추측이 꽤 정확할 때도 있습니다
하지만 대부분은 그렇지 않습니다
실패할 때마다 더 많은 크레딧이 소모되고, 더 많은 시간이 낭비되며, 원래라면 피할 수 있었던 또 한 번의 생성이 발생합니다
효과적인 프롬프트를 만드는 법을 배우는 것은 모델을 바꾸거나 추가 생성을 위해 비용을 지불하지 않고도 AI 영상을 개선할 수 있는 가장 쉬운 방법 중 하나입니다


- 시네마틱 검투 장면
- 1990년대 애니메이션 장면
- 프리미엄 스니커즈 광고


## 진짜 문제

대부분의 사람들은 먼저 생성하고...
...나중에 생각합니다
이런 식으로 쓰죠:
> 두 전사가 싸운다. 장엄하게. 시네마틱하게. 고화질.
상세해 보입니다
하지만 그렇지 않습니다
"epic"이나 "cinematic" 같은 단어는 지시가 아니라 느낌을 설명할 뿐입니다
AI는 여전히 다음을 스스로 결정해야 합니다:
- 캐릭터가 어떻게 움직이는지
- 카메라가 어디로 가는지
- 조명이 어떤지
- 액션의 속도는 어느 정도인지
- 그리고 당신이 실제로 언급하지 않은 수십 가지 다른 세부 요소들
빠진 세부 사항 하나하나가 또 다른 추측이 됩니다
잘못된 추측 하나하나가 또 다른 생성 비용으로 이어집니다
좋은 프롬프트는 다음을 정의함으로써 불확실성을 줄입니다:
- 주제
- 동작
- 카메라 움직임
- 조명
- 스타일
- 템포
- 네거티브 프롬프트
> AI는 당신의 생각을 읽을 수 없습니다. 오직 프롬프트만 읽을 뿐입니다.



## 빠른 동작

빠른 액션 장면은 AI 비디오 모델에게 가장 어려운 과제 중 하나입니다. 두 동작 사이의 모든 프레임을 직접 만들어내야 하기 때문입니다
일관성을 높이기 위해, 저는 바로 비디오 생성으로 넘어가는 대신 GPT Image 2를 사용해 Higgs Field 안에서 레퍼런스 이미지를 먼저 만들었습니다
그냥 이렇게 쓰는 대신:
> 두 전사가 싸운다
저는 정확히 하나의 정지된 순간을 묘사했습니다:
> 두 명의 중세 전사가 검을 맞댄 채 격돌하고 있다. 칼날이 교차하고, 불꽃이 튄다.
이 한 장의 이미지가 애니메이션 과정이 시작되기도 전에 구도를 고정해 주었습니다
그다음 CDANCE 2.0에서 간단한 프롬프트로 애니메이션을 적용했습니다
결과는 그다지 좋지 않았습니다
검이 사라졌고
움직임은 부자연스러웠으며
카메라는 목적 없이 흔들렸습니다
문제 하나를 고치는 대신, 저는 VideoPrompt Studio에서 프롬프트를 다시 구성했습니다. 이 도구는 카메라 움직임, 조명, 템포, 스타일, 그리고 적절한 네거티브 프롬프트를 자동으로 추가해 줍니다
같은 이미지와 같은 생성 설정을 사용했지만...
...달라진 것은 오직 프롬프트뿐이었습니다.
차이는 즉시 드러났습니다
전투는 더 부드럽게 보였고
카메라 움직임도 마침내 의도가 느껴졌으며
두 캐릭터는 장면 내내 일관성을 유지했습니다



## 스타일화된 애니메이션:

애니메이션은 완전히 다른 과제를 제시합니다
이번에는 가장 큰 문제가 움직임이 아닙니다
일관성입니다
이 예시에서는 1990년대 일본 셀 애니메이션 스타일로, 해변 포장마차에서 국수를 먹는 소녀의 레퍼런스 프레임을 만들었습니다
첫 번째 애니메이션은 실제로 꽤 괜찮아 보였습니다
하지만 클립 전체가 하나의 정적인 샷에 머물렀습니다
장면이 평면적으로 느껴졌습니다
구조화된 JSON 프롬프트로 바꾸자, 애니메이션은 자연스럽게 여러 카메라 앵글을 오가면서도 처음부터 끝까지 같은 비주얼 스타일을 유지했습니다
네거티브 프롬프트는 모델이 사실적인 3D 비주얼 쪽으로 벗어나는 것도 막아 주어, 클래식한 애니메이션 미학을 유지하는 데 도움이 되었습니다



## 제품 영상

제품 광고는 완전히 다른 요소에 의존합니다
바로 조명입니다
간단한 프롬프트로 회전하는 스니커즈를 만들 수는 있었습니다
하지만 여전히 AI가 만든 티가 너무 났습니다
조명은 평면적이었고
카메라 움직임에는 방향성이 없었으며
제품은 결코 진짜 프리미엄처럼 보이지 않았습니다
VideoPrompt.Studio의 Product Mode를 사용하자, 프롬프트는 조명, 반사, 카메라 움직임, 클로즈업 샷, 그리고 적절한 네거티브 프롬프트가 포함된 완전한 광고 시퀀스로 바뀌었습니다
모델이나 어떤 생성 설정도 바꾸지 않았는데도, 최종 결과물은 실제 광고 캠페인에 훨씬 더 가까워 보였습니다



## 마무리 생각

세 가지 예시 모두에서 완전히 동일했던 것은 하나였습니다
- AI 모델
- 생성 설정
- 레퍼런스 이미지
유일하게 달라진 변수는...
...프롬프트였습니다
더 나은 프롬프트는 다음을 만들어 냈습니다:
- 더 부드러운 움직임
- 더 강한 스타일 일관성
- 더 깔끔한 조명
- 훨씬 적은 생성 오류
결과가 마음에 들지 않아 크레딧을 계속 소모하고 있다면, 모델부터 바꾸지 마세요
프롬프트를 개선하는 것부터 시작하세요
> 잘 구조화된 프롬프트는 AI가 추측할 여지를 훨씬 줄여 줍니다. 그리고 그것이 종종 첫 생성에서 원하는 영상을 얻느냐, 아니면 크레딧을 다섯 번 더 낭비하느냐를 가르는 차이입니다.

X - https://x.com/kv1nsiii
Telegram - https://t.me/kv1nsi
```

### 上游提供的pt版本（translations.pt）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2087279707335139535.json)

```text
Dois guerreiros medievais travados em um duelo de espadas, lâminas cruzadas, faíscas voando

--- TWEET CITADO ---
https://t.co/jTOhDRnm4j

--- ARTIGO LINKADO: Você Provavelmente Está Desperdiçando Créditos de Vídeo com IA. Veja o Porquê ---
A maioria das pessoas culpa o modelo de IA quando seus vídeos não saem como esperavam
Mas, na maioria das vezes, o problema não é o modelo
É o prompt
Você imagina a cena perfeita na sua cabeça, digita rapidamente uma descrição e depois espera que a IA preencha as lacunas
Em vez disso, ela faz suposições
Às vezes, essas suposições chegam perto
Na maioria das vezes, porém, não
Cada tentativa frustrada significa mais créditos gastos, mais tempo perdido e outra geração que poderia ter sido evitada
Aprender a criar prompts eficazes é uma das maneiras mais fáceis de melhorar seus vídeos com IA sem trocar de modelo ou pagar por gerações adicionais


- Luta de espadas cinematográfica
- Cena de anime dos anos 1990
- Comercial premium de tênis


## O verdadeiro problema

A maioria das pessoas gera primeiro...
...e pensa depois
Elas escrevem algo assim:
> Dois guerreiros lutando. Épico. Cinematográfico. Alta qualidade.
Parece detalhado
Mas não é
Palavras como "épico" e "cinematográfico" descrevem uma sensação, não instruções
A IA ainda precisa decidir:
- Como os personagens se movem
- Para onde a câmera vai
- Como é a iluminação
- Quão rápida deve ser a ação
- E dezenas de outros detalhes que você nunca mencionou de fato
Cada detalhe ausente vira mais uma suposição
Cada suposição errada custa outra geração
Um bom prompt elimina a incerteza ao definir:
- Assunto
- Ação
- Movimento de câmera
- Iluminação
- Estilo
- Ritmo
- Negative Prompt
> A IA não consegue ler sua mente. Ela só lê o seu prompt.



## Movimento rápido

Cenas de ação rápida estão entre os maiores desafios para modelos de vídeo com IA, porque eles precisam inventar cada frame entre dois movimentos
Para melhorar a consistência, comecei com uma imagem de referência dentro do Higgs Field usando GPT Image 2, em vez de pular direto para a geração de vídeo
Em vez de escrever:
> Dois guerreiros lutando
Eu descrevi um momento congelado exato:
> Dois guerreiros medievais travados em um duelo de espadas, lâminas cruzadas, faíscas voando.
Essa única imagem travou a composição antes mesmo de o processo de animação começar
Depois, animei isso dentro do CDANCE 2.0 usando um prompt simples
O resultado não foi bom
As espadas desapareceram
O movimento parecia antinatural
A câmera derivava sem propósito
Em vez de corrigir um problema de cada vez, reconstruí o prompt dentro do VideoPrompt Studio, que adicionou automaticamente movimento de câmera, iluminação, ritmo, estilo e um negative prompt adequado
Usando exatamente a mesma imagem e as mesmas configurações de geração...
...a única coisa que mudou foi o prompt.
A diferença foi imediata
A luta ficou mais suave
O movimento de câmera finalmente pareceu intencional
Ambos os personagens permaneceram consistentes ao longo da cena



## Animação estilizada:

Anime traz um desafio completamente diferente
Desta vez, o maior problema não é o movimento
É a consistência
Para este exemplo, criei um frame de referência de uma garota comendo macarrão em uma barraca à beira-mar, usando um estilo de anime cel-shaded japonês dos anos 1990
A primeira animação realmente ficou boa
Mas permaneceu em um único plano estático durante todo o clipe
A cena pareceu sem vida
Depois de mudar para um prompt estruturado em JSON, a animação fez transições naturais por vários ângulos de câmera, mantendo o mesmo estilo visual do começo ao fim
O negative prompt também impediu que o modelo derivasse para visuais 3D realistas, ajudando a preservar a estética clássica de anime



## Vídeos de produto

Comerciais de produto dependem de algo completamente diferente
Iluminação
Um prompt simples produziu um tênis girando
Mas ainda parecia claramente gerado por IA
A iluminação parecia chapada
O movimento de câmera não tinha direção
O produto nunca parecia realmente premium
Usando o Product Mode dentro do VideoPrompt.Studio, o prompt se tornou uma sequência comercial completa com iluminação controlada, reflexos, movimento de câmera, closes e um negative prompt adequado
Sem mudar o modelo nem nenhuma configuração de geração, o resultado final ficou muito mais próximo de uma campanha publicitária real



## Considerações finais

Nos três exemplos, uma coisa permaneceu exatamente a mesma
- Modelo de IA
- Configurações de geração
- Imagem de referência
A única variável...
...foi o prompt
Prompts melhores produziram:
- Movimento mais suave
- Maior consistência de estilo
- Iluminação mais limpa
- Muito menos erros de geração
Se você está constantemente queimando créditos tentando corrigir resultados ruins, não comece trocando o modelo
Comece melhorando seus prompts
> Um prompt bem estruturado dá à IA muito menos espaço para adivinhar, e isso muitas vezes é a diferença entre obter o vídeo que você queria na primeira geração ou desperdiçar créditos em mais cinco.

X - https://x.com/kv1nsiii
Telegram - https://t.me/kv1nsi
---
```

### 上游提供的中文版本（translations.zh）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2087279707335139535.json)

```text
两个中世纪战士剑刃交锋，刀剑相交，火花四溅

--- 引用的推文 ---
https://t.co/jTOhDRnm4j

--- 相关文章：你可能正在浪费 AI 视频点数。原因如下 ---
大多数人在视频没有达到预期时，都会把责任归咎于 AI 模型
但问题通常不在模型
而在 prompt
你在脑海里想象出完美的画面，快速输入一段描述，然后期待 AI 把剩下的部分补全
可实际上，它只是在猜
有时这些猜测还算接近
但大多数时候并不是
每一次失败的尝试，都意味着更多点数被消耗、更多时间被浪费，以及本可以避免的又一次生成
学会如何创建有效的 prompt，是在不更换模型、也不额外付费生成的情况下提升 AI 视频效果的最简单方法之一


- Cinematic sword fight
- 1990s anime scene
- Premium sneaker commercial


## 真正的问题

大多数人总是先生成……
……然后才思考
他们会写出类似这样的内容：
> Two warriors fighting. Epic. Cinematic. High quality.
听起来很详细
其实并不是
像“epic”和“cinematic”这样的词描述的是一种感觉，而不是指令
AI 仍然需要自己决定：
- 角色如何移动
- 镜头如何运作
- 光线是什么样子
- 动作应该有多快
- 以及你从未真正提到的其他几十个细节
每一个缺失的细节，都会变成另一个猜测
每一次错误的猜测，都会消耗一次新的生成
一个好的 prompt 会通过明确以下内容来减少不确定性：
- 主体
- 动作
- 镜头运动
- 光照
- 风格
- 节奏
- Negative Prompt
> AI 读不懂你的心思。它只能读取你的 prompt。



## 快速运动

高速动作场景是 AI 视频模型最难应对的挑战之一，因为它们必须在两个动作之间“创造”出每一帧
为了提高一致性，我先在 Higgs Field 中使用 GPT Image 2 制作了一张参考图，而不是直接跳到视频生成
我没有写：
> Two warriors fighting
而是描述了一个精确的静止瞬间：
> Two medieval warriors locked in a sword clash, blades crossed, sparks flying.
这张单独的图片在动画开始之前就锁定了构图
然后我在 CDANCE 2.0 中用一个简单的 prompt 给它做动画
结果并不理想
剑消失了
动作显得不自然
镜头漂移得毫无目的
与其一个问题接一个问题地修，不如我在 VideoPrompt Studio 里重建 prompt，它会自动补充镜头运动、光照、节奏、风格，以及合适的 negative prompt
在使用完全相同的图片和生成设置时……
……唯一改变的就是 prompt。
差异立刻显现
打斗看起来更流畅了
镜头运动终于有了明确意图
两个角色在整个场景中都保持了一致性



## 风格化动画：

Anime 带来了完全不同的挑战
这一次，最大的问题不是动作
而是一致性
在这个例子里，我用 1990 年代日本赛璐璐动画风格，创建了一张女孩在海边小吃摊吃面的参考帧
第一次动画其实看起来不错
但整个片段都停留在一个静态镜头上
场景显得很平
切换到结构化的 JSON prompt 后，动画自然地过渡到了多个镜头角度，同时从头到尾保持相同的视觉风格
negative prompt 还防止模型偏向写实的 3D 视觉效果，帮助保留经典 anime 美学



## 产品视频

产品广告依赖的是完全不同的东西
光照
一个简单的 prompt 生成了一只旋转的运动鞋
但它仍然明显像是 AI 生成的
光线显得很平
镜头运动缺乏方向感
产品始终没有真正呈现出高级感
使用 VideoPrompt.Studio 中的 Product Mode 后，prompt 变成了一段完整的广告序列，包含可控的光照、反射、镜头运动、特写镜头，以及合适的 negative prompt
在没有更换模型或任何生成设置的情况下，最终结果看起来更接近真实的广告 campaign



## 最后的想法

在这三个例子中，有一件事始终完全相同
- AI model
- Generation settings
- Reference image
唯一变化的变量……
……是 prompt
更好的 prompt 带来了：
- 更平滑的运动
- 更强的风格一致性
- 更干净的光照
- 更少的生成错误
如果你总是在不断烧点数，只为了修复糟糕的结果，不要先从更换模型开始
先从改进你的 prompt 开始
> 结构良好的 prompt 能让 AI 少很多猜测空间，而这往往就是一次生成就得到你想要的视频，和为了同样结果浪费五次点数之间的区别。

X - https://x.com/kv1nsiii
Telegram - https://t.me/kv1nsi
---
```

## 出处与许可

- 原作者：[ALEXYZ](https://x.com/Alexvx_nft) · 原帖：<https://x.com/Alexvx_nft/status/2087279707335139535>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[renoise-ai/awesome-seedance-prompts](https://github.com/renoise-ai/awesome-seedance-prompts)，[原文位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2087279707335139535.json)
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
