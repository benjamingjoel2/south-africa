import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="container-x pb-24 pt-28 md:pt-36">
      <Breadcrumbs items={[{ name: title, path }]} />
      <div className="mx-auto mt-12 max-w-3xl">
        <h1 className="text-h1 font-semibold">{title}</h1>
        <p className="mt-4 text-sm text-white/50">Last updated: {updated}</p>
        <p className="mt-8 rounded-2xl border border-protea/30 bg-protea/10 p-4 text-sm text-protea">
          Placeholder text. Have this page drafted or reviewed by a qualified legal professional (including POPIA compliance for South Africa and GDPR for EU/UK visitors) before launch.
        </p>
        <div className="prose-cc mt-10">{children}</div>
      </div>
    </div>
  );
}
