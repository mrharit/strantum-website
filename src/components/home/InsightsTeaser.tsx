import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { insights, insightsIntro } from "@/content/home";

export function InsightsTeaser() {
  return (
    <section
      id="insights"
      aria-labelledby="insights-title"
      className="surface-raised border-t border-line py-24 md:py-32"
    >
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="insights-title"
            eyebrow={insightsIntro.eyebrow}
            title={
              <>
                Notes from the <span className="accent">model</span> room.
              </>
            }
            lead={insightsIntro.lead}
          />
          <TextLink href="/insights">All insights</TextLink>
        </div>

        <ul className="mt-16 grid gap-px bg-line lg:grid-cols-3">
          {insights.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 100} className="bg-ink-raised">
              <Link
                href={`/insights/${p.slug}`}
                className="group flex h-full flex-col p-7 transition-colors duration-300 hover:bg-ink motion-reduce:transition-none md:p-9"
              >
                <p className="chip self-start text-teal">{p.tag}</p>
                <h3 className="font-display mt-6 text-[1.5rem] leading-snug text-balance">
                  {p.title}
                </h3>
                <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ivory-muted">
                  {p.excerpt}
                </p>
                <span className="data mt-8 inline-flex items-center gap-2 text-teal">
                  Read article
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
