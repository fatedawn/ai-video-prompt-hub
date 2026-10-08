---
id: "learnprompt-tpl-zh-game-ui-livestream"
title: "🎭 游戏实机录屏与直播叠层"
model: ""
language: "zh"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/game-ui-livestream.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🎭 游戏实机录屏与直播叠层

> 屏幕本身就是画面，假装是一段游戏实机、直播或桌面录屏。成立的关键是叠层钉死在固定位置，上面的数字和横幅跟着剧情一格一格变。

## 模板（中文）

```text
我要做一段看起来像游戏实机录屏的视频，【主角是一个穿校服的短发女生，人物照片我提供给你】，【任务是深夜从便利店偷走最后一个饭团再逃到街上】，【画面右下角有主播摄像头小窗，左边是滚动弹幕】。请根据下面这个提示语模板，帮我改写成一条可以直接用的 Seedance 视频提示语：

#### 游戏实机录屏与直播叠层

屏幕本身就是画面，假装是一段游戏实机、直播或桌面录屏。成立的关键是叠层钉死在固定位置，上面的数字和横幅跟着剧情一格一格变。

**适用场景:** GTA 风格的任务片段、主播小窗加游戏画面、互动桌面或界面录屏这类片子，HUD 要看起来像真的界面。

**要点:**

- 时间轴开始之前，先把每个叠层钉到一个具体位置。GTA 6 Simulation 开头就写 `Fixed full-screen game HUD throughout`，主播放在 `bottom-right square pink-blue neon facecam`；雪下车站那条一个角放一样东西，左上体力条，顶部中间任务横幅，右上日期，左下小地图，右下按键提示。
- 把 HUD 当记分牌写，每一段都让它变一次。GTA 6 Simulation 写了弹药 `from 24/120 to 14/120`，通缉星从两颗涨到三颗；钻石逃亡那条每段单独一个 HUD 块，从 `MISSION: STEAL VIP NECKLACE` 到 `TARGET ACQUIRED` 再到 `ESCAPE SUCCESSFUL`。
- 直接说明这是游戏画面，机位按游戏摄像机来写。里约追逐那条要求像真实游戏录屏，写了 `not a cinematic film`；钻石逃亡写 `Clearly a GAME, not anime or cartoon`，镜头放在 `1.5m behind NAGI, slightly camera-right`，视角在 30 到 60 度之间呼吸。
- 人数写死，多出来的每个人都要长得不一样。GTA 6 Simulation 要求 `exactly two dark-red-jacket gang enemies`，不许再冒出别的持枪角色；五点下班那条给四个同事分了年龄、身高、发型，还专门写明老板是全片唯一的光头。
- 按图层分语言，屏幕上的字怎么出现也要写清。钻石逃亡规定 `All HUD text English`，对白用日语；动态壁纸那条把字幕放在画面左侧中部，每个字大约 0.08 到 0.12 秒逐字打出来，下面跟一条跳动的音频波形。

**示例:** [#1](https://goodcase.ai/cases/seedance-gta-6-simulation-414a3b385a58) [#2](https://goodcase.ai/cases/seedance-mission-the-great-diamond-escape-39fea191a6da) [#3](https://goodcase.ai/cases/seedance-2-5-ai-cabf3749d5b6) [#4](https://goodcase.ai/cases/seedance-leaving-work-at-five-shouldn-t-require-stealth-mode-but-her-boss-made-it-a-mis-8495c8c9337e)

**结构:**

1. 格式开头：时长、画幅、镜头怎么切，再直说这是一段游戏录屏
2. 人物锁定：Image1 只管脸和身份，服装用文字写全
3. 屏幕叠层说明：HUD 各元素、主播小窗、弹幕或字幕各放哪、用什么语言，全程固定
4. 机位设定：第三人称跟随的距离和视角，桌面录屏就写一个固定机位
5. 时间轴分段：每段写清动作、HUD 状态变化、这一段说的台词
6. 音频：引擎、脚步、键盘鼠标、环境声、人声语言
7. 硬规则收尾：人数写死、不许多切、HUD 不动、结尾能怎么收不能怎么收

**常见坑:**

- HUD 在段与段之间漂移或者换布局。硬规则里写上 `HUD fixed in the same screen positions`，只让数值变，布局一律不动。
- HUD 上的长句子出来是乱码。横幅控制在两到四个大写词，像钻石逃亡那样，数字也用 38/120 这种简单格式。
- 主播或主角出现两次，小窗里一个，游戏世界里又一个，或者镜子里多出一个。GTA 6 Simulation 写明 HANEUL 只出现在右下小窗；五点下班那条干脆规定电梯里没有镜子。
- 模型把它剪成了电影预告片，有剪切还有一个圆满结尾。写明不切镜不转场；真要一个收尾镜头，就像 `Exactly one hard cut at 27s` 那样把唯一一刀钉在具体秒数，再排除黑屏和片尾卡。
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/game-ui-livestream.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
