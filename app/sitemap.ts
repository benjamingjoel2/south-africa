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
  return [
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
}
