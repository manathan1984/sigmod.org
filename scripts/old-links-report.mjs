// Lists every link that still points at the old sigmod.org server and suggests a fix.
//
//   npm run old-links                  # build, then report (uses cached checks)
//   npm run old-links -- --check       # also (re)checks the old server
//   npm run old-links -- --fix         # applies every "easy" fix, then reports again
//
// A link counts as "old" when it is absolute to sigmod.org, www.sigmod.org or the
// WordPress hosts behind it (sigmod.hosting.acm.org, sigmod.hosting2.acm.org), or
// root-relative to a path the new site does not build. Once sigmod.org points at the
// new site, https://sigmod.org/X only works if the new site serves X.
//
// Writes docs/OLD-SITE-LINKS.md (by group) and docs/old-site-links.csv (every link).
// --fix downloads files from sigmod.org into src/static/ at the same path, rewrites the
// links, and appends each change to docs/old-site-links-fixed.csv.
// Results of --check are cached in migration/cache/old-links-status.json.

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SRC = path.join(ROOT, "src");
const SITE = path.join(ROOT, "_site");
const CACHE = path.join(ROOT, "migration/cache/old-links-status.json");
const FIXED = path.join(ROOT, "docs/old-site-links-fixed.csv");
const OLD_SITE = "https://sigmod.org";
const NEW_SITE = process.env.NEW_SITE || "https://sigmod-org.github.io/www.sigmod.org";
const check = process.argv.includes("--check");
const fix = process.argv.includes("--fix");

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
for (const f of walk(SRC).filter((f) => /\.(md|njk|json|js)$/.test(f) && !f.startsWith(path.join(SRC, "static")))) {
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
      if (serves(safeDecode(clean)) || clean.startsWith("/assets/")) continue;
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
// Links the import broke into sigmod.org paths (e.g. sigmod.org/www.cs.rice.edu/…) and the
// external address they were meant to have.
const MANGLED = /^\/(db\.cis\.upenn\.edu|ftp\.db\.toronto\.edu|provost\.ku\.edu|www\.cs\.rice\.edu)\//;
const external = (l) => "http:/" + l.clean.replace("/_vardi/", "/~vardi/");
// Closest web.archive.org copy, or null
async function wayback(url) {
  try {
    const res = await fetch(`https://archive.org/wayback/available?url=${encodeURIComponent(url)}`, { signal: AbortSignal.timeout(25000) });
    const snap = (await res.json()).archived_snapshots?.closest;
    return snap?.available ? snap.url.replace(/^http:/, "https:") : null;
  } catch { return null; }
}

async function pool(items, fn) {
  let i = 0;
  await Promise.all(Array.from({ length: 6 }, async () => { while (i < items.length) await fn(items[i++]); }));
}
if (check) {
  const todo = [...new Set(links.map(oldUrl))].filter((u) => !cache[u]);
  console.log(`checking ${todo.length} URLs on the old server…`);
  await pool(todo, async (u) => { cache[u] = await probe(u); });
  for (const u of [...new Set(links.filter((l) => MANGLED.test(l.clean)).map(external))]) {
    cache[u] = await probe(u);
    if (!(cache[u].status >= 200 && cache[u].status < 300)) cache[u].wayback = await wayback(u);
  }
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
  { id: "mangled", title: "External links broken by the import", test: (l) => MANGLED.test(l.clean),
    fix: (l) => {
      const to = external(l), c = cache[to];
      if (!c) return [`The old page had a relative link to another site. Point it at ${to} (not checked yet: run with --check).`, "", "decide"];
      if (c.status >= 200 && c.status < 300) return [`The old page had a relative link to another site. Point it at ${to}, which works.`, to, "easy"];
      if (c.wayback) return [`The old page had a relative link to another site. The file is gone from ${to}; link the web.archive.org copy ${c.wayback}`, c.wayback, "easy"];
      return [`The old page had a relative link to another site. The file is gone from ${to} and web.archive.org has no copy. Drop the link.`, "", "decide"];
    } },
  { id: "record", title: "SIGMOD Record", test: (l) => /sigmod-?record/i.test(l.clean),
    fix: (l) => {
      if (NEW[l.clean]) return [`Link to ${NEW[l.clean]}.`, NEW[l.clean], "easy"];
      const rest = l.clean.replace(/^\/publications\/sigmod-?record\//i, "").replace(/^issues\//, "");
      if (rest === "databaseSoftware/chronolog.txt") return ["Not on sigmodrecord.org. Copy the file from the old server into the repo at the same path, or drop the link.", "", "decide"];
      const to = "https://sigmodrecord.org/publications/sigmodRecord/" + rest;
      return [`The same file is on the SIGMOD Record site: ${to}`, to, "easy"];
    } },
  { id: "dblp", title: "DBLP mirror", test: (l) => /^\/publications\/dblp\//.test(l.clean),
    // dblp.org answers scripts with a bot check, so these targets cannot be verified automatically.
    fix: (l) => {
      const rest = l.clean.replace(/^\/publications\/dblp\//, "");
      if (/^db\/(conf|journals|books)\/./.test(rest)) {
        const to = "https://dblp.org/" + rest;
        return [`Point to dblp.org, which uses the same paths for venues and books: ${to} (spot-check a few by hand; dblp.org blocks automated checks).`, to, "easy"];
      }
      return ["Page of the old DBLP DVD mirror (about, systems or the mirror's index); dblp.org has no copy. Link https://dblp.org/ instead, or drop the link.", "https://dblp.org/", "decide"];
    } },
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

// ---------- apply the easy fixes (--fix) ----------

const COPY = ["uploads", "opentoc", "interviews-small"];
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const csv = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
if (fix) {
  const todo = links.filter((l) => l.difficulty === "easy" && l.group !== "feed" && l.to);

  // 1. bring files over from sigmod.org, at the same path
  const files = [...new Map(todo.filter((l) => COPY.includes(l.group)).map((l) => [l.to, l])).values()];
  const failed = new Set();
  let got = 0, bytes = 0;
  await pool(files, async (l) => {
    const dest = path.join(SRC, "static", safeDecode(l.to));
    if (fs.existsSync(dest)) return;
    try {
      const res = await fetch(OLD_SITE + encodeURI(safeDecode(l.to)), { headers: { "User-Agent": "sigmod-link-audit" }, signal: AbortSignal.timeout(180000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, buf);
      got++; bytes += buf.length;
    } catch (e) { failed.add(l.to); console.log(`download failed: ${l.to} (${e.message})`); }
  });
  console.log(`downloaded ${got} files (${mb(bytes)}), ${failed.size} failed`);

  // 2. rewrite the links; a link is only replaced where it ends (so /pods does not touch /pods/opentoc/…)
  const log = [];
  for (const [file, fl] of Object.entries(Object.groupBy(todo.filter((l) => !failed.has(l.to)), (l) => l.file))) {
    const f = path.join(ROOT, file);
    let s = fs.readFileSync(f, "utf8");
    for (const [url, l] of new Map(fl.map((l) => [l.url, l]))) {
      const to = l.to.startsWith("/") ? encodeURI(safeDecode(l.to)) : l.to;
      s = s.replace(new RegExp(escapeRe(url) + `(?=[)"'\\s<>\\]]|$)`, "g"), to);
    }
    if (file.endsWith(".md") && /^---\n/.test(s) && !/^edited: true$/m.test(s)) s = s.replace(/^---\n/, "---\nedited: true\n");
    fs.writeFileSync(f, s);
    for (const l of fl) log.push([today(), l.file, l.line, l.page, l.group, l.url, l.to]);
  }
  const header = !fs.existsSync(FIXED);
  fs.appendFileSync(FIXED, (header ? "date,file,line,page,group,old_link,new_link\n" : "") + log.map((r) => r.map(csv).join(",")).join("\n") + "\n");
  console.log(`rewrote ${log.length} links in ${new Set(log.map((r) => r[1])).size} files → docs/old-site-links-fixed.csv`);

  // 3. rebuild and report on what is left
  execFileSync("npx", ["@11ty/eleventy", "--quiet"], { cwd: ROOT, stdio: "inherit" });
  execFileSync(process.execPath, [new URL(import.meta.url).pathname], { cwd: ROOT, stdio: "inherit" });
  process.exit(0);
}
function today() { return new Date().toISOString().slice(0, 10); }

// ---------- write the report ----------

// groups fixed by one rule, and groups where the old server's status does not matter
// What is left to do in a group once its easy links are fixed
const LEFT = { mangled: "Drop, or find a copy", record: "Copy from server, or drop", dblp: "Link dblp.org's home, or drop", uploads: "Find a copy, or drop" };
const DONE = {
  rewrite: "Pointed at the page's address on the new site.",
  mangled: "Restored the external address, or its web.archive.org copy where the file is gone.",
  record: "Pointed at the same file on sigmodrecord.org.",
  dblp: "Pointed at the same venue or book page on dblp.org.",
  uploads: "Copied the file from sigmod.org into src/static/wp-content/ and linked it there.",
  opentoc: "Copied the OpenTOC page into src/static/pods/opentoc/ unchanged and linked it there.",
  "interviews-small": "Copied the photo or PDF into src/static/publications/interviews/ and linked it there.",
};
const RULE = ["dblp", "uploads", "opentoc", "interviews-small", "interviews-media", "old-awards", "logo"];
const NA = ["feed", "rewrite", "mangled", "dblp", "record"];

const esc = (s) => String(s).replace(/\|/g, "\\|");
const pagesOf = (ls) => [...new Set(ls.map((l) => l.file))];
// The page a source file renders: its permalink, or the page that shows a data file
const SHOWN_ON = { "src/_data/conferences.json": "/" };
const permalinkOf = (file) => links.find((l) => l.file === file && l.page)?.page || SHOWN_ON[file] || "";
const short = (file) => file.replace("src/content/", "").replace(/\/index\.md$/, "");
const sourceLink = (file, line) => `[${short(file)}](../${file}${line ? `#L${line}` : ""})`;
const siteLinks = (file) => { const p = permalinkOf(file); return p ? `[current](${OLD_SITE}${p}) · [new](${NEW_SITE}${p})` : "—"; };
const uniq = (ls) => [...new Map(ls.map((l) => [l.clean, l])).values()];
const checkedAt = fs.existsSync(CACHE) ? fs.statSync(CACHE).mtime.toISOString().slice(0, 10) : "never";

const rows = GROUPS.map((g) => ({ g, ls: links.filter((l) => l.group === g.id) })).filter((r) => r.ls.length);
const out = [];
out.push(`# Links to the old sigmod.org

Generated by \`node scripts/old-links-report.mjs\` on ${today()} (old server last checked ${checkedAt}).
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
  out.push(`| [${g.title}](#${g.id}) | ${ls.length} | ${pagesOf(ls).length} | ${u.length} | ${status} | ${mb(size)} | ${esc(cls === "Decide" && LEFT[g.id] || summaryFix(g, ls))} | ${cls} |`);
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
const feedCount = links.filter((l) => l.group === "feed").length;
const count = (id) => links.filter((l) => l.group === id).length;
out.push(`
**${links.length - easy} links need a decision.**${easy - feedCount ? ` ${easy - feedCount} more have a known fix: run \`npm run old-links -- --fix\`.` : ""} The ${feedCount} feed identifiers stay as they are.

${fixedSection()}
## Remaining work: decisions needed

1. **Distinguished Profiles media** (${links.filter((l) => l.group === "interviews-media").length} links, ${mb(mediaSize(/./))}): where to host the videos and audio. The .flv files need converting to MP4 to play in browsers at all.
2. **Server copies**: someone with access to the old server sends a copy of \`/publications/anthology/\` and \`/publications/discs/\` (the past conference sites are already copied to [sigmod-org/sigmod-past-conf](https://github.com/sigmod-org/sigmod-past-conf)). The linked pages are small, but they link on to content that cannot be crawled (directory listings return 403). Alternatively, link to web.archive.org copies.
3. **Retired pages**: the old awards overview page (113 dead links) was removed (see migration/removed.json), and the logo renderings page (44 dead links) now redirects to the logo usage guidelines on /sigmod-history/sigmod-logo-history/.
4. **Small leftovers** (${count("dblp") + count("mangled") + count("uploads") + count("record") + count("other")} links): DBLP DVD mirror pages with no dblp.org copy, PODS tutorial files that are gone from their hosts and from web.archive.org, uploads missing on the old server too, one SIGMOD Record text file, and the lost SIGMOD/PODS workshops page. Each is listed below; most can simply be dropped.

Everything still open is listed below, group by group. For each broken link the table names the source
file and links the page on the current site and on the new site (${NEW_SITE}), so you can compare them.

## Groups
`);

function fixedSection() {
  if (!fs.existsSync(FIXED)) return "";
  const rows = fs.readFileSync(FIXED, "utf8").trim().split("\n").slice(1).map((r) => r.match(/("(?:[^"]|"")*"|[^,]*)(?=,|$)/g).filter((_, i) => i % 2 === 0).map((c) => c.replace(/^"|"$/g, "").replace(/""/g, '"')));
  const by = Object.groupBy(rows, (r) => r[4]);
  const title = Object.fromEntries(GROUPS.map((g) => [g.id, g.title]));
  const copied = walkIf(path.join(SRC, "static", "wp-content")).length + walkIf(path.join(SRC, "static", "pods", "opentoc")).length + walkIf(path.join(SRC, "static", "publications", "interviews")).length;
  return `## Fixed so far

${rows.length} links on ${new Set(rows.map((r) => r[1])).size} source files were fixed by \`npm run old-links -- --fix\` (${[...new Set(rows.map((r) => r[0]))].join(", ")}).
Every change (file, line, old link, new link) is in [old-site-links-fixed.csv](old-site-links-fixed.csv).
${copied} files were copied from sigmod.org into \`src/static/\` at their old paths, so the old addresses keep working after the switch.

| Group | Links fixed | What was done |
|---|--:|---|
${Object.entries(by).map(([g, rs]) => `| ${title[g] || g} | ${rs.length} | ${DONE[g] || ""} |`).join("\n")}

**Check by hand:** dblp.org answers scripts with a bot check, so the ${(by.dblp || []).length} DBLP links could not be verified automatically. Open a few from the [Anthology page](${NEW_SITE}/publications/anthologyhome/).
`;
}
function walkIf(d) { return fs.existsSync(d) ? walk(d) : []; }

for (const { g, ls } of rows) {
  out.push(`### <a id="${g.id}"></a>${g.title}\n`);
  const u = uniq(ls);
  const sample = u[0];
  out.push(`${ls.length} links, ${u.length} distinct, on ${pagesOf(ls).length} page${pagesOf(ls).length > 1 ? "s" : ""}. Class: **${[...new Set(ls.map((l) => l.difficulty))].map((d) => d === "easy" ? "Easy" : "Decide").join(" / ")}**.\n`);
  if (RULE.includes(g.id) && u.length > 25) {
    out.push(`Suggested fix: ${sample.fix}\n`);
    out.push("| Source file | Page (current · new site) | Links |\n|---|---|--:|");
    const byFile = Object.entries(Object.groupBy(ls, (l) => l.file)).sort((a, b) => b[1].length - a[1].length);
    for (const [f, fl] of byFile.slice(0, 40)) out.push(`| ${sourceLink(f)} | ${siteLinks(f)} | ${fl.length} |`);
    if (byFile.length > 40) out.push(`| …and ${byFile.length - 40} more pages (see the CSV) | | ${byFile.slice(40).reduce((s, [, fl]) => s + fl.length, 0)} |`);
    out.push("");
  } else {
    out.push("| Old link | Found in (source · current page · new page) | Old server | Suggested fix | Class |\n|---|---|---|---|---|");
    for (const l of u) {
      const where = pagesOf(ls.filter((x) => x.clean === l.clean)).map((f) => `${sourceLink(f, ls.find((x) => x.file === f && x.clean === l.clean).line)} · ${siteLinks(f)}`);
      out.push(`| \`${esc(l.clean)}\` | ${where.slice(0, 3).join("<br>")}${where.length > 3 ? `<br>+${where.length - 3} more` : ""} | ${NA.includes(g.id) ? "n/a" : l.old} | ${esc(l.fix)} | ${l.difficulty === "easy" ? "Easy" : "Decide"} |`);
    }
    out.push("");
  }
}
fs.writeFileSync(path.join(ROOT, "docs/OLD-SITE-LINKS.md"), out.join("\n"));

fs.writeFileSync(path.join(ROOT, "docs/old-site-links.csv"),
  ["file,line,page,old_link,group,old_server,class,suggested_new_link,suggested_fix",
    ...links.map((l) => [l.file, l.line, l.page, l.url, l.group, l.old, l.difficulty, l.to, l.fix].map(csv).join(","))].join("\n") + "\n");
console.log(`${links.length} links → docs/OLD-SITE-LINKS.md, docs/old-site-links.csv`);
