import { stays } from "@/data/stays";
import type { Stay } from "@/data/types";
import { SectionHead } from "@/components/ui/Type";
import { ButtonLink } from "@/components/ui/Button";
import { StayCard } from "@/components/cards/StayCard";

export function LodgesBand({ list, lead = "A curated collection of South Africa's", accent = "finest" }: { list?: Stay[]; lead?: string; accent?: string }) {
  const items =
    list ??
    ["leadwood-ridge-lodge", "klipkop-wine-estate", "lions-head-townhouse", "outeniqua-cliffs-lodge"].map((s) => stays.find((x) => x.slug === s)!);
  return (
    <section className="on-dark bg-forest-900 section-y" aria-label="Lodges and stays">
      <div className="container-x">
        <SectionHead
          eyebrow="Stays"
          lead={lead}
          accent={accent}
          tone="dark"
          action={
            <ButtonLink href="/stays" variant="link-light" arrow>
              All stays
            </ButtonLink>
          }
        />
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s) => (
            <StayCard key={s.slug} stay={s} tone="dark" />
          ))}
        </div>
      </div>
    </section>
  );
}
