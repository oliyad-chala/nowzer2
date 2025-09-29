"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react"

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

export function Footer() {
  const [settings, setSettings] = useState<SiteSettings>({
    schoolName: "Nowzer",
    tagline: "Excellence in Education",
    address: "123 Education Street, Learning City, LC 12345",
    phone: "(555) 123-4567",
    email: "info@nowzer.edu",
    socialMedia: {
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
      linkedin: "",
      tiktok: "",
    },
  })

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch("/api/settings")
        if (response.ok) {
          const data = await response.json()
          setSettings(data)
        }
      } catch (error) {
        console.error("Error loading settings:", error)
      }
    }

    loadSettings()

    // Refresh settings every 30 seconds to catch any updates
    const interval = setInterval(loadSettings, 30000)
    return () => clearInterval(interval)
  }, [])
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-emerald-600" />
              <div>
                <h3 className="font-bold text-lg">{settings.schoolName}</h3>
                <p className="text-sm text-muted-foreground">{settings.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Nurturing young minds and building tomorrow's leaders through quality education and character development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-muted-foreground hover:text-foreground transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/announcements" className="text-muted-foreground hover:text-foreground transition-colors">
                  Announcements
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{settings.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{settings.phone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{settings.email}</span>
              </li>
            </ul>
          </div>

          {/* Admin & Social */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="space-y-4">
              <div className="flex space-x-2">
                {settings.socialMedia.facebook && (
                  <Link href={settings.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Facebook className="h-4 w-4" />
                  </Link>
                )}
                {settings.socialMedia.twitter && (
                  <Link href={settings.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
                    <Twitter className="h-4 w-4" />
                  </Link>
                )}
                {settings.socialMedia.instagram && (
                  <Link href={settings.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                    <Instagram className="h-4 w-4" />
                  </Link>
                )}
                {settings.socialMedia.youtube && (
                  <Link href={settings.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <Youtube className="h-4 w-4" />
                  </Link>
                )}
                {settings.socialMedia.linkedin && (
                  <Link href={settings.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </Link>
                )}
                {settings.socialMedia.tiktok && (
                  <Link href={settings.socialMedia.tiktok} target="_blank" rel="noopener noreferrer" className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                    <span className="text-xs font-bold">TikTok</span>
                  </Link>
                )}
              </div>
              <div className="pt-2 border-t">
                <Link href="/admin" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Admin Portal
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Nowzer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
