interface Announcement {
  id: number
  title: string
  content: string
  excerpt: string
  date: string
  category: string
  featured: boolean
  author: string
  published: boolean
  urgent?: boolean
  updatedAt: string
  createdAt: string
}

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  featured: boolean
  updatedAt: string
  createdAt: string
  image?: string
  registrationRequired: boolean
  maxAttendees?: number
  currentAttendees: number
}

interface GalleryItem {
  id: number
  title: string
  description: string
  imageUrl?: string
  image?: string
  thumbnail?: string
  category: string
  year: string
  type: "photo" | "video"
  featured: boolean
  date: string
  updatedAt: string
  createdAt: string
  photos?: number
  duration?: string
}

interface Activity {
  id: number
  type: "announcement" | "event" | "gallery"
  action: "created" | "updated" | "deleted"
  title: string
  timestamp: string
  user: string
}

interface SiteSettings {
  schoolName: string
  tagline: string
  address: string
  phone: string
  email: string
  socialMedia: {
    facebook: string
    twitter: string
    instagram: string
    youtube: string
    linkedin: string
    tiktok: string
  }
}

class DataStore {
  private announcements: Announcement[] = []
  private events: Event[] = []
  private galleryItems: GalleryItem[] = []
  private activities: Activity[] = []
  private settings: SiteSettings = {
    schoolName: "Nowzer",
    tagline: "Excellence in Education, Character in Action",
    address: "123 Education Lane, Learning City, LC 12345",
    phone: "(555) 123-4567",
    email: "info@nowzer.edu",
    socialMedia: {
      facebook: "https://facebook.com/nowzer",
      twitter: "https://twitter.com/nowzer",
      instagram: "https://instagram.com/nowzer",
      youtube: "https://youtube.com/nowzer",
      linkedin: "",
      tiktok: "",
    },
  }

  private nextId = {
    announcements: 1,
    events: 1,
    gallery: 1,
    activities: 1,
  }

  constructor() {
    this.loadFromStorage()
    this.initializeDefaultData()
  }

private loadFromStorage() {
  if (typeof window !== 'undefined') {
    try {
      const storedAnnouncements = localStorage.getItem('nowzer_announcements')
      const storedEvents = localStorage.getItem('nowzer_events')
      const storedGallery = localStorage.getItem('nowzer_gallery')
      const storedActivities = localStorage.getItem('nowzer_activities')
      const storedSettings = localStorage.getItem('nowzer_settings')
      const storedNextId = localStorage.getItem('nowzer_nextId')

      if (storedAnnouncements) this.announcements = JSON.parse(storedAnnouncements)
      if (storedEvents) this.events = JSON.parse(storedEvents)
      if (storedGallery) this.galleryItems = JSON.parse(storedGallery)
      if (storedActivities) this.activities = JSON.parse(storedActivities)
      if (storedSettings) this.settings = JSON.parse(storedSettings)
      if (storedNextId) this.nextId = JSON.parse(storedNextId)
    } catch (error) {
      console.error('Error loading from localStorage:', error)
    }
  } else {
    const fs = require('fs');
    const pathModule = require('path');
    const dataDir = pathModule.join(process.cwd(), "data");
    const storageKeys: { [key: string]: string } = {
      announcements: 'nowzer_announcements',
      events: 'nowzer_events',
      gallery: 'nowzer_gallery',
      activities: 'nowzer_activities',
      settings: 'nowzer_settings',
      nextId: 'nowzer_nextId',
    };
    const dataMappings: { [key: string]: (parsed: any) => void } = {
      announcements: (parsed: any) => { this.announcements = parsed || []; },
      events: (parsed: any) => { this.events = parsed || []; },
      gallery: (parsed: any) => { this.galleryItems = parsed || []; },
      activities: (parsed: any) => { this.activities = parsed || []; },
      settings: (parsed: any) => { this.settings = parsed || {}; },
      nextId: (parsed: any) => { this.nextId = parsed || this.nextId; },
    };

    Object.entries(storageKeys).forEach(([dataKey, storageKey]) => {
      const filePath = pathModule.join(dataDir, `${storageKey}.json`);
      if (fs.existsSync(filePath)) {
        try {
          const dataStr = fs.readFileSync(filePath, 'utf8');
          const parsed = JSON.parse(dataStr);
          if (dataMappings[dataKey]) {
            dataMappings[dataKey](parsed);
          }
        } catch (error) {
          console.error(`Error loading ${storageKey}:`, error);
        }
      }
    });
  }
}

private saveToStorage() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('nowzer_announcements', JSON.stringify(this.announcements))
      localStorage.setItem('nowzer_events', JSON.stringify(this.events))
      localStorage.setItem('nowzer_gallery', JSON.stringify(this.galleryItems))
      localStorage.setItem('nowzer_activities', JSON.stringify(this.activities))
      localStorage.setItem('nowzer_settings', JSON.stringify(this.settings))
      localStorage.setItem('nowzer_nextId', JSON.stringify(this.nextId))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  } else {
    const fs = require('fs');
    const pathModule = require('path');
    const dataDir = pathModule.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const storageKeys: { [key: string]: string } = {
      announcements: 'nowzer_announcements',
      events: 'nowzer_events',
      gallery: 'nowzer_gallery',
      activities: 'nowzer_activities',
      settings: 'nowzer_settings',
      nextId: 'nowzer_nextId',
    };
    const getFilePath = (storageKey: string) => pathModule.join(dataDir, `${storageKey}.json`);
    const dataToSave: { [key: string]: any } = {
      nowzer_announcements: this.announcements,
      nowzer_events: this.events,
      nowzer_gallery: this.galleryItems,
      nowzer_activities: this.activities,
      nowzer_settings: this.settings,
      nowzer_nextId: this.nextId,
    };

    Object.entries(dataToSave).forEach(([storageKey, data]) => {
      const filePath = getFilePath(storageKey);
      try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      } catch (error) {
        console.error(`Error saving ${storageKey}:`, error);
      }
    });
  }
}

  private initializeDefaultData() {
    // Only initialize if no data exists
    if (this.announcements.length === 0) {
      this.announcements = [
        {
          id: 1,
          title: "Welcome Back to School 2024-2025",
          excerpt: "We're excited to welcome all students back for another amazing year of learning and growth.",
          content:
            "Dear Nowzer families, we are thrilled to welcome everyone back for the 2024-2025 academic year! This year promises to be filled with exciting learning opportunities, new programs, and continued excellence in education. Our dedicated faculty and staff have been working hard over the summer to prepare engaging curricula and create a safe, nurturing environment for all our students.",
          category: "Academic",
          date: "2024-08-15",
          author: "Dr. Sarah Johnson",
          published: true,
          featured: true,
          updatedAt: "2024-08-15T10:30:00Z",
          createdAt: "2024-08-15T10:30:00Z",
        },
        {
          id: 2,
          title: "New Science Lab Equipment Installed",
          excerpt: "State-of-the-art laboratory equipment has been installed to enhance our STEM programs.",
          content:
            "We are proud to announce the installation of cutting-edge science laboratory equipment across all our science classrooms. This new equipment includes advanced microscopes, digital sensors, and interactive whiteboards that will provide our students with hands-on learning experiences in biology, chemistry, and physics.",
          category: "Facilities",
          date: "2024-08-10",
          author: "Mr. David Chen",
          published: true,
          featured: true,
          updatedAt: "2024-08-10T14:20:00Z",
          createdAt: "2024-08-10T14:20:00Z",
        },
        {
          id: 3,
          title: "Fall Sports Registration Now Open",
          excerpt: "Registration is now open for all fall sports including soccer, volleyball, and cross country.",
          content:
            "Attention all student athletes! Registration for fall sports is now open. We offer soccer, volleyball, cross country, and tennis programs for various grade levels. All interested students must complete the registration form and submit required medical documentation by August 25th.",
          category: "Sports",
          date: "2024-08-05",
          author: "Coach Michael Rodriguez",
          published: true,
          featured: false,
          updatedAt: "2024-08-05T16:45:00Z",
          createdAt: "2024-08-05T16:45:00Z",
        },
      ]
      this.nextId.announcements = 4
    }

    if (this.events.length === 0) {
      this.events = [
        {
          id: 1,
          title: "Back to School Night",
          description: "Meet your child's teachers and learn about the curriculum for the upcoming year.",
          date: "2024-09-15",
          time: "6:00 PM",
          location: "Main Auditorium",
          category: "Academic",
          image: "/parent-teacher-conference.png",
          registrationRequired: true,
          maxAttendees: undefined,
          currentAttendees: 0,
          featured: true,
          updatedAt: "2024-08-15T10:30:00Z",
          createdAt: "2024-08-15T10:30:00Z",
        },
        {
          id: 2,
          title: "Annual Science Fair",
          description: "Students showcase their scientific research and experiments.",
          date: "2024-10-20",
          time: "9:00 AM",
          location: "Gymnasium",
          category: "Academic",
          image: "/science-fair-event.png",
          registrationRequired: true,
          maxAttendees: 200,
          currentAttendees: 45,
          featured: true,
          updatedAt: "2024-08-10T14:20:00Z",
          createdAt: "2024-08-10T14:20:00Z",
        },
      ]
      this.nextId.events = 3
    }

    if (this.galleryItems.length === 0) {
      this.galleryItems = [
        {
          id: 1,
          title: "Graduation Ceremony 2024",
          description: "Celebrating our graduating class of 2024 with pride and joy.",
          type: "photo",
          thumbnail: "/graduation-ceremony-2023.png",
          image: "/graduation-ceremony-2023.png",
          imageUrl: "/graduation-ceremony-2023.png",
          photos: 1,
          category: "events",
          year: "2024",
          date: "2024-06-15",
          featured: true,
          updatedAt: "2024-06-15T10:00:00Z",
          createdAt: "2024-06-15T10:00:00Z",
        },
        {
          id: 2,
          title: "Science Fair Highlights",
          description: "Amazing projects and discoveries from our young scientists.",
          type: "video",
          thumbnail: "/science-fair-video.png",
          image: "/science-fair-video.png",
          imageUrl: "/science-fair-video.png",
          duration: "3:45",
          category: "academic",
          year: "2024",
          date: "2024-05-20",
          featured: true,
          updatedAt: "2024-05-20T14:30:00Z",
          createdAt: "2024-05-20T14:30:00Z",
        },
      ]
      this.nextId.gallery = 3
    }

    if (this.activities.length === 0) {
      this.activities = [
        {
          id: 1,
          type: "announcement",
          action: "created",
          title: "Welcome Back to School 2024-2025",
          timestamp: "2024-08-15T10:30:00Z",
          user: "Dr. Sarah Johnson",
        },
        {
          id: 2,
          type: "event",
          action: "created",
          title: "Annual Science Fair",
          timestamp: "2024-08-14T14:20:00Z",
          user: "Mr. David Chen",
        },
      ]
      this.nextId.activities = 3
    }

    // Save the initialized data
    this.saveToStorage()
  }

  // Announcements
  getAnnouncements(): Announcement[] {
    return [...this.announcements].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  getAnnouncementById(id: number): Announcement | undefined {
    return this.announcements.find((a) => a.id === id)
  }

  addAnnouncement(announcement: Omit<Announcement, "id" | "updatedAt" | "createdAt">): Announcement {
    const now = new Date().toISOString()
    const newAnnouncement = {
      ...announcement,
      id: this.nextId.announcements++,
      updatedAt: now,
      createdAt: now,
    }
    this.announcements.push(newAnnouncement)
    this.addActivity("announcement", "created", announcement.title, announcement.author)
    this.saveToStorage()
    return newAnnouncement
  }

  updateAnnouncement(id: number, updates: Partial<Announcement>): Announcement | null {
    const index = this.announcements.findIndex((a) => a.id === id)
    if (index === -1) return null

    this.announcements[index] = { ...this.announcements[index], ...updates, updatedAt: new Date().toISOString() }
    this.addActivity("announcement", "updated", this.announcements[index].title, updates.author || "Admin")
    this.saveToStorage()
    return this.announcements[index]
  }

  deleteAnnouncement(id: number): boolean {
    const index = this.announcements.findIndex((a) => a.id === id)
    if (index === -1) return false

    const announcement = this.announcements[index]
    this.announcements.splice(index, 1)
    this.addActivity("announcement", "deleted", announcement.title, "Admin")
    this.saveToStorage()
    return true
  }

  // Events
  getEvents(): Event[] {
    return [...this.events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  getEventById(id: number): Event | undefined {
    return this.events.find((e) => e.id === id)
  }

  addEvent(event: Omit<Event, "id" | "updatedAt" | "createdAt">): Event {
    const now = new Date().toISOString()
    const newEvent = {
      ...event,
      id: this.nextId.events++,
      updatedAt: now,
      createdAt: now,
      registrationRequired: event.registrationRequired || false,
      currentAttendees: event.currentAttendees || 0,
    }
    this.events.push(newEvent)
    this.addActivity("event", "created", event.title, "Admin")
    this.saveToStorage()
    return newEvent
  }

  updateEvent(id: number, updates: Partial<Event>): Event | null {
    const index = this.events.findIndex((e) => e.id === id)
    if (index === -1) return null

    this.events[index] = { ...this.events[index], ...updates, updatedAt: new Date().toISOString() }
    this.addActivity("event", "updated", this.events[index].title, "Admin")
    this.saveToStorage()
    return this.events[index]
  }

  deleteEvent(id: number): boolean {
    const index = this.events.findIndex((e) => e.id === id)
    if (index === -1) return false

    const event = this.events[index]
    this.events.splice(index, 1)
    this.addActivity("event", "deleted", event.title, "Admin")
    this.saveToStorage()
    return true
  }

  // Gallery
  getGalleryItems(): GalleryItem[] {
    return [...this.galleryItems].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  getGalleryItemById(id: number): GalleryItem | undefined {
    return this.galleryItems.find((g) => g.id === id)
  }

  addGalleryItem(item: Omit<GalleryItem, "id" | "date" | "updatedAt" | "createdAt">): GalleryItem {
    const now = new Date().toISOString()
    const newItem = {
      ...item,
      id: this.nextId.gallery++,
      date: new Date().toISOString().split("T")[0],
      updatedAt: now,
      createdAt: now,
      // Ensure we have the image property for backward compatibility
      image: item.imageUrl,
      thumbnail: item.imageUrl,
      // Set photos count to 1 for new uploads (each upload is 1 photo)
      photos: 1,
    }
    this.galleryItems.push(newItem)
    this.addActivity("gallery", "created", item.title, "Admin")
    this.saveToStorage()
    return newItem
  }

  updateGalleryItem(id: number, updates: Partial<GalleryItem>): GalleryItem | null {
    const index = this.galleryItems.findIndex((g) => g.id === id)
    if (index === -1) return null

    this.galleryItems[index] = { ...this.galleryItems[index], ...updates, updatedAt: new Date().toISOString() }
    this.addActivity("gallery", "updated", this.galleryItems[index].title, "Admin")
    this.saveToStorage()
    return this.galleryItems[index]
  }

  deleteGalleryItem(id: number): boolean {
    const index = this.galleryItems.findIndex((g) => g.id === id)
    if (index === -1) return false

    const item = this.galleryItems[index]
    this.galleryItems.splice(index, 1)
    this.addActivity("gallery", "deleted", item.title, "Admin")
    this.saveToStorage()
    return true
  }

  // Activities
  getActivities(): Activity[] {
    return [...this.activities].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }

  addActivity(type: Activity["type"], action: Activity["action"], title: string, user: string): Activity {
    const newActivity: Activity = {
      id: this.nextId.activities++,
      type,
      action,
      title,
      timestamp: new Date().toISOString(),
      user,
    }
    this.activities.unshift(newActivity) // Add to beginning for latest first

    // Keep only last 50 activities
    if (this.activities.length > 50) {
      this.activities = this.activities.slice(0, 50)
    }

    this.saveToStorage()
    return newActivity
  }

  deleteActivity(id: number): boolean {
    const index = this.activities.findIndex((a) => a.id === id)
    if (index === -1) return false

    this.activities.splice(index, 1)
    this.saveToStorage()
    return true
  }

  // Settings
  getSettings(): SiteSettings {
    return { ...this.settings }
  }

  updateSettings(updates: Partial<SiteSettings>): SiteSettings {
    this.settings = {
      ...this.settings,
      ...updates,
      socialMedia: {
        ...this.settings.socialMedia,
        ...(updates.socialMedia || {}),
      },
    }
    this.addActivity("announcement", "updated", "Site Settings", "Admin")
    this.saveToStorage()
    return this.settings
  }
}

export const dataStore = new DataStore()
export type { Announcement, Event, GalleryItem, Activity, SiteSettings }
