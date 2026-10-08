---
id: "learnprompt-tpl-zh-handheld-ugc-vlog"
title: "📱 手持 UGC vlog"
model: ""
language: "zh"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/handheld-ugc-vlog.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 📱 手持 UGC vlog

> 用相机缺陷换真实感。指名一个具体的消费级器材年代，把它的毛病写成要求，再手动关掉电影感。

## 模板（中文）

```text
我要做一条手持感的生活 vlog，【出镜的人是：一位二十多岁的女生，穿宽松卫衣】，【场景是：周末早上在自家厨房做手冲咖啡】，有参考图我会一起发给你。请根据下面这个提示语模板，帮我改写成一条可以直接用的 Seedance 视频提示语：

#### 手持 UGC vlog

用相机缺陷换真实感。指名一个具体的消费级器材年代，把它的毛病写成要求，再手动关掉电影感。

**适用场景:** 要私人感的素材：日常、旅拍、健身、做饭、出门前准备。目标是像真有人拍的，而不是像很贵的时候用这套。

**要点:**

- 把相机缺陷当真实感开关：手抖、对焦来回找、曝光呼吸、构图漂移、变焦不匀、偶尔切掉半张脸。案例库里 23 条靠这套词表拿到手机实拍质感。
- 指名器材年代，不要笼统要求真实：mini DV 家用摄像机、16mm、VHS、iPhone 16 Pro、胸挂运动相机。一个具体型号带着整套光学特征，realistic 这个词带不来。
- 显式关掉电影感：no cinematic emulation、不使用稳定器、不做电影式运镜、无美颜、无磨皮。
- 写单调递进的身体状态，给模型一个不可逆的时间线索。骑行 vlog 那条写死汗量随时间递增不可倒退，并逐镜从额角第一层汗写到骑行服全湿。
- 台词跟着分镜行走，不要单开对白块，让说话和动作焊在一起。

**示例:** [#1](https://goodcase.ai/cases/seedance-25-minidv-coffee-asmr-vlog) [#2](https://goodcase.ai/cases/16mm-analog-morning-vlog) [#3](https://goodcase.ai/cases/mightyking-seedance-ai-7bbc1d4f9ad9) [#4](https://goodcase.ai/cases/seedance-2-5-eba905fedcff)

**结构:**

1. CAMERA：机器怎么拿、什么年代、有哪些操作毛病
2. LOOK：磁带或胶片质感、颗粒、光晕、对比度、曝光行为
3. STYLE：节奏和情绪，一两行写完
4. SUBJECT 与 SETTING：谁、在哪，都写短
5. STORYBOARD：`→ (3s, propped medium shot)` 这种短行，配一句口语台词
6. AUDIO NOTES 与 REALISM NOTES：环境音清单，然后是肢体语言和瑕疵清单

**常见坑:**

- 同一条 prompt 里既要手持真实感又要 4K 电影级打光。两套光线逻辑打架，结果落在塑料感上。
- 让景别推到大特写。男友视角那条明确禁止脸部填满画面，最近只给到胸口以上，因为大特写会暴露 AI 脸。
- 用数字变焦当转场。要一镜到底就补一句禁止数字变焦、突然推近和隐形剪辑。
- 台词写太长。长句抢画面还拖垮口型，每句控制在八个词以内。
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/handheld-ugc-vlog.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
