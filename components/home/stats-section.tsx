'use client'

import { useEffect, useState } from 'react'
import { Users, GraduationCap, Award, BookOpen, Trophy, Heart } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: 1200,
    label: 'Happy Students',
    suffix: '+',
    color: 'text-blue-600'
  },
  {
    icon: GraduationCap,
    value: 95,
    label: 'Graduation Rate',
    suffix: '%',
    color: 'text-green-600'
  },
  {
    icon: BookOpen,
    value: 40,
    label: 'Expert Teachers',
    suffix: '+',
    color: 'text-purple-600'
  },
  {
    icon: Award,
    value: 25,
    label: 'Awards Won',
    suffix: '+',
    color: 'text-amber-600'
  },
  {
    icon: Trophy,
    value: 15,
    label: 'Championships',
    suffix: '+',
    color: 'text-red-600'
  },
  {
    icon: Heart,
    value: 99,
    label: 'Parent Satisfaction',
    suffix: '%',
    color: 'text-pink-600'
  }
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = value / steps
    const stepDuration = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      setCount(Math.min(Math.floor(increment * currentStep), value))
      
      if (currentStep >= steps) {
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span className="text-4xl md:text-5xl font-bold">
      {count}{suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="section-padding bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Achievements</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Numbers that reflect our commitment to excellence in education and student development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 card hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className={`p-4 rounded-full bg-muted ${stat.color}`}>
                  <stat.icon className="h-8 w-8" />
                </div>
              </div>
              <div className={`${stat.color} mb-2`}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
