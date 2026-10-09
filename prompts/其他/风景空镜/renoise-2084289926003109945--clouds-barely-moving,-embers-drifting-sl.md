---
id: "renoise-2084289926003109945"
title: "clouds barely moving, embers drifting slowly"
title_en: null
model: "Seedance 2.0"
language: "en"
medium: "其他"
direction: null
genre: "风景空镜"
art_style: null
tags: ["Seedance 2.0", "Renoise", "Scenery & Spectacle", "Nature", "Photoreal", "Realistic World", "Slow-Mo"]
source_repo: "renoise-ai/awesome-seedance-prompts"
source_url: "https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2084289926003109945.json"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "Kenny1st"
original_author_url: "https://x.com/0xKenny1st"
original_post_url: "https://x.com/0xKenny1st/status/2084289926003109945"
published: "2026-08-03"
third_party_author: true
flags: []
also_in: []
source_page: null
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
output_status: "output_unverified"
verification: "attribution_checked"
---

# clouds barely moving, embers drifting slowly

## 提示词（English）

```text
clouds barely moving, embers drifting slowly
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### 上游提供的Español版本（translations.es）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2084289926003109945.json)

```text
nubes moviéndose apenas, brasas flotando lentamente

--- TUIT CITADO ---
https://t.co/LJCJ3XdqBz

--- ARTÍCULO ENLAZADO: Cómo construir un sitio web de $10,000 con herramientas de IA gratuitas (sin código, sin habilidades de diseño) ---
> Aquí tienes un desglose completo, paso a paso, de cómo crear un sitio web de viajes pulido (con temática de París, en este ejemplo) con una animación de desplazamiento suave — completamente gratis, sin código y sin trabajo manual de diseño. Usaremos ChatGPT, Google AI Studio, Flow AI, Clipchamp, EZGIF y Antigravity IDE.


## 🧰 Herramientas que necesitarás

- ChatGPT — generación de imágenes, prompts y texto para el sitio web
- Google AI Studio — generación del diseño de cada sección del sitio
- Flow AI — generación de transiciones de video entre fotogramas
- Clipchamp — editor de video gratuito para unir clips
- EZGIF — conversión de video en una secuencia de fotogramas JPG
- Antigravity IDE — editor de código con IA para ensamblar el sitio final con animación de scroll
- Cloudinary — alojamiento de imágenes (para obtener URLs directas)
- Pinterest — búsqueda de referencias de diseño


## Paso 1. Crear la animación principal (ventana de avión → nubes → Torre Eiffel)


1. Encuentra una imagen de referencia en Pinterest — por ejemplo, una vista desde la ventana de un avión.
1. Sube la imagen a ChatGPT y pídele que: la recree en una relación de aspecto 16:9
elimine todo el texto
ensanche ligeramente el marco de la ventana

1. Ajusta el prompt hasta que el resultado se vea bien (por ejemplo, "haz el marco más ancho").
1. Genera un segundo fotograma clave — la Torre Eiffel en la misma paleta de colores, con nubes suaves alrededor para mantener la coherencia visual.
1. Crea un fotograma intermedio — una escena compuesta únicamente por nubes (con la cámara posicionada como si estuviera dentro de las nubes). Esto es necesario para dividir la animación en dos videos separados que luego se unirán de forma fluida.
Resultado: ahora tienes 3 imágenes — ventana de avión, nubes y la Torre Eiffel.


## Paso 2. Generar transiciones de video en Flow AI


1. Abre Flow AI y sube las tres imágenes.
1. Selecciona el modo de generación de video que usa un fotograma inicial y uno final.
1. Video 1: inicio — ventana de avión, final — nubes.
1. Video 2: inicio — nubes, final — Torre Eiffel.
1. Para cada video, pídele a ChatGPT que escriba un prompt breve y eficaz describiendo el movimiento de cámara, pégalo en Flow AI y genera el clip.
Resultado: dos videos separados con un movimiento de cámara suave, "volando a través de las nubes".


## Paso 3. Unir los videos en Clipchamp


1. Abre Clipchamp → "Create a new video."
1. Importa ambos archivos de video (My media → Import media).
1. Arrastra ambos clips a la línea de tiempo, uno después del otro.
1. Aumenta ligeramente la velocidad de reproducción de ambos clips para lograr una sensación más fluida y rápida.
1. Añade un efecto de transición entre los dos clips para una conexión perfecta.
1. Exporta el video final combinado a tu computadora.


## Paso 4. Dividir el video en fotogramas (EZGIF)


1. Ve a EZGIF → la sección "Video to JPG".
1. Sube el video exportado.
1. Configura la duración en unos 10 segundos y la velocidad de fotogramas en 30 fps.
1. Haz clic en "Convert to JPG."
1. Descarga el archivo ZIP resultante y extráelo — tendrás una secuencia completa de fotogramas JPG.


## Paso 5. Configurar Antigravity IDE


1. Descarga Antigravity IDE desde el sitio web oficial (sección Product → Antigravity IDE), eligiendo la versión para tu sistema operativo.
1. Instálalo y ábrelo, luego haz clic en "Open Folder."
1. Crea una nueva carpeta de proyecto (por ejemplo, travel-site) y ábrela en Antigravity IDE.
1. Arrastra la carpeta que contiene todos tus fotogramas JPG a la ventana del proyecto.
1. Luego arrastra esa misma carpeta al panel de chat de IA de la derecha.
1. Usa este prompt:
"Create a smooth scroll animation using the provided image sequence. Don't add any extra components, text or UI elements. Keep the animation smooth and generate a local host preview link."
1. Acepta cualquier solicitud de permisos mientras la IA genera el proyecto.
1. Abre el enlace local resultante — tu animación base de scroll ya está lista.


## Paso 6. Diseñar las secciones del sitio web en Google AI Studio


1. Busca en Pinterest referencias de diseño para banners y secciones.
1. Sube tu referencia elegida a Google AI Studio con un prompt como:
"Use this as a reference and recreate the banner. Keep the same layout and text structure, remove the background, use a solid black background instead. Apply the VM sense font, use pure white text, and maintain the overall composition."
1. Refina con prompts de seguimiento que cubran detalles como el tamaño del titular, el espaciado, el tamaño de las tarjetas, los íconos y los efectos glassmorphism. Por ejemplo:
"Keep the banner height at 900 pixels… Reduce the headline size to 54 pixels with a medium font weight… apply a transparent glassmorphism effect with a blurred background to both cards."
1. La gran ventaja de AI Studio: tus prompts no tienen que ser perfectos — solo describe los cambios que quieres en lenguaje natural, y el diseño mejora con cada iteración.
Generación del texto
Al mismo tiempo, pídele a ChatGPT que escriba el contenido textual para 4–5 secciones del sitio (titulares, subtítulos, descripciones de tarjetas) y pégalo en AI Studio mientras diseñas cada sección.
Repite para las secciones restantes
Para cada sección adicional:
1. busca una referencia en Pinterest;
1. recréala en AI Studio, manteniendo un estilo coherente con las secciones anteriores;
1. refina con prompts de seguimiento;
1. añade el texto generado por ChatGPT.
Para una sección final, podrías pedir algo como la Torre Eiffel centrada con tarjetas de información alrededor (dos a la izquierda, dos a la derecha), dejando el centro vacío para el elemento visual principal.


## Paso 7. Exportar el diseño y fusionarlo con la animación de scroll


1. En Google AI Studio, haz clic en Code → Export → Download as ZIP.
1. Extrae el archivo y abre la carpeta src.
1. Arrástrala al panel de chat de Antigravity IDE.
1. Usa este prompt:
"The uploaded files contain the components and content for our website. Integrate this layout into the scroll animation that we created earlier. As the user scrolls, each section should appear smoothly one after another."
1. Espera a que termine la generación y luego abre el nuevo enlace local — ahora todas las secciones aparecen una tras otra al hacer scroll, sincronizadas con la animación.


## Paso 8. Toques finales


A través del chat de Antigravity IDE, puedes hacer ajustes puntuales, como:
- centrar el titular, el subtítulo y el botón CTA en la sección principal;
- añadir un fondo degradado a las tarjetas que se vean "planas";
- reemplazar imágenes: genera una nueva en ChatGPT, súbela a Cloudinary, copia la URL directa y pégala en tu prompt de Antigravity (la IA funciona mejor con URLs que con archivos locales).
Microinteracciones
Por último, pídele a Antigravity que añada:
> "smooth hover effects, entrance animations, and small interactions across the website"
Esto le da al sitio una sensación más "viva" — estados hover suaves, animaciones de entrada y pequeños toques interactivos en todo el sitio.


## Resumen

El flujo de trabajo completo:
Pinterest (referencia) → ChatGPT (imágenes/texto) → Flow AI (transiciones de video) → Clipchamp (unión) → EZGIF (fotogramas) → Antigravity IDE (animación de scroll) → Google AI Studio (diseño de secciones) → Antigravity IDE (integración + pulido)
Este enfoque te permite ensamblar un sitio web completo, visualmente premium, con una animación de scroll cinematográfica en solo minutos — sin código, sin Photoshop/Figma y sin necesidad de un equipo de diseño.
```

### 上游提供的fr版本（translations.fr）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2084289926003109945.json)

```text
nuages à peine en mouvement, braises dérivant lentement

--- TWEET CITÉ ---
https://t.co/LJCJ3XdqBz

--- ARTICLE LIÉ : Comment créer un site web à 10 000 $ avec des outils d’IA gratuits (sans code, sans compétences en design) ---
> Voici un guide complet, étape par étape, pour créer un site de voyage soigné (sur le thème de Paris, dans cet exemple) avec une animation de défilement fluide — entièrement gratuit, sans codage et sans travail de design manuel. Nous utiliserons ChatGPT, Google AI Studio, Flow AI, Clipchamp, EZGIF et Antigravity IDE.


## 🧰 Outils nécessaires

- ChatGPT — génération d’images, de prompts et de textes pour le site
- Google AI Studio — génération du design de chaque section du site
- Flow AI — génération des transitions vidéo entre les images
- Clipchamp — éditeur vidéo gratuit pour fusionner les clips
- EZGIF — conversion de la vidéo en une séquence d’images JPG
- Antigravity IDE — éditeur de code IA pour assembler le site final avec animation de défilement
- Cloudinary — hébergement d’images (pour obtenir des URL directes)
- Pinterest — recherche de références de design


## Étape 1. Créer l’animation d’accueil (fenêtre d’avion → nuages → tour Eiffel)


1. Trouvez une image de référence sur Pinterest — par exemple, une vue depuis le hublot d’un avion.
1. Téléversez l’image dans ChatGPT et demandez-lui de : la recréer au format 16:9
supprimer tout le texte
élargir légèrement le cadre de la fenêtre

1. Affinez le prompt jusqu’à ce que le résultat soit satisfaisant (par exemple : « élargis le cadre »).
1. Générez une deuxième image clé — la tour Eiffel dans la même palette de couleurs, avec des nuages doux autour pour assurer la cohérence visuelle.
1. Créez une image intermédiaire — une scène entièrement composée de nuages (caméra positionnée comme si elle se trouvait à l’intérieur des nuages). C’est nécessaire pour diviser l’animation en deux vidéos distinctes qui seront ensuite fusionnées de manière fluide.
Résultat : vous avez maintenant 3 images — fenêtre d’avion, nuages et tour Eiffel.


## Étape 2. Générer les transitions vidéo dans Flow AI


1. Ouvrez Flow AI et téléversez les trois images.
1. Sélectionnez le mode de génération vidéo qui utilise une image de départ et une image de fin.
1. Vidéo 1 : départ — fenêtre d’avion, fin — nuages.
1. Vidéo 2 : départ — nuages, fin — tour Eiffel.
1. Pour chaque vidéo, demandez à ChatGPT d’écrire un prompt court et efficace décrivant le mouvement de caméra, collez-le dans Flow AI, puis générez le clip.
Résultat : deux vidéos distinctes avec un mouvement de caméra fluide, comme si l’on « traversait les nuages en volant ».


## Étape 3. Fusionner les vidéos dans Clipchamp


1. Ouvrez Clipchamp → « Create a new video ».
1. Importez les deux fichiers vidéo (My media → Import media).
1. Faites glisser les deux clips sur la timeline, l’un après l’autre.
1. Augmentez légèrement la vitesse de lecture des deux clips pour un rendu plus fluide et plus dynamique.
1. Ajoutez un effet de transition entre les deux clips pour une liaison sans rupture.
1. Exportez la vidéo finale fusionnée sur votre ordinateur.


## Étape 4. Découper la vidéo en images (EZGIF)


1. Allez sur EZGIF → section « Video to JPG ».
1. Téléversez votre vidéo exportée.
1. Réglez la durée à environ 10 secondes et la fréquence d’images à 30 fps.
1. Cliquez sur « Convert to JPG ».
1. Téléchargez l’archive ZIP obtenue et extrayez-la — vous aurez une séquence complète d’images JPG.


## Étape 5. Configurer Antigravity IDE


1. Téléchargez Antigravity IDE depuis le site officiel (section Product → Antigravity IDE), en choisissant la version correspondant à votre système d’exploitation.
1. Installez-le et ouvrez-le, puis cliquez sur « Open Folder ».
1. Créez un nouveau dossier de projet (par exemple, travel-site) et ouvrez-le dans Antigravity IDE.
1. Faites glisser le dossier contenant toutes vos images JPG dans la fenêtre du projet.
1. Faites ensuite glisser ce même dossier dans le panneau de chat IA à droite.
1. Utilisez ce prompt :
"Create a smooth scroll animation using the provided image sequence. Don't add any extra components, text or UI elements. Keep the animation smooth and generate a local host preview link."
1. Validez toutes les demandes d’autorisation pendant que l’IA génère le projet.
1. Ouvrez le lien local obtenu — votre animation de défilement de base est prête.


## Étape 6. Concevoir les sections du site dans Google AI Studio


1. Recherchez sur Pinterest des références de bannières et de sections.
1. Téléversez votre référence choisie dans Google AI Studio avec un prompt du type :
"Use this as a reference and recreate the banner. Keep the same layout and text structure, remove the background, use a solid black background instead. Apply the VM sense font, use pure white text, and maintain the overall composition."
1. Affinez avec des prompts de suivi portant sur des détails comme la taille du titre, l’espacement, la taille des cartes, les icônes et les effets glassmorphism. Par exemple :
"Keep the banner height at 900 pixels… Reduce the headline size to 54 pixels with a medium font weight… apply a transparent glassmorphism effect with a blurred background to both cards."
1. Le grand avantage d’AI Studio : vos prompts n’ont pas besoin d’être parfaits — décrivez simplement les changements souhaités en langage courant, et le design s’améliore à chaque itération.
Génération du texte
En parallèle, demandez à ChatGPT de rédiger le contenu textuel de 4 à 5 sections du site (titres, sous-titres, descriptions des cartes) et collez-le dans AI Studio au fur et à mesure que vous concevez chaque section.
Répétez pour les sections restantes
Pour chaque section supplémentaire :
1. trouvez une référence sur Pinterest ;
1. recréez-la dans AI Studio en conservant un style cohérent avec les sections précédentes ;
1. affinez avec des prompts de suivi ;
1. ajoutez le texte généré par ChatGPT.
Pour une dernière section, vous pourriez demander quelque chose comme la tour Eiffel centrée avec des cartes d’information autour d’elle (deux à gauche, deux à droite), en laissant le centre vide pour le visuel principal.


## Étape 7. Exporter le design et le fusionner avec l’animation de défilement


1. Dans Google AI Studio, cliquez sur Code → Export → Download as ZIP.
1. Extrayez l’archive et ouvrez le dossier src.
1. Faites-le glisser dans le panneau de chat d’Antigravity IDE.
1. Utilisez ce prompt :
"The uploaded files contain the components and content for our website. Integrate this layout into the scroll animation that we created earlier. As the user scrolls, each section should appear smoothly one after another."
1. Attendez la fin de la génération, puis ouvrez le nouveau lien local — toutes les sections apparaissent désormais les unes après les autres au défilement, synchronisées avec l’animation.


## Étape 8. Finitions


Via le chat d’Antigravity IDE, vous pouvez effectuer des ajustements ciblés, par exemple :
- centrer le titre, le sous-titre et le bouton CTA dans la section hero ;
- ajouter un fond en dégradé aux cartes qui paraissent « plates » ;
- remplacer des images : générez-en une nouvelle dans ChatGPT, téléversez-la sur Cloudinary, copiez l’URL directe et collez-la dans votre prompt Antigravity (l’IA fonctionne mieux avec des URL qu’avec des fichiers locaux).
Micro-interactions
Enfin, demandez à Antigravity d’ajouter :
> "smooth hover effects, entrance animations, and small interactions across the website"
Cela donne au site une impression plus « vivante » — des états de survol fluides, des animations d’entrée et de petites touches interactives partout sur le site.


## Résumé

Le workflow complet :
Pinterest (référence) → ChatGPT (images/texte) → Flow AI (transitions vidéo) → Clipchamp (fusion) → EZGIF (images) → Antigravity IDE (animation de défilement) → Google AI Studio (design des sections) → Antigravity IDE (intégration + finition)
Cette approche vous permet d’assembler en quelques minutes un site complet, visuellement haut de gamme, avec une animation de défilement cinématique — sans code, sans Photoshop/Figma et sans équipe de design.
---
```

### 上游提供的日本語版本（translations.ja）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2084289926003109945.json)

```text
雲がほとんど動かず、火の粉がゆっくり漂っている

--- 引用ツイート ---
https://t.co/LJCJ3XdqBz

--- 関連記事: 無料のAIツールだけで1万ドル級のWebサイトを作る方法（ノーコード、デザインスキル不要） ---
> ここでは、洗練された旅行サイト（この例ではパリをテーマにしたもの）を、滑らかなスクロールアニメーション付きで作成する方法を、最初から最後までステップごとに解説します。しかも完全無料で、コーディングも手作業のデザイン作業も不要です。ChatGPT、Google AI Studio、Flow AI、Clipchamp、EZGIF、Antigravity IDEを使います。


## 🧰 必要なツール

- ChatGPT — 画像、prompt、Webサイトのコピー文を生成
- Google AI Studio — 各Webサイトセクションのデザインを生成
- Flow AI — フレーム間の動画トランジションを生成
- Clipchamp — クリップを結合するための無料動画エディター
- EZGIF — 動画をJPGフレームの連番に変換
- Antigravity IDE — スクロールアニメーション付きの最終サイトを組み立てるAIコードエディター
- Cloudinary — 画像ホスティング（直接URLを取得するため）
- Pinterest — デザイン参考例を探す


## ステップ1. ヒーローアニメーションを作成する（飛行機の窓 → 雲 → エッフェル塔）


1. Pinterestで参考画像を探す — たとえば、飛行機の窓からの景色。
1. その画像をChatGPTにアップロードし、次のように依頼する：16:9のアスペクト比で再現する
テキストをすべて削除する
窓枠を少し広げる

1. 結果がちょうどよくなるまでpromptを調整する（例：「フレームをもっと広くして」）。
1. 2つ目のキーフレームを生成する — 同じカラーパレットで、周囲に柔らかい雲をまとったエッフェル塔。ビジュアルの一貫性を保つためです。
1. 中間フレームを作成する — 雲だけで構成されたシーン（カメラは雲の中にいるような位置）。これは、後で滑らかにつなげる2本の別々の動画にアニメーションを分割するために必要です。
結果：これで、飛行機の窓、雲、エッフェル塔の3枚の画像が揃います。


## ステップ2. Flow AIで動画トランジションを生成する


1. Flow AIを開き、3枚すべての画像をアップロードする。
1. 開始フレームと終了フレームを使う動画生成モードを選択する。
1. 動画1：開始 — 飛行機の窓、終了 — 雲。
1. 動画2：開始 — 雲、終了 — エッフェル塔。
1. 各動画について、カメラの動きを説明する短く効果的なpromptをChatGPTに書かせ、それをFlow AIに貼り付けてクリップを生成する。
結果：カメラが滑らかに「雲の中を飛び抜ける」2本の動画ができます。


## ステップ3. Clipchampで動画を結合する


1. Clipchampを開き、「Create a new video」を選択する。
1. 2つの動画ファイルをインポートする（My media → Import media）。
1. 2つのクリップをタイムラインに順番にドラッグする。
1. どちらのクリップも再生速度を少し上げて、より滑らかでスピーディーな印象にする。
1. 2つのクリップの間にトランジション効果を追加して、シームレスにつなぐ。
1. 結合した最終動画をコンピューターに書き出す。


## ステップ4. 動画をフレームに分解する（EZGIF）


1. EZGIFの「Video to JPG」セクションに移動する。
1. 書き出した動画をアップロードする。
1. 長さを約10秒、フレームレートを30 fpsに設定する。
1. 「Convert to JPG」をクリックする。
1. 生成されたZIPアーカイブをダウンロードして展開すると、JPGフレームの完全な連番が手に入る。


## ステップ5. Antigravity IDEをセットアップする


1. 公式サイトからAntigravity IDEをダウンロードする（Productセクション → Antigravity IDE）。OSに合ったバージョンを選ぶ。
1. インストールして開き、「Open Folder」をクリックする。
1. 新しいプロジェクトフォルダ（例：travel-site）を作成し、Antigravity IDEで開く。
1. すべてのJPGフレームが入ったフォルダをプロジェクトウィンドウにドラッグする。
1. 次に、その同じフォルダを右側のAIチャットパネルにドラッグする。
1. 次のpromptを使う：
"Create a smooth scroll animation using the provided image sequence. Don't add any extra components, text or UI elements. Keep the animation smooth and generate a local host preview link."
1. AIがプロジェクトを生成している間、表示される権限確認はすべて承認する。
1. 生成されたローカルリンクを開く — ベースとなるスクロールアニメーションの完成です。


## ステップ6. Google AI StudioでWebサイトの各セクションをデザインする


1. Pinterestでバナーやセクションのデザイン参考例を探す。
1. 選んだ参考画像をGoogle AI Studioにアップロードし、次のようなpromptを使う：
"Use this as a reference and recreate the banner. Keep the same layout and text structure, remove the background, use a solid black background instead. Apply the VM sense font, use pure white text, and maintain the overall composition."
1. 見出しサイズ、余白、カードサイズ、アイコン、glassmorphism効果などの詳細を含む追加promptで調整する。たとえば：
"Keep the banner height at 900 pixels… Reduce the headline size to 54 pixels with a medium font weight… apply a transparent glassmorphism effect with a blurred background to both cards."
1. AI Studioの大きな利点は、promptを完璧にする必要がないことです。変更したい内容を平易な言葉で説明するだけで、反復するたびにデザインが改善されます。
コピー文の生成
同時に、ChatGPTにサイトの4〜5セクション分のテキスト（見出し、小見出し、カード説明文）を書かせ、それを各セクションのデザイン作業中にAI Studioへ貼り付けます。
残りのセクションも繰り返す
追加の各セクションについては：
1. Pinterestで参考例を探す；
1. AI Studioで前のセクションとスタイルを統一しながら再現する；
1. 追加promptで微調整する；
1. ChatGPTで生成したコピーを追加する。
最後のセクションでは、エッフェル塔を中央に配置し、その周囲に情報カードを置く構成（左に2つ、右に2つ）にして、中央はメインビジュアル用に空けておく、というような依頼もできます。


## ステップ7. デザインを書き出してスクロールアニメーションと統合する


1. Google AI Studioで、Code → Export → Download as ZIPをクリックする。
1. アーカイブを展開し、srcフォルダを開く。
1. それをAntigravity IDEのチャットパネルにドラッグする。
1. 次のpromptを使う：
"The uploaded files contain the components and content for our website. Integrate this layout into the scroll animation that we created earlier. As the user scrolls, each section should appear smoothly one after another."
1. 生成が終わるのを待ち、新しいローカルリンクを開く — これで、スクロールに合わせて各セクションがアニメーションと同期しながら順番に表示されます。


## ステップ8. 最後の仕上げ


Antigr
```

### 上游提供的한국어版本（translations.ko）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2084289926003109945.json)

```text
구름이 거의 움직이지 않고, 불씨가 천천히 흩날리는 장면

--- 인용된 트윗 ---
https://t.co/LJCJ3XdqBz

--- 링크된 기사: 무료 AI 도구로 1만 달러짜리 웹사이트 만드는 법 (코드 없음, 디자인 실력 없음) ---
> 여기서는 부드러운 스크롤 애니메이션이 적용된 세련된 여행 웹사이트(이 예시에서는 파리 테마)를 완전히 무료로, 코딩 없이, 수작업 디자인 없이 만드는 방법을 단계별로 자세히 설명합니다. ChatGPT, Google AI Studio, Flow AI, Clipchamp, EZGIF, Antigravity IDE를 사용합니다.


## 🧰 필요한 도구

- ChatGPT — 이미지, prompt, 웹사이트 카피 생성
- Google AI Studio — 각 웹사이트 섹션의 디자인 생성
- Flow AI — 프레임 사이의 비디오 전환 생성
- Clipchamp — 클립 병합용 무료 비디오 편집기
- EZGIF — 비디오를 JPG 프레임 시퀀스로 변환
- Antigravity IDE — 스크롤 애니메이션이 포함된 최종 사이트를 조립하는 AI 코드 에디터
- Cloudinary — 이미지 호스팅(직접 URL 확보용)
- Pinterest — 디자인 레퍼런스 찾기


## 1단계. 히어로 애니메이션 만들기 (비행기 창문 → 구름 → 에펠탑)


1. Pinterest에서 레퍼런스 이미지를 찾습니다. 예를 들어 비행기 창문 너머의 풍경 같은 이미지입니다.
1. 이미지를 ChatGPT에 업로드한 뒤 다음과 같이 요청합니다: 16:9 비율로 재현하기
텍스트 모두 제거하기
창틀을 약간 더 넓히기

1. 결과가 만족스러울 때까지 prompt를 다듬습니다(예: "창틀을 더 넓게 해줘").
1. 두 번째 키 프레임을 생성합니다 — 같은 색감 팔레트의 에펠탑, 시각적 일관성을 위해 주변에 부드러운 구름을 배치합니다.
1. 중간 프레임을 만듭니다 — 온통 구름으로만 이루어진 장면(카메라는 마치 구름 속에 있는 것처럼 배치). 이는 나중에 자연스럽게 합쳐질 두 개의 별도 비디오로 애니메이션을 나누기 위해 필요합니다.
결과: 이제 비행기 창문, 구름, 에펠탑의 3개 이미지를 갖게 됩니다.


## 2단계. Flow AI에서 비디오 전환 생성하기


1. Flow AI를 열고 세 이미지를 모두 업로드합니다.
1. 시작 프레임과 종료 프레임을 사용하는 비디오 생성 모드를 선택합니다.
1. 비디오 1: 시작 — 비행기 창문, 종료 — 구름.
1. 비디오 2: 시작 — 구름, 종료 — 에펠탑.
1. 각 비디오마다 ChatGPT에 카메라 움직임을 설명하는 짧고 효과적인 prompt를 작성하게 한 뒤, 이를 Flow AI에 붙여넣고 클립을 생성합니다.
결과: "구름 사이를 날아가는" 듯한 부드러운 카메라 움직임이 있는 두 개의 별도 비디오가 만들어집니다.


## 3단계. Clipchamp에서 비디오 합치기


1. Clipchamp를 열고 → "Create a new video"를 선택합니다.
1. 두 비디오 파일을 가져옵니다(My media → Import media).
1. 두 클립을 타임라인에 하나씩 순서대로 드래그합니다.
1. 더 부드럽고 빠른 느낌을 위해 두 클립의 재생 속도를 약간 높입니다.
1. 두 클립 사이에 전환 효과를 추가해 자연스럽게 이어지도록 합니다.
1. 최종 병합된 비디오를 컴퓨터에 내보냅니다.


## 4단계. 비디오를 프레임으로 분해하기 (EZGIF)


1. EZGIF의 "Video to JPG" 섹션으로 이동합니다.
1. 내보낸 비디오를 업로드합니다.
1. 길이를 약 10초로 설정하고 프레임 속도를 30 fps로 설정합니다.
1. "Convert to JPG"를 클릭합니다.
1. 생성된 ZIP 파일을 다운로드해 압축을 풀면 JPG 프레임 전체 시퀀스를 얻을 수 있습니다.


## 5단계. Antigravity IDE 설정하기


1. 공식 웹사이트의 Product 섹션 → Antigravity IDE에서 OS에 맞는 버전을 다운로드합니다.
1. 설치 후 실행하고 "Open Folder"를 클릭합니다.
1. 새 프로젝트 폴더(예: travel-site)를 만들고 Antigravity IDE에서 엽니다.
1. 모든 JPG 프레임이 들어 있는 폴더를 프로젝트 창으로 드래그합니다.
1. 그런 다음 같은 폴더를 오른쪽의 AI 채팅 패널로 드래그합니다.
1. 다음 prompt를 사용합니다:
"Create a smooth scroll animation using the provided image sequence. Don't add any extra components, text or UI elements. Keep the animation smooth and generate a local host preview link."
1. AI가 프로젝트를 생성하는 동안 표시되는 권한 요청은 모두 승인합니다.
1. 생성된 로컬 링크를 열면 기본 스크롤 애니메이션이 준비됩니다.


## 6단계. Google AI Studio에서 웹사이트 섹션 디자인하기


1. Pinterest에서 배너와 섹션 디자인 레퍼런스를 검색합니다.
1. 선택한 레퍼런스를 Google AI Studio에 업로드하고 다음과 같은 prompt를 사용합니다:
"Use this as a reference and recreate the banner. Keep the same layout and text structure, remove the background, use a solid black background instead. Apply the VM sense font, use pure white text, and maintain the overall composition."
1. 헤드라인 크기, 간격, 카드 크기, 아이콘, glassmorphism 효과 같은 세부 사항을 다루는 후속 prompt로 다듬습니다. 예를 들어:
"Keep the banner height at 900 pixels… Reduce the headline size to 54 pixels with a medium font weight… apply a transparent glassmorphism effect with a blurred background to both cards."
1. AI Studio의 가장 큰 장점은 prompt가 완벽할 필요가 없다는 점입니다. 원하는 변경 사항을 평이한 언어로 설명하기만 하면, 반복할수록 디자인이 개선됩니다.
카피 생성
동시에 ChatGPT에게 사이트의 4~5개 섹션에 들어갈 텍스트 콘텐츠(헤드라인, 서브헤드라인, 카드 설명)를 작성하게 하고, 각 섹션을 디자인할 때 AI Studio에 붙여넣습니다.
나머지 섹션도 반복
추가 섹션마다:
1. Pinterest에서 레퍼런스를 찾고;
1. 이전 섹션들과 스타일을 일관되게 유지하면서 AI Studio에서 재현하고;
1. 후속 prompt로 다듬고;
1. ChatGPT가 생성한 카피를 추가합니다.
마지막 섹션에서는 에펠탑을 중앙에 두고 주변에 정보 카드가 배치된 구성(왼쪽 두 개, 오른쪽 두 개)을 요청해 중앙은 메인 비주얼을 위해 비워둘 수도 있습니다.


## 7단계. 디자인을 내보내고 스크롤 애니메이션과 합치기


1. Google AI Studio에서 Code → Export → Download as ZIP을 클릭합니다.
1. 압축 파일을 풀고 src 폴더를 엽니다.
1. 이를 Antigravity IDE의 채팅 패널로 드래그합니다.
1. 다음 prompt를 사용합니다:
"The uploaded files contain the components and content for our website. Integrate this layout into the scroll animation that we created earlier. As the user scrolls, each section should appear smoothly one after another."
1. 생성이 끝날 때까지 기다린 뒤 새 로컬 링크를 엽니다 — 이제 스크롤할 때 각 섹션이 애니메이션과 동기화되어 하나씩 부드럽게 나타납니다.


## 8단계. 마무리 손질


Antigravity IDE 채팅을 통해 다음과 같은 세부 조정을 할 수 있습니다:
- 히어로 섹션에서 헤드라인, 서브헤드라인, CTA 버튼을 가운데 정렬하기;
- "평면적"으로 보이는 카드에 그라데이션 배경 추가하기;
- 이미지 교체: ChatGPT에서 새 이미지를 생성한 뒤 Cloudinary에 업로드하고, 직접 URL을 복사해 Antigravity prompt에 붙여넣기(AI는 로컬 파일보다 URL을 더 잘 처리합니다).
마이크로 인터랙션
마지막으로 Antigravity에 다음을 추가해 달라고 요청합니다:
> "smooth hover effects, entrance animations, and small interactions across the website"
이렇게 하면 사이트가 더 "살아 있는" 느낌을 줍니다 — 부드러운 hover 상태, 진입 애니메
```

### 上游提供的pt版本（translations.pt）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2084289926003109945.json)

```text
nuvens se movendo quase imperceptivelmente, brasas flutuando lentamente

--- TWEET CITADO ---
https://t.co/LJCJ3XdqBz

--- ARTIGO VINCULADO: Como Criar um Site de US$ 10.000 com Ferramentas de IA Gratuitas (Sem Código, Sem Habilidades de Design) ---
> Aqui está um passo a passo completo de como criar um site de viagens refinado (com tema de Paris, neste exemplo) com uma animação de rolagem suave — totalmente grátis, sem programação e sem trabalho manual de design. Vamos usar ChatGPT, Google AI Studio, Flow AI, Clipchamp, EZGIF e Antigravity IDE.


## 🧰 Ferramentas que Você Vai Precisar

- ChatGPT — geração de imagens, prompts e texto do site
- Google AI Studio — geração do design de cada seção do site
- Flow AI — geração de transições em vídeo entre frames
- Clipchamp — editor de vídeo gratuito para unir clipes
- EZGIF — conversão de vídeo em uma sequência de frames JPG
- Antigravity IDE — editor de código com IA para montar o site final com animação de rolagem
- Cloudinary — hospedagem de imagens (para obter URLs diretas)
- Pinterest — busca de referências de design


## Etapa 1. Criar a Animação Hero (Janela do Avião → Nuvens → Torre Eiffel)


1. Encontre uma imagem de referência no Pinterest — por exemplo, uma vista pela janela de um avião.
1. Faça upload da imagem no ChatGPT e peça para ele: recriar em proporção 16:9
remover todo o texto
alargar levemente a moldura da janela

1. Refine o prompt até o resultado ficar certo (por exemplo, "deixe a moldura mais larga").
1. Gere um segundo key frame — a Torre Eiffel na mesma paleta de cores, com nuvens suaves ao redor para manter a consistência visual.
1. Crie um frame intermediário — uma cena composta inteiramente por nuvens (com a câmera posicionada como se estivesse dentro das nuvens). Isso é necessário para dividir a animação em dois vídeos separados que depois serão unidos de forma suave.
Resultado: agora você tem 3 imagens — janela do avião, nuvens e Torre Eiffel.


## Etapa 2. Gerar Transições em Vídeo no Flow AI


1. Abra o Flow AI e faça upload das três imagens.
1. Selecione o modo de geração de vídeo que usa um frame inicial e um frame final.
1. Vídeo 1: início — janela do avião, fim — nuvens.
1. Vídeo 2: início — nuvens, fim — Torre Eiffel.
1. Para cada vídeo, peça ao ChatGPT para escrever um prompt curto e eficaz descrevendo o movimento da câmera, cole-o no Flow AI e gere o clipe.
Resultado: dois vídeos separados com um movimento de câmera suave, como se estivesse "voando pelas nuvens."


## Etapa 3. Unir os Vídeos no Clipchamp


1. Abra o Clipchamp → "Create a new video."
1. Importe os dois arquivos de vídeo (My media → Import media).
1. Arraste os dois clipes para a linha do tempo, um após o outro.
1. Aumente levemente a velocidade de reprodução de ambos os clipes para dar uma sensação mais suave e rápida.
1. Adicione um efeito de transição entre os dois clipes para uma conexão perfeita.
1. Exporte o vídeo final unido para o seu computador.


## Etapa 4. Quebrar o Vídeo em Frames (EZGIF)


1. Acesse o EZGIF → seção "Video to JPG."
1. Faça upload do vídeo exportado.
1. Defina a duração para cerca de 10 segundos e a taxa de quadros para 30 fps.
1. Clique em "Convert to JPG."
1. Baixe o arquivo ZIP resultante e extraia-o — você terá uma sequência completa de frames JPG.


## Etapa 5. Configurar o Antigravity IDE


1. Baixe o Antigravity IDE no site oficial (seção Product → Antigravity IDE), escolhendo a versão para o seu sistema operacional.
1. Instale e abra o programa, depois clique em "Open Folder."
1. Crie uma nova pasta de projeto (por exemplo, travel-site) e abra-a no Antigravity IDE.
1. Arraste a pasta contendo todos os seus frames JPG para a janela do projeto.
1. Em seguida, arraste essa mesma pasta para o painel de chat de IA à direita.
1. Use este prompt:
"Create a smooth scroll animation using the provided image sequence. Don't add any extra components, text or UI elements. Keep the animation smooth and generate a local host preview link."
1. Aprove qualquer solicitação de permissão enquanto a IA gera o projeto.
1. Abra o link local resultante — sua animação base de rolagem está pronta.


## Etapa 6. Criar o Design das Seções do Site no Google AI Studio


1. Pesquise no Pinterest referências de design para banners e seções.
1. Faça upload da referência escolhida no Google AI Studio com um prompt como:
"Use this as a reference and recreate the banner. Keep the same layout and text structure, remove the background, use a solid black background instead. Apply the VM sense font, use pure white text, and maintain the overall composition."
1. Refine com prompts de acompanhamento cobrindo detalhes como tamanho do título, espaçamento, tamanho dos cards, ícones e efeitos de glassmorphism. Por exemplo:
"Keep the banner height at 900 pixels… Reduce the headline size to 54 pixels with a medium font weight… apply a transparent glassmorphism effect with a blurred background to both cards."
1. A grande vantagem do AI Studio: seus prompts não precisam ser perfeitos — basta descrever as mudanças que você quer em linguagem simples, e o design melhora a cada iteração.
Gerando o Texto
Ao mesmo tempo, peça ao ChatGPT para escrever o conteúdo textual de 4–5 seções do site (títulos, subtítulos, descrições dos cards) e cole esse conteúdo no AI Studio enquanto você cria cada seção.
Repita para as Demais Seções
Para cada seção adicional:
1. encontre uma referência no Pinterest;
1. recrie-a no AI Studio, mantendo o estilo consistente com as seções anteriores;
1. refine com prompts de acompanhamento;
1. adicione o texto gerado pelo ChatGPT.
Para uma seção final, você pode pedir algo como a Torre Eiffel centralizada com cards de informação ao redor dela (dois à esquerda, dois à direita), deixando o centro vazio para o visual principal.


## Etapa 7. Exportar o Design e Uní-lo à Animação de Rolagem


1. No Google AI Studio, clique em Code → Export → Download as ZIP.
1. Extraia o arquivo e abra a pasta src.
1. Arraste-a para o painel de chat do Antigravity IDE.
1. Use este prompt:
"The uploaded files contain the components and content for our website. Integrate this layout into the scroll animation that we created earlier. As the user scrolls, each section should appear smoothly one after another."
1. Aguarde a geração terminar e, em seguida, abra o novo link local — todas as seções agora aparecem uma após a outra conforme você rola, sincronizadas com a animação.


## Etapa 8. Toques Finais


Pelo chat do Antigravity IDE, você pode fazer ajustes pontuais, como:
- centralizar o título, o subtítulo e o botão CTA na seção hero;
- adicionar um fundo em gradiente aos cards que parecem "chapados";
- trocar imagens: gere uma nova no ChatGPT, faça upload para o Cloudinary, copie a URL direta e cole-a no prompt do Antigravity (a IA funciona melhor com URLs do que com arquivos locais).
Microinterações
Por fim, peça ao Antigravity para adicionar:
> "smooth hover effects, entrance animations, and small interactions across the website"
Isso dá ao site uma sensação mais "viva" — estados de hover suaves, animações de entrada e pequenos toques interativos em todo o site.


## Resumo

O fluxo completo:
Pinterest (referência) → ChatGPT (imagens/texto) → Flow AI (transições em vídeo) → Clipchamp (união) → EZGIF (frames) → Antigravity IDE (animação de rolagem) → Google AI Studio (design das seções) → Antigravity IDE (integração + polimento)
Essa abordagem permite montar um site completo, visualmente premium, com uma animação de rolagem cinematográfica em apenas minutos — sem código, sem Photoshop/Figma e sem precisar de uma equipe de design.
---
```

### 上游提供的中文版本（translations.zh）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2084289926003109945.json)

```text
云朵几乎不动，余烬缓缓飘散

--- 引用推文 ---
https://t.co/LJCJ3XdqBz

--- 关联文章：如何用免费 AI 工具打造一个价值 10,000 美元的网站（无需代码、无需设计技能） ---
> 下面将完整拆解如何制作一个精致的旅行网站（此示例为巴黎主题），并实现流畅的滚动动画——完全免费，无需编码，也无需手动设计。我们会用到 ChatGPT、Google AI Studio、Flow AI、Clipchamp、EZGIF 和 Antigravity IDE。


## 🧰 你需要的工具

- ChatGPT — 生成图片、提示词和网站文案
- Google AI Studio — 为网站各个区块生成设计
- Flow AI — 生成画面之间的视频转场
- Clipchamp — 免费视频编辑器，用于合并片段
- EZGIF — 将视频转换为 JPG 帧序列
- Antigravity IDE — 用于整合最终网站并实现滚动动画的 AI 代码编辑器
- Cloudinary — 图片托管（用于获取直链 URL）
- Pinterest — 寻找设计参考


## 第 1 步：创建 Hero 动画（飞机窗 → 云层 → 埃菲尔铁塔）


1. 在 Pinterest 上找一张参考图——例如飞机舷窗视角。
1. 将图片上传到 ChatGPT，并让它：按 16:9 比例重现
删除所有文字
稍微加宽窗框

1. 不断优化 prompt，直到效果满意为止（例如：“把窗框加宽一点”）。
1. 生成第二个关键帧——与前一张保持相同色调的埃菲尔铁塔，并在周围加入柔和云层，以保持视觉一致性。
1. 创建中间帧——完全由云朵构成的场景（镜头位置仿佛在云层内部）。这一步是为了把动画拆分成两个独立视频，之后再平滑合并。
结果：你现在有 3 张图片——飞机窗、云层和埃菲尔铁塔。


## 第 2 步：在 Flow AI 中生成视频转场


1. 打开 Flow AI，上传这三张图片。
1. 选择使用起始帧和结束帧的视频生成模式。
1. 视频 1：起始帧——飞机窗，结束帧——云层。
1. 视频 2：起始帧——云层，结束帧——埃菲尔铁塔。
1. 对每个视频，让 ChatGPT 写一段简短有效的 prompt 来描述镜头运动，把它粘贴到 Flow AI 中并生成片段。
结果：你会得到两个独立视频，镜头运动平滑，像“飞过云层”一样。


## 第 3 步：在 Clipchamp 中合并视频


1. 打开 Clipchamp → “Create a new video.”
1. 导入两个视频文件（My media → Import media）。
1. 将两个片段依次拖到时间轴上。
1. 适当提高两个片段的播放速度，让整体感觉更流畅、更快一些。
1. 在两个片段之间添加转场效果，实现无缝衔接。
1. 将合并后的视频导出到电脑。


## 第 4 步：将视频拆分为帧（EZGIF）


1. 前往 EZGIF → “Video to JPG” 部分。
1. 上传你导出的视频。
1. 将时长设置为约 10 秒，帧率设置为 30 fps。
1. 点击 “Convert to JPG.”
1. 下载生成的 ZIP 压缩包并解压——你会得到完整的 JPG 帧序列。


## 第 5 步：设置 Antigravity IDE


1. 从官网下载安装 Antigravity IDE（Product 部分 → Antigravity IDE），选择适合你操作系统的版本。
1. 安装并打开后，点击 “Open Folder.”
1. 新建一个项目文件夹（例如 travel-site）并在 Antigravity IDE 中打开。
1. 将包含所有 JPG 帧的文件夹拖入项目窗口。
1. 然后把同一个文件夹拖到右侧的 AI 聊天面板中。
1. 使用以下 prompt：
"Create a smooth scroll animation using the provided image sequence. Don't add any extra components, text or UI elements. Keep the animation smooth and generate a local host preview link."
1. 在 AI 生成项目时，批准所有权限提示。
1. 打开生成的本地链接——你的基础滚动动画就准备好了。


## 第 6 步：在 Google AI Studio 中设计网站区块


1. 在 Pinterest 上搜索横幅和区块设计参考。
1. 将你选中的参考图上传到 Google AI Studio，并配上类似这样的 prompt：
"Use this as a reference and recreate the banner. Keep the same layout and text structure, remove the background, use a solid black background instead. Apply the VM sense font, use pure white text, and maintain the overall composition."
1. 通过后续 prompt 继续细化细节，例如标题大小、间距、卡片尺寸、图标和 glassmorphism 效果。例如：
"Keep the banner height at 900 pixels… Reduce the headline size to 54 pixels with a medium font weight… apply a transparent glassmorphism effect with a blurred background to both cards."
1. AI Studio 的最大优势在于：你的 prompt 不必完美——只要用自然语言描述你想要的改动，设计就会在每次迭代中不断优化。
生成文案
与此同时，让 ChatGPT 为网站的 4–5 个区块撰写文案（标题、副标题、卡片描述），并在你设计每个区块时将其粘贴到 AI Studio 中。
为其余区块重复上述步骤
对于每个额外区块：
1. 在 Pinterest 上找一个参考；
1. 在 AI Studio 中重现它，并保持与前面区块一致的风格；
1. 用后续 prompt 继续优化；
1. 加入 ChatGPT 生成的文案。
对于最后一个区块，你可以要求类似这样的效果：让埃菲尔铁塔居中，周围环绕信息卡片（左边两个，右边两个），中间留空作为主视觉。


## 第 7 步：导出设计并与滚动动画合并


1. 在 Google AI Studio 中，点击 Code → Export → Download as ZIP.
1. 解压压缩包并打开 src 文件夹。
1. 将其拖入 Antigravity IDE 的聊天面板。
1. 使用以下 prompt：
"The uploaded files contain the components and content for our website. Integrate this layout into the scroll animation that we created earlier. As the user scrolls, each section should appear smoothly one after another."
1. 等待生成完成，然后打开新的本地链接——现在随着滚动，所有区块会依次平滑出现，并与动画同步。


## 第 8 步：最终润色


通过 Antigravity IDE 的聊天功能，你可以进行有针对性的调整，例如：
- 将 hero 区块中的标题、副标题和 CTA 按钮居中；
- 为看起来“平”的卡片添加渐变背景；
- 替换图片：在 ChatGPT 中生成新图，上传到 Cloudinary，复制直链 URL，然后把它粘贴到 Antigravity 的 prompt 中（AI 对 URL 的处理效果通常比本地文件更好）。
微交互
最后，让 Antigravity 添加：
> "smooth hover effects, entrance animations, and small interactions across the website"
这样可以让网站更有“生命力”——包括平滑的悬停状态、入场动画，以及贯穿全站的小型交互细节。


## 总结

完整工作流：
Pinterest（参考）→ ChatGPT（图片/文案）→ Flow AI（视频转场）→ Clipchamp（合并）→ EZGIF（帧序列）→ Antigravity IDE（滚动动画）→ Google AI Studio（区块设计）→ Antigravity IDE（整合 + 润色）
这种方法让你只需几分钟，就能组装出一个完整、视觉高级、带有电影感滚动动画的网站——无需代码、无需 Photoshop/Figma，也不需要设计团队。
---
```

## 出处与许可

- 原作者：[Kenny1st](https://x.com/0xKenny1st) · 原帖：<https://x.com/0xKenny1st/status/2084289926003109945>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[renoise-ai/awesome-seedance-prompts](https://github.com/renoise-ai/awesome-seedance-prompts)，[原文位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2084289926003109945.json)
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
