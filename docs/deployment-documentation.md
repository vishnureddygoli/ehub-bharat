# Deployment Documentation

Last reviewed: 2026-07-26

## Source

The site is a Next/Vinext application with Cloudflare Worker-compatible build output through the bundled Sites starter.

## Build command

`npm run build`

## Validation command

`npm test`

This runs the production build, starts a local production server on port 3100 and verifies primary routes, 301 legacy redirects, Government Project Desk POST handling, sitemap and robots.

## Runtime

- Public content is server-rendered or statically generated.
- Government enquiry submissions use `/api/government-enquiry`.
- Public downloads are stored under `public/downloads`.
- Social images are stored under `public/og-government-projects.png` and `public/og-manufacturing.png`.

## Hosting notes

- `.openai/hosting.json` contains logical hosting configuration.
- Runtime secrets should be managed through the hosting platform.
- Production deployment should follow a successful build and smoke test.

## Government enquiry data pipeline (D1)

`POST /api/government-enquiry` persists each lead to a Cloudflare **D1** database.

- **Binding:** `DB` (declared via `d1: "DB"` in `.openai/hosting.json`). The
  control plane injects the real binding on deploy.
- **Schema:** `db/schema.ts` (Drizzle). Migration in `drizzle/` — regenerate with
  `npm run db:generate` after any schema change, and apply it to the real D1 on
  deploy. As a safety net, the route also runs `CREATE TABLE IF NOT EXISTS`
  (`ensureEnquiriesTable`) so a freshly provisioned D1 never drops a lead.
- **Runtime behaviour (important vinext quirk):** the D1 binding exists only
  under `vinext dev` (workerd/Miniflare) and on deploy. `vinext start`/`npm test`
  run under plain Node with **no** binding, so `cloudflare:workers` is imported
  lazily; there the route validates and returns a reference but does **not**
  persist. Verify persistence under `vinext dev`, not `npm test`.
  - Verified 2026-07-27 under `vinext dev`: enquiry row written to D1, client IP
    stored only as a truncated SHA-256 hash (`client_hash`), never raw.
- **Failure policy:** if the binding is present but the write fails, the endpoint
  returns an honest **503** (never a faked success), so a real lead is never lost
  silently. If the binding is absent (Node preview), it returns the reference and
  logs a warning.
- **PII:** the table holds lead PII collected with consent. D1 is private; never
  expose it publicly. See `docs/PRIVACY_DATA_FLOW.md`.

### Pending (blocked on business info) — operator notification

Enquiries are stored but **no acknowledgement email / webhook is sent yet**
(BLOCKED on a mail provider + keys). Applicants receive an on-screen reference.
When a provider is approved, add a provider-agnostic notify step
(`EHUB_ENQUIRY_WEBHOOK_URL` and/or `EHUB_EMAIL_*`) after the insert. Until then,
operators must read leads directly from D1.

### Reading leads from D1

```bash
# local (vinext dev) example:
sqlite3 .wrangler/state/v3/d1/miniflare-D1DatabaseObject/*.sqlite \
  "SELECT created_at, reference, organization, contact_name, email, project_category FROM enquiries ORDER BY id DESC;"
# production: use the platform's D1 query console / wrangler d1 execute.
```

## Domain migration notes

- Confirm canonical domain: `https://www.ehubbharat.com`.
- Attach the custom domain only after DNS and access settings are approved.
- Retest redirects after the custom domain is attached.
- Submit sitemap to Google Search Console and Bing Webmaster Tools after launch.
