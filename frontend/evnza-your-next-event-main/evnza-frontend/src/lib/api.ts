

const API_BASE_URL = "http://localhost:8080";

export interface Event {
  id: number;
  eventName: string;
  category: string;
  eventDate: string;
  price: number;
  venueId: number;
  totalTickets: number; // Critical for percentage
  soldTickets: number;  // Critical for percentage
  venueName?: string; 
  imageUrl?: string;
  location?: string;
}

export async function fetchEvents(): Promise<Event[]> {
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.statusText}`);
  }

  return response.json();
}

export async function createBooking(
  eventId: number,
  count: number,
  email: string
): Promise<string> {
  const params = new URLSearchParams({
    userId: "1",
    eventId: eventId.toString(),
    count: count.toString(),
    email: email,
  });

  const response = await fetch(`${API_BASE_URL}/bookings/book?${params}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Backend returns a raw string, not JSON
  return response.text();
}


export interface Booking {
  id: number;
  eventId: number;
  numberOfTickets: number;
  status: string;
  totalAmount: number;
}

export async function fetchUserBookings(userId: number = 1): Promise<Booking[]> {
  const response = await fetch(`${API_BASE_URL}/bookings/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch bookings: ${response.statusText}`);
  }

  return response.json();
}
// Add this to api.ts

export const cancelBooking = async (bookingId: number) => {
  // Matches the @DeleteMapping in your Java Controller
  const response = await fetch(`${API_BASE_URL}/bookings/cancel/${bookingId}`, {
    method: 'DELETE',
  });
  return response.text();
};
