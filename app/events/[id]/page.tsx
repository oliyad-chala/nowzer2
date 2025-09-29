import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, MapPin, Clock, ArrowLeft, Share2 } from 'lucide-react'
import { dataStore } from '@/lib/data-store'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = dataStore.getEventById(parseInt(params.id))
  
  if (!event) {
    return {
      title: 'Event Not Found - Oakwood Academy'
    }
  }

  return {
    title: `${event.title} - Oakwood Academy`,
    description: event.description,
  }
}

export default function EventDetailPage({ params }: Props) {
  const event = dataStore.getEventById(parseInt(params.id))

  if (!event) {
    notFound()
  }

  return (
    <div className="pt-20">
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link 
            href="/events"
            className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Events</span>
          </Link>

          {/* Event header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
                {event.category}
              </span>
              {event.featured && (
                <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-xs font-bold">
                  FEATURED
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {event.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>{event.location}</span>
                </div>
              </div>
              
              <button className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </header>

          {/* Event content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-xl leading-relaxed text-muted-foreground">
              {event.description}
            </p>
          </div>

          {/* Related events */}
          <div className="mt-16 pt-8 border-t border-border">
            <h3 className="text-2xl font-bold mb-6">Related Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dataStore.getEvents()
                .filter(e => e.id !== event.id && e.category === event.category)
                .slice(0, 2)
                .map((related) => (
                <Link
                  key={related.id}
                  href={`/events/${related.id}`}
                  className="card p-6 hover:shadow-lg transition-shadow"
                >
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{related.category}</span>
                  <h4 className="text-lg font-semibold mt-2 mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {related.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-2">
                    {new Date(related.date).toLocaleDateString()} • {related.time}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {related.location}
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
