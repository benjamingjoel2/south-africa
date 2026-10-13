import Image from "next/image";
import Link from "next/link";
import { site, whatsappHref } from "@/config/site";
import { images } from "@/data/images";
import { Logo } from "@/components/ui/Logo";
import { NdebeleLine } from "@/components/ui/NdebeleLine";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-slate-900">
      <NdebeleLine />
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            src={images.footer}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900" />
        </div>

        <div className="container-x relative grid gap-14 pb-12 pt-20 md:pt-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm text-white/60">
              Tailor-made South Africa trips with one dedicated local specialist, from your first message to the day you fly home.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              <li>
                <a href={`mailto:${site.contact.email}`} className="text-white/80 transition-colors hover:text-ochre-400">
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a href={site.contact.phoneHref} className="text-white/80 transition-colors hover:text-ochre-400">
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 transition-colors hover:text-ochre-400"
                >
                  WhatsApp · +{site.contact.whatsappNumber}
                </a>
              </li>
              <li className="text-white/50">{site.contact.address}</li>
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            {site.footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <p className="label text-white/55">{group.title}</p>
                <ul className="mt-5 space-y-2">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="group inline-flex items-center gap-2 text-h4 font-medium text-white transition-colors hover:text-ochre-400"
                      >
                        <span aria-hidden="true" className="text-ochre-400 transition-transform group-hover:rotate-90">+</span>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <p className="label text-white/55">Follow</p>
              <ul className="mt-5 space-y-2">
                {site.social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-h4 font-medium text-white/80 transition-colors hover:text-ochre-400"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="container-x relative">
          <p
            aria-hidden="true"
            className="select-none whitespace-nowrap text-[clamp(3rem,13.5vw,11rem)] font-semibold leading-[0.8] tracking-[-0.06em] text-white/[0.06]"
          >
            Cape Compass
          </p>
        </div>

        <div className="relative border-t border-white/10">
          <div className="container-x flex flex-col gap-4 py-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
            <p>
              © {year} {site.name}. All rights reserved. Registered tour operator (details TBC).
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {site.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
