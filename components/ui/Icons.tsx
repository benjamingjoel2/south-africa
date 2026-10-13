import { cn } from "@/lib/utils";

type P = { className?: string };
const base = "size-4 shrink-0";
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const PinIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={cn(base, className)} aria-hidden="true" {...stroke}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
export const CalendarIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={cn(base, className)} aria-hidden="true" {...stroke}>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
);
export const UsersIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={cn(base, className)} aria-hidden="true" {...stroke}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20c.7-3.6 3.3-5.5 6.5-5.5s5.8 1.9 6.5 5.5M16 4.8a3.5 3.5 0 0 1 0 6.4M18.5 14.8c1.6.8 2.7 2.5 3 5.2" />
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
  <svg viewBox="0 0 24 24" className={cn(base, className)} aria-hidden="true" fill="currentColor">
    <path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8Z" />
  </svg>
);
export const ClockIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={cn(base, className)} aria-hidden="true" {...stroke}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);
export const SunIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={cn(base, className)} aria-hidden="true" {...stroke}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
  </svg>
);
export const BedIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={cn(base, className)} aria-hidden="true" {...stroke}>
    <path d="M3 19V6M3 15h18v4M21 15v-3a3 3 0 0 0-3-3h-7v6M7 11.5a1.5 1.5 0 1 0 0-.01" />
  </svg>
);
export const ChatIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={cn(base, className)} aria-hidden="true" {...stroke}>
    <path d="M4 19.5 5.3 16A7.5 7.5 0 1 1 8 18.7Z" />
  </svg>
);
export const ShieldIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={cn(base, className)} aria-hidden="true" {...stroke}>
    <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6Z" />
    <path d="m8.8 12 2.2 2.2 4.2-4.4" />
  </svg>
);
export const CompassIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={cn(base, className)} aria-hidden="true" {...stroke}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m15.5 8.5-2 5-5 2 2-5Z" />
  </svg>
);
export const TagIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={cn(base, className)} aria-hidden="true" {...stroke}>
    <path d="M3.5 12.3V4.5a1 1 0 0 1 1-1h7.8l8.2 8.2a1 1 0 0 1 0 1.4l-7.8 7.8a1 1 0 0 1-1.4 0Z" />
    <circle cx="8" cy="8" r="1.4" />
  </svg>
);
export const MapIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={cn(base, className)} aria-hidden="true" {...stroke}>
    <path d="m3.5 6.5 5.5-2 6 2 5.5-2v13l-5.5 2-6-2-5.5 2Z" />
    <path d="M9 4.5v13M15 6.5v13" />
  </svg>
);
