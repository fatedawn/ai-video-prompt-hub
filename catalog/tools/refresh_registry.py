#!/usr/bin/env python3
"""Refresh stars / pushed / archived / license facts in catalog/registry.json via the gh CLI.

Hand-written fields (intro_zh, tags, plugs_into, license_note) are never touched.
A licence change is printed for manual review instead of being applied silently.
Afterwards active/stale is recomputed by freshness.py (cutoff lives in registry.json → freshness.cutoff).
Usage:  python3 catalog/tools/refresh_registry.py [--dry-run]
Requires: gh (authenticated). Original work for ai-video-prompt-hub, Apache-2.0.
"""
import json, subprocess, sys, datetime, pathlib

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import freshness  # noqa: E402

ROOT = pathlib.Path(__file__).resolve().parents[2]
REG = ROOT / "catalog" / "registry.json"

def gh(path):
    r = subprocess.run(["gh", "api", path], capture_output=True, text=True)
    return json.loads(r.stdout) if r.returncode == 0 else None

def main():
    dry = "--dry-run" in sys.argv
    reg = json.loads(REG.read_text(encoding="utf-8"))
    changed = 0
    for e in reg["entries"]:
        info = gh(f"repos/{e['repo']}")
        if not info:
            print(f"!! {e['repo']}: 无法访问（可能被删除/改名/设为私有），请人工处理")
            continue
        new = {"stars": info["stargazers_count"], "pushed": (info.get("pushed_at") or "")[:10], "archived": bool(info.get("archived"))}
        spdx = ((info.get("license") or {}).get("spdx_id")) or "NONE"
        if spdx not in ("NOASSERTION", "NONE") and spdx != e["license"]:
            print(f"?? {e['repo']}: GitHub 识别许可证 {spdx}，registry 记录为 {e['license']}，请读 LICENSE 原文后手动更新")
        if spdx == "NONE" and e["license"] != "NONE":
            print(f"?? {e['repo']}: GitHub 未检测到许可证，registry 记录为 {e['license']}，请人工核对")
        if info.get("full_name") and info["full_name"] != e["repo"]:
            print(f"?? {e['repo']}: 仓库已更名为 {info['full_name']}")
        for k, v in new.items():
            if e.get(k) != v:
                e[k] = v
                changed += 1
        today = datetime.date.today().isoformat()
        if e.get("verified_at") != today:
            e["verified_at"] = today
            changed += 1
        if new["archived"]:
            e["maturity"] = "archived"
    reg["checked_at"] = datetime.date.today().isoformat()
    before = {e["repo"]: e.get("status") for e in reg["entries"]}
    counts = freshness.apply(reg)
    flips = [f"{r}: {s} → {e['status']}" for e in reg["entries"] for r, s in [(e["repo"], before.get(e["repo"]))] if s and s != e["status"]]
    print(f"freshness cutoff {reg['freshness']['cutoff']}: active {counts['active']} · stale {counts['stale']}" + ("".join("\n  " + f for f in flips)))
    if not dry:
        REG.write_text(json.dumps(reg, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
        print(f"已更新 {changed} 个字段；接着运行 node router/cli.mjs build-catalog")
    else:
        print(f"[dry-run] 将更新 {changed} 个字段")

if __name__ == "__main__":
    main()
