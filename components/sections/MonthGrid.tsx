import type { MonthKey, MonthRating } from "@/data/types";
import { months } from "@/lib/utils";
import { cn } from "@/lib/utils";

const styles: Record<MonthRating, string> = {
  best: "bg-ochre text-white border-ochre",
  good: "bg-teal/60 text-white border-teal",
  mixed: "bg-transparent text-white/55 border-white/15",
};
const labels: Record<MonthRating, string> = { best: "Best", good: "Good", mixed: "Mixed" };

export function MonthGrid({ ratings, note }: { ratings: Record<MonthKey, MonthRating>; note?: string }) {
  return (
    <div>
      <ul className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-12" aria-label="Month-by-month rating">
        {months.map((m) => {
          const r = ratings[m as MonthKey];
          return (
            <li key={m} className={cn("flex flex-col items-center gap-1 rounded-xl border px-1 py-3 text-center", styles[r])}>
              <span className="text-sm font-semibold">{m}</span>
              <span className="text-[0.6875rem] uppercase tracking-wider opacity-80">{labels[r]}</span>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/55" aria-hidden="true">
        <span className="flex items-center gap-1.5"><span className="size-3 rounded bg-ochre" /> Best</span>
        <span className="flex items-center gap-1.5"><span className="size-3 rounded bg-teal" /> Good</span>
        <span className="flex items-center gap-1.5"><span className="size-3 rounded border border-white/30" /> Mixed / shoulder</span>
      </div>
      {note && <p className="mt-6 text-white/70">{note}</p>}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white/65">
        <p className="font-semibold text-white">Remember: seasons are reversed from the northern hemisphere.</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          <li><span className="text-ochre">+</span> Cape Town&apos;s winter rains fall June–August</li>
          <li><span className="text-ochre">+</span> Kruger&apos;s dry season (May–Sep) is peak game viewing</li>
          <li><span className="text-ochre">+</span> Summer rains Nov–Mar in the north and east</li>
          <li><span className="text-ochre">+</span> Whale season on the Cape coast: June–November</li>
        </ul>
      </div>
    </div>
  );
}
