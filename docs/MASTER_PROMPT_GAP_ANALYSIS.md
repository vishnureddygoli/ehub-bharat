# EHUB Bharat — Master Prompt Gap Analysis

**Date:** 2026-07-27
**Branch:** `feat/ehub-bharat-government-world-class-upgrade`
**Baseline status:** Production build ✓ · ESLint ✓ · `tsc --noEmit` ✓ · smoke tests 7/7 ✓

## Legend

- **RETAIN** — Already excellent; keep as-is.
- **IMPROVE** — Present but needs improvement.
- **MISSING** — Not implemented.
- **VERIFY** — Requires factual verification / business information before publication.
- **N/A** — Not applicable to this engagement.
- **BLOCKED** — Blocked by missing business information, credentials, legal approval or an irreversible/production action.

## Stack & architecture (context)

- **Framework:** vinext 0.0.50 (Vite + RSC), Next 16 App Router API surface, React 19, TypeScript strict.
- **Hosting:** Cloudflare Workers (wrangler), D1 binding `DB` enabled in `.openai/hosting.json`, Drizzle ORM (`db/schema.ts`).
- **Rendering:** Home = `app/page.tsx`; all other content pages via `app/[...slug]/page.tsx` switch renderer; legacy URLs via per-route `route.ts` handlers + `redirects` table resolved in `generateMetadata`.
- **Content source of truth:** `app/data/site.ts`.
- **Decision:** Preserve this stack and architecture. No framework migration.

---

## 1. Positioning & strategy

| Area | Status | Notes |
|---|---|---|
| Government-first positioning | RETAIN | Homepage, nav, CTAs already government-led. |
| Role clarity (manufacturer / EPC / CPO / O&M / advisor) | IMPROVE | Roles implied via delivery pillars; add an explicit "roles we can contract for" block on About/Government pages. |
| Brand promise / headline | RETAIN | "Building India's Public EV Charging Infrastructure" already in use, matches master prompt. |
| Secondary (commercial/residential) kept but subordinate | RETAIN | Present as clearly secondary pathway. |

## 2. Manufacturing prominence

| Area | Status | Notes |
|---|---|---|
| Approved Telangana address published | RETAIN | Exact address in `site.ts`, homepage, manufacturing page, JSON-LD `Place`. |
| Dedicated manufacturing page | RETAIN | Present with verified-boundary discipline. |
| "Manufactured in Telangana…" positioning line | IMPROVE | Add the recommended headline treatment. |
| Facility photography | VERIFY | Placeholders only; real photos required (see CONTENT_VERIFICATION_REGISTER). |
| Capacity / certifications / equipment / lines | VERIFY | Correctly withheld until documented. Keep withheld. |
| Facility-visit / audit request | RETAIN | Routed to Government Project Desk. |

## 3. Truth / trust / legal rules

| Area | Status | Notes |
|---|---|---|
| No invented clients/projects/certs | RETAIN | Strong discipline throughout. |
| Project status taxonomy | RETAIN | Status labels present on Projects page. |
| Illustrative labelling of dashboards/estimators | IMPROVE | Estimator labelled; operations "platform view" should carry an explicit "Illustrative" tag. |
| Policy source + last-reviewed dating | IMPROVE | Knowledge articles are dated; add explicit source citations + "not legal advice" per article when article bodies are built. |
| Claims-evidence register | IMPROVE | `docs/fact-verification-register.md` exists; consolidate into `CONTENT_VERIFICATION_REGISTER.md`. |

## 4. Brand / visual identity — **primary work item**

| Area | Status | Notes |
|---|---|---|
| Approved SVG logo integrated | MISSING | Site uses a single 1024×341 PNG (`/brand/ehub-bharat.png`); new SVG package not wired. |
| Correct brand colours | IMPROVE | CSS uses off-brand `--red:#c5362d` + green/gold accents. Logo red is **#D71920**, graphite **#20252B**. Correct the token system. |
| Logo alt text | IMPROVE | Currently "Smart EV Charging and Battery Network" (consumer). Make government-appropriate. |
| Favicon set (ico/svg/png 16/32/48) | MISSING | Only `brand.icon` (tiny svg) referenced. |
| Apple touch icon (180) | MISSING | — |
| PWA manifest + 192/512 + maskable | MISSING | No manifest. |
| OG / Twitter images from real logo | IMPROVE | OG PNGs exist but predate the approved package; regenerate on-brand. |
| Reverse / mono logo variants for dark sections | MISSING | Dark utility bar + ink bands need a white-reverse logo. |
| Brand usage guide | MISSING | Add `docs/BRAND_USAGE.md`. |

## 5. Information architecture & pages

Existing routes (~30) cover: home, government hub + 9 solution briefs, manufacturing, ev-chargers + 3 categories, technology, energy-bess, ppp-commercial-models, projects, tender-rfp-desk, knowledge-centre, about, contact desk, private-sector set, 5 legal pages, robots, sitemap, API.

| Master-prompt page | Status | Notes |
|---|---|---|
| Homepage | RETAIN/IMPROVE | Strong; tighten section sequence + add trust/roles. |
| Government overview + sub-verticals | IMPROVE | 9 solution briefs exist; add explicit Central/CPSE, State/Nodal, Municipal/Smart City, Airports-Railways-Metro-Ports groupings (can map to existing briefs + new landing). |
| Manufacturing | RETAIN | — |
| Products (category) | RETAIN | — |
| Product **detail** template | MISSING | Only categories; add a reusable product-detail data model + template (unpopulated until datasheets supplied). |
| Technology | RETAIN | — |
| Government MIS & reporting | MISSING | Add dedicated page (illustrative report samples). |
| Operations & maintenance (O&M/SLA) | MISSING | Currently embedded; add dedicated page. |
| Project-development methodology | IMPROVE | Lifecycle exists; add a methodology page. |
| PPP & commercial models | RETAIN | — |
| Projects & credentials | IMPROVE | Framework only (correct). Add credentials/registrations section (VERIFY entries). |
| Case studies | MISSING/VERIFY | Template + placeholder; no fabricated cases. |
| Compliance & certifications | MISSING/VERIFY | Add page scaffold with VERIFY entries. |
| Leadership & governance | MISSING/VERIFY | Add page scaffold; names/bios/photos are BLOCKED (business info). |
| Careers | MISSING | Add lightweight careers page + contact. |
| Resources / downloads hub | IMPROVE | Downloads exist; add a resources index page. |
| Cookie policy | MISSING | Add (only if tracking introduced; otherwise minimal notice). |
| Sitemap (HTML) page | MISSING | Add human-readable sitemap page. |
| Custom 404 / error | IMPROVE | `not-found.tsx` exists; verify branded + helpful. |

## 6. Homepage standard

| Area | Status | Notes |
|---|---|---|
| Answers "who/what/why/how" in 10–15s | RETAIN | Hero + proof strip do this. |
| Recommended section sequence | IMPROVE | Reorder toward: hero → trust → problems → verticals → manufacturing → lifecycle → tech → platform → models → projects → O&M → resources → CTA. |
| Verified hero visual | IMPROVE | Abstract "infrastructure-visual" is acceptable placeholder; refine with brand geometry (pin/lightning). |

## 7. Design direction

| Area | Status | Notes |
|---|---|---|
| Institutional, restrained, premium | IMPROVE | Base is solid & non-gimmicky. Align palette to brand, tighten typography scale, ensure red is accent-only. |
| Avoids neon/glass/excess motion | RETAIN | Already disciplined. |
| Tabular numerals for metrics | IMPROVE | Apply to estimator + spec tables. |
| Reduced-motion | IMPROVE | Add `prefers-reduced-motion` handling for `scroll-behavior` + any transitions. |

## 8. Content integrity

| Area | Status | Notes |
|---|---|---|
| Verification register | IMPROVE | Consolidated in `CONTENT_VERIFICATION_REGISTER.md`. |
| Status labels | RETAIN | — |
| No placeholder text in prod build | RETAIN | No lorem; "verification required" language is intentional & labelled. |

## 9. Products

| Area | Status | Notes |
|---|---|---|
| Structured product data model | MISSING | Add `products` array (empty/awaiting-datasheet) + detail template. |
| Claim safeguards (no 480kW/OCPP2.0.1/IP) | RETAIN | Explicitly withheld. |
| Charging-time caveat language | IMPROVE | Add the standard "actual speed depends on…" block to charger pages. |

## 10. Government procurement journeys

| Area | Status | Notes |
|---|---|---|
| Enquiry form (proportionate fields) | RETAIN | Good field set, honeypot, consent, aftercare. |
| Success state + reference number | RETAIN | `EHB-GOV-…` reference returned. |
| **Lead persistence / notification** | MISSING | API validates + returns a reference but does **not** persist to D1 or notify. Lead currently goes nowhere. Wire D1 persistence (binding available); email notification is BLOCKED on a mail provider/credential. |
| Rate limiting | IMPROVE | In-memory Map works per-instance; on Workers this is per-isolate. Move to D1/KV-backed counter for correctness. |
| Secure upload handling | IMPROVE/VERIFY | Type/size validated; no storage/scan. Store to R2 + quarantine is BLOCKED on R2 + scanner. Until then, keep uploads optional and unstored, and say so. |
| Multiple CTA types (presentation, feasibility, datasheet, visit, audit) | IMPROVE | Add pre-fill/category routing to the desk. |

## 11. Technology & software

| Area | Status | Notes |
|---|---|---|
| Plain-language platform explanation | RETAIN | — |
| "Illustrative Dashboard" labelling | IMPROVE | Add explicit label to `OperationsPlatformView`. |
| Security & data governance section | MISSING | Add to technology page. |

## 12. SEO

| Area | Status | Notes |
|---|---|---|
| Titles/descriptions/canonical | RETAIN | Per-page metadata present. |
| robots.txt / sitemap.xml | RETAIN | `app/robots.ts`, `app/sitemap.ts`. |
| Org / Service / Breadcrumb / Place JSON-LD | RETAIN | Present. |
| Product / Article / FAQ schema | IMPROVE | Add Product (verified only), Article (knowledge), FAQ (where visible Q&A exists). |
| Image sitemap | IMPROVE | Optional; add once real imagery exists. |
| SEO content matrix | IMPROVE | See `SEO_CONTENT_MATRIX.md`. |

## 13. Accessibility (WCAG 2.2 AA)

| Area | Status | Notes |
|---|---|---|
| Skip link, landmarks, focus-visible | RETAIN | Present. |
| Heading hierarchy | IMPROVE | Audit for single-H1 + logical order on `[...slug]` pages (hero H1 + section H2s — OK; verify no skips). |
| Mobile nav (`<details>`) keyboard/SR | IMPROVE | Works; verify SR labelling + escape behaviour. |
| Form labels/errors/summary | IMPROVE | Labels good; add per-field error identification + error summary + `aria-invalid`. |
| Reduced motion | IMPROVE | Add media query. |
| Colour contrast (after palette change) | VERIFY | Re-check red-on-white / white-on-graphite ratios. |
| 200–400% zoom / reflow | VERIFY | Manual check pending. |

## 14. Performance

| Area | Status | Notes |
|---|---|---|
| Server-rendered, minimal JS | RETAIN | Mostly server components; client only for form/estimator. |
| Fonts | IMPROVE | Geist via `next/font` (Google). Acceptable; confirm no layout shift. |
| Image dimensions / next/image | IMPROVE | Logo uses `next/image` with width/height (good). Ensure new assets keep intrinsic dims. |
| CWV field data | BLOCKED | No production RUM yet; see `PERFORMANCE_BASELINE.md`. |

## 15. Security & privacy

| Area | Status | Notes |
|---|---|---|
| Security headers | RETAIN | Present (verified by tests). Confirm CSP strength. |
| Origin check + rate limit + honeypot | RETAIN | Present. |
| Server-side validation | RETAIN | Present. |
| Secrets hygiene | RETAIN | No secrets committed; `.env.example` review needed. |
| CSP / HSTS / Permissions-Policy specifics | IMPROVE | Review `worker`/headers layer for full set. |
| Dependency audit | IMPROVE | `npm audit` reports issues (see SECURITY_REVIEW). |

## 16. Testing / QA

| Area | Status | Notes |
|---|---|---|
| Smoke tests | RETAIN | 7 passing. |
| Broken-link / metadata / structured-data / a11y automation | IMPROVE | Extend test suite incrementally. |
| Cross-browser / device | BLOCKED | Manual/real-device pending; document in QA. |

## 17. Launch / ops

| Area | Status | Notes |
|---|---|---|
| Redirect map | RETAIN | `redirects` table + `docs/redirect-map.md`. |
| Deployment/rollback runbooks | IMPROVE | `docs/deployment-documentation.md` exists; add `LAUNCH_CHECKLIST.md`. |
| Env var docs | RETAIN | `docs/environment-variables.md`. |

---

## Top release-blocking gaps (priority order)

1. **Brand system not integrated** (logo, favicons, manifest, palette). — *Actionable now.*
2. **Enquiry leads are not persisted or routed.** — *D1 persistence actionable now; email BLOCKED on provider.*
3. **Illustrative labelling** on platform/dashboard views. — *Actionable now.*
4. **Missing pages** (O&M, MIS, methodology, leadership, careers, compliance, case-study/product templates, sitemap page, cookie). — *Scaffolds actionable now; some content VERIFY/BLOCKED.*
5. **Form a11y** (error identification + summary). — *Actionable now.*
6. **CSP/headers hardening + dependency audit.** — *Actionable now.*

## Blocked on business information (see FACTS list)

Legal entity name/CIN/GST, leadership bios/photos, real factory photos, product datasheets & ratings, certifications, approved projects, mail provider + R2 for uploads, analytics platform choice, confirmed public phone/email ownership.
