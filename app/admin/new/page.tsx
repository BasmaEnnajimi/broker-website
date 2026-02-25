"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

type PropertyFormState = {
  id: string
  title: string
  mls: string
  address: string
  price: number | string
  status: "FOR_SALE" | "SOLD"
  type: string
  bedrooms: number | string
  bathrooms: number | string
  sqft: number | string
  yearBuilt: number | string
  parking: string
  description: string
  highlights?: string[]
  images?: string[]
}

export default function NewPropertyPage() {
  const router = useRouter()

  const [form, setForm] = useState<PropertyFormState>({
    id: "",
    title: "",
    mls: "",
    address: "",
    price: "",
    status: "FOR_SALE",
    type: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    yearBuilt: "",
    parking: "",
    description: "",
  })

  const [images, setImages] = useState<string[]>([])

  const safeImages = useMemo(
    () => images.filter((x) => typeof x === "string" && x.trim().length > 0),
    [images]
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleImageUpload = async (files: FileList) => {
    const uploaded: string[] = []

    for (let i = 0; i < files.length; i++) {
      const fd = new FormData()
      fd.append("file", files[i])

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      })

      if (!res.ok) {
        const txt = await res.text()
        alert("Upload failed: " + txt)
        return
      }

      const data = await res.json()
      if (data?.secure_url) uploaded.push(String(data.secure_url))
    }

    setImages((prev) => [...prev, ...uploaded])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      id: form.id.trim(),
      title: form.title.trim(),
      mls: form.mls.trim(),
      address: form.address.trim(),
      status: form.status,
      type: form.type.trim(),
      parking: form.parking.trim(),
      description: form.description.trim(),

      price: Number(form.price),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      sqft: Number(form.sqft),
      yearBuilt: Number(form.yearBuilt),

      images: safeImages,
    }

    const res = await fetch("/api/admin/create-property", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const txt = await res.text()
      alert("Create failed: " + txt)
      return
    }

    router.push("/admin")
    router.refresh()
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24">
        <div className="mb-6 h-1 w-14 rounded-full bg-red-600" />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl text-neutral-900">
              Create Property
            </h1>
            <p className="mt-4 text-neutral-600">
              Add a new listing, upload images and set visibility.
            </p>
          </div>
        </div>

        <div className="mt-14">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* FIELDS */}
            <div className="overflow-hidden rounded-3xl border border-neutral-200">
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-neutral-200">
                  {[
                    { label: "Slug ID", name: "id" },
                    { label: "Title", name: "title" },
                    { label: "MLS", name: "mls" },
                    { label: "Address", name: "address" },
                    { label: "Type", name: "type" },
                    { label: "Parking", name: "parking" },
                    { label: "Price", name: "price", type: "number" },
                    { label: "Bedrooms", name: "bedrooms", type: "number" },
                    { label: "Bathrooms", name: "bathrooms", type: "number" },
                    { label: "Square Feet", name: "sqft", type: "number" },
                    { label: "Year Built", name: "yearBuilt", type: "number" },
                  ].map((field) => (
                    <tr key={field.name}>
                      <td className="w-1/4 px-6 py-5 text-neutral-600">
                        {field.label}
                      </td>
                      <td className="px-6 py-5">
                        <input
                          type={field.type || "text"}
                          name={field.name}
                          value={(form as any)[field.name] ?? ""}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-neutral-300 px-4 py-2 focus:border-red-600 focus:outline-none"
                        />
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td className="px-6 py-5 text-neutral-600">Status</td>
                    <td className="px-6 py-5">
                      <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="rounded-xl border border-neutral-300 px-4 py-2 focus:border-red-600 focus:outline-none"
                      >
                        <option value="FOR_SALE">For Sale</option>
                        <option value="SOLD">Sold</option>
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <td className="px-6 py-5 text-neutral-600 align-top">
                      Description
                    </td>
                    <td className="px-6 py-5">
                      <textarea
                        name="description"
                        value={form.description ?? ""}
                        onChange={handleChange}
                        rows={6}
                        required
                        className="w-full rounded-xl border border-neutral-300 px-4 py-3 focus:border-red-600 focus:outline-none"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* IMAGES */}
            <div>
              <h2 className="mb-6 font-display text-2xl text-neutral-900">
                Images
              </h2>

              {safeImages.length === 0 ? (
                <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-10 text-sm text-neutral-500">
                  No images yet. Upload some below.
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-4">
                  {safeImages.map((img, i) => (
                    <div
                      key={`${img}-${i}`}
                      className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white"
                    >
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={img}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-red-600"
                        aria-label="Remove image"
                        title="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) handleImageUpload(e.target.files)
                    e.currentTarget.value = ""
                  }}
                />
              </div>
            </div>

            {/* SAVE */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-neutral-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-red-600"
              >
                Create Property
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}