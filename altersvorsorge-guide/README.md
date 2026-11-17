# Altersvorsorgedepot 教育指南

正式教育站（zh-CN / EN）：准入 → 过程 → 选基金 → 退出提领，并在站内整页路由打开计算器。首页与页眉可切换中英文；计算器本身保留其自带多语言。

## 本地预览

```bash
cd altersvorsorge-guide
npm install
npm run build
npm run preview
```

打开：http://127.0.0.1:5174/altersvorsorge-guide/

## 构建 / GitHub Pages

Pages 从 `main` 仓库根目录静态托管（无单独 build Action）。`dist/` 被 gitignore，发布时需把生产构建同步进本目录：

```bash
npm run build
# → 写入 index.html、404.html、assets/（含 JS/CSS/mp3）
# 然后提交并 push 到 main
```

`base` 为 `/altersvorsorge-guide/`。`404.html` 与 `index.html` 相同，供 `/rechner`、`/film` 等 SPA 深链。开发用 `index.source.html`（`npm run dev` 会先还原）。

## 计算器

「计算器」路由 `/altersvorsorge-guide/rechner` 同源嵌入仓库 `alterversorge/` 的 React 计算器（整页路由，保留指南导航）。不再依赖新标签打开外部 grok.bot 地址作为主入口。
