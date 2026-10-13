"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Two-column body: sticky in-page sub-nav + content on the left, sticky info card on the right. */
export function DetailLayout({
  sections,
  sidebar,
  children,
}: {
  sections: { id: string; label: string }[];
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sections]);

  return (
    <div className="container-x mt-12 grid gap-12 pb-24 md:mt-16 lg:grid-cols-12 lg:gap-16">
      <div className="min-w-0 lg:col-span-8">
        <nav
          aria-label="On this page"
          className="no-scrollbar sticky top-[4.5rem] z-30 -mx-4 overflow-x-auto border-b border-white/10 bg-slate/90 px-4 backdrop-blur-xl lg:top-20 lg:mx-0 lg:px-0"
        >
          <ul className="flex gap-6">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? "true" : undefined}
                  className={cn(
                    "relative block whitespace-nowrap py-4 text-[0.9375rem] font-medium transition-colors",
                    active === s.id ? "text-white" : "text-white/45 hover:text-white",
                  )}
                >
                  {s.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-px h-0.5 origin-left bg-ochre transition-transform duration-500",
                      active === s.id ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="divide-y divide-white/10">{children}</div>
      </div>
      <aside className="order-first lg:order-none lg:col-span-4">
        <div className="lg:sticky lg:top-28">{sidebar}</div>
      </aside>
    </div>
  );
}

export function DetailSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-40 py-12 md:py-16">
      <h2 id={`${id}-title`} className="text-h3 font-semibold">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
