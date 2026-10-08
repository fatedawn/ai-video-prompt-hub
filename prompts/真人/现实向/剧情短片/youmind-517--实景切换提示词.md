---
id: "youmind-517"
title: "实景切换提示词"
title_en: "Live-Action Scenery Switching Prompt"
model: "Seedance 2.0"
language: "ja"
medium: "真人"
direction: "现实向"
genre: "剧情短片"
art_style: null
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/a02e1ecd5240f1487071709d3271eae749282023/README_ja-JP.md#L2108"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "Muse｜AI音楽＆AI動画"
original_author_url: "https://x.com/projectmuse_ai"
original_post_url: "https://x.com/projectmuse_ai/status/2024479011251044437"
published: "Feb 19, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=517"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# 实景切换提示词

*Live-Action Scenery Switching Prompt*

> 一个用于超高速指标蒙太奇的提示，每 0.1 秒切换一次实景画面，并按顺序指定地点。每个镜头都必须是带有摄像机运动的视频。

## 提示词（日本語）

```text
全体構成：
  - 以下のシーケンスに従って、0.1 秒ごとに実写風景が切り替わる超高速メトリックモンタージュ。
  - 各カットは静止画ではなく動画で、カメラワークを含むこと。
  - シーケンス：
    - 0.0秒：東京タワー
    - 0.1秒：渋谷スクランブル交差点
    - 0.2秒：浅草寺
    - 0.3秒：皇居
    - 0.4秒：歌舞伎座
    - 0.5秒：東京ドーム
    - 0.6秒：上野動物園
    - 0.7秒：六本木ヒルズ
    - 0.8秒：東京駅
    - 0.9秒：秋葉原
    - 1.0秒：築地市場
    - 1.1秒：靖国神社
    - 1.2秒：新宿御苑
    - 1.3秒：浜離宮恩賜庭園
    - 1.4秒：迎賓館赤坂離宮
    - 1.5秒：国会議事堂
    - 1.6秒：東京国立博物館
    - 1.7秒：国立科学博物館
    - 1.8秒：東京都庁
    - 1.9秒：自由の女神像（お台場）
    - 2.0秒：富士山
    - 2.1秒：札幌時計台
    - 2.2秒：函館山
    - 2.3秒：仙台城跡
    - 2.4秒：松島
    - 2.5秒：日光東照宮
    - 2.6秒：兼六園
    - 2.7秒：永平寺
    - 2.8秒：善光寺
    - 2.9秒：富士急ハイランド
    - 3.0秒：熱海温泉
    - 3.1秒：伊勢神宮
    - 3.2秒：東大寺
    - 3.3秒：姫路城
    - 3.4秒：厳島神社
    - 3.5秒：広島平和記念公園
    - 3.6秒：道後温泉
    - 3.7秒：太宰府天満宮
    - 3.8秒：熊本城
    - 3.9秒：桜島
    - 4.0秒：首里城
    - 4.1秒：ニューヨーク タイムズスクエア
    - 4.2秒：ニューヨーク 自由の女神像
    - 4.3秒：ニューヨーク セントラルパーク
    - 4.4秒：ロンドン ビッグベン
    - 4.5秒：ロンドン ロンドン塔
    - 4.6秒：ロンドン バッキンガム宮殿
    - 4.7秒：パリ エッフェル塔
    - 4.8秒：パリ ルーブル美術館
    - 4.9秒：パリ 凱旋門
    - 5.0秒：ローマ コロッセオ
    - 5.1秒：ローマ トレヴィの泉
    - 5.2秒：ローマ バチカン市国
    - 5.3秒：北京 万里の長城
    - 5.4秒：北京 紫禁城
    - 5.5秒：北京 天安門広場
    - 5.6秒：シドニー オペラハウス
    - 5.7秒：シドニー ハーバーブリッジ
    - 5.8秒：シドニー ボンダイビーチ
    - 5.9秒：リオデジャネイロ キリスト像
    - 6.0秒：リオデジャネイロ コパカバーナビーチ
    - 6.1秒：リオデジャネイロ ポン・ヂ・アスーカル
    - 6.2秒：カイロ ギザのピラミッド
    - 6.3秒：カイロ スフィンクス
    - 6.4秒：カイロ エジプト考古学博物館
    - 6.5秒：イスタンブール ハギア・ソフィア
    - 6.6秒：イスタンブール ブルーモスク
    - 6.7秒：イスタンブール トプカプ宮殿
    - 6.8秒：モスクワ 赤の広場
    - 6.9秒：モスクワ 聖ワシリイ大聖堂
    - 7.0秒：モスクワ クレムリン
    - 7.1秒：ベルリン ブランデンブルク門
    - 7.2秒：ベルリン ベルリンの壁
    - 7.3秒：ベルリン ドイツ連邦議会議事堂
    - 7.4秒：アムステルダム ゴッホ美術館
    - 7.5秒：アムステルダム アムステルダム国立美術館
    - 7.6秒：アムステルダム アンネ・フランクの家
    - 7.7秒：バンコク ワット・アルン
    - 7.8秒：バンコク ワット・ポー
    - 7.9秒：バンコク 王宮
    - 8.0秒：ソウル 景福宮
    - 8.1秒：ソウル N ソウルタワー
    - 8.2秒：ソウル 明洞
    - 8.3秒：台北 台北 101
    - 8.4秒：台北 国立故宮博物院
    - 8.5秒：台北 龍山寺
    - 8.6秒：ドバイ ブルジュ・ハリファ
    - 8.7秒：ドバイ ブルジュ・アル・アラブ
    - 8.8秒：ドバイ ドバイ・モール
    - 8.9秒：シンガポール マリーナベイ・サンズ
    - 9.0秒：シンガポール マーライオン公園
    - 9.1秒：シンガポール ガーデンズ・バイ・ザ・ベイ
    - 9.2秒：香港 ビクトリア・ピーク
    - 9.3秒：香港 香港ディズニーランド
    - 9.4秒：香港 尖沙咀
    - 9.5秒：ラスベガス ベラージオの噴水
    - 9.6秒：ラスベガス ストラトスフィア・タワー
    - 9.7秒：ラスベガス グランドキャニオン
    - 9.8秒：ロサンゼルス ハリウッドサイン
    - 9.9秒：ロサンゼルス グリフィス天文台
    - 10.0秒：ロサンゼルス サンタモニカ
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/a02e1ecd5240f1487071709d3271eae749282023/README_zh.md#L2094)

```text
整体结构：
  - 超高速的指标蒙太奇，根据以下顺序，每 0.1 秒切换一次实景画面。
  - 每个剪辑都必须是视频，而不是静态图像，并且包含摄像机运动。
  - 顺序：
    - 0.0 秒：东京铁塔
    - 0.1 秒：涩谷交叉路口
    - 0.2 秒：浅草寺
    - 0.3 秒：皇居
    - 0.4 秒：歌舞伎座
    - 0.5 秒：东京巨蛋
    - 0.6 秒：上野动物园
    - 0.7 秒：六本木新城
    - 0.8 秒：东京站
    - 0.9 秒：秋叶原
    - 1.0 秒：筑地市场
    - 1.1 秒：靖国神社
    - 1.2 秒：新宿御苑
    - 1.3 秒：滨离宫恩赐庭园
    - 1.4 秒：赤坂迎宾馆
    - 1.5 秒：国会议事堂
    - 1.6 秒：东京国立博物馆
    - 1.7 秒：国立科学博物馆
    - 1.8 秒：东京都厅
    - 1.9 秒：自由女神像（台场）
    - 2.0 秒：富士山
    - 2.1 秒：札幌钟楼
    - 2.2 秒：函馆山
    - 2.3 秒：仙台城遗址
    - 2.4 秒：松岛
    - 2.5 秒：日光东照宫
    - 2.6 秒：兼六园
    - 2.7 秒：永平寺
    - 2.8 秒：善光寺
    - 2.9 秒：富士急乐园
    - 3.0 秒：热海温泉
    - 3.1 秒：伊势神宫
    - 3.2 秒：东大寺
    - 3.3 秒：姬路城
    - 3.4 秒：严岛神社
    - 3.5 秒：广岛和平纪念公园
    - 3.6 秒：道后温泉
    - 3.7 秒：太宰府天满宫
    - 3.8 秒：熊本城
    - 3.9 秒：樱岛
    - 4.0 秒：首里城
    - 4.1 秒：纽约时代广场
    - 4.2 秒：纽约自由女神像
    - 4.3 秒：纽约中央公园
    - 4.4 秒：伦敦大本钟
    - 4.5 秒：伦敦塔
    - 4.6 秒：伦敦白金汉宫
    - 4.7 秒：巴黎埃菲尔铁塔
    - 4.8 秒：巴黎卢浮宫
    - 4.9 秒：巴黎凯旋门
    - 5.0 秒：罗马斗兽场
    - 5.1 秒：罗马特莱维喷泉
    - 5.2 秒：罗马梵蒂冈城
    - 5.3 秒：北京长城
    - 5.4 秒：北京故宫
    - 5.5 秒：北京天安门广场
    - 5.6 秒：悉尼歌剧院
    - 5.7 秒：悉尼海港大桥
    - 5.8 秒：悉尼邦迪海滩
    - 5.9 秒：里约热内卢基督像
    - 6.0 秒：里约热内卢科帕卡巴纳海滩
    - 6.1 秒：里约热内卢糖面包山
    - 6.2 秒：开罗吉萨金字塔
    - 6.3 秒：开罗狮身人面像
    - 6.4 秒：开罗埃及博物馆
    - 6.5 秒：伊斯坦布尔圣索菲亚大教堂
    - 6.6 秒：伊斯坦布尔蓝色清真寺
    - 6.7 秒：伊斯坦布尔托普卡帕宫
    - 6.8 秒：莫斯科红场
    - 6.9 秒：莫斯科圣瓦西里大教堂
    - 7.0 秒：莫斯科克里姆林宫
    - 7.1 秒：柏林勃兰登堡门
    - 7.2 秒：柏林墙
    - 7.3 秒：柏林德国国会大厦
    - 7.4 秒：阿姆斯特丹梵高博物馆
    - 7.5 秒：阿姆斯特丹国立博物馆
    - 7.6 秒：阿姆斯特丹安妮之家
    - 7.7 秒：曼谷郑王庙
    - 7.8 秒：曼谷卧佛寺
    - 7.9 秒：曼谷大皇宫
    - 8.0 秒：首尔景福宫
    - 8.1 秒：首尔 N 首尔塔
    - 8.2 秒：首尔明洞
    - 8.3 秒：台北 101
    - 8.4 秒：台北故宫博物院
    - 8.5 秒：台北龙山寺
    - 8.6 秒：迪拜哈利法塔
    - 8.7 秒：迪拜帆船酒店
    - 8.8 秒：迪拜购物中心
    - 8.9 秒：新加坡滨海湾金沙
    - 9.0 秒：新加坡鱼尾狮公园
    - 9.1 秒：新加坡滨海湾花园
    - 9.2 秒：香港太平山顶
    - 9.3 秒：香港迪士尼乐园
    - 9.4 秒：香港尖沙咀
    - 9.5 秒：拉斯维加斯百乐宫喷泉
    - 9.6 秒：拉斯维加斯平流层高塔
    - 9.7 秒：拉斯维加斯大峡谷
    - 9.8 秒：洛杉矶好莱坞标志
    - 9.9 秒：洛杉矶格里菲斯天文台
    - 10.0 秒：洛杉矶圣莫尼卡
```

### YouMind 提供的English版本（README.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/a02e1ecd5240f1487071709d3271eae749282023/README.md#L2074)

```text
Overall Structure:
  - Ultra-high-speed metric montage switching between live-action scenery every 0.1 seconds according to the sequence below.
  - Each cut must be a video, not a still image, and include camera work.
  - Sequence:
    - 0.0s: Tokyo Tower
    - 0.1s: Shibuya Scramble Crossing
    - 0.2s: Senso-ji Temple
    - 0.3s: Imperial Palace
    - 0.4s: Kabuki-za Theatre
    - 0.5s: Tokyo Dome
    - 0.6s: Ueno Zoo
    - 0.7s: Roppongi Hills
    - 0.8s: Tokyo Station
    - 0.9s: Akihabara
    - 1.0s: Tsukiji Market
    - 1.1s: Yasukuni Shrine
    - 1.2s: Shinjuku Gyoen National Garden
    - 1.3s: Hama-rikyu Gardens
    - 1.4s: Akasaka Palace State Guest House
    - 1.5s: National Diet Building
    - 1.6s: Tokyo National Museum
    - 1.7s: National Museum of Nature and Science
    - 1.8s: Tokyo Metropolitan Government Building
    - 1.9s: Statue of Liberty (Odaiba)
    - 2.0s: Mount Fuji
    - 2.1s: Sapporo Clock Tower
    - 2.2s: Mount Hakodate
    - 2.3s: Sendai Castle Ruins
    - 2.4s: Matsushima
    - 2.5s: Nikko Toshogu Shrine
    - 2.6s: Kenroku-en Garden
    - 2.7s: Eihei-ji Temple
    - 2.8s: Zenko-ji Temple
    - 2.9s: Fuji-Q Highland
    - 3.0s: Atami Onsen
    - 3.1s: Ise Grand Shrine
    - 3.2s: Todai-ji Temple
    - 3.3s: Himeji Castle
    - 3.4s: Itsukushima Shrine
    - 3.5s: Hiroshima Peace Memorial Park
    - 3.6s: Dogo Onsen
    - 3.7s: Dazaifu Tenman-gū
    - 3.8s: Kumamoto Castle
    - 3.9s: Sakurajima
    - 4.0s: Shuri Castle
    - 4.1s: New York Times Square
    - 4.2s: New York Statue of Liberty
    - 4.3s: New York Central Park
    - 4.4s: London Big Ben
    - 4.5s: London Tower of London
    - 4.6s: London Buckingham Palace
    - 4.7s: Paris Eiffel Tower
    - 4.8s: Paris Louvre Museum
    - 4.9s: Paris Arc de Triomphe
    - 5.0s: Rome Colosseum
    - 5.1s: Rome Trevi Fountain
    - 5.2s: Rome Vatican City
    - 5.3s: Beijing Great Wall of China
    - 5.4s: Beijing Forbidden City
    - 5.5s: Beijing Tiananmen Square
    - 5.6s: Sydney Opera House
    - 5.7s: Sydney Harbour Bridge
    - 5.8s: Sydney Bondi Beach
    - 5.9s: Rio de Janeiro Christ the Redeemer
    - 6.0s: Rio de Janeiro Copacabana Beach
    - 6.1s: Rio de Janeiro Sugarloaf Mountain
    - 6.2s: Cairo Pyramids of Giza
    - 6.3s: Cairo Sphinx
    - 6.4s: Cairo Egyptian Museum
    - 6.5s: Istanbul Hagia Sophia
    - 6.6s: Istanbul Blue Mosque
    - 6.7s: Istanbul Topkapi Palace
    - 6.8s: Moscow Red Square
    - 6.9s: Moscow Saint Basil's Cathedral
    - 7.0s: Moscow Kremlin
    - 7.1s: Berlin Brandenburg Gate
    - 7.2s: Berlin Berlin Wall
    - 7.3s: Berlin Reichstag Building
    - 7.4s: Amsterdam Van Gogh Museum
    - 7.5s: Amsterdam Rijksmuseum
    - 7.6s: Amsterdam Anne Frank House
    - 7.7s: Bangkok Wat Arun
    - 7.8s: Bangkok Wat Pho
    - 7.9s: Bangkok Grand Palace
    - 8.0s: Seoul Gyeongbokgung Palace
    - 8.1s: Seoul N Seoul Tower
    - 8.2s: Seoul Myeongdong
    - 8.3s: Taipei Taipei 101
    - 8.4s: Taipei National Palace Museum
    - 8.5s: Taipei Lungshan Temple
    - 8.6s: Dubai Burj Khalifa
    - 8.7s: Dubai Burj Al Arab
    - 8.8s: Dubai Dubai Mall
    - 8.9s: Singapore Marina Bay Sands
    - 9.0s: Singapore Merlion Park
    - 9.1s: Singapore Gardens by the Bay
    - 9.2s: Hong Kong Victoria Peak
    - 9.3s: Hong Kong Hong Kong Disneyland
    - 9.4s: Hong Kong Tsim Sha Tsui
    - 9.5s: Las Vegas Fountains of Bellagio
    - 9.6s: Las Vegas Stratosphere Tower
    - 9.7s: Las Vegas Grand Canyon
    - 9.8s: Los Angeles Hollywood Sign
    - 9.9s: Los Angeles Griffith Observatory
    - 10.0s: Los Angeles Santa Monica
```

## 出处与许可

- 原作者：[Muse｜AI音楽＆AI動画](https://x.com/projectmuse_ai) · 原帖：<https://x.com/projectmuse_ai/status/2024479011251044437>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/a02e1ecd5240f1487071709d3271eae749282023/README_ja-JP.md#L2108)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `a02e1ecd5240`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=517>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
