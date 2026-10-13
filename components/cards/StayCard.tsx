import Image from "next/image";
import Link from "next/link";
import type { Stay } from "@/data/types";
import { Price } from "@/components/ui/Price";
import { cn } from "@/lib/utils";

export function StayCard({ stay: s, tone = "dark", className }: { stay: Stay; tone?: "dark" | "light"; className?: string }) {
  const dark = tone === "dark";
  return (
    <article className={cn("group relative", className)}>
      <div className={cn("relative aspect-[4/5] overflow-hidden", dark ? "bg-forest-800" : "bg-ivory-200")}>
        <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
      </div>
      <p className={cn("eyebrow mt-5", dark ? "text-brass-400" : "")}>{s.location}</p>
      <h3 className={cn("mt-2 text-h3", dark && "text-white")}>
        <Link href={`/stays/${s.slug}`} className="after:absolute after:inset-0">
          {s.name}
        </Link>
      </h3>
      <p className={cn("mt-2 text-sm", dark ? "text-white/70" : "text-charcoal-700")}>
        From <Price usd={s.priceFromUsdPerNight} /> per person · night
      </p>
    </article>
  );
}
