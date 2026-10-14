import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "dark" | "brass" | "outline-dark" | "outline-light" | "link" | "link-light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  dark: "bg-forest-700 text-white hover:bg-forest-900",
  brass: "bg-brass-400 text-forest-900 hover:bg-brass-300",
  "outline-dark": "border border-charcoal-800 text-charcoal-800 hover:bg-charcoal-800 hover:text-white",
  "outline-light": "border border-white/40 text-white hover:border-white hover:bg-white/10",
  link: "h-auto px-0 text-charcoal-800 hover:text-brass-600",
  "link-light": "h-auto px-0 text-white/85 hover:text-brass-300",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5",
  md: "h-11 px-6",
  lg: "h-12 px-7",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  /** Trailing arrow */
  arrow?: boolean;
  fullWidth?: boolean;
};

function classes({ variant = "dark", size = "md", className, fullWidth }: CommonProps) {
  const isLink = variant.startsWith("link");
  return cn(
    "group/btn inline-flex items-center justify-center gap-3 whitespace-nowrap text-eyebrow font-medium uppercase tracking-eyebrow transition-colors duration-200",
    "disabled:pointer-events-none disabled:opacity-50",
    !isLink && sizes[size],
    variants[variant],
    fullWidth && "w-full",
    className,
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 12" aria-hidden="true" className={cn("h-2.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-0.5", className)}>
      <path d="M1 6h13M9.5 1.5 14 6l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function ButtonLink({
  href,
  external,
  ...props
}: CommonProps & { href: string; external?: boolean; "aria-label"?: string }) {
  const content = (
    <>
      {props.children}
      {props.arrow && <ArrowRight />}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes(props)} aria-label={props["aria-label"]}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes(props)} aria-label={props["aria-label"]}>
      {content}
    </Link>
  );
}

export function Button({
  type = "button",
  onClick,
  disabled,
  ...props
}: CommonProps & { type?: "button" | "submit"; onClick?: () => void; disabled?: boolean }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes(props)}>
      {props.children}
      {props.arrow && <ArrowRight />}
    </button>
  );
}
