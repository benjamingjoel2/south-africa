import { tours } from "@/data/tours";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { TourFilters } from "@/components/sections/TourFilters";
import { BuildYourTrip } from "@/components/sections/BuildYourTrip";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata = buildMetadata({
  title: "South Africa Tours & Sample Itineraries",
  description:
    "Tailor-made South Africa tour ideas: Cape Town and the Winelands, Kruger private-reserve safaris, Garden Route self-drives, honeymoons and family trips. Prices from, per person.",
  path: "/tours",
  image: images.sabiSand,
});

export default function ToursPage() {
  return (
    <>
      <PageHero
        label="Sample tours"
        title={["Itineraries to", "start the conversation"]}
        description="Filter by region, length and budget. Each one is a starting point that your specialist will reshape around your dates, interests and pace."
        crumbs={[{ name: "Tours", path: "/tours" }]}
      />
      <div className="container-x section-y">
        <TourFilters tours={tours} />
      </div>
      <BuildYourTrip />
      <FinalCta />
    </>
  );
}
