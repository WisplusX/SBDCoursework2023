package com.coursework.CourseworkRestApp.services;

import com.coursework.CourseworkRestApp.models.Route;
import com.coursework.CourseworkRestApp.repositories.RouteRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RouteServiceTest {

    @Mock
    private RouteRepository routeRepository;

    @InjectMocks
    private RouteService routeService;

    @Test
    public void testGetAllRoutes() {
        when(routeRepository.findAll(any(Pageable.class))).thenReturn(Page.empty());

        Page<Route> result = routeService.getAllRoutes(PageRequest.of(0, 10, Sort.by(Sort.Order.desc("createdAt"))));

        assertEquals(0, result.getTotalElements());
    }

    @Test
    public void testGetRouteById() {
        when(routeRepository.findById(anyInt())).thenReturn(Optional.of(new Route()));

        Route result = routeService.getRouteById(1);

        assertEquals(Route.class, result.getClass());
    }

    @Test
    public void testGetRouteByDriverId() {
        when(routeRepository.findByDriverId(anyInt())).thenReturn(Optional.of(new Route()));

        Route result = routeService.getRouteByDriverId(1);

        assertEquals(Route.class, result.getClass());
    }

    @Test
    public void testCreateRoute() {
        when(routeRepository.save(any())).thenReturn(new Route());

        Route result = routeService.createRoute(new Route());

        assertEquals(Route.class, result.getClass());
    }

    @Test
    public void testUpdateRoute() {
        when(routeRepository.findById(anyInt())).thenReturn(Optional.of(new Route()));
        when(routeRepository.save(any())).thenReturn(new Route());

        Route result = routeService.updateRoute(1, new Route());

        assertEquals(Route.class, result.getClass());
    }

    @Test
    public void testDeleteRoute() {
        doNothing().when(routeRepository).deleteById(anyInt());

        routeService.deleteRoute(1);

        verify(routeRepository, times(1)).deleteById(1);
    }

    @Test
    public void testFinishRoute() {
        when(routeRepository.findById(anyInt())).thenReturn(Optional.of(new Route()));
        when(routeRepository.save(any())).thenReturn(new Route());

        Route result = routeService.finishRoute(1);

        assertEquals(Route.class, result.getClass());
        assertEquals(null, result.getDriver());
    }
}
