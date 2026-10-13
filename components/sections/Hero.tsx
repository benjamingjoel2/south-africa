"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { images } from "@/data/images";
import { getTour } from "@/data/tours";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Marquee } from "@/components/motion/Marquee";
import { Price } from "@/components/ui/Price";
import { ChatIcon, CompassIcon, ShieldIcon, StarIcon } from "@/components/ui/Icons";

const regions = [
  "Cape Town",
  "Cape Winelands",
  "Hermanus",
  "Garden Route",
  "Kruger & private reserves",
  "Panorama Route",
  "Drakensberg",
  "Zulu coast",
  "Johannesburg & Soweto",
  "Addo",
  "Kalahari",
];

const trust = [
  { Icon: CompassIcon, text: "One dedicated specialist" },
  { Icon: ChatIcon, text: "24/7 WhatsApp support" },
  { Icon: ShieldIcon, text: "Vetted guides & lodges" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.06, 1.16]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const featured = getTour("classic-south-africa")!;

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden" aria-label="Introduction">
      {/* Photo with parallax */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <Image
          src={images.heroCapeTown}
          alt="Cape Town with Table Mountain rising behind the city"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      {/* Tonal gradients: darker on the left for legibility, fade into the page at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate/85 via-slate/45 to-slate/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate via-transparent to-black/40" />

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="container-x relative grid flex-1 items-center gap-12 pb-12 pt-32 lg:grid-cols-12 lg:pt-28"
      >
        {/* Copy + actions, grouped */}
        <div className="lg:col-span-7">
          <p
            className="anim-fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="text-ochre-400" aria-hidden="true">+</span>
            Tailor-made South Africa · since 2012
          </p>

          <SplitReveal
            as="h1"
            immediate
            delay={0.2}
            lines={["Start at the Cape.", "Go beyond."]}
            className="mt-6 text-display font-semibold"
          />

          <p className="anim-fade-up mt-6 max-w-lg text-body-xxl text-white/80" style={{ animationDelay: "0.5s" }}>
            Private journeys from Cape Town to the Winelands, the Garden Route and Kruger&apos;s private reserves,
            planned by one local specialist from your first message to the day you fly home.
          </p>

          <div className="anim-fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.65s" }}>
            <ButtonLink href="/plan-your-trip" size="lg" icon>
              Start planning
            </ButtonLink>
            <ButtonLink href="/tours" size="lg" variant="secondary" className="bg-white/5 backdrop-blur">
              Explore tours
            </ButtonLink>
          </div>

          <ul
            className="anim-fade-up mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/75"
            style={{ animationDelay: "0.8s" }}
            aria-label="Why travel with us"
          >
            {trust.map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-2">
                <Icon className="text-ochre-400" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Featured journey card (desktop) */}
        <div className="anim-fade-up relative hidden lg:col-span-5 lg:flex lg:justify-end" style={{ animationDelay: "0.9s" }}>
          <div
            className="absolute -left-2 top-6 z-10 flex items-center gap-3 rounded-2xl border border-white/15 bg-slate/70 py-2.5 pl-2.5 pr-4 shadow-2xl backdrop-blur-xl xl:-left-6"
            aria-hidden="true"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-teal text-xs font-semibold">CC</span>
            <span className="text-xs leading-tight">
              <span className="block font-semibold text-white">Your specialist replies</span>
              <span className="text-white/60">within one working day</span>
            </span>
          </div>

          <article className="group relative mt-14 w-full max-w-sm rounded-[1.5rem] border border-white/15 bg-slate/55 p-3 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] backdrop-blur-xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={images.sabiSand}
                alt=""
                fill
                sizes="384px"
                className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-slate/75 px-3 py-1 text-xs font-medium backdrop-blur">
                Featured journey
              </span>
            </div>
            <div className="px-2 pb-2 pt-4">
              <p className="flex items-center gap-1.5 text-xs text-white/60">
                <StarIcon className="size-3.5 text-ochre-400" />
                {featured.nights + 1} days · Cape Town · Winelands · Sabi Sand
              </p>
              <h2 className="mt-2 text-h4 font-semibold">
                <Link href={`/tours/${featured.slug}`} className="after:absolute after:inset-0 after:rounded-[1.5rem]">
                  {featured.title}
                </Link>
              </h2>
              <div className="mt-4 flex items-end justify-between border-t border-white/10 pt-4">
                <p className="text-sm text-white/60">
                  From <Price usd={featured.priceFromUsd} className="text-base font-semibold text-white" /> pp
                </p>
                <span className="group/btn flex size-9 items-center justify-center rounded-full bg-ochre transition-colors group-hover:bg-ochre-700">
                  <Arrow />
                </span>
              </div>
            </div>
          </article>
        </div>
      </motion.div>

      {/* Regions strip */}
      <div className="relative border-t border-white/10 bg-black/25 backdrop-blur-md">
        <Marquee duration={45} className="py-4">
          {regions.map((r) => (
            <span key={r} className="flex items-center gap-5 whitespace-nowrap text-sm text-white/70">
              {r}
              <span className="text-ochre-400" aria-hidden="true">+</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
