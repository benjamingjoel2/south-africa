import { stays } from "@/data/stays";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/seo";
import { SplitHero } from "@/components/detail/SplitHero";
import { StayCard } from "@/components/cards/StayCard";
import { SpecialistCta } from "@/components/sections/SpecialistCta";

export const metadata = buildMetadata({
  title: "Where to Stay in South Africa",
  description: "Hand-picked boutique hotels in Cape Town, Winelands wine estates, Garden Route coastal lodges, Kruger private game lodges and Drakensberg mountain lodges.",
  path: "/stays",
  image: images.gameLodge,
});

export default function StaysPage() {
  return (
    <>
      <SplitHero
        crumbs={[{ name: "Stays", path: "/stays" }]}
        title="Stays"
        subtitle="A curated collection of South Africa's finest."
        text="Small, characterful and personally inspected. These are examples of the properties we work with; your specialist matches stays to your style and budget."
        cta={{ label: "Start planning", href: "/plan-your-trip" }}
        image={images.gameLodge}
        imageAlt="Infinity pool at a safari lodge overlooking the bush"
      />
      <div className="container-x border-t border-ivory-200 section-y">
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {stays.map((s) => (
            <StayCard key={s.slug} stay={s} tone="light" />
          ))}
        </div>
        <p className="mt-10 text-sm text-stone-400">Property names and details shown are placeholders for illustration.</p>
      </div>
      <SpecialistCta />
    </>
  );
}
