import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {

    const adminPassword = await bcrypt.hash("admin123", 10)

    await prisma.user.createMany({
      data: [
        {
          email: "you@email.com",
          name: "Basma",
          password: adminPassword,
          role: "ADMIN",
        },
        {
          email: "broker@email.com",
          name: "Emad Faddoul",
          password: adminPassword,
          role: "ADMIN",
        },
      ],
      skipDuplicates: true,
    })


  // CLEAN START (optional but recommended)
  await prisma.property.deleteMany()

  // FOR SALE PROPERTY
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
        "Sun-filled living areas",
      ],

      images: [
        "/images/listings/house_ph.png",
      ],

      characteristics: {
        create: [
          { value: "Hardwood floors" },
          { value: "Fireplace" },
        ],
      },

      details: {
        create: [
          {
            label: "Year Built",
            value: "1938",
            category: "BUILDING_INFO",
          },
          {
            label: "Bedrooms",
            value: "5",
            category: "ROOM",
          },
        ],
      },
    },
  })

  // SOLD PROPERTY
  await prisma.property.create({
    data: {
      id: "old-port-penthouse",
      mls: "QC-200045",
      title: "Old Port Penthouse",
      address: "55 Rue de la Commune O, Montréal, QC",
      price: 2149000,
      status: "SOLD",
      type: "Luxury Condo",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1960,
      yearBuilt: 2012,
      parking: "1 indoor",
      description: "A modern penthouse located in the heart of Old Montreal.",

      highlights: [
        "Private terrace",
        "Panoramic city views",
      ],

      images: [
        "/images/listings/house_ph.png",
      ],

      characteristics: {
        create: [
          { value: "Elevator" },
          { value: "Concierge" },
        ],
      },

      details: {
        create: [
          {
            label: "Year Built",
            value: "2012",
            category: "BUILDING_INFO",
          },
          {
            label: "Bathrooms",
            value: "2",
            category: "ROOM",
          },
        ],
      },
    },
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())