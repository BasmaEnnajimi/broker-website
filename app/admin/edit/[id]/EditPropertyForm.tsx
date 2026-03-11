"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import ImageUploader from "../../components/ImageUploader"

type Detail = {
  label: string
  value: string
  category: "BUILDING_INFO" | "ROOM" | "EXPENSE"
}

type Characteristic = {
  value: string
}

type PropertyFormState = {
  id: string
  title: string
  mls: string
  address: string
  price: number | string
  status: "DRAFT" | "FOR_SALE" | "PURCHASED" | "SOLD"
  type: string
  bedrooms: number | string
  bathrooms: number | string
  sqft: number | string
  yearBuilt: number | string
  parking: string
  description: string
  images?: string[]
  details?: Detail[]
  characteristics?: Characteristic[]
}

export default function EditPropertyForm({
  property,
}: {
  property: PropertyFormState
}) {
  const router = useRouter()

  const [form, setForm] = useState<PropertyFormState>({
    ...property,
  })

  const [images, setImages] = useState<string[]>([])
  const [details, setDetails] = useState<Detail[]>(property.details ?? [])
  const [characteristics, setCharacteristics] = useState<Characteristic[]>(
    property.characteristics ?? []
  )

  useEffect(() => {
    if (Array.isArray(property.images)) {
      setImages(property.images)
    }
  }, [property.images])

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

      const data = await res.json()

      if (data?.secure_url) uploaded.push(data.secure_url)
    }

    setImages((prev) => [...prev, ...uploaded])
  }

  const addDetail = () => {
    setDetails((prev) => [
      ...prev,
      { label: "", value: "", category: "BUILDING_INFO" },
    ])
  }

  const updateDetail = (index: number, field: string, value: string) => {
    setDetails((prev) =>
      prev.map((d, i) =>
        i === index ? { ...d, [field]: value } : d
      )
    )
  }

  const removeDetail = (index: number) => {
    setDetails((prev) => prev.filter((_, i) => i !== index))
  }

  const addCharacteristic = () => {
    setCharacteristics((prev) => [...prev, { value: "" }])
  }

  const updateCharacteristic = (index: number, value: string) => {
    setCharacteristics((prev) =>
      prev.map((c, i) => (i === index ? { value } : c))
    )
  }

  const removeCharacteristic = (index: number) => {
    setCharacteristics((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      ...form,
      price: Number(form.price),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      sqft: Number(form.sqft),
      yearBuilt: Number(form.yearBuilt),
      images: safeImages,
      details,
      characteristics,
    }

    const res = await fetch(`/api/admin/properties/${property.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      alert("Save failed")
      return
    }

    router.push("/admin")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">

      {/* PROPERTY FIELDS */}
      <div className="overflow-hidden rounded-3xl border border-neutral-200">
        <table className="w-full text-left text-sm">
          <tbody className="divide-y divide-neutral-200">
            {[
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
                  className="rounded-xl border border-neutral-300 px-4 py-2"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="FOR_SALE">For Sale</option>
                  <option value="PURCHASED">Purchased</option>
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
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* IMAGES */}
      <ImageUploader
        images={images}
        setImages={setImages}
        handleImageUpload={handleImageUpload}
      />
      
      {/* PROPERTY DETAILS */}
      <div>
        <h2 className="mb-6 font-display text-2xl text-neutral-900">
          Property Details
        </h2>

        <div className="space-y-4">
          {details.map((d, i) => (
            <div key={i} className="flex gap-4">
              <input
                placeholder="Label"
                value={d.label}
                onChange={(e) =>
                  updateDetail(i, "label", e.target.value)
                }
                className="flex-1 rounded-xl border px-4 py-2"
              />

              <input
                placeholder="Value"
                value={d.value}
                onChange={(e) =>
                  updateDetail(i, "value", e.target.value)
                }
                className="flex-1 rounded-xl border px-4 py-2"
              />

              <select
                value={d.category}
                onChange={(e) =>
                  updateDetail(i, "category", e.target.value)
                }
                className="rounded-xl border px-4 py-2"
              >
                <option value="BUILDING_INFO">Building</option>
                <option value="ROOM">Room</option>
                <option value="EXPENSE">Expense</option>
              </select>

              <button
                type="button"
                onClick={() => removeDetail(i)}
                className="rounded-lg bg-red-600 px-3 py-1 text-white"
              >
                ×
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addDetail}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-red-600"
          >
            + Add Detail
          </button>
        </div>
      </div>

      {/* CHARACTERISTICS */}
      <div>
        <h2 className="mb-6 font-display text-2xl text-neutral-900">
          Characteristics
        </h2>

        <div className="space-y-4">
          {characteristics.map((c, i) => (
            <div key={i} className="flex gap-4">
              <input
                value={c.value}
                onChange={(e) =>
                  updateCharacteristic(i, e.target.value)
                }
                className="flex-1 rounded-xl border px-4 py-2"
              />

              <button
                type="button"
                onClick={() => removeCharacteristic(i)}
                className="rounded-lg bg-red-600 px-3 py-1 text-white"
              >
                ×
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addCharacteristic}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-red-600"
          >
            + Add Characteristic
          </button>
        </div>
      </div>

      {/* SAVE */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-xl bg-neutral-900 px-8 py-3 text-sm font-medium text-white hover:bg-red-600"
        >
          Save Changes
        </button>
      </div>

    </form>
  )
}