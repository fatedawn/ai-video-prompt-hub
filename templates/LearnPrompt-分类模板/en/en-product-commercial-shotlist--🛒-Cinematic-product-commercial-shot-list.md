---
id: "learnprompt-tpl-en-product-commercial-shotlist"
title: "🛒 Cinematic product commercial shot list"
model: ""
language: "en"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/product-commercial-shotlist.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🛒 Cinematic product commercial shot list

> A polished 8 to 20 second ad: a stated commercial aesthetic up front, a numbered or timed shot breakdown in the middle, a hero frame at the end, and a keyword tail.

## 模板（English）

```text
I want a cinematic product commercial. [My product is a pair of matte black wireless earbuds; I am sending you the product photos.] [The tone I want: cool, technical, slow-paced.] [10 seconds, horizontal 16:9.] Using the prompt template below, rewrite it into one ready-to-use Seedance video prompt for me:

#### Cinematic product commercial shot list

A polished 8 to 20 second ad: a stated commercial aesthetic up front, a numbered or timed shot breakdown in the middle, a hero frame at the end, and a keyword tail.

**Use when:** Beauty, beverage, jewellery, automotive and fragrance spots where the look has to read as paid production rather than as a creator video.

**Guidance:**

- Open with the ad-aesthetic vocabulary before any shot: premium beauty-commercial aesthetics, luxury advertising aesthetic, anamorphic lens, volumetric lighting. This sets the light logic for every shot that follows.
- Name the object of every macro and slow-motion beat: foam texture, liquid ribbons, diamond dispersion, metallic reflections across the packaging. Unnamed macro produces a generic blurred close-up.
- When a reference image defines the final frame, say so directly. The paper-cut perfume case writes `Use @image1 as the exact final hero-frame composition. Use @image2 as the strict product identity lock`, then lists the silhouette, lattice, inner body, cap and plaque under a PRODUCT LOCK heading.
- Give on-screen text its own row with its own window, such as `Text: "Cleanse • Refresh • Glow."` at 0-2s, so it does not bleed across the whole clip.
- Keep the keyword pile at the very end. Style keywords scattered between shots get read as shot content.

**Examples:** [#1](https://goodcase.ai/cases/luxury-skincare-commercial) [#2](https://goodcase.ai/cases/case-e53b614b0f42) [#3](https://goodcase.ai/cases/crimson-cola-99e9ec88e937) [#4](https://goodcase.ai/cases/case-7aea1313f63b)

**Structure:**

1. Opening paragraph: category, duration, aspect ratio, commercial aesthetic vocabulary, colour grading, depth of field
2. Hero product description: material, silhouette, finish, how light behaves on it
3. Shot Breakdown: either `0-2s:` timed rows or `Shot 1:` numbered rows, never both
4. Text and slogan lines, each with its own time window
5. Style Keywords tail as a single trailing block

**Pitfalls:**

- Expecting the model to render a logo or slogan cleanly. Reserve a clean end frame and composite the type afterwards.
- Mixing high-end commercial light with phone-UGC texture. Pick one; blending them yields a plastic look.
- Stacking multiple physics effects in one beat. Liquid, smoke and powder each need their own shot.
- Packing eight shots into eight seconds. Under about one second per shot the model stops resolving individual actions.
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/product-commercial-shotlist.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
