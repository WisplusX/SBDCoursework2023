package com.coursework.CourseworkRestApp.controllers;

import com.coursework.CourseworkRestApp.controllers.TransportController;
import com.coursework.CourseworkRestApp.models.Transport;
import com.coursework.CourseworkRestApp.models.User;
import com.coursework.CourseworkRestApp.services.TransportService;
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
public class TransportControllerTest {

    @Mock
    private TransportService transportService;

    @Mock
    private UserService userService;

    @InjectMocks
    private TransportController transportController;

    @Test
    public void testGetAllTransports() {
        when(transportService.getAllTransports(any())).thenReturn(Page.empty());

        Page<Transport> result = transportController.getAllTransports(0, 10, "id");

        assertEquals(0, result.getTotalElements());
    }

    @Test
    public void testGetTransportByDriverPresence() {
        when(transportService.getAllTransports(any())).thenReturn(Page.empty());

        Page<Transport> result = transportController.getTransportByDriverPresence(0, 10, "absent");

        assertEquals(0, result.getTotalElements());
    }

    @Test
    public void testGetTransportById() {
        when(transportService.getTransportById(anyInt())).thenReturn(new Transport());

        ResponseEntity<Transport> result = transportController.getTransportById(1);

        assertEquals(HttpStatus.OK, result.getStatusCode());
    }

    @Test
    public void testCreateTransport() {
        when(transportService.createTransport(any())).thenReturn(new Transport());

        ResponseEntity<Transport> result = transportController.createTransport(new Transport());

        assertEquals(HttpStatus.CREATED, result.getStatusCode());
    }

    @Test
    public void testUpdateTransport() {
        when(transportService.updateTransport(anyInt(), any())).thenReturn(new Transport());

        ResponseEntity<Transport> result = transportController.updateTransport(1, new Transport());

        assertEquals(HttpStatus.OK, result.getStatusCode());
    }

    @Test
    public void testDeleteTransport() {
        doNothing().when(transportService).deleteTransport(anyInt());

        ResponseEntity<Void> result = transportController.deleteTransport(1);

        assertEquals(HttpStatus.NO_CONTENT, result.getStatusCode());
    }

    @Test
    public void testAssignTransport() {
        when(transportService.getTransportById(anyInt())).thenReturn(new Transport());
        when(userService.getUserById(anyInt())).thenReturn(new User());
        when(transportService.getTransportByDriverId(anyInt())).thenReturn(null);
        when(transportService.updateTransport(anyInt(), any())).thenReturn(new Transport());

        ResponseEntity<Transport> result = transportController.assignTransport(1, 1);

        assertEquals(HttpStatus.OK, result.getStatusCode());
    }

    @Test
    public void testTakeOffTransport() {
        when(transportService.getTransportById(anyInt())).thenReturn(new Transport());
        when(transportService.updateTransport(anyInt(), any())).thenReturn(new Transport());

        ResponseEntity<String> result = transportController.takeOffTransport(1);

        assertEquals(HttpStatus.OK, result.getStatusCode());
    }
}
