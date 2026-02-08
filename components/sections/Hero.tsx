"use client"

import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* BASE BACKGROUND */}
      <div className="absolute inset-0 bg-neutral-950" />

      {/* HOUSE BACKGROUND */}
      <div className="pointer-events-none absolute inset-y-[-25%] right-[-10%] w-[120%] overflow-hidden">
        <Image
          src="/images/hero/house-ph-no-bg.png"
          alt="Luxury house"
          fill
          priority
          className="object-cover object-right opacity-35 brightness-90 blur-[1.5px]"
        />

        {/* SOFTER FADE */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.35) 70%, transparent 100%)"
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6">
        <div className="grid w-full grid-cols-1 items-center gap-20 lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div>
            {/* BROKER LOGO */}
            <div className="mb-8">
              <Image
                src="/images/hero/logo.png"
                alt="Broker logo"
                width={300}
                height={40}
                className="opacity-90"
              />
            </div>

            {/* HEADLINE */}
            <h1 className="mb-6 font-display text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
              Find Your <br /> Dream Home
            </h1>

            {/* SUBLINE */}
            <p className="mb-12 max-w-xl text-neutral-400 leading-relaxed">
              A refined approach to buying and selling real estate in
              Montreal, guided by experience, strategy, and trust.
            </p>

            {/* SEARCH BAR */}
            <div className="grid w-full max-w-xl grid-cols-1 gap-3 rounded-2xl border border-neutral-800 bg-black/70 p-4 backdrop-blur md:grid-cols-[2fr_1fr_1fr_auto] md:items-center">
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

              <button className="h-12 whitespace-nowrap rounded-md bg-red-600 px-6 text-sm font-medium text-white transition hover:bg-red-700">
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
            <div className="absolute bottom-[-40px] right-[40px] h-[260px] w-[400px] rounded-xl bg-black/60 blur-2xl" />
          </div>

        </div>
      </div>
    </section>
  )
}