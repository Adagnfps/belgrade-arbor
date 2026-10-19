"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { CubeIcon } from "./icons";

interface IntroductionProps {
  onExplore3D?: () => void;
}

// SVG clip path constants for morphing
const MORPH_CLIP1_PATH_A =
  "M553.198 0.00122967L189.96 2.32976C163.484 2.49949 140.431 20.4481 133.781 46.0702L1.88108 554.296C-5.39412 582.328 8.9737 611.457 35.6469 622.752L499.834 819.32C537.355 835.208 579.21 808.786 580.992 768.087L611.943 60.9657C613.404 27.5877 586.616 -0.212979 553.198 0.00122967Z";
const MORPH_CLIP1_PATH_B =
  "M612.999 748.068V103C612.999 53.8486 568.667 17.6575 522.631 29.2268L295.544 86.2962C274.234 91.6517 256.362 106.645 246.852 127.146L7.28559 616.516C-13.3912 661.088 11.8848 713.945 58.5972 723.818L525.25 822.446C570.586 832.028 612.999 796.077 612.999 748.068Z";

const MORPH_CLIP2_PATH_A =
  "M0.00102513 662.73L1.39093e-10 67.2785C-8.67027e-05 23.7338 40.7156 -8.32866 82.9967 1.92087L291.561 52.4799C311.134 57.2245 327.547 70.5073 336.282 88.67L556.309 546.185C575.299 585.673 552.085 632.5 509.182 641.246L80.5926 728.624C38.9549 737.112 0.00109921 705.263 0.00102513 662.73Z";
const MORPH_CLIP2_PATH_B =
  "M536.07 261.245L562.89 534.277C564.225 547.866 553.215 559.504 539.519 558.983L39.3218 539.961C27.4842 539.511 18.0011 530.038 17.5825 518.245L0.0149346 23.3565C-0.589468 6.32949 17.2665 -5.17794 32.6102 2.35034L523.555 243.229C530.574 246.673 535.308 253.488 536.07 261.245Z";

export function Introduction({ onExplore3D }: IntroductionProps) {
  const desktopSectionRef = useRef<HTMLElement>(null);
  const mobileSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 769px)",
        isMobile: "(max-width: 768px)",
      },
      (context) => {
        const { isMobile } = context.conditions as {
          isMobile: boolean;
        };

        if (!isMobile) {

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
        x: 0,
        filter: "blur(0px)",
        ease: "power1.inOut",
        pointerEvents: "auto" as const,
        overwrite: "auto" as const,
      };

      // Split text targets
      const splitPreheading1 = new SplitText("#Introduction .preheading1", {
        type: "chars, words",
      });
      const splitHeading1 = new SplitText("#Introduction .heading1", {
        type: "words",
      });
      const splitHeading2 = new SplitText("#Introduction .heading2", {
        type: "words",
      });
      const splitHeading3 = new SplitText("#Introduction .heading3", {
        type: "chars, words",
      });
      const splitParagraph1 = new SplitText("#Introduction .paragraph1", {
        type: "words",
      });

      // Initial state
      gsap.set(
        [
          splitPreheading1.chars,
          splitHeading1.words,
          splitHeading2.words,
          splitHeading3.chars,
          splitParagraph1.words,
          "#Introduction .button1Wrap",
          "#Introduction .button2Wrap",
          "#Introduction .link",
        ],
        hiddenText
      );

      gsap.set("#Introduction .morphWrapper", {
        scale: 1.1,
        filter: "blur(4px)",
        opacity: 0,
      });

      gsap.set(
        ["#Introduction .screen1", "#Introduction .screen2", "#Introduction .screen3"],
        { pointerEvents: "none" }
      );

      gsap.set("#Introduction .progress-num-1", {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
      });
      gsap.set(["#Introduction .progress-num-2", "#Introduction .progress-num-3"], {
        y: "1rem",
        opacity: 0,
        filter: "blur(4px)",
      });

      const isLaptop = window.matchMedia("(max-width: 1440px)").matches;
      const isTablet = window.matchMedia("(max-width: 1120px)").matches;

      const responsive = {
        desktop: {
          morph1Width: "20rem",
          morph1Height: "27rem",
          morph1Right: "16.66%",
          morph1Top: "14%",
          morph2Width: "35rem",
          morph2Height: "35rem",
          morph2Left: "0",
          morph2Bottom: "20%",
        },
        laptop: {
          morph1Width: "15rem",
          morph1Height: "20rem",
          morph1Right: "16.66%",
          morph1Top: "14%",
          morph2Width: "26.375rem",
          morph2Height: "26.188rem",
          morph2Left: "0",
          morph2Bottom: "20%",
        },
        tablet: {
          morph1Width: "30vh",
          morph1Height: "35vh",
          morph1Right: "0",
          morph1Top: "5vh",
          morph2Width: "42vh",
          morph2Height: "42vh",
          morph2Left: "-2vh",
          morph2Bottom: "55vh",
        },
      };

      const currentPreset = isTablet
        ? responsive.tablet
        : isLaptop
        ? responsive.laptop
        : responsive.desktop;

      // Master scrub timeline for morphs and layout transitions
      const morphTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#Introduction .scroller",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      morphTimeline
        .set("#Introduction .screen1", { pointerEvents: "auto" })
        .to(
          "#Introduction .morphWrapper",
          { scale: 1, filter: "blur(0px)", opacity: 1, ease: "power1.inOut", duration: 0.1 },
          0
        )
        // SVG morph paths
        .to(
          "#morphClip1 path",
          { morphSVG: MORPH_CLIP1_PATH_B, ease: "none", duration: 0.33 },
          0.15
        )
        .to(
          "#frame1",
          {
            width: currentPreset.morph1Width,
            right: currentPreset.morph1Right,
            top: currentPreset.morph1Top,
            height: currentPreset.morph1Height,
            ease: "power1.inOut",
            duration: 0.33,
          },
          0.15
        )
        .to("#Introduction .morph1ImgA", { opacity: 0, duration: 0.33 }, 0.15)
        .to("#Introduction .morph1ImgB", { opacity: 1, duration: 0.33 }, 0.15)
        .to("#Introduction .morph2ImgA", { opacity: 0, duration: 0.33 }, 0.15)
        .to("#Introduction .morph2ImgB", { opacity: 1, duration: 0.33 }, 0.15)
        .to(
          "#morphClip2 path",
          { morphSVG: MORPH_CLIP2_PATH_B, ease: "none", duration: 0.33 },
          0.15
        )
        .to(
          "#frame2",
          {
            width: currentPreset.morph2Width,
            left: currentPreset.morph2Left,
            bottom: currentPreset.morph2Bottom,
            height: currentPreset.morph2Height,
            ease: "power1.inOut",
            duration: 0.33,
          },
          0.15
        )
        .to(
          "#Introduction .morphWrapper",
          { xPercent: isTablet ? 0 : -100, ease: "power1.inOut", duration: 0.33 },
          0.15
        )
        .set("#Introduction .screen1", { pointerEvents: "none" })
        .set("#Introduction .screen2", { pointerEvents: "auto" })
        .to(
          "#Introduction .morphWrapper",
          { scale: 1.1, filter: "blur(4px)", opacity: 0, ease: "power1.inOut", duration: 0.1 },
          0.68
        )
        .to({}, { duration: 0.32 })
        .set("#Introduction .screen2", { pointerEvents: "none" })
        .set("#Introduction .screen3", { pointerEvents: "auto" });

      // Screen 1 text trigger (0% to 22%)
      const screen1Tl = gsap.timeline({ paused: true })
        .to(splitPreheading1.chars, { ...visibleText, duration: 0.7, stagger: 0.1 }, 0)
        .to(splitHeading1.words, { ...visibleText, duration: 0.7, stagger: 0.05 }, 0)
        .to("#Introduction .button1Wrap", { ...visibleText, duration: 0.7 }, 0);

      ScrollTrigger.create({
        trigger: "#Introduction .scroller",
        start: "0% top",
        end: "22% top",
        onEnter: () => screen1Tl.play(),
        onLeave: () => screen1Tl.reverse(),
        onEnterBack: () => screen1Tl.play(),
        onLeaveBack: () => screen1Tl.reverse(),
      });

      // Screen 2 text trigger (33% to 60%)
      const screen2Tl = gsap.timeline({ paused: true })
        .to(splitHeading2.words, { ...visibleText, duration: 0.7, stagger: 0.05 }, 0)
        .to("#Introduction .button2Wrap", { ...visibleText, duration: 0.7 }, 0);

      ScrollTrigger.create({
        trigger: "#Introduction .scroller",
        start: "33% top",
        end: "60% top",
        onEnter: () => screen2Tl.play(),
        onLeave: () => screen2Tl.reverse(),
        onEnterBack: () => screen2Tl.play(),
        onLeaveBack: () => screen2Tl.reverse(),
      });

      // Screen 3 text trigger (75% to bottom)
      const screen3Tl = gsap.timeline({ paused: true })
        .to(splitHeading3.chars, { ...visibleText, duration: 0.7, stagger: 0.05 }, 0)
        .to(splitParagraph1.words, { ...visibleText, duration: 0.9, stagger: 0.05 }, 0)
        .to("#Introduction .link", { ...visibleText, duration: 0.9 }, 0);

      ScrollTrigger.create({
        trigger: "#Introduction .scroller",
        start: "75% top",
        end: "bottom top",
        onEnter: () => screen3Tl.play(),
        onLeave: () => screen3Tl.reverse(),
        onEnterBack: () => screen3Tl.play(),
        onLeaveBack: () => screen3Tl.reverse(),
      });

      // Progress bar & numbers
      gsap.timeline({
        scrollTrigger: {
          trigger: "#Introduction .scroller",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      })
        .to("#Introduction .progress-fill", { width: "100%", ease: "none", duration: 1 }, 0)
        .to(
          "#Introduction .progress-num-1",
          { y: "-1rem", opacity: 0, filter: "blur(4px)", ease: "power1.inOut", duration: 0.14 },
          0.33
        )
        .to(
          "#Introduction .progress-num-2",
          { y: 0, opacity: 1, filter: "blur(0px)", ease: "power1.inOut", duration: 0.14 },
          0.33
        )
        .to(
          "#Introduction .progress-num-2",
          { y: "-1rem", opacity: 0, filter: "blur(4px)", ease: "power1.inOut", duration: 0.14 },
          0.75
        )
        .to(
          "#Introduction .progress-num-3",
          { y: 0, opacity: 1, filter: "blur(0px)", ease: "power1.inOut", duration: 0.14 },
          0.75
        );

      // Swaying canopy leaves
      gsap.to("#Introduction .leafs", {
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: "power1.inOut",
        rotate: 5,
      });

      // Bottom parallax drift out
      gsap.to("#Introduction .intro-parallax", {
        scrollTrigger: {
          trigger: "#Introduction .scroller",
          start: `bottom-=${window.innerHeight} top`,
          end: "bottom top",
          scrub: true,
        },
        y: "10rem",
        ease: "power1.inOut",
      });
    }

    if (isMobile) {

      const hiddenMob = {
        opacity: 0,
        y: "2rem",
        filter: "blur(4px)",
        ease: "power1.inOut",
        pointerEvents: "none" as const,
      };

      const visibleMob = {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        ease: "power1.inOut",
        pointerEvents: "auto" as const,
      };

      const p1 = new SplitText("#IntroductionMobile .mobile-preheading1", {
        type: "chars, words",
      });
      const h1 = new SplitText("#IntroductionMobile .mobile-heading1", {
        type: "words",
      });
      const h2 = new SplitText("#IntroductionMobile .mobile-heading2", {
        type: "words",
      });
      const h3 = new SplitText("#IntroductionMobile .mobile-heading3", {
        type: "chars, words",
      });
      const par1 = new SplitText("#IntroductionMobile .mobile-paragraph1", {
        type: "words",
      });

      gsap.set(
        [
          p1.chars,
          h1.words,
          h2.words,
          h3.chars,
          par1.words,
          "#IntroductionMobile .mobile-link",
        ],
        hiddenMob
      );

      gsap.set("#IntroductionMobile .mobile-image", {
        scale: 1.1,
        opacity: 0,
        filter: "blur(4px)",
      });

      gsap.set("#IntroductionMobile .progress-num-1", {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
      });
      gsap.set(
        [
          "#IntroductionMobile .progress-num-2",
          "#IntroductionMobile .progress-num-3",
          "#IntroductionMobile .progress-num-4",
          "#IntroductionMobile .progress-num-5",
        ],
        { y: "1rem", opacity: 0, filter: "blur(4px)" }
      );

      const triggerEl = "#IntroductionMobile .scroller-mobile";

      // Screen 1
      const mobS1 = gsap.timeline({ paused: true })
        .to(p1.chars, { ...visibleMob, duration: 0.7, stagger: 0.1 }, 0)
        .to(h1.words, { ...visibleMob, duration: 0.7, stagger: 0.05 }, 0);

      ScrollTrigger.create({
        trigger: triggerEl,
        start: "top top",
        end: "15% top",
        onEnter: () => mobS1.play(),
        onLeave: () => mobS1.reverse(),
        onEnterBack: () => mobS1.play(),
        onLeaveBack: () => mobS1.reverse(),
      });

      // Screen 2 images
      const mobS2 = gsap.timeline({ paused: true }).to(
        "#IntroductionMobile .screen2 .mobile-image",
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.7, stagger: 0.03 }
      );
      ScrollTrigger.create({
        trigger: triggerEl,
        start: "20% top",
        end: "40% top",
        onEnter: () => mobS2.play(),
        onLeave: () => mobS2.reverse(),
        onEnterBack: () => mobS2.play(),
        onLeaveBack: () => mobS2.reverse(),
      });

      // Screen 3 text
      const mobS3 = gsap.timeline({ paused: true }).to(
        h2.words,
        { ...visibleMob, duration: 0.7, stagger: 0.05 },
        0
      );
      ScrollTrigger.create({
        trigger: triggerEl,
        start: "40% top",
        end: "55% top",
        onEnter: () => mobS3.play(),
        onLeave: () => mobS3.reverse(),
        onEnterBack: () => mobS3.play(),
        onLeaveBack: () => mobS3.reverse(),
      });

      // Screen 4 images
      const mobS4 = gsap.timeline({ paused: true }).to(
        "#IntroductionMobile .screen4 .mobile-image",
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.7, stagger: 0.03 }
      );
      ScrollTrigger.create({
        trigger: triggerEl,
        start: "60% top",
        end: "75% top",
        onEnter: () => mobS4.play(),
        onLeave: () => mobS4.reverse(),
        onEnterBack: () => mobS4.play(),
        onLeaveBack: () => mobS4.reverse(),
      });

      // Screen 5 text
      const mobS5 = gsap.timeline({ paused: true })
        .to(h3.chars, { ...visibleMob, duration: 0.7, stagger: 0.05 }, 0)
        .to(par1.words, { ...visibleMob, duration: 0.9, stagger: 0.05 }, 0)
        .to("#IntroductionMobile .mobile-link", { ...visibleMob, duration: 0.9 }, 0);

      ScrollTrigger.create({
        trigger: triggerEl,
        start: "80% top",
        end: "bottom bottom",
        onEnter: () => mobS5.play(),
        onLeave: () => mobS5.reverse(),
        onEnterBack: () => mobS5.play(),
        onLeaveBack: () => mobS5.reverse(),
      });

      // Mobile progress bar
      const mobProg = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
      mobProg.to("#IntroductionMobile .progress-fill", { width: "100%", ease: "none", duration: 1 }, 0);
      for (let i = 1; i < 5; i++) {
        const at = 0.2 * i;
        mobProg
          .to(
            `#IntroductionMobile .progress-num-${i}`,
            { y: "-1rem", opacity: 0, filter: "blur(4px)", ease: "power1.inOut", duration: 0.12 },
            at
          )
          .to(
            `#IntroductionMobile .progress-num-${i + 1}`,
            { y: 0, opacity: 1, filter: "blur(0px)", ease: "power1.inOut", duration: 0.12 },
            at
          );
      }
    }
  }
);

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <>
      {/* DESKTOP 900vh SCROLLER */}
      <section
        id="Introduction"
        ref={desktopSectionRef}
        className="relative max-md:hidden"
      >
        <div className="scroller text-cream relative h-[900vh] overflow-clip">
          <div className="to-pine-green isolate sticky top-0 left-0 flex h-screen w-full items-center overflow-clip bg-radial-[at_bottom_right] from-[#3E562E]">
            {/* Swaying Foliage Canopy */}
            <Image
              src="/home/introduction/leafs.webp"
              alt="Background Foliage"
              width={1921}
              height={1280}
              priority
              className="leafs pointer-events-none absolute top-0 right-[-10%] h-screen w-screen origin-top-right scale-120 object-cover object-center opacity-40 mix-blend-multiply"
            />

            <div className="intro-parallax absolute inset-0">
              {/* SVG Morphing Canvas */}
              <div className="morphs absolute inset-0 h-full w-full">
                <div className="wrapper relative flex h-full justify-end">
                  <div className="morphWrapper relative h-full w-1/2 max-lg:w-full">
                    {/* Frame 1 */}
                    <div
                      id="frame1"
                      style={{ position: "absolute" }}
                      className="absolute top-0 right-0 z-1 h-full w-150 max-xl:w-103 max-lg:h-[50vh] max-lg:top-auto max-lg:bottom-10 max-lg:-right-10"
                    >
                      <svg
                        viewBox="0 0 612 824"
                        preserveAspectRatio="xMidYMid meet"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: "100%", height: "100%", overflow: "visible" }}
                      >
                        <defs>
                          <clipPath id="morphClip1" clipPathUnits="userSpaceOnUse">
                            <path d={MORPH_CLIP1_PATH_A} />
                          </clipPath>
                        </defs>
                        <image
                          className="morph1ImgA"
                          href="/home/introduction/image1.webp"
                          x="-200"
                          y="-50"
                          width="900"
                          height="900"
                          preserveAspectRatio="xMaxYMax slice"
                          clipPath="url(#morphClip1)"
                          style={{ opacity: 1 }}
                        />
                        <image
                          className="morph1ImgB"
                          href="/home/introduction/image2.webp"
                          x="0"
                          y="0"
                          width="612"
                          height="824"
                          preserveAspectRatio="xMidYMid slice"
                          clipPath="url(#morphClip1)"
                          style={{ opacity: 0 }}
                        />
                      </svg>
                    </div>

                    {/* Frame 2 */}
                    <div
                      id="frame2"
                      style={{ position: "absolute" }}
                      className="absolute bottom-25 -left-10 h-108 w-82 max-xl:w-56 max-lg:bottom-10 max-lg:left-0"
                    >
                      <svg
                        viewBox="0 0 563 559"
                        preserveAspectRatio="xMidYMid meet"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: "100%", height: "100%", overflow: "visible" }}
                      >
                        <defs>
                          <clipPath id="morphClip2" clipPathUnits="userSpaceOnUse">
                            <path d={MORPH_CLIP2_PATH_A} />
                          </clipPath>
                        </defs>
                        <image
                          className="morph2ImgA"
                          href="/home/introduction/image4.webp"
                          x="-750"
                          y="0"
                          width="1500"
                          height="800"
                          preserveAspectRatio="xMidYMid slice"
                          clipPath="url(#morphClip2)"
                          style={{ opacity: 1 }}
                        />
                        <image
                          className="morph2ImgB"
                          href="/home/introduction/image3.webp"
                          x="-1400"
                          y="-370"
                          width="2000"
                          height="1000"
                          preserveAspectRatio="xMidYMid slice"
                          clipPath="url(#morphClip2)"
                          style={{ opacity: 0 }}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Screen 1 */}
              <div className="screen1 absolute inset-0 h-full w-full pt-20">
                <div className="wrapper">
                  <div className="w-5/12 space-y-10 max-xl:w-1/2 max-lg:w-full">
                    <p className="kicker preheading1 text-accent uppercase font-medium tracking-widest text-sm">
                      BELGRADE ARBOR DESIGN
                    </p>
                    <h2 className="heading-2 heading1 font-serif text-cream">
                      The visual identity of Belgrade Arbor is defined by an elegant
                      facade inspired by the form of a tree canopy, a symbol of growth,
                      balance, and longevity.
                    </h2>
                    <div className="button1Wrap mt-20 max-xl:mt-10">
                      <button
                        type="button"
                        onClick={onExplore3D}
                        className="inline-flex cursor-pointer items-center justify-center gap-4 rounded-full border border-green bg-transparent px-8 py-4 text-xs font-medium uppercase tracking-widest text-cream transition-all duration-300 hover:bg-green/40 active:bg-green"
                      >
                        <span>Explore in 3D</span>
                        <CubeIcon className="h-6 w-6 text-green" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Screen 2 */}
              <div className="screen2 absolute inset-0 h-full w-full pt-20">
                <div className="wrapper flex justify-end">
                  <div className="w-1/2 pt-15 max-lg:w-full max-lg:pt-[40vh]">
                    <h2 className="heading-2 heading2 font-serif text-cream">
                      Belgrade Arbor isn&apos;t just another addition to the skyline;
                      it&apos;s a curated urban ecosystem that evolves with the rhythm of
                      the city.
                    </h2>
                    <div className="button2Wrap mt-30 max-xl:mt-20 max-lg:mt-10">
                      <button
                        type="button"
                        onClick={onExplore3D}
                        className="inline-flex cursor-pointer items-center justify-center gap-4 rounded-full border border-green bg-transparent px-8 py-4 text-xs font-medium uppercase tracking-widest text-cream transition-all duration-300 hover:bg-green/40 active:bg-green"
                      >
                        <span>Explore in 3D</span>
                        <CubeIcon className="h-6 w-6 text-green" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Screen 3 */}
              <div className="screen3 absolute inset-0 h-full w-full pt-20">
                <div className="wrapper flex flex-col pt-15 max-lg:pt-2">
                  <h2 className="hero heading3 font-serif w-full uppercase text-cream text-[5.5rem] lg:text-[7rem] leading-none">
                    A New Chapter in Prestigious Living
                  </h2>
                  <div className="w-1/2 self-end pt-25 max-xl:w-5/12 max-xl:pt-0 max-lg:w-1/2 max-lg:pt-20">
                    <p className="paragraph paragraph1 text-sand text-lg leading-relaxed">
                      A clear architectural vision, a carefully selected location, and
                      thoughtfully curated amenities make Belgrade Arbor a residential
                      destination where quality, comfort, and long-term value naturally
                      converge.
                    </p>
                    <a
                      className="link text-accent mt-10 inline-block font-sans text-xs tracking-widest uppercase hover:underline"
                      href="#Residences"
                    >
                      Explore Our Apartments
                    </a>
                  </div>
                </div>
              </div>

              {/* Sticky Progress Indicator */}
              <div className="absolute bottom-20 left-20 flex items-center gap-5 max-lg:bottom-10 max-lg:left-10">
                <div className="bg-green/40 relative h-px w-70">
                  <div className="progress-fill bg-accent absolute top-0 left-0 h-full w-0" />
                </div>
                <div className="small text-green relative h-[1em] w-[2ch] leading-none font-mono">
                  <span className="progress-num-1 absolute inset-0">01</span>
                  <span className="progress-num-2 absolute inset-0">02</span>
                  <span className="progress-num-3 absolute inset-0">03</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE 600vh SCROLLER */}
      <section
        id="IntroductionMobile"
        ref={mobileSectionRef}
        className="introduction-mobile relative hidden max-md:block"
      >
        <div className="scroller-mobile text-cream relative h-[600vh] overflow-clip">
          <div className="sticky-mobile to-pine-green sticky top-0 left-0 flex h-screen w-full items-center overflow-clip bg-radial-[at_bottom_right] from-[#3E562E]">
            {/* Background Foliage */}
            <Image
              src="/home/introduction/leafs.webp"
              alt="Background"
              width={1000}
              height={1000}
              className="leafs absolute top-0 right-[-10%] h-screen w-[120vw] max-w-none origin-top-right object-cover opacity-40 mix-blend-multiply"
            />

            {/* Screen 1 */}
            <div className="screen1 absolute inset-0 h-full w-full">
              <div className="wrapper flex h-full flex-col justify-center px-6">
                <p className="kicker mobile-preheading1 text-accent mb-5 uppercase text-xs tracking-widest font-medium">
                  BELGRADE ARBOR DESIGN
                </p>
                <h2 className="heading-2 mobile-heading1 font-serif text-cream text-[2.25rem] leading-tight">
                  The visual identity of Belgrade Arbor is defined by an elegant
                  facade inspired by the form of a tree canopy, a symbol of growth,
                  balance, and longevity.
                </h2>
              </div>
            </div>

            {/* Screen 2: Architecture Morphs */}
            <div className="screen2 absolute inset-0 h-full w-full">
              <div className="wrapper relative flex h-full justify-end px-6">
                <div className="relative h-full w-full">
                  <div className="mobile-image absolute top-1/2 right-0 w-64 -translate-y-1/2">
                    <svg
                      viewBox="0 0 612 824"
                      preserveAspectRatio="xMidYMid meet"
                      className="h-full w-full overflow-visible"
                    >
                      <defs>
                        <clipPath id="introMobileClip1" clipPathUnits="userSpaceOnUse">
                          <path d={MORPH_CLIP1_PATH_A} />
                        </clipPath>
                      </defs>
                      <image
                        href="/home/introduction/image1.webp"
                        x="0"
                        y="0"
                        width="612"
                        height="824"
                        preserveAspectRatio="xMidYMid slice"
                        clipPath="url(#introMobileClip1)"
                      />
                    </svg>
                  </div>
                  <div className="mobile-image absolute top-1/2 left-0 w-46 -translate-y-1/2">
                    <svg
                      viewBox="0 0 563 559"
                      preserveAspectRatio="xMidYMid meet"
                      className="h-full w-full overflow-visible"
                    >
                      <defs>
                        <clipPath id="introMobileClip2" clipPathUnits="userSpaceOnUse">
                          <path d={MORPH_CLIP2_PATH_A} />
                        </clipPath>
                      </defs>
                      <image
                        href="/home/introduction/image3.webp"
                        x="0"
                        y="0"
                        width="612"
                        height="824"
                        preserveAspectRatio="xMidYMid slice"
                        clipPath="url(#introMobileClip2)"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Screen 3 */}
            <div className="screen3 absolute inset-0 h-full w-full">
              <div className="wrapper flex h-full items-center px-6">
                <h2 className="heading-2 mobile-heading2 font-serif text-cream text-[2.25rem] leading-tight">
                  Belgrade Arbor isn&apos;t just another addition to the skyline; it&apos;s
                  a curated urban ecosystem that evolves with the rhythm of the city.
                </h2>
              </div>
            </div>

            {/* Screen 4: Secondary Architecture Morphs */}
            <div className="screen4 absolute inset-0 h-full w-full">
              <div className="wrapper relative flex h-full justify-end px-6">
                <div className="relative h-full w-full">
                  <div className="mobile-image absolute top-1/4 right-0 w-46">
                    <svg
                      viewBox="0 0 612 824"
                      preserveAspectRatio="xMidYMid meet"
                      className="h-full w-full overflow-visible"
                    >
                      <defs>
                        <clipPath id="introMobileClip3" clipPathUnits="userSpaceOnUse">
                          <path d={MORPH_CLIP1_PATH_B} />
                        </clipPath>
                      </defs>
                      <image
                        href="/home/introduction/image2.webp"
                        x="0"
                        y="0"
                        width="612"
                        height="824"
                        preserveAspectRatio="xMidYMid slice"
                        clipPath="url(#introMobileClip3)"
                      />
                    </svg>
                  </div>
                  <div className="mobile-image absolute top-[45%] left-0 w-72">
                    <svg
                      viewBox="0 0 563 559"
                      preserveAspectRatio="xMidYMid meet"
                      className="h-full w-full overflow-visible"
                    >
                      <defs>
                        <clipPath id="introMobileClip4" clipPathUnits="userSpaceOnUse">
                          <path d={MORPH_CLIP2_PATH_B} />
                        </clipPath>
                      </defs>
                      <image
                        href="/home/introduction/image4.webp"
                        x="0"
                        y="0"
                        width="612"
                        height="824"
                        preserveAspectRatio="xMidYMid slice"
                        clipPath="url(#introMobileClip4)"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Screen 5 */}
            <div className="screen5 absolute inset-0 h-full w-full">
              <div className="wrapper flex h-full flex-col justify-center gap-10 px-6">
                <h2 className="hero mobile-heading3 font-serif text-cream text-[3.25rem] leading-[1.05] uppercase">
                  A New Chapter in Prestigious Living
                </h2>
                <div className="w-full">
                  <p className="paragraph mobile-paragraph1 text-sand text-base leading-relaxed">
                    A clear architectural vision, a carefully selected location, and
                    thoughtfully curated amenities make Belgrade Arbor a residential
                    destination where quality, comfort, and long-term value naturally
                    converge.
                  </p>
                  <a
                    href="#Residences"
                    className="mobile-link link text-accent mt-6 inline-block text-xs uppercase tracking-widest"
                  >
                    Explore Our Apartments
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Progress Bar */}
            <div className="absolute top-24 left-6 flex items-center gap-5">
              <div className="bg-green/40 relative h-px w-32">
                <div className="progress-fill bg-accent absolute top-0 left-0 h-full w-0" />
              </div>
              <div className="small text-green relative h-[1em] w-[2ch] leading-none font-mono text-xs">
                <span className="progress-num-1 absolute inset-0">01</span>
                <span className="progress-num-2 absolute inset-0">02</span>
                <span className="progress-num-3 absolute inset-0">03</span>
                <span className="progress-num-4 absolute inset-0">04</span>
                <span className="progress-num-5 absolute inset-0">05</span>
              </div>
            </div>

            {/* Mobile Bottom CTA */}
            <button
              type="button"
              onClick={onExplore3D}
              className="absolute bottom-12 left-6 right-6 inline-flex cursor-pointer items-center justify-center gap-3 rounded-full border border-green bg-transparent py-3.5 text-xs font-medium uppercase tracking-widest text-cream active:bg-green"
            >
              <span>Explore in 3D</span>
              <CubeIcon className="h-5 w-5 text-green" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
