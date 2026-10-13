"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { BudgetTier, RegionId, Tour } from "@/data/types";
import { budgetLabels, regions } from "@/data/tours";
import { TourCard } from "@/components/cards/TourCard";
import { cn } from "@/lib/utils";

const durations = [
  { id: "short", label: "Up to 7 nights", test: (n: number) => n <= 7 },
  { id: "mid", label: "8–10 nights", test: (n: number) => n >= 8 && n <= 10 },
  { id: "long", label: "11+ nights", test: (n: number) => n >= 11 },
] as const;

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors",
        active ? "border-ochre bg-ochre text-white" : "border-white/15 text-white/70 hover:border-white/40 hover:text-white",
      )}
    >
      <span aria-hidden="true" className={active ? "text-white" : "text-ochre-400"}>+</span>
      {children}
    </button>
  );
}

export function TourFilters({ tours }: { tours: Tour[] }) {
  const [region, setRegion] = useState<RegionId | "all">("all");
  const [duration, setDuration] = useState<string>("all");
  const [budget, setBudget] = useState<BudgetTier | "all">("all");

  const usedRegions = regions.filter((r) => tours.some((t) => t.regions.includes(r.id)));
  const filtered = tours.filter(
    (t) =>
      (region === "all" || t.regions.includes(region)) &&
      (duration === "all" || durations.find((d) => d.id === duration)!.test(t.nights)) &&
      (budget === "all" || t.budget === budget),
  );
  const reset = () => {
    setRegion("all");
    setDuration("all");
    setBudget("all");
  };

  return (
    <div>
      <div className="space-y-5 rounded-card border border-white/10 bg-surface/60 p-5 md:p-6" role="group" aria-label="Filter tours">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <p className="w-24 shrink-0 label text-white/55">Region</p>
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 md:flex-wrap">
            <Chip active={region === "all"} onClick={() => setRegion("all")}>All</Chip>
            {usedRegions.map((r) => (
              <Chip key={r.id} active={region === r.id} onClick={() => setRegion(r.id)}>
                {r.name}
              </Chip>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <p className="w-24 shrink-0 label text-white/55">Duration</p>
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 md:flex-wrap">
            <Chip active={duration === "all"} onClick={() => setDuration("all")}>Any length</Chip>
            {durations.map((d) => (
              <Chip key={d.id} active={duration === d.id} onClick={() => setDuration(d.id)}>
                {d.label}
              </Chip>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <p className="w-24 shrink-0 label text-white/55">Budget</p>
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 md:flex-wrap">
            <Chip active={budget === "all"} onClick={() => setBudget("all")}>Any budget</Chip>
            {(Object.keys(budgetLabels) as BudgetTier[]).map((b) => (
              <Chip key={b} active={budget === b} onClick={() => setBudget(b)}>
                {budgetLabels[b]}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between text-sm text-white/55">
        <p aria-live="polite">
          Showing {filtered.length} of {tours.length} sample tours
        </p>
        {(region !== "all" || duration !== "all" || budget !== "all") && (
          <button type="button" onClick={reset} className="text-white underline underline-offset-2">
            Clear filters
          </button>
        )}
      </div>

      <motion.div layout className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((t) => (
            <motion.div
              key={t.slug}
              layout
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
            >
              <TourCard tour={t} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {filtered.length === 0 && (
        <div className="mt-6 rounded-card border border-dashed border-white/20 p-10 text-center">
          <p className="text-h4 font-semibold">No sample tours match those filters</p>
          <p className="mt-2 text-white/60">That doesn&apos;t mean we can&apos;t plan it. Every trip is tailor-made.</p>
          <button type="button" onClick={reset} className="mt-6 text-ochre-400 underline underline-offset-2">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
