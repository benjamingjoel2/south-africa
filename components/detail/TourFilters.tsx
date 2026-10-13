"use client";

import { useState } from "react";
import type { BudgetTier, RegionId, Tour } from "@/data/types";
import { budgetLabels, regions } from "@/data/tours";
import { TourCard } from "@/components/cards/TourCard";
import { cn } from "@/lib/utils";

const durations = [
  { id: "short", label: "Under 8 days", test: (n: number) => n + 1 < 8 },
  { id: "mid", label: "8–10 days", test: (n: number) => n + 1 >= 8 && n + 1 <= 10 },
  { id: "long", label: "11+ days", test: (n: number) => n + 1 >= 11 },
] as const;

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "h-9 whitespace-nowrap border px-3.5 text-[0.8125rem] font-medium transition-colors",
        active ? "border-forest-700 bg-forest-700 text-white" : "border-ivory-200 bg-ivory-50 text-charcoal-800 hover:border-charcoal-800",
      )}
    >
      {children}
    </button>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="eyebrow w-20 shrink-0">{label}</span>
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 md:flex-wrap">{children}</div>
    </div>
  );
}

export function TourFilters({ tours, showRegion = true, noun = "tours" }: { tours: Tour[]; showRegion?: boolean; noun?: string }) {
  const [region, setRegion] = useState<RegionId | "all">("all");
  const [duration, setDuration] = useState<string>("all");
  const [budget, setBudget] = useState<BudgetTier | "all">("all");
  const used = regions.filter((r) => tours.some((t) => t.regions.includes(r.id)));
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
      <div className="space-y-3 border-b border-ivory-200 pb-6" role="group" aria-label="Filter tours">
        {showRegion && (
          <Row label="Region">
            <Chip active={region === "all"} onClick={() => setRegion("all")}>All</Chip>
            {used.map((r) => (
              <Chip key={r.id} active={region === r.id} onClick={() => setRegion(r.id)}>{r.name}</Chip>
            ))}
          </Row>
        )}
        <Row label="Duration">
          <Chip active={duration === "all"} onClick={() => setDuration("all")}>Any</Chip>
          {durations.map((d) => (
            <Chip key={d.id} active={duration === d.id} onClick={() => setDuration(d.id)}>{d.label}</Chip>
          ))}
        </Row>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Row label="Budget">
            <Chip active={budget === "all"} onClick={() => setBudget("all")}>Any</Chip>
            {(Object.keys(budgetLabels) as BudgetTier[]).map((b) => (
              <Chip key={b} active={budget === b} onClick={() => setBudget(b)}>{budgetLabels[b]}</Chip>
            ))}
          </Row>
          <p className="text-sm text-stone-400 md:pl-6" aria-live="polite">
            {filtered.length} of {tours.length} {noun}
          </p>
        </div>
      </div>

      {filtered.length ? (
        <div className="mt-10 grid gap-x-10 gap-y-14 lg:grid-cols-2">
          {filtered.map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </div>
      ) : (
        <div className="mt-10 border border-ivory-200 bg-bone p-10 text-center">
          <p className="font-display text-h4">No sample tours match those filters</p>
          <p className="mt-2 text-charcoal-700">That doesn&rsquo;t mean we can&rsquo;t plan it. Every trip is tailor-made.</p>
          <button type="button" onClick={reset} className="mt-5 text-eyebrow font-medium uppercase tracking-eyebrow text-brass-600 underline underline-offset-4">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
