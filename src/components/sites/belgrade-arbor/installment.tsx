"use client";

import { useState } from "react";
import Image from "next/image";

export function InstallmentSection() {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      step: "01",
      percentage: "20%",
      title: "Pre-contract",
      description:
        "Initial installment payment upon signing the preliminary purchase contract, locking in your chosen apartment or office unit.",
    },
    {
      step: "02",
      percentage: "20%",
      title: "Zero level",
      description:
        "Execution of ground-level structural milestone and completion of the three-level underground foundation garage.",
    },
    {
      step: "03",
      percentage: "20%",
      title: "Structure completed",
      description:
        "Full structural concrete topping out of the residential and business canopy wings.",
    },
    {
      step: "04",
      percentage: "20%",
      title: "Building 80% complete",
      description:
        "Installation of the bespoke facade, exterior architectural glazing, and interior partition installations.",
    },
    {
      step: "05",
      percentage: "20%",
      title: "Technical acceptance",
      description:
        "Final handover, municipal technical inspection approval, and key distribution for your new residence.",
    },
  ];

  return (
    <section id="Installment" className="relative z-1 bg-sand/30 text-pine-green py-24 sm:py-32">
      <div className="wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Architectural Milestone Render */}
          <div className="lg:col-span-5">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl border border-pine-green/15 shadow-2xl">
              <Image
                src="/home/installment/image.webp"
                alt="Belgrade Arbor Construction Milestone"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-cream">
                <span className="small text-golden tracking-widest uppercase">
                  Verified Legal Security
                </span>
                <p className="font-serif text-2xl mt-1">Legally Secured Investment</p>
              </div>
            </div>
          </div>

          {/* Right Column: 5-Phase Plan Timeline */}
          <div className="lg:col-span-7">
            <span className="small tracking-widest text-golden uppercase font-medium">
              Flexible Financial Structure
            </span>
            <h2 className="heading-1 font-serif text-pine-green mt-3 mb-10">
              Installment plan
            </h2>

            <div className="space-y-4">
              {phases.map((phase, idx) => {
                const isActive = activePhase === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActivePhase(idx)}
                    className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-pine-green text-cream border-pine-green shadow-xl"
                        : "bg-white/70 border-pine-green/10 hover:border-golden/50 text-pine-green"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs opacity-60">
                          {phase.step}
                        </span>
                        <h3
                          className={`font-serif text-xl sm:text-2xl ${
                            isActive ? "text-cream" : "text-pine-green"
                          }`}
                        >
                          {phase.title}
                        </h3>
                      </div>
                      <span
                        className={`font-serif text-2xl sm:text-3xl font-light ${
                          isActive ? "text-golden" : "text-pine-green/60"
                        }`}
                      >
                        {phase.percentage}
                      </span>
                    </div>

                    {isActive && (
                      <p className="mt-4 text-sand/90 text-sm leading-relaxed border-t border-white/10 pt-4 animate-in fade-in duration-300">
                        {phase.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Action CTA */}
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#Contact"
                className="inline-flex cursor-pointer items-center gap-3 rounded-full bg-pine-green px-8 py-4 text-xs uppercase tracking-widest text-cream transition-all hover:bg-green"
              >
                <span>Building permit</span>
                <span>📄</span>
              </a>
              <span className="small text-pine-green/70">
                Official building permit and land registration documentation available upon request
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
