import { MarketplaceProduct, MarketplaceCategory } from '../types';

export const MARKETPLACE_CATEGORIES: { id: MarketplaceCategory; label: string; icon: string }[] = [
  { id: 'All', label: 'All', icon: 'sparkles' },
  { id: 'Souvenirs & Handmade', label: 'Souvenirs & Handmade', icon: 'shopping-bag' },
  { id: 'Diving & Water Gear', label: 'Diving & Water Gear', icon: 'waves' },
  { id: 'Sports & Outdoor', label: 'Sports & Outdoor', icon: 'mountain' },
  { id: 'Local Products', label: 'Local Products', icon: 'leaf' },
  { id: 'Other', label: 'Other', icon: 'more' }
];

export const FEATURED_MARKETPLACE_PRODUCTS: MarketplaceProduct[] = [
  {
    id: 'feat-1',
    title: 'Handmade Silver Ring',
    price: 1200,
    condition: 'New',
    category: 'Souvenirs & Handmade',
    location: 'Mashraba, Dahab',
    seller: {
      name: 'Nubian Crafts',
      rating: 4.8,
      phone: '+201019283746'
    },
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    isFeatured: true,
    description: 'Authentic handcrafted 925 sterling silver ring with genuine Sinai turquoise stone. Made with traditional Bedouin filigree techniques.'
  },
  {
    id: 'feat-2',
    title: 'Scuba Diving Mask (Mares)',
    price: 2500,
    condition: 'Used',
    category: 'Diving & Water Gear',
    location: 'Lighthouse, Dahab',
    seller: {
      name: 'Blue Wave Dive',
      rating: 4.7,
      phone: '+201028374651'
    },
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    isFeatured: true,
    description: 'Mares X-Vision liquid skin mask in excellent condition. Fog-resistant tempered optical lenses with soft silicone skirt.'
  },
  {
    id: 'feat-3',
    title: 'Handmade Beach Bag',
    price: 650,
    condition: 'New',
    category: 'Souvenirs & Handmade',
    location: 'Laguna, Dahab',
    seller: {
      name: 'Dahab Art',
      rating: 4.9,
      phone: '+201037465192'
    },
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    isFeatured: true,
    description: 'Eco-friendly natural jute & palm leaf woven beach tote bag with vibrant Bedouin geometric embroidery handles.'
  },
  {
    id: 'feat-4',
    title: 'Sinai Bedouin Kilim Carpet',
    price: 1800,
    condition: 'New',
    category: 'Souvenirs & Handmade',
    location: 'Mashraba, Dahab',
    seller: {
      name: 'Heritage Sinai',
      rating: 4.9,
      phone: '+201046519283'
    },
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80',
    isFeatured: true,
    description: 'Handwoven pure sheep wool rug with traditional desert geometric patterns dyed with natural Sinai pomegranate and walnut pigments.'
  }
];

export const ALL_MARKETPLACE_PRODUCTS: MarketplaceProduct[] = [
  // Required items from prompt
  {
    id: 'prod-1',
    title: 'Freediving Fins (Leaderfins)',
    price: 3500,
    condition: 'Used',
    category: 'Diving & Water Gear',
    location: 'Dahab',
    seller: {
      name: 'Sea Lovers',
      rating: 4.6,
      phone: '+201055443322'
    },
    image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    description: 'Fiberglass medium-stiffness blades size 41-42 with Forza footpockets. Great reactive propulsion for depth training.'
  },
  {
    id: 'prod-2',
    title: 'Wetsuit 3mm (Medium)',
    price: 2000,
    condition: 'Used',
    category: 'Diving & Water Gear',
    location: 'Dahab',
    seller: {
      name: 'Dahab Divers',
      rating: 4.8,
      phone: '+201066778899'
    },
    image: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    description: 'Cressi Castoro 3mm all-season full wetsuit. Well rinsed and maintained, zipper in smooth working condition.'
  },
  {
    id: 'prod-3',
    title: 'Windsurf Board (Complete Set)',
    price: 7500,
    condition: 'Used',
    category: 'Sports & Outdoor',
    location: 'Dahab',
    seller: {
      name: 'Wind Dahab',
      rating: 4.7,
      phone: '+201077889900'
    },
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    description: 'Starboard 135L freeride board with 5.5m rig, boom, mast, and fin. Ideal for Dahab Laguna speeds.'
  },
  {
    id: 'prod-4',
    title: 'Handmade Lamp',
    price: 850,
    condition: 'New',
    category: 'Souvenirs & Handmade',
    location: 'Dahab',
    seller: {
      name: 'Sinai Art',
      rating: 4.9,
      phone: '+201088990011'
    },
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    description: 'Hand-punched copper Bedouin filigree pendant lantern casting intricate kaleidoscopic shadows on walls.'
  },

  // Additional rich Dahab marketplace products
  {
    id: 'prod-5',
    title: 'Handmade Silver Ring',
    price: 1200,
    condition: 'New',
    category: 'Souvenirs & Handmade',
    location: 'Mashraba',
    seller: {
      name: 'Nubian Crafts',
      rating: 4.8,
      phone: '+201004892211'
    },
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    isFeatured: true,
    description: 'Solid 925 sterling silver ring featuring authentic Sinai turquoise stone.'
  },
  {
    id: 'prod-6',
    title: 'Scuba Diving Mask (Mares)',
    price: 2500,
    condition: 'Used',
    category: 'Diving & Water Gear',
    location: 'Lighthouse',
    seller: {
      name: 'Blue Wave Dive',
      rating: 4.7,
      phone: '+201004892211'
    },
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    isFeatured: true,
    description: 'Mares optical dive mask with clear panoramic view and comfortable strap.'
  },
  {
    id: 'prod-7',
    title: 'Handmade Beach Bag',
    price: 650,
    condition: 'New',
    category: 'Souvenirs & Handmade',
    location: 'Laguna',
    seller: {
      name: 'Dahab Art',
      rating: 4.9,
      phone: '+201004892211'
    },
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    isFeatured: true,
    description: 'Handwoven palm leaf beach basket with stitched cotton inner pouch.'
  },
  {
    id: 'prod-8',
    title: 'Cold-Pressed Sinai Olive Oil (1L)',
    price: 320,
    condition: 'New',
    category: 'Local Products',
    location: 'Assalah',
    seller: {
      name: 'Sinai Organics',
      rating: 5.0,
      phone: '+201004892211'
    },
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    description: 'Extra virgin olive oil harvest from organic groves in Wadi Feiran and St. Catherine foothills. Rich fruity aroma.'
  },
  {
    id: 'prod-9',
    title: 'Mountain Sidr Honey (500g)',
    price: 450,
    condition: 'New',
    category: 'Local Products',
    location: 'Dahab',
    seller: {
      name: 'Bedouin Gold',
      rating: 5.0,
      phone: '+201004892211'
    },
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    description: 'Raw unfiltered honey from native Sidr trees blooming in high-altitude Sinai valleys. Known for medicinal properties.'
  },
  {
    id: 'prod-10',
    title: 'Aqualung Dive Computer i300C',
    price: 4800,
    condition: 'Used',
    category: 'Diving & Water Gear',
    location: 'Lighthouse',
    seller: {
      name: 'Dahab Dive Hub',
      rating: 4.9,
      phone: '+201004892211'
    },
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    description: 'Bluetooth sync dive computer with fresh battery and screen guard. Nitrox compatible up to 100% O2.'
  },
  {
    id: 'prod-11',
    title: 'Inflatable Stand-Up Paddleboard',
    price: 6200,
    condition: 'Used',
    category: 'Diving & Water Gear',
    location: 'Laguna',
    seller: {
      name: 'Laguna Water Sports',
      rating: 4.7,
      phone: '+201004892211'
    },
    image: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    description: '10ft all-around SUP with pump, carbon adjustable paddle, safety ankle leash, and carry backpack.'
  },
  {
    id: 'prod-12',
    title: 'Sinai Trekking Backpack 45L',
    price: 1600,
    condition: 'New',
    category: 'Sports & Outdoor',
    location: 'Dahab',
    seller: {
      name: 'Desert Nomad',
      rating: 4.8,
      phone: '+201004892211'
    },
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    description: 'Durable tear-proof nylon hiking backpack with rain cover, hydration bladder compartment, and ergonomic hip belt.'
  },
  {
    id: 'prod-13',
    title: 'Organic Sinai Herbal Tea Blend',
    price: 150,
    condition: 'New',
    category: 'Local Products',
    location: 'Mashraba',
    seller: {
      name: 'Sinai Botanicals',
      rating: 4.9,
      phone: '+201004892211'
    },
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    description: 'Traditional Habak (desert mint) and Marmareya (wild sage) collected by local Jebeliya Bedouins.'
  },
  {
    id: 'prod-14',
    title: 'Vintage Desert Cruiser Bicycle',
    price: 3200,
    condition: 'Used',
    category: 'Other',
    location: 'Assalah',
    seller: {
      name: 'Dahab Cycles',
      rating: 4.7,
      phone: '+201004892211'
    },
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    description: 'Single-speed beach cruiser bike with front basket and fat tires. Serviced recently with new chain and brakes.'
  },
  {
    id: 'prod-15',
    title: 'Red Sea Salt Body Polish (400g)',
    price: 220,
    condition: 'New',
    category: 'Local Products',
    location: 'Mashraba',
    seller: {
      name: 'Dahab Glow',
      rating: 4.9,
      phone: '+201004892211'
    },
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    description: 'Pure solar-evaporated Sinai mineral salt infused with sweet almond oil and rosemary essential oil.'
  },
  {
    id: 'prod-16',
    title: 'Waterproof Action Cam Floating Grip',
    price: 350,
    condition: 'New',
    category: 'Other',
    location: 'Lighthouse',
    seller: {
      name: 'Nomad Tech',
      rating: 4.8,
      phone: '+201004892211'
    },
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    description: 'High visibility orange floating hand grip for underwater action cameras. Universal standard mount.'
  }
];
