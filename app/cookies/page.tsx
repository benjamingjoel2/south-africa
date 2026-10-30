import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/detail/LegalPage";

export const metadata = buildMetadata({ title: "Cookie Policy", path: "/cookies", description: "How the Cape Compass website uses cookies and your browser’s local storage." });

export default function Page() {
  return (
    <LegalPage title="Cookie Policy" path="/cookies" updated="30 October 2026">
      <h2>What cookies and local storage are</h2>
      <p>Cookies are small text files a website saves in your browser. Local storage is a similar feature that lets a website remember information on your own device. Neither is sent to us unless a page specifically reads it.</p>
      <h2>Cookies we use</h2>
      <p>This website does not set any cookies, and it does not use advertising or tracking cookies of any kind.</p>
      <h2>Local storage we use</h2>
      <p>We use your browser’s local storage only for features you choose to use:</p>
      <ul>
        <li>cc-planner-v1 (local storage): Remembers your answers and the step you reached in the trip planner, so you can finish it later. Cleared when you submit the planner, or when you clear your browser data.</li>
        <li>cc-currency (local storage): Remembers the display currency you chose for guide prices. Kept until you clear your browser data.</li>
        <li>cc-cookie-consent (local storage): Remembers your answer to the cookie notice. Kept until you clear your browser data.</li>
        <li>cc-guide-popup (local storage): Remembers that you have closed or used the South Africa guide pop-up, so it is not shown again. Kept until you clear your browser data.</li>
      </ul>
      <p>This information stays on your device. It is not sent to us until you choose to submit the form.</p>
      <h2>Analytics and third parties</h2>
      <p>We do not use analytics, advertising or social-media tracking on this website. Photographs and fonts are served from our own website, so no third party receives information about your visit when you load a page.</p>
      <h2>Consent and how to withdraw it</h2>
      <p>The items above are strictly necessary for features you use, so they do not need your consent. The cookie notice asks whether you would accept analytics; we do not run any analytics today, and if we add them they will only load after you accept. To change your answer, clear this site’s data in your browser and the notice will appear again.</p>
      <p>You can remove anything this site has stored at any time by clearing your browser’s site data for this website (usually under Settings, then Privacy, then Cookies and site data), or by using a private browsing window. You can also block cookies and storage entirely in your browser settings; the site will still work, but a half-completed trip planner will not be remembered.</p>
      <h2>Questions</h2>
      <p>If you have any questions about this policy, email us at <a href="mailto:capecompass@tourground.com">capecompass@tourground.com</a>. Our <Link href="/privacy">Privacy Policy</Link> explains how we handle personal information.</p>
    </LegalPage>
  );
}
