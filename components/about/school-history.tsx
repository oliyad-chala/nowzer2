import Image from 'next/image'

export function SchoolHistory() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                Founded in 1985, Oakwood Academy began as a small community school with just 150 students and a vision to provide exceptional education in a nurturing environment.
              </p>
              <p>
                Over the decades, we have grown into a premier educational institution serving over 1,200 students from kindergarten through grade 12. Our commitment to academic excellence, character development, and community service has remained unwavering.
              </p>
              <p>
                Today, Oakwood Academy stands as a beacon of educational innovation, combining traditional values with modern teaching methods to prepare students for success in an ever-changing world.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700">1985</div>
                <div className="text-sm text-gray-600">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700">1,200+</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700">95%</div>
                <div className="text-sm text-gray-600">College Bound</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <Image
              src="/school-building-historic.png"
              alt="Oakwood Academy Historic Building"
              width={600}
              height={400}
              className="rounded-xl shadow-lg"
            />
            <div className="absolute -bottom-6 -left-6 bg-amber-400 text-white p-4 rounded-lg shadow-lg">
              <div className="text-2xl font-bold">39</div>
              <div className="text-sm">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
