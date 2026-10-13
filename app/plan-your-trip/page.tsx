import { images } from "@/data/images";
import { buildMetadata } from "@/lib/seo";
import { Planner } from "@/components/planner/Planner";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SideCard, IncludedBox } from "@/components/detail/SideCard";

export const metadata = buildMetadata({
  title: "Plan Your Trip",
  description: "Tell us about your South Africa trip in five quick steps. A dedicated local specialist will reply within one working day.",
  path: "/plan-your-trip",
  image: images.winelands,
});

export default function PlanYourTripPage() {
  return (
    <div className="container-x grid gap-12 py-12 lg:grid-cols-12 lg:gap-16 lg:py-16">
      <div className="lg:col-span-7">
        <Breadcrumbs items={[{ name: "Plan a trip", path: "/plan-your-trip" }]} />
        <h1 className="mt-5 text-h1">Begin your South Africa trip.</h1>
        <p className="mt-5 max-w-xl text-lead text-charcoal-700">
          Five short steps. A specialist replies within one working day, usually much sooner. Or skip the form and message us on WhatsApp.
        </p>
        <IncludedBox className="mt-8 max-w-xl" />
        <div className="mt-12 border-t border-ivory-200 pt-10">
          <Planner />
        </div>
      </div>
      <div className="lg:col-span-4 lg:col-start-9">
        <SideCard rating className="lg:sticky lg:top-28" />
      </div>
    </div>
  );
}
