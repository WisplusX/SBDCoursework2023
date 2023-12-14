package com.coursework.CourseworkRestApp.repositories;

import com.coursework.CourseworkRestApp.models.Route;
import com.coursework.CourseworkRestApp.models.Transport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TransportRepository extends JpaRepository<Transport, Integer> {
    Optional<Transport> findByDriverId(int id);
}
