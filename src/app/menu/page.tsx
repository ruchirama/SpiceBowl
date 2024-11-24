"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ShoppingCart, X, Minus, Plus, CreditCard, Search, Utensils, Flame, Coffee, IceCream, Sandwich } from 'lucide-react';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  type: string;
  spiceLevel: number;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Kottu Roti",
    description: "Chopped roti stir-fried with vegetables, eggs, and your choice of meat",
    price: 12.99,
    image: "/placeholder.svg?height=200&width=200",
    type: "Main Course",
    spiceLevel: 2,
  },
  {
    id: 2,
    name: "Lamprais",
    description: "Rice, meat, and accompaniments wrapped in banana leaf and baked",
    price: 15.99,
    image: "/placeholder.svg?height=200&width=200",
    type: "Main Course",
    spiceLevel: 1,
  },
  {
    id: 3,
    name: "Hoppers",
    description: "Bowl-shaped pancake made from fermented rice batter and coconut milk",
    price: 8.99,
    image: "/placeholder.svg?height=200&width=200",
    type: "Appetizer",
    spiceLevel: 1,
  },
  {
    id: 4,
    name: "Pol Sambol",
    description: "Spicy coconut relish with chili peppers, onions, and lime juice",
    price: 5.99,
    image: "/placeholder.svg?height=200&width=200",
    type: "Side Dish",
    spiceLevel: 3,
  },
  {
    id: 5,
    name: "Dhal Curry",
    description: "Creamy lentil curry cooked with coconut milk and spices",
    price: 9.99,
    image: "/placeholder.svg?height=200&width=200",
    type: "Main Course",
    spiceLevel: 2,
  },
  {
    id: 6,
    name: "Mango Lassi",
    description: "Refreshing yogurt-based drink with mango and a hint of cardamom",
    price: 4.99,
    image: "/placeholder.svg?height=200&width=200",
    type: "Beverage",
    spiceLevel: 0,
  },
  {
    id: 7,
    name: "Deviled Prawns",
    description: "Spicy stir-fried prawns with bell peppers and onions",
    price: 16.99,
    image: "/placeholder.svg?height=200&width=200",
    type: "Main Course",
    spiceLevel: 3,
  },
  {
    id: 8,
    name: "Watalappam",
    description: "Traditional coconut custard pudding with palm sugar and cashews",
    price: 7.99,
    image: "/placeholder.svg?height=200&width=200",
    type: "Dessert",
    spiceLevel: 0,
  },
]

export default function Page() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState(0)
  const [customerInfo, setCustomerInfo] = useState({ name: "", email: "", phone: "" })
  const [diningPreference, setDiningPreference] = useState("dine-in")
  const [mealType, setMealType] = useState("all")
  const [spiceLevel, setSpiceLevel] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      )
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id)
    } else {
      setCart(cart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  }

  const handleCheckout = () => {
    // Placeholder for checkout logic
    toast({
      title: "Order Placed",
      description: "Your order has been successfully placed!",
    })
    setCart([])
    setIsCartOpen(false)
    setCheckoutStep(0)
  }

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesMealType = mealType === "all" || item.type === mealType
    const matchesSpiceLevel = spiceLevel === "all" || 
                              (spiceLevel === "Mild" && item.spiceLevel <= 1) ||
                              (spiceLevel === "Medium" && item.spiceLevel === 2) ||
                              (spiceLevel === "Hot" && item.spiceLevel >= 3)
    return matchesSearch && matchesMealType && matchesSpiceLevel
  })

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

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
              <Button variant="outline" className="ml-4">
                Book a Table
              </Button>
            </div>
            <Button variant="ghost" className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-center text-amber-800 mb-8">Our Menu</h1>
        <div className="mb-8 space-y-4">
          <div className="relative w-full max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-wrap items-center gap-4 justify-center">
            <div className="flex items-center space-x-2">
              <span className="bg-orange-100 p-2 rounded-full">
                <Utensils className="text-orange-500 w-5 h-5" />
              </span>
              <Select value={mealType} onValueChange={setMealType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Meals" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center">
                      <Utensils className="mr-2 h-4 w-4 text-orange-500" />
                      All Meals
                    </div>
                  </SelectItem>
                  <SelectItem value="Appetizer">
                    <div className="flex items-center">
                      <Sandwich className="mr-2 h-4 w-4 text-green-500" />
                      Appetizers
                    </div>
                  </SelectItem>
                  <SelectItem value="Main Course">
                    <div className="flex items-center">
                      <Utensils className="mr-2 h-4 w-4 text-blue-500" />
                      Main Courses
                    </div>
                  </SelectItem>
                  <SelectItem value="Side Dish">
                    <div className="flex items-center">
                      <Utensils className="mr-2 h-4 w-4 text-purple-500" />
                      Side Dishes
                    </div>
                  </SelectItem>
                  <SelectItem value="Beverage">
                    <div className="flex items-center">
                      <Coffee className="mr-2 h-4 w-4 text-brown-500" />
                      Beverages
                    </div>
                  </SelectItem>
                  <SelectItem value="Dessert">
                    <div className="flex items-center">
                      <IceCream className="mr-2 h-4 w-4 text-pink-500" />
                      Desserts
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-red-100 p-2 rounded-full">
                <Flame className="text-red-500 w-5 h-5" />
              </span>
              <Select value={spiceLevel} onValueChange={setSpiceLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Spice Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center">
                      <Flame className="mr-2 h-4 w-4 text-gray-500" />
                      All Spice Levels
                    </div>
                  </SelectItem>
                  <SelectItem value="Mild">
                    <div className="flex items-center">
                      <Flame className="mr-2 h-4 w-4 text-green-500" />
                      Mild
                    </div>
                  </SelectItem>
                  <SelectItem value="Medium">
                    <div className="flex items-center">
                      <Flame className="mr-2 h-4 w-4 text-orange-500" />
                      Medium
                    </div>
                  </SelectItem>
                  <SelectItem value="Hot">
                    <div className="flex items-center">
                      <Flame className="mr-2 h-4 w-4 text-red-500" />
                      Hot
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filteredMenuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-[400px] flex flex-col rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-[200px] w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <CardContent className="p-4 flex flex-col flex-grow bg-gradient-to-br from-amber-50 to-orange-100">
                  <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 flex-grow">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
                    <div className="flex items-center">
                      <span className="text-xs mr-1">Spice:</span>
                      {item.spiceLevel === 0 && <span className="text-green-500 text-xs">None</span>}
                      {item.spiceLevel > 0 && Array.from({ length: item.spiceLevel }).map((_, i) => (
                        <Flame key={i} className={`h-3 w-3 ${
                          item.spiceLevel === 1 ? 'text-green-500' :
                          item.spiceLevel === 2 ? 'text-orange-500' : 'text-red-500'
                        }`} />
                      ))}
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-2 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white transition-all duration-300 transform hover:scale-105" 
                    onClick={() => addToCart(item)}
                  >
                    Add to Order
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </main>

      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white w-full max-w-md h-full overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-amber-800">Your Cart</h2>
                  <Button variant="ghost" onClick={() => setIsCartOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                {cart.length === 0 ? (
                  <p className="text-center text-gray-500">Your cart is empty.</p>
                ) : (
                  <>
                    {checkoutStep === 0 && (
                      <>
                        {cart.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex items-center justify-between py-4 border-b border-gray-200"
                          >
                            <div>
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="rounded-full w-8 h-8 p-0 flex items-center justify-center"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="rounded-full w-8 h-8 p-0 flex items-center justify-center"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                        <div className="mt-6">
                          <p className="text-xl font-bold text-amber-800">Total: ${getTotalPrice()}</p>
                          <Button
                            className="w-full mt-4 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white transition-all duration-300 transform hover:scale-105"
                            onClick={() => setCheckoutStep(1)}
                          >
                            Proceed to Checkout
                          </Button>
                        </div>
                      </>
                    )}
                    {checkoutStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        <h3 className="text-xl font-semibold text-amber-800">Customer Information</h3>
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={customerInfo.name}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                            className="rounded-lg"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={customerInfo.email}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                            className="rounded-lg"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={customerInfo.phone}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                            className="rounded-lg"
                          />
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white transition-all duration-300 transform hover:scale-105"
                          onClick={() => setCheckoutStep(2)}
                        >
                          Next
                        </Button>
                      </motion.div>
                    )}
                    {checkoutStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        <h3 className="text-xl font-semibold text-amber-800">Dining Preference</h3>
                        <RadioGroup value={diningPreference} onValueChange={setDiningPreference}>
                          <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-100 transition-colors">
                            <RadioGroupItem value="dine-in" id="dine-in" />
                            <Label htmlFor="dine-in">Dine-in</Label>
                          </div>
                          <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-100 transition-colors">
                            <RadioGroupItem value="takeout" id="takeout" />
                            <Label htmlFor="takeout">Takeout</Label>
                          </div>
                        </RadioGroup>
                        <Button
                          className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white transition-all duration-300 transform hover:scale-105"
                          onClick={() => setCheckoutStep(3)}
                        >
                          Next
                        </Button>
                      </motion.div>
                    )}
                    {checkoutStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        <h3 className="text-xl font-semibold text-amber-800">Order Summary</h3>
                        {cart.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>
                              {item.name} x {item.quantity}
                            </span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="font-bold text-lg text-amber-800">
                          <span>Total:</span>
                          <span>${getTotalPrice()}</span>
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white transition-all duration-300 transform hover:scale-105"
                          onClick={() => setCheckoutStep(4)}
                        >
                          Next
                        </Button>
                      </motion.div>
                    )}
                    {checkoutStep === 4 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        <h3 className="text-xl font-semibold text-amber-800">Payment Method</h3>
                        <p className="text-sm text-gray-600">Please select a payment method:</p>
                        <Button
                          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white transition-all duration-300 transform hover:scale-105"
                        >
                          <CreditCard className="h-5 w-5" />
                          <span>Pay with Credit Card</span>
                        </Button>
                        <Button
                          className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white transition-all duration-300 transform hover:scale-105"
                          onClick={handleCheckout}
                        >
                          Place Order
                        </Button>
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                <Input type="email" placeholder="Your email" className="rounded-l-lg focus:ring-0 focus:border-orange-300" />
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