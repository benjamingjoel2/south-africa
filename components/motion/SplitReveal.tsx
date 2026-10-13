"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Word-by-word masked reveal for headings (replicates a SplitText-style
 * entrance). Each line in `lines` renders on its own row.
 */
export function SplitReveal({
  lines,
  as = "h2",
  className,
  delay = 0,
  immediate = false,
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  /** Animate on mount instead of on scroll (used for the hero). */
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const Tag = as;
  let index = 0;
  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, amount: 0.5 } };

  return (
    <Tag className={cn(className)} aria-label={lines.join(" ")}>
      <motion.span
        aria-hidden="true"
        className="block"
        initial={reduce ? "show" : "hidden"}
        {...trigger}
        transition={{ staggerChildren: 0.06, delayChildren: delay }}
      >
        {lines.map((line, li) => (
          <span key={li} className="block">
            {line.split(" ").map((word, wi) => {
              index++;
              return (
                <span key={wi} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    className="inline-block will-change-transform"
                    variants={{
                      hidden: { y: "110%" },
                      show: { y: "0%", transition: { duration: 1, ease: EASE } },
                    }}
                    data-i={index}
                  >
                    {word}
                    {wi < line.split(" ").length - 1 ? " " : ""}
                  </motion.span>
                </span>
              );
            })}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
