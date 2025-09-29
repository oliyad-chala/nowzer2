import type { Metadata } from "next"
import { GalleryView } from "@/components/gallery/gallery-view"

export const metadata: Metadata = {
  title: "Gallery | Oakwood Academy",
  description: "Explore our photo and video gallery showcasing school events, activities, and memorable moments.",
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Gallery</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of photos and videos showcasing the vibrant life at Oakwood Academy
          </p>
        </div>

        {/* Gallery Content */}
        <GalleryView />
      </div>
    </div>
  )
}
