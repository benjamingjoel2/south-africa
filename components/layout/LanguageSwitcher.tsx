"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LOCALES = [
  { code: "en", label: "EN", name: "English" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "es", label: "ES", name: "Español" },
] as const;

/** Splits "/fr/tours/x" into ["fr", "/tours/x"]; English has no prefix. */
function split(pathname: string): [string, string] {
  const m = pathname.match(/^\/(fr|de|es)(?=\/|$)(.*)$/);
  return m ? [m[1], m[2] || "/"] : ["en", pathname || "/"];
}

/** EN · FR · DE · ES: links to the same page in each language. No automatic redirects. */
export function LanguageSwitcher({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const [current, rest] = split(usePathname() || "/");
  return (
    <nav aria-label="Language" className={cn("text-eyebrow font-medium uppercase tracking-eyebrow", className)}>
      <ul className="flex items-center">
        {LOCALES.map((l, i) => {
          const href = l.code === "en" ? rest : `/${l.code}${rest === "/" ? "" : rest}`;
          const active = l.code === current;
          return (
            <li key={l.code} className="flex items-center">
              {i > 0 && <span aria-hidden className={cn("px-1.5", tone === "light" ? "text-white/40" : "text-stone-400")}>·</span>}
              <a
                href={href}
                hrefLang={l.code}
                lang={l.code}
                title={l.name}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "py-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-600",
                  tone === "light"
                    ? active ? "text-white underline underline-offset-4" : "text-white/75 hover:text-white"
                    : active ? "text-charcoal-800 underline underline-offset-4" : "text-charcoal-700 hover:text-brass-600",
                )}
              >
                {l.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
