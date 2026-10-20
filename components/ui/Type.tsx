import { cn } from "@/lib/utils";

/** Small uppercase label. On dark sections it turns brass (via .on-dark). */
export function Eyebrow({
  children,
  className,
  as: Tag = "p",
  tone = "stone",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
  tone?: "stone" | "brass";
}) {
  return <Tag className={cn("eyebrow", tone === "brass" && "text-brass-600", className)}>{children}</Tag>;
}

/**
 * Serif display heading with an italic accent and a closing period, e.g.
 * <Display lead="Where to" accent="go" /> → "Where to *go*."
 */
export function Display({
  lead,
  accent,
  period = true,
  as: Tag = "h2",
  size = "h2",
  tone = "light",
  className,
  id,
}: {
  lead: string;
  accent?: string;
  period?: boolean;
  as?: "h1" | "h2" | "h3" | "p";
  size?: "display" | "h1" | "h2" | "h3";
  tone?: "light" | "dark";
  className?: string;
  id?: string;
}) {
  const sizes = { display: "text-display", h1: "text-h1", h2: "text-h2", h3: "text-h3" } as const;
  return (
    <Tag id={id} className={cn(sizes[size], tone === "dark" ? "text-white" : "text-charcoal-800", className)}>
      {lead}
      {accent && (
        <>
          {" "}
          <em className={cn("accent", tone === "dark" ? "text-brass-300" : "text-charcoal-800")}>{accent}</em>
        </>
      )}
      {period && "."}
    </Tag>
  );
}

/** Section head: eyebrow + display heading + optional right-aligned action. */
export function SectionHead({
  eyebrow,
  lead,
  accent,
  description,
  action,
  tone = "light",
  align = "left",
  className,
  as = "h2",
}: {
  eyebrow: string;
  lead: string;
  accent?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  const centered = align === "center";
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", centered && "md:flex-col md:items-center md:text-center", className)}>
      <div className={cn("max-w-3xl", centered && "mx-auto")}>
        <Eyebrow className={cn(tone === "dark" && "text-brass-400")}>{eyebrow}</Eyebrow>
        <Display lead={lead} accent={accent} as={as} size={as === "h1" ? "h1" : "h2"} tone={tone} className="mt-3" />
        {description && (
          <div className={cn("mt-5 max-w-2xl text-lead", tone === "dark" ? "text-white/75" : "text-charcoal-700")}>{description}</div>
        )}
      </div>
      {action && <div className="shrink-0 md:pb-1">{action}</div>}
    </div>
  );
}
