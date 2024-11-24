export type BookingDetails = {
  name: string;
  email: string;
  phone: string;
  guests: string;
  specialRequests: string;
  date: Date;
  time: string;
  bookingId: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: Date;
}