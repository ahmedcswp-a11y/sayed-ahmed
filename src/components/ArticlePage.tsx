import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  User, 
  Share2, 
  Bookmark, 
  Check, 
  MapPin, 
  Star, 
  ShoppingCart, 
  Compass, 
  ShieldCheck, 
  MessageCircle, 
  ChevronRight, 
  Sparkles,
  ShoppingBag,
  Menu,
  X,
  Plus
} from 'lucide-react';
import { GuideArticle, ViewRoute, Currency, Listing, MarketplaceProduct } from '../types';
import { ALL_GUIDE_ARTICLES } from '../data/guideData';
import { ALL_MOCK_LISTINGS, formatPrice } from '../data/mockData';
import { ALL_MARKETPLACE_PRODUCTS, FEATURED_MARKETPLACE_PRODUCTS } from '../data/marketplaceData';

interface ArticlePageProps {
  articleId: string;
  currency: Currency;
  language: 'EN' | 'AR';
  onNavigate: (route: ViewRoute) => void;
  onAddListingToItinerary?: (listing: Listing) => void;
  onAddToCart?: (product: MarketplaceProduct, qty?: number) => void;
  onOpenBookingModal?: (listing: Listing) => void;
  cartItemCount?: number;
  onOpenCart?: () => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  articleId,
  currency,
  onNavigate,
  onAddListingToItinerary,
  onAddToCart,
  cartItemCount = 0,
  onOpenCart
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [addedProductIds, setAddedProductIds] = useState<Set<string>>(new Set());
  const [addedItinerarySlugs, setAddedItinerarySlugs] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Find the article
  const article: GuideArticle = 
    ALL_GUIDE_ARTICLES.find(a => a.id === articleId) || ALL_GUIDE_ARTICLES[0];

  // Resolve mentioned trips (Listing objects)
  const mentionedTrips: Listing[] = React.useMemo(() => {
    if (article.relatedListingSlugs && article.relatedListingSlugs.length > 0) {
      return ALL_MOCK_LISTINGS.filter(listing => 
        article.relatedListingSlugs!.includes(listing.slug)
      );
    }
    // Fallback default trips
    return ALL_MOCK_LISTINGS.filter(l => 
      l.officialCategory === 'Trips & Safari' || l.officialCategory === 'Scuba Diving'
    ).slice(0, 3);
  }, [article]);

  // Resolve marketplace products
  const marketplaceProducts: MarketplaceProduct[] = React.useMemo(() => {
    const allMarketplace = [...FEATURED_MARKETPLACE_PRODUCTS, ...ALL_MARKETPLACE_PRODUCTS];
    if (article.relatedMarketplaceIds && article.relatedMarketplaceIds.length > 0) {
      const found = allMarketplace.filter(p => 
        article.relatedMarketplaceIds!.includes(p.id)
      );
      if (found.length > 0) return found;
    }
    return FEATURED_MARKETPLACE_PRODUCTS.slice(0, 3);
  }, [article]);

  // Other guides to read next
  const otherGuides = React.useMemo(() => {
    return ALL_GUIDE_ARTICLES.filter(a => a.id !== article.id).slice(0, 3);
  }, [article.id]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      showToast('Article link copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleAddProduct = (prod: MarketplaceProduct, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(prod, 1);
    }
    setAddedProductIds(prev => new Set(prev).add(prod.id));
    showToast(`Added "${prod.title}" to cart`);
    setTimeout(() => {
      setAddedProductIds(prev => {
        const next = new Set(prev);
        next.delete(prod.id);
        return next;
      });
    }, 2200);
  };

  const handleAddItinerary = (trip: Listing, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (onAddListingToItinerary) {
      onAddListingToItinerary(trip);
    }
    setAddedItinerarySlugs(prev => new Set(prev).add(trip.slug));
    showToast(`Added "${trip.name}" to trip planner!`);
    setTimeout(() => {
      setAddedItinerarySlugs(prev => {
        const next = new Set(prev);
        next.delete(trip.slug);
        return next;
      });
    }, 2200);
  };

  const getTripWhatsAppUrl = (trip: Listing) => {
    const text = `Hi Dahab 360, I read the guide "${article.title}" and I want to book the trip "${trip.name}" (${trip.priceLabel || ''} ${formatPrice(trip.price, currency)}). Please assist me with availability.`;
    return `https://wa.me/201004892211?text=${encodeURIComponent(text)}`;
  };

  const getMarketplaceWhatsAppUrl = (prod: MarketplaceProduct) => {
    const text = `Hi Dahab 360, I saw "${prod.title}" (${formatPrice(prod.price, currency)}) on the "${article.title}" guide page. I would like to purchase it.`;
    return `https://wa.me/201004892211?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-[#F8EDD8] text-[#264653] pb-24 md:pb-16 font-body selection:bg-[#2A9D8F]/20">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#264653] text-white px-4 py-2.5 rounded-[10px] shadow-lg text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-[#2A9D8F]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. TOP HEADER (NO CURRENCY & NO LANGUAGE AS REQUESTED) */}
      <header className="sticky top-0 z-30 bg-[#F8EDD8]/95 backdrop-blur-md border-b border-[#264653]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          
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
                Editorial Guide
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
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
              onClick={() => onNavigate({ type: 'guide' })}
              className="px-2.5 py-1.5 rounded-[6px] text-[#2A9D8F] bg-white/70 font-bold transition-colors cursor-pointer shadow-2xs"
            >
              Guide
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'marketplace' })}
              className="px-2.5 py-1.5 rounded-[6px] hover:text-[#2A9D8F] transition-colors cursor-pointer"
            >
              Marketplace
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
              onClick={() => onNavigate({ type: 'for-service-providers' })}
              className="px-2.5 py-1.5 rounded-[6px] hover:text-[#2A9D8F] transition-colors cursor-pointer"
            >
              For Providers
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'about' })}
              className="px-2.5 py-1.5 rounded-[6px] hover:text-[#2A9D8F] transition-colors cursor-pointer"
            >
              About
            </button>
          </nav>

          {/* Right Controls: Cart & Menu (No Currency, No Language) */}
          <div className="flex items-center gap-2">
            
            {/* Cart Button */}
            <button
              type="button"
              onClick={() => {
                if (onOpenCart) onOpenCart();
                else onNavigate({ type: 'marketplace' });
              }}
              aria-label="Open Marketplace Cart"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#E76F51] hover:bg-[#d85e40] text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cart</span>
              {cartItemCount > 0 && (
                <span className="w-4.5 h-4.5 rounded-full bg-white text-[#E76F51] text-[9px] font-mono-tag font-black flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-[6px] bg-white/70 hover:bg-white text-[#264653] border border-slate-200 transition-colors cursor-pointer lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 shadow-md animate-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col gap-2 text-xs font-semibold text-[#264653]">
              <button 
                type="button"
                onClick={() => { onNavigate({ type: 'home' }); setIsMobileMenuOpen(false); }}
                className="text-left py-1.5 hover:text-[#2A9D8F]"
              >
                Home
              </button>
              <button 
                type="button"
                onClick={() => { onNavigate({ type: 'guide' }); setIsMobileMenuOpen(false); }}
                className="text-left py-1.5 text-[#2A9D8F] font-bold"
              >
                Dahab Guide
              </button>
              <button 
                type="button"
                onClick={() => { onNavigate({ type: 'directory' }); setIsMobileMenuOpen(false); }}
                className="text-left py-1.5 hover:text-[#2A9D8F]"
              >
                Directory & Places
              </button>
              <button 
                type="button"
                onClick={() => { onNavigate({ type: 'marketplace' }); setIsMobileMenuOpen(false); }}
                className="text-left py-1.5 hover:text-[#2A9D8F]"
              >
                Marketplace & Souvenirs
              </button>
              <button 
                type="button"
                onClick={() => { onNavigate({ type: 'planner' }); setIsMobileMenuOpen(false); }}
                className="text-left py-1.5 hover:text-[#2A9D8F]"
              >
                Trip Planner
              </button>
              <button 
                type="button"
                onClick={() => { onNavigate({ type: 'for-service-providers' }); setIsMobileMenuOpen(false); }}
                className="text-left py-1.5 hover:text-[#2A9D8F]"
              >
                For Service Providers
              </button>
              <button 
                type="button"
                onClick={() => { onNavigate({ type: 'contact' }); setIsMobileMenuOpen(false); }}
                className="text-left py-1.5 hover:text-[#2A9D8F]"
              >
                Contact & Support
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. BREADCRUMBS & TOP BAR */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-4">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate({ type: 'guide' })}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#264653]/75 hover:text-[#2A9D8F] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Dahab Guide</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white border border-slate-200 hover:border-[#2A9D8F] text-xs font-bold text-[#264653] shadow-xs cursor-pointer transition-colors"
              title="Share article"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#2A9D8F]" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSaved(!isSaved);
                showToast(isSaved ? 'Article removed from saved' : 'Article saved to your bookmarks');
              }}
              className={`p-1.5 rounded-[8px] border transition-colors cursor-pointer ${
                isSaved 
                  ? 'bg-[#2A9D8F] text-white border-[#2A9D8F]' 
                  : 'bg-white border-slate-200 hover:border-[#2A9D8F] text-slate-600'
              }`}
              title={isSaved ? 'Saved' : 'Save article'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. ARTICLE HEADER & HERO */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-[16px] border border-slate-200/80 shadow-xs overflow-hidden">
          
          {/* Top Metadata */}
          <div className="p-6 sm:p-8 md:p-10 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="px-2.5 py-1 rounded-[6px] bg-[#2A9D8F]/10 text-[#2A9D8F] text-[11px] font-mono-tag font-bold tracking-wider uppercase">
                {article.topic}
              </span>
              {article.badge && (
                <span className="px-2.5 py-1 rounded-[6px] bg-[#E76F51]/10 text-[#E76F51] text-[11px] font-mono-tag font-bold">
                  ★ {article.badge}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#264653] font-heading tracking-tight leading-tight mb-4">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-[#264653]/80 leading-relaxed max-w-3xl mb-6">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-500 font-medium pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#2A9D8F]/15 text-[#2A9D8F] flex items-center justify-center font-bold text-xs">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold text-[#264653]">{article.author || 'Dahab 360 Editor'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{article.date || 'Updated Sep 2026'}</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-slate-100 overflow-hidden">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4 text-[10px] text-white/85 font-mono-tag backdrop-blur-xs bg-black/30 px-2 py-0.5 rounded-[4px]">
              Dahab 360 Editorial Photography • Gulf of Aqaba
            </div>
          </div>

          {/* Article Main Text */}
          <div className="p-6 sm:p-8 md:p-10 text-[#264653]/90 leading-relaxed text-base space-y-6">
            
            {/* Split paragraphs and format headings */}
            {article.content.split('\n\n').map((block, idx) => {
              const trimmed = block.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-xl sm:text-2xl font-bold font-heading text-[#264653] pt-4 border-l-3 border-[#2A9D8F] pl-3.5 mt-6">
                    {trimmed.replace('### ', '')}
                  </h3>
                );
              }

              if (trimmed.startsWith('- ')) {
                const listItems = trimmed.split('\n').filter(Boolean);
                return (
                  <ul key={idx} className="space-y-2.5 my-4 pl-2">
                    {listItems.map((item, itemIdx) => {
                      const cleanItem = item.replace(/^- /, '');
                      return (
                        <li key={itemIdx} className="flex items-start gap-2.5 text-sm sm:text-base">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F] mt-2 shrink-0" />
                          <span>
                            {cleanItem.includes('**') ? (
                              cleanItem.split('**').map((seg, segIdx) => 
                                segIdx % 2 === 1 ? <strong key={segIdx} className="text-[#264653] font-bold">{seg}</strong> : seg
                              )
                            ) : cleanItem}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                );
              }

              return (
                <p key={idx} className="text-[#264653]/85 text-base sm:text-lg leading-relaxed">
                  {trimmed}
                </p>
              );
            })}

            {/* Local Dahab Tip Callout */}
            <div className="my-8 p-5 sm:p-6 rounded-[12px] bg-[#F8EDD8]/80 border border-[#E76F51]/20 flex flex-col sm:flex-row items-start gap-4">
              <div className="w-10 h-10 rounded-[10px] bg-[#E76F51] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading font-extrabold text-sm sm:text-base text-[#264653]">
                  Dahab 360 Local Recommendation
                </h4>
                <p className="text-xs sm:text-sm text-[#264653]/80 leading-normal">
                  Carry small denominations of Egyptian Pounds (EGP) for shore cafes and Bedouin tea camps. Most local spots welcome travelers warmly, and reef shoes are strongly recommended when walking in rocky entry areas.
                </p>
              </div>
            </div>

          </div>

        </div>
      </article>

      {/* ========================================================
          4. SECTION: MENTIONED TRIPS & EXPERIENCES (الرحلات المذكورة)
         ======================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Compass className="w-4 h-4 text-[#2A9D8F]" />
              <span className="font-mono-tag text-xs font-bold text-[#2A9D8F] uppercase tracking-wider">
                Book Verified Experiences
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#264653] font-heading">
              Mentioned Trips & Activities
            </h2>
            <p className="text-xs sm:text-sm text-[#264653]/70">
              Direct bookings with vetted Dahab 360 certified operators and Bedouin guides
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate({ type: 'directory', officialCategory: 'Trips & Safari' })}
            className="text-xs font-bold text-[#2A9D8F] hover:text-[#218175] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Browse All Trips</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {mentionedTrips.map((trip) => {
            const isAdded = addedItinerarySlugs.has(trip.slug);
            return (
              <div 
                key={trip.id}
                className="bg-white rounded-[14px] border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-[#2A9D8F]/50 transition-all flex flex-col justify-between group"
              >
                {/* Trip Image & Badges */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img 
                    src={trip.images[0]} 
                    alt={trip.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {trip.duration && (
                    <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono-tag font-bold px-2 py-0.5 rounded-[4px] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {trip.duration}
                    </span>
                  )}
                  {trip.isPartner && (
                    <span className="absolute top-2.5 right-2.5 bg-[#2A9D8F] text-white text-[10px] font-bold px-2 py-0.5 rounded-[4px] flex items-center gap-1 shadow-xs">
                      <ShieldCheck className="w-3 h-3" />
                      Partner
                    </span>
                  )}
                  <div className="absolute bottom-2 left-2.5 flex items-center gap-1 bg-white/95 backdrop-blur-xs text-[#264653] text-[11px] font-bold px-2 py-0.5 rounded-[4px]">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{trip.rating}</span>
                    <span className="text-slate-400 text-[10px]">({trip.reviewCount})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#264653]/60 mb-1">
                      <MapPin className="w-3 h-3 text-[#2A9D8F]" />
                      <span>{trip.area}</span>
                    </div>

                    <h3 
                      onClick={() => onNavigate({ type: 'listing', slug: trip.slug })}
                      className="font-heading font-extrabold text-sm sm:text-base text-[#264653] hover:text-[#2A9D8F] transition-colors cursor-pointer line-clamp-1 mb-1"
                    >
                      {trip.name}
                    </h3>

                    <p className="text-xs text-[#264653]/70 line-clamp-2 mb-3">
                      {trip.description}
                    </p>

                    {/* Perks tag */}
                    {trip.perks && trip.perks.length > 0 && (
                      <div className="mb-3">
                        <span className="inline-block text-[10px] font-semibold text-[#2A9D8F] bg-[#2A9D8F]/10 px-2 py-0.5 rounded-[4px]">
                          ✓ {trip.perks[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Price & Actions */}
                  <div className="pt-3 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="text-[11px] text-slate-500 font-medium">Starting from</span>
                      <div className="text-right">
                        <span className="font-heading font-black text-sm sm:text-base text-[#E76F51]">
                          {formatPrice(trip.price, currency)}
                        </span>
                        {trip.priceLabel && (
                          <span className="text-[10px] text-slate-400 block -mt-0.5">
                            {trip.priceLabel}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={getTripWhatsAppUrl(trip)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-[8px] bg-[#2A9D8F] hover:bg-[#238276] text-white text-xs font-bold transition-colors shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Book</span>
                      </a>

                      <button
                        type="button"
                        onClick={(e) => handleAddItinerary(trip, e)}
                        className={`flex items-center justify-center gap-1 py-2 px-2 rounded-[8px] border text-xs font-bold transition-colors cursor-pointer ${
                          isAdded 
                            ? 'bg-[#264653] text-white border-[#264653]' 
                            : 'bg-white border-slate-200 hover:border-[#2A9D8F] text-[#264653]'
                        }`}
                        title="Add to Itinerary Planner"
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#2A9D8F]" />
                            <span>Saved</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Plan</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          5. SECTION: MARKETPLACE ITEMS (حاجات من الماركت بليس)
         ======================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-14">
        <div className="p-6 sm:p-8 rounded-[16px] bg-white border border-slate-200/90 shadow-xs">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ShoppingBag className="w-4 h-4 text-[#E76F51]" />
                <span className="font-mono-tag text-xs font-bold text-[#E76F51] uppercase tracking-wider">
                  Dahab Marketplace
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#264653] font-heading">
                Related Marketplace Items
              </h2>
              <p className="text-xs sm:text-sm text-[#264653]/70">
                Handcrafted silver, Bedouin textiles, and gear from local community sellers
              </p>
            </div>
            
            <button
              type="button"
              onClick={() => onNavigate({ type: 'marketplace' })}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] bg-[#E76F51]/10 hover:bg-[#E76F51]/20 text-[#E76F51] text-xs font-bold transition-colors cursor-pointer shrink-0"
            >
              <span>Explore Marketplace</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Marketplace Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {marketplaceProducts.map((prod) => {
              const isAdded = addedProductIds.has(prod.id);
              return (
                <div 
                  key={prod.id}
                  className="bg-[#F8EDD8]/40 rounded-[12px] border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:border-[#E76F51]/40 transition-all group"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                    <img 
                      src={prod.image} 
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs text-[#264653] text-[10px] font-mono-tag font-bold px-2 py-0.5 rounded-[4px] shadow-2xs">
                      {prod.condition}
                    </span>
                    <span className="absolute top-2 right-2 bg-black/50 text-white text-[10px] font-medium px-2 py-0.5 rounded-[4px]">
                      {prod.category.split('&')[0]}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[#264653] line-clamp-1 mb-1">
                        {prod.title}
                      </h4>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                        <span>{prod.seller.name}</span>
                        <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{prod.seller.rating}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#264653]/70 line-clamp-2 mb-3">
                        {prod.description}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-slate-200/60">
                      <div className="flex items-baseline justify-between mb-2.5">
                        <span className="text-[10px] text-slate-400">Price</span>
                        <span className="font-heading font-black text-sm text-[#E76F51]">
                          {formatPrice(prod.price, currency)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleAddProduct(prod, e)}
                          className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-[6px] text-xs font-bold transition-all cursor-pointer ${
                            isAdded
                              ? 'bg-[#2A9D8F] text-white'
                              : 'bg-[#E76F51] hover:bg-[#d85e40] text-white shadow-xs'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-3 h-3" />
                              <span>Cart</span>
                            </>
                          )}
                        </button>

                        <a
                          href={getMarketplaceWhatsAppUrl(prod)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-[6px] bg-white border border-slate-200 hover:border-[#2A9D8F] text-[#264653] text-xs font-bold transition-colors"
                        >
                          <MessageCircle className="w-3 h-3 text-[#2A9D8F]" />
                          <span>Order</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================
          6. SECTION: READ NEXT GUIDES
         ======================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-14">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#264653]">
            More Dahab Guides & Itineraries
          </h3>
          <button
            type="button"
            onClick={() => onNavigate({ type: 'guide' })}
            className="text-xs font-bold text-[#2A9D8F] hover:text-[#238276] flex items-center gap-1 cursor-pointer"
          >
            <span>All Guides</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {otherGuides.map((guide) => (
            <div
              key={guide.id}
              onClick={() => onNavigate({ type: 'article', articleId: guide.id })}
              className="bg-white rounded-[12px] border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-sm hover:border-[#2A9D8F] transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <img 
                  src={guide.image} 
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[9px] font-mono-tag px-2 py-0.5 rounded-[4px]">
                  {guide.topic}
                </span>
              </div>
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#264653] group-hover:text-[#2A9D8F] transition-colors line-clamp-2 mb-1">
                    {guide.title}
                  </h4>
                  <p className="text-[11px] text-[#264653]/70 line-clamp-2 mb-2">
                    {guide.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100">
                  <span>{guide.readTime}</span>
                  <span className="font-semibold text-[#2A9D8F] flex items-center gap-0.5">
                    Read <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. BOTTOM CONCIERGE HELP */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-14">
        <div className="p-6 rounded-[14px] bg-[#264653] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-heading font-bold text-base sm:text-lg text-white">
              Questions about this guide or Dahab trips?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Our local Dahab concierge team is available 24/7 on WhatsApp to assist with bespoke bookings.
            </p>
          </div>
          <a
            href={`https://wa.me/201004892211?text=${encodeURIComponent(`Hello Dahab 360, I have a question regarding the guide: "${article.title}"`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-[8px] bg-[#E76F51] hover:bg-[#d85e40] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat with Concierge</span>
          </a>
        </div>
      </div>

    </div>
  );
};
