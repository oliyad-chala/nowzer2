import { HeroSection } from "@/components/home/hero-section"
import { QuickLinks } from "@/components/home/quick-links"
import { FeaturedAnnouncements } from "@/components/home/featured-announcements"
import { UpcomingEvents } from "@/components/home/upcoming-events"
import { GalleryPreview } from "@/components/home/gallery-preview"
import { StatsSection } from "@/components/home/stats-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickLinks />
      <FeaturedAnnouncements />
      <UpcomingEvents />
      <GalleryPreview />
      <StatsSection />
    </>
  )
}
