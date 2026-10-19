"use client";

import React, { createContext, useContext, useEffect, useCallback, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface LenisContextType {
  getLenis: () => Lenis | null;
  scrollTo: (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => void;
  stop: () => void;
  start: () => void;
}

const LenisContext = createContext<LenisContextType>({
  getLenis: () => null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const instance = new Lenis({
      duration: 1.8,
    });

    lenisRef.current = instance;

    // Update ScrollTrigger on scroll
    instance.on("scroll", ScrollTrigger.update);

    // Sync GSAP ticker with Lenis requestAnimationFrame
    const tickerHandler = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(tickerHandler);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerHandler);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  const getLenis = useCallback(() => lenisRef.current, []);

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const scrollTo = useCallback(
    (
      target: string | HTMLElement,
      options?: { offset?: number; duration?: number }
    ) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, {
          offset: options?.offset ?? 0,
          duration: options?.duration ?? 1.5,
        });
      } else {
        const el =
          typeof target === "string" ? document.querySelector(target) : target;
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    []
  );

  return (
    <LenisContext.Provider value={{ getLenis, scrollTo, stop, start }}>
      {children}
    </LenisContext.Provider>
  );
}
