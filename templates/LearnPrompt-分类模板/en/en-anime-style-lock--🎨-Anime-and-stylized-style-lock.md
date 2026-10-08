---
id: "learnprompt-tpl-en-anime-style-lock"
title: "🎨 Anime and stylized style lock"
model: ""
language: "en"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/anime-style-lock.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🎨 Anime and stylized style lock

> Specify the drawing style as measurable parameters, then attach an exclusion list of the neighbouring styles it must not fall into. Without the exclusion list, anime collapses into a generic 3D face.

## 模板（English）

```text
I want an animated clip whose art style stays locked. [Style: 1990s cel-shaded Japanese animation; I am sending you style references.] [Content: a girl on a broomstick gliding over a seaside town at dusk.] Using the prompt template below, rewrite it into one ready-to-use Seedance video prompt for me:

#### Anime and stylized style lock

Specify the drawing style as measurable parameters, then attach an exclusion list of the neighbouring styles it must not fall into. Without the exclusion list, anime collapses into a generic 3D face.

**Use when:** Cel-look action, Ghibli-flavoured slice of life, 3D toon RPG battles, 2D hand-drawn cooking. Roughly a quarter of the corpus is stylized animation of some kind.

**Guidance:**

- Write the style as parameters: thin coloured contour lines, two to three steps of cel shading with translucent mid-shadow, multi-layer highlights in irises and hair, and distinct reflectance and roughness for cloth, leather, metal, gems, wet floor and glass.
- Always attach the exclusion list. The anime duel case rules out thick black outlines, flat single-layer cel shadow, low-budget TV-anime look, generic 3D pretty-girl face, smooth plastic CG, semi-photoreal, photoreal, low-density backgrounds and muddy colour.
- Extract a signature colour set per character from the reference — main colour, support colour, accent colour, material motif — name them and forbid trading them between characters.
- Push the background one step darker than the characters and use each character's signature colour as their key light and shadow tint. This is what reads as 2D rather than as rendered 3D.
- For healing-genre Ghibli work, subtract motion instead of adding it. The forest cooking case shows only a pair of hands, no faces at all, and covers gathering, slicing, simmering and serving in four shots.

**Examples:** [#1](https://goodcase.ai/cases/case-a9ab0266f96a) [#2](https://goodcase.ai/cases/case-a45446378e2a) [#3](https://goodcase.ai/cases/case-c32e6c3bb2c5) [#4](https://goodcase.ai/cases/case-ce63bf146d4e)

**Structure:**

1. Style lock block: line weight, number of cel shading steps, highlight layering, per-material reflectance
2. Exclusion list: the adjacent styles that must not appear
3. Character and palette lock: signature colours pulled from the reference, forbidden from swapping between characters
4. Stage and atmosphere: how the environment is re-tinted toward the character palette
5. Camera order and action

**Pitfalls:**

- Writing anime style without naming a school. The model averages across everything it knows and returns a generic face.
- Mixing 2D hand-drawn vocabulary with 3D toon-render vocabulary. They are two different word sets and blending them lands on semi-photoreal.
- Fast action degrading cel shadow into realistic lighting. Restate the shading spec inside the high-speed segments.
- Letting text, logos or UI appear in the scene. Anime backgrounds attract garbled signage unless it is banned outright.
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/anime-style-lock.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
