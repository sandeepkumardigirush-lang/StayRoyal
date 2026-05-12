export type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  villaName: string;
  villaImage: string;
  location: string;
  date: string;
  price: string;
  status: BookingStatus;
  rating: number;
  guests: number;
}
