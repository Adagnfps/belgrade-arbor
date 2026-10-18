"use client";

import { useState } from "react";
import Image from "next/image";

export function AroundSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  return (
    <section id="Around" className="relative bg-vanilla text-pine-green py-24 sm:py-32">
      <div className="wrapper">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading and Interactive Destination Cards */}
          <div className="w-full lg:w-1/2">
            <span className="small tracking-widest text-golden uppercase font-medium">
              Connectivity &amp; Lifestyle
            </span>
            <h2 className="heading-2 font-serif text-pine-green mt-2 mb-8">
              What&apos;s around
            </h2>

            <div className="space-y-4">
              {locations.map((loc, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedIndex(idx)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`p-6 rounded-2xl cursor-pointer border transition-all duration-300 ${
                      isSelected
                        ? "bg-pine-green text-cream border-pine-green shadow-lg"
                        : "bg-sand/40 border-pine-green/10 hover:border-golden/50 text-pine-green"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3
                        className={`font-serif text-xl sm:text-2xl ${
                          isSelected ? "text-cream" : "text-pine-green"
                        }`}
                      >
                        {loc.name}
                      </h3>

                      <div className="flex items-center gap-2 shrink-0">
                        {loc.carDistance && (
                          <span
                            className={`small px-3 py-1 rounded-full text-xs font-mono ${
                              isSelected
                                ? "bg-golden/30 text-sand"
                                : "bg-pine-green/10 text-pine-green"
                            }`}
                          >
                            🚗 {loc.carDistance}
                          </span>
                        )}
                        {loc.walkDistance && (
                          <span
                            className={`small px-3 py-1 rounded-full text-xs font-mono ${
                              isSelected
                                ? "bg-golden/30 text-sand"
                                : "bg-pine-green/10 text-pine-green"
                            }`}
                          >
                            🚶 {loc.walkDistance}
                          </span>
                        )}
                      </div>
                    </div>

                    {isSelected && (
                      <p className="mt-4 text-sand/90 text-sm leading-relaxed animate-in fade-in duration-300">
                        {loc.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Sticky Showcase Photography */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-28">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl border border-pine-green/15 shadow-2xl">
              <Image
                src={active.image}
                alt={active.name}
                fill
                className="object-cover transition-all duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-cream">
                <span className="font-serif text-2xl drop-shadow">{active.name}</span>
                <span className="text-xs font-mono tracking-widest uppercase bg-pine-green/80 px-3 py-1.5 rounded-full border border-white/20">
                  {selectedIndex + 1} / {locations.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
