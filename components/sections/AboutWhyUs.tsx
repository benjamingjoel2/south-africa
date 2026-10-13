import Image from "next/image";
import { images } from "@/data/images";
import { testimonials } from "@/data/testimonials";
import { SectionLabel } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Parallax } from "@/components/motion/Parallax";
import { ButtonLink } from "@/components/ui/Button";
import { CornerTicks } from "@/components/ui/NdebeleLine";
import { StarIcon } from "@/components/ui/Icons";

export function AboutWhyUs() {
  const featured = testimonials[0];
  return (
    <section className="section-y relative border-t border-white/10" aria-label="About Cape Compass">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <Parallax className="aspect-[4/5] rounded-card" offset={50}>
            <Image src={images.aboutTeam} alt="" fill sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover" />
          </Parallax>
          <Reveal
            delay={0.2}
            className="absolute -bottom-8 right-4 max-w-[17rem] rounded-card border border-white/10 bg-slate/90 p-5 backdrop-blur md:-right-8"
          >
            <p className="label text-white/50">Since</p>
            <p className="mt-2 text-h3 font-semibold">2012</p>
            <p className="mt-1 text-sm text-white/60">Planning South Africa from our base in Cape Town</p>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pl-6">
          <Reveal>
            <SectionLabel>About us</SectionLabel>
          </Reveal>
          <SplitReveal
            lines={["Not a catalogue.", "A conversation."]}
            className="mt-5 text-h2 font-semibold"
          />
          <Reveal delay={0.1} className="mt-8 space-y-5 text-body-xl text-white/65">
            <p>
              Cape Compass started where most South Africa journeys start: in Cape Town, with a few friends who kept being asked by visitors where to go, where to stay and how to fit it all in.
            </p>
            <p>
              Today we&apos;re a small team of local specialists. When you get in touch, you&apos;re matched with one of us, and that person designs your trip, books every piece of it, briefs you before you fly and stays on WhatsApp until you&apos;re home. No call centres, no hand-offs.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 grid grid-cols-2 gap-6 border-y border-white/10 py-8">
            <div>
              <p className="text-h2 font-semibold">2,400+</p>
              <p className="mt-1 text-sm text-white/55">Trips planned for travellers from 40+ countries</p>
            </div>
            <div>
              <p className="text-h2 font-semibold">4.9/5</p>
              <p className="mt-1 text-sm text-white/55">Average guest rating (placeholder figure)</p>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="relative mt-10 rounded-card border border-white/10 bg-surface p-7 md:p-9">
            <CornerTicks />
            <span className="absolute right-5 top-5 rounded-full bg-protea/15 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-protea">
              Placeholder testimonial
            </span>
            <div className="flex gap-0.5 text-ochre-400" role="img" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
            <blockquote className="mt-5 text-body-xxl font-medium text-white">“{featured.quote}”</blockquote>
            <p className="mt-5 text-sm text-white/55">
              {featured.name}, {featured.from} · {featured.trip}
            </p>
          </Reveal>

          <Reveal delay={0.25} className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href="/about" variant="secondary" icon>
              Our story
            </ButtonLink>
            <ul className="flex flex-wrap gap-2" aria-label="Associations (placeholders)">
              {["Association logo", "Partner logo", "Award logo"].map((l) => (
                <li
                  key={l}
                  className="rounded-lg border border-dashed border-white/20 px-3 py-2 text-xs uppercase tracking-wider text-white/55"
                >
                  {l}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
