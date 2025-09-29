"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X, Filter } from "lucide-react"

interface AnnouncementsFilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedCategory: string
  onCategoryChange: (value: string) => void
  totalResults: number
  filteredResults: number
  onClearFilters: () => void
}

const categories = ["All", "Academic", "Sports", "Events", "Facilities", "Administrative"]

export function AnnouncementsFilter({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  totalResults,
  filteredResults,
  onClearFilters,
}: AnnouncementsFilterProps) {
  const hasActiveFilters = searchTerm || selectedCategory !== "All"

  return (
    <div className="space-y-4">
      {/* Search and Category Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters and Results */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: "{searchTerm}"
              <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => onSearchChange("")} />
            </Badge>
          )}

          {selectedCategory !== "All" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {selectedCategory}
              <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => onCategoryChange("All")} />
            </Badge>
          )}

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear all filters
            </Button>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          Showing {filteredResults} of {totalResults} announcements
        </div>
      </div>
    </div>
  )
}
