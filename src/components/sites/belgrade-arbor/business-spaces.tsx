"use client";

import { useState } from "react";
import Image from "next/image";

interface BusinessSpacesProps {
  onInquire?: (wingName: string) => void;
}

export function BusinessSpacesSection({ onInquire }: BusinessSpacesProps) {
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

  return (
    <section id="BusinessSpaces" className="relative z-1 bg-sand/30 text-pine-green py-24 sm:py-32">
      <div className="wrapper">
        {/* Header Block */}
        <div className="max-w-3xl mb-16">
          <span className="small tracking-widest text-golden uppercase font-medium">
            Commercial Prestige
          </span>
          <h2 className="heading-1 font-serif text-pine-green mt-3">
            Office spaces and retails
          </h2>
          <p className="paragraph mt-6 text-pine-green/80 text-lg leading-relaxed font-sans">
            Business spaces and retail units at Belgrade Arbor are designed for
            companies of all sizes that see their business address as more than just
            a location—it is a reflection of their identity, reputation, and
            long-term vision.
          </p>
        </div>

        {/* Hero Visual */}
        <div className="relative aspect-21/9 w-full overflow-hidden rounded-3xl border border-pine-green/10 shadow-xl mb-16">
          <Image
            src="/home/business/business.webp"
            alt="Belgrade Arbor Commercial Facade"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 text-cream">
            <span className="small text-golden tracking-widest uppercase">
              Representative Architecture
            </span>
            <p className="font-serif text-2xl mt-1">Class-A Commercial Spaces</p>
          </div>
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
    </section>
  );
}
