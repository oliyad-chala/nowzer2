import Image from 'next/image'
import { Mail, Phone, Award, BookOpen } from 'lucide-react'

const teachers = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    position: 'Principal',
    department: 'Administration',
    image: '/teacher-principal-woman.png',
    email: 's.johnson@oakwoodacademy.edu',
    phone: '(555) 123-4567',
    bio: 'Dr. Johnson has been leading Oakwood Academy for over 10 years. She holds a Ph.D. in Educational Leadership and is passionate about creating an inclusive learning environment.',
    qualifications: ['Ph.D. Educational Leadership', 'M.Ed. Curriculum & Instruction', '20+ years in education'],
    achievements: ['Principal of the Year 2022', 'Educational Innovation Award']
  },
  {
    id: 2,
    name: 'Mr. David Chen',
    position: 'Head of Science Department',
    department: 'Science',
    image: '/teacher-science-man.png',
    email: 'd.chen@oakwoodacademy.edu',
    phone: '(555) 123-4568',
    bio: 'Mr. Chen brings 15 years of experience in science education. He specializes in making complex scientific concepts accessible and engaging for students.',
    qualifications: ['M.S. Chemistry', 'B.Ed. Science Education', 'Certified Lab Safety Instructor'],
    achievements: ['Science Teacher of the Year', 'Published researcher in education journals']
  },
  {
    id: 3,
    name: 'Ms. Emily Rodriguez',
    position: 'English Literature Teacher',
    department: 'English',
    image: '/teacher-english-woman.png',
    email: 'e.rodriguez@oakwoodacademy.edu',
    phone: '(555) 123-4569',
    bio: 'Ms. Rodriguez is passionate about literature and creative writing. She has helped numerous students discover their love for reading and writing.',
    qualifications: ['M.A. English Literature', 'B.A. Creative Writing', 'Certified Writing Coach'],
    achievements: ['Outstanding Educator Award', 'Published poet and author']
  },
  {
    id: 4,
    name: 'Coach Michael Thompson',
    position: 'Physical Education & Athletics Director',
    department: 'Athletics',
    image: '/teacher-coach-man.png',
    email: 'm.thompson@oakwoodacademy.edu',
    phone: '(555) 123-4570',
    bio: 'Coach Thompson has led our athletics program to numerous championships while emphasizing sportsmanship and character development.',
    qualifications: ['M.S. Sports Science', 'B.S. Physical Education', 'Certified Athletic Trainer'],
    achievements: ['Coach of the Year 3x', 'State Championship titles']
  },
  {
    id: 5,
    name: 'Mrs. Lisa Park',
    position: 'Mathematics Department Head',
    department: 'Mathematics',
    image: '/teacher-math-woman.png',
    email: 'l.park@oakwoodacademy.edu',
    phone: '(555) 123-4571',
    bio: 'Mrs. Park makes mathematics accessible and enjoyable for students of all levels. She specializes in innovative teaching methods and technology integration.',
    qualifications: ['M.Ed. Mathematics Education', 'B.S. Applied Mathematics', 'Technology Integration Specialist'],
    achievements: ['Excellence in Teaching Award', 'Math Olympiad Coach']
  },
  {
    id: 6,
    name: 'Mr. James Wilson',
    position: 'History & Social Studies Teacher',
    department: 'Social Studies',
    image: '/teacher-history-man.png',
    email: 'j.wilson@oakwoodacademy.edu',
    phone: '(555) 123-4572',
    bio: 'Mr. Wilson brings history to life through engaging storytelling and interactive lessons. He encourages critical thinking about past and present events.',
    qualifications: ['M.A. History', 'B.A. Political Science', 'Museum Education Certificate'],
    achievements: ['History Teacher Excellence Award', 'Historical Society Recognition']
  }
]

export function TeacherProfiles() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Faculty
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our dedicated educators are committed to inspiring and guiding every student toward success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher, index) => (
            <div
              key={teacher.id}
              className="card p-6 hover:shadow-xl transition-shadow duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-center mb-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={teacher.image || "/placeholder.svg"}
                    alt={teacher.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {teacher.name}
                </h3>
                <p className="text-blue-700 font-medium mb-1">
                  {teacher.position}
                </p>
                <p className="text-gray-600 text-sm">
                  {teacher.department}
                </p>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {teacher.bio}
              </p>

              <div className="space-y-3 mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-2 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Qualifications
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {teacher.qualifications.map((qual, idx) => (
                      <li key={idx}>• {qual}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-2 flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    Achievements
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {teacher.achievements.map((achievement, idx) => (
                      <li key={idx}>• {achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center text-xs text-gray-600">
                  <Mail className="h-3 w-3 mr-2" />
                  <a href={`mailto:${teacher.email}`} className="hover:text-blue-700">
                    {teacher.email}
                  </a>
                </div>
                <div className="flex items-center text-xs text-gray-600">
                  <Phone className="h-3 w-3 mr-2" />
                  <span>{teacher.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
