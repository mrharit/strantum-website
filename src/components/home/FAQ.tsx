import { RichText } from "@/components/ui/RichText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Button";
import { faqIntro, faqs, lodSpecUrl } from "@/content/home";

// Plain-text version for JSON-LD: placeholders stay visible there too, which is
// intended while answers are unconfirmed.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/** Accordion on native <details>: keyboard accessible and fully readable with
 *  JavaScript off. `name` makes the group exclusive in current browsers. */
export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="surface-ivory py-24 md:py-32"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <SectionHeading
              id="faq-title"
              eyebrow={faqIntro.eyebrow}
              title={
                <>
                  Before you share a <span className="accent">file</span>.
                </>
              }
              lead={faqIntro.lead}
            />
            <div className="mt-8">
              <TextLink href="/contact">Ask us something else</TextLink>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="border-t border-line-ink">
            {faqs.map((f) => (
              <details
                key={f.q}
                name="faq"
                className="faq-item border-b border-line-ink"
              >
                <summary className="flex items-center justify-between gap-6 py-6 md:py-7">
                  <h3 className="font-display text-[1.1875rem] leading-snug md:text-[1.3125rem]">
                    {f.q}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="faq-plus relative size-6 shrink-0 before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-4 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-current after:absolute after:left-1/2 after:top-1/2 after:h-4 after:w-px after:-translate-x-1/2 after:-translate-y-1/2 after:bg-current"
                  />
                </summary>
                <div className="max-w-2xl pb-8 text-[1rem] leading-relaxed text-ink-muted">
                  <p>
                    <RichText text={f.a} />
                  </p>
                  {f.q.startsWith("What do the LOD") && (
                    <p className="mt-4">
                      <a
                        href={lodSpecUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="data text-(--accent) underline decoration-current/30 underline-offset-[5px] hover:decoration-current"
                      >
                        BIMForum LOD Specification ↗
                      </a>
                    </p>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
