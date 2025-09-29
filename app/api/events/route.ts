import { NextRequest, NextResponse } from 'next/server'
import { dataStore } from '@/lib/data-store'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const upcoming = searchParams.get('upcoming')
  
  let events = dataStore.getEvents()
  
  if (category && category !== 'All') {
    events = events.filter(event => event.category === category)
  }

  if (search) {
    events = events.filter(event => 
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase())
    )
  }

  if (upcoming === 'true') {
    const today = new Date().toISOString().split('T')[0]
    events = events.filter(event => event.date >= today)
  }
  
  // Sort by date
  events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  
  return NextResponse.json(events)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newEvent = dataStore.addEvent(body)
    return NextResponse.json(newEvent, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}
