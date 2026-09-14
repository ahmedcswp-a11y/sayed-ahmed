import React, { useState } from 'react';
import { 
  Clock, 
  Trash2, 
  MessageCircle, 
  Check, 
  CheckCircle2,
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck,
  Building2,
  Compass,
  MapPin,
  Star,
  Gift,
  Plus
} from 'lucide-react';
import { Currency, PlannerService, ItineraryItem, Listing } from '../types';
import { MOCK_PLANNER_SERVICES, MOCK_STAYS, formatPrice } from '../data/mockData';

interface PlannerPageProps {
  currency: Currency;
  onToggleCurrency: () => void;
  itinerary: ItineraryItem[];
  onAddToItinerary: (service: PlannerService, day: number, timeSlot: string, travelers: number) => void;
  onRemoveFromItinerary: (itemId: string) => void;
  onUpdateItineraryItem: (itemId: string, updates: Partial<ItineraryItem>) => void;
}

export const PlannerPage: React.FC<PlannerPageProps> = ({
  currency,
  onToggleCurrency,
  itinerary,
  onAddToItinerary,
  onRemoveFromItinerary,
}) => {
  // 3 Clear Steps: 1 = Accommodation, 2 = Experiences, 3 = Review & Submit
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1: Accommodation Selection
  const [selectedStay, setSelectedStay] = useState<Listing | null>(null);
  const [hasOwnStay, setHasOwnStay] = useState<boolean>(false);

  // Step 2: Category Filter for Experiences
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Diving',
    'Safari & Mountains',
    'Water & Boat',
    'Cultural & Dinner',
    'Transfers'
  ];

  const filteredServices = MOCK_PLANNER_SERVICES.filter(service => {
    if (selectedCategory === 'All') return true;
    return service.category === selectedCategory;
  });

  // Calculate total price for activities considering travelers and add-ons
  const totalActivitiesEgp = itinerary.reduce((sum, item) => {
    if (item.totalPrice !== undefined) {
      return sum + item.totalPrice;
    }
    return sum + (item.unitPrice * (item.travelers || 1));
  }, 0);

  // Toggle selection of a stay in Step 1
  const handleSelectStay = (stay: Listing) => {
    if (selectedStay?.id === stay.id) {
      setSelectedStay(null);
    } else {
      setSelectedStay(stay);
      setHasOwnStay(false);
    }
  };

  const handleSelectOwnStay = () => {
    setHasOwnStay(true);
    setSelectedStay(null);
  };

  // Toggle selection of an experience in Step 2
  const handleToggleService = (service: PlannerService) => {
    const existing = itinerary.find(it => it.serviceId === service.id);
    if (existing) {
      onRemoveFromItinerary(existing.id);
    } else {
      onAddToItinerary(service, 1, service.recommendedTime || 'Flexible', 1);
    }
  };

  const isServiceSelected = (serviceId: string) => {
    return itinerary.some(it => it.serviceId === serviceId);
  };

  // Construct WhatsApp Submission Message
  const generateWhatsAppMessage = () => {
    let msg = `*Dahab 360 - Trip Plan Request*\n\n`;

    // Accommodation section
    msg += `*1. Accommodation:*\n`;
    if (selectedStay) {
      msg += `• ${selectedStay.name} (${selectedStay.category}, ${selectedStay.area})\n`;
      msg += `  Rate: ${formatPrice(selectedStay.price, 'EGP')} / night (Partner Perks Included)\n`;
    } else if (hasOwnStay) {
      msg += `• I already have accommodation in Dahab\n`;
    } else {
      msg += `• Undecided / Need local recommendation\n`;
    }

    // Experiences section
    msg += `\n*2. Selected Experiences (${itinerary.length}):*\n`;
    if (itinerary.length > 0) {
      itinerary.forEach((item, idx) => {
        const itemTotal = item.totalPrice !== undefined ? item.totalPrice : (item.unitPrice * (item.travelers || 1));
        const paxText = item.travelers ? ` (${item.travelers} guest${item.travelers > 1 ? 's' : ''})` : '';
        const dateText = item.date ? ` on ${item.date}` : (item.day ? ` (Day ${item.day})` : '');
        const timeText = item.timeSlot ? ` at ${item.timeSlot}` : '';
        let addOnsText = '';
        if (item.selectedAddOnsList && item.selectedAddOnsList.length > 0) {
          addOnsText = `\n   ↳ Add-ons: ${item.selectedAddOnsList.map(a => `${a.title} (+${formatPrice(a.price, 'EGP')})`).join(', ')}`;
        } else if (item.addOns && item.addOns.length > 0) {
          addOnsText = `\n   ↳ Add-ons: ${item.addOns.join(', ')}`;
        }
        msg += `${idx + 1}. *${item.title}*${paxText}${dateText}${timeText}\n   Cost: ${formatPrice(itemTotal, 'EGP')}${addOnsText}\n`;
      });
      msg += `\n*Estimated Activities Total:* ${formatPrice(totalActivitiesEgp, 'EGP')}\n`;
    } else {
      msg += `• No specific activities selected yet (looking for suggestions)\n`;
    }

    msg += `\nHello Dahab 360 Concierge! I would like to coordinate and book this plan with your local partner perks. Please confirm availability and next steps.`;
    return encodeURIComponent(msg);
  };

  const handleWhatsAppSubmit = () => {
    const url = `https://wa.me/201004892211?text=${generateWhatsAppMessage()}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. TOP HEADER & CURRENCY */}
      <div className="bg-white rounded-[12px] p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 font-mono-tag text-xs font-bold uppercase text-[#2A9D8F] bg-[#2A9D8F]/10 px-2.5 py-1 rounded-[4px]">
            <Sparkles className="w-3.5 h-3.5" />
            3-Step Dahab Vacation Builder
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#264653] tracking-tight font-heading">
            Build Your Dahab Plan
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Choose your stay and experiences in 3 simple steps, then send directly to our team on WhatsApp for free coordination and verified Sinai partner perks.
          </p>
        </div>

        {/* Currency & Coordination Guarantee */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 bg-[#F8EDD8] border border-[#ECCE83] rounded-[8px] flex items-center gap-4 text-xs font-mono-tag">
            <div>
              <span className="text-slate-500 block text-[10px]">CURRENCY</span>
              <button
                type="button"
                onClick={onToggleCurrency}
                className="font-bold text-[#264653] hover:text-[#2A9D8F] cursor-pointer"
              >
                {currency} (Toggle)
              </button>
            </div>
            <div className="border-l border-slate-300 pl-4">
              <span className="text-slate-500 block text-[10px]">COORDINATION</span>
              <span className="font-bold text-emerald-700">100% Free</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THREE-STEP PROGRESS TRACKER */}
      <div className="bg-white rounded-[12px] p-4 sm:p-5 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between max-w-2xl mx-auto relative">
          
          {/* Connecting line background */}
          <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />
          <div 
            className="absolute top-1/2 left-8 -translate-y-1/2 h-0.5 bg-[#2A9D8F] transition-all duration-300 -z-0"
            style={{ 
              width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : 'calc(100% - 4rem)' 
            }} 
          />

          {/* Step 1: Accommodation */}
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className="relative z-10 flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
              currentStep === 1 
                ? 'bg-[#2A9D8F] text-white ring-4 ring-[#2A9D8F]/20'
                : currentStep > 1 
                ? 'bg-[#2A9D8F] text-white' 
                : 'bg-white border-2 border-slate-300 text-slate-500'
            }`}>
              {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <span className={`text-[11px] sm:text-xs font-bold font-mono-tag ${
              currentStep === 1 ? 'text-[#264653]' : 'text-slate-500'
            }`}>
              1. Accommodation
            </span>
          </button>

          {/* Step 2: Experiences */}
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="relative z-10 flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
              currentStep === 2 
                ? 'bg-[#2A9D8F] text-white ring-4 ring-[#2A9D8F]/20'
                : currentStep > 2 
                ? 'bg-[#2A9D8F] text-white' 
                : 'bg-white border-2 border-slate-300 text-slate-500'
            }`}>
              {currentStep > 2 ? <Check className="w-4 h-4" /> : '2'}
            </div>
            <span className={`text-[11px] sm:text-xs font-bold font-mono-tag ${
              currentStep === 2 ? 'text-[#264653]' : 'text-slate-500'
            }`}>
              2. Experiences
            </span>
          </button>

          {/* Step 3: Review & Submit */}
          <button
            type="button"
            onClick={() => setCurrentStep(3)}
            className="relative z-10 flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
              currentStep === 3 
                ? 'bg-[#2A9D8F] text-white ring-4 ring-[#2A9D8F]/20'
                : 'bg-white border-2 border-slate-300 text-slate-500'
            }`}>
              3
            </div>
            <span className={`text-[11px] sm:text-xs font-bold font-mono-tag ${
              currentStep === 3 ? 'text-[#264653]' : 'text-slate-500'
            }`}>
              3. Review & WhatsApp
            </span>
          </button>

        </div>
      </div>

      {/* ========================================================= */}
      {/* STEP 1: ACCOMMODATION (مكان الإقامة)                        */}
      {/* ========================================================= */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#264653] font-heading flex items-center gap-2">
                <Building2 className="w-6 h-6 text-[#2A9D8F]" />
                Step 1: Where Would You Like to Stay?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Choose a verified Dahab hotel or eco camp, or let us know if you already have accommodation.
              </p>
            </div>

            {selectedStay && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2A9D8F]/10 rounded-[6px] border border-[#2A9D8F]/20 text-xs font-mono-tag font-bold text-[#2A9D8F] self-start sm:self-auto">
                <CheckCircle2 className="w-4 h-4" />
                <span>Stay Selected: {selectedStay.name}</span>
              </div>
            )}
          </div>

          {/* Quick Option: I already have accommodation */}
          <div 
            onClick={handleSelectOwnStay}
            className={`p-4 sm:p-5 rounded-[12px] border transition-all cursor-pointer flex items-center justify-between gap-4 ${
              hasOwnStay 
                ? 'bg-[#2A9D8F]/10 border-2 border-[#2A9D8F] shadow-xs' 
                : 'bg-white border-slate-200/90 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all shrink-0 ${
                hasOwnStay ? 'border-[#2A9D8F] bg-[#2A9D8F] text-white' : 'border-slate-300 bg-white'
              }`}>
                {hasOwnStay && <Check className="w-3.5 h-3.5" />}
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#264653]">
                  I already have accommodation in Dahab
                </h3>
                <p className="text-xs text-slate-500">
                  Select this if you booked an apartment, Airbnb, camp, or staying with friends.
                </p>
              </div>
            </div>

            <span className={`text-xs font-bold font-mono-tag px-3 py-1 rounded-[6px] shrink-0 ${
              hasOwnStay ? 'bg-[#2A9D8F] text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {hasOwnStay ? 'Selected' : 'Skip Stays'}
            </span>
          </div>

          {/* Section Divider */}
          <div className="flex items-center gap-3 text-xs font-mono-tag text-slate-400">
            <div className="h-px bg-slate-200 flex-1" />
            <span>OR CHOOSE FROM VERIFIED DAHAB PARTNER STAYS</span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          {/* Stays Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_STAYS.map((stay) => {
              const isSelected = selectedStay?.id === stay.id;
              return (
                <div
                  key={stay.id}
                  onClick={() => handleSelectStay(stay)}
                  className={`relative rounded-[12px] p-4 sm:p-5 border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#2A9D8F]/5 border-2 border-[#2A9D8F] shadow-sm'
                      : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={stay.images[0]}
                      alt={stay.name}
                      className="w-22 h-22 sm:w-26 sm:h-26 rounded-[8px] object-cover shrink-0"
                    />

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono-tag text-[10px] uppercase font-bold text-[#2A9D8F] bg-[#2A9D8F]/10 px-1.5 py-0.5 rounded-[4px]">
                          {stay.category}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono-tag flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#E76F51]" /> {stay.area}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm sm:text-base text-[#264653] leading-snug">
                        {stay.name}
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 shrink-0" />
                        <span className="font-bold text-[#264653]">{stay.rating.toFixed(2)}</span>
                        <span className="text-slate-400 font-mono-tag">({stay.reviewCount})</span>
                      </div>

                      {stay.perks && stay.perks.length > 0 && (
                        <div className="text-[11px] text-[#2A9D8F] font-semibold flex items-center gap-1 truncate">
                          <Gift className="w-3 h-3 shrink-0" />
                          <span className="truncate">{stay.perks[0]}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price & Select Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                      <div className="text-sm font-black text-[#264653]">
                        {formatPrice(stay.price, currency)}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono-tag">per night</div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectStay(stay);
                      }}
                      className={`px-3.5 py-1.5 rounded-[6px] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#2A9D8F] text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-[#264653]'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Selected</span>
                        </>
                      ) : (
                        <span>Choose This Stay</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action Footer for Step 1 */}
          <div className="bg-white rounded-[12px] p-5 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 z-30">
            <div>
              <div className="text-xs font-mono-tag text-slate-500">
                {selectedStay ? 'Selected Stay' : hasOwnStay ? 'Accommodation' : 'Accommodation status'}
              </div>
              <div className="text-base sm:text-lg font-black text-[#264653]">
                {selectedStay ? (
                  <span>{selectedStay.name} ({formatPrice(selectedStay.price, currency)} / night)</span>
                ) : hasOwnStay ? (
                  <span className="text-[#2A9D8F]">Arranging own accommodation</span>
                ) : (
                  <span className="text-slate-400 font-normal text-sm">You can choose a stay or proceed to experiences</span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setCurrentStep(2);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-[8px] font-bold text-sm bg-[#2A9D8F] hover:bg-[#238276] text-white shadow-xs cursor-pointer flex items-center gap-2 transition-all"
            >
              <span>Next: Choose Experiences</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 2: EXPERIENCES (التجارب والأنشطة)                    */}
      {/* ========================================================= */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#264653] font-heading flex items-center gap-2">
                <Compass className="w-6 h-6 text-[#2A9D8F]" />
                Step 2: Choose Experiences You Want to Live
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Click any experience below to add or remove it from your Dahab itinerary.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2A9D8F]/10 rounded-[6px] border border-[#2A9D8F]/20 text-xs font-mono-tag font-bold text-[#2A9D8F] self-start sm:self-auto">
              <CheckCircle2 className="w-4 h-4" />
              <span>{itinerary.length} Selected</span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-[4px] text-xs font-mono-tag font-semibold transition-colors cursor-pointer whitespace-nowrap border ${
                  selectedCategory === cat
                    ? 'bg-[#2A9D8F] text-white border-[#2A9D8F]'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#2A9D8F]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredServices.map((service) => {
              const selected = isServiceSelected(service.id);
              return (
                <div
                  key={service.id}
                  onClick={() => handleToggleService(service)}
                  className={`relative rounded-[12px] p-4 sm:p-5 border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                    selected
                      ? 'bg-[#2A9D8F]/5 border-2 border-[#2A9D8F] shadow-sm'
                      : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-[8px] object-cover shrink-0"
                    />

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono-tag text-[10px] uppercase font-bold text-[#2A9D8F] bg-[#2A9D8F]/10 px-1.5 py-0.5 rounded-[4px]">
                          {service.category}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono-tag flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {service.duration}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm sm:text-base text-[#264653] leading-snug">
                        {service.title}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Price & Toggle Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                      <span className="text-sm font-black text-[#264653]">
                        {formatPrice(service.price, currency)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleService(service);
                      }}
                      className={`px-3.5 py-1.5 rounded-[6px] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        selected
                          ? 'bg-[#2A9D8F] text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-[#264653]'
                      }`}
                    >
                      {selected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Selected</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-slate-500" />
                          <span>Add to Plan</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action Footer for Step 2 */}
          <div className="bg-white rounded-[12px] p-5 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 z-30">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setCurrentStep(1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2.5 rounded-[8px] border border-slate-200 text-slate-600 hover:text-[#264653] text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Accommodation</span>
              </button>

              <div>
                <div className="text-xs font-mono-tag text-slate-500">
                  {itinerary.length} experiences selected
                </div>
                <div className="text-base sm:text-lg font-black text-[#264653]">
                  Total: <span className="text-[#2A9D8F]">{formatPrice(totalActivitiesEgp, currency)}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setCurrentStep(3);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-[8px] font-bold text-sm bg-[#2A9D8F] hover:bg-[#238276] text-white shadow-xs cursor-pointer flex items-center gap-2 transition-all"
            >
              <span>Next: Review & Confirm</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 3: REVIEW & WHATSAPP (المراجعة والإرسال عبر واتساب)    */}
      {/* No name, age, or address input fields - direct WhatsApp   */}
      {/* ========================================================= */}
      {currentStep === 3 && (
        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
          
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-[#264653] font-heading">
              Step 3: Review Your Plan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              No forms or account needed. Tap below to send your plan directly to Dahab 360 on WhatsApp.
            </p>
          </div>

          <div className="bg-white rounded-[12px] p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-6">
            
            {/* 1. Accommodation Recap Card */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono-tag font-bold uppercase text-[#264653] pb-1 border-b border-slate-100">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#2A9D8F]" />
                  Selected Accommodation
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-[#2A9D8F] hover:underline cursor-pointer"
                >
                  Change
                </button>
              </div>

              {selectedStay ? (
                <div className="p-3.5 rounded-[8px] bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={selectedStay.images[0]} 
                      alt={selectedStay.name} 
                      className="w-12 h-12 rounded-[6px] object-cover shrink-0" 
                    />
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-[#264653]">{selectedStay.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono-tag">{selectedStay.category} • {selectedStay.area}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-black text-[#264653]">
                      {formatPrice(selectedStay.price, currency)}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono-tag">per night</div>
                  </div>
                </div>
              ) : hasOwnStay ? (
                <div className="p-3.5 rounded-[8px] bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2A9D8F] shrink-0" />
                  <span>I already have my own accommodation arranged in Dahab.</span>
                </div>
              ) : (
                <div className="p-3.5 rounded-[8px] bg-slate-50 border border-slate-200/80 text-xs text-slate-500 italic">
                  No accommodation selected (we can suggest options on WhatsApp).
                </div>
              )}
            </div>

            {/* 2. Selected Experiences Recap */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono-tag font-bold uppercase text-[#264653] pb-1 border-b border-slate-100">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#2A9D8F]" />
                  Selected Experiences ({itinerary.length})
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-[#2A9D8F] hover:underline cursor-pointer"
                >
                  + Modify
                </button>
              </div>

              {itinerary.length === 0 ? (
                <div className="p-4 text-center rounded-[8px] bg-slate-50 border border-slate-200/60 text-xs text-slate-400">
                  No experiences selected yet. You can still message us to ask for recommendations!
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {itinerary.map((item) => {
                    const itemTotal = item.totalPrice !== undefined ? item.totalPrice : (item.unitPrice * (item.travelers || 1));
                    return (
                      <div key={item.id} className="py-2.5 flex items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-[#264653]">
                            {item.title}
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 font-mono-tag">
                            <span>{item.category}</span>
                            {item.travelers && (
                              <>
                                <span>•</span>
                                <span>{item.travelers} guest{item.travelers > 1 ? 's' : ''}</span>
                              </>
                            )}
                            {item.date && (
                              <>
                                <span>•</span>
                                <span>{item.date}</span>
                              </>
                            )}
                          </div>
                          {item.addOns && item.addOns.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-0.5">
                              {item.addOns.map((addOn, aIdx) => (
                                <span key={aIdx} className="text-[10px] bg-[#2A9D8F]/10 text-[#2A9D8F] font-semibold px-1.5 py-0.5 rounded-[4px]">
                                  +{addOn}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs font-extrabold text-[#264653]">
                            {formatPrice(itemTotal, currency)}
                          </span>
                          <button
                            type="button"
                            onClick={() => onRemoveFromItinerary(item.id)}
                            aria-label="Remove item"
                            className="text-slate-300 hover:text-[#E76F51] p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 3. Cost & Coordination Summary */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Dahab 360 Concierge Coordination</span>
                <span className="font-mono-tag text-[#2A9D8F] font-bold">100% Free / Complimentary</span>
              </div>
              {itinerary.length > 0 && (
                <div className="flex items-center justify-between text-base sm:text-lg font-black text-[#264653]">
                  <span>Estimated Activities Total:</span>
                  <span className="text-xl text-[#2A9D8F]">{formatPrice(totalActivitiesEgp, currency)}</span>
                </div>
              )}
            </div>

            {/* Direct Sinai Guarantee Box */}
            <div className="p-3.5 rounded-[8px] bg-[#F8EDD8]/60 border border-[#ECCE83]/70 text-xs text-slate-700 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#2A9D8F] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div className="font-bold text-[#264653]">No Upfront Payment Required</div>
                <div className="text-[11px] text-slate-600 leading-relaxed">
                  Your plan will be sent directly to our local team on WhatsApp. We verify schedules and partner discounts before you confirm or pay anything.
                </div>
              </div>
            </div>

            {/* Dominant Action: Send via WhatsApp */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                className="w-full py-3.5 px-6 rounded-[8px] bg-[#2A9D8F] hover:bg-[#238276] active:bg-[#1d6b61] text-white font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white text-transparent" />
                <span>Send Plan to Dahab 360 on WhatsApp</span>
              </button>

              <p className="text-[11px] text-center text-slate-400 font-mono-tag">
                Direct WhatsApp chat with our local Sinai guides. No forms to fill out.
              </p>
            </div>

            {/* Bottom Step Back Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setCurrentStep(2);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-slate-500 hover:text-[#264653] flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Experiences</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCurrentStep(1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-[#2A9D8F] hover:underline cursor-pointer"
              >
                Back to Accommodation
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
