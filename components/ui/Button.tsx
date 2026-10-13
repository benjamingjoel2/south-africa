import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light" | "dark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-ochre text-white hover:bg-ochre-700",
  secondary:
    "border border-white/20 text-white hover:border-white hover:bg-white hover:text-slate",
  ghost: "text-white/70 hover:text-white",
  light: "bg-sand text-ink hover:bg-white",
  dark: "bg-slate text-white hover:bg-teal",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-8 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  icon?: boolean;
  fullWidth?: boolean;
};

function classes({ variant = "primary", size = "md", className, fullWidth }: CommonProps) {
  return cn(
    "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em]",
    "transition-[background-color,color,border-color,transform] duration-300 ease-out-expo active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cn(
        "size-4 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5",
        className,
      )}
    >
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" fill="none" stroke="currentColor" strokeWidth="1.5" />
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
      {props.icon && <Arrow />}
    </>
  );
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes(props)}
        aria-label={props["aria-label"]}
      >
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
}: CommonProps & {
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes(props)}>
      {props.children}
      {props.icon && <Arrow />}
    </button>
  );
}
