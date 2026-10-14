import Image from "next/image";
import type { ItineraryDay } from "@/data/types";
import { cn } from "@/lib/utils";

export function DayRow({ day, index, image }: { day: ItineraryDay; index: number; image?: string }) {
  const flip = index % 2 === 1;
  return (
    <div className="grid items-center gap-8 border-b border-ivory-200 py-12 lg:grid-cols-2 lg:gap-14 lg:py-16">
      <div className={cn(flip && "lg:order-2")}>
        <p className="eyebrow">{day.day}</p>
        <h3 className="mt-3 text-h3">{day.title}</h3>
        <p className="mt-5 text-[0.9375rem] leading-relaxed text-charcoal-700">{day.description}</p>
        {(day.overnight || (day.meals && day.meals !== "—")) && (
          <p className="mt-5 text-[0.9375rem] text-charcoal-700">
            {day.overnight && <>Accommodation: {day.overnight}</>}
            {day.overnight && day.meals && day.meals !== "—" && " · "}
            {day.meals && day.meals !== "—" && <>Meals: {day.meals}</>}
          </p>
        )}
      </div>
      {image && (
        <div className={cn("relative aspect-[4/3] overflow-hidden bg-ivory-200", flip && "lg:order-1")}>
          <Image src={image} alt={`${day.day}: ${day.title}`} fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
        </div>
      )}
    </div>
  );
}
