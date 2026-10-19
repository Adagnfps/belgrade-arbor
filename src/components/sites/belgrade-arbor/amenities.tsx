"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export function AmenitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
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

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Background and video card parallax scrub
      gsap.timeline({
        scrollTrigger: {
          trigger: "#Amenities .amenities-trigger",
          scrub: true,
        },
      })
        .to("#Amenities .background", { top: "+=20rem", ease: "power1.inOut" })
        .to("#Amenities .portrait", { top: "+=10rem", ease: "power1.inOut" }, "<");

      // Container reveal clip
      gsap.timeline({
        scrollTrigger: {
          trigger: "#Amenities .amenities-trigger",
          start: "top 70%",
        },
      })
        .fromTo(
          "#Amenities .amenities-trigger",
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.7, ease: "power2.inOut" },
          0
        )
        .fromTo(
          "#Amenities .background",
          { scale: 1.1 },
          { scale: 1, duration: 1.7, ease: "power2.inOut" },
          0
        );

      // Video card clip reveal
      gsap.fromTo(
        "#Amenities .videoWrap",
        { clipPath: "inset(0% 100% 0% 0%)", scale: 1.1 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.2,
          delay: 1.3,
          ease: "power2.inOut",
          scrollTrigger: { trigger: "#Amenities .videoWrap" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="Amenities" className="relative z-1 bg-vanilla">
      {/* 1. Full-bleed Hero Scene with Parallax Video */}
      <div className="amenities-trigger relative flex min-h-screen w-full items-stretch overflow-clip">
        {/* Parallax Background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/home/amenities/amenities-bg.webp"
          alt="Amenities"
          className="background absolute top-1/3 h-[calc(100%+20rem)] w-full -translate-y-1/2 object-cover max-md:object-[60%_50%]"
          loading="eager"
        />

        <div className="pointer-events-none absolute inset-0 bg-black/30" />

        <div className="wrapper relative z-1 flex items-stretch max-lg:flex-col-reverse max-md:flex-col">
          {/* Left Column with Portrait Video */}
          <div className="flex w-1/3 flex-col items-start justify-between py-30 max-lg:w-2/3 max-lg:flex-col-reverse max-lg:pt-0 max-lg:pb-15 max-md:w-3/4 max-md:pt-10 max-md:pb-5">
            <div className="videoWrap relative aspect-[1.43/1] w-full overflow-hidden rounded-[1.25rem] shadow-2xl">
              <video
                src="/home/amenities/amenities.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="portrait absolute -top-35 left-1/2 h-auto w-[200%] max-w-none -translate-x-1/2 object-cover"
              />
            </div>

            <p className="paragraph text-sand w-3/4 max-xl:w-full max-lg:mb-40 max-md:hidden text-lg leading-relaxed">
              Belgrade Arbor is more than a residence. It features two private gyms,
              two exclusive rooftop parks for residents and their guests, and a
              top-floor café-restaurant. These are curated spaces for unwinding and
              socializing a true sanctuary from the urban hustle, right at your doorstep.
            </p>
          </div>

          {/* Right Column with Huge Display Heading */}
          <div className="flex w-2/3 flex-col items-end justify-end gap-5 py-30 max-lg:items-start max-lg:pt-55 max-lg:pb-8 max-md:w-full max-md:flex-1 max-md:pt-0">
            <h2 className="hero font-serif text-cream-dark whitespace-nowrap uppercase text-[8rem] max-xl:text-[7rem] max-lg:text-[5.5rem] max-md:text-[3.5rem] leading-none select-none">
              Amenities
            </h2>
            <p className="paragraph text-sand mt-auto hidden w-3/4 pt-10 max-md:block text-base leading-relaxed">
              Belgrade Arbor is more than a residence. It features two private gyms,
              two exclusive rooftop parks for residents and their guests, and a
              top-floor café-restaurant.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Interactive Amenities Showcase */}
      <div id="AmenitiesOptions" className="py-24 sm:py-32 bg-vanilla text-pine-green">
        <div className="wrapper">
          <div className="max-w-3xl mb-12">
            <span className="small tracking-widest text-golden uppercase font-medium">
              Curated Living Spaces
            </span>
            <h3 className="heading-2 font-serif text-pine-green mt-2">
              Elevated Comfort & Wellness
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-sand/40 p-8 sm:p-12 rounded-3xl border border-pine-green/10">
            {/* Tabs */}
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
                        <h4
                          className={`font-serif text-xl sm:text-2xl mt-1 ${
                            isActive ? "text-cream" : "text-pine-green"
                          }`}
                        >
                          {item.name}
                        </h4>
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
      </div>
    </section>
  );
}
