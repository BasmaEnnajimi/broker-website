import Image from "next/image"
import Link from "next/link"
import { BedDouble, Bath, Ruler } from "lucide-react"

type Listing = {
  id: string
  title: string
  price: string
  address: string
  beds: number
  baths: number
  sqft: number
  image: string
}

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/properties/${listing.id}`}
      className="group block overflow-hidden rounded-3xl
        border border-neutral-800 bg-neutral-900
        transition hover:-translate-y-1 hover:border-neutral-700 hover:shadow-2xl"
    >
      {/* IMAGE */}
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          className="object-cover transition-transform duration-500
            group-hover:scale-105"
        />

        {/* subtle dark overlay */}
        <div className="pointer-events-none absolute inset-0
          bg-gradient-to-t from-black/40 to-transparent
          opacity-0 transition group-hover:opacity-100" />
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <p className="mb-1 font-display text-xl text-white">
          {listing.price}
        </p>

        <p className="mb-4 text-sm text-neutral-400">
          {listing.address}
        </p>

        <div className="flex gap-6 text-xs text-neutral-400">
          <span className="flex items-center gap-1">
            <BedDouble size={14} />
            {listing.beds}
          </span>

          <span className="flex items-center gap-1">
            <Bath size={14} />
            {listing.baths}
          </span>

          <span className="flex items-center gap-1">
            <Ruler size={14} />
            {listing.sqft} sqft
          </span>
        </div>
      </div>
    </Link>
  )
}