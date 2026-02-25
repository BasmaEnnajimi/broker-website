import { notFound, redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import EditPropertyForm from "./EditPropertyForm"

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const session = await getServerSession(authOptions)

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/")
  }

  const property = await prisma.property.findUnique({
    where: { id },
  })
  console.log("EDIT", property) // Debug log
  if (!property) return notFound()

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24">

        <div className="mb-6 h-1 w-14 rounded-full bg-red-600" />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl text-neutral-900">
              Edit Property
            </h1>
            <p className="mt-4 text-neutral-600">
              Update listing details, images and status.
            </p>
          </div>
        </div>

        <div className="mt-14">
          <EditPropertyForm property={property} />
        </div>

      </div>
    </section>
  )
}