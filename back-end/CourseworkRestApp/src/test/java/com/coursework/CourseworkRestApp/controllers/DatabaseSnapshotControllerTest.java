package com.coursework.CourseworkRestApp.controllers;

import com.coursework.CourseworkRestApp.controllers.DatabaseSnapshotController;
import com.coursework.CourseworkRestApp.models.DatabaseSnapshot;
import com.coursework.CourseworkRestApp.services.DatabaseSnapshotService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Collections;

import static org.mockito.Mockito.when;

@WebMvcTest(DatabaseSnapshotController.class)
public class DatabaseSnapshotControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DatabaseSnapshotService snapshotService;

    @InjectMocks
    private DatabaseSnapshotController snapshotController;

    @Test
    public void testCreateSnapshot() throws Exception {
        // Arrange
        when(snapshotService.createDatabaseSnapshotData()).thenReturn("testSnapshotData");
        when(snapshotService.createSnapshot("testSnapshotData")).thenReturn(new DatabaseSnapshot("1", "testSnapshotData"));

        // Act & Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/snapshots/create")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value("1"));
    }

    @Test
    public void testDownloadSnapshot() throws Exception {
        // Arrange
        String snapshotId = "1";
        when(snapshotService.getSnapshotById(snapshotId)).thenReturn(new DatabaseSnapshot(snapshotId, "testSnapshotData"));

        // Act & Assert
        mockMvc.perform(MockMvcRequestBuilders.get("/snapshots/{id}/download", snapshotId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.header().string("Content-Disposition", "form-data; name=\"attachment\"; filename=\"snapshot_1.json\""));
    }

    @Test
    public void testDownloadSnapshotNotFound() throws Exception {
        // Arrange
        String nonExistingSnapshotId = "999";
        when(snapshotService.getSnapshotById(nonExistingSnapshotId)).thenReturn(null);

        // Act & Assert
        mockMvc.perform(MockMvcRequestBuilders.get("/snapshots/{id}/download", nonExistingSnapshotId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}
