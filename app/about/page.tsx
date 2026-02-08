import Image from "next/image"
import Link from "next/link"
import {
  Instagram,
  Linkedin,
  Facebook,
  TrendingUp,
  ShieldCheck,
  Handshake,
} from "lucide-react"

export default function About() {
  return (
    <section className="bg-white">
      {/* MAIN ABOUT */}
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          
          {/* IMAGE LEFT */}
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-red-600/10 blur-3xl" />
            <Image
              src="/images/broker/broker_l.png"
              alt="Real Estate Broker"
              width={520}
              height={700}
              priority
              className="relative z-10 rounded-3xl object-cover"
            />
          </div>

          {/* TEXT RIGHT */}
          <div>
            <span className="mb-6 inline-block rounded-full border border-red-600/40 px-4 py-1 text-xs tracking-widest text-red-600">
              ABOUT THE BROKER
            </span>

            <h1 className="mb-6 font-display text-4xl leading-tight text-neutral-900 md:text-5xl">
              A Personalized <br /> Approach to Real Estate
            </h1>

            <p className="mb-6 text-neutral-600">
              With a deep understanding of the Montreal luxury real estate
              market, Emad Faddoul is dedicated to helping clients make
              confident and informed decisions.
            </p>

            <p className="mb-8 text-neutral-600">
              His approach is built on transparency, strategy, and trust.
              Whether buying, selling, or investing, every step is handled
              with precision and care.
            </p>

            {/* ACTIONS */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="rounded-lg bg-red-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Contact Me
              </Link>

              <a
                href="tel:15145551234"
                className="rounded-lg border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-900 transition hover:border-neutral-400"
              >
                Call Now
              </a>
            </div>

            {/* SOCIAL ICONS */}
            <div className="mt-10 flex items-center gap-6">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-neutral-300 p-3 text-neutral-700 transition hover:border-neutral-400 hover:text-neutral-900"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-neutral-300 p-3 text-neutral-700 transition hover:border-neutral-400 hover:text-neutral-900"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-neutral-300 p-3 text-neutral-700 transition hover:border-neutral-400 hover:text-neutral-900"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* VALUES SECTION */}
      <div className="bg-neutral-50 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-14 font-display text-3xl text-neutral-900">
            Why Clients Choose Him
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            
            <div className="group rounded-2xl border border-neutral-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 inline-flex rounded-xl bg-red-600/10 p-3 text-red-600">
                <TrendingUp size={22} />
              </div>
              <h3 className="mb-2 text-lg font-medium text-neutral-900">
                Market Intelligence
              </h3>
              <p className="text-neutral-600">
                Deep insight into pricing, trends, and micro-markets to
                position every client ahead of the competition.
              </p>
            </div>

            <div className="group rounded-2xl border border-neutral-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 inline-flex rounded-xl bg-red-600/10 p-3 text-red-600">
                <ShieldCheck size={22} />
              </div>
              <h3 className="mb-2 text-lg font-medium text-neutral-900">
                Client-First Approach
              </h3>
              <p className="text-neutral-600">
                Every recommendation is guided by long-term value,
                transparency, and trust.
              </p>
            </div>

            <div className="group rounded-2xl border border-neutral-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 inline-flex rounded-xl bg-red-600/10 p-3 text-red-600">
                <Handshake size={22} />
              </div>
              <h3 className="mb-2 text-lg font-medium text-neutral-900">
                Strategic Negotiation
              </h3>
              <p className="text-neutral-600">
                Calm, calculated negotiation strategies designed to
                maximize value whether buying or selling.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="border-t border-neutral-200 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="mb-12 font-display text-2xl text-neutral-900">
            Proven Track Record
          </h3>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            
            <div className="rounded-2xl border border-neutral-200 p-6">
              <p className="mb-2 font-display text-4xl text-neutral-900">10+</p>
              <div className="h-1 w-8 rounded bg-red-600" />
              <p className="mt-3 text-sm text-neutral-500">
                Years Experience
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 p-6">
              <p className="mb-2 font-display text-4xl text-neutral-900">500+</p>
              <div className="h-1 w-8 rounded bg-red-600" />
              <p className="mt-3 text-sm text-neutral-500">
                Properties Sold
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 p-6">
              <p className="mb-2 font-display text-4xl text-neutral-900">$1B+</p>
              <div className="h-1 w-8 rounded bg-red-600" />
              <p className="mt-3 text-sm text-neutral-500">
                Total Sales Volume
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 p-6">
              <p className="mb-2 font-display text-4xl text-neutral-900">5★</p>
              <div className="h-1 w-8 rounded bg-red-600" />
              <p className="mt-3 text-sm text-neutral-500">
                Client Satisfaction
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}