"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { ArrowRightIcon } from "./icons";

interface BusinessSpacesOptionsProps {
  onInquire?: (wingName: string) => void;
}

export function BusinessSpacesOptionsSection({ onInquire }: BusinessSpacesOptionsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedWingIdx, setSelectedWingIdx] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ top: 0, height: 0, visible: false });

  const wings = [
    {
      name: "Wing A",
      unitsAvailable: 11,
      description:
        "Adaptable to various types of businesses, with an optimal layout and natural lighting that fosters a productive work atmosphere.",
    },
    {
      name: "Wing B",
      unitsAvailable: 11,
      description:
        "Comfortable and functional, suitable for offices, coworking, or showrooms, with easy access and a professional environment.",
    },
    {
      name: "Wing V",
      unitsAvailable: 9,
      description:
        "Located along an impressive, representative entrance with a glass curtain wall. This business wing contains no residential units, offering business tenants an added level of privacy and a professional setting.",
    },
    {
      name: "Retail",
      unitsAvailable: 18,
      description:
        "Belgrade Arbor complex features 18 retail and hospitality units distributed evenly across Wing A and Wing B. All premises are situated on the ground floor at the building's front, ensuring maximum visibility and direct street access.",
    },
  ];

  const currentWing = wings[selectedWingIdx];

  // Recalculate indicator position on active index change
  useEffect(() => {
    const el = itemRefs.current[selectedWingIdx];
    if (el) {
      const h = el.offsetHeight * 0.8;
      const top = el.offsetTop + (el.offsetHeight - h) / 2;
      setIndicator({ top, height: h, visible: true });
    }
  }, [selectedWingIdx]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Split entrance reveal
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#BusinessSpacesOptions .retail-spaces-trigger",
            start: "top 70%",
          },
        })
        .fromTo(
          "#BusinessSpacesOptions .retail-spaces-reveal-image",
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power2.inOut" },
          0
        )
        .fromTo(
          "#BusinessSpacesOptions .retail-spaces-reveal-content",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power2.inOut" },
          0
        )
        .fromTo(
          "#BusinessSpacesOptions .reveal-image-zoom",
          { scale: 1.1 },
          { scale: 1, duration: 1.2, ease: "power2.inOut" },
          0
        );

      // Parallax scroll on image
      gsap.set("#BusinessSpacesOptions .retail-spaces-parallax", { top: "-=10rem" });
      gsap.to("#BusinessSpacesOptions .retail-spaces-parallax", {
        top: "+=20rem",
        scrollTrigger: {
          trigger: "#BusinessSpacesOptions .retail-spaces-trigger",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="BusinessSpacesOptions" className="relative">
      <div className="retail-spaces-trigger trigger relative flex min-h-screen items-stretch overflow-clip">
        {/* Left Column: Big Parallax Image (55vw) */}
        <div className="retail-spaces-reveal-image absolute top-0 left-0 z-0 h-full w-[55vw] max-xl:w-1/2 max-lg:hidden overflow-hidden">
          <div className="retail-spaces-trigger reveal-image-zoom relative h-full w-full overflow-hidden">
            <div className="retail-spaces-parallax absolute top-1/2 left-0 h-[calc(100%+20rem)] w-full -translate-y-1/2">
              <Image
                src="/home/business-options/business-options.webp"
                alt="Business spaces"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/25 pointer-events-none" />
            </div>

            {/* Overlaid Large Display Heading */}
            <p className="text-cream heading-1 font-serif absolute bottom-20 left-20 z-3 w-2/3 uppercase text-[6vw] leading-none pointer-events-none select-none max-xl:hidden">
              Business spaces
            </p>
          </div>
        </div>

        {/* Right Gradient Background Layer */}
        <div className="pointer-events-none absolute top-0 right-0 h-full w-[45vw] bg-[radial-gradient(at_right_bottom,#3E562E,#2F3A26)] max-xl:w-[50vw] max-lg:w-full" />

        {/* Right Column: Interactive Content */}
        <div className="retail-spaces-reveal-content wrapper relative z-1 flex items-end justify-end w-full max-lg:justify-start">
          <div className="relative z-1 flex h-full w-5/12 flex-col items-start justify-between gap-10 py-20 pl-10 max-xl:w-1/2 max-xl:py-15 max-lg:w-full max-lg:pl-0">
            {/* Wings List */}
            <div className="w-full">
              <div
                className="list relative"
                onMouseLeave={() => {
                  const el = itemRefs.current[selectedWingIdx];
                  if (el) {
                    const h = el.offsetHeight * 0.8;
                    const top = el.offsetTop + (el.offsetHeight - h) / 2;
                    setIndicator({ top, height: h, visible: true });
                  }
                }}
              >
                {/* Gold Moving Line Indicator */}
                <div
                  className="bg-golden pointer-events-none absolute top-0 -left-4 w-0.5 transition-all duration-300"
                  style={{
                    height: `${indicator.height}px`,
                    transform: `translateY(${indicator.top}px)`,
                    opacity: indicator.visible ? 1 : 0,
                  }}
                />

                {wings.map((wing, idx) => {
                  const isActive = selectedWingIdx === idx;
                  return (
                    <div
                      key={wing.name}
                      ref={(el) => {
                        itemRefs.current[idx] = el;
                      }}
                      onClick={() => setSelectedWingIdx(idx)}
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
                        className={`heading-2 font-serif text-3xl sm:text-4xl text-cream group-hover:text-golden flex items-center gap-6 py-2 leading-none transition-all duration-500 select-none ${
                          isActive ? "-translate-y-[140%] pointer-events-none" : "translate-y-0 group-hover:-translate-y-[140%]"
                        }`}
                      >
                        {wing.name}
                      </p>

                      {/* Italic hover/active text */}
                      <span
                        className={`heading-2 font-serif text-3xl sm:text-4xl text-golden absolute left-0 flex h-full w-full items-center gap-6 italic transition-all duration-500 select-none pointer-events-none ${
                          isActive ? "top-0" : "top-[140%] group-hover:top-0"
                        }`}
                      >
                        {wing.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Wing Details & Button */}
            <div className="relative min-h-[16.25rem] w-full">
              <div className="transition-opacity duration-300">
                <p className="heading-2 font-serif text-cream-dark text-[3rem] leading-none">
                  {currentWing.unitsAvailable}{" "}
                  <span className="text-sand font-sans text-xs tracking-wider uppercase block sm:inline sm:ml-2">
                    retail and hospitality units
                  </span>
                </p>

                <p className="paragraph text-cream mt-6 max-w-lg font-sans text-sm sm:text-base leading-relaxed opacity-90">
                  {currentWing.description}
                </p>
              </div>

              <div className="border-t border-white/20 mt-8 flex min-h-[8rem] items-end pt-8">
                <button
                  type="button"
                  onClick={() => onInquire?.(currentWing.name)}
                  className="group relative inline-flex items-center gap-4 rounded-full border border-golden bg-transparent px-8 py-3.5 text-xs uppercase tracking-wider text-cream transition-all hover:bg-golden hover:text-pine-green cursor-pointer"
                >
                  <span>Find out more</span>
                  <ArrowRightIcon className="h-2.5 w-6 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
