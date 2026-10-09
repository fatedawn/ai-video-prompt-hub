<!-- 本文件由 `node router/cli.mjs build-catalog` 从 catalog/registry.json 生成，请改 registry.json 后重新生成 -->

# 视频 MCP（7）

和视频生成、配音、工作流相关的 MCP 服务器，以及 mcp.film 这个「MCP 目录」本身（我们不内置它的数据）。非官方、可能违反平台条款的接口服务器不收录。

> 数据核验于 2026-10-09（GitHub API）；★ 与日期会变化。许可证以仓库 LICENSE 原文为准，⚠️ 标记的条目商用前务必阅读原许可证。

| 项目 | ★ | 最近更新 | 许可 | 简介 | 路线 | 输入→输出 | 成本 | 中文 | 怎么接入本仓库 |
|---|---|---|---|---|---|---|---|---|---|
| [MiniMax-AI/MiniMax-MCP](https://github.com/MiniMax-AI/MiniMax-MCP) | 1583 | 2026-08-20 | MIT | MiniMax 官方 MCP：语音、克隆、图像、海螺视频、音乐。调用需要你自己的 API key | B-videogen | text/audio→mp4/audio | API key | 中英 | 与 videogen 的 minimax provider 同类，走 MCP 而不是本仓库 CLI；key 不要写进仓库 |
| [ATH-MaaS/Pixelle-MCP](https://github.com/ATH-MaaS/Pixelle-MCP) | 1127 | 2025-12-17 | MIT | 把 ComfyUI 工作流暴露成 MCP 工具，在本地图/视频工作流上给 Agent 用 | B-videogen | text/image→image/mp4 | GPU/免费CPU | 中英 | 已有 ComfyUI 时的 MCP 外壳；本仓库 videogen 的 comfyui provider 是另一条直连方式 |
| [joenorton/comfyui-mcp-server](https://github.com/joenorton/comfyui-mcp-server) | 407 | 2026-02-17 | Apache-2.0 | 本地 ComfyUI 的 MCP 服务器，Apache-2.0，用来提交和查看工作流 | B-videogen | text/image→image/mp4 | GPU | 英文 | 目录里另有其他 ComfyUI MCP；选一个即可，不要同时把 key 或工作流密钥提交到 git |
| [luminarylane/fal-mcp-server](https://github.com/luminarylane/fal-mcp-server) | 58 | 2026-05-04 | MIT | 社区版 fal MCP，用 fal 的密钥调用其视频/图像模型 | B-videogen | text/image→mp4/image | API key | 英文 | videogen 已有 fal provider；这是 MCP 形态的同类入口 |
| [AceDataCloud/SeedanceMCP](https://github.com/AceDataCloud/SeedanceMCP) | 20 | 2026-10-08 | MIT<br><sub>MIT 只覆盖这个 MCP 代码。生成服务的条款以 AceData / 模型提供方为准。</sub> | 第三方 Seedance API 的 MCP 封装，需要该服务的 key，不是字节官方客户端 | B-videogen | text→mp4 | API key | 英文 | 没有官方 API、又接受第三方中转时的选项；key 放在你自己的环境变量里 |
| [c47-inc/mcp-film](https://github.com/c47-inc/mcp-film) | 6 | 2026-10-08 | MIT | mcp.film：影视相关 MCP 服务器的目录站点，不是我们内置的数据。这里只收录这个目录本身 | M-method | query→links | 免费CPU | 英文 | 要找更多影视 MCP 时去它的目录检索；本仓库不厂商化（vendor）它的 registry |
| [runwayml/runway-mcp-plugin](https://github.com/runwayml/runway-mcp-plugin) | 3 | 2026-09-11 | MIT | Runway 官方 MCP 插件，给 Cursor 等客户端调用 Runway，需要 Runway 账号 | B-videogen | text/image→mp4 | API key | 英文 | 官方插件，优先于非官方中转；本目录不代跑、不保存密钥 |

[← 返回目录](README.md)
