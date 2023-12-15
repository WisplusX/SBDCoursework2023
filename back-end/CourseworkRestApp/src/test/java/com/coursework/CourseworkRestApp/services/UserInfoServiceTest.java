package com.coursework.CourseworkRestApp.services;

import com.coursework.CourseworkRestApp.models.UserInfo;
import com.coursework.CourseworkRestApp.repositories.UserInfoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserInfoServiceTest {

    @Mock
    private UserInfoRepository userInfoRepository;

    @InjectMocks
    private UserInfoService userInfoService;

    @Test
    public void testGetAllUserInfos() {
        when(userInfoRepository.findAll()).thenReturn(List.of());

        List<UserInfo> result = userInfoService.getAllUserInfos();

        assertEquals(0, result.size());
    }

    @Test
    public void testGetUserInfoById() {
        when(userInfoRepository.findById(anyInt())).thenReturn(Optional.of(new UserInfo()));

        UserInfo result = userInfoService.getUserInfoById(1);

        assertEquals(UserInfo.class, result.getClass());
    }

    @Test
    public void testCreateUserInfo() {
        when(userInfoRepository.save(any())).thenReturn(new UserInfo());

        UserInfo result = userInfoService.createUserInfo(new UserInfo());

        assertEquals(UserInfo.class, result.getClass());
    }

    @Test
    public void testUpdateUserInfo() {
        when(userInfoRepository.findById(anyInt())).thenReturn(Optional.of(new UserInfo()));
        when(userInfoRepository.save(any())).thenReturn(new UserInfo());

        UserInfo result = userInfoService.updateUserInfo(1, new UserInfo());

        assertEquals(UserInfo.class, result.getClass());
    }

    @Test
    public void testDeleteUserInfo() {
        doNothing().when(userInfoRepository).deleteById(anyInt());

        userInfoService.deleteUserInfo(1);

        verify(userInfoRepository, times(1)).deleteById(1);
    }
}
