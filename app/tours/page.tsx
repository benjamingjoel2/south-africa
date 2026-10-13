import { tours } from "@/data/tours";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/seo";
import { SplitHero } from "@/components/detail/SplitHero";
import { TourFilters } from "@/components/detail/TourFilters";
import { SpecialistCta } from "@/components/sections/SpecialistCta";

export const metadata = buildMetadata({
  title: "South Africa Tours & Itineraries",
  description: "Tailor-made South Africa itineraries: Cape Town and the Winelands, Kruger private-reserve safaris, Garden Route self-drives, honeymoons and family trips.",
  path: "/tours",
  image: images.sabiSand,
});

export default function ToursPage() {
  return (
    <>
      <SplitHero
        crumbs={[{ name: "Tours", path: "/tours" }]}
        title="Tours"
        subtitle="Tailor-made journeys across South Africa."
        text="From the Cape to the bush, these itineraries are starting points designed by specialists who travel them. Filter by region, length and budget, then let us reshape one around you."
        cta={{ label: "Explore tours", href: "#tours" }}
        image={images.sabiSand}
        imageAlt="Leopard resting in a tree in the Sabi Sand"
      />
      <div id="tours" className="container-x scroll-mt-24 border-t border-ivory-200 section-y">
        <TourFilters tours={tours} />
      </div>
      <SpecialistCta />
    </>
  );
}
