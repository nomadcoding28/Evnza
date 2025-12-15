import { useState } from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import { Event } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BookingModal from "./BookingModal";

// --- HELPER: Pick image based on category name ---
const getCategoryImage = (category: string) => {
  const normalized = category?.toLowerCase() || "";
  
  if (normalized.includes("music") || normalized.includes("concert") || normalized.includes("festival")) {
  // NEW BRIGHTER IMAGE
    return "https://images.unsplash.com/photo-1459749411177-287ce3288789?w=800&q=80"; 
  }
  if (normalized.includes("tech") || normalized.includes("education") || normalized.includes("conference")) {
    return "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80"; // Tech
  }
  if (normalized.includes("sport") || normalized.includes("game") || normalized.includes("match")) {
    return "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80"; // Stadium
  }
  // Fallback
  return "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80";
};

interface EventCardProps {
  event: Event;
  onBookingSuccess?: () => void;
}

const EventCard = ({ event, onBookingSuccess }: EventCardProps) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = new Date(event.eventDate).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  // Safe Math: Handle cases where data might be missing
  const total = event.totalTickets || 100;
  const sold = event.soldTickets || 0;
  const availableTickets = total - sold;
  const soldPercentage = Math.round((sold / total) * 100);
  const isAlmostSoldOut = soldPercentage >= 90;

  return (
    <>
      <div className="group relative glass rounded-xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:neon-glow border border-white/10">
        
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={getCategoryImage(event.category)}
            alt={event.eventName}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          
          {/* Category Badge */}
          <Badge className="absolute top-3 left-3 bg-primary/80 backdrop-blur-sm text-primary-foreground border-none">
            {event.category}
          </Badge>
          
          {/* Almost Sold Out Badge */}
          {isAlmostSoldOut && (
            <Badge className="absolute top-3 right-3 bg-destructive/80 backdrop-blur-sm text-destructive-foreground border-none animate-pulse">
              Almost Sold Out!
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Event Name */}
          <h3 className="text-xl font-bold text-foreground group-hover:gradient-text transition-all duration-300 line-clamp-1">
            {event.eventName}
          </h3>

          {/* Event Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm">{formattedDate} • {formattedTime}</span>
            </div>
            {/* Display Venue ID since Backend might not send Name yet */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-secondary" />
              <span className="text-sm line-clamp-1">Venue #{event.venueId}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4 text-neon-pink" />
              <span className="text-sm">{availableTickets.toLocaleString()} tickets left</span>
            </div>
          </div>

          {/* Ticket Progress Bar */}
          <div className="space-y-1">
            <div className="h-1.5 bg-secondary/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${soldPercentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-right">{soldPercentage}% sold</p>
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xs text-muted-foreground">Starting from</p>
              <p className="text-2xl font-bold text-foreground">
                ${event.price}
              </p>
            </div>
            <Button 
              className="btn-neon"
              onClick={() => setIsBookingOpen(true)}
              disabled={availableTickets <= 0}
            >
              {availableTickets <= 0 ? "Sold Out" : "Book Now"}
            </Button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        event={event} 
        open={isBookingOpen} 
        onOpenChange={setIsBookingOpen}
        onBookingSuccess={onBookingSuccess}
      />
    </>
  );
};

export default EventCard;