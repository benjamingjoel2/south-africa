import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { destinations } from "@/data/destinations";
import { experiences } from "@/data/experiences";
import { stays } from "@/data/stays";
import { tours } from "@/data/tours";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority = 0.7): MetadataRoute.Sitemap[number] => ({
    url: new URL(path, site.url).toString(),
    lastModified: now,
    priority,
  });
  const pages: MetadataRoute.Sitemap = [
    page("/", 1),
    ...["/destinations", "/tours", "/experiences", "/stays", "/plan-your-trip"].map((p) => page(p, 0.9)),
    ...["/about", "/faq", "/contact", "/blog"].map((p) => page(p, 0.6)),
    ...["/privacy", "/terms", "/cookies"].map((p) => page(p, 0.2)),
    ...destinations.map((d) => page(`/destinations/${d.slug}`, 0.8)),
    ...tours.map((t) => page(`/tours/${t.slug}`, 0.8)),
    ...experiences.map((e) => page(`/experiences/${e.slug}`, 0.7)),
    ...stays.map((s) => page(`/stays/${s.slug}`, 0.6)),
    ...getAllPosts().map((p) => ({ ...page(`/blog/${p.slug}`, 0.6), lastModified: new Date(p.date) })),
  ];
  // Every page in every language (English unprefixed), each with hreflang alternates.
  const origin = new URL(site.url).origin;
  return pages.flatMap((entry) => {
    const path = new URL(entry.url).pathname;
    const at = (l: string) => `${origin}${path === "/" ? `/${l}` : `/${l}${path}`}`;
    const languages = { en: `${origin}${path}`, fr: at("fr"), de: at("de"), es: at("es"), "x-default": `${origin}${path}` };
    return [entry.url, at("fr"), at("de"), at("es")].map((url) => ({ ...entry, url, alternates: { languages } }));
  });
}
