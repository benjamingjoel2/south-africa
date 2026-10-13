import Image from "next/image";
import Link from "next/link";
import { images } from "@/data/images";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Eyebrow } from "@/components/ui/Type";
import { IncludedBox } from "@/components/detail/SideCard";
import { TestimonialBlock } from "@/components/cards/TestimonialBlock";
import { testimonials } from "@/data/testimonials";
import { SpecialistCta } from "@/components/sections/SpecialistCta";

export const metadata = buildMetadata({
  title: "Why Travel With Us",
  description: "Cape Compass is a small Cape Town team of South Africa specialists. One dedicated expert plans your tailor-made trip, from your first message to the day you fly home.",
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
      "Your specialist designs the trip, books every piece of it, briefs you before you fly and stays on WhatsApp until you're home. No call centres, no hand-offs.",
      "Flights, transfers, lodging and support: one travel pack, one specialist, one number on WhatsApp. Reachable before, during and after your trip.",
    ],
  },
  {
    id: "story",
    title: "Our",
    accent: "story",
    body: [
      "Cape Compass began around a kitchen table in Tamboerskloof. Friends from abroad kept asking the same questions: Is Kruger or a private reserve better? How many nights in Cape Town? Is the Garden Route worth the drive? We kept answering, then booking, then checking in on WhatsApp while they travelled.",
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

// PLACEHOLDER team: replace names, roles and bios with real staff (and add photos).
const team = [
  { name: "Specialist name", role: "Founder & safari specialist", region: "Kruger & private reserves", bio: "Grew up between Cape Town and the lowveld. Has spent more nights in the bush than in most hotels." },
  { name: "Specialist name", role: "Cape & Winelands specialist", region: "Western Cape", bio: "Knows every chef's table in Franschhoek and the quiet trail up Table Mountain." },
  { name: "Specialist name", role: "Garden Route & self-drive", region: "Garden Route & Eastern Cape", bio: "Has driven the N2 more times than anyone should. Plans road trips down to the lunch stop." },
  { name: "Specialist name", role: "KwaZulu-Natal & family travel", region: "Drakensberg & Zulu coast", bio: "A parent of two who matches families to the lodges that genuinely welcome children." },
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
              {[...sections, { id: "team", title: "Meet the team", accent: "" }].map((s) => (
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

          <section id="team" className="scroll-mt-28 py-10 lg:py-14" aria-label="Meet the team">
            <Eyebrow>0{sections.length + 1}</Eyebrow>
            <h2 className="mt-3 text-h2">
              Meet the <em className="accent">team</em>.
            </h2>
            <p className="mt-4 text-charcoal-700">
              Each specialist leads on a region but knows the whole country. <span className="text-brass-600">Team details are placeholders.</span>
            </p>
            <div className="mt-8 grid gap-px border border-ivory-200 bg-ivory-200 sm:grid-cols-2">
              {team.map((p, i) => (
                <div key={i} className="bg-ivory-50 p-6">
                  <div className="flex aspect-[4/3] items-center justify-center bg-ivory-100">
                    <span className="eyebrow">Photo placeholder</span>
                  </div>
                  <p className="eyebrow mt-5 text-brass-600">{p.region}</p>
                  <h3 className="mt-2 text-h4">{p.name}</h3>
                  <p className="text-sm text-charcoal-700">{p.role}</p>
                  <p className="mt-3 text-[0.9375rem] text-charcoal-700">{p.bio}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-ivory-200 pt-10 lg:pt-14" aria-label="Guest story">
            <TestimonialBlock t={testimonials[1]} />
            <Link href="/testimonials" className="mt-6 inline-block text-eyebrow font-medium uppercase tracking-eyebrow text-brass-600 hover:text-charcoal-800">
              More guest stories →
            </Link>
          </section>
        </div>
      </section>
      <SpecialistCta />
    </>
  );
}
