package com.coursework.CourseworkRestApp.services;

import com.coursework.CourseworkRestApp.models.DatabaseSnapshot;
import com.coursework.CourseworkRestApp.models.Route;
import com.coursework.CourseworkRestApp.models.Transport;
import com.coursework.CourseworkRestApp.models.User;
import com.coursework.CourseworkRestApp.models.UserInfo;
import com.coursework.CourseworkRestApp.repositories.DatabaseSnapshotRepository;
import com.coursework.CourseworkRestApp.repositories.RouteRepository;
import com.coursework.CourseworkRestApp.repositories.TransportRepository;
import com.coursework.CourseworkRestApp.repositories.UserRepository;
import com.coursework.CourseworkRestApp.repositories.UserInfoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DatabaseSnapshotServiceTest {

    @Mock
    private DatabaseSnapshotRepository databaseSnapshotRepository;

    @Mock
    private RouteRepository routeRepository;

    @Mock
    private TransportRepository transportRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserInfoRepository userInfoRepository;

    @InjectMocks
    private DatabaseSnapshotService databaseSnapshotService;

    @Test
    public void testCreateSnapshot() {
        when(databaseSnapshotRepository.save(any())).thenReturn(new DatabaseSnapshot());

        DatabaseSnapshot result = databaseSnapshotService.createSnapshot("testData");

        assertNull(result.getSnapshotData());
    }

    @Test
    public void testGetSnapshotById() {
        when(databaseSnapshotRepository.findById(any())).thenReturn(java.util.Optional.of(new DatabaseSnapshot()));

        DatabaseSnapshot result = databaseSnapshotService.getSnapshotById("testId");

        assertNull(result.getId());
    }

    @Test
    public void testCreateDatabaseSnapshotData() {
        when(routeRepository.findAll()).thenReturn(Collections.emptyList());
        when(transportRepository.findAll()).thenReturn(Collections.emptyList());
        when(userRepository.findAll()).thenReturn(Collections.emptyList());
        when(userInfoRepository.findAll()).thenReturn(Collections.emptyList());

        String result = databaseSnapshotService.createDatabaseSnapshotData();

        assertEquals("{\"routes\":[],\"transports\":[],\"users\":[],\"userInfos\":[]}", result);
    }
}
