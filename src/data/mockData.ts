import { Listing, LocalService, PlannerService, OfficialCategory } from '../types';

export const USD_EXCHANGE_RATE = 50; // 1 USD = 50 EGP

export const formatPrice = (amountEgp: number, currency: 'EGP' | 'USD'): string => {
  if (amountEgp === 0) return 'Free Inquiry';
  if (currency === 'USD') {
    const usd = Math.round(amountEgp / USD_EXCHANGE_RATE);
    return `$${usd.toLocaleString()}`;
  }
  return `${amountEgp.toLocaleString()} EGP`;
};

export interface OfficialCategoryMeta {
  id: OfficialCategory;
  name: string;
  subtitle: string;
  iconName: 'Bed' | 'Compass' | 'Waves' | 'Sailboat' | 'Mountain' | 'Utensils' | 'Car' | 'Sparkles' | 'Music' | 'ShoppingBag';
  description: string;
}

export const OFFICIAL_CATEGORIES: OfficialCategoryMeta[] = [
  {
    id: 'Accommodation',
    name: 'Accommodation',
    subtitle: 'Hotels, Camps, Apartments',
    iconName: 'Bed',
    description: 'Boutique hotels, eco beach camps, and apartments in Mashraba, Lighthouse & Laguna.'
  },
  {
    id: 'Scuba Diving',
    name: 'Scuba Diving',
    subtitle: 'Dive Centers, Guided Dives, PADI Courses',
    iconName: 'Compass',
    description: 'Certified SSI, TDI & PADI dive centers, daily guided dives to Blue Hole & Canyon.'
  },
  {
    id: 'Freediving',
    name: 'Freediving',
    subtitle: 'AIDA Courses, Depth Training',
    iconName: 'Waves',
    description: 'AIDA certifications, equalisation mastery, and deep water training.'
  },
  {
    id: 'Kite Surfing & Water Activities',
    name: 'Kite Surfing & Water Activities',
    subtitle: 'Kite, Windsurf, SUP',
    iconName: 'Sailboat',
    description: 'Laguna thermal wind conditions, top gear rentals, and IKO certified lessons.'
  },
  {
    id: 'Trips & Safari',
    name: 'Trips & Safari',
    subtitle: 'Desert Canyons, Yacht Trips, St. Catherine',
    iconName: 'Mountain',
    description: '4x4 desert canyon safaris, luxury yacht cruises, and St. Catherine sunrise treks.'
  },
  {
    id: 'Restaurants & Cafes',
    name: 'Restaurants & Cafes',
    subtitle: 'Seafood, Bedouin Dining, Beach Cafes',
    iconName: 'Utensils',
    description: 'Fresh Red Sea seafood, beach breakfasts, and authentic Bedouin fire dinners.'
  },
  {
    id: 'Transfers',
    name: 'Transfers',
    subtitle: 'Airport Shuttles, Private Vans, Taxis',
    iconName: 'Car',
    description: 'Air-conditioned private vans and airport transfers between Sharm El Sheikh and Dahab.'
  },
  {
    id: 'Beauty, Spa & Wellness',
    name: 'Beauty, Spa & Wellness',
    subtitle: 'Deep Tissue Massage, Yoga, Spas',
    iconName: 'Sparkles',
    description: 'Deep tissue massages, organic aromatherapy, yoga shalas, and rejuvenating spas.'
  },
  {
    id: 'Events & Workshops',
    name: 'Events & Workshops',
    subtitle: 'Sound Healing, Live Music, Cultural Nights',
    iconName: 'Music',
    description: 'Desert sound healing, conscious breathwork, live music, and cultural Sinai gatherings.'
  },
  {
    id: 'Shopping & Local Services',
    name: 'Shopping & Local Services',
    subtitle: 'Dive Gear Shops, Supermarkets, Pharmacies',
    iconName: 'ShoppingBag',
    description: '24/7 supermarkets, dive gear retail & service hubs, and local essentials.'
  }
];

// ==========================================
// 1. ACCOMMODATION
// ==========================================
export const MOCK_STAYS: Listing[] = [
  {
    id: 'stay-1',
    slug: 'dahab-paradise-hotel',
    name: 'Dahab Paradise Hotel',
    type: 'stay',
    category: 'Boutique Hotel',
    officialCategory: 'Accommodation',
    area: 'Mashraba',
    rating: 4.88,
    reviewCount: 420,
    price: 2400,
    priceLabel: 'From / night',
    priceLevel: '$$$',
    currency: 'EGP',
    isOpen: true,
    isPartner: true,
    featured: true,
    buttonType: 'book_dahab360',
    buttonLabel: 'Book with Dahab 360',
    badge: '15% OFF Midweek Stays',
    dealDiscount: '15% OFF',
    promoCode: 'DAHAB360-STAY-15',
    dealTerms: 'Valid on reservations of 3+ nights from Sunday to Wednesday.',
    dealExpires: 'Limited Seasonal Deal',
    tags: ['Sea View', 'Pool', 'Wi-Fi'],
    addOns: [
      { title: 'Airport Private Transfer Return', price: 1000 },
      { title: 'Candlelight Sea Deck Dinner for 2', price: 850 },
      { title: 'Full Day Snorkel Tour Pass', price: 400 }
    ],
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
    ],
    logo: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=200&h=200&q=80',
    amenities: ['Sea View Balcony', 'Panoramic Infinity Pool', 'High-Speed Starlink WiFi', 'Organic Coastal Breakfast', 'Private Diving Center'],
    perks: [
      '10% Dahab 360 Partner Discount',
      'Complimentary Sunset Drink at Pool Deck',
      'Late Check-out until 2:00 PM (subject to availability)'
    ],
    phone: '+20 69 364 0122',
    whatsapp: '+201004892211',
    address: 'Mashraba Coastal Promenade, Dahab',
    openingHours: {
      today: '24/7 Front Desk',
      schedule: [{ day: 'All Year Round', hours: '24 Hours / 7 Days' }]
    },
    description: 'Authentic Sinai-inspired boutique hotel situated in Mashraba with unobstructed panoramic sea views and fresh mountain breezes. Features an infinity pool framing the Gulf of Aqaba towards Saudi Arabia.',
    highlights: [
      'Unobstructed panoramic sea views across the Gulf of Aqaba',
      'Handcrafted Sinai stone architecture and wooden pergolas',
      'Peaceful oasis just 3 minutes stroll from Mashraba center'
    ]
  },
  {
    id: 'stay-2',
    slug: 'shams-hotel-dive-resort',
    name: 'Shams Hotel & Dive Resort',
    type: 'stay',
    category: 'Beachfront Resort',
    officialCategory: 'Accommodation',
    area: 'Mashraba',
    rating: 4.75,
    reviewCount: 280,
    price: 1950,
    priceLabel: 'From / night',
    priceLevel: '$$',
    currency: 'EGP',
    isOpen: true,
    isPartner: false,
    featured: true,
    buttonType: 'contact_provider',
    buttonLabel: 'Contact Provider',
    tags: ['Beachfront', 'Private Beach', 'House Reef'],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&h=200&q=80',
    amenities: ['Direct Beach Access', 'Air Conditioning', 'On-Site Restaurant', 'Terrace', 'Free Wi-Fi'],
    phone: '+20 69 364 0002',
    whatsapp: '+20693640002',
    address: 'Mashraba Beach Promenade, Dahab',
    openingHours: {
      today: '24/7 Front Desk',
      schedule: [{ day: 'Daily', hours: '24 Hours' }]
    },
    description: 'Beachfront hotel in the heart of Mashraba with direct water access, sunny beach lounge chairs, and friendly Sinai hospitality steps from vibrant cafes.',
    highlights: [
      'Direct beach frontage onto Mashraba house reef',
      'Convenient central location close to restaurants & markets',
      'Spacious sea-breeze rooms with private balconies'
    ]
  },
  {
    id: 'stay-3',
    slug: 'canyon-estate-eco-camp',
    name: 'Canyon Estate Eco Beach Camp',
    type: 'stay',
    category: 'Eco Camp',
    officialCategory: 'Accommodation',
    area: 'Canyon Reef Coast',
    rating: 4.82,
    reviewCount: 230,
    price: 1350,
    priceLabel: 'From / night',
    priceLevel: '$',
    currency: 'EGP',
    isOpen: true,
    isPartner: true,
    buttonType: 'book_dahab360',
    buttonLabel: 'Book with Dahab 360',
    tags: ['Steps to Reef', 'Eco-Friendly', 'Bedouin Style'],
    images: [
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    logo: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=200&h=200&q=80',
    amenities: ['Beachfront Arishah Huts', 'Direct House Reef Access', 'Solar Powered Hot Showers', 'Outdoor Fire Pit'],
    perks: ['Free Daily Morning Yoga Session', 'Complimentary Snorkel Gear Rental'],
    phone: '+20 109 455 8899',
    whatsapp: '+201094558899',
    address: 'Canyon Dive Site Coastal Track, Dahab',
    openingHours: {
      today: '08:00 AM – 10:00 PM Reception',
      schedule: [{ day: 'Daily', hours: '08:00 AM – 10:00 PM' }]
    },
    description: 'Rustic beachfront stone huts situated directly on the water over the Canyon reef. Perfect for unwinding under Sinai constellations.',
    highlights: ['Direct house reef snorkeling', 'Solar-powered sustainable sanctuary']
  }
];

// ==========================================
// 2. SCUBA DIVING
// ==========================================
export const MOCK_SCUBA: Listing[] = [
  {
    id: 'scuba-1',
    slug: 'shams-dive-centre',
    name: 'Shams Dive Centre',
    type: 'experience',
    category: 'Dive Center',
    officialCategory: 'Scuba Diving',
    area: 'Mashraba',
    rating: 4.92,
    reviewCount: 310,
    price: 1200,
    priceLabel: 'Per dive',
    priceLevel: '$$',
    currency: 'EGP',
    isOpen: true,
    isPartner: true,
    featured: true,
    duration: '3 Hours / 1 Dive',
    buttonType: 'book_dahab360',
    buttonLabel: 'Book with Dahab 360',
    badge: '20% OFF Multi-Dive Package',
    dealDiscount: '20% OFF',
    promoCode: 'DAHAB360-DIVE-20',
    dealTerms: 'Valid on reservations of 5+ guided dives or PADI Advanced Open Water.',
    dealExpires: 'Limited Season Offer',
    tags: ['SSI/TDI', 'Guided Dives', 'PADI Courses'],
    addOns: [
      { title: 'Full Gear Rental', price: 500 },
      { title: 'Underwater 4K GoPro Video', price: 350 },
      { title: 'Nitrox Tank Upgrade', price: 150 }
    ],
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=1200&q=80'
    ],
    logo: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=200&h=200&q=80',
    amenities: ['Certified Dive Masters', 'Full Scubapro Equipment', 'Nitrox Available', 'Boat & Shore Dives'],
    perks: [
      'Free Equipment Rental on 5+ Dives',
      'Free Logbook Stamp & Nitrox Tank Upgrade',
      'Complimentary Bedouin Mint Tea'
    ],
    phone: '+20 100 489 2211',
    whatsapp: '+201004892211',
    address: 'Mashraba Beach Front, Dahab',
    openingHours: {
      today: '08:00 AM – 06:00 PM',
      schedule: [{ day: 'Daily', hours: '08:00 AM – 06:00 PM' }]
    },
    description: 'Professional SSI & TDI certified dive center in Mashraba offering daily guided dives to Blue Hole, Canyon, and Bells, plus complete beginner to pro courses with veteran instructors.',
    highlights: [
      'Top-tier Scubapro & Mares maintained regulators and BCDs',
      'Experienced Sinai divemasters with over 10+ years local knowledge',
      'Direct access to house reef training and daily transport'
    ]
  },
  {
    id: 'scuba-2',
    slug: 'red-sea-relax-dive-resort',
    name: 'Red Sea Relax Dive Resort',
    type: 'experience',
    category: 'Dive Resort',
    officialCategory: 'Scuba Diving',
    area: 'Lighthouse',
    rating: 4.84,
    reviewCount: 410,
    price: 1150,
    priceLabel: 'Per dive',
    priceLevel: '$$',
    currency: 'EGP',
    isOpen: true,
    isPartner: false,
    featured: true,
    duration: 'Half Day',
    buttonType: 'contact_provider',
    buttonLabel: 'Contact Provider',
    tags: ['PADI', 'Lighthouse Reef', 'Diver Cafe'],
    images: [
      'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1200&q=80'
    ],
    logo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=200&h=200&q=80',
    amenities: ['PADI Instructors', 'Training Pool', 'Equipment Lockers', 'Roof Terrace Cafe'],
    phone: '+20 69 364 1300',
    whatsapp: '+20693641300',
    address: 'Lighthouse Promenade, Dahab',
    openingHours: {
      today: '07:30 AM – 06:00 PM',
      schedule: [{ day: 'Daily', hours: '07:30 AM – 06:00 PM' }]
    },
    description: 'PADI 5-Star dive resort right on the Lighthouse promenade, famous for friendly dive masters, dedicated training facilities, and vibrant diver community.',
    highlights: [
      'Prime location directly on the calm Lighthouse entry reef',
      'Dedicated training pool for beginner safety drills'
    ]
  }
];

// ==========================================
// 3. FREEDIVING
// ==========================================
export const MOCK_FREEDIVING: Listing[] = [
  {
    id: 'freedive-1',
    slug: 'one-breath-academy',
    name: 'One Breath Academy',
    type: 'experience',
    category: 'Freediving Academy',
    officialCategory: 'Freediving',
    area: 'Lighthouse',
    rating: 4.96,
    reviewCount: 185,
    price: 3500,
    priceLabel: 'Per course',
    priceLevel: '$$$',
    currency: 'EGP',
    isOpen: true,
    isPartner: true,
    featured: true,
    duration: '2.5 Days',
    buttonType: 'book_dahab360',
    buttonLabel: 'Book with Dahab 360',
    badge: '10% OFF AIDA Course',
    dealDiscount: '10% OFF',
    promoCode: 'DAHAB360-FREE-10',
    dealTerms: 'Valid on AIDA 2 and AIDA 3 depth certifications booked this season.',
    dealExpires: 'Limited Availability',
    tags: ['AIDA Courses', 'Depth Training', 'Ahmed Korany'],
    addOns: [
      { title: 'Carbon Blade Fins Rental', price: 300 },
      { title: '1-on-1 Equalisation Coaching', price: 450 },
      { title: 'Dry Breathwork Preparation', price: 250 }
    ],
    images: [
      'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=1200&q=80'
    ],
    logo: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=200&h=200&q=80',
    amenities: ['AIDA Certified Master Instructors', 'Dedicated Depth Line & Buoy', 'Video Form Analysis', 'Breathwork Shala'],
    perks: [
      'Free Dahab 360 Equalisation Video Handbook',
      '10% Discount on Long Carbon Blade Fins Rental',
      'Complimentary Electrolyte Coconut Water after Depth'
    ],
    phone: '+20 101 889 0022',
    whatsapp: '+201004892211',
    address: 'Lighthouse Bay, Dahab',
    openingHours: {
      today: '08:00 AM – 05:00 PM',
      schedule: [{ day: 'Daily', hours: '08:00 AM – 05:00 PM' }]
    },
    description: 'Premier freediving academy located in Lighthouse led by veteran record-holder Ahmed Korany. Specializing in AIDA 1 through 4 certifications, mental relaxation techniques, equalisation mastery, and deep water training at the legendary Blue Hole.',
    highlights: [
      'Personalized 1-on-1 and small group coaching ratios',
      'World-class depth line setup in the calm waters of Lighthouse and Blue Hole',
      'Comprehensive Frenzel equalisation breakdown and dry breath workshops'
    ]
  }
];

// ==========================================
// 4. KITESURFING & WATER ACTIVITIES
// ==========================================
export const MOCK_KITESURFING: Listing[] = [
  {
    id: 'kite-1',
    slug: 'soul-kitesurfing-center',
    name: 'Soul Kitesurfing Center',
    type: 'experience',
    category: 'Kitesurfing & Watersports',
    officialCategory: 'Kite Surfing & Water Activities',
    area: 'Laguna',
    rating: 4.91,
    reviewCount: 220,
    price: 1800,
    priceLabel: 'Rental & Lessons',
    priceLevel: '$$',
    currency: 'EGP',
    isOpen: true,
    isPartner: true,
    featured: true,
    duration: '2 Hours',
    buttonType: 'get_deal',
    buttonLabel: 'Get Your Deal',
    badge: 'Free SUP + 15% OFF',
    dealDiscount: '15% OFF + SUP',
    promoCode: 'DAHAB360-KITE-15',
    dealTerms: 'Book an IKO beginner lesson and get 1 free hour SUP rental plus 15% off gear hire.',
    dealExpires: 'Seasonal Wind Pass',
    tags: ['Kite', 'Windsurf', 'SUP'],
    addOns: [
      { title: 'Radio Helmet Coaching', price: 250 },
      { title: 'GoPro Follow-Cam 4K Footage', price: 350 },
      { title: 'Wetsuit & Harness Package', price: 200 }
    ],
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=1200&q=80'
    ],
    logo: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=200&h=200&q=80',
    amenities: ['IKO Certified Instructors', 'Lagoon Flat Water Area', 'Rescue Boat on Standby', 'Duotone & Cabrinha Gear', 'Beach Shaded Lounge'],
    perks: [
      '15% Dahab 360 Partner Perk',
      'Free 1-Hour Stand-Up Paddleboard (SUP) Session',
      'Free GoPro 4K Action Shots'
    ],
    phone: '+20 102 778 9911',
    whatsapp: '+201004892211',
    address: 'Dahab Laguna Spit, Dahab South',
    openingHours: {
      today: '09:00 AM – 06:00 PM',
      schedule: [{ day: 'Daily', hours: '09:00 AM – 06:00 PM' }]
    },
    description: 'Situated at Dahab’s world-famous sandy wind lagoon with reliable 300+ days of steady thermal winds, warm flat water, and current-season Duotone & Cabrinha kites. Offers complete beginner IKO courses, advanced foil clinics, and rental gear.',
    highlights: [
      'Ideal shallow sandy bay with buttery flat water conditions',
      'Professional IKO instructors with radio communication helmets',
      'Full rescue boat safety service included with all rentals'
    ]
  }
];

// ==========================================
// 5. TRIPS & SAFARI
// ==========================================
export const MOCK_SAFARI: Listing[] = [
  {
    id: 'safari-1',
    slug: 'wadi-gnai-three-pools-safari',
    name: 'Wadi Gnai & Three Pools Safari',
    type: 'experience',
    category: 'Desert Canyon Safari',
    officialCategory: 'Trips & Safari',
    area: 'Southern Oases',
    rating: 4.94,
    reviewCount: 275,
    price: 950,
    priceLabel: 'Full day / person',
    priceLevel: '$$',
    currency: 'EGP',
    isOpen: true,
    isPartner: true,
    featured: true,
    duration: 'Full Day (7 Hours)',
    buttonType: 'book_dahab360',
    buttonLabel: 'Book with Dahab 360',
    tags: ['Desert Canyons', 'Bedouin Lunch', 'Snorkeling'],
    addOns: [
      { title: 'BBQ Lunch', price: 350 },
      { title: 'Camel Ride', price: 250 },
      { title: 'Full Snorkel Gear Rental', price: 200 }
    ],
    images: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=1200&q=80'
    ],
    logo: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=200&h=200&q=80',
    amenities: ['4x4 Land Cruiser', 'Local Bedouin Guide', 'Snorkel Equipment', 'Bedouin Herbal Tea', 'Shaded Oasis Rest Area'],
    perks: [
      'Free Fresh Desert Dates & Mint Tea',
      'Exclusive Shade Mat at Southern Lagoon'
    ],
    phone: '+20 100 489 2211',
    whatsapp: '+201004892211',
    address: 'Departure from Dahab to Wadi Gnai & Three Pools',
    openingHours: {
      today: '08:30 AM – 04:30 PM Daily Departures',
      schedule: [{ day: 'Daily', hours: '08:30 AM – 04:30 PM' }]
    },
    description: 'Immersive full-day Sinai safari combining the granite boulder canyon of Wadi Gnai with marine snorkeling at the famous Three Pools reef. Travel by 4x4, hike granite gorges, relax under date palms, and savor an authentic Bedouin lunch.',
    highlights: [
      'Off-road 4x4 drive through breathtaking Sinai canyon formations',
      'Crystal clear turquoise waters and vibrant coral gardens at Three Pools',
      'Authentic Bedouin camp hospitality and freshly baked bread'
    ]
  },
  {
    id: 'safari-2',
    slug: 'morning-yacht-snorkeling-day',
    name: 'Morning Yacht & Snorkeling Day',
    type: 'experience',
    category: 'Sea Trip & Yachting',
    officialCategory: 'Trips & Safari',
    area: 'Gulf of Aqaba Coast',
    rating: 4.89,
    reviewCount: 160,
    price: 1400,
    priceLabel: 'Per person',
    priceLevel: '$$',
    currency: 'EGP',
    isOpen: true,
    isPartner: true,
    featured: true,
    duration: '7 Hours',
    buttonType: 'book_dahab360',
    buttonLabel: 'Book with Dahab 360',
    badge: 'Free Seafood Upgrade',
    dealDiscount: 'Free Upgrade',
    promoCode: 'DAHAB360-YACHT-VIP',
    dealTerms: 'Complimentary seafood platter upgrade on reservations of 2+ guests.',
    dealExpires: 'Seasonal Deal',
    tags: ['Yacht Trips', '7 Hours', 'Snorkeling'],
    addOns: [
      { title: 'Seafood Platter Upgrade', price: 400 },
      { title: 'Intro Scuba Dive from Boat', price: 600 },
      { title: 'Private Sun Deck Cabana', price: 350 }
    ],
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80'
    ],
    logo: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=200&h=200&q=80',
    amenities: ['Spacious Sun Deck', 'Buffet Lunch & Soft Drinks', 'Certified Snorkel Guides', 'Restrooms & Fresh Water Showers'],
    perks: ['VIP Sun Lounger Priority on Upper Deck', 'Free Snorkel Mask Rental'],
    phone: '+20 100 489 2211',
    whatsapp: '+201004892211',
    address: 'Dahab Marina / Port Departure',
    openingHours: {
      today: '09:00 AM – 04:00 PM',
      schedule: [{ day: 'Daily', hours: '09:00 AM – 04:00 PM' }]
    },
    description: '7-hour luxury yacht sea excursion cruising the dramatic coastline of South Sinai. Enjoy two guided reef snorkeling stops, sunbathing on the panoramic upper deck, and a freshly prepared seafood buffet.',
    highlights: [
      'Stunning offshore coral reefs inaccessible from the shore',
      'Delicious hot buffet lunch with fresh catch and salads',
      'Spotting pods of dolphins along the Gulf of Aqaba'
    ]
  }
];

// ==========================================
// 6. RESTAURANTS & CAFES
// ==========================================
export const MOCK_DINING: Listing[] = [
  {
    id: 'dine-1',
    slug: 'the-beach-house-cafe',
    name: 'The Beach House Cafe',
    type: 'dining',
    category: 'Beach Cafe & Breakfast',
    officialCategory: 'Restaurants & Cafes',
    area: 'Lighthouse',
    rating: 4.87,
    reviewCount: 390,
    price: 220,
    priceLabel: 'Avg meal',
    priceLevel: '$$',
    currency: 'EGP',
    isOpen: true,
    isPartner: false,
    featured: true,
    buttonType: 'contact_provider',
    buttonLabel: 'Contact Provider',
    tags: ['Beachfront', 'Breakfast & Coffee', 'Waterfront'],
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80'
    ],
    logo: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=200&h=200&q=80',
    amenities: ['Waterfront Seating', 'Free High-Speed Wi-Fi', 'Specialty Coffee', 'Vegan & Gluten-Free Options'],
    phone: '+20 100 234 5678',
    whatsapp: '+201002345678',
    address: 'Lighthouse Beach Promenade, Dahab',
    openingHours: {
      today: '08:00 AM – 11:30 PM',
      schedule: [{ day: 'Daily', hours: '08:00 AM – 11:30 PM' }]
    },
    description: 'Laid-back beachfront cafe right on Lighthouse bay serving artisan sourdough, specialty espresso, organic smoothie bowls, avocado toast, and refreshing afternoon juices.',
    highlights: [
      'Direct seafront tables with panoramic views of the windsurfers',
      'Ethically sourced specialty Ethiopian & Colombian coffee beans',
      'Healthy breakfast bowls and homemade Sinai pastries'
    ]
  },
  {
    id: 'dine-2',
    slug: 'ali-baba-seafood-restaurant',
    name: 'Ali Baba Seafood Restaurant',
    type: 'dining',
    category: 'Seafood & Grill',
    officialCategory: 'Restaurants & Cafes',
    area: 'Mashraba',
    rating: 4.93,
    reviewCount: 520,
    price: 380,
    priceLabel: 'Fresh catch',
    priceLevel: '$$$',
    currency: 'EGP',
    isOpen: true,
    isPartner: true,
    featured: true,
    badge: '15% OFF with code DAHAB360',
    dealDiscount: '15% OFF',
    promoCode: 'DAHAB360-DEAL-15',
    dealTerms: 'Valid on total dining bill including fresh seafood catch and appetizers.',
    dealExpires: 'Ongoing Partner Deal',
    buttonType: 'get_deal',
    buttonLabel: 'Get Your Deal',
    tags: ['Fresh Catch', 'Charcoal Grill', 'Mashraba Promenade'],
    images: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80'
    ],
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&h=200&q=80',
    amenities: ['Direct Sea View Tables', 'Daily Fresh Catch Display', 'Bedouin Seating & Chairs', 'Credit Cards Accepted'],
    perks: [
      '15% OFF Total Bill with code DAHAB360',
      'Complimentary Bedouin Tea & Honey Baklava',
      'Priority Seafront Table Reservation'
    ],
    phone: '+20 69 364 0055',
    whatsapp: '+201004892211',
    address: 'Mashraba Seafront Promenade, Dahab',
    openingHours: {
      today: '12:00 PM – 12:00 AM',
      schedule: [{ day: 'Daily', hours: '12:00 PM – 12:00 AM' }]
    },
    description: 'Historic Dahab dining institution on the sea promenade. Select your freshly caught fish, calamari, and jumbo prawns from the ice display, grilled to order over charcoal with Sinai herbs and tahini.',
    highlights: [
      'Select directly from the daily fresh fisherman catch display',
      'Authentic charcoal grilling with garlic, lemon, and Bedouin spices',
      'Candlelit tables situated inches away from the gentle evening waves'
    ]
  }
];

// ==========================================
// 7. TRANSFERS
// ==========================================
export const MOCK_TRANSFERS: Listing[] = [
  {
    id: 'trans-1',
    slug: 'sharm-airport-to-dahab-private-van',
    name: 'Sharm Airport to Dahab Private Van',
    type: 'service',
    category: 'Airport Transfer',
    officialCategory: 'Transfers',
    area: 'Sharm El Sheikh ⇄ Dahab',
    rating: 4.95,
    reviewCount: 310,
    price: 1100,
    priceLabel: 'Per private van',
    priceLevel: '$$',
    currency: 'EGP',
    isOpen: true,
    isPartner: true,
    featured: true,
    duration: '60 mins',
    buttonType: 'book_dahab360',
    buttonLabel: 'Book with Dahab 360',
    badge: '10% OFF Return Booking',
    dealDiscount: '10% OFF',
    promoCode: 'DAHAB360-TRANS-10',
    dealTerms: 'Book round-trip airport transport and save 10% on the return leg.',
    dealExpires: 'All Year Round',
    tags: ['Airport Shuttles', 'Private Vans', 'Taxis'],
    addOns: [
      { title: 'SIM Card & Setup at Airport', price: 200 },
      { title: 'Child Safety Seat', price: 150 },
      { title: 'Cold Refreshments Pack', price: 100 }
    ],
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1200&q=80'
    ],
    logo: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=200&h=200&q=80',
    amenities: ['Air-Conditioned Modern Van', 'Luggage & Dive Gear Space', 'Flight Delay Tracking', '24/7 Availability', 'Door-to-Door Service'],
    perks: [
      'Free Bottled Mineral Water & Refreshing Towels',
      'No Surcharge for Flight Delays',
      'Direct Hotel Check-in Coordination'
    ],
    phone: '+20 100 489 2211',
    whatsapp: '+201004892211',
    address: 'Sharm El Sheikh Airport (SSH) to any hotel/camp in Dahab',
    openingHours: {
      today: '24/7 Active Fleet',
      schedule: [{ day: 'All Year', hours: '24 Hours / 7 Days' }]
    },
    description: 'Modern, air-conditioned private HiAce / H1 van transfer between Sharm El Sheikh International Airport (SSH) and your accommodation in Dahab. Accommodates up to 4 passengers with dive luggage.',
    highlights: [
      'Professional licensed driver waiting with your name sign at arrivals',
      'Comfortable 60-minute scenic mountain highway journey',
      'Up to 4 passengers included for one flat transparent price'
    ]
  }
];

// ==========================================
// 8. BEAUTY, SPA & WELLNESS
// ==========================================
export const MOCK_WELLNESS: Listing[] = [
  {
    id: 'well-1',
    slug: 'dahab-wellness-spa',
    name: 'Dahab Wellness Spa',
    type: 'experience',
    category: 'Spa & Wellness',
    officialCategory: 'Beauty, Spa & Wellness',
    area: 'Eel Garden',
    rating: 4.9,
    reviewCount: 145,
    price: 600,
    priceLabel: '60 min session',
    priceLevel: '$$',
    currency: 'EGP',
    isOpen: true,
    isPartner: true,
    featured: true,
    duration: '60 Mins',
    buttonType: 'get_deal',
    buttonLabel: 'Get Your Deal',
    badge: '20% OFF Sunset Massage',
    dealDiscount: '20% OFF',
    promoCode: 'DAHAB360-SPA-20',
    dealTerms: 'Valid on all 60 or 90 minute deep tissue sessions between 4:00 PM and 8:00 PM.',
    dealExpires: 'Limited Availability',
    tags: ['Deep Tissue Massage', 'Yoga', 'Spas'],
    addOns: [
      { title: 'Hot Stone Therapy Add-on', price: 200 },
      { title: 'Sinai Herb Facial Mask', price: 250 },
      { title: 'Organic Lavender Oil Upgrade', price: 150 }
    ],
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80'
    ],
    logo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=200&h=200&q=80',
    amenities: ['Certified Massage Therapists', 'Organic Sinai Herb Oils', 'Private Treatment Rooms', 'Herbal Welcome Drink'],
    perks: [
      'Free 15-Minute Hot Stone Shoulder Therapy Add-On',
      'Herbal Hibiscus & Mint Tea Infusion'
    ],
    phone: '+20 100 489 2211',
    whatsapp: '+201004892211',
    address: 'Eel Garden Oasis Road, Dahab',
    openingHours: {
      today: '10:00 AM – 09:00 PM',
      schedule: [{ day: 'Daily', hours: '10:00 AM – 09:00 PM' }]
    },
    description: 'Tranquil sanctuary in Eel Garden providing restorative full-body deep tissue massage, organic Sinai lavender and sesame aromatherapy, and peaceful relaxation after diving.',
    highlights: [
      'Relieve diver shoulder fatigue and muscle tension',
      'Pure cold-pressed Sinai botanical oils and soothing music',
      'Peaceful garden setting away from crowds'
    ]
  }
];

// ==========================================
// 9. EVENTS & WORKSHOPS
// ==========================================
export const MOCK_EVENTS: Listing[] = [
  {
    id: 'event-1',
    slug: 'sunset-sound-healing-breathwork',
    name: 'Sunset Sound Healing & Breathwork',
    type: 'experience',
    category: 'Sound Healing & Meditation',
    officialCategory: 'Events & Workshops',
    area: 'Wadi Qunai Canyon',
    rating: 4.97,
    reviewCount: 190,
    price: 450,
    priceLabel: 'Per person',
    priceLevel: '$$',
    currency: 'EGP',
    isOpen: true,
    isPartner: true,
    featured: true,
    duration: '2.5 Hours',
    buttonType: 'book_dahab360',
    buttonLabel: 'Book with Dahab 360',
    tags: ['Sound Healing', 'Live Music', 'Cultural Nights'],
    images: [
      'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80'
    ],
    logo: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=200&h=200&q=80',
    amenities: ['Tibetan Singing Bowls', 'Meditation Mats & Blankets', 'Campfire Circle', 'Bedouin Herbal Tea & Dates'],
    perks: ['Complimentary Sinai Quartz Crystal Keepsake', 'Transport Included from Central Dahab'],
    phone: '+20 100 489 2211',
    whatsapp: '+201004892211',
    address: 'Wadi Qunai Desert Canyon, 15 min from Dahab',
    openingHours: {
      today: '05:30 PM – 08:00 PM (Sunset Evenings)',
      schedule: [{ day: 'Tuesday, Thursday, Saturday', hours: '05:30 PM – 08:00 PM' }]
    },
    description: 'Transformative sunset and evening ceremony inside an acoustic desert canyon under the Sinai constellations. Features Tibetan singing bowls, conscious diaphragmatic breathwork, and campfire warmth.',
    highlights: [
      'Natural desert amphitheater acoustics amplify deep vibration bowls',
      'Led by certified mindfulness and conscious breathing facilitators',
      'Campfire gathering under the crystal clear Milky Way'
    ]
  }
];

// ==========================================
// 10. SHOPPING & LOCAL SERVICES
// ==========================================
export const MOCK_SHOPPING: Listing[] = [
  {
    id: 'shop-1',
    slug: 'ghazala-market',
    name: 'Ghazala Market',
    type: 'service',
    category: 'Supermarket & Groceries',
    officialCategory: 'Shopping & Local Services',
    area: 'Mashraba',
    rating: 4.81,
    reviewCount: 340,
    price: 0,
    priceLabel: 'Open 24/7',
    priceLevel: '$',
    currency: 'EGP',
    isOpen: true,
    isPartner: false,
    featured: true,
    buttonType: 'contact_provider',
    buttonLabel: 'Contact Provider',
    tags: ['Supermarkets', 'Groceries & Delivery', 'Open 24/7'],
    images: [
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80'
    ],
    logo: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=200&h=200&q=80',
    amenities: ['Open 24/7', 'Home & Camp Delivery', 'Credit Cards Accepted', 'Fresh Organic Produce', 'Imported Goods'],
    phone: '+20 100 987 6543',
    whatsapp: '+201009876543',
    address: 'Mashraba Main Street, Dahab',
    openingHours: {
      today: 'Open 24 Hours',
      schedule: [{ day: 'All Year', hours: '24/7' }]
    },
    description: 'Dahab’s primary 24/7 central supermarket stocking fresh local produce, organic dairy, imported snacks, European specialties, bottled water, toiletries, and rapid delivery to camps & apartments.',
    highlights: [
      'Comprehensive inventory of international and local groceries',
      'Reliable delivery to your hotel or Airbnb door'
    ]
  },
  {
    id: 'shop-2',
    slug: 'dahab-dive-gear-rental-hub',
    name: 'Dahab Dive Gear & Rental Hub',
    type: 'service',
    category: 'Dive Gear & Service',
    officialCategory: 'Shopping & Local Services',
    area: 'Lighthouse',
    rating: 4.88,
    reviewCount: 210,
    price: 0,
    priceLabel: 'Retail & Service',
    priceLevel: '$$',
    currency: 'EGP',
    isOpen: true,
    isPartner: false,
    featured: true,
    buttonType: 'contact_provider',
    buttonLabel: 'Contact Provider',
    tags: ['Dive Gear Shops', 'Pharmacies & Services', 'Equipment Service'],
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=1200&q=80'
    ],
    logo: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=200&h=200&q=80',
    amenities: ['Authorized Scubapro & Mares Dealer', 'Regulator Servicing', 'Mask Prescription Lenses', 'Wetsuit Repairs'],
    phone: '+20 69 364 0888',
    whatsapp: '+20693640888',
    address: 'Lighthouse Bay Promenade, Dahab',
    openingHours: {
      today: '09:00 AM – 10:00 PM',
      schedule: [{ day: 'Daily', hours: '09:00 AM – 10:00 PM' }]
    },
    description: 'Fully equipped dive equipment store and technical maintenance center in Lighthouse. Offers mask prescription fittings, computer batteries, fin upgrades, and expert regulator servicing.',
    highlights: [
      'Certified technicians for all major scuba and freediving brands',
      'Wide range of masks, snorkels, rashguards, and reef boots'
    ]
  }
];

// Combine all experiences for legacy and general queries
export const MOCK_EXPERIENCES: Listing[] = [
  ...MOCK_SCUBA,
  ...MOCK_FREEDIVING,
  ...MOCK_KITESURFING,
  ...MOCK_SAFARI,
  ...MOCK_WELLNESS,
  ...MOCK_EVENTS
];

// All listings in one master collection
export const ALL_MOCK_LISTINGS: Listing[] = [
  ...MOCK_STAYS,
  ...MOCK_SCUBA,
  ...MOCK_FREEDIVING,
  ...MOCK_KITESURFING,
  ...MOCK_SAFARI,
  ...MOCK_DINING,
  ...MOCK_TRANSFERS,
  ...MOCK_WELLNESS,
  ...MOCK_EVENTS,
  ...MOCK_SHOPPING
];

// Local Emergency and Essential Services
export const MOCK_LOCAL_SERVICES: LocalService[] = [
  {
    id: 'serv-1',
    name: 'Dahab Specialized Hospital & Hyperbaric Chamber',
    category: 'Hospital',
    area: 'Dahab City Entrance',
    phone: '+20 69 364 0880',
    isOpen: true,
    hours: '24/7 Emergency & Decompression Chamber',
    address: 'Peace Road, Dahab Entrance',
    badge: 'Decompression Chamber'
  },
  {
    id: 'serv-2',
    name: 'Dr. Tamer Sea Star Pharmacy',
    category: 'Pharmacy',
    area: 'Lighthouse Promenade',
    phone: '+20 100 234 5678',
    isOpen: true,
    hours: '08:00 AM – 02:00 AM Daily',
    address: 'Lighthouse Plaza, next to Coral Coast'
  },
  {
    id: 'serv-3',
    name: 'Ghazala Central Supermarket',
    category: 'Supermarket',
    area: 'Mashraba',
    phone: '+20 100 987 6543',
    isOpen: true,
    hours: 'Open 24 Hours / 7 Days',
    address: 'Mashraba Main Street',
    badge: '24/7 Open'
  },
  {
    id: 'serv-4',
    name: 'National Bank of Egypt (NBE) ATM & Exchange',
    category: 'ATM',
    area: 'Mashraba / Lighthouse',
    phone: '19623',
    isOpen: true,
    hours: '24/7 Cash Withdrawal & USD/EUR Exchange',
    address: 'Opposite Ghazala Supermarket, Mashraba'
  }
];

export const MOCK_SERVICES = MOCK_LOCAL_SERVICES;

export const MOCK_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Sarah Jenkins',
    date: 'March 2025',
    rating: 5,
    comment: 'Exceptional service and authentic Dahab atmosphere. Highly recommended for anyone wanting a genuine Sinai experience!'
  },
  {
    id: 'rev-2',
    author: 'Karim Mostafa',
    date: 'February 2025',
    rating: 5,
    comment: 'Super professional team, top safety standards, and transparent pricing in EGP with zero hidden charges.'
  },
  {
    id: 'rev-3',
    author: 'Elena Rostova',
    date: 'January 2025',
    rating: 5,
    comment: 'The Dahab 360 perks and direct WhatsApp confirmation made organizing our whole stay effortless.'
  }
];

// Planner services for the itinerary builder
export const MOCK_PLANNER_SERVICES: PlannerService[] = [
  {
    id: 'plan-scuba-1',
    title: 'Shams Dive Centre: Guided 2-Tank Dives',
    category: 'Diving',
    duration: 'Half Day',
    price: 1200,
    description: 'Guided dives to Blue Hole & Canyon with certified SSI/TDI divemasters and equipment.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    recommendedTime: 'Morning (08:30 AM)',
    popular: true
  },
  {
    id: 'plan-freedive-1',
    title: 'One Breath Academy: AIDA Freediving Course',
    category: 'Diving',
    duration: '2.5 Days',
    price: 3500,
    description: 'Comprehensive AIDA depth & equalisation course at Lighthouse with Ahmed Korany.',
    image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=600&q=80',
    recommendedTime: 'Morning (09:00 AM)',
    popular: true
  },
  {
    id: 'plan-kite-1',
    title: 'Soul Kitesurfing: Laguna Lessons & Rental',
    category: 'Water & Boat',
    duration: '2 Hours',
    price: 1800,
    description: 'Flat water thermal wind kite lessons at Dahab sandy Laguna with IKO coaching.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    recommendedTime: 'Afternoon (01:00 PM)',
    popular: true
  },
  {
    id: 'plan-safari-1',
    title: 'Wadi Gnai & Three Pools 4x4 Safari',
    category: 'Safari & Mountains',
    duration: 'Full Day (7h)',
    price: 950,
    description: '4x4 canyon off-roading, granite canyon hike, Three Pools snorkeling & Bedouin lunch.',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
    recommendedTime: 'Morning (08:30 AM)',
    popular: true
  },
  {
    id: 'plan-safari-2',
    title: 'Morning Yacht & Snorkeling Cruise',
    category: 'Water & Boat',
    duration: '7 Hours',
    price: 1400,
    description: 'Scenic yacht cruise across Gulf of Aqaba with reef snorkeling and lunch buffet.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    recommendedTime: 'Full Day (09:00 AM)',
    popular: true
  },
  {
    id: 'plan-trans-1',
    title: 'Sharm Airport to Dahab Private Van (Up to 4 Pax)',
    category: 'Transfers',
    duration: '60 mins',
    price: 1100,
    description: 'Private AC HiAce van transfer directly between SSH Airport and your hotel.',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    recommendedTime: 'Flexible / On Flight Arrival',
    popular: true
  },
  {
    id: 'plan-well-1',
    title: 'Dahab Wellness Spa: 60-min Deep Tissue Massage',
    category: 'Cultural & Dinner',
    duration: '60 Mins',
    price: 600,
    description: 'Full-body muscle restorative massage with organic Sinai lavender aromatherapy.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    recommendedTime: 'Late Afternoon (05:00 PM)',
    popular: false
  },
  {
    id: 'plan-event-1',
    title: 'Sunset Desert Canyon Sound Healing & Breathwork',
    category: 'Cultural & Dinner',
    duration: '2.5 Hours',
    price: 450,
    description: 'Acoustic canyon evening with singing bowls, conscious breathing, and campfire.',
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80',
    recommendedTime: 'Sunset (05:30 PM)',
    popular: true
  }
];
