import { tours } from "@/data/tours";
import { SectionHead } from "@/components/ui/Type";
import { ButtonLink } from "@/components/ui/Button";
import { TourCard } from "@/components/cards/TourCard";
import { Reveal } from "@/components/motion/Reveal";

export function Itineraries({ limit = 4 }: { limit?: number }) {
  const list = [...tours].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)).slice(0, limit);
  return (
    <section className="border-t border-ivory-200 section-y" aria-label="Itineraries">
      <div className="container-x">
        <SectionHead
          eyebrow="Itineraries"
          lead="Our most considered"
          accent="journeys"
          description="Real itineraries designed by specialists who travel them. Ready to be tailored to your dates, your party and your pace."
          action={
            <ButtonLink href="/tours" variant="link" arrow>
              All itineraries
            </ButtonLink>
          }
        />
        <div className="mt-12 grid gap-x-10 gap-y-16 lg:grid-cols-2">
          {list.map((t, i) => (
            <Reveal key={t.slug} delay={(i % 2) * 0.08}>
              <TourCard tour={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
