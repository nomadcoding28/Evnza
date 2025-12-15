package com.ticket.booking_service.client;

import com.ticket.booking_service.dto.PaymentDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "PAYMENT-SERVICE")
public interface PaymentClient {

    @PostMapping("/payments/process")
    PaymentDto makePayment(@RequestParam Long bookingId, @RequestParam double amount);
}