package com.coursework.CourseworkRestApp.repositories;

import com.coursework.CourseworkRestApp.models.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
}
