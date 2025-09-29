import { Award, Users, Lightbulb, Globe, BookOpen, Shield } from 'lucide-react'

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for the highest standards in academics, character, and service.',
    color: 'bg-blue-500'
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We act with honesty, fairness, and moral courage in all we do.',
    color: 'bg-green-500'
  },
  {
    icon: Users,
    title: 'Respect',
    description: 'We value diversity and treat everyone with dignity and kindness.',
    color: 'bg-purple-500'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We embrace creativity and new ideas to enhance learning.',
    color: 'bg-amber-500'
  },
  {
    icon: Globe,
    title: 'Global Citizenship',
    description: 'We prepare students to be responsible members of the global community.',
    color: 'bg-red-500'
  },
  {
    icon: BookOpen,
    title: 'Lifelong Learning',
    description: 'We foster curiosity and a passion for continuous growth.',
    color: 'bg-indigo-500'
  }
]

export function SchoolValues() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These fundamental principles guide our decisions and shape our school culture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="card p-6 hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`${value.color} p-3 rounded-lg w-fit mb-4`}>
                <value.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
