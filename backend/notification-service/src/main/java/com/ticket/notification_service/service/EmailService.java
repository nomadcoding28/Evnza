package com.ticket.notification_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            message.setFrom("your.email@gmail.com"); // Matches config

            javaMailSender.send(message);
            System.out.println("✅ Email Sent Successfully to " + to);

        } catch (Exception e) {
            // Fallback for development if SMTP isn't configured
            System.err.println("⚠️ SMTP Error (Mock Mode Active): " + e.getMessage());
            System.out.println("--------------------------------------------------");
            System.out.println("TO: " + to);
            System.out.println("SUBJECT: " + subject);
            System.out.println("BODY: " + text);
            System.out.println("--------------------------------------------------");
        }
    }
}