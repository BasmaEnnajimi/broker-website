import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const { id, status } = body

  const property = await prisma.property.update({
    where: { id },
    data: { status },
  })

  return NextResponse.json(property)
}