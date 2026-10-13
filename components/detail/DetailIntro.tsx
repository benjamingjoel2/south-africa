import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";

/** Detail-page intro: breadcrumbs, big title and a photo mosaic (reference retreat template). */
export function DetailIntro({
  crumbs,
  eyebrow,
  title,
  subtitle,
  images,
  imageAlt,
}: {
  crumbs: { name: string; path: string }[];
  eyebrow?: React.ReactNode;
  title: string;
  subtitle?: string;
  images: string[];
  imageAlt: string;
}) {
  const [main, ...rest] = images;
  const side = rest.slice(0, 2);
  return (
    <section className="pt-28 md:pt-36">
      <div className="container-x">
        <Breadcrumbs items={crumbs} />
        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            {eyebrow && <Reveal className="mb-5 flex flex-wrap gap-2">{eyebrow}</Reveal>}
            <SplitReveal as="h1" immediate lines={[title]} className="text-h1 font-semibold text-balance" />
          </div>
          {subtitle && (
            <Reveal delay={0.2} className="text-body-xl text-white/65 md:col-span-4">
              {subtitle}
            </Reveal>
          )}
        </div>

        <Reveal delay={0.15} className="mt-10 grid gap-3 md:mt-14 md:grid-cols-3 md:grid-rows-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[32rem]">
            <Image src={main} alt={imageAlt} fill priority sizes="(min-width: 768px) 66vw, 100vw" className="object-cover" />
          </div>
          {side.map((src, i) => (
            <div key={src + i} className="relative hidden aspect-[4/3] overflow-hidden rounded-card md:block md:aspect-auto">
              <Image src={src} alt="" fill sizes="33vw" className="object-cover" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
