package com.ticket.notification_service.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class NotificationControllerTest {

    @Autowired private MockMvc mockMvc;

    @Test
    public void testSendEmail() throws Exception {
        mockMvc.perform(post("/notifications/send")
                        .param("bookingId", "1")
                        .param("email", "test@test.com")
                        .param("message", "Welcome"))
                .andExpect(status().isOk())
                .andExpect(content().string("Notification Processed"));
    }
}