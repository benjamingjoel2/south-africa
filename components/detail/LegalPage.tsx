import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="container-x py-14 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ name: title, path }]} />
        <h1 className="mt-5 text-h1">{title}</h1>
        <p className="mt-3 text-sm text-stone-400">Last updated: {updated}</p>
        <div className="prose-ed mt-10">{children}</div>
      </div>
    </div>
  );
}
