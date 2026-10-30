import Link from "next/link";
import { site } from "@/config/site";
import { tours } from "@/data/tours";
import { getAllPosts } from "@/lib/blog";
import { Logo } from "@/components/ui/Logo";

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-display text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-brass-400">{title}</p>
      <ul className="mt-5 space-y-3 text-[0.9375rem] text-white/80">{children}</ul>
    </div>
  );
}

const L = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link href={href} className="transition-colors hover:text-white">
      {children}
    </Link>
  </li>
);

export function Footer() {
  const year = new Date().getFullYear();
  const posts = getAllPosts().slice(0, 4);
  const featured = [...tours].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)).slice(0, 5);

  return (
    <footer className="bg-forest-900 text-white">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-3">
          <Logo tone="light" size="lg" />
          <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-white/70">
            Tailor-made South Africa trips, from Cape Town and the Winelands to Kruger&rsquo;s private reserves, designed by one dedicated local specialist.
          </p>
          <ul className="mt-6 space-y-2 text-[0.9375rem] text-white/85">
            <li>
              <a href={`mailto:${site.contact.email}`} className="hover:text-white">{site.contact.email}</a>
            </li>
            <li className="text-white/70">{site.contact.address}</li>
          </ul>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-[1.1fr_1.5fr_1fr_1fr] lg:gap-8">
          <Col title="Featured tours">
            {featured.map((t) => (
              <L key={t.slug} href={`/tours/${t.slug}`}>{t.title}</L>
            ))}
          </Col>
          <Col title="Popular reads">
            {posts.map((p) => (
              <L key={p.slug} href={`/blog/${p.slug}`}>{p.title}</L>
            ))}
          </Col>
          <div className="space-y-10">
            <Col title="About">
              <L href="/about">Why travel with us</L>
              <L href="/about#story">Our story</L>
              <L href="/faq">FAQ</L>
            </Col>
          </div>
          <div className="space-y-10">
            <Col title="Practical">
              <L href="/plan-your-trip">Plan your trip</L>
              <L href="/destinations">Destinations</L>
              <L href="/stays">Where to stay</L>
              <L href="/contact">Contact us</L>
            </Col>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-4 text-[0.8125rem] text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <ul className="flex gap-6">
            {site.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
