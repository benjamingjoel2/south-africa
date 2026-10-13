import type { Testimonial } from "@/data/types";
import { StarIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export function TestimonialCard({ t, className }: { t: Testimonial; className?: string }) {
  const initials = t.name
    .replace(/&.*/, "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <figure className={cn("relative flex w-[20rem] shrink-0 flex-col rounded-card border border-white/10 bg-surface p-6 md:w-[24rem]", className)}>
      {t.placeholder && (
        <span className="absolute right-4 top-4 rounded-full bg-protea/15 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-protea">
          Placeholder
        </span>
      )}
      <div className="flex gap-0.5 text-ochre-400" role="img" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: t.rating }).map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
      <blockquote className="mt-5 flex-1 text-body-lg text-white/85">“{t.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
        <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-full bg-teal text-sm font-semibold">
          {initials}
        </span>
        <span>
          <span className="block font-medium">{t.name}</span>
          <span className="block text-sm text-white/50">
            {t.from} · {t.trip}, {t.travelled}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
