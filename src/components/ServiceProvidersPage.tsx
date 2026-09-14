import React, { useState } from 'react';
import { 
  Building2, 
  Waves, 
  Utensils, 
  Compass, 
  Sparkles, 
  ShoppingBag, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Lock, 
  ArrowRight, 
  ChevronDown, 
  Menu, 
  X, 
  ShoppingCart, 
  CheckCircle2, 
  ArrowDown, 
  Car, 
  HeartHandshake, 
  Store, 
  Home, 
  BookOpen, 
  ShieldCheck, 
  Send
} from 'lucide-react';
import { Currency, ViewRoute } from '../types';

interface ServiceProvidersPageProps {
  currency: Currency;
  onToggleCurrency: () => void;
  language: 'EN' | 'AR';
  onToggleLanguage: () => void;
  onNavigate: (route: ViewRoute) => void;
  cartItemCount?: number;
  onOpenCart?: () => void;
}

export const ServiceProvidersPage: React.FC<ServiceProvidersPageProps> = ({
  currency,
  onToggleCurrency,
  language,
  onToggleLanguage,
  onNavigate,
  cartItemCount = 0,
  onOpenCart
}) => {
  // Mobile drawer state
  const [isTopMenuOpen, setIsTopMenuOpen] = useState(false);

  // Form State
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // WhatsApp Destination Number for Dahab 360 Admin
  const DAHAB360_WHATSAPP = '201004892211';

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { [key: string]: string } = {};
    if (!businessName.trim()) errors.businessName = 'Please provide your business name';
    if (!businessType) errors.businessType = 'Please select your business category';
    if (!contactPerson.trim()) errors.contactPerson = 'Please enter contact person name';
    if (!phone.trim()) errors.phone = 'WhatsApp or phone number is required';
    if (!description.trim()) {
      errors.description = 'Please provide a short description';
    } else if (description.trim().length < 10) {
      errors.description = 'Please write at least 10 characters';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    // Construct formatted WhatsApp message
    const message = `Hello Dahab 360! 🤝 New Partner Onboarding Request:
━━━━━━━━━━━━━━━━━━━━
• Business Name: ${businessName.trim()}
• Category: ${businessType}
• Contact Person: ${contactPerson.trim()}
• Phone/WhatsApp: ${phone.trim()}
• Instagram: ${instagram.trim() || 'N/A'}
• Website: ${website.trim() || 'N/A'}
• Description:
${description.trim()}
━━━━━━━━━━━━━━━━━━━━
Sent from Dahab 360 Partner Portal`;

    const whatsappUrl = `https://wa.me/${DAHAB360_WHATSAPP}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setBusinessName('');
    setBusinessType('');
    setContactPerson('');
    setPhone('');
    setInstagram('');
    setWebsite('');
    setDescription('');
    setFormErrors({});
    setIsSubmitted(false);
  };

  const categories = [
    {
      title: 'Accommodation',
      desc: 'Boutique hotels, eco-camps & private coastal chalets',
      icon: Building2,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      title: 'Diving & Water Activities',
      desc: 'PADI dive centers, freediving academies & kitesurf clubs',
      icon: Waves,
      color: 'bg-sky-50 text-sky-700 border-sky-200'
    },
    {
      title: 'Restaurants & Cafes',
      desc: 'Bedouin seafood spots, seaside cafes & artisan bakeries',
      icon: Utensils,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      title: 'Trips & Safari',
      desc: 'Mount Sinai treks, canyon tours & stargazing dinners',
      icon: Compass,
      color: 'bg-orange-50 text-orange-700 border-orange-200'
    },
    {
      title: 'Wellness & Spa',
      desc: 'Beach yoga studios, massage therapies & sound healing',
      icon: Sparkles,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      title: 'Shops & Local Services',
      desc: 'Bedouin crafts, dive equipment & Sinai transportation',
      icon: ShoppingBag,
      color: 'bg-teal-50 text-teal-700 border-teal-200'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8EDD8]/40 pb-20">
      
      {/* 1. TOP BAR */}
      <header className="sticky top-0 z-40 bg-[#F8EDD8]/95 backdrop-blur-md border-b border-[#264653]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3">
          
          {/* Logo */}
          <div 
            onClick={() => onNavigate({ type: 'home' })}
            className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[8px] bg-[#264653] text-[#F8EDD8] flex items-center justify-center font-black shadow-xs relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2A9D8F] to-[#E76F51] opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 font-bold text-sm tracking-tighter text-white">360</span>
            </div>
            <div>
              <span className="text-base sm:text-lg font-black font-heading tracking-tight text-[#264653] block leading-none">
                DAHAB 360
              </span>
              <span className="text-[10px] font-mono-tag font-bold text-[#E76F51] tracking-widest uppercase">
                PARTNER PORTAL
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
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
              className="px-2.5 py-1.5 rounded-[6px] hover:text-[#2A9D8F] transition-colors cursor-pointer"
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
            <button
              type="button"
              onClick={() => onNavigate({ type: 'service-providers' })}
              className="px-2.5 py-1.5 rounded-[6px] text-[#E76F51] bg-white/70 font-bold shadow-2xs transition-colors cursor-pointer"
            >
              For Providers
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'contact' })}
              className="px-2.5 py-1.5 rounded-[6px] hover:text-[#2A9D8F] transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Right Controls: Cart, Hamburger menu */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Cart Button */}
            <button
              type="button"
              onClick={() => {
                if (onOpenCart) onOpenCart();
                else onNavigate({ type: 'marketplace' });
              }}
              aria-label="Open Cart"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#2A9D8F] hover:bg-[#238276] text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cart</span>
              {cartItemCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#E76F51] text-white text-[10px] font-mono-tag font-bold flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsTopMenuOpen(!isTopMenuOpen)}
              aria-label="Toggle Menu"
              className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-white border border-slate-200 text-[#264653] hover:border-[#2A9D8F] transition-colors cursor-pointer shadow-xs"
            >
              {isTopMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Dropdown Menu Modal */}
        {isTopMenuOpen && (
          <div className="bg-white border-b border-slate-200 px-4 py-5 shadow-xl animate-in slide-in-from-top-2 duration-150">
            <div className="max-w-7xl mx-auto space-y-4">
              <div className="text-[11px] font-mono-tag text-slate-400 uppercase tracking-wider font-bold">
                Quick Navigation
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    onNavigate({ type: 'home' });
                    setIsTopMenuOpen(false);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-[8px] border border-slate-100 hover:border-[#2A9D8F] hover:bg-[#F8EDD8]/30 text-left cursor-pointer transition-colors"
                >
                  <Home className="w-4 h-4 text-[#2A9D8F]" />
                  <span className="text-xs font-bold text-[#264653]">Home</span>
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
                  <span className="text-xs font-bold text-[#264653]">Explore</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate({ type: 'marketplace' });
                    setIsTopMenuOpen(false);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-[8px] border border-slate-100 hover:border-[#2A9D8F] hover:bg-[#F8EDD8]/30 text-left cursor-pointer transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-[#2A9D8F]" />
                  <span className="text-xs font-bold text-[#264653]">Marketplace</span>
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
                  <span className="text-xs font-bold text-[#264653]">Guide</span>
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
                  <span className="text-xs font-bold text-[#264653]">Plan Trip</span>
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
                  <span className="text-xs font-bold text-[#264653]">About 360</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate({ type: 'service-providers' });
                    setIsTopMenuOpen(false);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-[8px] border border-[#E76F51] bg-[#E76F51]/10 text-left cursor-pointer transition-colors"
                >
                  <HeartHandshake className="w-4 h-4 text-[#E76F51]" />
                  <span className="text-xs font-bold text-[#E76F51]">For Providers</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate({ type: 'contact' });
                    setIsTopMenuOpen(false);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-[8px] border border-slate-100 hover:border-[#2A9D8F] hover:bg-[#F8EDD8]/30 text-left cursor-pointer transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#2A9D8F]" />
                  <span className="text-xs font-bold text-[#264653]">Contact Us</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO CONTAINER */}
      <section className="relative overflow-hidden bg-[#264653] text-white py-14 sm:py-20 lg:py-24">
        {/* Coastal beach cafe background image with layered rich gradient */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80" 
            alt="Dahab coastal beach cafe" 
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105 transform hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#264653] via-[#264653]/90 to-[#264653]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#264653] via-transparent to-black/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            
            {/* Wooden-styled beach sign badge: "Local Businesses Stronger Dahab ♡" */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] bg-[#ECCE83]/90 text-[#264653] font-bold text-xs tracking-tight shadow-md border border-[#F8EDD8]/40">
              <Store className="w-3.5 h-3.5 text-[#E76F51]" />
              <span className="font-heading">Local Businesses Stronger Dahab ♡</span>
            </div>

            {/* Eyebrow label */}
            <div className="font-mono-tag text-xs sm:text-sm font-bold tracking-[0.2em] text-[#2A9D8F] uppercase">
              FOR SERVICE PROVIDERS
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white leading-[1.1]">
              Let&apos;s Grow Dahab Together
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-body leading-relaxed max-w-2xl">
              Reach travelers who are already looking for local services, experiences, and unique places.
            </p>

            {/* Action Button: Join as a Partner ↓ */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('partner-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-[12px] bg-[#E76F51] hover:bg-[#D65D3F] text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Join as a Partner</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SECTION: "WHO CAN JOIN?" (Category Icons Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-6 border-b border-slate-200">
          <div>
            <div className="text-[11px] font-mono-tag font-bold text-[#2A9D8F] uppercase tracking-wider mb-1">
              Community Ecosystem
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-[#264653]">
              Who Can Join?
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate({ type: 'directory' })}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2A9D8F] hover:text-[#238276] cursor-pointer group"
          >
            <span>See All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6-col clean cards with category icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 pt-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="bg-white rounded-[14px] border border-slate-200/90 p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-[#2A9D8F] transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-3">
                  <div className={`w-11 h-11 rounded-[10px] flex items-center justify-center border ${cat.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[#264653] font-heading leading-snug group-hover:text-[#2A9D8F] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-body leading-relaxed pt-1">
                      {cat.desc}
                    </p>
                  </div>
                </div>
                <div className="pt-2 text-[10px] font-mono-tag font-bold text-[#2A9D8F] flex items-center gap-1">
                  <span>Direct Inquiry Ready</span>
                  <CheckCircle2 className="w-3 h-3 text-[#2A9D8F]" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SECTION: 3 KEY VALUE BENEFITS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="text-[11px] font-mono-tag font-bold text-[#E76F51] uppercase tracking-wider mb-1">
            Why Partner With Dahab 360
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-[#264653]">
            Built Specifically for Local Sinai Businesses
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 pt-1.5 font-body">
            Direct connections with travelers, no high commission lock-ins, and true community visibility.
          </p>
        </div>

        {/* 3 Clean white cards (side-by-side on desktop, stacked on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Benefit 1: More Visibility */}
          <div className="bg-white rounded-[16px] border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-[12px] bg-[#2A9D8F]/10 text-[#2A9D8F] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black font-heading text-[#264653]">
                More Visibility
              </h3>
              <p className="text-sm text-slate-600 font-body leading-relaxed pt-2">
                Be seen by travelers searching for your service when they plan their Sinai adventure, book dive courses, or search for dining spots.
              </p>
            </div>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-1 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0" />
                <span>Featured in category directories & maps</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0" />
                <span>Included in custom trip planner itineraries</span>
              </li>
            </ul>
          </div>

          {/* Benefit 2: Qualified Leads */}
          <div className="bg-white rounded-[16px] border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-[12px] bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black font-heading text-[#264653]">
                Qualified Leads
              </h3>
              <p className="text-sm text-slate-600 font-body leading-relaxed pt-2">
                Receive direct inquiries on WhatsApp. Travelers reach out directly to your phone without confusing third-party aggregators or delays.
              </p>
            </div>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-1 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <span>Direct WhatsApp button on your profile</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <span>Instant inquiry without platform commission</span>
              </li>
            </ul>
          </div>

          {/* Benefit 3: Grow Your Business */}
          <div className="bg-white rounded-[16px] border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-[12px] bg-[#E76F51]/10 text-[#E76F51] flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black font-heading text-[#264653]">
                Grow Your Business
              </h3>
              <p className="text-sm text-slate-600 font-body leading-relaxed pt-2">
                Be part of a trusted platform that supports local businesses. Build lasting brand loyalty and authentic guest reviews from Dahab lovers.
              </p>
            </div>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-1 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E76F51] shrink-0" />
                <span>Verified Partner badge & perks guarantee</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E76F51] shrink-0" />
                <span>Collaborative promotions with Dahab Marketplace</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 4. SECTION: B2B PARTNER ONBOARDING FORM ("Send Your Details") */}
      <section id="partner-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20">
        <div className="bg-white rounded-[20px] border border-slate-200/90 shadow-md p-6 sm:p-10 relative overflow-hidden">
          
          <div className="mb-8 text-center sm:text-left border-b border-slate-100 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-[#2A9D8F]/10 text-[#2A9D8F] font-mono-tag font-bold text-xs uppercase mb-2">
              <HeartHandshake className="w-3.5 h-3.5" /> B2B Partner Onboarding
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-heading text-[#264653]">
              Send Your Details
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-body pt-1.5">
              Fill out the form and we&apos;ll get in touch with you.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-[#2A9D8F]/10 border border-[#2A9D8F]/30 rounded-[14px] p-6 sm:p-8 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-full bg-[#2A9D8F] text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold font-heading text-[#264653]">
                  WhatsApp Inquiry Prepared!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Your business details were formatted and opened in WhatsApp for the Dahab 360 team. If your chat didn&apos;t open automatically, use the button below.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-5 py-2.5 rounded-[8px] bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Reopen WhatsApp Chat</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-4 py-2.5 rounded-[8px] bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Submit Another Business
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* 2-Column Responsive Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                
                {/* Business Name * */}
                <div className="space-y-1.5">
                  <label htmlFor="business-name" className="block text-xs font-bold text-[#264653]">
                    Business Name <span className="text-[#E76F51]">*</span>
                  </label>
                  <input
                    id="business-name"
                    type="text"
                    required
                    placeholder="e.g. Blue Wave Dive"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-[8px] border text-xs sm:text-sm bg-slate-50/50 focus:bg-white focus:outline-none transition-colors ${
                      formErrors.businessName 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-slate-200 focus:border-[#2A9D8F]'
                    }`}
                  />
                  {formErrors.businessName && (
                    <p className="text-[11px] text-red-500">{formErrors.businessName}</p>
                  )}
                </div>

                {/* Business Type * (Dropdown) */}
                <div className="space-y-1.5">
                  <label htmlFor="business-type" className="block text-xs font-bold text-[#264653]">
                    Business Type <span className="text-[#E76F51]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="business-type"
                      required
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-[8px] border text-xs sm:text-sm bg-slate-50/50 focus:bg-white focus:outline-none transition-colors appearance-none cursor-pointer ${
                        formErrors.businessType 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-slate-200 focus:border-[#2A9D8F]'
                      }`}
                    >
                      <option value="">Select type...</option>
                      <option value="Hotel/Camp">Hotel / Camp</option>
                      <option value="Diving Center">Diving Center</option>
                      <option value="Restaurant/Cafe">Restaurant / Cafe</option>
                      <option value="Safari Operator">Safari Operator</option>
                      <option value="Spa/Wellness">Spa / Wellness</option>
                      <option value="Shop">Shop</option>
                      <option value="Transport">Transport</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {formErrors.businessType && (
                    <p className="text-[11px] text-red-500">{formErrors.businessType}</p>
                  )}
                </div>

                {/* Contact Person * */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-person" className="block text-xs font-bold text-[#264653]">
                    Contact Person <span className="text-[#E76F51]">*</span>
                  </label>
                  <input
                    id="contact-person"
                    type="text"
                    required
                    placeholder="Your name"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-[8px] border text-xs sm:text-sm bg-slate-50/50 focus:bg-white focus:outline-none transition-colors ${
                      formErrors.contactPerson 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-slate-200 focus:border-[#2A9D8F]'
                    }`}
                  />
                  {formErrors.contactPerson && (
                    <p className="text-[11px] text-red-500">{formErrors.contactPerson}</p>
                  )}
                </div>

                {/* WhatsApp / Phone * */}
                <div className="space-y-1.5">
                  <label htmlFor="phone-number" className="block text-xs font-bold text-[#264653]">
                    WhatsApp / Phone <span className="text-[#E76F51]">*</span>
                  </label>
                  <input
                    id="phone-number"
                    type="tel"
                    required
                    placeholder="+20 1XX XXX XXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-[8px] border text-xs sm:text-sm bg-slate-50/50 focus:bg-white focus:outline-none transition-colors ${
                      formErrors.phone 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-slate-200 focus:border-[#2A9D8F]'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-[11px] text-red-500">{formErrors.phone}</p>
                  )}
                </div>

                {/* Instagram (optional) */}
                <div className="space-y-1.5">
                  <label htmlFor="instagram" className="block text-xs font-bold text-[#264653]">
                    Instagram <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <input
                    id="instagram"
                    type="text"
                    placeholder="@username"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-slate-200 focus:border-[#2A9D8F] text-xs sm:text-sm bg-slate-50/50 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                {/* Website (optional) */}
                <div className="space-y-1.5">
                  <label htmlFor="website" className="block text-xs font-bold text-[#264653]">
                    Website <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <input
                    id="website"
                    type="url"
                    placeholder="https://www.example.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-slate-200 focus:border-[#2A9D8F] text-xs sm:text-sm bg-slate-50/50 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

              </div>

              {/* Short Description * with Character Counter */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="short-desc" className="block text-xs font-bold text-[#264653]">
                    Short Description <span className="text-[#E76F51]">*</span>
                  </label>
                  <span className={`text-[11px] font-mono-tag ${description.length >= 300 ? 'text-red-500 font-bold' : 'text-slate-400'}`}>
                    {description.length}/300
                  </span>
                </div>
                <textarea
                  id="short-desc"
                  required
                  rows={3}
                  maxLength={300}
                  placeholder="Tell us about your business, your services and what makes it special."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-[8px] border text-xs sm:text-sm bg-slate-50/50 focus:bg-white focus:outline-none transition-colors resize-none ${
                    formErrors.description 
                      ? 'border-red-400 focus:border-red-500' 
                      : 'border-slate-200 focus:border-[#2A9D8F]'
                  }`}
                />
                {formErrors.description && (
                  <p className="text-[11px] text-red-500">{formErrors.description}</p>
                )}
              </div>

              {/* CTA Button: "Send to Dahab 360 →" (Large green button with WhatsApp icon) */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 rounded-[12px] bg-[#25D366] hover:bg-[#20bd59] text-white font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2.5 group"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>Send to Dahab 360</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Trust disclaimer below button */}
              <div className="pt-3 flex items-start gap-2 text-slate-500 text-[11px] font-mono-tag leading-relaxed">
                <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  Your details will be saved and sent to Dahab 360 on WhatsApp for review. We&apos;ll get back to you as soon as possible.
                </span>
              </div>

            </form>
          )}

        </div>
      </section>

      {/* 5. CROSS-PROMO BANNER: Have products to sell? List your items on Dahab Marketplace */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20">
        <div className="bg-gradient-to-r from-[#264653] to-[#2A9D8F] rounded-[20px] p-6 sm:p-10 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Subtle background art */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left z-10">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[14px] overflow-hidden shrink-0 border-2 border-white/20 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=400&q=80" 
                alt="Dahab Marketplace goods" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-[#ECCE83]/20 text-[#ECCE83] font-mono-tag font-bold text-[10px] uppercase">
                Direct Local Selling
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
                Have products to sell?
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 font-body max-w-md">
                List your handmade crafts, diving equipment, kitesurf gear, and organic Sinai goods on Dahab Marketplace.
              </p>
            </div>
          </div>

          <div className="z-10 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onNavigate({ type: 'marketplace' })}
              className="w-full sm:w-auto px-6 py-3.5 rounded-[10px] bg-[#E76F51] hover:bg-[#D65D3F] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>Go to Marketplace</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
