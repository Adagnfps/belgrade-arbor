"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function ResidencesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Parallax scroll on background and portrait card
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#Residences .trigger",
            scrub: true,
          },
        })
        .to("#Residences .background", {
          top: "+=20rem",
          ease: "power1.inOut",
        })
        .to(
          "#Residences .portrait",
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
            trigger: "#Residences .trigger",
            start: "top 70%",
          },
        })
        .fromTo(
          "#Residences .trigger",
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.7, ease: "power2.inOut" },
          0
        )
        .fromTo(
          "#Residences .background",
          { scale: 1.1 },
          { scale: 1, duration: 1.7, ease: "power2.inOut" },
          0
        );

      // Video card clip reveal
      gsap.fromTo(
        "#Residences .videoWrap",
        { clipPath: "inset(0% 100% 0% 0%)", scale: 1.1 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.2,
          delay: 1.3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: "#Residences .videoWrap",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="Residences" className="relative z-1">
      <div className="trigger relative flex min-h-screen w-full flex-col items-stretch justify-between gap-25 overflow-clip pb-30 max-2xl:gap-20 max-2xl:pb-15 max-md:gap-25">
        {/* Full-bleed Background Image with Parallax Scrub */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/home/residences/residences-hero.webp"
          alt="Residences"
          className="background absolute top-1/3 h-[calc(100%+20rem)] w-full -translate-y-1/2 object-cover object-top max-2xl:object-[50%_70%] max-lg:object-[70%_80%]"
          loading="eager"
        />

        {/* Top Vignette Video Card */}
        <div className="wrapper relative z-1 flex items-stretch gap-5 max-md:justify-end">
          <div className="w-1/12 max-2xl:hidden" />
          <div className="w-1/3 pt-50 max-2xl:pt-15 max-lg:w-2/3 max-lg:pt-60 max-md:w-3/4 max-md:pt-30">
            <div className="videoWrap relative aspect-[1.43/1] w-full overflow-hidden rounded-[1.25rem] shadow-2xl">
              <video
                src="/home/residences/interior.mp4"
                muted
                loop
                playsInline
                autoPlay
                preload="none"
                className="portrait absolute -top-35 left-1/2 h-auto w-[160%] max-w-none -translate-x-1/2 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom Headline & Paragraph */}
        <div className="wrapper flex items-end gap-5 max-2xl:flex-1 max-2xl:flex-col max-2xl:items-start max-2xl:justify-between max-lg:gap-35">
          <div className="w-7/12 max-2xl:mb-10 max-2xl:w-full">
            <h2 className="hero text-golden uppercase font-serif text-[8vw] sm:text-[6.5rem] lg:text-[8rem] leading-none">
              Residences
            </h2>
          </div>
          <div className="w-2/7 max-2xl:w-2/3 max-2xl:self-end max-lg:w-1/2 max-md:w-full">
            <p className="paragraph text-golden font-sans text-sm sm:text-base leading-relaxed max-2xl:w-3/5 max-lg:w-full">
              Designed with contemporary living in mind, each apartment at Belgrade Arbor balances
              functionality, comfort, and aesthetics. Open-plan layouts, excellent natural light,
              refined materials, and carefully considered details create spaces that feel both
              welcoming and enduring.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
