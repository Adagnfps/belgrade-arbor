"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.from("#Footer .fadeElement", {
        opacity: 0,
        y: "2rem",
        x: "-2rem",
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#Footer .wrapper",
          start: "top 80%",
        },
      });

      gsap.to("#Footer .front", {
        y: "8rem",
        scrollTrigger: {
          trigger: "#Footer",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("Please consent to the privacy policy to proceed.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <footer
      ref={footerRef}
      id="Footer"
      className="footer-scroller relative bg-gradient-to-t from-[#8AB6D2] via-[#8AB6D2]/60 to-vanilla pt-24 sm:pt-32 text-pine-green overflow-hidden"
    >
      <div className="wrapper relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Newsletter Signup Form */}
          <div className="lg:col-span-5 fadeElement">
            <h2 className="heading-2 font-serif text-pine-green uppercase leading-tight">
              JOIN THE WORLD OF BELGRADE ARBOR
            </h2>
            <p className="paragraph mt-4 text-pine-green/80">
              Subscribe to join our community and stay up to date.
            </p>

            {submitted ? (
              <div className="mt-8 p-6 bg-white/70 rounded-2xl border border-green/30 text-pine-green">
                <p className="font-serif text-xl font-medium">Thank you for subscribing.</p>
                <p className="text-sm text-pine-green/70 mt-1">
                  We have received your details and will keep you informed with project updates.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="small text-xs uppercase tracking-wider text-golden block mb-1 font-medium"
                    >
                      First name*
                    </label>
                    <input
                      id="first-name"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="w-full bg-transparent border-0 border-b border-pine-green/40 focus:border-pine-green py-2 text-sm text-pine-green outline-none transition-colors"
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="small text-xs uppercase tracking-wider text-golden block mb-1 font-medium"
                    >
                      Last name*
                    </label>
                    <input
                      id="last-name"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full bg-transparent border-0 border-b border-pine-green/40 focus:border-pine-green py-2 text-sm text-pine-green outline-none transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="small text-xs uppercase tracking-wider text-golden block mb-1 font-medium"
                  >
                    Email*
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-transparent border-0 border-b border-pine-green/40 focus:border-pine-green py-2 text-sm text-pine-green outline-none transition-colors"
                    placeholder="jane.doe@example.com"
                  />
                </div>

                <label className="flex items-start gap-3 cursor-pointer text-xs text-pine-green/75 leading-relaxed pt-2">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) =>
                      setFormData({ ...formData, consent: e.target.checked })
                    }
                    className="mt-0.5 h-4 w-4 rounded border-pine-green text-pine-green focus:ring-green accent-pine-green"
                  />
                  <span>
                    I consent to my information being collected in accordance with
                    the Belgrade Arbor Privacy policy
                  </span>
                </label>

                <button
                  type="submit"
                  className="link inline-block cursor-pointer text-pine-green hover:text-green font-medium tracking-widest uppercase text-sm pt-2"
                >
                  Let&apos;s begin
                </button>
              </form>
            )}
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 lg:pl-8 fadeElement">
            <ul className="space-y-3 font-sans uppercase text-sm tracking-wide">
              <li>
                <a href="#Introduction" className="hover:text-green transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#Introduction" className="hover:text-green transition">
                  3D Experience
                </a>
              </li>
              <li>
                <a href="#Residences" className="hover:text-green transition">
                  Residences
                </a>
              </li>
              <li>
                <a href="#BusinessSpaces" className="hover:text-green transition">
                  Business
                </a>
              </li>
              <li>
                <a href="#BusinessSpaces" className="hover:text-green transition">
                  Retail Spaces
                </a>
              </li>
              <li>
                <a href="#Location" className="hover:text-green transition">
                  Location
                </a>
              </li>
              <li>
                <a href="#Amenities" className="hover:text-green transition">
                  Amenities
                </a>
              </li>
              <li>
                <a href="#Installment" className="hover:text-green transition">
                  Installment Plan
                </a>
              </li>
              <li>
                <a href="#Footer" className="hover:text-green transition">
                  Contact
                </a>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-pine-green/10">
              <span className="text-xs text-pine-green/60 uppercase tracking-wider block mb-2 font-medium">
                Social Networks
              </span>
              <ul className="space-y-1.5 text-sm text-golden">
                <li>
                  <a
                    href="https://www.instagram.com/belgradearbor/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/belgrade-arbor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/belgradearbor/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Disclaimer & Direct Contact */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full fadeElement">
            <p className="small text-xs text-pine-green/70 leading-relaxed">
              Disclaimer: Upon completion of the project&apos;s materialization, minor
              deviations in the appearance of the facade or architectural details
              may occur compared to the presented renderings. The room numbering
              has been carried out in accordance with the property registration
              system of the Republic of Serbia.
            </p>

            <div className="mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-pine-green/10">
              <span className="small text-xs uppercase tracking-wider text-pine-green/60 block mb-1">
                For direct inquiries, our team is available at:
              </span>
              <a
                href="tel:+38169684444"
                className="font-mono text-xl sm:text-2xl text-golden hover:underline font-medium block mt-1"
              >
                +381 69 68 44 44
              </a>
              <span className="text-xs text-pine-green/60 block mt-2">
                Bulevar heroja sa Košara, New Belgrade
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Silhouette Silhouette Graphic with Scrub Parallax */}
      <div className="front relative w-full mt-16 pointer-events-none select-none will-change-transform">
        <div className="relative w-full aspect-21/9 max-h-[600px] overflow-hidden">
          <Image
            src="/home/footer/front.webp"
            alt="Belgrade Arbor Complex Silhouette"
            fill
            className="object-cover object-top"
          />
        </div>

        {/* Tree Foliage Layers */}
        <div className="absolute bottom-0 left-0 w-80 h-96 hidden md:block">
          <Image
            src="/home/footer/tree-l.webp"
            alt="Foliage Left"
            fill
            className="object-contain object-bottom-left"
          />
        </div>
        <div className="absolute bottom-0 right-0 w-[500px] h-96 hidden md:block">
          <Image
            src="/home/footer/tree-r.webp"
            alt="Foliage Right"
            fill
            className="object-contain object-bottom-right"
          />
        </div>
      </div>

      {/* Bottom Bar Statement */}
      <div className="bg-[#1F261E] text-cream py-8 relative z-20">
        <div className="wrapper flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="small text-xs text-cream/60">
            © 2026 Belgrade Arbor. All Rights Reserved.
          </p>
          <span className="font-serif text-2xl uppercase tracking-widest text-golden font-light">
            Belgrade Arbor
          </span>
        </div>
      </div>
    </footer>
  );
}
