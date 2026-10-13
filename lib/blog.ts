import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Post } from "@/data/types";
import { images, type ImageKey } from "@/data/images";

const DIR = path.join(process.cwd(), "content", "blog");

function readPost(file: string): Post {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug: file.replace(/\.mdx$/, ""),
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    category: data.category ?? "Planning",
    cover: data.cover,
    author: data.author ?? "Cape Compass team",
    readingTime: `${Math.max(1, Math.round(words / 220))} min read`,
    content,
  };
}

export function getAllPosts(): Post[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  const file = `${slug}.mdx`;
  if (!fs.existsSync(path.join(DIR, file))) return undefined;
  return readPost(file);
}

/** Resolve a frontmatter `cover` (an image key from data/images.ts) to a URL. */
export function postCover(key: string) {
  return images[key as ImageKey] ?? images.heroCapeTown;
}
