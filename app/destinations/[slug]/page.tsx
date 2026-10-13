import { notFound } from "next/navigation";
import Link from "next/link";
import { destinations, getDestination } from "@/data/destinations";
import { experiences } from "@/data/experiences";
import { stays } from "@/data/stays";
import { tours, regionName } from "@/data/tours";
import { buildMetadata, JsonLd } from "@/lib/seo";
import { site } from "@/config/site";
import { months } from "@/lib/utils";
import { DetailIntro } from "@/components/detail/DetailIntro";
import { DetailLayout, DetailSection } from "@/components/detail/DetailLayout";
import { InfoCard } from "@/components/detail/InfoCard";
import { MonthGrid } from "@/components/sections/MonthGrid";
import { FaqList } from "@/components/sections/FaqList";
import { RelatedTours } from "@/components/sections/RelatedTours";
import { FinalCta } from "@/components/sections/FinalCta";
import { Stagger } from "@/components/motion/Reveal";
import { StayCard } from "@/components/cards/StayCard";
import { ExperienceCard } from "@/components/cards/ExperienceCard";
import { PlusChip } from "@/components/ui/PlusChip";
import { CalendarIcon, CheckIcon, ClockIcon, PinIcon } from "@/components/ui/Icons";

export const dynamicParams = false;
export const generateStaticParams = () => destinations.map((d) => ({ slug: d.slug }));

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return {};
  return buildMetadata({
    title: `${d.name} Travel Guide`,
    description: `${d.summary} Best time to visit, highlights, where to stay and tailor-made itineraries.`,
    path: `/destinations/${d.slug}`,
    image: d.image,
  });
}

export default async function DestinationPage({ params }: PageProps<"/destinations/[slug]">) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();

  const related = tours.filter((t) => t.destinationSlugs.includes(d.slug));
  const relatedStays = stays.filter((s) => d.staySlugs.includes(s.slug));
  const relatedExperiences = experiences.filter((e) => d.experienceSlugs.includes(e.slug));
  const bestMonths = months.filter((m) => d.months[m] === "best");

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "best-time", label: "Best time" },
    { id: "highlights", label: "Highlights" },
    { id: "things-to-do", label: "Things to do" },
    { id: "tips", label: "Practical tips" },
    { id: "stays", label: "Stays" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          name: d.name,
          description: d.summary,
          image: d.image,
          url: `${site.url}/destinations/${d.slug}`,
          containedInPlace: { "@type": "Country", name: "South Africa" },
        }}
      />
      <DetailIntro
        crumbs={[
          { name: "Destinations", path: "/destinations" },
          { name: d.name, path: `/destinations/${d.slug}` },
        ]}
        eyebrow={
          <>
            <PlusChip>{regionName(d.region)}</PlusChip>
            <PlusChip>{d.idealNights}</PlusChip>
          </>
        }
        title={d.name}
        subtitle={d.tagline}
        images={[d.image, ...d.gallery]}
        imageAlt={d.name}
      />

      <DetailLayout
        sections={sections}
        sidebar={
          <InfoCard
            headline={
              <>
                <p className="label text-white/45">Plan {d.shortName ?? d.name}</p>
                <p className="mt-3 text-h4 font-semibold">{d.tagline}</p>
              </>
            }
            rows={[
              { icon: <PinIcon />, label: "Region", value: regionName(d.region) },
              { icon: <ClockIcon />, label: "Recommended stay", value: d.idealNights },
              { icon: <CalendarIcon />, label: "Best months", value: bestMonths.length ? bestMonths.join(", ") : "Year-round" },
            ]}
            whatsappMessage={`Hi Cape Compass, I'd love help planning a trip that includes ${d.name}.`}
            note="Every trip is tailor-made. We'll combine this destination with others that suit your dates."
          />
        }
      >
        <DetailSection id="overview" title="Overview">
          <div className="space-y-5 text-body-lg text-white/75">
            {d.overview.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </DetailSection>

        <DetailSection id="best-time" title="Best time to visit">
          <MonthGrid ratings={d.months} note={d.seasonNote} />
        </DetailSection>

        <DetailSection id="highlights" title="Highlights">
          <ul className="grid gap-3 sm:grid-cols-2">
            {d.highlights.map((h) => (
              <li key={h} className="flex gap-3 rounded-2xl border border-white/10 p-4">
                <CheckIcon className="mt-0.5 text-ochre" />
                <span className="text-white/85">{h}</span>
              </li>
            ))}
          </ul>
        </DetailSection>

        <DetailSection id="things-to-do" title="Things to do">
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {d.thingsToDo.map((t, i) => (
              <div key={t.title} className="border-t border-white/10 pt-5">
                <p className="text-sm font-semibold text-ochre">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-h4 font-semibold">{t.title}</h3>
                <p className="mt-2 text-white/65">{t.text}</p>
              </div>
            ))}
          </div>
          {relatedExperiences.length > 0 && (
            <>
              <h3 className="mt-14 label text-white/50">Related experiences</h3>
              <Stagger className="mt-6 grid gap-x-5 gap-y-10 sm:grid-cols-2" amount={0.05}>
                {relatedExperiences.slice(0, 4).map((e) => (
                  <ExperienceCard key={e.slug} experience={e} />
                ))}
              </Stagger>
            </>
          )}
        </DetailSection>

        <DetailSection id="tips" title="Practical tips">
          <ul className="space-y-4">
            {d.tips.map((t, i) => (
              <li key={i} className="flex gap-4 text-white/75">
                <span className="text-ochre" aria-hidden="true">+</span>
                {t}
              </li>
            ))}
          </ul>
        </DetailSection>

        <DetailSection id="stays" title={`Where to stay in ${d.shortName ?? d.name}`}>
          {relatedStays.length ? (
            <Stagger className="grid gap-5 sm:grid-cols-2" amount={0.05}>
              {relatedStays.map((s) => (
                <StayCard key={s.slug} stay={s} />
              ))}
            </Stagger>
          ) : (
            <p className="rounded-2xl border border-white/10 p-6 text-white/65">
              We work with a handful of hand-picked properties here and match them to your style and budget.{" "}
              <Link href="/plan-your-trip" className="text-ochre-400 underline underline-offset-2">
                Ask your specialist for options
              </Link>
              .
            </p>
          )}
        </DetailSection>

        <DetailSection id="faq" title="Frequently asked questions">
          <FaqList items={d.faqs} />
        </DetailSection>
      </DetailLayout>

      <RelatedTours tours={related} title={[`Tours including`, d.shortName ?? d.name]} />
      <FinalCta title={[`Ready for`, `${d.shortName ?? d.name}?`]} />
    </>
  );
}
