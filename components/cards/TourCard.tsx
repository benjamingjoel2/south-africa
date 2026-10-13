"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Tour } from "@/data/types";
import { regionName } from "@/data/tours";
import { Price } from "@/components/ui/Price";
import { Arrow } from "@/components/ui/Button";
import { CheckIcon, PinIcon, TagIcon } from "@/components/ui/Icons";
import { cardVariants, partVariants } from "./cardMotion";
import { cn } from "@/lib/utils";

export function TourCard({ tour, className, priority }: { tour: Tour; className?: string; priority?: boolean }) {
  return (
    <motion.article
      variants={cardVariants}
      className={cn(
        "group relative flex h-full flex-col rounded-card border border-white/10 bg-surface p-3 transition-colors duration-500 hover:border-white/25",
        className,
      )}
    >
      <motion.div variants={partVariants} className="relative aspect-[4/3] overflow-hidden rounded-tile">
        <Image
          src={tour.image}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-slate/80 px-3 py-1.5 text-xs font-medium backdrop-blur">
          {tour.nights + 1} days · {tour.nights} nights
        </span>
      </motion.div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <motion.p variants={partVariants} className="flex items-center gap-1.5 text-sm text-white/55">
          <PinIcon className="text-ochre" />
          {tour.regions.map(regionName).join(" · ")}
        </motion.p>

        <motion.h3 variants={partVariants} className="mt-3 text-h4 font-semibold">
          <Link href={`/tours/${tour.slug}`} className="after:absolute after:inset-0 after:rounded-card">
            {tour.title}
          </Link>
        </motion.h3>

        <motion.p variants={partVariants} className="mt-3 flex items-start gap-1.5 text-sm text-white/55">
          <TagIcon className="mt-0.5 text-ochre" />
          {tour.inclusionsLine}
        </motion.p>

        <motion.ul variants={partVariants} className="mt-5 space-y-2 border-t border-white/10 pt-5 text-[0.9375rem] text-white/80">
          {tour.highlights.slice(0, 4).map((h) => (
            <li key={h} className="flex gap-2.5">
              <CheckIcon className="mt-1 text-teal-300" />
              {h}
            </li>
          ))}
        </motion.ul>

        <motion.div variants={partVariants} className="mt-auto pt-6">
          <div className="flex items-end justify-between gap-4 border-t border-white/10 pt-5">
            <div>
              <p className="text-xs text-white/50">From</p>
              <p className="text-h4 font-semibold">
                <Price usd={tour.priceFromUsd} />
                <span className="ml-1 text-sm font-normal text-white/50">per person</span>
              </p>
              <p className="mt-1 text-xs text-white/45">
                ≈ <Price usd={tour.priceFromUsd * 2} /> for two · international flights excluded
              </p>
            </div>
          </div>
          <span className="group/btn mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/20 text-[0.9375rem] font-medium transition-colors duration-300 group-hover:border-ochre group-hover:bg-ochre">
            View tour <Arrow />
          </span>
        </motion.div>
      </div>
    </motion.article>
  );
}
