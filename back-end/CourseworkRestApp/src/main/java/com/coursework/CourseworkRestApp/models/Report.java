package com.coursework.CourseworkRestApp.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "reports")
public class Report {

    @Id
    private String id;

    private int routeId;
    private String routeStart;
    private String routeEnd;
    private double routeLength;
    private double usedFuel;
    private int transportId;
    private String licensePlate;
    private int driverId;
    private String driverName;
    private LocalDateTime createdAt;

    public Report() {
        this.createdAt = LocalDateTime.now();
    }

    public Report(int routeId, String routeStart, String routeEnd, double routeLength, double usedFuel, int transportId, String licensePlate, int driverId, String driverName) {
        this.routeId = routeId;
        this.routeStart = routeStart;
        this.routeEnd = routeEnd;
        this.routeLength = routeLength;
        this.usedFuel = usedFuel;
        this.transportId = transportId;
        this.licensePlate = licensePlate;
        this.driverId = driverId;
        this.driverName = driverName;
        this.createdAt = LocalDateTime.now();
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getRouteId() {
        return routeId;
    }

    public void setRouteId(int routeId) {
        this.routeId = routeId;
    }

    public String getRouteStart() {
        return routeStart;
    }

    public void setRouteStart(String routeStart) {
        this.routeStart = routeStart;
    }

    public String getRouteEnd() {
        return routeEnd;
    }

    public void setRouteEnd(String routeEnd) {
        this.routeEnd = routeEnd;
    }

    public double getRouteLength() {
        return routeLength;
    }

    public void setRouteLength(double routeLength) {
        this.routeLength = routeLength;
    }

    public double getUsedFuel() {
        return usedFuel;
    }

    public void setUsedFuel(double usedFuel) {
        this.usedFuel = usedFuel;
    }

    public int getTransportId() {
        return transportId;
    }

    public void setTransportId(int transportId) {
        this.transportId = transportId;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public int getDriverId() {
        return driverId;
    }

    public void setDriverId(int driverId) {
        this.driverId = driverId;
    }

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }
}
