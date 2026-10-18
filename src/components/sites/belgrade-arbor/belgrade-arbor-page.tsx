"use client";

import { useState } from "react";
import { Header } from "./header";
import { AwwwardsRibbon } from "./awwwards";
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
    <div className="relative min-h-screen bg-vanilla text-pine-green selection:bg-golden/30 selection:text-pine-green font-sans">
      {/* Floating Header */}
      <Header onOpenInquire={() => handleOpenInquire("General Inquiry")} />

      {/* Floating Awwwards Ribbon */}
      <AwwwardsRibbon />

      {/* Main Page Flow */}
      <main>
        {/* Section 1: Introduction */}
        <Introduction onExplore3D={() => handleOpenInquire("3D Experience")} />

        {/* Section 2: Location */}
        <LocationSection />

        {/* Section 3: Around */}
        <AroundSection />

        {/* Section 4: Residences & Residence Options */}
        <ResidencesSection onInquire={handleOpenInquire} />

        {/* Section 5: Business Spaces & Retails */}
        <BusinessSpacesSection onInquire={handleOpenInquire} />

        {/* Section 6: Roots */}
        <RootsSection />

        {/* Section 7: Amenities */}
        <AmenitiesSection />

        {/* Section 8: Horizontal Panoramic Gallery */}
        <HorizontalGallery />

        {/* Section 9: Installment Plan */}
        <InstallmentSection />
      </main>

      {/* Section 10: Footer */}
      <FooterSection />

      {/* Inquire Modal Dialog */}
      <InquireModal
        isOpen={isInquireOpen}
        onClose={() => setIsInquireOpen(false)}
        initialUnit={selectedUnit}
      />
    </div>
  );
}
