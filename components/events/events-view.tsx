'use client'

import { useState, useEffect } from 'react'
import { EventsList } from './events-list'
import { EventsCalendar } from './events-calendar'
import { EventsFilter } from './events-filter'
import { Calendar, List } from 'lucide-react'

export function EventsView() {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ category: 'All', search: '' })

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events')
        const data = await response.json()
        setEvents(data)
        setFilteredEvents(data)
      } catch (error) {
        console.error('Failed to fetch events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  useEffect(() => {
    let filtered = events

    if (filters.category !== 'All') {
      filtered = filtered.filter(event => event.category === filters.category)
    }

    if (filters.search) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.location.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    setFilteredEvents(filtered)
  }, [events, filters])

  const handleFilterChange = (newFilters: { category: string; search: string }) => {
    setFilters(newFilters)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <EventsFilter onFilterChange={handleFilterChange} />
        
        {/* View Toggle */}
        <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <List className="h-4 w-4" />
            <span>List</span>
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              viewMode === 'calendar'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>Calendar</span>
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <EventsList events={filteredEvents} loading={loading} />
      ) : (
        <EventsCalendar events={filteredEvents} loading={loading} />
      )}
    </div>
  )
}
