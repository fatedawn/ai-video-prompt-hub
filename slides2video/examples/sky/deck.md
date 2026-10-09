---
title: 为什么天空是蓝色的？
aspect: "9:16"
theme: tianji
transition: fade
speed: 1.12
---
layout: image-full
image: 01-sky.jpg
---

# 为什么天空是==蓝色==的？ {build: zoom}
### 答案在一个公式里 {at: 答案}

> say: 天空为什么是蓝色的？答案在一个公式里。

---

# 阳光里藏着彩虹 {id: q}

- 白光 = 七种颜色混在一起 {at: 七种}
- 蓝光**波长**短，红光波长长 {at: 蓝光, mark: "underline:波长", build: pop}

> say: 阳光其实混着七种颜色，
> say: 蓝光波长短，红光波长长。

---
layout: formula
transition: morph
---

# 瑞利散射 {id: q}

$$ I \;\propto\; \frac{1}{\term{\lambda^{4}}} $$ {id: law, terms: ["四次方"]}

空气分子把阳光“弹”向四面八方 {at: 散射}

> say: 空气分子散射阳光，强度和波长的四次方成反比。

---
layout: chart
transition: morph
---

# 蓝光被散射得最多 {id: q}

$$ I \propto 1/\lambda^{4} $$ {id: law}

```chart
type: bar
unit: "×"
bars:
  - {label: "红 700nm", value: 1.0, color: "#e0686b", at: 红光}
  - {label: "绿 530nm", value: 3.0, color: "#57c08a", at: 绿光}
  - {label: "蓝 450nm", value: 5.9, color: "#5b8def", at: 蓝光}
```

> say: 以红光为一，绿光三倍，蓝光差不多六倍。

---
layout: image-right
image: 05-sunset.jpg
transition: huashu:godRays
---

# 夕阳为什么是红的？

- 傍晚光线穿过更厚的空气 {at: 更厚}
- 蓝光被散光，只剩**红光** {at: 散光, mark: "circle:红光", spot: true}

> say: 傍晚光线穿过更厚的空气，蓝光被散光，只剩红光。

---
layout: end
---

# 一句话记住

- 波长越短，散得越多 {at: 越短}

> say: 记住：波长越短，散得越多。
