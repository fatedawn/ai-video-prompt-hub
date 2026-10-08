---
id: "learnprompt-tpl-zh-travel-city-walk"
title: "🎭 电影感旅行漫游"
model: ""
language: "zh"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/travel-city-walk.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🎭 电影感旅行漫游

> 一个人按场次走过一个地方，每场有自己的时间码、自己的地点和一句短台词。质感靠胶片颗粒和黄金时刻的光撑起来，手机瑕疵那套在这里用不上。

## 模板（中文）

```text
我要做一条电影感旅行漫游视频，【目的地是京都，时间是十一月红叶季】，【出镜的是一个背双肩包的女生，从清晨的巷子一路走到傍晚的河边】。请根据下面这个提示语模板，帮我改写成一条可以直接用的 Seedance 视频提示语：

#### 电影感旅行漫游

一个人按场次走过一个地方，每场有自己的时间码、自己的地点和一句短台词。质感靠胶片颗粒和黄金时刻的光撑起来，手机瑕疵那套在这里用不上。

**适用场景:** 目的地日记、城市漫游、徒步、露营、出发启程这类片子：一个旅行者要在六到八个地点里保持是同一个人。

**要点:**

- 每一场的标题同时给时间码和地点。巴厘岛那条写成 `Scene 3 (8-12s) — Rice Terrace & Jungle Moments`，一个段落就管一个地点、一个动作、一个运镜。
- 电影感写成参数表，别堆形容词。巴厘岛那条直接写 `4K cinematic video, 24fps, 35mm film grain, realistic handheld camera`，再补暖色复古调。
- 台词短，而且贴着刚发生的事。巴厘岛在她划板失衡之后说 `Don't film this part — actually, keep filming it.`，全片收在 `Goodnight from Bali.`
- 装备和人一起锁。韩国露营那条写 `Maintain the same woman, outfit, SUV, tent, campsite, and equipment throughout`，车和帐篷就不会中途换样。
- 旅程里有真体力活的时候，把机械过程写出来。露营那条要求 `realistic tent fabric, flexible poles, stakes`，并禁掉 `instant tent setup`。

**示例:** [#1](https://goodcase.ai/cases/seedance-a-cinematic-30-second-tropical-travel-vlog-montage-featuring-a-beautiful-20-yea-6af38a792806) [#2](https://goodcase.ai/cases/noorlewisx-seedance-ai-f8e8235cd94a) [#3](https://goodcase.ai/cases/nawalsehar-seedance-ai-531c19980c39) [#4](https://goodcase.ai/cases/seedance-a-cinematic-ai-travel-vlog-of-a-stylish-young-woman-exploring-a-vibrant-europea-0eaef30bc5e3)

**结构:**

1. 开场一句：时长、画幅、片种写成 cinematic travel vlog，以及这个旅行者是谁
2. 质感段写成参数表：胶片、颗粒、调色、景深、帧率、手持感
3. 一句话的一致性锁，管住发型、妆、服装和表情，覆盖每一场
4. 按时间码分场，每场带一个地点名：抵达、一场风光大景、一场活动、一场吃东西或者慢下来的戏
5. 台词写进它被说出的那一场里，一场一句短的
6. 收尾放在黄金时刻或者夜里，最后她看着镜头道别
7. 结尾：人声和口型要求，再排除上屏文字、logo 和水印

**常见坑:**

- 三十秒排八场，还场场都说话。巴厘岛那条八场里只有四场有台词。
- 只写去了哪里，运镜丢给模型。每一场都得给自己的镜头动作，写成 `Camera trails her from behind, then swings into a close-up` 这样。
- 混进廉价手机瑕疵词，比如 shaky phone video、low quality。这里的手持是架在胶片颗粒和浅景深上的，画质得往上走。
- 整条拍成一串没有人的风光空镜。每场给一个具体动作，巴厘岛那条是赤脚走过潮线、用纸吸管喝椰子水。
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/travel-city-walk.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
