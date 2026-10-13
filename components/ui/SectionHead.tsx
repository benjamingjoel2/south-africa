import { cn } from "@/lib/utils";
import { LogoMark } from "./Logo";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";

type Props = {
  label: string;
  title: string | string[];
  description?: React.ReactNode;
  action?: React.ReactNode;
  /** split = 3/9 label + statement (reference default); end = 6/6 with action bottom-aligned */
  variant?: "split" | "end";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionLabel({ children, tone = "dark" }: { children: React.ReactNode; tone?: "dark" | "light" }) {
  return (
    <p className={cn("flex items-center gap-2.5 label", tone === "dark" ? "text-white/60" : "text-ink/60")}>
      <LogoMark className={cn("size-5", tone === "light" && "text-ink")} />
      {children}
    </p>
  );
}

export function SectionHead({
  label,
  title,
  description,
  action,
  variant = "split",
  tone = "dark",
  as = "h2",
  className,
}: Props) {
  const lines = Array.isArray(title) ? title : [title];
  const muted = tone === "dark" ? "text-white/60" : "text-ink/65";
  const headingClass = cn(as === "h1" ? "text-h1" : "text-h2", "font-semibold text-balance");

  if (variant === "end") {
    return (
      <div className={cn("grid gap-8 md:grid-cols-12 md:items-end", className)}>
        <div className="md:col-span-7">
          <Reveal>
            <SectionLabel tone={tone}>{label}</SectionLabel>
          </Reveal>
          <SplitReveal as={as} lines={lines} className={cn(headingClass, "mt-5")} />
        </div>
        <Reveal delay={0.15} className="flex flex-col items-start gap-6 md:col-span-5 md:items-end md:text-right">
          {description && <div className={cn("max-w-md text-body-lg", muted)}>{description}</div>}
          {action}
        </Reveal>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-6 md:grid-cols-12", className)}>
      <Reveal className="md:col-span-3 md:pt-3">
        <SectionLabel tone={tone}>{label}</SectionLabel>
      </Reveal>
      <div className="md:col-span-9">
        <SplitReveal as={as} lines={lines} className={headingClass} />
        {(description || action) && (
          <Reveal delay={0.15} className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            {description && <div className={cn("max-w-2xl text-body-xl", muted)}>{description}</div>}
            {action && <div className="shrink-0">{action}</div>}
          </Reveal>
        )}
      </div>
    </div>
  );
}
