"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"

export default function StatusToggle({
  id,
  status,
}: {
  id: string
  status: string
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const toggle = () => {
    startTransition(async () => {
      await fetch("/api/admin/toggle-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      router.refresh()
    })
  }

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
        status === "FOR_SALE"
          ? "bg-green-100 text-green-700 hover:bg-green-200"
          : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
      } ${isPending ? "opacity-50" : ""}`}
    >
      {status === "FOR_SALE" ? "For Sale" : "Sold"}
    </button>
  )
}