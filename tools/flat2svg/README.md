# flat2svg · 扁平定妆 → VTracer → 核对 SVG

把 **扁平色块定妆图 / 设定图**（PNG、JPG）转成可编辑的 **SVG**，并可选择渲染预览做「是否几乎空白」核对。

本目录代码为本仓库原创（**Apache-2.0，© 2026 天机**）。矢量转换引擎是外部工具 [visioncortex/vtracer](https://github.com/visioncortex/vtracer)（**MIT**），**不随仓库分发代码或二进制**，需本机自行安装。

## 工作流

```
照片 / 写实参考
    ↓  GPT Image 等压成「扁平色块」（少渐变、硬边缘）
扁平定妆 PNG/JPG
    ↓  flat2svg（调用 vtracer）
SVG
    ↓  可选 --check（cairosvg / rsvg 渲 PNG，低方差则失败）
核对通过的 SVG + 预览 PNG
```

直接对照片跑 vtracer 通常会碎成很多色块，不适合当角色矢量；**先扁平化再转**效果好得多。

## 安装

```bash
# 1) VTracer（必需）
cargo install vtracer
export PATH="$HOME/.cargo/bin:$PATH"   # 或设置 VTRACER=/path/to/vtracer

# 2) 可选：--check 渲染预览
#    二选一即可
sudo apt install librsvg2-bin          # 提供 rsvg-convert
# 或
python3 -m pip install cairosvg pillow
```

检查环境：

```bash
node tools/flat2svg/cli.mjs doctor
```

## 用法

```bash
# 默认 clean 预设
node tools/flat2svg/cli.mjs convert flat.png -o char.svg

# 保脸 + 核对（写出 char.preview.png，几乎空白则退出码非 0）
node tools/flat2svg/cli.mjs convert face.png -o face.svg --preset face-safe --check

# 指定预览路径
node tools/flat2svg/cli.mjs convert sheet.png -o sheet.svg --preset clean --check --preview sheet-check.png

# 列出预设参数
node tools/flat2svg/cli.mjs presets
```

### 预设

| 预设 | 适用 | 要点 |
|---|---|---|
| `clean`（默认） | 扁平定妆 / 设定图 | 较高 `filter_speckle`、较少颜色，块面干净 |
| `photo` | 照片 / 写实 | vtracer 官方 `--preset photo` |
| `face-safe` | 需要留五官小色块 | **低** `filter_speckle`（=2），文件更大 |

## 示例资源

- [`examples/xiaowen-dad/`](examples/xiaowen-dad/)：小问 & 爸爸角色包示例 SVG（`dad-half.svg`、`dad-sheet.svg`、`xiaowen-full.svg`）及对应扁平源图 `src/*-src-in.png`
- 说明见 [`examples/xiaowen-dad/CHARACTER_PACK.md`](examples/xiaowen-dad/CHARACTER_PACK.md)
- 测试用小图：[`examples/fixtures/tiny-flat.png`](examples/fixtures/tiny-flat.png)

复现示例（需已安装 vtracer）：

```bash
node tools/flat2svg/cli.mjs convert \
  tools/flat2svg/examples/xiaowen-dad/src/dad-half-src-in.png \
  -o /tmp/dad-half.svg --preset clean --check
```

## 测试

```bash
cd tools/flat2svg && npm test
```

- 始终跑：`--help` / `presets` / 预设解析
- 若本机有 `vtracer`：对 `examples/fixtures/tiny-flat.png` 做一次真实转换
- 若无 vtracer：该用例 **skip** 并打印安装提示（不失败）

## 署名

| 组件 | 许可 | 说明 |
|---|---|---|
| `tools/flat2svg/` 本仓库代码与示例说明 | Apache-2.0，© 2026 天机 | — |
| [visioncortex/vtracer](https://github.com/visioncortex/vtracer) | MIT | **外部 CLI**，`cargo install vtracer`；不入库 |
| 示例 SVG / 扁平源图（小问 & 爸爸） | Apache-2.0，© 2026 天机 | 演示用角色包素材 |

详见仓库根目录 [`NOTICE`](../../NOTICE)、[`ATTRIBUTION.md`](../../ATTRIBUTION.md)。
