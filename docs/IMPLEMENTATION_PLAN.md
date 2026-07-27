# EHUB Bharat — Implementation Plan

**Branch:** `feat/ehub-bharat-government-world-class-upgrade`
**Approach:** Audit-led integration. Preserve strong existing work; upgrade against the full master prompt. Commit in reviewable stages.

## Guardrails

- No framework migration (keep vinext + Next 16 + React 19 + TS strict).
- No fabricated facts. Unverifiable claims become VERIFY entries + safe language.
- No irreversible/production/credentialed action without owner sign-off (deploy, mail provider keys, R2, DNS, analytics IDs).
- Every stage must keep build/lint/typecheck/tests green.

## Staged commits

| # | Stage | Scope | Gate |
|---|---|---|---|
| 0 | **Baseline + audit** (this commit) | Restore tree, branch, audit docs, verification register. | Build/lint/tsc/tests green. |
| 1 | **Brand system** | SVG logos → `public/brand/`, header/footer/mobile/reverse variants, favicon set, apple-touch, `manifest.webmanifest`, PWA icons, OG/Twitter regen, brand color tokens (#D71920 / #20252B), `BRAND_USAGE.md`, alt-text fix, remove obsolete PNG refs. | Visual check + tests green. |
| 2 | **Trust & labelling** | "Illustrative dashboard" labels, roles-we-can-contract block, charging-time caveat, disclaimer polish. | Tests green. |
| 3 | **Lead pipeline** | D1 persistence of enquiries (binding `DB`), D1/KV-backed rate limit, reference logging, graceful no-store upload messaging. Email notify = documented TODO (BLOCKED). | New API test green. |
| 4 | **IA + new pages** | O&M/SLA, Government MIS & reporting, Project-development methodology, Compliance & certifications (VERIFY), Leadership & governance (scaffold, BLOCKED bios), Careers, Resources index, HTML sitemap page, Cookie notice, Product-detail template + `products` model, Case-study template. Wire nav + sitemap + redirects. | Build/tests green, no broken links. |
| 5 | **Design polish** | Typography scale, tabular numerals, reduced-motion, spacing rhythm, red-as-accent audit, hero geometry refine, print styles for gov pages. | A11y + visual check. |
| 6 | **Form a11y + validation** | Per-field error identification, error summary, `aria-invalid`, success focus management. | A11y check + tests. |
| 7 | **Security hardening** | CSP/HSTS/Permissions-Policy review in worker/headers layer, cookie flags, `.env.example` review, document dep-audit exception. | Header tests green. |
| 8 | **SEO depth** | Product/Article/FAQ JSON-LD (verified only), metadata sweep, internal linking, breadcrumbs everywhere, SEO matrix cross-check. | Structured-data validates. |
| 9 | **QA + docs** | Extend tests (links, metadata, a11y smoke), responsive QA notes, screenshots, final release report + 30/60/90 plan. | Full suite green. |

## Test/verify commands

```bash
npm run build          # vinext production build (Cloudflare)
npm run lint           # eslint
npx tsc --noEmit       # typecheck
npm test               # build + node --test tests/rendered-html.test.mjs
```

## Definition of done (per master prompt §27 / Phase 19)

Full site reviewed, implemented, tested, documented; brand integrated everywhere; no fabricated facts in prod; a11y AA on core flows; headers + validated forms; staged commits; final report with before/after, file list, verification register, remaining-info list, and 30/60/90 roadmap.
