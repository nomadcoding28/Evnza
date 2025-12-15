package com.ticket.booking_service.dto;
import lombok.Data;
@Data
public class EventDto {
    private Long id;
    private String eventName;
    private double price;
    private int totalTickets;
    private int soldTickets;
}