import { whatsappHref } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { CornerTicks } from "@/components/ui/NdebeleLine";

/** Sticky sidebar card (reference: retreat price/info card). */
export function InfoCard({
  headline,
  rows,
  cta = "Start planning",
  ctaHref = "/plan-your-trip",
  whatsappMessage,
  note,
}: {
  headline: React.ReactNode;
  rows: { icon?: React.ReactNode; label: string; value: React.ReactNode }[];
  cta?: string;
  ctaHref?: string;
  whatsappMessage?: string;
  note?: React.ReactNode;
}) {
  return (
    <div className="relative rounded-card border border-white/10 bg-surface p-6 md:p-7">
      <CornerTicks />
      <div>{headline}</div>
      <dl className="mt-6 space-y-4 border-t border-white/10 pt-6">
        {rows.map((r) => (
          <div key={r.label} className="flex items-start gap-3 text-sm">
            {r.icon && <span className="mt-0.5 text-ochre">{r.icon}</span>}
            <dt className="sr-only">{r.label}</dt>
            <dd>
              <span className="block text-white/45">{r.label}</span>
              <span className="mt-0.5 block text-white">{r.value}</span>
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-7 space-y-3">
        <ButtonLink href={ctaHref} fullWidth size="lg" icon>
          {cta}
        </ButtonLink>
        <a
          href={whatsappHref(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/20 text-[0.9375rem] font-medium transition-colors hover:border-[#25D366] hover:bg-[#25D366]"
        >
          <WhatsAppIcon className="size-5" /> Ask on WhatsApp
        </a>
      </div>
      {note && <p className="mt-5 text-xs leading-relaxed text-white/45">{note}</p>}
    </div>
  );
}
