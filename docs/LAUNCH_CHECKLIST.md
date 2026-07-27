# EHUB Bharat — Launch Checklist

**Branch:** `feat/ehub-bharat-government-world-class-upgrade`

## Pre-launch — engineering
- [ ] `npm run build` passes
- [ ] `npm run lint` clean
- [ ] `npx tsc --noEmit` clean
- [ ] `npm test` green (extend suite: links, metadata, structured data)
- [ ] No critical console errors on core pages
- [ ] Brand assets integrated everywhere (header/footer/mobile/favicon/manifest/OG)
- [ ] Redirect map tested (301s for all legacy URLs)
- [ ] robots.txt + sitemap.xml correct; no staging/admin indexed
- [ ] Structured data validates (Rich Results / schema validator)
- [ ] Security headers verified in production (CSP/HSTS/Referrer/Permissions/X-CTO/frame)
- [ ] Forms end-to-end: success, validation error, rate-limit, duplicate
- [ ] Enquiry persistence (D1) working; reference numbers issued

## Pre-launch — content & trust
- [ ] Every public claim VERIFIED or SAFE-LANGUAGE (see CONTENT_VERIFICATION_REGISTER)
- [ ] No fabricated projects/certs/logos/metrics
- [ ] Legal + contact details consistent across site + JSON-LD
- [ ] Policy content dated + sourced + "not legal advice"
- [ ] No placeholder/lorem in production build

## Pre-launch — accessibility & performance
- [ ] axe: 0 critical; manual keyboard + SR pass on core flows
- [ ] 200–400% zoom + 320px reflow OK
- [ ] Lighthouse: Perf 90+ / A11y 95+ / BP 95+ / SEO 95+ on representative pages

## Blocked on owner / external (must resolve or accept before go-live)
- [ ] Legal entity name / CIN / GST / registered office
- [ ] Confirmed public phone + email ownership & monitoring
- [ ] Leadership bios + photos + consent
- [ ] Real factory photographs
- [ ] Product datasheets (to populate product pages)
- [ ] Certifications (numbers + expiry) — or keep compliance page as scaffold
- [ ] Mail provider + keys (enquiry acknowledgement email)
- [ ] R2 bucket + malware scanning (secure uploads)
- [ ] Approved analytics platform + consent stance
- [ ] Indian data-protection legal review
- [ ] Production deploy authorisation (DNS/SSL/CDN) — **irreversible; owner action**

## Launch
- [ ] Production backup taken
- [ ] Staging blocked from indexing
- [ ] Pre-launch crawl vs production diff
- [ ] DNS/SSL/CDN/cache validated
- [ ] Email SPF/DKIM/DMARC validated (if mail flows)
- [ ] Rollback plan ready (see ROLLBACK / deployment docs)

## Post-launch
- [ ] Submit sitemaps (Search Console + Bing)
- [ ] Monitor 404/5xx, CWV, conversions, Search Console
- [ ] 24-hour / 7-day / 30-day reviews scheduled
