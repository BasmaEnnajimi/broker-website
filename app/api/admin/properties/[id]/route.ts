import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {

    const { id } = await context.params

    const body = await req.json()

    const {
      title,
      mls,
      address,
      price,
      status,
      type,
      bedrooms,
      bathrooms,
      sqft,
      yearBuilt,
      parking,
      description,
      images,
      details,
      characteristics,
    } = body

    const property = await prisma.property.update({
      where: { id },

      data: {
        title,
        mls,
        address,

        price: Number(price),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        sqft: Number(sqft),
        yearBuilt: Number(yearBuilt),

        status,
        type,
        parking,
        description,
        images,

        details: {
          deleteMany: {},
          create: (details ?? []).map((d: any) => ({
            label: d.label,
            value: d.value,
            category: d.category,
          })),
        },

        characteristics: {
          deleteMany: {},
          create: (characteristics ?? []).map((c: any) => ({
            value: c.value,
          })),
        },
      },
    })

    return NextResponse.json(property)

  } catch (error) {

    console.error("UPDATE PROPERTY ERROR:", error)

    return NextResponse.json(
      { error: "Failed to update property" },
      { status: 500 }
    )
  }
}