import Image from "next/image";
import { images } from "@/data/images";
import { whatsappHref } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";

export function FinalCta({
  title = ["Your South Africa", "starts with a message."],
  text = "Tell us a little about your trip and your dedicated specialist will reply within one working day, with ideas, honest advice and no obligation.",
}: {
  title?: string[];
  text?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden" aria-label="Plan your trip">
      <Parallax className="absolute inset-0 -z-10" offset={60}>
        <Image src={images.ctaBand} alt="" fill sizes="100vw" className="object-cover" />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate via-slate/60 to-slate/30" />
      <div className="container-x py-32 text-center md:py-44">
        <SplitReveal lines={title} className="mx-auto max-w-5xl text-h1 font-semibold" />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-body-xl text-white/80">{text}</p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/plan-your-trip" size="lg" icon>
            Plan your trip
          </ButtonLink>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-white/25 bg-white/5 px-8 font-medium backdrop-blur transition-colors hover:border-[#25D366] hover:bg-[#25D366]"
          >
            <WhatsAppIcon className="size-5" />
            Chat on WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
