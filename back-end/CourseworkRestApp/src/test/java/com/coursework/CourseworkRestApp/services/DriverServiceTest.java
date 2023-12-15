package com.coursework.CourseworkRestApp.services;

import com.coursework.CourseworkRestApp.models.Route;
import com.coursework.CourseworkRestApp.models.Transport;
import com.coursework.CourseworkRestApp.repositories.RouteRepository;
import com.coursework.CourseworkRestApp.repositories.TransportRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DriverServiceTest {

    @Mock
    private RouteRepository routeRepository;

    @Mock
    private TransportRepository transportRepository;

    @InjectMocks
    private DriverService driverService;

    @Test
    public void testGetRouteForDriver() {
        when(routeRepository.findByDriverId(anyInt())).thenReturn(Optional.of(new Route()));

        Route result = driverService.getRouteForDriver(1);

        assertEquals(Route.class, result.getClass());
    }

    @Test
    public void testGetTransportForDriver() {
        when(transportRepository.findByDriverId(anyInt())).thenReturn(Optional.of(new Transport()));

        Transport result = driverService.getTransportForDriver(1);

        assertEquals(Transport.class, result.getClass());
    }
}
