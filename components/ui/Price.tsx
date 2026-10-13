"use client";

import { useCurrency } from "@/lib/currency";

/** Renders a USD base price in the visitor's chosen currency. */
export function Price({ usd, className }: { usd: number; className?: string }) {
  const { format } = useCurrency();
  return (
    <span className={className} suppressHydrationWarning>
      {format(usd)}
    </span>
  );
}
