"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

// Only register in browser / client runtime
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, MorphSVGPlugin);
}

export { gsap, ScrollTrigger, SplitText, MorphSVGPlugin };
