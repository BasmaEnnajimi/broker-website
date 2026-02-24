import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await req.json()

  const property = await prisma.property.findUnique({
    where: { id },
  })

  if (!property) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const updated = await prisma.property.update({
    where: { id },
    data: {
      status: property.status === "FOR_SALE" ? "SOLD" : "FOR_SALE",
    },
  })

  return NextResponse.json(updated)
}