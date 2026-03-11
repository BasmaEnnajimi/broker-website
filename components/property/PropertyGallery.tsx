"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export default function PropertyGallery({
  images,
}: {
  images: string[]
}) {
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)

  const prev = () => {
    setIndex((i) => (i - 1 + images.length) % images.length)
  }

  const next = () => {
    setIndex((i) => (i + 1) % images.length)
  }

  return (
    <div className="space-y-4">

      {/* MAIN SLIDER */}
      <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100">

        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${index * 100}%)`,
          }}
        >
          {images.map((img) => (
            <div
              key={img}
              className="relative w-full flex-shrink-0 cursor-zoom-in"
              style={{ height: "560px" }} // taller image (fix)
              onClick={() => setOpen(true)}
            >
              <Image
                src={img}
                alt="Property image"
                fill
                className="object-contain"
                priority
              />
            </div>
          ))}
        </div>

        {/* LEFT ARROW */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2
          rounded-full bg-white/80 p-3
          opacity-60 transition
          hover:opacity-100 hover:bg-red-600 hover:text-white"
        >
          <ChevronLeft size={20} />
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2
          rounded-full bg-white/80 p-3
          opacity-60 transition
          hover:opacity-100 hover:bg-red-600 hover:text-white"
        >
          <ChevronRight size={20} />
        </button>

      </div>

      {/* THUMBNAILS */}
      <div className="grid grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => setIndex(i)}
            className={`overflow-hidden rounded-xl border transition
              ${i === index ? "border-red-600" : "border-neutral-200"}`}
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

      {/* FULLSCREEN MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={() => setOpen(false)}
        >
          <button
            className="absolute right-6 top-6 text-white"
            onClick={() => setOpen(false)}
          >
            <X size={28} />
          </button>

          <div className="relative w-full max-w-6xl h-[85vh]">
            <Image
              src={images[index]}
              alt="Full image"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}