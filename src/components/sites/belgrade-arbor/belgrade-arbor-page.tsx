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
import { ResidenceOptionsSection } from "./residence-options";
import { BusinessSpacesSection } from "./business-spaces";
import { BusinessSpacesOptionsSection } from "./business-spaces-options";
import { RootsSection } from "./roots";
import { AmenitiesSection } from "./amenities";
import { AmenitiesOptionsSection } from "./amenities-options";
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

        {/* Main Page Flow with Authentic Scrollytelling Sections (1:1 with Live Site) */}
        <main>
          {/* Hero Video with Preloader & Title */}
          <HeroVideo src="/home/hero.mp4" mobileSrc="/home/hero-m.webm" />

          {/* Section 1: Introduction (900vh Desktop / 600vh Mobile Scrollytelling) */}
          <Introduction onExplore3D={() => handleOpenInquire("3D Experience")} />

          {/* Section 2: Location (Parallax & Video Card Clip Reveal) */}
          <LocationSection />

          {/* Section 3: Around (Interactive Destination Explorer) */}
          <AroundSection />

          {/* Section 4: Residences (Parallax Hero & Interior Video Card) */}
          <ResidencesSection />

          {/* Section 5: Residence Options (Split Layout & Floor Plan Image Carousel) */}
          <ResidenceOptionsSection onInquire={handleOpenInquire} />

          {/* Section 6: Business Spaces (Facade Parallax Hero & Retail Video Card) */}
          <BusinessSpacesSection />

          {/* Section 7: Business Spaces Options (Split Wings & Gradient Showcase) */}
          <BusinessSpacesOptionsSection onInquire={handleOpenInquire} />

          {/* Section 8: Roots (Mouse Parallax & Expanding Leaf Masks) */}
          <RootsSection />

          {/* Section 9: Amenities (Parallax Hero & Amenities Video Card) */}
          <AmenitiesSection />

          {/* Section 10: Amenities Options (Split Layout & Facilities Image Carousel) */}
          <AmenitiesOptionsSection />

          {/* Section 11: Horizontal Panoramic Gallery (Pinned Scrub & Curtain Reveal) */}
          <HorizontalGallery />

          {/* Section 12: Installment Plan (Split Clip Reveals & Parallax Schedule) */}
          <InstallmentSection />
        </main>

        {/* Section 13: Footer (Parallax Foliage & Newsletter) */}
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
