import { cn } from "@/lib/utils";

/**
 * Subtle geometric band inspired by Ndebele wall-painting patterns:
 * stepped chevrons in brand colours. Purely decorative.
 */
export function NdebeleLine({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("h-3 w-full overflow-hidden", className)}>
      <svg width="100%" height="12" preserveAspectRatio="none">
        <defs>
          <pattern id="ndebele" width="48" height="12" patternUnits="userSpaceOnUse">
            <rect width="48" height="12" fill="var(--color-slate-900)" />
            <path d="M0 12 6 0h6L6 12Z" fill="var(--color-ochre)" />
            <path d="M12 12 18 0h6l-6 12Z" fill="var(--color-sand)" />
            <path d="M24 12 30 0h6l-6 12Z" fill="var(--color-teal)" />
            <rect x="38" y="3" width="6" height="6" fill="var(--color-protea)" />
          </pattern>
        </defs>
        <rect width="100%" height="12" fill="url(#ndebele)" />
      </svg>
    </div>
  );
}

/** Corner-tick decoration echoing the reference's grid-line ornaments. */
export function CornerTicks({ className }: { className?: string }) {
  const tick = "absolute size-3 border-current";
  return (
    <span aria-hidden="true" className={cn("pointer-events-none absolute inset-0 text-white/25", className)}>
      <span className={cn(tick, "left-0 top-0 border-l border-t")} />
      <span className={cn(tick, "right-0 top-0 border-r border-t")} />
      <span className={cn(tick, "bottom-0 left-0 border-b border-l")} />
      <span className={cn(tick, "bottom-0 right-0 border-b border-r")} />
    </span>
  );
}
