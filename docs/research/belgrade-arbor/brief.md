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

## 4. Scrollytelling & Interactive Features (Reverse-Engineered 1:1)
1. **Lenis Smooth Scroll Engine:**
   - Full smooth scroll synchronization with GSAP `ScrollTrigger.update` and `gsap.ticker`.
   - History scroll restoration configured to manual.
   - Anchor smooth scrolling integrated into menu navigation.

2. **Hero Video & Site Preloader (`hero-video.tsx`):**
   - Interactive preloader with Belgrade Arbor emblem, gold progress meter (0% -> 100%), and smooth fade-out.
   - Autoplaying background video (`/home/hero.mp4` / `/home/hero-m.webm`).
   - Huge display heading "Belgrade Arbor" with `SplitText` char blur & translate reveal.

3. **Introduction Scrollytelling Scroller (`introduction.tsx`):**
   - **Desktop (900vh sticky scene):**
     - Sticky viewport pinned during 900vh scroll progress.
     - Animated swaying foliage canopy (`/home/introduction/leafs.webp`).
     - SVG Path Morphing via `MorphSVGPlugin`: Frame 1 and Frame 2 crossfade (`image1` -> `image2`, `image4` -> `image3`) while SVG polygon paths morph smoothly.
     - 3 staged text scenes with `SplitText` word/character reveals:
       - Screen 1: "BELGRADE ARBOR DESIGN" + Explore in 3D CTA.
       - Screen 2: "Curated urban ecosystem" + Explore in 3D CTA.
       - Screen 3: "A New Chapter in Prestigious Living" + Explore Our Apartments link.
     - Bottom-left progress meter: Expanding gold line fill (0% -> 100%) and transitioning slide-blur counter numbers (01 -> 02 -> 03).
     - Bottom parallax drift out into the Location section.
   - **Mobile (600vh sticky scene):**
     - 5-screen mobile progression with SVG clipPath cards, text transitions, and 5-stage progress counter (01 -> 05).

4. **Location Parallax Scene (`location.tsx`):**
   - Full-bleed background (`/home/location/location.webp`) parallax scrub moving `top: +=20rem`.
   - Portrait video card (`/home/location/location.mp4`) parallax scrub moving `top: +=10rem`.
   - Split `clipPath: inset(0% 100% 0% 0%)` -> `inset(0% 0% 0% 0%)` entrance reveal.
   - Video container scale 1.1 -> 1.0 reveal.

5. **Around (What's Around) Explorer (`around.tsx`):**
   - `clipPath: inset(0% 0% 100% 0%)` reveal.
   - Interactive destination selector with car/walk travel time tags and sticky showcase photography.

6. **Residences Showcase & Selector (`residences.tsx`):**
   - Parallax background scrub (`/home/residences/residences-hero.webp`) moving `top: +=20rem`.
   - Portrait vignette card moving `top: +=10rem`.
   - Interactive apartment unit selector (Studio, 1-Bed, 2-Bed, 3-Bed, 4-Bed) with multi-image layout gallery.

7. **Business Spaces & Retail Wings (`business-spaces.tsx`):**
   - Parallax facade background moving `top: +=20rem`.
   - Commercial portrait card moving `top: +=10rem`.
   - Interactive 4-wing selector (Wing A, Wing B, Wing V, Retail) with unit counts and inquiry actions.

8. **Roots Section (`roots.tsx`):**
   - **Desktop:**
     - Interactive cursor mouse parallax on 3 layered leaf masks using damped `gsap.quickTo` (strengths 0.09, 0.06, 0.035).
     - Foreground leaf mask with looping video (`/home/roots/image1.mp4`).
     - Display title "Your roots" characters slide in from `100vw` across the screen (`power2.inOut`).
     - Leaf mask shapes expand from `maskSize: 0%` to `100%`.
     - Kicker scrub parallax (`y: +=15rem`).
   - **Mobile:**
     - 400vh sticky scroller with 2-stage scene reveal and progress counter (01 -> 02).

9. **Amenities Parallax & Showcase (`amenities.tsx`):**
   - Parallax background (`/home/amenities/amenities-bg.webp`) moving `top: +=20rem`.
   - Portrait video card (`/home/amenities/amenities.mp4`) moving `top: +=10rem`.
   - Interactive amenities selector (Rooftop Parks, Fitness, Garage, Restaurant).

10. **Horizontal Panoramic Vista Gallery (`horizontal.tsx`):**
    - Pinned horizontal scroll section (`pin: true, scrub: true`).
    - Pinned viewport scrub travels across the full panorama (`horizontal.webp`).
    - Curtain reveals (`.reveal`) pull open from 50% width to 0% width.
    - 3-layer cloud parallax (`.cloud1`, `.cloud2`, `.cloud3`) moving at staggered rates.
    - Large "View from above" title blurs and scales dynamically with scroll.

11. **Installment Plan Split Reveal (`installment.tsx`):**
    - Split-screen clipPath entrance: Image reveals from top (`inset(0% 0% 100% 0%)`), content reveals from bottom (`inset(100% 0% 0% 0%)`).
    - Scrub image parallax moving `top: -=10rem` -> `+=20rem`.
    - 5-phase financial schedule (20% -> 20% -> 20% -> 30% -> 10%) with building permit action.

12. **Footer Section (`footer.tsx`):**
    - Staggered scroll entrance (`.fadeElement`) with offset translate.
    - Complex silhouette (`.front`) parallax translate scrub (`y: 8rem`).

13. **Header Navigation & Modal:**
    - Floating pill capsule with smooth anchor scroll handlers connected to Lenis.
    - Expandable navigation overlay.
    - Interactive inquiry dialog.

## 5. Verification Status
- `npm run lint` — Passed (0 errors, 0 warnings)
- `npm run typecheck` — Passed (0 errors)
- `npm run build` — Passed (Static generation of `/` and `/en`)
- `npm run check` — Passed all checks
