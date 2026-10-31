// Build every design into _preview/<theme>/ for the GitHub Pages preview, with links
// rewritten for the site's base path (e.g. /sigmod.org/ on <user>.github.io).
//   PREVIEW_BASE=/sigmod.org/ node scripts/build-preview.mjs
import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";

const base = process.env.PREVIEW_BASE || "/";
const themes = ["a", "b", "c", "d"];
const start = "c";
const out = "_preview";

await fs.rm(out, { recursive: true, force: true });
for (const theme of themes) {
  execFileSync("npx", ["@11ty/eleventy", "--quiet"], { stdio: "inherit", env: { ...process.env, THEME: theme, PREVIEW_BASE: base, OUTPUT_ROOT: out } });
}
// Root: open the default design; 404: point back to it
const page = (title, body) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title>${body}`;
await fs.writeFile(`${out}/index.html`, page("sigmod.org preview", `<meta http-equiv="refresh" content="0; url=${base}${start}/"></head><body><p><a href="${base}${start}/">Open the preview</a></p></body></html>`));
await fs.writeFile(`${out}/404.html`, page("Not found", `</head><body style="font:16px system-ui;margin:48px"><h1>Page not found</h1><p>Designs: ${themes.map((t) => `<a href="${base}${t}/">${t.toUpperCase()}</a>`).join(" · ")}</p></body></html>`));
await fs.writeFile(`${out}/.nojekyll`, "");
console.log(`preview built for ${base}: ${themes.join(", ")}`);
