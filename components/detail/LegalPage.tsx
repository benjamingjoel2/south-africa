import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="container-x py-14 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ name: title, path }]} />
        <h1 className="mt-5 text-h1">{title}</h1>
        <p className="mt-3 text-sm text-stone-400">Last updated: {updated}</p>
        <p className="mt-8 border-l-2 border-brass-500 bg-ivory-100 px-4 py-3 text-sm text-charcoal-700">
          Placeholder text. Have this page drafted or reviewed by a qualified legal professional (including POPIA compliance for South Africa and GDPR for EU/UK visitors) before launch.
        </p>
        <div className="prose-ed mt-10">{children}</div>
      </div>
    </div>
  );
}
