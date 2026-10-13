"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { images } from "@/data/images";
import { Eyebrow } from "@/components/ui/Type";
import { CrossIcon, ShieldIcon } from "@/components/ui/Icons";

const KEY = "cc-guide-popup";

/** Delayed, once-per-visitor guide offer. Mirrors the reference's brochure pop-up. */
export function GuidePopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [monthly, setMonthly] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname.startsWith("/plan-your-trip") || pathname.startsWith("/contact")) return;
    let seen = false;
    try {
      seen = !!window.localStorage.getItem(KEY);
    } catch {}
    if (seen) return;
    const t = window.setTimeout(() => setOpen(true), 9000);
    return () => window.clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    try {
      window.localStorage.setItem(KEY, "dismissed");
    } catch {}
    setOpen(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: monthly ? "guide-popup+monthly" : "guide-popup" }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      try {
        window.localStorage.setItem(KEY, "subscribed");
      } catch {}
    } catch {
      setStatus("error");
    }
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button type="button" aria-label="Close" tabIndex={-1} onClick={close} className="absolute inset-0 bg-charcoal-800/60" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Free guide"
        tabIndex={-1}
        className="relative w-full max-w-3xl overflow-hidden bg-bone text-charcoal-800 shadow-2xl focus:outline-none"
      >
        <button type="button" onClick={close} aria-label="Close" className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full border border-charcoal-800 bg-ivory-50 hover:bg-charcoal-800 hover:text-white">
          <CrossIcon className="size-3.5" />
        </button>
        <div className="grid md:grid-cols-2">
          <div className="p-7 md:p-8">
            <Eyebrow tone="brass">Free guide</Eyebrow>
            <h2 className="mt-2 text-h2">The South Africa Guide</h2>
            <span className="mt-4 block h-px w-12 bg-brass-500" aria-hidden="true" />
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-charcoal-700">
              Seasons, routes and safari know-how from our specialists, shaped for a first trip or a bucket-list one.
            </p>
            <p className="mt-4 text-[0.9375rem]">
              Cape Town <span className="text-brass-500">•</span> Winelands
              <br />
              Garden Route <span className="text-brass-500">•</span> Kruger &amp; the private reserves
            </p>
            <p className="mt-4 font-display italic text-brass-600">The icons, in one guide.</p>
          </div>
          <div className="relative hidden min-h-64 md:block">
            <Image src={images.sabiSand} alt="" fill sizes="384px" className="object-cover" />
          </div>
        </div>
        <div className="border-t border-ivory-200 bg-ivory-100 p-7 md:p-8">
          {status === "done" ? (
            <p role="status" className="text-[0.9375rem]">
              <span className="font-medium">It&rsquo;s on its way.</span> Check your inbox for The South Africa Guide.
            </p>
          ) : (
            <form onSubmit={submit} noValidate>
              <label htmlFor="popup-email" className="eyebrow block text-charcoal-700">Get your free guide</label>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  id="popup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  aria-invalid={status === "error"}
                  className="h-12 flex-1 border border-ivory-200 bg-ivory-50 px-4 text-[0.9375rem] placeholder:text-stone-400 focus:border-charcoal-800 focus:outline-none"
                />
                <button type="submit" disabled={status === "sending"} className="h-12 bg-forest-700 px-6 text-eyebrow font-medium uppercase tracking-eyebrow text-white hover:bg-forest-900 disabled:opacity-60">
                  {status === "sending" ? "Sending…" : "Email me the guide"}
                </button>
              </div>
              {status === "error" && <p className="mt-2 text-sm text-brass-600">Please enter a valid email address.</p>}
              <label className="mt-3 flex items-center gap-2 text-[0.8125rem] text-charcoal-700">
                <input type="checkbox" checked={monthly} onChange={(e) => setMonthly(e.target.checked)} className="size-3.5 accent-[var(--color-forest-700)]" />
                Also subscribe to travel ideas, monthly
              </label>
            </form>
          )}
        </div>
        <p className="flex items-center justify-center gap-2 border-t border-ivory-200 py-3 text-xs text-charcoal-700">
          <ShieldIcon className="size-3.5" /> Your details are safe with us. No spam, ever.
        </p>
      </div>
    </div>
  );
}
