import { prisma } from "./prisma"
import { PropertyStatus } from "@prisma/client"

export async function getAllProperties(
  status?: "FOR_SALE" | "SOLD"
) {
  return prisma.property.findMany({
    where: status
      ? { status: status as PropertyStatus }
      : undefined,
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
  
    if (property.status === "SOLD") {
      return {
        ...property,
        address: null,
      }
    }
  
    return property
  }


