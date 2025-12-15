package com.ticket.booking_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "NOTIFICATION-SERVICE")
public interface NotificationClient {

    @PostMapping("/notifications/send")
    String sendNotification(@RequestParam Long bookingId,
                            @RequestParam String email,
                            @RequestParam String message);
}