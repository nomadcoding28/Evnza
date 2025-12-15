package com.ticket.venue_service.repository;

import com.ticket.venue_service.entity.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VenueRepo extends JpaRepository<Venue, Long> {
    // Basic CRUD methods are already included here by JpaRepository
}