"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function PropertyGallery({
  images,
}: {
  images: string[]
}) {
  const [index, setIndex] = useState(0)

  const prev = () => {
    setIndex((i) => (i - 1 + images.length) % images.length)
  }

  const next = () => {
    setIndex((i) => (i + 1) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main slider */}
      <div className="relative overflow-hidden rounded-3xl border border-neutral-200">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${index * 100}%)`,
          }}
        >
          {images.map((img) => (
            <div key={img} className="relative h-[420px] w-full flex-shrink-0">
              <Image
                src={img}
                alt="Property image"
                fill
                className="object-cover"
                priority
              />
            </div>
          ))}
        </div>

        {/* Left arrow */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2
            rounded-full bg-white/80 p-3
            opacity-50 transition-all duration-300
            hover:opacity-100 hover:bg-red-600 hover:text-white"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Right arrow */}
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2
            rounded-full bg-white/80 p-3
            opacity-50 transition-all duration-300
            hover:opacity-100 hover:bg-red-600 hover:text-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => setIndex(i)}
            className={`overflow-hidden rounded-xl border transition
              ${
                i === index
                  ? "border-red-600"
                  : "border-neutral-200"
              }`}
          >
            <Image
              src={img}
              alt="Thumbnail"
              width={400}
              height={300}
              className="h-20 w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </button>
        ))}
      </div>
    </div>
  )
}