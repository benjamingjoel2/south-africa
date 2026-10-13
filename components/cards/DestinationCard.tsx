"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Destination } from "@/data/types";
import { cardVariants } from "./cardMotion";
import { cn } from "@/lib/utils";

/** Image-led tile with overlaid name + count, like the reference's destination tiles. */
export function DestinationCard({
  destination,
  index,
  tourCount,
  className,
  size = "md",
}: {
  destination: Destination;
  index?: number;
  tourCount?: number;
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <motion.article variants={cardVariants} className={cn("group relative", className)}>
      <Link
        href={`/destinations/${destination.slug}`}
        className={cn(
          "relative block overflow-hidden rounded-card",
          size === "lg" ? "aspect-[4/5] md:aspect-[3/4]" : "aspect-[4/5]",
        )}
      >
        <Image
          src={destination.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw"
          className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 text-xs font-medium text-white/80">
          {typeof index === "number" ? <span>{String(index + 1).padStart(2, "0")}</span> : <span />}
          <span className="rounded-full border border-white/30 px-3 py-1 backdrop-blur-sm">{destination.idealNights}</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <h3 className="text-h4 font-semibold">{destination.name}</h3>
          <p className="mt-1 text-sm text-white/65">
            {destination.tagline}
            {typeof tourCount === "number" && tourCount > 0 && (
              <span className="text-white/45"> / {tourCount} sample {tourCount === 1 ? "tour" : "tours"}</span>
            )}
          </p>
          <p className="mt-4 max-h-0 overflow-hidden text-sm text-white/75 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100 group-focus-within:max-h-24 group-focus-within:opacity-100">
            {destination.summary}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
