package com.coursework.CourseworkRestApp.repositories;

import com.coursework.CourseworkRestApp.models.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;

public interface ReportRepository extends MongoRepository<Report, String> {
    Page<Report> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end, Pageable pageable);
}
