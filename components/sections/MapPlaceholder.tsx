import { MapIcon } from "@/components/ui/Icons";

/** Stylised route placeholder until an interactive map (e.g. Mapbox) is wired up. */
export function MapPlaceholder({ stops }: { stops: string[] }) {
  return (
    <div className="relative overflow-hidden rounded-card border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgb(15_82_87/0.45),transparent_60%)] p-6 md:p-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:32px_32px]"
      />
      <div className="relative flex items-center justify-between">
        <p className="flex items-center gap-2 label text-white/60">
          <MapIcon /> Route overview
        </p>
        <span className="rounded-full border border-dashed border-white/25 px-3 py-1 text-xs text-white/50">Map placeholder</span>
      </div>
      <ol className="relative mt-10 space-y-0">
        {stops.map((s, i) => (
          <li key={s + i} className="relative flex items-center gap-4 pb-8 last:pb-0">
            {i < stops.length - 1 && (
              <span aria-hidden="true" className="absolute left-[0.6875rem] top-6 h-full border-l-2 border-dashed border-ochre/50" />
            )}
            <span className="relative z-10 flex size-6 items-center justify-center rounded-full bg-ochre text-[0.6875rem] font-semibold">
              {i + 1}
            </span>
            <span className="font-medium">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
