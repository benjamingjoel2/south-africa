import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";

/** Placeholder compass mark — a simple geometric rose. Swap for the final logo. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8", className)}>
      <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <path d="M16 3 19 16 16 29 13 16Z" fill="var(--color-ochre)" />
      <path d="M3 16 16 13 29 16 16 19Z" fill="currentColor" fillOpacity="0.9" />
      <circle cx="16" cy="16" r="2" fill="var(--color-slate)" />
    </svg>
  );
}

export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "inline-flex items-center gap-2.5",
        tone === "light" ? "text-white" : "text-ink",
        className,
      )}
    >
      <LogoMark />
      <span className="text-[1.0625rem] font-semibold leading-none tracking-[-0.03em]">
        Cape<span className="font-light text-current/60">&nbsp;Compass</span>
      </span>
    </Link>
  );
}
