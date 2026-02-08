import Link from "next/link"
import { Instagram, Linkedin, Facebook, CalendarDays } from "lucide-react"

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-32 pt-32">
      {/* Header */}
      <div className="mb-20 max-w-2xl">
        <div className="mb-4 h-1 w-14 rounded-full bg-red-600" />
        <h1 className="font-display text-4xl text-neutral-900">
          Get in Touch
        </h1>
        <p className="mt-4 text-neutral-600 leading-relaxed">
          Whether you’re looking to buy, sell, or simply have questions,
          I’m here to help. Choose the option that works best for you.
        </p>
      </div>

      {/* Main grid */}
      <div className="grid gap-16 lg:grid-cols-3">
        {/* Booking section */}
        <div className="relative lg:col-span-2 rounded-3xl bg-neutral-900 p-10 text-white overflow-hidden">
          {/* subtle red glow */}
          <div className="pointer-events-none absolute -top-24 -right-26 h-64 w-64 rounded-full bg-red-600/20 blur-3xl" />

          <div className="flex items-center gap-3">
            <CalendarDays className="text-red-500" size={22} />
            <h2 className="font-display text-2xl">
              Book a Private Consultation
            </h2>
          </div>

          <p className="mt-4 max-w-xl text-neutral-300">
            Schedule a one-on-one meeting to discuss your real estate goals.
            Virtual and in-person appointments available.
          </p>

          <div className="mt-8 rounded-2xl border border-neutral-700 bg-neutral-800 p-6 text-center text-neutral-400 transition">
            Calendar booking integration goes here  
            (Calendly embed)
          </div>

          <p className="mt-4 text-sm text-neutral-400">
            Prefer email instead? Use the contact form below.
          </p>
        </div>

        {/* Direct contact + social */}
        <div className="rounded-3xl border border-neutral-200 p-8 transition">
          <h3 className="font-display text-xl text-neutral-900">
            Direct Contact
          </h3>

          <div className="mt-6 space-y-4 text-sm text-neutral-600">
            <p>
              <span className="block text-neutral-500">Phone</span>
              <a
                href="tel:+15145555555"
                className="hover:text-red-600 transition"
              >
                +1 (514) 555-5555
              </a>
            </p>

            <p>
              <span className="block text-neutral-500">Email</span>
              <a
                href="mailto:emad@example.com"
                className="hover:text-red-600 transition"
              >
                emad@example.com
              </a>
            </p>

            <p>
              <span className="block text-neutral-500">Office</span>
              Montréal, QC
            </p>
          </div>

          {/* Social media */}
          <div className="mt-10">
            <p className="mb-4 text-sm text-neutral-500">
              Follow me
            </p>

            <div className="flex gap-4">
              {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="rounded-full border border-neutral-300 p-3
                    text-neutral-600 transition
                    hover:border-red-600 hover:text-red-600
                    hover:-translate-y-0.5"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact form */}
      <div className="mt-24 max-w-3xl">
        <h2 className="mb-8 font-display text-2xl text-neutral-900">
          Send a Message
        </h2>

        <form className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <input
              type="text"
              placeholder="Full name"
              className="w-full rounded-xl border border-neutral-300 px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-red-600"
            />

            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-xl border border-neutral-300 px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <textarea
            placeholder="How can I help you?"
            rows={5}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3
              focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <button
            type="submit"
            className="rounded-xl bg-neutral-900 px-6 py-3 text-white
              transition hover:bg-red-600"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  )
}