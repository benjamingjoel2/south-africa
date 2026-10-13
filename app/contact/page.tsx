import { site, whatsappHref } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Display, Eyebrow } from "@/components/ui/Type";
import { SideCard } from "@/components/detail/SideCard";
import { ContactForm } from "@/components/detail/ContactForm";

export const metadata = buildMetadata({ title: "Contact Us", description: "Get in touch with a Cape Compass South Africa specialist by email, phone or WhatsApp.", path: "/contact" });

export default function ContactPage() {
  return (
    <div className="container-x grid gap-12 py-12 lg:grid-cols-12 lg:gap-16 lg:py-16">
      <div className="lg:col-span-7">
        <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
        <Display as="h1" size="h1" lead="Speak to a" accent="specialist" className="mt-5" />
        <p className="mt-5 max-w-xl text-lead text-charcoal-700">
          Our team is on the ground in Cape Town. Reach us by phone, WhatsApp or email, and a specialist will reply within one working day, usually much sooner.
        </p>

        <div className="mt-12 border-t border-ivory-200 pt-10">
          <Eyebrow>Three ways through</Eyebrow>
          <h2 className="mt-3 text-h2">Whichever is easiest.</h2>
          <div className="mt-8 divide-y divide-ivory-200 border-y border-ivory-200">
            <div className="py-6">
              <p className="eyebrow">Phone</p>
              <a href={site.contact.phoneHref} className="mt-2 block font-display text-[1.5rem] italic hover:text-brass-600">{site.contact.phone}</a>
              <p className="mt-1 text-sm text-charcoal-700">{site.contact.hours}</p>
            </div>
            <div className="py-6">
              <p className="eyebrow">WhatsApp</p>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="mt-2 block font-display text-[1.5rem] italic hover:text-brass-600">
                Message us on WhatsApp
              </a>
              <p className="mt-1 text-sm text-charcoal-700">+{site.contact.whatsappNumber} · 24/7 while you travel</p>
            </div>
            <div className="py-6">
              <p className="eyebrow">Email</p>
              <a href={`mailto:${site.contact.email}`} className="mt-2 block break-all font-display text-[1.5rem] italic hover:text-brass-600">{site.contact.email}</a>
            </div>
          </div>
          <p className="eyebrow mt-5">Headquartered in {site.contact.address}</p>
        </div>

        <div className="mt-12 border-t border-ivory-200 pt-10">
          <Eyebrow>Before you reach out</Eyebrow>
          <h2 className="mt-3 text-h2">Send us a note.</h2>
          <p className="mt-3 max-w-xl text-charcoal-700">
            For a tailored proposal, our <a href="/plan-your-trip" className="underline underline-offset-2">trip planner</a> is the fastest route. For anything else, write below.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>
      <div className="lg:col-span-4 lg:col-start-9">
        <SideCard rating className="lg:sticky lg:top-28">
          <div className="mt-6 border-t border-ivory-200 pt-5 text-center">
            <p className="eyebrow">Recognised by</p>
            <div className="mt-4 flex justify-center gap-4">
              {["Award placeholder", "Association placeholder"].map((l) => (
                <span key={l} className="flex size-20 items-center justify-center rounded-full border border-dashed border-stone-300 p-2 text-center text-[0.625rem] uppercase tracking-wider text-stone-400">{l}</span>
              ))}
            </div>
          </div>
        </SideCard>
      </div>
    </div>
  );
}
