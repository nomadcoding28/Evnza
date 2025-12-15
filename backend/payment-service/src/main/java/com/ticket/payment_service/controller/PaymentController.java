package com.ticket.payment_service.controller;

import com.ticket.payment_service.entity.Payment;
import com.ticket.payment_service.repository.PaymentRepo;
import com.ticket.payment_service.service.StripeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentRepo paymentRepository;

    @Autowired
    private StripeService stripeService;

    @PostMapping("/process")
    public Payment makePayment(@RequestParam Long bookingId, @RequestParam double amount) {

        Payment payment = new Payment();
        payment.setBookingId(bookingId);
        payment.setAmount(amount);
        payment.setPaymentDate(LocalDateTime.now());

        try {
            // Call Stripe (Or Mock)
            String transactionId = stripeService.charge(amount, "usd");

            payment.setStripeId(transactionId);
            payment.setStatus("SUCCESS");

        } catch (Exception e) {
            payment.setStripeId(null);
            payment.setStatus("FAILED");
            System.err.println("Payment Failed: " + e.getMessage());
        }

        return paymentRepository.save(payment);
    }

    @GetMapping("/{id}")
    public Payment getPayment(@PathVariable Long id) {
        return paymentRepository.findById(id).orElse(null);
    }
}