// Import sigmod.org (WordPress) into Markdown files that keep the original URLs.
//
//   node scripts/import-wp.mjs            # uses migration/cache/ if present
//   node scripts/import-wp.mjs --refresh  # re-download from the WP REST API
//
// Every WP page/post becomes src/content/**/index.md with `permalink` set to the
// exact old path. Posts whose content is an exact copy of a page become
// redirect stubs to that page (they still show up in the news list).

import fs from "node:fs/promises";
import path from "node:path";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

const ORIGIN = "https://sigmod.org";
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const removed = JSON.parse(await fs.readFile(path.join(ROOT, "migration/removed.json"), "utf8").catch(() => "[]"));
const CACHE = path.join(ROOT, "migration/cache");
const OUT = path.join(ROOT, "src/content");
const refresh = process.argv.includes("--refresh");

// ---------- fetch (politely, cached) ----------

async function getJSON(name, url) {
  const file = path.join(CACHE, name);
  if (!refresh) {
    try { return JSON.parse(await fs.readFile(file, "utf8")); } catch {}
  }
  const res = await fetch(url, { headers: { "User-Agent": "sigmod.org-migration" } });
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  const data = await res.json();
  await fs.mkdir(CACHE, { recursive: true });
  await fs.writeFile(file, JSON.stringify(data));
  await new Promise((r) => setTimeout(r, 2000));
  return data;
}

async function getAll(type) {
  const items = [];
  for (let page = 1; ; page++) {
    const batch = await getJSON(`${type}-${page}.json`, `${ORIGIN}/wp-json/wp/v2/${type}?per_page=100&page=${page}`);
    items.push(...batch);
    if (batch.length < 100) return items;
  }
}

const decode = (s) => s.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&nbsp;/g, " ");
const toPath = (link) => decodeURIComponent(new URL(link).pathname);
const plain = (html) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

// ---------- load ----------

const [pages, posts, cats] = await Promise.all([getAll("pages"), getAll("posts"), getJSON("categories.json", `${ORIGIN}/wp-json/wp/v2/categories?per_page=100`)]);
const catName = Object.fromEntries(cats.map((c) => [c.id, c.name]));

const items = [
  ...pages.map((p) => ({ kind: "page", p })),
  ...posts.map((p) => ({ kind: "post", p })),
].map(({ kind, p }) => ({
  kind,
  id: p.id,
  parent: p.parent || 0,
  path: toPath(p.link),
  title: decode(p.title.rendered).trim(),
  date: p.date,
  modified: p.modified,
  menuOrder: p.menu_order ?? 0,
  categories: (p.categories || []).map((c) => catName[c]).filter(Boolean),
  html: p.content.rendered,
}));
const wpPaths = new Set(items.map((i) => i.path));

// ---------- exact duplicates ----------

const shingles = (t, k = 8) => {
  const w = t.toLowerCase().split(" "), s = new Set();
  for (let i = 0; i + k <= w.length; i++) s.add(w.slice(i, i + k).join(" "));
  return s;
};
for (const i of items) i.sh = shingles(plain(i.html));
// canonical preference: page > post, deeper path (inside a section) > root-level
const rank = (i) => (i.kind === "page" ? 10 : 0) + i.path.split("/").length;
const duplicates = [];
for (let a = 0; a < items.length; a++) {
  for (let b = a + 1; b < items.length; b++) {
    const x = items[a], y = items[b];
    if (x.sh.size < 20 || y.sh.size < 20) continue;
    let inter = 0;
    for (const s of x.sh) if (y.sh.has(s)) inter++;
    if (inter / (x.sh.size + y.sh.size - inter) < 0.94) continue;
    const [keep, drop] = rank(x) >= rank(y) ? [x, y] : [y, x];
    drop.canonical = keep.path;
    duplicates.push({ duplicate: drop.path, kind: drop.kind, canonical: keep.path });
  }
}

// ---------- classification ----------

function section(i) {
  if (i.path.startsWith("/pods-home/") || /(^|[^/])\bpods\b/i.test(i.title.replace(/sigmod\s*\/\s*pods/gi, ""))) return "pods";
  if (i.path.startsWith("/conferences/") || /sigmod\s*\/?\s*pods/i.test(i.title) || i.path === "/videoseries/") return "shared";
  return "sigmod";
}
function area(i) {
  const p = i.path;
  if (i.kind === "post") return "news";
  if (p.startsWith("/pods-home/")) return "pods";
  if (p.startsWith("/conferences/") || p.startsWith("/about-sigmod/sponsorship/") || p === "/sigmod-distinguished-aes-and-pcs/") return "conferences";
  if (p.startsWith("/sigmod-awards/") || /award/.test(p)) return "awards";
  if (/^\/(publications|publication-list|videoseries|software|freepublic)/.test(p)) return "publications";
  if (p.startsWith("/membership/")) return "community";
  return "about";
}

// ---------- html -> markdown ----------

const legacy = new Map(); // non-WordPress paths on sigmod.org that content links to

function rewriteUrl(raw, base) {
  if (!raw || /^(mailto:|tel:|#|javascript:)/i.test(raw)) return raw;
  let u;
  try { u = new URL(raw.trim(), ORIGIN + base); } catch { return raw; }
  if (!/^(www\.)?sigmod\.org$/i.test(u.hostname)) return raw;
  let p = decodeURIComponent(u.pathname);
  const withSlash = p.endsWith("/") || /\.[a-z0-9]+$/i.test(p) ? p : p + "/";
  if (wpPaths.has(withSlash)) return withSlash + u.search + u.hash;
  // not a WordPress page: an uploaded file or a legacy static directory
  const key = p.split("/").slice(0, p.startsWith("/wp-content/") ? 3 : 4).join("/");
  legacy.set(key, (legacy.get(key) || 0) + 1);
  return ORIGIN + u.pathname + u.search + u.hash;
}

const td = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", codeBlockStyle: "fenced", emDelimiter: "*" });
td.use(gfm);
td.addRule("figure", { filter: "figure", replacement: (c) => `\n\n${c.trim()}\n\n` });
td.keep(["iframe", "video", "audio", "sup", "sub"]);

function toMarkdown(i) {
  let html = i.html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s(style|class|id|srcset|sizes|data-[\w-]+|decoding|loading|fetchpriority)="[^"]*"/g, "")
    .replace(/<p>(\s|&nbsp;|<br\s*\/?>)*<\/p>/g, "")
    .replace(/<span>([\s\S]*?)<\/span>/g, "$1")
    .replace(/(href|src)="([^"]*)"/g, (_, a, v) => `${a}="${rewriteUrl(decode(v), i.path)}"`);
  return td.turndown(html).replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

// ---------- conferences data (from the /conferences/ table) ----------

function conferences() {
  const page = items.find((i) => i.path === "/conferences/");
  const rows = [...page.html.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((m) => [...m[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((c) => c[1]));
  return rows.map((cells) => {
    const name = plain(cells[0] || "");
    const year = +(name.match(/\b(19|20)\d\d\b/) || [0])[0];
    const links = [...cells.join(" ").matchAll(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => ({ label: plain(m[2]), url: rewriteUrl(decode(m[1]), "/conferences/") }));
    return { name, year, location: plain(cells[1] || ""), links };
  }).filter((c) => c.year);
}

// ---------- write ----------

const yaml = (obj) => Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && !(Array.isArray(v) && !v.length))
  .map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join("\n");

await fs.rm(OUT, { recursive: true, force: true });
let written = 0;
for (const i of items) {
  if (i.path === "/") continue; // the home page is rebuilt from data in src/index.njk
  const sameUrl = i.canonical === i.path; // post and page share a slug: page wins the URL
  const fm = {
    title: i.title || "(untitled)",
    permalink: sameUrl ? false : i.path,
    section: section(i),
    area: area(i),
    wp_id: i.id,
    wp_type: i.kind,
    wp_parent: i.parent || undefined,
    order: i.menuOrder || undefined,
    date: i.kind === "post" ? i.date.slice(0, 10) : undefined,
    updated: i.modified.slice(0, 10),
    categories: i.categories.filter((c) => c !== "Uncategorized"),
    tags: i.kind === "post" ? ["news"] : undefined,
    redirect_to: i.canonical,
  };
  // file names drop invisible characters (one WP slug contains U+2028); the permalink keeps them
  const slug = i.path.replace(/\/$/, "").replace(/[\s\u2028\u2029]/g, "");
  const rel = i.kind === "post" ? path.join("news", slug + ".md") : path.join("pages", i.path === "/" ? "home" : i.path, "index.md");
  const file = path.join(OUT, rel);
  // pages removed on purpose (migration/removed.json) are never re-created
  if (removed.includes(i.path)) continue;
  await fs.mkdir(path.dirname(file), { recursive: true });
  // pages edited by hand after the import carry `edited: true` and are never overwritten
  if (/^edited: true$/m.test(await fs.readFile(file, "utf8").catch(() => ""))) continue;
  await fs.writeFile(file, `---\n${yaml(fm)}\n---\n\n${i.canonical ? "" : toMarkdown(i)}`);
  written++;
}

await fs.mkdir(path.join(ROOT, "src/_data"), { recursive: true });
// conferences.json is maintained by hand after the switch; re-derive it from WordPress only on request
const confFile = path.join(ROOT, "src/_data/conferences.json");
if (process.argv.includes("--conferences") || !(await fs.stat(confFile).catch(() => null)))
  await fs.writeFile(confFile, JSON.stringify(conferences(), null, 2) + "\n");

// reports for the migration proposal
const report = path.join(ROOT, "migration");
await fs.writeFile(path.join(report, "duplicates.json"), JSON.stringify(duplicates, null, 2) + "\n");
await fs.writeFile(path.join(report, "legacy-paths.json"), JSON.stringify(Object.fromEntries([...legacy].sort((a, b) => b[1] - a[1])), null, 2) + "\n");
await fs.writeFile(path.join(report, "url-inventory.tsv"), "path\ttype\tsection\tarea\tupdated\ttitle\tredirect_to\n" +
  items.sort((a, b) => a.path.localeCompare(b.path)).map((i) => [i.path, i.kind, section(i), area(i), i.modified.slice(0, 10), i.title, i.canonical || ""].join("\t")).join("\n") + "\n");

console.log(`wrote ${written} files, ${duplicates.length} redirects, ${legacy.size} legacy path groups`);
