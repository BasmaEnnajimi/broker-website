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
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-28">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* IMAGE LEFT */}
          <div className="relative">
            <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-red-600/20 blur-3xl" />
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
            <div className="mb-4 h-1 w-14 rounded-full bg-red-600" />

            <h1 className="mb-6 font-display text-4xl leading-tight text-neutral-900 md:text-5xl">
              A Personalized <br /> Approach to Real Estate
            </h1>

            <p className="mb-6 text-neutral-600 leading-relaxed">
              With a deep understanding of the Montreal luxury real estate
              market, Emad Faddoul is dedicated to helping clients make
              confident and informed decisions.
            </p>

            <p className="mb-10 text-neutral-600 leading-relaxed">
              His approach is built on transparency, strategy, and trust.
              Whether buying, selling, or investing, every step is handled
              with precision and care.
            </p>

            {/* ACTIONS */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="rounded-xl bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-600"
              >
                Contact Me
              </Link>

              <a
                href="tel:15145551234"
                className="rounded-xl border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-900 transition hover:border-red-600 hover:text-red-600"
              >
                Call Now
              </a>
            </div>

            {/* SOCIAL ICONS */}
            <div className="mt-10 flex items-center gap-4">
              {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-neutral-300 p-3 text-neutral-600 transition
                    hover:border-red-600 hover:text-red-600 hover:-translate-y-0.5"
                >
                  <Icon size={18} />
                </a>
              ))}
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
            {[
              {
                icon: TrendingUp,
                title: "Market Intelligence",
                text:
                  "Deep insight into pricing, trends, and micro-markets to position every client ahead of the competition.",
              },
              {
                icon: ShieldCheck,
                title: "Client-First Approach",
                text:
                  "Every recommendation is guided by long-term value, transparency, and trust.",
              },
              {
                icon: Handshake,
                title: "Strategic Negotiation",
                text:
                  "Calm, calculated negotiation strategies designed to maximize value whether buying or selling.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group rounded-3xl border border-neutral-200 bg-white p-8 transition
                  hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 inline-flex rounded-xl bg-red-600/10 p-3 text-red-600">
                  <item.icon size={22} />
                </div>
                <h3 className="mb-2 text-lg font-medium text-neutral-900">
                  {item.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="border-t border-neutral-200 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="mb-12 font-display text-2xl text-neutral-900">
            Proven Track Record
          </h3>
          

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "10+", label: "Years Experience" },
              { value: "500+", label: "Properties Sold" },
              { value: "$1B+", label: "Total Sales Volume" },
              { value: "5★", label: "Client Satisfaction" },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-3xl border border-neutral-200 p-6 transition
                hover:-translate-y-1"
              >
                <p className="mb-2 font-display text-4xl text-neutral-900">
                  {stat.value}
                </p>
                <div className="h-1 w-8 rounded bg-red-600" />
                <p className="mt-3 text-sm text-neutral-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}