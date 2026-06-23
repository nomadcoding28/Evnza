package com.ticket.auth_service.repository;


import com.ticket.auth_service.entity.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserCredentialRepository extends JpaRepository<UserCredential, Long> {

    // Spring Data JPA magically writes the SQL query for this based on the method name!
    Optional<UserCredential> findByEmail(String email);
}
