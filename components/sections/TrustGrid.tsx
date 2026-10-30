import { site } from "@/config/site";

const years = new Date().getFullYear() - site.foundedYear;

const items = [
  { title: "One specialist", text: "From the first message to the day you come home, never a chain of strangers." },
  { title: `${years >= 10 ? "Fourteen" : years} years`, text: `Planning South Africa since ${site.foundedYear}, from our base in Cape Town.` },
  { title: "Vetted lodges", text: "Direct relationships with the guides, drivers and properties we send you to." },
  { title: "Fair pricing", text: "Direct local rates, in your currency, with no surprise add-ons. The specialist comes free on top." },
  { title: "Always reachable", text: "Your specialist looks after you throughout your trip, from departure day to the flight home." },
  { title: "Eight regions", text: "From the Cape and the Garden Route to Kruger, the Drakensberg, the Zulu coast and the Kalahari." },
];

export function TrustGrid() {
  return (
    <section className="border-y border-ivory-200 bg-bone" aria-label="Why Cape Compass">
      <div className="container-x grid gap-x-10 gap-y-10 py-14 sm:grid-cols-2 lg:grid-cols-3 lg:py-16">
        {items.map((it) => (
          <div key={it.title}>
            <h2 className="font-display-italic text-[1.5rem]">{it.title}</h2>
            <p className="mt-2 max-w-sm text-[0.9375rem] text-charcoal-700">{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
