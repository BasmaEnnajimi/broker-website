"use client"

import { useState } from "react"
import ListingCard from "./ListingCard"

const listings = [
  {
    id: "1",
    title: "Modern Luxury Home",
    price: "$2,495,000",
    address: "1234 Maple Drive, Montreal, QC",
    beds: 5,
    baths: 4,
    sqft: 4200,
    image: "/images/listings/house_ph.png"
  },
  {
    id: "2",
    title: "Elegant Family Estate",
    price: "$1,850,000",
    address: "5676 Oak Street, Laval, QC",
    beds: 4,
    baths: 3,
    sqft: 3000,
    image: "/images/listings/house_ph.png"
  },
  {
    id: "3",
    title: "Prestige Stone Residence",
    price: "$3,200,000",
    address: "9101 Elm Avenue, Brossard, QC",
    beds: 6,
    baths: 6,
    sqft: 5000,
    image: "/images/listings/house_ph.png"
  },
  {
    id: "4",
    title: "Contemporary Villa",
    price: "$2,150,000",
    address: "44 Pine Road, Westmount, QC",
    beds: 4,
    baths: 4,
    sqft: 3600,
    image: "/images/listings/house_ph.png"
  },
  {
    id: "5",
    title: "Luxury Urban Home",
    price: "$1,980,000",
    address: "88 Crescent Blvd, Montreal, QC",
    beds: 3,
    baths: 3,
    sqft: 2800,
    image: "/images/listings/house_ph.png"
  }
]

const VISIBLE = 3

export default function FeaturedListings() {
  const [index, setIndex] = useState(0)
  const maxIndex = listings.length - VISIBLE

  const prev = () =>
    setIndex(i => (i === 0 ? maxIndex : i - 1))

  const next = () =>
    setIndex(i => (i === maxIndex ? 0 : i + 1))

  return (
    <section className="relative z-10 bg-neutral-950 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* TITLE */}
        <h2 className="mb-2 font-display text-3xl text-white">
          Featured Properties
        </h2>

        <p className="mb-10 text-neutral-400">
          Explore the latest luxury homes for sale.
        </p>

        {/* BLACK CONTAINER */}
        <div className="relative rounded-xl border border-neutral-800 bg-black/70 backdrop-blur">

          {/* INNER PADDING (IMPORTANT FIX) */}
          <div className="relative overflow-hidden px-6 py-6">

            {/* TRACK */}
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${index * (100 / VISIBLE)}%)`
              }}
            >
              {listings.map(listing => (
                <div
                  key={listing.id}
                  className="w-[calc(100%/3)] flex-shrink-0 pr-6 last:pr-0"
                >
                  <ListingCard listing={listing} />
                </div>
              ))}
            </div>
          </div>

          {/* LEFT ARROW */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-red-600 bg-black/80 px-3 py-2 text-red-500 transition hover:bg-red-600 hover:text-white"
            aria-label="Previous listings"
          >
            ‹
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-red-600 bg-black/80 px-3 py-2 text-red-500 transition hover:bg-red-600 hover:text-white"
            aria-label="Next listings"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}