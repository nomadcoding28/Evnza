package com.ticket.booking_service.repository;

import com.ticket.booking_service.entity.Booking;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@Transactional // Rolls back the data after the test
public class BookingRepositoryTest {

    @Autowired
    private BookingRepo bookingRepo;

    @Test
    public void testSaveAndRetrieve() {
        // Use a unique User ID (e.g., 99999) to avoid clashing with your existing MySQL data
        Long testUserId = 99999L;

        Booking booking = new Booking();
        booking.setUserId(testUserId);
        booking.setEventId(100L);
        booking.setNumberOfTickets(2);
        booking.setTotalAmount(50.0);
        booking.setStatus("CONFIRMED");
        booking.setBookingDate(LocalDateTime.now());

        // 1. Save to Real MySQL
        Booking saved = bookingRepo.save(booking);

        // 2. Retrieve by the UNIQUE User ID
        List<Booking> foundList = bookingRepo.findByUserId(testUserId);

        // 3. Assert
        assertNotNull(saved.getId());
        // Now this will be 1, because we are looking for User 99999, who has no history
        assertEquals(1, foundList.size());
        assertEquals("CONFIRMED", foundList.get(0).getStatus());
    }
}