"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, Calendar, Tag } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { GalleryItem } from "@/lib/data-store"

interface GalleryGridProps {
  items: GalleryItem[]
  loading: boolean
}

const categoryColors = {
  events: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  sports: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  academic: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  cultural: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  "campus-life": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
}

export function GalleryGrid({ items, loading }: GalleryGridProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <Tag className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No items found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="group cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setSelectedItem(item)}
          >
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Video indicator */}
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="bg-white/90 rounded-full p-3">
                    <Play className="h-6 w-6 text-gray-800" />
                  </div>
                </div>
              )}

              {/* Featured badge */}
              {item.featured && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-emerald-600 text-white">Featured</Badge>
                </div>
              )}

              {/* Category badge */}
              <div className="absolute top-3 right-3">
                <Badge className={categoryColors[item.category]}>{item.category.replace("-", " ")}</Badge>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <h3 className="font-semibold text-lg group-hover:text-emerald-600 transition-colors line-clamp-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2">{item.description}</p>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                  {item.type === "photo" && (
                    <span>{item.photos || 1} photo{item.photos !== 1 ? 's' : ''}</span>
                  )}
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedItem.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={selectedItem.image || "/placeholder.svg"}
                    alt={selectedItem.title}
                    fill
                    className="object-cover"
                  />
                  {selectedItem.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="bg-white/90 rounded-full p-4">
                        <Play className="h-8 w-8 text-gray-800" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge className={categoryColors[selectedItem.category]}>
                    {selectedItem.category.replace("-", " ")}
                  </Badge>
                  <Badge variant="outline">{selectedItem.type}</Badge>
                  {selectedItem.featured && <Badge className="bg-emerald-600 text-white">Featured</Badge>}
                </div>

                <p className="text-muted-foreground">{selectedItem.description}</p>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(selectedItem.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
