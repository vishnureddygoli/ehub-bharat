# EHUB Bharat — Accessibility Audit (WCAG 2.2 AA)

**Date:** 2026-07-27 · Target: WCAG 2.2 AA + GIGW 3.0-inspired usability (not claiming GIGW certification).
Method: static code review + build-time render inspection. Manual SR/keyboard + automated axe pass scheduled Stage 6/9.

## Present / passing (RETAIN)

- Skip-to-content link (`.skip-link`, focus-reveals).
- Semantic landmarks: `header` / `nav` / `main#main-content` / `footer`.
- `:focus-visible` outline (3px, offset) globally.
- `html lang="en-IN"`.
- Breadcrumb nav with `aria-current="page"`.
- Form: labelled fields, honeypot hidden from tab order (`tabIndex=-1`), consent checkbox, `role="status" aria-live="polite"` for submit result, `aria-describedby` note.
- Reduced-motion: **partial** — `scroll-behavior:smooth` not yet guarded.
- Diagrams use `role="img"` + `aria-label` (blueprint, energy flow, infrastructure visual `aria-hidden`).

## Findings to fix

| ID | Issue | WCAG | Severity | Stage |
|---|---|---|---|---|
| A1 | ~~No `prefers-reduced-motion` guard~~ **DONE** — media query disables smooth scroll + collapses animations/transitions | 2.3.3 | — | ✓ |
| A2 | Form error identification: native HTML5 `required` gives per-field browser validation; server errors now announced assertively (`role=alert`). Per-field `aria-invalid` + client error summary still **outstanding** | 3.3.1 / 3.3.3 | Medium | future |
| A3 | ~~Focus not moved on submit~~ **DONE** — focus moves to the result region on success/error | 2.4.3 / 4.1.3 | — | ✓ |
| A4 | Mobile nav via `<details>` — verify Escape close + `summary` SR name; ensure not a keyboard trap | 2.1.1 / 2.1.2 | Medium | 5/6 |
| A5 | Colour contrast must be re-verified after palette change (red #D71920 on white ≈ 4.9:1 for large text; verify body-size usages use graphite not red) | 1.4.3 | High | 5 |
| A6 | Utility-bar links on dark `--deep` — verify contrast + `overflow-x:auto` reachable by keyboard | 1.4.3 / 2.1.1 | Medium | 5 |
| A7 | Verify heading order on every `[...slug]` kind (no H2→H4 skips) | 1.3.1 | Medium | 5 |
| A8 | Estimator range/number inputs need programmatic min/max labels + tabular numerals for output | 1.3.1 / 4.1.2 | Low | 5 |
| A9 | 200%–400% zoom + 320px reflow manual pass | 1.4.10 / 1.4.4 | Medium | 9 |
| A10 | Downloadable PDFs need accessible HTML equivalents or tagged-PDF confirmation | 1.1.1 | Medium | 9 (VERIFY) |

## Acceptance
Automated axe = 0 critical **and** manual keyboard + SR pass on: home, government hub, manufacturing, technology, contact form, a legal page. An automated score alone is not acceptance.
