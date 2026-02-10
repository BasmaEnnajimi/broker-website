import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.property.create({
    data: {
      id: "westmount-home",
      mls: "QC-100001",
      title: "Elegant Westmount Residence",
      address: "123 Avenue Greene, Westmount, QC",
      price: 3895000,
      status: "FOR_SALE",
      type: "Detached House",
      bedrooms: 5,
      bathrooms: 4,
      sqft: 4200,
      yearBuilt: 1938,
      parking: "2 car garage",
      description: "A timeless Westmount residence.",

      highlights: [
        "Chef’s kitchen with premium appliances",
        "Sun filled living areas"
      ],

      images: [
        "/images/listings/house_ph.png"
      ],

      characteristics: {
        create: [
          { value: "Hardwood floors" },
          { value: "Fireplace" }
        ]
      },

      details: {
        create: [
          {
            label: "Year Built",
            value: "1938",
            category: "BUILDING_INFO"
          },
          {
            label: "Bedrooms",
            value: "5",
            category: "ROOM"
          }
        ]
      }
    }
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())