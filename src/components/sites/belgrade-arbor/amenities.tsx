"use client";

import { useState } from "react";
import Image from "next/image";

export function AmenitiesSection() {
  const [activeTab, setActiveTab] = useState(0);

  const amenities = [
    {
      name: "Rooftop Parks",
      subtitle: "Panoramic Living",
      description:
        "A place designed for an active and balanced lifestyle. A modernly equipped space that allows you to stay dedicated to yourself and your routines, with the comfort provided by life within the Belgrade Arbor complex.",
      image: "/home/amenities-options/rooftop.webp",
    },
    {
      name: "Private Fitness Space",
      subtitle: "Wellness & Balance",
      description:
        "Your personal space for movement and balance. Designed in line with modern living, the in-house gym lets you stay focused on yourself, without leaving the complex and without distractions.",
      image: "/home/amenities-options/fitness.webp",
    },
    {
      name: "Secured Underground Garage",
      subtitle: "3-Level Parking",
      description:
        "Coming home begins without searching for a space. Spread across three underground levels, the garage offers security, privacy and everyday comfort, with your vehicle always within reach, protected and available at any moment, without leaving the complex.",
      image: "/home/amenities-options/parking.webp",
    },
    {
      name: "Panoramic Restaurant",
      subtitle: "Refined Flavours",
      description:
        "A place for favourite rituals and moments of pause. Set on the top, recessed floor with a panoramic view of New Belgrade, the restaurant lets you enjoy good company and refined flavours, away from the city bustle, just steps from your home.",
      image: "/home/amenities-options/interior.webp",
    },
  ];

  const current = amenities[activeTab];

  return (
    <section id="Amenities" className="relative z-1 bg-vanilla text-pine-green py-24 sm:py-32">
      <div className="wrapper">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="small tracking-widest text-golden uppercase font-medium">
            What Sets Us Apart
          </span>
          <h2 className="heading-1 font-serif text-pine-green mt-3">
            Amenities
          </h2>
          <p className="paragraph mt-6 text-pine-green/80 text-lg leading-relaxed font-sans">
            Belgrade Arbor is more than a residence. It features two private gyms,
            two exclusive rooftop parks for residents and their guests, and a
            top-floor café-restaurant. These are curated spaces for unwinding and
            socializing a true sanctuary from the urban hustle, right at your
            doorstep.
          </p>
        </div>

        {/* Hero Canopy Visual */}
        <div className="relative aspect-21/9 w-full overflow-hidden rounded-3xl border border-pine-green/10 shadow-xl mb-16">
          <Image
            src="/home/amenities/amenities-bg.webp"
            alt="Belgrade Arbor Rooftop & Amenities"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        {/* Interactive Amenities Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-sand/30 p-8 sm:p-12 rounded-3xl border border-pine-green/10">
          {/* Navigation Tabs */}
          <div className="lg:col-span-5 space-y-4">
            {amenities.map((item, idx) => {
              const isActive = activeTab === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`p-6 rounded-2xl cursor-pointer border transition-all duration-300 ${
                    isActive
                      ? "bg-pine-green text-cream border-pine-green shadow-lg"
                      : "bg-white/60 border-pine-green/10 text-pine-green hover:border-golden/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="small font-mono text-xs text-golden uppercase tracking-wider block">
                        {item.subtitle}
                      </span>
                      <h3
                        className={`font-serif text-xl sm:text-2xl mt-1 ${
                          isActive ? "text-cream" : "text-pine-green"
                        }`}
                      >
                        {item.name}
                      </h3>
                    </div>
                    <span className="text-sm font-mono opacity-60">0{idx + 1}</span>
                  </div>

                  {isActive && (
                    <p className="mt-4 text-sand/90 text-sm leading-relaxed animate-in fade-in duration-300">
                      {item.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Visual Showcase */}
          <div className="lg:col-span-7">
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-pine-green/10 shadow-2xl">
              <Image
                src={current.image}
                alt={current.name}
                fill
                className="object-cover transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-cream">
                <p className="font-serif text-2xl">{current.name}</p>
                <p className="text-xs text-sand/80 font-mono tracking-wider uppercase mt-1">
                  Exclusive to Belgrade Arbor Residents
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
