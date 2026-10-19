"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

export function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const markersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const img = imageRef.current;
      const markers = markersRef.current;
      if (!img) return;

      const limits = {
        desktop: { start: 0, end: 1 },
        laptop: { start: 0.15, end: 0.85 },
        mobile: { start: 0.22, end: 0.78 },
      };

      const getLimit = () => {
        if (window.matchMedia("(max-width: 600px)").matches) return limits.mobile;
        if (window.matchMedia("(max-width: 1120px)").matches) return limits.laptop;
        return limits.desktop;
      };

      const calcOffset = (progress: number) => {
        const totalTravel = img.scrollWidth - window.innerWidth;
        return -Math.max(0, totalTravel) * progress;
      };

      const updateMarkersWidth = () => {
        if (markers && img) {
          markers.style.width = `${img.scrollWidth}px`;
        }
      };

      updateMarkersWidth();

      // Heading split text animation
      const headingSplit = new SplitText("#Horizontal .heading", {
        type: "words, chars",
      });

      gsap.set(headingSplit.chars, { opacity: 0, y: "15%", filter: "blur(10px)" });

      gsap.to(headingSplit.chars, {
        opacity: 1,
        y: "0%",
        filter: "blur(0px)",
        duration: 0.6,
        stagger: 0.04,
        ease: "power1.out",
        scrollTrigger: {
          trigger: "#Horizontal .trigger",
          start: "top 80%",
        },
      });

      // Curtain reveal: Left and right vanilla panels slide open
      gsap.to("#Horizontal .reveal", {
        width: "0%",
        ease: "power1.inOut",
        duration: 1,
        scrollTrigger: {
          trigger: "#Horizontal .trigger",
          start: "top 70%",
        },
      });

      // Main pinned horizontal scrub timeline
      const pinDistance = () => 2 * Math.max(1, img.scrollWidth - window.innerWidth);

      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#Horizontal .trigger",
          start: "top top",
          end: () => `+=${pinDistance()}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
          onRefresh: updateMarkersWidth,
        },
      });

      if (!img.complete || img.naturalWidth === 0) {
        img.addEventListener(
          "load",
          () => {
            updateMarkersWidth();
            ScrollTrigger.refresh();
          },
          { once: true }
        );
      }

      scrubTl
        .fromTo(
          [img, markers],
          { x: () => calcOffset(getLimit().start) },
          { x: () => calcOffset(getLimit().end), ease: "power1.inOut", duration: 1 },
          0
        )
        .to(".cloud1", { left: "-=10%", ease: "power1.inOut", duration: 1 }, 0)
        .to(".cloud2", { left: "-=20%", ease: "power1.inOut", duration: 1 }, 0)
        .to(".cloud3", { left: "-=30%", ease: "power1.inOut", duration: 1 }, 0)
        .to("#Horizontal .heading", { left: "-=10%", ease: "power1.inOut", duration: 1 }, 0)
        .to(
          headingSplit.chars,
          {
            opacity: 0,
            scale: 0.7,
            filter: "blur(10px)",
            stagger: 0.04,
            ease: "power1.inOut",
            duration: 0.4,
          },
          0.3
        );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="Horizontal"
      className="relative z-1 overflow-clip bg-vanilla"
    >
      <div className="trigger relative flex h-screen w-full items-center overflow-hidden">
        {/* Left Curtain Reveal */}
        <div className="bg-vanilla reveal absolute top-0 left-0 z-10 h-full w-1/2" />
        {/* Right Curtain Reveal */}
        <div className="bg-vanilla reveal absolute top-0 right-0 z-10 h-full w-1/2" />

        {/* Panoramic Horizontal Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imageRef}
          src="/home/horizontal/horizontal.webp"
          alt="Horizontal Panorama View from Above"
          className="horizontal-image h-full w-auto max-w-none object-cover will-change-transform"
          loading="eager"
          decoding="async"
        />

        {/* Parallax Clouds & Markers Track */}
        <div
          ref={markersRef}
          className="horizontal-markers pointer-events-none absolute top-0 left-0 z-20 h-full will-change-transform"
        >
          {/* Wing A / B Indicators */}
          <div className="absolute left-1/2 h-full w-[42%] -translate-x-1/2 -translate-y-10">
            <span className="heading-1 font-serif text-sand absolute top-1/2 left-0 -translate-y-1/2 uppercase text-6xl lg:text-8xl drop-shadow-md">
              A
            </span>
            <span className="heading-1 font-serif text-sand absolute top-1/2 right-0 -translate-y-1/2 uppercase text-6xl lg:text-8xl drop-shadow-md">
              B
            </span>
          </div>

          {/* Cloud 1 */}
          <Image
            src="/home/horizontal/1.webp"
            alt="Cloud 1"
            width={1580}
            height={1580}
            className="cloud1 absolute bottom-0 left-0 h-auto w-395 max-w-none -translate-x-1/2 translate-y-1/2 object-cover max-xl:left-1/10 max-xl:w-350 max-lg:left-1/5 max-lg:w-220 max-md:w-180 pointer-events-none"
          />

          {/* Cloud 2 */}
          <Image
            src="/home/horizontal/2.webp"
            alt="Cloud 2"
            width={2217}
            height={2217}
            className="cloud2 absolute bottom-0 left-1/2 h-auto w-550 max-w-none -translate-x-1/2 translate-y-1/2 object-cover max-xl:w-450 max-lg:w-280 max-md:bottom-1/4 max-md:w-220 pointer-events-none"
          />

          {/* Cloud 3 */}
          <Image
            src="/home/horizontal/3.webp"
            alt="Cloud 3"
            width={1858}
            height={1858}
            className="cloud3 absolute top-0 right-0 h-auto w-465 max-w-none translate-x-1/2 -translate-y-1/2 object-cover max-xl:w-400 max-lg:w-250 max-md:w-200 pointer-events-none"
          />
        </div>

        {/* View From Above Title */}
        <div className="pointer-events-none absolute inset-0 h-screen w-full">
          <h2 className="heading font-serif text-sand hero absolute top-40 left-1/2 w-full -translate-x-1/2 text-center uppercase text-[7.5rem] max-xl:top-30 max-xl:text-[6rem] max-lg:text-[4.25rem] max-md:top-24 max-md:text-[3rem] drop-shadow-lg leading-none">
            View from above
          </h2>
        </div>
      </div>
    </section>
  );
}
