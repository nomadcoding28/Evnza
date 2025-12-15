package com.ticket.payment_service.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long bookingId;    // Links to Booking Service
    private String stripeId;   // The ID returned by Stripe (e.g., ch_1Iq...)
    private double amount;
    private String status;     // SUCCESS, FAILED
    private LocalDateTime paymentDate;
}