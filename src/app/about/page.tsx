"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Utensils, Users, Clock, Award, Menu, X, ShoppingCart } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: <Utensils className="h-8 w-8 text-orange-500" />,
    title: "Authentic Cuisine",
    description: "Experience the true flavors of Sri Lanka with our traditional recipes and cooking methods."
  },
  {
    icon: <Users className="h-8 w-8 text-orange-500" />,
    title: "Family-Owned",
    description: "Our restaurant has been family-owned and operated for three generations, ensuring quality and consistency."
  },
  {
    icon: <Clock className="h-8 w-8 text-orange-500" />,
    title: "Fresh Ingredients",
    description: "We source the freshest, locally-grown ingredients to bring you the best quality dishes every day."
  },
  {
    icon: <Award className="h-8 w-8 text-orange-500" />,
    title: "Award-Winning",
    description: "Recognized for our excellence in Sri Lankan cuisine with multiple local and national awards."
  }
]

const teamMembers = [
  {
    name: "Amara Silva",
    role: "Head Chef",
    image: "/placeholder.svg?height=400&width=400",
    bio: "With over 20 years of experience, Amara brings the authentic flavors of Sri Lanka to every dish."
  },
  {
    name: "Raj Patel",
    role: "Sous Chef",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Raj's innovative approach to traditional recipes adds a unique twist to our menu."
  },
  {
    name: "Mala Fernando",
    role: "Restaurant Manager",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Mala ensures that every guest has an unforgettable dining experience at SpiceBowl."
  }
]

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMenuOpen(false)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-red-100">
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-6xl">
        <div className="backdrop-blur-md bg-white/75 shadow-lg rounded-full py-2 px-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-orange-600">
              Spice<span className="text-amber-800">Bowl</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-orange-600 transition-colors">
                Home
              </Link>
              <Link href="/menu" className="text-sm font-medium hover:text-orange-600 transition-colors">
                Menu
              </Link>
              <Link href="/about" className="text-sm font-medium text-orange-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-orange-600 transition-colors">
                Contact
              </Link>
              <Button variant="outline" className="ml-4">
                Book a Table
              </Button>
            </div>
            <Button variant="ghost" className="relative md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <Button variant="ghost" className="relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <Link href="/" className="text-2xl font-medium hover:text-orange-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/menu" className="text-2xl font-medium hover:text-orange-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Menu
              </Link>
              <Link href="/about" className="text-2xl font-medium text-orange-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link href="/contact" className="text-2xl font-medium hover:text-orange-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              <Button variant="outline" onClick={() => setIsMenuOpen(false)}>
                Book a Table
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-center text-amber-800 mb-8">About SpiceBowl</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Bringing the authentic flavors of Sri Lanka to your table since 1985. Our family-owned restaurant is committed to providing an unforgettable culinary experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col lg:flex-row gap-12 mb-20"
        >
          <div className="lg:w-1/2">
            <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Restaurant Interior"
                width={600}
                height={400}
                className="w-full h-[400px] object-cover"
              />
              <CardContent className="p-6 bg-gradient-to-br from-white to-orange-50">
                <h2 className="text-3xl font-semibold mb-4 text-amber-800">Our Story</h2>
                <p className="text-gray-700">
                  Founded in 1985 by the Perera family, SpiceBowl has been serving authentic Sri Lankan cuisine for over three decades. What started as a small family-run eatery has grown into one of the city&apos;s most beloved restaurants, known for its warm hospitality and mouthwatering dishes.
                </p>
                <p className="text-gray-700 mt-4">
                  Our recipes have been passed down through generations, preserving the true essence of Sri Lankan flavors. We take pride in using only the freshest, locally-sourced ingredients to create our signature dishes, ensuring that every bite is a journey through the rich culinary landscape of Sri Lanka.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="lg:w-1/2 space-y-6">
            <motion.div
              className="grid gap-6 md:grid-cols-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {features.map((feature, index) => (
                <Card key={index} className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 bg-gradient-to-br from-white to-orange-50 h-full flex flex-col">
                    <div className="bg-orange-100 rounded-full p-2 w-fit mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-amber-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-700 flex-grow">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-amber-800 mb-12">Meet Our Team</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6 bg-gradient-to-br from-white to-orange-50">
                  <h3 className="text-xl font-semibold text-amber-800 mb-2">{member.name}</h3>
                  <p className="text-orange-600 mb-4">{member.role}</p>
                  <p className="text-gray-700">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </main>

      <footer className="bg-gradient-to-r from-amber-800 to-orange-700 text-white py-8 rounded-t-3xl mt-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-sm">Authentic Sri Lankan cuisine in the heart of the city.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm hover:text-orange-300 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/menu" className="text-sm hover:text-orange-300 transition-colors">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm hover:text-orange-300 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm hover:text-orange-300 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-sm">123 Spice Lane, Colombo, Sri Lanka</p>
              <p className="text-sm">Phone: (94) 11-234-5678</p>
              <p className="text-sm">Email: info@spicebowl.lk</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-sm mb-2">Subscribe for updates and special offers</p>
              <form className="flex">
                <input type="email" placeholder="Your email" className="rounded-l-lg focus:ring-0 focus:border-orange-300 w-full" />
                <Button type="submit" className="rounded-r-lg bg-orange-600 hover:bg-orange-700 transition-colors">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; 2024 SpiceBowl. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}