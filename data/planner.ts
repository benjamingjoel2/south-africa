import { images } from "./images";

export const plannerRoutes = [
  { id: "cape-winelands", title: "Cape Town & Winelands", text: "City, coast and vineyards", image: images.winelands },
  { id: "classic", title: "Classic South Africa", text: "Cape Town, Winelands & Kruger", image: images.heroCapeTown },
  { id: "garden-route", title: "Garden Route road trip", text: "Whale coast to Addo", image: images.roadTrip },
  { id: "safari", title: "Safari focus", text: "Kruger & private reserves", image: images.sabiSand },
  { id: "cape-safari", title: "Cape Town + Safari", text: "The best of both", image: images.capeTown },
  { id: "kzn", title: "Drakensberg & KwaZulu-Natal", text: "Mountains, history, warm sea", image: images.drakensberg },
  { id: "jhb-panorama", title: "Johannesburg & Panorama Route", text: "History, canyon, Kruger", image: images.blydeRiver },
  { id: "not-sure", title: "Not sure yet", text: "Tell us what you love", image: images.newsletter },
] as const;

export type PlannerRouteId = (typeof plannerRoutes)[number]["id"];

export const budgetTiers = [
  { id: "comfort", title: "Comfort", priceUsd: 350, text: "Characterful 4-star stays, national-park safari lodges" },
  { id: "premium", title: "Premium", priceUsd: 650, text: "Boutique hotels, wine estates and private-reserve lodges" },
  { id: "ultra", title: "Ultra luxury", priceUsd: 1200, text: "The finest suites, exclusive-use villas and private guiding" },
  { id: "not-sure", title: "Not sure yet", priceUsd: 0, text: "We'll suggest options across a range" },
] as const;

export type BudgetTierId = (typeof budgetTiers)[number]["id"];

export const addOns = [
  { id: "insurance", title: "Travel insurance info", text: "We'll send guidance on suitable cover" },
  { id: "intl-flights", title: "International flights", text: "Help finding the best routings" },
  { id: "domestic-flights", title: "Domestic flights", text: "e.g. Cape Town to the Kruger gateways" },
  { id: "private-driver", title: "Private driver", text: "Chauffeured throughout" },
  { id: "self-drive", title: "Self-drive car hire", text: "Freedom on the Garden Route & Cape" },
  { id: "safari-addon", title: "Safari add-on", text: "Add a few nights in the bush" },
] as const;

export const contactMethods = ["Email", "Telephone"] as const;
