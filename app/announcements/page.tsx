"use client"

import { useState, useEffect } from "react"
import { AnnouncementsFilter } from "@/components/announcements/announcements-filter"
import { AnnouncementsList } from "@/components/announcements/announcements-list"
import { Megaphone } from "lucide-react"
import { Announcement } from "@/lib/data-store"

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("/api/announcements")
        const data = await response.json()
        setAnnouncements(data)
        setFilteredAnnouncements(data)
      } catch (error) {
        console.error("Failed to fetch announcements:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [])

  // Filter announcements based on search term and category
  useEffect(() => {
    let filtered = announcements

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (announcement) =>
          announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          announcement.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          announcement.author.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((announcement) => announcement.category === selectedCategory)
    }

    setFilteredAnnouncements(filtered)
  }, [announcements, searchTerm, selectedCategory])

  const handleClearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("All")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Megaphone className="h-8 w-8 text-emerald-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              School Announcements
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay informed with the latest news, updates, and important information from Oakwood Academy
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <AnnouncementsFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            totalResults={announcements.length}
            filteredResults={filteredAnnouncements.length}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Announcements List */}
        <AnnouncementsList announcements={filteredAnnouncements} isLoading={loading} />
      </div>
    </div>
  )
}
