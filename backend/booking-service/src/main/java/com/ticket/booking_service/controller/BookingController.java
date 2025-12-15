package com.ticket.booking_service.controller;

import com.ticket.booking_service.client.*;
import com.ticket.booking_service.dto.*;
import com.ticket.booking_service.entity.Booking;
import com.ticket.booking_service.repository.BookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired private BookingRepo bookingRepository;
    @Autowired private EventClient eventClient;
    @Autowired private PaymentClient paymentClient;
    @Autowired private NotificationClient notificationClient;

    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(@PathVariable Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    // Add this method inside BookingController

    @DeleteMapping("/cancel/{id}")
    public String cancelBooking(@PathVariable Long id) {
        // 1. Find the booking
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if ("CANCELLED".equals(booking.getStatus())) {
            return "Booking is already cancelled.";
        }

        // 2. Change Status
        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);

        // 3. Free up the tickets (Decrease soldTickets count in Event Service)
        // We pass a negative number to reduce the count
        eventClient.updateTicketCount(booking.getEventId(), -booking.getNumberOfTickets());

        return "❌ Booking Cancelled Successfully";
    }

    @PostMapping("/book")
    public String bookTicket(@RequestParam Long userId,
                             @RequestParam Long eventId,
                             @RequestParam int count,
                             @RequestParam String email) {

        // 1. Get Event Details (Via Feign)
        EventDto event = eventClient.getEventById(eventId);

        // 2. Check Availability
        if (event.getSoldTickets() + count > event.getTotalTickets()) {
            return "❌ Booking Failed: House Full!";
        }

        // 3. Calculate Cost
        double totalAmount = event.getPrice() * count;

        // 4. Create Initial Booking (Status: PENDING)
        Booking booking = new Booking();
        booking.setUserId(userId);
        booking.setEventId(eventId);
        booking.setNumberOfTickets(count);
        booking.setTotalAmount(totalAmount);
        booking.setStatus("PENDING");
        booking.setBookingDate(LocalDateTime.now());
        booking = bookingRepository.save(booking); // Save to generate ID

        // 5. Process Payment (Via Feign)
        PaymentDto payment = paymentClient.makePayment(booking.getId(), totalAmount);

        if ("SUCCESS".equals(payment.getStatus())) {
            // 6. If Payment Success -> Confirm Booking
            booking.setStatus("CONFIRMED");
            bookingRepository.save(booking);

            // 7. Update Inventory (Via Feign)
            eventClient.updateTicketCount(eventId, count);

            // 8. Send Email (Via Feign)
            notificationClient.sendNotification(booking.getId(), email,
                    "Hi! Your booking for " + event.getEventName() + " is confirmed. ID: " + booking.getId());

            return "✅ Booking Confirmed! ID: " + booking.getId();
        } else {
            // Payment Failed
            booking.setStatus("FAILED");
            bookingRepository.save(booking);
            return "❌ Booking Failed: Payment Declined.";
        }
    }
}