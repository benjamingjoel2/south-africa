import Link from "next/link";
import { site } from "@/config/site";
import { StarIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export const defaultRows = [
  { label: "Reply", value: "Within one working day, usually much sooner." },
  { label: "Pricing", value: "Direct local rates, with a dedicated specialist included." },
  { label: "Coverage", value: "Every flight, transfer, stay and activity. Before, during and after." },
];

export function IncludedBox({ className }: { className?: string }) {
  if (!site.included) return null;
  return (
    <div className={cn("border-l-2 border-brass-500 bg-ivory-100 px-5 py-4", className)}>
      <p className="eyebrow text-brass-600">Included</p>
      <p className="mt-2 text-[0.9375rem] text-charcoal-700">
        <span className="font-medium text-charcoal-800">Free planning consultation and 24/7 WhatsApp support.</span> {site.included.text.replace(/^A free planning consultation and 24\/7 WhatsApp support on /, "On ")}
      </p>
    </div>
  );
}

/** Bone sidebar card with the "Included" box and definition rows. */
export function SideCard({
  rows = defaultRows,
  rating = false,
  footer = "Tailor-made South Africa · since 2012",
  className,
  children,
}: {
  rows?: { label: string; value: React.ReactNode }[];
  rating?: boolean;
  footer?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <aside className={cn("border border-ivory-200 bg-bone p-6 md:p-7", className)}>
      <IncludedBox />
      <dl className="mt-6 divide-y divide-ivory-200 border-t border-ivory-200">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[6rem_1fr] gap-4 py-4 text-[0.9375rem]">
            <dt className="eyebrow pt-1">{r.label}</dt>
            <dd className="text-charcoal-700">{r.value}</dd>
          </div>
        ))}
      </dl>
      {children}
      {rating && (
        <div className="mt-5 border-t border-ivory-200 pt-5 text-sm text-charcoal-700">
          <p className="flex items-center gap-2">
            <span className="flex gap-0.5 text-brass-500" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="size-3" />
              ))}
            </span>
            <span className="font-medium text-charcoal-800">4.9</span> placeholder rating
          </p>
          <Link href="/testimonials" className="mt-1 inline-block underline underline-offset-2">Read guest stories</Link>
        </div>
      )}
      {footer && <p className="eyebrow mt-6 border-t border-ivory-200 pt-5 text-center">{footer}</p>}
    </aside>
  );
}
