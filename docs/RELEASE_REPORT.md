# EHUB Bharat — Release Report

**Branch:** `feat/ehub-bharat-government-world-class-upgrade` → PR #1
**Date:** 2026-07-27
**Approach:** Audit-led, production-grade upgrade of the existing government EV site against the EHUB Bharat master prompt. Existing strong work preserved; no rebuild; no framework change.

## 1. Executive summary

The existing site was already a disciplined, government-first implementation. This work integrated the approved brand system, closed the most important functional and trust gaps, filled out the information architecture, and hardened accessibility, security and SEO — in 11 reviewable commits, each keeping **build · ESLint · `tsc --noEmit` · tests** green.

Headline outcomes:
- **Brand corrected end to end** — approved SVG logo everywhere; favicons/PWA/OG generated from vector sources; palette moved from an off-brand green-led theme to logo-derived red `#D71920` / graphite `#20252B`.
- **Government enquiries are no longer lost** — they now persist to Cloudflare D1 (verified under workerd), with a hashed client id and an honest failure mode.
- **Nine new pages + product/case-study templates** fill the master-prompt IA without fabricating any fact.
- **Typecheck, security headers, accessibility and structured data** all improved and verified.

## 2. Before → after

| Dimension | Before | After |
|---|---|---|
| Logo | single 1024×341 PNG, consumer alt text | approved SVG system (header/footer/mobile/reverse) + favicon.ico/svg, apple-touch, PWA + maskable, manifest, on-brand OG cards |
| Palette | green + gold accents (off-brand) | logo-derived red `#D71920` accent + graphite `#20252B` |
| Enquiry leads | validated, then **discarded** (fake reference) | persisted to **D1**, hashed client id, honest 503 on failure |
| `tsc --noEmit` | **failed** (3 Cloudflare-types errors) | passes |
| Pages | ~30 routes | + O&M, MIS, methodology, compliance, leadership, careers, resources, HTML sitemap, cookies, products index/detail, case-study template |
| Security headers | duplicated in two files, `'unsafe-eval'` allowed | single source, `'unsafe-eval'` removed, extra directives |
| Accessibility | good base | + reduced-motion, tabular numerals, form focus management |
| Structured data | Org/Place/Service/Breadcrumb | + FAQPage, Product (when populated) |
| Automated tests | 7 | 10 (+ SEO/JSON-LD/broken-link) |

## 3. Commits (stages)

1. `364852d` Phase-1 baseline audit (8 docs)
2. `62408d6` Brand system + palette
3. `3dca4e6` Cloudflare types → tsc green
4. `e367e77` Enquiry persistence → D1
5. `56f153a` Contractable-roles block + charging caveat
6. `e426b76` Nine new pages
7. `577f7c2` Accessibility (reduced-motion, tabular, form focus)
8. `e0ce545` Security-headers consolidation + hardening
9. `f439ca5` Government FAQ + FAQPage schema
10. `8d3a3ea` Product + case-study templates
11. `ba38cdc` Expanded test suite

Diff vs `main`: 61 files, ~2.7k insertions.

## 4. Verification results

| Gate | Result | Evidence |
|---|---|---|
| Production build (`npm run build`) | PASS | vinext build completes, all routes emitted |
| Lint (`npm run lint`) | PASS | clean |
| Typecheck (`npx tsc --noEmit`) | PASS | 0 errors |
| Tests (`npm test`) | **10/10 PASS** | routes, headers, redirects, enquiry POST, sitemap/robots, one-H1+canonical, JSON-LD validity, broken-link crawl |
| D1 persistence | VERIFIED | `vinext dev` (workerd): enquiry row written; client IP stored as SHA-256 hash |
| CSP hardening | VERIFIED non-breaking | live client re-render worked after dropping `'unsafe-eval'` |
| Brand integration | VERIFIED | homepage/about/new pages render on-brand in-browser |
| Responsive (375px) | VERIFIED | zero horizontal overflow on home, MIS, contact form |
| Structured data | VALID | JSON-LD parses; Organization/FAQPage/Breadcrumb asserted in tests |

## 5. Trust discipline (no fabricated facts)

- No invented projects, certifications, metrics, capacities, logos or bios anywhere.
- MIS samples labelled "Illustrative sample report"; operations dashboard labelled "Illustrative".
- Compliance framed as design intent; certification register is a scaffold pending evidence.
- Products/case-studies are data-driven and **empty** — `/products/<unknown>` correctly 404s.
- Register: `docs/CONTENT_VERIFICATION_REGISTER.md`.

## 6. Known residuals (documented, not blocking merge)

- `script-src`/`style-src` still need `'unsafe-inline'` for RSC hydration + JSON-LD (nonce strategy is future work).
- Rate limiting is in-memory (per-isolate on Workers); D1/KV-backed limiter is a future improvement (no KV binding available). See `docs/SECURITY_REVIEW.md` S1/S6.
- `npm audit`: 16 dev/build-time vulns; the only fix downgrades Next 16→14 (breaking) — documented exception, not applied.
- Lab Lighthouse/CWV numbers not captured in this environment (needs a preview URL); see `docs/PERFORMANCE_BASELINE.md`.

## 7. Blocked on business information (before production)

Legal entity (name/CIN/GST/registered office) · leadership bios+photos · real factory photographs · product datasheets/ratings · certifications (numbers+expiry) · **mail provider + keys** (enquiry acknowledgement email) · **R2** (secure upload storage) · analytics platform choice · confirm public phone/email ownership & monitoring · EHUB Bharat / EHUB Charge / E2HUB entity relationship · Indian data-protection legal review · production deploy authorisation. Full list: `docs/CONTENT_VERIFICATION_REGISTER.md` + `docs/LAUNCH_CHECKLIST.md`.

## 8. Recommended 30 / 60 / 90-day roadmap

**30 days (unblock + measure)**
- Supply legal entity, contact confirmation, factory photos, first product datasheet(s).
- Wire a mail provider so enquiry acknowledgements send; connect the D1 lead export to an operator inbox/CRM.
- Capture lab Lighthouse on a preview URL; add Core Web Vitals field monitoring once analytics is approved.

**60 days (depth + evidence)**
- Publish first product-detail pages and any approved case studies (templates ready).
- Populate the certification register with real certificates (number + expiry).
- Add R2 + malware scanning to enable secure document uploads.
- Nonce-based CSP to remove `'unsafe-inline'`.

**90 days (scale + governance)**
- Multilingual (Hindi/Telugu) with `hreflang`, once content is approved.
- CMS/editorial workflow for projects, products, policies and certifications.
- Expand knowledge-centre articles with dated sources; broaden automated a11y (axe) + visual-regression in CI.
