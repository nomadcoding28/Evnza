package com.ticket.event_service.controller;

import com.ticket.event_service.entity.Event;
import com.ticket.event_service.repository.EventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventRepo eventRepository;

    // 1. Create Event
    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }

    // 2. Get All Events
    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // 3. Get Single Event
    @GetMapping("/{id}")
    public Event getEvent(@PathVariable Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }

    // 4. SPECIAL: Update Ticket Count (Called by Booking Service)
    // When a user books 2 tickets, Booking Service calls this to add 2 to 'soldTickets'
    @PutMapping("/{id}/tickets")
    public String updateTicketCount(@PathVariable Long id, @RequestParam int count) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (event.getSoldTickets() + count > event.getTotalTickets()) {
            throw new RuntimeException("Not enough tickets available!");
        }

        event.setSoldTickets(event.getSoldTickets() + count);
        eventRepository.save(event);
        return "Tickets updated successfully!";
    }
}