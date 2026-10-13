"use client";

import { motion } from "framer-motion";
import { PlusChip } from "@/components/ui/PlusChip";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import { cardVariants, partVariants } from "@/components/cards/cardMotion";
import { NdebeleLine } from "@/components/ui/NdebeleLine";

const steps = [
  { title: "Share your ideas", text: "Tell us your dates, who's travelling and what you dream of. Two minutes in our planner, or a quick WhatsApp." },
  { title: "Meet your specialist", text: "Within one working day, your dedicated specialist calls to talk it through and ask the right questions." },
  { title: "Refine your itinerary", text: "We send a detailed proposal with real prices, then tweak it with you until it's exactly right." },
  { title: "Travel, supported", text: "Documents, a local SIM tip-sheet and 24/7 WhatsApp support from someone who knows your trip." },
];

export function BuildYourTrip() {
  return (
    <section className="relative overflow-hidden bg-teal" aria-label="How we build your trip">
      <NdebeleLine />
      <div className="container-x section-y">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal className="flex flex-wrap gap-2">
              {["Safari", "Stays", "Transfers", "Flights", "Experiences"].map((c) => (
                <PlusChip key={c} className="border-white/25 bg-white/5">
                  {c}
                </PlusChip>
              ))}
            </Reveal>
            <SplitReveal
              lines={["Everything in one plan,", "with one person."]}
              className="mt-8 text-h2 font-semibold"
            />
          </div>
          <Reveal delay={0.15} className="self-end text-body-xl text-white/75 lg:col-span-5">
            Safari lodges, boutique hotels, private guides, domestic flights and the transfers in between, all combined into one seamless itinerary and one clear price.
          </Reveal>
        </div>

        <Stagger className="mt-14 grid border-t border-white/20 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              variants={cardVariants}
              className="group relative border-b border-white/20 py-8 md:px-6 md:first:pl-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <motion.div variants={partVariants} className="flex items-baseline gap-3">
                <span className="text-h3 font-semibold text-ochre-400">{String(i + 1).padStart(2, "0")}</span>
                <span className="label text-white/50">Step</span>
              </motion.div>
              <motion.h3 variants={partVariants} className="mt-6 text-h4 font-semibold">
                {s.title}
              </motion.h3>
              <motion.p variants={partVariants} className="mt-3 text-white/70">
                {s.text}
              </motion.p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
