import Image from "next/image";

export function RootsSection() {
  return (
    <section id="Roots" className="bg-navy relative z-1 min-h-screen overflow-hidden text-cream py-32 sm:py-40">
      {/* Huge Display Watermark Heading Behind Everything */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center select-none z-0">
        <span className="font-serif text-[12vw] sm:text-[14vw] uppercase tracking-wider text-cream-dark/15 whitespace-nowrap block">
          Your roots
        </span>
      </div>

      <div className="relative z-10 wrapper">
        {/* Kicker */}
        <div className="flex items-center gap-4 mb-8">
          <span className="h-px w-8 bg-golden" />
          <span className="small text-golden tracking-widest uppercase">
            The way of living
          </span>
        </div>

        {/* Dynamic Composition of Leaf Mask Visuals */}
        <div className="relative my-12 min-h-[450px] sm:min-h-[550px] w-full">
          {/* Mask 3 Layer (Right Background) */}
          <div className="absolute right-0 top-0 w-3/4 max-w-lg aspect-16/10 opacity-80 sm:opacity-90 transform transition-transform duration-700 hover:scale-105">
            <div
              className="w-full h-full relative"
              style={{
                maskImage: "url('/home/roots/mask3.svg')",
                WebkitMaskImage: "url('/home/roots/mask3.svg')",
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            >
              <Image
                src="/home/roots/image3.webp"
                alt="Roots Architecture"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Mask 2 Layer (Center Left Foreground) */}
          <div className="absolute left-4 sm:left-12 bottom-0 w-2/3 max-w-md aspect-4/3 z-10 transform transition-transform duration-700 hover:scale-105 shadow-2xl">
            <div
              className="w-full h-full relative"
              style={{
                maskImage: "url('/home/roots/mask2.svg')",
                WebkitMaskImage: "url('/home/roots/mask2.svg')",
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            >
              <Image
                src="/home/roots/image2.webp"
                alt="Living Sanctuary"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Narrative & Action Block */}
        <div className="max-w-2xl mt-16">
          <p className="heading-2 font-serif text-sand leading-tight">
            In Belgrade Arbor, each residence is crafted not merely for living,
            but as a space that evolves alongside you
          </p>

          <div className="mt-10">
            <a
              href="#Residences"
              className="group inline-flex items-center gap-4 rounded-full border border-green bg-transparent px-8 py-4 text-xs uppercase tracking-widest text-cream transition-all duration-300 hover:bg-green/40 active:bg-green"
            >
              <span>Explore residences</span>
              <svg
                width="20"
                height="8"
                viewBox="0 0 25 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover:translate-x-1"
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
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
