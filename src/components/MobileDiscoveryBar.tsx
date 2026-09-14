import React from 'react';
import { SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import { ListingType } from '../types';

interface MobileDiscoveryBarProps {
  activeCategory: ListingType | 'all';
  activeFilters: {
    subcategory?: string;
    priceLevel?: string;
    area?: string;
    duration?: string;
    amenity?: string;
    openNowOnly?: boolean;
    partnerOnly?: boolean;
  };
  onFilterChange: (key: string, value: any) => void;
  onResetFilters: () => void;
}

export const MobileDiscoveryBar: React.FC<MobileDiscoveryBarProps> = ({
  activeCategory,
  activeFilters,
  onFilterChange,
  onResetFilters
}) => {
  // Render category-specific micro-chips
  return (
    <div className="md:hidden sticky top-16 z-30 bg-[#F8EDD8] border-b border-[#264653]/10 py-2 px-4 shadow-xs">
      <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar whitespace-nowrap">
        {/* Quick Filter Indicator / Reset */}
        <button
          type="button"
          onClick={onResetFilters}
          className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 rounded-[4px] text-[11px] font-mono-tag font-semibold text-[#264653] shrink-0"
        >
          <SlidersHorizontal className="w-3 h-3 text-[#2A9D8F]" />
          <span>Filters</span>
        </button>

        {/* Dynamic Filters depending on activeCategory */}
        {activeCategory === 'experience' && (
          <>
            {['All Dives', 'Scuba Diving', 'Snorkeling', 'Desert Safari', 'Hiking'].map((item) => {
              const val = item === 'All Dives' ? undefined : item;
              const isSelected = activeFilters.subcategory === val;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => onFilterChange('subcategory', isSelected ? undefined : val)}
                  className={`px-2.5 py-1 rounded-[4px] text-[11px] font-mono-tag font-medium shrink-0 transition-colors border ${
                    isSelected
                      ? 'bg-[#2A9D8F] text-white border-[#2A9D8F]'
                      : 'bg-white text-[#264653] border-slate-200 hover:border-[#2A9D8F]'
                  }`}
                >
                  {item}
                </button>
              );
            })}

            {['Under 1500 EGP', 'Full Day', 'Blue Hole'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  if (tag === 'Under 1500 EGP') onFilterChange('priceLevel', activeFilters.priceLevel === '$$' ? undefined : '$$');
                  if (tag === 'Blue Hole') onFilterChange('area', activeFilters.area === 'Blue Hole Area' ? undefined : 'Blue Hole Area');
                  if (tag === 'Full Day') onFilterChange('duration', activeFilters.duration === 'Full Day' ? undefined : 'Full Day');
                }}
                className={`px-2.5 py-1 rounded-[4px] text-[11px] font-mono-tag font-medium shrink-0 transition-colors border ${
                  activeFilters.area === 'Blue Hole Area' && tag === 'Blue Hole'
                    ? 'bg-[#264653] text-white border-[#264653]'
                    : 'bg-white text-slate-600 border-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </>
        )}

        {activeCategory === 'stay' && (
          <>
            {['All Types', 'Boutique Hotel', 'Eco Camp', 'Resort'].map((item) => {
              const val = item === 'All Types' ? undefined : item;
              const isSelected = activeFilters.subcategory === val;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => onFilterChange('subcategory', isSelected ? undefined : val)}
                  className={`px-2.5 py-1 rounded-[4px] text-[11px] font-mono-tag font-medium shrink-0 transition-colors border ${
                    isSelected
                      ? 'bg-[#2A9D8F] text-white border-[#2A9D8F]'
                      : 'bg-white text-[#264653] border-slate-200 hover:border-[#2A9D8F]'
                  }`}
                >
                  {item}
                </button>
              );
            })}

            {['Sea View', 'Pool', 'Dahab 360 Partner'].map((feat) => {
              const isSelected = feat === 'Dahab 360 Partner' ? activeFilters.partnerOnly : activeFilters.amenity === feat;
              return (
                <button
                  key={feat}
                  type="button"
                  onClick={() => {
                    if (feat === 'Dahab 360 Partner') onFilterChange('partnerOnly', !activeFilters.partnerOnly);
                    else onFilterChange('amenity', isSelected ? undefined : feat);
                  }}
                  className={`px-2.5 py-1 rounded-[4px] text-[11px] font-mono-tag font-medium shrink-0 transition-colors border ${
                    isSelected
                      ? 'bg-[#2A9D8F] text-white border-[#2A9D8F]'
                      : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  {feat}
                </button>
              );
            })}
          </>
        )}

        {activeCategory === 'dining' && (
          <>
            {['All Cuisines', 'Seafood', 'Cafes & Breakfast', 'Bedouin'].map((item) => {
              const val = item === 'All Cuisines' ? undefined : item;
              const isSelected = activeFilters.subcategory === val;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => onFilterChange('subcategory', isSelected ? undefined : val)}
                  className={`px-2.5 py-1 rounded-[4px] text-[11px] font-mono-tag font-medium shrink-0 transition-colors border ${
                    isSelected
                      ? 'bg-[#2A9D8F] text-white border-[#2A9D8F]'
                      : 'bg-white text-[#264653] border-slate-200 hover:border-[#2A9D8F]'
                  }`}
                >
                  {item}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => onFilterChange('partnerOnly', !activeFilters.partnerOnly)}
              className={`px-2.5 py-1 rounded-[4px] text-[11px] font-mono-tag font-medium shrink-0 transition-colors border ${
                activeFilters.partnerOnly
                  ? 'bg-[#E76F51] text-white border-[#E76F51]'
                  : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              Partner Perks
            </button>

            <button
              type="button"
              onClick={() => onFilterChange('openNowOnly', !activeFilters.openNowOnly)}
              className={`px-2.5 py-1 rounded-[4px] text-[11px] font-mono-tag font-medium shrink-0 transition-colors border ${
                activeFilters.openNowOnly
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              Open Now
            </button>
          </>
        )}

        {activeCategory === 'all' && (
          <>
            {['All Dahab', 'Lighthouse', 'Laguna', 'Blue Hole Area', 'Assalah', 'Mashraba'].map((area) => {
              const isSelected = activeFilters.area === (area === 'All Dahab' ? undefined : area);
              return (
                <button
                  key={area}
                  type="button"
                  onClick={() => onFilterChange('area', area === 'All Dahab' ? undefined : area)}
                  className={`px-2.5 py-1 rounded-[4px] text-[11px] font-mono-tag font-medium shrink-0 transition-colors border ${
                    isSelected
                      ? 'bg-[#2A9D8F] text-white border-[#2A9D8F]'
                      : 'bg-white text-[#264653] border-slate-200'
                  }`}
                >
                  {area}
                </button>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
