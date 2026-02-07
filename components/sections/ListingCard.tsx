import Image from "next/image"
import Link from "next/link"

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
      className="group block overflow-hidden rounded-xl border border-neutral-800 bg-black/70 backdrop-blur transition hover:border-neutral-700"
    >
      <div className="relative h-72 w-full">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <p className="mb-1 text-lg font-semibold text-white">
          {listing.price}
        </p>

        <p className="mb-3 text-sm text-neutral-400">
          {listing.address}
        </p>

        <div className="flex gap-4 text-xs text-neutral-400">
          <span>🛏 {listing.beds}</span>
          <span>🛁 {listing.baths}</span>
          <span>📐 {listing.sqft} sqft</span>
        </div>
      </div>
    </Link>
  )
}