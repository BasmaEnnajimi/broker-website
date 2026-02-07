"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [atTop, setAtTop] = useState(true)

  const lastYRef = useRef(0)
  const tickingRef = useRef(false)

  useEffect(() => {
    lastYRef.current = window.scrollY

    const onScroll = () => {
      if (tickingRef.current) return
      tickingRef.current = true

      window.requestAnimationFrame(() => {
        const y = window.scrollY
        const lastY = lastYRef.current

        const topNow = y <= 4
        setAtTop(topNow)

        if (open) {
          setHidden(false)
        } else if (topNow) {
          setHidden(false)
        } else {
          const threshold = 6
          if (y > lastY + threshold) setHidden(true)
          if (y < lastY - threshold) setHidden(false)
        }

        lastYRef.current = y
        tickingRef.current = false
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [open])

  const navLinkClass =
    "relative text-neutral-300 hover:text-white " +
    "after:absolute after:left-0 after:-bottom-1 " +
    "after:h-[3px] after:w-0 after:bg-red-600 " +
    "after:transition-all after:duration-500 " +
    "hover:after:w-full"

  const buttonBase = "transition duration-500"

  const headerClass =
    "fixed top-0 z-50 w-full transform-gpu transition-transform duration-300 " +
    (hidden ? "-translate-y-full" : "translate-y-0")

  return (
    <header className={headerClass}>
      {/* BACKGROUND WRAPPER */}
      <div
        className={
          "group transition-colors duration-300 " +
          (atTop
            ? "bg-transparent border-b border-transparent hover:bg-black hover:border-neutral-800"
            : "bg-black border-b border-neutral-800")
        }
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image
                src="/images/hero/kw.png"
                alt="KW Prestige"
                width={250}
                height={40}
                priority
                className="h-12 w-auto object-contain"
            />
          </Link>

          {/* DESKTOP LINKS */}
          <ul className="hidden md:flex items-center gap-8 text-sm">
            <li><Link href="/" className={navLinkClass}>Home</Link></li>
            <li><Link href="/properties" className={navLinkClass}>Properties</Link></li>
            <li><Link href="/about" className={navLinkClass}>About</Link></li>
            <li><Link href="/services" className={navLinkClass}>Services</Link></li>
            <li><Link href="/contact" className={navLinkClass}>Contact</Link></li>
          </ul>

          {/* DESKTOP CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className={`rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 ${buttonBase}`}
            >
              Contact Me
            </Link>

            <a
              href="tel:15145551234"
              className={`rounded-xl border border-neutral-700 bg-black px-4 py-2 text-sm text-white hover:bg-neutral-900 hover:border-neutral-600 ${buttonBase}`}
            >
              Call Now
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden text-white ${buttonBase} hover:text-neutral-300`}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            ☰
          </button>
        </nav>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden border-t border-neutral-800 bg-black">
            <ul className="flex flex-col px-6 py-4 space-y-4 text-sm">
              <li><Link href="/" className={navLinkClass} onClick={() => setOpen(false)}>Home</Link></li>
              <li><Link href="/properties" className={navLinkClass} onClick={() => setOpen(false)}>Properties</Link></li>
              <li><Link href="/about" className={navLinkClass} onClick={() => setOpen(false)}>About</Link></li>
              <li><Link href="/services" className={navLinkClass} onClick={() => setOpen(false)}>Services</Link></li>
              <li><Link href="/contact" className={navLinkClass} onClick={() => setOpen(false)}>Contact</Link></li>

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className={`mt-2 inline-block rounded-lg bg-red-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-700 ${buttonBase}`}
              >
                Contact Me
              </Link>

              <a
                href="tel:15145551234"
                onClick={() => setOpen(false)}
                className={`inline-block rounded-xl border border-neutral-700 bg-black px-4 py-2 text-center text-sm text-white hover:bg-neutral-900 hover:border-neutral-600 ${buttonBase}`}
              >
                Call Now
              </a>
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}