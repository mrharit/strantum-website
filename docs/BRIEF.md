# STRANTUM | Digital Engineering — Website Build Brief

> **For Claude Code.** Read this whole file before writing any code. Work in the phases in §10 and **stop at the end of each phase** to show me the result (run the dev server, summarise what changed, list open TODOs). Ask before adding any dependency not listed in §8.

---

## 1. Who we are

- **Company:** STRANTUM — tagline "Digital Engineering". Headquartered in Delhi-NCR, India.
- **What we do:** BIM / VDC services for the AEC industry: modelling, coordination & clash detection, scan-to-BIM, as-built & FM models, quantities & shop drawings, 4D sequencing, infrastructure BIM, bid support, and BIM management (ISO 19650).
- **Positioning:** a **design-led, ISO 19650-aligned digital delivery partner**, not a cheap offshore drafting vendor. Every page should read like it was written by practitioners who understand how buildings get built.
- **Stage:** new company. **We have no client portfolio, no client logos, no testimonials and no track-record statistics yet.** The site must earn trust through clarity of process, standards, technical depth, transparent engagement models and in-house demonstration work — never through claimed scale.
- **Markets:**
  - India: PMCs, EPCs, Tier-1 contractors, developers.
  - International, first: UAE and KSA. Later: UK, Australia, USA, Singapore.
- **Language:** UK English spelling (modelling, centre, organisation).
- **Delivery story:** "follow-the-sun" — we work while our clients' teams sleep. Present it as a strength, never as an apology for being offshore.

## 2. Reference model for information structure

Model the **information architecture** on https://www.sanrachnabim.com/:
- navigation by **Services** and by **who it's for** (Solutions For);
- one page per service;
- a projects area;
- a footer containing offices, services, solutions and contact details.

From https://www.marsbim.com/ borrow:
- the **project-card format**: size, LOD, location and one measurable outcome;
- the always-visible **Get a Quote** button;
- the "dedicated team" engagement page;
- a data-security section;
- an FAQ that names the software stack.

**Do not copy any text, images or layouts verbatim from either site.** Write original copy. Copying would be copyright infringement and duplicate-content SEO damage, and it would put us next to a Delhi competitor sounding like them.

## 3. Brand system

### 3.1 Colour tokens (define as CSS custom properties AND Tailwind theme)

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#031211` | Primary background (most sections are dark) |
| `--ink-raised` | `#0A1F1E` | Cards, panels, nav on scroll |
| `--ivory` | `#E8E4D3` | Primary text on ink; background of light sections |
| `--ivory-muted` | `rgba(232,228,211,0.64)` | Secondary text on ink |
| `--line` | `rgba(232,228,211,0.12)` | Hairlines, borders, grid lines |
| `--teal` | `#00AEBB` | Accent: CTAs, links, highlights, active states, MEP in 3D |
| `--teal-ink` | `#006D75` | Teal **text** on ivory backgrounds (contrast-safe) |
| `--signal` | `#FF4D4D` | **Clash red.** Only for clash markers and the logo accent bar. Never for UI chrome. Match to the logo's red when the logo file arrives. |

**Contrast rules.** These are my approximate calculations; verify each with a contrast checker.
- Ivory on ink ≈ 15:1 ✅
- Teal on ink ≈ 7:1 ✅
- Ink on teal ≈ 7:1 ✅
- **Teal on ivory ≈ 2.1:1 ❌.** Use `--teal-ink` for text on ivory.
- **Ivory text on teal fails.** Primary buttons are **teal background with ink text**.

**Surface ratio:** roughly 70% ink, 25% ivory, 5% teal. Red stays under 1%.

> **UPDATE (owner decision, Phase 2): the site is now light.** Competitors all use light sites. Every section sits on ivory (`#E8E4D3`) or a lighter derived `--paper` (`#F3F0E6`), with ink as text and linework, teal for buttons/accents and one solid teal CTA band. This supersedes the 70/25/5 ratio above and every "ink background / ivory text" statement in this brief. Colour tokens are unchanged.

### 3.2 Typography

- **Display / headings / nav / eyebrows:** **Century Gothic** (the logo's typeface).
  - It is a commercial Monotype font. Use self-hosted licensed webfont files in `/public/fonts/` once I supply them `[[TODO: licence]]`.
  - Until then, use **Questrial** (Google Fonts) as the stand-in.
  - Put both in one variable so the swap is one line: `--font-display: "Century Gothic", "Questrial", sans-serif`.
- **Body:** **Jost** (Google Fonts, 400/500). It is geometric like Century Gothic but more readable at paragraph sizes.
- **Technical data:** **JetBrains Mono**. Use it for LOD values, clash IDs, dimensions, file formats, step numbers and counters. This is what makes it feel like engineering.
- Load all fonts with `next/font` (no layout shift).
- **Type style, taken from the reference image:**
  - Large headline with **one accent word in italic + teal**, e.g. "Coordinated before it's *built*."
  - Small UPPERCASE eyebrows with wide tracking (0.18–0.24em), e.g. `MODEL / COORDINATE / DELIVER`.
  - A circular arrow button for secondary CTAs.
  - "Scroll to explore" bottom-left of the hero.
  - A chapter counter `01 / 06` bottom-right.

### 3.3 Texture & visual language

- A subtle film-grain overlay on dark sections: an SVG noise filter at 4–6% opacity, `pointer-events: none`.
- Thin `--line` grid lines that suggest drawing sheets and gridlines (A, B, C / 1, 2, 3).
- Imagery is **line-based 3D and technical drawing**: wireframes, sections, plans. No stock photos of people in hard hats.

### 3.4 Logo

- The logo file is not supplied yet. Build a `<Logo />` component that reads `/public/brand/logo.svg` when it exists.
- Until then, render a text wordmark: "STRANTUM" in the display font, letter-spacing 0.06em, with a small `--signal` bar replacing the A's crossbar, and "Digital Engineering" beneath in small tracked caps.
- Provide variants: ivory-on-ink (default) and ink-on-ivory.

## 4. Sitemap

```
/                                   Home
/services                           Services index
  /services/bim-modelling           Architectural, Structural, MEP (LOD 200–400)
  /services/coordination-clash-detection
  /services/scan-to-bim
  /services/as-built-fm             As-built models & facility management (COBie)
  /services/quantities-shop-drawings  5D quantities & shop drawings
  /services/4d-sequencing
  /services/infrastructure-bim      Roads & highways (Civil 3D, OpenRoads, IRC/MoRTH)
  /services/bid-support
  /services/bim-management          ISO 19650: EIR response, BEP, CDE setup, standards
/solutions                          Solutions For index
  /solutions/architects-designers
  /solutions/engineering-mep-consultants
  /solutions/contractors-epcs
  /solutions/specialist-subcontractors   MEP, façade, steel, precast
  /solutions/developers-owners
/how-we-work                        Process, ISO 19650 workflow, QA, data security, software, formats
/engagement                         Paid pilot / fixed-scope project / dedicated BIM team
/capabilities                       In-house demonstration models (replaces "Portfolio" for now)
/insights                           Blog (MDX) + 3 starter posts
/about                              Story, founder, principles
/careers
/contact                            Quote / enquiry form
/privacy  /terms
```

All service pages and all solution pages share one template each (§6).

## 5. Homepage, section by section

1. **Header.**
   - Logo left.
   - Centre nav: Services ▾ · Solutions ▾ · How We Work · Insights · About.
   - Right: **Get a Quote** (teal button).
   - Transparent over the hero; `--ink-raised` with backdrop blur after 80px of scroll.
   - Mega-menus list the services and solutions; keep them short.
   - Mobile: full-screen menu.
2. **Hero** (ink, grain, full viewport).
   - Eyebrow: `MODEL / COORDINATE / DELIVER`.
   - H1 options (pick the first; keep the others in a comment):
     - "Coordinated before it's *built*."
     - "Every clash, found *on screen*."
     - "Engineering certainty, *before site*."
   - Sub (one sentence): "ISO 19650-aligned BIM modelling, coordination and documentation for architects, engineers and contractors — delivered from Delhi, across time zones."
   - CTAs: **Request a quote** (primary) and ⟶ **Explore our services** (circle-arrow secondary).
   - Visual: the 3D building (§7.1), shown in its first state.
   - Bottom-left: "Scroll to explore". Bottom-right: `01 / 06`.
3. **Scroll story: "One building, every discipline".** This is the pinned 3D sequence in §7.1. Each chapter shows a caption panel with the service name, two lines of text and a link to the service page.
4. **Capability strip.** Honest facts only, set in mono, animated in on view:
   - `LOD 100–400 + as-built`
   - `ISO 19650-aligned workflows`
   - `Revit · Navisworks · Civil 3D · Tekla · Solibri · ACC`
   - `IFC · BCF · COBie`
   - `Follow-the-sun delivery (IST)`
   - `NDA before first file`
5. **Services grid.** Nine cards. Each card has:
   - its own micro-animation (§7.2), played when in view and on hover;
   - a title;
   - **one outcome-led line** (what the client gets, not what we do);
   - a link.
6. **Solutions For (tabbed).** Five role tabs. Each tab has three parts:
   - the problem this role faces;
   - what we deliver;
   - a deliverables list in mono (e.g. `RVT · NWD · IFC · BCF report · PDF sheet set`).
7. **How we work.** A horizontal animated timeline, six steps, aligned to the ISO 19650 information-delivery flow:
   - `01` Brief & requirements review (EIR / OIR)
   - `02` BIM Execution Plan & standards setup
   - `03` Modelling (WIP)
   - `04` Coordination & QA (clash runs, model checks)
   - `05` Issue (Shared → Published in the CDE)
   - `06` Construction support & as-built

   Link the section to /how-we-work.
8. **Demonstration work.** Three cards in the MaRS card format: size, LOD, discipline, software, and "what it demonstrates".
   - Every card is **labelled "Demonstration model — produced in-house"**.
   - Content is `[[TODO: real renders]]` until I supply them.
9. **Ways to engage.** Three columns:
   - **Paid pilot:** fixed scope, e.g. one floor or one zone coordinated.
   - **Fixed-scope project.**
   - **Dedicated BIM team:** monthly.

   Do **not** advertise "free" anything.
10. **Why STRANTUM / founder note.**
    - A short, first-person paragraph from the founder.
    - Credentials as placeholders: `[[TODO: name, photo, credentials — BIM architect; Revit, Navisworks, ISO 19650; previously INI Design Studio — CONFIRM]]`.
11. **Insights teaser.** Three latest posts.
12. **FAQ** (accordion, also emitted as FAQPage JSON-LD). Cover:
    - software and versions;
    - file formats and exchange (IFC/BCF);
    - data security and NDA;
    - time zones and turnaround;
    - LOD and what each means (with a link to the BIMForum LOD Spec);
    - revisions;
    - how pricing works;
    - how a pilot works.
13. **Final CTA band.** "Share your drawings or model. Get a scoped pilot proposal within `[[CONFIRM: 48 hours]]`." Include a button to /contact.
14. **Footer.**
    - Logo and one-line mission.
    - Services, Solutions and Company columns.
    - Office address `[[TODO]]`, email `[[TODO]]`, phone `[[TODO]]`.
    - LinkedIn `[[TODO]]`.
    - Privacy and Terms links.
    - © year.

## 6. Page templates

**Service page:**
1. Hero with that service's micro-animation, shown large.
2. "What you get": a deliverables list.
3. "Who it's for": links to the relevant solution pages.
4. A process for this service, 4–5 steps.
5. A **specs table** in mono: LOD range, inputs we need, outputs/formats, software, typical turnaround `[[CONFIRM]]`.
6. A service-specific FAQ.
7. CTA.

**Solution page:** the role's problems → how we help → relevant services → deliverables → engagement options → CTA.

**How We Work:**
- the six-step process in depth;
- QA checklist;
- data security: NDA, access control, encrypted storage, client-owned CDE where possible `[[CONFIRM each claim]]`;
- software and formats;
- communication cadence (weekly coordination calls, BCF issue tracking).

**Contact:**
- Form fields: name, company, role, country, services (multi-select), project type, stage, link to files (no direct upload), message.
- A checkbox: "Send me your NDA before I share files."
- Spam protection: honeypot plus rate limit.
- Submissions go to email via a server action `[[TODO: Resend API key]]`.

## 7. Animation spec — the core of the site

Animations must **explain BIM, not decorate**. Each one demonstrates something we actually deliver.

### 7.1 Hero + pinned scroll story (Three.js)

Build a **procedural mid-rise building** (about G+6) in code: no external model files.
- Slabs and columns: boxes.
- Core walls.
- Façade mullions: `EdgesGeometry` lines.
- Ducts: rectangular tubes.
- Pipes: cylinders.

One ScrollTrigger timeline (pinned, about 600vh) drives six chapters that match the `01 / 06` counter:

| # | Chapter | What happens | Colour |
|---|---|---|---|
| 01 | Architecture | The ivory wireframe shell draws itself floor by floor | ivory edges at 50% |
| 02 | Structure | Columns rise, slabs drop into place | ivory solids at low opacity |
| 03 | MEP | Ducts and pipes route through the ceiling voids | teal, slight emissive |
| 04 | Clash detection | A duct intersects a beam; a red marker pulses with the label `CL-014 · Duct vs Beam`. The camera eases in. | `--signal` |
| 05 | Coordinated | The duct reroutes; the marker turns teal ✓ "Resolved"; a counter shows `clashes open: 0` | teal |
| 06 | Documentation | The camera goes orthographic and flattens to a dimensioned plan/section sheet with a title block | ivory lines on ink |

- Captions are **real HTML text** beside the canvas, never text drawn into the canvas. Set `aria-hidden` on the canvas.
- The camera slowly orbits between chapters. Avoid heavy post-processing; a subtle bloom on teal is optional and must be removable.

### 7.2 Service micro-animations (SVG + GSAP, lightweight)

| Service | Animation |
|---|---|
| BIM Modelling | An LOD slider steps 100→200→300→400; a wall/column morphs from a mass block into a detailed element |
| Coordination & Clash | Duct and beam overlap → red pulse → reroute → teal tick |
| Scan to BIM | A point cloud of dots resolves into solid walls |
| As-built & FM | The model dims; asset tags pop in (`AHU-01 · Service due 03/27`) |
| Quantities & Shop Drawings | A 3D element unfolds into a dimensioned 2D drawing; a quantity table counts up |
| 4D Sequencing | A timeline scrubber; floors build week by week |
| Infrastructure BIM | A road alignment draws, then the cross-section and corridor extrude |
| Bid Support | A drawing set fans out → take-off totals → "Bid ready" |
| BIM Management | Files move through CDE states: WIP → Shared → Published → Archived |

### 7.3 Motion rules

- Use **Lenis** for smooth scroll and GSAP for everything else. Use one easing family (`power2.out` / `expo.out`); durations 0.4–0.9s.
- If `prefers-reduced-motion` is set, show no pinning, no smooth scroll and no 3D animation: static final states with simple fades.
- On mobile (<768px) or low-power devices (`hardwareConcurrency <= 4`), replace the Three.js scene with an SVG/poster sequence of the six chapter states.
- Lazy-load Three.js **after first paint** and only when the hero is in view. Show a static poster image (the final state) until it is ready.
- Micro-animations initialise only when in the viewport (IntersectionObserver) and pause when off-screen.

## 8. Tech stack

- **Next.js** (App Router) + **TypeScript**, statically generated pages.
- **Tailwind CSS**, with tokens from §3.1 wired into the theme.
- **GSAP** + **ScrollTrigger**; **Lenis**.
- **three**, **@react-three/fiber**, **@react-three/drei** (hero/scroll story only).
- **MDX** for Insights.
- **Resend** (or equivalent) for the contact form `[[TODO]]`.
- Analytics: placeholder for Plausible or GA4 `[[TODO]]`.
- Deploy target: Vercel.

## 9. Content rules (non-negotiable)

1. **Never invent:**
   - client names, logos, project names or locations;
   - statistics ("500+ projects", "10 years");
   - testimonials, awards, certifications or team size.

   Use visible `[[TODO: …]]` or `[[CONFIRM: …]]` placeholders, and list all of them at the end of each phase.
2. Say **"ISO 19650-aligned"**, never "ISO 19650 certified", unless I confirm a certification.
3. No superlatives: no "#1", "world-class", "cutting-edge", "best-in-class".
4. Be specific: deliverables, file formats (RVT, NWD, IFC, BCF, DWG, PDF), LOD, software, inputs needed.
5. Write short sentences. Speak to BIM managers, VDC leads and pre-construction managers: technical but readable.
6. Write all copy from scratch. Structure may follow Sanrachna; wording may not.
7. SEO for every page:
   - a unique `<title>` and meta description;
   - OG image;
   - JSON-LD: `Organization` / `ProfessionalService` sitewide, `Service` on service pages, `FAQPage` where there is an FAQ;
   - `sitemap.xml` and `robots.txt`.

## 10. Build phases (stop after each)

1. **Foundation.**
   - Scaffold the project and set up tokens, fonts, grain overlay and the `<Logo />` placeholder.
   - Build the header and footer.
   - Set up Lenis and a reduced-motion hook.
   - Create `CLAUDE.md` summarising §3 and §9 so the rules persist across sessions.
2. **Homepage, static.** All 14 sections with real draft copy, fully responsive, no heavy animation yet.
3. **Hero 3D + scroll story** (§7.1), including the mobile and reduced-motion fallbacks.
4. **Service micro-animations** (§7.2), the service template and all 9 service pages.
5. **Solutions pages, How We Work, Engagement, Capabilities, About, Careers, Contact** (with a working form), and **Insights** with 3 draft posts:
   - "What LOD 300 vs LOD 400 actually means for your contractor"
   - "Clash detection: why the number of clashes is the wrong KPI"
   - "ISO 19650 for small project teams: the minimum that matters"
6. **Quality pass.**
   - Accessibility: keyboard navigation, focus states, contrast, alt text.
   - SEO items from §9.
   - Performance.
   - A final list of all TODO/CONFIRM placeholders.

## 11. Acceptance criteria

- Lighthouse (mobile):
  - Home: Performance ≥ 80; Accessibility, Best Practices and SEO ≥ 95.
  - Every other page: Performance ≥ 90.
- LCP < 2.5s on simulated 4G; CLS < 0.05.
- All text meets WCAG 2.x AA contrast (4.5:1 body, 3:1 large text).
- All content is readable with JavaScript disabled (static HTML).
- `prefers-reduced-motion` fully respected.
- No fabricated claims anywhere (§9.1).

## 12. Assets I will supply later

- Logo (SVG): primary, reversed and icon versions.
- Century Gothic webfont licence and files.
- Office address, email, phone, LinkedIn URL, domain.
- Founder name, photo and bio; team details.
- Renders or screenshots of in-house demonstration models.
- Confirmed turnaround times and pilot scope.

## 13. References

- Information architecture reference: Sanrachna BIM — https://www.sanrachnabim.com/
- Project-card, quote-CTA and data-security patterns: MaRS BIM — https://www.marsbim.com/
- Visual style (colour palette, headline treatment, eyebrow/counter layout): reference image supplied by me (Ink Black #031211, Warm Ivory #E8E4D3, Electric Teal #00AEBB)
- LOD definitions to link from the FAQ and service pages: BIMForum Level of Development Specification — https://bimforum.org/resource/lod-level-of-development-lod-specification/
- ISO 19650 series (information management using BIM): ISO 19650-1:2018 — https://www.iso.org/standard/68078.html. A second edition is in draft (https://www.iso.org/standard/89703.html), so refer to "the ISO 19650 series" rather than pinning an edition.
- Contrast requirements: WCAG 2.1 SC 1.4.3 — https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
