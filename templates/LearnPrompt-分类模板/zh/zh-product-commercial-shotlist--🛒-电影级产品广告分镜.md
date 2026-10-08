---
id: "learnprompt-tpl-zh-product-commercial-shotlist"
title: "🛒 电影级产品广告分镜"
model: ""
language: "zh"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/product-commercial-shotlist.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🛒 电影级产品广告分镜

> 8 到 20 秒的精修广告：开头写死广告美学，中间是编号或计时的分镜拆解，结尾一个英雄镜头，最后甩一段关键词。

## 模板（中文）

```text
我要做一条电影质感的产品广告，【我的产品是一款哑光黑的无线耳机，产品图片我提供给你】，【想要的调性是：冷峻、科技感、慢节奏】，【时长 10 秒，横屏 16:9】。请根据下面这个提示语模板，帮我改写成一条可以直接用的 Seedance 视频提示语：

#### 电影级产品广告分镜

8 到 20 秒的精修广告：开头写死广告美学，中间是编号或计时的分镜拆解，结尾一个英雄镜头，最后甩一段关键词。

**适用场景:** 美妆、饮品、珠宝、汽车、香水这类要读成投放级制作、不能读成创作者视频的广告。

**要点:**

- 分镜之前先写广告美学词：premium beauty-commercial aesthetics、luxury advertising aesthetic、变形宽银幕镜头、体积光。它决定后面每个镜头的光线逻辑。
- 每个微距和慢动作都指名拍什么：泡沫质地、液体飘带、钻石色散、金属反光扫过包装。不指名的微距只会给一个通用虚化特写。
- 参考图定义的是终帧构图就直说。剪纸香水那条写 `Use @image1 as the exact final hero-frame composition. Use @image2 as the strict product identity lock`，再在 PRODUCT LOCK 标题下列出瓶身轮廓、几何镂空、内胆、瓶盖和铭牌。
- 上屏文字单独成行并带时段，比如 0-2s 的 `Text: "Cleanse • Refresh • Glow."`，避免它糊满全片。
- 关键词堆在最末尾。散落在分镜之间的风格词会被当成镜头内容读。

**示例:** [#1](https://goodcase.ai/cases/luxury-skincare-commercial) [#2](https://goodcase.ai/cases/case-e53b614b0f42) [#3](https://goodcase.ai/cases/crimson-cola-99e9ec88e937) [#4](https://goodcase.ai/cases/case-7aea1313f63b)

**结构:**

1. 开头段：品类、时长、画幅、广告美学词、调色、景深
2. 英雄产品描述：材质、轮廓、表面处理、光在上面怎么走
3. Shot Breakdown：要么用 `0-2s:` 计时行，要么用 `Shot 1:` 编号行，不要混用
4. 文字与 slogan 行，各自带出现时段
5. Style Keywords 收尾，堆成一个尾块

**常见坑:**

- 指望模型把 logo 或 slogan 渲染干净。留一个干净的收尾帧，字后期合成。
- 把高端广告光和手机 UGC 质感混着写。二选一，混着写会得到塑料感。
- 一拍里堆多种物理效果。液体、烟雾、粉末各占一个镜头。
- 八秒塞八个镜头。单镜低于一秒左右，模型就解析不出单独动作了。
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/product-commercial-shotlist.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
