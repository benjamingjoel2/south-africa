import Image from "next/image";
import { images } from "@/data/images";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Eyebrow } from "@/components/ui/Type";
import { IncludedBox } from "@/components/detail/SideCard";
import { SpecialistCta } from "@/components/sections/SpecialistCta";

export const metadata = buildMetadata({
  title: "Why Travel With Us",
  description: "Cape Compass is a small Cape Town team of South Africa specialists. One dedicated expert plans your tailor-made trip from first message to flight home.",
  path: "/about",
  image: images.aboutTeam,
});

const years = new Date().getFullYear() - site.foundedYear;

const sections = [
  {
    id: "promise",
    title: "The seamless trip",
    accent: "promise",
    body: [
      `We understand what is at stake when planning a once-in-a-lifetime journey: a honeymoon, a family trip, a long-awaited adventure. With ${years} years of experience planning South Africa, we have learned to anticipate what could go wrong before it does.`,
      "Safety sits at the heart of how we work: trusted suppliers, modern vehicles, expert private guides. We pace itineraries to reduce travel fatigue, often recommending a short flight over a long road transfer, so the journey is as smooth as it is secure.",
    ],
  },
  {
    id: "reachable",
    title: "Here for you, every step of the",
    accent: "way",
    body: [
      "Your specialist designs the trip, books every piece of it, briefs you before you fly and stays with you until you're home. No call centres, no hand-offs.",
      "Flights, transfers, lodging and support: one travel pack, one specialist, one point of contact. Reachable before, during and after your trip.",
    ],
  },
  {
    id: "story",
    title: "Our",
    accent: "story",
    body: [
      "Cape Compass began around a kitchen table in Tamboerskloof. Friends from abroad kept asking the same questions: Is Kruger or a private reserve better? How many nights in Cape Town? Is the Garden Route worth the drive? We kept answering, then booking, then checking in on them while they travelled.",
      "Word spread. Today we are a small team of specialists, each with a region we know intimately, but the approach hasn't changed. We listen first, design around how you like to travel, and never hand you off to someone who doesn't know your trip.",
    ],
  },
  {
    id: "price",
    title: "Same price, better",
    accent: "service",
    body: [
      "You pay direct local rates for lodges, guides and transfers, never a markup. Booking through us adds a specialist who knows the properties personally and can secure the right room, the right guide and the right table.",
    ],
  },
  {
    id: "conservation",
    title: "Community and",
    accent: "conservation",
    body: [
      "We favour lodges with real community and conservation programmes, and we'll tell you which ones. Ethical wildlife encounters only: no petting, no walking with predators, no interactions that compromise an animal's welfare.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative on-dark bg-forest-900" aria-label="Why travel with us">
        <Image src={images.ctaBand} alt="" fill sizes="100vw" className="object-cover opacity-30" priority />
        <div className="container-x relative py-24 lg:py-32">
          <Eyebrow className="text-brass-400">Why travel with us</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-display text-white">
            Your journey, <em className="accent text-brass-300">curated</em>.
          </h1>
          <p className="mt-6 max-w-2xl text-lead text-white/80">
            Since {site.foundedYear} we have planned tailor-made South Africa trips from our base in Cape Town. Below is what we promise, and what we do, for you.
          </p>
        </div>
      </section>

      <section className="container-x grid gap-12 section-y lg:grid-cols-12 lg:gap-16" aria-label="Our promises">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>On this page</Eyebrow>
            <ul className="mt-4 divide-y divide-ivory-200 border-y border-ivory-200 text-[0.9375rem]">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="block py-3 hover:text-brass-600">
                    {s.title} {s.accent}
                  </a>
                </li>
              ))}
            </ul>
            <IncludedBox className="mt-8" />
          </div>
        </aside>
        <div className="lg:col-span-8">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-28 border-b border-ivory-200 py-10 first:pt-0 lg:py-14">
              <Eyebrow>0{i + 1}</Eyebrow>
              <h2 className="mt-3 text-h2">
                {s.title} <em className="accent">{s.accent}</em>.
              </h2>
              <div className="mt-6 space-y-5 text-lead text-charcoal-700">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}

        </div>
      </section>
      <SpecialistCta />
    </>
  );
}
