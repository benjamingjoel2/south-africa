import { experiences } from "@/data/experiences";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/seo";
import { SplitHero } from "@/components/detail/SplitHero";
import { ExperienceCell } from "@/components/cards/ExperienceCell";
import { tourCountForExperience } from "@/components/sections/ExperienceGrid";
import { SpecialistCta } from "@/components/sections/SpecialistCta";

export const metadata = buildMetadata({
  title: "South Africa Experiences",
  description: "Big Five game drives, walking safaris, Table Mountain, Boulders Beach penguins, Winelands tastings, whale watching, Robben Island and more, tailored to you.",
  path: "/experiences",
  image: images.krugerGameDrive,
});

export default function ExperiencesPage() {
  const categories = Array.from(new Set(experiences.map((e) => e.category)));
  return (
    <>
      <SplitHero
        crumbs={[{ name: "Experiences", path: "/experiences" }]}
        title="Experiences"
        subtitle="By the kind of trip you want."
        text="From dawn game drives to long lunches in the vines, here is what we love to weave into an itinerary. Pick a few favourites and we'll plan the route around them."
        cta={{ label: "Start planning", href: "/plan-your-trip" }}
        image={images.krugerGameDrive}
        imageAlt="Safari vehicle at sunset"
      />
      <div className="container-x space-y-16 border-t border-ivory-200 section-y">
        {categories.map((c) => {
          const items = experiences.filter((e) => e.category === c);
          return (
            <section key={c} aria-labelledby={`c-${c}`}>
              <h2 id={`c-${c}`} className="eyebrow mb-4">{c}</h2>
              <div className="grid gap-px border border-ivory-200 bg-ivory-200 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((e) => (
                  <ExperienceCell key={e.slug} experience={e} tourCount={tourCountForExperience(e.destinationSlugs)} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
      <SpecialistCta />
    </>
  );
}
