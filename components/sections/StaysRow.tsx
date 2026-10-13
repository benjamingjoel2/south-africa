import { stays } from "@/data/stays";
import type { Stay } from "@/data/types";
import { SectionHead } from "@/components/ui/SectionHead";
import { ButtonLink } from "@/components/ui/Button";
import { Stagger } from "@/components/motion/Reveal";
import { StayCard } from "@/components/cards/StayCard";

export function StaysRow({
  list,
  label = "Where you'll stay",
  title = ["Stays with", "a sense of place"],
}: {
  list?: Stay[];
  label?: string;
  title?: string[];
}) {
  // Default: one of each type for variety
  const items =
    list ??
    ["Boutique hotel", "Wine estate", "Coastal lodge", "Private game lodge", "Mountain lodge"]
      .map((type) => stays.find((s) => s.type === type)!)
      .slice(0, 4);
  return (
    <section className="section-y border-t border-white/10" aria-label="Stays">
      <div className="container-x">
        <SectionHead
          variant="end"
          label={label}
          title={title}
          description="Boutique hotels, wine estates, coastal and mountain lodges, and private game lodges, all personally inspected."
          action={
            <ButtonLink href="/stays" variant="secondary" icon>
              All stays
            </ButtonLink>
          }
        />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-20" amount={0.05}>
          {items.map((s) => (
            <StayCard key={s.slug} stay={s} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
