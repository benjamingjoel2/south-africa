"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Stay } from "@/data/types";
import { Price } from "@/components/ui/Price";
import { BedIcon, PinIcon } from "@/components/ui/Icons";
import { cardVariants, partVariants } from "./cardMotion";
import { cn } from "@/lib/utils";

export function StayCard({ stay, className }: { stay: Stay; className?: string }) {
  return (
    <motion.article
      variants={cardVariants}
      className={cn("group relative flex h-full flex-col rounded-card border border-white/10 bg-surface p-3 hover:border-white/25", className)}
    >
      <motion.div variants={partVariants} className="relative aspect-[4/3] overflow-hidden rounded-tile">
        <Image
          src={stay.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 80vw"
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-slate/75 px-3 py-1.5 text-xs font-medium backdrop-blur">
          {stay.type}
        </span>
      </motion.div>
      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <motion.p variants={partVariants} className="flex items-center gap-1.5 text-sm text-white/55">
          <PinIcon className="text-ochre" /> {stay.location}
        </motion.p>
        <motion.h3 variants={partVariants} className="mt-2 text-h4 font-semibold">
          <Link href={`/stays/${stay.slug}`} className="after:absolute after:inset-0 after:rounded-card">
            {stay.name}
          </Link>
        </motion.h3>
        <motion.p variants={partVariants} className="mt-2 text-[0.9375rem] text-white/60">
          {stay.summary}
        </motion.p>
        <motion.div variants={partVariants} className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-sm">
          <span className="flex items-center gap-1.5 text-white/55">
            <BedIcon /> {stay.roomCount} rooms
          </span>
          <span className="text-white/60">
            From <Price usd={stay.priceFromUsdPerNight} className="font-semibold text-white" />
            <span className="text-white/45"> per person · night</span>
          </span>
        </motion.div>
      </div>
    </motion.article>
  );
}
