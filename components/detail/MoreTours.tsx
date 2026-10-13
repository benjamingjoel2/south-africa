import type { Tour } from "@/data/types";
import { SectionHead } from "@/components/ui/Type";
import { ButtonLink } from "@/components/ui/Button";
import { TourCard } from "@/components/cards/TourCard";

export function MoreTours({ tours, lead = "You may also", accent = "like", eyebrow = "More itineraries" }: { tours: Tour[]; lead?: string; accent?: string; eyebrow?: string }) {
  if (!tours.length) return null;
  return (
    <section className="border-t border-ivory-200 section-y" aria-label={eyebrow}>
      <div className="container-x">
        <SectionHead
          eyebrow={eyebrow}
          lead={lead}
          accent={accent}
          action={
            <ButtonLink href="/tours" variant="link" arrow>
              All itineraries
            </ButtonLink>
          }
        />
        <div className="mt-12 grid gap-x-10 gap-y-14 lg:grid-cols-2">
          {tours.slice(0, 2).map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
