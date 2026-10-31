import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Type";

export default function NotFound() {
  return (
    <div className="container-x py-24 text-center lg:py-32">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-4 text-h1">
        Off the <em className="accent">map</em>.
      </h1>
      <p className="mx-auto mt-5 max-w-md text-lead text-charcoal-700">This page doesn&rsquo;t exist, but plenty of beautiful places do. Let&rsquo;s get you back on route.</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href="/" arrow>Back home</ButtonLink>
        <ButtonLink href="/destinations" variant="outline-dark">Explore destinations</ButtonLink>
      </div>
    </div>
  );
}
