import Link from "next/link"
import Image from "next/image"
import { properties, formatPriceCAD } from "@/data/properties"

export default function PropertiesPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-32 pb-32">
      {/* Header */}
      <div className="mb-16 max-w-2xl">
        <div className="mb-4 h-1 w-14 rounded-full bg-red-600" />
        <h1 className="font-display text-4xl text-neutral-900">
          Properties
        </h1>
        <p className="mt-4 text-neutral-600 leading-relaxed">
          Explore a curated selection of residences, each chosen for its
          location, design, and long-term value.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-10 md:grid-cols-2">
        {properties.map((p) => (
          <Link
            key={p.id}
            href={`/properties/${p.id}`}
            className="group overflow-hidden rounded-3xl border border-neutral-200
              transition hover:-translate-y-1 hover:bf-neutral-900 hover:shadow-xl"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <Image
                src={p.images[0]}
                alt={p.title}
                width={1200}
                height={800}
                className="h-64 w-full object-cover transition-transform duration-500
                  group-hover:scale-105"
              />

              {/* subtle overlay */}
              <div className="pointer-events-none absolute inset-0
                bg-gradient-to-t from-black/20 to-transparent opacity-0
                transition group-hover:opacity-100" />
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-xs tracking-widest text-red-600">
                {p.status.toUpperCase()}
              </p>

              <h2 className="mt-3 font-display text-xl text-neutral-900">
                {p.title}
              </h2>

              <p className="mt-3 text-lg text-neutral-900">
                {formatPriceCAD(p.price)}
              </p>

              <p className="mt-1 text-sm text-neutral-500">
                {p.address}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}