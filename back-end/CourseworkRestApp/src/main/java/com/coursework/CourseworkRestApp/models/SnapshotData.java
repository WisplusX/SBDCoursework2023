package com.coursework.CourseworkRestApp.models;

import java.util.List;

public class SnapshotData {
    private List<Route> routes;
    private List<Transport> transports;
    private List<User> users;
    private List<UserInfo> userInfos;

    public SnapshotData(List<Route> routes, List<Transport> transports, List<User> users, List<UserInfo> userInfos) {
        this.routes = routes;
        this.transports = transports;
        this.users = users;
        this.userInfos = userInfos;
    }

    public List<Route> getRoutes() {
        return routes;
    }

    public void setRoutes(List<Route> routes) {
        this.routes = routes;
    }

    public List<Transport> getTransports() {
        return transports;
    }

    public void setTransports(List<Transport> transports) {
        this.transports = transports;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<UserInfo> getUserInfos() {
        return userInfos;
    }

    public void setUserInfos(List<UserInfo> userInfos) {
        this.userInfos = userInfos;
    }
}
