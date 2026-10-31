import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stays, getStay } from "@/data/stays";
import { destinations } from "@/data/destinations";
import { tours } from "@/data/tours";
import { buildMetadata, JsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Type";
import { Price } from "@/components/ui/Price";
import { MoreTours } from "@/components/detail/MoreTours";
import { LodgesBand } from "@/components/sections/LodgesBand";
import { SpecialistCta } from "@/components/sections/SpecialistCta";

export const dynamicParams = false;
export const generateStaticParams = () => stays.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: PageProps<"/stays/[slug]">) {
  const { slug } = await params;
  const s = getStay(slug);
  if (!s) return {};
  const price = s.priceFromUsdPerNight.toLocaleString("en-US");
  return buildMetadata({ title: `${s.name}, ${s.location}`, description: `${s.summary} From US$${price} per person per night.`, path: `/stays/${s.slug}`, image: s.image });
}

export default async function StayPage({ params }: PageProps<"/stays/[slug]">) {
  const { slug } = await params;
  const s = getStay(slug);
  if (!s) notFound();
  const dest = destinations.find((d) => d.slug === s.destinationSlug);
  const related = tours.filter((t) => t.staySlugs.includes(s.slug));
  const others = stays.filter((x) => x.slug !== s.slug).slice(0, 4);
  const gallery = [s.image, ...s.gallery];

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "LodgingBusiness", name: s.name, description: s.summary, image: s.image, address: { "@type": "PostalAddress", addressLocality: s.location, addressCountry: "ZA" } }} />
      <section className="container-x pt-10 lg:pt-14" aria-label={s.name}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Breadcrumbs items={[{ name: "Stays", path: "/stays" }, { name: `${s.type} · ${s.location}`, path: `/stays/${s.slug}` }]} />
            <h1 className="mt-5 text-h1">{s.name}</h1>
          </div>
          <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
            <p className="text-sm text-charcoal-700">
              From <Price usd={s.priceFromUsdPerNight} className="font-medium text-charcoal-800" /> per person · night
            </p>
            <ButtonLink href="/plan-your-trip" arrow>Enquire now</ButtonLink>
          </div>
        </div>
        <div className="mt-10 grid gap-2 md:grid-cols-3 md:grid-rows-2">
          <div className="relative aspect-[4/3] bg-ivory-200 md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[26rem]">
            <Image src={gallery[0]} alt={s.name} fill priority sizes="(min-width: 768px) 66vw, 100vw" className="object-cover" />
          </div>
          {gallery.slice(1, 3).map((g, i) => (
            <div key={g + i} className="relative hidden aspect-[4/3] bg-ivory-200 md:block md:aspect-auto">
              <Image src={g} alt={`${s.name}, photo ${i + 2}`} fill sizes="33vw" className="object-cover" />
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-10 border-b border-ivory-200 pb-14 lg:grid-cols-12">
          <div className="space-y-5 text-lead text-charcoal-700 lg:col-span-8">
            {s.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <dl className="space-y-2 border-l border-ivory-200 pl-5 text-[0.9375rem] lg:col-span-4">
            <div className="flex gap-2"><dt className="text-charcoal-700">Type ·</dt><dd>{s.type}</dd></div>
            <div className="flex gap-2"><dt className="text-charcoal-700">Rooms ·</dt><dd>{s.roomCount}</dd></div>
            <div className="flex gap-2"><dt className="text-charcoal-700">Good for ·</dt><dd>{s.goodFor.join(", ")}</dd></div>
            {dest && (
              <div className="flex gap-2"><dt className="text-charcoal-700">Region ·</dt><dd><Link href={`/destinations/${dest.slug}`} className="underline underline-offset-4">{dest.name}</Link></dd></div>
            )}
          </dl>
        </div>
      </section>

      <section className="container-x section-y" aria-label="Features">
        <Eyebrow>Features</Eyebrow>
        <ul className="mt-4 grid gap-px border border-ivory-200 bg-ivory-200 sm:grid-cols-2 lg:grid-cols-3">
          {s.features.map((f) => (
            <li key={f} className="bg-ivory-50 px-5 py-4 text-[0.9375rem]">{f}</li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-stone-400">Placeholder property for illustration. Rates vary by season and room type.</p>
      </section>

      <MoreTours tours={related} eyebrow="Itineraries" lead="Tours with" accent="this stay" />
      <LodgesBand list={others} lead="More places to" accent="stay" />
      <SpecialistCta />
    </>
  );
}
