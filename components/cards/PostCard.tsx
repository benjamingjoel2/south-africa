import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/data/types";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function PostCard({ post, coverUrl, large, className }: { post: Post; coverUrl: string; large?: boolean; className?: string }) {
  return (
    <article className={cn("group relative", className)}>
      <div className={cn("relative overflow-hidden bg-ivory-200", large ? "aspect-[16/9]" : "aspect-[3/2]")}>
        <Image src={coverUrl} alt={post.title} fill sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"} className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
      </div>
      <p className="eyebrow mt-5">
        {post.category} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime}
      </p>
      <h3 className={cn("mt-2", large ? "text-h2" : "text-h3")}>
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 hover:text-brass-600">
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 text-[0.9375rem] text-charcoal-700">{post.excerpt}</p>
    </article>
  );
}
