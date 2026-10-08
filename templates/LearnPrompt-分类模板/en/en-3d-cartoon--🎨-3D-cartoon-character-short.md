---
id: "learnprompt-tpl-en-3d-cartoon"
title: "🎨 3D cartoon character short"
model: ""
language: "en"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/3d-cartoon.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🎨 3D cartoon character short

> One small anthropomorphic character carries the whole film. Spell out its looks part by part, write the style as render settings you can measure, and cut the timeline so each block holds a single action goal.

## 模板（English）

```text
I want a 3D cartoon animated short. [The lead is a small hedgehog in a red scarf, round eyes, waddling when it walks.] [The story: on a rainy night it guides a lost firefly back home.] Using the prompt template below, rewrite it into one ready-to-use Seedance video prompt for me:

#### 3D cartoon character short

One small anthropomorphic character carries the whole film. Spell out its looks part by part, write the style as render settings you can measure, and cut the timeline so each block holds a single action goal.

**Use when:** Pixar-flavoured animated shorts with a cute lead: animal chefs, baby dragons, clay-textured characters that still move smoothly.

**Guidance:**

- Write the character as a parts list, then add one line that freezes it. The frog chef spells out skin, eyes, mouth, cheeks, webbed feet and chef jacket, then follows with `Keep the exact same frog appearance, outfit, proportions`; the otter adventure uses `Maintain the exact same character design, proportions, fur pattern`.
- Turn the style word into render settings. The sofa bunny case asks for soft realistic fluffy fur, cinematic depth of field and creamy bokeh, then adds `premium Pixar-like quality without copying any specific existing character`.
- Cut the body into labelled blocks. The frog chef runs `0–5 SEC — THE RESTAURANT` through `27–30 SEC — THE PAYOFF`; the otter adventure uses `SCENE 1 — Meadow Chase` and names a place and a mood for each block.
- Write emotion as a physical beat the model can animate. The frog chef gets `He moves one tiny vegetable approximately one millimeter` and `His eyes narrow`, and the reveal reads `The hedgehog's ears shoot upward`, which lands better than saying the animals are amazed.
- Close with an exclusion list aimed at animation failures. The butterfly case ends on `No character changes, face distortion, extra characters, outfit changes, flickering, deformed hands`, and the ice-cream otter adds `no distorted anatomy, no extra characters`.

**Examples:** [#1](https://goodcase.ai/cases/ayzalnooor24521-seedance-ai-4a336f514777) [#2](https://goodcase.ai/cases/caden-flux-seedance-ai-473fedbbc75f) [#3](https://goodcase.ai/cases/seedance-made-with-seedance-2-5-71bc731fe900) [#4](https://goodcase.ai/cases/seedance-made-with-seedance-2-5-e2f2af930d0e)

**Structure:**

1. Opening line that fixes the format: duration, 3D animated short, aspect ratio, overall tone
2. Character paragraph: looks part by part, outfit, personality, then one line that holds it steady
3. Body split by seconds or by SCENE, one location and one action goal per block
4. Inside each block, micro-actions and expression changes that carry the emotion
5. Visual and render paragraph: fur, depth of field, lighting, materials, bokeh
6. Camera and mood paragraph: push-in, tracking, close-up, plus a line of mood words
7. Exclusion list to close: appearance changes, face distortion, extra characters, flickering, text and watermark

**Pitfalls:**

- Dropping the word Pixar and stopping there. The model hands back generic CG; follow the bunny case and list fur, depth of field, lighting and bokeh one by one.
- Locking the character only once at the top. The look drifts by the middle of the film, so re-name the identifying item at the start of every scene, like the blue scarf or the oversized chef hat.
- Packing more scenes than the duration holds. The otter short puts nine scenes into 40 seconds, under five seconds each, so the actions only skim past. Cut scenes first and keep one action goal per block.
- Asking for fine hand work with no guard. Moves like the frog chef placing a herb with tweezers are where extra fingers appear; put `deformed hands` in the exclusion list or switch to a whole-paw grab.
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/3d-cartoon.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
