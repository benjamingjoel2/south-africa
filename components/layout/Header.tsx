"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { CurrencySwitcher } from "./CurrencySwitcher";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The homepage hero is light (sand), so the bar uses dark text until the page scrolls.
  const onLight = pathname === "/" && !scrolled && !open;

  // Close the mobile menu on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500",
        scrolled || open
          ? "border-b border-white/10 bg-slate/85 backdrop-blur-xl"
          : onLight
            ? "border-b border-transparent bg-transparent"
            : "border-b border-transparent bg-gradient-to-b from-black/40 to-transparent",
      )}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <Logo tone={onLight ? "dark" : "light"} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {site.nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex items-center gap-1.5 text-[0.875rem] font-medium transition-colors",
                      onLight
                        ? active
                          ? "text-ink"
                          : "text-ink/65 hover:text-ink"
                        : active
                          ? "text-white"
                          : "text-white/55 hover:text-white",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "text-ochre-400 transition-transform duration-300 group-hover:rotate-90",
                        !active && "opacity-70",
                      )}
                    >
                      +
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          <CurrencySwitcher className="hidden sm:block" tone={onLight ? "dark" : "light"} />
          <ButtonLink href="/plan-your-trip" size="sm" className="hidden md:inline-flex" icon>
            Start planning
          </ButtonLink>
          <button
            type="button"
            className={cn(
              "relative flex size-10 items-center justify-center rounded-full border lg:hidden",
              onLight ? "border-ink/20" : "border-white/15",
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span
              className={cn(
                "absolute h-px w-4 transition-transform duration-300",
                onLight ? "bg-ink" : "bg-white",
                open ? "rotate-45" : "-translate-y-[3px]",
              )}
            />
            <span
              className={cn(
                "absolute h-px w-4 transition-transform duration-300",
                onLight ? "bg-ink" : "bg-white",
                open ? "-rotate-45" : "translate-y-[3px]",
              )}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 4.5rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-y-auto bg-slate lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x flex min-h-full flex-col pb-10 pt-6">
              <ul className="border-t border-white/10">
                {site.nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.5 }}
                    className="border-b border-white/10"
                  >
                    <Link href={item.href} className="flex items-center justify-between py-4 text-h3 font-medium">
                      {item.label}
                      <span aria-hidden="true" className="text-ochre-400">+</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-4 pt-10">
                <div className="flex items-center justify-between">
                  <span className="label text-white/50">Currency</span>
                  <CurrencySwitcher />
                </div>
                <ButtonLink href="/plan-your-trip" size="lg" fullWidth icon>
                  Start planning
                </ButtonLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
