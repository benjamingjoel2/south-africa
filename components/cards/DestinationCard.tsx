import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/data/types";
import { regionName } from "@/data/tours";
import { ArrowRight } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function DestinationCard({ destination: d, tourCount, className, priority }: { destination: Destination; tourCount: number; className?: string; priority?: boolean }) {
  return (
    <article className={cn("group relative", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-ivory-200">
        <Image src={d.image} alt="" fill priority={priority} sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
      </div>
      <p className="eyebrow mt-5">{regionName(d.region)}</p>
      <h3 className="mt-2 text-h3">
        <Link href={`/destinations/${d.slug}`} className="after:absolute after:inset-0">
          {d.name}
        </Link>
      </h3>
      <p className="mt-2 text-[0.9375rem] text-charcoal-700">{d.tagline}</p>
      <p className="group/btn mt-3 inline-flex items-center gap-2 text-eyebrow font-medium uppercase tracking-eyebrow text-charcoal-800">
        {tourCount} {tourCount === 1 ? "tour" : "tours"} <ArrowRight />
      </p>
    </article>
  );
}
