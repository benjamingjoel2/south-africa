import { testimonials } from "@/data/testimonials";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Display } from "@/components/ui/Type";
import { TestimonialBlock } from "@/components/cards/TestimonialBlock";
import { SpecialistCta } from "@/components/sections/SpecialistCta";

export const metadata = buildMetadata({ title: "Guest Testimonials", description: "What travellers say about their tailor-made South Africa trips with Cape Compass: Cape Town, the Winelands, the Garden Route and private Kruger safaris.", path: "/testimonials" });

export default function TestimonialsPage() {
  return (
    <>
      <section className="container-x pt-12 lg:pt-16">
        <Breadcrumbs items={[{ name: "Testimonials", path: "/testimonials" }]} />
        <Display as="h1" size="h1" lead="From our" accent="guests" className="mt-5" />
        <p className="mt-5 max-w-2xl text-lead text-charcoal-700">
          Stories from travellers we have planned for. <span className="text-brass-600">All testimonials on this page are placeholders and must be replaced with real, consented reviews before launch.</span>
        </p>
      </section>
      <div className="container-x grid gap-x-10 gap-y-12 section-y md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <TestimonialBlock key={t.id} t={t} />
        ))}
      </div>
      <SpecialistCta />
    </>
  );
}
