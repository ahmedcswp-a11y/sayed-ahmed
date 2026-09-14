export type Currency = 'EGP' | 'USD';

export type ListingType = 'experience' | 'stay' | 'dining' | 'service';

export type OfficialCategory =
  | 'Accommodation'
  | 'Scuba Diving'
  | 'Freediving'
  | 'Kite Surfing & Water Activities'
  | 'Trips & Safari'
  | 'Restaurants & Cafes'
  | 'Transfers'
  | 'Beauty, Spa & Wellness'
  | 'Events & Workshops'
  | 'Shopping & Local Services';

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  verified?: boolean;
}

export interface ListingAddOn {
  title: string;
  price: number; // in EGP
}

export interface Provider {
  id: string;
  name: string;
  slug: string;
  logo: string;
  coverImage: string;
  description: string;
  area: string;
  rating: number;
  reviewCount: number;
  phone: string;
  whatsapp: string;
  website?: string;
  isPartner: boolean;
  isFeaturedPartner?: boolean;
  isSponsored?: boolean;
  servicesCount: number;
  category: OfficialCategory;
}

export interface Listing {
  id: string;
  slug: string;
  name: string;
  type: ListingType;
  category: string;
  officialCategory?: OfficialCategory;
  providerId?: string;
  providerName?: string;
  area: string;
  rating: number;
  reviewCount: number;
  price: number; // in EGP
  priceLabel?: string; // e.g. "From / night", "Per dive", "Per person", etc.
  priceLevel?: '$' | '$$' | '$$$' | '$$$$';
  currency: 'EGP';
  isOpen: boolean;
  isPartner: boolean;
  buttonType?: 'book_dahab360' | 'contact_provider' | 'get_deal';
  buttonLabel?: string;
  badge?: string; // e.g. "15% OFF with code DAHAB360"
  dealDiscount?: string; // e.g. "15% OFF", "20% OFF", "Free BBQ Upgrade"
  promoCode?: string; // e.g. "DAHAB360-DEAL-15"
  dealTerms?: string;
  dealExpires?: string;
  addOns?: ListingAddOn[];
  images: string[];
  logo: string;
  amenities: string[];
  perks?: string[];
  included?: string[];
  excluded?: string[];
  itinerarySchedule?: { time: string; title: string; desc: string }[];
  phone: string;
  whatsapp: string;
  address: string;
  openingHours: {
    today: string;
    schedule: { day: string; hours: string }[];
  };
  description: string;
  highlights?: string[];
  duration?: string; // for experiences
  featured?: boolean;
  tags?: string[];
  lat?: number;
  lng?: number;
}

export interface LocalService {
  id: string;
  name: string;
  category: 'Hospital' | 'Pharmacy' | 'Supermarket' | 'ATM' | 'Transportation' | 'Emergency';
  area: string;
  phone: string;
  isOpen: boolean;
  hours: string;
  address: string;
  badge?: string;
}

export interface PlannerService {
  id: string;
  title: string;
  category: 'Diving' | 'Safari & Mountains' | 'Water & Boat' | 'Cultural & Dinner' | 'Transfers';
  duration: string;
  price: number; // in EGP
  description: string;
  image: string;
  recommendedTime: string;
  popular?: boolean;
}

export interface ItineraryItem {
  id: string;
  serviceId: string;
  title: string;
  category: string;
  day: number;
  timeSlot: string;
  travelers: number;
  unitPrice: number;
  date?: string;
  addOns?: string[];
  selectedAddOnsList?: { title: string; price: number }[];
  totalPrice?: number;
}

export type MarketplaceCategory = 
  | 'All'
  | 'Souvenirs & Handmade'
  | 'Diving & Water Gear'
  | 'Sports & Outdoor'
  | 'Local Products'
  | 'Other';

export interface MarketplaceProduct {
  id: string;
  title: string;
  price: number; // in EGP
  condition: 'New' | 'Used';
  category: MarketplaceCategory;
  location: string;
  seller: {
    name: string;
    rating: number;
    phone?: string;
    avatar?: string;
  };
  image: string;
  isFeatured?: boolean;
  description?: string;
}

export interface CartItem {
  product: MarketplaceProduct;
  quantity: number;
}

export type GuideTopic = 
  | 'Things to Do'
  | 'Beaches & Snorkeling'
  | 'Hiking & Nature'
  | 'Food & Cafes'
  | 'Getting Around'
  | 'Essential Info'
  | 'More Topics';

export interface GuideArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: string;
  topic: GuideTopic;
  badge?: string;
  author?: string;
  date?: string;
  relatedListingSlugs?: string[];
  relatedMarketplaceIds?: string[];
}

export interface DIYPlace {
  id: string;
  name: string;
  badge: string; // e.g. "Free Access", "Snorkeling"
  image: string;
  description: string;
  distance?: string;
  tips?: string;
}

export interface QuickInfoItem {
  id: string;
  title: string;
  icon: string;
  summary: string;
  details: string[];
}

export type ViewRoute = 
  | { type: 'home' }
  | { type: 'directory'; category?: string; subcategory?: string; officialCategory?: OfficialCategory | 'All' }
  | { type: 'category'; slug: string }
  | { type: 'listing'; slug: string }
  | { type: 'service'; id: string }
  | { type: 'provider'; id: string }
  | { type: 'marketplace' }
  | { type: 'marketplace-product'; id: string }
  | { type: 'planner' }
  | { type: 'guide'; topic?: string }
  | { type: 'about' }
  | { type: 'service-providers' }
  | { type: 'contact' }
  | { type: 'article'; articleId: string }
  | { type: 'offers'; category?: string };
