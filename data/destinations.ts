import type { Destination } from "./types";
import { images } from "./images";

export const destinations: Destination[] = [
  {
    slug: "cape-town",
    name: "Cape Town",
    region: "western-cape",
    tagline: "Where the mountain meets two oceans",
    summary:
      "Table Mountain, Atlantic beaches, a world-class food scene and the Cape Peninsula on your doorstep.",
    overview: [
      "Almost every great South Africa trip begins here. Cape Town sits beneath the flat-topped bulk of Table Mountain, wrapped by the Atlantic on one side and False Bay on the other, and somehow manages to be a relaxed beach city, a serious food destination and a gateway to wild coastline all at once.",
      "We plan your days around the weather and the wind, not a fixed timetable: cableway or hike on the first clear morning, Cape Point and the penguins on a still day, the Bo-Kaap, the V&A Waterfront and Robben Island when the cloud 'tablecloth' rolls in. Three to four nights is the minimum we'd recommend; five lets you breathe.",
    ],
    image: images.capeTown,
    gallery: [images.heroCapeTown, images.bokaap, images.capePoint, images.penguins],
    months: {
      Jan: "best", Feb: "best", Mar: "best", Apr: "good", May: "good", Jun: "mixed",
      Jul: "mixed", Aug: "mixed", Sep: "good", Oct: "good", Nov: "best", Dec: "best",
    },
    seasonNote:
      "Cape Town has a Mediterranean climate. Summer (Nov–Mar) is dry, sunny and windy; winter (Jun–Aug) brings rain fronts between bright, crisp days, along with lower prices and whale season on the nearby coast.",
    highlights: [
      "Table Mountain by cableway or one of its classic hiking routes",
      "The Cape Peninsula drive to Cape Point, via Chapman's Peak",
      "African penguins at Boulders Beach",
      "Robben Island and the story of South Africa's democracy",
      "Colourful Bo-Kaap and its Cape Malay kitchens",
      "Sunset on Lion's Head or Signal Hill",
    ],
    thingsToDo: [
      { title: "Table Mountain", text: "Ride the rotating cableway or hike Platteklip Gorge with a private guide, then walk the plateau's fynbos trails." },
      { title: "Cape Point day", text: "A full-day loop via Chapman's Peak, Cape Point Nature Reserve and Boulders Beach, with lunch in Kalk Bay." },
      { title: "Food & markets", text: "Tasting menus in the city, Bo-Kaap cooking classes and Saturday markets at the Old Biscuit Mill." },
      { title: "History & heritage", text: "Robben Island, the District Six Museum and the Castle of Good Hope with a guide who brings it to life." },
    ],
    tips: [
      "Book the Table Mountain cableway online, and go up the first clear morning you get. Wind closes it often.",
      "The southeaster ('Cape Doctor') blows hard in summer. Atlantic-side beaches are calmer on those days.",
      "Use registered drivers or ride-hailing apps after dark rather than walking between neighbourhoods.",
      "Robben Island ferries sell out in peak season. We pre-book them.",
    ],
    idealNights: "3–5 nights",
    experienceSlugs: ["table-mountain-cape-point", "boulders-beach-penguins", "robben-island", "shark-cage-diving"],
    staySlugs: ["lions-head-townhouse", "atlantic-terrace-hotel"],
    faqs: [
      { question: "How many nights do I need in Cape Town?", answer: "Three nights covers the highlights; four or five gives you weather flexibility for Table Mountain and time for the Winelands as a day trip or a separate stay." },
      { question: "Is Cape Town safe for visitors?", answer: "The main visitor areas are well-travelled, but like any big city it calls for common sense. Don't leave valuables in cars, use registered transport at night, and take local advice on hiking routes. Your specialist briefs you on all of this before you land." },
    ],
  },
  {
    slug: "cape-winelands",
    name: "Cape Winelands",
    shortName: "Winelands",
    region: "western-cape",
    tagline: "Stellenbosch, Franschhoek & the valleys between",
    summary:
      "Cape Dutch estates, mountain-ringed vineyards and some of the finest restaurants in the country, under an hour from Cape Town.",
    overview: [
      "An hour inland, the mountains rise steeply around valleys planted with Chenin Blanc, Cabernet and Pinotage. Stellenbosch is the historic university town with oak-lined streets; Franschhoek is the smaller, French-Huguenot village with a single main road lined with restaurants.",
      "Staying in the Winelands, rather than visiting on a day trip, changes the experience completely: long lunches, sunset tastings on the stoep and no need to rush back to the city. We pair you with a private driver so nobody has to count glasses.",
    ],
    image: images.winelands,
    gallery: [images.winelands2, images.wineTasting, images.wineEstate, images.food],
    months: {
      Jan: "best", Feb: "best", Mar: "best", Apr: "best", May: "good", Jun: "mixed",
      Jul: "mixed", Aug: "mixed", Sep: "good", Oct: "good", Nov: "best", Dec: "best",
    },
    seasonNote:
      "Harvest runs February to April, the most atmospheric time to visit. Winter (Jun–Aug) is green, cool and cosy, with fireside tastings and quieter estates.",
    highlights: [
      "Private tastings at family-owned estates",
      "Long lunches at award-winning farm restaurants",
      "Cycling or e-biking between vineyards",
      "Franschhoek's wine tram (hop-on, hop-off)",
      "Historic Stellenbosch and its Cape Dutch architecture",
    ],
    thingsToDo: [
      { title: "Private wine route", text: "A driver-guide tailors a day around your taste, from old-vine Chenin to Bordeaux blends and bubbly (Méthode Cap Classique)." },
      { title: "Chef's tables", text: "We secure tables at the valley's best restaurants, which can book out months ahead." },
      { title: "Active mornings", text: "Guided hikes, horseback rides through the vines, or e-bikes between estates." },
      { title: "Art & gardens", text: "Sculpture gardens, galleries and centuries-old estate grounds." },
    ],
    tips: [
      "Book a private driver or wine tram, and never self-drive between tastings.",
      "Many top restaurants close one or two days a week. We plan around that.",
      "Two nights is the sweet spot; three if you want a slower pace.",
    ],
    idealNights: "2–3 nights",
    experienceSlugs: ["winelands-wine-tasting", "honeymoons"],
    staySlugs: ["klipkop-wine-estate", "fynbos-ridge-estate"],
    faqs: [
      { question: "Stellenbosch or Franschhoek?", answer: "Franschhoek is compact, romantic and walkable; Stellenbosch has more estates and a livelier town. Many of our guests split two nights between them, or base themselves in one and visit the other." },
    ],
  },
  {
    slug: "hermanus-overberg",
    name: "Hermanus & the Overberg",
    shortName: "Hermanus",
    region: "western-cape",
    tagline: "Whale coast, fynbos and Africa's southern tip",
    summary:
      "Southern right whales from the clifftops, wild fynbos reserves and the windswept coast to Cape Agulhas.",
    overview: [
      "Ninety minutes east of Cape Town along one of the country's most dramatic coastal roads, Hermanus is famous for land-based whale watching. Between June and November, southern right whales come into Walker Bay to calve, often within metres of the cliff path.",
      "Beyond town, the Overberg rolls out in wheat fields, fynbos reserves and empty beaches down to Cape Agulhas, the southernmost tip of Africa, where the Atlantic and Indian oceans officially meet.",
    ],
    image: images.hermanus,
    gallery: [images.whale, images.capePoint, images.roadTrip],
    months: {
      Jan: "good", Feb: "good", Mar: "good", Apr: "good", May: "good", Jun: "best",
      Jul: "best", Aug: "best", Sep: "best", Oct: "best", Nov: "best", Dec: "good",
    },
    seasonNote:
      "Whale season is June to November, peaking September–October. Summer brings beach weather, fynbos in flower and fewer crowds than Cape Town.",
    highlights: [
      "Land-based whale watching from the Cliff Path",
      "Boat-based whale encounters with licensed operators",
      "Hemel-en-Aarde valley wineries (Pinot Noir and Chardonnay)",
      "Cape Agulhas, Africa's southernmost point",
      "Fynbos reserves and coastal hikes",
    ],
    thingsToDo: [
      { title: "Whale watching", text: "Walk the 12 km Cliff Path or join a licensed boat for close (but regulated) encounters." },
      { title: "Hemel-en-Aarde wines", text: "Cool-climate Pinot and Chardonnay a few minutes from town." },
      { title: "Gansbaai", text: "Shark cage diving and marine 'Big Five' boat trips." },
      { title: "Coastal drive", text: "Clarence Drive (R44) via Betty's Bay penguins. One of the world's great coastal roads." },
    ],
    tips: [
      "Combine Hermanus with the start of a Garden Route road trip.",
      "Whale season overlaps Cape Town's winter. Pack layers.",
    ],
    idealNights: "1–2 nights",
    experienceSlugs: ["hermanus-whale-watching", "shark-cage-diving", "garden-route-road-trip"],
    staySlugs: [],
    faqs: [
      { question: "Are whales guaranteed?", answer: "Never guaranteed, but between July and October sightings from shore are extremely likely, often daily." },
    ],
  },
  {
    slug: "garden-route",
    name: "Garden Route",
    region: "garden-route",
    tagline: "Forests, lagoons and the ultimate road trip",
    summary:
      "Indigenous forest, lagoons and long beaches between Mossel Bay and the Tsitsikamma: South Africa's classic self-drive.",
    overview: [
      "The Garden Route stretches roughly 300 km along the southern coast, a mix of temperate forest, lakes, lagoons and wide beaches backed by the Outeniqua mountains. Knysna and Plettenberg Bay are the main bases; the Tsitsikamma section of the Garden Route National Park is its wild heart.",
      "It's made for travelling at your own pace. We plan routes with properly unhurried driving days, book the stays that make it special and leave room for detours, from oyster bars to forest canopy walks.",
    ],
    image: images.gardenRoute,
    gallery: [images.gardenRoute2, images.roadTrip, images.coastalLodge],
    months: {
      Jan: "best", Feb: "best", Mar: "best", Apr: "good", May: "good", Jun: "mixed",
      Jul: "mixed", Aug: "good", Sep: "good", Oct: "best", Nov: "best", Dec: "best",
    },
    seasonNote:
      "Rain falls year-round, typically in short bursts, so the Garden Route is green in every season. Summer (Dec–Feb) is warmest and busiest; spring and autumn are ideal.",
    highlights: [
      "Tsitsikamma's suspension bridge and Storms River Mouth",
      "Knysna Heads and the lagoon",
      "Plettenberg Bay's beaches and Robberg Peninsula hike",
      "Oudtshoorn and the Cango Caves as a detour inland",
      "Marine life on a Plettenberg Bay boat trip",
    ],
    thingsToDo: [
      { title: "Robberg hike", text: "A dramatic peninsula walk with seals, whales in season and sweeping views." },
      { title: "Forest & canopy", text: "Treetop canopy tours and forest walks among yellowwood giants." },
      { title: "Lagoon life", text: "Sunset cruises on the Knysna lagoon and fresh oysters at the waterfront." },
      { title: "Adventure", text: "Kayaking, coasteering, and the world's highest commercial bridge bungee for the brave." },
    ],
    tips: [
      "Allow at least 6–7 nights from Cape Town to Gqeberha (Port Elizabeth).",
      "Driving in South Africa is on the left. Avoid driving after dark.",
      "Add Addo Elephant Park at the eastern end for a malaria-free safari finale.",
    ],
    idealNights: "4–6 nights",
    experienceSlugs: ["garden-route-road-trip", "family-safaris"],
    staySlugs: ["outeniqua-cliffs-lodge"],
    faqs: [
      { question: "Can I do the Garden Route without driving?", answer: "Yes. We can arrange a private driver-guide for the whole route, or combine short flights to George with chauffeured transfers." },
    ],
  },
  {
    slug: "kruger-national-park",
    name: "Kruger National Park",
    shortName: "Kruger",
    region: "kruger",
    tagline: "Two million hectares of classic Big Five country",
    summary:
      "One of Africa's great national parks: varied wildlife, excellent roads and rest camps, and superb guided drives.",
    overview: [
      "Kruger covers nearly 20,000 square kilometres, around the size of Wales or New Jersey, and holds an extraordinary diversity of wildlife: the Big Five, wild dogs, cheetah and more than 500 bird species.",
      "Inside the national park, you can self-drive or join guided drives from the rest camps, and a handful of concession lodges offer private-reserve style safaris on exclusive land within the park. For the most intimate experience, many guests pair Kruger with the adjoining private reserves.",
    ],
    image: images.kruger,
    gallery: [images.krugerGameDrive, images.giraffe, images.zebra, images.buffalo],
    months: {
      Jan: "mixed", Feb: "mixed", Mar: "good", Apr: "good", May: "best", Jun: "best",
      Jul: "best", Aug: "best", Sep: "best", Oct: "good", Nov: "good", Dec: "mixed",
    },
    seasonNote:
      "The dry winter (May–Sep) is peak game viewing: bush thins, animals gather at water. Summer rains (Nov–Mar) turn the park lush and bring baby animals and migrant birds, along with heat, afternoon storms and a higher malaria risk.",
    highlights: [
      "Big Five on guided sunrise and sunset drives",
      "Bush walks with armed rangers",
      "Wild dog, cheetah and incredible birdlife",
      "Exclusive concession lodges inside the park",
    ],
    thingsToDo: [
      { title: "Guided game drives", text: "Sunrise, sunset and night drives in open vehicles with expert guides." },
      { title: "Walking trails", text: "Morning walks to read tracks, learn plants and approach wildlife on foot." },
      { title: "Self-drive days", text: "Explore at your own pace with a route plan and sighting tips from us." },
      { title: "Bush dinners", text: "Lantern-lit boma dinners under the stars at lodges." },
    ],
    tips: [
      "Kruger is in a malaria area. Speak to a travel clinic about prophylaxis.",
      "Fly into Skukuza, Kruger Mpumalanga (Nelspruit/KMIA) or Hoedspruit to save a long drive.",
      "Gate times are strictly enforced for self-drivers.",
    ],
    idealNights: "3–4 nights",
    experienceSlugs: ["big-five-game-drives", "walking-safari", "family-safaris"],
    staySlugs: ["jackalberry-plains-camp"],
    faqs: [
      { question: "Kruger or a private reserve?", answer: "Kruger is vast, varied and better value; private reserves offer off-road tracking, fewer vehicles at sightings and all-inclusive luxury. Read our Kruger vs private reserves guide, or let us combine both." },
    ],
  },
  {
    slug: "sabi-sand-greater-kruger",
    name: "Sabi Sand & Greater Kruger",
    shortName: "Sabi Sand",
    region: "kruger",
    tagline: "Private reserves, off-road tracking, unfenced from Kruger",
    summary:
      "Leopard country. Exclusive lodges, expert tracker-and-ranger teams and all-inclusive luxury on unfenced private land.",
    overview: [
      "The private reserves on Kruger's western boundary (Sabi Sand, Timbavati, Klaserie, Manyeleti and others) share open borders with the national park, so wildlife moves freely. The difference is access: lodges here can drive off-road, limit the number of vehicles at each sighting and run walking safaris with ease.",
      "The Sabi Sand is famous for relaxed leopards and is consistently one of the best places in Africa to see them. Stays are all-inclusive, typically two game drives a day with meals, drinks and plenty of time to do nothing at all between them.",
    ],
    image: images.sabiSand,
    gallery: [images.gameLodge, images.lion, images.rhino, images.sunsetSavanna],
    months: {
      Jan: "good", Feb: "good", Mar: "good", Apr: "best", May: "best", Jun: "best",
      Jul: "best", Aug: "best", Sep: "best", Oct: "best", Nov: "good", Dec: "good",
    },
    seasonNote:
      "Excellent year-round thanks to expert tracking. Peak game viewing is the dry season (May–Sep); summer (Nov–Mar) is green, with newborn animals and great value at many lodges.",
    highlights: [
      "World-class leopard sightings",
      "Off-road tracking with ranger and tracker teams",
      "Maximum vehicles per sighting rules",
      "All-inclusive luxury lodges with private plunge pools",
    ],
    thingsToDo: [
      { title: "Twice-daily game drives", text: "Early morning and late afternoon drives, with sundowners in the bush." },
      { title: "Walking safaris", text: "Guided walks to track rhino, read the signs of the bush and see the small things." },
      { title: "Hide time", text: "Quiet hours in photographic hides overlooking waterholes." },
      { title: "Community visits", text: "Lodge-supported schools and enterprise projects in neighbouring communities." },
    ],
    tips: [
      "Three nights is the minimum we recommend for a private reserve; four is better.",
      "Most lodges have a minimum child age for game drives (often 6+). We match family-friendly lodges.",
      "Light-aircraft transfers have soft-bag luggage limits (typically 20 kg).",
    ],
    idealNights: "3–4 nights",
    experienceSlugs: ["big-five-game-drives", "walking-safari", "honeymoons"],
    staySlugs: ["leadwood-ridge-lodge", "jackalberry-plains-camp"],
    faqs: [
      { question: "Why are private reserves more expensive?", answer: "Rates include all meals, most drinks, two guided activities a day, and low guest-to-guide ratios on exclusive traversing land. You pay for privacy and the quality of guiding." },
    ],
  },
  {
    slug: "panorama-route-blyde-river-canyon",
    name: "Panorama Route & Blyde River Canyon",
    shortName: "Panorama Route",
    region: "mpumalanga",
    tagline: "Escarpment views on the way to the bush",
    summary:
      "God's Window, Bourke's Luck Potholes and one of the largest green canyons on Earth, en route to Kruger.",
    overview: [
      "Where the Drakensberg escarpment drops dramatically to the lowveld, the Panorama Route links a string of viewpoints, waterfalls and gold-rush towns. Blyde River Canyon, carved through red sandstone and cloaked in subtropical green, is the showstopper.",
      "It slots perfectly between Johannesburg and Kruger, and turns a transfer day into one of the highlights of the trip.",
    ],
    image: images.blydeRiver,
    gallery: [images.hiking, images.roadTrip],
    months: {
      Jan: "mixed", Feb: "mixed", Mar: "good", Apr: "best", May: "best", Jun: "best",
      Jul: "best", Aug: "best", Sep: "best", Oct: "good", Nov: "good", Dec: "mixed",
    },
    seasonNote:
      "Dry winter months give the clearest views. Summer brings waterfalls at full flow, but also afternoon storms and morning mist that can cloak viewpoints.",
    highlights: [
      "The Three Rondavels viewpoint over Blyde River Canyon",
      "Bourke's Luck Potholes",
      "God's Window and Wonderview",
      "Graskop's gorge lift and Lisbon/Berlin falls",
      "Historic Pilgrim's Rest",
    ],
    thingsToDo: [
      { title: "Canyon boat trip", text: "Cruise Blyde Dam beneath the canyon walls, spotting hippos and crocodiles." },
      { title: "Viewpoint drive", text: "A full day linking the best viewpoints, timed for the light." },
      { title: "Waterfall hikes", text: "Short guided walks to the region's many falls." },
    ],
    tips: [
      "Start early. Mist often builds in the afternoon.",
      "Combine with 2–3 nights in Kruger or the Timbavati.",
    ],
    idealNights: "1–2 nights",
    experienceSlugs: ["panorama-route-blyde-canyon"],
    staySlugs: [],
    faqs: [
      { question: "Can I do the Panorama Route as a day trip from Kruger?", answer: "Yes, but it's a long day. We prefer a night in Graskop or near the canyon so you can catch the viewpoints in good light." },
    ],
  },
  {
    slug: "drakensberg",
    name: "Drakensberg",
    region: "kwazulu-natal",
    tagline: "The Dragon Mountains: hike, breathe, slow down",
    summary:
      "A UNESCO World Heritage mountain wilderness of basalt cliffs, ancient San rock art and some of Africa's finest hiking.",
    overview: [
      "The uKhahlamba-Drakensberg is South Africa's highest mountain range, a wall of basalt peaks over 3,000 m high. The Amphitheatre in the north, with Tugela Falls plunging off its edge, is one of the most dramatic sights in the country.",
      "It's a place for walking, from gentle valley trails past San rock art to full-day summit hikes, and for cosy mountain lodges with log fires. It pairs naturally with the Zulu battlefields and the KwaZulu-Natal coast.",
    ],
    image: images.drakensberg,
    gallery: [images.drakensberg2, images.mountainLodge, images.hiking],
    months: {
      Jan: "mixed", Feb: "mixed", Mar: "good", Apr: "best", May: "best", Jun: "good",
      Jul: "good", Aug: "good", Sep: "best", Oct: "best", Nov: "good", Dec: "mixed",
    },
    seasonNote:
      "Autumn (Apr–May) and spring (Sep–Oct) bring the best hiking weather. Summer (Nov–Mar) is green but has afternoon thunderstorms; winter is crisp and clear, with occasional snow on the peaks.",
    highlights: [
      "The Amphitheatre and Tugela Falls",
      "San rock art at Game Pass Shelter or Main Caves",
      "Cathedral Peak and Champagne Castle hikes",
      "Horse riding in the foothills",
    ],
    thingsToDo: [
      { title: "Guided hikes", text: "Day hikes for every fitness level with experienced mountain guides." },
      { title: "Rock art", text: "Thousands of years of San paintings in sandstone shelters." },
      { title: "Battlefields", text: "Isandlwana and Rorke's Drift with a specialist storyteller-guide." },
      { title: "Slow days", text: "Trout fishing, spa time and long lunches with mountain views." },
    ],
    tips: [
      "Start hikes early in summer to avoid afternoon storms.",
      "Nights are cold year-round. Bring a warm layer.",
    ],
    idealNights: "2–3 nights",
    experienceSlugs: ["drakensberg-hiking"],
    staySlugs: ["stone-crown-mountain-lodge"],
    faqs: [
      { question: "Is the Drakensberg malaria-free?", answer: "Yes, which makes it a great addition to family itineraries." },
    ],
  },
  {
    slug: "durban-kwazulu-natal-coast",
    name: "Durban & the KwaZulu-Natal Coast",
    shortName: "Durban & KZN",
    region: "kwazulu-natal",
    tagline: "Warm Indian Ocean, Zulu culture and coastal safari",
    summary:
      "Warm-water beaches, Durban's Indian-influenced food scene, iSimangaliso Wetland Park and Hluhluwe-iMfolozi.",
    overview: [
      "KwaZulu-Natal's coast is South Africa's warm side: the Indian Ocean here is swimmable for most of the year. Durban is vibrant, multicultural and famous for its curries (the bunny chow was born here).",
      "Head north and the coast turns wild. iSimangaliso Wetland Park protects hippos, crocodiles, turtles and coral reefs, while Hluhluwe-iMfolozi Park, which saved the white rhino from extinction, offers excellent Big Five safaris.",
    ],
    image: images.durban,
    gallery: [images.kzn, images.rhino, images.coastalLodge],
    months: {
      Jan: "good", Feb: "good", Mar: "good", Apr: "best", May: "best", Jun: "best",
      Jul: "best", Aug: "best", Sep: "best", Oct: "good", Nov: "good", Dec: "mixed",
    },
    seasonNote:
      "KZN's winter (May–Sep) is warm, dry and sunny, ideal beach and safari weather. Summer is hot and humid with tropical downpours. Turtle nesting season runs Nov–Mar.",
    highlights: [
      "Hluhluwe-iMfolozi Big Five safaris",
      "iSimangaliso: hippos, crocs and beaches",
      "Turtle-nesting tours (Nov–Mar)",
      "Durban's curry trail and beachfront",
    ],
    thingsToDo: [
      { title: "Coastal safari", text: "Combine game drives in Hluhluwe-iMfolozi with estuary boat trips in St Lucia." },
      { title: "Diving & snorkelling", text: "Sodwana Bay's reefs, the southernmost coral reefs in Africa." },
      { title: "Zulu heritage", text: "Visits led by local guides to learn about Zulu history and contemporary culture." },
    ],
    tips: [
      "Parts of northern KZN are in a low-risk malaria area. Consult a travel clinic.",
      "Pair with the Drakensberg for a varied 8–10 day trip.",
    ],
    idealNights: "3–4 nights",
    experienceSlugs: ["big-five-game-drives", "family-safaris"],
    staySlugs: [],
    faqs: [
      { question: "Can you swim in the sea at Durban?", answer: "Yes. Durban's main beaches have lifeguards and shark nets; water is warm most of the year." },
    ],
  },
  {
    slug: "johannesburg-soweto",
    name: "Johannesburg & Soweto",
    shortName: "Johannesburg",
    region: "gauteng",
    tagline: "The city that tells South Africa's story",
    summary:
      "The Apartheid Museum, Soweto's Vilakazi Street, and an energetic art and food scene in Africa's economic heart.",
    overview: [
      "Most international flights land in Johannesburg, and too many travellers treat it as a transit stop. Give it a night or two and you'll find the most powerful history in the country, alongside galleries, rooftop bars and vibrant neighbourhoods like Maboneng, Rosebank and Parkhurst.",
      "In Soweto, local guides take you to Vilakazi Street, the only street in the world that was home to two Nobel Peace Prize winners, and the Hector Pieterson Memorial. Pair it with the Apartheid Museum for a day that stays with you.",
    ],
    image: images.johannesburg,
    gallery: [images.soweto, images.hotelRoom],
    months: {
      Jan: "good", Feb: "good", Mar: "good", Apr: "best", May: "best", Jun: "good",
      Jul: "good", Aug: "good", Sep: "best", Oct: "best", Nov: "good", Dec: "good",
    },
    seasonNote:
      "Joburg's highveld climate is sunny year-round: dry, crisp winters and warm summers with short afternoon thunderstorms.",
    highlights: [
      "The Apartheid Museum",
      "Soweto with a resident guide",
      "Constitution Hill",
      "Maboneng and Braamfontein art and food",
      "Cradle of Humankind day trip",
    ],
    thingsToDo: [
      { title: "Soweto day", text: "Vilakazi Street, the Hector Pieterson Memorial and lunch at a local favourite." },
      { title: "Museums", text: "The Apartheid Museum and Constitution Hill with an expert guide." },
      { title: "Cradle of Humankind", text: "Fossil sites and the Maropeng visitor centre, an hour from the city." },
    ],
    tips: [
      "Explore with a guide or private driver rather than on foot between areas.",
      "One night works for the highlights; two is better.",
    ],
    idealNights: "1–2 nights",
    experienceSlugs: ["soweto-johannesburg-history"],
    staySlugs: [],
    faqs: [
      { question: "Is it worth staying in Johannesburg?", answer: "Absolutely, for at least one night. The Apartheid Museum and Soweto give essential context to everything else you'll see in South Africa." },
    ],
  },
  {
    slug: "addo-eastern-cape",
    name: "Addo & the Eastern Cape",
    shortName: "Addo",
    region: "eastern-cape",
    tagline: "Malaria-free Big Five safari",
    summary:
      "Elephant herds in Addo and luxurious private reserves, all malaria-free, at the end of the Garden Route.",
    overview: [
      "The Eastern Cape is where we send families and travellers who'd rather avoid malaria medication. Addo Elephant National Park protects more than 600 elephants, and the surrounding private reserves offer the full Big Five with lodge experiences to rival the north.",
      "It's an easy add-on to a Garden Route road trip, or a short flight from Cape Town into Gqeberha (Port Elizabeth).",
    ],
    image: images.addo,
    gallery: [images.familySafari, images.gameLodge, images.buffalo],
    months: {
      Jan: "good", Feb: "good", Mar: "best", Apr: "best", May: "best", Jun: "good",
      Jul: "good", Aug: "good", Sep: "best", Oct: "best", Nov: "best", Dec: "good",
    },
    seasonNote:
      "Game viewing is good all year. Autumn and spring offer the most comfortable temperatures.",
    highlights: [
      "Large elephant herds at Addo's waterholes",
      "Malaria-free Big Five private reserves",
      "Family-friendly lodges with kids' programmes",
      "Easy combination with the Garden Route",
    ],
    thingsToDo: [
      { title: "Game drives", text: "Guided drives in Addo and private reserves like Shamwari and Kwandwe." },
      { title: "Family safari", text: "Junior ranger programmes and age-appropriate activities." },
      { title: "Coast & bush", text: "Combine sand dunes and beaches with the safari." },
    ],
    tips: [
      "Ideal for families with young children. Some lodges welcome all ages on game drives.",
      "Fly back to Cape Town or Johannesburg from Gqeberha.",
    ],
    idealNights: "2–3 nights",
    experienceSlugs: ["family-safaris", "big-five-game-drives"],
    staySlugs: [],
    faqs: [
      { question: "Can you see the Big Five in the Eastern Cape?", answer: "Yes. Several private reserves and Addo itself are home to all five, in a malaria-free area." },
    ],
  },
  {
    slug: "kgalagadi-kalahari",
    name: "Kgalagadi & the Kalahari",
    shortName: "Kalahari",
    region: "northern-cape",
    tagline: "Red dunes, black-maned lions and vast skies",
    summary:
      "Remote, raw and spectacular: Kalahari predators, gemsbok on red dunes and some of the clearest night skies on Earth.",
    overview: [
      "The Kgalagadi Transfrontier Park straddles South Africa and Botswana, a vast wilderness of red dunes and dry riverbeds. It is famous for black-maned Kalahari lions, cheetah, raptors and the photogenic gemsbok.",
      "This is a destination for travellers who have done a classic safari and want something wilder. Reach it by long self-drive or light-aircraft charter, and pair it with the green Kalahari around Augrabies Falls.",
    ],
    image: images.kalahari,
    gallery: [images.lion, images.sunsetSavanna],
    months: {
      Jan: "mixed", Feb: "mixed", Mar: "best", Apr: "best", May: "best", Jun: "good",
      Jul: "good", Aug: "good", Sep: "good", Oct: "mixed", Nov: "mixed", Dec: "mixed",
    },
    seasonNote:
      "Autumn (Mar–May) is the sweet spot: green after the rains, with active predators. Winter nights fall below freezing; summer days can exceed 40°C.",
    highlights: [
      "Black-maned Kalahari lions",
      "Cheetah and raptors along the Auob and Nossob riverbeds",
      "Gemsbok and springbok on red dunes",
      "Dark-sky stargazing",
    ],
    thingsToDo: [
      { title: "Riverbed drives", text: "Follow the dry riverbeds where predators hunt." },
      { title: "Wilderness camps", text: "Unfenced camps that put you in the heart of the desert." },
      { title: "Stargazing", text: "Some of the darkest skies in Africa." },
    ],
    tips: [
      "Best for experienced safari-goers or as a second trip.",
      "Distances are huge. Consider a fly-in charter.",
      "The Kgalagadi is malaria-free.",
    ],
    idealNights: "3–4 nights",
    experienceSlugs: ["big-five-game-drives"],
    staySlugs: [],
    faqs: [
      { question: "How do I get to the Kgalagadi?", answer: "It's a long drive (around 10 hours from Cape Town), so most guests fly to Upington and drive from there, or take a light-aircraft charter." },
    ],
  },
];

export const getDestination = (slug: string) => destinations.find((d) => d.slug === slug);
