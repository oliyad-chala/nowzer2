export function MapSection() {
  return (
    <section className="bg-gray-50">
      <div className="container-max section-padding">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Us</h2>
          <p className="text-lg text-gray-600">
            Visit our beautiful campus located in the heart of Learning City
          </p>
        </div>
        
        <div className="card overflow-hidden">
          <div className="aspect-video bg-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3344.2698067535134!2d39.266967374147924!3d8.565805296069252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b214931a72305%3A0xf5a7f0f91176726c!2sNowzer%20school%20plc!5e1!3m2!1sen!2set!4v1755190323356!5m2!1sen!2set" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Nowzer School Location"
            />
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Parking</h3>
            <p className="text-gray-600 text-sm">
              Free parking available in our main lot and street parking on Education Street
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Public Transit</h3>
            <p className="text-gray-600 text-sm">
              Bus routes 15, 22, and 34 stop directly in front of the school
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Accessibility</h3>
            <p className="text-gray-600 text-sm">
              Our campus is fully accessible with ramps, elevators, and designated parking
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
