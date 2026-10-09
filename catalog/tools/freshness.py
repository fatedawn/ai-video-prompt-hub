#!/usr/bin/env python3
"""Freshness rule for catalog/registry.json — the single place where "active" vs "stale" is decided.

Rule (user decision, 2026-10-09): only projects that were still pushed to in 2026 are recommended.
  status = "active"  if pushed >= registry["freshness"]["cutoff"] and the repo is not archived
  status = "stale"   otherwise (stale_reason: "before-cutoff" | "archived")
Change the cutoff in ONE place: registry.json → "freshness": {"cutoff": "YYYY-MM-DD"}.
`active_2026` is kept as a plain fact (pushed in calendar year 2026 or later), independent of the cutoff.
Stale entries stay listed (collapsed "历史/不再推荐" section on category pages) but router/MCP skip them
unless include_stale is set. Original work for ai-video-prompt-hub, Apache-2.0, © 2026 天机.
Usage: python3 catalog/tools/freshness.py [--dry-run]
"""
import json, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
REG = ROOT / "catalog" / "registry.json"
DEFAULT = {"cutoff": "2026-01-01",
           "rule_zh": "最后一次推送在截止日（含）之后、且未归档 = active；否则 stale。stale 条目仍列出（分类页折叠在「历史/不再推荐」），router 推荐与 MCP 检索默认排除，传 include_stale 才返回。",
           "rule_en": "active = last push on/after the cutoff and not archived; otherwise stale. Stale entries stay listed but are excluded from router recommendations and MCP search unless include_stale is set."}


def classify(e, cutoff):
    pushed = e.get("pushed") or ""
    e["active_2026"] = pushed >= "2026-01-01"
    if e.get("archived") or e.get("maturity") == "archived":
        e["status"], e["stale_reason"] = "stale", "archived"
    elif pushed >= cutoff:
        e["status"] = "active"
        e.pop("stale_reason", None)
    else:
        e["status"], e["stale_reason"] = "stale", "before-cutoff"
    return e["status"]


def apply(reg):
    fr = reg.setdefault("freshness", {})
    for k, v in DEFAULT.items():
        fr.setdefault(k, v)
    counts = {"active": 0, "stale": 0}
    for e in reg["entries"]:
        counts[classify(e, fr["cutoff"])] += 1
    fr["counts"] = counts
    return counts


def main():
    reg = json.loads(REG.read_text(encoding="utf-8"))
    c = apply(reg)
    print(f"cutoff {reg['freshness']['cutoff']}: active {c['active']} · stale {c['stale']}")
    if "--dry-run" not in sys.argv:
        REG.write_text(json.dumps(reg, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
