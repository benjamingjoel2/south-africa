import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tours, getTour, regionName, budgetLabels } from "@/data/tours";
import { stays } from "@/data/stays";
import { destinations } from "@/data/destinations";
import { buildMetadata, JsonLd } from "@/lib/seo";
import { site } from "@/config/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Display, Eyebrow } from "@/components/ui/Type";
import { Price } from "@/components/ui/Price";
import { DayRow } from "@/components/detail/DayRow";
import { MoreTours } from "@/components/detail/MoreTours";
import { StayCard } from "@/components/cards/StayCard";
import { SpecialistCta } from "@/components/sections/SpecialistCta";

export const dynamicParams = false;
export const generateStaticParams = () => tours.map((t) => ({ slug: t.slug }));

export async function generateMetadata({ params }: PageProps<"/tours/[slug]">) {
  const { slug } = await params;
  const t = getTour(slug);
  if (!t) return {};
  const price = t.priceFromUsd.toLocaleString("en-US");
  return buildMetadata({ title: `${t.title}: ${t.nights + 1}-Day Itinerary`, description: `${t.subtitle}. ${t.nights + 1} days from US$${price} per person. ${t.highlights[0]}.`, path: `/tours/${t.slug}`, image: t.image });
}

function bucket(items: string[]) {
  const stay: string[] = [], travel: string[] = [], exp: string[] = [];
  for (const i of items) {
    const l = i.toLowerCase();
    if (/night|accommodation|breakfast|meal|drinks|room|suite/.test(l)) stay.push(i);
    else if (/flight|transfer|car|driver|vehicle|route book/.test(l)) travel.push(i);
    else exp.push(i);
  }
  return { stay, travel, exp };
}

export default async function TourPage({ params }: PageProps<"/tours/[slug]">) {
  const { slug } = await params;
  const t = getTour(slug);
  if (!t) notFound();
  const tourStays = stays.filter((s) => t.staySlugs.includes(s.slug));
  const stops = t.destinationSlugs.map((s) => destinations.find((d) => d.slug === s)).filter(Boolean);
  const related = tours.filter((x) => x.slug !== t.slug && x.regions.some((r) => t.regions.includes(r)));
  const gallery = [t.image, ...t.gallery];
  const inc = bucket(t.included);

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "TouristTrip", name: t.title, description: t.subtitle, image: t.image, url: `${site.url}/tours/${t.slug}`, touristType: t.idealFor, offers: { "@type": "Offer", price: t.priceFromUsd, priceCurrency: "USD" }, provider: { "@type": "TravelAgency", name: site.name, url: site.url } }} />

      <section className="container-x pt-10 lg:pt-14" aria-label={t.title}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Breadcrumbs items={[{ name: "Tour itinerary", path: "/tours" }, { name: t.regions.map(regionName).join(" · "), path: `/tours/${t.slug}` }]} />
            <h1 className="mt-5 text-h1">{t.title}</h1>
          </div>
          <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
            <p className="text-sm text-charcoal-700">
              From <Price usd={t.priceFromUsd} className="font-medium text-charcoal-800" /> per person
            </p>
            <ButtonLink href="/plan-your-trip" arrow>
              Enquire now
            </ButtonLink>
          </div>
        </div>

        <div className="mt-10 grid gap-2 md:grid-cols-3 md:grid-rows-2">
          <div className="relative aspect-[4/3] bg-ivory-200 md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[26rem]">
            <Image src={gallery[0]} alt={t.title} fill priority sizes="(min-width: 768px) 66vw, 100vw" className="object-cover" />
          </div>
          {gallery.slice(1, 3).map((g, i) => (
            <div key={g + i} className="relative hidden aspect-[4/3] bg-ivory-200 md:block md:aspect-auto">
              <Image src={g} alt={`${t.title}, photo ${i + 2}`} fill sizes="33vw" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-10 border-b border-ivory-200 pb-14 lg:grid-cols-12">
          <p className="text-lead text-charcoal-700 lg:col-span-8">{t.subtitle}. {t.overview[0]}</p>
          <dl className="space-y-2 border-l border-ivory-200 pl-5 text-[0.9375rem] lg:col-span-4">
            <div className="flex gap-2"><dt className="text-charcoal-700">Duration ·</dt><dd>{t.nights + 1} days</dd></div>
            <div className="flex gap-2"><dt className="text-charcoal-700">Comfort ·</dt><dd>{budgetLabels[t.budget]}</dd></div>
            <div className="flex gap-2"><dt className="text-charcoal-700">From, per person ·</dt><dd><Price usd={t.priceFromUsd} /></dd></div>
            <div className="flex gap-2"><dt className="text-charcoal-700">Best time ·</dt><dd>{t.bestTime}</dd></div>
          </dl>
        </div>
      </section>

      <section className="container-x py-16 text-center lg:py-20" aria-label="About this itinerary">
        <Eyebrow>The journey</Eyebrow>
        <Display lead="About this" accent="itinerary" className="mt-3" />
        <p className="mx-auto mt-8 max-w-3xl font-display-italic text-[1.375rem] leading-relaxed text-charcoal-700">{t.overview[t.overview.length - 1]}</p>
        <p className="mt-6 text-sm text-charcoal-700">
          Where you&rsquo;ll travel:{" "}
          {stops.map((d, i) => (
            <span key={d!.slug}>
              <Link href={`/destinations/${d!.slug}`} className="text-charcoal-800 underline underline-offset-4">{d!.shortName ?? d!.name}</Link>
              {i < stops.length - 1 && ", "}
            </span>
          ))}
        </p>
      </section>

      <section className="container-x" aria-label="Overview">
        <div className="mx-auto max-w-3xl border-t border-ivory-200 pt-12">
          <h2 className="text-h2">Overview</h2>
          <ul className="mt-6 space-y-2 text-lead text-charcoal-700">
            {t.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <p className="mt-6 text-[0.9375rem] font-medium">Ideal for {t.idealFor.join(", ").toLowerCase()}. Every itinerary is tailor-made, so dates, pace and stays can all change.</p>
        </div>
        <div className="mx-auto mt-14 max-w-3xl border-t border-ivory-200 pt-12">
          <h2 className="text-h2">Itinerary</h2>
        </div>
      </section>

      <section className="container-x border-t border-ivory-200" aria-label="Day by day">
        {t.itinerary.map((d, i) => (
          <DayRow key={d.day} day={d} index={i} image={gallery[(i + 1) % gallery.length]} />
        ))}
      </section>

      <section className="on-dark bg-forest-900 section-y" aria-label="What's included">
        <div className="container-x">
          <Eyebrow className="text-brass-400">The complete package</Eyebrow>
          <Display lead="Everything" accent="included" tone="dark" className="mt-3" />
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
            {[
              ["Stay", inc.stay],
              ["Experiences", inc.exp],
              ["Travel", inc.travel],
            ].map(([title, items]) => (
              <div key={title as string} className="lg:px-8 lg:first:pl-0">
                <p className="eyebrow">{title as string}</p>
                <ul className="mt-4 space-y-2.5 text-[0.9375rem] text-white/85">
                  {(items as string[]).map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="lg:px-8">
              <p className="eyebrow text-white/50">Not included</p>
              <ul className="mt-4 space-y-2.5 text-[0.9375rem] text-white/60">
                {t.excluded.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-16 text-center lg:py-20" aria-label="Rates">
        <Eyebrow>Direct local rates</Eyebrow>
        <Display lead="Rates and" accent="dates" className="mt-3" />
        <p className="mx-auto mt-5 max-w-xl font-display-italic text-charcoal-700">
          Per person sharing for the complete package. Final pricing depends on your dates, availability and the stays you choose.
        </p>
        <div className="mx-auto mt-10 grid max-w-3xl gap-px border border-ivory-200 bg-ivory-200 sm:grid-cols-3">
          {[
            { label: "Per person sharing", usd: t.priceFromUsd },
            { label: "For two travellers", usd: t.priceFromUsd * 2 },
            { label: "Per person per night", usd: Math.round(t.priceFromUsd / t.nights) },
          ].map((p) => (
            <div key={p.label} className="bg-ivory-50 p-6">
              <p className="eyebrow">{p.label}</p>
              <p className="mt-2 text-[1.75rem] font-medium tracking-tight">From <Price usd={p.usd} /></p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-sm text-charcoal-700">
          International flights excluded. Peak season (December to January, and July to October on safari) and upgrades increase the price; quieter months reduce it.
        </p>
        <div className="mx-auto mt-10 max-w-3xl border-t border-ivory-200 pt-8 text-left">
          <p className="eyebrow">Route</p>
          <ol className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.9375rem]">
            {stops.map((d, i) => (
              <li key={d!.slug}>
                {i > 0 && <span className="mr-3 text-stone-400">→</span>}
                {d!.shortName ?? d!.name}
              </li>
            ))}
          </ol>
        </div>
        <ButtonLink href="/plan-your-trip" arrow className="mt-10">
          Enquire about this itinerary
        </ButtonLink>
      </section>

      {tourStays.length > 0 && (
        <section className="border-t border-ivory-200 section-y" aria-label="Where you'll stay">
          <div className="container-x">
            <Eyebrow>Stays</Eyebrow>
            <Display lead="Where you'll" accent="stay" className="mt-3" />
            <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {tourStays.map((s) => (
                <StayCard key={s.slug} stay={s} tone="light" />
              ))}
            </div>
          </div>
        </section>
      )}

      <MoreTours tours={related} />
      <SpecialistCta lead="Make this trip" accent="your own" tail="" />
    </>
  );
}
