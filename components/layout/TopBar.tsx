import Link from "next/link";
import { site } from "@/config/site";
import { ArrowRight } from "@/components/ui/Button";
import { CurrencySwitcher } from "./CurrencySwitcher";

export function TopBar() {
  const { items, cta, links } = site.topBar;
  return (
    <div className="bg-forest-900 text-white">
      <div className="container-x flex h-9 items-center justify-between gap-6">
        <p className="eyebrow flex min-w-0 items-center gap-3 overflow-hidden whitespace-nowrap text-white/80">
          {items.map((t, i) => (
            <span key={t} className={i > 0 ? "hidden md:inline" : "hidden sm:inline"}>
              {i > 0 && <span className="mr-3 text-white/40">·</span>}
              {t}
            </span>
          ))}
          <span className="hidden lg:inline text-white/40">·</span>
          <Link href={cta.href} className="group/btn inline-flex items-center gap-2 text-brass-300 hover:text-brass-400">
            {cta.label} <ArrowRight className="h-2 w-3" />
          </Link>
        </p>
        <div className="flex shrink-0 items-center gap-5 text-[0.8125rem]">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hidden text-white/85 transition-colors hover:text-white sm:inline">
              {l.label}
            </Link>
          ))}
          <CurrencySwitcher />
        </div>
      </div>
    </div>
  );
}
