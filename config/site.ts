// Single source of truth for brand, contact, navigation and currency settings.
// Replace the [BRACKETED] placeholders before launch.

export const site = {
  name: "Cape Compass",
  shortName: "Cape Compass",
  tagline: "Tailor-made South Africa, from the Cape and beyond",
  description:
    "Tailor-made South Africa trips planned by one dedicated local specialist, from Cape Town and the Winelands to Kruger's private reserves, the Garden Route and the Drakensberg.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cape-compass.vercel.app",
  locale: "en_ZA",
  foundedYear: 2012,

  contact: {
    email: "[EMAIL]",
    phone: "+27 21 000 0000",
    phoneHref: "tel:+27210000000",
    // Digits only, international format without "+", e.g. 27820000000
    whatsappNumber: "[NUMBER]",
    whatsappMessage: "Hi Cape Compass, I'd love help planning a South Africa trip.",
    address: "Cape Town, Western Cape, South Africa",
    hours: "Mon–Fri 08:00–18:00 SAST · WhatsApp support 24/7 while you travel",
  },

  social: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Facebook", href: "https://facebook.com/" },
    { label: "Pinterest", href: "https://pinterest.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
  ],

  nav: [
    { label: "Destinations", href: "/destinations" },
    { label: "Tours", href: "/tours" },
    { label: "Experiences", href: "/experiences" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],

  footerNav: [
    {
      title: "Explore",
      links: [
        { label: "Destinations", href: "/destinations" },
        { label: "Tours", href: "/tours" },
        { label: "Experiences", href: "/experiences" },
        { label: "Stays", href: "/stays" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About us", href: "/about" },
        { label: "Testimonials", href: "/testimonials" },
        { label: "Journal", href: "/blog" },
        { label: "FAQ", href: "/faq" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],

  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],

  colors: {
    slate: "#1C2124",
    surface: "#252B2F",
    teal: "#0F5257",
    ochre: "#C8693A",
    protea: "#E07A8F",
    sand: "#F4EEE4",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Currencies. All prices in /data are stored in USD.                  */
/* Rates are static placeholders — TODO: fetch live rates at build or  */
/* on an interval (e.g. via an FX API) before launch.                  */
/* ------------------------------------------------------------------ */
export const currencies = {
  USD: { code: "USD", label: "US Dollar", symbol: "$", rate: 1, locale: "en-US" },
  EUR: { code: "EUR", label: "Euro", symbol: "€", rate: 0.92, locale: "de-DE" },
  GBP: { code: "GBP", label: "British Pound", symbol: "£", rate: 0.79, locale: "en-GB" },
  CAD: { code: "CAD", label: "Canadian Dollar", symbol: "C$", rate: 1.37, locale: "en-CA" },
  ZAR: { code: "ZAR", label: "South African Rand", symbol: "R", rate: 18.2, locale: "en-ZA" },
} as const;

export type CurrencyCode = keyof typeof currencies;
export const currencyCodes = Object.keys(currencies) as CurrencyCode[];
export const defaultCurrency: CurrencyCode = "USD";

export function whatsappHref(message: string = site.contact.whatsappMessage) {
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
