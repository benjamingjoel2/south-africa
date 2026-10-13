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
import { FinalCta } from "@/components/sections/FinalCta";

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
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: cover(post.cover),
          datePublished: post.date,
          author: { "@type": "Organization", name: post.author },
          publisher: { "@type": "Organization", name: site.name },
          mainEntityOfPage: `${site.url}/blog/${post.slug}`,
        }}
      />
      <article className="pt-28 md:pt-36">
        <div className="container-x">
          <Breadcrumbs items={[{ name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]} />
          <header className="mx-auto mt-12 max-w-3xl">
            <p className="text-sm text-white/50">
              <span className="text-ochre-400">{post.category}</span> · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime}
            </p>
            <h1 className="mt-4 text-h1 font-semibold text-balance">{post.title}</h1>
            <p className="mt-6 text-body-xl text-white/65">{post.excerpt}</p>
          </header>
          <div className="relative mx-auto mt-12 aspect-[16/9] max-w-5xl overflow-hidden rounded-card">
            <Image src={cover(post.cover)} alt="" fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
          </div>
          <div className="prose-cc mx-auto mt-14 max-w-3xl pb-20">
            <MDXRemote source={post.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
            <p className="!mt-14 border-t border-white/10 pt-6 text-sm text-white/55">By {post.author}</p>
          </div>
        </div>
      </article>
      <section className="section-y border-t border-white/10" aria-label="More from the journal">
        <div className="container-x">
          <h2 className="text-h3 font-semibold">More from the journal</h2>
          <div className="mt-10 grid gap-x-5 gap-y-12 md:grid-cols-3">
            {more.map((p) => (
              <PostCard key={p.slug} post={p} coverUrl={cover(p.cover)} />
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
