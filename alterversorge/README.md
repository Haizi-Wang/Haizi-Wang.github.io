# Altersvorsorgedepot calculator

Chinese / German / English estimator for Germany’s reformed private pension investment account (**Altersvorsorgedepot**), effective **1 January 2027**.

Live reference (original published app): https://deutsch-alterversorge-rechner-ch.grok.me/

## Develop

```bash
npm install
npm run dev
```

## Test calculation rules

```bash
npx tsx src/calc.test.ts
```

## Build

```bash
npm run build
```

Static output is written to `dist/` (relative asset paths for GitHub Pages or Cursor publish).

## Notes

Source for the published grok.me app was **not** previously in this repository. This folder recovers the calculator logic from the live bundle, fixes the contribution start year to 2027, and modernizes the UI.
