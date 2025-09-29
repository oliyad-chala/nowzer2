import { Metadata } from 'next'
import { SchoolHistory } from '@/components/about/school-history'
import { MissionVision } from '@/components/about/mission-vision'
import { TeacherProfiles } from '@/components/about/teacher-profiles'
import { SchoolValues } from '@/components/about/school-values'

export const metadata: Metadata = {
  title: 'About Us - Oakwood Academy',
  description: 'Learn about Oakwood Academy\'s history, mission, vision, and our dedicated faculty members.',
}

export default function AboutPage() {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white section-padding">
        <div className="container-max">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Oakwood Academy</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Excellence in education since 1985. Discover our story, mission, and the dedicated people who make our school special.
          </p>
        </div>
      </div>
      
      <SchoolHistory />
      <MissionVision />
      <SchoolValues />
      <TeacherProfiles />
    </div>
  )
}
