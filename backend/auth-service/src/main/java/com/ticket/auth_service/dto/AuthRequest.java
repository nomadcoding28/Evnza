package com.ticket.auth_service.dto;

public class AuthRequest {

    private String email;
    private String password;

    // ----- NO ARG CONSTRUCTOR -----
    public AuthRequest() {}

    // ----- GETTERS AND SETTERS -----
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
