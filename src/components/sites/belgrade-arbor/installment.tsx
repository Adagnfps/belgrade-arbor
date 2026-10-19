"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { PdfIcon } from "./icons";

export function InstallmentSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const phases = [
    { percent: "20%", label: "Pre-contract" },
    { percent: "20%", label: "Zero level" },
    { percent: "20%", label: "Structure completed" },
    { percent: "30%", label: "Building 80% complete" },
    { percent: "10%", label: "Technical acceptance" },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 600px)").matches;

      // Entrance clipPath reveals for both halves
      gsap.timeline({
        scrollTrigger: {
          trigger: "#Installment .installment-trigger",
          start: "top 70%",
        },
      })
        .fromTo(
          "#Installment .installment-reveal-image",
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power2.inOut" },
          0
        )
        .fromTo(
          "#Installment .installment-reveal-content",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power2.inOut" },
          0
        )
        .fromTo(
          "#Installment .installment-reveal-image .reveal-image-zoom",
          { scale: 1.1 },
          { scale: 1, duration: 1.2, ease: "power2.inOut" },
          0
        );

      // Scrub parallax on the installment image
      gsap.set("#Installment .installment-parallax", {
        top: isMobile ? "-=5rem" : "-=10rem",
      });

      gsap.to("#Installment .installment-parallax", {
        top: isMobile ? "+=10rem" : "+=20rem",
        scrollTrigger: {
          trigger: "#Installment .installment-trigger",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="Installment">
      <div className="installment-trigger trigger relative flex min-h-screen items-stretch overflow-clip max-md:min-h-auto max-md:flex-col bg-vanilla">
        {/* Left Half: Reveal Image with Scrub Parallax */}
        <div className="installment-reveal-image absolute top-0 left-0 z-0 h-full w-[55vw] max-xl:w-1/2 max-lg:w-full max-md:relative max-md:h-auto max-md:w-full">
          <div className="relative h-full w-full max-md:h-[34rem]">
            <div className="reveal-image-zoom relative h-full w-full overflow-hidden">
              {/* Desktop image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/home/installment/image.webp"
                alt="Installment plan"
                loading="lazy"
                decoding="async"
                className="installment-parallax absolute top-1/2 left-0 h-[calc(100%+20rem)] w-full -translate-y-1/2 object-cover max-lg:hidden"
              />
              {/* Tablet/Mobile image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/home/installment/image-t.webp"
                alt="Installment plan"
                loading="lazy"
                decoding="async"
                className="installment-parallax absolute top-1/2 left-0 hidden h-[calc(100%+20rem)] w-full -translate-y-1/2 object-cover max-lg:block max-md:relative max-md:-top-80 max-md:translate-y-40"
              />
            </div>
          </div>
        </div>

        {/* Right Half Gradient Backdrop */}
        <div className="pointer-events-none absolute top-0 right-0 h-full w-[45vw] bg-[radial-gradient(at_right_bottom,#3E562E,#2F3A26)] max-xl:w-1/2 max-lg:hidden" />

        {/* Desktop/Tablet Content Panel */}
        <div className="installment-reveal-content relative z-1 flex w-full justify-end max-lg:px-10 max-md:hidden">
          <div className="wrapper flex justify-end py-20 max-xl:py-15 max-lg:px-0 max-lg:py-15">
            <div className="flex w-5/12 flex-col max-xl:w-1/2 max-lg:mt-120 max-lg:w-full max-lg:rounded-2xl max-lg:bg-[radial-gradient(at_right_bottom,#3E562E,#2F3A26)] max-lg:px-8 max-lg:py-8">
              <div className="flex h-full flex-col justify-between gap-16 pl-10 max-xl:pl-8 max-lg:relative max-lg:pl-0">
                <div>
                  <h2 className="heading-2 font-serif text-cream-dark mb-12">
                    Installment plan
                  </h2>

                  <ul className="divide-cream-dark/30 divide-y">
                    {phases.map((phase) => (
                      <li
                        key={phase.label}
                        className="border-b-green/40 mb-4 flex items-center justify-start gap-8 border-b pb-4"
                      >
                        <span className="heading-2 font-serif text-accent translate-y-0 whitespace-nowrap italic text-4xl">
                          {phase.percent}
                        </span>
                        <span className="detail font-sans text-sand text-lg tracking-wide">
                          {phase.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="/pdf/gradjevinska-dozvola.pdf"
                    className="inline-flex cursor-pointer items-center justify-between gap-4 rounded-full bg-golden px-8 py-4 text-xs font-semibold uppercase tracking-widest text-pine-green transition-all hover:bg-cream"
                  >
                    <span>Building permit</span>
                    <PdfIcon className="h-6 w-6 text-pine-green" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Content Panel */}
        <div className="installment-reveal-content hidden w-full max-md:block">
          <div className="bg-[radial-gradient(at_right_bottom,#3E562E,#2F3A26)] px-6 py-10">
            <h2 className="heading-2 font-serif text-cream-dark mb-6 text-3xl">
              Installment plan
            </h2>
            <ul className="divide-cream-dark/30 divide-y mb-8">
              {phases.map((phase) => (
                <li
                  key={phase.label}
                  className="border-b-green/40 flex items-center justify-start gap-6 border-b py-3"
                >
                  <span className="heading-2 font-serif text-accent whitespace-nowrap text-2xl">
                    {phase.percent}
                  </span>
                  <span className="detail font-sans text-sand text-sm">
                    {phase.label}
                  </span>
                </li>
              ))}
            </ul>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/pdf/gradjevinska-dozvola.pdf"
              className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-golden py-3.5 text-xs font-semibold uppercase tracking-widest text-pine-green active:bg-cream"
            >
              <span>Building permit</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
