#!/usr/bin/env python3
"""Rebuild indexes from the prompt files (no network, no upstream clones needed).

- moves each prompts/**.md into the folder implied by its front matter (medium/direction/genre)
- writes data/prompts/part-NN.jsonl + data/prompts/part-NN.csv (sharded, each file < 8 MB so nothing in the repo exceeds
  GitHub's soft limits), data/index.csv (metadata only, one row per prompt) and data/templates.jsonl
- link-only entries (front matter `access: link-only`, see scripts/audit.py) are indexed with an empty prompt
- writes prompts/README.md and a README.md index in every genre folder
- rewrites the statistics block in the top-level README.md (between STATS markers)
Usage: python3 scripts/build_index.py [--check]
"""
import csv, json, re, shutil, sys
from collections import Counter, defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from hub_common import read_front_matter, iter_fences, LANG_LABEL
from classify import folder_for

ROOT = Path(__file__).resolve().parent.parent
REQUIRED = ["id", "title", "language", "medium", "genre", "source_repo", "source_url", "license", "changes"]
SOURCE_ORDER = ["YouMind-OpenLab/awesome-seedance-2-prompts", "LearnPrompt/awesome-seedance", "ZeroLu/awesome-seedance",
                "Emily2040/seedance-2.0", "lixiaoxiao9888-create/manju-laoli-skill", "dexhunter/seedance2-skill", "HBAI-Ltd/Toonflow-app"]
MEDIUM_ORDER = ["漫剧", "真人", "其他"]
AUDIT_ZH = {"real-person": "真实人物", "sexual": "性内容", "politics": "政治敏感", "hate": "仇恨", "self-harm": "自残",
            "drugs-weapons": "毒品 / 武器", "gore": "极端血腥", "copyrighted-character": "版权角色 / IP", "brand-ad": "品牌官方广告冒用风险"}
SHARD_BYTES = 8 * 1024 * 1024


def parse_file(p, required):
    meta, body = read_front_matter(p.read_text(encoding="utf-8"))
    for k in required:
        if k not in meta or meta[k] in (None, ""):
            raise ValueError(f"{p}: missing {k}")
    lines = body.split("\n")
    fences = list(iter_fences(lines))
    if meta.get("access") == "link-only":
        if fences or not meta.get("audit_reason"):
            raise ValueError(f"{p}: link-only entry must have audit_reason and no prompt text")
        return meta, "", []
    if not fences:
        raise ValueError(f"{p}: no code block")
    prompt = "\n".join(fences[0][3])
    variants = []
    for o, c, info, content in fences[1:]:
        label = next((lines[j][4:].strip() for j in range(o, -1, -1) if lines[j].startswith("### ")), None)
        variants.append(dict(label=label, text="\n".join(content)))
    return meta, prompt, variants


def load(kind_dir):
    out = []
    for p in sorted((ROOT / kind_dir).rglob("*.md")):
        if p.name == "README.md":
            continue
        meta, prompt, variants = parse_file(p, REQUIRED if kind_dir == "prompts" else ["id", "title", "source_repo", "source_url", "license"])
        out.append(dict(path=p, meta=meta, prompt=prompt, variants=variants))
    return out


def relocate(items):
    moved = 0
    for it in items:
        target = ROOT / "prompts" / folder_for(it["meta"]) / it["path"].name
        if target != it["path"]:
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.move(str(it["path"]), str(target))
            it["path"] = target
            moved += 1
    for d in sorted((ROOT / "prompts").rglob("*"), key=lambda x: -len(x.parts)):
        if d.is_dir() and not any(x for x in d.iterdir() if x.name != "README.md"):
            shutil.rmtree(d)
    return moved


def md_table(rows, head):
    out = ["| " + " | ".join(head) + " |", "|" + "|".join(["---"] * len(head)) + "|"]
    out += ["| " + " | ".join(str(c) for c in r) + " |" for r in rows]
    return "\n".join(out)


def esc(s):
    return (s or "").replace("|", "\\|").replace("\n", " ")


def write_folder_indexes(items):
    by = defaultdict(list)
    for it in items:
        by[it["path"].parent].append(it)
    for folder, its in by.items():
        rel = folder.relative_to(ROOT / "prompts")
        rows = []
        for it in sorted(its, key=lambda x: x["meta"]["title"]):
            m = it["meta"]
            author = m.get("original_author") or "—"
            if m.get("original_post_url"):
                author = f"[{esc(author)}]({m['original_post_url']})"
            rows.append([f"[{esc(m['title'])}]({it['path'].name.replace(' ', '%20')})", LANG_LABEL.get(m["language"], m["language"]),
                         esc(m.get("model")) or "—", m.get("art_style") or "—",
                         f"[{m['source_repo'].split('/')[1]}](https://github.com/{m['source_repo']})", author])
        head = ["标题", "语言", "模型", "画风", "收录来源", "原作者 / 原帖"]
        if not any(it["meta"]["medium"] == "漫剧" for it in its):
            head.pop(3); rows = [r[:3] + r[4:] for r in rows]
        text = f"# {rel}\n\n共 {len(its)} 条（由 `scripts/build_index.py` 自动生成，请勿手改）。\n\n" + md_table(rows, head) + "\n"
        (folder / "README.md").write_text(text, encoding="utf-8")


def stats_block(items, templates):
    n = len(items)
    lo = [it for it in items if it["meta"].get("access") == "link-only"]
    rep = ROOT / "data" / "extraction_report.json"
    n_ex = len(json.loads(rep.read_text(encoding="utf-8")).get("audit", {}).get("excluded", [])) if rep.exists() else 0
    tp = [it for it in items if it["meta"].get("third_party_author")]
    no_trace = [it for it in tp if "no_traceable_original_post" in it["meta"].get("flags", [])]
    src = Counter(it["meta"]["source_repo"] for it in items)
    also = Counter(a["source_repo"] for it in items for a in it["meta"].get("also_in", []))
    lic = {it["meta"]["source_repo"]: it["meta"]["license"] for it in items}
    src_lo = Counter(it["meta"]["source_repo"] for it in lo)
    rows = [[f"[{s}](https://github.com/{s})", src[s], src[s] - src_lo.get(s, 0), src_lo.get(s, 0), also.get(s, 0), lic.get(s, "")]
            for s in SOURCE_ORDER if src.get(s) or also.get(s)]
    out = [f"**提示词总数：{n} 条**（跨来源去重后）；另有可复用模板 {len(templates)} 个（见 `templates/`）。",
           f"其中 **{len(tp)} 条** 的提示词版权属于第三方原作者（X/Twitter、微信公众号、博客等，已保留原作者与原帖链接），"
           f"其中 {len(no_trace)} 条上游未给出可追溯的原帖链接（已在文件中标记 `no_traceable_original_post`）。", "",
           f"**全文收录 {n - len(lo)} 条；仅标题 + 署名 + 链接 {len(lo)} 条**（发布前内容审核降级，见下表与 `CONTRIBUTING.md`「内容审核」）"
           + (f"；另有 {n_ex} 条因涉及未成年人或年龄不明人物的性化内容未收录（只在 `data/extraction_report.json` 记 id 与原因）" if n_ex else "") + "。", "",
           md_table([[AUDIT_ZH.get(k, k), f"`{k}`", c] for k, c in Counter(it["meta"]["audit_reason"] for it in lo).most_common()],
                    ["降级原因", "代码", "条数"]), "",
           "### 按收录来源", "", md_table(rows, ["来源仓库", "收录条数（去重后归属）", "全文", "仅链接", "另作为重复项出现", "上游许可"]), ""]
    # medium / direction / genre
    tree = Counter((it["meta"]["medium"], it["meta"].get("direction"), it["meta"]["genre"]) for it in items)
    rows = []
    for med in MEDIUM_ORDER:
        for (m, d, g), c in sorted(tree.items(), key=lambda x: (x[0][1] or "", -x[1])):
            if m == med:
                path = f"prompts/{m}/{d}/{g}" if d else f"prompts/{m}/{g}"
                rows.append([m, d or "—", f"[{g}]({path}/)", c])
    med = Counter(it["meta"]["medium"] for it in items)
    md = Counter((it["meta"]["medium"], it["meta"].get("direction")) for it in items if it["meta"]["medium"] != "其他")
    summary = "；".join(f"**{m}** {med[m]} 条" + (f"（现实向 {md[(m, '现实向')]} / 特效向 {md[(m, '特效向')]}）" if m != "其他" else "")
                       for m in MEDIUM_ORDER if med.get(m))
    out += ["### 按分类（媒介 / 方向 / 题材）", "", summary, "", md_table(rows, ["媒介", "方向", "题材", "条数"]), ""]
    art = Counter(it["meta"].get("art_style") for it in items if it["meta"]["medium"] == "漫剧")
    out += ["### 漫剧画风（art_style）", "", md_table([[a, c] for a, c in art.most_common()], ["画风", "条数"]), ""]
    lang = Counter(it["meta"]["language"] for it in items)
    out += ["### 按语言（主版本）", "", md_table([[LANG_LABEL.get(l, l), c] for l, c in lang.most_common()], ["语言", "条数"]), ""]
    nv = sum(1 for it in items if it["variants"])
    out.append(f"另有 {nv} 条附带上游提供的其他语言版本（如 YouMind 的中/英版本）。")
    model = Counter(it["meta"].get("model") or "未注明" for it in items)
    out += ["", "### 按模型（上游标注）", "", md_table([[esc(k), c] for k, c in model.most_common(12)], ["模型", "条数"])]
    tsrc = Counter(t["meta"]["source_repo"] for t in templates)
    out += ["", "### 模板", "", md_table([[f"[{k}](https://github.com/{k})", v] for k, v in tsrc.most_common()], ["来源", "模板数"])]
    return "\n".join(out)


def main():
    check = "--check" in sys.argv
    items = load("prompts")
    templates = load("templates")
    ids = Counter(it["meta"]["id"] for it in items + templates)
    dup = [k for k, v in ids.items() if v > 1]
    assert not dup, f"duplicate ids: {dup[:5]}"
    moved = 0 if check else relocate(items)
    (ROOT / "data").mkdir(exist_ok=True)
    def rec(it):
        d = dict(it["meta"]); d["path"] = str(it["path"].relative_to(ROOT)); d["prompt"] = it["prompt"]; d["variants"] = it["variants"]
        return d
    cols = ["id", "title", "title_en", "medium", "direction", "genre", "art_style", "language", "model", "access", "audit_reason", "source_repo",
            "source_url", "license", "original_author", "original_post_url", "third_party_author", "path", "prompt"]
    def row(r, with_prompt=True):
        return ["; ".join(r[c]) if isinstance(r.get(c), list) else r.get(c) for c in (cols if with_prompt else cols[:-1])]
    if not check:
        ddir = ROOT / "data" / "prompts"
        if ddir.exists():
            shutil.rmtree(ddir)
        ddir.mkdir(parents=True)
        for old in ("prompts.jsonl", "prompts.csv"):
            (ROOT / "data" / old).unlink(missing_ok=True)
        part, size, fj, fc, wc = 0, SHARD_BYTES, None, None, None
        for it in sorted(items, key=lambda x: x["meta"]["id"]):
            r = rec(it)
            line = json.dumps(r, ensure_ascii=False) + "\n"
            if size + len(line.encode()) * 2 > SHARD_BYTES:  # csv row ~ same size as the jsonl line
                for f in (fj, fc):
                    f and f.close()
                part += 1; size = 0
                fj = open(ddir / f"part-{part:02d}.jsonl", "w", encoding="utf-8")
                fc = open(ddir / f"part-{part:02d}.csv", "w", encoding="utf-8-sig", newline="")
                wc = csv.writer(fc); wc.writerow(cols)
            fj.write(line); wc.writerow(row(r)); size += len(line.encode())
        for f in (fj, fc):
            f and f.close()
        with open(ROOT / "data/index.csv", "w", encoding="utf-8-sig", newline="") as f:
            w = csv.writer(f); w.writerow(cols[:-1])
            for it in sorted(items, key=lambda x: x["meta"]["id"]):
                w.writerow(row(rec(it), with_prompt=False))
        with open(ROOT / "data/templates.jsonl", "w", encoding="utf-8") as f:
            for it in sorted(templates, key=lambda x: x["meta"]["id"]):
                f.write(json.dumps(rec(it), ensure_ascii=False) + "\n")
        write_folder_indexes(items)
        # prompts/README.md
        tree = Counter(it["path"].parent.relative_to(ROOT / "prompts").as_posix() for it in items)
        lines = ["# prompts/ 目录索引", "", "由 `scripts/build_index.py` 自动生成。分类规则见仓库根目录 README「分类体系」。", ""]
        lines += [f"- [{k}]({k}/) — {v} 条" for k, v in sorted(tree.items(), key=lambda x: (MEDIUM_ORDER.index(x[0].split('/')[0]), x[0]))]
        (ROOT / "prompts/README.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
        readme = ROOT / "README.md"
        if readme.exists():
            t = readme.read_text(encoding="utf-8")
            new = re.sub(r"(<!-- STATS:START -->).*?(<!-- STATS:END -->)", lambda m: m.group(1) + "\n" + stats_block(items, templates) + "\n" + m.group(2), t, flags=re.S)
            readme.write_text(new, encoding="utf-8")
    # validation of jsonl
    n = 0
    for part in sorted((ROOT / "data" / "prompts").glob("part-*.jsonl")):
        assert part.stat().st_size < 10 * 1024 * 1024, part
        assert part.with_suffix(".csv").stat().st_size < 10 * 1024 * 1024, part
        with open(part, encoding="utf-8") as f:
            for line in f:
                d = json.loads(line)
                assert bool(d["prompt"].strip()) == (d.get("access") != "link-only"), d["id"]
                n += 1
    assert n == len(items), (n, len(items))
    print(f"prompts: {len(items)}  templates: {len(templates)}  moved: {moved}  jsonl lines: {n}")


if __name__ == "__main__":
    main()
