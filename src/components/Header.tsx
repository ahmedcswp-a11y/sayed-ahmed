import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Compass, 
  MapPin, 
  Calendar, 
  X, 
  ChevronRight, 
  Waves, 
  Bed, 
  Utensils, 
  Menu, 
  Sparkles,
  PhoneCall,
  ShoppingCart,
  BookOpen,
  HeartHandshake,
  MessageSquare,
  Tag
} from 'lucide-react';
import { Currency, ViewRoute, Listing } from '../types';
import { MOCK_EXPERIENCES, MOCK_STAYS, MOCK_DINING } from '../data/mockData';

interface HeaderProps {
  currentRoute: ViewRoute;
  onNavigate: (route: ViewRoute) => void;
  currency: Currency;
  onToggleCurrency: () => void;
  planItemCount: number;
  cartItemCount?: number;
  onOpenCart?: () => void;
  onSelectListing: (listing: Listing) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  currency,
  onToggleCurrency,
  planItemCount,
  cartItemCount = 0,
  onOpenCart,
  onSelectListing
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allListings = [...MOCK_EXPERIENCES, ...MOCK_STAYS, ...MOCK_DINING];

  const filteredExperiences = MOCK_EXPERIENCES.filter(item => 
    !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.area.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 3);

  const filteredStays = MOCK_STAYS.filter(item => 
    !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.area.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 3);

  const filteredDining = MOCK_DINING.filter(item => 
    !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.area.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 3);

  const areas = ['Lighthouse', 'Laguna', 'Blue Hole Area', 'Assalah', 'Mashraba', 'Eel Garden'].filter(a =>
    !searchQuery || a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchItemClick = (listing: Listing) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    onSelectListing(listing);
  };

  const handleAreaClick = (area: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    onNavigate({ type: 'directory', category: 'all', subcategory: area });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8EDD8]/95 backdrop-blur-md border-b border-[#264653]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* LEFT: Logo */}
        <div 
          onClick={() => onNavigate({ type: 'home' })}
          className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[8px] bg-[#264653] text-[#F8EDD8] flex items-center justify-center font-black shadow-xs relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#2A9D8F] to-[#E76F51] opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 font-bold text-sm tracking-tighter text-white">360</span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#264653] font-heading">
                DAHAB <span className="text-[#2A9D8F]">360</span>
              </span>
            </div>
            <div className="font-mono-tag text-[9px] uppercase tracking-widest text-[#264653]/60 -mt-1 font-medium">
              South Sinai Guide
            </div>
          </div>
        </div>

        {/* CENTER: Large Global Search Interface */}
        <div ref={searchContainerRef} className="flex-1 max-w-xl relative hidden md:block">
          <div 
            onClick={() => {
              setIsSearchOpen(true);
              searchInputRef.current?.focus();
            }}
            className="flex items-center bg-white border border-slate-200 hover:border-[#2A9D8F] rounded-[8px] px-3.5 py-2 shadow-xs transition-all cursor-text"
          >
            <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search stays, food, experiences..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full bg-transparent text-sm text-[#264653] placeholder:text-slate-400 focus:outline-hidden font-normal"
            />
            {searchQuery ? (
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchQuery('');
                }}
                className="text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="font-mono-tag text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-[4px]">
                /
              </span>
            )}
          </div>

          {/* Grouped Search Suggestions Dropdown */}
          {isSearchOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[12px] border border-slate-200 shadow-xl overflow-hidden z-50 animate-in fade-in-50 duration-150 max-h-[75vh] overflow-y-auto">
              <div className="p-3 text-xs text-slate-500 font-mono-tag uppercase tracking-wider border-b border-slate-100 flex items-center justify-between">
                <span>Quick Discovery Suggestions</span>
                <button 
                  type="button" 
                  onClick={() => setIsSearchOpen(false)}
                  className="hover:text-slate-800"
                >
                  Close
                </button>
              </div>

              {/* Stays Group */}
              {filteredStays.length > 0 && (
                <div className="p-3 border-b border-slate-100">
                  <div className="font-mono-tag text-[11px] font-bold text-[#2A9D8F] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Bed className="w-3.5 h-3.5" /> Stays & Camps
                  </div>
                  <div className="space-y-1">
                    {filteredStays.map((stay) => (
                      <div
                        key={stay.id}
                        onClick={() => handleSearchItemClick(stay)}
                        className="p-2 hover:bg-[#F8EDD8]/50 rounded-[6px] flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <img src={stay.images[0]} alt="" className="w-8 h-8 rounded-[4px] object-cover" />
                          <div>
                            <div className="text-xs font-bold text-[#264653]">{stay.name}</div>
                            <div className="text-[10px] text-slate-500 font-mono-tag">{stay.area} • {stay.category}</div>
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experiences Group */}
              {filteredExperiences.length > 0 && (
                <div className="p-3 border-b border-slate-100">
                  <div className="font-mono-tag text-[11px] font-bold text-[#2A9D8F] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Waves className="w-3.5 h-3.5" /> Experiences & Diving
                  </div>
                  <div className="space-y-1">
                    {filteredExperiences.map((exp) => (
                      <div
                        key={exp.id}
                        onClick={() => handleSearchItemClick(exp)}
                        className="p-2 hover:bg-[#F8EDD8]/50 rounded-[6px] flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <img src={exp.images[0]} alt="" className="w-8 h-8 rounded-[4px] object-cover" />
                          <div>
                            <div className="text-xs font-bold text-[#264653]">{exp.name}</div>
                            <div className="text-[10px] text-slate-500 font-mono-tag">{exp.area} • {exp.duration}</div>
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dining Group */}
              {filteredDining.length > 0 && (
                <div className="p-3 border-b border-slate-100">
                  <div className="font-mono-tag text-[11px] font-bold text-[#2A9D8F] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5" /> Restaurants & Cafés
                  </div>
                  <div className="space-y-1">
                    {filteredDining.map((dine) => (
                      <div
                        key={dine.id}
                        onClick={() => handleSearchItemClick(dine)}
                        className="p-2 hover:bg-[#F8EDD8]/50 rounded-[6px] flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <img src={dine.images[0]} alt="" className="w-8 h-8 rounded-[4px] object-cover" />
                          <div>
                            <div className="text-xs font-bold text-[#264653]">{dine.name}</div>
                            <div className="text-[10px] text-slate-500 font-mono-tag">{dine.area} • {dine.category}</div>
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dahab Areas */}
              <div className="p-3 bg-[#F8EDD8]/30">
                <div className="font-mono-tag text-[11px] font-bold text-[#264653] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E76F51]" /> Popular Dahab Neighborhoods
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {areas.map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => handleAreaClick(area)}
                      className="px-2.5 py-1 text-xs bg-white hover:bg-[#2A9D8F] hover:text-white border border-slate-200 rounded-[4px] font-medium text-[#264653] transition-colors cursor-pointer"
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Currency + Navigation + "Your Dahab Plan" */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Categories Desktop */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-[#264653]/85">
            <button
              type="button"
              onClick={() => onNavigate({ type: 'home' })}
              className={`px-2.5 py-1.5 rounded-[6px] hover:text-[#2A9D8F] transition-colors cursor-pointer ${
                currentRoute.type === 'home' ? 'text-[#2A9D8F] bg-white/60 font-bold' : ''
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'directory' })}
              className={`px-2.5 py-1.5 rounded-[6px] hover:text-[#2A9D8F] transition-colors cursor-pointer ${
                currentRoute.type === 'directory' ? 'text-[#2A9D8F] bg-white/60 font-bold' : ''
              }`}
            >
              Explore
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'offers' })}
              className={`px-2.5 py-1.5 rounded-[6px] hover:text-[#E76F51] transition-colors cursor-pointer flex items-center gap-1 ${
                currentRoute.type === 'offers' ? 'text-[#E76F51] bg-white/60 font-bold' : ''
              }`}
            >
              <Tag className="w-3.5 h-3.5 text-[#E76F51]" />
              <span>Offers</span>
              <span className="font-mono-tag text-[9px] font-bold bg-[#E76F51] text-white px-1.5 py-0.2 rounded-full">
                Deals
              </span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'marketplace' })}
              className={`px-2.5 py-1.5 rounded-[6px] hover:text-[#2A9D8F] transition-colors cursor-pointer flex items-center gap-1 ${
                currentRoute.type === 'marketplace' ? 'text-[#2A9D8F] bg-white/60 font-bold' : ''
              }`}
            >
              <span>Marketplace</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'guide' })}
              className={`px-2.5 py-1.5 rounded-[6px] hover:text-[#2A9D8F] transition-colors cursor-pointer flex items-center gap-1 ${
                currentRoute.type === 'guide' ? 'text-[#2A9D8F] bg-white/60 font-bold' : ''
              }`}
            >
              <span>Guide</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'planner' })}
              className={`px-2.5 py-1.5 rounded-[6px] hover:text-[#2A9D8F] transition-colors cursor-pointer flex items-center gap-1 ${
                currentRoute.type === 'planner' ? 'text-[#2A9D8F] bg-white/60 font-bold' : ''
              }`}
            >
              <span>Plan</span>
              {planItemCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#E76F51] text-white text-[10px] font-mono-tag font-bold">
                  {planItemCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'about' })}
              className={`px-2.5 py-1.5 rounded-[6px] hover:text-[#2A9D8F] transition-colors cursor-pointer flex items-center gap-1 ${
                currentRoute.type === 'about' ? 'text-[#2A9D8F] bg-white/60 font-bold' : ''
              }`}
            >
              <span>About</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'service-providers' })}
              className={`px-2.5 py-1.5 rounded-[6px] hover:text-[#E76F51] transition-colors cursor-pointer flex items-center gap-1 ${
                currentRoute.type === 'service-providers' ? 'text-[#E76F51] bg-white/60 font-bold' : ''
              }`}
            >
              <span>For Providers</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'contact' })}
              className={`px-2.5 py-1.5 rounded-[6px] hover:text-[#2A9D8F] transition-colors cursor-pointer flex items-center gap-1 ${
                currentRoute.type === 'contact' ? 'text-[#2A9D8F] bg-white/60 font-bold' : ''
              }`}
            >
              <span>Contact</span>
            </button>
          </nav>

          {/* Contact / WhatsApp Concierge Quick Button */}
          <a
            href="https://wa.me/201004892211?text=Hello%20Dahab%20360!%20I%20have%20an%20inquiry%20about%20visiting%20Dahab."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Direct WhatsApp Concierge"
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-[8px] text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer shadow-xs bg-[#2A9D8F] hover:bg-[#238276] text-white"
          >
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap hidden sm:inline">WhatsApp</span>
          </a>

          {/* Header Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-white border border-slate-200 text-[#264653] hover:border-[#2A9D8F] transition-colors cursor-pointer shadow-xs"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Header Dropdown Menu (Main Pages: Home, Explore, Marketplace, Guide, Plan, About) */}
      {isMobileMenuOpen && (
        <div className="bg-white border-b border-slate-200 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="text-xs font-bold font-mono-tag text-[#264653]/70 uppercase tracking-wider">
                Dahab 360 Menu
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-600 font-medium cursor-pointer"
              >
                Close
              </button>
            </div>

            {/* Primary Navigation Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-5">
              <button
                type="button"
                onClick={() => {
                  onNavigate({ type: 'home' });
                  setIsMobileMenuOpen(false);
                }}
                className={`p-3 rounded-[8px] border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                  currentRoute.type === 'home'
                    ? 'border-[#2A9D8F] bg-[#2A9D8F]/10 text-[#2A9D8F]'
                    : 'border-slate-200 bg-white hover:border-[#2A9D8F] text-[#264653]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">Home</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </div>
                <span className="text-[11px] text-slate-500 font-mono-tag">Overview & top picks</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onNavigate({ type: 'directory' });
                  setIsMobileMenuOpen(false);
                }}
                className={`p-3 rounded-[8px] border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                  currentRoute.type === 'directory'
                    ? 'border-[#2A9D8F] bg-[#2A9D8F]/10 text-[#2A9D8F]'
                    : 'border-slate-200 bg-white hover:border-[#2A9D8F] text-[#264653]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">Explore</span>
                  <Search className="w-3.5 h-3.5 text-[#2A9D8F]" />
                </div>
                <span className="text-[11px] text-slate-500 font-mono-tag">Directory & filters</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onNavigate({ type: 'offers' });
                  setIsMobileMenuOpen(false);
                }}
                className={`p-3 rounded-[8px] border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                  currentRoute.type === 'offers'
                    ? 'border-[#E76F51] bg-[#E76F51]/10 text-[#E76F51]'
                    : 'border-slate-200 bg-white hover:border-[#E76F51] text-[#264653]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">Special Offers</span>
                  <Tag className="w-3.5 h-3.5 text-[#E76F51]" />
                </div>
                <span className="text-[11px] text-slate-500 font-mono-tag">Deals & promo codes</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onNavigate({ type: 'marketplace' });
                  setIsMobileMenuOpen(false);
                }}
                className={`p-3 rounded-[8px] border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                  currentRoute.type === 'marketplace'
                    ? 'border-[#E76F51] bg-[#E76F51]/10 text-[#E76F51]'
                    : 'border-slate-200 bg-white hover:border-[#E76F51] text-[#264653]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">Marketplace</span>
                  <ShoppingCart className="w-3.5 h-3.5 text-[#E76F51]" />
                </div>
                <span className="text-[11px] text-slate-500 font-mono-tag">Handmade & gear</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onNavigate({ type: 'guide' });
                  setIsMobileMenuOpen(false);
                }}
                className={`p-3 rounded-[8px] border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                  currentRoute.type === 'guide'
                    ? 'border-[#2A9D8F] bg-[#2A9D8F]/10 text-[#2A9D8F]'
                    : 'border-slate-200 bg-white hover:border-[#2A9D8F] text-[#264653]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">Dahab Guide</span>
                  <BookOpen className="w-3.5 h-3.5 text-[#2A9D8F]" />
                </div>
                <span className="text-[11px] text-slate-500 font-mono-tag">Tips, blogs & FAQs</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onNavigate({ type: 'planner' });
                  setIsMobileMenuOpen(false);
                }}
                className={`p-3 rounded-[8px] border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                  currentRoute.type === 'planner'
                    ? 'border-[#2A9D8F] bg-[#2A9D8F]/10 text-[#2A9D8F]'
                    : 'border-slate-200 bg-white hover:border-[#2A9D8F] text-[#264653]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">Plan & Itinerary</span>
                  <Calendar className="w-3.5 h-3.5 text-[#2A9D8F]" />
                </div>
                <span className="text-[11px] text-slate-500 font-mono-tag">
                  {planItemCount > 0 ? `${planItemCount} items saved` : 'Trip schedule'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onNavigate({ type: 'about' });
                  setIsMobileMenuOpen(false);
                }}
                className={`p-3 rounded-[8px] border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                  currentRoute.type === 'about'
                    ? 'border-[#2A9D8F] bg-[#2A9D8F]/10 text-[#2A9D8F]'
                    : 'border-slate-200 bg-white hover:border-[#2A9D8F] text-[#264653]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">About Dahab 360</span>
                  <Compass className="w-3.5 h-3.5 text-[#2A9D8F]" />
                </div>
                <span className="text-[11px] text-slate-500 font-mono-tag">Trust & local story</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onNavigate({ type: 'service-providers' });
                  setIsMobileMenuOpen(false);
                }}
                className={`p-3 rounded-[8px] border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                  currentRoute.type === 'service-providers'
                    ? 'border-[#E76F51] bg-[#E76F51]/10 text-[#E76F51]'
                    : 'border-slate-200 bg-white hover:border-[#E76F51] text-[#264653]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">For Providers</span>
                  <HeartHandshake className="w-3.5 h-3.5 text-[#E76F51]" />
                </div>
                <span className="text-[11px] text-slate-500 font-mono-tag">Join as B2B partner</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onNavigate({ type: 'contact' });
                  setIsMobileMenuOpen(false);
                }}
                className={`p-3 rounded-[8px] border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                  currentRoute.type === 'contact'
                    ? 'border-[#2A9D8F] bg-[#2A9D8F]/10 text-[#2A9D8F]'
                    : 'border-slate-200 bg-white hover:border-[#2A9D8F] text-[#264653]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">Contact Us</span>
                  <MessageSquare className="w-3.5 h-3.5 text-[#2A9D8F]" />
                </div>
                <span className="text-[11px] text-slate-500 font-mono-tag">Support & Hub</span>
              </button>
            </div>

            {/* Quick Categories & Concierge Row */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono-tag text-slate-400 font-bold uppercase text-[10px]">Categories:</span>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate({ type: 'directory', officialCategory: 'Scuba Diving' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-[#2A9D8F] hover:text-white rounded-[4px] font-medium text-[#264653] transition-colors cursor-pointer"
                >
                  Diving & Watersports
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate({ type: 'directory', officialCategory: 'Accommodation' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-[#2A9D8F] hover:text-white rounded-[4px] font-medium text-[#264653] transition-colors cursor-pointer"
                >
                  Stays & Camps
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate({ type: 'directory', officialCategory: 'Restaurants & Cafes' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-[#2A9D8F] hover:text-white rounded-[4px] font-medium text-[#264653] transition-colors cursor-pointer"
                >
                  Restaurants
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate({ type: 'directory', officialCategory: 'Trips & Safari' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-[#2A9D8F] hover:text-white rounded-[4px] font-medium text-[#264653] transition-colors cursor-pointer"
                >
                  Desert Safaris
                </button>
              </div>

              <a
                href="https://wa.me/201004892211?text=Hello%20Dahab%20360%20Team"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#2A9D8F] hover:bg-[#238276] text-white font-bold text-xs shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
