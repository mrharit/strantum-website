@AGENTS.md

# STRANTUM | Digital Engineering — website

Marketing site for STRANTUM, a Delhi-NCR BIM/VDC services company (AEC industry). Positioned as a **design-led, ISO 19650-aligned digital delivery partner**, not a cheap offshore drafting vendor. Next.js App Router + TypeScript + Tailwind v4, deployed to Vercel. Full brief: [docs/BRIEF.md](docs/BRIEF.md) (sitemap §4, homepage sections §5, templates §6, animation spec §7, phases §10). **Work phase by phase and stop after each to show the result.**

- UK English spelling (modelling, centre, organisation). `<html lang="en-GB">`.
- Ask before adding any dependency outside: next, react, tailwind, gsap (+ScrollTrigger), lenis, three, @react-three/fiber, @react-three/drei, MDX packages, Resend.
- Information architecture follows sanrachnabim.com; project-card, quote-CTA and data-security patterns follow marsbim.com. **Never copy their text, images or layouts.**

## Commands

`npm run dev` · `npm run build` · `npm run lint` · `npm run typecheck` · `npm run contrast` (WCAG check, reads tokens from globals.css) · `npm run todos` (lists every `[[TODO]]`/`[[CONFIRM]]`).

## Content rules (non-negotiable — brief §9)

1. **Never invent** client names, logos, project names/locations, statistics ("500+ projects", "10 years"), testimonials, awards, certifications or team size. We are a new company with no portfolio. Trust comes from process, standards, technical depth, transparent engagement and in-house demo work. Use visible `<Todo>` / `<Confirm>` (renders `[[TODO: …]]` / `[[CONFIRM: …]]`) and **list all of them at the end of every phase** (`npm run todos`).
2. Say **"ISO 19650-aligned"**, never "certified". Refer to "the ISO 19650 series", not a pinned edition.
3. **No superlatives**: no "#1", "world-class", "cutting-edge", "best-in-class". No "free" anything in engagement offers.
4. Be specific: deliverables, formats (RVT, NWD, IFC, BCF, DWG, PDF), LOD, software, inputs needed.
5. Short sentences. Audience: BIM managers, VDC leads, pre-construction managers. Technical but readable.
6. Write all copy from scratch.
7. SEO on every page: unique `<title>` + meta description, OG image, JSON-LD (`Organization`/`ProfessionalService` sitewide, `Service` on service pages, `FAQPage` where there is an FAQ), `sitemap.xml`, `robots.txt`.
8. "Follow-the-sun" delivery (we work while clients' teams sleep) is a **strength**, never an apology for being offshore.
9. Demonstration work is always labelled **"Demonstration model — produced in-house"**.

## Brand system (brief §3)

> **Owner decision (Phase 2): the site is LIGHT.** Competitors all use light sites, so every section sits on ivory or paper, with ink as the text colour. This **supersedes the brief's "70% ink / 25% ivory / 5% teal" ratio** and the "most sections are dark" wording; the colour tokens themselves are unchanged. Teal stays the accent (CTA band, buttons); red stays under 1%. Read "ink background" in the brief as "ivory background" and "ivory text" as "ink text".

**Tokens** — defined once as CSS custom properties in `src/app/globals.css` (`:root`) and exposed to Tailwind via `@theme inline` (`bg-ink`, `text-ivory`, `border-line` …). Never hardcode hex values in components.

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#031211` | Primary background (most sections dark) |
| `--ink-raised` | `#0A1F1E` | Cards, panels, nav on scroll |
| `--ivory` | `#E8E4D3` | Text on ink; light-section background |
| `--ivory-muted` | `rgba(232,228,211,.64)` | Secondary text on ink |
| `--line` | `rgba(232,228,211,.12)` | Hairlines, borders, grid lines |
| `--teal` | `#00AEBB` | Accent: CTAs, links, highlights, active states, MEP in 3D |
| `--teal-ink` | `#006D75` | Teal **text** on ivory |
| `--signal` | `#FF4D4D` | **Clash red.** Clash markers + logo bar only. Never UI chrome. Match to the logo's red when the file arrives. |

Derived (not in brief): `--ink-muted` (ink at 72%, secondary text), `--line-ink` (hairlines), `--paper` `#F3F0E6` (a lighter ivory for alternate sections and raised panels).

**Semantic layer: components never name ink/ivory directly.** Use `bg-canvas`, `text-fg`, `text-fg-muted`, `border-rule`, `bg-raised`, `text-(--accent)` and `var(--draw)` / `var(--surface)` in SVG. Each surface class sets them: `.surface-ivory` (base), `.surface-paper` (lighter; sections alternate ivory ↔ paper), `.surface-ink` (dark; rare, for a single element). Literal `bg-teal text-ink` is correct only for buttons and the teal CTA band.

**Contrast** (verified with `npm run contrast`): ink on ivory 14.99, ink on paper 16.77, ink-muted on ivory 6.90 / paper 7.31, teal-ink on ivory 4.78 / paper 5.35, ink on teal 7.08 — all pass. **Teal on ivory is 2.12 ✗ and ivory on teal is 2.12 ✗ — never use either for text** (accent text is `--accent`, which is teal-ink on light surfaces). Primary buttons = teal background + **ink** text. **Red (`--signal`) on ivory/paper is only 2.6–2.9:1: use it for marker shapes, never text** (label text beside a marker is ink). Never put small `--teal-ink` text on a darker-than-ivory tint (it would fall under 4.5).

**Surface ratio (light theme):** ivory and paper throughout, ink for text and linework, one solid teal CTA band. Red < 1%.

**Type** (all via `next/font`, variables on `<html>`, see `src/app/fonts.ts`):
- Display/headings/nav/eyebrows: `--font-display: "Century Gothic", var(--font-questrial), sans-serif`. Questrial is the stand-in until licensed Century Gothic files are supplied `[[TODO: licence]]` → add them with `next/font/local`, no stack edit needed.
- Body: **Jost** 400/500. Technical data (LOD, clash IDs, dimensions, formats, step numbers, counters): **JetBrains Mono** (`.data`).
- Style: large headline with **one accent word in italic + teal** (`<span className="accent">`); small UPPERCASE eyebrows, tracking 0.18–0.24em (`.eyebrow`); circular-arrow secondary CTA (`<ArrowLink>`); "Scroll to explore" bottom-left of hero; chapter counter `01 / 06` bottom-right.

**Texture:** `.grain` on sections (SVG noise, 5%, `pointer-events: none`; reads as paper tooth on the light theme); thin `--line` grid lines suggesting drawing sheets (A, B, C / 1, 2, 3). Imagery is line-based 3D and technical drawing: wireframes, sections, plans. **No stock photos.**

**Logo:** `<Logo variant="on-ivory" | "on-ink" />` (default `on-ivory`, since the site is light). Uses `public/brand/logo.svg` (on ivory) / `logo-reversed.svg` (on ink) when present — checked in `next.config.ts`, restart dev after adding. Otherwise a text wordmark with the A's crossbar as a `--signal` bar. See `public/brand/README.md`.

## Motion rules (brief §7.3)

- **Lenis** for smooth scroll + **GSAP** for everything else. One easing family (`power2.out` / `expo.out`), durations 0.4–0.9 s.
- `prefers-reduced-motion`: no pinning, no smooth scroll, no 3D animation — static final states with simple fades. Use `useReducedMotion()` and Tailwind `motion-reduce:`.
- Mobile (<768px) or `hardwareConcurrency <= 4`: replace the Three.js scene with an SVG/poster sequence of the six chapter states.
- **Phase 3 colours on the light theme:** the §7.1 chapter colours flip. Ivory wireframe → **ink** edges at ~60%; structure = ink solids at low opacity; MEP = `--accent` (teal-ink) / teal with no emissive glow; clash = `--signal`; the scene background is ivory/paper. Mirror `BuildingDiagram`, which already does this via `--draw`.
- Lazy-load Three.js after first paint and only when the hero is in view; static poster until ready.
- Micro-animations initialise only in the viewport (IntersectionObserver) and pause off-screen.
- Animations must **explain BIM, not decorate**.
- Canvas is `aria-hidden`; captions are real HTML text.

## Next.js 16 specifics for this repo

`next.config.ts` enables `cacheComponents` + `partialPrefetching`. Read `node_modules/next/dist/docs/` before using unfamiliar APIs.

- **Pages must stay static.** A bare `new Date()` / `Math.random()` during prerender fails the build. Wrap in a `"use cache"` scope (see `CurrentYear.tsx`) or read it on the client after `use(io())`.
- **Hidden routes stay mounted** (React `<Activity>`, up to 3). Effects clean up on hide and re-run on show. Every GSAP `ScrollTrigger`/timeline/observer must be created in an effect and fully killed in its cleanup (use `gsap.context().revert()`), or it will leak across navigations.
- `next/font` variable classes must be on `<html>` (the `--font-display` stack in `:root` resolves them there).
- Unlayered CSS beats Tailwind utilities. Put custom classes in `@layer base`/`components`.
- A fixed header with `backdrop-filter` becomes the containing block for fixed descendants — keep the blur on a separate layer (see `Header.tsx`).
- Lenis lives in `src/lib/scroll.ts` (`stopScroll`/`startScroll`) and is `null` under reduced motion. Overlays that scroll natively need `data-lenis-prevent`.

## Homepage system (Phase 2)

- **Copy lives in `src/content/home.ts`** (typed, original). Unknown facts are literal `[[TODO: …]]` / `[[CONFIRM: …]]` tokens; render strings through `<RichText>` so they show as visible placeholders. FAQ answers are plain text so they also feed the FAQPage JSON-LD unchanged.
- **`BuildingDiagram` (`components/diagrams/`)** is the signature: one procedural isometric G+6 building, six `stage`s matching the six scroll-story chapters (1 architecture · 2 structure · 3 MEP · 4 clash · 5 coordinated · 6 documentation sheet). Stages 4–5 are zoomed on the clash via `ZOOM`. It is the hero's first state, the story's diagram, and the Phase 3 mobile / reduced-motion poster sequence. Edit geometry constants at the top (`W`, `D`, `FL`, `H1`).
- **`ServiceGlyphs`**: nine line drawings, the key frame of each §7.2 micro-animation. Animated parts carry `data-part`. Colours: `currentColor`, `var(--accent)`, `var(--signal)`, `var(--surface)` (opaque fill).
- **Surface tokens:** `.surface-ivory | .surface-paper | .surface-ink` set the semantic layer (`--canvas`, `--fg`, `--fg-muted`, `--rule`, `--raised`, `--accent`, `--focus`, `--surface`, `--draw`). Use `text-(--accent)` for accent text.
- **`<Reveal>`** fades content in on scroll with one shared observer. The hidden state is applied by client JS only, so nothing is hidden without JavaScript. `group` staggers `.rv` children via `--i`.
- **No-JS rule:** every section must be complete with JavaScript off. Tabs ship all panels plus a `<noscript>` override; FAQ uses native `<details name="faq">`. A `!important` override must live in `@layer base` to beat Tailwind preflight's `[hidden]` rule (layered `!important` beats unlayered).
- Section rhythm (light): hero ivory → story **paper** → capability ivory → services **paper** → solutions ivory → process **paper** → demo ivory → engage **paper** → founder ivory → insights **paper** → FAQ ivory → **teal CTA band** → footer **paper**. Alternate ivory/paper; let hairlines (`border-rule`) carry structure.
- Dev checks: `npm run typecheck && npm run lint && npm run build`, then `npm run todos`.

## Acceptance (brief §11)

Lighthouse mobile: Home Perf ≥ 80, A11y/Best-Practices/SEO ≥ 95; every other page Perf ≥ 90. LCP < 2.5 s (4G), CLS < 0.05. WCAG AA contrast (4.5:1 body, 3:1 large). Readable with JavaScript disabled. Reduced-motion fully respected. No fabricated claims.
