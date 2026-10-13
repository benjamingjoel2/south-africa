import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/data/types";
import { regionName } from "@/data/tours";
import { Price } from "@/components/ui/Price";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function TourCard({ tour: t, className, priority, compact }: { tour: Tour; className?: string; priority?: boolean; compact?: boolean }) {
  return (
    <article className={cn("group flex flex-col", className)}>
      <Link href={`/tours/${t.slug}`} className="relative block aspect-[3/2] overflow-hidden bg-ivory-200" tabIndex={-1} aria-hidden="true">
        <Image src={t.image} alt="" fill priority={priority} sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
      </Link>
      <p className="eyebrow mt-6">
        {t.featured && <span>Most requested · </span>}
        {t.nights + 1} days · {t.regions.map(regionName).join(" · ")}
      </p>
      <h3 className="mt-2 text-h3">
        <Link href={`/tours/${t.slug}`} className="hover:text-brass-600">
          {t.title}
        </Link>
      </h3>
      <p className="eyebrow mt-3">{t.inclusionsLine.replace(/ · /g, " · ")}</p>
      {!compact && (
        <ul className="mt-5 space-y-2 text-[0.9375rem] text-charcoal-700">
          {t.highlights.slice(0, 4).map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
      <div className="mt-6 flex items-end justify-between gap-4 border-t border-ivory-200 pt-5">
        <div>
          <p className="eyebrow">From</p>
          <p className="mt-1 text-[1.75rem] font-medium leading-none tracking-tight">
            <Price usd={t.priceFromUsd} />
          </p>
          <p className="mt-1.5 text-xs text-charcoal-700">per person, complete package</p>
          <p className="mt-0.5 text-xs text-stone-400">
            ≈ <Price usd={t.priceFromUsd * 2} /> for two · international flights excluded
          </p>
        </div>
        <ButtonLink href={`/tours/${t.slug}`} size="sm" arrow>
          View itinerary
        </ButtonLink>
      </div>
    </article>
  );
}
