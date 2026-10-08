---
id: "learnprompt-tpl-en-car-vehicle"
title: "💥 Cars and vehicles at speed"
model: ""
language: "en"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/car-vehicle.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 💥 Cars and vehicles at speed

> The machine has to stay one machine while the camera does all the work. Lock the vehicle part by part, then fill the runtime with a numbered cut list that moves the camera every second.

## 模板（English）

```text
I want a vehicle speed clip. [The vehicle is a white dual-sport motorcycle on a foggy gravel mountain road at dawn.] [The rider is a young man in a worn leather jacket, full-face helmet on the whole time.] Using the prompt template below, rewrite it into one ready-to-use Seedance video prompt for me:

#### Cars and vehicles at speed

The machine has to stay one machine while the camera does all the work. Lock the vehicle part by part, then fill the runtime with a numbered cut list that moves the camera every second.

**Use when:** Motorcycle and car commercials, mountain-road speed runs, chase and stunt sequences, and vehicle transformation clips.

**Guidance:**

- Describe the vehicle by its parts, not by its badge. The Karakoram commercial names `realistic suspension movement, wheel rotation, chain movement, engine vibration`, then requires the proportions to hold for the whole clip.
- Declare the cut count before writing the list. The mountain-road motorcycle case opens with `exactly 16 distinct cuts, total runtime ≈ 16–17 seconds` and then runs CUT 01 through CUT 16, one second each.
- Put the speed in the camera position and in what gets thrown past it. The same case writes `camera drops even lower, almost road-level` and `grass and fence posts racing past`.
- State a ratio at the top and obey it below. The mountain-road case declares `90 % pure kinetic camera motion and 10 % environmental beauty`, and not one of its sixteen cuts stops to admire the view.
- Write a negative list of vehicle-specific failures. Karakoram excludes `no duplicated motorcycle components, no unrealistic wheel geometry, no floating motorcycle`, and the motorcycle-to-dragon case adds that the two must clearly be the same entity.

**Examples:** [#1](https://goodcase.ai/cases/ruzainameer-seedance-ai-e6073ec318f1) [#2](https://goodcase.ai/cases/just-sharon7-seedance-ai-f5af358d1f88) [#3](https://goodcase.ai/cases/karakoram-motorcycle-commercial) [#4](https://goodcase.ai/cases/missdelulu9-seedance-ai-02009f1f7daf)

**Structure:**

1. Opening line: runtime, aspect ratio, frame rate, and the exact number of cuts
2. Vehicle lock: model or type, colour, and the moving parts that have to behave
3. Rider or driver lock: build, gear, helmet, closed with one consistency sentence
4. Road and weather: the surface, what lines both sides of it, the light
5. A ratio line stating how much of the film is camera motion and how much is scenery
6. The numbered cut list, one line per second, each naming a camera position and what streaks past
7. Tail: visual style, then a negative list of the ways a vehicle specifically breaks

**Pitfalls:**

- Naming the vehicle and the road and leaving the rest to the model. Colour and stance then drift every cut; the mountain-road case writes `Preserve the exact bike color, rider silhouette, road markings`.
- Putting two camera positions inside one cut. A second only holds one position, and asking for more makes the model cut in the middle of the shot.
- Writing a transformation as an edit. The motorcycle-to-dragon case demands `No cuts or jumps` and spells the change out piece by piece: wheels become clawed limbs, frame expands into an armoured body.
- Holding a macro shot on the badge or the instrument cluster. Generated lettering comes out wrong; aim the close-ups at tyre contact, suspension compression and the exhaust instead.
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/car-vehicle.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
