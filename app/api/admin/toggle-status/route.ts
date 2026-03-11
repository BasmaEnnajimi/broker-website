import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { PropertyStatus } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {

  try {

    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { status } = await req.json()

    if (!status) {
      return NextResponse.json(
        { error: "Missing status" },
        { status: 400 }
      )
    }

    const updated = await prisma.property.update({
      where: { id: params.id },
      data: {
        status: status as PropertyStatus
      }
    })

    return NextResponse.json(updated)

  } catch (error) {

    console.error("STATUS UPDATE ERROR:", error)

    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    )
  }

}