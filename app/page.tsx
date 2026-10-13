import { Hero } from "@/components/sections/Hero";
import { TrustGrid } from "@/components/sections/TrustGrid";
import { PopularDestinations } from "@/components/sections/PopularDestinations";
import { ExperienceGrid } from "@/components/sections/ExperienceGrid";
import { Itineraries } from "@/components/sections/Itineraries";
import { LodgesBand } from "@/components/sections/LodgesBand";
import { WhyUs } from "@/components/sections/WhyUs";
import { GuideSignup } from "@/components/sections/GuideSignup";
import { BespokeLine, SpecialistCta } from "@/components/sections/SpecialistCta";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/data/images";

export const metadata = buildMetadata({ path: "/", image: images.heroCapeTown });

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustGrid />
      <PopularDestinations />
      <ExperienceGrid />
      <Itineraries />
      <LodgesBand />
      <WhyUs />
      <GuideSignup />
      <SpecialistCta />
      <BespokeLine />
    </>
  );
}
