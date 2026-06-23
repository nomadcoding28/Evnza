package com.ticket.auth_service.controller;


import com.ticket.auth_service.dto.AuthRequest;
import com.ticket.auth_service.entity.UserCredential;
import com.ticket.auth_service.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * 1. REGISTER API
     * URL: POST http://localhost:8081/auth/register
     */
    @PostMapping("/register")
    public String addNewUser(@RequestBody UserCredential user) {
        return service.saveUser(user);
    }

    /**
     * 2. LOGIN API (Generates JWT)
     * URL: POST http://localhost:8081/auth/token
     */
    @PostMapping("/token")
    public String getToken(@RequestBody AuthRequest authRequest) {
        // This line actually triggers the CustomUserDetailsService and checks the BCrypt password!
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
        );

        if (authenticate.isAuthenticated()) {
            return service.generateToken(authRequest.getEmail());
        } else {
            throw new RuntimeException("Invalid Access!");
        }
    }

    /**
     * 3. VALIDATE TOKEN API
     * URL: GET http://localhost:8081/auth/validate?token=YOUR_TOKEN_HERE
     * (This will be used primarily by your API Gateway)
     */
    @GetMapping("/validate")
    public String validateToken(@RequestParam("token") String token) {
        service.validateToken(token);
        return "Token is valid";
    }
}