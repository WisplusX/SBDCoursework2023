package com.coursework.CourseworkRestApp.models;

import jakarta.persistence.*;

@Entity
@Table(name = "transport")
public class Transport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "model")
    private String model;
    @Column(name = "license_plate")
    private String licensePlate;
    @Column(name = "consumption")
    private double consumption;
    @ManyToOne
    @JoinColumn(name = "driver_id")
    private User driver;

    public Transport() {
    }

    public Transport(String model, String licensePlate, double consumption, User driver) {
        this.model = model;
        this.licensePlate = licensePlate;
        this.consumption = consumption;
        this.driver = driver;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public double getConsumption() {
        return consumption;
    }

    public void setConsumption(double consumption) {
        this.consumption = consumption;
    }

    public User getDriver() {
        return driver;
    }

    public void setDriver(User driver) {
        this.driver = driver;
    }

    @Override
    public String toString() {
        return "Transport{" +
                "id=" + id +
                ", model='" + model + '\'' +
                ", licensePlate='" + licensePlate + '\'' +
                ", consumption=" + consumption +
                ", driver=" + driver +
                '}';
    }
}
