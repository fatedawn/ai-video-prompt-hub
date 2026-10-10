# 角色包笔记 · 小问 & 爸爸（示例）

本目录是 **flat2svg 流水线** 的示例输出：扁平定妆 → VTracer → 已核对的 SVG。

| 文件 | 内容 |
|---|---|
| `dad-half.svg` | 爸爸半身扁平矢量 |
| `dad-sheet.svg` | 爸爸设定表扁平矢量 |
| `xiaowen-full.svg` | 小问全身扁平矢量 |
| `src/dad-half-src-in.png` 等 | 对应扁平源图（转 SVG 前的输入） |

## 怎么用

1. 定妆 / 参考仍以你自己的扁平 PNG 为准；这里的 SVG 便于进 animator、白板引擎或手工改路径。
2. 从源图重跑：

```bash
node tools/flat2svg/cli.mjs convert \
  tools/flat2svg/examples/xiaowen-dad/src/xiaowen-full-src-in.png \
  -o /tmp/xiaowen-full.svg --preset clean --check
```

脸部细节不够时试 `--preset face-safe`（路径更多）。

3. 系列人设摘要见仓库外工作区的角色圣经时，以「扁平定妆 + 同特征 SVG」锁定发型、眼镜、服装颜色；**本示例仅作管线演示**，不替代你的主参考图。

## 许可

示例图与 SVG 随本仓库按 **Apache-2.0（© 2026 天机）** 提供。转换引擎 [visioncortex/vtracer](https://github.com/visioncortex/vtracer) 为 MIT，需本机自行安装，不随仓库分发。
