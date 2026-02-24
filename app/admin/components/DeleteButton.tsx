"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    const confirmed = confirm(
      "Are you sure you want to delete this property? This action cannot be undone."
    )

    if (!confirmed) return

    startTransition(async () => {
      await fetch("/api/admin/delete-property", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      router.refresh()
    })
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-600 transition hover:text-red-800 disabled:opacity-50"
    >
      Delete
    </button>
  )
}