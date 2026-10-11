import Link from "next/link";
import {
  ServiceGlyph,
  type ServiceSlug,
} from "@/components/diagrams/ServiceGlyphs";
import { ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceOutcomes, servicesIntro } from "@/content/home";
import { services } from "@/content/nav";

/** Services as a ruled schedule: shared hairlines, one drawing per cell. */
export function ServicesGrid() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="surface-paper py-24 md:py-32"
    >
      <div className="container-page">
        <SectionHeading
          id="services-title"
          eyebrow={servicesIntro.eyebrow}
          title={
            <>
              Nine services. One <span className="accent">delivery</span>{" "}
              process.
            </>
          }
          lead={servicesIntro.lead}
        />

        <ul className="mt-16 grid border-l border-t border-rule sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const slug = s.href.split("/").pop() as ServiceSlug;
            return (
              <Reveal
                as="li"
                key={s.href}
                delay={(i % 3) * 90}
                className="border-b border-r border-rule"
              >
                <Link
                  href={s.href}
                  className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-ink/[0.045] motion-reduce:transition-none md:p-8"
                >
                  <div className="aspect-[8/5] w-full text-fg">
                    <ServiceGlyph slug={slug} />
                  </div>
                  <h3 className="font-display mt-8 text-[1.3125rem] leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-fg-muted">
                    {serviceOutcomes[slug]}
                  </p>
                  <span className="data mt-6 inline-flex items-center gap-2 text-(--accent)">
                    View service
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
