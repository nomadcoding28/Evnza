package com.ticket.event_service.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventName;     // e.g., "Coldplay Live"
    private String category;      // e.g., "Concert", "Sports"
    private LocalDate eventDate;  // e.g., 2024-12-25
    private double price;         // e.g., 150.00

    private Long venueId;         // We just store the ID (Loose coupling)

    private int totalTickets;     // e.g., 5000
//    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private int soldTickets = 0;  // Default is 0
}