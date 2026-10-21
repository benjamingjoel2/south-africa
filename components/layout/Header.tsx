"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import type { Menu, MenuKey } from "./menus";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { ChevronDown } from "@/components/ui/Icons";
import { CurrencySwitcher } from "./CurrencySwitcher";


export function Header({ menus }: { menus: Record<MenuKey, Menu> }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<number | null>(null);

  // Close everything on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
    setMobile(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobile]);

  const show = (key: MenuKey) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(key);
  };
  const hide = () => {
    closeTimer.current = window.setTimeout(() => setOpen(null), 120);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ivory-200 bg-ivory-50" onMouseLeave={hide} onMouseEnter={() => closeTimer.current && window.clearTimeout(closeTimer.current)}>
      <div className="container-x flex h-[4.25rem] items-center justify-between gap-6 lg:h-20">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {site.nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              const cls = cn(
                "flex h-20 items-center gap-1.5 text-eyebrow font-medium uppercase tracking-eyebrow transition-colors",
                active || open === item.menu ? "text-charcoal-800" : "text-charcoal-700 hover:text-charcoal-800",
              );
              return (
                <li key={item.href} onMouseEnter={() => (item.menu ? show(item.menu) : setOpen(null))}>
                  {item.menu ? (
                    <button
                      type="button"
                      className={cls}
                      aria-expanded={open === item.menu}
                      aria-controls={`menu-${item.menu}`}
                      onClick={() => setOpen(open === item.menu ? null : item.menu!)}
                    >
                      {item.label}
                      <ChevronDown className={cn("transition-transform", open === item.menu && "rotate-180")} />
                    </button>
                  ) : (
                    <Link href={item.href} className={cls} aria-current={active ? "page" : undefined}>
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink href="/plan-your-trip" className="hidden md:inline-flex">
            Start planning
          </ButtonLink>
          <button
            type="button"
            className="relative flex size-10 items-center justify-center lg:hidden"
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            aria-controls="mobile-menu"
            onClick={() => setMobile((m) => !m)}
          >
            <span className={cn("absolute h-px w-5 bg-charcoal-800 transition-transform duration-300", mobile ? "rotate-45" : "-translate-y-[4px]")} />
            <span className={cn("absolute h-px w-5 bg-charcoal-800 transition-transform duration-300", mobile ? "-rotate-45" : "translate-y-[4px]")} />
          </button>
        </div>
      </div>

      {/* Mega menu */}
      {open && (
        <div
          id={`menu-${open}`}
          className="absolute inset-x-0 top-full hidden border-b border-ivory-200 bg-ivory-50 shadow-[0_24px_40px_-30px_rgb(25_24_19/0.35)] lg:block"
          onMouseEnter={() => show(open)}
        >
          <div className="container-x grid grid-cols-3 gap-10 py-10">
            {menus[open].columns.map((col) => (
              <div key={col.title}>
                <p className="eyebrow text-brass-600">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[0.9375rem] text-charcoal-800 transition-colors hover:text-brass-600">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-3 pt-2">
              <Link href={menus[open].all.href} className="group/btn inline-flex items-center gap-2 text-eyebrow font-medium uppercase tracking-eyebrow text-brass-600 hover:text-charcoal-800">
                {menus[open].all.label} <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      {mobile && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[4.25rem] z-40 overflow-y-auto bg-ivory-50 lg:hidden">
          <nav aria-label="Mobile" className="container-x pb-10 pt-2">
            <ul className="divide-y divide-ivory-200 border-b border-ivory-200">
              {site.nav.map((item) =>
                item.menu ? (
                  <li key={item.href}>
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-display text-h4 [&::-webkit-details-marker]:hidden">
                        {item.label}
                        <ChevronDown className="size-3.5 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="grid gap-6 pb-5 sm:grid-cols-3">
                        {menus[item.menu].columns.map((col) => (
                          <div key={col.title}>
                            <p className="eyebrow text-brass-600">{col.title}</p>
                            <ul className="mt-3 space-y-2.5">
                              {col.links.map((l) => (
                                <li key={l.href}>
                                  <Link href={l.href} className="text-[0.9375rem] text-charcoal-700">
                                    {l.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <Link href={menus[item.menu].all.href} className="text-eyebrow font-medium uppercase tracking-eyebrow text-brass-600">
                          {menus[item.menu].all.label} →
                        </Link>
                      </div>
                    </details>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link href={item.href} className="flex items-center justify-between py-4 font-display text-h4">
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
              {site.topBar.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="block py-3.5 text-[0.9375rem] text-charcoal-700">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between">
              <span className="eyebrow">Currency</span>
              <CurrencySwitcher tone="dark" />
            </div>
            <ButtonLink href="/plan-your-trip" size="lg" fullWidth arrow className="mt-6">
              Start planning
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}
