// Server-side menu construction: keeps the destination/experience data out of the client bundle.
import { destinations } from "@/data/destinations";
import { experiences } from "@/data/experiences";

export type MenuKey = "destinations" | "experiences" | "about";
export type Column = { title: string; links: { label: string; href: string }[] };
export type Menu = { columns: Column[]; all: { label: string; href: string } };

export function buildMenus(): Record<MenuKey, Menu> {
  const dest = (slugs: string[]) =>
    slugs.map((s) => destinations.find((d) => d.slug === s)!).map((d) => ({ label: d.name, href: `/destinations/${d.slug}` }));
  const byRegion = (ids: string[]) =>
    destinations.filter((d) => ids.includes(d.region)).map((d) => ({ label: d.shortName ?? d.name, href: `/destinations/${d.slug}` }));
  const exp = (cats: string[]) =>
    experiences.filter((e) => cats.includes(e.category)).map((e) => ({ label: e.title, href: `/experiences/${e.slug}` }));
  return {
    destinations: {
      columns: [
        { title: "Top destinations", links: dest(["cape-town", "sabi-sand-greater-kruger", "kruger-national-park", "cape-winelands", "garden-route", "drakensberg"]) },
        { title: "Cape & coast", links: byRegion(["western-cape", "garden-route", "eastern-cape"]) },
        { title: "Safari & beyond", links: byRegion(["kruger", "mpumalanga", "kwazulu-natal", "gauteng", "northern-cape"]) },
      ],
      all: { label: "View all destinations", href: "/destinations" },
    },
    experiences: {
      columns: [
        { title: "Safari & wildlife", links: exp(["Safari", "Coast & ocean"]) },
        { title: "Culture, food & wine", links: exp(["Food & wine", "Culture & history"]) },
        { title: "Adventure & occasions", links: exp(["Adventure", "Special occasions"]) },
      ],
      all: { label: "View all experiences", href: "/experiences" },
    },
    about: {
      columns: [
        {
          title: "The company",
          links: [
            { label: "Why travel with us", href: "/about" },
            { label: "Our story", href: "/about#story" },
            { label: "Meet the team", href: "/about#team" },
          ],
        },
        {
          title: "From our guests",
          links: [
            { label: "Testimonials", href: "/testimonials" },
            { label: "Journal", href: "/blog" },
          ],
        },
        {
          title: "Practical",
          links: [
            { label: "Plan your trip", href: "/plan-your-trip" },
            { label: "Where to stay", href: "/stays" },
            { label: "FAQ", href: "/faq" },
            { label: "Contact us", href: "/contact" },
          ],
        },
      ],
      all: { label: "About Cape Compass", href: "/about" },
    },
  };
}

