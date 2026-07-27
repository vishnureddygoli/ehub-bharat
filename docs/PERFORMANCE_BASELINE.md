# EHUB Bharat — Performance Baseline

**Date:** 2026-07-27 · Build: vinext production build **passes**.

## Architecture posture (favourable)

- Server-rendered content; client JS limited to two `"use client"` islands: `GovernmentDeskForm` (+`FleetChargingEstimator`) and no global client framework beyond React runtime.
- Fonts: Geist / Geist Mono via `next/font/google` (self-optimised, `font-display` handled by Next).
- Images: logo via `next/image` with explicit `width`/`height` (no CLS). Few raster assets.
- CSS: single `globals.css` (~1.5k lines) + Tailwind v4. No heavy animation libraries.

## Targets (75th percentile)

| Metric | Target | How verified |
|---|---|---|
| LCP | ≤ 2.5 s | Lab (Lighthouse) + field RUM post-launch |
| INP | ≤ 200 ms | Field RUM |
| CLS | ≤ 0.1 | Lab + field |
| Lighthouse Perf | 90+ | CI/lab |
| Lighthouse A11y | 95+ | axe + Lighthouse |
| Lighthouse Best-Practices | 95+ | lab |
| Lighthouse SEO | 95+ | lab |

## Baseline measurement status

- **Lab Lighthouse / CWV numbers: NOT YET CAPTURED.** Requires a running server (`vinext start`) + Lighthouse run, or a preview deployment. **BLOCKED** on local run in this environment / preview URL. To capture: `npm run build && npx vinext start` then Lighthouse on `/`, `/government-ev-infrastructure`, `/manufacturing`, `/technology`, `/contact/government-project-desk`.
- **Field RUM: BLOCKED** — no production analytics yet (needs approved platform).

## Budget (to enforce in CI, Stage 9)

- HTML ≤ 60 KB gz per page · CSS ≤ 60 KB gz · JS (initial) ≤ 120 KB gz · LCP image ≤ 200 KB.
- Fail CI on >15% regression of any budget.

## Actions

- [ ] Capture lab Lighthouse once preview/local server available (Stage 9).
- [ ] Add `prefers-reduced-motion` (also a11y A1).
- [ ] Confirm new brand OG/PNG assets are compressed (≤ 200 KB) and sized.
- [ ] Add CWV field monitoring after analytics approved.
