import Image from "next/image";
import Link from "next/link";
import { images } from "@/data/images";
import { site, whatsappHref } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionLabel } from "@/components/ui/SectionHead";
import { ContactForm } from "@/components/sections/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";

export const metadata = buildMetadata({
  title: "Contact Us",
  description: "Get in touch with a Cape Compass South Africa specialist by email, phone or WhatsApp.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pt-28 md:pt-36">
      <div className="container-x">
        <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      </div>
      <div className="container-x mt-12 grid gap-12 pb-24 lg:grid-cols-12 lg:gap-16">
        <div className="relative hidden overflow-hidden rounded-card lg:col-span-5 lg:block">
          <Image src={images.capeTown2} alt="Camps Bay beach beneath the Twelve Apostles, Cape Town" fill sizes="40vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate/90 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8">
            <p className="label text-white/60">Office</p>
            <p className="mt-2 text-h4 font-semibold">{site.contact.address}</p>
            <p className="mt-2 text-sm text-white/65">{site.contact.hours}</p>
          </div>
        </div>
        <div className="lg:col-span-7">
          <SectionLabel>Contact</SectionLabel>
          <h1 className="mt-5 text-h1 font-semibold">Get in touch</h1>
          <p className="mt-5 max-w-xl text-body-xl text-white/60">
            Questions, ideas, half-formed plans: we&apos;d love to hear them. For a tailored proposal, our{" "}
            <Link href="/plan-your-trip" className="text-white underline underline-offset-2">trip planner</Link> is the fastest route.
          </p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            <li>
              <a href={`mailto:${site.contact.email}`} className="block rounded-2xl border border-white/10 p-5 transition-colors hover:border-ochre">
                <span className="label text-white/55">Email</span>
                <span className="mt-2 block break-all font-medium">{site.contact.email}</span>
              </a>
            </li>
            <li>
              <a href={site.contact.phoneHref} className="block rounded-2xl border border-white/10 p-5 transition-colors hover:border-ochre">
                <span className="label text-white/55">Phone</span>
                <span className="mt-2 block font-medium">{site.contact.phone}</span>
              </a>
            </li>
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-white/10 p-5 transition-colors hover:border-[#25D366]">
                <span className="label flex items-center gap-1.5 text-white/55"><WhatsAppIcon className="size-3.5" /> WhatsApp</span>
                <span className="mt-2 block font-medium">+{site.contact.whatsappNumber}</span>
              </a>
            </li>
          </ul>

          <div className="mt-12 border-t border-white/10 pt-12">
            <ContactForm />
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-4 rounded-card bg-teal p-6">
            <p className="flex-1 font-medium">Ready to start planning properly?</p>
            <ButtonLink href="/plan-your-trip" icon>Plan your trip</ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
