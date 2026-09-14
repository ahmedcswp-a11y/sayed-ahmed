import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Gift, 
  MessageCircle, 
  Phone, 
  CheckCircle2, 
  Calendar, 
  Users, 
  Check, 
  Copy, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
  Tag
} from 'lucide-react';
import { Listing, Currency } from '../types';
import { formatPrice } from '../data/mockData';

interface BookingModalProps {
  listing: Listing | null;
  currency: Currency;
  isOpen: boolean;
  onClose: () => void;
  onAddListingToItinerary?: (
    listing: Listing,
    date: string,
    travelers: number,
    totalPrice: number,
    selectedAddOns: string[],
    selectedAddOnsList?: { title: string; price: number }[]
  ) => void;
  onNavigateToPlanner?: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  listing,
  currency,
  isOpen,
  onClose,
  onAddListingToItinerary,
  onNavigateToPlanner
}) => {
  // Tomorrow's date formatted as YYYY-MM-DD
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(tomorrow);
  const [travelers, setTravelers] = useState<number>(2);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [addedToPlanSuccess, setAddedToPlanSuccess] = useState<boolean>(false);

  // Reset form when opening for a new listing
  useEffect(() => {
    if (isOpen) {
      setSelectedDate(tomorrow);
      setTravelers(2);
      setSelectedAddOns([]);
      setCopiedCode(false);
      setAddedToPlanSuccess(false);

      // Lock body scroll
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, listing?.id, tomorrow]);

  if (!isOpen || !listing) return null;

  const isDeal = listing.buttonType === 'get_deal' || Boolean(listing.badge);
  const isContactOnly = listing.buttonType === 'contact_provider';

  // Toggle add-on
  const toggleAddOn = (title: string) => {
    setSelectedAddOns(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  // Real price calculation
  // Some services (like private van or per room hotel) are flat base price, others are per person.
  const isFlatPrice = 
    listing.officialCategory === 'Transfers' || 
    listing.priceLabel?.toLowerCase().includes('van') || 
    listing.priceLabel?.toLowerCase().includes('night') ||
    listing.type === 'stay';

  const basePriceEgp = isFlatPrice 
    ? listing.price 
    : listing.price * travelers;

  const addOnsTotalEgp = (listing.addOns || [])
    .filter(a => selectedAddOns.includes(a.title))
    .reduce((sum, a) => sum + (a.price * (isFlatPrice ? 1 : travelers)), 0);

  const totalCalculatedEgp = basePriceEgp + addOnsTotalEgp;

  const promoCode = listing.promoCode || 'DAHAB360-DEAL-15';

  // Handle Add to Plan
  const handleAddToPlan = () => {
    if (onAddListingToItinerary) {
      const selectedAddOnsList = (listing.addOns || []).filter(a => selectedAddOns.includes(a.title));
      onAddListingToItinerary(listing, selectedDate, travelers, totalCalculatedEgp, selectedAddOns, selectedAddOnsList);
      setAddedToPlanSuccess(true);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const dahab360WhatsAppText = encodeURIComponent(
    `Hello Dahab 360 Concierge! I would like to book "${listing.name}" (${listing.officialCategory || listing.category} in ${listing.area}) for ${travelers} guest(s) on ${selectedDate}.\n` +
    (selectedAddOns.length > 0 ? `Add-ons: ${selectedAddOns.join(', ')}\n` : '') +
    `Estimated Total: ${formatPrice(totalCalculatedEgp, 'EGP')}.\nPlease confirm availability.`
  );

  const handleWhatsAppBooking = () => {
    const url = `https://wa.me/201004892211?text=${dahab360WhatsAppText}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Mode 1: Contact Provider directly on WhatsApp
  const handleDirectWhatsApp = () => {
    const phoneClean = (listing.whatsapp || listing.phone || '201004892211').replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(`Hello ${listing.name}! I found your listing on Dahab 360 and would like to inquire about your availability and services.`);
    window.open(`https://wa.me/${phoneClean}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  // Mode 2: Get Your Deal with promo code injected
  const handleDealWhatsApp = () => {
    const phoneClean = (listing.whatsapp || listing.phone || '201004892211').replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      `Hello ${listing.name}! I found your special offer on Dahab 360 with promo code [${promoCode}] (${listing.badge || listing.dealDiscount || 'Special Deal'}). I would like to claim this deal for my visit.`
    );
    window.open(`https://wa.me/${phoneClean}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const handleDirectCall = () => {
    window.location.href = `tel:${listing.phone}`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs p-3 sm:p-6 flex items-center justify-center min-h-screen"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-[14px] border border-slate-200 shadow-2xl overflow-hidden text-left flex flex-col max-h-[90vh] my-auto animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#F8EDD8]/50 shrink-0">
          <div>
            <div className="font-mono-tag text-[10px] uppercase tracking-wider text-[#2A9D8F] font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2A9D8F]" />
              <span>{listing.officialCategory || listing.category}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#264653] line-clamp-1">
              {listing.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full hover:bg-slate-200/60 text-slate-400 hover:text-[#264653] flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1 overscroll-contain">
          
          {/* Quick Details Bar */}
          <div className="flex items-center justify-between p-3 rounded-[8px] bg-[#F8EDD8]/40 border border-[#ECCE83]/60 text-xs text-[#264653]">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0" />
              <span className="font-semibold">{listing.area}</span>
              <span className="text-slate-300">•</span>
              <span className="truncate">{listing.category}</span>
            </div>
            {listing.price > 0 && listing.officialCategory !== 'Restaurants & Cafes' && (
              <div className="font-extrabold text-sm text-[#264653] shrink-0">
                {formatPrice(listing.price, currency)}
                <span className="text-[10px] font-normal text-slate-500 ml-1">
                  {listing.priceLabel ? `(${listing.priceLabel})` : ''}
                </span>
              </div>
            )}
          </div>

          {/* SUCCESS BANNER WHEN ADDED TO PLAN */}
          {addedToPlanSuccess && (
            <div className="p-4 rounded-[10px] bg-emerald-50 border border-emerald-300 text-left space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Successfully added to My Dahab Plan!</span>
              </div>
              <p className="text-xs text-emerald-700 leading-relaxed">
                "{listing.name}" for {travelers} guest{travelers > 1 ? 's' : ''} on {selectedDate} ({formatPrice(totalCalculatedEgp, 'EGP')}) has been added to your curated itinerary.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {onNavigateToPlanner && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigateToPlanner();
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] bg-[#264653] hover:bg-[#1e3742] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                  >
                    <span>Open My Dahab Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] bg-[#2A9D8F] hover:bg-[#238276] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Send to WhatsApp Now</span>
                </button>
              </div>
            </div>
          )}

          {/* CASE 1: DEAL PROMO (e.g. Ali Baba 15% OFF) */}
          {isDeal && (
            <div className="p-4 rounded-[10px] border-2 border-[#E76F51] bg-[#E76F51]/5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#E76F51]" />
                  <h4 className="font-bold text-base text-[#264653]">Exclusive Dahab 360 Deal</h4>
                </div>
                <span className="font-mono-tag text-xs uppercase font-bold text-white bg-[#E76F51] px-2 py-0.5 rounded-[4px]">
                  {listing.badge || '15% OFF'}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Special verified offer from {listing.name}. Discount is automatically secured and sent with your WhatsApp reservation.
              </p>
              
              <div className="flex items-center justify-between p-3 rounded-[8px] bg-white border border-[#E76F51]/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/15 text-emerald-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-tag uppercase text-slate-400 font-bold">Offer Status</div>
                    <div className="text-xs font-bold text-[#264653]">Discount auto-applied via direct WhatsApp</div>
                  </div>
                </div>
                <span className="font-mono-tag text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-[4px]">
                  Active Deal
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleDealWhatsApp}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#E76F51] hover:bg-[#d65f41] text-white rounded-[8px] text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Claim on WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={handleDirectCall}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white hover:bg-slate-50 text-[#264653] border border-slate-300 rounded-[8px] text-xs font-bold transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Provider</span>
                </button>
              </div>
            </div>
          )}

          {/* CASE 2: DIRECT PROVIDER CONTACT (e.g. Ghazala Market, Dive Gear Hub, Beach House Cafe) */}
          {isContactOnly && !isDeal && (
            <div className="p-4 rounded-[10px] border border-slate-200 bg-slate-50/70 space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#2A9D8F]" />
                <h4 className="font-bold text-sm sm:text-base text-[#264653]">Direct Provider Contact</h4>
              </div>
              <p className="text-xs text-slate-600">
                Connect directly with {listing.name} for inquiries, delivery, or reservations in Dahab.
              </p>
              
              <div className="p-3 bg-white rounded-[8px] border border-slate-200 text-xs space-y-1 text-slate-600">
                <div><span className="font-semibold text-[#264653]">Phone:</span> {listing.phone}</div>
                <div><span className="font-semibold text-[#264653]">Address:</span> {listing.address}</div>
                <div><span className="font-semibold text-[#264653]">Hours:</span> {listing.openingHours.today}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#2A9D8F] hover:bg-[#238276] text-white rounded-[8px] text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={handleDirectCall}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white hover:bg-slate-50 text-[#264653] border border-slate-300 rounded-[8px] text-xs font-bold transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Directly</span>
                </button>
              </div>
            </div>
          )}

          {/* CASE 3: "BOOK WITH DAHAB 360" CONFIGURATOR (Selecting Date + People adds to My Dahab Plan with real EGP price) */}
          {!isContactOnly && (
            <div className="p-4 rounded-[12px] border-2 border-[#2A9D8F] bg-[#2A9D8F]/5 space-y-4">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#2A9D8F]" />
                  <h4 className="font-bold text-sm sm:text-base text-[#264653]">
                    Configure & Add to Plan
                  </h4>
                </div>
                <span className="font-mono-tag text-[10px] uppercase font-bold text-white bg-[#2A9D8F] px-2 py-0.5 rounded-[4px]">
                  Real EGP Rate
                </span>
              </div>

              {/* 1. Date Picker */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#264653] font-mono-tag uppercase">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm font-semibold text-[#264653] bg-white border border-slate-300 rounded-[8px] focus:outline-hidden focus:border-[#2A9D8F] shadow-xs cursor-pointer"
                />
              </div>

              {/* 2. Guests / People Counter */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#264653] font-mono-tag uppercase">
                  Travelers / Guests
                </label>
                <div className="flex items-center justify-between bg-white border border-slate-300 rounded-[8px] px-3 py-1.5 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <Users className="w-4 h-4 text-[#2A9D8F]" />
                    <span>{travelers} {travelers === 1 ? 'Person' : 'People'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={travelers <= 1}
                      onClick={() => setTravelers(prev => Math.max(1, prev - 1))}
                      className="w-7 h-7 rounded-[6px] bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-[#264653] font-bold text-sm flex items-center justify-center transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-bold text-xs text-[#264653]">{travelers}</span>
                    <button
                      type="button"
                      disabled={travelers >= 10}
                      onClick={() => setTravelers(prev => Math.min(10, prev + 1))}
                      className="w-7 h-7 rounded-[6px] bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-[#264653] font-bold text-sm flex items-center justify-center transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. Optional Add-ons (e.g. for Wadi Gnai Safari: BBQ Lunch 350 EGP, Camel Ride 250 EGP) */}
              {listing.addOns && listing.addOns.length > 0 && (
                <div className="space-y-2 pt-1 border-t border-slate-200/80">
                  <label className="block text-xs font-bold text-[#264653] font-mono-tag uppercase">
                    Optional Safari Add-Ons
                  </label>
                  <div className="space-y-1.5">
                    {listing.addOns.map((addOn, idx) => {
                      const isSelected = selectedAddOns.includes(addOn.title);
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleAddOn(addOn.title)}
                          className={`flex items-center justify-between p-2 rounded-[6px] border text-xs cursor-pointer transition-colors ${
                            isSelected 
                              ? 'bg-white border-[#2A9D8F] text-[#264653]' 
                              : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center ${
                              isSelected ? 'bg-[#2A9D8F] border-[#2A9D8F] text-white' : 'border-slate-300'
                            }`}>
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                            <span className="font-semibold">{addOn.title}</span>
                          </div>
                          <span className="font-mono-tag font-bold text-[#2A9D8F]">
                            +{formatPrice(addOn.price, currency)} {isFlatPrice ? '' : '/ person'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Price Calculation Summary */}
              <div className="p-3 bg-white rounded-[8px] border border-[#2A9D8F]/30 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-500">
                  <span>
                    Base ({isFlatPrice ? (listing.priceLabel || 'Per unit') : `${travelers} × ${formatPrice(listing.price, currency)}`})
                  </span>
                  <span className="font-semibold text-[#264653]">
                    {formatPrice(basePriceEgp, currency)}
                  </span>
                </div>

                {addOnsTotalEgp > 0 && (
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Add-ons ({selectedAddOns.length} selected)</span>
                    <span className="font-semibold text-[#264653]">
                      +{formatPrice(addOnsTotalEgp, currency)}
                    </span>
                  </div>
                )}

                <div className="pt-1.5 border-t border-slate-200 flex items-center justify-between font-bold text-sm text-[#264653]">
                  <span>Total Calculated:</span>
                  <span className="text-[#2A9D8F] font-extrabold text-base">
                    {formatPrice(totalCalculatedEgp, currency)}
                  </span>
                </div>
              </div>

              {/* Primary Action Button: "Add to My Dahab Plan" */}
              <button
                type="button"
                onClick={handleAddToPlan}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#2A9D8F] hover:bg-[#238276] text-white rounded-[8px] text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer active:scale-98"
              >
                <Check className="w-4 h-4" />
                <span>Add to My Dahab Plan ({formatPrice(totalCalculatedEgp, 'EGP')})</span>
              </button>

            </div>
          )}

          {/* Partner Perks Banner */}
          {listing.perks && listing.perks.length > 0 && (
            <div className="p-3 rounded-[8px] bg-[#ECCE83]/20 border border-[#ECCE83]/70 text-xs space-y-1.5">
              <div className="font-bold text-[#264653] flex items-center gap-1.5 font-mono-tag uppercase text-[10px]">
                <Gift className="w-3.5 h-3.5 text-[#E76F51]" />
                <span>Verified Dahab 360 Perks Guaranteed</span>
              </div>
              <ul className="space-y-1">
                {listing.perks.map((perk, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-1 text-[11px] font-mono-tag">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero Booking Fees • Direct Dahab 360 Partner</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-[#264653] cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
