package com.coursework.CourseworkRestApp.controllers;

import com.coursework.CourseworkRestApp.controllers.RouteController;
import com.coursework.CourseworkRestApp.models.Report;
import com.coursework.CourseworkRestApp.models.Route;
import com.coursework.CourseworkRestApp.models.User;
import com.coursework.CourseworkRestApp.services.ReportService;
import com.coursework.CourseworkRestApp.services.RouteService;
import com.coursework.CourseworkRestApp.services.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RouteControllerTest {

    @Mock
    private RouteService routeService;

    @Mock
    private UserService userService;

    @Mock
    private ReportService reportService;

    @InjectMocks
    private RouteController routeController;

    @Test
    public void testGetAllRoutes() {
        when(routeService.getAllRoutes(any())).thenReturn(Page.empty());

        Page<Route> result = routeController.getAllRoutes(0, 10, "id");

        assertEquals(0, result.getTotalElements());
    }

    @Test
    public void testGetRoutesByDriverPresence() {
        when(routeService.getAllRoutes(any())).thenReturn(Page.empty());

        Page<Route> result = routeController.getRoutesByDriverPresence(0, 10, "absent");

        assertEquals(0, result.getTotalElements());
    }

    @Test
    public void testGetRouteById() {
        when(routeService.getRouteById(anyInt())).thenReturn(new Route());

        ResponseEntity<Route> result = routeController.getRouteById(1);

        assertEquals(HttpStatus.OK, result.getStatusCode());
    }

    @Test
    public void testCreateRoute() {
        when(routeService.createRoute(any())).thenReturn(new Route());

        ResponseEntity<Route> result = routeController.createRoute(new Route());

        assertEquals(HttpStatus.CREATED, result.getStatusCode());
    }

    @Test
    public void testUpdateRoute() {
        when(routeService.updateRoute(anyInt(), any())).thenReturn(new Route());

        ResponseEntity<Route> result = routeController.updateRoute(1, new Route());

        assertEquals(HttpStatus.OK, result.getStatusCode());
    }

    @Test
    public void testDeleteRoute() {
        doNothing().when(routeService).deleteRoute(anyInt());

        ResponseEntity<Void> result = routeController.deleteRoute(1);

        assertEquals(HttpStatus.NO_CONTENT, result.getStatusCode());
    }

    @Test
    public void testFinishRoute() {
        when(reportService.createReport(anyInt())).thenReturn(new Report());

        ResponseEntity<Report> result = routeController.finishRoute(1, Collections.singletonMap("userId", 1));

        assertEquals(HttpStatus.OK, result.getStatusCode());
    }

    @Test
    public void testAssignRoute() {
        when(routeService.getRouteById(anyInt())).thenReturn(new Route());
        when(userService.getUserById(anyInt())).thenReturn(new User());
        when(routeService.getRouteByDriverId(anyInt())).thenReturn(null);
        when(routeService.updateRoute(anyInt(), any())).thenReturn(new Route());

        ResponseEntity<Route> result = routeController.assignRoute(1, 1);

        assertEquals(HttpStatus.OK, result.getStatusCode());
    }

    @Test
    public void testTakeOffRoute() {
        when(routeService.getRouteById(anyInt())).thenReturn(new Route());
        when(routeService.updateRoute(anyInt(), any())).thenReturn(new Route());

        ResponseEntity<String> result = routeController.takeOffRoute(1);

        assertEquals(HttpStatus.OK, result.getStatusCode());
    }
}
