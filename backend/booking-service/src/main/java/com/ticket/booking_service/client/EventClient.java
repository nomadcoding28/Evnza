package com.ticket.booking_service.client;

import com.ticket.booking_service.dto.EventDto; // We will create this DTO next
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "EVENT-SERVICE") // Must match the name in Eureka
public interface EventClient {

    @GetMapping("/events/{id}")
    EventDto getEventById(@PathVariable Long id);

    @PutMapping("/events/{id}/tickets")
    String updateTicketCount(@PathVariable Long id, @RequestParam int count);
}