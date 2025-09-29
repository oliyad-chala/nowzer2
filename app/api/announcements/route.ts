import { NextRequest, NextResponse } from 'next/server'
import { dataStore } from '@/lib/data-store'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const featured = searchParams.get('featured')
  
  let announcements = dataStore.getAnnouncements()
  
  if (category && category !== 'All') {
    announcements = announcements.filter(
      announcement => announcement.category === category
    )
  }
  
  if (search) {
    announcements = announcements.filter(
      announcement => 
        announcement.title.toLowerCase().includes(search.toLowerCase()) ||
        announcement.excerpt.toLowerCase().includes(search.toLowerCase())
    )
  }

  if (featured === 'true') {
    announcements = announcements.filter(announcement => announcement.featured)
  }
  
  return NextResponse.json(announcements)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newAnnouncement = dataStore.addAnnouncement(body)
    return NextResponse.json(newAnnouncement, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create announcement' },
      { status: 500 }
    )
  }
}
