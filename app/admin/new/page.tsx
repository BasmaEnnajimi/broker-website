"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import ImageUploader from "../components/ImageUploader"

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
  status: "FOR_SALE" | "SOLD"
  type: string
  bedrooms: number | string
  bathrooms: number | string
  sqft: number | string
  yearBuilt: number | string
  parking: string
  description: string
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
  const [details, setDetails] = useState<Detail[]>([])
  const [characteristics, setCharacteristics] = useState<Characteristic[]>([])

  const safeImages = useMemo(
    () => images.filter((x) => typeof x === "string" && x.trim().length > 0),
    [images]
  )

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
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

  const updateDetail = (i: number, field: string, value: string) => {
    setDetails((prev) =>
      prev.map((d, index) =>
        index === i ? { ...d, [field]: value } : d
      )
    )
  }

  const removeDetail = (i: number) => {
    setDetails((prev) => prev.filter((_, index) => index !== i))
  }

  const addCharacteristic = () => {
    setCharacteristics((prev) => [...prev, { value: "" }])
  }

  const updateCharacteristic = (i: number, value: string) => {
    setCharacteristics((prev) =>
      prev.map((c, index) =>
        index === i ? { value } : c
      )
    )
  }

  const removeCharacteristic = (i: number) => {
    setCharacteristics((prev) => prev.filter((_, index) => index !== i))
  }

  const handleSubmit = async (e: any) => {

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

    const res = await fetch("/api/admin/create-property", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      alert("Create failed")
      return
    }

    router.push("/admin")
    router.refresh()
  }

  return (

    <section className="bg-white">

      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24">

        <h1 className="font-display text-4xl text-neutral-900">
          Create Property
        </h1>

        <form onSubmit={handleSubmit} className="mt-14 space-y-12">

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
                        value={(form as any)[field.name]}
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
                      value={form.description}
                      onChange={handleChange}
                      rows={6}
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3"
                    />
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* PROPERTY DETAILS */}
          <div>

            <h2 className="mb-6 text-2xl font-display">
              Property Details
            </h2>

            <div className="space-y-4">

              {details.map((d, i) => (

                <div key={i} className="flex gap-4">

                  <input
                    placeholder="Label"
                    value={d.label}
                    onChange={(e)=>updateDetail(i,"label",e.target.value)}
                    className="flex-1 rounded-xl border px-4 py-2"
                  />

                  <input
                    placeholder="Value"
                    value={d.value}
                    onChange={(e)=>updateDetail(i,"value",e.target.value)}
                    className="flex-1 rounded-xl border px-4 py-2"
                  />

                  <select
                    value={d.category}
                    onChange={(e)=>updateDetail(i,"category",e.target.value)}
                    className="rounded-xl border px-4 py-2"
                  >
                    <option value="BUILDING_INFO">Building</option>
                    <option value="ROOM">Room</option>
                    <option value="EXPENSE">Expense</option>
                  </select>

                  <button
                    type="button"
                    onClick={()=>removeDetail(i)}
                    className="bg-red-600 text-white px-3 rounded"
                  >
                    ×
                  </button>

                </div>
              ))}

              <button
                type="button"
                onClick={addDetail}
                className="bg-neutral-900 text-white px-4 py-2 rounded-xl"
              >
                + Add Detail
              </button>

            </div>

          </div>

          {/* CHARACTERISTICS */}
          <div>

            <h2 className="mb-6 text-2xl font-display">
              Characteristics
            </h2>

            {characteristics.map((c,i)=>(
              <div key={i} className="flex gap-4 mb-4">

                <input
                  value={c.value}
                  onChange={(e)=>updateCharacteristic(i,e.target.value)}
                  className="flex-1 rounded-xl border px-4 py-2"
                />

                <button
                  type="button"
                  onClick={()=>removeCharacteristic(i)}
                  className="bg-red-600 text-white px-3 rounded"
                >
                  ×
                </button>

              </div>
            ))}

            <button
              type="button"
              onClick={addCharacteristic}
              className="bg-neutral-900 text-white px-4 py-2 rounded-xl"
            >
              + Add Characteristic
            </button>

          </div>

          {/* IMAGES */}
          <ImageUploader
            images={images}
            setImages={setImages}
            handleImageUpload={handleImageUpload}
          />

          <button
            type="submit"
            className="bg-neutral-900 text-white px-8 py-3 rounded-xl"
          >
            Create Property
          </button>

        </form>

      </div>

    </section>
  )
}