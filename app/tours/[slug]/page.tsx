import { notFound } from "next/navigation";
import { tours, getTour, regionName, budgetLabels } from "@/data/tours";
import { stays } from "@/data/stays";
import { destinations } from "@/data/destinations";
import { buildMetadata, JsonLd } from "@/lib/seo";
import { site } from "@/config/site";
import { DetailIntro } from "@/components/detail/DetailIntro";
import { DetailLayout, DetailSection } from "@/components/detail/DetailLayout";
import { InfoCard } from "@/components/detail/InfoCard";
import { MapPlaceholder } from "@/components/sections/MapPlaceholder";
import { RelatedTours } from "@/components/sections/RelatedTours";
import { FinalCta } from "@/components/sections/FinalCta";
import { Stagger } from "@/components/motion/Reveal";
import { StayCard } from "@/components/cards/StayCard";
import { PlusChip } from "@/components/ui/PlusChip";
import { Price } from "@/components/ui/Price";
import { CalendarIcon, CheckIcon, CrossIcon, PinIcon, SunIcon, UsersIcon, TagIcon } from "@/components/ui/Icons";

export const dynamicParams = false;
export const generateStaticParams = () => tours.map((t) => ({ slug: t.slug }));

export async function generateMetadata({ params }: PageProps<"/tours/[slug]">) {
  const { slug } = await params;
  const t = getTour(slug);
  if (!t) return {};
  return buildMetadata({
    title: `${t.title}: ${t.nights + 1}-Day South Africa Itinerary`,
    description: `${t.subtitle}. ${t.highlights.slice(0, 2).join(". ")}. From US$${t.priceFromUsd.toLocaleString("en-US")} per person.`,
    path: `/tours/${t.slug}`,
    image: t.image,
  });
}

export default async function TourPage({ params }: PageProps<"/tours/[slug]">) {
  const { slug } = await params;
  const t = getTour(slug);
  if (!t) notFound();

  const tourStays = stays.filter((s) => t.staySlugs.includes(s.slug));
  const stops = t.destinationSlugs.map((s) => destinations.find((d) => d.slug === s)?.name ?? s);
  const related = tours.filter((x) => x.slug !== t.slug && x.regions.some((r) => t.regions.includes(r)));

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "itinerary", label: "Itinerary" },
    { id: "included", label: "What's included" },
    { id: "pricing", label: "Pricing" },
    { id: "map", label: "Map" },
    ...(tourStays.length ? [{ id: "stays", label: "Stays" }] : []),
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: t.title,
          description: t.subtitle,
          image: t.image,
          url: `${site.url}/tours/${t.slug}`,
          touristType: t.idealFor,
          itinerary: { "@type": "ItemList", itemListElement: stops.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s })) },
          offers: { "@type": "Offer", price: t.priceFromUsd, priceCurrency: "USD", availability: "https://schema.org/InStock" },
          provider: { "@type": "TravelAgency", name: site.name, url: site.url },
        }}
      />
      <DetailIntro
        crumbs={[
          { name: "Tours", path: "/tours" },
          { name: t.title, path: `/tours/${t.slug}` },
        ]}
        eyebrow={
          <>
            <PlusChip>{t.nights + 1} days · {t.nights} nights</PlusChip>
            <PlusChip>{budgetLabels[t.budget]}</PlusChip>
          </>
        }
        title={t.title}
        subtitle={t.subtitle}
        images={[t.image, ...t.gallery]}
        imageAlt={t.title}
      />

      <DetailLayout
        sections={sections}
        sidebar={
          <InfoCard
            headline={
              <>
                <p className="text-sm text-white/50">From</p>
                <p className="text-h2 font-semibold">
                  <Price usd={t.priceFromUsd} />
                </p>
                <p className="text-sm text-white/60">per person sharing</p>
                <p className="mt-2 text-xs text-white/45">
                  ≈ <Price usd={t.priceFromUsd * 2} /> for two · international flights excluded
                </p>
              </>
            }
            rows={[
              { icon: <PinIcon />, label: "Regions", value: t.regions.map(regionName).join(" · ") },
              { icon: <CalendarIcon />, label: "Duration", value: `${t.nights + 1} days, ${t.nights} nights` },
              { icon: <SunIcon />, label: "Best time", value: t.bestTime },
              { icon: <UsersIcon />, label: "Ideal for", value: t.idealFor.join(", ") },
              { icon: <TagIcon />, label: "Includes", value: t.inclusionsLine },
            ]}
            cta="Enquire about this tour"
            whatsappMessage={`Hi Cape Compass, I'm interested in the ${t.title} itinerary.`}
            note="Indicative price based on two adults sharing in shoulder season. Final pricing depends on dates, availability and your choices."
          />
        }
      >
        <DetailSection id="overview" title="Overview">
          <div className="space-y-5 text-body-lg text-white/75">
            {t.overview.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {t.highlights.map((h) => (
              <li key={h} className="flex gap-3 rounded-2xl border border-white/10 p-4">
                <CheckIcon className="mt-0.5 text-ochre" />
                <span className="text-white/85">{h}</span>
              </li>
            ))}
          </ul>
        </DetailSection>

        <DetailSection id="itinerary" title="Day by day">
          <ol className="relative">
            {t.itinerary.map((d, i) => (
              <li key={d.day} className="relative grid gap-2 pb-10 pl-10 last:pb-0 md:grid-cols-[8rem_1fr] md:gap-8 md:pl-0">
                <span className="absolute left-0 top-1 flex size-6 items-center justify-center rounded-full border border-ochre text-[0.6875rem] font-semibold text-ochre md:hidden">
                  {i + 1}
                </span>
                {i < t.itinerary.length - 1 && (
                  <span aria-hidden="true" className="absolute left-[0.6875rem] top-8 h-[calc(100%-1.5rem)] border-l border-white/15 md:hidden" />
                )}
                <p className="label pt-1.5 text-ochre">{d.day}</p>
                <div className="md:border-l md:border-white/10 md:pl-8">
                  <h3 className="text-h4 font-semibold">{d.title}</h3>
                  <p className="mt-2 text-white/70">{d.description}</p>
                  {(d.overnight || d.meals) && (
                    <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/50">
                      {d.overnight && <span>Overnight: <span className="text-white/75">{d.overnight}</span></span>}
                      {d.meals && d.meals !== "—" && <span>Meals: <span className="text-white/75">{d.meals}</span></span>}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </DetailSection>

        <DetailSection id="included" title="What's included">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="label text-white/50">Included</h3>
              <ul className="mt-4 space-y-3">
                {t.included.map((x) => (
                  <li key={x} className="flex gap-3 text-white/80">
                    <CheckIcon className="mt-1 text-teal-300" /> {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="label text-white/50">Not included</h3>
              <ul className="mt-4 space-y-3">
                {t.excluded.map((x) => (
                  <li key={x} className="flex gap-3 text-white/60">
                    <CrossIcon className="mt-1 text-protea" /> {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DetailSection>

        <DetailSection id="pricing" title="Pricing">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Per person sharing", usd: t.priceFromUsd },
              { label: "For two travellers", usd: t.priceFromUsd * 2 },
              { label: "Per person per night", usd: Math.round(t.priceFromUsd / t.nights) },
            ].map((p) => (
              <div key={p.label} className="rounded-2xl border border-white/10 p-5">
                <p className="text-sm text-white/50">{p.label}</p>
                <p className="mt-2 text-h3 font-semibold">
                  <Price usd={p.usd} />
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-white/55">
            &ldquo;From&rdquo; prices are per person based on two adults sharing, excluding international flights. Peak season (Dec–Jan, Jul–Oct on safari) and upgrades will increase the price; quieter months can reduce it. Your specialist will give you an exact, all-in quote.
          </p>
        </DetailSection>

        <DetailSection id="map" title="Route map">
          <MapPlaceholder stops={stops} />
        </DetailSection>

        {tourStays.length > 0 && (
          <DetailSection id="stays" title="Where you'll stay">
            <Stagger className="grid gap-5 sm:grid-cols-2" amount={0.05}>
              {tourStays.map((s) => (
                <StayCard key={s.slug} stay={s} />
              ))}
            </Stagger>
          </DetailSection>
        )}
      </DetailLayout>

      <RelatedTours tours={related} />
      <FinalCta title={["Make this trip", "your own."]} />
    </>
  );
}
