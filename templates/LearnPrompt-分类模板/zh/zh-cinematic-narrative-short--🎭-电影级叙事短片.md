---
id: "learnprompt-tpl-zh-cinematic-narrative-short"
title: "🎭 电影级叙事短片"
model: ""
language: "zh"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/cinematic-narrative-short.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🎭 电影级叙事短片

> 15 到 60 秒的多幕叙事。每幕带标题，角色卡写在幕之前，反转写成具体画面而不是一句会让人震惊。

## 模板（中文）

```text
我要做一条电影感的叙事短片，【故事是：宇航员在废弃空间站里收到一条来自 2100 年的讯息】，【想要的类型和气质：科幻悬疑，冷色调】，【时长 15 秒】。请根据下面这个提示语模板，帮我改写成一条可以直接用的 Seedance 视频提示语：

#### 电影级叙事短片

15 到 60 秒的多幕叙事。每幕带标题，角色卡写在幕之前，反转写成具体画面而不是一句会让人震惊。

**适用场景:** 预告片、迷你剧、灾难段落、科幻悬念、爱情短片——观众要跟剧情而不是看质感的场合。

**要点:**

- 给每一幕起标题。浪漫预告那条把幕命名为 The Message 和 Running Through the City，标题本身就约束了这一幕能装多少信息。
- 角色卡控制在五格——发型、上衣、下装、鞋、随身物。够模型认人，又不会吃光身份预算。
- 超过 30 秒就拆成两条 prompt 再拼。高中初恋那条声明 SHOT 1 = 0-30 秒、SHOT 2 = 30-60 秒，并要求两段无缝相接成一部片；案例库里另有一条直接生成两段 15 秒后手动拼接。
- 反转要写成一幅画。2100 悬念那条落在云层分开、空城迪拜上方露出巨物，不是落在 shocking reveal 这个词上。
- 情绪转折绑在光线变化上：golden hour 转 blue hour、冷蓝外景切暖色内景。灾难那条就在主角进入避难所的瞬间换了调色。

**示例:** [#1](https://goodcase.ai/cases/caden-flux-seedance-ai-8ffb5f062951) [#2](https://goodcase.ai/cases/sci-fi-mystery-message-from-2100) [#3](https://goodcase.ai/cases/mermaid-rescue-cinematic-story) [#4](https://goodcase.ai/cases/youmind-1980s-slasher-yacht-octopus)

**结构:**

1. 类型与视觉基调：参照美学、调色、镜头行为、剪辑节奏
2. 角色卡写在分幕之前，每人一小块
3. 分幕，每幕带标题和时间窗
4. 幕内镜头，各幕镜头数量不要一样
5. 音乐与音效走向
6. 收尾指令，写成一个剪辑动作而不是一种感觉

**常见坑:**

- 节奏平均。每幕镜头数一样，故事就读成蒙太奇了，要刻意给不同数量。
- 把台词交给模型。生成的台词会偏离类型，自己写，哪怕每幕只写一句。
- 单条生成超过 30 秒，身份漂移概率明显上升。在后半段开头重申身份锁，或者干脆拆开生成。
- 结尾写 fade out。模型会真的淡出，白白烧掉最后两秒，应该写 hard cut to black、不淡出、不延长尾音。
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/cinematic-narrative-short.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
