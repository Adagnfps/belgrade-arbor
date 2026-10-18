"use client";

import { useState } from "react";
import Image from "next/image";

interface IntroductionProps {
  onExplore3D?: () => void;
}

export function Introduction({ onExplore3D }: IntroductionProps) {
  const [activeScreen, setActiveScreen] = useState(0);

  const screens = [
    {
      tag: "BELGRADE ARBOR DESIGN",
      heading:
        "The visual identity of Belgrade Arbor is defined by an elegant facade inspired by the form of a tree canopy, a symbol of growth, balance, and longevity.",
      cta: "Explore in 3D",
      action: onExplore3D,
      image: "/home/introduction/image1.webp",
    },
    {
      tag: "URBAN ECOSYSTEM",
      heading:
        "Belgrade Arbor isn't just another addition to the skyline; it's a curated urban ecosystem that evolves with the rhythm of the city.",
      cta: "Explore in 3D",
      action: onExplore3D,
      image: "/home/introduction/image2.webp",
    },
    {
      tag: "PRESTIGIOUS LIVING",
      heading: "A New Chapter in Prestigious Living",
      paragraph:
        "A clear architectural vision, a carefully selected location, and thoughtfully curated amenities make Belgrade Arbor a residential destination where quality, comfort, and long-term value naturally converge.",
      cta: "Explore Our Apartments",
      href: "#Residences",
      image: "/home/introduction/image3.webp",
    },
  ];

  return (
    <section id="Introduction" className="relative min-h-screen bg-pine-green text-cream overflow-hidden">
      {/* Background Architectural Canvas */}
      <div className="absolute inset-0 z-0">
        <Image
          src={screens[activeScreen].image}
          alt="Belgrade Arbor Architecture"
          fill
          priority
          className="object-cover object-center transition-all duration-1000 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-green via-pine-green/60 to-transparent" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Floating Canopy Leaf Layer */}
      <div className="pointer-events-none absolute -top-20 -right-20 z-10 w-96 h-96 lg:w-[600px] lg:h-[600px] opacity-75">
        <Image
          src="/home/introduction/leafs.webp"
          alt="Arbor Canopy Foliage"
          fill
          className="object-contain"
        />
      </div>

      {/* Hero Content Area */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between pt-36 pb-20 wrapper">
        {/* Top Tagline */}
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-golden/70" />
          <span className="small tracking-widest text-golden uppercase">
            {screens[activeScreen].tag}
          </span>
        </div>

        {/* Central Display Typography */}
        <div className="my-auto max-w-4xl py-12">
          <h1 className="heading-2 font-serif text-cream transition-all duration-700 ease-out">
            {screens[activeScreen].heading}
          </h1>

          {screens[activeScreen].paragraph && (
            <p className="paragraph mt-6 max-w-2xl text-sand/90 text-lg leading-relaxed">
              {screens[activeScreen].paragraph}
            </p>
          )}

          <div className="mt-10 flex items-center gap-6">
            {screens[activeScreen].href ? (
              <a
                href={screens[activeScreen].href}
                className="group inline-flex items-center gap-3 rounded-full border border-golden bg-golden/10 px-8 py-3.5 text-xs uppercase tracking-widest text-sand backdrop-blur-sm transition-all hover:bg-golden hover:text-pine-green"
              >
                <span>{screens[activeScreen].cta}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            ) : (
              <button
                type="button"
                onClick={screens[activeScreen].action}
                className="group inline-flex cursor-pointer items-center gap-3 rounded-full border border-golden bg-golden/10 px-8 py-3.5 text-xs uppercase tracking-widest text-sand backdrop-blur-sm transition-all hover:bg-golden hover:text-pine-green"
              >
                <span>{screens[activeScreen].cta}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Progress Controls */}
        <div className="flex items-end justify-between border-t border-white/10 pt-6">
          <div className="flex items-center gap-4">
            {screens.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveScreen(idx)}
                className={`group flex items-center gap-2 cursor-pointer transition-all ${
                  activeScreen === idx
                    ? "text-golden font-medium"
                    : "text-cream/50 hover:text-cream"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              >
                <span
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    activeScreen === idx ? "w-8 bg-golden" : "w-2 bg-white/30"
                  }`}
                />
                <span className="small font-mono">0{idx + 1}</span>
              </button>
            ))}
          </div>

          <div className="small text-sand/60 hidden sm:block uppercase tracking-wider">
            Scroll or toggle to explore
          </div>
        </div>
      </div>
    </section>
  );
}
