# QA Report

Last reviewed: 2026-07-26

## Automated checks to run in this workspace

- Production build: passed with `npm run build`.
- Lint: passed with `npm run lint`.
- Automated production smoke test: passed with `npm test`.
- Redirect smoke checks: passed for legacy URLs with HTTP 301 route handlers.
- Sitemap and robots fetch checks: passed; sitemap contains 34 URLs and robots includes the sitemap.
- Government Project Desk POST validation: passed and returned reference numbers.
- PDF text extraction: passed for all three public PDF downloads.
- PDF render inspection: passed after rendering PDFs to PNG.
- Static route crawl for important public paths: passed with HTTP 200 responses.
- Executive Assurance and Procurement Confidence Matrix content checks: passed.
- Security header smoke checks: passed for CSP, frame, content-type and referrer policy headers.
- Public download and social-card asset checks: passed.
- Dynamic-port test harness: added to avoid false results from unrelated local servers.

## Critical journeys covered by implementation

1. Government official opens homepage and sees the public EV infrastructure and manufacturing offer.
2. Official downloads the Government Capability Statement.
3. Official reviews the Manufacturing page and facility address.
4. Official explores a government project solution route.
5. Official submits the Government Project Desk form by POST and receives a reference number.
6. Procurement team opens the Tender & RFP Desk.
7. Visitor requests verified product datasheets without the site publishing unverified datasheets.
8. Mobile visitor can use the Government Project Desk contact links.
9. Search engines can discover intended pages through `sitemap.xml` and `robots.txt`.
10. Existing URLs from the live sitemap are permanently redirected.

## Manual checks still recommended

- Lighthouse performance, accessibility, best practices and SEO on deployed URLs.
- Chrome, Safari, Edge, Firefox, Mobile Safari and Android Chrome.
- Console-error review after deployment.
- Low-bandwidth mobile test.
- File upload security review after malware scanning integration.
- Search Console and Bing Webmaster validation after domain launch.

## Browser automation limitation

Playwright package resolution succeeded through the bundled runtime, but the Chromium browser binary was not installed in this environment. No new browser binary was installed. Browser-level screenshot and Lighthouse testing should be run on the deployed URL or on a workstation with an approved browser automation runtime.
