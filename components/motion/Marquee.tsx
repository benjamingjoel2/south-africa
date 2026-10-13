import { cn } from "@/lib/utils";

/** CSS-only infinite marquee. Content is duplicated; the copy is hidden from AT. Pauses on hover. */
export function Marquee({
  children,
  className,
  duration = 60,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}) {
  return (
    <div className={cn("group overflow-hidden", className)}>
      <div
        className="flex w-max animate-marquee gap-5 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex gap-5">{children}</div>
        <div className="flex gap-5" aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  );
}
