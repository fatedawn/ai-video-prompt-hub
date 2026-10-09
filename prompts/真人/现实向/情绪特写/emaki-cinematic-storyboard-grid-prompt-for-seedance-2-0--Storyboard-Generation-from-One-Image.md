---
id: "emaki-cinematic-storyboard-grid-prompt-for-seedance-2-0"
title: "Storyboard Generation from One Image"
title_en: "Storyboard Generation from One Image"
model: "Seedance 2.0"
language: "en"
medium: "真人"
direction: "现实向"
genre: "情绪特写"
art_style: null
tags: ["Seedance 2.0", "Emaki", "cinematic"]
source_repo: "hanshs474/seedance-prompts-mcp"
source_url: "https://github.com/hanshs474/seedance-prompts-mcp/blob/05917c359eeeefd3bfbc37fe9b18c56018d22ebc/src/prompts.json#L1"
license: "MIT"
license_url: "https://opensource.org/license/mit"
original_author: "Emaki"
original_author_url: "https://github.com/hanshs474"
original_post_url: null
published: null
third_party_author: false
flags: ["example_video_not_copied"]
also_in: []
source_page: null
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
output_status: "output_unverified"
verification: "attribution_checked"
---

# Storyboard Generation from One Image

> Generate trailer-style storyboards and keyframes from one actor reference image; adding specific locations and emotions to {{scene_brief}} improves shot consistency.

## 提示词（English）

```text
<role> You are an award-winning trailer director + cinematographer + storyboard artist. Your job: take ONE reference image of an actor and create a cohesive cinematic short sequence, then output AI-video-ready keyframes. </role> Color tone reference image 2 <input> User provides: one reference image (image). Scene Brief: {{scene_brief}} </input> <goal> Creat
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### Emaki 提供的日本語版本

[位置](https://github.com/hanshs474/seedance-prompts-mcp/blob/05917c359eeeefd3bfbc37fe9b18c56018d22ebc/src/prompts.json#L1)

```text
<role> あなたは受賞歴のある予告編監督兼撮影監督兼絵コンテアーティストです。役割:俳優の参照画像1枚を受け取り、一貫性のあるシネマティックな短尺シーケンスを構成し、AI動画向けのキーフレームとして出力すること。</role> カラートーンは参照画像2を基準にする。<input> ユーザー入力:参照画像1枚(image)。シーン概要:{{scene_brief}} </input> <goal> 作成する
```

## 出处与许可

- 作者：[Emaki](https://github.com/hanshs474)（上游仓库作者 / 贡献者）
- 收录来源：[hanshs474/seedance-prompts-mcp](https://github.com/hanshs474/seedance-prompts-mcp)，[原文位置](https://github.com/hanshs474/seedance-prompts-mcp/blob/05917c359eeeefd3bfbc37fe9b18c56018d22ebc/src/prompts.json#L1)
- 上游许可：MIT（[许可说明](https://opensource.org/license/mit)；全文见本仓库 `LICENSES/`）
- 示例视频仍在上游 CDN，本仓库不收录图片或视频。
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
- ⚠️ 标记：example_video_not_copied
