# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # local dev server (localhost:5173, proxies nothing — AEM runs separately)
npm run build    # production build → dist/
npm run preview  # serve the dist/ build locally
```

No test runner or linter is configured.

## Architecture

Single-page Vite + React app deployed to Vercel. Two entry points:

| URL | Source | Description |
|---|---|---|
| `/` | `src/App.jsx` → `src/AEMStudyTracker.jsx` | React study tracker |
| `/aem-exam-prep.html` | `public/aem-exam-prep.html` | Static HTML practice quiz |

`public/` files are copied verbatim to `dist/` by Vite — this is how the static HTML quiz coexists with the React SPA.

## AEMStudyTracker.jsx

All application logic lives in this one file (~1300 lines). Key sections:

- **Constants** (`DOMAINS`, `ADDITIONAL_TOPICS`, `CALENDAR_SLOTS`, `DOMAIN_MAP`, `SETUP_PATHS`) — all study content is hardcoded here, no external data fetching.
- **State** — three independent `localStorage` keys: `aem_tracker` (exercises, schedule slots, notes) and `aem_tracker_setup` (sandbox setup step completion).
- **Tabs** — `activeTab` drives which section renders: `prereqs`, `dashboard`, `schedule`, `exercises`, `topics`, `additional`.
- **Layout pattern** — full-bleed colored bands (header, tab nav) contain a `maxWidth: 1100 / margin: "0 auto"` inner wrapper to align content. All new sections should follow this pattern.

All styling is inline (`style={{}}`). There is no CSS file, no CSS modules, and no Tailwind.
