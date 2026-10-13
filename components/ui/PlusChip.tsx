import { cn } from "@/lib/utils";

/** "+ Label" pill, echoing the reference's plus-marker motif. */
export function PlusChip({
  children,
  className,
  tone = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium",
        tone === "dark" ? "border-white/15 text-white" : "border-ink/15 text-ink",
        className,
      )}
    >
      <span aria-hidden="true" className="text-ochre">
        +
      </span>
      {children}
    </span>
  );
}

export function Plus({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("text-ochre", className)}>
      +
    </span>
  );
}
