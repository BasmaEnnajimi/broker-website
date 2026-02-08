"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function PropertyFAQ({ details }: any) {
  const sections = [
    { key: "buildingInfo", title: "Building Information" },
    { key: "expenses", title: "Expenses" },
    { key: "rooms", title: "Room Details" },
    { key: "characteristics", title: "Characteristics" },
  ]

  const [open, setOpen] = useState("buildingInfo")

  return (
    <div className="space-y-4">
      {sections.map((s) => (
        <div
          key={s.key}
          className="rounded-2xl border border-neutral-200 bg-white"
        >
          <button
            onClick={() =>
              setOpen(open === s.key ? "" : s.key)
            }
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
              {s.key === "characteristics" ? (
                <ul className="space-y-2">
                  {details[s.key].map((c: string) => (
                    <li
                      key={c}
                      className="text-sm text-neutral-600"
                    >
                      • {c}
                    </li>
                  ))}
                </ul>
              ) : (
                details[s.key].map((row: any) => (
                  <div
                    key={row.label}
                    className="flex justify-between border-b py-2 text-sm"
                  >
                    <span className="text-neutral-500">
                      {row.label}
                    </span>
                    <span className="text-neutral-900">
                      {row.value}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}