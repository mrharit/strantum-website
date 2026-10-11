import { Reveal } from "@/components/ui/Reveal";
import { capabilities } from "@/content/home";

export function CapabilityStrip() {
  return (
    <section
      aria-label="Capabilities"
      className="surface-ivory border-y border-rule"
    >
      <div className="container-page py-14 md:py-16">
        <ul className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal
              as="li"
              key={c.label}
              delay={i * 70}
              className="bg-raised px-6 py-6 md:px-8 md:py-7"
            >
              <p className="eyebrow">{c.label}</p>
              <p className="data mt-3 text-[0.9375rem] leading-relaxed text-fg">
                {c.value}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
