"use client";

import { useState } from "react";
import Image from "next/image";

export function HorizontalGallery() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "New Belgrade Horizon",
      description: "Sweeping views towards the Sava River and Belgrade Waterfront.",
      image: "/home/horizontal/1.webp",
    },
    {
      title: "Sunset over Zemun",
      description: "Golden hour reflections illuminating the tree-canopy architecture.",
      image: "/home/horizontal/2.webp",
    },
    {
      title: "Block 65 Perspective",
      description: "Direct connectivity to New Belgrade's premier corporate and shopping epicenters.",
      image: "/home/horizontal/3.webp",
    },
  ];

  return (
    <section id="Horizontal" className="relative z-1 bg-vanilla text-pine-green py-24 sm:py-32 overflow-hidden border-t border-pine-green/10">
      <div className="wrapper mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <span className="small tracking-widest text-golden uppercase font-medium">
            Panoramic Perspective
          </span>
          <h2 className="heading-1 font-serif text-pine-green mt-3">
            View from above
          </h2>
        </div>

        {/* Carousel Slide Indicators */}
        <div className="flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveSlide(i)}
              className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                activeSlide === i ? "w-10 bg-pine-green" : "w-2 bg-pine-green/20"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Panoramic Slide Display */}
      <div className="wrapper">
        <div className="relative aspect-21/9 w-full overflow-hidden rounded-3xl border border-pine-green/15 shadow-2xl">
          <Image
            src={slides[activeSlide].image}
            alt={slides[activeSlide].title}
            fill
            className="object-cover transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Slide Caption Overlay */}
          <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-cream">
            <div>
              <p className="font-serif text-2xl sm:text-3xl">
                {slides[activeSlide].title}
              </p>
              <p className="text-sm text-sand/80 mt-1 max-w-md">
                {slides[activeSlide].description}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() =>
                  setActiveSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1))
                }
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/20 transition cursor-pointer"
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0))
                }
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/20 transition cursor-pointer"
                aria-label="Next image"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
