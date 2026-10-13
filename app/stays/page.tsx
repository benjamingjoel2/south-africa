import { stays } from "@/data/stays";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Stagger } from "@/components/motion/Reveal";
import { StayCard } from "@/components/cards/StayCard";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata = buildMetadata({
  title: "Where to Stay in South Africa",
  description:
    "Hand-picked boutique hotels in Cape Town, Winelands wine estates, Garden Route coastal lodges, Kruger private game lodges and Drakensberg mountain lodges.",
  path: "/stays",
  image: images.gameLodge,
});

export default function StaysPage() {
  return (
    <>
      <PageHero
        label="Stays"
        title={["Places with", "a sense of place"]}
        description="Small, characterful and personally inspected. These are examples of the properties we work with. Your specialist will match stays to your style and budget."
        crumbs={[{ name: "Stays", path: "/stays" }]}
      />
      <div className="container-x section-y">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" amount={0.05}>
          {stays.map((s) => (
            <StayCard key={s.slug} stay={s} />
          ))}
        </Stagger>
        <p className="mt-10 text-sm text-white/45">Property names and details shown are placeholders for illustration.</p>
      </div>
      <FinalCta />
    </>
  );
}
