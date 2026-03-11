"use client"

import { useState } from "react"

type Status =
  | "DRAFT"
  | "FOR_SALE"
  | "PURCHASED"
  | "SOLD"

export default function StatusToggle({
  id,
  status,
}: {
  id: string
  status: Status
}) {

  const [value, setValue] = useState<Status>(status)
  const [loading, setLoading] = useState(false)

  const updateStatus = async (newStatus: Status) => {

    if (loading) return

    const previousStatus = value

    // optimistic UI update
    setValue(newStatus)
    setLoading(true)

    const res = await fetch(`/api/admin/properties/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error("Status update failed:", err)

      // rollback if server fails
      setValue(previousStatus)
      setLoading(false)
      return
    }

    setLoading(false)
  }

  const badgeStyle =
    value === "FOR_SALE"
      ? "bg-green-100 text-green-700"
      : value === "PURCHASED"
      ? "bg-blue-100 text-blue-700"
      : value === "SOLD"
      ? "bg-neutral-900 text-white"
      : "bg-yellow-100 text-yellow-700"

  return (
    <div className="flex items-center gap-3">

      <span
        className={`px-3 py-1 text-xs rounded-full font-medium ${badgeStyle}`}
      >
        {value.replace("_", " ")}
      </span>

      <select
        value={value}
        disabled={loading}
        onChange={(e) =>
          updateStatus(e.target.value as Status)
        }
        className="rounded-lg border border-neutral-300 px-3 py-1 text-xs"
      >
        <option value="DRAFT">Draft</option>
        <option value="FOR_SALE">For Sale</option>
        <option value="PURCHASED">Purchased</option>
        <option value="SOLD">Sold</option>
      </select>

    </div>
  )
}