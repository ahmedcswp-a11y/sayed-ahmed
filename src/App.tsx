import React, { useState, useEffect } from 'react';
import { ViewRoute, Listing, Currency, ItineraryItem, PlannerService, ListingType, CartItem, MarketplaceProduct } from './types';
import { ALL_MOCK_LISTINGS, MOCK_PLANNER_SERVICES } from './data/mockData';
import { FEATURED_MARKETPLACE_PRODUCTS } from './data/marketplaceData';
import { Header } from './components/Header';
import { MobileDiscoveryBar } from './components/MobileDiscoveryBar';
import { Homepage } from './components/Homepage';
import { DirectoryPage } from './components/DirectoryPage';
import { ListingPage } from './components/ListingPage';
import { PlannerPage } from './components/PlannerPage';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { MarketplacePage } from './components/MarketplacePage';
import { GuidePage } from './components/GuidePage';
import { AboutPage } from './components/AboutPage';
import { ServiceProvidersPage } from './components/ServiceProvidersPage';
import { ContactPage } from './components/ContactPage';
import { ArticlePage } from './components/ArticlePage';
import { BottomNavigation } from './components/BottomNavigation';
import { CartDrawer } from './components/CartDrawer';
import { OffersPage } from './components/OffersPage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<ViewRoute>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/offers' || hash === '#offers') {
        return { type: 'offers' };
      }
      if (path === '/marketplace' || hash === '#marketplace') {
        return { type: 'marketplace' };
      }
      if (path === '/guide' || hash === '#guide') {
        return { type: 'guide' };
      }
      if (path === '/about' || hash === '#about') {
        return { type: 'about' };
      }
      if (path === '/for-service-providers' || hash === '#for-service-providers') {
        return { type: 'service-providers' };
      }
      if (path === '/contact' || hash === '#contact') {
        return { type: 'contact' };
      }
      if (path.startsWith('/article/') || hash.startsWith('#article')) {
        const articleId = hash.replace('#article/', '').replace('#article=', '') || 'guide-1';
        return { type: 'article', articleId };
      }
    }
    return { type: 'home' };
  });
  const [currency, setCurrency] = useState<Currency>('EGP');
  const [language, setLanguage] = useState<'EN' | 'AR'>('EN');
  
  // Seeded favorites for interactive demonstration
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['exp-1', 'stay-1']));
  
  // Seeded itinerary items so "Your Dahab Plan" starts with high-value realistic items
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([
    {
      id: 'init-1',
      serviceId: 'plan-1',
      title: 'Blue Hole & The Bells 2-Tank Guided Dive',
      category: 'Diving',
      day: 1,
      timeSlot: '08:30 AM',
      travelers: 2,
      unitPrice: 1850
    },
    {
      id: 'init-2',
      serviceId: 'plan-4',
      title: 'Wadi Qunai Bedouin Stargazing & Clay Feast',
      category: 'Cultural & Dinner',
      day: 2,
      timeSlot: '05:30 PM',
      travelers: 2,
      unitPrice: 950
    }
  ]);

  // Selected listing for detail view
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // Marketplace Cart state (strictly for Dahab Marketplace products only)
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const handleAddToCart = (product: MarketplaceProduct, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.title}" to your cart`);
  };

  const handleUpdateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Booking modal state
  const [bookingModalListing, setBookingModalListing] = useState<Listing | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  // Scroll to top and sync URL hash on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (typeof window !== 'undefined' && window.history) {
      if (currentRoute.type === 'service-providers') {
        window.history.replaceState(null, '', '#for-service-providers');
      } else if (currentRoute.type === 'contact') {
        window.history.replaceState(null, '', '#contact');
      } else if (currentRoute.type === 'marketplace') {
        window.history.replaceState(null, '', '#marketplace');
      } else if (currentRoute.type === 'guide') {
        window.history.replaceState(null, '', '#guide');
      } else if (currentRoute.type === 'about') {
        window.history.replaceState(null, '', '#about');
      } else if (currentRoute.type === 'article') {
        window.history.replaceState(null, '', `#article/${currentRoute.articleId}`);
      } else if (currentRoute.type === 'home') {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, [currentRoute]);

  // Master listing lookup
  const allListings = ALL_MOCK_LISTINGS;

  const handleToggleCurrency = () => {
    setCurrency(prev => (prev === 'EGP' ? 'USD' : 'EGP'));
  };

  const handleToggleLanguage = () => {
    setLanguage(prev => (prev === 'EN' ? 'AR' : 'EN'));
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('Removed from saved favorites');
      } else {
        next.add(id);
        showToast('Saved to your Dahab favorites');
      }
      return next;
    });
  };

  const handleSelectListing = (listing: Listing) => {
    setSelectedListing(listing);
    setCurrentRoute({ type: 'listing', slug: listing.slug });
  };

  // Action button routing (Book with Dahab 360 / Contact Provider / Get Your Deal)
  const handleBookNow = (listing: Listing) => {
    setBookingModalListing(listing);
    setIsBookingModalOpen(true);
  };

  // Direct configuration & Add to Plan from Listing / Modal
  const handleAddListingToItinerary = (
    listing: Listing,
    date: string,
    travelers: number,
    totalPrice: number,
    selectedAddOns: string[]
  ) => {
    const newItem: ItineraryItem = {
      id: `itinerary-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      serviceId: listing.id,
      title: listing.name,
      category: listing.officialCategory || listing.category,
      day: 1,
      timeSlot: listing.duration || 'Flexible',
      travelers: travelers,
      unitPrice: Math.round(totalPrice / (travelers || 1)),
      date: date,
      addOns: selectedAddOns
    };
    setItinerary(prev => [...prev, newItem]);
    showToast(`Added "${listing.name}" for ${travelers} guest(s) on ${date} to Your Dahab Plan`);
  };

  // Planner actions
  const handleAddToItinerary = (service: PlannerService, day: number, timeSlot: string, travelers: number) => {
    const newItem: ItineraryItem = {
      id: `itinerary-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      serviceId: service.id,
      title: service.title,
      category: service.category,
      day: day,
      timeSlot: timeSlot,
      travelers: travelers,
      unitPrice: service.price
    };
    setItinerary(prev => [...prev, newItem]);
    showToast(`Added "${service.title}" to Day ${day} in Your Dahab Plan`);
  };

  const handleRemoveFromItinerary = (itemId: string) => {
    setItinerary(prev => prev.filter(i => i.id !== itemId));
    showToast('Activity removed from plan');
  };

  const handleUpdateItineraryItem = (itemId: string, updates: Partial<ItineraryItem>) => {
    setItinerary(prev => prev.map(item => item.id === itemId ? { ...item, ...updates } : item));
  };

  // Global escape key handler to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsBookingModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8EDD8] text-[#264653]">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#264653] text-[#F8EDD8] text-xs font-mono-tag font-semibold px-4 py-2.5 rounded-[8px] shadow-lg border border-[#ECCE83]/50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Global Sticky Header (Shown on standard pages; Dedicated pages have their own top bars) */}
      {currentRoute.type !== 'marketplace' && 
       currentRoute.type !== 'about' && 
       currentRoute.type !== 'service-providers' && 
       currentRoute.type !== 'contact' && 
       currentRoute.type !== 'article' && (
        <Header
          currentRoute={currentRoute}
          onNavigate={setCurrentRoute}
          currency={currency}
          onToggleCurrency={handleToggleCurrency}
          planItemCount={itinerary.length}
          cartItemCount={cartItemCount}
          onOpenCart={() => setIsCartOpen(true)}
          onSelectListing={handleSelectListing}
        />
      )}

      {/* Primary Main View Container */}
      <main className="flex-1">
        {currentRoute.type === 'home' && (
          <Homepage
            currency={currency}
            onToggleCurrency={handleToggleCurrency}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectListing={handleSelectListing}
            onBookNow={handleBookNow}
            onNavigate={setCurrentRoute}
          />
        )}

        {currentRoute.type === 'directory' && (
          <DirectoryPage
            initialCategory={(currentRoute as any).category || 'all'}
            initialOfficialCategory={(currentRoute as any).officialCategory}
            initialSubcategory={(currentRoute as any).subcategory}
            currency={currency}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectListing={handleSelectListing}
            onBookNow={handleBookNow}
          />
        )}

        {currentRoute.type === 'listing' && selectedListing && (
          <ListingPage
            listing={selectedListing}
            currency={currency}
            isFavorite={favorites.has(selectedListing.id)}
            onToggleFavorite={handleToggleFavorite}
            onBookNow={handleBookNow}
            onNavigate={setCurrentRoute}
          />
        )}

        {currentRoute.type === 'planner' && (
          <PlannerPage
            currency={currency}
            onToggleCurrency={handleToggleCurrency}
            itinerary={itinerary}
            onAddToItinerary={handleAddToItinerary}
            onRemoveFromItinerary={handleRemoveFromItinerary}
            onUpdateItineraryItem={handleUpdateItineraryItem}
          />
        )}

        {currentRoute.type === 'offers' && (
          <OffersPage
            currency={currency}
            onToggleCurrency={handleToggleCurrency}
            onSelectListing={handleSelectListing}
            onBookNow={handleBookNow}
            onNavigate={setCurrentRoute}
          />
        )}

        {currentRoute.type === 'marketplace' && (
          <MarketplacePage
            currency={currency}
            onToggleCurrency={handleToggleCurrency}
            language={language}
            onToggleLanguage={handleToggleLanguage}
            onNavigate={setCurrentRoute}
            onAddToCart={handleAddToCart}
            cart={cart}
            cartItemCount={cartItemCount}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {currentRoute.type === 'guide' && (
          <GuidePage
            currency={currency}
            onToggleCurrency={handleToggleCurrency}
            language={language}
            onToggleLanguage={handleToggleLanguage}
            onNavigate={setCurrentRoute}
            cartItemCount={cartItemCount}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {currentRoute.type === 'about' && (
          <AboutPage
            currency={currency}
            onToggleCurrency={handleToggleCurrency}
            language={language}
            onToggleLanguage={handleToggleLanguage}
            onNavigate={setCurrentRoute}
            cartItemCount={cartItemCount}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {currentRoute.type === 'service-providers' && (
          <ServiceProvidersPage
            currency={currency}
            onToggleCurrency={handleToggleCurrency}
            language={language}
            onToggleLanguage={handleToggleLanguage}
            onNavigate={setCurrentRoute}
            cartItemCount={cartItemCount}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {currentRoute.type === 'contact' && (
          <ContactPage
            currency={currency}
            onToggleCurrency={handleToggleCurrency}
            language={language}
            onToggleLanguage={handleToggleLanguage}
            onNavigate={setCurrentRoute}
            cartItemCount={cartItemCount}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {currentRoute.type === 'article' && (
          <ArticlePage
            articleId={currentRoute.articleId}
            currency={currency}
            language={language}
            onNavigate={setCurrentRoute}
            onAddListingToItinerary={handleAddListingToItinerary}
            onAddToCart={handleAddToCart}
            onOpenBookingModal={handleBookNow}
            cartItemCount={cartItemCount}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}
      </main>

      {/* Partner Booking Modal */}
      <BookingModal
        listing={bookingModalListing}
        currency={currency}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onAddListingToItinerary={handleAddListingToItinerary}
        onNavigateToPlanner={() => setCurrentRoute({ type: 'planner' })}
      />

      {/* Global Slide-Over Marketplace Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        currency={currency}
        onNavigateToMarketplace={() => {
          setIsCartOpen(false);
          setCurrentRoute({ type: 'marketplace' });
        }}
      />

      {/* Global Compact Footer */}
      <Footer onNavigate={setCurrentRoute} />

      {/* Global Bottom Navigation Bar (Fixed for Mobile & Tablet) */}
      <BottomNavigation
        currentRoute={currentRoute}
        onNavigate={setCurrentRoute}
        planItemCount={itinerary.length}
        cartItemCount={cartItemCount}
        onOpenCart={() => setIsCartOpen(!isCartOpen)}
        isCartOpen={isCartOpen}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

    </div>
  );
}
