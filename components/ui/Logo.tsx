import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";

/** Placeholder compass mark. Swap for the final logo. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className={cn("size-6", className)}>
      <circle cx="14" cy="14" r="12.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M14 3.5 16.4 14 14 24.5 11.6 14Z" fill="currentColor" />
      <path d="M3.5 14 14 11.6 24.5 14 14 16.4Z" fill="currentColor" fillOpacity=".45" />
    </svg>
  );
}

export function Logo({ className, tone = "dark", size = "md" }: { className?: string; tone?: "dark" | "light"; size?: "md" | "lg" }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={cn("inline-flex items-center gap-2.5", tone === "light" ? "text-white" : "text-charcoal-800", className)}
    >
      <LogoMark className={size === "lg" ? "size-7" : "size-6"} />
      <span className={cn("font-sans font-medium uppercase tracking-[0.2em]", size === "lg" ? "text-[1.35rem]" : "text-[1.1rem]")}>
        Cape Compass
      </span>
    </Link>
  );
}
