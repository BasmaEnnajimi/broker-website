"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewPropertyPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    id: "",
    mls: "",
    title: "",
    address: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    yearBuilt: "",
    type: "",
    parking: "",
    status: "FOR_SALE",
    image: "",
    description: "",
  })

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    await fetch("/api/admin/create-property", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    router.push("/admin")
    router.refresh()
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-6 pt-32 pb-24">
        <div className="mb-6 h-1 w-14 rounded-full bg-red-600" />

        <h1 className="font-display text-4xl text-neutral-900">
          Create Property
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >
          {[
            { name: "id", label: "Slug ID" },
            { name: "mls", label: "MLS" },
            { name: "title", label: "Title" },
            { name: "address", label: "Address" },
            { name: "price", label: "Price" },
            { name: "bedrooms", label: "Bedrooms" },
            { name: "bathrooms", label: "Bathrooms" },
            { name: "sqft", label: "Square Feet" },
            { name: "image", label: "Main Image URL" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm text-neutral-600 mb-2">
                {field.label}
              </label>
              <input
                name={field.name}
                value={(form as any)[field.name]}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 focus:border-red-600 focus:outline-none"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm text-neutral-600 mb-2">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 focus:border-red-600 focus:outline-none"
            >
              <option value="FOR_SALE">For Sale</option>
              <option value="SOLD">Sold</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-neutral-600 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 focus:border-red-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-600"
          >
            Create Property
          </button>
        </form>
      </div>
    </section>
  )
}