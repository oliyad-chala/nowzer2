import { NextRequest, NextResponse } from 'next/server'
import { dataStore } from '@/lib/data-store'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const announcement = dataStore.getAnnouncementById(id)
  
  if (!announcement) {
    return NextResponse.json(
      { error: 'Announcement not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json(announcement)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    const updatedAnnouncement = dataStore.updateAnnouncement(id, body)
    
    if (!updatedAnnouncement) {
      return NextResponse.json(
        { error: 'Announcement not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(updatedAnnouncement)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update announcement' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const deletedAnnouncement = dataStore.deleteAnnouncement(id)
    
    if (!deletedAnnouncement) {
      return NextResponse.json(
        { error: 'Announcement not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ message: 'Announcement deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete announcement' },
      { status: 500 }
    )
  }
}
