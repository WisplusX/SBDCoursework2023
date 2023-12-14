package com.coursework.CourseworkRestApp.repositories;

import com.coursework.CourseworkRestApp.models.DatabaseSnapshot;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DatabaseSnapshotRepository extends MongoRepository<DatabaseSnapshot, String> {
}
