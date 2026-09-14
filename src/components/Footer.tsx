import React from 'react';
import { Compass, Instagram, Facebook, Phone, Mail, MapPin, Sparkles, Heart } from 'lucide-react';
import { ViewRoute } from '../types';

interface FooterProps {
  onNavigate: (route: ViewRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#264653] text-[#F8EDD8] border-t border-[#264653]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-white/10 pb-8">
          
          {/* Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <div 
              onClick={() => onNavigate({ type: 'home' })}
              className="flex items-center gap-2.5 cursor-pointer select-none"
            >
              <div className="w-8 h-8 rounded-[6px] bg-gradient-to-tr from-[#2A9D8F] to-[#E76F51] flex items-center justify-center font-bold text-xs text-white">
                360
              </div>
              <span className="font-extrabold text-lg text-white font-heading tracking-tight">
                DAHAB <span className="text-[#2A9D8F]">360</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Curated coastal tourism directory and custom itinerary planning for Dahab and the Gulf of Aqaba, South Sinai, Egypt.
            </p>
            <div className="text-[11px] font-mono-tag text-[#ECCE83] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Lighthouse, Dahab, South Sinai</span>
            </div>
          </div>

          {/* Discover Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono-tag uppercase tracking-wider font-bold text-[#2A9D8F]">
              Discover
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate({ type: 'directory', category: 'experience' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Diving & Experiences
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate({ type: 'directory', category: 'stay' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Stays & Eco Camps
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate({ type: 'directory', category: 'dining' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Local Dining & Cafes
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate({ type: 'marketplace' })}
                  className="hover:text-white transition-colors cursor-pointer text-[#ECCE83] font-bold"
                >
                  Dahab Marketplace
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate({ type: 'about' })}
                  className="hover:text-white transition-colors cursor-pointer text-[#2A9D8F] font-bold"
                >
                  About Dahab 360
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate({ type: 'guide' })}
                  className="hover:text-white transition-colors cursor-pointer text-[#ECCE83] font-bold"
                >
                  Dahab Guide
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate({ type: 'directory', category: 'all' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Emergency & Services
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate({ type: 'service-providers' })}
                  className="hover:text-white transition-colors cursor-pointer text-[#E76F51] font-bold"
                >
                  For Service Providers
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate({ type: 'contact' })}
                  className="hover:text-white transition-colors cursor-pointer text-[#2A9D8F] font-bold"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Plan Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono-tag uppercase tracking-wider font-bold text-[#2A9D8F]">
              Plan & Concierge
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate({ type: 'planner' })}
                  className="hover:text-white transition-colors cursor-pointer font-bold text-[#ECCE83]"
                >
                  Your Dahab Plan
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate({ type: 'directory', category: 'all' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Verified Partner Perks
                </button>
              </li>
              <li>
                <a 
                  href="https://wa.me/201004892211" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Concierge
                </a>
              </li>
              <li>
                <span className="text-slate-400 text-[11px] font-mono-tag">
                  Direct Sinai Assistance
                </span>
              </li>
            </ul>
          </div>

          {/* Social & Direct Contact */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono-tag uppercase tracking-wider font-bold text-[#2A9D8F]">
              Connect
            </h4>
            <p className="text-xs text-slate-300">
              Need assistance with your booking or bespoke desert treks? Reach out directly.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#2A9D8F] text-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#2A9D8F] text-white flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="mailto:concierge@dahab360.com"
                aria-label="Email"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#2A9D8F] text-white flex items-center justify-center transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Slogan Banner */}
        <div className="py-6 border-b border-white/10 text-center">
          <p className="text-sm sm:text-base font-bold font-heading text-[#F8EDD8] tracking-tight">
            Dahab 360 — Same Dahab. More to Explore.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono-tag pt-6">
          <div>
            © {new Date().getFullYear()} Dahab 360. All rights reserved. South Sinai, Egypt.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Sinai Eco Code</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
