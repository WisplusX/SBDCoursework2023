package com.coursework.CourseworkRestApp.controllers;

import com.coursework.CourseworkRestApp.models.*;
import com.coursework.CourseworkRestApp.services.DriverService;
import com.coursework.CourseworkRestApp.services.UserInfoService;
import com.coursework.CourseworkRestApp.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class DriverControllerTest {
    @Mock
    private DriverService driverService;

    @Mock
    private UserService userService;

    @Mock
    private UserInfoService userInfoService;

    @InjectMocks
    private DriverController driverController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetRouteForDriver() {
        int driverId = 1;
        Route mockRoute = new Route();

        when(driverService.getRouteForDriver(driverId)).thenReturn(mockRoute);

        ResponseEntity<?> response = driverController.getRouteForDriver(driverId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockRoute, response.getBody());
    }

    @Test
    public void testGetTransportForDriver() {
        int driverId = 1;
        Transport mockTransport = new Transport();

        // Настроим мок driverService
        when(driverService.getTransportForDriver(driverId)).thenReturn(mockTransport);

        ResponseEntity<?> response = driverController.getTransportForDriver(driverId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockTransport, response.getBody());
    }

    @Test
    public void testCreateDriver() {
        Driver mockDriver = new Driver();
        mockDriver.setSalary("1000.0");
        UserInfo mockUserInfo = new UserInfo();
        mockUserInfo.setId(1);
        when(userInfoService.createUserInfo(mockUserInfo)).thenReturn(mockUserInfo);

        when(userService.createUser(new User())).thenReturn(new User());

        ResponseEntity<?> response = driverController.createDriver(mockDriver);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testUpdateDriver() {
        int driverId = 1;
        Driver mockDriver = new Driver();
        mockDriver.setSalary("1000.0");

        User existingUser = new User();
        existingUser.setId(driverId);
        existingUser.setUserInfo(new UserInfo());

        when(userService.getUserById(driverId)).thenReturn(existingUser);

        // Adjust these lines based on the actual return types
        when(userInfoService.updateUserInfo(existingUser.getUserInfo().getId(), existingUser.getUserInfo()))
                .thenReturn(existingUser.getUserInfo());
        when(userService.updateUser(existingUser.getId(), existingUser))
                .thenReturn(existingUser);

        ResponseEntity<?> response = driverController.updateDriver(driverId, mockDriver);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
}
