import Image from "next/image";
import { images } from "@/data/images";
import { site, whatsappHref } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Planner } from "@/components/planner/Planner";
import { SectionLabel } from "@/components/ui/SectionHead";
import { ChatIcon, CompassIcon, ShieldIcon } from "@/components/ui/Icons";

export const metadata = buildMetadata({
  title: "Plan Your Trip",
  description: "Tell us about your dream South Africa trip in five quick steps. A dedicated local specialist will reply within one working day.",
  path: "/plan-your-trip",
  image: images.winelands,
});

export default function PlanYourTripPage() {
  return (
    <div className="container-x grid gap-12 pb-24 pt-28 md:pt-36 lg:grid-cols-12 lg:gap-16">
      <aside className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <SectionLabel>Plan your trip</SectionLabel>
          <h1 className="mt-5 text-h2 font-semibold">Let&apos;s design your South Africa.</h1>
          <p className="mt-5 text-body-lg text-white/60">
            Five quick steps, about two minutes. No payment, no obligation, just the start of a conversation with your own local specialist.
          </p>
          <div className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-card lg:block">
            <Image src={images.winelands} alt="" fill sizes="30vw" className="object-cover" />
          </div>
          <ul className="mt-8 space-y-4 text-sm text-white/70">
            <li className="flex gap-3">
              <CompassIcon className="size-5 text-ochre" /> One dedicated specialist from start to finish
            </li>
            <li className="flex gap-3">
              <ShieldIcon className="size-5 text-ochre" /> Vetted guides, lodges and transfers
            </li>
            <li className="flex gap-3">
              <ChatIcon className="size-5 text-ochre" /> Prefer to chat?{" "}
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-2">
                WhatsApp us
              </a>{" "}
              or email {site.contact.email}
            </li>
          </ul>
        </div>
      </aside>
      <div className="rounded-[1.75rem] border border-white/10 bg-surface/50 p-5 sm:p-10 lg:col-span-8">
        <Planner />
      </div>
    </div>
  );
}
