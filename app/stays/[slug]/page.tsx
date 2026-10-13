import { notFound } from "next/navigation";
import Link from "next/link";
import { stays, getStay } from "@/data/stays";
import { destinations } from "@/data/destinations";
import { tours } from "@/data/tours";
import { buildMetadata, JsonLd } from "@/lib/seo";
import { DetailIntro } from "@/components/detail/DetailIntro";
import { DetailLayout, DetailSection } from "@/components/detail/DetailLayout";
import { InfoCard } from "@/components/detail/InfoCard";
import { RelatedTours } from "@/components/sections/RelatedTours";
import { StaysRow } from "@/components/sections/StaysRow";
import { FinalCta } from "@/components/sections/FinalCta";
import { PlusChip } from "@/components/ui/PlusChip";
import { Price } from "@/components/ui/Price";
import { BedIcon, CheckIcon, PinIcon, UsersIcon } from "@/components/ui/Icons";

export const dynamicParams = false;
export const generateStaticParams = () => stays.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: PageProps<"/stays/[slug]">) {
  const { slug } = await params;
  const s = getStay(slug);
  if (!s) return {};
  return buildMetadata({ title: `${s.name}, ${s.location}`, description: s.summary, path: `/stays/${s.slug}`, image: s.image });
}

export default async function StayPage({ params }: PageProps<"/stays/[slug]">) {
  const { slug } = await params;
  const s = getStay(slug);
  if (!s) notFound();
  const dest = destinations.find((d) => d.slug === s.destinationSlug);
  const related = tours.filter((t) => t.staySlugs.includes(s.slug));
  const others = stays.filter((x) => x.slug !== s.slug).slice(0, 4);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          name: s.name,
          description: s.summary,
          image: s.image,
          address: { "@type": "PostalAddress", addressLocality: s.location, addressCountry: "ZA" },
        }}
      />
      <DetailIntro
        crumbs={[
          { name: "Stays", path: "/stays" },
          { name: s.name, path: `/stays/${s.slug}` },
        ]}
        eyebrow={
          <>
            <PlusChip>{s.type}</PlusChip>
            <PlusChip>{s.location}</PlusChip>
          </>
        }
        title={s.name}
        subtitle={s.summary}
        images={[s.image, ...s.gallery]}
        imageAlt={s.name}
      />
      <DetailLayout
        sections={[
          { id: "about", label: "About" },
          { id: "features", label: "Features" },
          { id: "location", label: "Location" },
        ]}
        sidebar={
          <InfoCard
            headline={
              <>
                <p className="text-sm text-white/50">From</p>
                <p className="text-h2 font-semibold"><Price usd={s.priceFromUsdPerNight} /></p>
                <p className="text-sm text-white/60">per person · night, sharing</p>
              </>
            }
            rows={[
              { icon: <PinIcon />, label: "Location", value: s.location },
              { icon: <BedIcon />, label: "Rooms", value: `${s.roomCount}` },
              { icon: <UsersIcon />, label: "Good for", value: s.goodFor.join(", ") },
            ]}
            cta="Include this stay"
            whatsappMessage={`Hi Cape Compass, I'd love to stay at ${s.name}.`}
            note="Placeholder property for illustration. Rates vary by season and room type."
          />
        }
      >
        <DetailSection id="about" title="About the stay">
          <div className="space-y-5 text-body-lg text-white/75">
            {s.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </DetailSection>
        <DetailSection id="features" title="Features">
          <ul className="grid gap-3 sm:grid-cols-2">
            {s.features.map((f) => (
              <li key={f} className="flex gap-3 rounded-2xl border border-white/10 p-4 text-white/85">
                <CheckIcon className="mt-0.5 text-ochre" /> {f}
              </li>
            ))}
          </ul>
        </DetailSection>
        <DetailSection id="location" title="Location">
          <p className="text-body-lg text-white/75">
            {s.location}
            {dest && (
              <>
                {" "}· in <Link href={`/destinations/${dest.slug}`} className="text-ochre-400 underline underline-offset-2">{dest.name}</Link>. {dest.summary}
              </>
            )}
          </p>
        </DetailSection>
      </DetailLayout>
      <RelatedTours tours={related} title={["Tours with", "this stay"]} />
      <StaysRow list={others} label="More stays" title={["You may", "also like"]} />
      <FinalCta />
    </>
  );
}
