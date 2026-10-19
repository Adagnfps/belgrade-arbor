"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

interface BusinessSpacesProps {
  onInquire?: (wingName: string) => void;
}

export function BusinessSpacesSection({ onInquire }: BusinessSpacesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedWing, setSelectedWing] = useState(0);

  const wings = [
    {
      name: "Wing A",
      tag: "Corporate Offices",
      unitsAvailable: 11,
      description:
        "Adaptable to various types of businesses, with an optimal layout and natural lighting that fosters a productive work atmosphere.",
    },
    {
      name: "Wing B",
      tag: "Modern Workspaces",
      unitsAvailable: 11,
      description:
        "Comfortable and functional, suitable for offices, coworking, or showrooms, with easy access and a professional environment.",
    },
    {
      name: "Wing V",
      tag: "Private Commercial Wing",
      unitsAvailable: 9,
      description:
        "Located along an impressive, representative entrance with a glass curtain wall. This business wing contains no residential units, offering business tenants an added level of privacy and a professional setting.",
    },
    {
      name: "Retail",
      tag: "Ground Floor Commercial",
      unitsAvailable: 18,
      description:
        "Belgrade Arbor complex features 18 retail and hospitality units distributed evenly across Wing A and Wing B. All premises are situated on the ground floor at the building's front, ensuring maximum visibility and direct street access.",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Parallax on background and card
      gsap.timeline({
        scrollTrigger: {
          trigger: "#BusinessSpaces .business-trigger",
          scrub: true,
        },
      })
        .to("#BusinessSpaces .background", { top: "+=20rem", ease: "power1.inOut" })
        .to("#BusinessSpaces .portrait", { top: "+=10rem", ease: "power1.inOut" }, "<");

      // Container reveal clip
      gsap.timeline({
        scrollTrigger: {
          trigger: "#BusinessSpaces .business-trigger",
          start: "top 70%",
        },
      })
        .fromTo(
          "#BusinessSpaces .business-trigger",
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.7, ease: "power2.inOut" },
          0
        )
        .fromTo(
          "#BusinessSpaces .background",
          { scale: 1.1 },
          { scale: 1, duration: 1.7, ease: "power2.inOut" },
          0
        );

      // Commercial card clip reveal
      gsap.fromTo(
        "#BusinessSpaces .videoWrap",
        { clipPath: "inset(0% 100% 0% 0%)", scale: 1.1 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.2,
          delay: 1.3,
          ease: "power2.inOut",
          scrollTrigger: { trigger: "#BusinessSpaces .videoWrap" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="BusinessSpaces" className="relative z-1 bg-vanilla">
      {/* 1. Full Bleed Parallax Scene */}
      <div className="business-trigger relative flex min-h-screen w-full items-stretch overflow-clip">
        {/* Parallax Background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/home/business/business.webp"
          alt="Business Spaces"
          className="background absolute top-1/3 h-[calc(100%+20rem)] w-full -translate-y-1/2 object-cover object-[20%_50%]"
          loading="eager"
        />

        <div className="pointer-events-none absolute inset-0 bg-black/35" />

        <div className="wrapper relative z-1 flex items-stretch max-lg:flex-col">
          <div className="w-1/12 max-2xl:hidden" />

          {/* Portrait Commercial Vignette */}
          <div className="w-1/3 pt-30 max-lg:w-2/3 max-lg:pt-10 max-md:w-3/4 max-md:self-end max-md:pt-20">
            <div className="videoWrap relative aspect-[1.43/1] w-full overflow-hidden rounded-[1.25rem] shadow-2xl">
              <div className="portrait relative h-full w-full overflow-hidden rounded-[1.25rem] border border-white/10">
                <Image
                  src="/home/business/business.webp"
                  alt="Representative Architecture"
                  fill
                  className="object-cover scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-cream">
                  <span className="small text-golden uppercase tracking-wider text-xs font-mono">
                    Representative Entrance
                  </span>
                  <p className="font-serif text-xl mt-1">Class-A Commercial Address</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Title & Paragraph */}
          <div className="flex w-7/12 flex-col items-end justify-between py-30 max-2xl:w-2/3 max-lg:h-full max-lg:w-full max-lg:pt-50 max-lg:pb-10 max-md:items-start max-md:gap-10 max-md:pt-23">
            <p className="paragraph text-sand w-3/7 max-2xl:w-1/2 max-md:w-3/4 text-lg leading-relaxed">
              Business spaces and retail units at Belgrade Arbor are designed for
              companies of all sizes that see their business address as more than just
              a location—it is a reflection of their identity, reputation, and
              long-term vision.
            </p>
            <h2 className="hero font-serif text-cream-dark uppercase text-[7.5rem] max-xl:text-[6.5rem] max-lg:text-[5rem] max-md:text-[3rem] leading-none select-none max-lg:mt-50 max-md:mt-0 text-right max-md:text-left">
              Office Spaces & Retails
            </h2>
          </div>
        </div>
      </div>

      {/* 2. Options Grid */}
      <div id="BusinessSpacesOptions" className="py-24 sm:py-32 bg-vanilla text-pine-green">
        <div className="wrapper">
          <div className="max-w-3xl mb-16">
            <span className="small tracking-widest text-golden uppercase font-medium">
              Flexible Spatial Configurations
            </span>
            <h3 className="heading-2 font-serif text-pine-green mt-3">
              Commercial Wings & Retail Units
            </h3>
          </div>

          {/* Wing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {wings.map((wing, idx) => {
              const isSelected = selectedWing === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedWing(idx)}
                  className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? "bg-pine-green text-cream border-pine-green shadow-xl scale-[1.02]"
                      : "bg-white/80 border-pine-green/10 text-pine-green hover:border-golden/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="small font-mono text-xs text-golden uppercase tracking-wider">
                        {wing.tag}
                      </span>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-mono ${
                          isSelected
                            ? "bg-golden/20 text-cream"
                            : "bg-pine-green/10 text-pine-green"
                        }`}
                      >
                        {wing.unitsAvailable} units
                      </span>
                    </div>

                    <h3
                      className={`font-serif text-2xl sm:text-3xl mb-4 ${
                        isSelected ? "text-cream" : "text-pine-green"
                      }`}
                    >
                      {wing.name}
                    </h3>

                    <p
                      className={`text-sm leading-relaxed ${
                        isSelected ? "text-sand/90" : "text-pine-green/75"
                      }`}
                    >
                      {wing.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-current/10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onInquire?.(wing.name);
                      }}
                      className={`group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-sans transition-colors cursor-pointer ${
                        isSelected
                          ? "text-golden hover:text-sand"
                          : "text-pine-green hover:text-green"
                      }`}
                    >
                      <span>Find out more</span>
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
