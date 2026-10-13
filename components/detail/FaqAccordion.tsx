import { VERIFY_NOTICE } from "@/data/faqs";
import { PlusIcon } from "@/components/ui/Icons";

type Item = { question: string; answer: string; verify?: boolean };

export function FaqAccordion({ items }: { items: Item[] }) {
  return (
    <div className="divide-y divide-ivory-200 border-y border-ivory-200">
      {items.map((f) => (
        <details key={f.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[1.25rem] leading-snug text-charcoal-800 transition-colors hover:text-brass-600 [&::-webkit-details-marker]:hidden">
            {f.question}
            <PlusIcon className="size-3.5 shrink-0 text-stone-400 transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <div className="space-y-4 pb-6 pr-10 text-[0.9375rem] leading-relaxed text-charcoal-700">
            {f.verify && (
              <p className="border-l-2 border-brass-500 bg-ivory-100 px-4 py-3 text-sm">
                <span className="font-medium text-charcoal-800">Verify before launch:</span> {VERIFY_NOTICE}
              </p>
            )}
            {f.answer.split("\n\n").map((p, i) => (
              <p key={i} className="whitespace-pre-line">{p}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
