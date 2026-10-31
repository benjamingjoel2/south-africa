import { faqs, VERIFY_NOTICE } from "@/data/faqs";
import { buildMetadata, JsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Display, Eyebrow } from "@/components/ui/Type";
import { FaqAccordion } from "@/components/detail/FaqAccordion";
import { SpecialistCta } from "@/components/sections/SpecialistCta";

export const metadata = buildMetadata({
  title: "South Africa Travel FAQ",
  description: "Answers to common South Africa travel questions: visas, children's documents, safety, malaria, best time to visit, getting around, tipping and money.",
  path: "/faq",
});

export default function FaqPage() {
  const categories = Array.from(new Set(faqs.map((f) => f.category)));
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }} />
      <section className="container-x pt-12 lg:pt-16">
        <Breadcrumbs items={[{ name: "FAQ", path: "/faq" }]} />
        <Display as="h1" size="h1" lead="Good questions," accent="answered" className="mt-5" />
        <p className="mt-5 max-w-2xl text-lead text-charcoal-700">Everything travellers usually ask us before booking. Can&rsquo;t find what you need? Message your specialist any time.</p>
        <p className="mt-6 max-w-2xl border-l-2 border-brass-500 bg-ivory-100 px-4 py-3 text-sm text-charcoal-700">
          <span className="font-medium text-charcoal-800">Note:</span> {VERIFY_NOTICE}
        </p>
      </section>
      <div className="container-x space-y-14 section-y">
        {categories.map((c) => (
          <section key={c} className="grid gap-6 lg:grid-cols-12" aria-labelledby={`faq-${c}`}>
            <Eyebrow as="p" className="lg:col-span-3 lg:pt-6">
              <span id={`faq-${c}`}>{c}</span>
            </Eyebrow>
            <div className="lg:col-span-9">
              <FaqAccordion items={faqs.filter((f) => f.category === c)} />
            </div>
          </section>
        ))}
      </div>
      <SpecialistCta />
    </>
  );
}
