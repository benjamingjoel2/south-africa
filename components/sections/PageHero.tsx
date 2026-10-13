import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHead } from "@/components/ui/SectionHead";

/** Listing-page intro: breadcrumbs + the reference's 3/9 head as the H1, optional wide image. */
export function PageHero({
  label,
  title,
  description,
  crumbs,
  image,
  action,
}: {
  label: string;
  title: string[];
  description?: React.ReactNode;
  crumbs: { name: string; path: string }[];
  image?: string;
  action?: React.ReactNode;
}) {
  return (
    <section className="pt-28 md:pt-36" aria-label={label}>
      <div className="container-x">
        <Breadcrumbs items={crumbs} />
        <SectionHead as="h1" label={label} title={title} description={description} action={action} className="mt-12 md:mt-16" />
      </div>
      {image && (
        <div className="container-x mt-14 md:mt-20">
          <div className="relative aspect-[16/9] overflow-hidden rounded-card md:aspect-[21/8]">
            <Image src={image} alt="" fill priority sizes="(min-width: 1440px) 1344px, 100vw" className="object-cover" />
          </div>
        </div>
      )}
    </section>
  );
}
