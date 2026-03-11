import { prisma } from "@/lib/prisma"
import FeaturedListingsCarousel from "./FeaturedListingsCarousel"

export default async function FeaturedListings() {

  const listings = await prisma.property.findMany({
    where: {
      status: "FOR_SALE"
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 6
  })

  return <FeaturedListingsCarousel listings={listings} />
}