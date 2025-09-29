"use client"

import { useState, useEffect } from "react"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GalleryFilter } from "./gallery-filter"
import { GalleryGrid } from "./gallery-grid"
import type { GalleryItem } from "@/lib/data-store"

export function GalleryView() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")

  useEffect(() => {
    fetchGalleryItems()
    
    // Refresh gallery items every 30 seconds to catch new uploads
    const interval = setInterval(fetchGalleryItems, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    filterItems()
  }, [items, searchTerm, selectedCategory, selectedYear, selectedType])

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch("/api/gallery")
      if (response.ok) {
        const data = await response.json()
        // Show all items
        setItems(data)
      }
    } catch (error) {
      console.error("Error fetching gallery items:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterItems = () => {
    let filtered = items

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    // Year filter
    if (selectedYear !== "all") {
      filtered = filtered.filter((item) => new Date(item.date).getFullYear().toString() === selectedYear)
    }

    // Type filter
    if (selectedType !== "all") {
      filtered = filtered.filter((item) => item.type === selectedType)
    }

    setFilteredItems(filtered)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSelectedYear("all")
    setSelectedType("all")
  }

  const hasActiveFilters: boolean = !!searchTerm || selectedCategory !== "all" || selectedYear !== "all" || selectedType !== "all"

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <GalleryFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
          totalItems={items.length}
          filteredItems={filteredItems.length}
        />
        
        <Button
          variant="outline"
          size="sm"
          onClick={fetchGalleryItems}
          disabled={loading}
          className="ml-4"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <GalleryGrid items={filteredItems} loading={loading} />
    </div>
  )
}
