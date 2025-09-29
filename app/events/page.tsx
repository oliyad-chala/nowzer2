import { Metadata } from 'next'
import { EventsView } from '@/components/events/events-view'

export const metadata: Metadata = {
  title: 'Events - Oakwood Academy',
  description: 'Stay updated with upcoming events, activities, and important dates at Oakwood Academy.',
}

export default function EventsPage() {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800 text-white section-padding">
        <div className="container-max">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">School Events</h1>
          <p className="text-xl text-blue-100 dark:text-blue-200 max-w-3xl">
            Discover upcoming events, activities, and important dates in our school calendar.
          </p>
        </div>
      </div>
      
      <div className="container-max section-padding">
        <EventsView />
      </div>
    </div>
  )
}
