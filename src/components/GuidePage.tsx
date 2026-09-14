import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ArrowRight, 
  Sparkles, 
  ChevronDown, 
  Menu, 
  X, 
  MapPin, 
  Clock, 
  Calendar, 
  Share2, 
  Bookmark, 
  BookOpen, 
  Compass, 
  ExternalLink,
  Phone,
  Plane,
  Coins,
  Smartphone,
  SunMedium,
  ShieldCheck,
  Users,
  CheckCircle2,
  ShoppingCart,
  Waves,
  Mountain,
  Utensils,
  Car,
  Info
} from 'lucide-react';
import { Currency, ViewRoute, GuideArticle, DIYPlace, QuickInfoItem, GuideTopic } from '../types';
import { 
  GUIDE_TOPICS, 
  POPULAR_GUIDES, 
  DIY_PLACES, 
  QUICK_INFO_ITEMS, 
  RECENT_ARTICLES 
} from '../data/guideData';

interface GuidePageProps {
  currency: Currency;
  onToggleCurrency: () => void;
  language: 'EN' | 'AR';
  onToggleLanguage: () => void;
  onNavigate: (route: ViewRoute) => void;
  cartItemCount?: number;
  onOpenCart?: () => void;
}

export const GuidePage: React.FC<GuidePageProps> = ({
  currency,
  onToggleCurrency,
  language,
  onToggleLanguage,
  onNavigate,
  cartItemCount = 0,
  onOpenCart
}) => {
  // State
  const [selectedTopic, setSelectedTopic] = useState<GuideTopic | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTopMenuOpen, setIsTopMenuOpen] = useState(false);
  
  // Modals
  const [activeArticle, setActiveArticle] = useState<GuideArticle | null>(null);
  const [activeDIYPlace, setActiveDIYPlace] = useState<DIYPlace | null>(null);
  const [activeQuickInfo, setActiveQuickInfo] = useState<QuickInfoItem | null>(null);

  // Filtered popular and recent guides based on search & topic
  const renderTopicIcon = (topicId: GuideTopic) => {
    switch (topicId) {
      case 'Things to Do': return <Compass className="w-3.5 h-3.5" />;
      case 'Beaches & Snorkeling': return <Waves className="w-3.5 h-3.5" />;
      case 'Hiking & Nature': return <Mountain className="w-3.5 h-3.5" />;
      case 'Food & Cafes': return <Utensils className="w-3.5 h-3.5" />;
      case 'Getting Around': return <Car className="w-3.5 h-3.5" />;
      case 'Essential Info': return <Info className="w-3.5 h-3.5" />;
      default: return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  const renderQuickInfoIcon = (iconName: string) => {
    switch (iconName) {
      case 'plane': return <Plane className="w-5 h-5 text-[#2A9D8F]" />;
      case 'coins': return <Coins className="w-5 h-5 text-[#2A9D8F]" />;
      case 'smartphone': return <Smartphone className="w-5 h-5 text-[#2A9D8F]" />;
      case 'sun': return <SunMedium className="w-5 h-5 text-[#2A9D8F]" />;
      case 'shield': return <ShieldCheck className="w-5 h-5 text-[#2A9D8F]" />;
      case 'users': return <Users className="w-5 h-5 text-[#2A9D8F]" />;
      default: return <Sparkles className="w-5 h-5 text-[#2A9D8F]" />;
    }
  };

  const filteredPopular = useMemo(() => {
    return POPULAR_GUIDES.filter((item) => {
      if (selectedTopic !== 'All' && selectedTopic !== 'More Topics' && item.topic !== selectedTopic) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.excerpt.toLowerCase().includes(q) ||
          item.content.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedTopic, searchQuery]);

  const filteredRecent = useMemo(() => {
    return RECENT_ARTICLES.filter((item) => {
      if (selectedTopic !== 'All' && selectedTopic !== 'More Topics' && item.topic !== selectedTopic) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.excerpt.toLowerCase().includes(q) ||
          item.content.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedTopic, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8EDD8] text-[#264653] pb-24 md:pb-16">
      
      {/* 1. TOP BAR */}
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
                Editorial Guide
              </div>
            </div>
          </div>

          {/* Right Controls: Cart button, hamburger menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Cart Button for Marketplace */}
            <button
              type="button"
              onClick={() => {
                if (onOpenCart) {
                  onOpenCart();
                } else {
                  onNavigate({ type: 'marketplace' });
                }
              }}
              aria-label="Open Marketplace Cart"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#E76F51] hover:bg-[#d55e40] text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
              title="Marketplace Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cart</span>
              {cartItemCount > 0 && (
                <span className="w-4.5 h-4.5 rounded-full bg-white text-[#E76F51] text-[9px] font-mono-tag font-black flex items-center justify-center animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>

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
          <div className="bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-150">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-semibold">
              <div className="flex flex-wrap items-center gap-3 text-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    onNavigate({ type: 'home' });
                    setIsTopMenuOpen(false);
                  }}
                  className="hover:text-[#2A9D8F] cursor-pointer"
                >
                  Home
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate({ type: 'directory' });
                    setIsTopMenuOpen(false);
                  }}
                  className="hover:text-[#2A9D8F] cursor-pointer"
                >
                  Explore Directory
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate({ type: 'marketplace' });
                    setIsTopMenuOpen(false);
                  }}
                  className="hover:text-[#2A9D8F] cursor-pointer text-[#E76F51]"
                >
                  Marketplace
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate({ type: 'guide' });
                    setIsTopMenuOpen(false);
                  }}
                  className="text-[#2A9D8F] font-bold cursor-pointer"
                >
                  Dahab Guide
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate({ type: 'planner' });
                    setIsTopMenuOpen(false);
                  }}
                  className="hover:text-[#2A9D8F] cursor-pointer"
                >
                  Plan & Itinerary
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate({ type: 'about' });
                    setIsTopMenuOpen(false);
                  }}
                  className="hover:text-[#2A9D8F] cursor-pointer"
                >
                  About Dahab 360
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onNavigate({ type: 'directory' });
                  setIsTopMenuOpen(false);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2A9D8F] hover:bg-[#238276] text-white rounded-[6px] font-bold text-xs cursor-pointer"
              >
                <span>Explore All Dahab Listings</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 1. HERO SECTION: Authentic Dahab coastal backdrop with mountains and beach cafes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <div className="relative rounded-[20px] overflow-hidden shadow-lg border border-slate-200">
          
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80" 
              alt="Dahab Coastal Mountains & Beach Cafes"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#264653]/95 via-[#264653]/85 to-[#264653]/60 backdrop-blur-[0.5px]" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-12 text-white max-w-2xl space-y-4">
            
            {/* Tagline label: "DAHAB GUIDE" (uppercase, subtle tracking) */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] font-mono-tag font-bold tracking-widest uppercase border border-white/20">
              <Compass className="w-3.5 h-3.5 text-[#ECCE83]" />
              <span>DAHAB GUIDE</span>
            </div>

            {/* Headline: "Local Tips. Real Experiences." */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white leading-tight">
              Local Tips. Real Experiences.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              Everything you need to know for an amazing stay in Dahab.
            </p>

            {/* Integrated Search Bar:
                Input "What do you want to know about Dahab?" + prominent dark "Search" button on the right */}
            <div className="pt-2">
              <form 
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center bg-white rounded-[12px] p-1.5 shadow-md border border-white/30"
              >
                <div className="pl-3 pr-2 text-slate-400">
                  <Search className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="What do you want to know about Dahab?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent py-2 text-xs sm:text-sm text-[#264653] placeholder:text-slate-400 focus:outline-hidden"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-slate-400 hover:text-slate-600 mr-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 sm:px-5 py-2.5 bg-[#264653] hover:bg-[#1d353f] text-white rounded-[8px] font-bold text-xs sm:text-sm transition-colors cursor-pointer shrink-0 shadow-xs"
                >
                  Search
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TOPIC FILTER PILLS (Horizontal Scrollable Row) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <div className="bg-white rounded-[16px] border border-slate-200 p-3 sm:p-4 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
            
            {/* All Pill */}
            <button
              type="button"
              onClick={() => setSelectedTopic('All')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                selectedTopic === 'All'
                  ? 'bg-[#2A9D8F] text-white shadow-xs font-bold scale-102'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>All Topics</span>
            </button>

            {GUIDE_TOPICS.map((topic) => {
              const isSelected = selectedTopic === topic.id;
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-[#2A9D8F] text-white shadow-xs font-bold scale-102'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {renderTopicIcon(topic.id)}
                  <span>{topic.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. SECTION 1: POPULAR GUIDES (Featured Article Cards)
          Header: "Popular Guides" with right-aligned "View All Guides →"
          Horizontal scroll cards (3 columns on desktop, snap carousel on mobile) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-4">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#264653] font-heading tracking-tight">
              Popular Guides
            </h2>
            <span className="w-2 h-2 rounded-full bg-[#E76F51]" />
          </div>
          <button
            type="button"
            onClick={() => setSelectedTopic('All')}
            className="text-xs font-bold text-[#2A9D8F] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {filteredPopular.map((guide) => (
            <div
              key={guide.id}
              onClick={() => onNavigate({ type: 'article', articleId: guide.id })}
              className="bg-white rounded-[16px] border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
            >
              {/* Image */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img 
                  src={guide.image} 
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                {guide.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#E76F51] text-white text-[10px] font-mono-tag font-bold uppercase tracking-wider shadow-xs">
                    {guide.badge}
                  </span>
                )}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-xs text-white text-[10px] font-mono-tag px-2.5 py-0.5 rounded-full">
                  <Clock className="w-3 h-3" />
                  <span>{guide.readTime}</span>
                </div>
              </div>

              {/* Text info & Circular arrow button */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono-tag font-bold text-[#2A9D8F] uppercase tracking-wider">
                    {guide.topic}
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-[#264653] group-hover:text-[#2A9D8F] transition-colors leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {guide.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-medium text-slate-400">
                    {guide.date}
                  </span>
                  
                  {/* Circular Arrow Button (→) */}
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#2A9D8F] group-hover:text-white text-[#264653] flex items-center justify-center transition-colors shadow-2xs">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 4. SECTION 2: EXPLORE DAHAB YOURSELF (DIY Free Spots Carousel)
          Header: "Explore Dahab Yourself" | Subtitle: "Amazing places you can visit on your own." | "View All Places →"
          Cards: Blue Lagoon, Three Pools, Light House, Mount Sinai View, Lagona Beach */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#264653] font-heading tracking-tight">
                Explore Dahab Yourself
              </h2>
              <span className="px-2 py-0.5 rounded-[4px] bg-[#2A9D8F]/15 text-[#2A9D8F] text-[10px] font-mono-tag font-bold uppercase">
                DIY Free
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Amazing places you can visit on your own.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate({ type: 'directory' })}
            className="text-xs font-bold text-[#2A9D8F] hover:underline flex items-center gap-0.5 cursor-pointer self-start sm:self-auto"
          >
            <span>View All Places</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Swipe Carousel */}
        <div className="flex items-stretch gap-4 overflow-x-auto pb-3 pt-1 hide-scrollbar snap-x scroll-smooth">
          {DIY_PLACES.map((place) => (
            <div
              key={place.id}
              onClick={() => setActiveDIYPlace(place)}
              className="w-[240px] sm:w-[280px] shrink-0 snap-start bg-white rounded-[16px] border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
            >
              {/* Image */}
              <div className="relative h-36 w-full bg-slate-100 overflow-hidden">
                <img 
                  src={place.image} 
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-[4px] bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono-tag font-bold shadow-xs">
                  {place.badge}
                </span>
              </div>

              {/* Body */}
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-bold text-sm text-[#264653] group-hover:text-[#2A9D8F] transition-colors">
                    {place.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mt-0.5">
                    {place.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono-tag text-slate-400 pt-1 border-t border-slate-100">
                  <span className="truncate max-w-[170px]">{place.distance}</span>
                  <ArrowRight className="w-3 h-3 text-[#2A9D8F]" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 5. SECTION 3: MUST KNOW BEFORE YOU GO (Quick Info Grid)
          Header: "Must Know Before You Go" | Subtitle: "Quick information to make your trip easier." */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-4">
        
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#264653] font-heading tracking-tight">
            Must Know Before You Go
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Quick information to make your trip easier.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {QUICK_INFO_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveQuickInfo(item)}
              className="bg-white rounded-[14px] border border-slate-200 p-4 shadow-2xs hover:shadow-md hover:border-[#2A9D8F] transition-all cursor-pointer flex flex-col justify-between space-y-3 group text-center sm:text-left"
            >
              <div className="space-y-2">
                <div className="mx-auto sm:mx-0 w-10 h-10 rounded-[10px] bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {renderQuickInfoIcon(item.icon)}
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-[#264653] group-hover:text-[#2A9D8F] transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#2A9D8F] font-semibold pt-1 border-t border-slate-100">
                <span>View Details</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 6. SECTION 4: CONVERSION CALLOUT BANNER
          - Full-width container with Red Sea turquoise reef & diver background image
          * Headline: "Ready to turn ideas into experiences?"
          * Subtext: "Find and book the best activities, tours, restaurants and more in Dahab."
          * Action Button: "Explore Dahab →" (routes directly to the /explore directory).
          * Stylized stamp on the right: "Same Dahab More to Experience". */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative rounded-[20px] overflow-hidden shadow-lg border border-[#2A9D8F]/30 p-6 sm:p-10 lg:p-12 text-white">
          
          {/* Background image with turquoise reef and diver */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1800&q=80" 
              alt="Red Sea Turquoise Reef and Diver"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#264653]/95 via-[#264653]/85 to-[#2A9D8F]/80 backdrop-blur-[0.5px]" />
          </div>

          {/* Content container */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="max-w-xl space-y-3">
              <span className="px-2.5 py-0.5 rounded-[4px] bg-[#ECCE83]/20 text-[#ECCE83] text-[11px] font-mono-tag font-bold uppercase tracking-wider">
                Direct Booking & Concierge
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight text-white leading-tight">
                Ready to turn ideas into experiences?
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Find and book the best activities, tours, restaurants and more in Dahab. Direct WhatsApp contact with verified local partners.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'directory' })}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#E76F51] hover:bg-[#d85e40] text-white rounded-[10px] text-xs sm:text-sm font-bold shadow-md transition-transform hover:scale-102 cursor-pointer"
                >
                  <span>Explore Dahab →</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stylized Stamp on the right: "Same Dahab More to Experience" */}
            <div className="shrink-0 flex items-center justify-center">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-dashed border-[#ECCE83]/60 bg-black/25 backdrop-blur-xs flex flex-col items-center justify-center p-3 text-center rotate-6 shadow-lg">
                <Sparkles className="w-5 h-5 text-[#ECCE83] mb-1" />
                <div className="font-extrabold text-xs sm:text-sm font-heading tracking-tight text-white uppercase leading-tight">
                  Same Dahab
                </div>
                <div className="font-mono-tag text-[9px] sm:text-[10px] text-[#ECCE83] tracking-widest uppercase mt-0.5">
                  More to
                </div>
                <div className="font-black text-xs sm:text-sm text-white uppercase tracking-tight">
                  Experience
                </div>
                <div className="text-[8px] font-mono-tag text-slate-300 mt-1">
                  OFFICIAL 360
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. SECTION 5: RECENT ARTICLES
          Header: "Recent Articles" with "View All Articles →"
          4-item card grid:
          - "Sunrise at Mount Sinai"
          - "Best Free Beaches in Dahab"
          - "Top Cafes with a View"
          - "Kite Surfing in Dahab" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-4">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#264653] font-heading tracking-tight">
              Recent Articles
            </h2>
            <span className="w-2 h-2 rounded-full bg-[#2A9D8F]" />
          </div>
          <button
            type="button"
            onClick={() => setSelectedTopic('All')}
            className="text-xs font-bold text-[#2A9D8F] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredRecent.map((article) => (
            <div
              key={article.id}
              onClick={() => onNavigate({ type: 'article', articleId: article.id })}
              className="bg-white rounded-[16px] border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
            >
              {/* Image */}
              <div className="relative h-40 w-full bg-slate-100 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                {article.badge && (
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#2A9D8F] text-white text-[9px] font-mono-tag font-bold uppercase tracking-wider shadow-xs">
                    {article.badge}
                  </span>
                )}
                <div className="absolute bottom-2.5 left-2.5 bg-black/40 backdrop-blur-xs text-white text-[9px] font-mono-tag px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              {/* Text */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono-tag font-bold text-[#2A9D8F] uppercase tracking-wider">
                    {article.topic}
                  </span>
                  <h3 className="font-bold text-sm text-[#264653] group-hover:text-[#2A9D8F] transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                  <span>{article.date}</span>
                  <span className="text-[#2A9D8F] font-bold group-hover:underline flex items-center gap-0.5">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ARTICLE READER MODAL */}
      {activeArticle && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveArticle(null)}
        >
          <div 
            className="bg-white rounded-[20px] max-w-2xl w-full overflow-hidden shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image */}
            <div className="relative h-64 w-full bg-slate-100">
              <img 
                src={activeArticle.image} 
                alt={activeArticle.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#2A9D8F] text-white text-[10px] font-mono-tag font-bold uppercase">
                  {activeArticle.topic}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-xs text-white text-[10px] font-mono-tag">
                  {activeArticle.readTime}
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 pt-2 space-y-4">
              <div>
                <h2 className="text-2xl font-black text-[#264653] font-heading leading-tight">
                  {activeArticle.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-mono-tag mt-2">
                  <span>By {activeArticle.author || 'Dahab 360 Editorial'}</span>
                  <span>•</span>
                  <span>{activeArticle.date}</span>
                </div>
              </div>

              <div className="prose prose-sm text-slate-700 leading-relaxed space-y-3 pt-2 border-t border-slate-100">
                {activeArticle.content.split('\n\n').map((para, idx) => {
                  if (para.startsWith('### ')) {
                    return (
                      <h4 key={idx} className="font-bold text-sm text-[#264653] pt-2">
                        {para.replace('### ', '')}
                      </h4>
                    );
                  }
                  return (
                    <p key={idx} className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {para}
                    </p>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setActiveArticle(null);
                    onNavigate({ type: 'directory' });
                  }}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-[8px] bg-[#2A9D8F] hover:bg-[#238276] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore Related Providers in Dahab</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="w-full sm:w-auto py-2.5 px-4 rounded-[8px] border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs cursor-pointer"
                >
                  Close Article
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* DIY PLACE DETAIL MODAL */}
      {activeDIYPlace && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveDIYPlace(null)}
        >
          <div 
            className="bg-white rounded-[20px] max-w-md w-full overflow-hidden shadow-2xl space-y-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48 w-full bg-slate-100">
              <img 
                src={activeDIYPlace.image} 
                alt={activeDIYPlace.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                type="button"
                onClick={() => setActiveDIYPlace(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-[4px] bg-black/60 backdrop-blur-xs text-white text-xs font-mono-tag font-bold">
                {activeDIYPlace.badge}
              </span>
            </div>

            <div className="p-5 pt-1 space-y-3">
              <div>
                <h3 className="text-xl font-black text-[#264653] font-heading">
                  {activeDIYPlace.name}
                </h3>
                <p className="text-xs font-mono-tag text-[#2A9D8F] mt-0.5">
                  {activeDIYPlace.distance}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeDIYPlace.description}
              </p>

              {activeDIYPlace.tips && (
                <div className="bg-[#F8EDD8]/70 p-3 rounded-[10px] border border-[#264653]/10 text-xs space-y-1">
                  <span className="font-bold text-[#264653] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#ECCE83]" />
                    Local Tip
                  </span>
                  <p className="text-slate-600">
                    {activeDIYPlace.tips}
                  </p>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveDIYPlace(null);
                    onNavigate({ type: 'directory' });
                  }}
                  className="w-full py-2.5 bg-[#2A9D8F] hover:bg-[#238276] text-white rounded-[8px] text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Find Experiences Nearby</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* QUICK INFO MODAL */}
      {activeQuickInfo && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveQuickInfo(null)}
        >
          <div 
            className="bg-white rounded-[20px] max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[8px] bg-[#2A9D8F]/10 flex items-center justify-center">
                  {renderQuickInfoIcon(activeQuickInfo.icon)}
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#264653] font-heading">
                    {activeQuickInfo.title}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono-tag">Essential Traveler Info</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveQuickInfo(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed bg-[#2A9D8F]/10 p-3 rounded-[10px]">
              {activeQuickInfo.summary}
            </p>

            <div className="space-y-2 pt-1">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono-tag">
                Key Details & Practical Recommendations:
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {activeQuickInfo.details.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2A9D8F] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveQuickInfo(null)}
                className="w-full py-2.5 bg-[#264653] hover:bg-[#1d353f] text-white rounded-[8px] text-xs font-bold transition-colors cursor-pointer"
              >
                Got It
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
