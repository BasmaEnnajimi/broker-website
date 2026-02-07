"use client"

import { useEffect, useRef, useState } from "react"

const testimonials = [
  {
    name: "Sarah M.",
    role: "Home Buyer",
    quote:
      "Emad made the entire buying process seamless. His market insight and honesty gave us confidence at every step."
  },
  {
    name: "David R.",
    role: "Real Estate Investor",
    quote:
      "I’ve worked with several brokers over the years, and Emad stands out for his strategy, precision, and professionalism."
  },
  {
    name: "Lina K.",
    role: "First-Time Buyer",
    quote:
      "As a first-time buyer, I felt fully supported. Every question was answered clearly, without pressure."
  },
  {
    name: "Marc T.",
    role: "Home Seller",
    quote:
      "Our property sold faster than expected and above asking. The process was smooth from listing to closing."
  }
]

// helper to generate rating between 4.0 and 5.0
const generateRating = () =>
  Math.round((4 + Math.random()) * 10) / 10

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  // generate ratings ONCE
  const [ratings] = useState(() =>
    testimonials.map(() => generateRating())
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <div className="mb-20 max-w-xl">
          <h2 className="mb-4 font-display text-3xl text-neutral-900">
            Client Experiences
          </h2>
          <p className="text-neutral-600">
            Every transaction is different. Here’s what clients say about
            working with us.
          </p>
        </div>

        {/* TESTIMONIAL STACK */}
        <div ref={containerRef} className="relative space-y-14">
          {testimonials.map((t, i) => {
            const rating = ratings[i]
            const fullStars = Math.floor(rating)
            const hasHalf = rating % 1 !== 0

            return (
              <div
                key={i}
                className={`
                  relative
                  rounded-2xl
                  border border-neutral-200
                  bg-white
                  p-8
                  shadow-sm
                  transition-all
                  duration-500
                  hover:scale-[1.02]
                  hover:shadow-lg
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                  ${i % 2 === 0 ? "ml-0 max-w-3xl" : "ml-auto max-w-3xl"}
                `}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* RED ACCENT */}
                <div className="absolute left-0 top-8 h-[60%] w-1 rounded-full bg-red-600" />

                {/* STARS */}
                <div className="mb-4 flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, idx) => {
                    if (idx < fullStars) {
                      return <span key={idx}>★</span>
                    }
                    if (idx === fullStars && hasHalf) {
                      return <span key={idx}>☆</span>
                    }
                    return <span key={idx} className="text-neutral-300">★</span>
                  })}
                  <span className="ml-2 text-sm text-neutral-600">
                    {rating.toFixed(1)}
                  </span>
                </div>

                <p className="mb-6 text-neutral-700 leading-relaxed">
                  {t.quote}
                </p>

                <div>
                  <p className="font-medium text-neutral-900">
                    {t.name}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {t.role}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}