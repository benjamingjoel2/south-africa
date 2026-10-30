import { site } from "@/config/site";
import { Display, Eyebrow } from "@/components/ui/Type";

export function WhyUs() {
  const years = new Date().getFullYear() - site.foundedYear;
  return (
    <section className="section-y" aria-label="Why Cape Compass">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Why Cape Compass</Eyebrow>
          <Display lead="A quietly confident way to" accent="see South Africa" className="mt-3" />
        </div>
        <div className="mx-auto mt-10 max-w-2xl space-y-5 text-lead text-charcoal-700">
          <p>
            Since {site.foundedYear} we have planned tailor-made trips across eight South African regions from our base in Cape Town. Every lodge we recommend is one our specialists have stayed in; every itinerary is one we would book ourselves.
          </p>
          <p>
            You pay direct local rates, never a markup, and booking through us adds a dedicated specialist who designs the trip, books every piece of it, briefs you before you fly and stays with you until you&rsquo;re home. {years}+ years in, that is still the whole idea.
          </p>
        </div>
      </div>
    </section>
  );
}
