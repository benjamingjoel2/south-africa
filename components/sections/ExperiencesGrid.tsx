import { experiences } from "@/data/experiences";
import { SectionHead } from "@/components/ui/SectionHead";
import { ButtonLink } from "@/components/ui/Button";
import { Stagger } from "@/components/motion/Reveal";
import { ExperienceCard } from "@/components/cards/ExperienceCard";

export function ExperiencesGrid({ limit = 8 }: { limit?: number }) {
  return (
    <section className="section-y border-t border-white/10" aria-label="Experiences">
      <div className="container-x">
        <SectionHead
          variant="end"
          label="Experiences"
          title={["Moments that", "make the trip"]}
          description="Big Five at dawn, penguins on the beach, a long lunch in the vines. Mix and match, and we'll weave them into your route."
          action={
            <ButtonLink href="/experiences" variant="secondary" icon>
              All experiences
            </ButtonLink>
          }
        />
        <Stagger className="mt-14 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 md:mt-20" amount={0.05}>
          {experiences.slice(0, limit).map((e, i) => (
            <ExperienceCard key={e.slug} experience={e} index={i} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
