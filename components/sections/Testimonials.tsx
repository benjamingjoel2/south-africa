import { testimonials } from "@/data/testimonials";
import { SectionHead } from "@/components/ui/SectionHead";
import { ButtonLink } from "@/components/ui/Button";
import { Marquee } from "@/components/motion/Marquee";
import { TestimonialCard } from "@/components/cards/TestimonialCard";

export function Testimonials() {
  return (
    <section className="section-y overflow-hidden border-t border-white/10" aria-label="Guest stories">
      <div className="container-x">
        <SectionHead
          label="Guest stories"
          title={["Trips people", "still talk about"]}
          description={
            <>
              A few words from travellers we&apos;ve planned for.{" "}
              <span className="text-protea">These are placeholders until real reviews are added.</span>
            </>
          }
          action={
            <ButtonLink href="/testimonials" variant="secondary" icon>
              Read more
            </ButtonLink>
          }
        />
      </div>
      <Marquee className="mt-14 md:mt-20" duration={70}>
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} t={t} />
        ))}
      </Marquee>
    </section>
  );
}
