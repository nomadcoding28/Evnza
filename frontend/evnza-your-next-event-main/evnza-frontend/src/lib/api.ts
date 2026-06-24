
const API_BASE_URL = "http://localhost:8080";
const AUTH_BASE_URL = "http://localhost:8081";

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

// ==========================================
// AUTH API (talks directly to auth-service on :8081)
// ==========================================

/**
 * Register a new user.
 * POST /auth/register — body: { email, password }
 * Returns a plain-text success message.
 */
export async function registerUser(email: string, password: string): Promise<string> {
  const response = await fetch(`${AUTH_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(text || "Registration failed");
  }
  return text;
}

/**
 * Login an existing user.
 * POST /auth/token — body: { email, password }
 * Returns a raw JWT token string.
 */
export async function loginUser(email: string, password: string): Promise<string> {
  const response = await fetch(`${AUTH_BASE_URL}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(text || "Invalid email or password");
  }
  return text; // JWT token
}
