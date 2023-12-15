package com.coursework.CourseworkRestApp.controllers;

import com.coursework.CourseworkRestApp.controllers.ReportController;
import com.coursework.CourseworkRestApp.models.Report;
import com.coursework.CourseworkRestApp.services.ReportService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ReportControllerTest {

    @Mock
    private ReportService reportService;

    @InjectMocks
    private ReportController reportController;

    @Test
    public void testGetReportsByDate() {
        // Создаем тестовые данные
        LocalDate testDate = LocalDate.now();
        Report report1 = new Report(/* заполните поля вашего отчета */);
        Report report2 = new Report(/* заполните поля вашего отчета */);
        List<Report> testReportsList = Arrays.asList(report1, report2);
        Page<Report> testReports = new PageImpl<>(testReportsList, PageRequest.of(0, 10), testReportsList.size());

        // Мокируем метод reportService.getReportsByDatePaginated
        when(reportService.getReportsByDatePaginated(eq(testDate), anyInt(), anyInt(), anyString(), any(Sort.Direction.class)))
                .thenReturn(testReports);

        // Вызываем метод контроллера
        ResponseEntity<Page<Report>> response = reportController.getReportsByDate(testDate, 0, 10, "createdAt", Sort.Direction.ASC);

        // Проверяем, что ответ содержит ожидаемые данные
        assertEquals(testReports, response.getBody());
        assertEquals(200, response.getStatusCodeValue()); // 200 OK
    }
}
