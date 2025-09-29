"use client"

import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface GalleryFilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedCategory: string
  onCategoryChange: (value: string) => void
  selectedYear: string
  onYearChange: (value: string) => void
  selectedType: string
  onTypeChange: (value: string) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
  totalItems: number
  filteredItems: number
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "events", label: "Events" },
  { value: "sports", label: "Sports" },
  { value: "academic", label: "Academic" },
  { value: "cultural", label: "Cultural" },
  { value: "campus-life", label: "Campus Life" },
]

const years = [
  { value: "all", label: "All Years" },
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
]

const types = [
  { value: "all", label: "All Types" },
  { value: "photo", label: "Photos" },
  { value: "video", label: "Videos" },
]

export function GalleryFilter({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedYear,
  onYearChange,
  selectedType,
  onTypeChange,
  onClearFilters,
  hasActiveFilters,
  totalItems,
  filteredItems,
}: GalleryFilterProps) {
  return (
    <div className="space-y-4">
      {/* Search and Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search gallery..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Year Filter */}
        <Select value={selectedYear} onValueChange={onYearChange}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year.value} value={year.value}>
                {year.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Type Filter */}
        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters and Results */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="gap-1">
              Search: "{searchTerm}"
              <X className="h-3 w-3 cursor-pointer" onClick={() => onSearchChange("")} />
            </Badge>
          )}
          {selectedCategory !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {categories.find((c) => c.value === selectedCategory)?.label}
              <X className="h-3 w-3 cursor-pointer" onClick={() => onCategoryChange("all")} />
            </Badge>
          )}
          {selectedYear !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {selectedYear}
              <X className="h-3 w-3 cursor-pointer" onClick={() => onYearChange("all")} />
            </Badge>
          )}
          {selectedType !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {types.find((t) => t.value === selectedType)?.label}
              <X className="h-3 w-3 cursor-pointer" onClick={() => onTypeChange("all")} />
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
          Showing {filteredItems} of {totalItems} items
        </div>
      </div>
    </div>
  )
}
