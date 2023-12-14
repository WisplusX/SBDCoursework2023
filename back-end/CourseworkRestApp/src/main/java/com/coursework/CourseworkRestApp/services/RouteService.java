package com.coursework.CourseworkRestApp.services;

import com.coursework.CourseworkRestApp.models.Route;
import com.coursework.CourseworkRestApp.models.Transport;
import com.coursework.CourseworkRestApp.repositories.RouteRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RouteService {
    private final RouteRepository repository;

    public RouteService(RouteRepository repository) {
        this.repository = repository;
    }

    public Page<Route> getAllRoutes(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Route getRouteById(int id) {
        Optional<Route> route = repository.findById(id);
        return route.orElse(null);
    }

    public Route getRouteByDriverId(int driverId) {
        Optional<Route> route = repository.findByDriverId(driverId);
        return route.orElse(null);
    }

    public Route createRoute(Route route) {
        return repository.save(route);
    }

    public Route updateRoute(int id, Route updatedRoute) {
        Optional<Route> routeToUpdate = repository.findById(id);
        if (routeToUpdate.isPresent()) {
            Route newRoute = routeToUpdate.get();
            newRoute.setRouteStart(updatedRoute.getRouteStart());
            newRoute.setRouteEnd(updatedRoute.getRouteEnd());
            newRoute.setRouteLength(updatedRoute.getRouteLength());
            newRoute.setDriver(updatedRoute.getDriver());
            return repository.save(newRoute);
        }
        return null;
    }

    public void deleteRoute(int id) {
        repository.deleteById(id);
    }

    public Route finishRoute(int id) {
        Optional<Route> route = repository.findById(id);
        if (route.isPresent()) {
            Route updatedRoute = route.get();
            updatedRoute.setDriver(null);
            return repository.save(updatedRoute);
        }
        return null;
    }
}
