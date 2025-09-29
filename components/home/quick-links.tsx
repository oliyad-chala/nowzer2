import Link from 'next/link'
import { Calendar, Camera, FileText, Users, Phone, Award } from 'lucide-react'

const quickLinks = [
  {
    title: 'Events',
    description: 'Upcoming school events and activities',
    href: '/events',
    icon: Calendar,
    color: 'bg-blue-500'
  },
  {
    title: 'Gallery',
    description: 'Photos and videos from school life',
    href: '/gallery',
    icon: Camera,
    color: 'bg-purple-500'
  },
  {
    title: 'Announcements',
    description: 'Latest news and updates',
    href: '/announcements',
    icon: FileText,
    color: 'bg-green-500'
  },
  {
    title: 'About Us',
    description: 'Learn about our school and faculty',
    href: '/about',
    icon: Users,
    color: 'bg-amber-500'
  },
  {
    title: 'Contact',
    description: 'Get in touch with us',
    href: '/contact',
    icon: Phone,
    color: 'bg-red-500'
  },
  {
    title: 'Admissions',
    description: 'Join our school community',
    href: '/contact',
    icon: Award,
    color: 'bg-indigo-500'
  }
]

export function QuickLinks() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Access</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find what you're looking for quickly with our convenient navigation links
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => (
            <Link
              key={link.title}
              href={link.href}
              className="group card p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start space-x-4">
                <div className={`${link.color} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                  <link.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {link.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
