"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Parallax scroll on background and portrait card
      gsap.timeline({
        scrollTrigger: {
          trigger: "#Location .trigger",
          scrub: true,
        },
      })
        .to("#Location .background", { top: "+=20rem", ease: "power1.inOut" })
        .to("#Location .portrait", { top: "+=10rem", ease: "power1.inOut" }, "<");

      // Clip reveal for the whole trigger container
      gsap.timeline({
        scrollTrigger: {
          trigger: "#Location .trigger",
          start: "top 70%",
        },
      })
        .fromTo(
          "#Location .trigger",
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.7, ease: "power2.inOut" },
          0
        )
        .fromTo(
          "#Location .background",
          { scale: 1.1 },
          { scale: 1, duration: 1.7, ease: "power2.inOut" },
          0
        );

      // Clip reveal for portrait video card
      gsap.fromTo(
        "#Location .videoWrap",
        { clipPath: "inset(0% 100% 0% 0%)", scale: 1.1 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.2,
          delay: 1.3,
          ease: "power2.inOut",
          scrollTrigger: { trigger: "#Location .videoWrap" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="Location" className="relative z-1 bg-vanilla">
      <div className="trigger relative flex min-h-screen w-full items-stretch overflow-clip">
        {/* Full Bleed Parallax Background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/home/location/location.webp"
          alt="Location"
          className="background absolute top-1/3 h-[calc(100%+20rem)] w-full -translate-y-1/2 object-cover object-[20%_50%]"
          loading="eager"
        />

        <div className="pointer-events-none absolute inset-0 bg-black/25" />

        <div className="wrapper relative z-1 flex items-stretch max-lg:flex-col">
          <div className="w-1/12 max-2xl:hidden" />

          {/* Portrait Video Card */}
          <div className="w-1/3 pt-30 max-lg:w-2/3 max-lg:pt-10 max-md:w-3/4 max-md:self-end max-md:pt-20">
            <div className="videoWrap relative aspect-[1.43/1] w-full overflow-hidden rounded-[1.25rem] shadow-2xl">
              <video
                src="/home/location/location.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="portrait absolute -top-25 left-1/2 h-auto w-[150%] max-w-none -translate-x-1/2 object-cover"
              />
            </div>
          </div>

          {/* Narrative & Location Heading */}
          <div className="flex w-7/12 flex-col items-end justify-between py-30 max-2xl:w-2/3 max-lg:h-full max-lg:w-full max-lg:pt-50 max-lg:pb-10 max-md:items-start max-md:gap-10 max-md:pt-23">
            <p className="paragraph text-sand w-3/7 max-2xl:w-1/2 max-md:w-3/4 text-lg leading-relaxed font-sans">
              At one of New Belgrade&apos;s most dynamic locations, on Bulevar heroja sa
              Košara, Belgrade Arbor is taking shape as a contemporary residential
              and commercial development that seamlessly brings together refined
              architecture, everyday comfort, and enduring value.
            </p>
            <h2 className="hero font-serif text-cream-dark uppercase text-[8rem] max-xl:text-[7rem] max-lg:text-[5.5rem] max-md:text-[3.5rem] leading-none select-none max-lg:mt-50 max-md:mt-0">
              Location
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
