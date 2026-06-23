package com.ticket.venue_service.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ticket.venue_service.entity.Venue;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class VenueControllerTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;

    @Test
    public void testAddVenue() throws Exception {
        Venue venue = new Venue();
        venue.setName("Real MySQL Venue");
        venue.setLocation("London");
        venue.setCapacity(90000);

        mockMvc.perform(post("/venues")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(venue)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Real MySQL Venue"));
    }
}