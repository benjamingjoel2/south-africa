"use client";

import { useEffect, useId, useRef, useState } from "react";
import { currencies, currencyCodes, type CurrencyCode } from "@/config/site";
import { useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { ChevronDown } from "@/components/ui/Icons";

const flags: Record<CurrencyCode, string> = { USD: "🇺🇸", EUR: "🇪🇺", GBP: "🇬🇧", CAD: "🇨🇦", ZAR: "🇿🇦" };

export function CurrencySwitcher({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${currency}: change display currency (currently ${currencies[currency].label})`}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-8 items-center gap-1.5 text-[0.8125rem] font-medium transition-colors",
          tone === "light" ? "text-white/85 hover:text-white" : "text-charcoal-800",
        )}
        suppressHydrationWarning
      >
        <span aria-hidden="true">{flags[currency]}</span>
        <span suppressHydrationWarning>{currency}</span>
        <ChevronDown className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Display currency"
          className="absolute right-0 top-9 z-50 w-56 border border-ivory-200 bg-ivory-50 py-1.5 text-charcoal-800 shadow-xl"
        >
          <li className="eyebrow px-4 py-2">Display currency</li>
          {currencyCodes.map((code) => (
            <li key={code} role="option" aria-selected={code === currency}>
              <button
                type="button"
                onClick={() => {
                  setCurrency(code);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors hover:bg-ivory-100",
                  code === currency ? "text-charcoal-800" : "text-charcoal-700",
                )}
              >
                <span>
                  <span className="mr-2" aria-hidden="true">{flags[code]}</span>
                  {currencies[code].label}
                </span>
                <span className="text-xs text-stone-400">{code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
