import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react'
import { dataStore } from '@/lib/data-store'

interface Announcement {
  id: number
  title: string
  content: string
  excerpt: string
  date: string
  author: string
  category: string
  featured: boolean
  published: boolean
}

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const announcement = dataStore.getAnnouncementById(parseInt(params.id))
  
  if (!announcement) {
    return {
      title: 'Announcement Not Found - Nowzer'
    }
  }

  return {
    title: `${announcement.title} - Nowzer`,
    description: announcement.excerpt,
  }
}

export default function AnnouncementDetailPage({ params }: Props) {
  const announcement = dataStore.getAnnouncementById(parseInt(params.id))

  if (!announcement) {
    notFound()
  }

  return (
    <div className="pt-20">
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link 
            href="/announcements"
            className="inline-flex items-center space-x-2 text-blue-700 hover:text-blue-900 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Announcements</span>
          </Link>

          {/* Article header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                announcement.urgent 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {announcement.category}
              </span>
              {announcement.urgent && (
                <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  URGENT
                </span>
              )}
              {announcement.featured && (
                <span className="bg-amber-500 text-white px-2 py-1 rounded text-xs font-bold">
                  FEATURED
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {announcement.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b">
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>{new Date(announcement.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{announcement.author}</span>
                </div>
              </div>
              
              <button className="flex items-center space-x-2 text-blue-700 hover:text-blue-900">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </header>

          {/* Article content */}
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{announcement.content}</p>
          </div>

          {/* Related announcements */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Announcements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dataStore.getAnnouncements()
                .filter(a => a.id !== announcement.id && a.published)
                .slice(0, 2)
                .map((related) => (
                  <Link
                    key={related.id}
                    href={`/announcements/${related.id}`}
                    className="card p-6 hover:shadow-lg transition-shadow"
                  >
                    <span className="text-sm text-blue-700 font-medium">{related.category}</span>
                    <h4 className="text-lg font-semibold text-gray-900 mt-2 mb-3 hover:text-blue-700 transition-colors">
                      {related.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {new Date(related.date).toLocaleDateString()}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
