"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { Planner } from "./Planner";
import { CrossIcon } from "@/components/ui/Icons";

export function PlannerModal() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => router.back(), [router]);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]):not(.sr-only), select, textarea, [tabindex]:not([tabindex="-1"])');
        const list = Array.from(f).filter((el) => el.offsetParent !== null || el.classList.contains("sr-only"));
        if (!list.length) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, [close]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <button type="button" aria-label="Close planner" tabIndex={-1} onClick={close} className="anim-fade absolute inset-0 bg-charcoal-800/60" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Plan your trip"
        tabIndex={-1}
        className="anim-fade-up relative max-h-[94dvh] w-full max-w-3xl overflow-y-auto overscroll-contain border border-ivory-200 bg-ivory-50 p-6 shadow-2xl focus:outline-none sm:p-10"
      >
        <div className="mb-8 flex items-center justify-between">
          <p className="eyebrow">Plan your trip</p>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => window.location.reload()} className="hidden text-sm text-charcoal-700 underline underline-offset-2 hover:text-charcoal-800 sm:block">
              Open full page
            </button>
            <button type="button" onClick={close} aria-label="Close planner" className="flex size-9 items-center justify-center border border-charcoal-800 hover:bg-charcoal-800 hover:text-white">
              <CrossIcon className="size-3.5" />
            </button>
          </div>
        </div>
        <Planner variant="modal" onClose={close} />
      </div>
    </div>
  );
}
