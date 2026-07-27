# EHUB Bharat — Security Review

**Date:** 2026-07-27 · Scope: public marketing site + government enquiry API on Cloudflare Workers.

## Present / passing (RETAIN)

- **Security headers** present and asserted by smoke test (`important security headers are present`). Confirm full set in worker/headers layer (Stage 7).
- **Enquiry API** (`app/api/government-enquiry/route.ts`): same-origin check (origin vs host → 403), honeypot (`company_website`), server-side required-field validation, email regex, file type allow-list, 10 MB size cap, generic error messages (no stack traces).
- **Rate limiting**: 5 requests / 10 min per client key (`cf-connecting-ip`/`x-forwarded-for`).
- **No secrets** committed (scan: no keys/tokens in tracked source). `.env.example` review pending.

## Findings

| ID | Issue | Severity | Stage |
|---|---|---|---|
| S1 | Rate-limit state is an in-memory `Map` — per-isolate on Workers, so effectively weak across the fleet. Move to D1/KV-backed counter. | Medium | 3 |
| S2 | Enquiry is validated but **not persisted or routed** — no D1 write, no notification. Operational risk (lost leads) more than security, but combine with S1 on D1. | High (ops) | 3 |
| S3 | Uploaded files are validated but not stored/scanned. Until R2 + malware scanning exist, keep uploads optional and **do not persist** them; message this clearly. Never accept executables. | Medium | 3 (VERIFY) |
| S4 | ~~CSP strength unverified~~ **ADDRESSED (Stage 7):** headers consolidated to one source (`security-headers.ts`, imported by `next.config.ts` + `proxy.ts`). Dropped `'unsafe-eval'` (verified hydration/interactivity still work); added `manifest-src`, `worker-src`, `frame-src 'none'`, `browsing-topics=()`. HSTS preload, Referrer-Policy, Permissions-Policy, nosniff, X-Frame-Options DENY, `frame-ancestors 'none'` all present. **Residual:** `script-src`/`style-src` still need `'unsafe-inline'` for RSC hydration + JSON-LD; a nonce/hash strategy is future work. | Low (residual) | — |
| S5 | Cookie flags — no cookies set today; if any added, enforce `HttpOnly`/`Secure`/`SameSite`. | Low | 7 |
| S6 | `npm audit`: 16 vulns (4 moderate, 12 high) — **all dev/build-time** (`drizzle-kit`→`@esbuild-kit/esm-loader`, `postcss ≤8.5.17`, `sharp`). The only offered fix downgrades **Next 16 → 14 (breaking)**. **Documented exception:** not applied — these do not run in the deployed Worker request path; owner-forbidden framework downgrade outweighs dev-time risk. Re-evaluate when upstream (Next/drizzle-kit) ships patched ranges. | High (dev-only) | 7 (accepted) |

## Privacy

- Minimise collected data (form fields are proportionate). Do not send enquiry PII to analytics/logs/URLs.
- Provide grievance/privacy contact (present on `/privacy`, `/security`).
- Indian data-protection review by counsel = **BLOCKED** (owner/legal) before launch.
- No analytics/trackers added without approved platform + consent stance.

## Acceptance
No high/critical **runtime** dependency vuln without documented exception (S6 accepted, dev-only); headers deployed; forms validated + rate-limited; uploads private-or-not-stored; secrets absent from source/bundle.
