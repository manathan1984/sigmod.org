// Lists every link that still points at the old sigmod.org server and suggests a fix.
//
//   npm run build && node scripts/old-links-report.mjs           # uses cached checks
//   npm run build && node scripts/old-links-report.mjs --check   # (re)checks the old server
//
// A link counts as "old" when it is absolute to sigmod.org, www.sigmod.org or the
// WordPress hosts behind it (sigmod.hosting.acm.org, sigmod.hosting2.acm.org), or
// root-relative to a path the new site does not build. Once sigmod.org points at the
// new site, https://sigmod.org/X only works if the new site serves X.
//
// Writes docs/OLD-SITE-LINKS.md (by group) and docs/old-site-links.csv (every link).
// Results of --check are cached in migration/cache/old-links-status.json.

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SRC = path.join(ROOT, "src");
const SITE = path.join(ROOT, "_site");
const CACHE = path.join(ROOT, "migration/cache/old-links-status.json");
const check = process.argv.includes("--check");

const OLD_HOST = /^(?:https?:)?\/\/(?:www\.)?(sigmod\.org|sigmod\.hosting2?\.acm\.org)(\/[^\s]*)?$/i;
// Files on the WordPress hosts live under these prefixes; on sigmod.org they are /wp-content/…
const WP_PREFIX = /^\/(?:sigmodnewwp|sigmodwp|curtwp)(?=\/wp-content\/)/;

// ---------- what the new site serves ----------

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);

if (!fs.existsSync(SITE)) throw new Error("Run `npm run build` first");
const built = new Set();
for (const f of walk(SITE)) {
  const rel = "/" + path.relative(SITE, f).split(path.sep).join("/");
  built.add(rel);
  if (rel.endsWith("/index.html")) built.add(rel.slice(0, -"index.html".length));
}
const serves = (p) => built.has(p) || built.has(p + "/") || built.has(p.replace(/\/$/, ""));

// ---------- extract links ----------

const linkRe = /(?:\]\(\s*<?|(?:href|src)\s*=\s*["']|"?url"?:\s*"|url\(\s*["']?)([^)"'\s>]+)/gi;
const textBefore = (s, i) => {
  const md = s.slice(Math.max(0, i - 300), i).match(/\[([^\[\]]*)\]\(\s*<?$/);
  if (md) return md[1];
  const a = s.slice(i, i + 400).match(/^[^>]*>([\s\S]*?)<\/a>/);
  return a ? a[1].replace(/<[^>]+>/g, "") : "";
};

const links = [];
for (const f of walk(SRC).filter((f) => /\.(md|njk|json|js)$/.test(f))) {
  const s = fs.readFileSync(f, "utf8");
  const fm = s.match(/^---\n([\s\S]*?)\n---/);
  const get = (k) => fm && (fm[1].match(new RegExp(`^${k}: "?(.*?)"?$`, "m")) || [])[1];
  for (const m of s.matchAll(linkRe)) {
    const url = m[1];
    const abs = url.match(OLD_HOST);
    let p;
    if (abs) p = abs[2] || "/";
    else if (url.startsWith("/") && !url.startsWith("//")) {
      const clean = url.split(/[?#]/)[0];
      if (serves(clean) || clean.startsWith("/assets/")) continue;
      p = url;
    } else continue;
    const host = abs ? abs[1].toLowerCase() : "sigmod.org";
    // the old path as sigmod.org serves it
    const oldPath = p.replace(WP_PREFIX, "");
    links.push({
      file: path.relative(ROOT, f), line: s.slice(0, m.index).split("\n").length,
      page: get("permalink") || "", url, host, path: oldPath,
      clean: safeDecode(oldPath.split(/[?#]/)[0]), hash: (p.match(/#.*/) || [""])[0],
      text: textBefore(s, m.index + m[0].length).replace(/\s+/g, " ").trim().slice(0, 100),
    });
  }
}
function safeDecode(s) { try { return decodeURI(s); } catch { return s; } }

// ---------- suggested fixes ----------
// difficulty: "easy" = the fix is known and can be scripted; "decide" = needs a person to choose.

const NEW = {
  "/conferences/pods/pods-organization": "/pods-home/pods-organization/",
  "/conferences/pods/organization": "/pods-home/pods-organization/",
  "/conferences/the-pods-pages/pods-organization.html": "/pods-home/pods-organization/",
  "/pods/pods-organization": "/pods-home/pods-organization/",
  "/pods/pods-organization/": "/pods-home/pods-organization/",
  "/pods": "/pods-home/",
  "/pods/acm-pods-alberto-o-mendelzon-test-of-time-award/": "/pods-home/acm-pods-alberto-o-mendelzon-test-of-time-award/",
  "/sigmod-awards/sigmod-special-service-award/": "/sigmod-special-service-award/",
  "/sigmod-awards/people/hans-jorg-schek": "/sigmod-awards/people/hans-jorg-schek-acm-sigmod-official-website/",
  "/sigmod-history/sigmod-online/sigmod-logo-history": "/sigmod-history/sigmod-logo-history/",
  "/publications/interview/c.-mohan": "/publications/interview/c-mohan/",
  "/publications/publications/anthology": "/publications/anthology/",
  "/publications/publications/disc": "/publications/sigmod-digital-symposium-collection/",
  "/publications/publications/interview": "/publications/interview/",
  "/membership/sigmod-awards": "/sigmod-awards/",
  "/membership/resources/free-public-domain-software.html": "/software/",
  "/software/free-public-domain-software.html": "/software/",
  "/software/free-public-domain-software-1/publicly-available-database-software-from.html": "/software/nonprofit/",
  "/software/free-public-domain-software-1/publicly-available-database-software-from-1.html": "/software/commerical/",
  "/software/free-public-domain-software-1/index-of-publicty-available-database-software.html": "/software/index-of-publically-available-database-software/",
  "/freepublic-domain-software/free-public-domain-software-1/publicly-available-database-software-from.html": "/software/nonprofit/",
  "/freepublic-domain-software/free-public-domain-software-1/publicly-available-database-software-from-1": "/software/commerical/",
  "/freepublic-domain-software/free-public-domain-software-1/index-of-publicty-available-database-software": "/software/index-of-publically-available-database-software/",
  "/about-sigmod/sponsorship/conferences-symposia-and-workshops-held-in-cooperation-with-sigmod/in-cooperation-support-for-conferences.html": "/about-sigmod/sponsorship/conferences-symposia-and-workshops-held-in-cooperation-with-sigmod/",
  "/about-sigmod/sponsorship/sponsorship-of-meetings/in-cooperation-support-for-conferences": "/about-sigmod/sponsorship/conferences-symposia-and-workshops-held-in-cooperation-with-sigmod/",
  "/about-sigmod/sponsorship/conferences-symposia-and-workshops-held-in-cooperation-with-sigmod/sponsorship-of-conferences.html": "/about-sigmod/sponsorship/sponsorship-of-meetings/",
  "/about-sigmod/sponsorship/sigmod-logo.html": "/about-sigmod/sigmod-logo-renderings/",
  "/sigmodrecord": "https://sigmodrecord.org/",
  "/publications/sigmodrecord": "https://sigmodrecord.org/",
  "/publications/sigmod-record": "https://sigmodrecord.org/",
  "/publications/publications/sigmod-record": "https://sigmodrecord.org/",
  // typo on the old site (dpb → dbp); the corrected file is on sigmodrecord.org
  "/publications/sigmod-record/0206/dpb-ronfagin.pdf": "https://sigmodrecord.org/publications/sigmodRecord/0206/dbp-ronfagin.pdf",
  "/pods-home/publications/sigmod-record/0003/dong.ps.gz": "https://sigmodrecord.org/publications/sigmodRecord/0003/dong.ps.gz",
  "/freepublic-domain-software/free-public-domain-software-1/sigmod-freedb-letter.pdf": "/wp-content/uploads/2015/07/sigmod-freedb-letter.pdf",
};

// ---------- check the old server (status and size) ----------

const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, "utf8")) : {};
// The WordPress hosts no longer resolve; their uploads are checked where sigmod.org serves them.
const oldUrl = (l) => {
  const p = (NEW[l.clean]?.startsWith("/wp-content/") ? NEW[l.clean] : l.path).split("#")[0];
  return (l.host === "sigmod.org" || p.startsWith("/wp-content/") ? "https://sigmod.org" : `https://${l.host}`) + encodeURI(safeDecode(p));
};

async function probe(url) {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "sigmod-link-audit", Range: "bytes=0-0" }, redirect: "follow", signal: AbortSignal.timeout(25000) });
    const size = Number((res.headers.get("content-range") || "").split("/")[1]) || null;
    await res.body?.cancel();
    return { status: res.status, final: res.url, size };
  } catch (e) { return { status: 0, final: url, size: null, error: String(e.cause?.code || e.name) }; }
}
if (check) {
  const todo = [...new Set(links.map(oldUrl))].filter((u) => !cache[u]);
  console.log(`checking ${todo.length} URLs on the old server…`);
  let i = 0;
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (i < todo.length) { const u = todo[i++]; cache[u] = await probe(u); }
  }));
  fs.mkdirSync(path.dirname(CACHE), { recursive: true });
  fs.writeFileSync(CACHE, JSON.stringify(cache, null, 1));
}
const live = (l) => { const c = cache[oldUrl(l)]; return c ? (c.status >= 200 && c.status < 300 ? "live" : `dead (${c.status || c.error})`) : "not checked"; };
const sizeOf = (l) => cache[oldUrl(l)]?.size || 0;

const mediaSize = (re) => [...new Map(links.filter((l) => /^\/publications\/interviews\//.test(l.clean) && re.test(l.clean)).map((l) => [l.clean, l])).values()].reduce((s, l) => s + sizeOf(l), 0);
const mb = (b) => b >= 1e9 ? `${(b / 1073741824).toFixed(1)} GB` : b >= 1e6 ? `${(b / 1048576).toFixed(1)} MB` : b ? `${Math.max(1, Math.round(b / 1024))} KB` : "";

const GROUPS = [
  { id: "feed", title: "Feed identifiers", test: (l) => l.file === "src/feed.njk",
    fix: () => ["Keep as is. Atom feed IDs must stay the same forever and already point to the new site's URLs.", "", "easy"] },
  { id: "rewrite", title: "Old addresses of pages the new site has", test: (l) => NEW[l.clean] && NEW[l.clean].startsWith("/") && !NEW[l.clean].startsWith("/wp-content/") || serves(l.clean),
    fix: (l) => { const to = NEW[l.clean] || l.clean; return [`Link to ${to} (the page's address on the new site).`, to + (NEW[l.clean] ? "" : l.hash), "easy"]; } },
  { id: "mangled", title: "External links broken by the import", test: (l) => /^\/(db\.cis\.upenn\.edu|ftp\.db\.toronto\.edu|provost\.ku\.edu|www\.cs\.rice\.edu)\//.test(l.clean),
    fix: (l) => { const to = "http:/" + l.clean.replace("/_vardi/", "/~vardi/"); return [`The old page had a relative link to another site. Point it at ${to}; if that host no longer has the file, use a web.archive.org copy or drop the link.`, to, "easy"]; } },
  { id: "record", title: "SIGMOD Record", test: (l) => /sigmod-?record/i.test(l.clean),
    fix: (l) => {
      if (NEW[l.clean]) return [`Link to ${NEW[l.clean]}.`, NEW[l.clean], "easy"];
      const rest = l.clean.replace(/^\/publications\/sigmod-?record\//i, "").replace(/^issues\//, "");
      if (rest === "databaseSoftware/chronolog.txt") return ["Not on sigmodrecord.org. Copy the file from the old server into the repo at the same path, or drop the link.", "", "decide"];
      const to = "https://sigmodrecord.org/publications/sigmodRecord/" + rest;
      return [`The same file is on the SIGMOD Record site: ${to}`, to, "easy"];
    } },
  { id: "dblp", title: "DBLP mirror", test: (l) => /^\/publications\/dblp\//.test(l.clean),
    fix: (l) => { const to = "https://dblp.org/" + l.clean.replace(/^\/publications\/dblp\//, ""); return [`Point to dblp.org, which serves the same paths: ${to}`, to, "easy"]; } },
  { id: "uploads", title: "WordPress uploads (images, PDFs)", test: (l) => /^\/wp-content\//.test(l.clean) || NEW[l.clean]?.startsWith("/wp-content/"),
    fix: (l) => { const to = NEW[l.clean] || l.clean; return live(l) === "live" || NEW[l.clean]
      ? [`Copy the file into src/static${to} and link ${to}.${l.host === "sigmod.org" ? " The old address keeps working." : " (This link is to a WordPress host that no longer exists, so it is broken today; the file is still on sigmod.org.)"}`, to, "easy"]
      : ["Missing on the old server too. Find the file elsewhere (e.g. web.archive.org) or remove the link.", "", "decide"]; } },
  { id: "opentoc", title: "PODS OpenTOC pages", test: (l) => /^\/pods\/opentoc\//.test(l.clean),
    fix: (l) => [`Copy the page into src/static${l.clean} unchanged (OpenTOC pages carry ACM's free-access links) and link ${l.clean}.`, l.clean, "easy"] },
  { id: "interviews-small", title: "Distinguished Profiles: photos and PDF transcripts", test: (l) => /^\/publications\/interviews\/(pdf|photos|images)\//.test(l.clean),
    fix: (l) => [`Copy the file into src/static${l.clean} and link ${l.clean}.`, l.clean, "easy"] },
  { id: "interviews-media", title: "Distinguished Profiles: video (.flv) and audio (.mp3)", test: (l) => /^\/publications\/interviews\//.test(l.clean),
    fix: (l) => [/\.flv$/i.test(l.clean)
      ? `Too large for git (${mb(mediaSize(/\.flv$/i))} of Flash video, which browsers no longer play). Convert to MP4 and host outside the repo (YouTube, ACM DL, or a storage bucket), then link there.`
      : `Too large for git together (${mb(mediaSize(/\.mp3$/i))} of audio). Host outside the repo with the videos, or with Git LFS, then link there.`, "", "decide"] },
  { id: "anthology", title: "SIGMOD Anthology", test: (l) => /^\/publications\/(anthologyhome\/publications\/)?anthology\//.test(l.clean),
    fix: (l) => { const p = l.clean.replace(/^\/publications\/anthologyhome\/publications\//, "/publications/"); return [`Small static pages (under 1 MB), but they link on to CD images that are not listed here. Ask for a full copy of /publications/anthology/ from the server and add it as src/static${p}, or drop the Anthology.`, p, "decide"]; } },
  { id: "discs", title: "DiSC (Digital Symposium Collection)", test: (l) => /^\/publications\/discs/.test(l.clean),
    fix: (l) => [`Static pages under 0.1 MB that link on to the collections. Get a full copy of /publications/discs/ from the server and add it as src/static${l.clean}, or point to the ACM DL proceedings instead.`, l.clean, "decide"] },
  { id: "pastconf", title: "Local mirrors of past conference websites", test: (l) => /^\/publications\/pastconf\//.test(l.clean) || /^\/201[23]\/$/.test(l.clean),
    fix: (l) => ["Old conference sites hosted on sigmod.org. Either get a full copy from the server and keep it at the same path, or link to a web.archive.org copy instead.", "", "decide"] },
  { id: "old-awards", title: "Old awards website (already broken)", test: (l) => /^\/sigmod-awards\/sigmod-awards-acm-sigmod-official-website\//.test(l.clean),
    fix: () => ["Already broken on the old site. This page duplicates /sigmod-awards/ and the award pages; retire it as a redirect to /sigmod-awards/ (see CLEANUP.md).", "/sigmod-awards/", "decide"] },
  { id: "logo", title: "Logo renderings (already broken)", test: (l) => /^\/about-sigmod\/sigmod-logo-renderings\//.test(l.clean),
    fix: () => ["Already broken on the old site: the logo files are gone. Offer the 1998 logo (/assets/logo/sigmod-current.png) now, and the new files once a new logo is chosen.", "/assets/logo/sigmod-current.png", "decide"] },
  { id: "other", title: "Other old pages", test: () => true,
    fix: (l) => [/sigmod-pods-workshops/.test(l.clean)
      ? "The SIGMOD/PODS workshops page was not on the WordPress site and is gone. Restore its text on the sponsorship pages or drop the link."
      : "No matching page on the new site. Find the right page or remove the link.", "", "decide"] },
];

for (const l of links) {
  const g = GROUPS.find((g) => g.test(l));
  [l.fix, l.to, l.difficulty] = g.fix(l);
  l.group = g.id; l.old = live(l);
}

// ---------- write the report ----------

// groups fixed by one rule, and groups where the old server's status does not matter
const RULE = ["dblp", "uploads", "opentoc", "interviews-small", "interviews-media", "old-awards", "logo"];
const NA = ["feed", "rewrite", "mangled", "dblp", "record"];

const esc = (s) => String(s).replace(/\|/g, "\\|");
const pagesOf = (ls) => [...new Set(ls.map((l) => l.file))];
const uniq = (ls) => [...new Map(ls.map((l) => [l.clean, l])).values()];
const today = new Date().toISOString().slice(0, 10);
const checkedAt = fs.existsSync(CACHE) ? fs.statSync(CACHE).mtime.toISOString().slice(0, 10) : "never";

const rows = GROUPS.map((g) => ({ g, ls: links.filter((l) => l.group === g.id) })).filter((r) => r.ls.length);
const out = [];
out.push(`# Links to the old sigmod.org

Generated by \`node scripts/old-links-report.mjs\` on ${today} (old server last checked ${checkedAt}).
Do not edit by hand: fix the pages, then run the script again. Every single link, with its
file, line and suggested new target, is in [old-site-links.csv](old-site-links.csv).

**Why this matters.** When sigmod.org is switched to the new site, \`https://sigmod.org/X\` keeps
working only if the new site serves \`X\`. Each old link therefore needs one of two fixes:
bring the file into the new site **at the same path** (best: links from other websites keep
working too), or point the link somewhere else.

**Scope.** Links in \`src/\` that are absolute to \`sigmod.org\`, \`www.sigmod.org\`,
\`sigmod.hosting.acm.org\` or \`sigmod.hosting2.acm.org\` (the WordPress servers behind it), or
root-relative to a path the new site does not build. Subdomains such as \`2026.sigmod.org\`,
\`wp.sigmod.org\` and \`reproducibility.sigmod.org\` are separate sites and are not affected.

**Classification.** *Easy*: the fix is known and can be scripted. *Decide*: needs a person to
choose (hosting, keep or drop, or the content is already gone).

## Summary

${links.length} links on ${pagesOf(links).length} pages, ${uniq(links).length} distinct targets.

| Group | Links | Pages | Distinct targets | On the old server today | Size | Fix | Class |
|---|--:|--:|--:|---|--:|---|---|`);
for (const { g, ls } of rows) {
  const u = uniq(ls);
  const nLive = u.filter((l) => l.old === "live").length;
  const status = NA.includes(g.id) ? "n/a" : nLive === u.length ? "all live" : nLive === 0 ? (u.every((l) => l.old === "not checked") ? "not checked" : "all broken") : `${nLive} live, ${u.length - nLive} broken`;
  const size = u.reduce((s, l) => s + sizeOf(l), 0);
  const classes = [...new Set(ls.map((l) => l.difficulty))];
  const cls = classes.length > 1 ? "Mixed" : classes[0] === "easy" ? "Easy" : "Decide";
  out.push(`| [${g.title}](#${g.id}) | ${ls.length} | ${pagesOf(ls).length} | ${u.length} | ${status} | ${mb(size)} | ${esc(summaryFix(g, ls))} | ${cls} |`);
}
function summaryFix(g, ls) {
  return {
    feed: "Keep", rewrite: "Link to the new page", mangled: "Restore the external URL", record: "Link to sigmodrecord.org",
    dblp: "Link to dblp.org", uploads: "Copy files into the repo", opentoc: "Copy pages into the repo",
    "interviews-small": "Copy files into the repo", "interviews-media": "Host outside git", anthology: "Copy from server, or drop",
    discs: "Copy from server, or drop", pastconf: "Copy from server, or link web.archive.org", "old-awards": "Retire the page",
    logo: "Replace with current files", other: "Find a page, or drop",
  }[g.id];
}

const easy = links.filter((l) => l.difficulty === "easy").length;
out.push(`
**${easy} links (${Math.round(100 * easy / links.length)}%) have a known fix; ${links.length - easy} need a decision.**

## Decisions needed

1. **Distinguished Profiles media** (${links.filter((l) => l.group === "interviews-media").length} links, ${mb(mediaSize(/./))}): where to host the videos and audio. The .flv files need converting to MP4 to play in browsers at all.
2. **Server copies**: someone with access to the old server sends a copy of \`/publications/anthology/\`, \`/publications/discs/\`, \`/publications/pastconf/\`, \`/2012/\` and \`/2013/\`. The linked pages are small, but they link on to content that cannot be crawled (directory listings return 403). Alternatively, link to web.archive.org copies.
3. **Already broken today**: the old awards website, the logo renderings, and a few others below were already gone on the old site. Retire, replace or drop them.

## Groups
`);

for (const { g, ls } of rows) {
  out.push(`### <a id="${g.id}"></a>${g.title}\n`);
  const u = uniq(ls);
  const sample = u[0];
  out.push(`${ls.length} links, ${u.length} distinct, on ${pagesOf(ls).length} page${pagesOf(ls).length > 1 ? "s" : ""}. Class: **${[...new Set(ls.map((l) => l.difficulty))].map((d) => d === "easy" ? "Easy" : "Decide").join(" / ")}**.\n`);
  if (RULE.includes(g.id) && u.length > 25) {
    out.push(`Suggested fix: ${sample.fix}\n`);
    out.push("| Page | Links |\n|---|--:|");
    const byFile = Object.entries(Object.groupBy(ls, (l) => l.file)).sort((a, b) => b[1].length - a[1].length);
    for (const [f, fl] of byFile.slice(0, 40)) out.push(`| [${f.replace("src/content/", "")}](../${f}) | ${fl.length} |`);
    if (byFile.length > 40) out.push(`| …and ${byFile.length - 40} more pages (see the CSV) | ${byFile.slice(40).reduce((s, [, fl]) => s + fl.length, 0)} |`);
    out.push("");
  } else {
    out.push("| Old link | Found in | Old server | Suggested fix | Class |\n|---|---|---|---|---|");
    for (const l of u) {
      const where = pagesOf(ls.filter((x) => x.clean === l.clean)).map((f) => `[${f.replace("src/content/", "").replace(/\/index\.md$/, "")}](../${f}#L${ls.find((x) => x.file === f && x.clean === l.clean).line})`);
      out.push(`| \`${esc(l.clean)}\` | ${where.slice(0, 3).join(", ")}${where.length > 3 ? ` +${where.length - 3}` : ""} | ${NA.includes(g.id) ? "n/a" : l.old} | ${esc(l.fix)} | ${l.difficulty === "easy" ? "Easy" : "Decide"} |`);
    }
    out.push("");
  }
}
fs.writeFileSync(path.join(ROOT, "docs/OLD-SITE-LINKS.md"), out.join("\n"));

const csv = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
fs.writeFileSync(path.join(ROOT, "docs/old-site-links.csv"),
  ["file,line,page,old_link,group,old_server,class,suggested_new_link,suggested_fix",
    ...links.map((l) => [l.file, l.line, l.page, l.url, l.group, l.old, l.difficulty, l.to, l.fix].map(csv).join(","))].join("\n") + "\n");
console.log(`${links.length} links → docs/OLD-SITE-LINKS.md, docs/old-site-links.csv`);
