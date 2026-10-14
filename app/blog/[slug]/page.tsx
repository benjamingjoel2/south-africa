import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPost, postCover as cover } from "@/lib/blog";
import { site } from "@/config/site";
import { buildMetadata, JsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PostCard } from "@/components/cards/PostCard";
import { SpecialistCta } from "@/components/sections/SpecialistCta";

export const dynamicParams = false;
export const generateStaticParams = () => getAllPosts().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return buildMetadata({ title: p.title, description: p.excerpt, path: `/blog/${p.slug}`, image: cover(p.cover), type: "article" });
}

const mdxComponents = {
  a: ({ href = "", ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    href.startsWith("/") ? <Link href={href} {...props} /> : <a href={href} target="_blank" rel="noopener noreferrer" {...props} />,
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  ),
};

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const more = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.excerpt, image: cover(post.cover), datePublished: post.date, author: { "@type": "Organization", name: post.author }, publisher: { "@type": "Organization", name: site.name }, mainEntityOfPage: `${site.url}/blog/${post.slug}` }} />
      <article className="container-x pt-12 lg:pt-16">
        <header className="mx-auto max-w-3xl">
          <Breadcrumbs items={[{ name: "Journal", path: "/blog" }, { name: post.category, path: "/blog" }]} />
          <h1 className="mt-5 text-h1">{post.title}</h1>
          <p className="mt-5 font-display text-[1.375rem] italic leading-snug text-charcoal-700">{post.excerpt}</p>
          <p className="eyebrow mt-5">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime} · {post.author}
          </p>
        </header>
        <div className="relative mx-auto mt-10 aspect-[16/9] max-w-5xl bg-ivory-200">
          <Image src={cover(post.cover)} alt={post.title} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
        </div>
        <div className="prose-ed mx-auto mt-12 max-w-3xl pb-20">
          <MDXRemote source={post.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>
      </article>
      <section className="border-t border-ivory-200 section-y" aria-label="More from the journal">
        <div className="container-x">
          <h2 className="text-h2">More from the journal.</h2>
          <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {more.map((p) => (
              <PostCard key={p.slug} post={p} coverUrl={cover(p.cover)} />
            ))}
          </div>
        </div>
      </section>
      <SpecialistCta />
    </>
  );
}
