package com.coursework.CourseworkRestApp.models;

import jakarta.persistence.*;

@Entity
@Table(name = "routes")
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "route_start")
    private String routeStart;
    @Column(name = "route_end")
    private String routeEnd;
    @Column(name = "route_length")
    private double routeLength;
    @ManyToOne
    @JoinColumn(name = "driver_id")
    private User driver;

    public Route() {
    }

    public Route(String routeStart, String routeEnd, double routeLength, User driver) {
        this.routeStart = routeStart;
        this.routeEnd = routeEnd;
        this.routeLength = routeLength;
        this.driver = driver;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public User getDriver() {
        return driver;
    }

    public void setDriver(User driver) {
        this.driver = driver;
    }

    @Override
    public String toString() {
        return "Route{" +
                "id=" + id +
                ", routeStart='" + routeStart + '\'' +
                ", routeEnd='" + routeEnd + '\'' +
                ", routeLength=" + routeLength +
                ", driver=" + driver +
                '}';
    }
}
