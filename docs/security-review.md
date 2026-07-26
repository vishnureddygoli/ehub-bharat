# Security Review

Last reviewed: 2026-07-26

## Implemented controls

- HTTPS-ready security headers through middleware.
- Content Security Policy with `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'` and `form-action 'self'`.
- Referrer policy: `strict-origin-when-cross-origin`.
- Permissions policy blocks camera, microphone, geolocation and payment APIs.
- X-Content-Type-Options: `nosniff`.
- X-Frame-Options: `DENY`.
- Government enquiry form submits by POST.
- Origin check on form submissions.
- Honeypot spam field.
- Basic in-memory rate limiting for local and simple hosted execution.
- Server-side required-field validation.
- Email-format validation.
- File upload type and 10 MB size restrictions.
- No public stack traces from the form endpoint.
- No secrets committed.

## Required before production CRM/upload integration

- Persistent rate limiting at the edge.
- CSRF token validation backed by a trusted store or signed token.
- Malware scanning for uploaded documents.
- Secure private storage for uploaded documents.
- Audit logging for administrative access.
- Approved email acknowledgement service.
- Backups and monitoring for any future CMS or database.
- Legal validation of privacy and security statements.

## Dependency audit

Targeted updates were applied to Next, React, React DOM, React Server DOM Webpack, Vite, Cloudflare Vite plugin and Wrangler. The site still builds and tests after those updates.

Latest audit summary in this workspace:

- 0 critical.
- 12 high.
- 4 moderate.
- 16 total.

Remaining advisories are transitive framework/tooling advisories where `npm audit fix --force` proposes breaking or unsuitable version changes, including a downgrade path for Next. These should be reviewed with the hosting/runtime owners before production launch rather than force-applied blindly.
