import type { Tour } from "@/data/types";
import { Stagger } from "@/components/motion/Reveal";
import { TourCard } from "@/components/cards/TourCard";
import { SectionHead } from "@/components/ui/SectionHead";
import { ButtonLink } from "@/components/ui/Button";

export function RelatedTours({ tours, title = ["You may", "also like"] }: { tours: Tour[]; title?: string[] }) {
  if (!tours.length) return null;
  return (
    <section className="section-y border-t border-white/10" aria-label="Related tours">
      <div className="container-x">
        <SectionHead
          variant="end"
          label="Sample tours"
          title={title}
          description="Every itinerary is a starting point. Your specialist tailors dates, pace and stays."
          action={
            <ButtonLink href="/tours" variant="secondary" icon>
              See all tours
            </ButtonLink>
          }
        />
        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3" amount={0.05}>
          {tours.slice(0, 3).map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
