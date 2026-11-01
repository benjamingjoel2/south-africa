import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/detail/LegalPage";

export const metadata = buildMetadata({ title: "Cookie Policy", path: "/cookies", description: "What the Cape Compass website stores in your browser, and why." });

export default function Page() {
  return (
    <LegalPage title="Cookie Policy" path="/cookies" updated="1 November 2026">
      <p className="lead">What the Cape Compass website stores in your browser, and why.</p>
      <h2>What cookies are</h2>
      <p>Cookies are small text files that a website saves in your browser. Similar technologies, such as local storage and session storage, let a site keep small pieces of information in your browser. In this policy, “cookies” covers all of them.</p>
      <h2>What this site uses</h2>
      <p>This site sets no cookies. It uses only the browser storage listed below, which is needed for features you choose to use.</p>
      <div className="legal-table-wrap">
        <table>
          <thead><tr><th scope="col">Name</th><th scope="col">Purpose</th><th scope="col">Duration</th><th scope="col">Type</th></tr></thead>
          <tbody>
            <tr><td>cc-planner-v1</td><td>Remembers your answers and the step you reached in the trip planner so you can finish later; cleared when you submit it</td><td>Until you clear your browser storage</td><td>Local storage, essential</td></tr>
            <tr><td>cc-currency</td><td>Remembers the display currency you chose for prices</td><td>Until you clear your browser storage</td><td>Local storage, essential</td></tr>
            <tr><td>cc-cookie-consent</td><td>Remembers your answer to the cookie notice so it is not shown again</td><td>Until you clear your browser storage</td><td>Local storage, essential</td></tr>
            <tr><td>cc-guide-popup</td><td>Remembers that you closed or used the South Africa guide pop-up so it is not shown again</td><td>Until you clear your browser storage</td><td>Local storage, essential</td></tr>
          </tbody>
        </table>
      </div>
      <p>We do not use analytics, advertising or social-media tracking cookies.</p>
      <h2>Consent</h2>
      <p>Essential items do not need your consent because the site, or a feature you ask for, cannot work without them. If we ever add cookies that are not essential, such as analytics, we will ask for your consent first and update this policy.</p>
      <h2>Third-party content</h2>
      <ul>
        <li>This website is hosted by Vercel, which processes your IP address in its server logs to deliver the pages. Vercel sets no cookies on this site.</li>
        <li>Photographs and fonts are served from this website, so no third party receives your data when they load.</li>
        <li>We do not embed videos, social-media widgets or advertising.</li>
      </ul>
      <h2>How to manage or disable cookies</h2>
      <p>You can view and delete cookies and site data at any time in your browser settings, and you can block them altogether. Look for “cookies” or “site data” in the privacy settings of Chrome, Firefox, Safari or Edge; each browser’s help pages explain the steps.</p>
      <p>If you block site storage, the site still works, but the planner, currency choice and notices will not remember your choices.</p>
      <h2>Changes to this policy</h2>
      <p>We will update this policy if the way this site uses cookies changes. The date at the top shows the latest version.</p>
      <h2>Contact</h2>
      <p>Questions about this policy:</p>
      <p>Email: <a href="mailto:capecompass@tourground.com">capecompass@tourground.com</a></p>
    </LegalPage>
  );
}
