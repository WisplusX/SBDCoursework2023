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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DatabaseSnapshotService {

    private final DatabaseSnapshotRepository databaseSnapshotRepository;
    private final RouteRepository routeRepository;
    private final TransportRepository transportRepository;
    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;

    @Autowired
    public DatabaseSnapshotService(
            DatabaseSnapshotRepository databaseSnapshotRepository,
            RouteRepository routeRepository,
            TransportRepository transportRepository,
            UserRepository userRepository,
            UserInfoRepository userInfoRepository) {
        this.databaseSnapshotRepository = databaseSnapshotRepository;
        this.routeRepository = routeRepository;
        this.transportRepository = transportRepository;
        this.userRepository = userRepository;
        this.userInfoRepository = userInfoRepository;
    }

    public DatabaseSnapshot createSnapshot(String snapshotData) {
        DatabaseSnapshot snapshot = new DatabaseSnapshot(snapshotData);
        return databaseSnapshotRepository.save(snapshot);
    }

    public Page<DatabaseSnapshot> getAllSnapshots(Pageable pageable) {
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
                Sort.by(Sort.Order.desc("createdAt")));
        return databaseSnapshotRepository.findAll(pageRequest);
    }

    public DatabaseSnapshot getSnapshotById(String id) {
        return databaseSnapshotRepository.findById(id).orElse(null);
    }

    public String createDatabaseSnapshotData() {
        List<Route> routes = routeRepository.findAll();
        List<Transport> transports = transportRepository.findAll();
        List<User> users = userRepository.findAll();
        List<UserInfo> userInfos = userInfoRepository.findAll();

        String snapshotData = "{"
                + "\"routes\":" + routes.toString() + ","
                + "\"transports\":" + transports.toString() + ","
                + "\"users\":" + users.toString() + ","
                + "\"userInfos\":" + userInfos.toString()
                + "}";

        return snapshotData;
    }
}
