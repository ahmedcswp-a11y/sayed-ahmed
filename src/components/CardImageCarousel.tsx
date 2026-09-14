import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CardImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
}

export const CardImageCarousel: React.FC<CardImageCarouselProps> = ({
  images,
  alt,
  className = 'h-48 sm:h-52 w-full'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className={`${className} bg-slate-200 flex items-center justify-center text-slate-400 font-mono-tag text-xs`}>
        NO PREVIEW
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden group select-none ${className}`}>
      {/* Images container */}
      <div 
        className="flex h-full w-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${alt} view ${idx + 1}`}
            loading="lazy"
            className="w-full h-full object-cover shrink-0"
          />
        ))}
      </div>

      {/* Navigation arrows (visible on hover / active) */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 text-[#264653] hover:bg-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 text-[#264653] hover:bg-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-xs">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => handleDotClick(e, idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-200 rounded-full cursor-pointer ${
                  currentIndex === idx 
                    ? 'w-3 h-1.5 bg-white' 
                    : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
