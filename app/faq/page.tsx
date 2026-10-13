import { faqs, VERIFY_NOTICE } from "@/data/faqs";
import { buildMetadata, JsonLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { FaqList } from "@/components/sections/FaqList";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata = buildMetadata({
  title: "South Africa Travel FAQ",
  description:
    "Visas, children's documents, safety, malaria, best time to visit, getting around, safari etiquette, tipping and money: answers to common South Africa travel questions.",
  path: "/faq",
});

export default function FaqPage() {
  const categories = Array.from(new Set(faqs.map((f) => f.category)));
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
        }}
      />
      <PageHero
        label="FAQ"
        title={["Good questions,", "honest answers"]}
        description="Everything travellers usually ask us before booking. Can't find what you need? Message your specialist any time."
        crumbs={[{ name: "FAQ", path: "/faq" }]}
      />
      <div className="container-x section-y">
        <p className="mb-14 rounded-2xl border border-protea/30 bg-protea/10 p-5 text-sm text-protea md:ml-[25%]">
          <strong className="font-semibold">Note:</strong> {VERIFY_NOTICE}
        </p>
        <div className="space-y-16">
          {categories.map((c) => (
            <section key={c} className="grid gap-6 md:grid-cols-12" aria-labelledby={`faq-${c}`}>
              <h2 id={`faq-${c}`} className="label text-white/50 md:col-span-3 md:pt-6">
                {c}
              </h2>
              <div className="md:col-span-9">
                <FaqList items={faqs.filter((f) => f.category === c)} />
              </div>
            </section>
          ))}
        </div>
      </div>
      <FinalCta />
    </>
  );
}
