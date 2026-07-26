# Performance Report

Last reviewed: 2026-07-26

## Build result

`npm run build` passed with Vinext and Vite 8.1.5.

The site uses server-rendered/static content for public pages, limited client-side JavaScript for interactive planning tools and the Government Project Desk form, compressed local assets, and no heavy video, map iframe or WebGL payload.

## Implemented performance controls

- No external map iframe on first load.
- No autoplay video.
- Approved logo served as a local asset.
- Social images are static PNG assets.
- Download PDFs are small, text-based one-page documents.
- Navigation and core content render without waiting for client-only data.
- Responsive CSS avoids layout-shifting fixed media.
- Below-the-fold interactivity is isolated in small client components.
- No unused `react-loading-skeleton` dependency.

## Local validation

- Important public routes returned HTTP 200 in local preview.
- Public downloads and social images returned HTTP 200.
- Sitemap and robots returned HTTP 200.
- Production smoke test passed after building and starting a production server on port 3100.

## Remaining launch checks

- Lighthouse Performance, Accessibility, Best Practices and SEO should be run against the deployed URL.
- Core Web Vitals field data will only be available after public traffic.
- Test on 360 px, 390 px, 768 px, 1024 px, 1440 px and 1920 px with approved browser tooling.
- Validate final imagery once real factory and project photographs are supplied.
