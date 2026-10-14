import Link from "next/link";
import type { Experience } from "@/data/types";
import { destinations } from "@/data/destinations";
import { ArrowRight } from "@/components/ui/Button";

export function ExperienceCell({ experience: e, tourCount }: { experience: Experience; tourCount: number }) {
  const places = e.destinationSlugs
    .map((s) => destinations.find((d) => d.slug === s))
    .filter(Boolean)
    .map((d) => d!.shortName ?? d!.name);
  return (
    <article className="group relative bg-ivory-50 p-8 transition-colors hover:bg-bone">
      <h3 className="text-h3">
        <Link href={`/experiences/${e.slug}`} className="after:absolute after:inset-0">
          {e.title}
        </Link>
      </h3>
      <p className="eyebrow mt-3">{places.join(" · ")}</p>
      <p className="group/btn mt-5 inline-flex items-center gap-2 text-eyebrow font-medium uppercase tracking-eyebrow text-charcoal-800">
        {tourCount} {tourCount === 1 ? "tour" : "tours"} <ArrowRight />
      </p>
    </article>
  );
}
