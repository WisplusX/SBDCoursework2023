package com.coursework.CourseworkRestApp.controllers;

import com.coursework.CourseworkRestApp.controllers.UserController;
import com.coursework.CourseworkRestApp.models.User;
import com.coursework.CourseworkRestApp.services.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @Test
    public void testGetAllUsers() {
        when(userService.getAllUsers(any())).thenReturn(Page.empty());

        ResponseEntity<Page<User>> result = userController.getAllUsers(0, 10, "id", "ASC");

        assertEquals(0, result.getBody().getTotalElements());
    }

    @Test
    public void testGetUserById() {
        when(userService.getUserById(anyInt())).thenReturn(new User());

        ResponseEntity<User> result = userController.getUserById(1);

        assertEquals(HttpStatus.OK, result.getStatusCode());
    }

    @Test
    public void testCreateUser() {
        when(userService.createUser(any())).thenReturn(new User());

        ResponseEntity<User> result = userController.createUser(new User());

        assertEquals(HttpStatus.CREATED, result.getStatusCode());
    }

    @Test
    public void testUpdateUser() {
        when(userService.updateUser(anyInt(), any())).thenReturn(new User());

        ResponseEntity<User> result = userController.updateUser(1, new User());

        assertEquals(HttpStatus.OK, result.getStatusCode());
    }

    @Test
    public void testDeleteUser() {
        doNothing().when(userService).deleteUser(anyInt());

        ResponseEntity<Void> result = userController.deleteUser(1);

        assertEquals(HttpStatus.NO_CONTENT, result.getStatusCode());
    }
}
