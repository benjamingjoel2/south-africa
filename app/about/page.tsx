import Image from "next/image";
import { images } from "@/data/images";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { TrustRow } from "@/components/sections/TrustRow";
import { BuildYourTrip } from "@/components/sections/BuildYourTrip";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Cape Compass is a small Cape Town team of South Africa specialists. One dedicated expert plans your tailor-made trip, from your first message to the day you fly home.",
  path: "/about",
  image: images.aboutTeam,
});

// PLACEHOLDER team: replace names, roles and bios with real staff (and add photos).
const team = [
  { name: "Specialist name", role: "Founder & safari specialist", region: "Kruger & private reserves", bio: "Grew up between Cape Town and the lowveld. Has spent more nights in the bush than in most hotels.", countries: 18, trips: 640 },
  { name: "Specialist name", role: "Cape & Winelands specialist", region: "Western Cape", bio: "Knows every chef's table in Franschhoek and the quiet trail up Table Mountain.", countries: 22, trips: 520 },
  { name: "Specialist name", role: "Garden Route & self-drive", region: "Garden Route & Eastern Cape", bio: "Has driven the N2 more times than anyone should. Plans road trips down to the lunch stop.", countries: 15, trips: 410 },
  { name: "Specialist name", role: "KwaZulu-Natal & family travel", region: "Drakensberg & Zulu coast", bio: "A parent of two who matches families to the lodges that genuinely welcome children.", countries: 26, trips: 380 },
];

const values = [
  { title: "One person, start to finish", text: "Your specialist designs, books and supports your trip. No call centres, no hand-offs." },
  { title: "Honest advice", text: "We'll tell you when a plan is too rushed, or when a cheaper lodge is the better choice." },
  { title: "Local, and proud of it", text: "Owned and run in South Africa, working with local guides, drivers and family-owned properties." },
  { title: "Travel that gives back", text: "We favour lodges with real community and conservation programmes, and we'll tell you which ones." },
];

export default function AboutPage() {
  const years = new Date().getFullYear() - site.foundedYear;
  return (
    <>
      <PageHero
        label="About us"
        title={["We start in Cape Town.", "Then we take you further."]}
        description={`For ${years}+ years, Cape Compass has planned tailor-made South Africa trips with one simple promise: one dedicated local specialist, from the first message to the day you fly home.`}
        crumbs={[{ name: "About", path: "/about" }]}
        image={images.ctaBand}
      />

      <section className="section-y" aria-label="Our story">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="label text-white/50">Our story</p>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-body-xl text-white/70 lg:col-span-6">
            <p>
              Cape Compass began around a kitchen table in Tamboerskloof. Friends from abroad kept asking the same questions: Is Kruger or a private reserve better? How many nights in Cape Town? Is the Garden Route worth the drive? We kept answering, then booking, then checking in on WhatsApp while they travelled.
            </p>
            <p>
              Word spread. Today we&apos;re a small team of specialists, each with a region we know intimately, but the approach hasn&apos;t changed. We listen first, design around how <em>you</em> like to travel, and never hand you off to someone who doesn&apos;t know your trip.
            </p>
            <p>
              We&apos;re adventurous by nature (we&apos;ll happily get you onto a walking safari or up a Drakensberg ridge), but we care just as much about the details that make a trip feel effortless: the right room, the right guide, and the transfer waiting when you land.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="relative hidden aspect-[3/4] overflow-hidden rounded-card lg:col-span-3 lg:block">
            <Image src={images.bokaap} alt="Colourful houses in Cape Town's Bo-Kaap" fill sizes="25vw" className="object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="section-y border-t border-white/10" aria-label="What we believe">
        <div className="container-x">
          <SectionHead label="What we believe" title={["Premium means", "personal."]} />
          <Stagger className="mt-14 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <StaggerItem key={v.title} className="border-b border-r border-white/10 p-6 md:p-8">
                <p className="text-sm font-semibold text-ochre-400">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-6 text-h4 font-semibold">{v.title}</h3>
                <p className="mt-3 text-white/60">{v.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-y border-t border-white/10" aria-label="Our specialists">
        <div className="container-x">
          <SectionHead
            label="Our specialists"
            title={["The people behind", "your trip"]}
            description={<>Each specialist leads on a region but knows the whole country. <span className="text-protea">Team details below are placeholders.</span></>}
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((p, i) => (
              <StaggerItem key={i} className="flex flex-col rounded-card border border-white/10 bg-surface p-6">
                <div className="flex aspect-square items-center justify-center rounded-tile bg-[linear-gradient(135deg,var(--color-teal),var(--color-slate))]">
                  <span className="text-xs uppercase tracking-widest text-white/50">Photo placeholder</span>
                </div>
                <p className="mt-5 label text-ochre-400">{p.region}</p>
                <h3 className="mt-2 text-h4 font-semibold">{p.name}</h3>
                <p className="text-sm text-white/55">{p.role}</p>
                <p className="mt-4 flex-1 text-white/65">{p.bio}</p>
                <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-sm">
                  <div><dt className="text-white/55">Countries travelled</dt><dd className="font-semibold">{p.countries}</dd></div>
                  <div><dt className="text-white/55">Trips planned</dt><dd className="font-semibold">{p.trips}</dd></div>
                </dl>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <TrustRow />
      <BuildYourTrip />
      <Testimonials />
      <FinalCta />
    </>
  );
}
