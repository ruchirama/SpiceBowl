"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { jsPDF } from "jspdf";


type FormData = {
  name: string;
  email: string;
  phone: string;
  guests: string;
  specialRequests: string;
  hour: string;
  minute: string;
}

type FormErrors = {
  [key in keyof FormData | 'date']?: string;
}

type BookingDetails = FormData & {
  date: Date;
  time: string;
  bookingId: string;
  status: string;
  createdAt: Date;
}

const DownloadModal = ({ booking, onClose }: { booking: BookingDetails; onClose: () => void }) => {
  const [format, setFormat] = useState("pdf");

  const handleDownload = () => {
    const fileName = `booking-confirmation-${booking.bookingId}.${format}`;
    const content = `Booking Confirmation\n\nBooking ID: ${booking.bookingId}\nName: ${booking.name}\nDate: ${booking.date.toLocaleDateString()}\nTime: ${booking.time}\nGuests: ${booking.guests}`;
    
    if (format === "pdf") {
      const doc = new jsPDF();
      doc.text(content, 10, 10);
      doc.save(fileName);
    } else {
      const blob = new Blob([content], {type: 'text/plain'});
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    console.log(`Downloading ${format} for booking ${booking.bookingId}`);
    onClose();
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Download Booking Confirmation</DialogTitle>
        <DialogDescription>
          Choose the format for your booking confirmation.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <RadioGroup defaultValue="pdf" onValueChange={(value) => setFormat(value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pdf" id="pdf" />
            <Label htmlFor="pdf">PDF</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="txt" id="txt" />
            <Label htmlFor="txt">Text File</Label>
          </div>
        </RadioGroup>
      </div>
      <Button onClick={handleDownload}>Download</Button>
    </DialogContent>
  );
};

const PrintModal = ({ booking, onClose }: { booking: BookingDetails; onClose: () => void }) => {
  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Booking Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            h1 { color: #d97706; }
            .details { margin-top: 20px; }
            .detail { margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <h1>Booking Confirmation</h1>
          <div class="details">
            <div class="detail"><strong>Booking ID:</strong> ${booking.bookingId}</div>
            <div class="detail"><strong>Name:</strong> ${booking.name}</div>
            <div class="detail"><strong>Date:</strong> ${booking.date.toLocaleDateString()}</div>
            <div class="detail"><strong>Time:</strong> ${booking.time}</div>
            <div class="detail"><strong>Guests:</strong> ${booking.guests}</div>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow?.document.write(printContent);
    printWindow?.document.close();
    printWindow?.print();
    
    console.log(`Printing booking ${booking.bookingId}`);
    onClose();
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Print Booking Confirmation</DialogTitle>
        <DialogDescription>
          Review your booking details before printing.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div><strong>Booking ID:</strong> {booking.bookingId}</div>
        <div><strong>Name:</strong> {booking.name}</div>
        <div><strong>Date:</strong> {booking.date.toLocaleDateString()}</div>
        <div><strong>Time:</strong> {booking.time}</div>
        <div><strong>Guests:</strong> {booking.guests}</div>
      </div>
      <Button onClick={handlePrint}>Print</Button>
    </DialogContent>
  );
};

const BookingConfirmation = ({ booking, onEdit }: { booking: BookingDetails; onEdit: () => void }) => {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  const handleShare = () => {
    console.log(`Sharing booking ${booking.bookingId}`);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-6">
      <div className="flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="text-green-500 w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <h2 className="text-2xl font-bold text-amber-800 ml-2">Booking Confirmed</h2>
      </div>
      <div className="bg-amber-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-amber-800 font-semibold mb-2">Booking ID: {booking.bookingId}</p>
        <p className="text-sm text-amber-800 mb-2">Status: <span className="font-semibold text-green-600">{booking.status}</span></p>
        <p className="text-sm text-amber-800">Created: {booking.createdAt.toLocaleString()}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm font-semibold text-gray-600">Name</p>
          <p className="text-lg text-amber-800">{booking.name}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-600">Email</p>
          <p className="text-lg text-amber-800">{booking.email}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-600">Phone</p>
          <p className="text-lg text-amber-800">{booking.phone}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-600">Guests</p>
          <p className="text-lg text-amber-800">{booking.guests}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-600">Date</p>
          <p className="text-lg text-amber-800">{booking.date.toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-600">Time</p>
          <p className="text-lg text-amber-800">{booking.time}</p>
        </div>
      </div>
      {booking.specialRequests && (
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-600 mb-2">Special Requests</p>
          <p className="text-amber-800 bg-amber-50 p-3 rounded-lg">{booking.specialRequests}</p>
        </div>
      )}
      <div className="flex justify-between items-center mt-6">
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleShare}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v-2a4 4 0 0 1 4-4h12"></path>
              <polyline points="16 4 20 8 16 12"></polyline>
              <line x1="20" y1="8" x2="8" y2="8"></line>
            </svg>
            Share
          </Button>
          <Dialog open={isPrintOpen} onOpenChange={setIsPrintOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 6 2 18 2 18 9"></polyline>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                  <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
                Print
              </Button>
            </DialogTrigger>
            <PrintModal booking={booking} onClose={() => setIsPrintOpen(false)} />
          </Dialog>
          <Dialog open={isDownloadOpen} onOpenChange={setIsDownloadOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download
              </Button>
            </DialogTrigger>
            <DownloadModal booking={booking} onClose={() => setIsDownloadOpen(false)} />
          </Dialog>
        </div>
        <Button variant="default" onClick={onEdit} className="bg-orange-600 hover:bg-orange-700 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
          Edit Booking
        </Button>
      </div>
    </div>
  );
};

export default function BookATable() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    guests: '',
    specialRequests: '',
    hour: '',
    minute: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<BookingDetails | null>(null);
  const [showForm, setShowForm] = useState(true);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!formData.guests) {
      newErrors.guests = 'Number of guests is required';
    } else if (parseInt(formData.guests) < 1 || parseInt(formData.guests) > 20) {
      newErrors.guests = 'Number of guests must be between 1 and 20';
    }

    if (!date) {
      newErrors.date = 'Date is required';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date < today) {
        newErrors.date = 'Date cannot be in the past';
      }
    }

    if (!formData.hour || !formData.minute) {
      newErrors.hour = 'Time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const bookingDetails: BookingDetails = {
          ...formData,
          date: date!,
          time: `${formData.hour}:${formData.minute}`,
          bookingId: Math.random().toString(36).substr(2, 9),
          status: 'confirmed',
          createdAt: new Date()
        };

        setSubmittedBooking(bookingDetails);
        setShowForm(false);
      } catch (error) {
        console.error('Failed to submit booking. Please try again.');
      }
    }

    setIsSubmitting(false);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleEdit = () => {
    setShowForm(true);
  };

  if (!showForm && submittedBooking) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 py-24">
        <BookingConfirmation booking={submittedBooking} onEdit={handleEdit} />
      </div>
    );
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
              <Link href="/book-a-table">
                <Button variant="outline">Book a Table</Button>
              </Link>
            </div>
            <Button variant="ghost" className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-amber-100 to-orange-100 p-8 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-center text-amber-800 mb-8">Book a Table</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={errors.name ? 'border-red-500' : ''}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                    placeholder="Your email"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={errors.phone ? 'border-red-500' : ''}
                    placeholder="Your phone number"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                  <Input
                    type="number"
                    value={formData.guests}
                    onChange={(e) => handleInputChange('guests', e.target.value)}
                    min="1"
                    max="20"
                    className={errors.guests ? 'border-red-500' : ''}
                    placeholder="Enter number of guests"
                  />
                  {errors.guests && <p className="mt-1 text-sm text-red-500">{errors.guests}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-auto h-4 w-4 opacity-50" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                          <line x1="16" x2="16" y1="2" y2="6"></line>
                          <line x1="8" x2="8" y1="2" y2="6"></line>
                          <line x1="3" x2="21" y1="10" y2="10"></line>
                        </svg>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <div className="flex space-x-2">
                    <Select value={formData.hour} onValueChange={(value) => handleInputChange('hour', value)}>
                      <SelectTrigger className={errors.hour ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Hour" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                            {i.toString().padStart(2, '0')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={formData.minute} onValueChange={(value) => handleInputChange('minute', value)}>
                      <SelectTrigger className={errors.hour ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Min" />
                      </SelectTrigger>
                      <SelectContent>
                        {['00', '15', '30', '45'].map((minute) => (
                          <SelectItem key={minute} value={minute}>
                            {minute}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.hour && <p className="mt-1 text-sm text-red-500">{errors.hour}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                <Textarea
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  rows={4}
                  placeholder="Any special requests or dietary requirements?"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#F15A2B] hover:bg-[#d94d22] text-white font-semibold py-2 px-4 rounded-md"
              >
                {isSubmitting ? 'Submitting...' : 'Book Now'}
              </Button>
            </form>
          </div>
        </div>
      </main>

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
                <a href="#" aria-label="Facebook" className="text-white hover:text-orange-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" aria-label="Instagram" className="text-white hover:text-orange-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" aria-label="Twitter" className="text-white hover:text-orange-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; 2024 SpiceBowl. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
