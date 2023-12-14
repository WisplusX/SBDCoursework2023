package com.coursework.CourseworkRestApp.services;

import com.coursework.CourseworkRestApp.models.Transport;
import com.coursework.CourseworkRestApp.repositories.TransportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransportService {

    private final TransportRepository transportRepository;

    @Autowired
    public TransportService(TransportRepository transportRepository) {
        this.transportRepository = transportRepository;
    }

    public Page<Transport> getAllTransports(Pageable pageable) {
        return transportRepository.findAll(pageable);
    }

    public Transport getTransportById(int transportId) {
        Optional<Transport> optionalTransport = transportRepository.findById(transportId);
        return optionalTransport.orElse(null);
    }

    public Transport getTransportByDriverId(int driverId) {
        Optional<Transport> optionalTransport = transportRepository.findByDriverId(driverId);
        return optionalTransport.orElse(null);
    }

    public Transport createTransport(Transport transport) {
        return transportRepository.save(transport);
    }

    public Transport updateTransport(int transportId, Transport updatedTransport) {
        Optional<Transport> optionalTransport = transportRepository.findById(transportId);
        if (optionalTransport.isPresent()) {
            Transport existingTransport = optionalTransport.get();
            existingTransport.setModel(updatedTransport.getModel());
            existingTransport.setLicensePlate(updatedTransport.getLicensePlate());
            existingTransport.setConsumption(updatedTransport.getConsumption());
            existingTransport.setDriver(updatedTransport.getDriver());
            return transportRepository.save(existingTransport);
        }
        return null;
    }

    public void deleteTransport(int transportId) {
        transportRepository.deleteById(transportId);
    }
}
