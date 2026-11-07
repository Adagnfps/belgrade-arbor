"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { ArrowRightIcon, ArrowDownIcon } from "./icons";

interface ResidenceOptionsProps {
  onInquire?: (residenceName: string) => void;
}

export function ResidenceOptionsSection({ onInquire }: ResidenceOptionsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedTypeIdx, setSelectedTypeIdx] = useState(0);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ top: 0, height: 0, visible: false });

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
  const safeImgIdx = Math.min(currentImgIdx, currentType.images.length - 1);

  // Recalculate indicator position on active index change
  useEffect(() => {
    const el = itemRefs.current[selectedTypeIdx];
    if (el) {
      const h = el.offsetHeight * 0.8;
      const top = el.offsetTop + (el.offsetHeight - h) / 2;
      setIndicator({ top, height: h, visible: true });
    }
  }, [selectedTypeIdx]);

  // Reset image index when switching apartment type
  const handleSelectType = (idx: number) => {
    setSelectedTypeIdx(idx);
    setCurrentImgIdx(0);
  };

  const handlePrevImage = () => {
    setCurrentImgIdx((prev) => (prev > 0 ? prev - 1 : currentType.images.length - 1));
  };

  const handleNextImage = () => {
    setCurrentImgIdx((prev) => (prev < currentType.images.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Split entrance reveal
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#ResidenceOptions .residence-options-trigger",
            start: "top 70%",
          },
        })
        .fromTo(
          "#ResidenceOptions .reveal-image",
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power2.inOut" },
          0
        )
        .fromTo(
          "#ResidenceOptions .reveal-content",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power2.inOut" },
          0
        )
        .fromTo(
          "#ResidenceOptions .reveal-image-zoom",
          { scale: 1.1 },
          { scale: 1, duration: 1.2, ease: "power2.inOut" },
          0
        );

      // Parallax scroll on slider
      gsap.to("#ResidenceOptions .residence-gallery-sliderWrap", {
        y: "10%",
        scrollTrigger: {
          trigger: "#ResidenceOptions .residence-options-trigger",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="ResidenceOptions" className="relative min-h-screen bg-vanilla text-pine-green">
      <div className="residence-options-trigger trigger relative flex min-h-screen items-stretch py-20 max-xl:py-15">
        {/* Left Column: Interactive Selector */}
        <div className="reveal-content wrapper relative flex items-end justify-between z-10 w-full max-xl:w-1/2 max-lg:w-full">
          <div className="flex h-full w-5/12 flex-col items-start justify-between gap-10 pr-20 max-xl:w-full max-lg:pr-0">
            {/* Top: List of Units */}
            <div className="w-full">
              <p className="kicker uppercase font-mono text-xs tracking-widest text-golden font-medium mb-8">
                Residences
              </p>

              <div
                className="list relative"
                onMouseLeave={() => {
                  const el = itemRefs.current[selectedTypeIdx];
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

                {residenceTypes.map((type, idx) => {
                  const isActive = selectedTypeIdx === idx;
                  return (
                    <div
                      key={type.name}
                      ref={(el) => {
                        itemRefs.current[idx] = el;
                      }}
                      onClick={() => handleSelectType(idx)}
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
                        className={`heading-2 font-serif text-3xl sm:text-4xl text-golden group-hover:text-pine-green flex items-center gap-6 py-2 leading-none transition-all duration-500 select-none ${
                          isActive ? "-translate-y-[140%] pointer-events-none" : "translate-y-0 group-hover:-translate-y-[140%]"
                        }`}
                      >
                        {type.name}
                      </p>

                      {/* Italic hover/active text */}
                      <span
                        className={`heading-2 font-serif text-3xl sm:text-4xl text-pine-green absolute left-0 flex h-full w-full items-center gap-6 italic transition-all duration-500 select-none pointer-events-none ${
                          isActive ? "top-0" : "top-[140%] group-hover:top-0"
                        }`}
                      >
                        {type.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              <Link
                href="/residences"
                className="link text-pine-green/70 hover:text-golden text-xs uppercase tracking-widest font-mono mt-8 inline-block transition-colors"
              >
                View all →
              </Link>
            </div>

            {/* Bottom: Details & CTA Button */}
            <div className="border-t border-golden/40 relative w-full pt-8 mt-12 min-h-[14rem]">
              <div className="transition-opacity duration-300">
                <p className="flex items-center gap-5">
                  <span className="heading-2 font-serif text-4xl sm:text-5xl text-pine-green">
                    {currentType.unitsAvailable}
                  </span>
                  <span className="paragraph text-golden font-sans text-xs uppercase tracking-wider inline-block max-w-20 leading-tight">
                    units available
                  </span>
                </p>

                <p className="paragraph text-pine-green/80 text-sm mt-4 leading-relaxed font-sans max-w-sm">
                  Refined interior layout with private balcony, floor-to-ceiling windows, and premium finishes.
                </p>
              </div>

              <div className="mt-12 flex w-full justify-start">
                <button
                  type="button"
                  onClick={() => onInquire?.(currentType.name)}
                  className="group relative inline-flex items-center gap-4 rounded-full border border-pine-green bg-pine-green px-8 py-3.5 text-xs uppercase tracking-wider text-cream transition-all hover:bg-transparent hover:text-pine-green cursor-pointer"
                >
                  <span>Submit a request</span>
                  <ArrowRightIcon className="h-2.5 w-6 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Split Gallery Carousel (55vw) */}
        <div className="reveal-image absolute top-0 right-0 h-full w-[55vw] max-xl:w-1/2 max-lg:hidden overflow-hidden bg-sand/30">
          <div className="reveal-image-zoom relative h-full w-full">
            <div className="residence-gallery-parallaxWrap relative h-full w-full">
              <div className="residence-gallery-sliderWrap relative h-full w-full">
                {/* Active Image */}
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={currentType.images[safeImgIdx]}
                    alt={`${currentType.name} Layout`}
                    fill
                    priority
                    className="object-cover scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Arrow Navigation Controls */}
                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-8">
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label="Previous layout image"
                    className="border-cream-dark/60 bg-pine-green/40 hover:border-golden hover:bg-sand group pointer-events-auto flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border backdrop-blur-[0.375rem] transition"
                  >
                    <ArrowDownIcon className="text-cream group-hover:text-pine-green h-5 w-5 rotate-90 transition-colors" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label="Next layout image"
                    className="border-cream-dark/60 bg-pine-green/40 hover:border-golden hover:bg-sand group pointer-events-auto flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border backdrop-blur-[0.375rem] transition"
                  >
                    <ArrowDownIcon className="text-cream group-hover:text-pine-green h-5 w-5 -rotate-90 transition-colors" />
                  </button>
                </div>

                {/* Image Counter & Pagination */}
                <div className="absolute bottom-10 left-12 z-10 flex items-center gap-4 text-cream font-mono text-xs tracking-widest bg-pine-green/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 pointer-events-none">
                  <span>0{safeImgIdx + 1}</span>
                  <div className="w-10 h-px bg-white/40" />
                  <span>0{currentType.images.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section Tag Watermark */}
          <p className="text-sand/40 heading-1 font-serif absolute right-16 bottom-16 z-3 uppercase text-[6vw] pointer-events-none select-none max-xl:hidden leading-none">
            Residences
          </p>
        </div>
      </div>
    </section>
  );
}
