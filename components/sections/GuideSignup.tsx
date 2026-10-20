"use client";

import Image from "next/image";
import { useState } from "react";
import { images } from "@/data/images";
import { Eyebrow } from "@/components/ui/Type";

export function GuideSignup() {
  const [email, setEmail] = useState("");
  const [monthly, setMonthly] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: monthly ? "south-africa-guide+monthly" : "south-africa-guide" }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="border-t border-ivory-200 bg-ivory-100 section-y" aria-label="The South Africa Guide">
      <div className="container-x grid items-center gap-10 lg:grid-cols-12">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden bg-ivory-200 shadow-xl lg:col-span-4">
          <Image src={images.newsletter} alt="Preview of The South Africa Guide" fill sizes="320px" className="object-cover" />
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Eyebrow tone="brass">Free guide</Eyebrow>
          <h2 className="mt-3 text-h2">The South Africa Guide</h2>
          <p className="mt-4 max-w-xl text-lead text-charcoal-700">
            South Africa&rsquo;s icons shaped into one plan: Cape Town, the Winelands, the Garden Route and Kruger&rsquo;s private reserves, with when to go and how long to stay.
          </p>
          <div className="mt-7 max-w-xl">
            {status === "success" ? (
              <p role="status" className="border border-ivory-200 bg-ivory-50 p-4 text-[0.9375rem]">
                <span className="font-medium">It&rsquo;s on its way.</span> Check your inbox for The South Africa Guide.
              </p>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <label htmlFor="guide-email" className="sr-only">Email address</label>
                  <input
                    id="guide-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    aria-invalid={status === "error"}
                    className="h-12 flex-1 border border-ivory-200 bg-ivory-50 px-4 text-[0.9375rem] placeholder:text-stone-400 focus:border-charcoal-800 focus:outline-none"
                  />
                  <button type="submit" disabled={status === "loading"} className="h-12 bg-forest-700 px-6 text-eyebrow font-medium uppercase tracking-eyebrow text-white hover:bg-forest-900 disabled:opacity-60">
                    {status === "loading" ? "Sending…" : "Get the guide"}
                  </button>
                </div>
                {status === "error" && <p className="mt-2 text-sm text-brass-600" role="alert">Please enter a valid email address.</p>}
                <label className="mt-3 flex items-center gap-2 text-[0.8125rem] text-charcoal-700">
                  <input type="checkbox" checked={monthly} onChange={(e) => setMonthly(e.target.checked)} className="size-3.5 accent-[var(--color-forest-700)]" />
                  Also subscribe to travel ideas, monthly
                </label>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
