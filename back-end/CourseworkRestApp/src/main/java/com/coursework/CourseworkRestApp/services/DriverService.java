package com.coursework.CourseworkRestApp.services;

import com.coursework.CourseworkRestApp.models.Route;
import com.coursework.CourseworkRestApp.models.Transport;
import com.coursework.CourseworkRestApp.repositories.RouteRepository;
import com.coursework.CourseworkRestApp.repositories.TransportRepository;
import org.springframework.stereotype.Service;

@Service
public class DriverService {
    private final RouteRepository routeRepository;
    private final TransportRepository transportRepository;

    public DriverService(RouteRepository routeRepository, TransportRepository transportRepository) {
        this.routeRepository = routeRepository;
        this.transportRepository = transportRepository;
    }

    public Route getRouteForDriver(int id) {
        return routeRepository.findByDriverId(id).orElse(null);
    }

    public Transport getTransportForDriver(int id) {
        return transportRepository.findByDriverId(id).orElse(null);
    }
}

