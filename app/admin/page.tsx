import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import StatusToggle from "@/app/admin/components/StatusToggle"
import DeleteButton from "@/app/admin/components/DeleteButton"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/")
  }

  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24">
        <div className="mb-6 h-1 w-14 rounded-full bg-red-600" />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl text-neutral-900">
              Property Management
            </h1>
            <p className="mt-4 text-neutral-600">
              Manage listings, update status, and maintain visibility.
            </p>
          </div>

          <Link
            href="/admin/new"
            className="rounded-xl bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-600"
          >
            + Add Property
          </Link>
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl border border-neutral-200">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 text-sm text-neutral-600">
              <tr>
                <th className="px-6 py-4">Property</th>
                <th className="px-6 py-4">MLS</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {properties.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-neutral-200 text-sm"
                >
                  {/* PROPERTY COLUMN WITH IMAGE */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-20 overflow-hidden rounded-lg">
                      {p.images.length > 0 ? (
                        <Image
                            src={p.images[0]}
                            alt={p.title}
                            fill
                            className="object-cover"
                        />
                        ) : (
                        <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-xs text-neutral-400">
                            No Image
                        </div>
                        )}
                      </div>

                      <span className="font-medium text-neutral-900">
                        {p.title}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-neutral-600">
                    {p.mls}
                  </td>

                  <td className="px-6 py-4 text-neutral-600">
                    ${p.price.toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <StatusToggle id={p.id} status={p.status} />
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-6">
                      <Link
                        href={`/admin/edit/${p.id}`}
                        className="text-neutral-600 transition hover:text-red-600"
                      >
                        Edit
                      </Link>

                      <DeleteButton id={p.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {properties.length === 0 && (
            <div className="p-12 text-center text-neutral-500">
              No properties found.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}