// Content model. Shapes are CMS-friendly: flat, slug-keyed, references by slug.

export type RegionId =
  | "western-cape"
  | "garden-route"
  | "kruger"
  | "mpumalanga"
  | "kwazulu-natal"
  | "gauteng"
  | "eastern-cape"
  | "northern-cape";

export type Region = { id: RegionId; name: string };

/** Month rating for the best-time-to-visit grid. */
export type MonthRating = "best" | "good" | "mixed";
export type MonthKey = "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";

export type Faq = {
  id: string;
  question: string;
  answer: string; // plain text, paragraphs separated by \n\n
  category: "Entry & documents" | "Health & safety" | "Planning" | "On the ground" | "Safari";
  /** Requirements that change over time — show a verify-before-launch notice. */
  verify?: boolean;
};

export type Destination = {
  slug: string;
  name: string;
  shortName?: string;
  region: RegionId;
  tagline: string;
  summary: string; // card text
  overview: string[]; // paragraphs
  image: string;
  gallery: string[];
  months: Record<MonthKey, MonthRating>;
  seasonNote: string;
  highlights: string[];
  thingsToDo: { title: string; text: string }[];
  tips: string[];
  idealNights: string;
  experienceSlugs: string[];
  staySlugs: string[];
  faqs: { question: string; answer: string }[];
};

export type Experience = {
  slug: string;
  title: string;
  category: "Safari" | "Coast & ocean" | "Food & wine" | "Culture & history" | "Adventure" | "Special occasions";
  destinationSlugs: string[];
  summary: string;
  description: string[];
  duration: string;
  bestTime: string;
  priceFromUsd?: number;
  image: string;
  includes: string[];
  goodToKnow: string[];
};

export type BudgetTier = "comfort" | "premium" | "ultra";

export type ItineraryDay = {
  day: string; // "Day 1" or "Days 2–3"
  title: string;
  description: string;
  overnight?: string;
  meals?: string;
};

export type Tour = {
  slug: string;
  title: string;
  subtitle: string;
  nights: number;
  regions: RegionId[];
  destinationSlugs: string[];
  budget: BudgetTier;
  priceFromUsd: number; // per person sharing
  inclusionsLine: string; // card summary, e.g. "Most meals · 9 activities · All transfers"
  highlights: string[]; // 3–4 bullets
  overview: string[];
  idealFor: string[];
  bestTime: string;
  image: string;
  gallery: string[];
  itinerary: ItineraryDay[];
  included: string[];
  excluded: string[];
  staySlugs: string[];
  featured?: boolean;
};

export type Stay = {
  slug: string;
  name: string;
  type: "Boutique hotel" | "Wine estate" | "Coastal lodge" | "Private game lodge" | "Mountain lodge";
  destinationSlug: string;
  location: string;
  summary: string;
  description: string[];
  priceFromUsdPerNight: number; // per person, per night sharing
  image: string;
  gallery: string[];
  features: string[];
  roomCount: number;
  goodFor: string[];
};

export type Testimonial = {
  id: string;
  /** Always true until real, consented reviews replace these. */
  placeholder: true;
  name: string;
  from: string;
  trip: string;
  tourSlug?: string;
  quote: string;
  rating: 5 | 4;
  travelled: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  cover: string;
  author: string;
  content: string; // raw MDX
};
