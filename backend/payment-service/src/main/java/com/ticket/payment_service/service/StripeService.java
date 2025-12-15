package com.ticket.payment_service.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class StripeService {

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    public String charge(double amount, String currency) throws StripeException {
        // If user hasn't put a real key, return a mock ID
        if (stripeApiKey.contains("YOUR_ACTUAL_KEY") || stripeApiKey.contains("DUMMY")) {
            System.out.println("⚠️ MOCK PAYMENT MODE: Skipping actual Stripe call.");
            return "mock_id_" + System.currentTimeMillis();
        }

        // Real Stripe Logic
        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount((long) (amount * 100)) // Stripe expects cents
                        .setCurrency(currency)
                        .setAutomaticPaymentMethods(
                                PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                        .setEnabled(true)
                                        .build()
                        )
                        .build();

        PaymentIntent intent = PaymentIntent.create(params);
        return intent.getId();
    }
}