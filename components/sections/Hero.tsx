"use client"

import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* BASE BACKGROUND */}
      <div className="absolute inset-0 bg-neutral-950" />

      {/* HOUSE BACKGROUND */}
      <div className="absolute inset-y-[-25%] right-[-10%] w-[120%] overflow-hidden pointer-events-none">
        <Image
          src="/images/hero/house-ph-no-bg.png"
          alt="Luxury house"
          fill
          priority
          className="object-cover object-right opacity-40 brightness-90 blur-[2px]"
        />

        {/* FADE: LEFT BLACK → RIGHT HOUSE */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, black 0%, rgba(0,0,0,0.95) 25%, rgba(0,0,0,0.75) 45%, rgba(0,0,0,0.4) 65%, transparent 100%)"
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6">
        <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div>
            {/* TAG */}
            <div className="mb-6 inline-flex items-center rounded-full border border-red-600/40 px-4 py-1 text-xs tracking-widest text-red-500">
              LUXURY REAL ESTATE
            </div>

            {/* HEADLINE */}
            <h1 className="mb-6 font-display text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
              Find Your <br /> Dream Home
            </h1>

            {/* SUBLINE */}
            <p className="mb-10 max-w-xl text-neutral-400">
              With Emad Faddoul, your trusted real estate expert.
            </p>

            {/* SEARCH BAR (FIXED, NO MOVEMENT) */}
            <div className="grid w-full max-w-xl grid-cols-1 gap-3 rounded-xl border border-neutral-800 bg-black/70 p-4 backdrop-blur md:grid-cols-[2fr_1fr_1fr_auto] md:items-center">
              <input
                type="text"
                placeholder="City, Address, Postal Code"
                className="h-12 w-full rounded-md bg-neutral-900 px-4 text-sm text-white placeholder-neutral-500 outline-none"
              />

              <select className="h-12 w-full rounded-md bg-neutral-900 px-4 text-sm text-neutral-400 outline-none">
                <option>Property Type</option>
              </select>

              <select className="h-12 w-full rounded-md bg-neutral-900 px-4 text-sm text-neutral-400 outline-none">
                <option>Min. Price</option>
              </select>

              <button className="h-12 whitespace-nowrap rounded-md bg-red-600 px-6 text-sm font-medium text-white transition duration-300 hover:bg-red-700">
                Search
              </button>
            </div>
          </div>

          {/* RIGHT SIDE – BROKER */}
          <div className="relative hidden justify-end lg:flex">
            <Image
              src="/images/broker/broker_r.png"
              alt="Real estate broker"
              width={520}
              height={700}
              priority
              className="relative z-20 object-contain"
            />

            {/* DEPTH SHADOW */}
            <div className="absolute bottom-[-40px] right-[40px] h-[280px] w-[420px] rounded-xl bg-black/60 blur-2xl" />
          </div>

        </div>
      </div>
    </section>
  )
}