"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { images } from "@/data/images";
import { ButtonLink } from "@/components/ui/Button";
import { SplitReveal } from "@/components/motion/SplitReveal";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.08, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden" aria-label="Introduction">
      {/* Layer 1: photo with parallax */}
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
      {/* Layer 2: tonal gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate via-slate/30 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      <motion.div style={{ y: contentY, opacity: fade }} className="container-x relative w-full pb-14 pt-36 md:pb-20">
        <p className="anim-fade-up label flex items-center gap-2 text-white/75" style={{ animationDelay: "0.1s" }}>
          <span className="text-ochre-400" aria-hidden="true">+</span> Tailor-made South Africa
        </p>

        <SplitReveal
          as="h1"
          immediate
          delay={0.2}
          lines={["Start at the Cape.", "Go beyond."]}
          className="mt-6 text-display font-semibold"
        />

        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <p className="anim-fade-up max-w-xl text-body-xxl text-white/80 md:col-span-7" style={{ animationDelay: "0.5s" }}>
            Private, tailor-made journeys from Cape Town to the Winelands, the Garden Route and Kruger&apos;s private reserves, planned by one dedicated local specialist from your first message to the day you fly home.
          </p>
          <div className="anim-fade-up flex flex-col gap-3 sm:flex-row md:col-span-5 md:justify-end" style={{ animationDelay: "0.65s" }}>
            <ButtonLink href="/plan-your-trip" size="lg" icon>
              Start planning
            </ButtonLink>
            <ButtonLink href="/tours" size="lg" variant="secondary">
              Explore tours
            </ButtonLink>
          </div>
        </div>

        <ul
          style={{ animationDelay: "0.9s" }}
          className="anim-fade-up mt-14 hidden flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-6 text-sm text-white/60 md:flex"
          aria-label="Regions we cover"
        >
          {["Cape Town", "Winelands", "Garden Route", "Kruger & private reserves", "Drakensberg", "Zulu coast", "Johannesburg"].map((r) => (
            <li key={r} className="flex items-center gap-2">
              <span className="text-ochre-400" aria-hidden="true">+</span>
              {r}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
