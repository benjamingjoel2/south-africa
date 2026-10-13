"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { images } from "@/data/images";
import { SectionLabel } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { CheckIcon } from "@/components/ui/Icons";

export function GuideSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "south-africa-guide" }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="theme-light section-y" aria-label="The South Africa Guide">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="relative lg:col-span-5">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm rotate-[-3deg] overflow-hidden rounded-card shadow-[0_40px_80px_-30px_rgb(28_33_36/0.5)] transition-transform duration-700 hover:rotate-0">
            <Image src={images.newsletter} alt="" fill sizes="(min-width: 1024px) 30vw, 80vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate/90 via-slate/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="label text-white/70">Free · 42 pages</p>
              <p className="mt-2 text-h3 font-semibold">The South Africa Guide</p>
              <p className="mt-2 text-sm text-white/70">Seasons, routes, safari know-how & insider tips</p>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <SectionLabel tone="light">Free download</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-h2 font-semibold text-balance">Get The South Africa Guide</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-body-xl text-ink/70">
              Our specialists&apos; honest take on when to go, how long to stay, which safari suits you, and the places we send our own friends. Plus occasional travel notes, never spam.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 max-w-xl">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-4 rounded-card bg-teal p-6 text-white"
                  role="status"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <CheckIcon className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold">It&apos;s on its way!</p>
                    <p className="mt-1 text-white/75">Check your inbox for The South Africa Guide. If you don&apos;t see it, have a look in your promotions folder.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0, y: -10 }}>
                  <label htmlFor="guide-email" className="text-sm font-medium text-ink/70">
                    Email address
                  </label>
                  <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                    <input
                      id="guide-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      aria-invalid={!!error}
                      aria-describedby={error ? "guide-error" : "guide-note"}
                      className="h-14 flex-1 rounded-full border border-ink/15 bg-white px-6 text-ink placeholder:text-ink/35 focus:border-teal focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="h-14 rounded-full bg-ink px-8 font-medium text-white transition-colors hover:bg-teal disabled:opacity-60"
                    >
                      {status === "loading" ? "Sending…" : "Send me the guide"}
                    </button>
                  </div>
                  {error ? (
                    <p id="guide-error" className="mt-3 text-sm text-ochre-700" role="alert">
                      {error}
                    </p>
                  ) : (
                    <p id="guide-note" className="mt-3 text-sm text-ink/65">
                      We respect your inbox. Unsubscribe anytime.
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
