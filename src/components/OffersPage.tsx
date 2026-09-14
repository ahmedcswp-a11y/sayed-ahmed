import React, { useState, useMemo } from 'react';
import { 
  Tag, 
  Sparkles, 
  MessageCircle, 
  Copy, 
  Check, 
  Clock, 
  MapPin, 
  Star, 
  Gift, 
  ShieldCheck, 
  ChevronRight, 
  ExternalLink,
  ArrowRight,
  Filter,
  CheckCircle2,
  Percent
} from 'lucide-react';
import { Listing, Currency, ViewRoute } from '../types';
import { ALL_MOCK_LISTINGS, formatPrice } from '../data/mockData';
import { CardImageCarousel } from './CardImageCarousel';

interface OffersPageProps {
  currency: Currency;
  onToggleCurrency: () => void;
  onSelectListing: (listing: Listing) => void;
  onBookNow: (listing: Listing) => void;
  onNavigate: (route: ViewRoute) => void;
}

type OfferCategory = 'All' | 'Stays' | 'Diving' | 'Safaris' | 'Dining' | 'Wellness' | 'Transfers';

export const OffersPage: React.FC<OffersPageProps> = ({
  currency,
  onToggleCurrency,
  onSelectListing,
  onBookNow,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<OfferCategory>('All');
  const [copiedCodes, setCopiedCodes] = useState<Record<string, boolean>>({});

  // Filter listings that have explicit deals, promo codes, or deal badges
  const dealListings = useMemo(() => {
    return ALL_MOCK_LISTINGS.filter(l => 
      Boolean(l.promoCode) || 
      Boolean(l.dealDiscount) || 
      l.buttonType === 'get_deal' ||
      (l.badge && (l.badge.includes('OFF') || l.badge.includes('Free') || l.badge.includes('Upgrade')))
    );
  }, []);

  // Filter by category tab
  const filteredListings = useMemo(() => {
    if (selectedCategory === 'All') return dealListings;

    return dealListings.filter(l => {
      const cat = (l.officialCategory || l.category || '').toLowerCase();
      const type = (l.type || '').toLowerCase();

      switch (selectedCategory) {
        case 'Stays':
          return type === 'stay' || cat.includes('hotel') || cat.includes('camp') || cat.includes('accommodation');
        case 'Diving':
          return cat.includes('dive') || cat.includes('scuba') || cat.includes('freediv') || cat.includes('kite');
        case 'Safaris':
          return cat.includes('safari') || cat.includes('canyon') || cat.includes('yacht') || cat.includes('boat');
        case 'Dining':
          return type === 'dining' || cat.includes('restaurant') || cat.includes('cafe') || cat.includes('seafood');
        case 'Wellness':
          return cat.includes('spa') || cat.includes('wellness') || cat.includes('massage') || cat.includes('beauty');
        case 'Transfers':
          return cat.includes('transfer') || cat.includes('airport') || cat.includes('taxi');
        default:
          return true;
      }
    });
  }, [dealListings, selectedCategory]);

  const handleCopyCode = (listingId: string, code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCodes(prev => ({ ...prev, [listingId]: true }));
    setTimeout(() => {
      setCopiedCodes(prev => ({ ...prev, [listingId]: false }));
    }, 2500);
  };

  // Mode 2 WhatsApp polymorphic routing: Injects promo code and routes directly to the provider's WhatsApp
  const handleGetDealWhatsApp = (listing: Listing, e: React.MouseEvent) => {
    e.stopPropagation();
    const phoneClean = (listing.whatsapp || listing.phone || '201004892211').replace(/[^0-9]/g, '');
    const promo = listing.promoCode || 'DAHAB360-DEAL';
    const discountText = listing.dealDiscount || listing.badge || 'Special Discount';
    const text = `Hello ${listing.name}! I found your offer on Dahab 360 with promo code [${promo}] (${discountText}). I would like to claim this deal for my upcoming booking.`;
    const url = `https://wa.me/${phoneClean}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const categories: { id: OfferCategory; label: string; count: number }[] = [
    { id: 'All', label: 'All Deals', count: dealListings.length },
    { 
      id: 'Stays', 
      label: 'Stays & Camps', 
      count: dealListings.filter(l => l.type === 'stay' || l.officialCategory === 'Accommodation').length 
    },
    { 
      id: 'Diving', 
      label: 'Diving & Watersports', 
      count: dealListings.filter(l => (l.officialCategory || '').includes('Dive') || (l.officialCategory || '').includes('Watersports')).length 
    },
    { 
      id: 'Safaris', 
      label: 'Safaris & Boats', 
      count: dealListings.filter(l => (l.officialCategory || '').includes('Safari') || (l.category || '').includes('Boat')).length 
    },
    { 
      id: 'Dining', 
      label: 'Food & Cafes', 
      count: dealListings.filter(l => l.type === 'dining' || l.officialCategory === 'Restaurants & Cafes').length 
    },
    { 
      id: 'Wellness', 
      label: 'Spa & Wellness', 
      count: dealListings.filter(l => (l.officialCategory || '').includes('Beauty') || (l.category || '').includes('Spa')).length 
    },
    { 
      id: 'Transfers', 
      label: 'Transfers', 
      count: dealListings.filter(l => l.officialCategory === 'Transfers').length 
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8EDD8] pb-24 text-[#264653]">
      
      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-[#264653] to-[#1e3742] text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#264653]/20 shadow-xs relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#E76F51]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#2A9D8F]/15 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left relative z-10">
          <div className="inline-flex items-center gap-1.5 font-mono-tag text-xs font-bold uppercase text-[#ECCE83] bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-[#E76F51]" />
            <span>Exclusive Partner Discounts & Seasonal Deals</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-[#F8EDD8]">
                Dahab Special Offers
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Save on certified diving packages, beachfront boutique stays, desert canyon excursions, and local dining with verified single-click promo codes.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-center sm:self-auto">
              <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-[8px] px-3.5 py-2 text-xs font-mono-tag flex items-center gap-2.5">
                <Percent className="w-4 h-4 text-[#E76F51]" />
                <span className="text-slate-200">Zero Commission • Direct WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY TABS BAR */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-[12px] p-2 sm:p-2.5 border border-slate-200 shadow-md flex items-center gap-1.5 overflow-x-auto hide-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-[8px] text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isSelected 
                    ? 'bg-[#264653] text-white shadow-xs font-bold' 
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`font-mono-tag text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-600 font-bold'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. OFFERS GRID */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        
        {/* Counter and info header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono-tag text-slate-600">
            <Tag className="w-4 h-4 text-[#E76F51]" />
            <span>Showing <strong>{filteredListings.length}</strong> active promotions</span>
          </div>
          
          <button
            type="button"
            onClick={onToggleCurrency}
            className="text-xs font-mono-tag font-semibold text-[#264653] bg-white border border-slate-200 px-2.5 py-1 rounded-[6px] hover:border-[#2A9D8F] cursor-pointer"
          >
            Currency: <span className="font-bold text-[#2A9D8F]">{currency}</span>
          </button>
        </div>

        {/* The Deal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => {
            const promo = listing.promoCode || 'DAHAB360-DEAL-15';
            const discountLabel = listing.dealDiscount || listing.badge || '15% OFF';
            const isCopied = Boolean(copiedCodes[listing.id]);

            return (
              <div 
                key={listing.id}
                onClick={() => onSelectListing(listing)}
                className="group bg-white rounded-[14px] border-2 border-[#E76F51]/30 hover:border-[#E76F51] shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer text-left"
              >
                {/* 1. Image Carousel with Deal Badge */}
                <div className="relative">
                  <CardImageCarousel 
                    images={listing.images} 
                    alt={listing.name} 
                    className="h-48 w-full" 
                  />

                  {/* Top Floating Promo Badge */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none gap-2">
                    <span className="font-mono-tag text-[11px] uppercase font-black bg-[#E76F51] text-white px-2.5 py-1 rounded-[6px] shadow-md flex items-center gap-1.5 animate-pulse">
                      <Tag className="w-3 h-3" />
                      {discountLabel}
                    </span>

                    {listing.dealExpires && (
                      <span className="font-mono-tag text-[10px] bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded-[4px]">
                        {listing.dealExpires}
                      </span>
                    )}
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute bottom-2.5 right-2.5 bg-white/95 text-[#264653] px-2 py-0.5 rounded-[4px] text-xs font-bold flex items-center gap-1 shadow-xs pointer-events-none">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{listing.rating.toFixed(1)}</span>
                    <span className="text-slate-400 text-[10px] font-normal">({listing.reviewCount})</span>
                  </div>
                </div>

                {/* 2. Content Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Category & Location */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                      <span className="font-mono-tag uppercase tracking-wider text-[11px] font-bold text-[#2A9D8F]">
                        {listing.officialCategory || listing.category}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-0.5 truncate">
                        <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
                        {listing.area}
                      </span>
                    </div>

                    {/* Partner Name */}
                    <h3 className="font-bold text-base sm:text-lg text-[#264653] group-hover:text-[#2A9D8F] transition-colors line-clamp-1">
                      {listing.name}
                    </h3>

                    {/* Description snippet */}
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                      {listing.description}
                    </p>

                    {/* Terms / Conditions Box */}
                    {listing.dealTerms && (
                      <div className="mt-3 p-2.5 rounded-[8px] bg-[#F8EDD8]/70 border border-[#ECCE83]/70 text-[11px] text-slate-700 space-y-0.5">
                        <div className="font-bold text-[#264653] flex items-center gap-1 font-mono-tag text-[10px] uppercase">
                          <CheckCircle2 className="w-3 h-3 text-[#2A9D8F]" />
                          <span>Deal Terms</span>
                        </div>
                        <p className="leading-snug text-slate-600">
                          {listing.dealTerms}
                        </p>
                      </div>
                    )}
                  </div>

                    {/* 3. Promo Auto-Activation Banner */}
                    <div className="pt-2 space-y-2 border-t border-slate-100">
                      <div className="flex items-center justify-between p-2.5 rounded-[8px] bg-emerald-50/80 border border-emerald-200">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                          <div>
                            <span className="font-bold text-xs text-[#264653] block leading-tight">Partner Discount Active</span>
                            <span className="text-[11px] text-emerald-700 font-medium">Auto-applied directly via WhatsApp</span>
                          </div>
                        </div>
                        <span className="font-mono-tag text-[10px] font-bold text-emerald-800 bg-white border border-emerald-200 px-2 py-0.5 rounded-[4px]">
                          Verified
                        </span>
                      </div>

                    {/* Action Buttons: Mode 2 [Get Your Deal] + [Details/Book] */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={(e) => handleGetDealWhatsApp(listing, e)}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#E76F51] hover:bg-[#d65f41] active:bg-[#c25338] text-white rounded-[8px] text-xs font-bold shadow-xs transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Get Your Deal</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookNow(listing);
                        }}
                        className="w-full flex items-center justify-center gap-1 py-2.5 px-2 bg-white hover:bg-slate-50 text-[#264653] border border-slate-300 rounded-[8px] text-xs font-bold transition-colors cursor-pointer"
                      >
                        <span>More Details</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    </div>

                  </div>

                </div>

                {/* Card Footer: Base Price & Verified Guarantee */}
                <div className="px-4 py-2 bg-[#F8EDD8]/40 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1 font-mono-tag text-[10px] text-slate-600">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2A9D8F]" />
                    <span>Dahab 360 Partner Verified</span>
                  </div>
                  {listing.price > 0 && listing.officialCategory !== 'Restaurants & Cafes' && (
                    <div className="font-mono-tag text-[11px] font-extrabold text-[#264653]">
                      From {formatPrice(listing.price, currency)}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* 4. HOW TO REDEEM EXPLAINER SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="bg-white rounded-[14px] p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="text-center space-y-1">
            <span className="font-mono-tag text-[10px] font-bold uppercase text-[#2A9D8F] tracking-wider">
              Simple 3-Step Process
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#264653] font-heading">
              How to Redeem Your Dahab Deals
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              All promotions are negotiated directly with local dive clubs, boutique hotels, and restaurants with no middleman markups.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-[10px] bg-[#F8EDD8]/40 border border-[#ECCE83]/60 space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#264653] text-[#F8EDD8] font-bold text-xs flex items-center justify-center font-mono-tag">
                1
              </div>
              <h4 className="font-bold text-sm text-[#264653]">Copy Promo Code</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Click "Copy" on any offer card above to copy the partner's exclusive discount code to your clipboard.
              </p>
            </div>

            <div className="p-4 rounded-[10px] bg-[#F8EDD8]/40 border border-[#ECCE83]/60 space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#E76F51] text-white font-bold text-xs flex items-center justify-center font-mono-tag">
                2
              </div>
              <h4 className="font-bold text-sm text-[#264653]">Tap [Get Your Deal]</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                A pre-filled WhatsApp message will open directly with the partner's reservation desk with your code injected.
              </p>
            </div>

            <div className="p-4 rounded-[10px] bg-[#F8EDD8]/40 border border-[#ECCE83]/60 space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#2A9D8F] text-white font-bold text-xs flex items-center justify-center font-mono-tag">
                3
              </div>
              <h4 className="font-bold text-sm text-[#264653]">Enjoy Your Discount</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The partner immediately applies the discount to your bill or booking with zero coordination fees.
              </p>
            </div>
          </div>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => onNavigate({ type: 'directory' })}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#2A9D8F] hover:text-[#238276] cursor-pointer"
            >
              <span>Explore all Dahab directory listings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
