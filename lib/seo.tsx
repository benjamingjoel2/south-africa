import type { Metadata } from "next";
import { site } from "@/config/site";
import { images } from "@/data/images";

/** Search snippets are cut around 155–160 characters; clamp at a word boundary. */
export function clampDescription(text: string, max = 158) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), 80))}…`;
}

/** hreflang alternates for a path in any locale ("/fr/tours" -> en "/tours", fr "/fr/tours", ...). */
export function languageAlternates(path: string): Record<string, string> {
  const base = path.replace(/^\/(fr|de|es)(?=\/|$)/, "") || "/";
  const at = (l: string) => (base === "/" ? `/${l}` : `/${l}${base}`);
  return { en: base, fr: at("fr"), de: at("de"), es: at("es"), "x-default": base };
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const desc = clampDescription(description ?? site.description);
  const img = image ?? images.heroCapeTown;
  const ogImage = `${img}${img.includes("?") ? "&" : "?"}w=1200&h=630&fit=crop&q=80`;
  return {
    ...(title ? { title } : {}),
    description: desc,
    alternates: { canonical: path, languages: languageAlternates(path) },
    openGraph: {
      title: title ? `${title} | ${site.name}` : site.name,
      description: desc,
      url: path,
      siteName: site.name,
      locale: site.locale,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title ?? site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | ${site.name}` : site.name,
      description: desc,
      images: [ogImage],
    },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: new URL(it.path, site.url).toString(),
    })),
  };
}
