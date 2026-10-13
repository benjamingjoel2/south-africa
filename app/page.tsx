import { Hero } from "@/components/sections/Hero";
import { TrustRow } from "@/components/sections/TrustRow";
import { AboutWhyUs } from "@/components/sections/AboutWhyUs";
import { FeaturedTours } from "@/components/sections/FeaturedTours";
import { BuildYourTrip } from "@/components/sections/BuildYourTrip";
import { DestinationsGrid } from "@/components/sections/DestinationsGrid";
import { ExperiencesGrid } from "@/components/sections/ExperiencesGrid";
import { StaysRow } from "@/components/sections/StaysRow";
import { Testimonials } from "@/components/sections/Testimonials";
import { GuideSignup } from "@/components/sections/GuideSignup";
import { FinalCta } from "@/components/sections/FinalCta";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/data/images";

export const metadata = buildMetadata({
  path: "/",
  image: images.heroCapeTown,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustRow />
      <AboutWhyUs />
      <FeaturedTours />
      <BuildYourTrip />
      <DestinationsGrid />
      <ExperiencesGrid />
      <StaysRow />
      <Testimonials />
      <GuideSignup />
      <FinalCta />
    </>
  );
}
