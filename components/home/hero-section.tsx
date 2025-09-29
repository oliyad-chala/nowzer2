"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Award, BookOpen, Calendar } from "lucide-react"

export function HeroSection() {
  const heroData = {
    title: "Welcome to Nowzer",
    subtitle: "Excellence in Education Since 1985",
    description:
      "Nurturing young minds with innovative teaching methods, state-of-the-art facilities, and a commitment to academic excellence.",
    image: "/main.jpg",
    cta: "Discover Our Programs",
    ctaLink: "/about",
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with much darker overlay for perfect text readability */}
      <div className="absolute inset-0 bg-black/85"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/85 to-black/95"></div>
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={heroData.image || "/placeholder.svg"}
          alt="Nowzer"
          fill
          className="object-cover brightness-50 contrast-100"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-max text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6 shadow-lg">
            <Award className="h-4 w-4 mr-2 text-emerald-300" />
            <span className="text-sm font-medium text-white">Award-Winning Education</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-white drop-shadow-2xl">{heroData.title}</span>
            <span className="block text-emerald-200 text-2xl md:text-3xl lg:text-4xl font-medium mt-2 drop-shadow-lg">
              {heroData.subtitle}
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            {heroData.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href={heroData.ctaLink}>
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {heroData.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/events">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold rounded-full backdrop-blur-sm bg-transparent"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Upcoming Events
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-emerald-200 mr-2 drop-shadow-lg" />
                <span className="text-3xl font-bold text-white drop-shadow-lg">850+</span>
              </div>
              <p className="text-white font-medium drop-shadow-lg">Students</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="h-6 w-6 text-emerald-200 mr-2 drop-shadow-lg" />
                <span className="text-3xl font-bold text-white drop-shadow-lg">50+</span>
              </div>
              <p className="text-white font-medium drop-shadow-lg">Expert Teachers</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-6 w-6 text-emerald-200 mr-2 drop-shadow-lg" />
                <span className="text-3xl font-bold text-white drop-shadow-lg">25+</span>
              </div>
              <p className="text-white font-medium drop-shadow-lg">Awards Won</p>
            </div>
          </div>
        </div>
      </div>



      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
