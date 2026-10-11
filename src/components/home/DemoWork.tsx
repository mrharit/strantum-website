import { BuildingDiagram } from "@/components/diagrams/BuildingDiagram";
import { ServiceGlyph } from "@/components/diagrams/ServiceGlyphs";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Todo } from "@/components/ui/Todo";
import { demoIntro, demoLabel, demos } from "@/content/home";

function Visual({ kind }: { kind: (typeof demos)[number]["visual"] }) {
  if (kind === "building") {
    return <BuildingDiagram stage={4} className="h-full w-full" />;
  }
  return (
    <div className="grid h-full w-full place-items-center p-6">
      <div className="w-full max-w-[22rem]">
        <ServiceGlyph slug={kind === "scan" ? "scan-to-bim" : "infrastructure-bim"} />
      </div>
    </div>
  );
}

/** Project cards in the MaRS card format (size, LOD, discipline, software, what
 *  it demonstrates). No client work exists yet, so every card is an in-house
 *  demonstration model, labelled as such, with renders still to come. */
export function DemoWork() {
  return (
    <section
      id="demonstration-work"
      aria-labelledby="demo-title"
      className="grain surface-ivory py-24 md:py-32"
    >
      <div className="container-page">
        <SectionHeading
          id="demo-title"
          eyebrow={demoIntro.eyebrow}
          title={
            <>
              Models we build to show <span className="accent">how</span> we
              work.
            </>
          }
          lead={demoIntro.lead}
        />

        <ul className="mt-16 grid gap-6 lg:grid-cols-3">
          {demos.map((d, i) => (
            <Reveal
              as="li"
              key={d.title}
              delay={i * 100}
              className="flex flex-col border border-rule bg-raised"
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b border-rule">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 text-fg opacity-50"
                >
                  <Visual kind={d.visual} />
                </div>
                <p className="data absolute left-3 top-3 border border-(--accent)/60 bg-canvas px-2 py-1 text-[0.6875rem] text-(--accent)">
                  {demoLabel}
                </p>
                <p className="data absolute bottom-3 left-3 text-fg">
                  <Todo>real render</Todo>
                </p>
              </div>

              <div className="flex flex-1 flex-col p-6 md:p-7">
                <h3 className="display display-md !text-[1.5rem]">{d.title}</h3>

                <dl className="mt-6 grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-3 text-[0.875rem]">
                  <dt className="eyebrow !text-fg-muted">Size</dt>
                  <dd className="data text-fg">
                    <RichText text={d.size} />
                  </dd>
                  <dt className="eyebrow !text-fg-muted">LOD</dt>
                  <dd className="data text-fg">
                    <RichText text={d.lod} />
                  </dd>
                  <dt className="eyebrow !text-fg-muted">Discipline</dt>
                  <dd className="data text-fg">{d.discipline}</dd>
                  <dt className="eyebrow !text-fg-muted">Software</dt>
                  <dd className="data text-fg">
                    <RichText text={d.software} />
                  </dd>
                </dl>

                <div className="mt-6 flex-1 border-t border-rule pt-5">
                  <p className="eyebrow">What it demonstrates</p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">
                    {d.demonstrates}
                  </p>
                </div>

                <TextLink href="/capabilities" className="mt-6 self-start">
                  View capabilities
                </TextLink>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
