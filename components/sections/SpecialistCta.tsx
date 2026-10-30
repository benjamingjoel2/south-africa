import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Type";

export function SpecialistCta({
  lead = "Plan a trip, the",
  accent = "unhurried",
  tail = "way",
  text = "Tell us when, who's coming and what you're hoping for. One named specialist looks after the rest.",
}: {
  lead?: string;
  accent?: string;
  tail?: string;
  text?: string;
}) {
  return (
    <section className="on-dark bg-forest-900 py-20 text-center lg:py-24" aria-label="Speak to a specialist">
      <div className="container-x">
        <Eyebrow className="text-brass-400">Speak to a South Africa specialist</Eyebrow>
        <h2 className="mx-auto mt-3 max-w-3xl text-h1 text-white">
          {lead} <em className="accent text-brass-300">{accent}</em> {tail}.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lead text-white/75">{text}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/plan-your-trip" variant="brass">
            Plan your trip
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline-light">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function BespokeLine() {
  return (
    <section className="py-16 text-center lg:py-20" aria-label="Bespoke travel">
      <p className="font-display-italic text-[1.5rem]">Planning something beyond the ordinary?</p>
      <ButtonLink href="/contact" variant="link" className="mt-4 border-b border-charcoal-800 pb-0.5 hover:border-brass-600">
        Private &amp; bespoke travel
      </ButtonLink>
    </section>
  );
}
