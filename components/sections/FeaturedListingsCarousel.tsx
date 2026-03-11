"use client"

import { useState } from "react"
import ListingCard from "./ListingCard"

const VISIBLE = 3

export default function FeaturedListingsCarousel({ listings }: any) {

  const [index, setIndex] = useState(0)
  const maxIndex = Math.max(0, listings.length - VISIBLE)

  const prev = () =>
    setIndex(i => (i === 0 ? maxIndex : i - 1))

  const next = () =>
    setIndex(i => (i === maxIndex ? 0 : i + 1))

  return (
    <section className="relative z-10 bg-neutral-50 py-24">

      <div className="mx-auto max-w-7xl px-6">

        <h2 className="mb-2 font-display text-3xl text-black">
          Featured Properties
        </h2>

        <p className="mb-10 text-neutral-400">
          Explore the latest luxury homes for sale.
        </p>

        <div className="relative rounded-xl border border-neutral-900 bg-black backdrop-blur">

          <div className="relative overflow-hidden px-6 py-6">

            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${index * (100 / VISIBLE)}%)`
              }}
            >

              {listings.map((listing: any) => (

                <div
                  key={listing.id}
                  className="w-[calc(100%/3)] flex-shrink-0 pr-6 last:pr-0"
                >
                  <ListingCard listing={listing} />
                </div>

              ))}

            </div>

          </div>

          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-red-600 bg-black/80 px-3 py-2 text-red-500 transition hover:bg-red-600 hover:text-white"
          >
            ‹
          </button>

          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-red-600 bg-black/80 px-3 py-2 text-red-500 transition hover:bg-red-600 hover:text-white"
          >
            ›
          </button>

        </div>

      </div>

    </section>
  )
}