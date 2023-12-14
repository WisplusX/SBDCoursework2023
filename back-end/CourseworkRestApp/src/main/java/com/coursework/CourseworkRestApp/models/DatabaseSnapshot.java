package com.coursework.CourseworkRestApp.models;

import jakarta.persistence.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "database_snapshots")
public class DatabaseSnapshot {

    @Id
    private String id;

    private String snapshotData;

    private LocalDateTime createdAt;

    public DatabaseSnapshot() {
        this.createdAt = LocalDateTime.now();
    }

    public DatabaseSnapshot(String snapshotData) {
        this.snapshotData = snapshotData;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSnapshotData() {
        return snapshotData;
    }

    public void setSnapshotData(String snapshotData) {
        this.snapshotData = snapshotData;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
