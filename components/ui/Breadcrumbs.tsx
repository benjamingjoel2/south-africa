import Link from "next/link";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbLd(all)} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-white/50">
          {all.map((it, i) => (
            <li key={it.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true" className="text-ochre">+</span>}
              {i < all.length - 1 ? (
                <Link href={it.path} className="transition-colors hover:text-white">
                  {it.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-white/80">
                  {it.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
