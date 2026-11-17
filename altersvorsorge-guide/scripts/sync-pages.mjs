#!/usr/bin/env node
/**
 * Copy Vite `dist/` into this folder for GitHub Pages (legacy: main branch `/`).
 * Also writes SPA fallback `404.html` so /rechner and /film resolve.
 */
import { cpSync, copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const assetsOut = join(root, "assets");

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

console.log("Synced dist/ → Pages files (index.html, 404.html, assets/)");
