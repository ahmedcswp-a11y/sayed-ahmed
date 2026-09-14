import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Clock, 
  Heart, 
  Share2, 
  Gift, 
  Phone, 
  MessageCircle, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Sparkles,
  Wifi,
  Waves,
  Coffee,
  Check,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Images,
  X,
  ChevronLeft
} from 'lucide-react';
import { Listing, Currency, ViewRoute } from '../types';
import { formatPrice, MOCK_REVIEWS } from '../data/mockData';

interface ListingPageProps {
  listing: Listing;
  currency: Currency;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onBookNow: (listing: Listing) => void;
  onNavigate: (route: ViewRoute) => void;
}

export const ListingPage: React.FC<ListingPageProps> = ({
  listing,
  currency,
  isFavorite,
  onToggleFavorite,
  onBookNow,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'photos' | 'amenities' | 'location' | 'reviews'>('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [isModalGalleryOpen, setIsModalGalleryOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const openFullscreenGallery = (index: number) => {
    setModalImageIndex(index);
    setIsModalGalleryOpen(true);
  };

  const nextModalImage = () => {
    setModalImageIndex((prev) => (prev + 1) % listing.images.length);
  };

  const prevModalImage = () => {
    setModalImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  const scrollToSection = (sectionId: string, tab: 'overview' | 'photos' | 'amenities' | 'location' | 'reviews') => {
    setActiveTab(tab);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="pb-24 sm:pb-20">
      
      {/* 1. HERO GALLERY SECTION (Massive edge-to-edge / desktop gallery mosaic) */}
      <div className="relative bg-[#264653] overflow-hidden">
        {/* Breadcrumbs inside Hero Top */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 relative z-20">
          <nav className="flex items-center gap-1.5 text-xs text-slate-300 font-mono-tag">
            <button 
              type="button" 
              onClick={() => onNavigate({ type: 'home' })}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-slate-500">/</span>
            <button 
              type="button" 
              onClick={() => onNavigate({ type: 'directory', category: listing.type })}
              className="capitalize hover:text-white transition-colors cursor-pointer"
            >
              {listing.type === 'stay' ? 'Stays' : listing.type === 'dining' ? 'Dining' : 'Experiences'}
            </button>
            <span className="text-slate-500">/</span>
            <span className="text-[#ECCE83] font-medium truncate max-w-[200px]">{listing.name}</span>
          </nav>
        </div>

        {/* Hero Gallery Grid Mosaic: 1 Large Primary + 4 Secondary Photos */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 relative">
          
          {/* Desktop Mosaic Layout */}
          <div className="hidden md:grid md:grid-cols-4 gap-2.5 h-[440px] relative rounded-[12px] overflow-hidden">
            {/* Primary Large Image (Left half) */}
            <div 
              onClick={() => openFullscreenGallery(0)}
              className="md:col-span-2 relative h-full cursor-pointer group overflow-hidden"
            >
              <img
                src={listing.images[0]}
                alt={listing.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Right Column 1 (2 stacked photos) */}
            <div className="flex flex-col gap-2.5 h-full">
              {listing.images.slice(1, 3).map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => openFullscreenGallery(idx + 1)}
                  className="flex-1 relative cursor-pointer group overflow-hidden"
                >
                  <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>

            {/* Right Column 2 (2 stacked photos) */}
            <div className="flex flex-col gap-2.5 h-full relative">
              {listing.images.slice(3, 5).map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => openFullscreenGallery(idx + 3)}
                  className="flex-1 relative cursor-pointer group overflow-hidden"
                >
                  <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
              ))}

              {/* View All Photos Button in Corner */}
              <button
                type="button"
                onClick={() => openFullscreenGallery(0)}
                className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-[#264653] px-3.5 py-2 rounded-[6px] text-xs font-bold font-mono-tag flex items-center gap-1.5 shadow-md backdrop-blur-md cursor-pointer transition-all border border-slate-200"
              >
                <Images className="w-4 h-4 text-[#2A9D8F]" />
                <span>View all {listing.images.length} photos</span>
              </button>
            </div>
          </div>

          {/* Mobile Image Carousel */}
          <div className="md:hidden relative h-[300px] rounded-[10px] overflow-hidden">
            <img
              src={listing.images[selectedImageIndex] || listing.images[0]}
              alt={listing.name}
              className="w-full h-full object-cover"
            />
            {/* Counter Badge */}
            <button
              type="button"
              onClick={() => openFullscreenGallery(selectedImageIndex)}
              className="absolute bottom-3 right-3 bg-black/70 text-white px-2.5 py-1 rounded-[4px] text-xs font-mono-tag flex items-center gap-1"
            >
              <Images className="w-3.5 h-3.5 text-[#ECCE83]" />
              <span>{selectedImageIndex + 1} / {listing.images.length} Photos</span>
            </button>

            {/* Mobile Thumbnails Scroll */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 overflow-x-auto max-w-[200px] p-1 bg-black/40 rounded-[6px] backdrop-blur-xs">
              {listing.images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImageIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    selectedImageIndex === i ? 'bg-[#2A9D8F] scale-110' : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 2. OVERLAPPING LISTING HEADER BOX (Section 31) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-30">
        <div className="bg-white rounded-[12px] border border-slate-200/90 shadow-md p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5">
          
          {/* Left Side: Avatar + Details */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white bg-white shadow-sm overflow-hidden shrink-0">
              <img src={listing.logo} alt={`${listing.name} logo`} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono-tag text-[11px] font-bold text-[#2A9D8F] uppercase tracking-wider bg-[#2A9D8F]/10 px-2 py-0.5 rounded-[4px]">
                  {listing.category}
                </span>
                {listing.isPartner && (
                  <span className="font-mono-tag text-[11px] font-bold text-white bg-[#E76F51] px-2 py-0.5 rounded-[4px] flex items-center gap-1 shadow-xs">
                    <Sparkles className="w-3 h-3" /> Dahab 360 Partner
                  </span>
                )}
                {listing.tags && listing.tags.map((tag, i) => (
                  <span key={i} className="hidden sm:inline-block font-mono-tag text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-[4px]">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#264653] tracking-tight font-heading">
                {listing.name}
              </h1>

              <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#E76F51]" />
                  {listing.area}, Dahab
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1 font-semibold text-[#264653]">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  {listing.rating.toFixed(2)} ({listing.reviewCount} reviews)
                </span>
                <span className="text-slate-300">•</span>
                <span className="font-mono-tag text-[11px] text-slate-500">
                  {listing.priceLevel || '$$'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Primary Book Now + Save & Share */}
          <div className="flex items-center gap-2.5 self-end md:self-center shrink-0">
            <button
              type="button"
              onClick={() => onToggleFavorite(listing.id)}
              aria-label="Save listing"
              className={`p-2.5 rounded-[8px] border transition-colors cursor-pointer ${
                isFavorite 
                  ? 'bg-rose-50 border-rose-200 text-[#E76F51]' 
                  : 'bg-white border-slate-200 text-slate-500 hover:text-[#264653]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#E76F51]' : ''}`} />
            </button>

            <button
              type="button"
              onClick={handleShare}
              aria-label="Share listing"
              className="p-2.5 rounded-[8px] bg-white border border-slate-200 text-slate-500 hover:text-[#264653] transition-colors cursor-pointer relative"
            >
              <Share2 className="w-4 h-4" />
              {copiedShare && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#264653] text-white text-[10px] font-mono-tag px-2 py-0.5 rounded-[4px] whitespace-nowrap">
                  Link Copied!
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => onBookNow(listing)}
              className="bg-[#2A9D8F] hover:bg-[#238276] active:bg-[#1d6b61] text-white px-5 sm:px-6 py-2.5 rounded-[8px] text-xs sm:text-sm font-bold tracking-wide transition-all shadow-xs cursor-pointer whitespace-nowrap"
            >
              Book Now
            </button>
          </div>

        </div>
      </div>

      {/* 3. STICKY TAB BAR (Section 32) */}
      <div className="sticky top-16 z-30 bg-[#F8EDD8]/95 backdrop-blur-md border-b border-slate-200/80 my-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar text-xs font-bold uppercase font-mono-tag">
            <button
              type="button"
              onClick={() => scrollToSection('section-overview', 'overview')}
              className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'overview' ? 'border-[#2A9D8F] text-[#2A9D8F]' : 'border-transparent text-slate-500 hover:text-[#264653]'
              }`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('section-photos', 'photos')}
              className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'photos' ? 'border-[#2A9D8F] text-[#2A9D8F]' : 'border-transparent text-slate-500 hover:text-[#264653]'
              }`}
            >
              Photo Gallery ({listing.images.length})
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('section-amenities', 'amenities')}
              className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'amenities' ? 'border-[#2A9D8F] text-[#2A9D8F]' : 'border-transparent text-slate-500 hover:text-[#264653]'
              }`}
            >
              Amenities & Perks
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('section-location', 'location')}
              className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'location' ? 'border-[#2A9D8F] text-[#2A9D8F]' : 'border-transparent text-slate-500 hover:text-[#264653]'
              }`}
            >
              Location & Map
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('section-reviews', 'reviews')}
              className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'reviews' ? 'border-[#2A9D8F] text-[#2A9D8F]' : 'border-transparent text-slate-500 hover:text-[#264653]'
              }`}
            >
              Reviews ({listing.reviewCount})
            </button>
          </div>
        </div>
      </div>

      {/* 4. TWO-COLUMN LAYOUT (Section 33: Left ~68%, Right ~32%) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN (Content Details) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* OVERVIEW */}
            <section id="section-overview" className="bg-white rounded-[12px] p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#264653] font-heading">
                About {listing.name}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {listing.description}
              </p>

              {/* Highlights */}
              {listing.highlights && listing.highlights.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="font-mono-tag text-xs font-bold uppercase text-[#2A9D8F] tracking-wider mb-3">
                    Experience Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {listing.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#264653]">
                        <CheckCircle2 className="w-4 h-4 text-[#2A9D8F] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* DEDICATED FULL PHOTO GALLERY SECTION */}
            <section id="section-photos" className="bg-white rounded-[12px] p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#264653] font-heading">
                    Location & Experience Gallery
                  </h2>
                  <p className="text-xs text-slate-500">
                    Browse all verified photos of {listing.name} ({listing.images.length} high-resolution photos)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openFullscreenGallery(0)}
                  className="text-xs font-mono-tag font-bold text-[#2A9D8F] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Images className="w-3.5 h-3.5" /> Fullscreen View
                </button>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {listing.images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => openFullscreenGallery(i)}
                    className="relative aspect-4/3 rounded-[8px] overflow-hidden cursor-pointer group border border-slate-200"
                  >
                    <img
                      src={img}
                      alt={`${listing.name} photo ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <Images className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* AMENITIES & PERKS */}
            <section id="section-amenities" className="bg-white rounded-[12px] p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#264653] font-heading">
                Amenities & Features
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {listing.amenities.map((item, i) => (
                  <div key={i} className="p-3 rounded-[8px] bg-[#F8EDD8]/40 border border-slate-200/60 flex items-center gap-2.5 text-xs font-medium text-[#264653]">
                    <span className="w-2 h-2 rounded-full bg-[#2A9D8F]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Partner Perks Callout */}
              {listing.isPartner && listing.perks && (
                <div className="mt-4 p-4 rounded-[8px] bg-[#ECCE83]/30 border border-[#ECCE83] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#264653]">
                    <Gift className="w-4 h-4 text-[#E76F51]" />
                    <span>Dahab 360 Partner Guarantee</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    When you book through Dahab 360 WhatsApp concierge, you unlock:
                  </p>
                  <div className="space-y-1.5 pt-1">
                    {listing.perks.map((p, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-[#264653]">
                        <Check className="w-3.5 h-3.5 text-[#2A9D8F]" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* LOCATION & AREA GUIDE */}
            <section id="section-location" className="bg-white rounded-[12px] p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#264653] font-heading">
                    Location & Neighborhood
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {listing.address}
                  </p>
                </div>
                <span className="font-mono-tag text-xs font-bold text-[#2A9D8F] bg-[#2A9D8F]/10 px-2.5 py-1 rounded-[4px]">
                  {listing.area}
                </span>
              </div>

              {/* Map Placeholder */}
              <div className="h-64 rounded-[8px] bg-[#ECCE83]/20 border border-slate-200 relative overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                <div className="w-10 h-10 rounded-full bg-[#2A9D8F] text-white flex items-center justify-center mb-2 shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-[#264653]">{listing.name}</div>
                <div className="text-xs text-slate-500">{listing.address}</div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(listing.name + ' Dahab South Sinai')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#2A9D8F] hover:underline"
                >
                  Open in Google Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </section>

            {/* REVIEWS */}
            <section id="section-reviews" className="bg-white rounded-[12px] p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#264653] font-heading">
                    Verified Guest Reviews
                  </h2>
                  <p className="text-xs text-slate-500">
                    Real traveler feedback from Dahab 360 travelers.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-[#F8EDD8] px-3 py-1.5 rounded-[8px] border border-[#ECCE83]">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span className="text-base font-extrabold text-[#264653]">{listing.rating.toFixed(1)}</span>
                  <span className="text-xs text-slate-500">/ 5.0</span>
                </div>
              </div>

              {/* Review Cards */}
              <div className="space-y-4">
                {MOCK_REVIEWS.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-[8px] bg-slate-50 border border-slate-200/70 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#264653] text-[#F8EDD8] font-bold text-xs flex items-center justify-center">
                          {rev.author[0]}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#264653]">{rev.author}</div>
                          <div className="text-[10px] text-slate-400 font-mono-tag">{rev.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-400 text-amber-500' : 'text-slate-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: Sticky Sidebar (Section 35) */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
            
            {/* 1. Pricing & Booking Box */}
            <div className="bg-white rounded-[12px] p-5 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-baseline justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono-tag uppercase text-slate-500">
                  {listing.priceLabel || 'Starting Price'}
                </span>
                <div className="text-2xl font-black text-[#264653] font-heading">
                  {formatPrice(listing.price, currency)}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onBookNow(listing)}
                className="w-full bg-[#2A9D8F] hover:bg-[#238276] active:bg-[#1d6b61] text-white py-3 px-4 rounded-[8px] font-bold text-sm tracking-wide shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Now</span>
              </button>

              <p className="text-[11px] text-center text-slate-500 font-mono-tag">
                {listing.isPartner ? 'Partner Perks Guaranteed via Dahab 360' : 'Direct Booking Connection'}
              </p>
            </div>

            {/* 2. Opening Hours Card */}
            <div className="bg-white rounded-[12px] p-5 border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#2A9D8F]" />
                  <span className="font-bold text-xs uppercase font-mono-tag text-[#264653]">Operating Hours</span>
                </div>
                <span className={`font-mono-tag text-[10px] uppercase font-bold px-2 py-0.5 rounded-[4px] ${
                  listing.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {listing.isOpen ? 'OPEN NOW' : 'CLOSED'}
                </span>
              </div>

              <div className="text-xs text-slate-600 font-medium">
                Today: <strong className="text-[#264653]">{listing.openingHours.today}</strong>
              </div>

              {/* Weekly Schedule Expandable */}
              <div className="border-t border-slate-100 pt-2">
                <button
                  type="button"
                  onClick={() => setIsScheduleOpen(!isScheduleOpen)}
                  className="w-full flex items-center justify-between text-xs text-slate-500 hover:text-[#264653] cursor-pointer"
                >
                  <span>View Full Schedule</span>
                  {isScheduleOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {isScheduleOpen && (
                  <div className="mt-2 space-y-1 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-[6px]">
                    {listing.openingHours.schedule.map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="font-medium">{item.day}</span>
                        <span className="font-mono-tag text-[11px] text-slate-500">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 3. Partner Perks Box */}
            {listing.isPartner && (
              <div className="bg-[#ECCE83]/20 border border-[#ECCE83] rounded-[12px] p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#E76F51]" />
                  <h4 className="font-bold text-xs uppercase tracking-wider font-mono-tag text-[#264653]">
                    Dahab 360 Partner Perks
                  </h4>
                </div>
                <div className="space-y-1.5 pt-1">
                  {listing.perks?.map((perk, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-medium text-[#264653]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Contact Information */}
            <div className="bg-white rounded-[12px] p-5 border border-slate-200/90 shadow-xs space-y-3 text-xs text-slate-600">
              <div className="font-mono-tag text-xs font-bold uppercase text-[#264653] tracking-wider">
                Direct Contact
              </div>
              <div className="space-y-2">
                <a href={`tel:${listing.phone}`} className="flex items-center gap-2 hover:text-[#2A9D8F] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#2A9D8F]" />
                  <span>{listing.phone}</span>
                </a>
                <a 
                  href={`https://wa.me/${listing.whatsapp.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#2A9D8F] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Direct WhatsApp</span>
                </a>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#E76F51] shrink-0 mt-0.5" />
                  <span>{listing.address}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 5. FULLSCREEN PHOTO LIGHTBOX MODAL */}
      {isModalGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
            <div>
              <div className="text-sm font-bold font-heading">{listing.name}</div>
              <div className="text-xs text-slate-400 font-mono-tag">
                Photo {modalImageIndex + 1} of {listing.images.length}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsModalGalleryOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Large Image in Modal */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={listing.images[modalImageIndex]}
              alt={`Photo ${modalImageIndex + 1}`}
              className="max-h-[75vh] max-w-full object-contain rounded-[8px]"
            />

            {/* Previous / Next Arrows */}
            <button
              type="button"
              onClick={prevModalImage}
              className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={nextModalImage}
              className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnails Row */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 border-t border-white/10 hide-scrollbar">
            {listing.images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setModalImageIndex(i)}
                className={`w-14 h-14 rounded-[4px] overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                  modalImageIndex === i ? 'border-[#2A9D8F] scale-105' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 6. MOBILE BOTTOM STICKY BOOKING BAR (Section 36) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-3 shadow-lg flex items-center justify-between gap-4">
        <div>
          {listing.type !== 'dining' ? (
            <>
              <div className="text-[10px] font-mono-tag uppercase text-slate-400">
                {listing.priceLabel || 'From'}
              </div>
              <div className="text-base font-black text-[#264653]">
                {formatPrice(listing.price, currency)}
              </div>
            </>
          ) : (
            <div>
              <div className="text-[10px] font-mono-tag uppercase text-slate-400">
                Reservation
              </div>
              <div className="text-xs font-bold text-[#2A9D8F]">
                Verified Partner Perks
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => onBookNow(listing)}
          className="bg-[#2A9D8F] hover:bg-[#238276] text-white font-bold text-xs py-2.5 px-6 rounded-[8px] shadow-xs cursor-pointer"
        >
          {listing.type === 'dining' ? 'Reserve Table' : 'Book Now'}
        </button>
      </div>

    </div>
  );
};
