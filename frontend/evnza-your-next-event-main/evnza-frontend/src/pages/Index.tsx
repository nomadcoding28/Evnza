import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EventCard from "@/components/EventCard";
import { Event } from "@/data/mockEvents";
import { fetchEvents } from "@/lib/api";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const data = await fetchEvents();
      setEvents(data);
      setError(null);
    } catch (err) {
      setError("Failed to load events. Please try again later.");
      console.error("Error fetching events:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleBookingSuccess = () => {
    loadEvents();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-16">
        <HeroSection />
      </div>

      {/* Events Section */}
      <section className="container mx-auto px-4 py-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Upcoming <span className="gradient-text">Events</span>
            </h2>
            <p className="text-muted-foreground">
              Don't miss out on the hottest shows in town
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search events..." 
                className="pl-10 w-64 bg-card/50 border-border focus:border-primary transition-colors"
              />
            </div>
            <Button 
              variant="outline" 
              size="icon"
              className="border-border hover:border-primary hover:bg-primary/10 transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading events...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-destructive mb-4">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              className="btn-neon"
            >
              Retry
            </Button>
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-muted-foreground">No events available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} onBookingSuccess={handleBookingSuccess} />
            ))}
          </div>
        )}

        {/* Load More */}
        {!isLoading && !error && events.length > 0 && (
          <div className="flex justify-center mt-12">
            <Button 
              variant="outline" 
              className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary px-8 transition-all duration-300"
            >
              Load More Events
            </Button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Evnza. All rights reserved. Built with 💜
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
