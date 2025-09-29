"use client"
import Link from "next/link"
import { Calendar, Clock, Tag, ChevronRight } from "lucide-react"

interface Announcement {
  id: number
  title: string
  content: string
  excerpt: string
  category: string
  featured: boolean
  date: string
  createdAt: string
  updatedAt: string
}

interface Props {
  announcements: Announcement[]
  isLoading: boolean
}

export function AnnouncementsList({ announcements, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card p-6 animate-pulse">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
                <div className="flex space-x-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </div>
              </div>
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (announcements.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <Tag className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No announcements found</h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Try adjusting your search terms or filters to find what you're looking for.
        </p>
      </div>
    )
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Academic: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      Sports: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
      Events: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
      Facilities: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
      Administrative: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
    }
    return colors[category as keyof typeof colors] || colors.Administrative
  }

  return (
    <div className="space-y-6">
      {announcements.map((announcement, index) => (
        <div
          key={announcement.id}
          className="card p-6 hover:shadow-lg transition-all duration-300 group animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Featured Badge */}
              {announcement.featured && (
                <div className="inline-flex items-center px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs font-medium rounded-full mb-3">
                  Featured
                </div>
              )}

              {/* Title */}
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {announcement.title}
              </h2>

              {/* Excerpt */}
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{announcement.excerpt}</p>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(announcement.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(announcement.category)}`}
                >
                  {announcement.category}
                </span>
              </div>
            </div>

            {/* Read More Button */}
            <Link
              href={`/announcements/${announcement.id}`}
              className="ml-4 p-2 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-all duration-200 group-hover:translate-x-1"
            >
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
