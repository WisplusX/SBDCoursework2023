package com.coursework.CourseworkRestApp.services;

import com.coursework.CourseworkRestApp.models.Report;
import com.coursework.CourseworkRestApp.models.Route;
import com.coursework.CourseworkRestApp.models.Transport;
import com.coursework.CourseworkRestApp.models.User;
import com.coursework.CourseworkRestApp.repositories.ReportRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ReportServiceTest {

    @Mock
    private ReportRepository reportRepository;

    @Mock
    private UserService userService;

    @Mock
    private RouteService routeService;

    @Mock
    private TransportService transportService;

    @InjectMocks
    private ReportService reportService;

    @Test
    public void testCreateReport() {
        assertNull(userService.getUserById(1));
    }

    @Test
    public void testGetReportsByDatePaginated() {
        LocalDate date = LocalDate.now();
        when(reportRepository.findByCreatedAtBetween(any(), any(), any())).thenReturn(Page.empty());

        Page<Report> result = reportService.getReportsByDatePaginated(date, 0, 10, "createdAt", Sort.Direction.ASC);

        assertEquals(0, result.getTotalElements());
    }
}
