import { experiences } from "@/data/experiences";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Stagger } from "@/components/motion/Reveal";
import { ExperienceCard } from "@/components/cards/ExperienceCard";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata = buildMetadata({
  title: "South Africa Experiences",
  description:
    "Big Five game drives, walking safaris, Table Mountain, Boulders Beach penguins, Winelands tastings, whale watching, Robben Island, Soweto, Drakensberg hiking and more.",
  path: "/experiences",
  image: images.krugerGameDrive,
});

export default function ExperiencesPage() {
  const categories = Array.from(new Set(experiences.map((e) => e.category)));
  return (
    <>
      <PageHero
        label="Experiences"
        title={["Moments that", "make the trip"]}
        description="From dawn game drives to long lunches in the vines, here's what we love to weave into an itinerary. Pick a few favourites and we'll plan the route around them."
        crumbs={[{ name: "Experiences", path: "/experiences" }]}
      />
      <div className="container-x section-y space-y-20">
        {categories.map((c) => {
          const items = experiences.filter((e) => e.category === c);
          return (
            <section key={c} aria-labelledby={`c-${c}`}>
              <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                <h2 id={`c-${c}`} className="text-h4 font-semibold">{c}</h2>
                <span className="text-sm text-white/55">{items.length}</span>
              </div>
              <Stagger className="mt-8 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" amount={0.05}>
                {items.map((e) => (
                  <ExperienceCard key={e.slug} experience={e} />
                ))}
              </Stagger>
            </section>
          );
        })}
      </div>
      <FinalCta />
    </>
  );
}
