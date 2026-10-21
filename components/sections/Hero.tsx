import Image from "next/image";
import Link from "next/link";
import { images } from "@/data/images";
import { site } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Type";

export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-label="Introduction">
      <div className="grid lg:grid-cols-[46%_54%]">
        <div className="px-6 pb-14 pt-12 md:px-10 lg:px-16 lg:py-20">
          <Eyebrow className="anim-fade-up">Tailor-made South Africa across eight regions</Eyebrow>
          <h1 className="anim-fade-up mt-5 text-display" style={{ animationDelay: "0.08s" }}>
            Start at the Cape,
            <br />
            <em className="accent">go beyond</em>.
          </h1>
          <p className="anim-fade-up mt-7 max-w-md text-lead text-charcoal-700" style={{ animationDelay: "0.18s" }}>
            From Table Mountain to the Sabi Sand, we craft private journeys to South Africa&rsquo;s most rewarding places. One named local specialist looks after everything, from your first message to the day you fly home.
          </p>
          <div className="anim-fade-up mt-8 flex flex-wrap items-center gap-x-6 gap-y-3" style={{ animationDelay: "0.26s" }}>
            <ButtonLink href="/plan-your-trip" arrow>
              Start planning
            </ButtonLink>
            <ButtonLink href="/about" variant="link" arrow>
              How we work
            </ButtonLink>
          </div>
          {site.included && (
            <p className="anim-fade-up mt-8 max-w-lg text-[0.8125rem] leading-relaxed text-charcoal-700" style={{ animationDelay: "0.34s" }}>
              <em className="font-display italic text-brass-600">{site.included.lead}</em> {site.included.text}{" "}
              <Link href={site.included.href} className="underline underline-offset-2 hover:text-charcoal-800">
                Details
              </Link>
            </p>
          )}
        </div>
        <div className="relative aspect-[4/3] bg-ivory-200 lg:aspect-auto lg:min-h-[32rem] lg:self-stretch lg:my-16">
          <Image
            src={images.heroCapeTown}
            alt="Aerial view of Cape Town and Table Mountain"
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 1024px) 54vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
