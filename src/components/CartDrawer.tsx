import React from 'react';
import { 
  ShoppingCart, 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  MessageCircle, 
  ShieldCheck, 
  MapPin, 
  Store,
  Sparkles
} from 'lucide-react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../data/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  currency: Currency;
  onNavigateToMarketplace: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency,
  onNavigateToMarketplace
}) => {
  if (!isOpen) return null;

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPriceEGP = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let message = `Hello Dahab 360 Marketplace, I would like to place an order:\n\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.quantity}x ${item.product.title} (${formatPrice(item.product.price, currency)} each)\n   Condition: ${item.product.condition} | Seller: ${item.product.seller.name}\n`;
    });
    message += `\nTotal Estimated Amount: ${formatPrice(totalPriceEGP, currency)}\nPickup/Delivery: Dahab, South Sinai\n\nPlease confirm availability and payment/pickup details.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/201004892211?text=${encoded}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-250 text-[#264653]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-[#F8EDD8]/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-[8px] bg-[#E76F51]/15 text-[#E76F51] flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold font-heading text-[#264653] leading-tight">
                  Marketplace Cart
                </h2>
                <p className="text-[11px] font-mono-tag text-slate-500">
                  {totalItemsCount} {totalItemsCount === 1 ? 'product' : 'products'} selected
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-[11px] text-slate-400 hover:text-red-600 transition-colors px-2 py-1 cursor-pointer font-medium"
                >
                  Clear all
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Cart"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scope Reminder Badge */}
          <div className="mt-3 px-2.5 py-1.5 rounded-[6px] bg-white/80 border border-[#2A9D8F]/30 flex items-center justify-between text-[10px] font-mono-tag text-[#264653]">
            <span className="font-semibold text-[#2A9D8F] flex items-center gap-1">
              <Store className="w-3 h-3 text-[#2A9D8F]" />
              Marketplace items only
            </span>
            <span className="text-slate-500">
              Stays & tours stay in My Plan
            </span>
          </div>
        </div>

        {/* Cart Content: List of Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-[#264653]">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                  Discover diving gear, water sports equipment, Bedouin handicrafts, and local Sinai delicacies.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToMarketplace();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] bg-[#2A9D8F] hover:bg-[#238276] text-white font-bold text-xs shadow-xs cursor-pointer transition-colors"
              >
                <Store className="w-4 h-4" />
                <span>Browse Marketplace</span>
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={item.product.id}
                className="bg-white rounded-[12px] border border-slate-200/90 p-3 shadow-2xs flex gap-3 group hover:border-[#2A9D8F] transition-colors"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-20 rounded-[8px] bg-slate-100 overflow-hidden shrink-0 relative">
                  <img 
                    src={item.product.image} 
                    alt={item.product.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className={`absolute top-1 left-1 px-1.5 py-0.2 rounded text-[8px] font-mono-tag font-bold ${
                    item.product.condition === 'New' 
                      ? 'bg-[#2A9D8F] text-white' 
                      : 'bg-amber-600 text-white'
                  }`}>
                    {item.product.condition}
                  </span>
                </div>

                {/* Info & Quantity controls */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="space-y-0.5">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-xs sm:text-sm text-[#264653] leading-snug line-clamp-1">
                        {item.product.title}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors p-0.5 cursor-pointer shrink-0"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono-tag flex items-center gap-1.5">
                      <span>{item.product.seller.name}</span>
                      <span>•</span>
                      <span>{item.product.location}</span>
                    </div>
                  </div>

                  {/* Price & Quantity stepper */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-1">
                    <div className="font-bold text-xs sm:text-sm text-[#2A9D8F] font-mono-tag">
                      {formatPrice(item.product.price * item.quantity, currency)}
                    </div>

                    <div className="flex items-center border border-slate-200 rounded-[6px] bg-slate-50 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                        title="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold font-mono-tag text-[#264653]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                        title="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer: Total & WhatsApp Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-white space-y-3.5">
            {/* Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal ({totalItemsCount} items)</span>
                <span className="font-mono-tag font-semibold text-[#264653]">
                  {formatPrice(totalPriceEGP, currency)}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#2A9D8F]" />
                  Pickup / Local Handover
                </span>
                <span className="text-emerald-600 font-bold font-mono-tag">
                  Free in Dahab
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#264653] pt-2 border-t border-slate-100">
                <span>Total</span>
                <span className="text-[#2A9D8F] font-mono-tag text-base">
                  {formatPrice(totalPriceEGP, currency)}
                </span>
              </div>
            </div>

            {/* WhatsApp Checkout Button */}
            <button
              type="button"
              onClick={handleWhatsAppCheckout}
              className="w-full py-3 px-4 rounded-[10px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white text-transparent" />
              <span>Checkout via WhatsApp Concierge</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigateToMarketplace();
              }}
              className="w-full py-2 text-center text-xs font-bold text-[#2A9D8F] hover:underline cursor-pointer"
            >
              Continue Shopping in Marketplace
            </button>

            {/* Trust tags */}
            <div className="flex items-center justify-center gap-3 text-[10px] font-mono-tag text-slate-400 pt-1 border-t border-slate-100">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#2A9D8F]" />
                Verified Sellers
              </span>
              <span>•</span>
              <span>Direct Handover in Dahab</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
