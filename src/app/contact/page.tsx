"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronDown, MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Twitter } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(2, {
    message: "Subject is required.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await form.trigger();
      if (!form.formState.isValid) {
        setIsSubmitting(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Format the email content
      const emailContent = `
        New Contact Form Submission
        
        Name: ${values.name}
        Email: ${values.email}
        Subject: ${values.subject}
        Message:
        ${values.message}
        
        Sent on: ${new Date().toLocaleString()}
      `;

      console.log("Sending email to bizlog50@gmail.com:");
      console.log(emailContent);

      toast({
        title: "Message Sent",
        description: "Your message has been sent to the restaurant. We'll get back to you soon.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
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
              <Link href="/about" className="text-sm font-medium hover:text-orange-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-orange-600 transition-colors">
                Contact
              </Link>
              <Button variant="outline" className="ml-4">Book a Table</Button>
            </div>
            <Button variant="ghost" className="md:hidden">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center text-amber-800 mb-8">Contact Us</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">Get in Touch</h2>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Input
                      type="text"
                      placeholder="Your Name"
                      className={`w-full px-4 py-3 text-sm border border-white rounded-lg focus:outline-none focus:border-orange-300 focus:ring focus:ring-orange-300   ${
                        form.formState.errors.name ? 'border-red-500' : ''
                      }`}
                      {...form.register("name")}
                    />
                    {form.formState.errors.name && (
                      <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className={`w-full px-4 py-3 text-sm border border-white rounded-lg focus:ring-0 focus:border-gray-200 ${
                        form.formState.errors.email ? 'border-red-500' : ''
                      }`}
                      {...form.register("email")}
                    />
                    {form.formState.errors.email && (
                      <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Input
                    type="text"
                    placeholder="Subject"
                    className={`w-full px-4 py-3 text-sm border border-white rounded-lg focus:ring-0 focus:border-gray-200 ${
                      form.formState.errors.subject ? 'border-red-500' : ''
                    }`}
                    {...form.register("subject")}
                  />
                  {form.formState.errors.subject && (
                    <p className="text-xs text-red-500">{form.formState.errors.subject.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Textarea
                    placeholder="Your Message"
                    className={`w-full h-32 px-4 py-3 text-sm border border-white rounded-lg focus:ring-0 focus:border-white resize-none ${
                      form.formState.errors.message ? 'border-red-500' : ''
                    }`}
                    {...form.register("message")}
                  />
                  {form.formState.errors.message && (
                    <p className="text-xs text-red-500">{form.formState.errors.message.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#F15A2B] hover:bg-[#d94d22] text-white py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center space-x-2"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  <Send className="h-4 w-4 ml-2" />
                </Button>
              </form>
            </div>
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-amber-800">Contact Information</h2>
              <div className="space-y-6">
                {[
                  { icon: MapPin, text: "123 Spice Lane, Colombo, Sri Lanka" },
                  { icon: Phone, text: "+94 11 234 5678" },
                  { icon: Mail, text: "info@spicebowl.com" },
                  { icon: Clock, text: "Mon-Sun: 10:00 AM - 10:00 PM" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="bg-white p-2 rounded-full">
                      <item.icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <p className="text-amber-800 text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-amber-800">Follow Us</h3>
                <div className="flex space-x-4">
                  {[Facebook, Instagram, Twitter].map((Icon, index) => (
                    <a 
                      key={index} 
                      href="#" 
                      className="bg-white p-2.5 rounded-full hover:bg-orange-100 transition duration-300"
                    >
                      <Icon className="w-5 h-5 text-orange-500" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="bg-amber-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-sm">Authentic Sri Lankan cuisine in the heart of the city.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-sm hover:text-orange-300">Home</Link></li>
                <li><Link href="/menu" className="text-sm hover:text-orange-300">Menu</Link></li>
                <li><Link href="/about" className="text-sm hover:text-orange-300">About</Link></li>
                <li><Link href="/contact" className="text-sm hover:text-orange-300">Contact</Link></li>
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
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-r-none focus:ring-0 focus:border-orange-300"
                />
                <Button type="submit" className="rounded-l-none bg-orange-600 hover:bg-orange-700">
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