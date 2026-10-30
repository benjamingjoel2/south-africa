"use client";

import { Children, cloneElement, isValidElement, useEffect, useRef, type CSSProperties, type ReactElement } from "react";
import { cn } from "@/lib/utils";

/** Adds data-inview once the element scrolls into view (CSS in globals.css does the animating). */
function useInView<T extends HTMLElement>(amount: number) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.setAttribute("data-inview", "");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.setAttribute("data-inview", "");
          io.disconnect();
        }
      },
      { threshold: amount, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount]);
  return ref;
}

/** Subtle fade-up on scroll. */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Comp = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "article";
}) {
  const ref = useInView<HTMLElement>(0.15);
  return (
    <Comp ref={ref as never} className={cn("reveal", className)} style={{ "--reveal-delay": `${delay}s` } as CSSProperties}>
      {children}
    </Comp>
  );
}

export function Stagger({ children, className, as: Comp = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "ul" | "ol" }) {
  const ref = useInView<HTMLElement>(0.1);
  return (
    <Comp ref={ref as never} className={cn("stagger", className)}>
      {Children.map(children, (child, i) => (isValidElement(child) ? cloneElement(child as ReactElement<{ index?: number }>, { index: i }) : child))}
    </Comp>
  );
}

export function StaggerItem({ children, className, index = 0, as: Comp = "div" }: { children: React.ReactNode; className?: string; index?: number; as?: "div" | "li" | "article" }) {
  return (
    <Comp className={cn("stagger-item", className)} style={{ "--i": index } as CSSProperties}>
      {children}
    </Comp>
  );
}
