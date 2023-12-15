package com.coursework.CourseworkRestApp.services;

import com.coursework.CourseworkRestApp.models.Transport;
import com.coursework.CourseworkRestApp.repositories.TransportRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TransportServiceTest {

    @Mock
    private TransportRepository transportRepository;

    @InjectMocks
    private TransportService transportService;

    @Test
    public void testGetAllTransports() {
        when(transportRepository.findAll(any(Pageable.class))).thenReturn(Page.empty());

        Page<Transport> result = transportService.getAllTransports(PageRequest.of(0, 10, Sort.by(Sort.Order.desc("createdAt"))));

        assertEquals(0, result.getTotalElements());
    }

    @Test
    public void testGetTransportById() {
        when(transportRepository.findById(anyInt())).thenReturn(Optional.of(new Transport()));

        Transport result = transportService.getTransportById(1);

        assertEquals(Transport.class, result.getClass());
    }

    @Test
    public void testGetTransportByDriverId() {
        when(transportRepository.findByDriverId(anyInt())).thenReturn(Optional.of(new Transport()));

        Transport result = transportService.getTransportByDriverId(1);

        assertEquals(Transport.class, result.getClass());
    }

    @Test
    public void testCreateTransport() {
        when(transportRepository.save(any())).thenReturn(new Transport());

        Transport result = transportService.createTransport(new Transport());

        assertEquals(Transport.class, result.getClass());
    }

    @Test
    public void testUpdateTransport() {
        when(transportRepository.findById(anyInt())).thenReturn(Optional.of(new Transport()));
        when(transportRepository.save(any())).thenReturn(new Transport());

        Transport result = transportService.updateTransport(1, new Transport());

        assertEquals(Transport.class, result.getClass());
    }

    @Test
    public void testDeleteTransport() {
        doNothing().when(transportRepository).deleteById(anyInt());

        transportService.deleteTransport(1);

        verify(transportRepository, times(1)).deleteById(1);
    }
}
