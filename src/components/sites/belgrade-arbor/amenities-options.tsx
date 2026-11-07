"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { ArrowDownIcon } from "./icons";

export function AmenitiesOptionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ top: 0, height: 0, visible: false });

  const amenities = [
    {
      name: "Rooftop",
      description:
        "A place designed for an active and balanced lifestyle. A modernly equipped space that allows you to stay dedicated to yourself and your routines, with the comfort provided by life within the Belgrade Arbor complex.",
      images: ["/home/amenities-options/rooftop.webp"],
    },
    {
      name: "Private fitness space",
      description:
        "Your personal space for movement and balance. Designed in line with modern living, the in-house gym lets you stay focused on yourself, without leaving the complex and without distractions.",
      images: ["/home/amenities-options/fitness.webp"],
    },
    {
      name: "Garage",
      description:
        "Coming home begins without searching for a space. Spread across three underground levels, the garage offers security, privacy and everyday comfort, with your vehicle always within reach, protected and available at any moment, without leaving the complex.",
      images: ["/home/amenities-options/parking.webp"],
    },
    {
      name: "Restaurant",
      description:
        "A place for favourite rituals and moments of pause. Set on the top, recessed floor with a panoramic view of New Belgrade, the restaurant lets you enjoy good company and refined flavours, away from the city bustle, just steps from your home.",
      images: ["/home/amenities-options/interior.webp"],
    },
  ];

  const currentAmenity = amenities[selectedIdx];

  // Recalculate indicator position on active index change
  useEffect(() => {
    const el = itemRefs.current[selectedIdx];
    if (el) {
      const h = el.offsetHeight * 0.8;
      const top = el.offsetTop + (el.offsetHeight - h) / 2;
      setIndicator({ top, height: h, visible: true });
    }
  }, [selectedIdx]);

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev > 0 ? prev - 1 : amenities.length - 1));
  };

  const handleNext = () => {
    setSelectedIdx((prev) => (prev < amenities.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Split entrance reveal
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#AmenitiesOptions .amenities-options-trigger",
            start: "top 70%",
          },
        })
        .fromTo(
          "#AmenitiesOptions .amenities-options-reveal-image",
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power2.inOut" },
          0
        )
        .fromTo(
          "#AmenitiesOptions .amenities-options-reveal-content",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power2.inOut" },
          0
        )
        .fromTo(
          "#AmenitiesOptions .amenities-options-reveal-image .reveal-image-zoom",
          { scale: 1.1 },
          { scale: 1, duration: 1.2, ease: "power2.inOut" },
          0
        );

      // Parallax scroll on image
      gsap.to("#AmenitiesOptions .amenities-parallaxWrap", {
        y: "10%",
        scrollTrigger: {
          trigger: "#AmenitiesOptions .amenities-options-trigger",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="AmenitiesOptions" className="relative min-h-screen bg-vanilla text-pine-green">
      <div className="amenities-options-trigger trigger relative flex min-h-screen items-stretch py-20 max-xl:py-15">
        {/* Left Column: Interactive Selector */}
        <div className="amenities-options-reveal-content wrapper relative z-10 flex items-end justify-between w-full max-xl:w-1/2 max-lg:w-full">
          <div className="flex h-full w-5/12 flex-col items-start justify-between gap-10 pr-20 max-xl:w-full max-lg:pr-0">
            {/* Top: List of Amenities */}
            <div className="w-full">
              <p className="kicker uppercase font-mono text-xs tracking-widest text-golden font-medium mb-8">
                Amenities
              </p>

              <div
                className="list relative"
                onMouseLeave={() => {
                  const el = itemRefs.current[selectedIdx];
                  if (el) {
                    const h = el.offsetHeight * 0.8;
                    const top = el.offsetTop + (el.offsetHeight - h) / 2;
                    setIndicator({ top, height: h, visible: true });
                  }
                }}
              >
                {/* Vertical Pine-Green Moving Line Indicator */}
                <div
                  className="bg-pine-green pointer-events-none absolute top-0 -left-4 w-0.5 transition-all duration-300"
                  style={{
                    height: `${indicator.height}px`,
                    transform: `translateY(${indicator.top}px)`,
                    opacity: indicator.visible ? 1 : 0,
                  }}
                />

                {amenities.map((item, idx) => {
                  const isActive = selectedIdx === idx;
                  return (
                    <div
                      key={item.name}
                      ref={(el) => {
                        itemRefs.current[idx] = el;
                      }}
                      onClick={() => setSelectedIdx(idx)}
                      onMouseEnter={(e) => {
                        const target = e.currentTarget;
                        const h = target.offsetHeight * 0.8;
                        const top = target.offsetTop + (target.offsetHeight - h) / 2;
                        setIndicator({ top, height: h, visible: true });
                      }}
                      className="group relative cursor-pointer overflow-hidden py-1"
                    >
                      {/* Normal non-hovered text */}
                      <p
                        className={`heading-2 font-serif text-3xl sm:text-4xl text-golden group-hover:text-pine-green py-2 leading-none transition-all duration-500 select-none ${
                          isActive ? "-translate-y-[140%] pointer-events-none" : "translate-y-0 group-hover:-translate-y-[140%]"
                        }`}
                      >
                        {item.name}
                      </p>

                      {/* Italic hover/active text */}
                      <span
                        className={`heading-2 font-serif text-3xl sm:text-4xl text-pine-green absolute left-0 flex h-full w-full items-center gap-6 italic transition-all duration-500 select-none pointer-events-none ${
                          isActive ? "top-0" : "top-[140%] group-hover:top-0"
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom: Active Description */}
            <div className="border-t border-golden/40 relative min-h-35 w-full pt-8 pb-10">
              <div className="transition-opacity duration-300">
                <p className="kicker text-golden uppercase font-mono text-xs tracking-wider mb-4">
                  {currentAmenity.name}
                </p>
                <p className="paragraph max-w-xl font-sans text-sm sm:text-base leading-relaxed text-pine-green/85">
                  {currentAmenity.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Parallax Image Showcase (55vw) */}
        <div className="amenities-options-reveal-image reveal-image absolute top-0 right-0 h-full w-[55vw] max-xl:w-1/2 max-lg:hidden overflow-hidden bg-sand/30">
          <div className="reveal-image-zoom relative h-full w-full">
            <div className="amenities-parallaxWrap relative h-full w-full">
              {/* Active Image */}
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={currentAmenity.images[0]}
                  alt={currentAmenity.name}
                  fill
                  priority
                  className="object-cover scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Prev / Next Circular Arrow Navigation */}
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-8">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous amenity"
                  className="border-cream-dark/60 bg-pine-green/40 hover:border-golden hover:bg-sand group pointer-events-auto flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border backdrop-blur-[0.375rem] transition"
                >
                  <ArrowDownIcon className="text-cream group-hover:text-pine-green h-5 w-5 rotate-90 transition-colors" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next amenity"
                  className="border-cream-dark/60 bg-pine-green/40 hover:border-golden hover:bg-sand group pointer-events-auto flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border backdrop-blur-[0.375rem] transition"
                >
                  <ArrowDownIcon className="text-cream group-hover:text-pine-green h-5 w-5 -rotate-90 transition-colors" />
                </button>
              </div>

              {/* Image Counter & Pagination */}
              <div className="absolute bottom-10 left-12 z-10 flex items-center gap-4 text-cream font-mono text-xs tracking-widest bg-pine-green/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 pointer-events-none">
                <span>0{selectedIdx + 1}</span>
                <div className="w-10 h-px bg-white/40" />
                <span>0{amenities.length}</span>
              </div>
            </div>
          </div>

          {/* Overlaid Large Display Heading at Bottom-Right */}
          <p className="text-sand/40 heading-1 font-serif absolute right-20 bottom-20 z-3 uppercase text-[6vw] pointer-events-none select-none max-xl:hidden leading-none">
            Amenities
          </p>
        </div>
      </div>
    </section>
  );
}
