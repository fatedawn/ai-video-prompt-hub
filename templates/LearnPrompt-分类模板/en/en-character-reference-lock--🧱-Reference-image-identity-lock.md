---
id: "learnprompt-tpl-en-character-reference-lock"
title: "🧱 Reference image identity lock"
model: ""
language: "en"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/character-reference-lock.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🧱 Reference image identity lock

> Name every reference with a stable token, enumerate what to inherit from it, and separately enumerate what must not be inherited. The inherit-nothing-else clause is what separates working locks from broken ones.

## 模板（English）

```text
I want a clip where the character looks the same from start to finish. [I am sending you 2 reference images: a young woman with short hair and thin-framed glasses.] [What she does: browses a bookshop, looks up and smiles at the camera.] Using the prompt template below, rewrite it into one ready-to-use Seedance video prompt for me:

#### Reference image identity lock

Name every reference with a stable token, enumerate what to inherit from it, and separately enumerate what must not be inherited. The inherit-nothing-else clause is what separates working locks from broken ones.

**Use when:** Any clip where a face, an outfit, a product or a UI layout must survive across shots. Applies to Seedance 2.0 and 2.5 alike; 2.5 additionally accepts audio and video references under the same token scheme.

**Guidance:**

- Split references by role and lock each separately. The GoPro fishing case declares `@location1` for the river and `@hands1` for the forearms, tools and bottle, each followed by `100% matches reference`.
- Enumerate the inherit list instead of writing keep her consistent. The boyfriend-POV case lists thirteen items: identity, features, face shape, skin tone, apparent age, hairstyle, hair colour, height, build, body proportion, clothing, footwear, overall bearing.
- Always add the do-not-inherit clause. Without it the reference's background, pose and lighting come along; the anime duel case spells out that the reference's background, room, furniture, text, split layout, pose, angle and framing must not be reproduced.
- For a UI or scene reference, separate composition lock from design lock. The character-select case marks `@image1` as LOCKED SCENE COMPOSITION and `@image2` through `@image6` as design-only, then adds DO NOT reproduce their reference poses.
- Identity drifts hardest during head turns, occlusion and fast motion. List those poses explicitly and restate the same-face requirement for the high-energy segments.

**Examples:** [#1](https://goodcase.ai/cases/elsasofia-ai-seedance-ai-e087ab2aed4b) [#2](https://goodcase.ai/cases/liyue-ai-seedance-ai-dd263958ed42) [#3](https://goodcase.ai/cases/case-79acf1a3e8a6) [#4](https://goodcase.ai/cases/seedance-2-5-ui-228cf63ce8ff)

**Structure:**

1. Token declaration: give each reference a name — `@image1`, `@Image2`, `<<<image_1>>>`, `@location1`, `@hands1` — and reuse it verbatim everywhere
2. Inherit list: enumerated attributes pulled from the reference (face shape, features, hair colour, body proportions, wardrobe items, accessories)
3. Do-not-inherit list: background, room, furniture, pose, composition, framing, original lighting, any text
4. Cross-shot clause: same face when turning, looking down, speaking, or with a hand near the face
5. Negative: no cloning, no duplicates, no feature averaging, no attribute swaps between characters

**Pitfalls:**

- Uploading a reference without any textual lock. The model then treats it as a style reference, not an identity reference.
- Compressing wardrobe into same outfit. Every working case in the corpus breaks the outfit into individually named garments and accessories.
- Feeding a sketch or illustration reference without a render instruction. Add use only as design blueprints, render as fully realistic live-action humans, or the line-art survives into the video.
- Adding references that no token names. Each unnamed extra image is one more chance for attributes to bleed between subjects.
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/character-reference-lock.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
