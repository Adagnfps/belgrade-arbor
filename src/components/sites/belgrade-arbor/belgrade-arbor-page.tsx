"use client";

import { useState } from "react";
import { LenisProvider } from "./lenis-provider";
import { Header } from "./header";
import { AwwwardsRibbon } from "./awwwards";
import { HeroVideo } from "./hero-video";
import { Introduction } from "./introduction";
import { LocationSection } from "./location";
import { AroundSection } from "./around";
import { ResidencesSection } from "./residences";
import { BusinessSpacesSection } from "./business-spaces";
import { RootsSection } from "./roots";
import { AmenitiesSection } from "./amenities";
import { HorizontalGallery } from "./horizontal";
import { InstallmentSection } from "./installment";
import { FooterSection } from "./footer";
import { InquireModal } from "./inquire-modal";

export function BelgradeArborPage() {
  const [isInquireOpen, setIsInquireOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<string>("General Inquiry");

  const handleOpenInquire = (unitName = "General Inquiry") => {
    setSelectedUnit(unitName);
    setIsInquireOpen(true);
  };

  return (
    <LenisProvider>
      <div className="relative min-h-screen bg-vanilla text-pine-green selection:bg-golden/30 selection:text-pine-green font-sans overflow-x-clip">
        {/* Floating Header */}
        <Header onOpenInquire={() => handleOpenInquire("General Inquiry")} />

        {/* Floating Awwwards Ribbon */}
        <AwwwardsRibbon />

        {/* Main Page Flow with Authentic Scrollytelling */}
        <main>
          {/* Hero Video with Preloader & Title */}
          <HeroVideo src="/home/hero.mp4" mobileSrc="/home/hero-m.webm" />

          {/* Section 1: Introduction (900vh Desktop / 600vh Mobile Scrollytelling) */}
          <Introduction onExplore3D={() => handleOpenInquire("3D Experience")} />

          {/* Section 2: Location (Parallax & Video Card Clip Reveal) */}
          <LocationSection />

          {/* Section 3: Around (Interactive Destination Explorer) */}
          <AroundSection />

          {/* Section 4: Residences & Apartment Options */}
          <ResidencesSection onInquire={handleOpenInquire} />

          {/* Section 5: Business Spaces & Wings */}
          <BusinessSpacesSection onInquire={handleOpenInquire} />

          {/* Section 6: Roots (Mouse Parallax & Leaf Masks) */}
          <RootsSection />

          {/* Section 7: Amenities (Parallax Video & Options Showcase) */}
          <AmenitiesSection />

          {/* Section 8: Horizontal Panoramic Gallery (Pinned Scrub) */}
          <HorizontalGallery />

          {/* Section 9: Installment Plan (Split Clip Reveals & Parallax) */}
          <InstallmentSection />
        </main>

        {/* Section 10: Footer (Parallax Foliage & Newsletter) */}
        <FooterSection />

        {/* Inquire Modal Dialog */}
        <InquireModal
          isOpen={isInquireOpen}
          onClose={() => setIsInquireOpen(false)}
          initialUnit={selectedUnit}
        />
      </div>
    </LenisProvider>
  );
}
