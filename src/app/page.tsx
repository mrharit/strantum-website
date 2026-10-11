import { Logo } from "@/components/brand/Logo";
import { ArrowLink, Button } from "@/components/ui/Button";
import { Confirm, Todo } from "@/components/ui/Todo";

// PHASE 1 PREVIEW — design-system specimen. Replaced by the real homepage in
// Phase 2. Nothing here is final copy.

const swatches = [
  { token: "ink", cls: "bg-ink", use: "Primary background", hex: "#031211" },
  { token: "ink-raised", cls: "bg-ink-raised", use: "Cards, panels, scrolled nav", hex: "#0A1F1E" },
  { token: "ivory", cls: "bg-ivory", use: "Text on ink; light sections", hex: "#E8E4D3" },
  { token: "teal", cls: "bg-teal", use: "Accent: CTAs, links, active", hex: "#00AEBB" },
  { token: "teal-ink", cls: "bg-teal-ink", use: "Teal text on ivory", hex: "#006D75" },
  { token: "signal", cls: "bg-signal", use: "Clash red: markers + logo bar", hex: "#FF4D4D" },
];

// Values from `npm run contrast` (WCAG 2.x, read from globals.css).
const contrast = [
  { pair: "Ivory on ink", ratio: "14.99", ok: true },
  { pair: "Ivory-muted on ink", ratio: "6.55", ok: true },
  { pair: "Teal on ink", ratio: "7.08", ok: true },
  { pair: "Ink on teal (button)", ratio: "7.08", ok: true },
  { pair: "Teal-ink on ivory", ratio: "4.78", ok: true },
  { pair: "Teal on ivory", ratio: "2.12", ok: false },
  { pair: "Ivory on teal", ratio: "2.12", ok: false },
];

export default function Home() {
  return (
    <>
      {/* Hero-style type specimen */}
      <section className="grain surface-ink relative flex min-h-[100svh] flex-col justify-center pb-24 pt-[calc(var(--header-h)+3rem)]">
        <div className="container-page">
          <p className="data mb-6 inline-block rounded-[2px] border border-dashed border-teal/50 px-2 py-1 text-teal">
            Phase 1 — foundation preview. Replaced by the homepage in Phase 2.
          </p>
          <p className="eyebrow">Model / Coordinate / Deliver</p>
          <h1 className="display display-xl mt-6 max-w-[14ch]">
            Coordinated before it&rsquo;s <span className="accent">built</span>.
          </h1>
          <p className="mt-8 max-w-xl text-[1.125rem] leading-relaxed text-ivory-muted">
            Body copy is set in Jost at 400. It is geometric like the display
            face but easier to read at paragraph sizes.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Button href="/contact">Request a quote</Button>
            <ArrowLink href="/services">Explore our services</ArrowLink>
          </div>
        </div>
        <div className="container-page data absolute inset-x-0 bottom-8 flex items-end justify-between text-ivory-muted">
          <span className="eyebrow !text-ivory-muted">Scroll to explore</span>
          <span>01 / 06</span>
        </div>
      </section>

      {/* Palette */}
      <section className="surface-raised border-t border-line py-20">
        <div className="container-page">
          <p className="eyebrow">Colour tokens</p>
          <h2 className="display display-md mt-4 max-w-2xl">
            Roughly 70% ink, 25% ivory, 5% teal. Red stays under 1%.
          </h2>
          <ul className="mt-10 grid grid-cols-2 gap-px bg-line md:grid-cols-3 lg:grid-cols-6">
            {swatches.map((s) => (
              <li key={s.token} className="bg-ink-raised p-4">
                <div className={`${s.cls} h-20 border border-line`} />
                <p className="data mt-3 text-ivory">--{s.token}</p>
                <p className="data text-ivory-muted">{s.hex}</p>
                <p className="mt-1 text-[0.8125rem] leading-snug text-ivory-muted">
                  {s.use}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-12 overflow-x-auto">
            <table className="data w-full min-w-[26rem] text-left">
              <caption className="eyebrow pb-3 text-left">
                Contrast (WCAG 2.x)
              </caption>
              <thead>
                <tr className="border-b border-line text-ivory-muted">
                  <th className="py-2 pr-4 font-normal">Pair</th>
                  <th className="py-2 pr-4 font-normal">Ratio</th>
                  <th className="py-2 font-normal">Result</th>
                </tr>
              </thead>
              <tbody>
                {contrast.map((c) => (
                  <tr key={c.pair} className="border-b border-line">
                    <td className="py-2 pr-4">{c.pair}</td>
                    <td className="py-2 pr-4">{c.ratio}:1</td>
                    <td className="py-2">
                      {c.ok ? "Pass" : "Fails — never used for text"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Type */}
      <section className="grain surface-ink border-t border-line py-20">
        <div className="container-page grid gap-12 lg:grid-cols-3">
          <div>
            <p className="eyebrow">Display / headings / nav</p>
            <p className="font-display mt-4 text-4xl leading-tight">
              Questrial, until Century Gothic arrives
            </p>
            <p className="data mt-3 text-ivory-muted">
              --font-display: &ldquo;Century Gothic&rdquo;, Questrial
            </p>
          </div>
          <div>
            <p className="eyebrow">Body</p>
            <p className="mt-4 text-[1.0625rem]">
              Jost 400 for paragraphs and <strong className="font-medium">Jost 500</strong>{" "}
              for emphasis. Short sentences, specific deliverables, UK English
              spelling: modelling, centre, organisation.
            </p>
          </div>
          <div>
            <p className="eyebrow">Technical data</p>
            <p className="data mt-4 text-[0.9375rem] leading-loose">
              LOD 100–400 + as-built
              <br />
              RVT · NWD · IFC · BCF · COBie
              <br />
              CL-014 · Duct vs Beam
              <br />
              4 200 × 600 mm · 03/27
            </p>
          </div>
        </div>
      </section>

      {/* Light surface + logo variants */}
      <section className="surface-ivory py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Light section</p>
            <h2 className="display display-lg mt-4">
              Teal text uses <span className="accent">teal-ink</span> here.
            </h2>
            <p className="mt-6 max-w-md text-ink-muted">
              Secondary text on ivory uses ink at 72%. Buttons keep a teal
              background with ink text.
            </p>
            <div className="mt-8">
              <Button href="/contact">Get a Quote</Button>
            </div>
          </div>
          <div className="grid content-start gap-6">
            <div className="grid place-items-center border border-line-ink p-10">
              <Logo variant="on-ivory" size="lg" />
            </div>
            <div className="grain surface-ink grid place-items-center p-10">
              <Logo variant="on-ink" size="lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Placeholders + scroll length */}
      <section className="grain surface-ink py-24">
        <div className="container-page">
          <p className="eyebrow">Placeholders</p>
          <p className="mt-4 max-w-3xl">
            Anything not supplied stays visible, never invented: office at{" "}
            <Todo>office address</Todo>, turnaround within{" "}
            <Confirm>48 hours</Confirm>. <code className="data">npm run todos</code>{" "}
            lists every one.
          </p>
        </div>
      </section>
    </>
  );
}
