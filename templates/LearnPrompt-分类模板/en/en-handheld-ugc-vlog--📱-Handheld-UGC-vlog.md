---
id: "learnprompt-tpl-en-handheld-ugc-vlog"
title: "📱 Handheld UGC vlog"
model: ""
language: "en"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/handheld-ugc-vlog.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 📱 Handheld UGC vlog

> Buy believability with camera defects. Name a specific consumer camera era, list its flaws as requirements, and switch cinematic polish off by hand.

## 模板（English）

```text
I want a handheld, everyday vlog. [On camera: a woman in her twenties wearing an oversized hoodie.] [Scene: making pour-over coffee in her own kitchen on a weekend morning.] I will attach reference images if I have them. Using the prompt template below, rewrite it into one ready-to-use Seedance video prompt for me:

#### Handheld UGC vlog

Buy believability with camera defects. Name a specific consumer camera era, list its flaws as requirements, and switch cinematic polish off by hand.

**Use when:** Personal-feeling footage: daily life, travel, gym, cooking, get-ready-with-me. Use it whenever the goal is looks like someone actually filmed this rather than looks expensive.

**Guidance:**

- Use camera defects as the realism switch: hand shake, focus hunting, exposure breathing, drifting composition, uneven zooms, occasional accidental face cropping. 23 cases in the corpus reach phone-footage texture with this vocabulary.
- Name the gear era rather than asking for realism: mini DV camcorder, 16mm, VHS, iPhone 16 Pro, chest-mounted action cam. A named device carries a whole optical signature that the word realistic does not.
- Switch cinematic polish off explicitly: no cinematic emulation, no stabiliser, no film-style camera moves, no beauty filter, no skin smoothing.
- Write a monotonic body-state progression to give the model an irreversible time cue. The cycling vlog states that sweat only increases and never goes back, and tracks it shot by shot from a first sheen at the temple to a fully soaked jersey.
- Attach one spoken line per storyboard row rather than a separate dialogue block, so speech and action stay welded together.

**Examples:** [#1](https://goodcase.ai/cases/seedance-25-minidv-coffee-asmr-vlog) [#2](https://goodcase.ai/cases/16mm-analog-morning-vlog) [#3](https://goodcase.ai/cases/mightyking-seedance-ai-7bbc1d4f9ad9) [#4](https://goodcase.ai/cases/seedance-2-5-eba905fedcff)

**Structure:**

1. CAMERA: mount, era, handling flaws
2. LOOK: tape or film texture, grain, halation, contrast, exposure behaviour
3. STYLE: pacing and mood in one or two lines
4. SUBJECT and SETTING: who and where, kept short
5. STORYBOARD: short rows like `→ (3s, propped medium shot)` plus one spoken line
6. AUDIO NOTES and REALISM NOTES: ambient sound list, then body-language and imperfection list

**Pitfalls:**

- Asking for handheld authenticity and 4K cinematic lighting in the same prompt. They are two different light logics and the result lands in plastic territory.
- Letting the framing go to extreme close-up. The boyfriend-POV case explicitly bans faces filling the frame and caps the tightest framing at chest-up, because big close-ups expose AI faces.
- Using digital zoom as a transition. If you want a single take, add an explicit ban on digital zoom, sudden push-ins and invisible cuts.
- Over-writing the dialogue. Long lines pull attention off the picture and worsen lip sync; keep each line under about eight words.
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/handheld-ugc-vlog.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
