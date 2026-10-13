import { destinations } from "@/data/destinations";
import { regions } from "@/data/tours";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/seo";
import { SplitHero } from "@/components/detail/SplitHero";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { tourCountFor } from "@/components/sections/PopularDestinations";
import { SpecialistCta } from "@/components/sections/SpecialistCta";

export const metadata = buildMetadata({
  title: "South Africa Destinations",
  description: "Explore South Africa's best destinations, from Cape Town, the Winelands and the Garden Route to Kruger's private reserves, the Drakensberg, the KwaZulu-Natal coast and the Kalahari.",
  path: "/destinations",
  image: images.capeTown,
});

export default function DestinationsPage() {
  const grouped = regions.map((r) => ({ region: r, items: destinations.filter((d) => d.region === r.id) })).filter((g) => g.items.length);
  return (
    <>
      <SplitHero
        crumbs={[{ name: "Destinations", path: "/destinations" }]}
        title="Destinations"
        subtitle="Twelve regions, one country, endless combinations."
        text="Most trips combine two to four of these. Start in Cape Town, then go further: wine country, whale coast, the bush, the mountains and the warm Indian Ocean."
        cta={{ label: "Start planning", href: "/plan-your-trip" }}
        image={images.capeTown}
        imageAlt="Cape Town city bowl below Table Mountain"
      />
      <div className="container-x space-y-20 border-t border-ivory-200 section-y">
        {grouped.map(({ region, items }) => (
          <section key={region.id} aria-labelledby={`r-${region.id}`}>
            <div className="flex items-baseline justify-between border-b border-ivory-200 pb-4">
              <h2 id={`r-${region.id}`} className="text-h3">{region.name}</h2>
              <span className="eyebrow">{items.length} {items.length === 1 ? "destination" : "destinations"}</span>
            </div>
            <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((d) => (
                <DestinationCard key={d.slug} destination={d} tourCount={tourCountFor(d.slug)} />
              ))}
            </div>
          </section>
        ))}
      </div>
      <SpecialistCta />
    </>
  );
}
