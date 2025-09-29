import { type NextRequest, NextResponse } from "next/server"
import { dataStore } from "@/lib/data-store"

export async function GET() {
  try {
    const gallery = dataStore.getGalleryItems()
    return NextResponse.json(gallery)
  } catch (error) {
    console.error("Gallery API error:", error)
    return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Map the form data to match our GalleryItem interface
    const galleryData = {
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      category: data.category.toLowerCase().replace(/\s+/g, "-"), // Convert to kebab-case
      year: data.year,
      type: data.type as "photo" | "video",
      featured: data.featured || false,
    }

    const newItem = dataStore.addGalleryItem(galleryData)

    // Add activity
    dataStore.addActivity("gallery", "created", data.title, "Admin")

    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    console.error("Gallery creation error:", error)
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 })
  }
}
