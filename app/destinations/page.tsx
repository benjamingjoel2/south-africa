import { destinations } from "@/data/destinations";
import { tours, regions } from "@/data/tours";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Stagger } from "@/components/motion/Reveal";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata = buildMetadata({
  title: "South Africa Destinations",
  description:
    "Explore South Africa's best destinations, from Cape Town, the Winelands and the Garden Route to Kruger's private reserves, the Drakensberg, the KwaZulu-Natal coast and the Kalahari.",
  path: "/destinations",
  image: images.capeTown,
});

export default function DestinationsPage() {
  const count = (slug: string) => tours.filter((t) => t.destinationSlugs.includes(slug)).length;
  const grouped = regions
    .map((r) => ({ region: r, items: destinations.filter((d) => d.region === r.id) }))
    .filter((g) => g.items.length);

  return (
    <>
      <PageHero
        label="Destinations"
        title={["From the Cape", "and beyond"]}
        description="Twelve regions, each with its own season and character. Most trips combine two to four. Your specialist will help you choose the right mix for your time of year."
        crumbs={[{ name: "Destinations", path: "/destinations" }]}
      />
      <div className="container-x section-y space-y-20">
        {grouped.map(({ region, items }) => (
          <section key={region.id} aria-labelledby={`r-${region.id}`}>
            <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
              <h2 id={`r-${region.id}`} className="text-h4 font-semibold">
                {region.name}
              </h2>
              <span className="text-sm text-white/55">
                {items.length} {items.length === 1 ? "destination" : "destinations"}
              </span>
            </div>
            <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" amount={0.05}>
              {items.map((d) => (
                <DestinationCard key={d.slug} destination={d} tourCount={count(d.slug)} />
              ))}
            </Stagger>
          </section>
        ))}
      </div>
      <FinalCta />
    </>
  );
}
