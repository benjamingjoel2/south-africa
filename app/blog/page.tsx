import { getAllPosts, postCover as cover } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Display } from "@/components/ui/Type";
import { PostCard } from "@/components/cards/PostCard";
import { GuideSignup } from "@/components/sections/GuideSignup";

export const metadata = buildMetadata({ title: "South Africa Travel Journal", description: "Expert South Africa travel advice: where to go, when to visit, which safari to choose and where to stay.", path: "/blog" });

export default function BlogPage() {
  const [first, ...rest] = getAllPosts();
  return (
    <>
      <section className="container-x pt-12 lg:pt-16">
        <Breadcrumbs items={[{ name: "Journal", path: "/blog" }]} />
        <Display as="h1" size="h1" lead="Notes from the Cape, and" accent="beyond" className="mt-5" />
        <p className="mt-5 max-w-2xl text-lead text-charcoal-700">Honest, practical advice from our specialists: seasons, safaris, where to stay and how to make the most of every day.</p>
      </section>
      <div className="container-x section-y">
        {first && <PostCard post={first} coverUrl={cover(first.cover)} large className="lg:w-3/4" />}
        <div className="mt-16 grid gap-x-8 gap-y-14 border-t border-ivory-200 pt-14 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <PostCard key={p.slug} post={p} coverUrl={cover(p.cover)} />
          ))}
        </div>
      </div>
      <GuideSignup />
    </>
  );
}
