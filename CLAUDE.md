# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # local dev server (localhost:5173)
npm run build    # production build → dist/
npm run preview  # serve the dist/ build locally
```

No test runner or linter is configured.

## Architecture

Single-page Vite + React app deployed to Vercel. Two types of entry points:

| URL | Source | Description |
|---|---|---|
| `/` | `src/App.jsx` → `src/AEMStudyTracker.jsx` | React study tracker |
| `/aem-exam-prep.html` | `public/aem-exam-prep.html` | Self-paced practice quiz (35 Qs, explanations per question) |
| `/aem-exam-prep.html?timed=true` | same file, URL param | Same quiz with 70-min countdown timer |
| `/architecture-quiz.html` | `public/architecture-quiz.html` | 10-question review quiz (Templates & Policies + Roles & Permissions) |
| `/mock-exam.html` | `public/mock-exam.html` | 35 new questions, exam mode (no per-Q feedback), mandatory 70-min timer, missed-Q review at results |
| `/final-exam.html` | `public/final-exam.html` | 35 scenario questions, exam mode, gap review at results links weak domains to specific tracker exercises |

`public/` files are copied verbatim to `dist/` by Vite — this is how the static HTML quizzes coexist with the React SPA.

## AEMStudyTracker.jsx

All application logic lives in this one file (~1300 lines). Key sections:

- **Constants** (`DOMAINS`, `ADDITIONAL_TOPICS`, `CALENDAR_SLOTS`, `DOMAIN_MAP`, `SETUP_PATHS`) — all study content is hardcoded here, no external data fetching.
- **State** — two independent `localStorage` keys: `aem_tracker` (exercises, schedule slots, notes) and `aem_tracker_setup` (sandbox setup step completion).
- **Tabs** — `activeTab` drives which section renders: `prereqs`, `dashboard`, `schedule`, `exercises`, `topics`, `additional`.
- **Layout pattern** — full-bleed colored bands (header, tab nav) contain a `maxWidth: 1100 / margin: "0 auto"` inner wrapper. All new sections must follow this pattern.

All styling is inline (`style={{}}`). No CSS file, no CSS modules, no Tailwind.

### localStorage schema

```js
// key: "aem_tracker"
{ exercises: { "a1": true, ... }, slots: { "2": true, ... }, notes: { "a1": "...", ... } }

// key: "aem_tracker_setup"
{ "lc1": true, ... }
```

`slots` is keyed by the **zero-based index** of the entry in `CALENDAR_SLOTS`. The schedule tab renders `CALENDAR_SLOTS` as a flat sequential list (no date grouping).

## Static Quiz Files

All four HTML files in `public/` are self-contained (no imports, no build step). They share the same question format:

```js
{ id, type: 'mc'|'tf'|'multi', domain, question, options: [], correct: [0-based indices], explanation, selectCount? }
```

**Pattern differences by file:**
- `aem-exam-prep.html` — per-question feedback after submit; timer activated via `?timed=true` URL param; `TIMED_MODE = new URLSearchParams(location.search).has('timed')`.
- `mock-exam.html` — no feedback during quiz; answers locked on advance; full missed-question review with explanations at results screen; timer always on.
- `final-exam.html` — same exam mode as mock-exam; results screen adds a **Gap Review** section that maps weak domains (< 70%) to specific `GAP_EXERCISES` entries (exercise IDs and names from the tracker). The `GAP_EXERCISES` constant at the top of the file controls these recommendations.
- `architecture-quiz.html` — self-paced with per-question feedback, blue color scheme (`#1B6CA8`), scoped to Templates & Policies and Roles & Permissions only.

## Quiz → Tracker Completion Integration

Each quiz file writes back to `aem_tracker` in localStorage when the results screen renders, auto-checking the corresponding schedule slot. The pattern used in every quiz file:

```js
function markTrackerSlot(idx) {
  try {
    const raw = localStorage.getItem('aem_tracker');
    const data = raw ? JSON.parse(raw) : { exercises: {}, slots: {}, notes: {} };
    data.slots = data.slots || {};
    data.slots[idx] = true;
    localStorage.setItem('aem_tracker', JSON.stringify(data));
  } catch(e) {}
}
```

Slot index mappings (index into `CALENDAR_SLOTS`):

| File | Slot index | Condition |
|---|---|---|
| `architecture-quiz.html` | 2 | always |
| `aem-exam-prep.html` | 7 | only when `TIMED_MODE` is true |
| `mock-exam.html` | 10 | always |
| `final-exam.html` | 14 | always |

`markTrackerSlot` is called at the top of `renderResults()` or `finishExam()` in each file.

## Schedule → Quiz Link Wiring

`CALENDAR_SLOTS` in `AEMStudyTracker.jsx` uses an optional `quizLink` field. When present, the schedule tab renders a "Practice Quiz →" anchor for that slot.

| CALENDAR_SLOTS index | Topic | quizLink |
|---|---|---|
| 2 | Quick review & practice quiz | `/architecture-quiz.html` |
| 7 | Timed practice quiz (35 questions) | `/aem-exam-prep.html?timed=true` |
| 10 | Full timed mock exam (35 questions) | `/mock-exam.html` |
| 14 | Final mock exam + gap review | `/final-exam.html` |
