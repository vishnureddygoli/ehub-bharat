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

## Domain migration notes

- Confirm canonical domain: `https://www.ehubbharat.com`.
- Attach the custom domain only after DNS and access settings are approved.
- Retest redirects after the custom domain is attached.
- Submit sitemap to Google Search Console and Bing Webmaster Tools after launch.
