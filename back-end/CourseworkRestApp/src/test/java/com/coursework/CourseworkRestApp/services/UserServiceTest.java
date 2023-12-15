package com.coursework.CourseworkRestApp.services;

import com.coursework.CourseworkRestApp.models.User;
import com.coursework.CourseworkRestApp.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    public void testGetAllUsers() {
        when(userRepository.findAll(any(Pageable.class))).thenReturn(Page.empty());

        Page<User> result = userService.getAllUsers(PageRequest.of(0, 10));

        assertEquals(0, result.getTotalElements());
    }

    @Test
    public void testGetUserById() {
        when(userRepository.findById(anyInt())).thenReturn(Optional.of(new User()));

        User result = userService.getUserById(1);

        assertEquals(User.class, result.getClass());
    }

    @Test
    public void testGetUserByEmail() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(new User()));

        User result = userService.getUserByEmail("test@example.com");

        assertEquals(User.class, result.getClass());
    }

    @Test
    public void testCreateUser() {
        when(userRepository.save(any())).thenReturn(new User());

        User result = userService.createUser(new User());

        assertEquals(User.class, result.getClass());
    }

    @Test
    public void testUpdateUser() {
        when(userRepository.findById(anyInt())).thenReturn(Optional.of(new User()));
        when(userRepository.save(any())).thenReturn(new User());

        User result = userService.updateUser(1, new User());

        assertEquals(User.class, result.getClass());
    }

    @Test
    public void testDeleteUser() {
        doNothing().when(userRepository).deleteById(anyInt());

        userService.deleteUser(1);

        verify(userRepository, times(1)).deleteById(1);
    }
}
