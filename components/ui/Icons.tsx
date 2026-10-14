import { cn } from "@/lib/utils";

type P = { className?: string };
const base = "size-4 shrink-0";
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const ChevronDown = ({ className }: P) => (
  <svg viewBox="0 0 12 12" className={cn("size-3 shrink-0", className)} aria-hidden="true" {...stroke}>
    <path d="m3 4.5 3 3 3-3" />
  </svg>
);
export const PlusIcon = ({ className }: P) => (
  <svg viewBox="0 0 16 16" className={cn(base, className)} aria-hidden="true" {...stroke}>
    <path d="M8 2v12M2 8h12" />
  </svg>
);
export const CheckIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={cn(base, className)} aria-hidden="true" {...stroke}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
export const CrossIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={cn(base, className)} aria-hidden="true" {...stroke}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const StarIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={cn("size-3.5 shrink-0", className)} aria-hidden="true" fill="currentColor">
    <path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8Z" />
  </svg>
);
export const ShieldIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={cn(base, className)} aria-hidden="true" {...stroke}>
    <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6Z" />
    <path d="m8.8 12 2.2 2.2 4.2-4.4" />
  </svg>
);
export const ArrowDown = ({ className }: P) => (
  <svg viewBox="0 0 12 16" className={cn("h-3.5 w-2.5 shrink-0", className)} aria-hidden="true" {...stroke}>
    <path d="M6 1v13M1.5 9.5 6 14l4.5-4.5" />
  </svg>
);
export const ExternalIcon = ({ className }: P) => (
  <svg viewBox="0 0 12 12" className={cn("size-2.5 shrink-0", className)} aria-hidden="true" {...stroke}>
    <path d="M4 2h6v6M10 2 2 10" />
  </svg>
);
