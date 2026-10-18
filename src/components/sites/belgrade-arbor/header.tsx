"use client";

import { useState } from "react";
import Link from "next/link";

interface HeaderProps {
  onOpenInquire?: () => void;
}

export function Header({ onOpenInquire }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

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
                onClick={() => setIsOpen(!isOpen)}
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
              className="relative z-10 flex items-center justify-center transition-transform hover:scale-105"
              onClick={() => setIsOpen(false)}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-golden h-8 w-8"
              >
                <path
                  d="M0.00542084 6.72846V12.2388C0.00542084 14.8968 2.16022 17.0516 4.81573 17.0516H9.2175C10.6897 13.9501 13.8559 11.8003 17.5203 11.8003H19.2616C21.663 11.8003 23.6509 10.0441 24.0146 7.74233C20.1559 7.24411 17.1616 3.97579 17.0844 0H14.9844V2.96441C14.9844 6.62632 12.5132 9.70781 9.14775 10.6395C9.98974 11.3644 11.0858 11.8003 12.284 11.8003H13.0164C12.3887 12.1491 11.8107 12.5825 11.3026 13.0907C10.5901 13.8032 10.0221 14.6526 9.63601 15.5868C9.61359 15.6466 9.58618 15.7064 9.56626 15.7662C5.95167 14.6477 3.2862 11.3544 3.10684 7.416C2.01076 7.36618 0.966985 7.12703 0.00292969 6.72596H0.00542084V6.72846Z"
                  fill="currentColor"
                />
                <path
                  d="M10.6076 0.00242615H7.46387L7.46885 6.52661C9.23753 6.3049 10.6076 4.79779 10.6076 2.96683V0.00242615Z"
                  fill="currentColor"
                />
                <path
                  d="M3.08984 0.00232697H1.46066C0.656036 0.00232697 0.00585938 0.652504 0.00585938 1.45713V1.5219C0.793046 2.36389 1.87917 2.92439 3.09482 3.03399V0.00232697H3.09233H3.08984Z"
                  fill="currentColor"
                />
                <path
                  d="M21.4619 0.00242615C21.5267 1.58178 22.6128 2.89459 24.0776 3.30562V0.00242615H21.4619Z"
                  fill="currentColor"
                />
                <path
                  d="M28.4562 0.00242615L28.4512 6.03337C30.0156 5.23871 31.0843 3.61452 31.0843 1.74121V0.00242615H28.4562Z"
                  fill="currentColor"
                />
                <path
                  d="M34.9979 4.60857C33.9292 7.86693 31.0819 10.3207 27.6043 10.8313C26.152 13.9876 22.9584 16.1797 19.2567 16.1797H17.5154C14.8574 16.1797 12.7051 18.3345 12.7051 20.99V35H22.3282V20.99C22.3282 19.4082 21.5659 18.0032 20.3826 17.1263C21.12 17.0491 21.8449 16.8673 22.53 16.5808C23.3172 16.2545 24.0421 15.8011 24.6773 15.2406C25.8556 16.7078 26.5954 18.5463 26.6901 20.5541H30.2175C32.6712 20.5541 34.699 18.7157 34.9929 16.3367V4.60857H34.9954H34.9979Z"
                  fill="currentColor"
                />
                <path
                  d="M34.9999 23.5883C33.6099 24.4377 31.9732 24.926 30.2245 24.926H26.707V35H33.5426C34.3472 35 34.9974 34.3498 34.9974 33.5452V23.5883H34.9999Z"
                  fill="currentColor"
                />
                <path
                  d="M8.33272 35V21.426H4.81529C3.05159 21.426 1.4 20.9278 0 20.0634V33.5402C0 34.3448 0.650177 34.995 1.4548 34.995H8.33272V35Z"
                  fill="currentColor"
                />
              </svg>
            </Link>

            {/* Inquire Action Button */}
            <div className="relative z-10 flex flex-1 justify-end">
              <button
                type="button"
                onClick={onOpenInquire}
                className="group relative inline-flex h-9 items-center justify-center overflow-hidden rounded-full border border-green px-5 text-xs uppercase tracking-wider text-sand transition-all hover:bg-green/30"
              >
                <span className="flex items-center gap-3 transition-transform duration-300 group-hover:-translate-y-full">
                  <span>Inquire</span>
                  <svg
                    width="18"
                    height="8"
                    viewBox="0 0 25 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-green"
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
                </span>
                <span className="absolute flex items-center gap-3 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-cream">
                  <span>Inquire</span>
                  <svg
                    width="18"
                    height="8"
                    viewBox="0 0 25 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-golden"
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
                    onClick={() => setIsOpen(false)}
                    className="group relative w-full overflow-hidden text-center py-1 transition-colors"
                  >
                    <span className="block text-2xl font-serif font-light text-cream-dark transition-transform duration-300 group-hover:-translate-y-full">
                      {item.label}
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center text-2xl font-serif italic text-golden translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                      {item.label}
                    </span>
                  </a>
                ))}
              </nav>

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
