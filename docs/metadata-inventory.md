# Metadata and Structured-Data Inventory

Last reviewed: 2026-07-26

## Global metadata

- Metadata base: `https://www.ehubbharat.com`
- Default title: EHUB Bharat | Government EV Infrastructure and EV Charger Manufacturing
- Default description: Government, public-sector and institutional EV charging infrastructure positioning.
- Language: `en-IN`
- Icons: approved EHUB icon from the live website.
- Social image: `public/og-government-projects.png`

## Page metadata

Each indexable route defines a unique title, description, canonical URL, Open Graph title, Open Graph description and social image.

Government and institutional pages use `public/og-government-projects.png`.

The manufacturing page uses `public/og-manufacturing.png`.

## Structured data

Implemented:

- `Corporation` for EHUB Bharat on the homepage.
- `Place` for the manufacturing facility address, without coordinates.
- `Service` for government EV charging infrastructure services.
- `BreadcrumbList` on routed pages.
- `ItemList` with `Article` items on Knowledge Centre.

Not implemented:

- `GovernmentOrganization`, because EHUB Bharat is not a government organization.
- Review ratings, awards, prices, availability, government affiliation or certifications, because these are not verified.
- Product schema with ratings or availability, because approved datasheets are not available.

## Verification needed before launch

- Run schema validation against deployed URLs.
- Confirm canonical URLs after final domain and redirect setup.
- Confirm Search Console and Bing verification tokens only after account ownership is approved.
