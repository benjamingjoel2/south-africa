import { destinations } from "@/data/destinations";
import { tours } from "@/data/tours";
import { SectionHead } from "@/components/ui/SectionHead";
import { ButtonLink } from "@/components/ui/Button";
import { Stagger } from "@/components/motion/Reveal";
import { DestinationCard } from "@/components/cards/DestinationCard";

export function DestinationsGrid({ limit }: { limit?: number }) {
  const list = limit ? destinations.slice(0, limit) : destinations;
  const count = (slug: string) => tours.filter((t) => t.destinationSlugs.includes(slug)).length;
  return (
    <section className="section-y" aria-label="Destinations">
      <div className="container-x">
        <SectionHead
          label="Explore by destination"
          title={["From the Cape", "and beyond"]}
          description="Twelve regions, each with its own season and rhythm. Start in Cape Town, then go further: wine country, whale coast, the bush, the mountains and the warm Indian Ocean."
          action={
            <ButtonLink href="/destinations" variant="secondary" icon>
              All destinations
            </ButtonLink>
          }
        />
      </div>
      {/* Mobile: horizontal snap scroller (mirrors the reference's mobile destination strip) */}
      <Stagger className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:hidden" amount={0.05}>
        {list.map((d, i) => (
          <DestinationCard key={d.slug} destination={d} index={i} tourCount={count(d.slug)} className="w-[78vw] shrink-0 snap-start" />
        ))}
      </Stagger>
      <div className="container-x">
        <Stagger className="mt-16 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" amount={0.05}>
          {list.map((d, i) => (
            <DestinationCard key={d.slug} destination={d} index={i} tourCount={count(d.slug)} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
