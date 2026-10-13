import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/data/types";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function PostCard({ post, coverUrl, large, className }: { post: Post; coverUrl: string; large?: boolean; className?: string }) {
  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className={cn("relative overflow-hidden rounded-card", large ? "aspect-[16/10]" : "aspect-[4/3]")}>
        <Image
          src={coverUrl}
          alt=""
          fill
          sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-slate/75 px-3 py-1.5 text-xs font-medium backdrop-blur">{post.category}</span>
      </div>
      <p className="mt-5 text-sm text-white/55">
        <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime}
      </p>
      <h3 className={cn("mt-2 font-semibold transition-colors group-hover:text-ochre-400", large ? "text-h3" : "text-h4")}>
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 text-white/60">{post.excerpt}</p>
    </article>
  );
}
