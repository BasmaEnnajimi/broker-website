import { prisma } from "./prisma"
import { PropertyStatus } from "@prisma/client"

export async function getAllProperties(
  status?: "FOR_SALE" | "PURCHASED" | "SOLD"
) {
  return prisma.property.findMany({
    where: status
      ? { status: status as PropertyStatus }
      : {
          status: {
            not: "DRAFT", // hide drafts from public site
          },
        },
    orderBy: { createdAt: "desc" },
  })
}

export async function getPropertyById(id: string) {
  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      details: true,
      characteristics: true,
    },
  })

  if (!property) return null

  // hide address for sold properties
  if (property.status === "SOLD") {
    return {
      ...property,
      address: null,
    }
  }

  return property
}