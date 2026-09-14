import React, { useState } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  ChevronDown, 
  Menu, 
  X, 
  ShoppingCart, 
  CheckCircle2, 
  Compass, 
  ExternalLink, 
  Home, 
  BookOpen, 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake
} from 'lucide-react';
import { Currency, ViewRoute } from '../types';

interface ContactPageProps {
  currency: Currency;
  onToggleCurrency: () => void;
  language: 'EN' | 'AR';
  onToggleLanguage: () => void;
  onNavigate: (route: ViewRoute) => void;
  cartItemCount?: number;
  onOpenCart?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  currency,
  onToggleCurrency,
  language,
  onToggleLanguage,
  onNavigate,
  cartItemCount = 0,
  onOpenCart
}) => {
  const [isTopMenuOpen, setIsTopMenuOpen] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [topic, setTopic] = useState('General Question');
  const [message, setMessage] = useState('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Contact details
  const PHONE_DISPLAY = '+20 100 489 2211';
  const PHONE_TEL = '+201004892211';
  const EMAIL_SUPPORT = 'hello@dahab360.com';
  const WHATSAPP_NUMBER = '201004892211';

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { [key: string]: string } = {};
    if (!fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!contactInfo.trim()) errors.contactInfo = 'Please enter your email or WhatsApp number';
    if (!message.trim()) errors.message = 'Please type your message';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitted(true);
  };

  const handleSendViaWhatsApp = () => {
    const text = `Hello Dahab 360 Team!
• Name: ${fullName.trim() || 'Visitor'}
• Contact: ${contactInfo.trim() || 'N/A'}
• Topic: ${topic}
• Message:
${message.trim() || 'I would like to get in touch.'}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8EDD8]/40 pb-20">
      
      {/* Top Bar Header */}
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
              <span className="text-[10px] font-mono-tag font-bold text-[#2A9D8F] tracking-widest uppercase">
                COMMUNITY & SUPPORT
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
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
              className="px-2.5 py-1.5 rounded-[6px] hover:text-[#2A9D8F] transition-colors cursor-pointer"
            >
              For Providers
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'contact' })}
              className="px-2.5 py-1.5 rounded-[6px] text-[#2A9D8F] bg-white/70 font-bold shadow-2xs transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Right Controls: Cart, Hamburger */}
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

            {/* Hamburger Button */}
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
                  className="flex items-center gap-2 p-2.5 rounded-[8px] border border-slate-100 hover:border-[#2A9D8F] hover:bg-[#F8EDD8]/30 text-left cursor-pointer transition-colors"
                >
                  <HeartHandshake className="w-4 h-4 text-[#2A9D8F]" />
                  <span className="text-xs font-bold text-[#264653]">For Providers</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate({ type: 'contact' });
                    setIsTopMenuOpen(false);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-[8px] border border-[#2A9D8F] bg-[#2A9D8F]/10 text-left cursor-pointer transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#2A9D8F]" />
                  <span className="text-xs font-bold text-[#2A9D8F]">Contact Us</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#264653] text-white py-14 sm:py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80" 
            alt="Dahab coastal scenery" 
            className="w-full h-full object-cover object-center opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#264653] via-[#264653]/95 to-[#264653]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-[#2A9D8F]/20 text-[#2A9D8F] font-mono-tag font-bold text-xs uppercase border border-[#2A9D8F]/30">
              <Compass className="w-3.5 h-3.5" /> Local Sinai Support
            </div>
            
            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white leading-[1.1]">
              Get in Touch with Dahab 360
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-200 font-body leading-relaxed max-w-2xl">
              Have a question about your trip, a booking, or our platform? Our local team is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* 2. QUICK CONTACT CHANNELS (3 Highlight Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: [WhatsApp Concierge] */}
          <div className="bg-white rounded-[16px] border border-slate-200/90 p-6 sm:p-7 shadow-md hover:shadow-lg transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-[12px] bg-[#25D366]/10 text-[#25D366] flex items-center justify-center group-hover:scale-105 transition-transform">
                <MessageSquare className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="text-lg font-black font-heading text-[#264653]">
                  WhatsApp Concierge
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed pt-1.5">
                  Instant response for trip planning and active bookings.
                </p>
              </div>
            </div>
            
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Dahab 360 Concierge! I have a question about my trip.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-[10px] bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm text-center shadow-xs cursor-pointer inline-flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Card 2: [Direct Phone] */}
          <div className="bg-white rounded-[16px] border border-slate-200/90 p-6 sm:p-7 shadow-md hover:shadow-lg transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-[12px] bg-[#E76F51]/10 text-[#E76F51] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black font-heading text-[#264653]">
                  Direct Phone
                </h3>
                <div className="text-base font-bold font-mono-tag text-[#E76F51] pt-1">
                  {PHONE_DISPLAY}
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-body leading-relaxed pt-1">
                  Available daily from 9:00 AM to 10:00 PM (Cairo Time).
                </p>
              </div>
            </div>

            <a
              href={`tel:${PHONE_TEL}`}
              className="w-full py-3 px-4 rounded-[10px] bg-[#264653] hover:bg-[#1d353f] text-white font-bold text-xs sm:text-sm text-center shadow-xs cursor-pointer inline-flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Card 3: [Email Support] */}
          <div className="bg-white rounded-[16px] border border-slate-200/90 p-6 sm:p-7 shadow-md hover:shadow-lg transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-[12px] bg-[#2A9D8F]/10 text-[#2A9D8F] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black font-heading text-[#264653]">
                  Email Support
                </h3>
                <div className="text-base font-bold font-mono-tag text-[#2A9D8F] pt-1">
                  {EMAIL_SUPPORT}
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-body leading-relaxed pt-1">
                  For general inquiries, media and partnerships.
                </p>
              </div>
            </div>

            <a
              href={`mailto:${EMAIL_SUPPORT}`}
              className="w-full py-3 px-4 rounded-[10px] bg-[#2A9D8F] hover:bg-[#238276] text-white font-bold text-xs sm:text-sm text-center shadow-xs cursor-pointer inline-flex items-center justify-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Send Email</span>
            </a>
          </div>

        </div>
      </section>

      {/* 3. LOCATION & WORKING HOURS + 4. GENERAL CONTACT FORM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: LOCATION & WORKING HOURS (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Location Card */}
            <div className="bg-white rounded-[18px] border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-[#E76F51]/10 text-[#E76F51] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-[#264653]">
                    Dahab 360 Community Hub
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-body pt-1">
                    Dahab 360 Hub, Mashraba Promenade, Dahab, South Sinai, Egypt.
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono-tag pt-1">
                    Direct seaside promenade access, right next to Mashraba bay.
                  </p>
                </div>
              </div>

              {/* Embedded Map View */}
              <div className="w-full h-52 sm:h-60 rounded-[12px] overflow-hidden border border-slate-200 relative group bg-slate-100 shadow-inner">
                <iframe
                  title="Dahab 360 Location Map"
                  src="https://maps.google.com/maps?q=Mashraba%2C%20Dahab%2C%20South%20Sinai%2C%20Egypt&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
                <div className="absolute bottom-2 right-2 z-10">
                  <a
                    href="https://maps.google.com/?q=Mashraba+Dahab+South+Sinai+Egypt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-white/95 text-[#264653] font-bold text-[11px] shadow-sm hover:bg-[#2A9D8F] hover:text-white transition-colors"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Office Hours Card */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#264653]">
                    <Clock className="w-4 h-4 text-[#2A9D8F]" />
                    <span>Office Working Hours</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold font-mono-tag text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Open Today
                  </span>
                </div>
                <div className="text-xs text-slate-600 font-mono-tag space-y-1 bg-slate-50 p-3 rounded-[8px] border border-slate-100">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-700">Saturday – Thursday:</span>
                    <span>9:00 AM – 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-700">Friday:</span>
                    <span>1:00 PM – 9:00 PM</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT: GENERAL CONTACT FORM (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[18px] border border-slate-200/90 p-6 sm:p-8 shadow-xs">
              
              <div className="mb-6 pb-4 border-b border-slate-100">
                <h2 className="text-2xl sm:text-3xl font-black font-heading text-[#264653]">
                  Send us a Message
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-body pt-1">
                  Have a special request or feedback? We&apos;d love to hear from you.
                </p>
              </div>

              {isSubmitted ? (
                <div className="bg-[#2A9D8F]/10 border border-[#2A9D8F]/30 rounded-[14px] p-6 sm:p-8 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#2A9D8F] text-white flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold font-heading text-[#264653]">
                      Message Received!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                      Thank you, <span className="font-bold text-[#264653]">{fullName}</span>. Our local team will respond to your message shortly.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleSendViaWhatsApp}
                      className="px-4 py-2.5 rounded-[8px] bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>Forward to WhatsApp for Fast Response</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFullName('');
                        setContactInfo('');
                        setMessage('');
                        setIsSubmitted(false);
                      }}
                      className="px-4 py-2.5 rounded-[8px] bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  {/* Full Name * */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-full-name" className="block text-xs font-bold text-[#264653]">
                      Full Name <span className="text-[#E76F51]">*</span>
                    </label>
                    <input
                      id="contact-full-name"
                      type="text"
                      required
                      placeholder="e.g. Sarah Connor"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-[8px] border text-xs sm:text-sm bg-slate-50/50 focus:bg-white focus:outline-none transition-colors ${
                        formErrors.fullName 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-slate-200 focus:border-[#2A9D8F]'
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="text-[11px] text-red-500">{formErrors.fullName}</p>
                    )}
                  </div>

                  {/* Email / WhatsApp * */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email-whatsapp" className="block text-xs font-bold text-[#264653]">
                      Email / WhatsApp <span className="text-[#E76F51]">*</span>
                    </label>
                    <input
                      id="contact-email-whatsapp"
                      type="text"
                      required
                      placeholder="e.g. sarah@example.com or +20 1XX XXX XXXX"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-[8px] border text-xs sm:text-sm bg-slate-50/50 focus:bg-white focus:outline-none transition-colors ${
                        formErrors.contactInfo 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-slate-200 focus:border-[#2A9D8F]'
                      }`}
                    />
                    {formErrors.contactInfo && (
                      <p className="text-[11px] text-red-500">{formErrors.contactInfo}</p>
                    )}
                  </div>

                  {/* Topic Dropdown */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-topic" className="block text-xs font-bold text-[#264653]">
                      Topic
                    </label>
                    <div className="relative">
                      <select
                        id="contact-topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-[8px] border border-slate-200 focus:border-[#2A9D8F] text-xs sm:text-sm bg-slate-50/50 focus:bg-white focus:outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="General Question">General Question</option>
                        <option value="My Dahab Plan Inquiry">My Dahab Plan Inquiry</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Report an Issue">Report an Issue</option>
                        <option value="Partner or Collaboration">Partner or Collaboration</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Message * */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="block text-xs font-bold text-[#264653]">
                      Message <span className="text-[#E76F51]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      placeholder="How can we assist you with Dahab 360?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-[8px] border text-xs sm:text-sm bg-slate-50/50 focus:bg-white focus:outline-none transition-colors resize-none ${
                        formErrors.message 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-slate-200 focus:border-[#2A9D8F]'
                      }`}
                    />
                    {formErrors.message && (
                      <p className="text-[11px] text-red-500">{formErrors.message}</p>
                    )}
                  </div>

                  {/* Submit Button: Primary Teal #2A9D8F */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-7 py-3 rounded-[10px] bg-[#2A9D8F] hover:bg-[#238276] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 group"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
