import type { Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Card root: fades up, then staggers its parts (mirrors the reference's per-element card hooks). */
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, staggerChildren: 0.07, delayChildren: 0.1 } },
};

export const partVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
