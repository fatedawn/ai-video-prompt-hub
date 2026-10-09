#!/usr/bin/env python3
"""Ingest additional prompts whose upstream LICENSE was re-read on 2026-10-09.

Does not delete or rewrite existing prompt files. Full text is copied only from
sources whose LICENSE file permits it (CC BY 4.0 / MIT / CC0). Dedup is by
X/Twitter status id and by normalized prompt text. Content audit
(scripts/audit.py) still downgrades or excludes hits.

New entries are marked verification=attribution_checked and
output_status=output_unverified: the LICENSE and the attribution fields were
checked, the original social post was not re-opened one by one.
"""
import json, re, sys
from collections import Counter
from pathlib import Path
from urllib.parse import quote

sys.path.insert(0, str(Path(__file__).resolve().parent))
from hub_common import normalize_ws, write_front_matter, detect_lang, norm_for_dedup, slugify, fence_for, LANG_LABEL
from classify import classify, folder_for
from extract_sources import (parse_youmind_text, youmind_history, render_prompt_file, render_link_only,
                             meta_of, CHANGES)
import audit

ROOT = Path(__file__).resolve().parent.parent
POST = re.compile(r"/status/(\d+)")
CC_BY = "https://creativecommons.org/licenses/by/4.0/"
MIT_URL = "https://opensource.org/license/mit"
CC0 = "https://creativecommons.org/publicdomain/zero/1.0/"
GROK_ID = r"grok-imagine-prompts\?id=(\d+)"

# prompts.chat rows that are themselves a video-generation prompt (CC0), not a chat role.
PCHAT_ACTS = {
    "Underwater Veo 3 video",
    "prompts.chat Promotional Video using Remotion",
    "Romantic Rainy Scene Video",
    "Daiquiri Cocktail Cinematic Video",
    "Manhattan Cocktail Cinematic Video",
    "image to video 360 product rotaion",
    "Action video ",
    "Video Cinematográfico IA | Agente Celestial Designs",
    "The Paradoxical Soundscape: Ancient Acoustic Mysteries Video Exploration",
    "Cinematic Ultra-Realistic Image-to-Video Prompt Engineer",
}


def post_id(url):
    m = POST.search(url or "")
    return m.group(1) if m else None


def load_existing():
    ids, norms, posts = set(), set(), set()
    n = lo = 0
    for part in (ROOT / "data" / "prompts").glob("part-*.jsonl"):
        for line in part.read_text(encoding="utf-8").split("\n"):
            if not line.strip():
                continue
            d = json.loads(line)
            n += 1
            ids.add(d["id"])
            if d.get("access") == "link-only":
                lo += 1
            if d.get("prompt"):
                norms.add(norm_for_dedup(d["prompt"]))
            for v in d.get("variants") or []:
                if v.get("text"):
                    norms.add(norm_for_dedup(v["text"]))
            pid = post_id(d.get("original_post_url"))
            if pid:
                posts.add(pid)
    return {"ids": ids, "norms": norms, "posts": posts, "n": n, "link_only": lo}


def gh_blob(repo, commit, rel, line=None):
    u = f"https://github.com/{repo}/blob/{commit}/{quote(rel)}"
    return u + (f"#L{line}" if line else "")


class Sink:
    def __init__(self, existing):
        self.ex = existing
        self.kept = []
        self.by_norm = {}
        self.stats = Counter()

    def consider(self, r):
        self.stats["candidates"] += 1
        prompt = (r.get("prompt") or "").strip()
        if len(prompt) < 20:
            self.stats["skip_short"] += 1
            return
        pid = post_id(r.get("original_post_url"))
        if pid and pid in self.ex["posts"]:
            self.stats["skip_post_id"] += 1
            return
        if r["id"] in self.ex["ids"] or any(x["id"] == r["id"] for x in self.kept):
            self.stats["skip_id"] += 1
            return
        norm = norm_for_dedup(prompt)
        if not norm:
            self.stats["skip_short"] += 1
            return
        if norm in self.ex["norms"]:
            self.stats["skip_text_existing"] += 1
            return
        if norm in self.by_norm:
            host = self.by_norm[norm]
            host.setdefault("also_in", []).append(dict(
                id=r["id"], source_repo=r["source_repo"], source_url=r["source_url"],
                original_post_url=r.get("original_post_url")))
            self.stats["skip_text_new_batch"] += 1
            return
        for v in r.get("variants") or []:
            vn = norm_for_dedup(v.get("text") or "")
            if vn and vn in self.ex["norms"]:
                self.stats["skip_text_existing"] += 1
                return
        self.by_norm[norm] = r
        if pid:
            self.ex["posts"].add(pid)
        self.ex["norms"].add(norm)
        self.ex["ids"].add(r["id"])
        self.kept.append(r)
        self.stats["kept"] += 1


def renoise(sink):
    repo = Path("/tmp/ingest-src/renoise")
    commit = __import__("subprocess").check_output(["git", "-C", str(repo), "rev-parse", "HEAD"], text=True).strip()
    src_repo = "renoise-ai/awesome-seedance-prompts"
    n = 0
    for fp in sorted((repo / "data" / "prompts").glob("*.json")):
        d = json.loads(fp.read_text(encoding="utf-8"))
        n += 1
        content = normalize_ws(d.get("content") or "")
        author = d.get("author") or {}
        post = (d.get("sourceLink") or "").strip() or None
        rel = f"data/prompts/{fp.name}"
        # line  of "content" key is unstable; permalink the file
        variants = []
        primary_lang = {"zh-CN": "zh", "zh-TW": "zh", "pt-BR": "pt", "ja-JP": "ja"}.get(d.get("language") or "", d.get("language") or None)
        if primary_lang not in LANG_LABEL and primary_lang not in ("en", "zh", "ja", "ko", "es", "pt", "fr", "de"):
            primary_lang = detect_lang(content)
        for lang, obj in (d.get("translations") or {}).items():
            if not isinstance(obj, dict):
                continue
            text = normalize_ws(obj.get("content") or "")
            code = {"zh-CN": "zh", "zh-TW": "zh", "pt-BR": "pt", "ja-JP": "ja"}.get(lang, lang[:2] if lang else "")
            if not text or code == primary_lang or norm_for_dedup(text) == norm_for_dedup(content):
                continue
            variants.append(dict(language=code, label=f"上游提供的{LANG_LABEL.get(code, code)}版本（translations.{lang}）",
                                 text=text, source_url=gh_blob(src_repo, commit, rel)))
        r = dict(
            id=f"renoise-{d.get('id') or fp.stem}", source_key="renoise", source_repo=src_repo,
            source_url=gh_blob(src_repo, commit, rel), license="CC-BY-4.0", license_url=CC_BY,
            title=(d.get("title") or content.split("\n", 1)[0])[:180], title_en=None,
            description=None, model="Seedance 2.0", prompt=content, variants=variants,
            tags=["Seedance 2.0", "Renoise"] + [t for t in (d.get("tags") or []) if isinstance(t, str)][:6],
            original_author=author.get("name"), original_author_url=author.get("link"),
            original_post_url=post, published=d.get("sourcePublishedAt"), third_party_author=True,
            flags=([] if post else ["no_traceable_original_post"]), source_page=None, hints="", kind="prompt",
            language=primary_lang or detect_lang(content),
        )
        sink.consider(r)
    print(f"renoise files {n} commit {commit[:12]}", flush=True)
    return commit


def grok_one(per, pid, head, src_repo):
    en = per["en"].get(pid)
    if not en:
        # no English card: take whichever language we have
        for lang in ("zh", "ja"):
            if pid in per[lang]:
                en = per[lang][pid]
                break
    if not en:
        return None
    olang = en.get("lang") or "en"
    prim = per.get(olang, {}).get(pid) or en
    files = {"en": "README.md", "zh": "README_zh.md", "ja": "README_ja-JP.md"}
    prim_file = files.get(olang if pid in per.get(olang, {}) else "en", "README.md")
    if olang not in per or pid not in per[olang]:
        prim_file = "README.md"
        for lang, f in files.items():
            if pid in per.get(lang, {}):
                prim = per[lang][pid]
                prim_file = f
                olang = prim.get("lang") or lang
                break
    prompt = normalize_ws(prim["prompt"])
    language = "en" if olang != "en" and detect_lang(prompt) == "en" else (olang if olang in LANG_LABEL or olang == "en" else detect_lang(prompt))
    variants = []
    for vl, f in files.items():
        if vl == language or pid not in per.get(vl, {}):
            continue
        v = per[vl][pid]
        variants.append(dict(language=vl, label=f"YouMind 提供的{LANG_LABEL.get(vl, vl)}版本（{f}）",
                             text=normalize_ws(v["prompt"]),
                             source_url=gh_blob(src_repo, v["commit"], f, v["line"])))
    a = prim.get("author") or en.get("author")
    src = en.get("source") or prim.get("source")
    r = dict(
        id=f"grok-{pid}", source_key="grok", source_repo=src_repo,
        source_url=gh_blob(src_repo, prim["commit"], prim_file, prim["line"]),
        license="CC-BY-4.0", license_url=CC_BY,
        title=prim["title"][:180], title_en=en["title"] if en is not prim else None,
        description=prim.get("desc"), model="Grok Imagine", prompt=prompt, variants=variants,
        tags=["Grok Imagine", "YouMind"], original_author=a[1] if a else None,
        original_author_url=a[2] if a else None, original_post_url=src[2] if src else None,
        published=en.get("published"), third_party_author=True,
        flags=([] if (a and src) else ["no_traceable_original_post"]),
        source_page=en.get("page"), hints="", kind="prompt", language=language,
        history_note=None if prim["commit"] == head else
            f"- 说明：YouMind 的 README 由 CMS 轮换展示；本条取自该仓库 README 历史版本（commit `{prim['commit'][:12]}`），与当前版本同为 CC BY 4.0",
    )
    return r


def grok(sink):
    repo = "/tmp/ingest-src/grok"
    import subprocess
    head = subprocess.check_output(["git", "-C", repo, "rev-parse", "HEAD"], text=True).strip()
    src_repo = "YouMind-OpenLab/awesome-grok-imagine-prompts"
    files = {"en": "README.md", "zh": "README_zh.md", "ja": "README_ja-JP.md"}
    per = {}
    for lang, rel in files.items():
        print(f"grok history {rel} …", flush=True)
        per[lang] = youmind_history(repo, rel, head, id_re=GROK_ID)
        print(f"  {lang} ids {len(per[lang])}", flush=True)
    ids = set().union(*[set(v) for v in per.values()])
    for pid in sorted(ids, key=lambda x: int(x) if x.isdigit() else 0):
        r = grok_one(per, pid, head, src_repo)
        if r:
            sink.consider(r)
    return head


def emaki(sink):
    raw = json.loads(Path("/tmp/ingest-src/misc/emaki-prompts.json").read_text(encoding="utf-8"))
    # line numbers from the same file
    lines = Path("/tmp/ingest-src/misc/emaki-prompts.json").read_text(encoding="utf-8").splitlines()
    src_repo = "hanshs474/seedance-prompts-mcp"
    commit = "HEAD"  # replaced below
    import subprocess
    commit = subprocess.check_output(["gh", "api", f"repos/{src_repo}/commits/HEAD", "--jq", ".sha"], text=True).strip()
    for item in raw:
        slug = item["slug"]
        line = next((i + 1 for i, l in enumerate(lines) if slug in l), None)
        en = normalize_ws(item.get("prompt_en") or "")
        ja = normalize_ws(item.get("prompt_ja") or "")
        primary = en or ja
        language = detect_lang(primary)
        variants = []
        if ja and en and norm_for_dedup(ja) != norm_for_dedup(en):
            other = ja if language != "ja" else en
            ol = "ja" if other == ja else "en"
            variants.append(dict(language=ol, label=f"Emaki 提供的{LANG_LABEL.get(ol, ol)}版本",
                                 text=other, source_url=gh_blob(src_repo, commit, "src/prompts.json", line)))
        r = dict(
            id="emaki-" + slug[:70], source_key="emaki", source_repo=src_repo,
            source_url=gh_blob(src_repo, commit, "src/prompts.json", line),
            license="MIT", license_url=MIT_URL,
            title=(item.get("title_en") or item.get("title") or slug)[:180],
            title_en=item.get("title_en"), description=item.get("desc_en") or item.get("desc"),
            model="Seedance 2.0", prompt=primary, variants=variants,
            tags=["Seedance 2.0", "Emaki", item.get("cat") or ""],
            original_author="Emaki", original_author_url="https://github.com/hanshs474",
            original_post_url=None, published=None, third_party_author=False,
            flags=["example_video_not_copied"], source_page=None, hints="", kind="prompt",
            language=language,
        )
        sink.consider(r)
    return commit


def pchat(sink):
    import csv
    csv.field_size_limit(10_000_000)
    src_repo = "f/awesome-chatgpt-prompts"
    import subprocess
    commit = subprocess.check_output(["gh", "api", f"repos/{src_repo}/commits/main", "--jq", ".sha"], text=True).strip()
    path = Path("/tmp/ingest-src/misc/prompts.csv")
    # approximate line: csv row number + 1 header
    with path.open(encoding="utf-8") as f:
        for i, row in enumerate(csv.DictReader(f), start=2):
            if row.get("act") not in PCHAT_ACTS:
                continue
            prompt = normalize_ws(row.get("prompt") or "")
            who = (row.get("contributor") or "").strip() or "prompts.chat contributor"
            r = dict(
                id="pchat-" + __import__("hashlib").sha1(prompt.encode()).hexdigest()[:12],
                source_key="pchat", source_repo=src_repo,
                source_url=gh_blob(src_repo, commit, "prompts.csv", i),
                license="CC0-1.0", license_url=CC0,
                title=(row.get("act") or "video prompt").strip()[:180], title_en=None,
                description=None, model="unspecified", prompt=prompt, variants=[],
                tags=["prompts.chat", "CC0", row.get("type") or ""],
                original_author=who, original_author_url=None, original_post_url=None,
                published=None, third_party_author=True, flags=["no_traceable_original_post"],
                source_page="https://prompts.chat", hints="", kind="prompt",
                language=detect_lang(prompt),
            )
            sink.consider(r)
    return commit


def veo3(sink):
    repo = Path("/tmp/ingest-src/veo3")
    import subprocess
    commit = subprocess.check_output(["git", "-C", str(repo), "rev-parse", "HEAD"], text=True).strip()
    src_repo = "liu-kaining/Awesome-Veo3-Prompts"
    from hub_common import iter_fences, read_front_matter
    for fp in sorted((repo / "prompts").glob("*.md")):
        text = fp.read_text(encoding="utf-8")
        lines = text.splitlines()
        title = next((l[2:].strip() for l in lines if l.startswith("# ")), fp.stem)
        fences = list(iter_fences(lines))
        if not fences:
            continue
        o, c, info, content = fences[0]
        prompt = normalize_ws("\n".join(content))
        rel = f"prompts/{fp.name}"
        r = dict(
            id="veo3-" + slugify(fp.stem, 50), source_key="veo3", source_repo=src_repo,
            source_url=gh_blob(src_repo, commit, rel, o + 1),
            license="MIT", license_url=MIT_URL, title=title[:180], title_en=None,
            description=None, model="Veo 3", prompt=prompt, variants=[],
            tags=["Veo 3", "liu-kaining"], original_author="liu-kaining",
            original_author_url="https://github.com/liu-kaining", original_post_url=None,
            published=None, third_party_author=False, flags=[], source_page=None, hints="",
            kind="prompt", language=detect_lang(prompt + title),
        )
        sink.consider(r)
    return commit


def write_all(sink, commits):
    overrides = audit.load_overrides(ROOT / "data" / "audit_overrides.tsv")
    decisions = {}
    excluded = []
    link_only = []
    for r in sink.kept:
        act, reason, _note = audit.decide(r, overrides)
        decisions[r["id"]] = (act, reason)
        if act == "exclude":
            excluded.append(r)
        elif act == "link-only":
            link_only.append(r["id"])
    drop = {r["id"] for r in excluded}
    written = 0
    by_src = Counter()
    by_src_lo = Counter()
    for r in sink.kept:
        if r["id"] in drop:
            continue
        cls = classify(r["title"], r.get("title_en") or "", r.get("description") or "", r["prompt"], r["tags"], r.get("hints", ""))
        meta = meta_of(r, cls)
        meta["output_status"] = "output_unverified"
        meta["verification"] = "attribution_checked"
        lo = r["id"] in link_only
        if lo:
            meta["access"] = "link-only"
            meta["audit_reason"] = decisions[r["id"]][1]
        folder = ROOT / "prompts" / folder_for(meta)
        folder.mkdir(parents=True, exist_ok=True)
        fn = folder / f"{r['id'][:60]}--{slugify(r['title'])}.md"
        if fn.exists():
            raise SystemExit(f"refusing to overwrite {fn}")
        body = render_link_only(r, meta["audit_reason"]) if lo else render_prompt_file(r)
        if r.get("history_note") and not lo:
            body = body.replace("- 本仓库所做改动：", r["history_note"] + "\n- 本仓库所做改动：")
        if r["source_key"] == "emaki" and not lo:
            body = body.replace("- 本仓库所做改动：", "- 示例视频仍在上游 CDN，本仓库不收录图片或视频。\n- 本仓库所做改动：")
        fn.write_text(write_front_matter(meta) + "\n" + body, encoding="utf-8")
        written += 1
        by_src[r["source_repo"]] += 1
        if lo:
            by_src_lo[r["source_repo"]] += 1
    rep_path = ROOT / "data" / "extraction_report.json"
    rep = json.loads(rep_path.read_text(encoding="utf-8"))
    rep.setdefault("audit", {}).setdefault("excluded", [])
    rep["audit"]["excluded"].extend(dict(id=r["id"], reason=decisions[r["id"]][1], source_repo=r["source_repo"]) for r in excluded)
    rep["ingest_2026_10_09"] = dict(
        note="LICENSE re-read via GitHub API before copy. verification=attribution_checked, output_status=output_unverified (original posts not re-opened).",
        before=dict(prompts=sink.ex["n"], link_only_before_this_ingest="see index at start"),
        commits=commits,
        sink=dict(sink.stats),
        written=written,
        by_source=dict(by_src),
        link_only_by_source=dict(by_src_lo),
        link_only_reasons=dict(Counter(decisions[i][1] for i in link_only)),
        excluded=len(excluded),
    )
    rep_path.write_text(json.dumps(rep, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(json.dumps(rep["ingest_2026_10_09"], ensure_ascii=False, indent=1))


def main():
    ex = load_existing()
    print(f"existing prompts {ex['n']} link-only {ex['link_only']} post-ids {len(ex['posts'])}", flush=True)
    # freeze the before-counts; Sink mutates ex sets
    before = {"prompts": ex["n"], "link_only": ex["link_only"]}
    sink = Sink(ex)
    commits = {
        "renoise-ai/awesome-seedance-prompts": renoise(sink),
        "YouMind-OpenLab/awesome-grok-imagine-prompts": grok(sink),
        "hanshs474/seedance-prompts-mcp": emaki(sink),
        "f/awesome-chatgpt-prompts": pchat(sink),
        "liu-kaining/Awesome-Veo3-Prompts": veo3(sink),
    }
    print("sink", dict(sink.stats), "kept", len(sink.kept), flush=True)
    write_all(sink, commits)
    (ROOT / "data" / "ingest_2026_10_09_before.json").write_text(json.dumps(before) + "\n")


if __name__ == "__main__":
    main()
