import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/altersvorsorge-guide/",
  resolve: {
    alias: {
      "@alterversorge": path.resolve(rootDir, "../alterversorge/src"),
      react: path.resolve(rootDir, "node_modules/react"),
      "react-dom": path.resolve(rootDir, "node_modules/react-dom"),
      "lucide-react": path.resolve(rootDir, "node_modules/lucide-react"),
    },
    dedupe: ["react", "react-dom"],
  },
  server: {
    host: "127.0.0.1",
    port: 5174,
    fs: {
      allow: [rootDir, path.resolve(rootDir, "../alterversorge")],
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 5174,
  },
});
