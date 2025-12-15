package com.ticket.venue_service.controller;

import com.ticket.venue_service.entity.Venue;
import com.ticket.venue_service.repository.VenueRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/venues")
public class VenueController {

    @Autowired
    private VenueRepo venueRepository;

    // 1. Create a new Venue
    @PostMapping
    public Venue addVenue(@RequestBody Venue venue) {
        return venueRepository.save(venue);
    }

    // 2. Get a Venue by ID
    @GetMapping("/{id}")
    public Venue getVenue(@PathVariable Long id) {
        return venueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venue not found with id: " + id));
    }

    // 3. Get All Venues
    @GetMapping
    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }

    // 4. Update Venue
    @PutMapping("/{id}")
    public Venue updateVenue(@PathVariable Long id, @RequestBody Venue venueDetails) {
        Venue venue = venueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venue not found"));

        venue.setName(venueDetails.getName());
        venue.setLocation(venueDetails.getLocation());
        venue.setCapacity(venueDetails.getCapacity());

        return venueRepository.save(venue);
    }
}