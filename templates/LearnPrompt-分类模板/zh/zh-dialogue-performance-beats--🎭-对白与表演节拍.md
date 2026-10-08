---
id: "learnprompt-tpl-zh-dialogue-performance-beats"
title: "🎭 对白与表演节拍"
model: ""
language: "zh"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/dialogue-performance-beats.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🎭 对白与表演节拍

> 声明对白语种、标出说话人、把反应写成因果链而不是表情清单，每一拍以一个明确的结束状态收尾。

## 模板（中文）

```text
我要做一条有对白的表演戏，【人物是：一对在雨夜咖啡馆重逢的旧恋人】，【台词是：男，你还是老样子。女，你也是。】，【情绪从克制到松动】。请根据下面这个提示语模板，帮我改写成一条可以直接用的 Seedance 视频提示语：

#### 对白与表演节拍

声明对白语种、标出说话人、把反应写成因果链而不是表情清单，每一拍以一个明确的结束状态收尾。

**适用场景:** 台词要被听见而不是被暗示的时候。207 条里 78 条把台词直接写进正文（38%），16 条显式管理口型。Seedance 2.5 还支持用上传的音轨驱动口型。

**要点:**

- 语种单独成行写在台词之前，写成 `セリフ言語: 日本語` 或 `Natural English dialogue only`，并把台词包进花括号或引号，避免被当成场景描述读。
- 有上传音轨时，写明口型依据音频里的真实人声而不是文字，并要求无人声段落闭唇。同时限定只有一个人对口型，背景人物别跟着张嘴。
- 反应写成链，不写清单：先听见、短暂停顿理解、表情开始变化、身体随后跟上、前一个表情留余韵、再进入下一个状态。逐条控制眉毛眼睛鼻子嘴会做出表情包式切换。
- 每一拍以一行结束状态收尾，给下一拍一个明确起点——突袭那条每阶段写结束时，日语对白那条写終了状態。
- 有生理表征的情绪要写行为，不写症状。直接要脸红会得到均匀粉色滤镜；改成视线短暂移开、嘴角压不住、语速变慢、手部停顿，害羞才成立。

**示例:** [#1](https://goodcase.ai/cases/youmind-surprise-visit-romance-trailer) [#2](https://goodcase.ai/cases/noorlewisx-seedance-ai-b2d98861daf9) [#3](https://goodcase.ai/cases/case-1f8136a9893a) [#4](https://goodcase.ai/cases/case-a845e1418b39)

**结构:**

1. 语种与音源声明，写在任何台词之前
2. 说话人标签，每个角色一个
3. 每一拍：因果反应链、台词、结束状态
4. 全局表演原则：角色知道什么、不知道什么
5. 负向：不要旁白、不要静默空档、不要表情包式切换

**常见坑:**

- 连续对白的片子要明写 `no silent moments and no voice-over`，否则模型会给你配乐加一张动的嘴。
- 专有名词和数字是生成台词里最不可靠的部分。把品牌名和数字从对白挪到后期加的上屏文字里。
- 两个角色在同一拍说话会分掉口型预算。一个给台词，另一个给身体反应。
- 三秒的拍子里台词超过八个词左右就会失步。先砍台词，再调别的。
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/dialogue-performance-beats.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
