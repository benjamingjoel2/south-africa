"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { Planner } from "./Planner";
import { LogoMark } from "@/components/ui/Logo";

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
      // Simple focus trap
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]):not(.sr-only), select, textarea, [tabindex]:not([tabindex="-1"])',
        );
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
      <motion.button
        type="button"
        aria-label="Close planner"
        tabIndex={-1}
        onClick={close}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Plan your trip"
        tabIndex={-1}
        data-lenis-prevent
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-h-[94dvh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-t-[1.75rem] border border-white/10 bg-slate p-5 shadow-2xl focus:outline-none sm:rounded-[1.75rem] sm:p-10"
      >
        <div className="mb-8 flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm font-medium">
            <LogoMark className="size-6" /> Plan your trip
          </p>
          <div className="flex items-center gap-2">
            {/* The URL is already /plan-your-trip, so a reload renders the full page instead of the intercepted modal. */}
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="hidden text-sm text-white/50 underline-offset-2 hover:text-white hover:underline sm:block"
            >
              Open full page
            </button>
            <button
              type="button"
              onClick={close}
              aria-label="Close planner"
              className="flex size-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white hover:text-slate"
            >
              <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
                <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>
        <Planner variant="modal" onClose={close} />
      </motion.div>
    </div>
  );
}
