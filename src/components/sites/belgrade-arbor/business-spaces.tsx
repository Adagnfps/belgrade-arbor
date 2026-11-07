"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function BusinessSpacesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Parallax scroll on background and portrait card
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#BusinessSpaces .trigger",
            scrub: true,
          },
        })
        .to("#BusinessSpaces .background", {
          top: "+=20rem",
          ease: "power1.inOut",
        })
        .to(
          "#BusinessSpaces .portrait",
          {
            top: "+=10rem",
            ease: "power1.inOut",
          },
          "<"
        );

      // Section reveal clip
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#BusinessSpaces .trigger",
            start: "top 70%",
          },
        })
        .fromTo(
          "#BusinessSpaces .trigger",
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

      // Video card clip reveal
      gsap.fromTo(
        "#BusinessSpaces .videoWrap",
        { clipPath: "inset(0% 100% 0% 0%)", scale: 1.1 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.2,
          delay: 1.3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: "#BusinessSpaces .videoWrap",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="BusinessSpaces" className="relative z-1">
      <div className="trigger relative flex min-h-screen w-full items-stretch overflow-clip py-30 max-xl:py-20 max-lg:pt-40 max-lg:pb-30">
        {/* Parallax Facade Background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/home/business/business.webp"
          alt="Business Spaces"
          className="background absolute top-1/3 h-[calc(100%+20rem)] w-full -translate-y-1/2 object-cover"
          loading="eager"
        />

        <div className="wrapper relative z-1 flex flex-col justify-between max-lg:gap-30 max-md:gap-12 w-full">
          {/* Top Headline: Office spaces and retails */}
          <h2 className="hero text-cream-dark uppercase font-serif text-[7vw] sm:text-[5.5rem] lg:text-[7rem] leading-none max-xl:w-full max-lg:whitespace-normal w-3/4 max-md:w-3/4">
            Office spaces and retails
          </h2>

          {/* Bottom Row: Paragraph on Left, Video Card on Right */}
          <div className="flex items-end justify-between gap-5 max-lg:flex-col max-lg:items-start">
            <div className="flex w-1/4 flex-col items-end justify-between max-xl:w-1/3 max-lg:w-2/3 max-md:w-full">
              <div className="hidden w-1/4 max-lg:block" />
              <p className="paragraph text-sand max-lg:w-3/4 font-sans text-sm sm:text-base leading-relaxed">
                Business spaces and retail units at Belgrade Arbor are designed for companies of all
                sizes that see their business address as more than just a location—it is a
                reflection of their identity, reputation, and long-term vision.
              </p>
            </div>

            <div className="w-5/12 pt-30 max-xl:w-1/3 max-lg:w-2/3 max-lg:self-end max-lg:pt-10 max-md:w-3/4 max-md:pt-30">
              <div className="videoWrap relative aspect-[1.43/1] w-4/5 overflow-hidden rounded-[1.25rem] max-xl:w-full shadow-2xl">
                <video
                  src="/home/business/business.mp4"
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="none"
                  className="portrait absolute -top-35 left-1/2 h-auto w-[180%] max-w-none -translate-x-1/2 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
