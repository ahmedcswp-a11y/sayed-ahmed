import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  ArrowRight, 
  Waves, 
  Bed, 
  Utensils, 
  Calendar, 
  Phone, 
  Navigation, 
  Sparkles,
  Compass,
  Sailboat,
  Mountain,
  Car,
  Music,
  ShoppingBag,
  X,
  Filter,
  CheckCircle2,
  Tag,
  BookOpen
} from 'lucide-react';
import { Listing, Currency, ViewRoute, OfficialCategory } from '../types';
import { ListingCard } from './ListingCard';
import { 
  OFFICIAL_CATEGORIES, 
  ALL_MOCK_LISTINGS, 
  MOCK_EXPERIENCES, 
  MOCK_STAYS, 
  MOCK_DINING, 
  MOCK_TRANSFERS,
  MOCK_WELLNESS,
  MOCK_EVENTS,
  MOCK_SHOPPING,
  MOCK_LOCAL_SERVICES 
} from '../data/mockData';

interface HomepageProps {
  currency: Currency;
  onToggleCurrency: () => void;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onSelectListing: (listing: Listing) => void;
  onBookNow: (listing: Listing) => void;
  onNavigate: (route: ViewRoute) => void;
}

export const Homepage: React.FC<HomepageProps> = ({
  currency,
  onToggleCurrency,
  favorites,
  onToggleFavorite,
  onSelectListing,
  onBookNow,
  onNavigate
}) => {
  const [heroSearch, setHeroSearch] = useState('');
  const [activeSection, setActiveSection] = useState<string>('experiences');

  // Tab refs for auto-scroll synchronization
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Sticky Section Navigation tabs
  const sectionTabs = [
    { id: 'experiences', label: 'Activities & Experiences' },
    { id: 'stays', label: 'Places to Stay' },
    { id: 'dining', label: 'Restaurants & Cafés' },
    { id: 'services', label: 'Essential Services & Emergency' }
  ];

  // Helper to render outline Lucide icon for each category
  const renderCategoryIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'Bed': return <Bed className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'Waves': return <Waves className={className} />;
      case 'Sailboat': return <Sailboat className={className} />;
      case 'Mountain': return <Mountain className={className} />;
      case 'Utensils': return <Utensils className={className} />;
      case 'Car': return <Car className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Music': return <Music className={className} />;
      case 'ShoppingBag': return <ShoppingBag className={className} />;
      default: return <Compass className={className} />;
    }
  };

  // Dynamic active section detection as user scrolls - perfectly synchronized with the section in view
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['experiences', 'stays', 'dining', 'services'];
      const triggerPoint = 200;

      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (isAtBottom) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      let currentSection = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(`section-${id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
            currentSection = id;
            break;
          }
        }
      }

      const firstEl = document.getElementById(`section-${sectionIds[0]}`);
      if (firstEl && firstEl.getBoundingClientRect().top > triggerPoint) {
        currentSection = sectionIds[0];
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll the active sticky tab into view when activeSection changes
  useEffect(() => {
    if (activeSection && tabRefs.current[activeSection]) {
      const activeBtn = tabRefs.current[activeSection];
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    }
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(`section-${id}`);
    if (el) {
      const headerOffset = 130;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      onNavigate({ type: 'directory', category: 'all', subcategory: heroSearch.trim() });
    } else {
      onNavigate({ type: 'directory', category: 'all' });
    }
  };

  // Handle Category click in the 10-category grid: Navigates directly to the category page with filters
  const handleCategoryClick = (category: OfficialCategory) => {
    onNavigate({ type: 'directory', officialCategory: category });
  };

  // Filtered listings based on selectedCategoryFilter
  return (
    <div className="space-y-16 sm:space-y-24 pb-28">
      
      {/* 1. HOMEPAGE HERO WITH SEARCH BAR */}
      <section className="relative h-[480px] sm:h-[530px] w-full overflow-hidden flex items-center justify-center">
        {/* Background Image with Cinematic Overlay */}
        <img
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=85"
          alt="Dahab Red Sea and Sinai Coast"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark Gradient Overlay for high-contrast legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#264653] via-[#264653]/65 to-[#264653]/45" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-white/15 backdrop-blur-md border border-white/20 text-xs font-mono-tag tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#ECCE83]" />
            Dahab 360 Verified Local Directory
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-heading leading-tight drop-shadow-xs">
            Discover Dahab <span className="text-[#ECCE83]">Like a Local</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-100 font-normal leading-relaxed">
            Discover verified dive centers, freediving academies, boutique beachfront stays, Bedouin safaris, and wellness spaces across South Sinai.
          </p>

          {/* Prominent Search Bar + Currency Converter */}
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <form 
              onSubmit={handleHeroSearchSubmit}
              className="flex-1 flex items-center bg-white/95 rounded-[8px] p-1.5 shadow-lg border border-white/30 backdrop-blur-md text-[#264653]"
            >
              <div className="pl-3 pr-2 text-slate-400">
                <Search className="w-5 h-5 text-[#2A9D8F]" />
              </div>
              <input
                type="text"
                placeholder="What do you want to discover? (e.g. Shams Dive, Paradise Hotel, Ali Baba)"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                className="flex-1 bg-transparent py-2 text-xs sm:text-sm text-[#264653] placeholder:text-slate-400 focus:outline-hidden"
              />
              <button
                type="submit"
                className="bg-[#2A9D8F] hover:bg-[#238276] text-white px-4 sm:px-5 py-2.5 rounded-[6px] font-bold text-xs sm:text-sm tracking-wide transition-colors cursor-pointer shrink-0 shadow-xs"
              >
                Search
              </button>
            </form>

            {/* Currency Converter next to Search */}
            <button
              type="button"
              onClick={onToggleCurrency}
              aria-label="Toggle currency between EGP and USD"
              className="bg-white/95 hover:bg-white text-[#264653] border border-white/40 shadow-lg px-3.5 py-3 rounded-[8px] text-xs font-mono-tag font-bold flex items-center justify-center gap-1.5 cursor-pointer shrink-0 transition-colors"
              title="Switch currency"
            >
              <span className={currency === 'EGP' ? 'text-[#2A9D8F] font-bold' : 'text-slate-400'}>EGP</span>
              <span className="text-slate-300">/</span>
              <span className={currency === 'USD' ? 'text-[#2A9D8F] font-bold' : 'text-slate-400'}>USD</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => onNavigate({ type: 'directory' })}
              className="bg-[#2A9D8F] hover:bg-[#238276] text-white px-5 py-2 rounded-[8px] text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md cursor-pointer"
            >
              Browse All Listings
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'planner' })}
              className="bg-white/90 hover:bg-white text-[#264653] border border-white px-5 py-2 rounded-[8px] text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md cursor-pointer"
            >
              Build Your Plan
            </button>
          </div>
        </div>
      </section>

      {/* 
        2. HOMEPAGE "EXPLORE BY CATEGORY" GRID:
        Clicking any category opens directly to the category directory page with filters!
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-[16px] border border-slate-200/90 p-4 sm:p-6 shadow-md">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
            <div>
              <div className="font-mono-tag text-[10px] sm:text-[11px] uppercase tracking-wider text-[#2A9D8F] font-bold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#2A9D8F]" />
                <span>Explore by Category</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-[#264653] font-heading tracking-tight">
                10 Official Dahab 360 Categories
              </h2>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => onNavigate({ type: 'directory' })}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#2A9D8F] hover:text-[#238276] transition-colors cursor-pointer"
              >
                <span>Full Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 
            Compact 2-column (mobile) / 5-column (desktop) visual grid 
            Clicking opens the category directory page directly with filters
          */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 sm:gap-3.5">
            {OFFICIAL_CATEGORIES.map((cat, idx) => {
              return (
                <div
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  role="button"
                  tabIndex={0}
                  className="rounded-[12px] p-3 sm:p-4 border border-slate-200/90 bg-white hover:bg-slate-50/90 shadow-2xs hover:border-[#2A9D8F] hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between text-left select-none relative"
                >
                  {/* Top Bar with Number & Outline Icon */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-[8px] flex items-center justify-center transition-colors bg-[#2A9D8F]/10 text-[#2A9D8F] group-hover:bg-[#2A9D8F] group-hover:text-white">
                      {renderCategoryIcon(cat.iconName, "w-4 h-4 sm:w-5 sm:h-5")}
                    </div>
                    <span className="text-[10px] font-mono-tag font-bold text-slate-300 group-hover:text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm tracking-tight text-[#264653] group-hover:text-[#2A9D8F] transition-colors line-clamp-1">
                      {cat.name}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 line-clamp-1 mt-0.5 leading-snug">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* EXCLUSIVE OFFERS & PROMO CODES BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div 
          onClick={() => onNavigate({ type: 'offers' })}
          className="bg-gradient-to-r from-[#264653] via-[#236b63] to-[#d45d40] rounded-[14px] p-4 sm:p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer hover:shadow-lg transition-all group"
        >
          <div className="flex items-center gap-3.5 sm:gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-[10px] bg-white/15 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/25 group-hover:scale-105 transition-transform">
              <Tag className="w-6 h-6 text-[#ECCE83]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 font-mono-tag text-[10px] uppercase font-bold tracking-wider bg-black/20 px-2 py-0.5 rounded-[4px] mb-1">
                <Sparkles className="w-3 h-3 text-[#ECCE83]" />
                <span>Limited-Time Promotions</span>
              </div>
              <h3 className="text-base sm:text-xl font-black font-heading tracking-tight text-[#F8EDD8]">
                Exclusive Partner Discounts Across Dahab
              </h3>
              <p className="text-xs sm:text-sm text-white/90">
                Save 10%–20% on boutique stays, guided diving, yacht rentals, and seafood dinners with direct promo codes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-[8px] bg-white text-[#264653] font-bold text-xs shadow-xs group-hover:bg-[#F8EDD8] transition-colors shrink-0">
            <span>Explore Deals</span>
            <ArrowRight className="w-4 h-4 text-[#E76F51] group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </section>

      {/* 
        3. DYNAMIC STICKY SECTION NAVIGATION WRAPPER
        Starts from: "Activities & Experiences"
        Remains visible until: "Essential Services & Emergency"
      */}
      <div className="relative space-y-24 sm:space-y-32 lg:space-y-40">
          
          {/* Sticky Section Bar with Auto-Scroll Tab Synchronization */}
          <div className="sticky top-16 z-30 bg-[#F8EDD8]/95 backdrop-blur-md border-y border-slate-200/90 py-2.5 px-4 shadow-xs">
            <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-1.5 sm:gap-3 overflow-x-auto hide-scrollbar scroll-smooth">
              {sectionTabs.map((tab) => {
                const isActive = activeSection === tab.id;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => (tabRefs.current[tab.id] = el)}
                    type="button"
                    onClick={() => scrollToSection(tab.id)}
                    className={`px-3.5 sm:px-4 py-2 rounded-[6px] text-xs font-mono-tag font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-[#2A9D8F] text-white shadow-xs scale-102'
                        : 'text-[#264653] bg-white/70 hover:bg-white hover:text-[#2A9D8F] border border-slate-200/80'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 1 — ACTIVITIES & EXPERIENCES */}
          <section id="section-experiences" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
            
            {/* Header Aligned to Left */}
            <div className="mb-6 sm:mb-8 text-left space-y-2">
              <div className="inline-block font-mono-tag text-xs uppercase tracking-wider text-[#2A9D8F] font-bold bg-[#2A9D8F]/10 px-2.5 py-1 rounded-[4px]">
                Adventures & Ocean
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#264653] tracking-tight font-heading">
                Activities & Experiences
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                Scuba diving at the Blue Hole, freediving depth academies, desert canyon safaris, and kite surfing across Dahab.
              </p>
            </div>

            {/* Horizontal Scroll Carousel */}
            <div className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory hide-scrollbar scroll-smooth">
              {MOCK_EXPERIENCES.map((exp) => (
                <div 
                  key={exp.id} 
                  className="w-[280px] sm:w-[320px] md:w-[350px] shrink-0 snap-start"
                >
                  <ListingCard
                    listing={exp}
                    currency={currency}
                    isFavorite={favorites.has(exp.id)}
                    onToggleFavorite={onToggleFavorite}
                    onSelectListing={onSelectListing}
                    onBookNow={onBookNow}
                    cardVariant="tall"
                  />
                </div>
              ))}
            </div>

            {/* Bottom "View More" Button */}
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => onNavigate({ type: 'directory', category: 'experience' })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] bg-white hover:bg-[#2A9D8F] text-[#264653] hover:text-white border border-slate-200/90 hover:border-[#2A9D8F] text-xs sm:text-sm font-bold font-mono-tag uppercase tracking-wider shadow-xs transition-all cursor-pointer group"
              >
                <span>View All Activities & Experiences</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>

          {/* SECTION 2 — PLACES TO STAY */}
          <section id="section-stays" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
            
            {/* Header Aligned to Left */}
            <div className="mb-6 sm:mb-8 text-left space-y-2">
              <div className="inline-block font-mono-tag text-xs uppercase tracking-wider text-[#2A9D8F] font-bold bg-[#2A9D8F]/10 px-2.5 py-1 rounded-[4px]">
                Coastal Accommodation
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#264653] tracking-tight font-heading">
                Places to Stay
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                Boutique hotels with infinity pools, beachfront dive resorts, and eco beach camps directly on the Sinai shoreline.
              </p>
            </div>

            {/* Horizontal Scroll Carousel */}
            <div className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory hide-scrollbar scroll-smooth">
              {MOCK_STAYS.map((stay) => (
                <div 
                  key={stay.id} 
                  className="w-[280px] sm:w-[320px] md:w-[350px] shrink-0 snap-start"
                >
                  <ListingCard
                    listing={stay}
                    currency={currency}
                    isFavorite={favorites.has(stay.id)}
                    onToggleFavorite={onToggleFavorite}
                    onSelectListing={onSelectListing}
                    onBookNow={onBookNow}
                    cardVariant="standard"
                  />
                </div>
              ))}
            </div>

            {/* Bottom "View More" Button */}
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => onNavigate({ type: 'directory', category: 'stay' })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] bg-white hover:bg-[#2A9D8F] text-[#264653] hover:text-white border border-slate-200/90 hover:border-[#2A9D8F] text-xs sm:text-sm font-bold font-mono-tag uppercase tracking-wider shadow-xs transition-all cursor-pointer group"
              >
                <span>View All Places to Stay</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>

          {/* SECTION 3 — RESTAURANTS & CAFÉS */}
          <section id="section-dining" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
            
            {/* Header Aligned to Left */}
            <div className="mb-6 sm:mb-8 text-left space-y-2">
              <div className="inline-block font-mono-tag text-xs uppercase tracking-wider text-[#2A9D8F] font-bold bg-[#2A9D8F]/10 px-2.5 py-1 rounded-[4px]">
                Food & Drinks
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#264653] tracking-tight font-heading">
                Restaurants & Cafés
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                Fresh Red Sea catch on the charcoal grill, relaxed waterfront cafes, and authentic Bedouin dining in Dahab.
              </p>
            </div>

            {/* Horizontal Scroll Carousel - hidePrice enabled for Restaurants & Cafes only */}
            <div className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory hide-scrollbar scroll-smooth">
              {MOCK_DINING.map((dine) => (
                <div 
                  key={dine.id} 
                  className="w-[280px] sm:w-[320px] md:w-[350px] shrink-0 snap-start"
                >
                  <ListingCard
                    listing={dine}
                    currency={currency}
                    isFavorite={favorites.has(dine.id)}
                    onToggleFavorite={onToggleFavorite}
                    onSelectListing={onSelectListing}
                    onBookNow={onBookNow}
                    cardVariant="compact"
                    hidePrice={true}
                  />
                </div>
              ))}
            </div>

            {/* Bottom "View More" Button */}
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => onNavigate({ type: 'directory', category: 'dining' })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] bg-white hover:bg-[#2A9D8F] text-[#264653] hover:text-white border border-slate-200/90 hover:border-[#2A9D8F] text-xs sm:text-sm font-bold font-mono-tag uppercase tracking-wider shadow-xs transition-all cursor-pointer group"
              >
                <span>View All Restaurants & Cafés</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>

          {/* SECTION 4 — ESSENTIAL SERVICES & EMERGENCY */}
          <section id="section-services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
            <div className="bg-white rounded-[16px] border border-slate-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 border-b border-slate-100 pb-4 gap-2">
                <div className="text-left space-y-1">
                  <div className="font-mono-tag text-xs uppercase tracking-wider text-[#2A9D8F] font-bold">
                    Essential Directory
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#264653] font-heading">
                    Essential Services & Emergency
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Reliable local clinics, 24/7 pharmacies, hyperbaric decompression chambers, and taxi connections.
                  </p>
                </div>
                <span className="text-xs text-slate-400 font-mono-tag self-start sm:self-auto">
                  Verified Dahab Contacts
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {MOCK_LOCAL_SERVICES.map((service) => (
                  <div
                    key={service.id}
                    className="p-4 rounded-[10px] bg-[#F8EDD8]/30 border border-slate-200/70 hover:border-[#2A9D8F] transition-all flex flex-col justify-between gap-3 text-left"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono-tag text-[10px] font-bold text-[#2A9D8F] bg-white px-2 py-0.5 rounded-[4px] border border-slate-200">
                          {service.category}
                        </span>
                        <span className="text-[10px] text-slate-500">{service.area}</span>
                      </div>
                      <div className="font-bold text-xs sm:text-sm text-[#264653] leading-snug pt-1">
                        {service.name}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono-tag flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {service.hours}
                      </div>
                      {service.badge && (
                        <div className="text-[10px] text-[#E76F51] font-semibold font-mono-tag">
                          {service.badge}
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center gap-2">
                      <a
                        href={`tel:${service.phone}`}
                        className="flex-1 flex items-center justify-center gap-1 bg-[#2A9D8F] hover:bg-[#238276] text-white py-1.5 rounded-[6px] text-xs font-semibold shadow-xs transition-colors"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Call</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>

      {/* 5. PLANNER PROMOTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-[#264653] text-[#F8EDD8] rounded-[16px] p-6 sm:p-8 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          {/* Background Gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#2A9D8F]/20 to-transparent pointer-events-none" />

          <div className="space-y-2 text-center sm:text-left relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono-tag text-[#ECCE83] font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#ECCE83]" />
              Tailored Concierge Coordination
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight">
              Build Your Dahab Plan
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              Curate your accommodation and experiences in 3 simple steps. Direct WhatsApp coordination with verified local Dahab partners.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate({ type: 'planner' })}
              className="bg-[#E76F51] hover:bg-[#d85e40] active:bg-[#c65134] text-white px-6 py-3 rounded-[8px] font-bold text-sm tracking-wide shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Start Your Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. DAHAB MARKETPLACE TEASER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div className="bg-gradient-to-r from-[#2A9D8F] to-[#264653] text-white rounded-[16px] p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm border border-[#2A9D8F]/30">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-[4px] bg-white/20 text-white text-[10px] font-mono-tag font-bold uppercase tracking-wider">
                Good People Great Finds
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-heading tracking-tight">
              Dahab Marketplace
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
              Buy and sell water gear, diving equipment, handmade Bedouin silver, and local Sinai delicacies directly from trusted locals.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate({ type: 'marketplace' })}
            className="shrink-0 px-5 py-2.5 rounded-[8px] bg-white hover:bg-slate-50 text-[#264653] font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>Explore Marketplace</span>
            <ArrowRight className="w-4 h-4 text-[#2A9D8F]" />
          </button>
        </div>
      </section>

      {/* 7. DAHAB EDITORIAL GUIDE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-4">
        <div className="bg-white text-[#264653] rounded-[16px] p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xs border border-slate-200">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-[4px] bg-[#ECCE83]/30 text-[#264653] text-[10px] font-mono-tag font-bold uppercase tracking-wider">
                Official Dahab Guide
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-heading tracking-tight">
              Local Tips. Real Experiences.
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed">
              Read curated editorial guides on the best snorkeling spots, DIY free places, local culture etiquette, and 3-day travel itineraries.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate({ type: 'guide' })}
            className="shrink-0 px-5 py-2.5 rounded-[8px] bg-[#2A9D8F] hover:bg-[#238276] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Read Dahab Guide</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
