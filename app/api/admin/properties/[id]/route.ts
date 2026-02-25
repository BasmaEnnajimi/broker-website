import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await context.params
  const body = await req.json()

  try {
    const updated = await prisma.property.update({
      where: { id },
      data: {
        title: String(body.title ?? ""),
        mls: String(body.mls ?? ""),
        address: String(body.address ?? ""),
        status: body.status === "SOLD" ? "SOLD" : "FOR_SALE",
        type: String(body.type ?? ""),
        parking: String(body.parking ?? ""),
        description: String(body.description ?? ""),

        price: Number(body.price ?? 0),
        bedrooms: Number(body.bedrooms ?? 0),
        bathrooms: Number(body.bathrooms ?? 0),
        sqft: Number(body.sqft ?? 0),
        yearBuilt: Number(body.yearBuilt ?? 0),

        images: Array.isArray(body.images)
          ? body.images.filter((x: any) => typeof x === "string" && x.trim().length > 0)
          : [],
      },
    })

    return NextResponse.json({ ok: true, updated })
  } catch (e: any) {
    return new NextResponse(e?.message ?? "Update failed", { status: 400 })
  }
}