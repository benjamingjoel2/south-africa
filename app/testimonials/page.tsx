import { testimonials } from "@/data/testimonials";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata = buildMetadata({
  title: "Guest Testimonials",
  description: "What travellers say about their tailor-made South Africa trips with Cape Compass.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        label="Guest stories"
        title={["Trips people", "still talk about"]}
        description={
          <>
            Stories from travellers we&apos;ve planned for.{" "}
            <span className="text-protea">All testimonials on this page are placeholders and must be replaced with real, consented reviews before launch.</span>
          </>
        }
        crumbs={[{ name: "Testimonials", path: "/testimonials" }]}
      />
      <div className="container-x section-y">
        <Stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <TestimonialCard t={t} className="h-full w-full md:w-full" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
      <FinalCta />
    </>
  );
}
