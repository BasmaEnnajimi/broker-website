"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

type Detail = {
  id: string
  label: string
  value: string
  category: "BUILDING_INFO" | "EXPENSE" | "ROOM"
}

type Characteristic = {
  id: string
  value: string
}

export default function PropertyFAQ({
  details,
  characteristics,
}: {
  details: Detail[]
  characteristics: Characteristic[]
}) {
  const sections = [
    { key: "BUILDING_INFO", title: "Building Information" },
    { key: "EXPENSE", title: "Expenses" },
    { key: "ROOM", title: "Room Details" },
    { key: "CHARACTERISTICS", title: "Characteristics" },
  ] as const

  const [open, setOpen] = useState<
    "BUILDING_INFO" | "EXPENSE" | "ROOM" | "CHARACTERISTICS" | ""
  >("BUILDING_INFO")

  return (
    <div className="space-y-4">
      {sections.map((s) => {
        /* -------- CHARACTERISTICS (separate path) -------- */
        if (s.key === "CHARACTERISTICS") {
          if (characteristics.length === 0) return null

          return (
            <div
              key={s.key}
              className="rounded-2xl border border-neutral-200 bg-white"
            >
              <button
                onClick={() => setOpen(open === s.key ? "" : s.key)}
                className="flex w-full items-center justify-between px-6 py-5"
              >
                <p className="font-medium text-neutral-900">
                  {s.title}
                </p>
                <ChevronDown
                  className={`transition ${
                    open === s.key ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === s.key && (
                <div className="px-6 pb-6">
                  <ul className="space-y-2">
                    {characteristics.map((c) => (
                      <li
                        key={c.id}
                        className="text-sm text-neutral-600"
                      >
                        • {c.value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        }

        /* -------- DETAILS (BUILDING / EXPENSE / ROOM) -------- */
        const rows = details.filter(
          (d) => d.category === s.key
        )

        if (rows.length === 0) return null

        return (
          <div
            key={s.key}
            className="rounded-2xl border border-neutral-200 bg-white"
          >
            <button
              onClick={() => setOpen(open === s.key ? "" : s.key)}
              className="flex w-full items-center justify-between px-6 py-5"
            >
              <p className="font-medium text-neutral-900">
                {s.title}
              </p>
              <ChevronDown
                className={`transition ${
                  open === s.key ? "rotate-180" : ""
                }`}
              />
            </button>

            {open === s.key && (
              <div className="px-6 pb-6">
                {rows.map((row) => (
                  <div
                    key={row.id}
                    className="flex justify-between border-b py-2 text-sm"
                  >
                    <span className="text-neutral-500">
                      {row.label}
                    </span>
                    <span className="text-neutral-900">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}