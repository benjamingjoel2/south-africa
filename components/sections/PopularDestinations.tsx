import { destinations } from "@/data/destinations";
import { tours } from "@/data/tours";
import { SectionHead } from "@/components/ui/Type";
import { ButtonLink } from "@/components/ui/Button";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

export const tourCountFor = (slug: string) => tours.filter((t) => t.destinationSlugs.includes(slug)).length;

export function PopularDestinations() {
  const picks = ["sabi-sand-greater-kruger", "kruger-national-park", "cape-town", "cape-winelands"].map((s) => destinations.find((d) => d.slug === s)!);
  return (
    <section className="section-y" aria-label="Most popular destinations">
      <div className="container-x">
        <SectionHead
          eyebrow="Most popular"
          lead="Where to"
          accent="go"
          action={
            <ButtonLink href="/destinations" variant="link" arrow>
              All destinations
            </ButtonLink>
          }
        />
        <Stagger className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {picks.map((d) => (
            <StaggerItem key={d.slug}>
              <DestinationCard destination={d} tourCount={tourCountFor(d.slug)} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
