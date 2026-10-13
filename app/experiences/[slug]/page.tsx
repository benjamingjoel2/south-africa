import { notFound } from "next/navigation";
import Link from "next/link";
import { experiences, getExperience } from "@/data/experiences";
import { destinations } from "@/data/destinations";
import { tours } from "@/data/tours";
import { buildMetadata } from "@/lib/seo";
import { DetailIntro } from "@/components/detail/DetailIntro";
import { DetailLayout, DetailSection } from "@/components/detail/DetailLayout";
import { InfoCard } from "@/components/detail/InfoCard";
import { RelatedTours } from "@/components/sections/RelatedTours";
import { FinalCta } from "@/components/sections/FinalCta";
import { PlusChip } from "@/components/ui/PlusChip";
import { Price } from "@/components/ui/Price";
import { CalendarIcon, CheckIcon, ClockIcon, PinIcon } from "@/components/ui/Icons";
import { Stagger } from "@/components/motion/Reveal";
import { ExperienceCard } from "@/components/cards/ExperienceCard";

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
  const gallery = [e.image, ...where.map((d) => d.image)].slice(0, 3);

  return (
    <>
      <DetailIntro
        crumbs={[
          { name: "Experiences", path: "/experiences" },
          { name: e.title, path: `/experiences/${e.slug}` },
        ]}
        eyebrow={<PlusChip>{e.category}</PlusChip>}
        title={e.title}
        subtitle={e.summary}
        images={gallery}
        imageAlt={e.title}
      />
      <DetailLayout
        sections={[
          { id: "about", label: "About" },
          { id: "where", label: "Where" },
          { id: "know", label: "Good to know" },
        ]}
        sidebar={
          <InfoCard
            headline={
              e.priceFromUsd ? (
                <>
                  <p className="text-sm text-white/50">Private, from</p>
                  <p className="text-h2 font-semibold"><Price usd={e.priceFromUsd} /></p>
                  <p className="text-sm text-white/60">per person (guide price)</p>
                </>
              ) : (
                <>
                  <p className="label text-white/55">Add to your trip</p>
                  <p className="mt-3 text-h4 font-semibold">Included in tailor-made itineraries</p>
                </>
              )
            }
            rows={[
              { icon: <ClockIcon />, label: "Duration", value: e.duration },
              { icon: <CalendarIcon />, label: "Best time", value: e.bestTime },
              { icon: <PinIcon />, label: "Where", value: where.map((d) => d.shortName ?? d.name).join(", ") },
            ]}
            cta="Add to my trip"
            whatsappMessage={`Hi Cape Compass, I'd love to include "${e.title}" in my trip.`}
          />
        }
      >
        <DetailSection id="about" title="The experience">
          <div className="space-y-5 text-body-lg text-white/75">
            {e.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <h3 className="mt-10 label text-white/50">Typically includes</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {e.includes.map((x) => (
              <li key={x} className="flex gap-3 rounded-2xl border border-white/10 p-4 text-white/85">
                <CheckIcon className="mt-0.5 text-ochre-400" /> {x}
              </li>
            ))}
          </ul>
        </DetailSection>
        <DetailSection id="where" title="Where you can do it">
          <ul className="grid gap-3 sm:grid-cols-2">
            {where.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/destinations/${d.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 p-5 transition-colors hover:border-ochre"
                >
                  <span>
                    <span className="block font-semibold">{d.name}</span>
                    <span className="text-sm text-white/55">{d.tagline}</span>
                  </span>
                  <span className="text-ochre-400 transition-transform group-hover:rotate-90" aria-hidden="true">+</span>
                </Link>
              </li>
            ))}
          </ul>
        </DetailSection>
        <DetailSection id="know" title="Good to know">
          <ul className="space-y-4">
            {e.goodToKnow.map((t) => (
              <li key={t} className="flex gap-4 text-white/75">
                <span className="text-ochre-400" aria-hidden="true">+</span> {t}
              </li>
            ))}
          </ul>
        </DetailSection>
      </DetailLayout>

      {more.length > 0 && (
        <section className="section-y border-t border-white/10" aria-label="More experiences">
          <div className="container-x">
            <h2 className="text-h3 font-semibold">More {e.category.toLowerCase()} experiences</h2>
            <Stagger className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" amount={0.05}>
              {more.map((x) => (
                <ExperienceCard key={x.slug} experience={x} />
              ))}
            </Stagger>
          </div>
        </section>
      )}
      <RelatedTours tours={related} title={["Tours featuring", "this experience"]} />
      <FinalCta />
    </>
  );
}
