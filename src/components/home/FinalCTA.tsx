import { Button } from "@/components/ui/Button";
import { ColumnRules } from "@/components/ui/ColumnRules";
import { RichText } from "@/components/ui/RichText";
import { finalCta } from "@/content/home";

/** The one solid teal moment on the page. Ink text on teal is 7.08:1. */
export function FinalCTA() {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden bg-teal text-ink [--focus:var(--ink)]"
    >
      <ColumnRules className="text-ink" />
      <div className="container-page relative grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <h2
            id="cta-title"
            className="display display-lg max-w-3xl"
          >
            {finalCta.title}
          </h2>
          <p className="font-display mt-6 max-w-2xl text-[1.375rem] leading-snug md:text-[1.625rem]">
            <RichText text={finalCta.line} />
          </p>
        </div>
        <div className="lg:col-span-4 lg:justify-self-end">
          <Button href="/contact" variant="ink" size="md">
            Request a quote
          </Button>
          <p className="data mt-4 max-w-xs">{finalCta.note}</p>
        </div>
      </div>
    </section>
  );
}
