// Build every theme into _site/<theme>/.
import { execFileSync } from "node:child_process";

for (const theme of ["a", "b", "c", "d"]) {
  execFileSync("npx", ["@11ty/eleventy", "--quiet"], { stdio: "inherit", env: { ...process.env, THEME: theme } });
}
