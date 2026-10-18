# Belgrade Arbor Clone Brief & Asset Map

## 1. Overview
- **Source URL:** https://belgradearbor.rs/en
- **Local Routes:** `/`, `/en`
- **Component Scope:** `src/components/sites/belgrade-arbor/`
- **Asset Directory:** `public/sites/belgrade-arbor/` and `public/home/`
- **Research Data:** `docs/research/belgrade-arbor/`

## 2. Design Tokens
- **Vanilla (Background):** `#fdfbef`
- **Pine Green (Primary dark):** `#2e3a26`
- **Sage Green (Accent border/buttons):** `#60735c`
- **Cream (Warm light text):** `#fff4d6`
- **Cream Dark:** `#ccbf99`
- **Golden (Emblem & Highlights):** `#a68150`
- **Sand (Cards):** `#f4f0db`
- **Navy (Roots Section):** `#314759`
- **Navigation Capsule:** `#1F261E`/85 with `backdrop-blur-lg`

## 3. Typography
- **Headings:** PPEditorialOld (300 light, serif luxury display)
- **Body & Controls:** Work Sans (300, 400, 500, 600)

## 4. Cloned Sections
1. **Header Navigation:** Floating pill capsule with logo SVG, animated hamburger, Inquire CTA, and expandable full-screen menu overlay with language switcher.
2. **Introduction:** Architectural canopy hero with Screen 1 ("BELGRADE ARBOR DESIGN"), Screen 2 ("Curated urban ecosystem"), and Screen 3 ("Prestigious living") scene switcher, plus 3D Explore CTA.
3. **Location:** High-impact hero visual on Bulevar heroja sa Košara with architectural positioning card.
4. **Around (What's Around):** Interactive destination explorer (Railway Station, Savremena Elementary School, West 65, Airport City, Hangar Food Market, Airport Nikola Tesla) with travel time indicators (🚗 / 🚶).
5. **Residences & Options:** High-res interior showcase + interactive apartment selector (Studio 80 units, One Bedroom 22 units, Two Bedroom 78 units, Three Bedroom 16 units, Four Bedroom 12 units) with unit specs and inquiry actions.
6. **Business Spaces & Retail:** Commercial facade + Wing A, Wing B, Wing V, and Retail units.
7. **Roots:** The way of living on Navy `#314759` with SVG leaf masks (`mask1.svg`, `mask2.svg`, `mask3.svg`) and photography.
8. **Amenities:** Private gyms, rooftop parks, secured 3-level underground garage, and panoramic restaurant.
9. **Horizontal Gallery:** View from above panoramic vista carousel with 3 vistas.
10. **Installment Plan:** 5-phase progressive payment timeline (Pre-contract 20%, Zero level 20%, Structure completed 20%, 80% complete 20%, Technical acceptance 20%) with building permit action.
11. **Footer:** Dusk-to-day sky gradient with newsletter subscription form, full site links, phone +381 69 68 44 44, and architectural foliage graphics.
12. **Inquiry Modal:** Interactive dialog for scheduling consultations and inquiries.
13. **Awwwards Ribbon:** Fixed floating badge.

## 5. Verification Status
- `npm run lint` — Passed (0 errors)
- `npm run typecheck` — Passed (0 errors)
- `npm run build` — Passed (Static generation of `/` and `/en`)
