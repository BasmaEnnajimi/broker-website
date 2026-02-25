import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  try {
    const property = await prisma.property.create({
      data: {
        id: body.id,
        mls: body.mls,
        title: body.title,
        address: body.address,
        price: Number(body.price),
        status: body.status,
        type: body.type,
        bedrooms: Number(body.bedrooms),
        bathrooms: Number(body.bathrooms),
        sqft: Number(body.sqft),
        yearBuilt: Number(body.yearBuilt),
        parking: body.parking,
        description: body.description,
        highlights: [],
        images: body.images,
      },
    })

    return NextResponse.json(property)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 })
  }
}