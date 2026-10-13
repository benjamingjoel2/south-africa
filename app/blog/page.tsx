import { getAllPosts, postCover as cover } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { PostCard } from "@/components/cards/PostCard";
import { Reveal } from "@/components/motion/Reveal";
import { GuideSignup } from "@/components/sections/GuideSignup";

export const metadata = buildMetadata({
  title: "South Africa Travel Journal",
  description: "Expert South Africa travel advice: where to go, when to visit, which safari to choose and where to stay.",
  path: "/blog",
});

export default function BlogPage() {
  const [first, ...rest] = getAllPosts();
  return (
    <>
      <PageHero
        label="Journal"
        title={["Notes from", "the Cape and beyond"]}
        description="Honest, practical advice from our specialists: seasons, safaris, where to stay and how to make the most of every day."
        crumbs={[{ name: "Blog", path: "/blog" }]}
      />
      <div className="container-x section-y">
        {first && (
          <Reveal>
            <PostCard post={first} coverUrl={cover(first.cover)} large className="lg:w-3/4" />
          </Reveal>
        )}
        <div className="mt-16 grid gap-x-5 gap-y-14 border-t border-white/10 pt-16 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <PostCard post={p} coverUrl={cover(p.cover)} />
            </Reveal>
          ))}
        </div>
      </div>
      <GuideSignup />
    </>
  );
}
