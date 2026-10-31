// Serve the design alternatives side by side:
//   A Classic       http://localhost:8081
//   B Bold          http://localhost:8082
//   C Refined       http://localhost:8083
//   D Light modern  http://localhost:8084
import { spawn } from "node:child_process";

const themes = { a: 8081, b: 8082, c: 8083, d: 8084 };
const children = Object.entries(themes).map(([theme, port]) =>
  spawn("npx", ["@11ty/eleventy", "--serve", `--port=${port}`, "--quiet"], { stdio: "inherit", env: { ...process.env, THEME: theme } }));
for (const [theme, port] of Object.entries(themes)) console.log(`theme ${theme}: http://localhost:${port}`);
process.on("SIGINT", () => { children.forEach((c) => c.kill()); process.exit(); });
