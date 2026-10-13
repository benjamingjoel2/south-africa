import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { CurrencyProvider } from "@/lib/currency";
import { JsonLd } from "@/lib/seo";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { GuidePopup } from "@/components/layout/GuidePopup";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
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
    <html lang="en" className={`${hanken.variable} ${newsreader.variable}`}>
      <body className="min-h-dvh bg-ivory-50 text-charcoal-800">
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
            email: site.contact.email,
            telephone: site.contact.phone,
            address: { "@type": "PostalAddress", addressLocality: "Cape Town", addressCountry: "ZA" },
            areaServed: { "@type": "Country", name: "South Africa" },
          }}
        />
        <CurrencyProvider>
          <TopBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <CookieBanner />
          {site.guidePopup && <GuidePopup />}
          {modal}
        </CurrencyProvider>
      </body>
    </html>
  );
}
