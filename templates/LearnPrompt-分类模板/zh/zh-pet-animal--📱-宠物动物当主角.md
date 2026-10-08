---
id: "learnprompt-tpl-zh-pet-animal"
title: "📱 宠物动物当主角"
model: ""
language: "zh"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/pet-animal.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 📱 宠物动物当主角

> 动物是真正的主角，镜头就交给一台手机。数量锁死成一只，动物只做动物做的事，包袱留给它一步步逼近镜头。

## 模板（中文）

```text
我要做一条宠物抢镜的手持自拍视频，【我的宠物是一只胖橘猫，右耳有个小缺口】，【它趁我拍自拍一路爬到肩膀上，最后把鼻子怼到镜头前】。请根据下面这个提示语模板，帮我改写成一条可以直接用的 Seedance 视频提示语：

#### 宠物动物当主角

动物是真正的主角，镜头就交给一台手机。数量锁死成一只，动物只做动物做的事，包袱留给它一步步逼近镜头。

**适用场景:** 猫狗或野生动物抢镜的自拍、vlog 片段，以及靠一个真实动物行为撑起来的写实喜剧。

**要点:**

- 数量写成一个硬数字，并把这一只写成物理连续。狗狗抢镜那条是 `Use exactly ONE small playful dog throughout the entire video`，外加 `No duplicate animal`；小猫 vlog 那条还逐项点名 `consistent fur pattern, eye color, size, whiskers, ears, paws`。
- 给动物单开一段行为规则。猕猴那条写了 ANIMAL BEHAVIOR 块，`No talking, no human clothing, no human-like walking`，笑点全押在猴子跟着徒步者歪头这件事上。
- 真实感用一份相机缺陷清单换。猫咪一日 vlog 要的是 `Natural handheld shake`、`Occasional autofocus hunting`、`Natural front-camera lens distortion`，再禁掉 `No cinematic camera movements`。
- 动作按拍升级，最后落到镜头上。狗狗那条最后一段写 `Its nose fills a large part of the frame`，画面先失焦再找回；雨天小猫那条是爪子伸到镜头角落，片子在笑声里断掉。
- 声音只留现场音。猫咪 vlog 收尾的音频段只列 meows、purring、chirping、footsteps，并写死 `No background music`；狗狗那条写的是 `Natural room ambience only`。

**示例:** [#1](https://goodcase.ai/cases/zarairahh-seedance-ai-f89372941867) [#2](https://goodcase.ai/cases/seedance-she-thought-it-was-going-to-be-a-peaceful-rainy-day-selfie-f0bf765977dd) [#3](https://goodcase.ai/cases/seedance-pov-you-wanted-a-cute-mirror-selfie-but-your-dog-wanted-to-be-the-main-charac-3d3e83219d46) [#4](https://goodcase.ai/cases/synthesarah-seedance-ai-636eef3e35c4)

**结构:**

1. 参考与主体段：有人出镜就用参考图锁住人，再写死只有一只动物，从头到尾是同一只
2. 格式段：时长、竖屏 9:16、手持前置自拍、室内自然光、不调色不加美颜
3. 相机段：手臂漂移、构图偏一点、自动对焦拉风箱、不剪、不变焦、没有第三方机位
4. 正文按秒切段，每段让动物往前递进一步：注意到、伸爪、抢走、爬肩、扑镜头
5. 人的反应和半句没说完的台词，写在同一拍里
6. 音频段：现场声清单，没有音乐、字幕、水印
7. 严格约束收尾：一个人一只动物、不许出现第二只、镜面物理正确、画面里没有摄影师

**常见坑:**

- 数量留着不写。片子中段会多出第二只动物或者多一个倒影，狗狗那条用 `Exactly one woman. Exactly one dog.` 和 `No duplicate reflection` 把它钉死。
- 让动物说话或者像人一样走路。片子会滑向动画，猕猴那条直接禁掉这些，把笑点压回真实的动物行为。
- 给人写完整长句台词。演员要边笑边念，口型必散，改成被笑打断的半句，像 `You little—` 这种断在一半的。
- 顺手加电影感运镜和调色。手机拍的质感立刻就没了，写上 no cinematic lighting、no color grading、no cuts、no zoom。
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/pet-animal.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
