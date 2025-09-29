import { Target, Eye, Heart } from 'lucide-react'

export function MissionVision() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Mission & Vision
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Guiding principles that shape everything we do at Oakwood Academy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-8 text-center">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Target className="h-8 w-8 text-blue-700" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To provide a comprehensive, innovative education that empowers students to achieve academic excellence, develop strong character, and become responsible global citizens.
            </p>
          </div>

          <div className="card p-8 text-center">
            <div className="bg-amber-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Eye className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To be the leading educational institution that inspires lifelong learning, fosters creativity, and prepares students to thrive in a rapidly evolving world.
            </p>
          </div>

          <div className="card p-8 text-center">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Heart className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Values</h3>
            <p className="text-gray-600 leading-relaxed">
              Excellence, integrity, respect, innovation, and community service form the foundation of our educational philosophy and daily practices.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
