import { GuideArticle, DIYPlace, QuickInfoItem, GuideTopic } from '../types';

export const GUIDE_TOPICS: { id: GuideTopic; label: string; icon: string }[] = [
  { id: 'Things to Do', label: 'Things to Do', icon: 'compass' },
  { id: 'Beaches & Snorkeling', label: 'Beaches & Snorkeling', icon: 'waves' },
  { id: 'Hiking & Nature', label: 'Hiking & Nature', icon: 'mountain' },
  { id: 'Food & Cafes', label: 'Food & Cafes', icon: 'utensils' },
  { id: 'Getting Around', label: 'Getting Around', icon: 'car' },
  { id: 'Essential Info', label: 'Essential Info', icon: 'info' },
  { id: 'More Topics', label: 'More Topics', icon: 'more' }
];

export const POPULAR_GUIDES: GuideArticle[] = [
  {
    id: 'guide-snorkeling',
    title: 'Best Snorkeling Spots in Dahab',
    excerpt: 'Clear waters, colorful reefs and easy access places.',
    readTime: '5 min read',
    topic: 'Beaches & Snorkeling',
    badge: 'Must Read',
    author: 'Karim Divemaster',
    date: 'Updated Sep 2026',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    relatedListingSlugs: ['wadi-gnai-three-pools-safari', 'morning-yacht-snorkeling-day', 'red-sea-relax-dive-resort'],
    relatedMarketplaceIds: ['feat-2', 'prod-1', 'feat-3'],
    content: `Dahab is world-renowned for its accessible shore diving and vibrant fringe reefs. You don't need a boat to witness underwater wonders—simply step off the beach with your mask and snorkel.

### 1. Lighthouse Reef
Located directly in front of the Lighthouse promenade, this is the easiest entry point in Dahab. The bay is sheltered from open currents, making it ideal for beginners, night snorkels, and freediving warm-ups. Expect octopus, clownfish colonies in anemones, and occasional sea turtles grazing on seagrass.

### 2. The Eel Garden
Just a 10-minute walk north of the Lighthouse. Walk through the canyon pathway to reach the sand plateau where hundreds of garden eels gently sway in the current. Best visited at high tide when entering over the reef flat is effortless.

### 3. The Blue Hole Reef Outer Wall
A legendary sinkhole dropping over 100m. While the interior is deep blue, the outer reef wall is a bursting aquarium of hard and soft corals, schools of red sea bannerfish, anthias, and trevallies. Always enter via the Bells chimney entrance and drift swim south to the Blue Hole saddle.

### 4. Southern Oasis: Three Pools
Located in Southern Dahab near Moray Garden. Three interconnected sandy-bottom coral basins allowing comfortable, surge-free swimming even on windy afternoons.`
  },
  {
    id: 'guide-3days',
    title: 'What to Do in Dahab for 3 Days',
    excerpt: 'A simple day-by-day guide for first time visitors.',
    readTime: '7 min read',
    topic: 'Things to Do',
    badge: 'Popular Itinerary',
    author: 'Sinai Nomad',
    date: 'Updated Sep 2026',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    relatedListingSlugs: ['wadi-gnai-three-pools-safari', 'morning-yacht-snorkeling-day', 'soul-kitesurfing-center'],
    relatedMarketplaceIds: ['feat-4', 'feat-1', 'feat-3', 'prod-2'],
    content: `Visiting Dahab for a long weekend? Here is the quintessential 72-hour itinerary balancing coastal chill, Red Sea underwater thrills, and Bedouin desert hospitality.

### Day 1: Coastal Chill & Lighthouse Promenade
- **Morning:** Start with an authentic breakfast at Everyday Cafe or Ralph's German Bakery overlooking the Gulf of Aqaba.
- **Midday:** Snorkel Lighthouse Bay, explore the local dive shops and art stalls along Mashraba.
- **Afternoon:** Rent a beach bicycle and cruise up to Eel Garden.
- **Evening:** Fresh seafood catch of the day at Ali Baba Restaurant followed by Bedouin mint tea on carpeted beach lounges.

### Day 2: Blue Hole & Ras Abu Galum Safari
- **Morning:** 4x4 Jeep transfer north to Blue Hole. Snorkel the Bells entrance and outer reef wall.
- **Midday:** Take a coastal boat ride or camel trek to Ras Abu Galum eco-reserve and Blue Lagoon.
- **Afternoon:** Swim in the pristine turquoise shallow flatwaters of the Blue Lagoon.
- **Evening:** Bedouin campfire dinner under the Sinai stars before heading back to Dahab town.

### Day 3: Laguna Winds & Desert Canyon Sunset
- **Morning:** Head to Dahab Laguna for kitesurfing, windsurfing, or stand-up paddleboarding.
- **Afternoon:** Safari excursion to Wadi Qunai or the White Canyon.
- **Sunset:** Watch the golden hour light paint the Saudi Arabian mountain ridges across the Red Sea.`
  },
  {
    id: 'guide-budget',
    title: 'Dahab on a Budget',
    excerpt: 'Tips to enjoy Dahab without spending too much.',
    readTime: '4 min read',
    topic: 'Essential Info',
    badge: 'Money Saver',
    author: 'Elena Backpacker',
    date: 'Updated Sep 2026',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    relatedListingSlugs: ['wadi-gnai-three-pools-safari', 'red-sea-relax-dive-resort'],
    relatedMarketplaceIds: ['feat-3', 'feat-1', 'feat-4'],
    content: `Dahab remains one of the most budget-friendly coastal gems in the world. With these insider tips, you can live comfortably, eat delicious fresh food, and explore top sites for a fraction of typical resort prices.

### Smart Stays & Eco Camps
Look for beach camps and guesthouses in Mashraba and Assalah. Many offer private en-suite rooms with AC starting at 600–900 EGP ($12–$18 USD) per night, or shared dorms for under 350 EGP ($7 USD).

### Authentic Local Food
Dine like a local around Assalah Square. You can get hearty ful and taameya (Egyptian falafel) sandwiches for 15–25 EGP, giant grilled chicken platters with rice and salads at King Chicken for 180 EGP, or fresh bakery goods from local Sinai bakeries.

### Free Activities
All the premier snorkeling spots—Lighthouse, Eel Garden, Islands, and Canyon entry—are completely free public access from the shore. No expensive boat excursions required!

### Getting Around
Dahab is compact and walkable. Rent a bicycle for ~100 EGP per day, or take shared blue pickup trucks along the main road for 10–15 EGP per ride.`
  }
];

export const DIY_PLACES: DIYPlace[] = [
  {
    id: 'diy-blue-lagoon',
    name: 'Blue Lagoon',
    badge: 'Free Access',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: 'A serene natural lagoon with crystal shallow turquoise water sheltered by low sand dunes. Famous for kitesurfing and disconnect.',
    distance: '15 km North of Dahab',
    tips: 'Accessible via boat from Blue Hole or scenic camel trek along the coastline.'
  },
  {
    id: 'diy-three-pools',
    name: 'Three Pools',
    badge: 'Snorkeling',
    image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=800&q=80',
    description: 'Three natural coral pools connected by narrow passages with calm water, soft sand entries, and marine biodiversity.',
    distance: '8 km South in Wadi Gnai',
    tips: 'Grab a fresh mango juice at the beach huts and enjoy hours of zero-current snorkeling.'
  },
  {
    id: 'diy-lighthouse',
    name: 'Light House',
    badge: 'Walking',
    image: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=800&q=80',
    description: 'The heartbeat of Dahab. A scenic pedestrian promenade flanked by Bohemian beach cafes, dive schools, and open water access.',
    distance: 'Center of Dahab',
    tips: 'Perfect for morning coffee, sunset strolls, and meeting fellow travelers.'
  },
  {
    id: 'diy-mount-sinai-view',
    name: 'Mount Sinai View',
    badge: 'Hiking',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    description: 'Panoramic viewpoints overlooking the Gulf of Aqaba and rugged Sinai granite peaks. Breathtaking at dawn and twilight.',
    distance: 'Jebel El-Bint Trail',
    tips: 'Carry water and sturdy footwear. Early morning hikes offer mild temperatures.'
  },
  {
    id: 'diy-lagona-beach',
    name: 'Lagona Beach',
    badge: 'Relaxing',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: 'A sweeping sandy spit reaching into the Red Sea. Unobstructed mountain views, steady thermal breeze, and soft golden sand.',
    distance: '3 km South of Promenade',
    tips: 'Ideal for sunbathing, peaceful reading, and watching windsurfers skim across the bay.'
  }
];

export const QUICK_INFO_ITEMS: QuickInfoItem[] = [
  {
    id: 'info-getting-here',
    title: 'How to Get to Dahab',
    icon: 'plane',
    summary: 'Fly to Sharm El Sheikh (SSH) airport, followed by a 1-hour scenic desert taxi transfer.',
    details: [
      'Sharm El Sheikh International Airport (SSH) is located 85km south of Dahab.',
      'Private car/van transfers take ~60 minutes and cost 700–1,100 EGP ($15–$22 USD).',
      'GoBus runs daily direct air-conditioned coaches from Cairo (8–9 hours).',
      'Ferry connections run between Taba and Jordan for cross-border travelers.'
    ]
  },
  {
    id: 'info-money-atm',
    title: 'Money, ATM & Currency',
    icon: 'coins',
    summary: 'Egyptian Pound (EGP) is standard. Multiple ATMs along Lighthouse and Mashraba.',
    details: [
      'Official currency is Egyptian Pound (EGP).',
      'Major dive centers and boutique hotels accept Visa and Mastercard.',
      'Local cafes, Bedouin camps, and taxis prefer cash in EGP.',
      'Bank ATMs are available 24/7 at Assalah Square, Mashraba, and Ghazala Market.'
    ]
  },
  {
    id: 'info-sim-internet',
    title: 'SIM & Internet',
    icon: 'smartphone',
    summary: 'Vodafone, Orange, and WE shops available in Dahab. 4G coverage is strong throughout town.',
    details: [
      'Buy a tourist SIM at Sharm airport or local shops in Dahab for ~200–350 EGP ($4–$7 USD).',
      'Vodafone and Orange offer the most reliable 4G data coverage in Dahab & Blue Hole.',
      'Coworking spaces like Dahab Cowork offer fiber-optic internet with backup generators.',
      'Most promenade cafes provide complimentary Wi-Fi for guests.'
    ]
  },
  {
    id: 'info-weather-season',
    title: 'Weather & Best Time',
    icon: 'sun',
    summary: 'Sunny year-round. Autumn (Oct-Dec) and Spring (Mar-May) offer optimal weather.',
    details: [
      'Autumn & Spring: 24°C–30°C, perfect water temperature and gentle coastal breezes.',
      'Winter (Jan-Feb): Crisp sunny days (20°C–22°C) and cooler desert nights (12°C–14°C).',
      'Summer (Jul-Aug): Warm (34°C–38°C) with constant Laguna thermal winds for kitesurfing.',
      'Rainfall is extremely rare (under 5 days per year across South Sinai).'
    ]
  },
  {
    id: 'info-safety-emergency',
    title: 'Safety & Emergency',
    icon: 'shield',
    summary: 'Dahab is exceptionally peaceful and safe with an active hyperbaric chamber.',
    details: [
      'Dahab Hospital and local 24/7 pharmacies are located in Mashraba and Assalah.',
      'Dahab Hyperbaric Medical Center is fully equipped for scuba diving safety.',
      'Sinai Tourism Police: Dial 126 or visit the station by Lighthouse promenade.',
      'Tap water is brackish; drink bottled or filtered water readily sold everywhere.'
    ]
  },
  {
    id: 'info-culture-etiquette',
    title: 'Local Culture & Etiquette',
    icon: 'users',
    summary: 'Warm Bedouin and Egyptian hospitality. Relaxed bohemian vibe with mutual respect.',
    details: [
      'Swimwear is normal on beaches and dive sites; dress casually when exploring local town markets.',
      'Sinai Bedouin culture treasures tea sharing—accepting tea is a gesture of warmth.',
      'Tipping (baksheesh) of 10–15% is customary for restaurant service, drivers, and dive guides.',
      'Respect the coral reefs: never stand on, touch, or collect shells or coral.'
    ]
  }
];

export const RECENT_ARTICLES: GuideArticle[] = [
  {
    id: 'recent-mount-sinai',
    title: 'Sunrise at Mount Sinai',
    excerpt: 'A once in a lifetime experience atop sacred peaks.',
    readTime: '6 min read',
    topic: 'Hiking & Nature',
    badge: 'Adventure',
    author: 'Jebeliya Guide',
    date: 'Sep 2026',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    relatedListingSlugs: ['wadi-gnai-three-pools-safari', 'morning-yacht-snorkeling-day'],
    relatedMarketplaceIds: ['feat-4', 'feat-1', 'feat-3'],
    content: `Ascending Mount Sinai (Jebel Musa, 2,285m) during the starlit night to witness the sun rise over the jagged granite ranges of the Sinai Peninsula is an unforgettable pilgrimage of light and silence.

Trips typically depart Dahab around 10:00 PM to reach St. Catherine's Monastery by midnight. Led by local Bedouin Jebeliya guides, hikers can choose the gradual camel path or the historic 750 Steps of Repentance. At the summit, warming Bedouin sage tea and wool blankets welcome you as the horizon ignites in layers of fiery crimson, amber, and violet.`
  },
  {
    id: 'recent-free-beaches',
    title: 'Best Free Beaches in Dahab',
    excerpt: 'Relax, swim and enjoy pristine nature without entry fees.',
    readTime: '4 min read',
    topic: 'Beaches & Snorkeling',
    badge: 'Coastal Gems',
    author: 'Dahab Explorer',
    date: 'Aug 2026',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    relatedListingSlugs: ['wadi-gnai-three-pools-safari', 'morning-yacht-snorkeling-day'],
    relatedMarketplaceIds: ['feat-2', 'feat-3', 'prod-1'],
    content: `Unlike heavy commercial resort towns, almost all of Dahab's coastline is completely open and free to the public.

From the wide sandy lagoon crescent at Laguna Beach to the secluded coves south of Three Pools, you can pitch a blanket, swim out to pristine coral reefs, and enjoy the Red Sea in complete tranquility.`
  },
  {
    id: 'recent-cafes-view',
    title: 'Top Cafes with a View',
    excerpt: 'Great coffee, better views along the water promenade.',
    readTime: '3 min read',
    topic: 'Food & Cafes',
    badge: 'Food & Drinks',
    author: 'Coffee Nomad',
    date: 'Aug 2026',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    relatedListingSlugs: ['ali-baba-seafood-restaurant', 'the-bridge-dahab-luxury-boutique-hotel'],
    relatedMarketplaceIds: ['feat-1', 'feat-4', 'feat-3'],
    content: `Dahab's cafe culture is unmatched. Picture low wooden benches cushioned with colorful Bedouin rugs resting directly over gentle waves.

- **Everyday Cafe:** Famous for live acoustic music, iced Americanos, and sweeping vistas of the bay.
- **Ralph's German Bakery:** World-class espresso, fresh sourdough, apple strudels, and sea breeze.
- **Churchill's:** Rooftop terrace with cold brews and panoramic sunset mountain views.`
  },
  {
    id: 'recent-kitesurfing',
    title: 'Kite Surfing in Dahab',
    excerpt: 'Wind, freedom and the warm Red Sea waters.',
    readTime: '5 min read',
    topic: 'Things to Do',
    badge: 'Watersports',
    author: 'Laguna Rider',
    date: 'Jul 2026',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=800&q=80',
    relatedListingSlugs: ['soul-kitesurfing-center', 'morning-yacht-snorkeling-day'],
    relatedMarketplaceIds: ['prod-3', 'feat-2', 'prod-2'],
    content: `Dahab Laguna delivers over 280 windy days every year thanks to the thermal venturi effect between the Sinai and Arabian mountain corridors.

The flat-water lagoon area is safe and shallow for beginners, while the Baby Bay and the outer Kamikaze swell offer intermediate and advanced riders speed runs and high-flying freestyle boosts.`
  }
];

export const ALL_GUIDE_ARTICLES: GuideArticle[] = [
  ...POPULAR_GUIDES,
  ...RECENT_ARTICLES
];
