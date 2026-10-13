import Link from "next/link";
import { notFound } from "next/navigation";
import { experiences, getExperience } from "@/data/experiences";
import { destinations } from "@/data/destinations";
import { tours } from "@/data/tours";
import { buildMetadata } from "@/lib/seo";
import { SplitHero } from "@/components/detail/SplitHero";
import { SideCard, defaultRows } from "@/components/detail/SideCard";
import { TourFilters } from "@/components/detail/TourFilters";
import { ExperienceCell } from "@/components/cards/ExperienceCell";
import { tourCountForExperience } from "@/components/sections/ExperienceGrid";
import { SpecialistCta } from "@/components/sections/SpecialistCta";
import { Eyebrow, SectionHead } from "@/components/ui/Type";
import { Price } from "@/components/ui/Price";

export const dynamicParams = false;
export const generateStaticParams = () => experiences.map((e) => ({ slug: e.slug }));

export async function generateMetadata({ params }: PageProps<"/experiences/[slug]">) {
  const { slug } = await params;
  const e = getExperience(slug);
  if (!e) return {};
  return buildMetadata({ title: e.title, description: e.summary, path: `/experiences/${e.slug}`, image: e.image });
}

export default async function ExperiencePage({ params }: PageProps<"/experiences/[slug]">) {
  const { slug } = await params;
  const e = getExperience(slug);
  if (!e) notFound();
  const where = destinations.filter((d) => e.destinationSlugs.includes(d.slug));
  const related = tours.filter((t) => t.destinationSlugs.some((s) => e.destinationSlugs.includes(s)));
  const more = experiences.filter((x) => x.slug !== e.slug && x.category === e.category).slice(0, 3);

  return (
    <>
      <SplitHero
        crumbs={[{ name: "Experiences", path: "/experiences" }, { name: e.category, path: "/experiences" }]}
        title={e.title}
        subtitle={e.summary}
        text={e.description[0]}
        cta={{ label: "See the tours", href: "#tours" }}
        image={e.image}
        imageAlt={e.title}
      />
      <section className="border-t border-ivory-200 section-y" aria-label="Details">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="space-y-5 text-lead text-charcoal-700">
              {e.description.slice(1).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-10 grid gap-10 sm:grid-cols-2">
              <div>
                <Eyebrow>Typically includes</Eyebrow>
                <ul className="mt-4 divide-y divide-ivory-200 border-y border-ivory-200">
                  {e.includes.map((x) => (
                    <li key={x} className="py-3 text-[0.9375rem]">{x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <Eyebrow>Good to know</Eyebrow>
                <ul className="mt-4 divide-y divide-ivory-200 border-y border-ivory-200">
                  {e.goodToKnow.map((x) => (
                    <li key={x} className="py-3 text-[0.9375rem] text-charcoal-700">{x}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-10">
              <Eyebrow>Where you can do it</Eyebrow>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {where.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/destinations/${d.slug}`} className="block border border-ivory-200 bg-ivory-50 p-5 transition-colors hover:border-charcoal-800">
                      <span className="block font-display text-h4">{d.name}</span>
                      <span className="mt-1 block text-sm text-charcoal-700">{d.tagline}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <SideCard
              rows={[
                { label: "Duration", value: e.duration },
                { label: "Best time", value: e.bestTime },
                { label: "Where", value: where.map((d) => d.shortName ?? d.name).join(", ") },
                ...(e.priceFromUsd ? [{ label: "From", value: <><Price usd={e.priceFromUsd} /> per person (guide price)</> }] : []),
                ...defaultRows.slice(0, 2),
              ]}
              className="lg:sticky lg:top-28"
            />
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section className="pb-20 lg:pb-24" aria-label="More experiences">
          <div className="container-x">
            <SectionHead eyebrow={e.category} lead="More" accent={e.category.toLowerCase()} />
            <div className="mt-10 grid gap-px border border-ivory-200 bg-ivory-200 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((x) => (
                <ExperienceCell key={x.slug} experience={x} tourCount={tourCountForExperience(x.destinationSlugs)} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="tours" className="scroll-mt-24 border-t border-ivory-200 section-y" aria-label="Tours">
        <div className="container-x">
          <SectionHead eyebrow="Tailor-made trips" lead="Tours featuring" accent={e.title.toLowerCase()} className="mb-10" />
          <TourFilters tours={related} />
        </div>
      </section>
      <SpecialistCta />
    </>
  );
}
