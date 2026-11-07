"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function AmenitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Parallax scroll on background and portrait card
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#Amenities .trigger",
            scrub: true,
          },
        })
        .to("#Amenities .background", {
          top: "+=20rem",
          ease: "power1.inOut",
        })
        .to(
          "#Amenities .portrait",
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
            trigger: "#Amenities .trigger",
            start: "top 70%",
          },
        })
        .fromTo(
          "#Amenities .trigger",
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.7, ease: "power2.inOut" },
          0
        )
        .fromTo(
          "#Amenities .background",
          { scale: 1.1 },
          { scale: 1, duration: 1.7, ease: "power2.inOut" },
          0
        );

      // Video card clip reveal
      gsap.fromTo(
        "#Amenities .videoWrap",
        { clipPath: "inset(0% 100% 0% 0%)", scale: 1.1 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.2,
          delay: 1.3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: "#Amenities .videoWrap",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="Amenities" className="relative z-1">
      <div className="trigger relative flex min-h-screen w-full items-stretch overflow-clip">
        {/* Full-bleed Parallax Background Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/home/amenities/amenities-bg.webp"
          alt="Amenities"
          className="background absolute top-1/3 h-[calc(100%+20rem)] w-full -translate-y-1/2 object-cover max-md:object-[60%_50%]"
          loading="eager"
        />

        <div className="wrapper relative z-1 flex items-stretch max-lg:flex-col-reverse max-md:flex-col w-full">
          {/* Left Column: Video Card & Paragraph */}
          <div className="flex w-1/3 flex-col items-start justify-between py-30 max-lg:w-2/3 max-lg:flex-col-reverse max-lg:pt-0 max-lg:pb-15 max-md:w-3/4 max-md:pt-10 max-md:pb-5">
            <div className="videoWrap relative aspect-[1.43/1] w-full overflow-hidden rounded-[1.25rem] shadow-2xl">
              <video
                src="/home/amenities/amenities.mp4"
                muted
                loop
                playsInline
                autoPlay
                preload="none"
                className="portrait absolute -top-35 left-1/2 h-auto w-[200%] max-w-none -translate-x-1/2 object-cover"
              />
            </div>

            <p className="paragraph text-sand w-3/4 max-xl:w-full max-lg:mb-40 max-md:hidden font-sans text-sm sm:text-base leading-relaxed">
              Belgrade Arbor is more than a residence. It features two private gyms, two exclusive
              rooftop parks for residents and their guests, and a top-floor café-restaurant. These
              are curated spaces for unwinding and socializing a true sanctuary from the urban
              hustle, right at your doorstep.
            </p>
          </div>

          {/* Right Column: Large Heading */}
          <div className="flex w-2/3 flex-col items-end justify-end gap-5 py-30 max-lg:items-start max-lg:pt-55 max-lg:pb-8 max-md:w-full max-md:flex-1 max-md:pt-0">
            <h2 className="hero text-cream-dark whitespace-nowrap uppercase font-serif text-[8vw] max-xl:text-[8rem] max-lg:text-[6.5rem] max-md:text-[3rem] leading-none">
              Amenities
            </h2>

            <p className="paragraph text-sand mt-auto hidden w-3/4 pt-10 max-md:block font-sans text-sm leading-relaxed">
              Belgrade Arbor is more than a residence. It features two private gyms, two exclusive
              rooftop parks for residents and their guests, and a top-floor café-restaurant. These
              are curated spaces for unwinding and socializing a true sanctuary from the urban
              hustle, right at your doorstep.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
