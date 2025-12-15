package com.ticket.booking_service.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // For now, just a simulated User ID
    private Long eventId;
    private int numberOfTickets;
    private double totalAmount;
    private String status; // PENDING, CONFIRMED, FAILED
    private LocalDateTime bookingDate;
}