import { BuildingDiagram } from "@/components/diagrams/BuildingDiagram";
import { CapabilityStrip } from "@/components/home/CapabilityStrip";
import { DemoWork } from "@/components/home/DemoWork";
import { Engage } from "@/components/home/Engage";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { FounderNote } from "@/components/home/FounderNote";
import { Hero } from "@/components/home/Hero";
import { HowWeWork } from "@/components/home/HowWeWork";
import { InsightsTeaser } from "@/components/home/InsightsTeaser";
import { ScrollStory } from "@/components/home/ScrollStory";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { SolutionsTabs } from "@/components/home/SolutionsTabs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { chapters, solutionList, solutionsIntro, storyIntro } from "@/content/home";

// Homepage, Phase 2: static, 14 sections (header and footer live in layout.tsx).
// Order follows the brief (§5): hero → scroll story → capability strip →
// services → solutions → how we work → demonstration work → ways to engage →
// founder note → insights → FAQ → final CTA.

const STAGES = [1, 2, 3, 4, 5, 6] as const;

export default function Home() {
  return (
    <>
      <Hero />

      <section
        id="story"
        aria-labelledby="story-title"
        className="surface-paper relative py-24 md:py-32"
      >
        <div className="container-page">
          <SectionHeading
            id="story-title"
            eyebrow={storyIntro.eyebrow}
            title={
              <>
                One building, every <span className="accent">discipline</span>.
              </>
            }
            lead={storyIntro.lead}
          />
          <ScrollStory
            chapters={chapters}
            diagrams={STAGES.map((s) => (
              <BuildingDiagram key={s} stage={s} className="h-auto w-full" />
            ))}
          />
        </div>
      </section>

      <CapabilityStrip />
      <ServicesGrid />

      <section
        id="solutions"
        aria-labelledby="solutions-title"
        className="surface-ivory py-24 md:py-32"
      >
        <div className="container-page">
          <SectionHeading
            id="solutions-title"
            eyebrow={solutionsIntro.eyebrow}
            title={
              <>
                Built around <span className="accent">your</span> role.
              </>
            }
            lead={solutionsIntro.lead}
          />
          <SolutionsTabs solutions={solutionList} />
        </div>
      </section>

      <HowWeWork />
      <DemoWork />
      <Engage />
      <FounderNote />
      <InsightsTeaser />
      <FAQ />
      <FinalCTA />
    </>
  );
}
