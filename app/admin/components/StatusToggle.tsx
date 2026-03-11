"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"

export default function StatusToggle({
  id,
  status,
}: {
  id: string
  status: "DRAFT" | "FOR_SALE" | "PURCHASED" | "SOLD"
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const changeStatus = (newStatus: string) => {
    startTransition(async () => {
      await fetch("/api/admin/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      })

      router.refresh()
    })
  }

  return (
    <select
      value={status}
      disabled={isPending}
      onChange={(e) => changeStatus(e.target.value)}
      className="rounded-full border px-3 py-1 text-xs font-medium"
    >
      <option value="DRAFT">Draft</option>
      <option value="FOR_SALE">For Sale</option>
      <option value="PURCHASED">Purchased</option>
      <option value="SOLD">Sold</option>
    </select>
  )
}