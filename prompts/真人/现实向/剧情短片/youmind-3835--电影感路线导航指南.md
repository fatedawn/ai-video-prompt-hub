---
id: "youmind-3835"
title: "电影感路线导航指南"
title_en: "Cinematic Route Navigation Guide"
model: "Seedance 2.0"
language: "en"
medium: "真人"
direction: "现实向"
genre: "剧情短片"
art_style: null
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/3e87f7d0da6b30148d2fffcab132f8a5b7905227/README.md#L2161"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "Michael Guo"
original_author_url: "https://x.com/Michaelzsguo"
original_post_url: "https://x.com/Michaelzsguo/status/2048966649982669053"
published: "Apr 28, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=3835"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# 电影感路线导航指南

*Cinematic Route Navigation Guide*

> 这是一个为 Seedance 设计的结构化多场景提示词，旨在创作一段连贯的步行导航视频，包含固定的导游角色以及真实地理位置间的平滑转场。

## 提示词（English）

```text
Create a 5-second cinematic route-guide clip for a walking navigation video.

Continuity:
This is scene {N} of 5 in a route from North Avenue MARTA Station to Coda Tech Square in Atlanta.
The guide is the same stylish female tour guide in every scene: black sunglasses, sleeveless cream belted dress, brown leather belt, tour lanyard, small shoulder bag, brown hair tied back, confident warm expression.
She appears on the sidewalk or plaza only, never in traffic lanes.

Scene role:
{route_step}

Starting frame:
Use the supplied Street View image as the real-world location reference. Preserve the recognizable street layout, building massing, sidewalk direction, signage, and lighting.

Action:
The guide is already in frame, slightly ahead of the viewer. She turns toward the camera, gestures toward the next walking direction, then begins to lead the viewer forward.

Camera:
Smooth handheld walking pace, slight forward push-in, no jumpy zooms, no orbit. Keep horizon stable. The final second should frame the direction of the next scene so the edit can cut naturally.

End frame:
End with the camera facing {next_direction_or_landmark}, with the guide near the edge of frame pointing forward.

Restrictions:
Do not invent a different city, indoor location, parking lot, or tourist group. Do not place the guide in the road. Do not block crosswalks, street signs, building entrances, or the Coda facade.
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/3e87f7d0da6b30148d2fffcab132f8a5b7905227/README_zh.md#L2147)

```text
创建一个 5 秒的电影感路线导航片段，用于步行导航视频。

连贯性：
这是从亚特兰大 North Avenue MARTA 车站到 Coda Tech Square 路线中 5 个场景里的第 {N} 个场景。
导游在每个场景中保持一致：时尚女性，佩戴黑色墨镜，身穿无袖米色束腰连衣裙，系棕色皮带，佩戴导游挂绳，背小挎包，棕色头发束在脑后，表情自信且亲切。
她仅出现在人行道或广场上，绝不出现在车道上。

场景角色：
{route_step}

起始帧：
使用提供的街景图像作为真实地理位置参考。保留可识别的街道布局、建筑体量、人行道方向、标志牌和光照效果。

动作：
导游已在画面中，位于观众前方稍远处。她转向镜头，示意下一个行走方向，然后开始引导观众向前走。

镜头：
平滑的手持步行节奏，轻微向前推进，无突兀缩放，无环绕拍摄。保持地平线稳定。最后一秒应框定下一个场景的方向，以便自然剪辑。

结束帧：
镜头结束时面向 {next_direction_or_landmark}，导游位于画面边缘附近并指向前方。

限制：
不要虚构其他城市、室内地点、停车场或旅游团。不要将导游放置在道路上。不要遮挡人行横道、街道标志、建筑入口或 Coda 的外立面。
```

## 出处与许可

- 原作者：[Michael Guo](https://x.com/Michaelzsguo) · 原帖：<https://x.com/Michaelzsguo/status/2048966649982669053>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/3e87f7d0da6b30148d2fffcab132f8a5b7905227/README.md#L2161)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `3e87f7d0da6b`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=3835>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
