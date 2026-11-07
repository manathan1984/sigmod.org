// Lists every link, image, script, stylesheet and frame on every page of the built site (_site/),
// resolved against the page's address on https://www.sigmod.org/.
//
//   npm run build && node scripts/scan-site-links.mjs
//
// Links to www.sigmod.org itself (absolute to sigmod.org or www.sigmod.org, root-relative or
// relative) are checked against _site/: a target the build does not produce is broken.
// Everything else is external and is listed for scripts/check-external-links.py.
//
// Writes docs/site-links.json:
//   { scanned, pages, internal: { broken: [{ target, pages: [{ page, text }] }], ok },
//     external: { "<url>": ["<page>", …] } }
// Old addresses of the past conference copies (/publications/pastconf/…) count as working:
// the 404 page forwards them to mirror.sigmod.org. So do /publications/{discs,anthology,dblp,interview,interviews}/…, forwarded to the SIGMOD Archive.

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SITE = path.join(ROOT, "_site");
const BASE = "https://www.sigmod.org";
const SELF = /^(?:www\.)?sigmod\.org$/i;
const FORWARDED = /^\/publications\/(pastconf\/sigmod\d{4}|discs|anthology|dblp|interviews?)(\/|$)/i;

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
if (!fs.existsSync(SITE)) throw new Error("Run `npm run build` first");

const files = walk(SITE);
const built = new Set(files.map((f) => "/" + path.relative(SITE, f).split(path.sep).join("/")));
const serves = (p) => built.has(p) || built.has(p.replace(/\/?$/, "/index.html")) || (p.endsWith("/") && built.has(p + "index.html"));

const ATTR = /<(a|img|script|link|iframe|source|embed|area)\b([^>]*)>/gi;
const VAL = (attrs, name) => { const m = attrs.match(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i")); return m ? (m[2] ?? m[3] ?? m[4]) : null; };
const unescape = (s) => s.replace(/&amp;/g, "&").replace(/&#0?38;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const stripTags = (s) => unescape(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

const broken = new Map(); // target path -> Map(page -> text)
const external = new Map(); // url -> Set(page)
let pages = 0, internalOk = 0;

for (const f of files.filter((f) => /\.(html?|shtml)$/i.test(f))) {
  const rel = "/" + path.relative(SITE, f).split(path.sep).join("/");
  const page = rel.replace(/index\.html$/, "");
  const buf = fs.readFileSync(f);
  let s; try { s = new TextDecoder("utf-8", { fatal: true }).decode(buf); } catch { s = buf.toString("latin1"); } // old copies are often Latin-1
  if (/<meta http-equiv="refresh"/i.test(s)) continue; // redirect stubs: their one link is the redirect
  pages++;
  for (const m of s.matchAll(ATTR)) {
    const tag = m[1].toLowerCase(), attrs = m[2];
    if (tag === "link" && !/\brel\s*=\s*["']?[^"'>]*(stylesheet|icon|alternate)/i.test(attrs)) continue; // canonical etc.
    const vals = [];
    for (const name of ["href", "src"]) { const v = VAL(attrs, name); if (v) vals.push(v); }
    const srcset = VAL(attrs, "srcset");
    if (srcset) vals.push(...srcset.split(",").map((x) => x.trim().split(/\s+/)[0]).filter(Boolean));
    const text = tag === "a" ? stripTags(s.slice(m.index + m[0].length, s.indexOf("</a>", m.index)).slice(0, 300)).slice(0, 100) : `<${tag}>`;
    for (let raw of vals) {
      raw = unescape(raw.trim());
      if (!raw || /^(#|mailto:|tel:|javascript:|data:|about:)/i.test(raw)) continue;
      let u;
      try { u = new URL(raw, BASE + page); } catch { continue; }
      if (!/^https?:$/.test(u.protocol)) continue;
      if (SELF.test(u.hostname)) {
        let p; try { p = decodeURIComponent(u.pathname); } catch { p = u.pathname; }
        if (serves(p) || FORWARDED.test(p)) { internalOk++; continue; }
        if (!broken.has(p)) broken.set(p, new Map());
        if (!broken.get(p).has(page)) broken.get(p).set(page, text);
      } else {
        u.hash = "";
        const key = u.href;
        if (!external.has(key)) external.set(key, new Set());
        external.get(key).add(page);
      }
    }
  }
}

const out = {
  scanned: new Date().toISOString().slice(0, 10), pages,
  internal: { ok: internalOk, broken: [...broken].sort((a, b) => b[1].size - a[1].size || a[0].localeCompare(b[0]))
    .map(([target, ps]) => ({ target, pages: [...ps].map(([page, text]) => ({ page, text })) })) },
  external: Object.fromEntries([...external].sort().map(([u, ps]) => [u, [...ps].sort()])),
};
fs.writeFileSync(path.join(ROOT, "docs/site-links.json"), JSON.stringify(out, null, 1));
console.log(`${pages} pages: ${internalOk} working links to www.sigmod.org, ${out.internal.broken.length} broken targets ` +
  `(${out.internal.broken.reduce((n, b) => n + b.pages.length, 0)} page links), ${external.size} distinct external URLs → docs/site-links.json`);
