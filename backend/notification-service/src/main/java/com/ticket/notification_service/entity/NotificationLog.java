package com.ticket.notification_service.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "notification_logs")
@Data
public class NotificationLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long bookingId;
    private String recipient; // Email address
    private String message;
    private LocalDateTime sentTime;
    private String status;    // SENT or FAILED
}