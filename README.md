# Hyperion Portfolio (Vite + React + Tailwind)

A polished DevOps portfolio for **Hyperion (Vijay Shukla)** with Grafana-style gauges and KPI cards.

## Quick Start
```bash
npm install
npm run dev
```

Place your photos here:
- `public/images/profile.jpg`
- `public/images/workshop.jpg`

## Build
```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages (root: vijayshuklahl.github.io)
1. Create a repo named **vijayshuklahl.github.io** (exactly).
2. Push this project.
3. The workflow will build and push to `gh-pages` branch.
4. In GitHub → Settings → Pages, set Source to **Deploy from a branch**, Branch: **gh-pages** / **root**.

(If Pages is already set to use `gh-pages`, you're done.)

## Customize
- Edit links/email in `src/App.tsx` `CONFIG` block.
- Replace KPI values or add more cards in `SkillsMetrics`.
- Blog cards are placeholders — link to your dev.to/Medium or mdx later.
