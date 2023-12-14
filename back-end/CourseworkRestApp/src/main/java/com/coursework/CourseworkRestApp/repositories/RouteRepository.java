package com.coursework.CourseworkRestApp.repositories;

import com.coursework.CourseworkRestApp.models.Route;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RouteRepository extends JpaRepository<Route, Integer> {
    Optional<Route> findByDriverId(int id);
}
