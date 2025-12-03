'use client';

import { useState, useEffect } from 'react';

interface ImageCarouselProps {
  images?: string[];
  autoplay?: boolean;
  interval?: number;
  isPreview?: boolean;
}

export default function ImageCarouselComponent({ 
  images = [
    'https://via.placeholder.com/600x300?text=Slide+1',
    'https://via.placeholder.com/600x300?text=Slide+2',
    'https://via.placeholder.com/600x300?text=Slide+3'
  ],
  autoplay = false,
  interval = 3000,
  isPreview = false
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isPreview && autoplay && images.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [isPreview, autoplay, interval, images.length]);

  const goToSlide = (index: number) => {
    if (isPreview) {
      setCurrentIndex(index);
    }
  };

  const goToPrevious = () => {
    if (isPreview) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const goToNext = () => {
    if (isPreview) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  };

  return (
    <div className={`relative w-full ${isPreview ? '' : 'pointer-events-none'}`}>
      <div className="relative overflow-hidden rounded-lg bg-[#1a1a1a]">
        <img
          src={images[currentIndex]}
          alt={`Carousel slide ${currentIndex + 1}`}
          className="w-full h-64 object-cover"
        />
        {isPreview && images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              ‹
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              ›
            </button>
          </>
        )}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-600'
              } ${isPreview ? 'cursor-pointer hover:bg-gray-500' : ''}`}
            />
          ))}
        </div>
      </div>
      {!isPreview && (
        <div className="text-xs text-gray-500 mt-2 text-center">
          Carousel ({images.length} slides)
        </div>
      )}
    </div>
  );
}
