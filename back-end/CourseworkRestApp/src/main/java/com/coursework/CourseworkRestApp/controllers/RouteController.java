package com.coursework.CourseworkRestApp.controllers;

import com.coursework.CourseworkRestApp.models.Report;
import com.coursework.CourseworkRestApp.models.Route;
import com.coursework.CourseworkRestApp.models.User;
import com.coursework.CourseworkRestApp.services.ReportService;
import com.coursework.CourseworkRestApp.services.RouteService;
import com.coursework.CourseworkRestApp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/routes")
public class RouteController {

    private final RouteService routeService;
    private final UserService userService;
    private final ReportService reportService;

    @Autowired
    public RouteController(RouteService routeService, UserService userService, ReportService reportService) {
        this.routeService = routeService;
        this.userService = userService;
        this.reportService = reportService;
    }

    @GetMapping
    public Page<Route> getAllRoutes(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "sortBy", defaultValue = "id") String sortBy) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return routeService.getAllRoutes(pageable);
    }

    @GetMapping("/driverPresence")
    public Page<Route> getRoutesByDriverPresence(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "isPresent", defaultValue = "absent") String isPresent) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("id"));

        Page<Route> routesPage = routeService.getAllRoutes(pageable);

        List<Route> allRoutes = routesPage.getContent();

        if (Objects.equals(isPresent, "absent")) {
            return new PageImpl<>(allRoutes.stream()
                    .filter(route -> route.getDriver() == null)
                    .collect(Collectors.toList()), pageable, routesPage.getTotalElements());
        } else {
            return new PageImpl<>(allRoutes.stream()
                    .filter(route -> route.getDriver() != null)
                    .collect(Collectors.toList()), pageable, routesPage.getTotalElements());
        }
    }



    @GetMapping("/{routeId}")
    public ResponseEntity<Route> getRouteById(@PathVariable int routeId) {
        Route route = routeService.getRouteById(routeId);
        return ResponseEntity.ok().body(route);
    }

    @PostMapping
    public ResponseEntity<Route> createRoute(@RequestBody Route route) {
        Route createdRoute = routeService.createRoute(route);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRoute);
    }

    @PutMapping("/{routeId}")
    public ResponseEntity<Route> updateRoute(@PathVariable int routeId, @RequestBody Route route) {
        Route updatedRoute = routeService.updateRoute(routeId, route);
        return ResponseEntity.ok().body(updatedRoute);
    }

    @DeleteMapping("/{routeId}")
    public ResponseEntity<Void> deleteRoute(@PathVariable int routeId) {
        routeService.deleteRoute(routeId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/finish/{routeId}")
    public ResponseEntity<Report> finishRoute(
            @PathVariable int routeId,
            @RequestBody Map<String, Object> requestBody
    ) {
        int userId = Integer.parseInt(requestBody.get("userId").toString());
        Report report = reportService.createReport(userId);

        if (report != null) {
            return ResponseEntity.ok(report);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping("/assign/{routeId}")
    public ResponseEntity<Route> assignRoute(@PathVariable int routeId, @RequestBody int driverId) {
        try {
            Route route = routeService.getRouteById(routeId);
            if (route == null) {
                return ResponseEntity.notFound().build();
            }

            User driver = userService.getUserById(driverId);
            if (driver == null) {
                return ResponseEntity.notFound().build();
            }

            Route prevRoute = routeService.getRouteByDriverId(driverId);
            if (prevRoute != null) {
                prevRoute.setDriver(null);
                routeService.updateRoute(prevRoute.getId(), prevRoute);
            }

            route.setDriver(driver);
            Route updatedRoute = routeService.updateRoute(routeId, route);

            return ResponseEntity.ok().body(updatedRoute);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/takeoff/{routeId}")
    public ResponseEntity<String> takeOffRoute(@PathVariable int routeId) {
        try {
            Route route = routeService.getRouteById(routeId);
            if (route == null) {
                return ResponseEntity.notFound().build();
            }

            route.setDriver(null);
            routeService.updateRoute(routeId, route);

            return ResponseEntity.ok().body("Водій видалений з маршруту");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Помилка при видаленні водія з маршруту");
        }
    }

}
