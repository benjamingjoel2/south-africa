"use client";

import { motion } from "framer-motion";
import { site } from "@/config/site";
import { SectionHead } from "@/components/ui/SectionHead";
import { Stagger } from "@/components/motion/Reveal";
import { partVariants, cardVariants } from "@/components/cards/cardMotion";
import { ChatIcon, CompassIcon, MapIcon, ShieldIcon, StarIcon, TagIcon } from "@/components/ui/Icons";

const years = new Date().getFullYear() - site.foundedYear;

const items = [
  { stat: "1", title: "Dedicated local specialist", text: "One person who knows your trip inside out, from the first message to your flight home.", Icon: CompassIcon },
  { stat: `${years}+`, title: "Years planning South Africa", text: "Cape Town-based and travelling the country constantly to keep our advice current.", Icon: StarIcon },
  { stat: "150+", title: "Vetted guides & lodges", text: "Every guide, driver and property personally inspected, and re-checked every season.", Icon: ShieldIcon },
  { stat: "0", title: "Hidden fees", text: "Fair, transparent pricing in your currency, with direct local rates and no surprise add-ons.", Icon: TagIcon },
  { stat: "24/7", title: "WhatsApp support", text: "Real people on call while you travel, for changes, questions or a great dinner tip.", Icon: ChatIcon },
  { stat: "8", title: "Regions covered", text: "From the Cape and Garden Route to Kruger, the Drakensberg, the Zulu coast and the Kalahari.", Icon: MapIcon },
];

export function TrustRow() {
  return (
    <section className="section-y" aria-label="Why Cape Compass">
      <div className="container-x">
        <SectionHead
          label="Why Cape Compass"
          title={["One specialist.", "Every detail. All the way home."]}
          description="We're a small Cape Town team who live and breathe this country. You get honest advice, local insider access and someone who answers when you message."
        />
        <Stagger className="mt-14 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
          {items.map(({ stat, title, text, Icon }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className="group relative border-b border-r border-white/10 p-6 transition-colors duration-500 hover:bg-white/[0.03] md:p-9"
            >
              <motion.div variants={partVariants} className="flex items-center justify-between">
                <span className="label text-white/50">{title}</span>
                <Icon className="size-5 text-ochre transition-transform duration-500 group-hover:rotate-12" />
              </motion.div>
              <motion.p variants={partVariants} className="mt-10 text-[clamp(3rem,2rem+3vw,4.5rem)] font-semibold leading-none tracking-[-0.05em]">
                {stat}
              </motion.p>
              <motion.p variants={partVariants} className="mt-4 max-w-xs text-white/60">
                {text}
              </motion.p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
