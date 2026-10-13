import { tours } from "@/data/tours";
import { SectionHead } from "@/components/ui/SectionHead";
import { ButtonLink } from "@/components/ui/Button";
import { Stagger } from "@/components/motion/Reveal";
import { TourCard } from "@/components/cards/TourCard";

export function FeaturedTours() {
  const list = [...tours].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)).slice(0, 6);
  return (
    <section id="tours" className="section-y border-t border-white/10" aria-label="Featured tours">
      <div className="container-x">
        <SectionHead
          variant="end"
          label="Sample tours"
          title={["Featured", "journeys"]}
          description="Starting points, not packages. Each itinerary is reshaped around your dates, pace and budget by your specialist."
          action={
            <ButtonLink href="/tours" variant="secondary" icon>
              See all tours
            </ButtonLink>
          }
        />
        <Stagger className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 xl:grid-cols-3" amount={0.05}>
          {list.map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
