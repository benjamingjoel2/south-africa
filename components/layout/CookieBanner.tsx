"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "cc-cookie-consent";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read consent after mount
      if (!window.localStorage.getItem(KEY)) setShow(true);
    } catch {}
  }, []);

  const decide = (value: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(KEY, value);
    } catch {}
    setShow(false);
  };

  if (!show) return null;
  return (
    <div role="region" aria-label="Cookie consent" className="fixed inset-x-0 bottom-0 z-40 border-t border-ivory-200 bg-bone">
      <div className="container-x flex flex-col gap-3 py-3.5 text-[0.8125rem] text-charcoal-700 md:flex-row md:items-center md:justify-between">
        <p>
          We only use essential storage for your preferences. Analytics, if we ever add them, only run with your consent. See our{" "}
          <Link href="/cookies" className="underline underline-offset-2 hover:text-charcoal-800">Cookie Policy</Link>.
        </p>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => decide("declined")} className="h-9 border border-charcoal-800 px-4 text-eyebrow font-medium uppercase tracking-eyebrow text-charcoal-800 hover:bg-charcoal-800 hover:text-white">
            Decline
          </button>
          <button type="button" onClick={() => decide("accepted")} className="h-9 bg-forest-700 px-4 text-eyebrow font-medium uppercase tracking-eyebrow text-white hover:bg-forest-900">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
