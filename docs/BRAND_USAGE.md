# EHUB Bharat — Brand Usage Guide

Source of truth: the approved EHUB Bharat logo package (`public/brand/*.svg`). Do not redesign, reshape, stretch, recolour, rotate or alter proportions of the mark, the pin/lightning symbol, the EHUB/BHARAT wordmarks, or the red divider line.

## Colours (logo-derived)

| Token | Hex | Use |
|---|---|---|
| Brand red | `#D71920` (`--brand`, `--red`) | Primary action, brand accent, emphasis, status. Accent only — never flood sections. |
| Brand red dark | `#A70F18` (`--brand-dark`) | Hover/active red, gradient anchor, links on light. |
| Graphite | `#20252B` (`--graphite`) | Executive dark surfaces. |
| Ink | `#101820` (`--deep`) | Deepest bands, text on light. |
| White / warm white | `#FFFFFF` / `#FBFAF7` | Dominant canvas. |
| Neutral greys | `--muted #5D6875`, `--line #D9E1E6`, `--surface-2` | Borders, secondary text, surfaces. |
| Amber focus | `#F3B23C` (`--focus`) | Focus ring only (accessibility), not decoration. |

Gradient in the full-colour mark: `#C81822 → #D71920 → #A70F18`.

## Logo assets (`public/brand/`)

| File | Use |
|---|---|
| `ehub-bharat-horizontal.svg` | Header + footer on light backgrounds (primary). |
| `ehub-bharat-horizontal-reverse.svg` | Dark backgrounds (ships with its own dark tile). |
| `ehub-bharat-horizontal-black.svg` | Monochrome / print. |
| `ehub-bharat-stacked.svg` | Square/compact layouts. |
| `ehub-bharat-icon.svg` | Pin mark; source for `favicon.svg`. |
| `ehub-bharat-app-icon.svg` | Filled red tile; source for favicons, apple-touch, PWA icons. |
| `ehub-bharat-icon-maskable.svg` | Full-bleed maskable PWA icon. |
| `ehub-bharat-horizontal-1024.png` | Raster logo for structured data / email / social. |

## Generated raster assets (`public/`)

`favicon.ico` (16/32/48), `favicon.svg`, `favicon-16/32/48.png`, `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `og-default.png`, `og-government-projects.png`, `og-manufacturing.png`.

**Regenerate all rasters** after any source-SVG change:

```bash
node scripts/generate-brand-assets.mjs
```

## Rules

- Clear space ≥ the height of the pin around the mark. Minimum header width ≈ 150px.
- Red is an accent for action/emphasis/status — headings and body remain graphite/ink.
- On dark bands use the reverse logo and light text; eyebrows use rose `#F6B0B3` for AA contrast.
- Never place the mark on low-contrast or busy backgrounds; never add effects (shadow/glow/outline) to the logo.
- Do not use the State Emblem, ministry seals, or tricolour devices implying government endorsement.
