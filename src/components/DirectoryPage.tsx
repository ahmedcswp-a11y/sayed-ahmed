import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  SlidersHorizontal, 
  MapPin, 
  ArrowUpDown, 
  Filter, 
  X, 
  Check, 
  Search,
  Compass,
  Bed,
  Waves,
  Sailboat,
  Mountain,
  Utensils,
  Car,
  Sparkles,
  Music,
  ShoppingBag,
  ShieldCheck,
  Clock,
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { Listing, Currency, ListingType, OfficialCategory } from '../types';
import { ListingCard } from './ListingCard';
import { ALL_MOCK_LISTINGS, OFFICIAL_CATEGORIES } from '../data/mockData';

interface DirectoryPageProps {
  initialCategory?: ListingType | 'all';
  initialOfficialCategory?: OfficialCategory | 'All';
  initialSubcategory?: string;
  currency: Currency;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onSelectListing: (listing: Listing) => void;
  onBookNow: (listing: Listing) => void;
}

const CATEGORY_TAGS: Record<OfficialCategory, string[]> = {
  'Accommodation': ['All', 'Hotels', 'Boutique Resort', 'Eco Camp', 'Apartments', 'Laguna', 'Mashraba'],
  'Scuba Diving': ['All', 'Dive Centers', 'Guided Dives', 'PADI', 'SSI', 'Blue Hole', 'Canyon'],
  'Freediving': ['All', 'AIDA Courses', 'Depth Training', 'Beginner', 'Blue Hole Sessions'],
  'Kite Surfing & Water Activities': ['All', 'Kitesurfing', 'Windsurfing', 'Laguna', 'SUP', 'Gear Rental'],
  'Trips & Safari': ['All', 'Wadi Gnai', 'Desert Canyon', 'Yacht Day', 'Three Pools', 'St. Catherine'],
  'Restaurants & Cafes': ['All', 'Seafood', 'Bedouin Dining', 'Beachfront', 'Breakfast & Cafe', '15% Off'],
  'Transfers': ['All', 'Airport Shuttle', 'Private Van', 'Sharm Airport', 'Sinai Taxis'],
  'Beauty, Spa & Wellness': ['All', 'Deep Tissue', 'Yoga', 'Sound Healing', 'Aromatherapy', 'Beachfront'],
  'Events & Workshops': ['All', 'Sound Healing', 'Live Music', 'Meditation', 'Community'],
  'Shopping & Local Services': ['All', 'Dive Gear', 'Supermarket', 'Pharmacy', '24/7 Delivery']
};

export const DirectoryPage: React.FC<DirectoryPageProps> = ({
  initialCategory = 'all',
  initialOfficialCategory,
  initialSubcategory,
  currency,
  favorites,
  onToggleFavorite,
  onSelectListing,
  onBookNow
}) => {
  const [selectedOfficialCategory, setSelectedOfficialCategory] = useState<OfficialCategory | 'All'>(
    initialOfficialCategory || 'All'
  );
  const [activeSubTag, setActiveSubTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState(initialSubcategory || '');
  const [selectedArea, setSelectedArea] = useState<string>('All');
  const [selectedPriceLevel, setSelectedPriceLevel] = useState<string>('All');
  const [partnerOnly, setPartnerOnly] = useState<boolean>(false);
  const [openNowOnly, setOpenNowOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'priceAsc' | 'priceDesc' | 'popular'>('recommended');

  const categoryPillsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Sync category when passed or changed from outside
  useEffect(() => {
    if (initialOfficialCategory) {
      setSelectedOfficialCategory(initialOfficialCategory);
      setActiveSubTag('All');
    } else if (initialCategory === 'stay') {
      setSelectedOfficialCategory('Accommodation');
      setActiveSubTag('All');
    } else if (initialCategory === 'dining') {
      setSelectedOfficialCategory('Restaurants & Cafes');
      setActiveSubTag('All');
    } else if (initialCategory === 'experience') {
      setSelectedOfficialCategory('Scuba Diving');
      setActiveSubTag('All');
    }
  }, [initialOfficialCategory, initialCategory]);

  // Sync subcategory / search query
  useEffect(() => {
    if (initialSubcategory !== undefined) {
      setSearchQuery(initialSubcategory);
    }
  }, [initialSubcategory]);

  // Auto-scroll selected category pill into view
  useEffect(() => {
    if (selectedOfficialCategory && categoryPillsRef.current[selectedOfficialCategory]) {
      categoryPillsRef.current[selectedOfficialCategory]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [selectedOfficialCategory]);

  // Master listings array
  const allListings = ALL_MOCK_LISTINGS;

  // Selected Category Meta
  const currentCategoryMeta = useMemo(() => {
    if (selectedOfficialCategory === 'All') return null;
    return OFFICIAL_CATEGORIES.find(c => c.id === selectedOfficialCategory) || null;
  }, [selectedOfficialCategory]);

  // Filter listings
  const filteredListings = useMemo(() => {
    return allListings.filter(item => {
      // 1. Official Category filter
      if (selectedOfficialCategory !== 'All' && item.officialCategory !== selectedOfficialCategory) {
        return false;
      }

      // 2. SubTag filter
      if (activeSubTag !== 'All') {
        const tag = activeSubTag.toLowerCase();
        const matchName = item.name.toLowerCase().includes(tag);
        const matchCat = item.category.toLowerCase().includes(tag);
        const matchDesc = item.description ? item.description.toLowerCase().includes(tag) : false;
        const matchAmenity = item.amenities ? item.amenities.some(a => a.toLowerCase().includes(tag)) : false;
        const matchPerk = item.perks ? item.perks.some(p => p.toLowerCase().includes(tag)) : false;
        const matchBadge = item.badge ? item.badge.toLowerCase().includes(tag) : false;
        if (!matchName && !matchCat && !matchDesc && !matchAmenity && !matchPerk && !matchBadge) {
          return false;
        }
      }

      // 3. Search query (name, area, category, description)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(q);
        const matchArea = item.area.toLowerCase().includes(q);
        const matchCat = item.category.toLowerCase().includes(q);
        const matchOff = item.officialCategory ? item.officialCategory.toLowerCase().includes(q) : false;
        const matchDesc = item.description ? item.description.toLowerCase().includes(q) : false;
        if (!matchName && !matchArea && !matchCat && !matchOff && !matchDesc) {
          return false;
        }
      }

      // 4. Area filter
      if (selectedArea !== 'All' && !item.area.toLowerCase().includes(selectedArea.toLowerCase())) {
        return false;
      }

      // 5. Price Level
      if (selectedPriceLevel !== 'All' && item.priceLevel !== selectedPriceLevel) {
        return false;
      }

      // 6. Partner only
      if (partnerOnly && !item.isPartner) {
        return false;
      }

      // 7. Open now
      if (openNowOnly && !item.isOpen) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      if (sortBy === 'popular') return b.reviewCount - a.reviewCount;
      // Recommended: partners first, then high rating
      if (a.isPartner && !b.isPartner) return -1;
      if (!a.isPartner && b.isPartner) return 1;
      return b.rating - a.rating;
    });
  }, [allListings, selectedOfficialCategory, activeSubTag, searchQuery, selectedArea, selectedPriceLevel, partnerOnly, openNowOnly, sortBy]);

  const areas = ['All', 'Mashraba', 'Lighthouse', 'Laguna', 'Eel Garden', 'Blue Hole Area', 'Assalah'];

  const resetAllFilters = () => {
    setSelectedOfficialCategory('All');
    setActiveSubTag('All');
    setSearchQuery('');
    setSelectedArea('All');
    setSelectedPriceLevel('All');
    setPartnerOnly(false);
    setOpenNowOnly(false);
    setSortBy('recommended');
  };

  const hasActiveFilters = 
    selectedOfficialCategory !== 'All' ||
    activeSubTag !== 'All' ||
    searchQuery.trim() !== '' ||
    selectedArea !== 'All' ||
    selectedPriceLevel !== 'All' ||
    partnerOnly ||
    openNowOnly;

  const getCategoryIcon = (name: string, className = "w-4 h-4") => {
    switch (name) {
      case 'Accommodation': return <Bed className={className} />;
      case 'Scuba Diving': return <Compass className={className} />;
      case 'Freediving': return <Waves className={className} />;
      case 'Kite Surfing & Water Activities': return <Sailboat className={className} />;
      case 'Trips & Safari': return <Mountain className={className} />;
      case 'Restaurants & Cafes': return <Utensils className={className} />;
      case 'Transfers': return <Car className={className} />;
      case 'Beauty, Spa & Wellness': return <Sparkles className={className} />;
      case 'Events & Workshops': return <Music className={className} />;
      case 'Shopping & Local Services': return <ShoppingBag className={className} />;
      default: return <Compass className={className} />;
    }
  };

  const currentTags = selectedOfficialCategory !== 'All' ? (CATEGORY_TAGS[selectedOfficialCategory] || []) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* 1. Category Header Banner with Direct Context */}
      <div className="bg-white rounded-[16px] border border-slate-200 p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 text-left">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-[4px] bg-[#2A9D8F]/10 text-[#2A9D8F] text-[11px] font-mono-tag font-bold uppercase tracking-wider">
                Category View
              </span>
              <span className="text-xs text-slate-400 font-mono-tag">
                {filteredListings.length} {filteredListings.length === 1 ? 'Listing' : 'Listings'} Found
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-[#2A9D8F] text-white flex items-center justify-center shrink-0 shadow-xs">
                {getCategoryIcon(selectedOfficialCategory, "w-5 h-5")}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#264653] font-heading tracking-tight">
                  {selectedOfficialCategory === 'All' ? 'All Dahab Categories' : selectedOfficialCategory}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed mt-0.5">
                  {currentCategoryMeta 
                    ? currentCategoryMeta.description 
                    : 'Explore all 10 official categories in Dahab with verified local providers, transparent prices, and direct booking.'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Search in Category */}
          <div className="w-full md:w-80 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={selectedOfficialCategory === 'All' ? "Search all providers or area..." : `Search in ${selectedOfficialCategory}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-[8px] focus:outline-hidden focus:border-[#2A9D8F] focus:bg-white text-[#264653] placeholder:text-slate-400 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. 10 Official Categories Pill Carousel (Quick Switcher) */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-mono-tag font-bold text-slate-400 uppercase tracking-wider px-1">
          Switch Category
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar scroll-smooth">
          <button
            type="button"
            ref={(el) => (categoryPillsRef.current['All'] = el)}
            onClick={() => {
              setSelectedOfficialCategory('All');
              setActiveSubTag('All');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
              selectedOfficialCategory === 'All'
                ? 'bg-[#264653] text-white shadow-xs scale-102'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
            }`}
          >
            <span>All Categories</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono-tag ${
              selectedOfficialCategory === 'All' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {allListings.length}
            </span>
          </button>

          {OFFICIAL_CATEGORIES.map((cat) => {
            const isSelected = selectedOfficialCategory === cat.id;
            const count = allListings.filter(l => l.officialCategory === cat.id).length;
            return (
              <button
                key={cat.id}
                ref={(el) => (categoryPillsRef.current[cat.id] = el)}
                type="button"
                onClick={() => {
                  setSelectedOfficialCategory(cat.id);
                  setActiveSubTag('All');
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-[8px] text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#2A9D8F] text-white shadow-xs font-bold ring-2 ring-[#2A9D8F]/20 scale-102'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                }`}
              >
                {getCategoryIcon(cat.name, "w-3.5 h-3.5")}
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono-tag ${
                  isSelected ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Category Sub-tags (When a category is active) */}
      {currentTags.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
          <span className="text-[11px] font-mono-tag font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
            Quick Filter:
          </span>
          {currentTags.map((tag) => {
            const isSelected = activeSubTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveSubTag(tag)}
                className={`px-3 py-1 rounded-[6px] text-xs font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#264653] text-white font-bold shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      )}

      {/* 4. Complete Filter Toolbar */}
      <div className="bg-white rounded-[12px] border border-slate-200 p-3 sm:p-4 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Area Filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-[6px] px-2.5 py-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#2A9D8F]" />
              <span className="text-slate-500 font-medium">Area:</span>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="bg-transparent text-[#264653] font-semibold focus:outline-hidden cursor-pointer"
              >
                {areas.map(a => (
                  <option key={a} value={a}>{a === 'All' ? 'All Areas' : a}</option>
                ))}
              </select>
            </div>

            {/* Price Level Filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-[6px] px-2.5 py-1.5">
              <span className="text-slate-500 font-medium">Price:</span>
              <select
                value={selectedPriceLevel}
                onChange={(e) => setSelectedPriceLevel(e.target.value)}
                className="bg-transparent text-[#264653] font-semibold focus:outline-hidden cursor-pointer"
              >
                <option value="All">All Price Ranges</option>
                <option value="$">$ (Budget Friendly)</option>
                <option value="$$">$$ (Mid-Range & Popular)</option>
                <option value="$$$">$$$ (Boutique & Premium)</option>
              </select>
            </div>

            {/* Dahab 360 Partner Toggle */}
            <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] border cursor-pointer select-none transition-colors ${
              partnerOnly
                ? 'bg-[#2A9D8F]/10 border-[#2A9D8F] text-[#2A9D8F] font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}>
              <input
                type="checkbox"
                checked={partnerOnly}
                onChange={(e) => setPartnerOnly(e.target.checked)}
                className="rounded-xs text-[#2A9D8F] focus:ring-0 cursor-pointer"
              />
              <ShieldCheck className="w-3.5 h-3.5 text-[#2A9D8F]" />
              <span>Dahab 360 Partners Only</span>
            </label>

            {/* Open Now Toggle */}
            <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] border cursor-pointer select-none transition-colors ${
              openNowOnly
                ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}>
              <input
                type="checkbox"
                checked={openNowOnly}
                onChange={(e) => setOpenNowOnly(e.target.checked)}
                className="rounded-xs text-emerald-600 focus:ring-0 cursor-pointer"
              />
              <span className={`w-2 h-2 rounded-full ${openNowOnly ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
              <span>Open Now</span>
            </label>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-mono-tag">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-[6px] px-2.5 py-1.5 text-xs text-[#264653] font-semibold focus:outline-hidden cursor-pointer"
            >
              <option value="recommended">Recommended First</option>
              <option value="rating">Top Rated (Highest First)</option>
              <option value="priceAsc">Price (Lowest to Highest)</option>
              <option value="priceDesc">Price (Highest to Lowest)</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

        </div>

        {/* Active Filters Summary Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-mono-tag font-semibold text-slate-400 mr-1">
              Active Filters:
            </span>

            {selectedOfficialCategory !== 'All' && (
              <span className="inline-flex items-center gap-1 bg-[#2A9D8F]/10 text-[#2A9D8F] px-2.5 py-0.5 rounded-[4px] text-xs font-medium">
                Category: {selectedOfficialCategory}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedOfficialCategory('All');
                    setActiveSubTag('All');
                  }}
                  className="hover:text-red-500 cursor-pointer ml-0.5"
                  title="Remove category filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {activeSubTag !== 'All' && (
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-[4px] text-xs font-medium">
                Tag: {activeSubTag}
                <button
                  type="button"
                  onClick={() => setActiveSubTag('All')}
                  className="hover:text-red-500 cursor-pointer ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedArea !== 'All' && (
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-[4px] text-xs font-medium">
                Area: {selectedArea}
                <button
                  type="button"
                  onClick={() => setSelectedArea('All')}
                  className="hover:text-red-500 cursor-pointer ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedPriceLevel !== 'All' && (
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-[4px] text-xs font-medium">
                Price: {selectedPriceLevel}
                <button
                  type="button"
                  onClick={() => setSelectedPriceLevel('All')}
                  className="hover:text-red-500 cursor-pointer ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {partnerOnly && (
              <span className="inline-flex items-center gap-1 bg-[#2A9D8F]/10 text-[#2A9D8F] px-2.5 py-0.5 rounded-[4px] text-xs font-medium">
                Partners Only
                <button
                  type="button"
                  onClick={() => setPartnerOnly(false)}
                  className="hover:text-red-500 cursor-pointer ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {openNowOnly && (
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-[4px] text-xs font-medium">
                Open Now
                <button
                  type="button"
                  onClick={() => setOpenNowOnly(false)}
                  className="hover:text-red-500 cursor-pointer ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-[4px] text-xs font-medium">
                Keyword: "{searchQuery}"
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="hover:text-red-500 cursor-pointer ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1 text-xs text-[#E76F51] hover:underline font-bold cursor-pointer ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          </div>
        )}

      </div>

      {/* 5. Listings Results Grid */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              currency={currency}
              isFavorite={favorites.has(listing.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectListing={onSelectListing}
              onBookNow={onBookNow}
              hidePrice={listing.officialCategory === 'Restaurants & Cafes'}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-[16px] border border-slate-200 space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#2A9D8F]/10 text-[#2A9D8F] flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#264653]">No matching listings found</h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              Try adjusting your search keywords, area, or clear filters to view more providers in Dahab.
            </p>
          </div>
          <button
            type="button"
            onClick={resetAllFilters}
            className="px-5 py-2.5 bg-[#2A9D8F] hover:bg-[#238276] text-white rounded-[8px] text-xs font-bold cursor-pointer shadow-xs transition-colors"
          >
            Show All Listings
          </button>
        </div>
      )}

    </div>
  );
};
