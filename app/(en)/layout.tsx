import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { CurrencyProvider } from "@/lib/currency";
import { JsonLd } from "@/lib/seo";
import { images } from "@/data/images";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { buildMenus } from "@/components/layout/menus";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { GuidePopup } from "@/components/layout/GuidePopup";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Only the two serif faces the design uses: 500 upright for headings, 400 italic for accents.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: "500",
  style: "normal",
  display: "swap",
});

const newsreaderItalic = Newsreader({
  variable: "--font-newsreader-italic",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Tailor-made South Africa Trips`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, locale: site.locale, type: "website" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  // Set GOOGLE_SITE_VERIFICATION in Vercel once the domain is added to Search Console.
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
};

export const viewport: Viewport = {
  themeColor: site.colors.forestDeep,
  colorScheme: "light",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <html lang="en" className={`${hanken.variable} ${newsreader.variable} ${newsreaderItalic.variable}`}>
      <body className="min-h-dvh bg-ivory-50 text-charcoal-800">
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.setAttribute('data-js','')" }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-forest-700 focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            name: site.name,
            description: site.description,
            url: site.url,
            logo: `${site.url}/icon.svg`,
            image: `${images.heroCapeTown}?w=1200&h=630&fit=crop&q=80`,
            foundingDate: String(site.foundedYear),
            email: site.contact.email,
            address: { "@type": "PostalAddress", streetAddress: "Workshop17 Watershed, 17 Dock Road, V&A Waterfront", addressLocality: "Cape Town", postalCode: "8001", addressCountry: "ZA" },
            areaServed: { "@type": "Country", name: "South Africa" },
            knowsLanguage: "en",
          }}
        />
        <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url, inLanguage: "en" }} />
        <CurrencyProvider>
          <TopBar />
          <Header menus={buildMenus()} />
          <main id="main">{children}</main>
          <Footer />
          <CookieBanner />
          {site.guidePopup && <GuidePopup />}
          {modal}
        </CurrencyProvider>
      </body>
    </html>
  );
}
