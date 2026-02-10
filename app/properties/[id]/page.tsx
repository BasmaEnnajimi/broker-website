import { notFound } from "next/navigation"
import { getPropertyById } from "@/lib/properties"
import { formatPriceCAD } from "@/lib/format"
import PropertyGallery from "@/components/property/PropertyGallery"
import PropertyFAQ from "@/components/property/PropertyFAQ"

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const property = await getPropertyById(id)
  if (!property) return notFound()

  const isForSale = property.status === "FOR_SALE"

  // ✅ destructure ONLY after logic decision
  const address = isForSale ? property.address : null

  const mapSrc = address
    ? `https://www.google.com/maps?q=${encodeURIComponent(
        address
      )}&output=embed`
    : null

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 pt-32">
      {/* Gallery */}
      <div className="mb-16">
        <PropertyGallery images={property.images} />
      </div>

      {/* Header */}
      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="font-display text-4xl text-neutral-900">
            {property.title}
          </h1>

          <p className="mt-3 text-neutral-500">
            {address ?? "Address available upon request"}
          </p>
          
        {isForSale && (
          <p className="mt-2 text-sm text-neutral-400">
            MLS® {property.mls}
          </p>
        )}
          <p className="mt-6 max-w-2xl text-neutral-600 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Price Card */}
        <div className="rounded-3xl bg-neutral-900 p-8 text-white">
          <p className="text-sm text-neutral-400">
            {isForSale ? "Asking Price" : "Last Listed Price"}
          </p>

          <p className="mt-2 font-display text-3xl">
            {formatPriceCAD(property.price)}
          </p>

          <div className="mt-6 space-y-2 text-sm text-neutral-300">
            <p>{property.bedrooms} Bedrooms</p>
            <p>{property.bathrooms} Bathrooms</p>
            <p>{property.sqft.toLocaleString()} sq ft</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-20 h-px bg-neutral-200" />

      {/* Details + Map */}
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <h2 className="mb-8 font-display text-2xl text-neutral-900">
            Property Details
          </h2>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6">
            <PropertyFAQ
              details={property.details}
              characteristics={property.characteristics}
            />
          </div>
        </div>

        {mapSrc && (
          <div>
            <h2 className="mb-8 font-display text-2xl text-neutral-900">
              Location
            </h2>

            <div className="overflow-hidden rounded-3xl border border-neutral-200">
              <iframe
                src={mapSrc}
                className="h-[420px] w-full"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}