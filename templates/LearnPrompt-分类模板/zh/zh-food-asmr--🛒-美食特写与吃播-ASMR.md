---
id: "learnprompt-tpl-zh-food-asmr"
title: "🛒 美食特写与吃播 ASMR"
model: ""
language: "zh"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/food-asmr.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🛒 美食特写与吃播 ASMR

> 烹饪特写、吃播和吃东西的 vlog。成立靠的是每一拍都让食物发生一个看得见的变化，再配上对应的一个声音，而且这道菜从头到尾都是同一道菜。

## 模板（中文）

```text
我要做一条美食特写短视频，【做的是一碗番茄牛腩面，从切番茄一直拍到出锅】，【最后停在热气腾腾的成品特写上，配咕嘟咕嘟的炖煮声】。请根据下面这个提示语模板，帮我改写成一条可以直接用的 Seedance 视频提示语：

#### 美食特写与吃播 ASMR

烹饪特写、吃播和吃东西的 vlog。成立靠的是每一拍都让食物发生一个看得见的变化，再配上对应的一个声音，而且这道菜从头到尾都是同一道菜。

**适用场景:** 一步一步的做菜短片、拉丝爆汁冒热气的美食广告，还有手持吃播、辣味挑战这种人对着食物出反应的片子。

**要点:**

- 把做菜切成带时间码的短步骤，每步起个名字。猪排盖饭那条一共十二段，每段两到三秒，标题是 `Prepare Pork`、`Bread the Pork`、`Fry`、`Slice` 这样，一段只做一件事。
- 写食物的物理状态，光写菜名没用。猪排盖饭里的蛋边缘凝固，中间 `remains glossy, slightly runny, and trembling`，切开的外壳 `cracks naturally, revealing juicy white pork`；生煎包那条写汤汁 `in long glossy strands` 往下淌，底部煎成 `golden lace-like crusts`。
- 声音按动作的先后顺序一个个列出来。猪排盖饭的音频段写了 `Synchronize realistic ASMR cooking sounds`，点名拍肉锤、切刀、油炸滋滋声、高汤冒泡、筷子、瓷碗轻碰，底下垫 110 到 120 BPM 的 city-pop，最后用一声风铃收。
- 吃的动作拆成小步，台词放在后面。关东煮那条她 `blows on it gently, then takes a bite`，嚼完看镜头，再说一句短话；辣味挑战把碗从最不辣排到最辣，每换一碗她的反应往上走一格。
- 把菜和画面都圈住。猪排盖饭的排除段写了 `No unrelated ingredients or dishes. Katsudon only`，还禁掉字幕、界面、logo 和叠字，最后要求食物、手、餐具全程一致。

**示例:** [#1](https://goodcase.ai/cases/seedance-create-a-30-second-fast-paced-cinematic-japanese-anime-cooking-video-showing-th-236ad940a8f1) [#2](https://goodcase.ai/cases/just-sharon7-seedance-ai-0a85559bbf5e) [#3](https://goodcase.ai/cases/oggii-0-seedance-ai-5ed8176ffb89) [#4](https://goodcase.ai/cases/seedance-create-a-hyper-realistic-cinematic-15-second-food-video-in-the-exact-glossy-ult-6f3f25cbf4e6)

**结构:**

1. 开头一句：时长、画风（动画电影、油亮广告或手持 vlog）、具体是哪道菜
2. 风格与光线段：微距特写、浅景深、蒸汽、暖光；vlog 就写拍摄设备和它的毛病
3. 有人出镜时：人物锁定、服装、房间或街道
4. 按步骤写时间轴，从生食材到成品，每段一个动作加一个质地变化
5. 英雄收尾：成品单独入画，缓慢推近或环绕，热气往上走
6. 音频：音乐风格和速度，再按发生顺序列出做菜或吃东西的声音
7. 排除收尾：不要文字、界面、logo，只有这一道菜，食物、手、餐具前后一致

**常见坑:**

- 特写里手和餐具变形，筷子多出一根，刀弯了。每一拍只给一件餐具，微距对准食物，再补一句手和餐具前后一致。
- 菜做到一半变了，食材换了或者冒出另一道菜。点名菜名、列出食材，再像猪排盖饭那条一样把无关食物排除掉。
- 一段话里塞太多镜头。生煎包那条 15 秒塞了六个镜头，没有时间码，还从吃跳回做，顺序只能让模型自己排；每一步至少给两秒，并标上时间码。
- 嘴里有东西还在说话，口型和咀嚼一起崩。先让她咬、嚼、咽下去，再说台词，像关东煮那条那样一口一句隔开。
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/food-asmr.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
