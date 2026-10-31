import Link from "next/link";
import { notFound } from "next/navigation";
import { destinations, getDestination } from "@/data/destinations";
import { experiences } from "@/data/experiences";
import { stays } from "@/data/stays";
import { tours, regionName } from "@/data/tours";
import { buildMetadata, JsonLd } from "@/lib/seo";
import { site } from "@/config/site";
import { months } from "@/lib/utils";
import { SplitHero } from "@/components/detail/SplitHero";
import { SideCard, defaultRows } from "@/components/detail/SideCard";
import { MonthGrid } from "@/components/detail/MonthGrid";
import { FaqAccordion } from "@/components/detail/FaqAccordion";
import { TourFilters } from "@/components/detail/TourFilters";
import { StayCard } from "@/components/cards/StayCard";
import { ExperienceCell } from "@/components/cards/ExperienceCell";
import { tourCountForExperience } from "@/components/sections/ExperienceGrid";
import { SpecialistCta } from "@/components/sections/SpecialistCta";
import { Display, Eyebrow, SectionHead } from "@/components/ui/Type";
import { ArrowDown } from "@/components/ui/Icons";

export const dynamicParams = false;
export const generateStaticParams = () => destinations.map((d) => ({ slug: d.slug }));

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return {};
  return buildMetadata({ title: `${d.name} Travel Guide`, description: `${d.summary} Best time to visit, highlights, where to stay and tailor-made itineraries.`, path: `/destinations/${d.slug}`, image: d.image });
}

export default async function DestinationPage({ params }: PageProps<"/destinations/[slug]">) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();
  const short = d.shortName ?? d.name;
  const related = tours.filter((t) => t.destinationSlugs.includes(d.slug));
  const relatedStays = stays.filter((s) => d.staySlugs.includes(s.slug));
  const relatedExperiences = experiences.filter((e) => d.experienceSlugs.includes(e.slug));
  const best = months.filter((m) => d.months[m] === "best");

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "TouristDestination", name: d.name, description: d.summary, image: d.image, url: `${site.url}/destinations/${d.slug}`, containedInPlace: { "@type": "Country", name: "South Africa" } }} />
      <SplitHero
        crumbs={[{ name: "Destinations", path: "/destinations" }, { name: d.name, path: `/destinations/${d.slug}` }]}
        title={d.name}
        subtitle={`${d.tagline}.`}
        text={d.summary}
        cta={{ label: "Explore the tours", href: "#tours" }}
        image={d.image}
        imageAlt={d.name}
      />

      <section className="border-t border-ivory-200 section-y" aria-label="Overview">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>{short}</Eyebrow>
            <h2 className="mt-3 text-h2">Ways to build a {short} trip</h2>
            <div className="mt-6 space-y-5 text-lead text-charcoal-700">
              {d.overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {d.thingsToDo.map((t) => (
                <div key={t.title} className="border-t border-ivory-200 pt-5">
                  <h3 className="text-h4">{t.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-charcoal-700">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <SideCard
              rows={[
                { label: "Region", value: regionName(d.region) },
                { label: "Stay", value: d.idealNights },
                { label: "Best months", value: best.length ? best.join(", ") : "Year-round" },
                ...defaultRows,
              ]}
              className="lg:sticky lg:top-28"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-ivory-200 bg-ivory-100 section-y" aria-label="Best time to visit">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>When to go</Eyebrow>
            <Display lead="Best time to visit" accent={short} className="mt-3" />
            <p className="mt-5 text-[0.9375rem] text-charcoal-700">{d.seasonNote}</p>
          </div>
          <div className="lg:col-span-8">
            <MonthGrid ratings={d.months} />
          </div>
        </div>
      </section>

      <section className="section-y" aria-label="Highlights and practical tips">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>Highlights</Eyebrow>
            <ul className="mt-4 divide-y divide-ivory-200 border-y border-ivory-200">
              {d.highlights.map((h) => (
                <li key={h} className="py-3.5 text-[0.9375rem]">{h}</li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>Practical tips</Eyebrow>
            <ul className="mt-4 divide-y divide-ivory-200 border-y border-ivory-200">
              {d.tips.map((t) => (
                <li key={t} className="py-3.5 text-[0.9375rem] text-charcoal-700">{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {relatedExperiences.length > 0 && (
        <section className="pb-20 lg:pb-24" aria-label="Experiences here">
          <div className="container-x">
            <SectionHead eyebrow="Experiences" lead={`Things to do in`} accent={short} />
            <div className="mt-10 grid gap-px border border-ivory-200 bg-ivory-200 sm:grid-cols-2 lg:grid-cols-3">
              {relatedExperiences.map((e) => (
                <ExperienceCell key={e.slug} experience={e} tourCount={tourCountForExperience(e.destinationSlugs)} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-ivory-200 bg-ivory-100 section-y" aria-label="Common questions">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Common questions</Eyebrow>
            <Display lead={`${short},`} accent="answered" className="mt-3" />
            <Link href="/faq" className="group/btn mt-5 inline-flex items-center gap-2 text-sm text-brass-600 hover:text-charcoal-800">
              Read the full FAQ <ArrowDown />
            </Link>
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion items={d.faqs} />
          </div>
        </div>
      </section>

      {relatedStays.length > 0 && (
        <section className="section-y" aria-label="Where to stay">
          <div className="container-x">
            <SectionHead eyebrow="Stays" lead={`Where to stay in`} accent={short} />
            <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {relatedStays.map((s) => (
                <StayCard key={s.slug} stay={s} tone="light" />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="tours" className="scroll-mt-24 border-t border-ivory-200 section-y" aria-label="Tours">
        <div className="container-x">
          <SectionHead eyebrow="Tailor-made trips" lead="Tours including" accent={short} className="mb-10" />
          {related.length ? (
            <TourFilters tours={related} showRegion={false} />
          ) : (
            <p className="border border-ivory-200 bg-bone p-8 text-charcoal-700">
              We build {short} into tailor-made itineraries rather than fixed packages.{" "}
              <Link href="/plan-your-trip" className="underline underline-offset-2">Tell us your dates</Link> and we&rsquo;ll design one around it.
            </p>
          )}
        </div>
      </section>

      <SpecialistCta lead={`Ready for`} accent={short} tail="?" text="Tell us when, who's coming and what you're hoping for. One named specialist designs the rest." />
    </>
  );
}
