import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/detail/LegalPage";

export const metadata = buildMetadata({ title: "Booking Terms", path: "/terms", description: "The terms that apply when you book a trip with Cape Compass. Please read them before you book: when you confirm a booking, you accept them." });

export default function Page() {
  return (
    <LegalPage title="Booking Terms" path="/terms" updated="1 November 2026">
      <p className="lead">The terms that apply when you book a trip with Cape Compass. Please read them before you book: when you confirm a booking, you accept them.</p>
      <h2>1. Who we are</h2>
      <p>Cape Compass (“we”, “us”) plans and arranges tailor-made trips. These terms, together with your proposal and booking confirmation, form your contract with us.</p>
      <p>Address: Workshop17 Watershed, 17 Dock Road, V&amp;A Waterfront, Cape Town, 8001, South Africa</p>
      <p>Email: <a href="mailto:capecompass@tourground.com">capecompass@tourground.com</a></p>
      <h2>2. How a booking is made and confirmed</h2>
      <p>Every trip starts with an enquiry. We then send you a written proposal with the itinerary, the price and what is included. Prices on this website are “from” prices per person, given as a guide; your final price is the one confirmed in writing in your proposal.</p>
      <p>Your booking is made when you accept the proposal in writing and pay the deposit, and it is confirmed when we send you a written booking confirmation. The person who makes the booking must be at least 18 years old and accepts these terms on behalf of everyone travelling.</p>
      <h2>3. Deposit, balance and prices</h2>
      <p>A deposit, stated in your proposal, is due when you book. The balance is due on the date shown in your booking confirmation, normally 60 days before departure. If you book less than 60 days before departure, the full price is due when you book.</p>
      <p>If the balance is not paid on time, we may treat the booking as cancelled by you and apply the cancellation charges below.</p>
      <p>Once your booking is confirmed we will not increase the price, except where taxes, park or entry fees or fuel costs imposed by third parties change. We will tell you as soon as possible and show how the change was calculated. If the increase is more than 8% of the trip price, you may cancel and receive a full refund.</p>
      <h2>4. What is included</h2>
      <p>Your proposal and booking confirmation list exactly what is included, typically the accommodation, transport, transfers and activities in your itinerary, and the meals stated.</p>
      <p>Unless stated otherwise, the price does not include international flights, travel insurance, visas, vaccinations, drinks, tips, personal expenses, optional activities or anything not listed as included.</p>
      <h2>5. Changes by you</h2>
      <p>If you want to change your trip after it is confirmed, tell us in writing. We will do our best to make the change, subject to availability. You pay any costs charged by suppliers and any difference in price. Changing your travel dates, or a major change close to departure, may be treated as a cancellation.</p>
      <p>You may transfer your booking to another person who meets all the conditions of the trip by telling us in writing at least 14 days before departure. You and that person are jointly responsible for any balance and for the extra costs the transfer causes.</p>
      <h2>6. Cancellation by you</h2>
      <p>You may cancel at any time by writing to us; the cancellation takes effect on the day we receive it. Unless your booking confirmation sets different charges, we charge the following share of the total trip price:</p>
      <ul>
        <li>More than 60 days before departure: loss of the deposit</li>
        <li>60 to 31 days before departure: 50% of the trip price</li>
        <li>30 to 15 days before departure: 75% of the trip price</li>
        <li>14 days or less before departure, or if you do not travel: 100% of the trip price</li>
      </ul>
      <p>Some elements, such as flights, permits and certain peak-season stays, cannot be refunded once booked; your proposal says so where this applies. Your travel insurance may cover cancellation charges.</p>
      <h2>7. Changes and cancellation by us</h2>
      <p>We plan carefully, but we sometimes have to change arrangements. If we make a minor change, such as a comparable hotel or a different route, we will tell you as soon as we can. If we have to make a significant change or cancel your trip, we will tell you promptly and you may accept the change, choose a comparable alternative, or cancel and receive a full refund of everything you have paid us.</p>
      <p>For departures with a minimum number of travellers, we may cancel if that number is not reached, telling you at least 45 days before departure and refunding everything you have paid us.</p>
      <h2>8. Travel insurance</h2>
      <p>Travel insurance is a condition of booking. Your policy must cover cancellation, medical treatment, emergency evacuation and repatriation, and the activities in your itinerary. Please send us the policy details before you travel.</p>
      <h2>9. Passports, visas and health</h2>
      <p>You are responsible for holding a valid passport, any visas or entry permits, and the vaccinations and health documents your trip requires, and for checking the rules that apply to your nationality. Entry and health rules change; we share the information we have, but please confirm it with the relevant embassy, official government sources and your doctor before you travel.</p>
      <p><Link href="/faq">Read our FAQ on visas, health and travel practicalities</Link></p>
      <h2>10. Our responsibility</h2>
      <p>We are responsible for arranging the services in your booking confirmation with reasonable skill and care. If any part of your trip is not provided as agreed, tell the supplier and us straight away so we can try to put it right.</p>
      <p>We are not responsible for loss, damage or delay caused by you or a member of your party, by a third party unconnected with the services we arranged, or by unusual and unforeseeable circumstances beyond our control. Where international conventions limit a supplier’s liability, for example for flights, our liability is limited in the same way. Except for death or personal injury caused by our negligence, our liability is limited to the total price of your trip. Nothing in these terms limits rights you have under consumer law that cannot be excluded.</p>
      <h2>11. Your behaviour</h2>
      <p>Please respect the laws and customs of the places you visit, follow the safety instructions of our suppliers and local hosts, and our reasonable instructions. If your behaviour puts others at risk or seriously disturbs them, we or the supplier may end your trip without refund, and you will pay any costs that result.</p>
      <h2>12. Complaints</h2>
      <p>If something goes wrong during your trip, tell the supplier and us straight away so we can try to fix it on the spot. If it is not resolved, email us within 28 days of your return. We acknowledge complaints within 14 days and aim to reply in full within 28 days.</p>
      <p>Email: <a href="mailto:capecompass@tourground.com">capecompass@tourground.com</a></p>
      <h2>13. Force majeure</h2>
      <p>We are not liable for any failure or delay caused by unusual and unforeseeable circumstances beyond our control whose consequences could not have been avoided even with all due care, such as war, civil unrest, terrorism, natural disaster, epidemic, severe weather, strikes, or the closure of airports, borders or parks. If such circumstances prevent your trip from going ahead as booked, we will offer you a comparable alternative or a refund of the money you have paid us.</p>
      <h2>14. Data protection</h2>
      <p>We use your personal data to arrange your trip, as explained in our privacy policy.</p>
      <p><Link href="/privacy">Read our privacy policy</Link></p>
      <h2>15. Governing law</h2>
      <p>These terms, and any dispute arising from them, are governed by the law of South Africa, and the courts of South Africa have jurisdiction. If you are a consumer, you may also bring proceedings in the courts of the country where you live, and you keep the protection of the mandatory consumer law of that country.</p>
      <h2>16. Contact</h2>
      <p>Questions about these terms or your booking:</p>
      <p>Email: <a href="mailto:capecompass@tourground.com">capecompass@tourground.com</a></p>
    </LegalPage>
  );
}
