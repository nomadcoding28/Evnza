package com.ticket.booking_service.dto;
import lombok.Data;
@Data
public class PaymentDto {
    private Long id;
    private String status; // SUCCESS or FAILED
    private String stripeId;
}