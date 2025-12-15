export interface Event {
  id: number;
  eventName: string;
  category: string;
  eventDate: string;
  price: number;
  venueId: number;
  venueName: string;
  totalTickets: number;
  soldTickets: number;
  imageUrl: string;
}

export const mockEvents: Event[] = [
  {
    id: 1,
    eventName: "Neon Dreams World Tour",
    category: "Electronic",
    eventDate: "2025-02-14T20:00:00",
    price: 89,
    venueId: 1,
    venueName: "Madison Square Garden",
    totalTickets: 20000,
    soldTickets: 18500,
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    eventName: "The Midnight Revival",
    category: "Rock",
    eventDate: "2025-03-08T19:30:00",
    price: 125,
    venueId: 2,
    venueName: "The Forum LA",
    totalTickets: 17500,
    soldTickets: 12000,
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    eventName: "Synthwave Nights",
    category: "Electronic",
    eventDate: "2025-03-22T21:00:00",
    price: 75,
    venueId: 3,
    venueName: "Brooklyn Steel",
    totalTickets: 1800,
    soldTickets: 1650,
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    eventName: "Aurora Festival 2025",
    category: "Festival",
    eventDate: "2025-04-12T16:00:00",
    price: 249,
    venueId: 4,
    venueName: "Coachella Valley",
    totalTickets: 50000,
    soldTickets: 35000,
    imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
  },
  {
    id: 5,
    eventName: "Jazz Under Stars",
    category: "Jazz",
    eventDate: "2025-04-28T19:00:00",
    price: 65,
    venueId: 5,
    venueName: "Hollywood Bowl",
    totalTickets: 17500,
    soldTickets: 8900,
    imageUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=600&fit=crop",
  },
];
