import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {

    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()

    const {
      id,
      mls,
      title,
      address,
      price,
      bedrooms,
      bathrooms,
      sqft,
      yearBuilt,
      type,
      parking,
      description,
      status,
      images,
      details,
      characteristics,
    } = body

    if (!id || !title || !address) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const property = await prisma.property.create({
      data: {
        id,
        mls,
        title,
        address,

        price: Number(price) || 0,
        bedrooms: Number(bedrooms) || 0,
        bathrooms: Number(bathrooms) || 0,
        sqft: Number(sqft) || 0,
        yearBuilt: Number(yearBuilt) || 0,

        type,
        parking,
        description,
        status,

        images: images ?? [],

        details: {
          create:
            (details ?? []).map((d: any) => ({
              label: d.label,
              value: d.value,
              category: d.category,
            })),
        },

        characteristics: {
          create:
            (characteristics ?? []).map((c: any) => ({
              value: c.value,
            })),
        },
      },
    })

    return NextResponse.json(property)

  } catch (error) {

    console.error("CREATE PROPERTY ERROR:", error)

    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 }
    )
  }
}