"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { images } from "@/data/images";
import { getTour } from "@/data/tours";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Price } from "@/components/ui/Price";

const trust = ["One dedicated specialist", "24/7 WhatsApp support", "Vetted guides & lodges", "8 regions covered"];

/** Light, minimal hero: sand background, dark headline, wide rounded photo with a featured-journey card. */
export function Hero() {
  const photoRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);
  const featured = getTour("classic-south-africa")!;

  return (
    <section className="theme-light pb-16 pt-28 md:pb-20 md:pt-32" aria-label="Introduction">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <p className="anim-fade-up label text-ochre-700" style={{ animationDelay: "0.05s" }}>
              Tailor-made South Africa · since 2012
            </p>
            <SplitReveal
              as="h1"
              immediate
              delay={0.15}
              lines={["Start at the Cape.", "Go beyond."]}
              className="mt-5 text-display font-semibold text-ink"
            />
          </div>

          <div className="anim-fade-up lg:col-span-5" style={{ animationDelay: "0.4s" }}>
            <p className="max-w-md text-body-xl text-ink/75">
              Private, tailor-made journeys from Cape Town to the Winelands, the Garden Route and Kruger&apos;s private
              reserves, planned by one local specialist from your first message to the day you fly home.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/plan-your-trip" size="lg" icon>
                Start planning
              </ButtonLink>
              <ButtonLink
                href="/tours"
                size="lg"
                variant="secondary"
                className="border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-white"
              >
                Explore tours
              </ButtonLink>
            </div>
          </div>
        </div>

        <div
          ref={photoRef}
          className="anim-fade-up relative mt-10 aspect-[4/3] max-w-full overflow-hidden rounded-[1.75rem] sm:aspect-[16/9] md:mt-14 lg:aspect-[21/9]"
          style={{ animationDelay: "0.55s" }}
        >
          <motion.div style={{ y: imgY }} className="absolute inset-[-7%_0]">
            <Image
              src={images.heroCapeTown}
              alt="Aerial view of Cape Town with Table Mountain behind the city"
              fill
              priority
              sizes="(min-width: 1440px) 1344px, 100vw"
              className="object-cover object-[center_55%]"
            />
          </motion.div>

          <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-sand/90 px-3.5 py-2 text-xs font-medium text-ink backdrop-blur md:bottom-5 md:left-5 md:text-sm">
            <span className="size-2 rounded-full bg-ochre" aria-hidden="true" />
            Cape Town, Western Cape
          </span>

          <article className="group absolute bottom-5 right-5 hidden w-[19rem] rounded-2xl bg-sand/95 p-4 text-ink shadow-[0_20px_50px_-20px_rgb(0_0_0/0.45)] backdrop-blur md:block">
            <p className="label text-ink/60">Featured journey</p>
            <h2 className="mt-2 text-h4 font-semibold">
              <Link href={`/tours/${featured.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
                {featured.title}
              </Link>
            </h2>
            <div className="mt-1.5 flex items-end justify-between gap-3">
              <p className="text-sm text-ink/70">
                {featured.nights + 1} days · Cape Town, Winelands, Sabi Sand
                <br />
                From <Price usd={featured.priceFromUsd} className="font-semibold text-ink" /> pp
              </p>
              <span className="group/btn flex size-9 shrink-0 items-center justify-center rounded-full bg-ochre text-white transition-colors group-hover:bg-ochre-700">
                <Arrow />
              </span>
            </div>
          </article>
        </div>

        <ul
          className="anim-fade-up mt-6 flex flex-wrap gap-x-7 gap-y-2 text-sm text-ink/70"
          style={{ animationDelay: "0.7s" }}
          aria-label="Why travel with us"
        >
          {trust.map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <span className="text-ochre-700" aria-hidden="true">
                +
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
