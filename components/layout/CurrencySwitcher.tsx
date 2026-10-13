"use client";

import { useEffect, useId, useRef, useState } from "react";
import { currencies, currencyCodes } from "@/config/site";
import { useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";

export function CurrencySwitcher({ className, align = "right" }: { className?: string; align?: "left" | "right" }) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
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
        aria-label={`Currency: ${currencies[currency].label}. Change currency`}
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 items-center gap-1.5 rounded-full border border-white/15 px-3.5 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
        suppressHydrationWarning
      >
        <span className="text-ochre-400" aria-hidden="true">{currencies[currency].symbol}</span>
        <span suppressHydrationWarning>{currency}</span>
        <svg viewBox="0 0 12 12" className={cn("size-3 transition-transform", open && "rotate-180")} aria-hidden="true">
          <path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>
      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Choose currency"
          className={cn(
            "absolute top-12 z-50 w-56 overflow-hidden rounded-2xl border border-white/10 bg-surface p-1.5 shadow-2xl",
            align === "right" ? "right-0" : "left-0",
          )}
        >
          {currencyCodes.map((code) => (
            <li key={code} role="option" aria-selected={code === currency}>
              <button
                type="button"
                onClick={() => {
                  setCurrency(code);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/5",
                  code === currency ? "text-white" : "text-white/60",
                )}
              >
                <span>
                  <span className="mr-2 inline-block w-6 text-ochre-400">{currencies[code].symbol}</span>
                  {currencies[code].label}
                </span>
                <span className="text-xs text-white/55">{code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
