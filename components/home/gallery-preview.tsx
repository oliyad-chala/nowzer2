"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Camera, Play, ArrowRight } from "lucide-react"

interface GalleryItem {
  id: number
  title: string
  description: string
  type: "photo" | "video"
  thumbnail?: string
  image?: string
  imageUrl?: string
  photos?: number
  duration?: string
  category: string
}

export function GalleryPreview() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

    useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await fetch("/api/gallery")
        if (response.ok) {
          const data = await response.json()
          setGalleryItems(data.slice(0, 2)) // Show only 2 items
        } else {
          console.error("Failed to fetch gallery items:", response.statusText)
        }
      } catch (error) {
        console.error("Failed to fetch gallery items:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryItems()

    // Refresh gallery items every 30 seconds to catch new uploads
    const interval = setInterval(fetchGalleryItems, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Gallery Highlights</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-muted rounded-xl aspect-[4/3]"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Camera className="h-8 w-8 text-emerald-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold">Gallery Highlights</h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Capturing precious moments and celebrating achievements in our school community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {galleryItems.map((item, index) => {
            // Get the image URL from any of the possible properties
            const imageUrl = item.imageUrl || item.image || item.thumbnail || "/placeholder.svg?height=300&width=400"

            return (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Type indicator */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-black/50 text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
                      {item.type === "video" ? (
                        <>
                          <Play className="h-3 w-3" />
                          <span>{item.duration || "2:30"}</span>
                        </>
                      ) : (
                        <>
                          <Camera className="h-3 w-3" />
                          <span>{item.photos || 1} photo{item.photos !== 1 ? 's' : ''}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-emerald-500 text-white px-2 py-1 rounded text-xs font-medium capitalize">
                      {item.category.replace("-", " ")}
                    </span>
                  </div>

                  {/* Play button for videos */}
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                        <Play className="h-8 w-8 text-emerald-700 ml-1" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-emerald-300 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-sm line-clamp-2">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Link href="/gallery" className="btn-primary">
            View Full Gallery
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
