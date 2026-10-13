"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Direction the element travels from. "down" mirrors the reference's fade-down. */
  from?: "up" | "down" | "none";
  as?: "div" | "li" | "section" | "span";
  amount?: number;
};

/** Fade + slide in once when scrolled into view. */
export function Reveal({ children, className, delay = 0, from = "up", as = "div", amount = 0.2 }: RevealProps) {
  const reduce = useReducedMotion();
  const y = reduce || from === "none" ? 0 : from === "up" ? 32 : -24;
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/** Parent that staggers its <StaggerItem> children into view. */
export function Stagger({
  children,
  className,
  as = "div",
  amount = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={staggerParent}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Comp = motion[as];
  return (
    <Comp className={cn(className)} variants={staggerChild}>
      {children}
    </Comp>
  );
}
