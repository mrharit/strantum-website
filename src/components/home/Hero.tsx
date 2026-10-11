import { BuildingDiagram } from "@/components/diagrams/BuildingDiagram";
import { ArrowLink, Button } from "@/components/ui/Button";
import { ColumnRules } from "@/components/ui/ColumnRules";
import { hero } from "@/content/home";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="grain surface-ivory relative isolate overflow-hidden"
    >
      <ColumnRules bubbles className="text-fg" />

      <div className="container-page relative grid min-h-[100svh] items-center gap-4 pb-32 pt-[calc(var(--header-h)+4.5rem)] lg:grid-cols-12 lg:gap-6 lg:pb-28 lg:pt-[calc(var(--header-h)+2.5rem)]">
        <div className="lg:col-span-6">
          <p className="eyebrow">{hero.eyebrow}</p>
          {/* H1 options live in content/home.ts */}
          <h1 id="hero-title" className="display display-hero mt-6">
            <span className="block">Coordinated</span>{" "}
            <span className="block">before it&rsquo;s</span>{" "}
            <span className="block">
              <span className="accent">built</span>.
            </span>
          </h1>
          <p className="mt-8 max-w-[33rem] text-[1.125rem] leading-relaxed text-fg-muted">
            {hero.sub}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Button href="/contact">Request a quote</Button>
            <ArrowLink href="/services">Explore our services</ArrowLink>
          </div>
        </div>

        {/* First state of the scroll story: the architecture shell. */}
        <div className="relative lg:col-span-6">
          <BuildingDiagram
            stage={1}
            className="mx-auto h-auto w-full max-w-[560px] lg:mx-0 lg:w-[120%] lg:max-w-none lg:-translate-x-[9%]"
          />
        </div>
      </div>

      <div className="container-page absolute inset-x-0 bottom-7 z-10 flex items-end justify-between gap-6">
        <a
          href="#story"
          className="eyebrow group inline-flex items-center gap-3 !text-fg-muted transition-colors duration-300 hover:!text-fg motion-reduce:transition-none"
        >
          <span
            aria-hidden="true"
            className="block h-9 w-px bg-current opacity-60 transition-[height] duration-500 group-hover:h-12 motion-reduce:transition-none"
          />
          Scroll to explore
        </a>
        <p className="data flex items-baseline gap-3 text-fg-muted">
          <span className="eyebrow !text-fg-muted max-sm:hidden">
            Architecture
          </span>
          <span aria-label="Chapter 1 of 6">01 / 06</span>
        </p>
      </div>
    </section>
  );
}
