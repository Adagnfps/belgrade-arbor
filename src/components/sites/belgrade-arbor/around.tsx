"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { CarIcon, WalkIcon } from "./icons";

export function AroundSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const locations = [
    {
      name: "Railway Station",
      carDistance: "1 min",
      walkDistance: "3 min",
      description:
        "Tošin Bunar is a railway station located in the municipality of Novi Beograd. It is served by BG Voz. The railroad continues to Zemun in one direction, and New Belgrade and Old Belgrade in the other direction. Tošin Bunar railway station consists of 2 railway tracks with 2 side platforms.",
      image: "/home/around/tosin.webp",
    },
    {
      name: "Savremena Elementary School",
      carDistance: "1 min",
      walkDistance: "2 min",
      description:
        "Savremena Elementary School is a part of an education system unique in the region, with over 20 years' experience. It was built on the foundation of Savremena International School, whose results serve as the best proof of their leadership position at all levels of education.",
      image: "/home/around/savremena.webp",
    },
    {
      name: "West 65",
      carDistance: "1 min",
      walkDistance: "3 min",
      description:
        "West 65 is a modern residential and business complex located in New Belgrade's Block 65, known for its luxury apartments, shopping center, and a 155-meter skyscraper tower. The complex includes multiple residential buildings, pedestrian areas, restaurants, shops, and recreational facilities, all positioned in a well-connected part of the city.",
      image: "/home/around/west.webp",
    },
    {
      name: "Airport City",
      carDistance: "2 min",
      walkDistance: "4 min",
      description:
        "Airport City Belgrade is the largest business and commercial complex in Belgrade. It consists mainly of modern office buildings that host international companies, restaurants, cafes, shops, and other business-related services. Developed as one of the first modern business parks in Serbia, Airport City has become an important corporate and economic hub in Belgrade.",
      image: "/home/around/airportcity.webp",
    },
    {
      name: "Hangar Food Market",
      carDistance: "2 min",
      walkDistance: "4 min",
      description:
        "Hangar Food Market at Airport City Belgrade is a modern food and social hub that brings together a variety of local and international cuisines in one vibrant space. With its contemporary design and lively atmosphere, it has become a popular destination for business meetings, casual dining, and after-work gatherings.",
      image: "/home/around/hangar.webp",
    },
    {
      name: "Airport Nikola Tesla",
      carDistance: "9 min",
      walkDistance: null,
      description:
        "Nikola Tesla Airport, officially Belgrade Nikola Tesla Airport, is the main international airport in Serbia. It serves as the country's busiest airport and the primary hub for Air Serbia, connecting Belgrade with destinations across Europe, Middle East, North America, and other regions. Named after the famous Serbian-American inventor Nikola Tesla, the airport has undergone major modernization and expansion in recent years to support growing passenger traffic.",
      image: "/home/around/aerodrom.webp",
    },
  ];

  const active = locations[selectedIndex];

  // Indicator position calculation
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0, visible: true });

  useEffect(() => {
    const el = itemRefs.current[selectedIndex];
    if (el) {
      setIndicatorStyle({
        top: el.offsetTop,
        height: el.offsetHeight,
        visible: true,
      });
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: "#Around",
          start: "top 70%",
        },
      }).fromTo(
        "#Around .reveal-image",
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power2.inOut" }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="Around" className="relative bg-vanilla text-pine-green py-24 sm:py-32">
      <div className="wrapper">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading and Authentic Editorial List */}
          <div className="w-full lg:w-5/12">
            <p className="kicker uppercase font-mono text-xs tracking-widest text-golden font-medium">
              Connectivity &amp; Lifestyle
            </p>
            <h2 className="heading-2 font-serif text-pine-green mt-2 mb-10 text-4xl sm:text-5xl">
              What&apos;s around
            </h2>

            {/* List with sliding indicator bar */}
            <div className="list border-b border-golden/30 relative pt-4 pb-8">
              {/* Active Indicator Line */}
              <div
                className="bg-golden pointer-events-none absolute top-0 -left-4 w-1 rounded-full transition-all duration-300"
                style={{
                  height: `${indicatorStyle.height}px`,
                  transform: `translateY(${indicatorStyle.top}px)`,
                  opacity: indicatorStyle.visible ? 1 : 0,
                }}
              />

              {locations.map((loc, idx) => {
                const isActive = selectedIndex === idx;
                return (
                  <div
                    key={loc.name}
                    ref={(el) => {
                      itemRefs.current[idx] = el;
                    }}
                    onClick={() => setSelectedIndex(idx)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className="group relative cursor-pointer overflow-hidden transition-colors"
                  >
                    {/* Normal static title */}
                    <p
                      className={`font-serif text-2xl sm:text-3xl py-3.5 leading-tight transition-all duration-500 ease-in-out select-none ${
                        isActive
                          ? "-translate-y-full opacity-0 text-golden pointer-events-none"
                          : "text-pine-green translate-y-0 opacity-100 group-hover:-translate-y-full group-hover:opacity-0 group-hover:text-golden"
                      }`}
                    >
                      {loc.name}
                    </p>

                    {/* Italic hover/active reveal */}
                    <span
                      className={`font-serif text-2xl sm:text-3xl italic absolute inset-0 py-3.5 leading-tight transition-all duration-500 ease-in-out text-golden select-none pointer-events-none ${
                        isActive
                          ? "translate-y-0 opacity-100"
                          : "translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                      }`}
                    >
                      {loc.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Synchronized Details Pane */}
            <div className="relative mt-8 min-h-[14rem]">
              {locations.map((loc, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <div
                    key={`${loc.name}-details`}
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      opacity: isSelected ? 1 : 0,
                      pointerEvents: isSelected ? "auto" : "none",
                    }}
                  >
                    <p className="kicker uppercase font-mono text-xs tracking-wider text-golden mb-3">
                      {loc.name}
                    </p>

                    <div className="divide-x divide-golden/40 flex items-center mb-4">
                      {loc.carDistance && (
                        <div className="flex items-center gap-2 pr-4 text-sm font-sans font-medium text-pine-green">
                          <CarIcon className="text-golden h-6 w-6" />
                          <span>{loc.carDistance}</span>
                        </div>
                      )}
                      {loc.walkDistance && (
                        <div className="flex items-center gap-2 pl-4 text-sm font-sans font-medium text-pine-green">
                          <WalkIcon className="text-golden h-6 w-6" />
                          <span>{loc.walkDistance}</span>
                        </div>
                      )}
                    </div>

                    <p className="paragraph text-pine-green/80 text-sm leading-relaxed font-sans">
                      {loc.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Sticky Showcase Photography with clipPath Reveal */}
          <div className="w-full lg:w-7/12 lg:sticky lg:top-28">
            <div className="reveal-image relative aspect-16/10 w-full overflow-hidden rounded-[1.5rem] border border-pine-green/10 shadow-2xl">
              <Image
                src={active.image}
                alt={active.name}
                fill
                priority
                className="object-cover transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-cream">
                <span className="font-serif text-2xl drop-shadow">{active.name}</span>
                <span className="text-xs font-mono tracking-widest uppercase bg-pine-green/80 px-3.5 py-1.5 rounded-full border border-white/20">
                  0{selectedIndex + 1} / 0{locations.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
