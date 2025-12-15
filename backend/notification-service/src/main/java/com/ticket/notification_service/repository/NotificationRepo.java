package com.ticket.notification_service.repository;

import com.ticket.notification_service.entity.NotificationLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepo extends JpaRepository<NotificationLog, Long> {
}