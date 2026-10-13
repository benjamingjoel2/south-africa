import Link from "next/link";
import { JsonLd, breadcrumbLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

/** Eyebrow-style trail, e.g. "TOURS · CLASSIC SOUTH AFRICA". */
export function Breadcrumbs({ items, className }: { items: { name: string; path: string }[]; className?: string }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbLd(all)} />
      <nav aria-label="Breadcrumb" className={cn("eyebrow", className)}>
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((it, i) => (
            <li key={it.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">·</span>}
              {i < items.length - 1 ? (
                <Link href={it.path} className="hover:text-charcoal-800">{it.name}</Link>
              ) : (
                <span aria-current="page">{it.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
