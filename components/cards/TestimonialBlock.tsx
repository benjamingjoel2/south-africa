import type { Testimonial } from "@/data/types";
import { StarIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export function TestimonialBlock({ t, className, tone = "light" }: { t: Testimonial; className?: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <figure className={cn("border-l-2 border-brass-500 pl-5", className)}>
      <div className="flex gap-0.5 text-brass-500" role="img" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: t.rating }).map((_, i) => (
          <StarIcon key={i} className="size-3" />
        ))}
      </div>
      <blockquote className={cn("mt-3 font-display text-[1.0625rem] italic leading-relaxed", dark ? "text-white/85" : "text-charcoal-700")}>
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className={cn("eyebrow mt-3 normal-case tracking-[0.08em]", dark ? "text-white/50" : "")}>
        {t.name}, {t.from} · {t.travelled} ·{" "}
        <span className={dark ? "text-brass-300" : "text-brass-600"}>Placeholder review</span>
      </figcaption>
    </figure>
  );
}
