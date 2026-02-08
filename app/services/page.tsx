import Image from "next/image"
import Link from "next/link"
import {
  Home,
  Building2,
  TrendingUp,
  ArrowDownUp,
  Landmark,
  Wrench,
} from "lucide-react"

export default function Services() {
  return (
    <section className="bg-white">
      {/* HEADER */}
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24">
        <div className="max-w-2xl">
          <div className="mb-4 h-1 w-14 rounded-full bg-red-600" />
          <h1 className="font-display text-4xl text-neutral-900">
            Services
          </h1>
          <p className="mt-4 text-neutral-600 leading-relaxed">
            Tailored real estate services designed to guide you through
            every step of your real estate journey with clarity and confidence.
          </p>
        </div>
      </div>

      {/* SERVICES GRID */}
      <div className="mx-auto max-w-7xl px-6 pb-28">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Home,
              title: "Buying a Property",
              text:
                "Personalized guidance to help you find and secure the right home, from search to closing.",
            },
            {
              icon: Building2,
              title: "Selling a Property",
              text:
                "Strategic pricing, marketing, and negotiation to maximize your property’s value.",
            },
            {
              icon: TrendingUp,
              title: "Upgrading Your Home",
              text:
                "Support for clients looking to move into a larger or higher-value property with confidence.",
            },
            {
              icon: ArrowDownUp,
              title: "Downsizing",
              text:
                "Thoughtful guidance for transitioning to a more suitable property while preserving value.",
            },
            {
              icon: Landmark,
              title: "Financing Assistance",
              text:
                "Help navigating mortgage options through trusted lenders to secure the best financing.",
            },
            {
              icon: Wrench,
              title: "Renovation Referrals",
              text:
                "Access to reliable renovation and improvement professionals after the sale or purchase.",
            },
          ].map((service, i) => (
            <div
              key={i}
              className="group rounded-3xl border border-neutral-200 bg-white p-8 transition
                hover:-translate-y-1 hover:shadow-xl hover:border-neutral-300"
            >
              <div className="mb-4 inline-flex rounded-xl bg-red-600/10 p-3 text-red-600">
                <service.icon size={22} />
              </div>

              <h3 className="mb-2 text-lg font-medium text-neutral-900">
                {service.title}
              </h3>

              <p className="text-neutral-600 leading-relaxed">
                {service.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FREE ADVISING */}
      <div className="mx-auto max-w-7xl px-6 pb-28">
        <div className="max-w-3xl">
          <p className="text-lg text-neutral-700">
            <span className="font-medium text-neutral-900">
              Free advising.
            </span>{" "}
            Not sure where to start? Get honest, no-obligation guidance to
            explore your options, understand the market, and plan your next
            steps with confidence.
          </p>

          <div className="mt-4 h-1 w-14 rounded-full bg-red-600" />
        </div>
      </div>

      {/* OPTIONAL VISUAL SECTION */}
      <div className="bg-neutral-50 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl text-neutral-900">
                A Strategic, Client-Focused Approach
              </h2>
              <div className="mt-4 h-1 w-14 rounded-full bg-red-600" />
              <p className="mt-6 text-neutral-600 leading-relaxed">
                Every client’s situation is unique. Services are designed
                to adapt to your goals, timeline, and priorities while
                maintaining clarity and transparency throughout the process.
              </p>
            </div>

            {/* IMAGE */}
            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src="/images/services/service1.png"
                alt="Real estate services"
                width={600}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="rounded-3xl bg-neutral-900 p-12 text-center text-white">
          <h3 className="font-display text-2xl">
            Ready to Get Started?
          </h3>
          <p className="mt-4 text-neutral-300">
            Let’s discuss how I can help you achieve your real estate goals.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-block rounded-xl bg-white px-6 py-3
              text-sm font-medium text-neutral-900 transition hover:bg-red-600 hover:text-white"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  )
}