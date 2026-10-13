"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Experience } from "@/data/types";
import { Arrow } from "@/components/ui/Button";
import { cardVariants, partVariants } from "./cardMotion";
import { cn } from "@/lib/utils";

export function ExperienceCard({ experience, index, className }: { experience: Experience; index?: number; className?: string }) {
  return (
    <motion.article variants={cardVariants} className={cn("group relative flex flex-col", className)}>
      <motion.div variants={partVariants} className="relative aspect-[5/4] overflow-hidden rounded-card">
        <Image
          src={experience.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-slate/75 px-3 py-1.5 text-xs font-medium backdrop-blur">
          {experience.category}
        </span>
      </motion.div>
      <motion.div variants={partVariants} className="flex items-start justify-between gap-4 pt-5">
        <div>
          {typeof index === "number" && <p className="text-xs font-medium text-ochre">{String(index + 1).padStart(2, "0")}</p>}
          <h3 className="mt-1 text-h4 font-semibold">
            <Link href={`/experiences/${experience.slug}`} className="after:absolute after:inset-0">
              {experience.title}
            </Link>
          </h3>
          <p className="mt-2 text-[0.9375rem] text-white/60">{experience.summary}</p>
        </div>
        <span className="group/btn mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 transition-colors duration-300 group-hover:border-ochre group-hover:bg-ochre">
          <Arrow />
        </span>
      </motion.div>
    </motion.article>
  );
}
