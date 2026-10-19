"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

export function RootsSection() {
  const desktopSectionRef = useRef<HTMLElement>(null);
  const mobileSectionRef = useRef<HTMLElement>(null);
  const leaf1Ref = useRef<HTMLDivElement>(null);
  const leaf2Ref = useRef<HTMLDivElement>(null);
  const leaf3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767.98px)",
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
        };

        if (isDesktop) {
          // Mouse Parallax
          const mouseTargets = [
            { el: leaf1Ref.current, strength: 0.09, init: { xPercent: -50, yPercent: -50 } },
            { el: leaf2Ref.current, strength: 0.06, init: {} },
            { el: leaf3Ref.current, strength: 0.035, init: { yPercent: -50 } },
          ]
            .filter((item) => item.el)
            .map(({ el, strength, init }) => {
              gsap.set(el!, init);
              return {
                xTo: gsap.quickTo(el!, "x", { duration: 1.2, ease: "power3" }),
                yTo: gsap.quickTo(el!, "y", { duration: 1.2, ease: "power3" }),
                strength,
              };
            });

          const handleMouseMove = (t: MouseEvent) => {
            const x = t.clientX - window.innerWidth / 2;
            const y = t.clientY - window.innerHeight / 2;
            mouseTargets.forEach(({ xTo, yTo, strength }) => {
              xTo(x * strength);
              yTo(y * strength);
            });
          };

          window.addEventListener("mousemove", handleMouseMove);

          // Huge heading character slide-in from 100vw
          const hugeSplit = new SplitText("#Roots .huge", { type: "chars, words" });
          gsap.from(hugeSplit.chars, {
            x: "100vw",
            stagger: 0.1,
            duration: 1.7,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: "#Roots .trigger",
            },
          });

          // Expanding mask animation
          gsap.from("#Roots .mask", {
            maskSize: "0%",
            WebkitMaskSize: "0%",
            stagger: 0.3,
            ease: "power2.inOut",
            duration: 1.5,
            delay: 0.5,
            scrollTrigger: {
              trigger: "#Roots .trigger",
              start: "top 70%",
            },
          });

          // Parallax scroll on kicker wrappers
          gsap.set("#Roots .roots-kicker-wrap", { y: "-10rem" });
          gsap.to("#Roots .roots-kicker-wrap", {
            scrollTrigger: {
              trigger: "#Roots .trigger",
              scrub: true,
            },
            y: "+=15rem",
          });

          return () => {
            window.removeEventListener("mousemove", handleMouseMove);
          };
        }

        if (isMobile) {
          const hiddenText = {
            opacity: 0,
            y: "2rem",
            filter: "blur(4px)",
            ease: "power1.inOut",
            pointerEvents: "none" as const,
            overwrite: "auto" as const,
          };

          const visibleText = {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power1.inOut",
            pointerEvents: "auto" as const,
            overwrite: "auto" as const,
          };

          const hugeSplitMob = new SplitText("#RootsMobile .roots-huge", {
            type: "chars, words",
          });
          const parSplitMob = new SplitText("#RootsMobile .roots-paragraph", {
            type: "words",
          });

          gsap.set(hugeSplitMob.chars, { x: "100vw", opacity: 0, filter: "blur(4px)" });
          gsap.set("#RootsMobile .roots-image", { scale: 1.1, opacity: 0, filter: "blur(4px)" });
          gsap.set([parSplitMob.words, "#RootsMobile .roots-button"], hiddenText);
          gsap.set("#RootsMobile .progress-num-1", { y: 0, opacity: 1, filter: "blur(0px)" });
          gsap.set("#RootsMobile .progress-num-2", { y: "1rem", opacity: 0, filter: "blur(4px)" });

          const mobTrigger = "#RootsMobile .roots-scroller";

          const hugeTl = gsap.timeline({ paused: true }).to(hugeSplitMob.chars, {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.5,
            stagger: 0.08,
            ease: "power2.inOut",
          });

          const imgTl = gsap.timeline({ paused: true }).to("#RootsMobile .roots-image", {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.3,
            ease: "power2.inOut",
            delay: 0.2,
          });

          ScrollTrigger.create({
            trigger: mobTrigger,
            start: "0% top",
            end: "45% top",
            onEnter: () => {
              hugeTl.restart();
              imgTl.restart();
            },
            onEnterBack: () => {
              hugeTl.restart();
              imgTl.restart();
            },
            onLeave: () => {
              hugeTl.reverse();
              imgTl.reverse();
            },
            onLeaveBack: () => {
              hugeTl.reverse();
              imgTl.reverse();
            },
          });

          const textTl = gsap.timeline({ paused: true })
            .to(parSplitMob.words, { ...visibleText, duration: 0.8, stagger: 0.05 })
            .to("#RootsMobile .roots-button", { ...visibleText, duration: 0.8 }, 0.15);

          ScrollTrigger.create({
            trigger: mobTrigger,
            start: "50% top",
            end: "bottom bottom",
            onEnter: () => textTl.play(),
            onEnterBack: () => textTl.play(),
            onLeaveBack: () => textTl.reverse(),
          });

          gsap.timeline({
            scrollTrigger: {
              trigger: mobTrigger,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          })
            .to("#RootsMobile .progress-fill", { width: "100%", ease: "none", duration: 1 }, 0)
            .to(
              "#RootsMobile .progress-num-1",
              { y: "-1rem", opacity: 0, filter: "blur(4px)", ease: "power1.inOut", duration: 0.14 },
              0.5
            )
            .to(
              "#RootsMobile .progress-num-2",
              { y: 0, opacity: 1, filter: "blur(0px)", ease: "power1.inOut", duration: 0.14 },
              0.5
            );
        }
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <>
      {/* DESKTOP ROOTS WITH MOUSE PARALLAX & MASK EXPANSION */}
      <section
        id="Roots"
        ref={desktopSectionRef}
        className="bg-navy relative z-1 min-h-screen overflow-clip max-md:hidden"
      >
        <div className="trigger relative flex min-h-screen flex-col justify-center pt-40 pb-40 max-xl:py-20">
          {/* Top Kicker Wrap */}
          <div className="roots-kicker-wrap wrapper flex">
            <div className="w-1/12 max-lg:w-1/6" />
            <div className="w-1/6 max-lg:w-1/3">
              <p className="kicker text-accent uppercase font-medium text-xs tracking-widest">
                The way of living
              </p>
            </div>
          </div>

          {/* Leaf 3 (Right Background) */}
          <div
            ref={leaf3Ref}
            className="absolute top-[55%] right-1/10 w-230 max-w-none will-change-transform max-xl:right-16 max-xl:w-143 max-lg:top-[50%] max-lg:w-125"
          >
            <div
              className="mask h-auto w-full"
              style={{
                maskImage: "url('/home/roots/mask3.svg')",
                WebkitMaskImage: "url('/home/roots/mask3.svg')",
                maskSize: "100%",
                WebkitMaskSize: "100%",
                maskPosition: "center",
                WebkitMaskPosition: "center",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
              }}
            >
              <Image
                src="/home/roots/image3.webp"
                alt="Roots"
                width={926}
                height={507}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          {/* Huge Display Watermark "YOUR ROOTS" */}
          <div className="roots-kicker-wrap wrapper relative z-1 mt-15 flex justify-center">
            <h2 className="huge font-serif text-cream-dark text-center whitespace-nowrap uppercase text-[12vw] leading-none select-none max-xl:text-[15rem] max-lg:text-left max-lg:text-[12.5rem] max-lg:whitespace-normal">
              Your roots
            </h2>
          </div>

          {/* Leaf 2 (Center Left Foreground) */}
          <div
            ref={leaf2Ref}
            className="absolute top-[30%] left-1/2 z-2 w-180 max-w-none will-change-transform max-xl:right-28 max-xl:left-auto max-xl:w-120 max-lg:right-20 max-lg:w-100"
          >
            <div
              className="mask h-auto w-full -translate-y-1/2"
              style={{
                maskImage: "url('/home/roots/mask2.svg')",
                WebkitMaskImage: "url('/home/roots/mask2.svg')",
                maskSize: "100%",
                WebkitMaskSize: "100%",
                maskPosition: "center",
                WebkitMaskPosition: "center",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
              }}
            >
              <Image
                src="/home/roots/image2.webp"
                alt="Roots"
                width={724}
                height={550}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          {/* Leaf 1 (Center Foreground with Looping Video!) */}
          <div
            ref={leaf1Ref}
            className="absolute top-1/2 left-1/2 z-2 w-156 max-w-none will-change-transform max-xl:w-120 max-xl:translate-x-1/2 max-lg:top-[55%] max-lg:w-95 max-lg:translate-x-0"
          >
            <div
              className="mask h-auto w-full overflow-hidden"
              style={{
                maskImage: "url('/home/roots/mask1.svg')",
                WebkitMaskImage: "url('/home/roots/mask1.svg')",
                maskSize: "95%",
                WebkitMaskSize: "95%",
                maskPosition: "center",
                WebkitMaskPosition: "center",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
              }}
            >
              <video
                src="/home/roots/image1.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="h-full w-full translate-y-1/10 scale-130 object-cover"
              />
            </div>
          </div>

          {/* Narrative & Action Block */}
          <div className="wrapper roots-kicker-wrap relative z-2 mt-20 flex max-lg:mt-50">
            <div className="w-1/12 max-lg:hidden" />
            <div className="w-5/12 max-xl:w-6/12 max-lg:w-full">
              <p className="heading-2 font-serif text-sand text-[2.75rem] leading-tight max-xl:text-[3.25rem] max-lg:text-[3rem]">
                In Belgrade Arbor, each residence is crafted not merely for living,
                but as a space that evolves alongside you
              </p>
              <a
                href="#Residences"
                className="mt-15 inline-block max-xl:mt-10"
              >
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center justify-center gap-4 rounded-full border border-green bg-transparent px-8 py-4 text-xs font-medium uppercase tracking-widest text-cream transition-all duration-300 hover:bg-green/40 active:bg-green"
                >
                  <span>Explore residences</span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 25 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-2.5 w-6"
                  >
                    <path
                      d="M0.5 5L24.5 5"
                      stroke="currentColor"
                      strokeLinecap="round"
                    />
                    <path
                      d="M19.5 0.5L24.5 5L19.5 9.5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="bevel"
                    />
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE 400vh SCROLLER */}
      <section
        id="RootsMobile"
        ref={mobileSectionRef}
        className="bg-navy relative z-1 hidden overflow-clip max-md:block"
      >
        <div className="roots-scroller relative h-[400vh]">
          <div className="sticky top-0 left-0 flex h-screen w-full flex-col justify-center overflow-clip">
            <div className="wrapper pointer-events-none absolute top-36 left-0 z-20 w-full px-6">
              <p className="kicker text-accent uppercase text-xs tracking-widest font-medium">
                The way of living
              </p>
            </div>

            {/* Mobile Screen 1 */}
            <div className="roots-screen1 absolute inset-0 h-full w-full">
              <div className="roots-image absolute right-6 bottom-[0%] w-90 max-w-none">
                <div
                  className="mask h-auto w-full"
                  style={{
                    maskImage: "url('/home/roots/mask3.svg')",
                    WebkitMaskImage: "url('/home/roots/mask3.svg')",
                    maskSize: "100%",
                    WebkitMaskSize: "100%",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                  }}
                >
                  <Image
                    src="/home/roots/image3.webp"
                    alt="Roots"
                    width={926}
                    height={507}
                    className="h-auto w-full"
                  />
                </div>
              </div>

              <div className="wrapper relative z-1 mt-54 flex justify-center px-6">
                <h2 className="roots-huge huge font-serif text-cream-dark text-left text-[5rem] whitespace-normal uppercase leading-none">
                  Your roots
                </h2>
              </div>

              <div className="roots-image absolute top-[58%] right-6 z-2 w-70 max-w-none">
                <div
                  className="mask h-auto w-full -translate-y-1/2"
                  style={{
                    maskImage: "url('/home/roots/mask2.svg')",
                    WebkitMaskImage: "url('/home/roots/mask2.svg')",
                    maskSize: "100%",
                    WebkitMaskSize: "100%",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                  }}
                >
                  <Image
                    src="/home/roots/image2.webp"
                    alt="Roots"
                    width={724}
                    height={550}
                    className="h-auto w-full"
                  />
                </div>
              </div>

              <div className="roots-image absolute bottom-0 left-6 z-2 w-70 max-w-none">
                <div
                  className="mask h-auto w-full"
                  style={{
                    maskImage: "url('/home/roots/mask1.svg')",
                    WebkitMaskImage: "url('/home/roots/mask1.svg')",
                    maskSize: "95%",
                    WebkitMaskSize: "95%",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                  }}
                >
                  <video
                    src="/home/roots/image1.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full translate-y-1/10 scale-130 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Mobile Screen 2 */}
            <div className="roots-screen2 pointer-events-none absolute inset-0 z-10 flex h-full w-full items-end px-6 pb-28">
              <div className="w-full">
                <p className="roots-paragraph heading-2 font-serif text-sand text-[2.25rem] leading-tight">
                  In Belgrade Arbor, each residence is crafted not merely for living,
                  but as a space that evolves alongside you
                </p>
                <a
                  href="#Residences"
                  className="roots-button pointer-events-auto mt-8 inline-block w-full"
                >
                  <button
                    type="button"
                    className="inline-flex w-full cursor-pointer items-center justify-between rounded-full border border-green bg-transparent px-6 py-4 text-xs font-medium uppercase tracking-widest text-cream active:bg-green"
                  >
                    <span>Explore residences</span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 25 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-2.5 w-6"
                    >
                      <path
                        d="M0.5 5L24.5 5"
                        stroke="currentColor"
                        strokeLinecap="round"
                      />
                      <path
                        d="M19.5 0.5L24.5 5L19.5 9.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="bevel"
                      />
                    </svg>
                  </button>
                </a>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute top-24 left-6 flex items-center gap-5">
              <div className="bg-green/40 relative h-px w-32">
                <div className="progress-fill bg-accent absolute top-0 left-0 h-full w-0" />
              </div>
              <div className="small text-green relative h-[1em] w-[2ch] leading-none font-mono text-xs">
                <span className="progress-num-1 absolute inset-0">01</span>
                <span className="progress-num-2 absolute inset-0">02</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
