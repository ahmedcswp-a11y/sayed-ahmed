import React, { useState } from 'react';
import { 
  Compass, 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  MapPin, 
  MessageCircle, 
  Users, 
  ListChecks, 
  Binoculars, 
  SlidersHorizontal, 
  Sparkles, 
  ChevronDown, 
  Globe, 
  Menu, 
  X, 
  Heart, 
  Leaf, 
  Building2, 
  Store, 
  ChevronRight, 
  Waves, 
  Home as HomeIcon, 
  Utensils, 
  Mountain, 
  Flower2, 
  ShoppingCart, 
  ExternalLink,
  Search,
  Mail,
  Calendar,
  BookOpen
} from 'lucide-react';
import { Currency, ViewRoute, OfficialCategory } from '../types';

interface AboutPageProps {
  currency: Currency;
  onToggleCurrency: () => void;
  language: 'EN' | 'AR';
  onToggleLanguage: () => void;
  onNavigate: (route: ViewRoute) => void;
  cartItemCount?: number;
  onOpenCart?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  currency,
  onToggleCurrency,
  language,
  onToggleLanguage,
  onNavigate,
  cartItemCount = 0,
  onOpenCart
}) => {
  const [isTopMenuOpen, setIsTopMenuOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [partnerFormData, setPartnerFormData] = useState({
    businessName: '',
    category: 'Experiences & Diving',
    contactPerson: '',
    phone: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // WhatsApp concierge numbers
  const WHATSAPP_PHONE = '201004892211';

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello Dahab 360 Team, I want to partner with Dahab 360:\n\nBusiness: ${partnerFormData.businessName}\nCategory: ${partnerFormData.category}\nContact: ${partnerFormData.contactPerson}\nPhone: ${partnerFormData.phone}\nNotes: ${partnerFormData.notes || 'Looking forward to listing our services on Dahab 360.'}`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`, '_blank');
    setIsSubmitted(true);
    setTimeout(() => {
      setIsPartnerModalOpen(false);
      setIsSubmitted(false);
      setPartnerFormData({
        businessName: '',
        category: 'Experiences & Diving',
        contactPerson: '',
        phone: '',
        notes: ''
      });
    }, 2000);
  };

  const categories = [
    {
      title: 'Diving & Water Activities',
      officialCategory: 'Experiences & Diving' as OfficialCategory,
      count: '32+ Centers & Reefs',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
      tag: 'Blue Hole & Canyon'
    },
    {
      title: 'Accommodation',
      officialCategory: 'Stays & Camps' as OfficialCategory,
      count: '45+ Camps & Stays',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
      tag: 'Seafront & Desert'
    },
    {
      title: 'Restaurants & Cafes',
      officialCategory: 'Restaurants & Cafes' as OfficialCategory,
      count: '60+ Local Spots',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
      tag: 'Bedouin & Seafood'
    },
    {
      title: 'Trips & Safari',
      officialCategory: 'Trips & Safari' as OfficialCategory,
      count: '18+ Treks & Canyons',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
      tag: 'Sinai Mountains'
    },
    {
      title: 'Beauty, Spa & Wellness',
      officialCategory: 'Wellness & Health' as OfficialCategory,
      count: '14+ Yoga & Healing',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
      tag: 'Sound Healing & Massage'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8EDD8] text-[#264653] font-sans pb-24 selection:bg-[#2A9D8F] selection:text-white">
      
      {/* =========================================================================
          1. HEADER & HERO BANNER
      ========================================================================= */}
      <header className="relative bg-[#264653] text-white">
        
        {/* Top bar */}
        <div className="border-b border-white/10 bg-[#264653]/95 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between">
            
            {/* Logo */}
            <div 
              onClick={() => onNavigate({ type: 'home' })}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-[6px] bg-gradient-to-tr from-[#2A9D8F] to-[#E76F51] flex items-center justify-center font-bold text-xs text-white shadow-xs group-hover:scale-105 transition-transform">
                360
              </div>
              <span className="font-extrabold text-lg text-white font-heading tracking-tight">
                DAHAB <span className="text-[#2A9D8F]">360</span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-200">
              <button 
                type="button" 
                onClick={() => onNavigate({ type: 'home' })}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
              <button 
                type="button" 
                onClick={() => onNavigate({ type: 'directory' })}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Explore
              </button>
              <button 
                type="button" 
                onClick={() => onNavigate({ type: 'marketplace' })}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Marketplace
              </button>
              <button 
                type="button" 
                onClick={() => onNavigate({ type: 'guide' })}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Guide
              </button>
              <button 
                type="button" 
                onClick={() => onNavigate({ type: 'planner' })}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Plan
              </button>
              <button 
                type="button" 
                onClick={() => onNavigate({ type: 'about' })}
                className="text-[#2A9D8F] font-bold transition-colors cursor-pointer"
              >
                About
              </button>
            </nav>

            {/* Right Controls: Cart & Hamburger Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Cart Button */}
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
                className="p-1.5 rounded-[6px] bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer lg:hidden"
                aria-label="Toggle navigation menu"
              >
                {isTopMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isTopMenuOpen && (
          <div className="lg:hidden bg-[#264653] border-b border-white/15 px-4 py-4 space-y-2.5 animate-in slide-in-from-top-4 duration-200">
            <button
              type="button"
              onClick={() => {
                setIsTopMenuOpen(false);
                onNavigate({ type: 'home' });
              }}
              className="w-full text-left py-2 px-3 rounded-[6px] hover:bg-white/10 text-sm font-medium flex items-center justify-between text-white"
            >
              <span className="flex items-center gap-2">
                <HomeIcon className="w-4 h-4 text-[#2A9D8F]" />
                <span>Home</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsTopMenuOpen(false);
                onNavigate({ type: 'directory' });
              }}
              className="w-full text-left py-2 px-3 rounded-[6px] hover:bg-white/10 text-sm font-medium flex items-center justify-between text-white"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#2A9D8F]" />
                <span>Explore Directory</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsTopMenuOpen(false);
                onNavigate({ type: 'marketplace' });
              }}
              className="w-full text-left py-2 px-3 rounded-[6px] hover:bg-white/10 text-sm font-medium flex items-center justify-between text-white"
            >
              <span className="flex items-center gap-2">
                <Store className="w-4 h-4 text-[#E76F51]" />
                <span>Dahab Marketplace</span>
              </span>
              <span className="text-[10px] bg-[#E76F51] text-white px-2 py-0.5 rounded-full font-bold">New</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsTopMenuOpen(false);
                onNavigate({ type: 'guide' });
              }}
              className="w-full text-left py-2 px-3 rounded-[6px] hover:bg-white/10 text-sm font-medium flex items-center justify-between text-white"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#2A9D8F]" />
                <span>Dahab Guide</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsTopMenuOpen(false);
                onNavigate({ type: 'planner' });
              }}
              className="w-full text-left py-2 px-3 rounded-[6px] hover:bg-white/10 text-sm font-medium flex items-center justify-between text-white"
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#2A9D8F]" />
                <span>Plan & Itinerary</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsTopMenuOpen(false);
                onNavigate({ type: 'about' });
              }}
              className="w-full text-left py-2 px-3 rounded-[6px] bg-[#2A9D8F]/20 text-[#2A9D8F] font-bold text-sm flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#2A9D8F]" />
                <span>About Dahab 360</span>
              </span>
              <span className="text-[10px] font-mono-tag">Current</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsTopMenuOpen(false);
                onNavigate({ type: 'service-providers' });
              }}
              className="w-full text-left py-2 px-3 rounded-[6px] hover:bg-white/10 text-sm font-medium flex items-center justify-between text-white"
            >
              <span className="flex items-center gap-2">
                <Store className="w-4 h-4 text-[#E76F51]" />
                <span>For Service Providers</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsTopMenuOpen(false);
                onNavigate({ type: 'contact' });
              }}
              className="w-full text-left py-2 px-3 rounded-[6px] hover:bg-white/10 text-sm font-medium flex items-center justify-between text-white"
            >
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#2A9D8F]" />
                <span>Contact Us</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        )}

        {/* Hero Container with Cinematic Red Sea & Mountain Background */}
        <div className="relative min-h-[440px] sm:min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=85')`
            }}
          />
          {/* Authentic Warm Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#264653]/90 via-[#264653]/80 to-[#264653]/95" />

          {/* Rustic Wooden Beach Sign Mockup / Visual Stamp */}
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center space-y-5">
            
            {/* Wooden Beach Sign Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F8EDD8]/90 text-[#264653] text-xs sm:text-sm font-mono-tag font-bold shadow-md border border-[#ECCE83]/50">
              <span>Same Dahab More to Explore</span>
              <Heart className="w-3.5 h-3.5 fill-[#E76F51] text-[#E76F51]" />
            </div>

            {/* Eyebrow Label */}
            <div className="text-[11px] sm:text-xs font-mono-tag uppercase tracking-[0.2em] font-bold text-[#2A9D8F]">
              ABOUT DAHAB 360
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-white leading-tight">
              Your Local Connection <br className="hidden sm:inline" />
              to Dahab
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-xl mx-auto leading-relaxed font-normal">
              We help you discover, compare and connect with trusted local experiences and services in Dahab.
            </p>

            {/* Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate({ type: 'directory' })}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-[8px] bg-[#E76F51] hover:bg-[#d85e40] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Dahab</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 space-y-14 sm:space-y-18 py-10 sm:py-14">

        {/* =========================================================================
            2. SECTION 1: "WHAT IS DAHAB 360?" (3-Step Value Chain)
        ========================================================================= */}
        <section aria-labelledby="what-is-dahab-360-heading">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
            <h2 id="what-is-dahab-360-heading" className="text-2xl sm:text-3xl font-extrabold font-heading text-[#264653] tracking-tight">
              What is Dahab 360?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              A tourism and local services platform that brings together everything you need for your Dahab stay — in one place.
            </p>
          </div>

          {/* 3 Step Cards Connected by Clean Arrows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 relative">
            
            {/* Step 1: Discover */}
            <div className="bg-white rounded-[14px] border border-slate-200/90 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-[10px] bg-[#2A9D8F]/15 text-[#2A9D8F] flex items-center justify-center">
                    <Binoculars className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono-tag font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-[6px]">
                    Step 01
                  </span>
                </div>
                <h3 className="text-lg font-bold font-heading text-[#264653]">
                  Discover
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Explore the best activities, places and services in Dahab.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#2A9D8F] font-mono-tag">
                <span>Stays, Dives, Cafes & Treks</span>
              </div>
            </div>

            {/* Step 2: Choose */}
            <div className="bg-white rounded-[14px] border border-slate-200/90 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-[10px] bg-[#E76F51]/15 text-[#E76F51] flex items-center justify-center">
                    <SlidersHorizontal className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono-tag font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-[6px]">
                    Step 02
                  </span>
                </div>
                <h3 className="text-lg font-bold font-heading text-[#264653]">
                  Choose
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Compare options and find what fits your style, time and budget.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#E76F51] font-mono-tag">
                <span>Filtered, Transparent & Curated</span>
              </div>
            </div>

            {/* Step 3: Connect */}
            <div className="bg-white rounded-[14px] border border-slate-200/90 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-[10px] bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 fill-current" />
                  </div>
                  <span className="text-xs font-mono-tag font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-[6px]">
                    Step 03
                  </span>
                </div>
                <h3 className="text-lg font-bold font-heading text-[#264653]">
                  Connect
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Contact local providers directly or book through Dahab 360.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-600 font-mono-tag">
                <span>Direct WhatsApp & Sinai Concierge</span>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            3. SECTION 2: "WHY DAHAB 360?" (5 Trust Pillars)
        ========================================================================= */}
        <section aria-labelledby="why-dahab-360-heading">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
            <h2 id="why-dahab-360-heading" className="text-2xl sm:text-3xl font-extrabold font-heading text-[#264653] tracking-tight">
              Why Dahab 360?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              More than a guide — we make it easier, simpler and more reliable.
            </p>
          </div>

          {/* 5 Compact Trust Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            
            {/* Pillar 1: Local Knowledge */}
            <div className="bg-white rounded-[12px] border border-slate-200/90 p-4 sm:p-5 shadow-2xs hover:border-[#2A9D8F] transition-colors space-y-2.5">
              <div className="w-10 h-10 rounded-[8px] bg-[#2A9D8F]/15 text-[#2A9D8F] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-heading text-[#264653] leading-snug">
                Local Knowledge
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Real insights from people who know Dahab.
              </p>
            </div>

            {/* Pillar 2: Reviewed Listings */}
            <div className="bg-white rounded-[12px] border border-slate-200/90 p-4 sm:p-5 shadow-2xs hover:border-[#2A9D8F] transition-colors space-y-2.5">
              <div className="w-10 h-10 rounded-[8px] bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-heading text-[#264653] leading-snug">
                Reviewed Listings
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Carefully curated and checked by our team.
              </p>
            </div>

            {/* Pillar 3: Clear Options */}
            <div className="bg-white rounded-[12px] border border-slate-200/90 p-4 sm:p-5 shadow-2xs hover:border-[#2A9D8F] transition-colors space-y-2.5">
              <div className="w-10 h-10 rounded-[8px] bg-[#E76F51]/15 text-[#E76F51] flex items-center justify-center">
                <ListChecks className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-heading text-[#264653] leading-snug">
                Clear Options
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Compare and choose with confidence.
              </p>
            </div>

            {/* Pillar 4: Direct Contact */}
            <div className="bg-white rounded-[12px] border border-slate-200/90 p-4 sm:p-5 shadow-2xs hover:border-[#2A9D8F] transition-colors space-y-2.5">
              <div className="w-10 h-10 rounded-[8px] bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 fill-current" />
              </div>
              <h3 className="text-sm font-bold font-heading text-[#264653] leading-snug">
                Direct Contact
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Easy WhatsApp communication.
              </p>
            </div>

            {/* Pillar 5: Booking Support */}
            <div className="col-span-2 sm:col-span-1 bg-white rounded-[12px] border border-slate-200/90 p-4 sm:p-5 shadow-2xs hover:border-[#2A9D8F] transition-colors space-y-2.5">
              <div className="w-10 h-10 rounded-[8px] bg-sky-50 text-sky-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-heading text-[#264653] leading-snug">
                Booking Support
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Get help when you need it.
              </p>
            </div>

          </div>
        </section>

        {/* =========================================================================
            4. SECTION 3: "MORE THAN ACTIVITIES" (Category Highlights)
        ========================================================================= */}
        <section aria-labelledby="more-than-activities-heading">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 sm:mb-8">
            <div>
              <h2 id="more-than-activities-heading" className="text-2xl sm:text-3xl font-extrabold font-heading text-[#264653] tracking-tight">
                More Than Activities
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Dahab 360 covers all parts of your trip.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'directory' })}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2A9D8F] hover:text-[#238276] font-mono-tag cursor-pointer transition-colors shrink-0"
            >
              <span>See All Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 5 Visual Category Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {categories.map((cat, index) => (
              <div
                key={index}
                onClick={() => onNavigate({ type: 'directory', officialCategory: cat.officialCategory })}
                className="group relative bg-white rounded-[14px] overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col"
              >
                {/* Image Container */}
                <div className="h-36 sm:h-40 w-full overflow-hidden relative">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#264653]/90 via-transparent to-black/20" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-[4px] bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono-tag">
                    {cat.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-1.5">
                  <h3 className="text-xs sm:text-sm font-bold font-heading text-[#264653] group-hover:text-[#2A9D8F] transition-colors leading-snug line-clamp-1">
                    {cat.title}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono-tag pt-1 border-t border-slate-100">
                    <span>{cat.count}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#2A9D8F] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            5. SECTION 4: COMMUNITY & SUSTAINABILITY BANNER
        ========================================================================= */}
        <section aria-labelledby="community-sustainability-heading" className="overflow-hidden rounded-[16px] bg-[#264653] text-white relative shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Image side */}
            <div className="lg:col-span-5 h-56 sm:h-72 lg:h-full relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=1200&q=80"
                alt="Bedouin crafts and local marketplace"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/50 via-transparent to-[#264653]" />
            </div>

            {/* Text side */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono-tag font-bold">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sustainable Tourism & Fair Sinai Trade</span>
              </div>

              <h2 id="community-sustainability-heading" className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-white tracking-tight leading-snug">
                Supporting Dahab's Local Community
              </h2>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                We work with local businesses, guides, creators and service providers to support sustainable tourism and help Dahab grow — for visitors and locals.
              </p>

              {/* Brand Badge on the right */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] bg-white/10 backdrop-blur-xs border border-white/20 text-xs font-mono-tag font-bold text-white">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <Leaf className="w-3.5 h-3.5" />
                  </div>
                  <span>Local People Stronger Dahab</span>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'marketplace' })}
                  className="text-xs font-bold text-[#F8EDD8] hover:text-white underline font-mono-tag cursor-pointer"
                >
                  Explore Dahab Marketplace →
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            6. SECTION 5: DUAL CALL-TO-ACTION CARDS (Visitor vs Business)
        ========================================================================= */}
        <section aria-labelledby="dual-cta-heading">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Card A: Traveler CTA */}
            <div className="bg-white rounded-[16px] overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="h-44 sm:h-48 w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                  alt="Palm trees & beach sign Good People Great Places"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-[6px] bg-[#F8EDD8] text-[#264653] text-[10px] font-mono-tag font-bold">
                    For Travelers & Explorers
                  </span>
                  <span className="text-white text-xs font-mono-tag font-semibold">
                    Good People Great Places
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold font-heading text-[#264653]">
                    Ready to discover Dahab?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Explore the best experiences, places and services.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigate({ type: 'directory' })}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[8px] bg-[#E76F51] hover:bg-[#d85e40] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Explore Dahab</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card B: B2B Provider CTA */}
            <div className="bg-white rounded-[16px] overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="h-44 sm:h-48 w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?auto=format&fit=crop&w=800&q=80"
                  alt="Friendly local Sinai Bedouin guide"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-[6px] bg-[#2A9D8F] text-white text-[10px] font-mono-tag font-bold">
                    For Local Service Providers
                  </span>
                  <span className="text-white text-xs font-mono-tag font-semibold">
                    Dahab Business Network
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold font-heading text-[#264653]">
                    Are you a local business?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Join Dahab 360 and reach more travelers. Let's grow together.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigate({ type: 'service-providers' })}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[8px] bg-[#264653] hover:bg-[#1f3741] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Partner with us</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            7. FOOTER SLOGAN & BRAND EMBLEM
        ========================================================================= */}
        <section className="py-6 border-t border-slate-200 text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono-tag uppercase tracking-widest text-[#2A9D8F] font-bold">
            <Compass className="w-4 h-4 text-[#2A9D8F]" />
            <span>AUTHENTIC SOUTH SINAI HOSPITALITY</span>
          </div>
          <p className="text-base sm:text-lg font-bold font-heading text-[#264653]">
            Dahab 360 — Same Dahab. More to Explore.
          </p>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Connecting curious travelers to the soul, sea, and mountains of Dahab.
          </p>
        </section>

      </main>

      {/* =========================================================================
          PARTNER ONBOARDING MODAL
      ========================================================================= */}
      {isPartnerModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsPartnerModalOpen(false)}
        >
          <div 
            className="bg-white rounded-[16px] max-w-lg w-full p-6 shadow-2xl space-y-5 text-[#264653] relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="text-[10px] font-mono-tag text-[#2A9D8F] font-bold uppercase tracking-wider">
                  SERVICE PROVIDER PARTNERSHIP
                </div>
                <h3 className="text-lg font-bold font-heading text-[#264653]">
                  List Your Business on Dahab 360
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPartnerModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#264653]">Message Prepared!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Redirecting to WhatsApp to connect with our local business coordinator...
                </p>
              </div>
            ) : (
              <form onSubmit={handlePartnerSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Business / Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Sinai Blue Divers, Sea Breeze Camp, etc."
                    value={partnerFormData.businessName}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, businessName: e.target.value })}
                    className="w-full px-3 py-2 rounded-[6px] border border-slate-200 focus:outline-none focus:border-[#2A9D8F]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={partnerFormData.category}
                      onChange={(e) => setPartnerFormData({ ...partnerFormData, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-[6px] border border-slate-200 focus:outline-none focus:border-[#2A9D8F] bg-white"
                    >
                      <option value="Experiences & Diving">Diving & Water Activities</option>
                      <option value="Stays & Camps">Accommodation & Stays</option>
                      <option value="Restaurants & Cafes">Restaurants & Cafes</option>
                      <option value="Trips & Safari">Trips & Desert Safari</option>
                      <option value="Wellness & Health">Wellness & Spa</option>
                      <option value="Marketplace Seller">Marketplace Seller / Crafts</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={partnerFormData.contactPerson}
                      onChange={(e) => setPartnerFormData({ ...partnerFormData, contactPerson: e.target.value })}
                      className="w-full px-3 py-2 rounded-[6px] border border-slate-200 focus:outline-none focus:border-[#2A9D8F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+20 10... or local number"
                    value={partnerFormData.phone}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-[6px] border border-slate-200 focus:outline-none focus:border-[#2A9D8F]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Short Description / Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us what you offer and where in Dahab you are located..."
                    value={partnerFormData.notes}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-[6px] border border-slate-200 focus:outline-none focus:border-[#2A9D8F] resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsPartnerModalOpen(false)}
                    className="px-4 py-2 rounded-[6px] text-slate-500 hover:bg-slate-100 font-bold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-[8px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Submit & Open WhatsApp</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
