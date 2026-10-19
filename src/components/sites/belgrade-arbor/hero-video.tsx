"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { useLenis } from "./lenis-provider";
import { LogoSymbolIcon } from "./icons";

interface HeroVideoProps {
  src?: string;
  mobileSrc?: string;
}

export function HeroVideo({
  src = "/home/hero.mp4",
  mobileSrc = "/home/hero-m.webm",
}: HeroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { stop, start } = useLenis();

  const revealTitle = useCallback(() => {
    if (!headingRef.current || !titleWrapperRef.current) return;
    try {
      const split = new SplitText(headingRef.current, { type: "chars" });
      gsap.set(split.chars, { opacity: 0, y: "2rem" });
      gsap.timeline()
        .to(titleWrapperRef.current, { opacity: 1, duration: 0.8, ease: "power2.out" }, 0)
        .to(split.chars, { opacity: 1, y: 0, duration: 0.9, stagger: 0.05, ease: "power2.out" }, 0);
    } catch {
      gsap.to(titleWrapperRef.current, { opacity: 1, duration: 0.8 });
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Pause lenis during loading
    stop();

    const isMobile = window.matchMedia("(max-width: 600px)").matches;
    video.src = isMobile && mobileSrc ? mobileSrc : src;
    video.load();

    const progressObj = { value: 0 };
    const tween = gsap.to(progressObj, {
      value: 100,
      duration: 1.8,
      ease: "power1.inOut",
      onUpdate: () => {
        setProgress(progressObj.value);
      },
      onComplete: () => {
        setProgress(100);
        gsap.to(".site-loader", {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            setLoading(false);
            video.play().catch(() => {});
            start();

            // Also show title if video autoplays or doesn't trigger onEnded immediately
            revealTitle();
          },
        });
      },
    });

    return () => {
      tween.kill();
    };
  }, [src, mobileSrc, stop, start, revealTitle]);

  return (
    <div ref={containerRef} className="relative h-svh w-full overflow-hidden bg-pine-green">
      {/* Hero Video */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        onEnded={revealTitle}
        className="block h-full w-full object-cover"
      />

      {/* Site Preloader */}
      {loading && (
        <div className="site-loader fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-vanilla text-golden transition-opacity duration-300">
          {/* Belgrade Arbor Authentic Emblem */}
          <LogoSymbolIcon className="h-16 w-16 text-golden" />

          {/* Progress Bar */}
          <div className="h-0.5 w-64 overflow-hidden rounded-full bg-sand">
            <div
              className="h-0.5 rounded-full bg-golden transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="heading-3 text-golden font-serif tracking-wider">
            {Math.round(progress)}%
          </p>
        </div>
      )}

      {/* Floating Hero Branding Title */}
      <div
        ref={titleWrapperRef}
        className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/50 via-transparent to-transparent py-20 opacity-0 max-md:py-10"
      >
        <h1
          ref={headingRef}
          className="heading huge font-serif text-sand text-center text-[10.5vw] font-normal uppercase leading-none tracking-tight max-md:text-[17vw]"
        >
          Belgrade Arbor
        </h1>
      </div>
    </div>
  );
}
