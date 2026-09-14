import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Heart, 
  Star, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  X, 
  ChevronDown, 
  Check, 
  MessageCircle, 
  Menu, 
  RotateCcw, 
  Tag, 
  Share2, 
  ChevronRight, 
  ExternalLink, 
  ShoppingCart,
  Plus,
  Minus,
  CheckCircle2,
  Compass,
  BookOpen,
  ShoppingBag,
  Waves,
  Mountain,
  Leaf,
  MoreHorizontal,
  Home
} from 'lucide-react';
import { Currency, MarketplaceCategory, MarketplaceProduct, ViewRoute, CartItem } from '../types';
import { formatPrice } from '../data/mockData';
import { 
  MARKETPLACE_CATEGORIES, 
  FEATURED_MARKETPLACE_PRODUCTS, 
  ALL_MARKETPLACE_PRODUCTS 
} from '../data/marketplaceData';

interface MarketplacePageProps {
  currency: Currency;
  onToggleCurrency: () => void;
  language: 'EN' | 'AR';
  onToggleLanguage: () => void;
  onNavigate: (route: ViewRoute) => void;
  onAddToCart?: (product: MarketplaceProduct, quantity?: number) => void;
  cart?: CartItem[];
  cartItemCount?: number;
  onOpenCart?: () => void;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({
  currency,
  onToggleCurrency,
  language,
  onToggleLanguage,
  onNavigate,
  onAddToCart,
  cart = [],
  cartItemCount = 0,
  onOpenCart
}) => {
  // State
  const [selectedCategory, setSelectedCategory] = useState<MarketplaceCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [conditionFilter, setConditionFilter] = useState<'All' | 'New' | 'Used'>('All');
  const [priceFilter, setPriceFilter] = useState<'All' | 'under1000' | '1000to3000' | 'above3000'>('All');
  const [locationFilter, setLocationFilter] = useState<'All' | 'Dahab' | 'Mashraba' | 'Laguna' | 'Lighthouse' | 'Assalah'>('All');
  const [sortBy, setSortBy] = useState<'recommended' | 'priceAsc' | 'priceDesc' | 'rating'>('recommended');
  
  // Favorites local state
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['feat-1', 'prod-1']));
  
  // UI states
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct | null>(null);
  const [isTopMenuOpen, setIsTopMenuOpen] = useState(false);

  const renderCategoryIcon = (catId: MarketplaceCategory) => {
    switch (catId) {
      case 'All': return <Sparkles className="w-3.5 h-3.5" />;
      case 'Souvenirs & Handmade': return <ShoppingBag className="w-3.5 h-3.5" />;
      case 'Diving & Water Gear': return <Waves className="w-3.5 h-3.5" />;
      case 'Sports & Outdoor': return <Mountain className="w-3.5 h-3.5" />;
      case 'Local Products': return <Leaf className="w-3.5 h-3.5" />;
      default: return <MoreHorizontal className="w-3.5 h-3.5" />;
    }
  };

  // WhatsApp Support Number
  const WHATSAPP_PHONE = '201004892211';

  // Handler for Favorite toggle
  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Mode 4: Contact Seller directly on their individual WhatsApp with product details
  const getWhatsAppBuyUrl = (product: MarketplaceProduct) => {
    const rawPhone = product.seller.phone || WHATSAPP_PHONE;
    const phoneClean = rawPhone.replace(/[^0-9]/g, '');
    const text = `Hello ${product.seller.name}! I am interested in buying your "${product.title}" (${formatPrice(product.price, 'EGP')}) listed on Dahab 360 Marketplace. Is it still available in Dahab?`;
    return `https://wa.me/${phoneClean}?text=${encodeURIComponent(text)}`;
  };

  const sellOnMarketplaceUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Hello Dahab 360, I want to submit an item to sell on the marketplace")}`;
  const submitListingUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("I want to list an item on Dahab 360 Marketplace")}`;

  // Filtered Featured Products
  const featuredProducts = useMemo(() => {
    return FEATURED_MARKETPLACE_PRODUCTS;
  }, []);

  // Filtered All Products
  const filteredProducts = useMemo(() => {
    return ALL_MARKETPLACE_PRODUCTS.filter(item => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Condition filter
      if (conditionFilter !== 'All' && item.condition !== conditionFilter) {
        return false;
      }

      // Location filter
      if (locationFilter !== 'All' && !item.location.toLowerCase().includes(locationFilter.toLowerCase())) {
        return false;
      }

      // Price filter
      if (priceFilter === 'under1000' && item.price >= 1000) return false;
      if (priceFilter === '1000to3000' && (item.price < 1000 || item.price > 3000)) return false;
      if (priceFilter === 'above3000' && item.price <= 3000) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchSeller = item.seller.name.toLowerCase().includes(q);
        const matchLoc = item.location.toLowerCase().includes(q);
        const matchDesc = item.description?.toLowerCase().includes(q) || false;
        if (!matchTitle && !matchSeller && !matchLoc && !matchDesc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      if (sortBy === 'rating') return b.seller.rating - a.seller.rating;
      return 0; // recommended
    });
  }, [selectedCategory, conditionFilter, locationFilter, priceFilter, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setConditionFilter('All');
    setLocationFilter('All');
    setPriceFilter('All');
    setSearchQuery('');
    setSortBy('recommended');
  };

  const hasActiveFilters = 
    selectedCategory !== 'All' || 
    conditionFilter !== 'All' || 
    locationFilter !== 'All' || 
    priceFilter !== 'All' || 
    searchQuery.trim() !== '';

  return (
    <div className="min-h-screen bg-[#F8EDD8] text-[#264653] pb-24 md:pb-16">

      {/* 1. HEADER & TOP BAR */}
      <header className="sticky top-0 z-30 bg-[#F8EDD8]/95 backdrop-blur-md border-b border-[#264653]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          
          {/* Dahab 360 Logo */}
          <div 
            onClick={() => onNavigate({ type: 'home' })}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-9 h-9 rounded-[8px] bg-gradient-to-tr from-[#2A9D8F] to-[#E76F51] flex items-center justify-center font-bold text-xs text-white shadow-xs">
              360
            </div>
            <div>
              <div className="font-extrabold text-base sm:text-lg tracking-tight text-[#264653] font-heading leading-tight">
                DAHAB <span className="text-[#2A9D8F]">360</span>
              </div>
              <div className="font-mono-tag text-[9px] uppercase tracking-wider text-[#264653]/60 -mt-0.5">
                Marketplace
              </div>
            </div>
          </div>

          {/* Quick Categories Desktop */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-[#264653]/85">
            <button
              type="button"
              onClick={() => onNavigate({ type: 'home' })}
              className="px-2.5 py-1.5 rounded-[6px] hover:text-[#2A9D8F] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'directory' })}
              className="px-2.5 py-1.5 rounded-[6px] hover:text-[#2A9D8F] transition-colors cursor-pointer"
            >
              Explore
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'marketplace' })}
              className="px-2.5 py-1.5 rounded-[6px] text-[#2A9D8F] bg-white/60 font-bold transition-colors cursor-pointer"
            >
              Marketplace
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'guide' })}
              className="px-2.5 py-1.5 rounded-[6px] hover:text-[#2A9D8F] transition-colors cursor-pointer"
            >
              Guide
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'planner' })}
              className="px-2.5 py-1.5 rounded-[6px] hover:text-[#2A9D8F] transition-colors cursor-pointer"
            >
              Plan
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'about' })}
              className="px-2.5 py-1.5 rounded-[6px] hover:text-[#2A9D8F] transition-colors cursor-pointer"
            >
              About
            </button>
          </nav>

          {/* Right Controls: Sell Item & Hamburger menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sell on Marketplace Direct Action */}
            <a
              href={sellOnMarketplaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Sell on Dahab Marketplace"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#E76F51] hover:bg-[#d85e40] text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sell an Item</span>
            </a>

            {/* Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsTopMenuOpen(!isTopMenuOpen)}
              aria-label="Open menu"
              className="w-9 h-9 rounded-[8px] bg-white border border-slate-200 text-[#264653] flex items-center justify-center hover:border-[#2A9D8F] transition-colors cursor-pointer shadow-xs"
            >
              {isTopMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Dropdown Menu Modal */}
        {isTopMenuOpen && (
          <div className="bg-white border-b border-slate-200 px-4 py-5 shadow-lg animate-in slide-in-from-top-2 duration-150">
            <div className="max-w-7xl mx-auto space-y-4">
              <div className="text-[11px] font-mono-tag text-slate-400 uppercase tracking-wider font-bold">
                Main Menu
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    onNavigate({ type: 'home' });
                    setIsTopMenuOpen(false);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-[8px] border border-slate-100 hover:border-[#2A9D8F] hover:bg-[#F8EDD8]/30 text-left cursor-pointer transition-colors"
                >
                  <Home className="w-4 h-4 text-[#2A9D8F]" />
                  <div>
                    <div className="text-xs font-bold text-[#264653]">Home</div>
                    <div className="text-[10px] text-slate-400">Main portal</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate({ type: 'directory' });
                    setIsTopMenuOpen(false);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-[8px] border border-slate-100 hover:border-[#2A9D8F] hover:bg-[#F8EDD8]/30 text-left cursor-pointer transition-colors"
                >
                  <Compass className="w-4 h-4 text-[#2A9D8F]" />
                  <div>
                    <div className="text-xs font-bold text-[#264653]">Explore</div>
                    <div className="text-[10px] text-slate-400">Stays & food</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate({ type: 'marketplace' });
                    setIsTopMenuOpen(false);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-[8px] border border-[#2A9D8F] bg-[#2A9D8F]/10 text-left cursor-pointer transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-[#2A9D8F]" />
                  <div>
                    <div className="text-xs font-bold text-[#264653]">Marketplace</div>
                    <div className="text-[10px] text-[#2A9D8F] font-semibold">Active page</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate({ type: 'guide' });
                    setIsTopMenuOpen(false);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-[8px] border border-slate-100 hover:border-[#2A9D8F] hover:bg-[#F8EDD8]/30 text-left cursor-pointer transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-[#2A9D8F]" />
                  <div>
                    <div className="text-xs font-bold text-[#264653]">Guide</div>
                    <div className="text-[10px] text-slate-400">Tips & spots</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate({ type: 'planner' });
                    setIsTopMenuOpen(false);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-[8px] border border-slate-100 hover:border-[#2A9D8F] hover:bg-[#F8EDD8]/30 text-left cursor-pointer transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#2A9D8F]" />
                  <div>
                    <div className="text-xs font-bold text-[#264653]">Plan</div>
                    <div className="text-[10px] text-slate-400">Custom trip</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate({ type: 'about' });
                    setIsTopMenuOpen(false);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-[8px] border border-slate-100 hover:border-[#2A9D8F] hover:bg-[#F8EDD8]/30 text-left cursor-pointer transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-[#2A9D8F]" />
                  <div>
                    <div className="text-xs font-bold text-[#264653]">About</div>
                    <div className="text-[10px] text-slate-400">Brand & trust</div>
                  </div>
                </button>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Sell on Dahab Marketplace?</span>
                <a
                  href={sellOnMarketplaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2A9D8F] hover:bg-[#238276] text-white rounded-[6px] font-bold text-xs"
                >
                  <span>Sell on Dahab 360</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 space-y-6">

        {/* HERO CARD: Authentic Dahab souk/crafts background photo with dark overlay */}
        <section className="relative rounded-[20px] overflow-hidden shadow-lg border border-slate-200">
          {/* Background Image with Dark Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1800&q=80" 
              alt="Dahab Souk & Crafts"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#264653]/95 via-[#264653]/85 to-[#264653]/70 backdrop-blur-[1px]" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-12 text-white max-w-2xl space-y-4">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E76F51] text-white text-[11px] font-mono-tag font-bold tracking-wider uppercase shadow-xs">
              <Sparkles className="w-3 h-3" />
              <span>Good People Great Finds</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white leading-tight">
              Dahab Marketplace
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              Discover local products, gear & unique finds in Dahab. Buy directly from trusted local artisans, divers, and community members.
            </p>

            {/* Value tags row: [Local] [Reviewed] [Support Local] */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-white/15 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                <Leaf className="w-3.5 h-3.5 text-[#ECCE83]" /> Local
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-white/15 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ECCE83]" /> Reviewed
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-white/15 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                <Heart className="w-3.5 h-3.5 text-[#ECCE83]" /> Support Local
              </span>
            </div>

            {/* Top CTA Button: "Sell on Dahab 360 →" */}
            <div className="pt-2">
              <a
                href={sellOnMarketplaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-transform hover:scale-102 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Sell on Dahab 360 →</span>
              </a>
            </div>

          </div>
        </section>

        {/* 2. SEARCH & DYNAMIC FILTER BAR */}
        <section className="bg-white rounded-[16px] border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
          
          {/* Search Input: "What are you looking for?" */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="What are you looking for? (e.g. Diving mask, silver ring, wetsuit...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-[10px] focus:outline-hidden focus:border-[#2A9D8F] focus:bg-white text-[#264653] placeholder:text-slate-400 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Scrollable Pills */}
          <div className="space-y-1">
            <div className="text-[11px] font-mono-tag font-bold text-slate-400 uppercase tracking-wider">
              Browse Categories
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 hide-scrollbar">
              {MARKETPLACE_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                      isSelected
                        ? 'bg-[#2A9D8F] text-white shadow-xs font-bold scale-102'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <span>{renderCategoryIcon(cat.id)}</span>
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Filters Row:
              [Filters] [Condition ▾ (All / New / Used)] [Price ▾] [Location ▾ (Dahab / Mashraba / Laguna)] [⇅ Sort by] */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-100 text-xs">
            
            <div className="flex flex-wrap items-center gap-2">
              {/* Reset/Filter indicator icon */}
              <div className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 rounded-[6px] text-slate-600 font-mono-tag font-semibold">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#2A9D8F]" />
                <span>Filters</span>
              </div>

              {/* Condition Dropdown */}
              <div className="relative">
                <select
                  value={conditionFilter}
                  onChange={(e) => setConditionFilter(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-[6px] pl-2.5 pr-7 py-1.5 font-semibold text-[#264653] focus:outline-hidden cursor-pointer appearance-none"
                >
                  <option value="All">Condition: All</option>
                  <option value="New">Condition: New</option>
                  <option value="Used">Condition: Used</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Price Dropdown */}
              <div className="relative">
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-[6px] pl-2.5 pr-7 py-1.5 font-semibold text-[#264653] focus:outline-hidden cursor-pointer appearance-none"
                >
                  <option value="All">Price: All</option>
                  <option value="under1000">&lt; 1,000 EGP</option>
                  <option value="1000to3000">1,000 – 3,000 EGP</option>
                  <option value="above3000">&gt; 3,000 EGP</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Location Dropdown */}
              <div className="relative">
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-[6px] pl-2.5 pr-7 py-1.5 font-semibold text-[#264653] focus:outline-hidden cursor-pointer appearance-none"
                >
                  <option value="All">Location: All</option>
                  <option value="Dahab">Dahab Central</option>
                  <option value="Mashraba">Mashraba</option>
                  <option value="Laguna">Laguna</option>
                  <option value="Lighthouse">Lighthouse</option>
                  <option value="Assalah">Assalah</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Sort by Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-mono-tag">⇅ Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-[6px] px-2.5 py-1.5 font-semibold text-[#264653] focus:outline-hidden cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="rating">Top Rated Seller</option>
              </select>
            </div>

          </div>

          {/* Active Filters Clear Row */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500">
                Filtering {filteredProducts.length} items
              </span>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-[#E76F51] hover:underline font-bold cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}

        </section>

        {/* 3. SECTION 1: FEATURED LISTINGS (Horizontal Carousel) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-[#264653] font-heading tracking-tight">
                Featured Listings
              </h2>
              <span className="w-2 h-2 rounded-full bg-[#E76F51]" />
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setConditionFilter('All');
                setLocationFilter('All');
              }}
              className="text-xs font-bold text-[#2A9D8F] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>See All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Horizontal Scroll Carousel */}
          <div className="flex items-stretch gap-4 overflow-x-auto pb-3 pt-1 hide-scrollbar snap-x scroll-smooth">
            {featuredProducts.map((item) => {
              const isFav = favorites.has(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedProduct(item)}
                  className="w-[280px] sm:w-[320px] shrink-0 snap-start bg-white rounded-[16px] border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
                >
                  {/* Image Container with Badges */}
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />

                    {/* Top-left Orange Pill "Featured" */}
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#E76F51] text-white text-[10px] font-mono-tag font-bold tracking-wider uppercase shadow-xs">
                      Featured
                    </span>

                    {/* Top-right Heart / Favorite Icon */}
                    <button
                      type="button"
                      onClick={(e) => toggleFavorite(item.id, e)}
                      aria-label="Save to favorites"
                      className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-xs ${
                        isFav ? 'bg-white text-rose-500' : 'bg-black/30 backdrop-blur-xs text-white hover:bg-white hover:text-rose-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>

                    {/* Condition Badge in image */}
                    <div className="absolute bottom-2.5 left-2.5">
                      <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-mono-tag font-bold uppercase ${
                        item.condition === 'New' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                      }`}>
                        {item.condition}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-bold text-sm text-[#264653] line-clamp-1 group-hover:text-[#2A9D8F] transition-colors">
                          {item.title}
                        </h3>
                      </div>

                      {/* Price */}
                      <div className="text-base font-black text-[#264653] font-mono-tag mt-1">
                        {formatPrice(item.price, currency)}
                      </div>

                      {/* Seller & Rating */}
                      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                        <span className="font-medium truncate max-w-[150px]">
                          {item.seller.name}
                        </span>
                        <span className="inline-flex items-center gap-1 font-mono-tag font-bold text-[#E76F51]">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{item.seller.rating.toFixed(1)}</span>
                        </span>
                      </div>
                    </div>

                    {/* Action Button: Buy Now / Contact Seller directly */}
                    <div className="pt-2">
                      <a
                        href={getWhatsAppBuyUrl(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title={`Buy now / Contact ${item.seller.name} on WhatsApp`}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-[8px] bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs"
                      >
                        <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                        <span>Buy Now • Contact Seller</span>
                      </a>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. SECTION 2: ALL LISTINGS (2-Column Responsive Grid) */}
        <section className="space-y-4">
          
          {/* Header with counter */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#264653] font-heading tracking-tight">
              All Listings
            </h2>
            <div className="text-xs font-mono-tag text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200">
              {filteredProducts.length} items
            </div>
          </div>

          {/* 2-Column Responsive Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {filteredProducts.map((product) => {
                const isFav = favorites.has(product.id);
                return (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="bg-white rounded-[14px] border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
                  >
                    {/* Top Image */}
                    <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />

                      {/* Condition Badge */}
                      <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-[4px] text-[10px] font-mono-tag font-bold uppercase shadow-xs ${
                        product.condition === 'New' 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-amber-500 text-white'
                      }`}>
                        {product.condition}
                      </span>

                      {/* Heart Icon */}
                      <button
                        type="button"
                        onClick={(e) => toggleFavorite(product.id, e)}
                        aria-label="Save to favorites"
                        className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                          isFav ? 'bg-white text-rose-500' : 'bg-black/30 backdrop-blur-xs text-white hover:bg-white hover:text-rose-500'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                      </button>

                      {/* Location Badge */}
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 backdrop-blur-xs text-white px-2 py-0.5 rounded-[4px] text-[10px] font-mono-tag">
                        <MapPin className="w-2.5 h-2.5 text-[#ECCE83]" />
                        <span className="truncate max-w-[85px]">{product.location}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <h3 className="font-bold text-xs sm:text-sm text-[#264653] line-clamp-2 group-hover:text-[#2A9D8F] transition-colors leading-snug">
                          {product.title}
                        </h3>

                        {/* Price */}
                        <div className="text-sm sm:text-base font-black text-[#264653] font-mono-tag mt-1">
                          {formatPrice(product.price, currency)}
                        </div>

                        {/* Seller & Rating */}
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                          <span className="truncate max-w-[90px] sm:max-w-[120px] font-medium">
                            {product.seller.name}
                          </span>
                          <span className="inline-flex items-center gap-0.5 font-mono-tag font-bold text-[#E76F51]">
                            <Star className="w-2.5 h-2.5 fill-current" />
                            <span>{product.seller.rating.toFixed(1)}</span>
                          </span>
                        </div>
                      </div>

                      {/* Action Button: Buy Now / Contact Seller directly */}
                      <div className="pt-1.5">
                        <a
                          href={getWhatsAppBuyUrl(product)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title={`Buy now / Contact ${product.seller.name} on WhatsApp`}
                          className="w-full flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-[8px] bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
                          <span>Buy Now • Contact Seller</span>
                        </a>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-10 text-center bg-white rounded-[16px] border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#2A9D8F]/10 text-[#2A9D8F] flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#264653]">No marketplace listings found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching for different terms or reset your filters to see all available products in Dahab.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-2 bg-[#2A9D8F] hover:bg-[#238276] text-white rounded-[8px] text-xs font-bold cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </section>

        {/* 5. BOTTOM CALLOUT BANNER:
            - Title: "Have something to sell?"
            - Subtext: "List it on Dahab 360. We review all listings to keep our marketplace safe and trusted."
            - Button: "Submit a Listing →"
            - Trust points footer: [All listings are reviewed by Dahab 360] [Support local businesses & individuals] [Find unique items from Dahab] */}
        <section className="bg-gradient-to-br from-[#264653] to-[#1d353f] rounded-[20px] p-6 sm:p-8 text-white shadow-lg space-y-6 relative overflow-hidden border border-[#2A9D8F]/30">
          
          {/* Subtle background decoration */}
          <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-[#2A9D8F]/10 blur-2xl pointer-events-none" />

          <div className="max-w-2xl space-y-2">
            <span className="px-2.5 py-0.5 rounded-[4px] bg-[#2A9D8F]/20 text-[#2A9D8F] text-[11px] font-mono-tag font-bold uppercase tracking-wider">
              Local Community Exchange
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-heading tracking-tight">
              Have something to sell?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              List it on Dahab 360. We review all listings to keep our marketplace safe and trusted for both buyers and sellers in South Sinai.
            </p>
          </div>

          <div>
            <a
              href={submitListingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E76F51] hover:bg-[#d55e40] text-white rounded-[10px] text-xs sm:text-sm font-bold shadow-md transition-transform hover:scale-102 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Submit a Listing →</span>
            </a>
          </div>

          {/* Trust points footer */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2A9D8F] shrink-0" />
              <span>All listings are reviewed by Dahab 360</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#E76F51] shrink-0" />
              <span>Support local businesses & individuals</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ECCE83] shrink-0" />
              <span>Find unique items from Dahab</span>
            </div>
          </div>

        </section>

      </div>

      {/* QUICK PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="bg-white rounded-[20px] max-w-lg w-full overflow-hidden shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative h-64 w-full bg-slate-100">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className={`px-2.5 py-0.5 rounded-[4px] text-xs font-mono-tag font-bold uppercase text-white ${
                  selectedProduct.condition === 'New' ? 'bg-emerald-600' : 'bg-amber-600'
                }`}>
                  {selectedProduct.condition}
                </span>
                {selectedProduct.isFeatured && (
                  <span className="px-2.5 py-0.5 rounded-[4px] text-xs font-mono-tag font-bold uppercase bg-[#E76F51] text-white">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 pt-2 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-mono-tag font-bold text-[#2A9D8F] uppercase tracking-wider">
                    {selectedProduct.category}
                  </span>
                  <h3 className="text-xl font-black text-[#264653] font-heading mt-0.5">
                    {selectedProduct.title}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-[#264653] font-mono-tag">
                    {formatPrice(selectedProduct.price, currency)}
                  </div>
                </div>
              </div>

              {/* Seller details */}
              <div className="flex items-center justify-between p-3 rounded-[10px] bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#264653] text-[#F8EDD8] flex items-center justify-center font-bold text-xs">
                    {selectedProduct.seller.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#264653]">
                      {selectedProduct.seller.name}
                    </div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#2A9D8F]" />
                      <span>{selectedProduct.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#E76F51] font-mono-tag">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{selectedProduct.seller.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Description */}
              {selectedProduct.description && (
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-700">About this item:</span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>
              )}

              {/* Verified Dahab 360 note */}
              <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-[#2A9D8F]/10 p-2.5 rounded-[8px]">
                <ShieldCheck className="w-4 h-4 text-[#2A9D8F] shrink-0" />
                <span>Reviewed listing with direct local seller contact via WhatsApp.</span>
              </div>

              {/* Direct Purchase / Contact Seller via WhatsApp */}
              <div className="pt-2 space-y-2.5">
                <a
                  href={getWhatsAppBuyUrl(selectedProduct)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-[10px] bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-md transition-colors"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Buy Now • Contact Seller ({selectedProduct.seller.name})</span>
                </a>

                <p className="text-[11px] text-center text-slate-500 font-mono-tag">
                  Direct connection to seller on WhatsApp with pre-filled item & price details. No cart, no middleman fees.
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
