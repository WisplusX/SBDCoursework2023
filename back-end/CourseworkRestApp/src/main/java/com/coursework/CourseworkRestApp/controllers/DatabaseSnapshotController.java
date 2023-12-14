package com.coursework.CourseworkRestApp.controllers;

import com.coursework.CourseworkRestApp.models.DatabaseSnapshot;
import com.coursework.CourseworkRestApp.services.DatabaseSnapshotService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/snapshots")
public class DatabaseSnapshotController {

    private final DatabaseSnapshotService snapshotService;

    public DatabaseSnapshotController(DatabaseSnapshotService snapshotService) {
        this.snapshotService = snapshotService;
    }

    @PostMapping("/create")
    public DatabaseSnapshot createSnapshot() {
        String snapshotData = snapshotService.createDatabaseSnapshotData();
        return snapshotService.createSnapshot(snapshotData);
    }

    @GetMapping
    public Page<DatabaseSnapshot> getAllSnapshots(Pageable pageable) {
        return snapshotService.getAllSnapshots(pageable);
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> downloadSnapshot(@PathVariable String id) {
        DatabaseSnapshot snapshot = snapshotService.getSnapshotById(id);

        if (snapshot == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        byte[] snapshotBytes = snapshot.getSnapshotData().getBytes();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setContentDispositionFormData("attachment", "snapshot_" + id + ".json");

        return new ResponseEntity<>(snapshotBytes, headers, HttpStatus.OK);
    }

}
