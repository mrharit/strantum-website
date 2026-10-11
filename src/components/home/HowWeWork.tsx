import { ArrowLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processIntro, steps } from "@/content/home";

/** Six steps on the ISO 19650 information-delivery flow. The order is real, so
 *  the numbers are real. */
export function HowWeWork() {
  return (
    <section
      id="how-we-work"
      aria-labelledby="process-title"
      className="grain surface-paper border-y border-rule py-24 md:py-32"
    >
      <div className="container-page">
        <SectionHeading
          id="process-title"
          eyebrow={processIntro.eyebrow}
          title={
            <>
              From brief to <span className="accent">issue</span>, in six steps.
            </>
          }
          lead={processIntro.lead}
        />

        <Reveal group className="relative mt-16 lg:mt-20">
          {/* Horizontal rail (lg): the base line and the line that draws in. */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[11px] hidden h-px bg-rule lg:block"
          />
          <div
            aria-hidden="true"
            className="rv-line absolute left-0 right-0 top-[11px] hidden h-px bg-(--accent)/70 lg:block"
          />
          {/* Vertical rail (below lg) */}
          <div
            aria-hidden="true"
            className="absolute bottom-3 left-[10px] top-3 w-px bg-rule lg:hidden"
          />

          <ol className="relative grid gap-12 lg:grid-cols-6 lg:gap-7">
            {steps.map((s, i) => (
              <li
                key={s.n}
                className="rv relative flex flex-col pl-12 lg:pl-0 lg:pt-14"
                style={{ "--i": i } as React.CSSProperties}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 grid size-[22px] place-items-center rounded-full border border-(--accent) bg-(--surface)"
                >
                  <span className="size-1.5 rounded-full bg-(--accent)" />
                </span>
                <p className="data text-(--accent)">{s.n}</p>
                <h3 className="font-display mt-2 text-[1.1875rem] leading-snug">
                  {s.title}
                </h3>
                {s.ref && (
                  <p className="data mt-2 text-fg-muted">{s.ref}</p>
                )}
                <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-fg-muted">
                  {s.text}
                </p>
                <p className="mt-5 border-t border-rule pt-3">
                  <span className="eyebrow !text-fg-muted">Output</span>
                  <span className="data mt-1 block text-fg">{s.output}</span>
                </p>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-16">
          <ArrowLink href="/how-we-work">See the full process</ArrowLink>
        </div>
      </div>
    </section>
  );
}
