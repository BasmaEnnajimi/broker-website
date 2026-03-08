"use client"

import Image from "next/image"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"

import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable"

import { CSS } from "@dnd-kit/utilities"

type Props = {
  images: string[]
  setImages: (images: string[]) => void
  handleImageUpload: (files: FileList) => Promise<void>
}

function SortableImage({
  src,
  id,
  onRemove,
}: {
  src: string
  id: string
  onRemove: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white cursor-grab"
    >
      <div className="relative aspect-[4/3]">
        <Image src={src} alt="" fill className="object-cover" />
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-red-600"
      >
        ×
      </button>
    </div>
  )
}

export default function ImageUploader({
  images,
  setImages,
  handleImageUpload,
}: Props) {

  const sensors = useSensors(useSensor(PointerSensor))

  return (
    <div>

      <h2 className="mb-6 font-display text-2xl text-neutral-900">
        Images
      </h2>

      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragEnd={(event) => {

          const { active, over } = event

          if (!over || active.id === over.id) return

          const oldIndex = images.indexOf(active.id as string)
          const newIndex = images.indexOf(over.id as string)

          const reordered = arrayMove(images, oldIndex, newIndex)

          setImages(reordered)
        }}
      >

        <SortableContext
          items={images}
          strategy={rectSortingStrategy}
        >

          <div className="grid gap-6 md:grid-cols-4">

            {images.map((img) => (
              <SortableImage
                key={img}
                id={img}
                src={img}
                onRemove={() =>
                  setImages(images.filter((i) => i !== img))
                }
              />
            ))}

          </div>

        </SortableContext>

      </DndContext>

      <div
        className="mt-8 flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 text-neutral-500 hover:border-red-600"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {

          e.preventDefault()

          const files = e.dataTransfer.files

          if (files) handleImageUpload(files)

        }}
      >
        Drag & drop images here
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => {

          if (e.target.files) handleImageUpload(e.target.files)

          e.currentTarget.value = ""
        }}
        className="mt-4"
      />

    </div>
  )
}