import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/detail/LegalPage";

export const metadata = buildMetadata({ title: "Privacy Policy", path: "/privacy", description: `How ${site.name} collects, uses, stores and protects your personal information when you enquire, plan a trip or subscribe to the South Africa guide.` });

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy" updated="TBC">
      <p>This policy explains how {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects and uses personal information when you use this website or plan a trip with us.</p>
      <h2>Information we collect</h2>
      <ul>
        <li>Details you give us in the trip planner, contact form or guide signup: name, email, phone number, travel dates, party size, children&apos;s ages and preferences.</li>
        <li>Information needed to book your trip, such as passport details and dietary or medical requirements, shared only with the suppliers who need it.</li>
        <li>Basic analytics and cookie data about how the site is used, if you consent.</li>
      </ul>
      <h2>How we use it</h2>
      <p>To respond to your enquiry, design and book your trip, support you while you travel, and (only if you opt in) send occasional travel news. We never sell your data.</p>
      <h2>Your rights</h2>
      <p>You can ask to access, correct or delete your information at any time by emailing {site.contact.email}.</p>
      <h2>Cookies</h2>
      <p>We use essential storage to remember your currency choice and planner progress, and optional analytics cookies only with your consent.</p>
      <h2>Contact</h2>
      <p>{site.name}, {site.contact.address}. Email: {site.contact.email}.</p>
    </LegalPage>
  );
}
