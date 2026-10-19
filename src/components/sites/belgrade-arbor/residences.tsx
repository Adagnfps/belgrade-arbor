"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

interface ResidencesProps {
  onInquire?: (residenceName: string) => void;
}

export function ResidencesSection({ onInquire }: ResidencesProps) {
  const sectionRef = useRef<HTMLElement>(null);
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

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023.98px)",
        },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };

          if (isDesktop) {
            // Pinned scroll experience on desktop: locks scene comfortably so visitors can read the text
            gsap.timeline({
              scrollTrigger: {
                trigger: "#Residences .residences-trigger",
                start: "top top",
                end: "+=70vh",
                pin: true,
                scrub: 1,
              },
            })
              .to("#Residences .background", { top: "+=15rem", ease: "power1.inOut" })
              .to("#Residences .portrait", { top: "+=4rem", ease: "power1.inOut" }, "<");
          } else {
            // Mobile parallax scrub without pinning
            gsap.timeline({
              scrollTrigger: {
                trigger: "#Residences .residences-trigger",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            })
              .to("#Residences .background", { top: "+=15rem", ease: "power1.inOut" })
              .to("#Residences .portrait", { top: "+=4rem", ease: "power1.inOut" }, "<");
          }
        }
      );

      // Container reveal clip - starts promptly as the section enters the viewport
      gsap.timeline({
        scrollTrigger: {
          trigger: "#Residences .residences-trigger",
          start: "top 95%",
        },
      })
        .fromTo(
          "#Residences .residences-trigger",
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power2.inOut" },
          0
        )
        .fromTo(
          "#Residences .background",
          { scale: 1.1 },
          { scale: 1, duration: 0.8, ease: "power2.inOut" },
          0
        );

      // Vignette card clip reveal - opens early and promptly so text is fully unmasked before reading zone
      gsap.fromTo(
        "#Residences .videoWrap",
        { clipPath: "inset(0% 100% 0% 0%)", scale: 1.05 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#Residences .residences-trigger",
            start: "top 95%",
          },
        }
      );

      // Vignette text label fade-in - fades in cleanly after card opens, never sliced by the mask
      gsap.fromTo(
        "#Residences .vignette-text",
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#Residences .residences-trigger",
            start: "top 90%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="Residences" className="relative z-1 bg-vanilla">
      {/* 1. Full Bleed Parallax Scene */}
      <div className="residences-trigger relative flex min-h-screen w-full items-stretch overflow-clip">
        {/* Parallax Background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/home/residences/residences-hero.webp"
          alt="Residences"
          className="background absolute top-1/3 h-[calc(100%+20rem)] w-full -translate-y-1/2 object-cover object-[20%_50%]"
          loading="eager"
        />

        <div className="pointer-events-none absolute inset-0 bg-black/30" />

        <div className="wrapper relative z-1 flex items-stretch max-lg:flex-col">
          <div className="w-1/12 max-2xl:hidden" />

          {/* Portrait Vignette Card */}
          <div className="w-1/3 self-center max-lg:w-2/3 max-lg:pt-10 max-md:w-3/4 max-md:self-end max-md:pt-20">
            <div className="videoWrap relative aspect-[1.43/1] w-full overflow-hidden rounded-[1.25rem] shadow-2xl border border-white/10">
              {/* Parallax Image Layer */}
              <div className="portrait absolute -top-8 left-0 h-[calc(100%+10rem)] w-full overflow-hidden">
                <Image
                  src="/home/residences/residences-hero.webp"
                  alt="Living Sanctuary"
                  fill
                  className="object-cover scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
              </div>

              {/* Anchored Text Label */}
              <div className="vignette-text absolute bottom-6 left-6 z-10 text-cream pointer-events-none">
                <span className="small text-golden uppercase tracking-wider text-xs font-mono font-medium block">
                  Curated Interiors
                </span>
                <p className="font-serif text-xl sm:text-2xl mt-1 text-cream drop-shadow-md">
                  Refined Natural Materials
                </p>
              </div>
            </div>
          </div>

          {/* Right Column Title & Paragraph */}
          <div className="flex w-7/12 flex-col items-end justify-between py-30 max-2xl:w-2/3 max-lg:h-full max-lg:w-full max-lg:pt-50 max-lg:pb-10 max-md:items-start max-md:gap-10 max-md:pt-23">
            <p className="paragraph text-sand w-3/7 max-2xl:w-1/2 max-md:w-3/4 text-lg leading-relaxed font-sans">
              Designed with contemporary living in mind, each apartment at Belgrade
              Arbor balances functionality, comfort, and aesthetics. Open-plan
              layouts, excellent natural light, refined materials, and carefully
              considered details create spaces that feel both welcoming and enduring.
            </p>
            <h2 className="hero font-serif text-cream-dark uppercase text-[8rem] max-xl:text-[7rem] max-lg:text-[5.5rem] max-md:text-[3.5rem] leading-none select-none max-lg:mt-50 max-md:mt-0 text-right max-md:text-left">
              Residences
            </h2>
          </div>
        </div>
      </div>

      {/* 2. Interactive Residence Options */}
      <div id="ResidenceOptions" className="py-24 sm:py-32 bg-vanilla text-pine-green">
        <div className="wrapper">
          <div className="bg-sand/40 rounded-3xl p-6 sm:p-12 border border-pine-green/10">
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
      </div>
    </section>
  );
}
