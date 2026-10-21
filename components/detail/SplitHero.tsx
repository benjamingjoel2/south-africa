import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";

/** Text left, photo bleeding to the right edge. Used by listing and destination pages. */
export function SplitHero({
  crumbs,
  eyebrow,
  title,
  accent,
  subtitle,
  text,
  cta,
  image,
  imageAlt,
  className,
}: {
  crumbs?: { name: string; path: string }[];
  eyebrow?: string;
  title: string;
  accent?: string;
  subtitle?: string;
  text?: string;
  cta?: { label: string; href: string };
  image: string;
  imageAlt: string;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden", className)} aria-label={title}>
      <div className="grid lg:grid-cols-[46%_54%]">
        <div className="px-6 pb-12 pt-10 md:px-10 lg:px-16 lg:py-16">
          {crumbs ? <Breadcrumbs items={crumbs} /> : eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-5 text-h1">
            {title}
            {accent && (
              <>
                {" "}
                <em className="accent">{accent}</em>
              </>
            )}
          </h1>
          {subtitle && <p className="mt-5 font-display-italic text-[1.5rem] leading-snug text-charcoal-700">{subtitle}</p>}
          {text && <p className="mt-5 max-w-lg text-lead text-charcoal-700">{text}</p>}
          {cta && (
            <ButtonLink href={cta.href} arrow className="mt-8">
              {cta.label}
            </ButtonLink>
          )}
        </div>
        <div className="relative aspect-[4/3] bg-ivory-200 lg:aspect-auto lg:min-h-[28rem] lg:my-12">
          <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 54vw, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
