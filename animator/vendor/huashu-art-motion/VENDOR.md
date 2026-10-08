# 第三方代码：alchaincyf/huashu-art-motion（MIT）

本目录除本文件 `VENDOR.md` 外，**全部是上游原文件的逐字节拷贝**，版权归原作者，按 MIT 许可提供：

> MIT License · Copyright (c) 2026 alchaincyf (花叔 · 花生) —— 全文见同目录 `LICENSE`（亦见仓库根目录 `LICENSES/alchaincyf_huashu-art-motion-MIT.txt`）

本仓库的 Apache-2.0 **不覆盖**本目录中的上游文件；它只覆盖本仓库自己写的适配层（`animator/src/runtime/fx/huashu.js`、`animator/src/fxcatalog.mjs` 等）和本文件。

| 项目 | 内容 |
|---|---|
| 上游 | https://github.com/alchaincyf/huashu-art-motion |
| 版本 | commit `f178bd7754a71d6d399473af1501634548efa6cb`（2026-10-08） |
| 许可核对 | 上游 `LICENSE`（MIT）+ README「许可证」一节：代码和文档 MIT；例外为 Arphic 笔顺数据、`scripts/engine/lib/fonts/` 的 OFL 字体、花叔卡通形象与角色帧（及含该形象的总览图 / 示范视频）。这些例外**一个都没有拷贝** |
| 磁盘上的改动 | **无**。文件内容与上游该 commit 完全一致（含原注释），可用 `diff -r` 对照 |
| 运行时改动 | 适配层 `huashu.js` 在浏览器里加载这些脚本时，对舞台类脚本（paint / brush / render / post / kit / transitions）做一处内存替换：把 `const W = 1920, H = 1080` 换成读取 `window.STAGE` 的可变尺寸，使笔触、后期和转场能直接画在竖屏 1080×1920 上。风格配方本身仍在原生 1920×1080 舞台上绘制，再按 cover / pan / contain 铺进竖屏。可选 `hideCast` 在运行时让 `RIG` 的少女 / 猫绘制函数变成空操作（不改文件） |

## 拷贝的文件（90 个）

- `LICENSE`
- `scripts/engine/lib/`：`util.js` `motion.js` `paint.js` `brush.js` `render.js` `post.js` `kit.js` `camera.js` `typo.js` `ui.js` `diagram.js` `collage.js` `chart.js` `rig.js`
- `scripts/engine/transitions.js`（50 种转场）、`scripts/engine/eras_gallery.js`（风格名与签名转场表）
- `scripts/engine/scenes/`：35 个风格配方 `01_cave` `02_egypt` `03_greek` `04_roman` `05_gothic` `06_renaissance` `08_impressionism` `09_postimp` `10_nouveau` `11_cubism` `12_bauhaus` `13_pop` `14_8bit` `15_raytrace` `16_2026` `17_ink` `18_klimt` `19_munch` `20_dunhuang` `21_kusama` `22_constructivism` `23_dali` `24_hopper` `25_ghibli` `26_vaporwave` `27_kirby` `28_monet` `29_seurat` `30_matisse` `31_haring` `32_rembrandt` `33_rubberhose` `34_shadowpuppet` `35_shinkai` `36_picasso_blue`（`.js`）
- `references/风格配方/`：上述 35 张配方卡 + `INDEX.md` `_转场_迁移测试.md` `_音轨_艺术史速通.md`

## 没有拷贝的内容及原因

| 上游路径 | 原因 |
|---|---|
| `scripts/engine/lib/fonts/**`、`lib/fonts.js` | 字体文件（SIL OFL，非 MIT）；本仓库不打包任何字体。配方里写的字体名（如 Kalam、Bangers）找不到时回退为系统字体 |
| `reference_films/**`（含 `strokes.js` 笔顺数据、手部 PNG） | Arphic Public License 数据与图片素材，非 MIT |
| `scripts/engine/lib/rig_huashu.js`、`lib/toon.js`（`TOON.bean` 豆子花叔）、`clips/**` | 花叔形象 / 角色，只授权用于上游示范 |
| `scripts/engine/demos/**`、`assets/**`、`examples/**` | 花叔形象与角色帧、总览图、GIF、示例截图等图片素材 |
| `engine.js` `eras.js` `index.html` `clip.*` `render.py` `compare.py` 等脚本、测试、`SKILL.md`、`references/动画语法` 等文档 | 本仓库有自己的渲染管线和文档，不需要；`动画语法` 文档描述花叔角色示范 |

已核对：本目录不含任何图片、字体、base64 数据、Arphic / 文鼎数据或花叔形象（`rig.js` 中的少女与猫是上游用代码绘制的通用角色，MIT；本仓库在背景模式下默认隐藏它们）。
