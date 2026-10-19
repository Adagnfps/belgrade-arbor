"use client";

import { useState } from "react";
import Link from "next/link";
import { useLenis } from "./lenis-provider";
import { LogoSymbolIcon, ArrowRightIcon } from "./icons";

interface HeaderProps {
  onOpenInquire?: () => void;
}

export function Header({ onOpenInquire }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollTo, stop, start } = useLenis();

  const toggleMenu = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (next) {
      stop();
    } else {
      start();
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    start();
  };

  const navLinks = [
    { label: "Home", href: "/en" },
    { label: "3D Experience", href: "#Introduction" },
    { label: "Residences", href: "#Residences" },
    { label: "Business", href: "#BusinessSpaces" },
    { label: "Retail Spaces", href: "#BusinessSpaces" },
    { label: "Location", href: "#Location" },
    { label: "Amenities", href: "#Amenities" },
    { label: "Installment Plan", href: "#Installment" },
    { label: "Contact", href: "#Footer" },
  ];

  return (
    <>
      {/* Floating Capsule Bar */}
      <header
        className={`fixed top-6 left-1/2 z-50 flex w-full max-w-160 -translate-x-1/2 justify-center rounded-[1.75rem] bg-[#1F261E]/85 backdrop-blur-lg transition-all duration-500 ease-in-out max-lg:max-w-113 max-md:h-12.5 max-md:w-[calc(100%-3rem)] max-md:max-w-none shadow-2xl border border-white/5 ${
          isOpen ? "h-auto max-h-[90vh] overflow-y-auto" : "h-14 overflow-hidden"
        }`}
      >
        <div className="relative w-full p-2 transition-all">
          {/* Top Bar Row */}
          <div className="relative z-10 flex h-10 items-center justify-between max-md:px-2">
            {/* Menu Toggle Button */}
            <div className="relative z-10 flex-1">
              <button
                type="button"
                onClick={toggleMenu}
                className="group flex cursor-pointer items-center gap-3 pl-3 uppercase text-cream text-xs tracking-wider transition-colors hover:text-sand"
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
              >
                <div className="flex w-7 flex-col justify-between h-2.5">
                  <span
                    className={`bg-green block h-0.5 w-full origin-center transition-all duration-300 ${
                      isOpen ? "translate-y-1 rotate-45" : "translate-y-0 rotate-0"
                    }`}
                  />
                  <span
                    className={`bg-green block h-0.5 w-full origin-center transition-all duration-300 ${
                      isOpen ? "-translate-y-1 -rotate-45" : "translate-y-0 rotate-0"
                    }`}
                  />
                </div>
                <span className="max-md:hidden font-sans font-medium">
                  {isOpen ? "Close" : "Menu"}
                </span>
              </button>
            </div>

            {/* Emblem Logo */}
            <Link
              href="/en"
              className="relative z-10 flex items-center justify-center transition-transform hover:scale-105 text-golden"
              onClick={closeMenu}
            >
              <LogoSymbolIcon className="h-7 w-7 text-golden" />
            </Link>

            {/* Inquire Action Button */}
            <div className="relative z-10 flex flex-1 justify-end max-md:hidden">
              <button
                type="button"
                onClick={onOpenInquire}
                className="group relative inline-flex h-9 items-center justify-center rounded-full border border-green px-5 text-xs uppercase tracking-wider text-sand transition-all hover:bg-green/20"
              >
                <span className="relative z-1 block overflow-hidden leading-tight">
                  <span className="flex items-center justify-center gap-3 transition-all duration-500 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">
                    <span>Inquire</span>
                    <ArrowRightIcon className="text-green h-2.25 w-6 transition-colors group-hover:text-golden" />
                  </span>
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center gap-3 translate-y-full opacity-0 text-cream transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                    <span>Inquire</span>
                    <ArrowRightIcon className="text-golden h-2.25 w-6" />
                  </span>
                </span>
              </button>
            </div>
          </div>

          {/* Expanded Menu Content */}
          {isOpen && (
            <div className="mt-8 pb-6 px-4 animate-in fade-in duration-300">
              <nav className="flex flex-col items-center gap-3">
                {navLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={(e) => {
                      closeMenu();
                      if (item.href.startsWith("#")) {
                        e.preventDefault();
                        scrollTo(item.href);
                      }
                    }}
                    className="group relative w-full overflow-hidden text-center transition-colors"
                  >
                    <span className="block py-1.5 text-2xl font-serif font-light text-cream-dark leading-tight transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">
                      {item.label}
                    </span>
                    <span className="pointer-events-none absolute inset-0 block py-1.5 text-2xl font-serif italic text-golden leading-tight translate-y-full opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                      {item.label}
                    </span>
                  </a>
                ))}
              </nav>

              {/* Mobile Menu Inquire CTA */}
              <div className="mt-6 flex w-full justify-center max-md:block">
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    onOpenInquire?.();
                  }}
                  className="group relative mx-auto flex h-11 w-full max-w-xs items-center justify-center rounded-full border border-green px-5 text-xs uppercase tracking-wider text-sand transition-all hover:bg-green/20"
                >
                  <span className="relative z-1 block overflow-hidden leading-tight">
                    <span className="flex items-center justify-center gap-3 transition-all duration-500 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">
                      <span>Inquire</span>
                      <ArrowRightIcon className="text-green h-2.25 w-6 transition-colors group-hover:text-golden" />
                    </span>
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center gap-3 translate-y-full opacity-0 text-cream transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                      <span>Inquire</span>
                      <ArrowRightIcon className="text-golden h-2.25 w-6" />
                    </span>
                  </span>
                </button>
              </div>

              {/* Menu Footer */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center gap-4 text-xs text-cream-dark">
                <div className="flex items-center gap-6">
                  <span className="font-semibold text-golden">EN</span>
                  <span className="opacity-40">|</span>
                  <span className="hover:text-cream cursor-pointer transition">SR</span>
                </div>
                <div className="text-center">
                  <p className="text-sand/80">Direct Inquiries:</p>
                  <a
                    href="tel:+38169684444"
                    className="text-golden hover:underline font-mono text-sm tracking-wide mt-1 inline-block"
                  >
                    +381 69 68 44 44
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
