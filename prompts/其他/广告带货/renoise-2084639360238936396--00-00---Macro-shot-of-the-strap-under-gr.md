---
id: "renoise-2084639360238936396"
title: "00:00 - Macro shot of the strap under grazing side light."
title_en: null
model: "Seedance 2.0"
language: "en"
medium: "其他"
direction: null
genre: "广告带货"
art_style: null
tags: ["Seedance 2.0", "Renoise", "Product Ad", "Luxury", "Photoreal", "Realistic World", "Macro", "FPV & Aerial"]
source_repo: "renoise-ai/awesome-seedance-prompts"
source_url: "https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2084639360238936396.json"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "Quri"
original_author_url: "https://x.com/qurisage"
original_post_url: "https://x.com/qurisage/status/2084639360238936396"
published: "2026-08-04"
third_party_author: true
flags: []
also_in: []
source_page: null
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
output_status: "output_unverified"
verification: "attribution_checked"
---

# 00:00 - Macro shot of the strap under grazing side light.

## 提示词（English）

```text
00:00 - Macro shot of the strap under grazing side light.
00:03 - The camera smoothly flies over the dial and mechanisms.
00:07 - The watch emerges from the darkness on a red rocky surface.
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### 上游提供的Español版本（translations.es）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2084639360238936396.json)

```text
00:00 - Plano macro de la correa bajo una luz lateral rasante.
00:03 - La cámara vuela suavemente sobre la esfera y los mecanismos.
00:07 - El reloj emerge de la oscuridad sobre una superficie rocosa roja.

--- TWEET CITADO ---
https://t.co/pd5OwGiSbm

--- ARTÍCULO ENLAZADO: Claude Design + Claude Code + GitHub: Un pipeline de producción para trabajo con clientes ---
## 0. Por qué las tres herramientas van juntas

Cada una resuelve un problema distinto en un proyecto con cliente, y confundir sus roles te cuesta dinero.
Claude Design resuelve la aprobación. Tu cliente no puede leer una especificación. Puede mirar una pantalla y decir “mueve eso”. Design te da un lienzo que produce tres direcciones en veinte minutos en lugar de una, además de un enlace que le envías al cliente con acceso solo para comentarios.
Claude Code resuelve la implementación. Vive en tu terminal y en la nube, lee todo el repositorio, escribe código, ejecuta pruebas y abre pull requests.
GitHub resuelve la prueba y la entrega. Es el único lugar que muestra qué construiste, cuándo, contra qué tarea y quién lo revisó. Para el cliente es un artefacto de aceptación. Para ti es protección cuando alguien pregunta qué hiciste realmente durante seis semanas.
La razón por la que la pila supera la suma de sus partes: el sistema de diseño vive en el repositorio, no en tu cabeza. Claude Design lo lee desde un repositorio de GitHub y crea mockups a partir de los componentes reales de tu cliente en lugar de inventar otros nuevos. Claude Code luego implementa esos mismos componentes. Git cierra el ciclo.

## 1. Mapa de roles: qué va en cada lugar


La línea divisoria que vale la pena memorizar: Design responde “cómo se ve”, Code responde “cómo funciona”, GitHub responde “quién lo aprobó y cuándo”.

## 2. Configuración única

Esto lo haces una vez. Cada proyecto posterior lo reutiliza.
2.1 Claude Code
Necesitas un plan de pago: Pro, Max, Team, Enterprise, o una cuenta de Claude Console. El nivel gratuito de claude.ai no lo incluye.
El instalador nativo se convirtió en la vía principal a principios de 2026. npm ahora es legado.

Verifica e inicia sesión:

Si instalaste mediante npm en 2025, migra. El binario antiguo ocultará al nativo en tu PATH y pasarás una tarde confundido preguntándote por qué una corrección no hizo nada.

Una dependencia de versión importa más adelante: /design-sync llegó en Claude Code v2.1.181. Si falta el comando, ejecuta /update y abre una sesión nueva.
2.2 GitHub CLI

Necesitas gh para dos cosas: crear repositorios desde una plantilla y sincronizar tu token en sesiones en la nube de Claude Code con /web-setup.
2.3 Claude GitHub App y Actions
Esto es lo que te da @claude dentro de issues y pull requests.
Ruta rápida. Desde el directorio de tu proyecto en la terminal:

El comando instala la Claude GitHub App en tu repositorio y luego ofrece añadir el archivo de workflow y el secreto de la API key. A partir de v2.1.187 puedes elegir Skip for now para instalar solo la App y volver a los pasos del workflow más tarde ejecutando el mismo comando otra vez.
Requisitos: permisos de administrador del repositorio. La ruta rápida funciona solo para usuarios directos de la API de Claude. Bedrock y Google Cloud necesitan la ruta manual.
Ruta manual, si /install-github-app falla:
1. Instala la App: https://github.com/apps/claudePermissions que solicita: Contents read and write, Issues read and write, Pull requests read and write.
1. Añade el secreto en Settings → Secrets and variables → Actions → New repository secret.ANTHROPIC_API_KEY si pagas por llamada a la API.
o CLAUDE_CODE_OAUTH_TOKEN si estás en Pro o Max y prefieres no crear una API key. Genéralo localmente con claude setup-token.

1. Copia el workflow desde examples/claude.yml en anthropics/claude-code-action a tu .github/workflows/.
Pruébalo: abre un issue y escribe @claude take a look at the README. Debería aparecer una respuesta en menos de un minuto.
El fallo más común: la gente escribe /claude. El disparador es @claude.
2.4 Claude Code en la web
Esto es lo que te permite llevar tres proyectos de clientes a la vez sin atar tu portátil a uno solo.
Está en claude.ai/code, en vista previa de investigación para usuarios Pro, Max y Team, además de usuarios Enterprise con asientos premium o Chat + Claude Code.
Dos formas de dar acceso a GitHub a las sesiones en la nube:

Lee esta parte dos veces: una sesión en la nube puede acceder a cualquier repositorio que la cuenta de GitHub conectada pueda ver, no solo a aquellos donde la App está instalada. Instalar la App habilita webhooks de PR para Auto-fix. No es un control de acceso a nivel de sesión. Si manejas varios clientes y necesitas aislamiento, restríngelo en GitHub mismo mediante la pertenencia a equipos y repositorios.
Comandos principales:

--cloud clona el remoto de GitHub de tu directorio actual en tu rama actual. Primero haz push de los commits locales. La VM clona desde GitHub, no desde tu máquina. La sintaxis anterior --remote sigue funcionando como alias obsoleto.
Si el repositorio no tiene remoto de GitHub, Claude Code lo empaqueta y lo sube directamente. Límites: debe ser un repo git con al menos un commit, el paquete debe mantenerse por debajo de 100 MB, los archivos no rastreados se excluyen (ejecuta git add primero), y una sesión empaquetada no puede hacer push de vuelta a un remoto sin autenticación de GitHub configurada.
--teleport requisitos: árbol de trabajo limpio, mismo repositorio (no un fork), la rama de la sesión enviada al remoto y la misma cuenta de claude.ai.
2.5 Claude Design
Ábrelo en claude.ai/design o desde la barra lateral de Claude Desktop. Beta en Pro, Max, Team y Enterprise. En Enterprise viene desactivado por defecto, y un administrador lo habilita en Organization settings.
Solo web y escritorio. No hay cliente móvil.
Para dirigir proyectos de diseño desde la terminal, conecta el servidor MCP de Claude Design:

Luego dentro de Claude Code:

Lo que hace /design-sync según el centro de ayuda oficial: incorpora tu sistema de diseño para que todo lo que Claude construye en Claude Design parta de tus componentes existentes. Fuentes: un repositorio de GitHub, archivos de diseño, cargas en bruto o tu base de código local. Claude construye con tus componentes reales, compara su salida con el sistema y la corrige antes de que veas el resultado.
Parte de la cobertura de terceros describe /design-sync como un puente bidireccional que también devuelve el código al lienzo. El artículo de ayuda de Anthropic documenta la dirección del sistema hacia Design, además de una afirmación general de que puedes moverte entre Design y Code manteniendo el trabajo sincronizado. Planifica en torno a la dirección documentada. Prueba la reversa en tu propio proyecto antes de confiar en ella.
2.6 Lista de verificación de configuración


## 3. Estructura del workspace

3.1 Un repositorio por proyecto
No amontones clientes en un monorepo. Las razones son aburridas y caras: transferir la propiedad al cliente, facturación separada de Actions, CLAUDE.md separado, un historial limpio para la aceptación, secretos separados.
Una convención de nombres que sobrevive seis meses:

3.2 El repositorio plantilla
Este es el mayor ahorro de tiempo de todo el pipeline. Crea un repositorio llamado agency-template, márcalo como Template Repository en settings y arranca cada proyecto nuevo así:

Qué contiene:

docs/scope.md es el archivo que todos subestiman. Cuando el cliente pide “una cosita más” en la semana cuatro, abres scope.md y discutes una orden de cambio en lugar de discutir desde la memoria.

## 4. CLAUDE.md: tu contrato con el agente

Trátalo como configuración, no como documentación. Claude Code lo carga en cada inicio y lo sigue con más rigor que tus mensajes de chat.
4.1 La jerarquía de memoria
Los archivos se cargan de arriba hacia abajo. Los archivos superiores tienen prioridad.

Claude recorre el árbol de directorios desde tu carpeta de trabajo y recoge cada CLAUDE.md que encuentra. Los archivos en subdirectorios también se descubren, pero se cargan cuando Claude lee archivos en esas carpetas, no al iniciar.
4.2 Imports

La importación desde el directorio home resuelve el problema del worktree. Un CLAUDE.local.md ignorado por git existe solo en el worktree donde lo creaste, mientras que una importación ~ te sigue a todas partes. Por eso CLAUDE.local.md está obsoleto en favor de los imports.
La primera vez que Claude Code encuentra un import externo (una ruta que resuelve fuera de tu directorio de trabajo), muestra un diálogo de aprobación con la lista de archivos.
Cuida el presupuesto: los archivos importados
```

### 上游提供的fr版本（translations.fr）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2084639360238936396.json)

```text
00:00 - Gros plan macro sur le bracelet sous une lumière rasante latérale.
00:03 - La caméra survole en douceur le cadran et les mécanismes.
00:07 - La montre émerge de l’obscurité sur une surface rocheuse rouge.

--- TWEET CITÉ ---
https://t.co/pd5OwGiSbm

--- ARTICLE LIÉ : Claude Design + Claude Code + GitHub : un pipeline de production pour le travail client ---
## 0. Pourquoi ces trois outils vont ensemble

Chacun résout un problème différent dans un projet client, et confondre leurs rôles vous coûte de l’argent.
Claude Design résout l’approbation. Votre client ne peut pas lire une spec. Il peut regarder un écran et dire « déplace ça ». Design vous donne un canvas qui produit trois directions en vingt minutes au lieu d’une seule, plus un lien que vous envoyez au client avec un accès en commentaire uniquement.
Claude Code résout l’implémentation. Il vit dans votre terminal et dans le cloud, lit tout le dépôt, écrit du code, exécute les tests et ouvre des pull requests.
GitHub résout la preuve et la passation. C’est le seul endroit qui montre ce que vous avez construit, quand, par rapport à quelle tâche, et qui a relu. Pour le client, c’est un artefact d’acceptation. Pour vous, c’est une protection quand quelqu’un demande ce que vous avez réellement fait pendant six semaines.
La raison pour laquelle la pile dépasse la somme de ses parties : le design system vit dans le dépôt, pas dans votre tête. Claude Design le lit depuis un dépôt GitHub et génère des maquettes à partir des vrais composants de votre client au lieu d’en inventer de nouveaux. Claude Code implémente ensuite ces mêmes composants. Git referme la boucle.

## 1. Carte des rôles : quoi va où


La ligne de partage à retenir : Design répond à « à quoi ça ressemble », Code répond à « comment ça marche », GitHub répond à « qui a approuvé et quand ».

## 2. Configuration initiale

Vous ne le faites qu’une fois. Chaque projet suivant le réutilise.
2.1 Claude Code
Il vous faut un abonnement payant : Pro, Max, Team, Enterprise, ou un compte Claude Console. Le niveau gratuit de claude.ai ne l’inclut pas.
L’installateur natif est devenu la voie principale début 2026. npm est désormais hérité.

Vérifiez et connectez-vous :

Si vous l’avez installé via npm en 2025, migrez. L’ancien binaire masquera le natif dans votre PATH et vous passerez un après-midi à ne pas comprendre pourquoi un correctif n’a rien changé.

Une dépendance de version compte plus tard : /design-sync est arrivé dans Claude Code v2.1.181. Si la commande est absente, lancez /update et ouvrez une nouvelle session.
2.2 GitHub CLI

Vous avez besoin de gh pour deux choses : créer des dépôts à partir d’un template, et synchroniser votre jeton dans les sessions cloud de Claude Code avec /web-setup.
2.3 Claude GitHub App et Actions
C’est ce qui vous donne @claude dans les issues et les pull requests.
Chemin rapide. Depuis le répertoire de votre projet dans le terminal :

La commande installe l’application Claude GitHub sur votre dépôt, puis propose d’ajouter le fichier de workflow et le secret de clé API. À partir de v2.1.187, vous pouvez choisir Skip for now pour n’installer que l’App, puis revenir plus tard aux étapes du workflow en relançant la même commande.
Prérequis : droits d’administration sur le dépôt. Le chemin rapide ne fonctionne que pour les utilisateurs directs de l’API Claude. Bedrock et Google Cloud nécessitent le chemin manuel.
Chemin manuel, si /install-github-app échoue :
1. Installez l’App : https://github.com/apps/claudePermissions demandées : lecture et écriture sur Contents, Issues, et Pull requests.
1. Ajoutez le secret dans Settings → Secrets and variables → Actions → New repository secret.ANTHROPIC_API_KEY si vous payez à l’appel API.
ou CLAUDE_CODE_OAUTH_TOKEN si vous êtes sur Pro ou Max et préférez ne pas créer de clé API. Générez-le localement avec claude setup-token.

1. Copiez le workflow depuis examples/claude.yml dans anthropics/claude-code-action vers votre .github/workflows/.
Testez-le : ouvrez une issue et écrivez @claude take a look at the README. Une réponse devrait apparaître en moins d’une minute.
L’échec le plus courant : les gens tapent /claude. Le déclencheur est @claude.
2.4 Claude Code sur le web

C’est ce qui vous permet de gérer trois projets client à la fois sans clouer votre ordinateur portable à l’un d’eux.
Il est disponible sur claude.ai/code, en aperçu de recherche pour les utilisateurs Pro, Max et Team, ainsi que pour les utilisateurs Enterprise disposant de sièges premium ou Chat + Claude Code.
Deux façons de donner aux sessions cloud l’accès à GitHub :

Lisez cette partie deux fois : une session cloud peut atteindre n’importe quel dépôt que le compte GitHub connecté peut voir, pas seulement ceux où l’App est installée. L’installation de l’App active les webhooks de PR pour Auto-fix. Ce n’est pas un contrôle d’accès au niveau de la session. Si vous jonglez avec plusieurs clients et avez besoin d’isolation, restreignez-la dans GitHub même via l’appartenance aux équipes et aux dépôts.
Commandes principales :

--cloud clone le remote GitHub de votre répertoire courant sur votre branche actuelle. Poussez d’abord les commits locaux. La VM clone depuis GitHub, pas depuis votre machine. L’ancienne syntaxe --remote fonctionne encore comme alias obsolète.
Si le dépôt n’a pas de remote GitHub, Claude Code le regroupe et le téléverse directement. Limites : il doit s’agir d’un dépôt git avec au moins un commit, le bundle doit rester sous 100 Mo, les fichiers non suivis sont exclus (faites d’abord git add), et une session packagée ne peut pas repousser vers un remote sans authentification GitHub configurée.
--teleport exigences : arbre de travail propre, même dépôt (pas un fork), branche de session poussée vers le remote, et même compte claude.ai.
2.5 Claude Design
Ouvrez-le sur claude.ai/design ou depuis la barre latérale de Claude Desktop. Beta sur Pro, Max, Team et Enterprise. Sur Enterprise, il est désactivé par défaut, et un administrateur l’active dans les paramètres de l’organisation.
Web et desktop uniquement. Pas de client mobile.
Pour piloter des projets de design depuis le terminal, connectez le serveur MCP de Claude Design :

Puis dans Claude Code :

Ce que fait /design-sync selon le centre d’aide officiel : il importe votre design system pour que tout ce que Claude construit dans Claude Design parte de vos composants existants. Sources : un dépôt GitHub, des fichiers de design, des uploads bruts ou votre base de code locale. Claude construit avec vos vrais composants, vérifie son résultat par rapport au système, puis le corrige avant que vous ne voyiez le résultat.
Certaines couvertures tierces décrivent /design-sync comme un pont bidirectionnel qui renvoie aussi le code sur le canvas. L’article d’aide d’Anthropic documente la direction système vers Design, ainsi qu’une affirmation générale selon laquelle vous pouvez passer de Design à Code tout en gardant le travail synchronisé. Basez-vous sur la direction documentée. Testez le sens inverse sur votre propre projet avant de vous y fier.
2.6 Checklist de configuration


## 3. Structure de l’espace de travail

3.1 Un dépôt par projet
N’entassez pas plusieurs clients dans un monorepo. Les raisons sont ennuyeuses et coûteuses : transfert de propriété au client, facturation Actions séparée, CLAUDE.md séparé, historique propre pour l’acceptation, secrets séparés.
Une nomenclature qui tient six mois :

3.2 Le dépôt template
C’est le plus gros gain de temps de tout le pipeline. Créez un dépôt appelé agency-template, marquez-le comme Template Repository dans les paramètres, puis lancez chaque nouveau projet ainsi :

Ce qu’il contient :

docs/scope.md est le fichier que tout le monde sous-estime. Quand le client demande « un petit truc en plus » en semaine quatre, vous ouvrez scope.md et discutez d’un avenant au lieu de débattre de mémoire.

## 4. CLAUDE.md : votre contrat avec l’agent

Traitez-le comme une configuration, pas comme de la documentation. Claude Code le charge à chaque lancement et le suit plus strictement que vos messages de chat.
4.1 La hiérarchie de mémoire
Les fichiers se chargent de haut en bas. Les fichiers plus hauts ont priorité.

Claude remonte l’arborescence depuis votre dossier de travail et récupère chaque CLAUDE.md qu’il trouve. Les fichiers dans les sous-répertoires sont aussi détectés, mais ils se chargent quand Claude lit des fichiers dans ces dossiers, pas au lancement.
4.2 Imports

L
```

### 上游提供的日本語版本（translations.ja）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2084639360238936396.json)

```text
00:00 - 斜めのサイドライトの下でストラップを捉えたマクロショット。
00:03 - カメラがダイヤルと機構の上を滑らかに飛び越えていく。
00:07 - 赤い岩肌の上で、時計が暗闇から姿を現す。

--- 引用ツイート ---
https://t.co/pd5OwGiSbm

--- 関連記事: Claude Design + Claude Code + GitHub: クライアント案件のための本番パイプライン ---
## 0. なぜこの3つのツールは一緒に使うべきなのか

それぞれがクライアント案件の中で別々の問題を解決します。役割を混同すると、コストがかさみます。
Claude Design は承認を解決します。クライアントは仕様書を読めません。画面を見て「ここを動かして」と言うことはできます。Design なら、20分で3つの方向性を出せるキャンバスを用意でき、さらにコメント専用アクセスのリンクをクライアントに送れます。
Claude Code は実装を解決します。ターミナルとクラウド上で動き、リポジトリ全体を読み、コードを書き、テストを実行し、プルリクエストを開きます。
GitHub は証跡と引き渡しを解決します。何を、いつ、どのタスクに対して作ったのか、誰がレビューしたのかを示せる唯一の場所です。クライアントにとっては受け入れ証跡です。あなたにとっては、6週間後に「実際に何をやったの？」と聞かれたときの防御になります。
このスタックが個々の合計を上回る理由は、デザインシステムが頭の中ではなくリポジトリにあるからです。Claude Design は GitHub リポジトリからそれを読み込み、ゼロから新しいものを作るのではなく、クライアントの実際のコンポーネントからモックアップを生成します。続いて Claude Code が同じコンポーネントを実装します。Git がそのループを閉じます。

## 1. 役割マップ: 何をどこでやるか


覚えておくべき境界線はこれです。Design は「見た目はどうか」に答え、Code は「どう動くか」に答え、GitHub は「誰がいつ承認したか」に答えます。

## 2. 初回セットアップ

これは一度だけ行います。以後のプロジェクトでは再利用します。
2.1 Claude Code
必要なのは有料プランです: Pro、Max、Team、Enterprise、または Claude Console アカウント。無料の claude.ai には含まれていません。
ネイティブインストーラーが 2026 年初頭に主要な導入方法になりました。npm は現在では旧方式です。

確認してサインインします:

2025 年に npm 経由で入れたなら、移行してください。古いバイナリが PATH 上でネイティブ版を上書きし、修正したはずなのに何も変わらない理由が分からず、午後を無駄にすることになります。

後で重要になるバージョン依存があります。/design-sync は Claude Code v2.1.181 で追加されました。コマンドが見つからない場合は /update を実行し、新しいセッションを開いてください。
2.2 GitHub CLI

gh が必要なのは2つです。テンプレートからリポジトリを作成することと、/web-setup を使って Claude Code のクラウドセッションにトークンを同期することです。
2.3 Claude GitHub App と Actions
これにより、issue や pull request 内で @claude が使えるようになります。
最短手順。ターミナルでプロジェクトディレクトリから実行します:

このコマンドはリポジトリに Claude GitHub App をインストールし、その後ワークフローファイルと API キーの secret を追加するかどうかを案内します。v2.1.187 時点では、Skip for now を選んで App のみをインストールし、後で同じコマンドを再実行してワークフロー手順に戻ることができます。
要件: リポジトリの管理者権限。最短手順は Claude API を直接使うユーザーにのみ有効です。Bedrock と Google Cloud では手動手順が必要です。
/install-github-app が失敗した場合の手動手順:
1. App をインストール: https://github.com/apps/claudePermissions が要求する権限: Contents の read/write、Issues の read/write、Pull requests の read/write。
1. secret を Settings → Secrets and variables → Actions → New repository secret に追加。従量課金なら ANTHROPIC_API_KEY。
または、Pro か Max を使っていて API キーを作りたくないなら CLAUDE_CODE_OAUTH_TOKEN。claude setup-token でローカル生成します。

1. anthropics/claude-code-action の examples/claude.yml からワークフローを .github/workflows/ にコピーします。
テスト方法: issue を開いて @claude take a look at the README. と書きます。1分以内に応答が返るはずです。
最もよくある失敗は、/claude と入力してしまうことです。トリガーは @claude です。
2.4 Web 上の Claude Code

これにより、ノートPCを1台の案件に固定せずに、3つのクライアント案件を同時に回せます。
claude.ai/code で利用でき、Pro、Max、Team、さらに Enterprise のうち premium または Chat + Claude Code の席を持つユーザー向けの research preview です。
クラウドセッションに GitHub へのアクセスを与える方法は2つあります:

この部分は2回読んでください。クラウドセッションは、接続された GitHub アカウントが見える任意のリポジトリにアクセスできます。App がインストールされているものだけではありません。App をインストールすると Auto-fix 用の PR webhook が有効になります。セッション単位のアクセス制御ではありません。複数のクライアントを扱い、分離が必要なら、GitHub 側でチームとリポジトリのメンバーシップを使って制限してください。
主要コマンド:

--cloud は、現在のディレクトリの GitHub リモートを現在のブランチでクローンします。ローカルのコミットは先に push してください。VM はあなたのマシンではなく GitHub からクローンします。古い --remote という表記も非推奨の別名としてまだ使えます。
リポジトリに GitHub リモートがない場合、Claude Code はそれを bundle して直接アップロードします。制限: 少なくとも1つのコミットがある git リポジトリであること、bundle が 100 MB 未満であること、未追跡ファイルは除外されること（先に git add を実行）、そして GitHub 認証が設定されていないと bundle したセッションからリモートへ push できないこと。
--teleport の要件: 作業ツリーがクリーンであること、同じリポジトリであること（fork ではない）、セッションブランチがリモートに push 済みであること、そして同じ claude.ai アカウントであること。
2.5 Claude Design
claude.ai/design で開くか、Claude Desktop のサイドバーから開きます。Pro、Max、Team、Enterprise で beta 提供。Enterprise ではデフォルトでオフになっており、管理者が Organization settings で有効化します。
Web とデスクトップのみ。モバイルクライアントはありません。
ターミナルからデザインプロジェクトを操作するには、Claude Design MCP サーバーに接続します:

その後、Claude Code 内で:

公式ヘルプセンターによる /design-sync の動作: Claude Design で Claude が作るものがすべて、既存のコンポーネントから始まるように、デザインシステムを取り込みます。
```

### 上游提供的한국어版本（translations.ko）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2084639360238936396.json)

```text
00:00 - 옆에서 스치는 측광 아래 스트랩의 매크로 샷.
00:03 - 카메라가 다이얼과 메커니즘 위를 부드럽게 날아간다.
00:07 - 시계가 붉은 바위 표면 위 어둠 속에서 모습을 드러낸다.

--- 인용된 트윗 ---
https://t.co/pd5OwGiSbm

--- 링크된 기사: Claude Design + Claude Code + GitHub: 클라이언트 작업을 위한 프로덕션 파이프라인 ---
## 0. 왜 이 세 도구는 함께 가야 하는가

각 도구는 클라이언트 프로젝트에서 서로 다른 문제를 해결하며, 역할을 혼동하면 비용이 든다.
Claude Design은 승인 문제를 해결한다. 클라이언트는 스펙을 읽지 못한다. 대신 화면을 보고 “저걸 옮겨 주세요”라고 말할 수 있다. Design은 20분 만에 한 가지가 아니라 세 가지 방향을 만들어 내는 캔버스를 제공하고, 클라이언트에게 보낼 수 있는 댓글 전용 접근 링크도 제공한다.
Claude Code는 구현을 해결한다. 터미널과 클라우드에서 동작하며, 저장소 전체를 읽고, 코드를 작성하고, 테스트를 실행하고, pull request를 연다.
GitHub는 증빙과 인수인계를 해결한다. 무엇을, 언제, 어떤 작업에 대해, 누가 검토했는지를 보여 주는 유일한 장소다. 클라이언트에게는 승인 산출물이고, 당신에게는 “6주 동안 실제로 뭘 했냐”는 질문이 나왔을 때의 방어 수단이다.
이 스택이 각 도구의 합보다 강한 이유는 디자인 시스템이 머릿속이 아니라 저장소에 있기 때문이다. Claude Design은 GitHub 저장소에서 이를 읽어 클라이언트의 실제 컴포넌트로 목업을 만든다. 새로운 것을 지어내지 않는다. 그다음 Claude Code가 같은 컴포넌트를 구현한다. Git이 이 루프를 닫는다.

## 1. 역할 맵: 무엇을 어디에 둘 것인가


외워 둘 만한 구분선은 이것이다. Design은 “어떻게 보이는가”에 답하고, Code는 “어떻게 동작하는가”에 답하며, GitHub는 “누가 언제 승인했는가”에 답한다.

## 2. 한 번만 하는 설정

한 번만 하면 된다. 이후 프로젝트는 모두 재사용한다.
2.1 Claude Code
유료 플랜이 필요하다: Pro, Max, Team, Enterprise, 또는 Claude Console 계정. 무료 claude.ai 등급에는 포함되지 않는다.
네이티브 설치 프로그램이 2026년 초에 기본 경로가 되었다. 이제 npm은 레거시다.

확인하고 로그인한다:

2025년에 npm으로 설치했다면 마이그레이션해야 한다. 예전 바이너리가 PATH에서 네이티브 버전을 가려 버려, 수정이 왜 먹히지 않는지 한참 헷갈리게 될 수 있다.

나중에 중요한 버전 의존성 하나: /design-sync는 Claude Code v2.1.181에서 추가되었다. 명령이 없으면 /update를 실행하고 새 세션을 연다.
2.2 GitHub CLI

gh는 두 가지 용도로 필요하다: 템플릿에서 저장소를 생성하는 것, 그리고 /web-setup으로 토큰을 Claude Code 클라우드 세션에 동기화하는 것이다.
2.3 Claude GitHub App과 Actions
이것이 이슈와 pull request 안에서 @claude를 사용할 수 있게 해 준다.
빠른 경로. 터미널에서 프로젝트 디렉터리로 이동해:

이 명령은 저장소에 Claude GitHub App을 설치한 뒤, 워크플로 파일과 API 키 시크릿을 추가할지 묻는다. v2.1.187부터는 지금은 건너뛰기를 선택해 App만 설치하고, 나중에 같은 명령을 다시 실행해 워크플로 단계로 돌아올 수 있다.
요구 사항: 저장소 관리자 권한. 빠른 경로는 직접 Claude API 사용자에게만 동작한다. Bedrock과 Google Cloud는 수동 경로가 필요하다.
/install-github-app이 실패하면 수동 경로를 사용한다:
1. App 설치: https://github.com/apps/claudePermissions 요청: Contents 읽기/쓰기, Issues 읽기/쓰기, Pull requests 읽기/쓰기.
1. 유료 API 호출 방식이라면 Settings → Secrets and variables → Actions → New repository secret 아래에 ANTHROPIC_API_KEY를 추가한다.
또는 Pro나 Max를 사용 중이고 API 키를 따로 만들고 싶지 않다면 CLAUDE_CODE_OAUTH_TOKEN을 사용한다. claude setup-token으로 로컬에서 생성한다.

1. anthropics/claude-code-action의 examples/claude.yml에서 워크플로를 복사해 .github/workflows/에 넣는다.
테스트: 이슈를 열고 @claude README를 살펴봐라고 적는다. 1분 안에 응답이 와야 한다.
가장 흔한 실패: 사람들이 /claude를 입력한다. 트리거는 @claude다.
2.4 웹에서 Claude Code
이것이 노트북을 한 프로젝트에 묶어 두지 않고도 클라이언트 프로젝트 세 개를 동시에 돌릴 수 있게 해 준다.
claude.ai/code에서 사용할 수 있으며, Pro, Max, Team, 그리고 Enterprise 사용자 중 premium 또는 Chat + Claude Code 좌석이 있는 사용자는 연구 프리뷰로 이용할 수 있다.
클라우드 세션에 GitHub 접근 권한을 주는 방법은 두 가지다:

이 부분은 두 번 읽어라: 클라우드 세션은 연결된 GitHub 계정이 볼 수 있는 모든 저장소에 접근할 수 있다. App이 설치된 저장소만이 아니다. App 설치는 Auto-fix용 PR webhook을 활성화할 뿐이다. 세션 수준의 접근 제어가 아니다. 여러 클라이언트를 동시에 다루며 격리가 필요하다면, GitHub의 팀 및 저장소 멤버십으로 직접 제한하라.
핵심 명령:

--cloud는 현재 디렉터리의 GitHub 원격 저장소를 현재 브랜치 기준으로 복제한다. 로컬 커밋을 먼저 푸시하라. VM은 내 컴퓨터가 아니라 GitHub에서 복제한다. 예전 --remote 표기도 deprecated alias로 여전히 동작한다.
저장소에 GitHub 원격이 없으면 Claude Code가 이를 번들로 묶어 직접 업로드한다. 제한 사항: 최소 한 번의 커밋이 있는 git 저장소여야 하고, 번들은 100 MB 미만이어야 하며, 추적되지 않은 파일은 제외된다(먼저 git add를 실행). 또한 번들 세션은 GitHub 인증이 설정되어 있지 않으면 원격으로 다시 푸시할 수 없다.
--teleport 요구 사항: 작업 트리가 깨끗해야 하고, 같은 저장소여야 하며(fork가 아니어야 함), 세션 브랜치가 원격에 푸시되어 있어야 하고, 같은 claude.ai 계정이어야 한다.
2.5 Claude Design
claude.ai/design에서 열거나 Claude Desktop 사이드바에서 연다. Pro, Max, Team, Enterprise에서 베타 제공. Enterprise에서는 기본적으로 꺼져 있으며, 관리자가 Organization settings에서 활성화한다.
웹과 데스크톱에서만 사용 가능. 모바일 클라이언트는 없다.
터미널에서 디자인 프로젝트를 구동하려면 Claude Design MCP 서버를 연결한다:

그다음 Claude Code 안에서:

공식 도움말 센터에 따르면 /design-sync는 디자인 시스템을 가져와 Claude Design에서 Claude가 만드는 모든 것이 기존 컴포넌트에서 시작되도록 한다. 소스는 GitHub 저장소, 디자인 파일, 원본 업로드, 또는 로컬 코드베이스다. Claude는 실제 컴포넌트로 빌드하고, 결과를 시스템과 대조한 뒤, 결과를 보기 전에 수정한다.
일부 서드파티 자료는 /design-sync를 코드도 캔버스로 다시 밀어 넣는 양방향 브리지로 설명한다. Anthropic의 도움말 문서는 시스템에서 Design으로 들어가는 방향과, 작업을 동기화한 채 Design과 Code 사이를 오갈 수 있다는 일반적 설명을 담고 있다. 문서화된 방향을 기준으로 계획하라. 역방향은 의존하기 전에 자신의 프로젝트에서 직접 테스트하라.
2.6 설정 체크리스트


## 3. 작업공간 구조

3.1 프로젝트당 저장소 하나
클라이언트를 monorepo에 몰아넣지 마라. 이유는 지루하지만 비용이 든다: 클라이언트에게 소유권 이전, Actions 비용 분리, 별도 CLAUDE.md, 승인용 깔끔한 히스토리, 별도 시크릿.
6개월 뒤에도 살아남는 이름 규칙
```

### 上游提供的pt版本（translations.pt）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2084639360238936396.json)

```text
00:00 - Close-up macro da pulseira sob luz lateral rasante.
00:03 - A câmera voa suavemente sobre o mostrador e os mecanismos.
00:07 - O relógio emerge da escuridão sobre uma superfície rochosa vermelha.

--- TWEET CITADO ---
https://t.co/pd5OwGiSbm

--- ARTIGO VINCULADO: Claude Design + Claude Code + GitHub: Um pipeline de produção para trabalho com clientes ---
## 0. Por que as três ferramentas pertencem juntas

Cada uma resolve um problema diferente em um projeto de cliente, e confundir seus papéis custa dinheiro.

Claude Design resolve aprovação. Seu cliente não consegue ler uma especificação. Ele consegue olhar para uma tela e dizer “mude isso”. O Design oferece uma tela de trabalho que produz três direções em vinte minutos em vez de uma, além de um link que você envia ao cliente com acesso apenas para comentários.

Claude Code resolve implementação. Ele vive no seu terminal e na nuvem, lê o repositório inteiro, escreve código, executa testes e abre pull requests.

GitHub resolve prova e handoff. É o único lugar que mostra o que você construiu, quando, em relação a qual tarefa, e quem revisou. Para o cliente, é um artefato de aceite. Para você, é proteção quando alguém pergunta o que você realmente fez durante seis semanas.

O motivo de a pilha superar a soma das partes: o sistema de design vive no repositório, não na sua cabeça. O Claude Design lê isso de um repositório GitHub e cria mockups com os componentes reais do seu cliente, em vez de inventar novos. O Claude Code então implementa esses mesmos componentes. O Git fecha o ciclo.

## 1. Mapa de papéis: o que vai para onde


A linha divisória que vale memorizar: Design responde “como parece”, Code responde “como funciona”, GitHub responde “quem aprovou e quando”.

## 2. Configuração única

Você faz isso uma vez. Cada projeto subsequente reutiliza.
2.1 Claude Code
Você precisa de um plano pago: Pro, Max, Team, Enterprise, ou uma conta do Claude Console. O nível gratuito do claude.ai não inclui isso.

O instalador nativo se tornou o caminho principal no início de 2026. npm agora é legado.

Verifique e faça login:

Se você instalou via npm lá em 2025, migre. O binário antigo vai sobrepor o nativo no seu PATH e você vai perder uma tarde confuso sem entender por que uma correção não fez nada.

Uma dependência de versão importa mais tarde: /design-sync chegou no Claude Code v2.1.181. Se o comando não existir, rode /update e abra uma sessão nova.
2.2 GitHub CLI

Você precisa do gh para duas coisas: criar repositórios a partir de um template e sincronizar seu token em sessões cloud do Claude Code com /web-setup.
2.3 Claude GitHub App e Actions
É isso que coloca @claude dentro de issues e pull requests.
Caminho rápido. A partir do diretório do seu projeto no terminal:

O comando instala o Claude GitHub App no seu repositório e depois oferece adicionar o arquivo de workflow e o segredo da chave de API. A partir da v2.1.187, você pode escolher Skip for now para instalar apenas o App e voltar às etapas do workflow depois executando o mesmo comando novamente.
Requisitos: permissões de admin no repositório. O caminho rápido funciona apenas para usuários diretos da API Claude. Bedrock e Google Cloud precisam do caminho manual.
Caminho manual, se /install-github-app falhar:
1. Instale o App: https://github.com/apps/claudePermissões solicitadas: Contents read and write, Issues read and write, Pull requests read and write.
1. Adicione o segredo em Settings → Secrets and variables → Actions → New repository secret.ANTHROPIC_API_KEY se você paga por chamada de API.
ou CLAUDE_CODE_OAUTH_TOKEN se você usa Pro ou Max e prefere não criar uma chave de API. Gere-o localmente com claude setup-token.

1. Copie o workflow de examples/claude.yml em anthropics/claude-code-action para .github/workflows/.
Teste: abra uma issue e escreva @claude take a look at the README. Uma resposta deve aparecer em até um minuto.
A falha mais comum: as pessoas digitam /claude. O gatilho é @claude.
2.4 Claude Code na web

É isso que permite rodar três projetos de cliente ao mesmo tempo sem prender seu laptop a um deles.
Ele fica em claude.ai/code, em prévia de pesquisa para usuários Pro, Max e Team, além de usuários Enterprise com assentos premium ou Chat + Claude Code.
Duas formas de dar acesso ao GitHub para sessões cloud:

Leia esta parte duas vezes: uma sessão cloud pode acessar qualquer repositório que a conta GitHub conectada consiga ver, não apenas aqueles em que o App está instalado. Instalar o App habilita webhooks de PR para Auto-fix. Não é um controle de acesso no nível da sessão. Se você gerencia vários clientes e precisa de isolamento, restrinja isso no próprio GitHub por meio de associação a equipes e repositórios.
Comandos principais:

--cloud clona o remoto GitHub do seu diretório atual na sua branch atual. Faça push dos commits locais primeiro. A VM clona do GitHub, não da sua máquina. A sintaxe antiga --remote ainda funciona como alias obsoleto.
Se o repositório não tiver remoto GitHub, o Claude Code empacota e envia diretamente. Limites: precisa ser um repositório git com pelo menos um commit, o bundle deve ficar abaixo de 100 MB, arquivos não rastreados são excluídos (rode git add primeiro), e uma sessão empacotada não consegue fazer push de volta para um remoto sem autenticação GitHub configurada.
--teleport requisitos: working tree limpa, mesmo repositório (não um fork), a branch da sessão enviada para o remoto, e a mesma conta claude.ai.
2.5 Claude Design
Abra em claude.ai/design ou pela barra lateral do Claude Desktop. Beta em Pro, Max, Team e Enterprise. No Enterprise vem desativado por padrão, e um admin habilita em Organization settings.
Apenas web e desktop. Sem cliente mobile.
Para conduzir projetos de design pelo terminal, conecte o servidor MCP do Claude Design:

Depois, dentro do Claude Code:

O que /design-sync faz, segundo o help center oficial: ele puxa seu sistema de design para que tudo o que o Claude constrói no Claude Design comece a partir dos seus componentes existentes. Fontes: um repositório GitHub, arquivos de design, uploads brutos ou sua base de código local. O Claude constrói com seus componentes reais, verifica a saída contra o sistema e corrige antes de você ver o resultado.
Algumas coberturas de terceiros descrevem /design-sync como uma ponte bidirecional que também envia código de volta para a tela. O artigo de ajuda da Anthropic documenta a direção do sistema para o Design, além de uma afirmação geral de que você pode alternar entre Design e Code mantendo o trabalho sincronizado. Planeje com base na direção documentada. Teste o sentido inverso no seu próprio projeto antes de confiar nele.
2.6 Checklist de configuração


## 3. Estrutura do workspace

3.1 Um repositório por projeto
Não empilhe clientes em um monorepo. Os motivos são chatos e caros: transferência de propriedade para o cliente, cobrança separada do Actions, CLAUDE.md separado, histórico limpo para aceite, segredos separados.
Nomeação que sobrevive seis meses:

3.2 O repositório template
Este é o maior ganho de tempo em todo o pipeline. Crie um repositório chamado agency-template, marque-o como Template Repository nas configurações e inicie todo projeto novo assim:

O que fica dentro:

docs/scope.md é o arquivo que todo mundo subestima. Quando o cliente pede “uma coisinha extra” na quarta semana, você abre scope.md e discute uma ordem de mudança em vez de argumentar pela memória.

## 4. CLAUDE.md: seu contrato com o agente

Trate isso como configuração, não documentação. O Claude Code carrega isso a cada inicialização e segue com mais rigor do que suas mensagens de chat.
4.1 A hierarquia de memória
Os arquivos são carregados de cima para baixo. Arquivos mais altos têm precedência.

O Claude percorre a árvore de diretórios a partir da sua pasta de trabalho e coleta todo CLAUDE.md que encontrar. Arquivos em subdiretórios também são descobertos, mas são carregados quando o Claude lê arquivos nessas pastas, não na inicialização.
4.2 Imports

O import do diretório home resolve o problema de worktree. Um CLAUDE.local.md ignorado pelo git existe apenas no worktree em que você o criou, enquanto um import de ~ acompanha você em qualquer lugar. É por isso que CLAUDE.local.md foi descontinuado em favor de imports.
Na primeira vez que o Claude Code encontra um import externo (um caminho que resolve fora do seu diretório de trabalho), ele mostra uma caixa de aprovação listando os arquivos.
Fique de olho no orçamento:
```

### 上游提供的中文版本（translations.zh）

[位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2084639360238936396.json)

```text
00:00 - 在掠过的侧光下拍摄表带的微距镜头。
00:03 - 镜头平滑掠过表盘和机械结构。
00:07 - 手表从黑暗中浮现，置于红色岩石表面上。

--- 引用的推文 ---
https://t.co/pd5OwGiSbm

--- 链接文章：Claude Design + Claude Code + GitHub：面向客户项目的生产流水线 ---
## 0. 为什么这三个工具要一起用

它们各自解决客户项目中的不同问题，混淆它们的职责会让你亏钱。
Claude Design 解决的是审批问题。你的客户读不懂规格说明，但他们能看屏幕，然后说“把那个挪一下”。Design 给你一个画布，二十分钟就能产出三个方向，而不是一个；另外还会给你一个链接，你可以发给客户，并设置为仅可评论访问。
Claude Code 解决的是实现问题。它运行在你的终端和云端里，能读取整个仓库、编写代码、运行测试，并发起 pull request。
GitHub 解决的是证明和交接问题。它是唯一能展示你做了什么、什么时候做的、对应哪个任务、谁审阅过的地方。对客户来说，它是验收凭证；对你来说，当有人问你六周到底做了什么时，它能保护你。
这个技术栈之所以强于各部分之和，原因在于：设计系统存在于仓库里，而不是你的脑子里。Claude Design 会从 GitHub 仓库读取它，并基于客户真实组件生成 mockup，而不是凭空造新组件。随后 Claude Code 再实现这些相同的组件。Git 把整个闭环收住。

## 1. 角色地图：什么放在哪里


值得记住的分界线：Design 回答“长什么样”，Code 回答“怎么工作”，GitHub 回答“谁在什么时候批准了它”。

## 2. 一次性设置

这一步只做一次。之后每个项目都复用。
2.1 Claude Code
你需要付费方案：Pro、Max、Team、Enterprise，或者一个 Claude Console 账号。免费的 claude.ai 层级不包含它。
原生安装器在 2026 年初成为主路径。npm 现在是旧方案了。

验证并登录：

如果你在 2025 年是通过 npm 安装的，请迁移。旧二进制会在 PATH 上遮蔽原生版本，你会花一个下午困惑为什么修复毫无作用。

后面有一个版本依赖很重要：/design-sync 是在 Claude Code v2.1.181 中加入的。如果命令不存在，运行 /update 并打开一个新会话。
2.2 GitHub CLI

你需要 gh 来做两件事：从模板创建仓库，以及通过 /web-setup 将你的 token 同步到 Claude Code 云会话中。
2.3 Claude GitHub App 和 Actions
这会让你在 issues 和 pull requests 里使用 @claude。
快速路径。从终端里的项目目录执行：

该命令会把 Claude GitHub App 安装到你的仓库，然后询问是否添加 workflow 文件和 API key secret。自 v2.1.187 起，你可以选择“先跳过”，只安装 App，之后再运行同一命令补回 workflow 步骤。
要求：仓库管理员权限。快速路径仅适用于直接使用 Claude API 的用户。Bedrock 和 Google Cloud 需要手动路径。
如果 /install-github-app 失败，使用手动路径：
1. 安装 App：https://github.com/apps/claudePermissions 它请求的权限：Contents 读写、Issues 读写、Pull requests 读写。
1. 在 Settings → Secrets and variables → Actions → New repository secret 下添加 secret。如果你按 API 调用量付费，则使用 ANTHROPIC_API_KEY。
或如果你使用 Pro 或 Max，并且不想创建 API key，则使用 CLAUDE_CODE_OAUTH_TOKEN。可通过 claude setup-token 在本地生成。

1. 将 anthropics/claude-code-action 中 examples/claude.yml 的 workflow 复制到你的 .github/workflows/ 目录。
测试一下：打开一个 issue，输入 @claude take a look at the README。应该会在一分钟内出现回复。
最常见的失败原因：有人输入了 /claude。触发器是 @claude。
2.4 Web 版 Claude Code
这让你可以同时跑三个客户项目，而不用把笔记本电脑绑死在其中一个上。
它位于 claude.ai/code，处于研究预览阶段，适用于 Pro、Max、Team，以及拥有 premium 或 Chat + Claude Code seat 的 Enterprise 用户。
让云会话访问 GitHub 有两种方式：

这部分请读两遍：云会话可以访问连接的 GitHub 账号能看到的任何仓库，不仅仅是安装了 App 的那些。安装 App 只是为 Auto-fix 启用 PR webhook，它不是会话级访问控制。如果你同时处理多个客户并需要隔离，请在 GitHub 本身通过团队和仓库成员资格来限制。
核心命令：

--cloud 会克隆你当前目录在当前分支上的 GitHub 远程仓库。先推送本地提交。VM 是从 GitHub 克隆，而不是从你的机器克隆。旧的 --remote 写法仍可作为弃用别名使用。
如果仓库没有 GitHub remote，Claude Code 会把它打包并直接上传。限制：必须是至少有一个 commit 的 git 仓库，bundle 必须小于 100 MB，未跟踪文件会被排除（先运行 git add），并且打包后的会话在未配置 GitHub 认证时无法再推回远程仓库。
--teleport 的要求：工作树干净、同一个仓库（不是 fork）、会话分支已推送到远程，以及相同的 claude.ai 账号。
2.5 Claude Design
在 claude.ai/design 打开，或从 Claude Desktop 侧边栏进入。Pro、Max、Team 和 Enterprise 可用，处于 Beta。Enterprise 默认关闭，需要管理员在 Organization settings 中启用。
仅支持 Web 和桌面端。不支持移动端。
要从终端驱动设计项目，请连接 Claude Design MCP server：

然后在 Claude Code 中：

官方帮助中心对 /design-sync 的说明是：它会把你的设计系统拉进来，这样 Claude 在 Claude Design 中构建的一切都从你现有的组件开始。来源可以是 GitHub 仓库、设计文件、原始上传内容，或你的本地代码库。Claude 会用你的真实组件进行构建，检查输出是否符合系统，并在你看到结果之前先修正它。
一些第三方报道把 /design-sync 描述成一个双向桥梁，也会把代码推回画布。Anthropic 的帮助文章记录的是“从系统到 Design”的方向，以及一个更笼统的说法：你可以在 Design 和 Code 之间移动，同时保持工作同步。请按文档中明确说明的方向来规划。在依赖反向同步之前，先在你自己的项目上测试。
2.6 设置清单


## 3. 工作区结构

3.1 一个项目一个仓库
不要把多个客户堆进一个 monorepo。原因很无聊，但很贵：向客户转移所有权、分别计费 Actions、分别维护 CLAUDE.md、便于验收的干净历史、分开的 secrets。
能撑过六个月的命名方式：

3.2 模板仓库
这是整个流水线里最省时间的一步。建一个叫 agency-template 的仓库，在设置里标记为 Template Repository，然后每个新项目都这样启动：

里面放什么：

docs/scope.md 是最容易被低估的文件。到了第四周，客户说“再加一个小东西”时，你打开 scope.md，讨论变更单，而不是靠记忆争论。

## 4. CLAUDE.md：你与 agent 的合同

把它当作配置，而不是文档。Claude Code 每次启动都会加载它，并且遵循得比你的聊天消息更严格。
4.1 记忆层级
文件按自上而下加载。更高层级的文件优先。

Claude 会从你的工作目录开始沿目录树向上查找，拾取它找到的每一个 CLAUDE.md。子目录中的文件也会被发现，但只有当 Claude 读取那些目录中的文件时才会加载，而不是在启动时加载。
4.2 导入

家目录导入解决了 worktree 问题。一个被 gitignore 的 CLAUDE.local.md 只存在于你创建它的那个 worktree 中，而一个 ~ 导入则会跟着你到处走。这就是为什么 CLAUDE.local.md 已被导入机制取代。
Claude Code 第一次遇到外部导入（解析到工作目录之外的路径）时，会显示一个审批对话框，
```

## 出处与许可

- 原作者：[Quri](https://x.com/qurisage) · 原帖：<https://x.com/qurisage/status/2084639360238936396>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[renoise-ai/awesome-seedance-prompts](https://github.com/renoise-ai/awesome-seedance-prompts)，[原文位置](https://github.com/renoise-ai/awesome-seedance-prompts/blob/904b6caffa21c2b114bb93e1bd0e37ba80b3dd10/data/prompts/2084639360238936396.json)
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
