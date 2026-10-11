import { ArrowLink, TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { engageIntro, engagements } from "@/content/home";

/** Three ways to engage. The pilot is the intended entry point, so it is the
 *  one dark card on the ivory section. Nothing here is offered for free. */
export function Engage() {
  return (
    <section
      id="engage"
      aria-labelledby="engage-title"
      className="surface-paper py-24 md:py-32"
    >
      <div className="container-page">
        <SectionHeading
          id="engage-title"
          eyebrow={engageIntro.eyebrow}
          title={
            <>
              Start with a <span className="accent">pilot</span>. Scale when it
              works.
            </>
          }
          lead={engageIntro.lead}
        />

        <ul className="mt-16 grid gap-6 lg:grid-cols-3">
          {engagements.map((e, i) => (
            <Reveal
              as="li"
              key={e.key}
              delay={i * 100}
              className={
                e.featured
                  ? "relative flex flex-col border border-(--accent) border-t-[5px] bg-raised p-7 md:p-9"
                  : "flex flex-col border border-rule p-7 md:p-9"
              }
            >
              <p
                className="data text-(--accent)"
              >
                {e.tag}
              </p>
              <h3 className="display display-md mt-5 !text-[1.75rem]">
                {e.title}
              </h3>
              <p
                className="mt-4 text-[1rem] leading-relaxed text-fg-muted"
              >
                {e.text}
              </p>

              <ul
                className="mt-8 flex-1 space-y-3 border-t border-rule pt-6 text-[0.9375rem]"
              >
                {e.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] size-1.5 shrink-0 bg-(--accent)"
                    />
                    <span>
                      <RichText text={p} />
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                {e.featured ? (
                  <ArrowLink href="/contact">{e.cta}</ArrowLink>
                ) : (
                  <TextLink href="/contact">{e.cta}</TextLink>
                )}
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="mt-12">
          <TextLink href="/engagement">Compare the three routes</TextLink>
        </div>
      </div>
    </section>
  );
}
