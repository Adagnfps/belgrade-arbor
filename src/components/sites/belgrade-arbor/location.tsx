import Image from "next/image";

export function LocationSection() {
  return (
    <section id="Location" className="relative z-1 min-h-[90vh] bg-vanilla text-pine-green overflow-hidden">
      <div className="relative min-h-[90vh] flex flex-col justify-end">
        {/* Full Bleed Architectural Landscape */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/home/location/location.webp"
            alt="Belgrade Arbor Location Bulevar heroja sa Kosara"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-vanilla via-vanilla/40 to-transparent" />
        </div>

        {/* Floating Narrative Card */}
        <div className="relative z-10 wrapper pb-20 pt-32">
          <div className="max-w-2xl bg-vanilla/90 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-pine-green/10 shadow-xl">
            <span className="small tracking-widest text-golden uppercase font-medium">
              Prime New Belgrade Position
            </span>
            <h2 className="heading-1 font-serif text-pine-green mt-3">
              Location
            </h2>
            <p className="paragraph mt-6 text-pine-green/80 text-lg leading-relaxed font-sans">
              At one of New Belgrade&apos;s most dynamic locations, on Bulevar heroja sa
              Košara, Belgrade Arbor is taking shape as a contemporary residential
              and commercial development that seamlessly brings together refined
              architecture, everyday comfort, and enduring value.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
