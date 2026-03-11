import Link from "next/link"
import Image from "next/image"
import { getAllProperties } from "@/lib/properties"
import { formatPriceCAD } from "@/lib/format"

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status: rawStatus } = await searchParams

  const status =
    rawStatus === "FOR_SALE" ||
    rawStatus === "PURCHASED" ||
    rawStatus === "SOLD"
      ? rawStatus
      : undefined

  const properties = await getAllProperties(status)

  const title =
    status === "FOR_SALE"
      ? "Properties for Sale"
      : status === "PURCHASED"
      ? "Purchased Properties"
      : status === "SOLD"
      ? "Sold Properties"
      : "All Properties"

  return (
    <section className="bg-white">

      {/* HEADER */}
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24">

        <div className="mb-4 h-1 w-14 rounded-full bg-red-600" />

        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">

          {/* TEXT BLOCK */}
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl text-neutral-900">
              {title}
            </h1>

            <p className="mt-4 text-neutral-600 leading-relaxed">
              A curated selection of luxury residences, presented with discretion
              and attention to detail.
            </p>
          </div>

          {/* STATUS FILTER */}
          <div className="flex rounded-full border border-neutral-300 p-1 text-sm">

            <Link
              href="/properties"
              className={`rounded-full px-4 py-1 transition ${
                !status
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              All
            </Link>

            <Link
              href="/properties?status=FOR_SALE"
              className={`rounded-full px-4 py-1 transition ${
                status === "FOR_SALE"
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              For Sale
            </Link>

            <Link
              href="/properties?status=PURCHASED"
              className={`rounded-full px-4 py-1 transition ${
                status === "PURCHASED"
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Purchased
            </Link>

            <Link
              href="/properties?status=SOLD"
              className={`rounded-full px-4 py-1 transition ${
                status === "SOLD"
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Sold
            </Link>

          </div>

        </div>

      </div>

      {/* GRID */}
      <div className="mx-auto max-w-7xl px-6 pb-32">

        <div className="grid gap-10 md:grid-cols-2">

          {properties.map((p) => (

            <Link
              key={p.id}
              href={`/properties/${p.id}`}
              className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white transition
              hover:-translate-y-1 hover:shadow-xl"
            >

              {/* IMAGE */}
              <div className="relative h-72 overflow-hidden">

                {p.images.length > 0 && (
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}

              </div>

              {/* CONTENT */}
              <div className="p-8">

                <p className="text-sm text-neutral-500">
                  {p.status === "FOR_SALE" && "For Sale"}
                  {p.status === "PURCHASED" && "Purchased"}
                  {p.status === "SOLD" && "Sold"}
                </p>

                <h2 className="mt-2 text-xl font-medium text-neutral-900">
                  {p.title}
                </h2>

                <p className="mt-3 font-medium text-neutral-900">
                  {formatPriceCAD(p.price)}
                </p>

                {(p.status === "FOR_SALE" || p.status === "PURCHASED") && (
                  <p className="mt-1 text-xs tracking-wide text-neutral-400">
                    MLS® {p.mls}
                  </p>
                )}

                <div className="mt-4 h-1 w-8 rounded bg-red-600" />

                <p className="mt-4 text-sm text-neutral-500">
                  {p.status === "SOLD"
                    ? "Address withheld for privacy"
                    : p.address}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  )
}