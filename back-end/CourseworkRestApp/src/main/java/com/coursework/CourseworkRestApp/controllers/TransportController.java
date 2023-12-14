package com.coursework.CourseworkRestApp.controllers;

import com.coursework.CourseworkRestApp.models.Route;
import com.coursework.CourseworkRestApp.models.Transport;
import com.coursework.CourseworkRestApp.models.User;
import com.coursework.CourseworkRestApp.services.TransportService;
import com.coursework.CourseworkRestApp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/transport")
public class TransportController {

    private final TransportService transportService;
    private final UserService userService;

    @Autowired
    public TransportController(TransportService transportService, UserService userService) {
        this.transportService = transportService;
        this.userService = userService;
    }

    @GetMapping
    public Page<Transport> getAllTransports(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "sortBy", defaultValue = "id") String sortBy) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return transportService.getAllTransports(pageable);
    }

    @GetMapping("/driverPresence")
    public Page<Transport> getTransportByDriverPresence(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "isPresent", defaultValue = "absent") String isPresent) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("id"));

        Page<Transport> transportPage = transportService.getAllTransports(pageable);

        List<Transport> allTransports = transportPage.getContent();

        if (Objects.equals(isPresent, "absent")) {
            return new PageImpl<>(allTransports.stream()
                    .filter(route -> route.getDriver() == null)
                    .collect(Collectors.toList()), pageable, transportPage.getTotalElements());
        } else {
            return new PageImpl<>(allTransports.stream()
                    .filter(route -> route.getDriver() != null)
                    .collect(Collectors.toList()), pageable, transportPage.getTotalElements());
        }
    }


    @GetMapping("/{transportId}")
    public ResponseEntity<Transport> getTransportById(@PathVariable int transportId) {
        Transport transport = transportService.getTransportById(transportId);
        return ResponseEntity.ok().body(transport);
    }

    @PostMapping
    public ResponseEntity<Transport> createTransport(@RequestBody Transport transport) {
        Transport createdTransport = transportService.createTransport(transport);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTransport);
    }

    @PutMapping("/{transportId}")
    public ResponseEntity<Transport> updateTransport(@PathVariable int transportId, @RequestBody Transport transport) {
        Transport updatedTransport = transportService.updateTransport(transportId, transport);
        return ResponseEntity.ok().body(updatedTransport);
    }

    @DeleteMapping("/{transportId}")
    public ResponseEntity<Void> deleteTransport(@PathVariable int transportId) {
        transportService.deleteTransport(transportId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/assign/{transportId}")
    public ResponseEntity<Transport> assignTransport(@PathVariable int transportId, @RequestBody int driverId) {
        try {
            Transport transport = transportService.getTransportById(transportId);
            if (transport == null) {
                return ResponseEntity.notFound().build();
            }

            User driver = userService.getUserById(driverId);
            if (driver == null) {
                return ResponseEntity.notFound().build();
            }

            Transport prevTransport = transportService.getTransportByDriverId(driverId);
            if (prevTransport != null) {
                prevTransport.setDriver(null);
                transportService.updateTransport(prevTransport.getId(), prevTransport);
            }

            transport.setDriver(driver);
            Transport updatedTransport = transportService.updateTransport(transportId, transport);

            return ResponseEntity.ok().body(updatedTransport);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/takeoff/{transportId}")
    public ResponseEntity<String> takeOffTransport(@PathVariable int transportId) {
        try {
            Transport transport = transportService.getTransportById(transportId);
            if (transport == null) {
                return ResponseEntity.notFound().build();
            }

            transport.setDriver(null);
            transportService.updateTransport(transportId, transport);

            return ResponseEntity.ok().body("Водія знято з транспорту");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Помилка при знятті водія з " +
                    "траспорту");
        }
    }

}
