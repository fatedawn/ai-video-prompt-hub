---
id: "learnprompt-tpl-en-stop-motion-cadence"
title: "🎨 Stop motion and stepped cadence"
model: ""
language: "en"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/stop-motion-cadence.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🎨 Stop motion and stepped cadence

> Stop motion is a timing spec before it is a look. Pin the frame rate and the hold count, name the craft material, and ban the three things that silently smooth it away.

## 模板（English）

```text
I want a clip with a stop-motion feel. [Materials: felt and clay.] [Content: a little felt fox pitching a tent in the forest.] [The stepped, frame-by-frame cadence should be obvious.] Using the prompt template below, rewrite it into one ready-to-use Seedance video prompt for me:

#### Stop motion and stepped cadence

Stop motion is a timing spec before it is a look. Pin the frame rate and the hold count, name the craft material, and ban the three things that silently smooth it away.

**Use when:** Claymation, paper-cut, moving-oil-painting, collage and tabletop object animation. 24 cases in the corpus sit in this family.

**Guidance:**

- Pin the cadence numerically: `True 12fps, ANIMATED ON TWOS: 12 distinct hand-painted drawings per second, each pose held two frames then snapping to the next, never gliding`.
- Name the material and exclude its neighbours in the same breath. The wolf-attack case writes a hand-painted 2D look, a moving oil painting, NOT clay, NOT puppets, NOT 3D.
- The negative trio is mandatory: NO smooth interpolation, NO motion blur, NO morphing. These three are the main routes by which stepped motion gets silently smoothed back out.
- For tabletop work, lock the camera completely — perfectly locked top-down overhead, no camera movement, no hands, no surrounding objects — and let only the subject change.
- Add craft imperfections as requirements: uneven handmade edges, tiny positional jitter between poses, an occasional one-frame motion smear, and a constant painterly boil in the outlines.

**Examples:** [#1](https://goodcase.ai/cases/case-69e5879cc5a7) [#2](https://goodcase.ai/cases/case-b079faa80f0f) [#3](https://goodcase.ai/cases/case-0287a838e662) [#4](https://goodcase.ai/cases/case-50ba683413ff)

**Structure:**

1. Cadence declaration: frames per second, frames held per pose, snap not glide
2. Craft material, with adjacent materials explicitly excluded
3. Negative block: no smooth interpolation, no motion blur, no morphing
4. Camera and surface: locked overhead or locked stage, no hands, no extra objects
5. Segment-by-segment transformation of the subject

**Pitfalls:**

- Not separating environment motion from subject motion. Blizzard haze, smoke and water may drift smoothly while figures step on twos, but you have to say so or everything smooths out together.
- Asking for stop motion and a long moving camera shot at once. These are contradictory requirements and the camera move usually wins.
- Requesting clay and paper in the same prompt. Their light behaviour differs, and the model blends them into an ambiguous surface.
- Keeping normal-scale action at 12fps. Stepped animation drops readability on fast motion, so exaggerate the pose amplitude.
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/stop-motion-cadence.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
