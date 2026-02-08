"use client"

import { useEffect, useRef, useState } from "react"

export default function Footer() {
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Sentinel */}
      <div ref={sentinelRef} className="h-1" />

      {/* Footer */}
      <footer
        className={`fixed bottom-0 left-0 right-0 z-50
          transition-all duration-500 ease-in-out
          ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-t-3xl bg-neutral-900 px-8 py-6 text-neutral-300 shadow-2xl">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm">
                © {new Date().getFullYear()} KW Prestige · Keller Williams
              </p>

              <div className="flex items-center gap-6 text-sm">
                <a
                  href="/properties"
                  className="hover:text-white transition"
                >
                  Properties
                </a>
                <a
                  href="/about"
                  className="hover:text-white transition"
                >
                  About
                </a>
                <a
                  href="/contact"
                  className="hover:text-white transition"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}