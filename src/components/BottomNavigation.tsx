import React from 'react';
import { Home, Search, Calendar, Store, Tag } from 'lucide-react';
import { ViewRoute, Currency } from '../types';

interface BottomNavigationProps {
  currentRoute: ViewRoute;
  onNavigate: (route: ViewRoute) => void;
  planItemCount: number;
  cartItemCount: number;
  onOpenCart: () => void;
  isCartOpen: boolean;
  currency: Currency;
  onToggleCurrency: () => void;
  language: 'EN' | 'AR';
  onToggleLanguage: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentRoute,
  onNavigate,
  planItemCount,
  cartItemCount,
}) => {
  const getActiveTab = (): 'home' | 'search' | 'offers' | 'market' | 'plan' | null => {
    if (currentRoute.type === 'home') return 'home';
    if (currentRoute.type === 'directory') return 'search';
    if (currentRoute.type === 'offers') return 'offers';
    if (currentRoute.type === 'marketplace') return 'market';
    if (currentRoute.type === 'planner') return 'plan';
    return null;
  };

  const activeTab = getActiveTab();

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-1 sm:px-4 py-1.5"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center justify-items-center">
        
        {/* 1. Home Tab */}
        <button
          type="button"
          onClick={() => onNavigate({ type: 'home' })}
          className={`flex flex-col items-center justify-center w-full py-1 min-h-[44px] transition-colors cursor-pointer relative ${
            activeTab === 'home' ? 'text-[#2A9D8F]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Home className={`w-5 h-5 transition-transform ${activeTab === 'home' ? 'scale-110' : ''}`} />
          <span className={`text-[10px] sm:text-[11px] tracking-tight mt-0.5 ${activeTab === 'home' ? 'font-bold' : 'font-medium'}`}>
            Home
          </span>
          {activeTab === 'home' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F] absolute top-0.5" />
          )}
        </button>

        {/* 2. Search / Explore Tab */}
        <button
          type="button"
          onClick={() => onNavigate({ type: 'directory' })}
          className={`flex flex-col items-center justify-center w-full py-1 min-h-[44px] transition-colors cursor-pointer relative ${
            activeTab === 'search' ? 'text-[#2A9D8F]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Search className={`w-5 h-5 transition-transform ${activeTab === 'search' ? 'scale-110' : ''}`} />
          <span className={`text-[10px] sm:text-[11px] tracking-tight mt-0.5 ${activeTab === 'search' ? 'font-bold' : 'font-medium'}`}>
            Explore
          </span>
          {activeTab === 'search' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F] absolute top-0.5" />
          )}
        </button>

        {/* 3. Offers Tab */}
        <button
          type="button"
          onClick={() => onNavigate({ type: 'offers' })}
          className={`flex flex-col items-center justify-center w-full py-1 min-h-[44px] transition-colors cursor-pointer relative ${
            activeTab === 'offers' ? 'text-[#E76F51]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className="relative">
            <Tag className={`w-5 h-5 transition-transform ${activeTab === 'offers' ? 'scale-110 text-[#E76F51]' : ''}`} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#E76F51] absolute -top-0.5 -right-1" />
          </div>
          <span className={`text-[10px] sm:text-[11px] tracking-tight mt-0.5 ${activeTab === 'offers' ? 'font-bold text-[#E76F51]' : 'font-medium'}`}>
            Offers
          </span>
          {activeTab === 'offers' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#E76F51] absolute top-0.5" />
          )}
        </button>

        {/* 4. Marketplace Tab */}
        <button
          type="button"
          onClick={() => onNavigate({ type: 'marketplace' })}
          className={`flex flex-col items-center justify-center w-full py-1 min-h-[44px] transition-colors cursor-pointer relative ${
            activeTab === 'market' ? 'text-[#2A9D8F]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className="relative">
            <Store className={`w-5 h-5 transition-transform ${activeTab === 'market' ? 'scale-110' : ''}`} />
            {cartItemCount > 0 ? (
              <span className="absolute -top-1 -right-2 bg-[#E76F51] text-white text-[9px] font-bold font-mono-tag min-w-[15px] h-3.5 rounded-full flex items-center justify-center px-0.5 shadow-xs animate-pulse">
                {cartItemCount}
              </span>
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-[#E76F51] absolute -top-0.5 -right-1" />
            )}
          </div>
          <span className={`text-[10px] sm:text-[11px] tracking-tight mt-0.5 ${activeTab === 'market' ? 'font-bold' : 'font-medium'}`}>
            Market
          </span>
          {activeTab === 'market' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F] absolute top-0.5" />
          )}
        </button>

        {/* 5. Plan Tab */}
        <button
          type="button"
          onClick={() => onNavigate({ type: 'planner' })}
          className={`flex flex-col items-center justify-center w-full py-1 min-h-[44px] transition-colors cursor-pointer relative ${
            activeTab === 'plan' ? 'text-[#2A9D8F]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className="relative">
            <Calendar className={`w-5 h-5 transition-transform ${activeTab === 'plan' ? 'scale-110' : ''}`} />
            {planItemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#E76F51] text-white text-[9px] font-bold font-mono-tag min-w-[15px] h-3.5 rounded-full flex items-center justify-center px-0.5 shadow-xs">
                {planItemCount}
              </span>
            )}
          </div>
          <span className={`text-[10px] sm:text-[11px] tracking-tight mt-0.5 ${activeTab === 'plan' ? 'font-bold' : 'font-medium'}`}>
            Plan
          </span>
          {activeTab === 'plan' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F] absolute top-0.5" />
          )}
        </button>

      </div>
    </nav>
  );
};
