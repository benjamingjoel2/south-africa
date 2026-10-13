"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const KEY = "cc-cookie-consent";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read consent after mount
      if (!window.localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* storage unavailable: don't nag */
    }
  }, []);

  const decide = (value: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(KEY, value);
    } catch {}
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="region"
          aria-label="Cookie consent"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
          className="fixed bottom-5 left-4 right-24 z-40 max-w-xl rounded-2xl border border-white/10 bg-surface/95 p-5 shadow-2xl backdrop-blur md:left-8 md:right-auto"
        >
          <p className="text-sm leading-relaxed text-white/70">
            We use cookies to understand how the site is used and to improve your planning experience. See our{" "}
            <Link href="/privacy" className="text-white underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => decide("declined")}
              className="h-10 rounded-full border border-white/20 px-5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-slate"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => decide("accepted")}
              className="h-10 rounded-full bg-ochre px-5 text-sm font-medium text-white transition-colors hover:bg-ochre-400"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
