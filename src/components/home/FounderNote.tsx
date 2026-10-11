import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { founder } from "@/content/home";

/** First-person founder note. Wording is a draft, and the credentials stay
 *  placeholders until confirmed (CLAUDE.md §9.1). */
export function FounderNote() {
  return (
    <section
      id="why"
      aria-labelledby="why-title"
      className="grain surface-ink py-24 md:py-32"
    >
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Portrait slot */}
        <div className="lg:col-span-4">
          <div
            role="img"
            aria-label="Founder portrait placeholder"
            className="data grid aspect-[4/5] max-w-sm place-items-center border border-dashed border-ivory/30 bg-ink-raised p-6 text-center text-ivory-muted"
          >
            <span>[[TODO: founder photo]]</span>
          </div>
        </div>

        <div className="lg:col-span-8">
          <p className="eyebrow">{founder.eyebrow}</p>
          <h2 id="why-title" className="display display-lg mt-5 max-w-3xl">
            Agree it first. <span className="accent">Model</span> it second.
          </h2>

          <div className="mt-10 max-w-2xl space-y-5 text-[1.0625rem] leading-relaxed">
            {founder.note.map((p, i) => (
              <p
                key={i}
                className={i === 0 ? "text-[1.25rem] leading-snug" : "text-ivory-muted"}
              >
                {p}
              </p>
            ))}
          </div>

          <p className="data mt-8 max-w-2xl leading-loose text-ivory-muted">
            <RichText text={founder.placeholder} />
            <br />
            <RichText text={founder.approval} />
          </p>

          <ul className="mt-14 grid gap-px bg-line md:grid-cols-3">
            {founder.principles.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                delay={i * 90}
                className="bg-ink px-0 py-6 md:px-6 md:first:pl-0"
              >
                <h3 className="font-display text-[1.1875rem]">{p.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ivory-muted">
                  {p.text}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
