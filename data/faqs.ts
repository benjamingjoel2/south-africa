import type { Faq } from "./types";

export const VERIFY_NOTICE =
  "Entry and document requirements change. Verify against official government sources (South Africa's Department of Home Affairs and your own government's travel advice) before launch and before travel.";

export const faqs: Faq[] = [
  {
    id: "visas",
    category: "Entry & documents",
    verify: true,
    question: "Do I need a visa to visit South Africa?",
    answer:
      "Passport holders from many countries, including the USA, Canada, the UK, Ireland, most EU countries, Australia and New Zealand, are currently visa-exempt for tourist stays of up to 90 days. Other nationalities may need to apply in advance; South Africa has been introducing an electronic visa system for many of them.\n\nYour passport should be valid for at least 30 days beyond your planned departure from South Africa and have at least two completely blank visa pages (endorsement pages don't count). Airlines can deny boarding if you don't meet this.\n\nWe confirm the current rules for every traveller's nationality when you book.",
  },
  {
    id: "children",
    category: "Entry & documents",
    verify: true,
    question: "What documents do children need?",
    answer:
      "Every child needs their own valid passport. South Africa's rules on extra documents for minors have changed several times. Current guidance for visa-exempt visitors strongly recommends carrying an unabridged birth certificate (listing both parents) and, if a child is travelling with only one parent or with other adults, a parental consent affidavit and copies of the absent parent's ID.\n\nRequirements for children who need visas are stricter. Because this changes, we send a family-specific document checklist with your booking.",
  },
  {
    id: "safety",
    category: "Health & safety",
    question: "Is South Africa safe for travellers?",
    answer:
      "The vast majority of visitors have a trouble-free trip. Like anywhere with high inequality, it calls for sensible precautions: don't flash valuables, don't leave anything visible in a car, use registered drivers or ride-hailing apps at night, and take local advice on hikes and neighbourhoods.\n\nThe places we send you, from boutique hotels to private reserves, are chosen for their security as well as their style. Your specialist briefs you before you travel and is on WhatsApp 24/7 while you're here.",
  },
  {
    id: "malaria",
    category: "Health & safety",
    verify: true,
    question: "Do I need malaria tablets or vaccinations?",
    answer:
      "Kruger, the surrounding private reserves, the lowveld and far northern KwaZulu-Natal are malaria areas, with the highest risk during the summer rains (roughly Nov–Apr). Cape Town, the Winelands, the Garden Route, the Eastern Cape reserves, the Drakensberg and Johannesburg are malaria-free.\n\nSee a travel clinic 6–8 weeks before you fly for advice on prophylaxis and routine vaccinations. A yellow fever certificate is required if you're arriving from, or have transited through, a country with yellow fever risk. Prefer to avoid malaria areas altogether? We'll plan a malaria-free safari.",
  },
  {
    id: "best-time",
    category: "Planning",
    question: "When is the best time to visit South Africa?",
    answer:
      "There's no bad time, just different trade-offs. Seasons are reversed from the northern hemisphere. Cape Town is at its best in the dry, sunny summer (Nov–Mar), with winter rain from June to August. Kruger's dry winter (May–Sep) is peak game viewing, while summer rains (Nov–Mar) turn the north and east green. Whale season on the Cape coast runs June to November.\n\nA combined Cape-and-safari trip works year-round. Our month-by-month guide on the blog goes into detail.",
  },
  {
    id: "weather",
    category: "Planning",
    question: "What's the weather like, and what should I pack for the seasons?",
    answer:
      "South Africa spans several climate zones. The Western Cape has a Mediterranean climate (hot, dry, windy summers; cool, wet winters). The northeast, including Kruger, Johannesburg and KwaZulu-Natal, has summer rainfall with afternoon thunderstorms and dry, sunny winters, which are surprisingly cold at night and on early-morning game drives.\n\nWhatever the month, pack layers: a warm fleece or down jacket, a light rain shell, sun protection and comfortable walking shoes.",
  },
  {
    id: "getting-around",
    category: "On the ground",
    question: "How do I get around South Africa?",
    answer:
      "Distances are big, so most itineraries combine a few elements:\n\n• Domestic flights link Cape Town, Johannesburg, Durban, George, Gqeberha and the Kruger gateways (Skukuza, Kruger Mpumalanga and Hoedspruit), with light aircraft serving many private reserves.\n• Self-drive is excellent on the Garden Route and in the Cape. You'll drive on the left; most international licences printed in English are accepted (otherwise carry an International Driving Permit). We advise against driving after dark.\n• Private drivers and guides are our default in cities and the Winelands.\n• There's no reliable public transport network for travellers, apart from Johannesburg's Gautrain, so we arrange every transfer for you.",
  },
  {
    id: "safari-etiquette",
    category: "Safari",
    question: "What should I know about safari etiquette and what to pack?",
    answer:
      "On game drives, stay seated, keep your voice low, never stand up or lean out of the vehicle and follow your ranger's instructions. Never feed animals, and keep a respectful distance on walks.\n\nPack neutral colours (khaki, olive, beige; avoid bright colours that stand out, and dark blue or black, which can attract insects), a warm layer for dawn drives, a hat, sunscreen, insect repellent, binoculars and a camera with a zoom lens. Light-aircraft transfers usually limit luggage to around 20 kg in soft-sided bags.",
  },
  {
    id: "tipping",
    category: "On the ground",
    question: "How much should I tip?",
    answer:
      "Tipping is customary and appreciated. As a guide: 10–15% in restaurants; R10–20 per bag for porters; a few rand for petrol attendants and car guards; and for private guides and drivers, around R300–600 per day depending on group size.\n\nOn safari, many guests tip their ranger and tracker separately (roughly US$10–20 and US$5–10 per guest per day respectively), plus a general staff tip. Your specialist will include suggested amounts in your travel documents.",
  },
  {
    id: "money",
    category: "On the ground",
    question: "What currency is used, and can I use cards and ATMs?",
    answer:
      "The currency is the South African rand (ZAR, R). Visa and Mastercard are accepted almost everywhere, including most markets; Amex less so. ATMs are widely available. Use ones inside banks, malls or hotels during the day, and shield your PIN.\n\nCarry some cash for tips and small purchases. Tell your bank you're travelling, and consider a card with no foreign transaction fees. Lodge extras and gratuities can often be paid by card.",
  },
];
