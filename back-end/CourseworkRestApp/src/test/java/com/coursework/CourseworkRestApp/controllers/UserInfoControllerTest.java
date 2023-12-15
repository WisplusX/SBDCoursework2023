package com.coursework.CourseworkRestApp.controllers;

import com.coursework.CourseworkRestApp.controllers.UserInfoController;
import com.coursework.CourseworkRestApp.models.UserInfo;
import com.coursework.CourseworkRestApp.services.UserInfoService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserInfoControllerTest {

    @Mock
    private UserInfoService userInfoService;

    @InjectMocks
    private UserInfoController userInfoController;

    @Test
    public void testGetAllUserInfos() {
        when(userInfoService.getAllUserInfos()).thenReturn(Collections.emptyList());

        List<UserInfo> result = userInfoController.getAllUserInfos();

        assertEquals(0, result.size());
    }

    @Test
    public void testGetUserInfoById() {
        when(userInfoService.getUserInfoById(anyInt())).thenReturn(new UserInfo());

        ResponseEntity<UserInfo> result = userInfoController.getUserInfoById(1);

        assertEquals(HttpStatus.OK, result.getStatusCode());
    }

    @Test
    public void testCreateUserInfo() {
        when(userInfoService.createUserInfo(any())).thenReturn(new UserInfo());

        ResponseEntity<UserInfo> result = userInfoController.createUserInfo(new UserInfo());

        assertEquals(HttpStatus.CREATED, result.getStatusCode());
    }

    @Test
    public void testUpdateUserInfo() {
        when(userInfoService.updateUserInfo(anyInt(), any())).thenReturn(new UserInfo());

        ResponseEntity<UserInfo> result = userInfoController.updateUserInfo(1, new UserInfo());

        assertEquals(HttpStatus.OK, result.getStatusCode());
    }

    @Test
    public void testDeleteUserInfo() {
        doNothing().when(userInfoService).deleteUserInfo(anyInt());

        ResponseEntity<Void> result = userInfoController.deleteUserInfo(1);

        assertEquals(HttpStatus.NO_CONTENT, result.getStatusCode());
    }
}
