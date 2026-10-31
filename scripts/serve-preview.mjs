// Serve the preview build (_preview/) the way GitHub Pages will, under its base path:
//   PREVIEW_BASE=/sigmod.org/ node scripts/serve-preview.mjs  →  http://localhost:8090/sigmod.org/
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

const base = process.env.PREVIEW_BASE || "/sigmod.org/";
const root = path.resolve("_preview");
const port = Number(process.env.PORT || 8090);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".gif": "image/gif", ".xml": "application/xml", ".json": "application/json" };

http.createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (url === "/") return res.writeHead(302, { location: base }).end();
  let file = path.join(root, url.startsWith(base) ? url.slice(base.length) : "\0");
  if (!file.startsWith(root)) return res.writeHead(403).end();
  if (url.endsWith("/")) file = path.join(file, "index.html");
  try {
    const body = await fs.readFile(file);
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" }).end(body);
  } catch {
    res.writeHead(404, { "content-type": types[".html"] }).end(await fs.readFile(path.join(root, "404.html")).catch(() => "Not found"));
  }
}).listen(port, () => console.log(`preview: http://localhost:${port}${base}`));
