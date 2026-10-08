---
id: "learnprompt-tpl-en-process-transformation-montage"
title: "🛒 Process and transformation montage"
model: ""
language: "en"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/process-transformation-montage.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🛒 Process and transformation montage

> Cooking steps, renovation timelapse, blueprint-to-house, miniature city assembly. The craft here is declaring what must not change, then ordering the change spatially.

## 模板（English）

```text
I want a process and transformation montage. [The process: dough going from kneading to a finished croissant out of the oven.] [Locked overhead camera, 12 seconds.] Using the prompt template below, rewrite it into one ready-to-use Seedance video prompt for me:

#### Process and transformation montage

Cooking steps, renovation timelapse, blueprint-to-house, miniature city assembly. The craft here is declaring what must not change, then ordering the change spatially.

**Use when:** Any clip whose subject is a process rather than a person: recipes, builds, assemblies, before-and-after reveals. 35 cases in the corpus.

**Guidance:**

- Spend a whole paragraph on invariants. The renovation case locks camera position, angle, focal length, perspective and composition, then separately locks room dimensions, walls, windows, doors, ceiling height and structural layout.
- Order the change spatially, not vaguely. Flooring spreads left to right, then walls and ceiling transform simultaneously, then furniture lands — this beats gradually transforms every time.
- When two references define different things, say which defines what. The blueprint case declares the floor plan as the source of layout and dimensions, and the exterior photo as the source of architectural style, then forbids any room from moving.
- For cooking, hands only, no faces. That removes the identity budget entirely and lets all detail go to the ingredients.
- Close with a life-signs beat rather than a freeze: water shimmers, flags move, a lighthouse beam rotates, windows light up. The miniature harbour case bans an ending that is completely static.

**Examples:** [#1](https://goodcase.ai/cases/case-429309e40d97) [#2](https://goodcase.ai/cases/case-778d0c927488) [#3](https://goodcase.ai/cases/case-8bdac964f9d4) [#4](https://goodcase.ai/cases/case-179a06586ce5)

**Structure:**

1. Invariants block: what stays fixed — camera, geometry, layout, scale
2. Initial state, described concretely
3. Ordered transformation segments, each with a spatial direction
4. Final state plus a short life-signs beat
5. Sound: assembly clicks, ambience, and whether dialogue exists at all

**Pitfalls:**

- Moving the camera during the transformation. Any camera motion competes with the change itself, and the audience loses the before-and-after anchor.
- Assembly montages drifting toward toy scale. The miniature case devotes a NEGATIVE block to excluding an island that is too small, a cramped harbour, cheap plastic feel and a town of only a few houses.
- Combining timelapse and slow motion in one segment. Pick one temporal treatment per beat.
- Running more than about six steps in one prompt. Beyond that, split into two generations and stitch.
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/process-transformation-montage.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
