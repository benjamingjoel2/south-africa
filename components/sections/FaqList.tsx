import { VERIFY_NOTICE } from "@/data/faqs";

type Item = { question: string; answer: string; verify?: boolean };

/** Accessible accordion built on <details>/<summary>. */
export function FaqList({ items }: { items: Item[] }) {
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((f) => (
        <details key={f.question} className="group py-1 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-body-lg font-medium transition-colors hover:text-ochre-400">
            <span>{f.question}</span>
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-ochre transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="space-y-4 pb-6 pr-12 text-white/70">
            {f.verify && (
              <p className="rounded-xl border border-protea/30 bg-protea/10 px-4 py-3 text-sm text-protea">
                <strong className="font-semibold">Verify before launch:</strong> {VERIFY_NOTICE}
              </p>
            )}
            {f.answer.split("\n\n").map((p, i) => (
              <p key={i} className="whitespace-pre-line">
                {p}
              </p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
