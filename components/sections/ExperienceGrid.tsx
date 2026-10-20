import { experiences } from "@/data/experiences";
import { tours } from "@/data/tours";
import { SectionHead } from "@/components/ui/Type";
import { ButtonLink } from "@/components/ui/Button";
import { ExperienceCell } from "@/components/cards/ExperienceCell";

export const tourCountForExperience = (slugs: string[]) => tours.filter((t) => t.destinationSlugs.some((s) => slugs.includes(s))).length;

export function ExperienceGrid({ limit = 6 }: { limit?: number }) {
  const picks = ["big-five-game-drives", "honeymoons", "family-safaris", "winelands-wine-tasting", "garden-route-road-trip", "walking-safari"]
    .map((s) => experiences.find((e) => e.slug === s)!)
    .slice(0, limit);
  return (
    <section className="pb-20 lg:pb-24" aria-label="Experiences">
      <div className="container-x">
        <SectionHead
          eyebrow="Experiences"
          lead="By the kind of"
          accent="trip"
          action={
            <ButtonLink href="/experiences" variant="link" arrow>
              All experiences
            </ButtonLink>
          }
        />
        <div className="mt-10 grid gap-px border border-ivory-200 bg-ivory-200 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((e) => (
            <ExperienceCell key={e.slug} experience={e} tourCount={tourCountForExperience(e.destinationSlugs)} />
          ))}
        </div>
      </div>
    </section>
  );
}
