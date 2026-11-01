import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/detail/LegalPage";

export const metadata = buildMetadata({ title: "Privacy Policy", path: "/privacy", description: "How Cape Compass collects, uses and protects your personal data when you visit this website, send us an enquiry or book a trip." });

export default function Page() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy" updated="1 November 2026">
      <p className="lead">How Cape Compass collects, uses and protects your personal data when you visit this website, send us an enquiry or book a trip.</p>
      <h2>Who we are</h2>
      <p>Cape Compass plans and arranges tailor-made trips. We are the controller of the personal data described in this policy.</p>
      <p>Address: Workshop17 Watershed, 17 Dock Road, V&amp;A Waterfront, Cape Town, 8001, South Africa</p>
      <p>Email: <a href="mailto:capecompass@tourground.com">capecompass@tourground.com</a></p>
      <h2>What data we collect</h2>
      <ul>
        <li>Enquiry details: what you enter in our enquiry form or send us by email, such as your name, email address, travel dates, number of travellers, interests, budget and your message.</li>
        <li>Booking details: when you book, what we need to arrange your trip, such as the full names of travellers as shown in their passports, dates of birth, nationality, arrival and departure details, dietary requirements and, only if you choose to share them, health or mobility needs.</li>
        <li>Correspondence: the emails and messages you exchange with us.</li>
        <li>Technical data: when you visit the site, our hosting provider automatically records server logs with your IP address, browser type, the pages requested and the date and time. They are used only to run the site securely and to fix errors.</li>
        <li>Browser storage: the small items described in our cookie policy.</li>
      </ul>
      <p>We do not collect payment card details through this website, and the site uses no analytics or advertising trackers.</p>
      <h2>Why we use it and our legal bases</h2>
      <ul>
        <li>To answer your enquiry and prepare a proposal: steps taken at your request before entering into a contract, and our legitimate interest in replying to people who contact us.</li>
        <li>To book and run your trip, including passing the necessary details to the suppliers who deliver it: performance of our contract with you.</li>
        <li>To take account of health or mobility information you choose to share: your explicit consent, which you can withdraw at any time.</li>
        <li>To keep the site secure and working, and to handle complaints or legal claims: our legitimate interests.</li>
        <li>To keep accounting and tax records: compliance with our legal obligations.</li>
        <li>To send you news, only if you have asked for it: your consent, which you can withdraw at any time.</li>
      </ul>
      <p>We never sell your personal data, and we do not use it for automated decision-making or profiling.</p>
      <h2>Who we share it with</h2>
      <ul>
        <li>Vercel Inc., which hosts this website and processes the technical logs described above.</li>
        <li>Vercel also runs our enquiry form, so the details you send are received and briefly logged on its servers before they reach us.</li>
        <li>Our email provider, which stores and delivers the messages we exchange with you.</li>
        <li>The travel suppliers who deliver your trip, such as hotels, lodges and camps, transport and transfer companies, airlines, activity providers and park or permit authorities. Each receives only what it needs for your booking.</li>
        <li>Professional advisers, public authorities or courts, where the law requires it or to establish or defend legal claims.</li>
      </ul>
      <p>Our service providers act on our instructions and must keep your data secure and confidential.</p>
      <h2>International transfers</h2>
      <p>Vercel and some of our other providers may process data in the United States and other countries. Your trip takes place in South Africa, so the suppliers there receive the details they need. Where data protection law requires it, we rely on adequacy decisions, standard contractual clauses or equivalent safeguards, or on the transfer being necessary to perform the contract you asked us for. You can ask us for details of these safeguards.</p>
      <h2>How long we keep it</h2>
      <ul>
        <li>Enquiries that do not lead to a booking: up to two years after our last contact.</li>
        <li>Booking records: as long as tax and accounting law requires, usually up to seven years after your trip.</li>
        <li>Health or mobility details: deleted once your trip is over, unless you ask us to keep them for a future trip.</li>
        <li>Server logs: kept by our hosting provider for a short period, normally no more than 30 days.</li>
      </ul>
      <h2>How we protect it</h2>
      <p>We keep personal data in access-controlled systems, use encrypted connections (HTTPS) on this site and share data only as described here. If a breach affects your data and puts your rights at risk, we will tell you without undue delay.</p>
      <h2>Your rights</h2>
      <p>Depending on where you live, you have the right to:</p>
      <ul>
        <li>access the personal data we hold about you;</li>
        <li>have inaccurate data corrected (rectification);</li>
        <li>have your data deleted (erasure);</li>
        <li>restrict how we use your data (restriction);</li>
        <li>receive your data in a portable format or have it sent to someone else (portability);</li>
        <li>object to our use of your data based on legitimate interests, and to direct marketing at any time (objection);</li>
        <li>withdraw your consent at any time, without affecting what we did before;</li>
        <li>complain to a data protection supervisory authority, in particular in the country where you live or work.</li>
      </ul>
      <p>To exercise any of these rights, email us. We reply within one month.</p>
      <p>Email: <a href="mailto:capecompass@tourground.com">capecompass@tourground.com</a></p>
      <h2>Cookies</h2>
      <p>This site uses only the browser storage described in our cookie policy.</p>
      <p><Link href="/cookies">Read our cookie policy</Link></p>
      <h2>Children</h2>
      <p>This website is not aimed at children and we do not knowingly collect data from children under 16. We only process details of children travelling with their family when a parent or guardian gives them to us for a booking.</p>
      <h2>Changes to this policy</h2>
      <p>We may update this policy when our services or the law change. The date at the top shows when it was last updated.</p>
      <h2>Contact</h2>
      <p>Questions about this policy or your personal data: write to Cape Compass at the address above, or email us.</p>
      <p>Email: <a href="mailto:capecompass@tourground.com">capecompass@tourground.com</a></p>
    </LegalPage>
  );
}
