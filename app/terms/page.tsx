import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/detail/LegalPage";

export const metadata = buildMetadata({ title: "Terms & Conditions", path: "/terms", description: `Booking terms and conditions for ${site.name}: quotes and pricing, deposits and payments, changes and cancellations, travel insurance and your responsibilities.` });

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" path="/terms" updated="TBC">
      <p>These terms apply to bookings made with {site.name}. Please read them carefully before confirming your trip.</p>
      <h2>Quotes and pricing</h2>
      <p>Prices shown on this website are indicative &ldquo;from&rdquo; prices per person, based on two adults sharing, and exclude international flights unless stated. Prices displayed in currencies other than US dollars are approximate conversions. Your written quote is final.</p>
      <h2>Deposits and payment</h2>
      <p>[Deposit amount, balance due date and accepted payment methods to be confirmed.]</p>
      <h2>Cancellations and changes</h2>
      <p>[Cancellation schedule and supplier-specific conditions to be confirmed.]</p>
      <h2>Travel insurance</h2>
      <p>Comprehensive travel insurance, including medical evacuation and cancellation cover, is strongly recommended for all travellers.</p>
      <h2>Travel documents</h2>
      <p>You are responsible for holding a valid passport, any required visas and documents for children. Entry requirements change, so always check official government sources.</p>
    </LegalPage>
  );
}
