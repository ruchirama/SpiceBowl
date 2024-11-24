"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronDown, ChevronLeft, ChevronRight, Star } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const menuItems = [
  {
    name: "Kottu Roti",
    description: "Chopped roti stir-fried with vegetables, eggs, and your choice of meat",
    price: 12.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Hoppers",
    description: "Bowl-shaped pancake made from fermented rice batter and coconut milk",
    price: 8.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Chicken Curry",
    description: "Tender chicken cooked in a rich, spicy curry sauce",
    price: 14.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Lamprais",
    description: "Rice, meat, and accompaniments wrapped in a banana leaf and baked",
    price: 16.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "String Hoppers",
    description: "Steamed rice noodles served with curry and coconut sambol",
    price: 10.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Deviled Prawns",
    description: "Spicy stir-fried prawns with bell peppers and onions",
    price: 18.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Pol Sambol",
    description: "Spicy coconut relish with onions, chili, and lime",
    price: 6.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Dhal Curry",
    description: "Creamy lentil curry cooked with coconut milk and spices",
    price: 9.99,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    { name: "Sarah L.", content: "The flavors at SpiceBowl are absolutely incredible! It's like taking a culinary journey through Sri Lanka." },
    { name: "Michael R.", content: "I've never had Sri Lankan food before, but SpiceBowl has made me a convert. The Kottu Roti is to die for!" },
    { name: "Priya K.", content: "As a Sri Lankan, I can vouch for the authenticity of SpiceBowl's dishes. It's a taste of home away from home." },
  ]

  const scrollMenu = (direction: 'left' | 'right') => {
    if (menuRef.current) {
      const scrollAmount = 300
      if (direction === 'left') {
        menuRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      } else {
        menuRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      {/* Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-6xl">
        <div className="backdrop-blur-md bg-white/75 shadow-lg rounded-full py-2 px-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-orange-600">
              Spice<span className="text-amber-800">Bowl</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium text-orange-600 transition-colors">
                Home
              </Link>
              <Link href="/menu" className="text-sm font-medium hover:text-orange-600 transition-colors">
                Menu
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-orange-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-orange-600 transition-colors">
                Contact
              </Link>
              <Link href="/book-a-table">
                <Button
                  variant="outline"
                  className="w-fit text-white bg-orange-600 hover:bg-orange-700 hover:text-white"
                >
                  Book a Table
                </Button>
              </Link>
            </div>
            <Button 
              variant="ghost" 
              className="md:hidden"
              aria-label="Toggle menu"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold text-amber-800 mb-6"
          >
            Experience the Flavors of Sri Lanka
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
          >
            Indulge in authentic Sri Lankan cuisine, where every dish tells a story of tradition and taste.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/menu">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                Explore Our Menu
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-20 px-4 bg-amber-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-amber-800 mb-12">Our Signature Dishes</h2>
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
              onClick={() => scrollMenu('left')}
              aria-label="Scroll menu left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div
              ref={menuRef}
              className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0"
                >
                  <Card className="w-72 overflow-hidden">
                    <CardContent className="p-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={288}
                        height={216}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2 h-12 overflow-hidden">{item.description}</p>
                        <p className="font-bold text-amber-800">${item.price.toFixed(2)}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
              onClick={() => scrollMenu('right')}
              aria-label="Scroll menu right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-800 mb-12">What Our Customers Say</h2>
          <div className="max-w-2xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: activeTestimonial === index ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className={`${activeTestimonial === index ? 'block' : 'hidden'}`}
              >
                <p className="text-xl italic text-gray-700 mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                <p className="font-semibold text-amber-800">{testimonial.name}</p>
              </motion.div>
            ))}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${
                    activeTestimonial === index ? 'bg-orange-600' : 'bg-gray-300'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Sri Lankan Cuisine?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join us for a culinary journey through the flavors of Sri Lanka. Book your table now and prepare your taste buds for an unforgettable experience.</p>
          <Link href="/book-a-table">
            <Button size="lg" variant="outline" className="text-amber-800 font-bold border-white hover:bg-white hover:text-orange-600">
              Book a Table
            </Button>
          </Link>
        </div>
      </section>

      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-800 to-orange-700 text-white py-8 rounded-t-3xl mt-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-sm">Authentic Sri Lankan cuisine in the heart of the city.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-sm">123 Spice Lane, Colombo, Sri Lanka</p>
              <p className="text-sm">Phone: (94) 11-234-5678</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Hours</h3>
              <p className="text-sm">Mon-Fri: 11am - 10pm</p>
              <p className="text-sm">Sat-Sun: 10am - 11pm</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-orange-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="text-white hover:text-orange-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="text-white hover:text-orange-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center text-sm">
            <p>&copy; 2024 SpiceBowl. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}