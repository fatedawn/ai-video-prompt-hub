---
id: "learnprompt-tpl-zh-epic-fantasy-scifi"
title: "💥 奇幻科幻大场面"
model: ""
language: "zh"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/epic-fantasy-scifi.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 💥 奇幻科幻大场面

> 怪兽、巨龙、世界观展示。每个实体单独给一个定义块，镜头按时间码切开，尺度感靠参照物和低机位换，靠 massive 这种词换不来。

## 模板（中文）

```text
我要做一条奇幻大场面视频，【主角是一个背着长刀的少年，站在被沙埋掉一半的城市里】，【奇观是一只沙虫从地下顶穿整条街冲出来】。请根据下面这个提示语模板，帮我改写成一条可以直接用的 Seedance 视频提示语：

#### 奇幻科幻大场面

怪兽、巨龙、世界观展示。每个实体单独给一个定义块，镜头按时间码切开，尺度感靠参照物和低机位换，靠 massive 这种词换不来。

**适用场景:** 怪兽攻城、巨龙对战、变身序列、世界观展示，任何有效载荷是一个大片级物理奇观的片子。

**要点:**

- 先把实体拆成独立的块，再写场景。战机怪兽那条把 Pilot、Seabaycity、Monster、Jet 各写一段，每段结尾标清用途：`Appearance only`、`Environment only`、`Vehicle only`。
- 尺度感靠参照物和机位买。同一条明确要求 `sell the size of the monster with low angles and the city for scale`，CUT 1 就是一个戏剧性低机位。
- 整条只给一个奇观，其余镜头都是走位。女武士白龙那条全片就是插钥匙、龙出场、一道光束击碎天体。
- 镜头路径写成能执行的动作。雨巷转场那条每一次换场都点名穿过什么：`pushes directly toward the center of the ripple`，接着穿进瞳孔，再穿过水晶的内部结构。
- 固定用一段技术参数收尾。热度最高的几条都收在 `volumetric fog, photorealistic visual effects, Unreal Engine 5 render style` 这样一串上，并点明调色方向，比如深灰加金。

**示例:** [#1](https://goodcase.ai/cases/weeleey6-seedance-ai-b03a5481e168) [#2](https://goodcase.ai/cases/zyrellix-seedance-ai-5fa856d9472a) [#3](https://goodcase.ai/cases/seedance-create-a-30-second-ultra-cinematic-supernatural-fantasy-sequence-photorealisti-6d87ff7834d3) [#4](https://goodcase.ai/cases/zyrellix-seedance-ai-b83a3b47ae61)

**结构:**

1. 开场一句：时长、片种写明（cinematic dark fantasy、kaiju action sequence 之类）、是写实还是动画
2. 实体定义块：人物、怪兽、载具、城市各一段，每段标清楚它只提供什么
3. 场景与气氛：天气、光源、破坏程度、调色方向
4. 镜头切分：CUT 1 / CUT 2 带时间码，或者一条连续镜头路径并点名每次穿过什么
5. 奇观那一拍单独写，把因果交代清楚
6. 技术收尾段：调色、雾、颗粒、镜头、渲染风格
7. 规则段：参考图只取外观、脸要一致、最后一帧停在什么上面

**常见坑:**

- 十五秒塞五个奇观。每个都做成半成品，一条片子只给一个爆点，其余镜头当铺垫。
- 只靠 epic、massive 这类词。没有楼、没有城、没有低机位做参照，怪兽出来就和人一样高。
- 正文里留着脏字符。废墟黑猫那条句子中间夹了一条 t.co 链接，这种东西会被当成画面内容，要清掉。
- 不交代最后一帧停在哪。战机怪兽那条写了 `Final frame on the monster crashing into the bay, stable and clean`，少了这句收尾容易抖或者糊。
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/epic-fantasy-scifi.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
