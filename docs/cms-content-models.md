# CMS and Content Operations Model

Last reviewed: 2026-07-26

The current implementation uses `app/data/site.ts` as a typed single source of truth. A future CMS should map to these structured models.

## Core models

- Company profile: brand name, legal name, logo, email, phone, social links, office details and approved legal identifiers.
- Facility: manufacturing address, facility description, source documents, gallery assets, verification status and review date.
- Government solution: title, problem, EHUB Bharat role, assets, stages, commercial options, CTA and publication status.
- Private-sector solution: audience, use case, eligibility, feasibility notes and CTA.
- Product category: category name, use case, public use, verified boundary and datasheet links.
- Product specification: model, rating, connector, protocol, safety/compliance evidence, warranty terms, revision date and approval status.
- Project: name, location, client or partner permission, project type, charger configuration, EHUB Bharat scope, commercial model, status, dates, outcomes, photos and reference availability.
- Knowledge article: title, jurisdiction, reviewed date, source citations, summary, body, reviewer and expiry/review date.
- Tender resource: document name, sensitivity, public/private access, version, owner, review date and expiry.
- Policy page: policy type, legal reviewer, revision history and effective date.
- Redirect: source, destination, status code, reason and owner.

## Workflow requirements

- Draft and published states.
- Content approval workflow.
- Revision history.
- Scheduled publishing.
- Review or expiry dates.
- Role-based access.
- Image metadata and licensing status.
- SEO preview.
- Broken-link monitoring.
- Redirect management.

## Integration note

Do not hard-code legal identifiers, product ratings, project numbers or certification claims across components. They should be approved once, then rendered from the CMS or typed data layer.
