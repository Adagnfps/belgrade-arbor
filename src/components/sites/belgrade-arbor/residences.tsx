"use client";

import { useState } from "react";
import Image from "next/image";

interface ResidencesProps {
  onInquire?: (residenceName: string) => void;
}

export function ResidencesSection({ onInquire }: ResidencesProps) {
  const [selectedTypeIdx, setSelectedTypeIdx] = useState(0);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const residenceTypes = [
    {
      name: "Studio",
      unitsAvailable: 80,
      images: [
        "/home/residences-options/1.webp",
        "/home/residences-options/2.webp",
      ],
    },
    {
      name: "One Bedroom",
      unitsAvailable: 22,
      images: [
        "/home/residences-options/3.webp",
        "/home/residences-options/4.webp",
      ],
    },
    {
      name: "Two Bedroom",
      unitsAvailable: 78,
      images: [
        "/home/residences-options/5.webp",
        "/home/residences-options/6.webp",
        "/home/residences-options/8.webp",
      ],
    },
    {
      name: "Three Bedroom",
      unitsAvailable: 16,
      images: [
        "/home/residences-options/9.webp",
        "/home/residences-options/10.webp",
        "/home/residences-options/7.webp",
      ],
    },
    {
      name: "Four Bedroom",
      unitsAvailable: 12,
      images: [
        "/home/residences-options/11.webp",
        "/home/residences-options/12.webp",
      ],
    },
  ];

  const currentType = residenceTypes[selectedTypeIdx];
  const safeImgIdx = Math.min(activeImgIdx, currentType.images.length - 1);

  return (
    <section id="Residences" className="relative z-1 bg-vanilla text-pine-green py-24 sm:py-32">
      <div className="wrapper">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="small tracking-widest text-golden uppercase font-medium">
            Architectural Living
          </span>
          <h2 className="heading-1 font-serif text-pine-green mt-3">
            Residences
          </h2>
          <p className="paragraph mt-6 text-pine-green/80 text-lg leading-relaxed font-sans">
            Designed with contemporary living in mind, each apartment at Belgrade
            Arbor balances functionality, comfort, and aesthetics. Open-plan
            layouts, excellent natural light, refined materials, and carefully
            considered details create spaces that feel both welcoming and enduring.
          </p>
        </div>

        {/* Hero Visual */}
        <div className="relative aspect-21/9 w-full overflow-hidden rounded-3xl border border-pine-green/10 shadow-xl mb-16">
          <Image
            src="/home/residences/residences-hero.webp"
            alt="Belgrade Arbor Residences Interior"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Interactive Apartment Types Explorer */}
        <div className="bg-sand/30 rounded-3xl p-6 sm:p-12 border border-pine-green/10">
          <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-pine-green/10">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {residenceTypes.map((type, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedTypeIdx(idx);
                    setActiveImgIdx(0);
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-sans transition-all cursor-pointer ${
                    selectedTypeIdx === idx
                      ? "bg-pine-green text-cream shadow-md"
                      : "bg-white/60 text-pine-green hover:bg-pine-green/10 border border-pine-green/10"
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </div>

            {/* Units Availability Badge */}
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-green animate-pulse" />
              <span className="small font-mono text-pine-green font-medium">
                {currentType.unitsAvailable} units available
              </span>
            </div>
          </div>

          {/* Apartment Gallery Display */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Main Showcase Image */}
            <div className="lg:col-span-8">
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-pine-green/10 shadow-lg">
                <Image
                  src={currentType.images[safeImgIdx]}
                  alt={`${currentType.name} Layout`}
                  fill
                  className="object-cover transition-all duration-500"
                />
              </div>

              {/* Thumbnails Row */}
              {currentType.images.length > 1 && (
                <div className="flex gap-4 mt-4">
                  {currentType.images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImgIdx(i)}
                      className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                        safeImgIdx === i
                          ? "border-golden scale-105"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt="Thumbnail"
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Card: Details and CTA */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full bg-white/80 p-8 rounded-2xl border border-pine-green/10">
              <div>
                <span className="small text-golden tracking-widest uppercase">
                  Available Layout
                </span>
                <h3 className="heading-3 font-serif text-pine-green mt-2">
                  {currentType.name}
                </h3>
                <p className="paragraph mt-4 text-pine-green/75 leading-relaxed text-sm">
                  Premium residential unit featuring expansive floor-to-ceiling
                  fenestration, private terrace space, high-grade acoustic
                  insulation, and intelligent climate zoning.
                </p>
                <div className="mt-6 pt-6 border-t border-pine-green/10 space-y-3 font-sans text-xs">
                  <div className="flex justify-between">
                    <span className="text-pine-green/60">Orientation</span>
                    <span className="font-medium text-pine-green">South / Southwest</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-pine-green/60">Natural Illumination</span>
                    <span className="font-medium text-pine-green">Optimal High Exposure</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-pine-green/60">Heating / Cooling</span>
                    <span className="font-medium text-pine-green">Underfloor + Fan Coil</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => onInquire?.(currentType.name)}
                  className="w-full inline-flex cursor-pointer items-center justify-center gap-3 rounded-full bg-pine-green py-3.5 px-6 text-xs uppercase tracking-widest text-cream transition-all hover:bg-green"
                >
                  <span>Submit a request</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
