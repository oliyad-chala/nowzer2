'use client'

import Link from 'next/link'
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react'

interface Props {
  events: any[]
  loading: boolean
}

export function EventsList({ events, loading }: Props) {
  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading events...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {events.length} event{events.length !== 1 ? 's' : ''} found
        </h2>
      </div>

      <div className="grid gap-6">
        {events.map((event, index) => (
          <div
            key={event.id}
            className="card p-8 hover:shadow-2xl transition-all duration-300 animate-scale-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
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
                
                <h3 className="text-3xl font-bold mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Link href={`/events/${event.id}`}>
                    {event.title}
                  </Link>
                </h3>
                
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  {event.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <Link 
                  href={`/events/${event.id}`}
                  className="btn-primary text-sm inline-flex items-center space-x-2 w-fit"
                >
                  <span>View Details</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {events.length === 0 && (
        <div className="text-center py-16">
          <div className="text-muted-foreground mb-4">
            <Calendar className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No events found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
        </div>
      )}
    </div>
  )
}
