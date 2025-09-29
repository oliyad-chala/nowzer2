"use client"

import { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react'

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

export function ContactInfo() {
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
  }, [])
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
        <p className="text-lg text-gray-600 mb-8">
          We're here to help and answer any questions you might have. We look forward to hearing from you.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <MapPin className="h-6 w-6 text-blue-700" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
            <p className="text-gray-600">
              {settings.address}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Phone className="h-6 w-6 text-blue-700" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
            <p className="text-gray-600">
              {settings.phone}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Mail className="h-6 w-6 text-blue-700" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
            <p className="text-gray-600">
              {settings.email}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Clock className="h-6 w-6 text-blue-700" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Office Hours</h3>
            <p className="text-gray-600">
              Monday - Friday: 8:00 AM - 5:00 PM<br />
              Saturday: 9:00 AM - 2:00 PM<br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t">
        <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
        <div className="flex space-x-4">
          {settings.socialMedia.facebook && (
            <a href={settings.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="bg-blue-100 p-3 rounded-lg hover:bg-blue-200 transition-colors">
              <Facebook className="h-5 w-5 text-blue-700" />
            </a>
          )}
          {settings.socialMedia.twitter && (
            <a href={settings.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="bg-blue-100 p-3 rounded-lg hover:bg-blue-200 transition-colors">
              <Twitter className="h-5 w-5 text-blue-700" />
            </a>
          )}
          {settings.socialMedia.instagram && (
            <a href={settings.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="bg-blue-100 p-3 rounded-lg hover:bg-blue-200 transition-colors">
              <Instagram className="h-5 w-5 text-blue-700" />
            </a>
          )}
          {settings.socialMedia.youtube && (
            <a href={settings.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="bg-blue-100 p-3 rounded-lg hover:bg-blue-200 transition-colors">
              <Youtube className="h-5 w-5 text-blue-700" />
            </a>
          )}
          {settings.socialMedia.linkedin && (
            <a href={settings.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="bg-blue-100 p-3 rounded-lg hover:bg-blue-200 transition-colors">
              <Linkedin className="h-5 w-5 text-blue-700" />
            </a>
          )}
          {settings.socialMedia.tiktok && (
            <a href={settings.socialMedia.tiktok} target="_blank" rel="noopener noreferrer" className="bg-blue-100 p-3 rounded-lg hover:bg-blue-200 transition-colors">
              <span className="text-xs font-bold text-blue-700">TikTok</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
