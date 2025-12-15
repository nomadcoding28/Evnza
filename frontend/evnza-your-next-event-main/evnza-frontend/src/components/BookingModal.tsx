import { useState } from "react";
import { Loader2, Ticket, Mail, Users } from "lucide-react";
import { Event,createBooking } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

interface BookingModalProps {
  event: Event;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookingSuccess?: () => void;
}

const emailSchema = z.string().trim().email({ message: "Please enter a valid email address" });

const BookingModal = ({ event, open, onOpenChange, onBookingSuccess }: BookingModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const totalPrice = event.price * quantity;

  const handleQuantityChange = (value: number) => {
    const clampedValue = Math.min(10, Math.max(1, value));
    setQuantity(clampedValue);
  };

  const validateEmail = (value: string) => {
    const result = emailSchema.safeParse(value);
    if (!result.success) {
      setEmailError(result.error.errors[0].message);
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleConfirmBooking = async () => {
    if (!validateEmail(email)) return;

    setIsProcessing(true);

    try {
      const response = await createBooking(event.id, quantity, email);

      if (response.includes("Confirmed")) {
        toast({
          title: "Booking Confirmed! 🎉",
          description: "Check your email for ticket details and confirmation.",
        });
        onOpenChange(false);
        // Reset form
        setQuantity(1);
        setEmail("");
        setEmailError("");
        // Trigger refresh of events
        onBookingSuccess?.();
      } else if (response.includes("Failed")) {
        toast({
          title: "Booking Failed",
          description: response,
          variant: "destructive",
        });
      } else {
        // Handle other responses
        toast({
          title: "Booking Status",
          description: response,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isProcessing) {
      onOpenChange(newOpen);
      if (!newOpen) {
        // Reset form on close
        setQuantity(1);
        setEmail("");
        setEmailError("");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="glass border-primary/20 sm:max-w-md">
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text flex items-center gap-2">
            <Ticket className="w-6 h-6 text-primary" />
            Book Tickets
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Complete your booking for this amazing event
          </DialogDescription>
        </DialogHeader>

        {/* Event Info */}
        <div className="glass rounded-lg p-4 space-y-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-1">
            {event.eventName}
          </h3>
          <p className="text-primary font-bold text-xl">
            ${event.price} <span className="text-sm text-muted-foreground font-normal">per ticket</span>
          </p>
        </div>

        {/* Booking Form */}
        <div className="space-y-5 py-2">
          {/* Ticket Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-foreground flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Number of Tickets
            </Label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1 || isProcessing}
                className="border-primary/50 hover:bg-primary/10 hover:border-primary"
              >
                -
              </Button>
              <Input
                id="quantity"
                type="number"
                min={1}
                max={10}
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                disabled={isProcessing}
                className="w-20 text-center bg-card/50 border-border focus:border-primary"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 10 || isProcessing}
                className="border-primary/50 hover:bg-primary/10 hover:border-primary"
              >
                +
              </Button>
              <span className="text-sm text-muted-foreground">(Max 10)</span>
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground flex items-center gap-2">
              <Mail className="w-4 h-4 text-secondary" />
              Your Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) validateEmail(e.target.value);
              }}
              disabled={isProcessing}
              className={`bg-card/50 border-border focus:border-primary ${
                emailError ? "border-destructive focus:border-destructive" : ""
              }`}
            />
            {emailError && (
              <p className="text-sm text-destructive">{emailError}</p>
            )}
          </div>
        </div>

        {/* Total Price */}
        <div className="glass rounded-lg p-4 flex items-center justify-between">
          <span className="text-muted-foreground">Total Price</span>
          <span className="text-3xl font-bold gradient-text">
            ${totalPrice.toFixed(2)}
          </span>
        </div>

        {/* Confirm Button */}
        <Button
          onClick={handleConfirmBooking}
          disabled={isProcessing || !email}
          className="w-full btn-neon h-12 text-lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Ticket className="w-5 h-5 mr-2" />
              Confirm Booking
            </>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
