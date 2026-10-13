import { ButtonLink } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[80svh] flex-col items-center justify-center pt-24 text-center">
      <LogoMark className="size-14 animate-[spin_12s_linear_infinite]" />
      <p className="mt-8 label text-ochre">404</p>
      <h1 className="mt-4 text-h1 font-semibold">Off the map.</h1>
      <p className="mt-5 max-w-md text-body-lg text-white/60">
        This page doesn&apos;t exist, but plenty of beautiful places do. Let&apos;s get you back on route.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" icon>Back home</ButtonLink>
        <ButtonLink href="/destinations" variant="secondary">Explore destinations</ButtonLink>
      </div>
    </div>
  );
}
