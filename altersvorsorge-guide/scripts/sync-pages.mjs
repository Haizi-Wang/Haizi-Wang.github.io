#!/usr/bin/env node
/**
 * Copy Vite `dist/` into this folder for GitHub Pages (legacy: main branch `/`).
 *
 * User/org Pages only honor a site-root `404.html`, not one under a subfolder.
 * So for SPA deep links we also write `<route>/index.html` copies — those
 * return HTTP 200 at `/altersvorsorge-guide/<route>/` (and usually `/<route>`).
 */
import {
  cpSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const assetsOut = join(root, "assets");

/** Client routes that need a physical index for GitHub Pages. */
const SPA_ROUTES = [
  "eligibility",
  "process",
  "investing",
  "withdrawal",
  "rechner",
  "film",
];

if (!existsSync(join(dist, "index.html"))) {
  console.error("dist/index.html missing — run `npm run build` first");
  process.exit(1);
}

if (existsSync(assetsOut)) {
  for (const name of readdirSync(assetsOut)) {
    rmSync(join(assetsOut, name), { recursive: true, force: true });
  }
} else {
  mkdirSync(assetsOut, { recursive: true });
}

cpSync(join(dist, "assets"), assetsOut, { recursive: true });
copyFileSync(join(dist, "index.html"), join(root, "index.html"));
copyFileSync(join(dist, "index.html"), join(root, "404.html"));
if (existsSync(join(dist, "favicon.svg"))) {
  copyFileSync(join(dist, "favicon.svg"), join(root, "favicon.svg"));
}

// Deep-link shells: asset URLs in the built index are absolute
// (`/altersvorsorge-guide/assets/...`), so the same HTML works from subfolders.
const spaHtml = readFileSync(join(dist, "index.html"), "utf8");
for (const route of SPA_ROUTES) {
  const dir = join(root, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), spaHtml);
}

// Site-root fallback for any unmatched path (incl. guide deep links without a folder).
const siteRoot = join(root, "..");
writeFileSync(
  join(siteRoot, "404.html"),
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Redirecting…</title>
    <script>
      (function () {
        var path = location.pathname + location.search + location.hash;
        try { sessionStorage.setItem("av-guide-redirect", path); } catch (e) {}
        if (path.indexOf("/altersvorsorge-guide/") === 0) {
          location.replace("/altersvorsorge-guide/" + location.search + location.hash);
        } else {
          location.replace("/");
        }
      })();
    </script>
    <meta http-equiv="refresh" content="0;url=/" />
  </head>
  <body></body>
</html>
`,
);

console.log(
  "Synced dist/ → Pages files (index.html, 404.html, assets/, route shells: " +
    SPA_ROUTES.join(", ") +
    ")",
);
