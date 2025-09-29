import { Metadata } from 'next'
import { ContactForm } from '@/components/contact/contact-form'
import { ContactInfo } from '@/components/contact/contact-info'
import { MapSection } from '@/components/contact/map-section'

export const metadata: Metadata = {
  title: 'Contact Us - Oakwood Academy',
  description: 'Get in touch with Oakwood Academy. Find our location, contact information, and send us a message.',
}

export default function ContactPage() {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white section-padding">
        <div className="container-max">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            We'd love to hear from you. Get in touch with us for any questions or inquiries.
          </p>
        </div>
      </div>
      
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
      
      <MapSection />
    </div>
  )
}
