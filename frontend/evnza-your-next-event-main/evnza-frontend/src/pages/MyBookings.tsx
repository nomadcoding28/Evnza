import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Ticket, CalendarX, Loader2, Calendar, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { fetchUserBookings, fetchEvents, cancelBooking, Booking } from "@/lib/api";
import { Event } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [bookingsData, eventsData] = await Promise.all([
          fetchUserBookings(1),
          fetchEvents(),
        ]);
        setBookings(bookingsData);
        setEvents(eventsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getEventDetails = (eventId: number) => {
    return events.find((e) => e.id === eventId);
  };

  const getStatusBadge = (status: string) => {
    const isConfirmed = status?.toUpperCase() === "CONFIRMED";
    return (
      <Badge
        className={
          isConfirmed
            ? "bg-green-500/20 text-green-400 border-green-500/50"
            : "bg-destructive/20 text-destructive border-destructive/50"
        }
      >
        {status}
      </Badge>
    );
  };

  // Cancel booking and refresh list
  const handleCancelBooking = async (bookingId: number) => {
    try {
      const message = await cancelBooking(bookingId);
      toast({ title: "Success", description: message });

      // Refresh bookings for user 1
      const updated = await fetchUserBookings(1);
      setBookings(updated);
    } catch (error: unknown) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to cancel booking.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            My <span className="gradient-text">Bookings</span>
          </h1>
          <p className="text-muted-foreground">
            View and manage your upcoming event tickets
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="glass rounded-xl p-12 text-center max-w-lg mx-auto">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your bookings...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="glass rounded-xl p-12 text-center max-w-lg mx-auto">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={() => globalThis.location?.reload()} variant="outline">
              Try Again
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && bookings.length === 0 && (
          <div className="glass rounded-xl p-12 text-center max-w-lg mx-auto">
            <div className="relative inline-block mb-6">
              <CalendarX className="w-20 h-20 text-muted-foreground" />
              <Ticket className="absolute -bottom-2 -right-2 w-10 h-10 text-primary animate-pulse" />
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-3">
              No Bookings Yet
            </h2>
            <p className="text-muted-foreground mb-8">
              You haven't booked any tickets yet. Explore our amazing events and
              secure your spot!
            </p>

            <Link to="/">
              <Button className="btn-neon">
                <Ticket className="w-4 h-4 mr-2" />
                Browse Events
              </Button>
            </Link>
          </div>
        )}

        {/* Bookings List */}
        {!loading && !error && bookings.length > 0 && (
          <div className="space-y-4 max-w-2xl mx-auto">
            {bookings.map((booking) => {
              const event = getEventDetails(booking.eventId);
              const formattedDate = event
                ? new Date(event.eventDate).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : null;

              return (
                <div
                  key={booking.id}
                  className="glass rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Ticket className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-foreground">
                        {event?.eventName || `Event #${booking.eventId}`}
                      </span>
                    </div>
                    {formattedDate && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{formattedDate}</span>
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {booking.numberOfTickets} ticket{booking.numberOfTickets > 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    {getStatusBadge(booking.status)}
                    <span className="text-xl font-bold text-foreground">
                      ${booking.totalAmount?.toFixed(2) || "0.00"}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancelBooking(booking.id)}
                      className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Evnza. All rights reserved. Built with 💜
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MyBookings;
