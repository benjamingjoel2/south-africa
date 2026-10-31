import type { MonthKey, MonthRating } from "@/data/types";
import { months } from "@/lib/utils";
import { cn } from "@/lib/utils";

const styles: Record<MonthRating, string> = {
  best: "bg-forest-700 text-white border-forest-700",
  good: "bg-brass-400/25 text-charcoal-800 border-brass-400/40",
  mixed: "bg-ivory-50 text-charcoal-700 border-ivory-200",
};
// Display names; the keys stay in English to match the data.
const monthLabels: Record<MonthKey, string> = {
  Jan: "Jan", Feb: "Feb", Mar: "Mar", Apr: "Apr", May: "May", Jun: "Jun",
  Jul: "Jul", Aug: "Aug", Sep: "Sep", Oct: "Oct", Nov: "Nov", Dec: "Dec",
};

const labels: Record<MonthRating, string> = { best: "Best", good: "Good", mixed: "Mixed" };

export function MonthGrid({ ratings }: { ratings: Record<MonthKey, MonthRating> }) {
  return (
    <div>
      <ul className="grid grid-cols-4 gap-1.5 sm:grid-cols-6 md:grid-cols-12" aria-label="Month-by-month rating">
        {months.map((m) => {
          const r = ratings[m as MonthKey];
          return (
            <li key={m} className={cn("flex flex-col items-center gap-1 border py-3 text-center", styles[r])}>
              <span className="text-sm font-medium">{monthLabels[m as MonthKey]}</span>
              <span className="text-[0.625rem] uppercase tracking-[0.14em] opacity-80">{labels[r]}</span>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 flex flex-wrap gap-5 text-xs text-charcoal-700" aria-hidden="true">
        <span className="flex items-center gap-1.5"><span className="size-2.5 bg-forest-700" /> Best</span>
        <span className="flex items-center gap-1.5"><span className="size-2.5 bg-brass-400/50" /> Good</span>
        <span className="flex items-center gap-1.5"><span className="size-2.5 border border-ivory-200 bg-ivory-50" /> Mixed / shoulder</span>
      </div>
      <div className="mt-6 border-t border-ivory-200 pt-5 text-sm text-charcoal-700">
        <p className="font-medium text-charcoal-800">Seasons are reversed from the northern hemisphere.</p>
        <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
          <li>Cape Town&rsquo;s winter rains fall June to August</li>
          <li>Kruger&rsquo;s dry season (May to September) is peak game viewing</li>
          <li>Summer rains fall November to March in the north and east</li>
          <li>Whale season on the Cape coast runs June to November</li>
        </ul>
      </div>
    </div>
  );
}
