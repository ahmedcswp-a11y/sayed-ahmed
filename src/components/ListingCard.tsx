import React from 'react';
import { 
  Star, 
  MapPin, 
  Clock, 
  Heart, 
  Gift, 
  Compass, 
  Bed, 
  Utensils, 
  Waves,
  Sparkles,
  Wifi,
  Coffee,
  Check,
  Tag,
  Phone,
  MessageCircle,
  Calendar
} from 'lucide-react';
import { Listing, Currency } from '../types';
import { CardImageCarousel } from './CardImageCarousel';
import { formatPrice } from '../data/mockData';

interface ListingCardProps {
  listing: Listing;
  currency: Currency;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectListing: (listing: Listing) => void;
  onBookNow: (listing: Listing) => void;
  cardVariant?: 'standard' | 'tall' | 'compact';
  hidePrice?: boolean;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  currency,
  isFavorite,
  onToggleFavorite,
  onSelectListing,
  onBookNow,
  cardVariant = 'standard',
  hidePrice = false
}) => {
  const getCategoryIcon = (category: string, type: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('dive') || cat.includes('snorkel') || cat.includes('water')) {
      return <Waves className="w-3.5 h-3.5" />;
    }
    if (cat.includes('camp') || cat.includes('hotel') || type === 'stay') {
      return <Bed className="w-3.5 h-3.5" />;
    }
    if (cat.includes('cafe') || cat.includes('bakery')) {
      return <Coffee className="w-3.5 h-3.5" />;
    }
    if (type === 'dining' || cat.includes('seafood') || cat.includes('bedouin')) {
      return <Utensils className="w-3.5 h-3.5" />;
    }
    return <Compass className="w-3.5 h-3.5" />;
  };

  const imageHeight = cardVariant === 'tall' 
    ? 'h-52 sm:h-56' 
    : cardVariant === 'compact' 
      ? 'h-40 sm:h-44' 
      : 'h-44 sm:h-48';

  // Rule 2: Remove pricing information from the Restaurants & Cafés section only
  const isDining = listing.officialCategory === 'Restaurants & Cafes' || listing.type === 'dining' || hidePrice;

  // Determine button label and styling based on specifications
  const buttonText = listing.buttonLabel || (
    listing.buttonType === 'book_dahab360' ? 'Book with Dahab 360' :
    listing.buttonType === 'contact_provider' ? 'Contact Provider' :
    listing.buttonType === 'get_deal' ? 'Get Your Deal' :
    (isDining ? 'Contact Provider' : 'Book with Dahab 360')
  );

  const getButtonStyle = () => {
    if (listing.buttonType === 'get_deal') {
      return 'bg-[#E76F51] hover:bg-[#d55e42] text-white border-transparent';
    }
    if (listing.buttonType === 'contact_provider') {
      return 'bg-white hover:bg-slate-50 text-[#264653] border border-slate-300 hover:border-[#264653]';
    }
    // book_dahab360
    return 'bg-[#2A9D8F] hover:bg-[#238276] text-white border-transparent';
  };

  return (
    <div 
      className="group bg-white rounded-[12px] border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden text-left cursor-pointer"
      onClick={() => onSelectListing(listing)}
    >
      {/* 1. Image Area with Mini Carousel */}
      <div className="relative">
        <CardImageCarousel 
          images={listing.images} 
          alt={listing.name} 
          className={`${imageHeight} w-full`} 
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {listing.badge ? (
              <span className="font-mono-tag text-[10px] tracking-wider uppercase font-bold bg-[#E76F51] text-white px-2 py-0.5 rounded-[4px] shadow-xs flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {listing.badge}
              </span>
            ) : listing.isPartner ? (
              <span className="font-mono-tag text-[10px] tracking-wider uppercase font-semibold bg-[#2A9D8F] text-white px-2 py-0.5 rounded-[4px] shadow-xs">
                Dahab 360 Partner
              </span>
            ) : null}

            {listing.tags && listing.tags[0] && (
              <span className="font-mono-tag text-[10px] tracking-wider uppercase font-medium bg-[#264653]/85 text-[#F8EDD8] px-2 py-0.5 rounded-[4px] backdrop-blur-xs">
                {listing.tags[0]}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {listing.priceLevel && !isDining && (
              <span className="font-mono-tag text-[11px] font-medium bg-black/50 text-white px-1.5 py-0.5 rounded-[4px] backdrop-blur-xs">
                {listing.priceLevel}
              </span>
            )}
            <span className="font-mono-tag text-[10px] tracking-wider uppercase font-medium bg-white/95 text-[#264653] px-1.5 py-0.5 rounded-[4px] flex items-center gap-1 shadow-xs">
              <span className={`w-1.5 h-1.5 rounded-full ${listing.isOpen ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              {listing.isOpen ? 'OPEN' : 'CLOSED'}
            </span>
          </div>
        </div>

        {/* Rating Badge Bottom Right of Image */}
        <div className="absolute bottom-2.5 right-2.5 bg-white/95 text-[#264653] px-2 py-0.5 rounded-[4px] text-xs font-semibold flex items-center gap-1 shadow-xs pointer-events-none">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
          <span>{listing.rating.toFixed(1)}</span>
          <span className="text-slate-400 text-[10px] font-normal">({listing.reviewCount})</span>
        </div>
      </div>

      {/* 2. Overlapping Listing Avatar */}
      <div className="px-4 flex items-center justify-between -mt-5 relative z-10">
        <div className="w-11 h-11 rounded-full border-2 border-white bg-white shadow-xs overflow-hidden shrink-0">
          <img 
            src={listing.logo} 
            alt={`${listing.name} logo`} 
            className="w-full h-full object-cover" 
          />
        </div>

        {listing.duration && (
          <div className="bg-[#F8EDD8] border border-[#ECCE83]/70 text-[#264653] px-2 py-0.5 rounded-[4px] text-[11px] font-mono-tag font-medium flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#2A9D8F]" />
            <span>{listing.duration}</span>
          </div>
        )}
      </div>

      {/* 3. Card Body */}
      <div className="p-4 pt-2.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Location */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="font-mono-tag uppercase tracking-wider text-[11px] font-semibold text-[#2A9D8F]">
              {listing.officialCategory || listing.category}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-0.5 truncate">
              <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
              {listing.area}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-base text-[#264653] group-hover:text-[#2A9D8F] transition-colors line-clamp-1">
            {listing.name}
          </h3>

          {/* Amenities / Perks line */}
          {listing.perks && listing.perks.length > 0 ? (
            <div className="mt-2 text-[11px] text-[#264653] bg-[#ECCE83]/35 border border-[#ECCE83] px-2 py-1 rounded-[4px] flex items-center gap-1.5 truncate">
              <Gift className="w-3.5 h-3.5 text-[#E76F51] shrink-0" />
              <span className="truncate font-medium">{listing.perks[0]}</span>
            </div>
          ) : listing.amenities && listing.amenities.length > 0 ? (
            <div className="mt-2 text-[11px] text-slate-600 flex items-center gap-1 truncate">
              <span className="text-slate-400">•</span>
              <span className="truncate">{listing.amenities.slice(0, 2).join(' • ')}</span>
            </div>
          ) : null}
        </div>

        {/* Pricing & CTA */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {!isDining ? (
            <div>
              <div className="text-[10px] uppercase font-mono-tag text-slate-400">
                {listing.priceLabel || 'From'}
              </div>
              <div className="text-sm sm:text-base font-extrabold text-[#264653]">
                {listing.price > 0 ? formatPrice(listing.price, currency) : 'Service Inquiry'}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="font-mono-tag text-[11px] font-semibold text-[#2A9D8F] bg-[#2A9D8F]/10 px-2 py-0.5 rounded-[4px]">
                {listing.category}
              </span>
            </div>
          )}

          {/* Action Button: Book with Dahab 360 / Contact Provider / Get Your Deal */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onBookNow(listing);
            }}
            className={`${getButtonStyle()} px-3.5 py-1.5 rounded-[8px] text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-xs whitespace-nowrap ml-auto shrink-0`}
          >
            {buttonText}
          </button>
        </div>
      </div>

      {/* 4. Card Footer */}
      <div className="px-4 py-2 bg-[#F8EDD8]/40 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5 font-mono-tag text-[11px] text-[#264653]/80">
          {getCategoryIcon(listing.category, listing.type)}
          <span>{listing.area}</span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(listing.id);
          }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
          className="p-1 rounded-full hover:bg-white text-slate-400 hover:text-[#E76F51] transition-colors cursor-pointer"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-[#E76F51] text-[#E76F51]' : 'text-slate-400'
            }`} 
          />
        </button>
      </div>
    </div>
  );
};
