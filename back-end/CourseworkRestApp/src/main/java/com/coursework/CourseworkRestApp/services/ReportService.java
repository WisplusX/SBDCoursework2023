package com.coursework.CourseworkRestApp.services;

import com.coursework.CourseworkRestApp.models.*;
import com.coursework.CourseworkRestApp.repositories.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReportService {
    private final ReportRepository reportRepository;
    private final UserService userService;
    private final RouteService routeService;
    private final TransportService transportService;

    public ReportService(ReportRepository reportRepository, UserService userService, UserInfoService userInfoService, RouteService routeService, TransportService transportService) {
        this.reportRepository = reportRepository;
        this.userService = userService;
        this.routeService = routeService;
        this.transportService = transportService;
    }

    public Report createReport(int id) {
        User driver = userService.getUserById(id);
        UserInfo userInfo = driver.getUserInfo();
        Transport transport = transportService.getTransportByDriverId(id);
        Route route = routeService.getRouteByDriverId(id);

        Report report = new Report();
        report.setDriverId(id);
        report.setDriverName(userInfo.getName());
        report.setTransportId(transport.getId());
        report.setLicensePlate(transport.getLicensePlate());
        report.setRouteId(route.getId());
        report.setRouteStart(route.getRouteStart());
        report.setRouteEnd(route.getRouteEnd());
        report.setRouteLength(route.getRouteLength());
        double usedFuel = (route.getRouteLength() / 100.0) * transport.getConsumption();
        report.setUsedFuel(usedFuel);

        return reportRepository.save(report);
    }

    public Page<Report> getReportsByDatePaginated(LocalDate date, int page, int size, String sortField,
                                                  Sort.Direction sortDirection) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(sortDirection, sortField));
        return reportRepository.findByCreatedAtBetween(
                date.atStartOfDay(), date.plusDays(1).atStartOfDay(), pageRequest);
    }
}
