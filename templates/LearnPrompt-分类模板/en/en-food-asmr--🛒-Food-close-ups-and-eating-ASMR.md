---
id: "learnprompt-tpl-en-food-asmr"
title: "🛒 Food close-ups and eating ASMR"
model: ""
language: "en"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/food-asmr.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🛒 Food close-ups and eating ASMR

> Cooking close-ups, mukbang and eating vlogs. They work when every beat shows one visible change in the food and one matching sound, and the dish stays the same dish from first frame to last.

## 模板（English）

```text
I want a short food close-up video. [The dish is a bowl of tomato beef brisket noodles, filmed from slicing the tomatoes to serving.] [End on a steaming close-up of the finished bowl, with the sound of it bubbling on the stove.] Using the prompt template below, rewrite it into one ready-to-use Seedance video prompt for me:

#### Food close-ups and eating ASMR

Cooking close-ups, mukbang and eating vlogs. They work when every beat shows one visible change in the food and one matching sound, and the dish stays the same dish from first frame to last.

**Use when:** Step-by-step cooking clips, glossy food ads with juice and steam, and handheld eating vlogs or spicy challenges where a person reacts to the food.

**Guidance:**

- Cut the cooking into short named steps with timecodes. The katsudon case runs twelve segments of about two to three seconds each, titled `Prepare Pork`, `Bread the Pork`, `Fry`, `Slice` and so on, each with one action.
- Write the food's physical state, not just its name. The katsudon egg is set at the edges while the center `remains glossy, slightly runny, and trembling`, and the cut crust `cracks naturally, revealing juicy white pork`; the shengjianbao case has broth falling `in long glossy strands` and bottoms crisping into `golden lace-like crusts`.
- List the sounds in the order of the actions. The katsudon audio block asks to `Synchronize realistic ASMR cooking sounds` and names mallet, knife, sizzle, bubbling dashi, chopsticks and a ceramic clink, over city-pop at 110 to 120 BPM, ending on one wind-chime tone.
- Break eating into small steps and put the line after them. In the oden vlog she `blows on it gently, then takes a bite`, chews, looks at the camera, then says a short line; the spicy challenge lines up bowls from mildest to hottest so each bowl moves her reaction one step.
- Fence off the dish and the screen. The katsudon negative block says `No unrelated ingredients or dishes. Katsudon only` and bans subtitles, UI, logos and text overlays, then asks to keep food, hands and utensils consistent.

**Examples:** [#1](https://goodcase.ai/cases/seedance-create-a-30-second-fast-paced-cinematic-japanese-anime-cooking-video-showing-th-236ad940a8f1) [#2](https://goodcase.ai/cases/just-sharon7-seedance-ai-0a85559bbf5e) [#3](https://goodcase.ai/cases/oggii-0-seedance-ai-5ed8176ffb89) [#4](https://goodcase.ai/cases/seedance-create-a-hyper-realistic-cinematic-15-second-food-video-in-the-exact-glossy-ult-6f3f25cbf4e6)

**Structure:**

1. Opening line: duration, look (anime film, glossy commercial or handheld vlog) and the exact dish
2. Style and light paragraph: macro close-ups, shallow depth of field, steam, warm light; for vlogs, the camera device and its flaws
3. If a person is in it: identity lock, outfit and the room or street
4. Timeline by step, raw ingredient to finished dish, one action and one texture change per segment
5. Hero ending: the finished dish alone, slow push-in or arc, steam rising
6. Audio: music style and tempo, then the cooking or eating sounds listed in the order they happen
7. Negative tail: no text, UI or logos, this dish only, food and hands and utensils consistent

**Pitfalls:**

- Hands and utensils warp in close-up, chopsticks multiply or the knife bends. Give each beat one utensil, keep the macro on the food, and add a line that hands and utensils stay consistent.
- The dish drifts halfway through, ingredients swap or a new dish appears. Name the dish, list its ingredients, and exclude unrelated food the way the katsudon case does.
- Too many shots squeezed into one paragraph. The shengjianbao case packs six shots into 15 seconds with no timecodes and jumps from eating back to cooking, so the model picks its own order; give each step at least two seconds and a timecode.
- Talking with a full mouth breaks the lip sync and the chewing. Let her bite, chew and swallow first, then say the line, the way the oden vlog spaces each bite and sentence.
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/food-asmr.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
