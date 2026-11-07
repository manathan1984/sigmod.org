# Builds docs/old-site-links.html, a browsable checklist of the broken links to sigmod.org addresses
# that www.sigmod.org no longer serves (docs/old-site-links.csv, from scripts/old-links-report.mjs), the broken external links
# (docs/external-links.json) and the likely duplicate pages (docs/duplicate-pages.json).
# Usage: python3 scripts/old-links-page.py
import csv, json, re, html, datetime, pathlib, collections

ROOT = pathlib.Path(__file__).resolve().parent.parent
OLD = "https://www-old.sigmod.org"  # the old WordPress site, for comparing pages only
NEW = "https://www.sigmod.org"
REPO = "https://github.com/sigmod-org/www.sigmod.org/blob/main/"

GROUPS = {  # id: (title, what to decide). Fixes must not depend on www-old.sigmod.org.
    "interviews-media": ("Distinguished Profiles: video and audio", "8.4 GB of .flv video and .mp3 audio, no longer on www.sigmod.org. Decide where to host them (YouTube, ACM DL or a storage bucket; .flv must be converted to MP4), or drop the links."),
    "anthology": ("SIGMOD Anthology", "Old CD/DVD anthology pages, no longer on www.sigmod.org. Add a copy to the repo at the same paths, link web.archive.org copies, or drop."),
    "discs": ("DiSC (Digital Symposium Collection)", "Same as the Anthology: add a copy to the repo, link web.archive.org or the ACM DL proceedings, or drop."),
    "dblp": ("DBLP mirror pages", "Pages of the old DBLP DVD mirror with no match on dblp.org. Link to dblp.org's home page, or drop."),
    "uploads": ("Missing uploads", "Images and PDFs linked on WordPress hosts that no longer exist, and not in the repo. Find a copy (web.archive.org) or drop."),
    "mangled": ("External links broken by the import", "Tutorial files on other sites that are gone, also from web.archive.org. Drop, or find a copy."),
    "record": ("SIGMOD Record file", "Not on sigmodrecord.org. Find another copy, or drop."),
    "other": ("Other old pages", "The SIGMOD/PODS workshops page, which is gone. Restore its text on the sponsorship pages, or drop."),
    "feed": ("Kept on purpose: feed identifiers", "Atom feed IDs must never change, so these stay."),
    "rewrite": ("Kept on purpose: link to www.sigmod.org", "The logo guidelines tell people to link to www.sigmod.org, so this stays."),
}
ORDER = list(GROUPS)
KEPT = {"feed", "rewrite"}

def title_of(src):
    try:
        m = re.search(r'^title: "?(.*?)"?$', (ROOT / src).read_text(encoding="utf-8"), re.M)
        return m.group(1) if m else src
    except OSError:
        return src

rows = list(csv.DictReader(open(ROOT / "docs/old-site-links.csv", encoding="utf-8")))
groups = []
for gid in ORDER + sorted({r["group"] for r in rows} - set(ORDER)):
    rs = [r for r in rows if r["group"] == gid]
    if not rs:
        continue
    pages = {}
    for r in rs:
        pages.setdefault((r["page"], r["file"]), []).append(r)
    title, decide = GROUPS.get(gid, (gid, ""))
    groups.append({
        "id": gid, "title": title, "decide": decide, "kept": gid in KEPT, "count": len(rs),
        "pages": [{
            "page": page, "file": f, "title": title_of(f),
            "current": OLD + page, "new": NEW + page, "source": REPO + f,
            "links": [{"url": r["old_link"], "line": int(r["line"] or 0), "status": r["on_www"],
                       "fix": r["suggested_fix"], "to": r["suggested_new_link"]} for r in sorted(lr, key=lambda r: int(r["line"] or 0))],
        } for (page, f), lr in sorted(pages.items(), key=lambda kv: (-len(kv[1]), kv[0][0]))],
    })

# --- other checks: broken external links and likely duplicate pages (optional inputs)
files_by_page = {}
for f in (ROOT / "src/content").rglob("*.md"):
    m = re.search(r'^permalink: "?(.*?)"?$', f.read_text(encoding="utf-8"), re.M)
    if m:
        files_by_page[m.group(1)] = str(f.relative_to(ROOT))

def page_entry(page, links):
    f = files_by_page.get(page, "")
    return {"page": page, "file": f, "title": title_of(f) if f else page,
            "current": OLD + page, "new": NEW + page, "source": REPO + f if f else "", "links": links}

def archive_of(page):
    """Copied old pages served as-is from src/static (not built from Markdown): which copy they belong to."""
    if page in files_by_page:
        return None
    f = ROOT / ("src/static" + page + ("index.html" if page.endswith("/") else ""))
    if not f.is_file():
        return None
    return "discs" if page.startswith("/publications/discs/") else "other"

ARCHIVES = {  # id suffix: (title, what to decide)
    "discs": ("Inside the DiSC copies", "Links inside the copied DiSC pages (src/static/publications/discs/) whose target was not on www-old.sigmod.org either, so it could not be copied. Most were already broken on the old site. Leave them, or find copies on web.archive.org."),
    "other": ("Inside other copied pages", "Links inside other old pages copied as-is into src/static (Anthology volume 6, DBLP mirror, tutorials) whose target is missing. Leave them, or find copies on web.archive.org."),
}

def static_entry(page, links):
    return {"page": page, "file": "src/static" + page, "title": page.rsplit("/", 1)[-1],
            "current": OLD + page, "new": NEW + page, "source": REPO + "src/static" + page, "links": links}

def add_group(gid, title, decide, by_page, entry, **flags):
    if by_page:
        groups.append({"id": gid, "title": title, "decide": decide, "kept": False, **flags,
                       "count": sum(len(v) for v in by_page.values()),
                       "pages": [entry(pg, v) for pg, v in sorted(by_page.items(), key=lambda kv: (-len(kv[1]), kv[0]))]})

# broken links to www.sigmod.org inside copied pages (docs/site-links.json, from scripts/scan-site-links.mjs)
scan_path = ROOT / "docs/site-links.json"
if scan_path.exists():
    by_arch = {k: {} for k in ARCHIVES}
    for b in json.load(open(scan_path, encoding="utf-8"))["internal"]["broken"]:
        for p in b["pages"]:
            a = archive_of(p["page"])
            if a:
                by_arch[a].setdefault(p["page"], []).append({"url": NEW + b["target"], "line": 0, "fix": "", "to": "",
                                                            "status": "not in the copy"})
    for a, (title, decide) in ARCHIVES.items():
        add_group("in-" + a, title, decide, by_arch[a], static_entry, archive=True)

ext_path = ROOT / "docs/external-links.json"
if ext_path.exists():
    ext = json.load(open(ext_path, encoding="utf-8"))
    in_copies = {}
    for cls, gid, title, decide in [
        ("broken", "ext-broken", "Broken external links",
         "The other site no longer has the page, or no longer exists. Replace the link with the current address, a web.archive.org copy, or remove it."),
        ("error", "ext-error", "External links that did not answer",
         "Timeouts, refused connections or server errors. Some may be temporary: open each link to see if it works."),
    ]:
        by_page = {}
        for l in ext["links"]:
            if l["class"] != cls:
                continue
            site = [pg for pg in l["pages"] if not archive_of(pg)]
            for pg in l["pages"]:
                if archive_of(pg):
                    in_copies.setdefault(pg, []).append({"url": l["url"], "line": 0, "fix": "", "to": "", "status": l["why"]})
            # a link in the shared header or footer is on every page: list it once, under the home page
            sitewide = len(site) > 50
            for pg in (["/"] if sitewide else site):
                by_page.setdefault(pg, []).append({"url": l["url"], "line": 0, "fix": "", "to": "",
                    "status": l["why"] + (f" (on all {len(site)} pages: header or footer)" if sitewide else "")})
        add_group(gid, title, decide, by_page, page_entry, external=True)
    add_group("ext-copies", "External links inside copied pages",
              "Broken or unanswered links to other sites inside the old pages copied into src/static (DiSC, Anthology, DBLP). "
              "These are historical copies; most of these sites are long gone. Leave them, or link web.archive.org copies.",
              in_copies, static_entry, external=True, archive=True)
    unverified = collections.Counter(re.sub(r"^https?://([^/]+).*", r"\1", l["url"]) for l in ext["links"] if l["class"] == "unverified")
    ext_summary = {"checked": ext.get("checked"), "total": len(ext["links"]),
                   "counts": dict(collections.Counter(l["class"] for l in ext["links"])),
                   "unverified": unverified.most_common(12)}
else:
    ext_summary = None

dup_path = ROOT / "docs/duplicate-pages.json"
duplicates = []
if dup_path.exists():
    for g in json.load(open(dup_path, encoding="utf-8"))["groups"]:
        g["pages"] = [page_entry(pg, []) for pg in g["pages"]]
        duplicates.append(g)

data = {"generated": datetime.date.today().isoformat(), "total": len(rows),
        "open": sum(g["count"] for g in groups if not g["kept"] and not g.get("external") and not g.get("archive")),
        "archive": sum(g["count"] for g in groups if g.get("archive")),
        "groups": groups, "external": ext_summary, "duplicates": duplicates}
tpl = (ROOT / "scripts/old-links-page.html").read_text(encoding="utf-8")
out = tpl.replace("/*DATA*/null", json.dumps(data, ensure_ascii=False).replace("</", "<\\/"))
(ROOT / "docs/old-site-links.html").write_text(out, encoding="utf-8")
print(f"{data['open']} old-site links, {sum(g['count'] for g in groups if g.get('external') and not g.get('archive'))} broken external links, "
      f"{data['archive']} in copied pages, {len(duplicates)} duplicate groups → docs/old-site-links.html")
