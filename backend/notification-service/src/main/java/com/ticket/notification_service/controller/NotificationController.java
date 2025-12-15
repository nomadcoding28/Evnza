package com.ticket.notification_service.controller;

import com.ticket.notification_service.entity.NotificationLog;
import com.ticket.notification_service.repository.NotificationRepo;
import com.ticket.notification_service.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationRepo notificationRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public String sendNotification(@RequestParam Long bookingId,
                                   @RequestParam String email,
                                   @RequestParam String message) {

        // 1. Send Email (Real or Mock)
        emailService.sendEmail(email, "Booking Confirmation", message);

        // 2. Save Log to DB
        NotificationLog log = new NotificationLog();
        log.setBookingId(bookingId);
        log.setRecipient(email);
        log.setMessage(message);
        log.setSentTime(LocalDateTime.now());
        log.setStatus("SENT");

        notificationRepository.save(log);

        return "Notification Processed";
    }
}