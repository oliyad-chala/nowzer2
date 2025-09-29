"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, FileText, Camera, Plus, Settings, TrendingUp, Eye, Edit, Trash2, Clock } from "lucide-react"
import { CreateAnnouncementModal } from "./create-announcement-modal"
import { CreateEventModal } from "./create-event-modal"
import { UploadGalleryModal } from "./upload-gallery-modal"
import { SiteSettingsModal } from "./site-settings-modal"
import { EditAnnouncementModal } from "./edit-announcement-modal"
import { EditEventModal } from "./edit-event-modal"
import Link from "next/link"

interface DashboardStats {
  totalAnnouncements: number
  totalEvents: number
  totalGalleryItems: number
  recentActivities: number
}

interface RecentContent {
  id: number
  title: string
  type: "announcement" | "event" | "gallery"
  date: string
  status: string
}

interface Activity {
  id: number
  type: "announcement" | "event" | "gallery"
  action: "created" | "updated" | "deleted"
  title: string
  timestamp: string
  user: string
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAnnouncements: 0,
    totalEvents: 0,
    totalGalleryItems: 0,
    recentActivities: 0,
  })
  const [recentContent, setRecentContent] = useState<RecentContent[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  // Modal states
  const [showCreateAnnouncement, setShowCreateAnnouncement] = useState(false)
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [showUploadGallery, setShowUploadGallery] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showEditAnnouncement, setShowEditAnnouncement] = useState(false)
  const [showEditEvent, setShowEditEvent] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch all data
      const [announcementsRes, eventsRes, galleryRes, activitiesRes] = await Promise.all([
        fetch("/api/announcements"),
        fetch("/api/events"),
        fetch("/api/gallery"),
        fetch("/api/activities"),
      ])

      const announcements = await announcementsRes.json()
      const events = await eventsRes.json()
      const gallery = await galleryRes.json()
      const activitiesData = await activitiesRes.json()

      // Update stats
      setStats({
        totalAnnouncements: announcements.length,
        totalEvents: events.length,
        totalGalleryItems: gallery.length,
        recentActivities: activitiesData.length,
      })

      // Combine recent content
      const recent: RecentContent[] = [
        ...announcements.slice(0, 3).map((item: any) => ({
          id: item.id,
          title: item.title,
          type: "announcement" as const,
          date: item.date,
          status: item.published ? "Published" : "Draft",
        })),
        ...events.slice(0, 3).map((item: any) => ({
          id: item.id,
          title: item.title,
          type: "event" as const,
          date: item.date,
          status: "Scheduled",
        })),
        ...gallery.slice(0, 2).map((item: any) => ({
          id: item.id,
          title: item.title,
          type: "gallery" as const,
          date: item.date,
          status: "Published",
        })),
      ]

      setRecentContent(recent.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8))
      setActivities(activitiesData.slice(0, 10))
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const handleEdit = async (item: RecentContent) => {
    if (item.type === "announcement") {
      try {
        const response = await fetch(`/api/announcements/${item.id}`)
        const announcement = await response.json()
        setEditingItem(announcement)
        setShowEditAnnouncement(true)
      } catch (error) {
        console.error("Failed to fetch announcement:", error)
      }
    } else if (item.type === "event") {
      try {
        const response = await fetch(`/api/events/${item.id}`)
        const event = await response.json()
        setEditingItem(event)
        setShowEditEvent(true)
      } catch (error) {
        console.error("Failed to fetch event:", error)
      }
    }
  }

  const handleDelete = async (item: RecentContent) => {
    if (!confirm(`Are you sure you want to delete "${item.title}"?`)) return

    try {
      let endpoint = ""
      if (item.type === "announcement") endpoint = `/api/announcements/${item.id}`
      else if (item.type === "event") endpoint = `/api/events/${item.id}`
      else if (item.type === "gallery") endpoint = `/api/gallery/${item.id}`

      const response = await fetch(endpoint, { method: "DELETE" })

      if (response.ok) {
        fetchDashboardData() // Refresh data
      } else {
        alert("Failed to delete item")
      }
    } catch (error) {
      console.error("Failed to delete item:", error)
      alert("Failed to delete item")
    }
  }

  const handleDeleteActivity = async (activityId: number) => {
    if (!confirm("Are you sure you want to delete this activity?")) return

    try {
      const response = await fetch(`/api/activities?id=${activityId}`, { method: "DELETE" })

      if (response.ok) {
        fetchDashboardData() // Refresh data
      } else {
        alert("Failed to delete activity")
      }
    } catch (error) {
      console.error("Failed to delete activity:", error)
      alert("Failed to delete activity")
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
        <div className="container-max">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container-max py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage your school's content, events, and settings from this central dashboard
          </p>
        </div>

        <div className="space-y-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Create new content and manage your site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  onClick={() => setShowCreateAnnouncement(true)}
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-emerald-600 hover:bg-emerald-700"
                >
                  <Plus className="h-6 w-6" />
                  <span>New Announcement</span>
                </Button>
                <Button
                  onClick={() => setShowCreateEvent(true)}
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Calendar className="h-6 w-6" />
                  <span>Add Event</span>
                </Button>
                <Button
                  onClick={() => setShowUploadGallery(true)}
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-purple-600 hover:bg-purple-700"
                >
                  <Camera className="h-6 w-6" />
                  <span>Upload Photos</span>
                </Button>
                <Button
                  onClick={() => setShowSettings(true)}
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-gray-600 hover:bg-gray-700"
                >
                  <Settings className="h-6 w-6" />
                  <span>Site Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Announcements</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">{stats.totalAnnouncements}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  Active content
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.totalEvents}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  Scheduled events
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gallery Items</CardTitle>
                <Camera className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{stats.totalGalleryItems}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  Photos & videos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Activities</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{stats.recentActivities}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  This week
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Content */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Content</CardTitle>
                  <CardDescription>Latest announcements, events, and gallery items</CardDescription>
                </div>
                <Link href="/announcements">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentContent.map((item) => (
                    <div
                      key={`${item.type}-${item.id}`}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge
                            variant={
                              item.type === "announcement" ? "default" : item.type === "event" ? "secondary" : "outline"
                            }
                          >
                            {item.type}
                          </Badge>
                          <Badge variant={item.status === "Published" ? "default" : "secondary"}>{item.status}</Badge>
                        </div>
                        <h4 className="font-medium text-sm line-clamp-1 mb-1">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          disabled={item.type === "gallery"}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(item)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions performed on the site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            activity.type === "announcement"
                              ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400"
                              : activity.type === "event"
                                ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                                : "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400"
                          }`}
                        >
                          {activity.type === "announcement" ? (
                            <FileText className="h-4 w-4" />
                          ) : activity.type === "event" ? (
                            <Calendar className="h-4 w-4" />
                          ) : (
                            <Camera className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>{" "}
                          <span className="text-muted-foreground">
                            {activity.action} {activity.type}
                          </span>{" "}
                          <span className="font-medium">"{activity.title}"</span>
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTimeAgo(activity.timestamp)}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteActivity(activity.id)}
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modals */}
        <CreateAnnouncementModal
          open={showCreateAnnouncement}
          onOpenChange={setShowCreateAnnouncement}
          onSuccess={fetchDashboardData}
        />
        <CreateEventModal open={showCreateEvent} onOpenChange={setShowCreateEvent} onSuccess={fetchDashboardData} />
        <UploadGalleryModal
          open={showUploadGallery}
          onOpenChange={setShowUploadGallery}
          onSuccess={fetchDashboardData}
        />
        <SiteSettingsModal open={showSettings} onOpenChange={setShowSettings} />
        {editingItem && (
          <>
            <EditAnnouncementModal
              open={showEditAnnouncement}
              onOpenChange={setShowEditAnnouncement}
              announcement={editingItem}
              onSuccess={() => {
                fetchDashboardData()
                setEditingItem(null)
              }}
            />
            <EditEventModal
              open={showEditEvent}
              onOpenChange={setShowEditEvent}
              event={editingItem}
              onSuccess={() => {
                fetchDashboardData()
                setEditingItem(null)
              }}
            />
          </>
        )}
      </div>
    </div>
  )
}
