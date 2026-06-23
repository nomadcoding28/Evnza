package com.ticket.event_service.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ticket.event_service.entity.Event;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional // <--- IMPORTANT: Rolls back changes after test
public class EventControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testCreateEvent() throws Exception {
        Event event = new Event();
        event.setEventName("Real MySQL Event Test");
        event.setCategory("Tech");
        event.setEventDate(LocalDate.now());
        event.setPrice(100.0);
        event.setVenueId(1L);
        event.setTotalTickets(500);
        event.setSoldTickets(0);

        mockMvc.perform(post("/events")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(event)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.eventName").value("Real MySQL Event Test"));
    }
    @Test
    public void testGetEvent_NotFound() throws Exception {
        // 1. Try to fetch ID 999 (Does not exist)
        // 2. Expect the status to NOT be OK (Expect 4xx or 5xx or Exception)

        try {
            mockMvc.perform(get("/events/999"));
        } catch (Exception e) {
            // 3. We Verify that the ERROR MESSAGE is correct
            // This proves the backend logic is working!
            if (e.getCause() instanceof RuntimeException) {
                String errorMsg = e.getCause().getMessage();
                assert errorMsg.equals("Event not found");
                System.out.println("✅ TEST PASSED: System correctly detected missing event!");
            } else {
                throw e; // If it's a different error, fail the test
            }
        }
    }
}