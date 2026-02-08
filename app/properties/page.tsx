import Link from "next/link"
import Image from "next/image"
import { properties, formatPriceCAD } from "@/data/properties"

export default function PropertiesPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="mb-10 font-display text-4xl text-neutral-900">
        Properties
      </h1>

      <div className="grid gap-8 md:grid-cols-2">
        {properties.map((p) => (
          <Link
            key={p.id}
            href={`/properties/${p.id}`}
            className="overflow-hidden rounded-3xl border border-neutral-200 transition hover:shadow-lg"
          >
            <Image
              src={p.images[0]}
              alt={p.title}
              width={1200}
              height={800}
              className="h-64 w-full object-cover"
            />

            <div className="p-6">
              <p className="text-sm text-neutral-500">
                {p.status}
              </p>
              <h2 className="mt-2 text-xl text-neutral-900">
                {p.title}
              </h2>
              <p className="mt-2 text-neutral-600">
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