"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const images = [
  "/images/services/service1.png",
  "/images/services/service2.png",
  "/images/services/service3.webp",
  "/images/services/service4.webp"
]

export default function Services() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length)
    }, 4500)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative z-10 bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

          {/* LEFT — IMAGE SLIDESHOW */}
          <div className="relative h-[420px] overflow-hidden rounded-xl border border-neutral-200 bg-white">
            {images.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt="Real estate service"
                fill
                priority={i === 0}
                className={`object-cover transition-opacity duration-700 ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* SUBTLE FADE FOR READABILITY */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
          </div>

          {/* RIGHT — TEXT */}
          <div>
            <h2 className="mb-6 font-display text-3xl text-neutral-900">
              Exceptional Real Estate Services
            </h2>

            <p className="mb-8 max-w-xl text-neutral-600">
              We provide a full range of premium real estate services tailored to
              buyers, sellers, and investors seeking exceptional results.
            </p>

            <ul className="space-y-5 text-neutral-700">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-red-600" />
                <span>
                  <strong className="text-neutral-900">
                    Luxury Property Sales
                  </strong>{" "}
                  – Strategic pricing and elite market exposure.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-red-600" />
                <span>
                  <strong className="text-neutral-900">
                    Buyer Representation
                  </strong>{" "}
                  – Expert negotiation and exclusive property access.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-red-600" />
                <span>
                  <strong className="text-neutral-900">
                    Market Analysis
                  </strong>{" "}
                  – Data-driven insights, pricing, and valuation.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-red-600" />
                <span>
                  <strong className="text-neutral-900">
                    Investment Advisory
                  </strong>{" "}
                  – Identifying high-yield opportunities with confidence.
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}